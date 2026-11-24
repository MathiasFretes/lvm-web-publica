import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
const origin=process.env.LVM_VERIFY_ORIGIN || 'https://srv2137598.hstgr.cloud'
const output='test-results/vps'
await mkdir(output,{recursive:true})
const browser=await chromium.launch({headless:true})
const routes=['/','/nosotros','/pastores','/predicas','/biblioteca','/envivo','/devocional','/sedes','/ministerios','/celulas','/oracion','/nuevo','/calendario','/donaciones','/boletin','/redes','/privacidad','/contacto']
const problems=[]
try {
  for(const width of [390,1440]){
    const context=await browser.newContext({viewport:{width,height:900}})
    const page=await context.newPage()
    page.on('pageerror',error=>problems.push(`${width}: ${error.message}`))
    page.on('request',request=>{if(/(supabase\.co|firestore\.googleapis\.com|identitytoolkit\.googleapis\.com)/.test(request.url()))problems.push(`External backend: ${request.url()}`)})
    for(const route of routes){
      const response=await page.goto(`${origin}${route}`,{waitUntil:'domcontentloaded'})
      assert.equal(response.status(),200,route)
      await page.locator('#public-main').waitFor()
      await page.getByRole('status').filter({hasText:'Cargando'}).waitFor({state:'hidden'}).catch(()=>{})
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Overflow ${width} ${route}`)
      if(route==='/') await page.screenshot({path:`${output}/v0-home-${width}.png`,fullPage:true})
      assert.equal((await page.locator('body').innerText()).includes('000-12345678'),false,'Sample bank account')
    }
    await context.close()
  }
  assert.deepEqual(problems,[])
  console.log(`PASS: ${routes.length} V0 public pages at mobile and desktop widths; no JavaScript errors, horizontal overflow, sample bank account or external database calls`)
} finally {await browser.close()}
