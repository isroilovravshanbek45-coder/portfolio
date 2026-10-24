import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const baseURL = process.env.PREVIEW_URL || 'http://127.0.0.1:4173'
await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1040 }, deviceScaleFactor: 1 })
await page.goto(baseURL)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1500)
await page.screenshot({ path: 'artifacts/desktop-hero.png' })
await page.emulateMedia({ reducedMotion: 'reduce' })
await page.screenshot({ path: 'artifacts/desktop-full.png', fullPage: true })
for (const width of [320, 375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 })
  await page.waitForTimeout(350)
  const overflow = await page.evaluate(() => ({
    width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
    elements: [...document.querySelectorAll('body *')].filter(el => {
      const box = el.getBoundingClientRect()
      return box.right > innerWidth + 1 && getComputedStyle(el).position !== 'fixed'
    }).slice(0, 12).map(el => el.tagName + '.' + el.className),
  }))
  console.log(JSON.stringify(overflow))
}
await page.setViewportSize({ width: 390, height: 844 })
await page.goto(baseURL)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1000)
await page.screenshot({ path: 'artifacts/mobile-hero.png' })
await page.screenshot({ path: 'artifacts/mobile-full.png', fullPage: true })
await page.setViewportSize({ width: 1200, height: 630 })
await page.goto(`${baseURL}/social-preview.svg`)
await page.screenshot({ path: 'public/social-preview.png' })
await browser.close()
