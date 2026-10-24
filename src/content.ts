// All personal links and replaceable assets live here. Never invent profile URLs.
export const site = {
  name: 'Ravshan Isroilov',
  telegram: '', // [TELEGRAM_URL] e.g. https://t.me/your_username
  instagram: '', // [INSTAGRAM_URL] e.g. https://www.instagram.com/your_username/
  github: 'https://github.com/isroilovravshanbek45-coder',
  portrait: '', // Path relative to public/, e.g. './images/ravshan.webp'
}

export const navigation = [
  { id: 'bosh-sahifa', label: 'Bosh sahifa' },
  { id: 'men-haqimda', label: 'Men haqimda' },
  { id: 'yonalishlar', label: 'Yo‘nalishlar' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'xizmatlar', label: 'Xizmatlar' },
  { id: 'aloqa', label: 'Aloqa' },
]

export const expertise = [
  { title: 'AI & generativ AI', text: 'Generativ AI vositalari va zamonaviy modellar yordamida yangi g‘oyalar, vizuallar va amaliy yechimlar yaratish.', motif: 'generative', tag: 'G‘OYADAN IMKONIYATGA' },
  { title: 'Prompt engineering', text: 'AI modellaridan samarali foydalanish uchun aniq, strukturali va maqsadga yo‘naltirilgan promptlar ishlab chiqish.', motif: 'prompt', tag: 'ANIQ SO‘ROV. ANIQ NATIJA.' },
  { title: 'AI video yaratish', text: 'AI yordamida kreativ videolar, animatsiyalar, mahsulot reklamalari va vizual hikoyalar yaratish.', motif: 'video', tag: 'KADR ORTIDAGI G‘OYA' },
  { title: 'AI vizual dizayn', text: 'Brendlar, mahsulotlar va kreativ loyihalar uchun o‘ziga xos AI vizuallari va reklama konsepsiyalarini ishlab chiqish.', motif: 'visual', tag: 'E’TIBORNI TORTADIGAN VIZUAL' },
  { title: 'AI jarayonlar & avtomatlashtirish', text: 'AI vositalarini ish jarayonlariga moslashtirish va takroriy vazifalarni soddalashtirish.', motif: 'workflow', tag: 'KAMROQ TAKROR. KO‘PROQ IJOD.' },
]

export const filters = ['Barchasi', 'AI Video', 'Vizual', 'AI Loyihalar'] as const
export type Filter = typeof filters[number]
export type Project = {
  id: string; title: string; subtitle: string; description: string;
  category: Exclude<Filter, 'Barchasi'>; image: string; detail: string; deliverables: string[]
}
export const projects: Project[] = [
  { id: 'product', title: 'Mahsulot. Yangi nigoh.', subtitle: 'AI mahsulot kampaniyalari', category: 'Vizual', image: './art/product.svg', description: 'Mahsulotlarni e’tiborni tortadigan reklama vizuallari orqali namoyish etish.', detail: 'Yorug‘lik, material va kompozitsiya orqali mahsulot kayfiyatini ochib beruvchi reklama konsepsiyasi. Bu namuna vizual yo‘nalishni ko‘rsatish uchun yaratilgan; mijoz buyurtmasi yoki tayyor tijoriy kampaniya emas.', deliverables: ['Mahsulot uchun vizual yo‘nalish', 'Reklama kompozitsiyasi konsepsiyasi', 'Ijtimoiy tarmoq formatlariga moslash'] },
  { id: 'story', title: 'Bir kadr. Butun hikoya.', subtitle: 'AI video & vizual hikoyalar', category: 'AI Video', image: './art/story.svg', description: 'Qisqa videolar, kreativ animatsiyalar va vizual hikoyalar uchun konsepsiyalar.', detail: 'Sirli landshaft, kinematografik yorug‘lik va izchil ranglardan tuzilgan storyboard konsepsiyasi. Ushbu statik tasvir bo‘lajak video kayfiyatini ko‘rsatadi; tayyor video sifatida taqdim etilmaydi.', deliverables: ['Video g‘oyasi va ssenariy yo‘nalishi', 'Kadrlar uchun vizual til', 'AI animatsiya konsepsiyasi'] },
  { id: 'lab', title: 'Tasavvur chegarasidan tashqari.', subtitle: 'Kreativ prompt laboratoriyasi', category: 'Vizual', image: './art/lab.svg', description: 'Materiallar, yorug‘lik va noodatiy shakllar bilan kreativ tajribalar.', detail: 'Shisha, metall va organik shakllar uyg‘unligidagi eksperimental kompozitsiya. Bu mualliflik konsepti kreativ izlanish yo‘nalishini ifodalaydi. Haqiqiy AI ishlar va ishlatilgan promptlar keyinchalik qo‘shilishi mumkin.', deliverables: ['Kreativ vizual tadqiqot', 'Material va rang tajribalari', 'Qayta ishlatiladigan prompt yo‘nalishi'] },
  { id: 'business', title: 'Tartibli jarayon. Erkin ijod.', subtitle: 'Biznes uchun AI yechimlari', category: 'AI Loyihalar', image: './art/workflow.svg', description: 'G‘oyadan tayyor kontentgacha bo‘lgan jarayonni AI bilan soddalashtirish.', detail: 'Kontent yaratish jarayonini g‘oya, prompt, generatsiya va tekshirish bosqichlariga ajratuvchi namuna. Bu tushuntiruvchi sxema; mijoz tizimiga ulangan avtomatlashtirish yoki o‘lchangan biznes natijasi emas.', deliverables: ['Ish jarayonini tahlil qilish', 'AI vositalarini tanlash', 'Tekshirish bosqichlari bilan ish sxemasi'] },
]

export const services = [
  { title: 'AI reklama va kontent', text: 'Mahsulotlar va xizmatlar uchun kreativ reklama vizuallari, AI videolar va ijtimoiy tarmoqlarga mos kontent konsepsiyalarini ishlab chiqish.', cta: 'Kontent loyihasini muhokama qilish', icon: 'sparkles' },
  { title: 'Prompt engineering', text: 'AI vositalaridan samarali foydalanish uchun maxsus promptlar, prompt tizimlari va qayta foydalanish mumkin bo‘lgan shablonlar yaratish.', cta: 'Prompt loyihasini boshlash', icon: 'terminal' },
  { title: 'AI ish jarayonlari', text: 'AI vositalarini ish jarayonlariga moslashtirish, vazifalarni soddalashtirish va samarali ish usullarini ishlab chiqish.', cta: 'Yechimni muhokama qilish', icon: 'workflow' },
  { title: 'Kreativ AI konsepsiyalar', text: 'Brend, mahsulot yoki shaxsiy loyiha uchun noodatiy vizual yo‘nalishlar, kreativ g‘oyalar va zamonaviy raqamli konsepsiyalar ishlab chiqish.', cta: 'G‘oyam bor', icon: 'orbit' },
]

export const process = [
  { title: 'Tahlil', text: 'Vazifa, auditoriya, maqsad va kutilayotgan natijani aniqlaymiz.' },
  { title: 'Konsepsiya', text: 'Eng mos kreativ yondashuv, AI vositalari va ish rejasini tanlaymiz.' },
  { title: 'Yaratish', text: 'Kelishilgan konsepsiya asosida vizual, video yoki AI yechimini ishlab chiqamiz.' },
  { title: 'Takomillashtirish', text: 'Natijani ko‘rib chiqamiz va kerakli tuzatishlarni amalga oshiramiz.' },
]
