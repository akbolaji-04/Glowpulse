import React, { useEffect, useRef, useState } from 'react'

export default function AnimatedPulseGraph(){
  const svgRef = useRef()
  const [mouseX, setMouseX] = useState(0.5)
  useEffect(()=>{
    const svg = svgRef.current
    if(!svg) return
    let rafId
    let t = 0
    const path = svg.querySelector('path')
    const width = 1200
    const height = 220
    function draw(){
      const amp = 12 + 16 * (1 - Math.abs(mouseX - 0.5)*2)
      const freq = 0.008 + mouseX*0.02
      const points = []
      const samples = 220
      for(let i=0;i<=samples;i++){
        const x = (i/samples)*width
        const y = height/2 + Math.sin((i*freq*10)+t)*amp*Math.sin((i/samples)*Math.PI)
        points.push(`${x},${y}`)
      }
      const d = 'M' + points.join(' L ')
      path.setAttribute('d', d)
      t += 0.02
      rafId = requestAnimationFrame(draw)
    }
    draw()
    return ()=> cancelAnimationFrame(rafId)
  },[mouseX])

  useEffect(()=>{
    function onMove(e){
      if(!svgRef.current) return
      const r = svgRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - r.left)/r.width))
      setMouseX(x)
    }
    window.addEventListener('mousemove', onMove)
    return ()=> window.removeEventListener('mousemove', onMove)
  },[])

  return (
    <div className="w-full max-w-full overflow-hidden">
      <svg ref={svgRef} viewBox={`0 0 1200 220`} className="w-full h-56 md:h-80">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.92" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.85" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path fill="none" stroke="url(#g1)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/>
      </svg>
    </div>
  )
}
