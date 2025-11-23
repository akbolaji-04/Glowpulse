import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Cursor(){
  const elRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const circleRef = useRef(null)
  const [isInteractive, setInteractive] = useState(false)

  if(!elRef.current) elRef.current = document.createElement('div')

  useEffect(()=>{
    const el = elRef.current
    document.body.appendChild(el)
    setMounted(true)
    return ()=>{ setMounted(false); el.remove() }
  },[])

  useEffect(()=>{
    const el = circleRef.current
    if(!el) return
    let mouseX=0, mouseY=0, lastX=0, lastY=0
    let rafId
    function onMove(e){ mouseX = e.clientX; mouseY = e.clientY }
    function animate(){ lastX += (mouseX - lastX) * 0.18; lastY += (mouseY - lastY) * 0.18; el.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%) scale(${isInteractive?1.6:1})`; rafId = requestAnimationFrame(animate) }
    function onOver(e){ const t = e.target; if(t.tagName==='A' || t.tagName==='BUTTON' || t.closest && t.closest('button, a, [role="button"]')) setInteractive(true) }
    function onOut(){ setInteractive(false) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    animate()
    return ()=>{ window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); window.removeEventListener('mouseout', onOut); cancelAnimationFrame(rafId) }
  },[isInteractive])

  if(!mounted) return null

  return createPortal(
    <div ref={circleRef} className={`cursor-glow ${isInteractive? 'small':''}`} style={{position:'fixed', left:0, top:0}} />,
    elRef.current
  )
}
