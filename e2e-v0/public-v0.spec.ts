import { expect, test } from '@playwright/test'

const routes = ['/', '/nosotros', '/pastores', '/predicas', '/biblioteca', '/envivo', '/devocional', '/sedes', '/ministerios', '/celulas', '/oracion', '/nuevo', '/calendario', '/donaciones', '/boletin', '/redes', '/privacidad', '/contacto']

for (const width of [390, 1440]) {
  test(`published V0 routes and contact flow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    const submissions: unknown[] = []
    await page.route('**/*', async route => {
      const url = new URL(route.request().url())
      if (url.host !== '127.0.0.1:4276') return route.abort()
      if (url.pathname === '/api/data/site_documents') return route.fulfill({ json: [] })
      if (url.pathname === '/api/site/submit') {
        submissions.push(route.request().postDataJSON())
        return route.fulfill({ json: { ok: true } })
      }
      return route.continue()
    })
    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
      expect(response?.status()).toBe(200)
      await expect(page.locator('#public-main')).toBeVisible()
      await expect(page.getByRole('status').filter({ hasText: 'Cargando' })).toHaveCount(0)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await expect(page.getByText('Publicaremos aquí los canales de contacto', { exact: false })).toBeVisible()
    await expect(page.getByText('+595 981 123 456', { exact: false })).toHaveCount(0)
    await expect(page.getByText('Calle Principal, Ciudad del Este', { exact: false })).toHaveCount(0)
    await page.getByRole('button', { name: 'Enviar Mensaje', exact: true }).click()
    await expect(page.getByRole('alert')).toHaveText('Por favor complete todos los campos')
    expect(submissions).toHaveLength(0)
    await page.getByPlaceholder('Tu nombre completo').fill('QA local LVM')
    await page.getByPlaceholder('tu@email.com').fill('qa@example.invalid')
    await page.getByPlaceholder('¿En qué podemos ayudarte?').fill('Prueba interceptada')
    await page.getByRole('button', { name: 'Enviar Mensaje', exact: true }).click()
    await expect(page.getByRole('alert')).toHaveText('Mensaje recibido. Gracias por contactarnos.')
    expect(submissions).toEqual([{ kind: 'contacto', fields: { nombre: 'QA local LVM', email: 'qa@example.invalid', mensaje: 'Prueba interceptada' } }])
    expect(errors).toEqual([])
  })
}

test('contact details come from published Service content', async ({ page }) => {
  await page.route('**/api/data/site_documents**', route => route.fulfill({ json: [
    { collection: 'contacto', id: 'correo', data: { label: 'Correo', value: 'contacto@example.invalid' } },
    { collection: 'contacto', id: 'blank', data: { label: 'Sin publicar', value: '' } },
  ] }))
  await page.goto('/contacto')
  await expect(page.getByText('Correo: contacto@example.invalid', { exact: true })).toBeVisible()
  await expect(page.getByText('Sin publicar:', { exact: false })).toHaveCount(0)
})
