const fs = require('node:fs'),
  { spawn } = require('node:child_process'),
  assert = require('node:assert/strict')
const WebSocket = require('next/dist/compiled/ws')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const chrome = spawn(
  '/usr/bin/google-chrome',
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--remote-debugging-address=127.0.0.1',
    '--remote-debugging-port=0',
    '--user-data-dir=' + fs.mkdtempSync('/tmp/eot-chrome-'),
    'about:blank',
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] },
)
let socket,
  stderr = ''
const pending = new Map()
let id = 0
const errors = []
const endpoint = new Promise((resolve, reject) => {
  chrome.stderr.on('data', (b) => {
    stderr += b
    const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/)
    if (match) resolve(match[1])
  })
  chrome.on('exit', (code) => reject(Error('Chrome exited: ' + code)))
  setTimeout(() => reject(Error('Chrome startup timeout')), 12000).unref()
})
function send(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const n = ++id
    pending.set(n, { resolve, reject })
    socket.send(
      JSON.stringify({
        id: n,
        method,
        params,
        ...(sessionId ? { sessionId } : {}),
      }),
    )
    setTimeout(() => {
      if (pending.has(n)) {
        pending.delete(n)
        reject(Error('CDP timeout: ' + method))
      }
    }, 15000).unref()
  })
}
;(async () => {
  socket = new WebSocket(await endpoint)
  await new Promise((r, j) => {
    socket.once('open', r)
    socket.once('error', j)
  })
  socket.on('message', (data) => {
    const m = JSON.parse(data)
    if (m.id && pending.has(m.id)) {
      const p = pending.get(m.id)
      pending.delete(m.id)
      m.error ? p.reject(Error(JSON.stringify(m.error))) : p.resolve(m.result)
    } else if (m.method === 'Runtime.exceptionThrown')
      errors.push(
        m.params.exceptionDetails.exception?.description ??
          m.params.exceptionDetails.text,
      )
  })
  const { targetId } = await send('Target.createTarget', {
      url: 'about:blank',
    }),
    { sessionId } = await send('Target.attachToTarget', {
      targetId,
      flatten: true,
    })
  const cdp = (m, p) => send(m, p, sessionId)
  await cdp('Page.enable')
  await cdp('Runtime.enable')
  const evaluate = async (expression) => {
    const r = await cdp('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })
    if (r.exceptionDetails)
      throw Error(
        r.exceptionDetails.exception?.description ?? r.exceptionDetails.text,
      )
    return r.result.value
  }
  const waitFor = async (expression, label) => {
    for (let i = 0; i < 60; i++) {
      if (await evaluate(expression)) return
      await sleep(100)
    }
    throw Error('Timed out: ' + label)
  }
  const navigate = async (route) => {
    await cdp('Page.navigate', {
      url: (process.env.I18N_BASE_URL ?? 'http://127.0.0.1:3104') + route,
    })
    await waitFor(
      "document.readyState==='complete' && !!document.querySelector('main')",
      route,
    )
    await sleep(700)
  }
  const click = (selector) =>
    evaluate(
      `(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing selector: '+${JSON.stringify(selector)});e.click();return true})()`,
    )
  const screenshot = async (file) => {
    const r = await cdp('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    })
    fs.writeFileSync(file, Buffer.from(r.data, 'base64'))
  }
  await cdp('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await navigate('/en')
  assert.equal(await evaluate('document.documentElement.lang'), 'en')
  assert.equal(
    await evaluate('document.documentElement.scrollWidth<=innerWidth'),
    true,
    'English desktop overflow',
  )
  await screenshot('/tmp/eot-i18n-en-desktop.png')
  await navigate('/en/tours/10-day-historic-route?party=2&party=3#enquire')
  const englishTitle = await evaluate('document.querySelector("h1").innerText')
  await click('header [aria-haspopup="listbox"]')
  await evaluate(
    'Array.from(document.querySelectorAll("[role=option]")).find(e=>e.textContent.includes("Français")).click()',
  )
  await waitFor(
    'location.pathname==="/fr/tours/10-day-historic-route" && document.documentElement.lang==="fr"',
    'French language switch',
  )
  assert.equal(
    await evaluate('location.search+location.hash'),
    '?party=2&party=3#enquire',
    'switch preserves repeated query keys and hash',
  )
  assert.notEqual(
    await evaluate('document.querySelector("h1").innerText'),
    englishTitle,
  )
  console.log(
    'PASS: language switching preserves the tour, repeated query keys and anchor.',
  )
  for (const [locale, route] of [
    ['fr', 'tours'],
    ['es', 'blog'],
  ]) {
    await navigate(`/${locale}/${route}`)
    const all = await evaluate(
      'document.querySelector("main [role=group]").nextElementSibling.children.length',
    )
    await click('main [role=group] button:nth-child(2)')
    await waitFor(
      'document.querySelector("main [role=group] button:nth-child(2)").getAttribute("aria-pressed")==="true"',
      'filter selected',
    )
    const filtered = await evaluate(
      'document.querySelector("main [role=group]").nextElementSibling.children.length',
    )
    assert.ok(
      filtered > 0 && filtered < all,
      `${locale} ${route}: filter count`,
    )
    await click('main [role=group] button')
    await waitFor(
      `document.querySelector('main [role=group]').nextElementSibling.children.length===${all}`,
      'canonical filter reset',
    )
  }
  console.log('PASS: French tour and Spanish article filters and reset.')
  await navigate('/fr/tours/10-day-historic-route')
  await evaluate(
    `window.__success=false;window.__posted=[];const realFetch=fetch.bind(window);window.fetch=async(input,init)=>{if(init?.method==='POST'){if(!['/api/v1/contact','/api/v1/subscribe'].includes(String(input)))throw Error('Unexpected POST blocked');window.__posted.push({path:String(input),body:JSON.parse(init.body)});return new Response(JSON.stringify({success:window.__success,message:'Simulated backend error in English',data:null}),{status:window.__success?200:400,headers:{'Content-Type':'application/json'}})}return realFetch(input,init)};`,
  )
  await evaluate(`document.querySelector('#name').form.requestSubmit()`)
  assert.notEqual(
    await evaluate('document.querySelector("#name").validationMessage'),
    'Please fill out this field.',
    'French native validation',
  )
  await evaluate(
    `(()=>{const form=document.querySelector('#name').form;for(const [selector,value]of [['#name','Test traveller'],['#email','test@example.com'],['#travellers','2 travellers'],['#phone','7700 900123'],['#dream','Bonjour, mon voyage personnel.']]){const el=form.querySelector(selector);el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}))}form.requestSubmit()})()`,
  )
  await waitFor(
    '!!document.querySelector("main [role=alert]")',
    'localized enquiry error',
  )
  assert.ok(
    !(
      await evaluate('document.querySelector("main [role=alert]").innerText')
    ).includes('Simulated backend error'),
  )
  await evaluate(
    'window.__success=true;document.querySelector("#name").form.requestSubmit()',
  )
  await waitFor('!document.querySelector("#name")', 'enquiry success')
  const payload = await evaluate(
    'window.__posted.find(p=>p.path==="/api/v1/contact").body',
  )
  assert.ok(
    payload.message.includes(`Journey: ${englishTitle}`),
    'canonical English tour context',
  )
  assert.ok(
    payload.message.includes('Bonjour, mon voyage personnel.'),
    'free text preserved',
  )
  assert.ok(
    payload.message.includes('Travellers: 2 travellers'),
    'canonical English group size',
  )
  assert.ok(
    /Mobile \/ WhatsApp: (\+\d+ )?7700 900123/.test(payload.message),
    'phone number sent',
  )
  await evaluate(
    `window.__success=false;const el=document.querySelector('footer input[type=email]');el.value='test@example.com';el.dispatchEvent(new Event('input',{bubbles:true}));el.form.requestSubmit()`,
  )
  await waitFor(
    '!!document.querySelector("footer [role=alert]")',
    'newsletter localized error',
  )
  assert.ok(
    !(
      await evaluate('document.querySelector("footer [role=alert]").innerText')
    ).includes('Simulated backend error'),
  )
  await evaluate(
    'window.__success=true;document.querySelector("footer input[type=email]").form.requestSubmit()',
  )
  await waitFor(
    '!document.querySelector("footer input[type=email]")',
    'newsletter success',
  )
  console.log(
    'PASS: French validation and mocked enquiry/newsletter error and success; canonical context and free text preserved.',
  )
  await cdp('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await navigate('/es/destinations/lalibela')
  assert.equal(
    await evaluate('document.documentElement.scrollWidth<=innerWidth'),
    true,
    'Spanish mobile overflow',
  )
  await click('header button[aria-expanded]:not([aria-haspopup])')
  await waitFor(
    'document.querySelector("header button[aria-expanded]:not([aria-haspopup])").getAttribute("aria-expanded")==="true"',
    'mobile menu open',
  )
  await evaluate(
    'Array.from(document.querySelectorAll("button")).find(e=>e.textContent.trim()==="Français"&&!e.hasAttribute("role")).click()',
  )
  await waitFor(
    'location.pathname==="/fr/destinations/lalibela"&&document.documentElement.lang==="fr"',
    'mobile French switch',
  )
  assert.equal(
    await evaluate(
      'document.querySelector("header button[aria-expanded]:not([aria-haspopup])").getAttribute("aria-expanded")',
    ),
    'false',
  )
  assert.equal(
    await evaluate('document.documentElement.scrollWidth<=innerWidth'),
    true,
    'French mobile overflow',
  )
  await screenshot('/tmp/eot-i18n-fr-mobile.png')
  console.log(
    'PASS: mobile navigation, language switching, translated destination and overflow.',
  )
  for (const [locale, route] of [
    ['en', '/en/unknown'],
    ['fr', '/fr/tours/unknown'],
    ['es', '/es/blog/unknown'],
  ]) {
    await navigate(route)
    assert.equal(await evaluate('document.documentElement.lang'), locale)
    assert.ok(
      await evaluate('!!document.querySelector("main h1")'),
      'localized not-found heading',
    )
  }
  console.log('PASS: localized unknown-page and unknown-entity screens.')
  assert.deepEqual(errors, [], 'uncaught browser exceptions')
  console.log(
    'PASS: no uncaught browser exceptions. Screenshots saved under /tmp/eot-i18n-*.png.',
  )
})()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    if (socket?.readyState === WebSocket.OPEN) {
      await send('Browser.close').catch(() => {})
      socket.close()
    }
    chrome.kill()
  })
