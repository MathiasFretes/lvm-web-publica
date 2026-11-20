let cached, expires=0, request
async function content() {
  if(cached && expires>Date.now()) return cached
  if(!request) request=fetch('/api/data/site_documents?select=collection,id,data&published=eq.true', {credentials:'omit',cache:'no-store'}).then(async response=>{
    if(!response.ok) throw new Error('No se pudo cargar el contenido')
    const rows=await response.json()
    cached=rows
    expires=Date.now()+30000
    return rows
  }).finally(()=>{request=null})
  return request
}
function service(collection) {
  const getAll=async()=> (await content()).filter(row=>row.collection===collection).map(row=>({...row.data,id:row.id}))
  const subscribe=(callback,limit)=>{
    let active=true
    getAll().then(rows=>{if(active) callback(limit?rows.slice(0,limit):rows)}).catch(()=>{if(active)callback([])})
    const refresh=()=>getAll().then(rows=>{if(active)callback(rows)}).catch(()=>{})
    const timer=setInterval(refresh,30000)
    return ()=>{active=false;clearInterval(timer)}
  }
  return {getAll,subscribe,subscribeWithLimit:subscribe,subscribeApproved:callback=>subscribe(rows=>callback(rows.filter(row=>row.approved===true))),subscribeApprovedWithLimit:(callback,n)=>subscribe(rows=>callback(rows.filter(row=>row.approved===true).slice(0,n)))}
}
export const eventosService=service('eventos'), predicasService=service('predicas'), pastoresService=service('pastores'), ministeriosService=service('ministerios'), sedesService=service('sedes'), radiosService=service('radios'), redesService=service('redes'), testimoniosService=service('testimonios'), celulasService=service('celulas'), serviceTimesService=service('serviceTimes'), statsService=service('stats'), contactoService=service('contacto'), heroSlidesService=service('heroSlides'), valoresService=service('valores'), sermonesService=service('sermones')
const singleton=(id,callback)=>service('contenido').subscribe(rows=>callback(rows.find(row=>row.id===id)||null))
export const contenidoService={subscribeHome:callback=>singleton('home',callback),subscribeNosotros:callback=>singleton('nosotros',callback),subscribeGeneral:callback=>singleton('general',callback)}
