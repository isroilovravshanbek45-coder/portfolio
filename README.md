# Ravshan Isroilov — kreativ AI portfolio

O‘zbek tilidagi, mobil qurilmalarga mos bir sahifali portfolio. React, TypeScript, Vite va Three.js asosida qurilgan. Barcha vizual maketlar loyiha ichida saqlanadi; ishlash uchun tashqi AI API yoki maxfiy kalit kerak emas.

**Sayt:** https://isroilovravshanbek45-coder.github.io/portfolio/

## Ishga tushirish

Node.js 24 tavsiya qilinadi.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Nimalar ishlaydi?

- Scroll bo‘yicha faol navigatsiya, mobil menyu, klaviatura bilan boshqarish.
- Original WebGL portret maketi, yoritilgan orbital halqa va sichqoncha harakatiga javob. WebGL bo‘lmasa SVG maket ko‘rinadi.
- Ekrandan chiqib ketgan yoki yashirin tabdagi 3D animatsiya to‘xtaydi. Pixel ratio cheklangan, Three.js alohida chunk bo‘lib yuklanadi.
- Portfolio kategoriyalari, batafsil loyiha oynalari, Escape bilan yopish va fokusni qaytarish.
- Xizmatdan aloqa formasiga o‘tishda xizmat avtomatik tanlanadi.
- Forma validatsiyasi, xabarni ko‘rib chiqish, nusxalash va `.txt` sifatida saqlash.
- Reduced-motion qo‘llab-quvvatlashi, o‘z serveridan yuklanadigan shriftlar, lokal SVG vizuallar, SEO metama’lumotlari, sitemap.

## Surat va manzillarni almashtirish

`src/content.ts` ichidagi `site` obyektini o‘zgartiring:

```ts
export const site = {
  name: 'Ravshan Isroilov',
  telegram: 'https://t.me/haqiqiy_username',
  instagram: 'https://www.instagram.com/haqiqiy_username/',
  github: 'https://github.com/isroilovravshanbek45-coder',
  portrait: './images/ravshan.webp',
}
```

Suratni `public/images/ravshan.webp`ga joylashtiring. Portret uchun taxminan 640 × 760 px, tiniq yuz va sodda fon tavsiya qilinadi. `portrait` bo‘sh bo‘lsa, 3D maket ko‘rinadi. Haqiqiy surat berilsa, hero tarkibi o‘zgarmasdan surat ko‘rinadi.

Telegram va Instagram hozir **ataylab bo‘sh**: foydalanuvchi haqiqiy URL bermagan. Shuning uchun ularga soxta havola yaratilmagan; “tez orada” yozuvi ko‘rsatiladi. Telegram manzili qo‘shilgach, tayyor xabarni shu profilda ochish tugmasi paydo bo‘ladi; yuborishni foydalanuvchi o‘zi tasdiqlaydi.

**Forma backendga ulanmagan va ma’lumot yubormaydi.** “Xabar tayyorlash” faqat brauzerda matn yaratadi. Ma’lumotlar serverga jo‘natilmaydi yoki localStorage’da saqlanmaydi. Haqiqiy yuborish kerak bo‘lsa, serverdagi endpoint va uning real muvaffaqiyat/xato holatlari bilan integratsiya qiling; bot tokenini frontendga joylamang.

## Portfolio yangilash

`src/content.ts`dagi `projects` massivida sarlavha, kategoriya, tavsif, rasm va modal mazmunini almashtiring. Rasmlarni `public/art/` yoki `public/images/`ga qo‘ying. Hozirgi to‘rtta ish — original **konseptual namuna**, mijoz ishi yoki o‘lchangan tijoriy natija emas. Video kartasi statik storyboard, video ijro tugmasi sifatida ko‘rsatilmagan.

## Testlar

```sh
npx playwright install chromium
npm test
```

Desktop va mobil Chromium’da quyidagilar tekshiriladi:

- Sahifa, lokal rasmlar va WebGL yuklanishi; JavaScript xatolari.
- 320, 375, 768, 1024, 1440 px kenglikda gorizontal overflow bo‘lmasligi.
- Filtrlar, modal ochish/yopish, fokusni tiklash.
- Xizmat tanlash, noto‘g‘ri forma, to‘g‘ri forma va xabar eksporti.
- Mobil menyu, fokus chegarasi, Escape va anchor havolalar.
- Axe orqali avtomatik WCAG 2.2 AA tekshiruvlari va reduced-motion.
- WebGL mavjud bo‘lmagan qurilmada SVG portret va to‘g‘ri placeholder holatlari.

Avtomatik a11y testlari qo‘lda ekran o‘quvchi sinovining o‘rnini to‘liq bosmaydi.

Desktop va mobil ko‘rinishlarni `artifacts/`ga olish uchun server ishlab turganida `npm run screenshots`ni bajaring. Bu buyruq `public/social-preview.png`ni ham manba SVG’dan yangilaydi.

## GitHub Pages

`.github/workflows/deploy.yml` `main`ga push qilinganda build va testlardan so‘ng `dist/`ni GitHub Pages’ga chiqaradi. Repository → Settings → Pages → Source: **GitHub Actions** bo‘lishi kerak. Pull requestlarda faqat tekshiruvlar ishlaydi.

Maxsus domen qo‘shilsa, `index.html`dagi canonical, Open Graph va social-preview URL’larini, `public/robots.txt` va `public/sitemap.xml`ni ham yangilang. `vite.config.ts`dagi nisbiy base saytning `/portfolio/` ichida ishlashini ta’minlaydi.

## Tuzilishi

```text
src/content.ts   — shaxsiy manzillar va barcha takrorlanuvchi kontent
src/App.tsx      — sahifa, navigatsiya, filtrlar va aloqa formasi
src/Scene.tsx    — alohida yuklanadigan original 3D sahna
src/Dialog.tsx   — native dialog va fokusni qaytarish
src/styles.css  — dizayn tokenlari, komponentlar va responsive holatlar
public/art/     — mahalliy original SVG kompozitsiyalar
tests/          — funksional va accessibility browser testlari
docs/DESIGN.md  — dizayn qarorlari va rivojlantirish mezonlari
```

Inter va Space Grotesk shriftlarining OFL litsenziyalari `public/licenses/`da saqlangan. React, Three.js va Lucide tegishli ochiq kod litsenziyalari bilan npm orqali ishlatiladi. Vizual kompozitsiyalar ushbu portfolio uchun maxsus yaratilgan.
