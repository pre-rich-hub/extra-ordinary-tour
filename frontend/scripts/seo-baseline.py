#!/usr/bin/env python3
"""Read-only Phase 0 crawl. Uses Python's standard library and the local production sitemap.
Run from frontend: python3 scripts/seo-baseline.py --project-base http://127.0.0.1:3104
Raw article bodies are not retained. No application or server configuration is changed.
"""
import argparse, collections, concurrent.futures, csv, datetime, hashlib, html, json, re, subprocess, time
from html.parser import HTMLParser
from pathlib import Path
from urllib import error, parse, request, robotparser
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
AGENT = 'Mozilla/5.0 (compatible; EOTSEOInventory/1.0; read-only baseline)'
DATE = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds')

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title, self.h1, self.links, self.canonicals, self.alternates, self.meta = [], [], [], [], [], {}
        self.lang = ''; self.jsonld = 0; self.active = None; self.buffer = []; self.heading = None; self.headings = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang', '')
        if tag == 'title' or tag == 'h1': self.active = tag; self.buffer = []
        if tag in ['h1','h2','h3','h4','h5','h6']: self.heading = tag; self.hbuf = []
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'meta':
            name = a.get('name', a.get('property', '')).lower()
            if name: self.meta.setdefault(name, []).append(a.get('content', ''))
        if tag == 'link':
            if 'canonical' in a.get('rel', '').split(): self.canonicals.append(a.get('href',''))
            if 'alternate' in a.get('rel', '').split() and a.get('hreflang'): self.alternates.append({'language':a['hreflang'],'url':a.get('href','')})
        if tag == 'script' and a.get('type') == 'application/ld+json': self.jsonld += 1
    def handle_data(self, data):
        if self.active: self.buffer.append(data)
        if self.heading: self.hbuf.append(data)
    def handle_endtag(self, tag):
        if tag == self.active:
            text = re.sub(r'\s+', ' ', ''.join(self.buffer)).strip()
            (self.title if tag == 'title' else self.h1).append(text)
            self.active = None
        if tag == self.heading:
            self.headings.append(re.sub(r'\s+', ' ', ''.join(self.hbuf)).strip()); self.heading = None
    def first(self, key): return self.meta.get(key, [''])[0]


class RedirectRecorder(request.HTTPRedirectHandler):
    def __init__(self): self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append({'url':req.full_url,'status':code,'location':parse.urljoin(req.full_url,newurl)})
        return super().redirect_request(req,fp,code,msg,headers,newurl)


def fetch(url, timeout=30):
    started = time.monotonic()
    redirects = RedirectRecorder()
    opener = request.build_opener(redirects)
    try:
        with opener.open(request.Request(url, headers={'User-Agent':AGENT}), timeout=timeout) as response:
            body = response.read().decode('utf-8', errors='replace')
            return {'initial_status': redirects.chain[0]['status'] if redirects.chain else response.status, 'redirect_chain': redirects.chain, 'status':response.status,'resolved_url':response.url,'body':body,'content_type':response.headers.get('Content-Type',''),'x_robots_tag':response.headers.get('X-Robots-Tag',''),'error':'','elapsed_ms':round((time.monotonic()-started)*1000)}
    except error.HTTPError as exc:
        return {'initial_status': redirects.chain[0]['status'] if redirects.chain else exc.code, 'redirect_chain': redirects.chain, 'status':exc.code,'resolved_url':exc.url,'body':exc.read().decode('utf-8',errors='replace'),'content_type':exc.headers.get('Content-Type',''),'x_robots_tag':exc.headers.get('X-Robots-Tag',''),'error':str(exc),'elapsed_ms':round((time.monotonic()-started)*1000)}
    except Exception as exc:
        return {'initial_status': redirects.chain[0]['status'] if redirects.chain else 0, 'redirect_chain': redirects.chain, 'status':0,'resolved_url':url,'body':'','content_type':'','x_robots_tag':'','error':str(exc),'elapsed_ms':round((time.monotonic()-started)*1000)}


def facts(url, response):
    page = Page(); page.feed(response['body'])
    title = page.title[0] if page.title else ''; description = page.first('description')
    row = {'url':url,'initial_status':response['initial_status'],'redirect_chain':response['redirect_chain'],'status':response['status'],'resolved_url':response['resolved_url'],'title':title,'title_characters':len(title),'description':description,'description_characters':len(description),'canonical':page.canonicals[0] if page.canonicals else '', 'canonical_count':len(page.canonicals),'robots':page.first('robots'),'googlebot':page.first('googlebot'),'x_robots_tag':response['x_robots_tag'],'html_lang':page.lang,'hreflang':page.alternates,'h1':page.h1,'h1_count':len(page.h1),'og_title':page.first('og:title'),'og_description':page.first('og:description'),'og_image':page.meta.get('og:image',[]),'og_image_alt':page.first('og:image:alt'),'twitter_card':page.first('twitter:card'),'twitter_image':page.meta.get('twitter:image',[]),'jsonld_blocks':page.jsonld,'error':response['error']}
    return row, page


