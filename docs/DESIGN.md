# Dizayn yo‘nalishi

**Konsept:** insoniy tasavvurni raqamli shaklga aylantiruvchi mustaqil AI kreativ texnologning qorong‘i, tahririy va haykaltaroshlikka yaqin studiyasi.

Brend: ijodkor, aniq, ochiq. Chegaralar: korporativ emas, shovqinli emas, uydirma yutuqlarga tayanmaydi.

## Tizim

- Fon `#08090D`, qatlam `#10121A`, ko‘tarilgan sirt `#171A24`.
- Matn `#F5F7FF`, ikkilamchi `#A4A9BA`, chegara `#282B39`.
- Asosiy binafsha aksent: `#A78BFA` (o‘qiladigan ochroq variant), ikkilamchi `#8DDFEB`.
- Space Grotesk — sarlavha va texnik yorliqlar. Inter — asosiy matn. Shriftlar lokal paketdan bundlega kiradi.
- 4/8 px ritm; desktopda 1280 px konteyner; 112/80/64/40 px umumiy chet bo‘shliqlari.
- 4–7 px burchaklar; nozik chegaralar; kuchli soya faqat hero suzuvchi panellari va modalda.
- Primary CTA och binafsha, qora matn bilan. Secondary CTA tinchroq. Fokus moviy kontur bilan aniq ko‘rinadi.

## Tarkib va o‘ziga xoslik

Hero: chapda to‘rt qatorli asosiy fikr, o‘ngda 3D portret uchun maket, uning ortida orbital halqa. Haqiqiy surat berilsa maket almashadi. Suzuvchi kartochkalar g‘oya → AI → natija fikrini mustahkamlaydi.

Monogramma va orbital halqa ikki takrorlanuvchi motiv. Barcha bo‘limlar bir xil kartalarga aylantirilmagan: tahririy tanishtiruv, vizual ekspertiza, yirik ishlar, ochiq xizmat qatorlari, timeline, manifest va aloqa.

Portfolio uchun mualliflik SVG kompozitsiyalar: reklama maketi, landshaft/storyboard, metall shakl tadqiqoti va jarayon interfeysi. Barcha namunalarda konsept holati aniq ko‘rsatiladi. Mijoz, statistika, tajriba yili yoki tavsiya uydirilmagan.

## Harakat va moslashish

- Hover 200–650 ms; scroll kirishi yengil; suzuvchi panellar 8 s davrda 9 px.
- Three.js sahna alohida yuklanadi, ko‘rinmayotganda to‘xtaydi. Reduced-motion’da bir martalik statik render.
- 1050 px ostida mobil navigatsiya, 760 px ostida hero va asosiy bo‘limlar bir ustun.
- 760 px ostida timeline vertikal, shriftlar va CTA moslashadi. 390 px ostida formadagi qatorlar bir ustun.
- WebGL ishlamasa lokal SVG maket ko‘rinadi. Animatsiya ma’lumotni yashirmaydi.

## Holatlar va accessibility

Native `dialog` fokusni tutadi, Escape bilan yopiladi va avvalgi elementga fokus qaytadi. Filtrlar `aria-pressed`, faol navigatsiya `aria-current`, forma xatolari `aria-invalid`/`aria-describedby` bilan berilgan. “Asosiy mazmunga o‘tish” havolasi bor.

Manzil berilmagan ijtimoiy tarmoqlar havola kabi ishlamaydi; “tez orada” holatini ko‘rsatadi. Forma to‘g‘ri to‘ldirilsa ham yuborilgan deb aytmaydi. Faqat xabar qoralamasi, nusxa va fayl eksporti mavjud. Xato, focus, hover, faol va vaqtincha mavjud bo‘lmagan holatlar ishlangan.

Keyingi real kontentni kiritishda: portretning yuz qismi ochiq bo‘lsin, loyihada haqiqiy natija bo‘lsa uning dalili berilsin, ijtimoiy URL’lar tekshirilsin, yangi ranglar uchun contrast va klaviatura sinovi qayta ishlasin.
