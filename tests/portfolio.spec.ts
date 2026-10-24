import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('all sections, local artwork and responsive layout work without runtime errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  const failed: string[] = []
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1')) failed.push(response.url()) })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Kelajakni')
  await expect(page.locator('.scene-canvas canvas')).toBeVisible({ timeout: 20000 })
  for (const id of ['bosh-sahifa', 'men-haqimda', 'yonalishlar', 'portfolio', 'xizmatlar', 'aloqa']) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
  await page.locator('#portfolio').scrollIntoViewIfNeeded()
  await expect(page.locator('.project-card')).toHaveCount(4)
  await expect.poll(() => page.locator('.project-image-button img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), { message: `No overflow at ${width}px` }).toBe(true)
  }
  expect(errors).toEqual([])
  expect(failed).toEqual([])
})

test('category filters and project dialogs support keyboard and restore focus', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'AI Video', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'AI Video', exact: true })).toHaveAttribute('aria-pressed', 'true')
  const trigger = page.getByRole('button', { name: 'Bir kadr. Butun hikoya. — batafsil ko‘rish' })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('tayyor video sifatida taqdim etilmaydi')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await page.getByRole('button', { name: 'AI Loyihalar', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await page.getByRole('button', { name: 'Barchasi' }).click()
  await expect(page.locator('.project-card')).toHaveCount(4)
})

test('contact validation, service selection, honest draft and export work', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Prompt loyihasini boshlash' }).click()
  await expect(page.getByLabel('Qanday loyiha ustida ishlamoqchisiz?')).toHaveValue('Prompt engineering')
  await page.getByRole('button', { name: 'Xabar tayyorlash' }).click()
  await expect(page.getByLabel('Ismingiz')).toBeFocused()
  await expect(page.locator('.field-error')).toHaveCount(3)
  await page.getByLabel('Ismingiz').fill('Sinov foydalanuvchi')
  await page.getByLabel('Telegram yoki email').fill('not-valid')
  await page.getByLabel('Loyiha haqida qisqacha').fill('Mahsulotimiz uchun kreativ reklama loyihasini yaratmoqchimiz.')
  await page.getByRole('button', { name: 'Xabar tayyorlash' }).click()
  await expect(page.getByLabel('Telegram yoki email')).toHaveAttribute('aria-invalid', 'true')
  await page.getByLabel('Telegram yoki email').fill('@sinov_user')
  await page.getByRole('button', { name: 'Xabar tayyorlash' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('U hali yuborilmadi.')
  await expect(dialog.locator('pre')).toContainText('@sinov_user')
  const download = page.waitForEvent('download')
  await dialog.getByRole('button', { name: 'Saqlash', exact: true }).click()
  expect((await download).suggestedFilename()).toBe('ravshan-loyiha-xabari.txt')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Xabar tayyorlash' })).toBeFocused()
})

test('mobile menu supports anchors, focus containment and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: /Menyuni (ochish|yopish)/ })
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  const nav = page.getByRole('navigation', { name: 'Mobil navigatsiya' })
  await expect(nav.getByRole('link', { name: 'Bosh sahifa' })).toBeFocused()
  await nav.getByRole('link', { name: 'Aloqa' }).focus()
  await page.keyboard.press('Tab')
  await expect(menu).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await nav.getByRole('link', { name: 'Portfolio' }).click()
  await expect(nav).not.toBeVisible()
  await expect(page).toHaveURL(/#portfolio$/)
})

test('page and dialog meet WCAG 2.2 AA automatic checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.locator('#aloqa').scrollIntoViewIfNeeded()
  await page.waitForTimeout(600)
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
  expect(result.violations).toEqual([])
  await page.getByRole('button', { name: 'Mahsulot. Yangi nigoh. — batafsil ko‘rish' }).click()
  const modalResult = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
  expect(modalResult.violations).toEqual([])
  await page.keyboard.press('Escape')
  expect(await page.locator('.floating-tag').first().evaluate(el => getComputedStyle(el).animationName)).toBe('none')
})

test('WebGL-unavailable devices retain the portrait and missing social links stay honest', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
        if (type.includes('webgl')) return null
        return Reflect.apply(original, this, [type, ...args])
      },
    })
  })
  await page.goto('/')
  await expect(page.locator('.scene-canvas')).toBeAttached()
  await expect(page.locator('.scene-canvas canvas')).toHaveCount(0)
  const fallback = page.getByRole('img', { name: /Haqiqiy surat uchun ajratilgan joy/ })
  await expect(fallback).toBeVisible()
  expect(await fallback.evaluate(el => getComputedStyle(el).opacity)).toBe('0.65')
  await expect(page.locator('a[href=""], a[href="#"], a[href*="TELEGRAM_URL"], a[href*="INSTAGRAM_URL"]')).toHaveCount(0)
  await expect(page.locator('.contact-socials')).toContainText('tez orada')
})