def write_csv(file, rows, fields=None):
    if not rows: return
    fields = fields or list(rows[0])
    with file.open('w',newline='',encoding='utf-8') as out:
        writer=csv.DictWriter(out,fieldnames=fields); writer.writeheader()
        for row in rows: writer.writerow({k:json.dumps(row.get(k,''),ensure_ascii=False,sort_keys=True) if isinstance(row.get(k), (list,dict)) else row.get(k,'') for k in fields})


def project_inventory(base, output):
    sitemap = fetch(base+'/sitemap.xml'); assert sitemap['status']==200, sitemap['error']
    xml = ET.fromstring(sitemap['body']); urls = [node.find('{*}loc').text for node in xml.findall('{*}url')]
    assert len(urls)==399 and len(set(urls))==399, f'Expected 399 sitemap URLs, got {len(urls)}'
    def capture(url):
        path = parse.urlsplit(url).path; checked = base+path
        response=fetch(checked); row,page=facts(url,response)
        parts=path.strip('/').split('/'); row.update(locale=parts[0],page_type=('home' if len(parts)==1 else parts[1]+'-detail' if len(parts)==3 else parts[1]),entity_slug=parts[2] if len(parts)==3 else '',checked_url=checked,observed_at=DATE,environment='local-production-build')
        issues=[]
        if row['status']!=200: issues.append('non_200')
        if row['canonical']!=url: issues.append('canonical_mismatch')
        if row['h1_count']!=1: issues.append('h1_count_not_one')
        if not row['title']: issues.append('missing_title')
        if not row['description']: issues.append('missing_description')
        if not row['og_image']: issues.append('missing_og_image')
        if 'noindex' in (row['robots']+' '+row['x_robots_tag']): issues.append('unexpected_noindex')
        if len(row['hreflang'])!=4: issues.append('hreflang_count_not_four')
        row['observations']=issues
        return row
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: rows=list(pool.map(capture,urls))
    rows.sort(key=lambda r:r['url']); write_csv(output/'route-inventory.csv',rows)
    summary={'observed_at':DATE,'base':base,'build_id':(ROOT/'.next/BUILD_ID').read_text().strip(),'git_head':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),'rows':len(rows),'by_locale':dict(collections.Counter(r['locale'] for r in rows)),'by_type':dict(collections.Counter(r['page_type'] for r in rows)),'status_counts':dict(collections.Counter(str(r['status']) for r in rows)),'observations':dict(collections.Counter(i for r in rows for i in r['observations']))}
    for field in ['title','description']:
        duplicates=[]
        for locale in ['en','es','fr']:
            groups=collections.defaultdict(list)
            for row in rows:
                if row['locale']==locale and row[field]: groups[row[field]].append(row['url'])
            duplicates += [{'locale':locale,'value':v,'urls':group} for v,group in groups.items() if len(group)>1]
        summary['duplicate_'+field+'_groups']=duplicates
    (output/'project-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
    print(f'Project: {len(rows)} pages captured',flush=True)
    technical_probes(base, output)


def technical_probes(base, output):
    rows=[]
    for path in ['/','/about','/en','/en/tours/unknown','/fr/destinations/unknown','/en/blog/unknown','/de','/admin','/login']:
        response=fetch(base+path);row,page=facts(base+path,response)
        rows.append({'requested_path':path,'initial_status':response['initial_status'],'final_status':response['status'],'redirect_chain':response['redirect_chain'],'resolved_url':response['resolved_url'],'all_robots_meta':page.meta.get('robots',[]),'x_robots_tag':response['x_robots_tag'],'raw_html_lang':page.lang,'raw_html_h1':page.h1,'environment':'local-production-build','observed_at':DATE})
    write_csv(output/'technical-probes.csv',rows)
    print(f'Technical probes: {len(rows)} responses captured',flush=True)


def legacy_inventory(origin, output, max_pages):
    robots_response=fetch(origin+'/robots.txt'); robots=robotparser.RobotFileParser(); robots.parse(robots_response['body'].splitlines() if robots_response['status']==200 else [])
    if robots_response['status'] not in [200,404,410]:
        raise RuntimeError(f'Cannot safely crawl: robots.txt returned {robots_response["status"]}; no legacy HTML crawl performed')
    # Only public content on the client domain; skip media, admin actions, search and feeds.
    def normalize(value, parent=origin+'/'):
        url=parse.urlsplit(parse.urljoin(parent,html.unescape(value)))
        if url.scheme not in ['http','https'] or url.hostname not in [parse.urlsplit(origin).hostname,'www.'+parse.urlsplit(origin).hostname]: return None
        if re.search(r'/(?:wp-admin|wp-json|wp-includes|wp-content|feed)(?:/|$)|wp-login|xmlrpc',url.path): return None
        if re.search(r'\.(?:jpg|jpeg|png|webp|gif|svg|ico|pdf|zip|mp4|css|js|xml|txt)$',url.path,re.I): return None
        query=parse.parse_qs(url.query)
        if any(k in query for k in ['s','replytocom','add-to-cart','preview']): return None
        query={k:v for k,v in query.items() if not k.startswith('utm_') and k not in ['fbclid','gclid']}
        return parse.urlunsplit(('https',parse.urlsplit(origin).netloc,url.path or '/',parse.urlencode(query,doseq=True),''))
    discovery=collections.defaultdict(set); sources={}; sitemap_queue=[origin+'/sitemap.xml',origin+'/sitemap_index.xml']
    sitemap_queue += re.findall(r'^Sitemap:\s*(\S+)',robots_response['body'],re.M|re.I)
    seen_xml=set()
    while sitemap_queue and len(seen_xml)<40:
        url=sitemap_queue.pop(0)
        if url in seen_xml: continue
        if parse.urlsplit(url).scheme not in ['http','https'] or parse.urlsplit(url).hostname not in [parse.urlsplit(origin).hostname,'www.'+parse.urlsplit(origin).hostname]:
            sources[url]={'status':0,'error':'Skipped sitemap outside the authorized client host'}; seen_xml.add(url); continue
        seen_xml.add(url); response=fetch(url); sources[url]={'status':response['status'],'resolved_url':response['resolved_url'],'error':response['error']}
        if response['status']!=200: continue
        try: tree=ET.fromstring(response['body'])
        except ET.ParseError: continue
        if tree.tag.endswith('sitemapindex'):
            sitemap_queue += [n.find('{*}loc').text for n in tree.findall('{*}sitemap')]
        else:
            for n in tree.findall('{*}url'):
                target=normalize(n.find('{*}loc').text)
                if target: discovery[target].add(url)
        time.sleep(.2)
    discovery[origin+'/'].add('crawl_seed')
    seen=set(); rows=[]; skipped=[]; queue=collections.deque(sorted(discovery)); scheduled=set(queue)
    delay=max(robots.crawl_delay('EOTSEOInventory') or robots.crawl_delay('*') or 0,.35)
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        while queue and len(seen)<max_pages:
            batch=[]
            while queue and len(batch)<2 and len(seen)+len(batch)<max_pages:
                url=queue.popleft()
                if url in seen: continue
                seen.add(url)
                if robots_response['status']==200 and not robots.can_fetch('EOTSEOInventory',url): skipped.append({'url':url,'reason':'robots_disallow'}); continue
                batch.append(url)
            results=list(pool.map(fetch,batch))
            for url,response in zip(batch,results):
                row,page=facts(url,response); row['headings']=page.headings; row['observed_at']=DATE
                rows.append(row)
                if response['status']==200 and 'html' in response['content_type']:
                    for value in page.links:
                        target=normalize(value,response['resolved_url'])
                        if target:
                            discovery[target].add(url)
                            if target not in scheduled: scheduled.add(target); queue.append(target)
            if len(rows)%20<2: print(f'Legacy: {len(rows)} pages captured; {len(queue)} queued',flush=True)
            time.sleep(delay)
    for row in rows: row['discovered_from']=sorted(discovery[row['url']])
    rows.sort(key=lambda r:r['url']);write_csv(output/'legacy-inventory.csv',rows)
    # Persist only public SEO fields/links; never article bodies, cookies or account data.
    manifest={'observed_at':DATE,'origin':origin,'user_agent':AGENT,'robots_status':robots_response['status'],'robots_text':robots_response['body'] if robots_response['status']==200 else '', 'sitemaps':sources,'rows':len(rows),'status_counts':dict(collections.Counter(str(r['status']) for r in rows)),'initial_status_counts':dict(collections.Counter(str(r['initial_status']) for r in rows)),'skipped':skipped,'remaining_queue':list(queue),'page_limit':max_pages,'pages':rows}
    (output/'legacy-discovery.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print(f'Legacy: complete, {len(rows)} pages; {len(queue)} remaining',flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--project-base',default='http://127.0.0.1:3104')
    parser.add_argument('--legacy-origin',default='https://extraordinaryethiopiatours.com')
    parser.add_argument('--scope',choices=['project','legacy','all'],default='all')
    parser.add_argument('--max-legacy-pages',type=int,default=500)
    args=parser.parse_args(); output=ROOT/'docs/seo';output.mkdir(parents=True,exist_ok=True)
    if args.scope in ['all','project']: project_inventory(args.project_base.rstrip('/'),output)
    if args.scope in ['all','legacy']: legacy_inventory(args.legacy_origin.rstrip('/'),output,args.max_legacy_pages)
