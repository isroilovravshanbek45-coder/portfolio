import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Check, CheckCheck, ChevronRight, Copy, Download, Film, Globe2, Layers3, Menu, Orbit, Send, Sparkles, Terminal, Workflow, X } from 'lucide-react'
import { Github, Instagram } from './Icons'
import { expertise, filters, navigation, process, projects, services, site } from './content'
import type { Filter, Project } from './content'
import Dialog from './Dialog'

const Scene = lazy(() => import('./Scene'))
const number = (n: number) => String(n + 1).padStart(2, '0')

function SectionHeading({ number: index, label, children, text }: { number: string; label: string; children: ReactNode; text?: string }) {
  return <div className="section-heading reveal"><div className="eyebrow"><span>{index}</span> / {label}</div><h2>{children}</h2>{text && <p>{text}</p>}</div>
}

function Social({ kind, className = '' }: { kind: 'telegram' | 'instagram' | 'github'; className?: string }) {
  const Icon = kind === 'telegram' ? Send : kind === 'instagram' ? Instagram : Github
  const label = kind === 'telegram' ? 'Telegram' : kind === 'instagram' ? 'Instagram' : 'GitHub'
  if (!site[kind]) return <span className={`social-unavailable ${className}`} aria-label={`${label} manzili hali qo‘shilmagan`}><Icon size={18} />{label}<span className="soon">tez orada</span></span>
  return <a className={className} href={site[kind]} target="_blank" rel="noopener noreferrer"><Icon size={18} />{label}<ArrowUpRight size={16} /></a>
}

function CapabilityArt({ kind }: { kind: string }) {
  if (kind === 'generative') return <div className="cap-art gen-art" aria-hidden="true"><i /><i /><i /><i /><i /><i /><span className="art-cross">+</span></div>
  if (kind === 'prompt') return <div className="cap-art code-art" aria-hidden="true"><div><i /><i /><i /><span>prompt.studio</span></div><p><em>g‘oya</em> + <em>aniqlik</em></p><p><span>→</span> yangi imkoniyat_</p><b /></div>
  if (kind === 'video') return <div className="cap-art video-art" aria-hidden="true"><div className="video-sun" /><Film size={30} strokeWidth={1} /><span>00:00:24 / AI VIZUAL</span></div>
  if (kind === 'visual') return <div className="cap-art visual-art" aria-hidden="true"><div /><div /><span>FORMA / RANG / G‘OYA</span></div>
  return <div className="cap-art flow-art" aria-hidden="true"><span>G‘OYA</span><ChevronRight size={17} /><b><Sparkles size={22} /></b><ChevronRight size={17} /><span>NATIJA<Check size={14} /></span></div>
}

type FormFields = { name: string; contact: string; type: string; message: string }
const initialFields: FormFields = { name: '', contact: '', type: '', message: '' }
type Errors = Partial<Record<keyof FormFields, string>>

