import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4175'
const output = join(process.cwd(), 'docs', 'screenshots')
await mkdir(output, { recursive: true })

const browser = await chromium.launch({ headless: true })
try {
  for (const [name, path] of [['inicio', '/'], ['eventos', '/eventos'], ['predicas', '/predicas'], ['sedes', '/sedes']]) {
    for (const [mode, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
      await page.goto(new URL(path, url).href)
      await page.screenshot({ path: join(output, `${name}-${mode}.jpg`), type: 'jpeg', quality: 78, fullPage: true })
      await page.close()
    }
  }
} finally {
  await browser.close()
}
