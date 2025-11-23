import React, { useEffect, useRef, useState } from 'react'
import GlassCard from './GlassCard'
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

export default function Features(){
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
