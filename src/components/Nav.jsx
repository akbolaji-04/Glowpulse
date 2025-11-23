import React, { useEffect, useState } from 'react'

export default function Nav({ onStart }){
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    function onScroll(){ setScrolled(window.scrollY>24) }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[88%] z-40 glass p-3 rounded-3xl transition-all ${scrolled? 'backdrop-blur-md':''}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center relative">
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            </div>
            <div className="font-semibold text-lg">GlowPulse</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="opacity-80 hover:opacity-100">Features</a>
          <a href="#demo" className="opacity-80 hover:opacity-100">Demo</a>
          <a href="#pricing" className="opacity-80 hover:opacity-100">Pricing</a>
          <button onClick={onStart} className="ml-2 px-4 py-2 rounded-full border-2 border-transparent bg-gradient-to-r from-[#7c3aed] to-[#00f0ff] text-black font-semibold shadow-md">
            Start Tracking
          </button>
        </div>
      </div>
    </nav>
  )
}
