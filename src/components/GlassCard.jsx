import React, { useRef } from 'react'

export default function GlassCard({ children, className = '', onMouseMove }){
  const ref = useRef(null)

  function handlePointerMove(e){
    if(!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || (r.left + r.width/2)
    const clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || (r.top + r.height/2)
    const x = ((clientX - r.left)/r.width)*100 + '%'
    const y = ((clientY - r.top)/r.height)*100 + '%'
    ref.current.style.setProperty('--mx', x)
    ref.current.style.setProperty('--my', y)
    if(onMouseMove) onMouseMove(e)
  }

  // On touch/pointer interactions we reset/center spotlight to avoid it getting "stuck" on mobile
  function handlePointerDown(e){
    if(!ref.current) return
    if(e.pointerType === 'touch'){
      ref.current.style.setProperty('--mx','50%')
      ref.current.style.setProperty('--my','50%')
    }
  }

  function handlePointerLeave(){
    if(!ref.current) return
    ref.current.style.setProperty('--mx','50%')
    ref.current.style.setProperty('--my','50%')
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onPointerLeave={handlePointerLeave}
      className={`card-spotlight glass noise rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  )
}
