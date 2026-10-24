import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export default function Dialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const el = dialog.current!
    el.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      el.close()
      document.body.style.overflow = previousOverflow
      previous?.focus({ preventScroll: true })
    }
  }, [])
  return <dialog ref={dialog} className="detail-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <div className="dialog-inner">
      <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label="Oynani yopish"><X size={22} /></button>
      <h2 id="dialog-title">{title}</h2>
      {children}
    </div>
  </dialog>
}
