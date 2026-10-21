#!/usr/bin/env python3
"""Validate the captured Phase 0 evidence, not compliance of later SEO phases."""
import csv, json
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit

root=Path(__file__).resolve().parents[1]
folder=root/'docs/seo'
def rows(name):
    with (folder/name).open(encoding='utf-8',newline='')as file:return list(csv.DictReader(file))
project=rows('route-inventory.csv')
intents=rows('search-intent-map.csv')
legacy=rows('legacy-inventory.csv')
mapping=rows('legacy-url-map.csv')
discovery=json.loads((folder/'legacy-discovery.json').read_text())
summary=json.loads((folder/'project-summary.json').read_text())
decisions=json.loads((folder/'legacy-url-decisions.json').read_text())
urls={r['url']for r in project}
assert len(project)==len(urls)==399
assert Counter(r['locale']for r in project)=={'en':133,'es':133,'fr':133}
assert summary['rows']==len(project)
assert {r['url']for r in intents}==urls and len(intents)==len(project)
for row in project:
    assert row['status']=='200',row['url']
    assert row['canonical']==row['url'] and row['canonical_count']=='1',row['url']
    assert row['h1_count']=='1' and row['title'] and row['description'],row['url']
    assert 'noindex' not in row['robots'],row['url']
    alternates={v['language']:v['url']for v in json.loads(row['hreflang'])}
    suffix=urlsplit(row['url']).path[len('/'+row['locale']):]
    assert alternates=={l:'https://extraordinaryethiopiatours.com/'+('en'if l=='x-default'else l)+suffix for l in ['en','es','fr','x-default']},row['url']
for row in intents:
    assert row['primary_query_hypothesis'] and row['primary_intent'] and row['content_angle'],row['url']
    assert 'unmeasured' in row['query_evidence']
    assert all(p in urls for p in json.loads(row['potential_overlap_urls']))
old_urls={r['url']for r in legacy}
assert len(old_urls)==len(legacy)==discovery['rows']
assert {r['old_url']for r in mapping}==old_urls and len(mapping)==len(old_urls)
assert not discovery['remaining_queue'],'Crawl limit reached: do not claim complete public discovery'
for row in mapping:
    target=row['new_canonical_url']
    assert row['reason'] and row['implementation_status'].startswith('planning_only'),row['old_url']
    if target:assert target in urls,(row['old_url'],target)
    else:assert row['confidence']=='unresolved',row['old_url']
    parsed=urlsplit(row['old_url']);key=parsed.path+('?' +parsed.query if parsed.query else '')
    assert key in decisions,key
    if json.loads(row['old_redirect_chain']):assert row['old_initial_status']in ['301','302','303','307','308']
by_old={urlsplit(r['old_url']).path+('?' +urlsplit(r['old_url']).query if urlsplit(r['old_url']).query else ''):r for r in mapping}
assert by_old['/?elementskit_template=header']['new_canonical_url']==''
assert by_old['/?elementskit_template=footer']['new_canonical_url']==''
assert by_old['/lalibela/']['new_canonical_url'].endswith('/blog/lalibela-churches-guide')
assert by_old['/lalibela-tours/']['new_canonical_url'].endswith('/destinations/lalibela')
assert by_old['/omo-valley/']['new_canonical_url'].endswith('/tours/6-day-omo-valley-tribal-and-cultural')
probes=rows('technical-probes.csv');assert len(probes)==9
print(f'PASS: {len(project)} route rows, {len(intents)} intent rows, {len(legacy)} legacy rows and {len(mapping)} mapping rows; targets, locale alternatives, query identities and evidence structure checked.')
print(f'Migration proposals: {sum(bool(r["new_canonical_url"])for r in mapping)} targeted; {sum(not r["new_canonical_url"]for r in mapping)} explicitly unresolved. No application changes or redirect implementation.')
