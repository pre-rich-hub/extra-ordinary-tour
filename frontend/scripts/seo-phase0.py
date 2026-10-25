#!/usr/bin/env python3
"""Generate planning CSVs from captured Phase 0 evidence; does not change public pages.
Run after seo-baseline.py. Legacy decisions are explicit inputs, never auto-approved by similarity.
"""
import csv, json, re, subprocess, unicodedata
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/seo'

def write(name,rows):
    if not rows:return
    with (OUT/name).open('w',newline='',encoding='utf-8')as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader()
        for row in rows:w.writerow({k:json.dumps(v,ensure_ascii=False)if isinstance(v,(list,dict))else v for k,v in row.items()})

def catalogue():
    code="import {catalogueSpecs,readCatalogue} from './scripts/i18n-catalogue.mjs';console.log(JSON.stringify(Object.fromEntries(catalogueSpecs.map(s=>[s.feature,readCatalogue(s)]))))"
    return json.loads(subprocess.check_output(['node','--input-type=module','-e',code],cwd=ROOT,text=True))

FIXED={
 'home':('commercial/custom','custom private journeys',{'en':'private Ethiopia tours','es':'viajes privados a Etiopía','fr':'circuits privés en Éthiopie'}),
 'about':('branded/research','business identity and local team',{'en':'Extraordinary Ethiopia Tours local operator','es':'Extraordinary Ethiopia Tours operador local','fr':'Extraordinary Ethiopia Tours agence locale'}),
 'contact':('branded/contact','enquiry and trip planning contact',{'en':'Extraordinary Ethiopia Tours contact','es':'contacto Extraordinary Ethiopia Tours','fr':'contacter Extraordinary Ethiopia Tours'}),
 'tours':('commercial/collection','compare itineraries and travel styles',{'en':'Ethiopia tour packages','es':'circuitos por Etiopía','fr':'circuits en Éthiopie'}),
 'destinations':('informational/collection','choose places and regions',{'en':'places to visit in Ethiopia','es':'lugares que visitar en Etiopía','fr':'lieux à visiter en Éthiopie'}),
 'layover':('commercial/layover','use an Addis Ababa stopover',{'en':'Addis Ababa layover tours','es':'excursiones de escala en Adís Abeba','fr':'visites pendant une escale à Addis-Abeba'}),
 'blog':('informational/collection','browse practical and cultural guides',{'en':'Ethiopia travel guides','es':'guías de viaje a Etiopía','fr':'guides de voyage en Éthiopie'}),
}
POSTS={
 'best-time-to-visit-ethiopia':('seasonal-planning','when to go by region', ['best time to visit Ethiopia','mejor época para viajar a Etiopía','meilleure période pour visiter l’Éthiopie']),
 'ethiopian-meskel-celebration':('meskel','festival traditions and attending', ['Meskel festival Ethiopia','festival de Meskel en Etiopía','fête de Meskel en Éthiopie']),
 'omo-valley-tribes-explained':('omo-valley','cultural context and respectful visits', ['Omo Valley peoples and cultures','pueblos y culturas del valle del Omo','peuples et cultures de la vallée de l’Omo']),
 'travel-in-ethiopia':('ethiopia-overview','broad trip planning and routes', ['Ethiopia travel guide','guía para viajar por Etiopía','guide pour voyager en Éthiopie']),
 'complete-guide-to-lalibela':('lalibela','town visit planning and logistics', ['Lalibela travel guide','guía de viaje a Lalibela','guide de voyage à Lalibela']),
 'danakil-depression-travel-guide':('danakil','planning conditions and route information', ['Danakil Depression travel guide','guía de viaje a la depresión del Danakil','guide de voyage dans la dépression du Danakil']),
 'ethiopia-a-journey-through-the-cradle-of-humanity':('ethiopia-history','archaeology and human origins', ['Ethiopia cradle of humanity','Etiopía cuna de la humanidad','Éthiopie berceau de l’humanité']),
 'lalibela-named-among-the-worlds-top-5-unesco-sites':('lalibela','heritage recognition; verify the ranking source', ['Lalibela UNESCO heritage recognition','reconocimiento del patrimonio de Lalibela por la UNESCO','reconnaissance du patrimoine de Lalibela par l’UNESCO']),
 'simien-mountains-trekking-guide':('simien','trek preparation and practical route guidance', ['Simien Mountains trekking guide','guía de senderismo por las montañas Simien','guide de randonnée dans les montagnes du Simien']),
 'lalibela-churches-guide':('lalibela','church sites, history and visiting details', ['Lalibela rock hewn churches guide','guía de las iglesias excavadas en la roca de Lalibela','guide des églises rupestres de Lalibela']),
 'about-ethiopia':('ethiopia-history','country history and cultural background', ['Ethiopia history and culture','historia y cultura de Etiopía','histoire et culture de l’Éthiopie']),
 'what-to-know-before-visiting-ethiopia':('practical-planning','first visit preparation overview', ['what to know before visiting Ethiopia','qué saber antes de viajar a Etiopía','que savoir avant de voyager en Éthiopie']),
 'essential-travel-information':('practical-planning','entry, health, money and practical essentials', ['Ethiopia essential travel information','información práctica para viajar a Etiopía','informations pratiques pour voyager en Éthiopie']),
}

def topic(slug):
    rules=[('lalibela',['lalibela','yemrehanna','asheton','abune-yosef']),('simien',['simien']),('bale',['bale','sof-omar']),('danakil',['danakil','afar','erta-ale']),('omo-valley',['omo','konso','people','dorze','arba-minch']),('coffee',['coffee','kaffa','yirgacheffe']),('timkat',['timkat']),('genna',['genna','christmas']),('meskel',['meskel']),('historic-route',['historic','history','axum','gondar','tigray','gheralta','yeha','negash','bahir-dar','blue-nile']),('addis',['addis','adadi','tiya','debre-libanos','wenchi','entoto','unity-park','menagesha','museums']),('birding',['birding']),('wildlife',['safari','wildlife','national-park','abijatta','rift-valley'])]
    return next((key for key,terms in rules if any(term in slug for term in terms)),slug)


