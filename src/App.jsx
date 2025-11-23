import React, { useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import AnimatedPulseGraph from './components/AnimatedPulseGraph'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Cursor from './components/Cursor'
export default function App(){
  const startRef = useRef(null)

  function onStart(){ window.location.hash = '#features' }

  return (
    <div className="min-h-screen relative text-slate-100 overflow-x-hidden">
      <Cursor />
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb" style={{width:240, height:240, left:'6%', top:'10%', background:'radial-gradient(circle,#7c3aed,transparent)'}} />
        <div className="orb" style={{width:320, height:320, right:'4%', top:'18%', background:'radial-gradient(circle,#00f0ff,transparent)', animation:'floatSlow 9s ease-in-out infinite'}} />
        <div className="orb" style={{width:160, height:160, left:'50%', bottom:'10%', background:'radial-gradient(circle,rgba(255,180,140,0.7),transparent)', animation:'floatSlow 11s ease-in-out infinite'}} />
      </div>

      <Nav onStart={onStart} />

      <header id="demo" className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Tune Into Your Rhythm.</h1>
            <p className="mt-4 text-lg opacity-80">Minimal wellness tracking for sleep, mood, and hydration.</p>
            <div className="mt-6 flex gap-3">
              <a href="#pricing" className="glass px-4 py-2 rounded-full">See Pricing</a>
              <button onClick={onStart} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#00f0ff] text-black">Start Tracking</button>
            </div>
          </div>

          <div className="flex-1">
            <div className="glass rounded-3xl p-6">
              <AnimatedPulseGraph />
              <p className="mt-3 text-sm opacity-80">Wave responds subtly to mouse movement — try moving horizontally.</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Features />
        <Pricing />
      </main>

      <footer className="py-12 text-center opacity-70">© {new Date().getFullYear()} GlowPulse - Built by Abolaji Akorede</footer>
    </div>
  )
}
