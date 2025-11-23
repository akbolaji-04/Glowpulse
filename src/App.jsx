import React, { useEffect, useRef, useState } from 'react'
import { Moon, Smile, Droplet } from 'lucide-react'

function useInView(ref, options = {}){
  const [inView, setInView] = useState(false)
  useEffect(()=>{
    if(!ref.current) return
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) setInView(true) })
    }, options)
    obs.observe(ref.current)
    return ()=> obs.disconnect()
  },[ref, options])
  return inView
}

function GlassCard({children, className='', onMouseMove}){
  const ref = useRef()
  function handleMove(e){
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left)/r.width)*100 + '%'
    const y = ((e.clientY - r.top)/r.height)*100 + '%'
    ref.current.style.setProperty('--mx', x)
    ref.current.style.setProperty('--my', y)
    if(onMouseMove) onMouseMove(e)
  }
  return (
    <div ref={ref} onMouseMove={handleMove} className={`card-spotlight glass noise rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

function AnimatedPulseGraph(){
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
      const amp = 12 + 16 * (1 - Math.abs(mouseX - 0.5)*2) // more amplitude near center
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

function Nav({onStart}){
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

function Features(){
  const cards = [
    {title:'Sleep', desc:'Track sleep cycles and get gentle nightly insights.', icon: <Moon size={28}/>},
    {title:'Mood', desc:'Quick mood check-ins and trend visualizations.', icon: <Smile size={28}/>},
    {title:'Hydration', desc:'Simple water logging, reminders, and streaks.', icon: <Droplet size={28}/>},
  ]
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-semibold mb-6">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c,i)=> <FeatureCard key={i} {...c} />)}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({title, desc, icon}){
  const ref = useRef()
  const inView = useInView(ref, {threshold:0.15})
  return (
    <div ref={ref} className={`fade-up ${inView? 'in-view':''}`}>
      <GlassCard className="h-full">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#00f0ff] flex items-center justify-center text-black">{icon}</div>
          <div>
            <h4 className="font-semibold text-xl">{title}</h4>
            <p className="text-sm opacity-80 mt-1">{desc}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

function Pricing(){
  const [yearly, setYearly] = useState(false)
  const basic = yearly ? 'Free' : 'Free'
  const pro = yearly ? '$48/yr' : '$6/mo'
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-semibold">Pricing</h3>
          <div className="flex items-center gap-3 bg-[#0d0d0d] p-2 rounded-full glass">
            <span className={`px-3 ${!yearly? 'text-white':''}`}>Monthly</span>
            <div className="relative">
              <input id="toggle" type="checkbox" className="sr-only peer" checked={yearly} onChange={()=>setYearly(v=>!v)} />
              <label htmlFor="toggle" className="w-14 h-7 bg-gray-700 rounded-full block cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-6 after:h-6 after:bg-white after:rounded-full after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#7c3aed] peer-checked:to-[#00f0ff] peer-checked:after:translate-x-7"></label>
            </div>
            <span className={`px-3 ${yearly? 'text-white':''}`}>Yearly</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-semibold">Basic</h4>
                <p className="text-sm opacity-80">Free forever</p>
              </div>
              <div className="text-2xl font-bold">{basic}</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              <li>Sleep & mood tracking</li>
              <li>Hydration logging</li>
              <li>Basic insights</li>
            </ul>
            <button className="mt-6 w-full py-2 rounded-full border border-white/6">Get Started</button>
          </div>

          <div className="glass rounded-3xl p-6 border-2 border-transparent" style={{boxShadow:'0 8px 40px rgba(124,58,237,0.12), inset 0 0 48px rgba(0,240,255,0.02)'}}>
            <div style={{borderRadius:18, padding:6, background:'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(0,240,255,0.04))'}} className="p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold">Flow State</h4>
                  <p className="text-sm opacity-80">Pro features for deeper insights</p>
                </div>
                <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] to-[#00f0ff]">{pro}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm opacity-90">
                <li>Advanced sleep analysis</li>
                <li>Trend predictions & export</li>
                <li>Priority support</li>
              </ul>
              <button className="mt-6 w-full py-2 rounded-full text-black font-semibold" style={{background:'linear-gradient(90deg,#7c3aed,#00f0ff)'}}>Upgrade</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App(){
  const startRef = useRef(null)
  const [cursorHover, setCursorHover] = useState(false)

  useEffect(()=>{
    // custom cursor
    const cur = document.createElement('div')
    cur.className = 'cursor-glow'
    document.body.appendChild(cur)
    let mouseX=0, mouseY=0, lastX=0, lastY=0
    let rafId
    function onMove(e){ mouseX = e.clientX; mouseY = e.clientY }
    function onFrame(){ lastX += (mouseX - lastX) * 0.18; lastY += (mouseY - lastY) * 0.18; cur.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%) scale(${cursorHover?1.6:1})`; rafId = requestAnimationFrame(onFrame) }
    function handleOver(e){ if(e.target.tagName==='A' || e.target.tagName==='BUTTON' || e.target.closest('button')) setCursorHover(true) }
    function handleOut(e){ setCursorHover(false) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', handleOver)
    window.addEventListener('mouseout', handleOut)
    onFrame()
    return ()=>{ window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', handleOver); window.removeEventListener('mouseout', handleOut); cancelAnimationFrame(rafId); cur.remove() }
  },[cursorHover])

  function onStart(){ window.location.hash = '#features' }

  return (
    <div className="min-h-screen relative text-slate-100 overflow-x-hidden">
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