def generate_intents(inventory, data):
    lookup={feature:{r['slug']:r for r in data[feature]}for feature in ['tours','destinations','blog']}
    overlays={(f,l):json.loads((ROOT/f'src/features/{f}/data/locales/{l}.json').read_text())for f in lookup for l in ['es','fr']}
    rows=[]
    for route in inventory:
        locale=route['locale'];kind=route['page_type'];slug=route['entity_slug'];path='/'+route['url'].split('/',3)[3];country={'en':'Ethiopia','es':'Etiopía','fr':'Éthiopie'}[locale]
        if not slug:
            intent,angle,queries=FIXED[kind];query=queries[locale];cluster='ethiopia-overview' if kind in ['home','tours','destinations','blog']else kind
        elif kind=='blog-detail':
            cluster,angle,queries=POSTS[slug];query=queries[['en','es','fr'].index(locale)];intent='informational/article'
        else:
            feature='tours'if kind=='tours-detail'else'destinations';source=lookup[feature][slug]
            name=source['title'if feature=='tours'else'name']if locale=='en'else overlays[(feature,locale)][slug]['title'if feature=='tours'else'name']
            cluster=topic(slug)
            if feature=='tours':
                intent='transactional/specific-itinerary';angle='specific duration, route and travel style';query=name if re.search(r'(?:ethiop|etiop)',unicodedata.normalize('NFKD',name).encode('ascii','ignore').decode().lower())else name+' '+country
            else:
                intent='informational/destination';angle='place overview and relevant journey connections'
                if slug.endswith('-people'):
                    intent='informational/cultural-group';angle='cultural background and respectful visit information';query={'en':f'{name} Ethiopia culture','es':f'cultura de {name} en Etiopía','fr':f'culture de {name} en Éthiopie'}[locale]
                else:query={'en':f'{name} travel guide','es':f'guía para visitar {name}','fr':f'guide pour visiter {name}'}[locale]
        rows.append({'url':route['url'],'locale':locale,'page_type':kind,'entity_slug':slug,'current_h1':json.loads(route['h1']),'primary_intent':intent,'primary_query_hypothesis':query,'content_angle':angle,'topic_cluster':cluster,'conversion_goal':'journey_enquiry'if kind in ['home','tours','tours-detail','layover','contact']else'visit_relevant_tour_or_planning_page','potential_overlap_urls':[],'overlap_handling':'','query_evidence':'unmeasured planning hypothesis; derived from existing page content; no volume or rank claim'})
    for row in rows:
        peers=[p['url'] for p in rows if p['locale']==row['locale']and p['topic_cluster']==row['topic_cluster']and p['url']!=row['url']and p['page_type']==row['page_type']]
        if row['topic_cluster'] in ['lalibela','practical-planning','ethiopia-history','ethiopia-overview']and peers:
            row['potential_overlap_urls']=peers;row['overlap_handling']='Differentiate the stated content angle in Phase 2/4. Do not remove pages or assume cannibalization without query evidence.'
    write('search-intent-map.csv',rows)
    assert len(rows)==399 and len({r['url']for r in rows})==399
    print('Search intent: 399 locale-specific planning rows',flush=True)


def generate_legacy(inventory):
    source=OUT/'legacy-discovery.json'
    if not source.exists(): print('Legacy capture is not ready; rerun after crawl completes',flush=True);return
    legacy=json.loads(source.read_text());decisions_path=OUT/'legacy-url-decisions.json'
    decisions=json.loads(decisions_path.read_text())if decisions_path.exists()else{}
    from urllib.parse import urlsplit
    valid={r['url'] for r in inventory};rows=[]
    for page in legacy['pages']:
        parsed=urlsplit(page['url']);path=parsed.path+('?' + parsed.query if parsed.query else '');decision=decisions.get(path)
        if decision:
            target='https://extraordinaryethiopiatours.com'+decision['target']if decision.get('target')else''
            assert not target or target in valid,(path,target)
            action=decision['action'];reason=decision['reason'];confidence=decision.get('confidence','high')
        else:
            target='';action='resolve_before_launch';confidence='unresolved';reason='No explicit content-equivalent target selected. Do not use a blanket homepage or tour-index redirect.'
            if any(s in path for s in ['/category/','/author/','elementskit','header','footer']):reason='WordPress archive/template: determine whether indexed or linked before consolidation or retirement.'
        rows.append({'old_url':page['url'],'old_initial_status':page.get('initial_status',page['status']),'old_final_status':page['status'],'old_redirect_chain':page.get('redirect_chain',[]),'old_resolved_url':page['resolved_url'],'old_title':page['title'],'old_h1':page['h1'],'old_canonical':page['canonical'],'old_robots':page['robots'],'new_canonical_url':target,'proposed_action':action,'reason':reason,'confidence':confidence,'implementation_status':'planning_only; no redirect implemented','discovery_source_count':len(page['discovered_from']),'sample_discovered_from':sorted(page['discovered_from'], key=lambda s:(not s.endswith('.xml'),s))[:3]})
    write('legacy-url-map.csv',rows);print(f'Legacy map: {len(rows)} rows; {sum(bool(r["new_canonical_url"])for r in rows)} explicit targets',flush=True)

if __name__=='__main__':
    inventory=list(csv.DictReader((OUT/'route-inventory.csv').open(encoding='utf-8')))
    generate_intents(inventory,catalogue());generate_legacy(inventory)
