export async function submitPublicForm(kind: string, fields: Record<string,string>) {
  const response=await fetch('/api/site/submit', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,fields})})
  const result=await response.json()
  if(!response.ok) throw new Error(result.message || 'No se pudo guardar tu solicitud. Intentá nuevamente.')
}