function ContactForm({ selectedService }: { selectedService: string }) {
  const [fields, setFields] = useState<FormFields>(initialFields)
  const [errors, setErrors] = useState<Errors>({})
  const [draft, setDraft] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState('')
  const form = useRef<HTMLFormElement>(null)
  useEffect(() => { if (selectedService) setFields(prev => ({ ...prev, type: selectedService })) }, [selectedService])
  const update = (name: keyof FormFields, value: string) => {
    setFields(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (fields.name.trim().length < 2) next.name = 'Ismingizni kiriting (kamida 2 belgi).'
    const contact = fields.contact.trim()
    if (!/^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(contact) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) next.contact = 'Telegram username (@username) yoki to‘g‘ri email kiriting.'
    if (!fields.type) next.type = 'Loyiha yo‘nalishini tanlang.'
    if (fields.message.trim().length < 15) next.message = 'G‘oyangiz haqida kamida 15 belgidan iborat ma’lumot yozing.'
    setErrors(next)
    if (Object.keys(next).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setCopyStatus('')
    setDraft(`Salom, Ravshan!\n\nIsm: ${fields.name.trim()}\nAloqa: ${contact}\nYo‘nalish: ${fields.type}\n\n${fields.message.trim()}`)
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(draft!); setCopyStatus('Xabar nusxalandi. Uni tanlagan aloqa kanalingiz orqali yuboring.') }
    catch { setCopyStatus('Nusxalash imkoni bo‘lmadi. Matnni belgilang yoki fayl sifatida saqlang.') }
  }
  const download = () => {
    const url = URL.createObjectURL(new Blob([draft!], { type: 'text/plain;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url; anchor.download = 'ravshan-loyiha-xabari.txt'; anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const fieldProps = (name: keyof FormFields) => ({ id: name, name, value: fields[name], 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined })
  const error = (name: keyof FormFields) => errors[name] && <span className="field-error" id={`${name}-error`}>{errors[name]}</span>
  const telegramDraft = () => { const url = new URL(site.telegram); url.searchParams.set('text', draft!); return url.href }
  return <>
    <form ref={form} className="contact-form" onSubmit={submit} noValidate>
      <div className="form-top"><span className="tiny-label">G‘OYADAN BOSHLAYMIZ</span><Asterisk size={22} /></div>
      <div className="form-row">
        <div className="field"><label htmlFor="name">Ismingiz <span>*</span></label><input {...fieldProps('name')} placeholder="Ismingiz" autoComplete="name" maxLength={80} required onChange={e => update('name', e.target.value)} />{error('name')}</div>
        <div className="field"><label htmlFor="contact">Telegram yoki email <span>*</span></label><input {...fieldProps('contact')} placeholder="@username yoki email" autoComplete="email" maxLength={160} required onChange={e => update('contact', e.target.value)} />{error('contact')}</div>
      </div>
      <div className="field"><label htmlFor="type">Qanday loyiha ustida ishlamoqchisiz? <span>*</span></label><select {...fieldProps('type')} required onChange={e => update('type', e.target.value)}><option value="">Yo‘nalishni tanlang</option>{services.map(s => <option key={s.title}>{s.title}</option>)}<option>Boshqa g‘oya</option></select>{error('type')}</div>
      <div className="field"><label htmlFor="message">Loyiha haqida qisqacha <span>*</span></label><textarea {...fieldProps('message')} placeholder="G‘oyangiz, maqsadingiz va qanday natija kutayotganingiz haqida..." rows={4} maxLength={3000} required onChange={e => update('message', e.target.value)} />{error('message')}</div>
      <button type="submit" className="button button-primary form-submit">Xabar tayyorlash <ArrowUpRight size={19} /></button>
      <p className="form-note">Xabar avval ko‘rib chiqish uchun tayyorlanadi. {site.telegram ? 'Uni Telegram orqali o‘zingiz yuborasiz.' : 'Aloqa manzillari hali qo‘shilmagan. Hozircha matnni nusxalash yoki saqlash mumkin.'}</p>
    </form>
    {draft && <Dialog title="Loyihangiz haqida xabar" onClose={() => setDraft(null)}><p className="dialog-description">Xabar tayyor. U hali yuborilmadi.</p><pre className="message-preview">{draft}</pre><div className="dialog-actions"><button className="button button-primary" onClick={copy}><Copy size={17} />Nusxa olish</button><button className="button button-outline" onClick={download}><Download size={17} />Saqlash</button>{site.telegram && <a className="button button-outline" href={telegramDraft()} target="_blank" rel="noopener noreferrer">Telegram’da ochish<ArrowUpRight size={17} /></a>}</div><p role="status" className="copy-status">{copyStatus}</p></Dialog>}
  </>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('bosh-sahifa')
  const [filter, setFilter] = useState<Filter>('Barchasi')
  const [project, setProject] = useState<Project | null>(null)
  const [selectedService, setSelectedService] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setShowScene(true), reduced ? 600 : 200)
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveals.unobserve(entry.target) } })
    }, { threshold: 0.07 })
    document.querySelectorAll('.reveal').forEach(el => reveals.observe(el))
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 })
    navigation.forEach(item => { const el = document.getElementById(item.id); if (el) sectionObserver.observe(el) })
    return () => { clearTimeout(timer); reveals.disconnect(); sectionObserver.disconnect() }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const priorOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
      if (event.key === 'Tab') {
        const items = [menuButton.current!, ...Array.from(menuRef.current!.querySelectorAll<HTMLAnchorElement>('a'))]
        const first = items[0]; const last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    const resize = () => { if (window.innerWidth > 1050) setMenuOpen(false) }
    document.addEventListener('keydown', keydown)
    window.addEventListener('resize', resize)
    return () => { document.body.style.overflow = priorOverflow; document.removeEventListener('keydown', keydown); window.removeEventListener('resize', resize) }
  }, [menuOpen])

  const closeNavigation = (id: string) => {
    setMenuOpen(false)
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
  }
  const beginService = (title: string) => { setSelectedService(title); document.getElementById('aloqa')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }
  const visibleProjects = projects.filter(p => filter === 'Barchasi' || p.category === filter)
  return <>
    <a className="skip-link" href="#asosiy">Asosiy mazmunga o‘tish</a>
    <header className="site-header">
      <div className="header-inner container">
        <a className="wordmark" href="#bosh-sahifa" aria-label="Ravshan Isroilov — bosh sahifa">r<span className="wordmark-star">✳</span>i<span className="wordmark-dot">.</span></a>
        <nav className="desktop-nav" aria-label="Asosiy navigatsiya">{navigation.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>)}</nav>
        <a className="header-cta" href="#aloqa">Loyiha boshlash <ArrowUpRight size={17} /></a>
        <button className="icon-button menu-button" ref={menuButton} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {menuOpen && <div className="mobile-menu" id="mobile-menu" ref={menuRef}><nav aria-label="Mobil navigatsiya">{navigation.map((item, i) => <a key={item.id} href={`#${item.id}`} onClick={() => closeNavigation(item.id)}><span>{number(i)}</span>{item.label}<ArrowUpRight size={22} /></a>)}</nav><p>AI • KREATIVLIK • TEXNOLOGIYA</p></div>}
    </header>

    <main id="asosiy">
      <section className="hero container" id="bosh-sahifa" tabIndex={-1} aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="availability"><span />AI va kreativ loyihalar uchun ochiqman</div>
          <div className="hero-kicker tiny-label">RAVSHAN ISROILOV / AI KREATIV TEXNOLOG</div>
          <h1 id="hero-title">Kelajakni<br />kutmayman.<br /><span className="hero-line">Uni <span className="gradient-text">AI bilan</span></span><br /><span className="gradient-text">yarataman.</span><span className="title-dot">✳</span></h1>
          <p className="hero-description">Men <strong>Ravshan Isroilov</strong> — AI mutaxassisi, prompt engineer va AI kontent yaratuvchiman. G‘oyalarni kreativ vizuallar, videolar va amaliy raqamli yechimlarga aylantiraman.</p>
          <div className="hero-actions"><a className="button button-primary" href="#portfolio">Loyihalarimni ko‘rish <ArrowUpRight size={19} /></a><a className="button button-quiet" href="#aloqa">Men bilan bog‘lanish <ArrowRight size={18} /></a></div>
          <div className="hero-specialties"><span>AI KREATIV</span><i /><span>PROMPT ENGINEERING</span><i /><span>AVTOMATLASHTIRISH</span></div>
        </div>
        <div className={`hero-art ${site.portrait ? 'has-portrait' : ''}`}>
          <div className="art-coordinates tiny-label"><span>RI / 001</span><span>O‘ZBEKISTON / UZ</span></div>
          <div className="art-orbit" /><div className="art-grid" /><span className="art-corner corner-a" /><span className="art-corner corner-b" />
          {site.portrait ? <img className="real-portrait" src={site.portrait} alt="Ravshan Isroilov portreti" width={640} height={760} fetchPriority="high" /> : <><img className="portrait-fallback" src="./art/portrait.svg" alt="Haqiqiy surat uchun ajratilgan joy: abstrakt 3D portret maketi" width={640} height={760} fetchPriority="high" />{showScene && <Suspense fallback={null}><Scene /></Suspense>}</>}
          <div className="floating-tag tag-top"><span className="mini-orbit"><Orbit size={23} /></span><div><span className="tiny-label">G‘OYA → IMKONIYAT</span><strong>AI bilan yangi nigoh.</strong></div><span className="tag-light" /></div>
          <div className="floating-tag tag-prompt"><Terminal size={17} /><span>tasavvur <i>×</i> texnologiya<span className="typing-cursor">_</span></span></div>
          <div className="portrait-caption"><span className="tiny-label">{site.portrait ? 'RAVSHAN ISROILOV' : '3D PORTRET MAKETI'}</span><span>{site.portrait ? 'AI • KREATIV • TEXNOLOGIYA' : 'Haqiqiy surat tez orada'}</span></div>
          <div className="art-index">01 <span>/ ∞</span></div>
        </div>
        <div className="hero-bottom"><a href="#men-haqimda" className="scroll-cue"><span><ArrowDown size={15} /></span>Kashf qilish uchun pastga</a><span className="location"><Globe2 size={13} />O‘zbekiston · Dunyo uchun kreativ</span></div>
      </section>

      <div className="expertise-strip" aria-label="Asosiy yo‘nalishlar"><div className="container"><span>G‘OYA</span><Asterisk /><span>SUN’IY INTELLEKT</span><Asterisk /><span>KREATIVLIK</span><Asterisk /><span>YANGI IMKONIYATLAR</span><Asterisk /></div></div>

      <section className="section about container" id="men-haqimda" tabIndex={-1} aria-labelledby="about-title">
        <div className="about-grid">
          <div className="about-visual reveal"><span className="tiny-label">INSONIY G‘OYA. RAQAMLI IMKONIYAT.</span><div className="about-monogram" aria-hidden="true">r<span>✳</span>i.</div><div className="about-orbit" aria-hidden="true" /><div className="about-visual-bottom"><span>Ijod + texnologiya</span><ArrowUpRight size={27} /></div></div>
          <div className="about-copy reveal"><div className="eyebrow"><span>01</span> / MEN HAQIMDA</div><h2 id="about-title">Texnologiya — yangi imkoniyatlar yaratish <em>san’ati.</em></h2><p>Men sun’iy intellektni nafaqat texnologiya, balki fikrlash va yaratish imkoniyatlarini kengaytiruvchi vosita sifatida ko‘raman.</p><p>Maqsadim — AI yordamida ijodiy jarayonlarni tezlashtirish, murakkab vazifalarni soddalashtirish va bizneslar uchun yangi imkoniyatlar yaratish.</p><p>Yangi AI vositalarini o‘rganaman, ularni amalda sinab ko‘raman va foydali natijalarni real loyihalarga aylantiraman.</p></div>
        </div>
        <div className="principles reveal">{[{ title: 'O‘rganish', text: 'Yangi texnologiyalarni o‘rganish va ularning imkoniyatlarini sinash.' }, { title: 'Yaratish', text: 'G‘oyalarni kreativ kontent va amaliy yechimlarga aylantirish.' }, { title: 'Ulashish', text: 'AI imkoniyatlarini tushunarli va foydali shaklda boshqalar bilan bo‘lishish.' }].map((item, i) => <article key={item.title}><span className="principle-number">{number(i)}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight size={18} /></article>)}</div>
      </section>

      <section className="section capabilities container" id="yonalishlar" tabIndex={-1} aria-labelledby="expertise-title">
        <SectionHeading number="02" label="EKSPERTIZA">AI imkoniyatlari.<br /><span id="expertise-title" className="muted-title">Cheksiz kreativlik.</span></SectionHeading>
        <div className="capabilities-grid">{expertise.map((item, i) => <article className={`capability-card cap-${item.motif} reveal`} key={item.title}><div className="card-index">{number(i)}<ArrowUpRight size={18} /></div><CapabilityArt kind={item.motif} /><div className="capability-text"><span className="tiny-label">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
      </section>

      <section className="section portfolio-section" id="portfolio" tabIndex={-1} aria-labelledby="portfolio-title"><div className="container">
        <div className="portfolio-head"><SectionHeading number="03" label="TANLANGAN ISHLAR" text="AI yordamida yaratiladigan kreativ ishlar, vizual tajribalar va raqamli konsepsiyalar."><span id="portfolio-title">G‘oyalar vizual<br />tajribaga aylanganda.</span></SectionHeading><div className="portfolio-note"><span className="small-dot" />KONSEPTLAR & IZLANISHLAR</div></div>
        <div className="filter-row" role="group" aria-label="Portfolio filtrlari">{filters.map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'Barchasi' && <span>04</span>}</button>)}<span className="filter-count" role="status">{visibleProjects.length} ta konsept</span></div>
        <div className="projects-grid">{visibleProjects.map((item, i) => <article className={`project-card project-${item.id}`} key={item.id}><button className="project-image-button" onClick={() => setProject(item)} aria-label={`${item.title} — batafsil ko‘rish`}><img src={item.image} alt={item.subtitle + ' uchun mualliflik vizual konsepsiyasi'} width={960} height={720} loading="lazy" /><span className="concept-badge">KONSEPT / NAMUNA</span><span className="project-open"><ArrowUpRight size={23} /></span></button><div className="project-meta"><span>{item.category}</span><span>/{number(i)}</span></div><h3><button onClick={() => setProject(item)}>{item.title}<ArrowUpRight size={22} /></button></h3><p>{item.description}</p><button className="text-link project-detail" onClick={() => setProject(item)}>Batafsil ko‘rish <ArrowUpRight size={15} /></button></article>)}</div>
        <p className="concept-disclosure"><Layers3 size={16} />Bu vizuallar — konseptual namuna. Haqiqiy mijoz loyihalari sifatida ko‘rsatilmagan.</p>
      </div></section>

      <section className="section services-section container" id="xizmatlar" tabIndex={-1} aria-labelledby="services-title"><div className="services-intro"><SectionHeading number="04" label="XIZMATLAR" text="Har bir loyiha uchun maqsadga mos kreativ yondashuv va texnologik yechim."><span id="services-title">Biznesingizga<br /><em>yangi imkoniyatlar.</em></span></SectionHeading><span className="service-asterisk" aria-hidden="true">✳</span></div><div className="services-grid">{services.map((item, i) => { const Icon = [Sparkles, Terminal, Workflow, Orbit][i]; return <article className="service-card reveal" key={item.title}><div className="service-top"><Icon size={27} strokeWidth={1.4} /><span>/{number(i)}</span></div><h3>{item.title}</h3><p>{item.text}</p><button className="text-link" onClick={() => beginService(item.title)}>{item.cta}<ArrowUpRight size={17} /></button></article> })}</div></section>

      <section className="section process-section container" aria-labelledby="process-title"><SectionHeading number="05" label="JARAYON"><span id="process-title">Har bir loyiha —<br /><span className="muted-title">aniq maqsaddan boshlanadi.</span></span></SectionHeading><ol className="process-timeline reveal">{process.map((item, i) => <li key={item.title}><span className="step-node">{number(i)}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></section>

      <section className="manifesto" aria-label="Shaxsiy qarash"><div className="manifesto-orbit" aria-hidden="true" /><div className="container reveal"><span className="tiny-label">TEXNOLOGIYA + INSONIY TASAVVUR</span><h2>AI — imkoniyat.<br /><em>Kreativ fikrlash</em> — farq<span className="manifesto-period">.</span></h2><p>Texnologiyadan foydalanish muhim.<br />Undan qanday natija yaratish esa undan ham muhim.</p><Asterisk className="manifesto-star" size={48} strokeWidth={1} /></div></section>

      <section className="section contact-section container" id="aloqa" tabIndex={-1} aria-labelledby="contact-title"><div className="contact-copy reveal"><div className="eyebrow"><span>06</span> / BOG‘LANISH</div><h2 id="contact-title">Keyingi g‘oyangizni <em>birgalikda</em> yarataylik<ArrowUpRight className="contact-arrow" size={58} strokeWidth={1} /></h2><p>AI reklama, kreativ kontent yoki yangi raqamli loyiha ustida ishlamoqchimisiz? Menga loyihangiz haqida yozing.</p><div className="contact-socials"><Social kind="telegram" className="contact-social" /><Social kind="instagram" className="contact-social" /></div><div className="contact-footnote"><span className="small-dot" />G‘oyalar uchun doimo ochiqman.</div></div><div className="reveal"><ContactForm selectedService={selectedService} /></div></section>
    </main>

    <footer className="site-footer"><div className="container"><div className="footer-top"><a className="footer-brand" href="#bosh-sahifa">RAVSHAN<br />ISROILOV<span>✳</span></a><div className="footer-right"><p>AI • Kreativlik • Texnologiya</p><div className="footer-socials"><Social kind="instagram" /><Social kind="telegram" /><Social kind="github" /></div></div></div><div className="footer-bottom"><span>© 2026 Ravshan Isroilov. Barcha huquqlar himoyalangan.</span><nav aria-label="Pastki navigatsiya"><a href="#men-haqimda">Men haqimda</a><a href="#portfolio">Portfolio</a><a href="#aloqa">Aloqa</a></nav><a href="#bosh-sahifa" className="back-top">Yuqoriga<ArrowUpRight size={15} /></a></div></div></footer>

    {project && <Dialog title={project.title} onClose={() => setProject(null)}><img className="dialog-art" src={project.image} alt={project.subtitle + ' konsepti'} width={960} height={720} /><span className="dialog-category">{project.category} / KONSEPTUAL NAMUNA</span><p className="dialog-description">{project.detail}</p><h3>Yo‘nalish nimalarni qamrab oladi?</h3><ul className="deliverables">{project.deliverables.map(item => <li key={item}><CheckCheck size={17} />{item}</li>)}</ul><button className="button button-primary" onClick={() => { const type = project.category === 'AI Loyihalar' ? services[2].title : services[0].title; setProject(null); requestAnimationFrame(() => beginService(type)) }}>Shunday g‘oyani muhokama qilish<ArrowUpRight size={18} /></button></Dialog>}
  </>
}
