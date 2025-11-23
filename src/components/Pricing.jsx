import React, { useState } from 'react'

export default function Pricing(){
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
