import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

const origin = process.env.LVM_VERIFY_ORIGIN || 'https://srv2137598.hstgr.cloud'
const output = process.env.LVM_VERIFY_OUTPUT || 'test-results/vps'
await mkdir(output,{recursive:true})
const browser = await chromium.launch({headless:true})
const email = `browser-${randomUUID()}@example.com`
const password = randomUUID()
const errors = []
const externalBackend = []
let created = false
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000}})
  page.on('pageerror',error=>errors.push(error.message))
  page.on('request',request=>{ if (/supabase\.(co|com)/.test(request.url())) externalBackend.push(request.url()) })
  await page.goto(origin,{waitUntil:'domcontentloaded'})
  await page.getByText('Un lugar para encontrar',{exact:false}).first().waitFor()
  await page.screenshot({path:`${output}/entrada-desktop.png`,fullPage:true})
  await page.setViewportSize({width:390,height:844})
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Public mobile overflow')
  await page.screenshot({path:`${output}/entrada-mobile.png`,fullPage:true})
  await page.getByRole('link',{name:/Ingresar a Worship/}).click()
  await page.waitForURL('**/app')
  await page.waitForLoadState('networkidle')
  await page.screenshot({path:`${output}/worship-mobile.png`,fullPage:true})
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Worship mobile overflow')
  await page.goto(`${origin}/songs`,{waitUntil:'networkidle'})
  assert.equal(await page.locator('body').innerText().then(text=>/failed to load/i.test(text)),false,'Catalog failed')
  const registration = await fetch(`${origin}/api/auth/signup`,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({email,password})})
  assert.equal(registration.status,201); created=true
  await page.goto(`${origin}/login`,{waitUntil:'networkidle'})
  await page.locator('#email').fill(email)
  await page.locator('#password').fill(password)
  await page.locator('button[type=submit]').click()
  await page.waitForURL(url=>url.pathname!=='/login')
  await page.goto(`${origin}/profile`,{waitUntil:'networkidle'})
  assert.equal(await page.evaluate(async()=>{const r=await fetch('/api/auth/session');return Boolean((await r.json()).session)}),true)
  const cookies = await page.context().cookies()
  assert.equal(cookies.find(cookie=>cookie.name==='__Host-lvm_session')?.httpOnly,true)
  assert.equal(await page.evaluate(async()=>{const keys=await caches.keys();for(const k of keys){const c=await caches.open(k);if((await c.keys()).some(r=>r.url.includes('/api/')))return true}return false}),false)
  assert.deepEqual(externalBackend,[])
  assert.deepEqual(errors,[])
  console.log('PASS: public entrance, mobile widths, Worship navigation, empty catalog, real browser login/profile, HttpOnly cookie, no cached API or Supabase requests')
} finally {
  await browser.close()
  if(created){
    const login=await fetch(`${origin}/api/auth/login`,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({email,password})})
    const cookie=login.headers.get('set-cookie')?.split(';')[0]
    assert.equal(login.status,200)
    const deletion=await fetch(`${origin}/api/data/rpc/delete_user`,{method:'POST',headers:{Origin:origin,Cookie:cookie,'Content-Type':'application/json'},body:'{}'})
    assert.equal(deletion.status,204,'Browser test account cleanup')
  }
}
