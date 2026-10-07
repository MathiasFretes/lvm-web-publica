import { expect, test } from '@playwright/test'

const pages = [
  { path: '/', heading: /Un lugar para encontrar/ },
  { path: '/eventos', heading: /Calendario mensual/i },
  { path: '/predicas', heading: /Prédicas y series/i },
  { path: '/sedes', heading: /Nuestras sedes/i },
]

test('all preview routes work at desktop and mobile widths without overflow', async ({ page }) => {
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 844 })
    for (const route of pages) {
      await page.goto(route.path)
      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()
      await expect(page.getByRole('note')).toBeVisible()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
      expect(overflow, `${route.path} overflows at ${width}px`).toBeLessThanOrEqual(1)
    }
  }
})

test('event month, sermon filters, and venue selection are real interactions', async ({ page }) => {
  await page.goto('/eventos')
  await expect(page.getByRole('heading', { name: /octubre de 2026/i })).toBeVisible()
  await page.getByRole('button', { name: 'Mes siguiente' }).click()
  await expect(page.getByRole('heading', { name: /noviembre de 2026/i })).toBeVisible()
  await page.goto('/predicas')
  await page.getByRole('button', { name: 'Familias fuertes' }).click()
  await expect(page.getByRole('heading', { name: 'Una comunidad que acompaña' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Esperanza para el camino' })).toHaveCount(0)
  await page.goto('/sedes')
  await page.getByRole('button', { name: /San Antonio/ }).click()
  await expect(page.getByRole('region', { name: 'Detalles de la sede seleccionada' }).getByRole('heading', { name: 'San Antonio' })).toBeVisible()
})

test('mobile menu and bottom navigation lead to the same routes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  await page.getByRole('navigation', { name: 'Menú móvil' }).getByRole('link', { name: 'Eventos' }).click()
  await expect(page).toHaveURL(/\/eventos$/)
  await page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Sedes' }).click()
  await expect(page).toHaveURL(/\/sedes$/)
})
