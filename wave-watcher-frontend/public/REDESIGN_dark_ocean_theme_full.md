# Agent Task: Full UI Redesign — Dark Ocean Theme

## Design Vision
Replace the current white/frosted-glass aesthetic with a deep navy dark theme
inspired by the sea at night. Every component uses the same dark card style,
condition-colored accents, and cyan highlights.

## Design Token Reference (use these values consistently across all files)
```
Background page:    #06101f
Card background:    rgba(255,255,255,0.035)
Card border:        rgba(255,255,255,0.07)
Text primary:       #dde8ff
Text secondary:     #536280
Text muted:         #26344f
Accent cyan:        #22d3ee
EPIC:               #8b5cf6  (purple)
GOOD:               #10b981  (emerald)
FAIR:               #f59e0b  (amber)
POOR:               #64748b  (slate)
BLOWN OUT:          #ef4444  (red)
FLAT:               #475569  (dark slate)
NOW line:           #ef4444
```

---

## ⚠️ Hard Rules
- Touch **only** the files listed in this document.
- **Do not change any calculation logic, prop names, or function signatures.**
- Only change `className`, `style`, inline color values, and JSX structure of
  presentational elements. All data flow stays identical.
- Do **not** reformat lines you are not changing.
- If anything is ambiguous, **stop and ask**.

---

## File 1 — `src/index.css`

### Change 1A — Dark page background

Find:
```css
:root {
  background-color: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
  background-image: 
    radial-gradient(at 0% 0%, hsla(210,100%,98%,1) 0, transparent 50%), 
    radial-gradient(at 50% 0%, hsla(215,100%,97%,1) 0, transparent 50%), 
    radial-gradient(at 100% 0%, hsla(220,100%,96%,1) 0, transparent 50%);
  background-attachment: fixed;
}
```

Replace with:
```css
:root {
  background-color: #06101f;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: #06101f;
  background-image:
    radial-gradient(at 0% 0%, rgba(34,211,238,0.04) 0, transparent 50%),
    radial-gradient(at 100% 100%, rgba(139,92,246,0.04) 0, transparent 50%);
  background-attachment: fixed;
}
```

### Change 1B — Dark scrollbar

Find:
```css
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
```

Replace with:
```css
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.18);
}
```

---

## File 2 — `src/App.jsx`

### Change 2A — Dark loading screen

Find:
```jsx
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">
```

Replace with:
```jsx
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4" style={{background:'#06101f'}}>
        <Loader2 className="animate-spin text-cyan-400" size={48} />
        <p className="font-black text-xs uppercase tracking-[0.3em]" style={{color:'#536280'}}>
```

### Change 2B — Dark footer

Find:
```jsx
        <footer className="mt-24 border-t border-slate-200 bg-white/50 py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
```

Replace with:
```jsx
        <footer className="mt-24 py-12" style={{borderTop:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)'}}>
          <div className="container mx-auto px-6 text-center">
            <p className="font-bold text-xs uppercase tracking-[0.2em]" style={{color:'#26344f'}}>
```

---

## File 3 — `src/components/Navbar.jsx`

### Change 3A — Remove light gradient overlay

Find:
```jsx
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-40 pointer-events-none" />
```

Replace with:
```jsx
      <div className="fixed top-0 left-0 right-0 h-24 pointer-events-none z-40" style={{background:'linear-gradient(to bottom, rgba(6,16,31,0.9), transparent)'}} />
```

### Change 3B — Dark nav bar container

Find:
```jsx
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-3 py-3 md:px-6 md:py-4 flex items-center justify-between gap-2">
```

Replace with:
```jsx
      <nav className="fixed top-0 left-0 right-0 z-50" style={{borderBottom:'0.5px solid rgba(255,255,255,0.06)'}}>
        <div className="container mx-auto px-3 py-3 md:px-6 md:py-4 flex items-center justify-between gap-2" style={{background:'rgba(6,16,31,0.85)',backdropFilter:'blur(20px)'}}>
```

### Change 3C — Logo box

Find:
```jsx
                <div className="w-9 h-9 md:w-11 md:h-11 bg-slate-900 rounded-xl flex items-center justify-center border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-blue-400/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
```

Replace with:
```jsx
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500" style={{background:'rgba(34,211,238,0.08)',border:'0.5px solid rgba(34,211,238,0.25)'}}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:'rgba(34,211,238,0.12)'}} />
```

### Change 3D — Wave icon color

Find:
```jsx
                      className="w-5 h-5 text-blue-500 group-hover:text-white transition-all fill-none stroke-current"
```

Replace with:
```jsx
                      className="w-5 h-5 fill-none stroke-current transition-all" style={{color:'#22d3ee'}}
```

### Change 3E — Brand name

Find:
```jsx
              <Link to="/" className="font-black text-white text-base md:text-lg tracking-tighter hidden sm:block drop-shadow-md">
```

Replace with:
```jsx
              <Link to="/" className="font-black text-base md:text-lg tracking-tighter hidden sm:block" style={{color:'#dde8ff',letterSpacing:'-0.03em'}}>
```

### Change 3F — Nav links

Find:
```jsx
          <div className="flex items-center gap-3 md:gap-8 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
            <Link
              to="/"
              className="text-white hover:text-blue-400 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              Reports
            </Link>
            <Link
              to="/info"
              className="text-white hover:text-blue-400 transition-colors drop-shadow-[0_2_px_2px_rgba(0,0,0,0.8)]"
            >
              Info
            </Link>
            <Link
              to="/map"
              className="text-white hover:text-blue-400 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              Maps
            </Link>
          </div>
```

Replace with:
```jsx
          <div className="flex items-center gap-3 md:gap-8 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
            <Link to="/" className="transition-colors" style={{color:'#536280'}} onMouseEnter={e=>e.target.style.color='#22d3ee'} onMouseLeave={e=>e.target.style.color='#536280'}>Reports</Link>
            <Link to="/info" className="transition-colors" style={{color:'#536280'}} onMouseEnter={e=>e.target.style.color='#22d3ee'} onMouseLeave={e=>e.target.style.color='#536280'}>Info</Link>
            <Link to="/map" className="transition-colors" style={{color:'#536280'}} onMouseEnter={e=>e.target.style.color='#22d3ee'} onMouseLeave={e=>e.target.style.color='#536280'}>Maps</Link>
          </div>
```

### Change 3G — Premium button

Find:
```jsx
            <button className="bg-blue-600 text-white px-3 py-1.5 md:px-6 md:py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-blue-900/40 hover:bg-blue-700 hover:scale-105 transition-all whitespace-nowrap active:scale-95">
              Join Premium
            </button>
```

Replace with:
```jsx
            <button className="font-black text-[10px] md:text-xs uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 rounded-full px-3 py-1.5 md:px-6 md:py-2 hover:scale-105" style={{background:'#22d3ee',color:'#06101f',boxShadow:'0 0 20px rgba(34,211,238,0.25)'}}>
              Join Premium
            </button>
```

---

## File 4 — `src/components/LocationSelector.jsx`

### Change 4A — Trigger button

Find:
```jsx
        className="flex items-center gap-1.5 md:gap-2 bg-slate-900/60 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-white font-bold text-xs md:text-sm hover:bg-slate-900/80 transition-all cursor-pointer whitespace-nowrap shadow-lg"
```

Replace with:
```jsx
        className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap" style={{background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(255,255,255,0.12)',color:'#dde8ff',backdropFilter:'blur(12px)'}}
```

### Change 4B — Dropdown panel

Find:
```jsx
          <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 transition-all py-3 z-50 max-h-[70vh] overflow-y-auto">
```

Replace with:
```jsx
          <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl transition-all py-3 z-50 max-h-[70vh] overflow-y-auto" style={{background:'#0d1f38',border:'0.5px solid rgba(255,255,255,0.1)',boxShadow:'0 24px 60px rgba(0,0,0,0.6)',backdropFilter:'blur(20px)'}}>
```

### Change 4C — Section borders and labels in dropdown

Find:
```jsx
            <div className="px-3 pb-2 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Country
                </span>
              </div>
```

Replace with:
```jsx
            <div className="px-3 pb-2 mb-2" style={{borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} style={{color:'#536280'}} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{color:'#536280'}}>
                  Country
                </span>
              </div>
```

Find:
```jsx
            <div className="px-3 pb-2 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Mountain size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Region
                </span>
              </div>
```

Replace with:
```jsx
            <div className="px-3 pb-2 mb-2" style={{borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
              <div className="flex items-center gap-2 mb-2">
                <Mountain size={14} style={{color:'#536280'}} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{color:'#536280'}}>
                  Region
                </span>
              </div>
```

### Change 4D — Spots label

Find:
```jsx
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Spots
                </span>
              </div>
```

Replace with:
```jsx
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} style={{color:'#536280'}} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{color:'#536280'}}>
                  Spots
                </span>
              </div>
```

### Change 4E — Country selector pills

Find:
```jsx
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeCountryKey === country.key
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
```

Replace with:
```jsx
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={activeCountryKey === country.key
                      ? {background:'rgba(34,211,238,0.15)',color:'#22d3ee',border:'0.5px solid rgba(34,211,238,0.3)'}
                      : {background:'rgba(255,255,255,0.04)',color:'#536280',border:'0.5px solid rgba(255,255,255,0.07)'}}
```

### Change 4F — Region selector pills

Find:
```jsx
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeRegionKey === region.key
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    } ${!region.hasSpots ? "opacity-40" : ""}`}
```

Replace with:
```jsx
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!region.hasSpots ? "opacity-40" : ""}`}
                    style={activeRegionKey === region.key
                      ? {background:'rgba(34,211,238,0.15)',color:'#22d3ee',border:'0.5px solid rgba(34,211,238,0.3)'}
                      : {background:'rgba(255,255,255,0.04)',color:'#536280',border:'0.5px solid rgba(255,255,255,0.07)'}}
```

### Change 4G — Spot buttons

Find:
```jsx
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                                activeSpotId === spotId
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-slate-700 hover:bg-slate-50"
                              } ${isGrouped ? "ml-2 w-[calc(100%-8px)]" : ""}`}
```

Replace with:
```jsx
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${isGrouped ? "ml-2 w-[calc(100%-8px)]" : ""}`}
                              style={activeSpotId === spotId
                                ? {background:'rgba(34,211,238,0.1)',color:'#22d3ee'}
                                : {color:'#536280'}}
```

### Change 4H — Group headers

Find:
```jsx
                                <span className="text-[9px] font-black text-blue-500/50 uppercase tracking-tighter">
```

Replace with:
```jsx
                                <span className="text-[9px] font-black uppercase tracking-tighter" style={{color:'rgba(34,211,238,0.4)'}}>
```

---

## File 5 — `src/components/HeroSection.jsx`

### Change 5A — Gradient overlay (deepen for dark theme)

Find:
```jsx
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
```

Replace with:
```jsx
        <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(6,16,31,0.97) 0%, rgba(6,16,31,0.4) 40%, rgba(6,16,31,0.1) 100%)'}} />
```

---

## File 6 — `src/components/SwellDetails.jsx`

### Change 6A — Section header

Find:
```jsx
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          Current Surf Conditions
        </h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
```

Replace with:
```jsx
      <div className="mb-6">
        <h2 className="text-xl font-black tracking-tight" style={{color:'#dde8ff'}}>
          Current Surf Conditions
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{color:'#536280'}}>
```

### Change 6B — Rating bar card

Find:
```jsx
      <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
```

Replace with:
```jsx
      <div className="rounded-xl p-4 flex items-center justify-between" style={{background:'rgba(255,255,255,0.035)',border:'0.5px solid rgba(255,255,255,0.07)'}}>
```

Find:
```jsx
            <span
              className={`font-black text-lg tracking-tighter ${ratingInfo.color.replace("bg-", "text-")}`}
            >
```

Replace with:
```jsx
            <span className="font-black text-lg tracking-tighter" style={{color: ratingInfo.label==='EPIC'?'#8b5cf6':ratingInfo.label==='GOOD'?'#10b981':ratingInfo.label==='FAIR'?'#f59e0b':ratingInfo.label==='BLOWN OUT'?'#ef4444':'#64748b'}}>
```

Find:
```jsx
        <div className="flex items-center gap-2 opacity-40">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase tracking-tighter">
              WaveWatcher Engine • Cloudflare Powered
            </span>
          </div>
```

Replace with:
```jsx
        <div className="flex items-center gap-2" style={{opacity:0.3}}>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase tracking-tighter" style={{color:'#536280'}}>
              WaveWatcher Engine • Cloudflare Powered
            </span>
          </div>
```

### Change 6C — All five stat cards (Surf, Swell, Wind, Tide, Temp)
Replace every instance of:
```jsx
          <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-5 shadow-sm
```
with:
```jsx
          <div className="rounded-xl p-5" style={{background:'rgba(255,255,255,0.035)',border:'0.5px solid rgba(255,255,255,0.07)'}}
```
**Note:** There are 5 cards with this pattern. Replace ALL occurrences. The `flex flex-col justify-between h-40`, `flex items-center justify-between lg:col-span-1 h-40 overflow-hidden`, etc. class suffixes remain unchanged — only the background/border classes are replaced.

### Change 6D — Stat card labels and values

Replace every:
```jsx
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
```
with:
```jsx
            <span className="text-[9px] font-black uppercase tracking-widest" style={{color:'#536280'}}>
```

Replace:
```jsx
              <h3 className="text-3xl font-black text-slate-800 tracking-tighter">
                {surfRange}
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-1">
```
with:
```jsx
              <h3 className="text-3xl font-black tracking-tighter" style={{color:'#22d3ee'}}>
                {surfRange}
              </h3>
              <p className="text-xs font-bold mt-1" style={{color:'#536280'}}>
```

Replace:
```jsx
              <h3 className="text-xl font-black text-slate-800 tracking-tighter">
                  {displayWindSpeed.toFixed(0)}
                  <span className="text-xs font-bold text-slate-400 ml-0.5">
                    kph
                  </span>{" "}
                  {getCompass(displayWindDir)}
                </h3>
                <p className="text-[10px] font-bold text-slate-500 mt-1">
```
with:
```jsx
              <h3 className="text-xl font-black tracking-tighter" style={{color:'#dde8ff'}}>
                  {displayWindSpeed.toFixed(0)}
                  <span className="text-xs font-bold ml-0.5" style={{color:'#536280'}}>
                    kph
                  </span>{" "}
                  {getCompass(displayWindDir)}
                </h3>
                <p className="text-[10px] font-bold mt-1" style={{color:'#536280'}}>
```

Replace (tide value):
```jsx
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">
                  {tide.toFixed(1)}
                  <span className="text-xs font-bold text-slate-400 ml-1">
                    m
                  </span>
                </h3>
```
with:
```jsx
                <h3 className="text-3xl font-black tracking-tighter" style={{color:'#22d3ee'}}>
                  {tide.toFixed(1)}
                  <span className="text-xs font-bold ml-1" style={{color:'#536280'}}>
                    m
                  </span>
                </h3>
```

Replace (swell list primary):
```jsx
                    className={`flex items-center gap-2 ${i === 0 ? "text-slate-800" : "text-slate-400"}`}
```
with:
```jsx
                    className="flex items-center gap-2" style={{color: i === 0 ? '#dde8ff' : '#536280'}}
```

Replace (temperature values):
```jsx
                  <span className="text-xl font-black text-slate-800">
```
with:
```jsx
                  <span className="text-xl font-black" style={{color:'#dde8ff'}}>
```

Replace (temperature label):
```jsx
              <p className="text-xs font-bold text-slate-500 mt-2">Rashguard</p>
```
with:
```jsx
              <p className="text-xs font-bold mt-2" style={{color:'#536280'}}>Rashguard</p>
```

### Change 6E — "WaveWatcher Engine" watermarks in cards

Replace every:
```jsx
          <div className="flex items-center gap-1 opacity-30">
            <span className="text-[8px] font-black uppercase tracking-widest">
              WaveWatcher Engine
            </span>
          </div>
```
with:
```jsx
          <div className="flex items-center gap-1" style={{opacity:0.2}}>
            <span className="text-[8px] font-black uppercase tracking-widest" style={{color:'#536280'}}>
              WaveWatcher Engine
            </span>
          </div>
```

### Change 6F — Wind compass dial (already dark, update border color)

Find:
```jsx
            <div className="absolute inset-0 rounded-full bg-slate-800/90 shadow-xl border border-slate-700 overflow-hidden">
```

Replace with:
```jsx
            <div className="absolute inset-0 rounded-full overflow-hidden" style={{background:'rgba(13,31,56,0.95)',border:'0.5px solid rgba(255,255,255,0.12)',boxShadow:'0 0 20px rgba(34,211,238,0.08)'}}>
```

### Change 6G — Temperature SPF button

Find:
```jsx
            <button className="flex items-center justify-between w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-white">
                  ☀
                </div>
                <span className="text-[9px] font-black uppercase text-slate-500">
                  Use SPF 50
                </span>
              </div>
              <ChevronRight size={10} className="text-slate-400" />
```

Replace with:
```jsx
            <button className="flex items-center justify-between w-full rounded-lg px-3 py-1.5 transition-colors" style={{background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(255,255,255,0.07)'}}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-white">
                  ☀
                </div>
                <span className="text-[9px] font-black uppercase" style={{color:'#536280'}}>
                  Use SPF 50
                </span>
              </div>
              <ChevronRight size={10} style={{color:'#536280'}} />
```

---

## File 7 — `src/components/NearbySpots.jsx`

### Change 7A — Section header

Find:
```jsx
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nearby Spots in this Region</h3>
        <div className="h-px flex-grow mx-4 bg-slate-100"></div>
```

Replace with:
```jsx
        <h3 className="text-[10px] font-black uppercase tracking-widest" style={{color:'#26344f'}}>Nearby Spots in this Region</h3>
        <div className="h-px flex-grow mx-4" style={{background:'rgba(255,255,255,0.07)'}}></div>
```

### Change 7B — Nearby spot cards

Find:
```jsx
          className="bg-white/70 backdrop-blur-md border border-slate-100/50 rounded-lg p-2.5 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-white hover:border-blue-200 transition-all duration-300"
```

Replace with:
```jsx
          className="rounded-lg p-2.5 flex items-center justify-between group cursor-pointer transition-all duration-300" style={{background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(255,255,255,0.07)'}}
```

Find:
```jsx
              <span className="text-[11px] font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors truncate">{spot.name}</span>
```

Replace with:
```jsx
              <span className="text-[11px] font-black tracking-tight transition-colors truncate" style={{color:'#dde8ff'}}>{spot.name}</span>
```

Find:
```jsx
                <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{spot.surfRange}</span>
```

Replace with:
```jsx
                <span className="text-[9px] font-bold whitespace-nowrap" style={{color:'#536280'}}>{spot.surfRange}</span>
```

Find:
```jsx
            <ChevronRight size={12} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
```

Replace with:
```jsx
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-all flex-shrink-0" style={{color:'#26344f'}} />
```

---

## File 8 — `src/components/SwellCompass.jsx`

### Change 8A — Container

Find:
```jsx
      "bg-white/40 backdrop-blur-md border border-white/60 shadow-sm",
```

Replace with:
```jsx
      "",
    ) + '" style="background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.08);border-radius:16px;"',
```

**Note:** The `cn()` classnames approach makes inline style tricky here. Instead, replace the entire outer `<div>` opening tag:

Find:
```jsx
    <div className={cn(
      "flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300",
      "bg-white/40 backdrop-blur-md border border-white/60 shadow-sm",
      isActive ? "ring-2 ring-blue-400/50 scale-105" : ""
    )}>
```

Replace with:
```jsx
    <div className={cn("flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300", isActive ? "scale-105" : "")}
      style={{background:'rgba(255,255,255,0.035)',border: isActive ? '0.5px solid rgba(34,211,238,0.4)' : '0.5px solid rgba(255,255,255,0.07)'}}>
```

### Change 8B — Label text

Find:
```jsx
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
```

Replace with:
```jsx
      <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{color:'#536280'}}>
```

### Change 8C — Degree text

Find:
```jsx
      <p className={cn(
        "font-black mt-2 text-slate-800 tracking-tight",
        isSmall ? "text-xs" : "text-sm"
      )}>
```

Replace with:
```jsx
      <p className={cn("font-black mt-2 tracking-tight", isSmall ? "text-xs" : "text-sm")} style={{color:'#dde8ff'}}>
```

### Change 8D — Arrow fill color

Find:
```jsx
              fill={isActive ? "#3b82f6" : "#64748b"}
```

Replace with:
```jsx
              fill={isActive ? "#22d3ee" : "#536280"}
```

---

## File 9 — `src/components/ForecastTable.jsx`

This is the most significant redesign. Add a helper function and update all presentational elements.

### Change 9A — Add `getConditionAccent` helper after `getPeriodCorrection` import

Find the line:
```jsx
import { MIN_SURF_PERIOD, getPeriodCorrection, getEnergyMultiplier } from '../utils/spotConstants';
```

Replace with:
```jsx
import { MIN_SURF_PERIOD, getPeriodCorrection, getEnergyMultiplier } from '../utils/spotConstants';

const getConditionAccent = (r) => {
  if (!r) return { color: '#475569', alpha: 'rgba(71,85,105,0.08)' };
  if (r.includes('EPIC'))     return { color: '#8b5cf6', alpha: 'rgba(139,92,246,0.1)' };
  if (r.includes('GOOD'))     return { color: '#10b981', alpha: 'rgba(16,185,129,0.1)' };
  if (r.includes('FAIR'))     return { color: '#f59e0b', alpha: 'rgba(245,158,11,0.1)' };
  if (r.includes('BLOWN'))    return { color: '#ef4444', alpha: 'rgba(239,68,68,0.08)' };
  if (r.includes('FLAT'))     return { color: '#475569', alpha: 'rgba(71,85,105,0.06)' };
  return { color: '#64748b', alpha: 'rgba(100,116,139,0.08)' };
};
```

### Change 9B — Outer card container

Find:
```jsx
          className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
```

Replace with:
```jsx
          className="rounded-2xl overflow-hidden transition-all duration-300" style={{background:'rgba(255,255,255,0.025)',border:'0.5px solid rgba(255,255,255,0.07)'}}
```

### Change 9C — Day header (clickable row)

Find:
```jsx
              className="px-6 py-3 border-b border-white/40 flex items-center justify-between bg-white/20 cursor-pointer hover:bg-white/30 transition-colors"
```

Replace with:
```jsx
              className="px-6 py-3 flex items-center justify-between cursor-pointer transition-colors" style={{borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)'}}
```

### Change 9D — Day header text and TODAY badge

Find:
```jsx
                  <h3 className="font-black text-xs text-slate-800 tracking-tight flex items-center gap-2">
                    {day.displayDate}
                    {day.isToday && (
                      <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                        Today
                      </span>
                    )}
                  </h3>
```

Replace with:
```jsx
                  <h3 className="font-black text-xs tracking-tight flex items-center gap-2" style={{color:'#dde8ff'}}>
                    {day.displayDate}
                    {day.isToday && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-widest" style={{background:'rgba(34,211,238,0.15)',color:'#22d3ee'}}>
                        Today
                      </span>
                    )}
                  </h3>
```

### Change 9E — "Click for hourly view" text

Find:
```jsx
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {isExpanded ? "Click to collapse" : "Click for hourly view"}
              </p>
```

Replace with:
```jsx
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{color:'#26344f'}}>
                {isExpanded ? "Click to collapse" : "Click for hourly view"}
              </p>
```

### Change 9F — Column header row

Find:
```jsx
                  <tr className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100/50 bg-slate-50/30">
```

Replace with:
```jsx
                  <tr className="text-[9px] font-black uppercase tracking-widest" style={{color:'#26344f',borderBottom:'0.5px solid rgba(255,255,255,0.05)'}}>
```

### Change 9G — Data row — add dark background + NOW highlight + accent bar

Find (the `<tr>` for data rows):
```jsx
                      <tr
                        key={idx}
                        className="group hover:bg-white/60 transition-colors"
                      >
```

Replace with:
```jsx
                      <tr
                        key={idx}
                        className="group transition-colors"
                        style={{
                          background: row.idx === currentIdx
                            ? 'rgba(239,68,68,0.04)'
                            : 'transparent',
                        }}
                      >
```

### Change 9H — Time cell — add left accent bar via borderLeft

Find:
```jsx
                      <td className="pl-6 py-2">
                        <span className="font-black text-[10px] text-slate-400 group-hover:text-slate-600">
                          {row.time}
                        </span>
                      </td>
```

Replace with:
```jsx
                      <td className="py-2" style={{paddingLeft:'20px',borderLeft:`3px solid ${getConditionAccent(
                        (() => {
                          const rc = row.ratingColor;
                          if (rc.includes('purple')) return 'EPIC';
                          if (rc.includes('emerald')) return 'GOOD';
                          if (rc.includes('yellow')) return 'FAIR';
                          if (rc.includes('red')) return 'BLOWN OUT';
                          return 'POOR';
                        })()
                      ).color}`}}>
                        <span className="font-black text-[10px]" style={{color: row.idx === currentIdx ? '#ef4444' : '#536280'}}>
                          {row.idx === currentIdx ? 'NOW' : row.time}
                        </span>
                      </td>
```

### Change 9I — Surf range cell

Find:
```jsx
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-0.5 h-4 rounded-full ${row.ratingColor}`}
                          />
                          <span className="font-black text-sm text-slate-800 tracking-tighter">
                            {row.surfMin.toFixed(1)}-{row.surfMax.toFixed(1)}
                          </span>
                        </div>
                      </td>
```

Replace with:
```jsx
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-black tracking-tighter leading-none" style={{fontSize:22,color: (() => {
                            const rc = row.ratingColor;
                            if (rc.includes('purple')) return '#8b5cf6';
                            if (rc.includes('emerald')) return '#10b981';
                            if (rc.includes('yellow')) return '#f59e0b';
                            if (rc.includes('red')) return '#ef4444';
                            return '#64748b';
                          })()}}>
                            {row.surfMax.toFixed(1)}
                          </span>
                          <span className="font-bold text-[9px]" style={{color:'#536280'}}>{row.surfMin.toFixed(1)}–{row.surfMax.toFixed(1)}m</span>
                        </div>
                      </td>
```

### Change 9J — Primary swell cell

Find:
```jsx
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2 bg-slate-50/50 px-2 py-1 rounded-lg border border-slate-100/50">
                          <span className="font-black text-[11px] text-slate-700">
                            {row.primarySwell.height.toFixed(1)}
                            <span className="text-[8px] ml-0.5 opacity-50">
                              m
                            </span>
                          </span>
                          <span className="font-bold text-slate-400 text-[10px]">
                            {row.primarySwell.period}s
                          </span>
```

Replace with:
```jsx
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(255,255,255,0.06)'}}>
                          <span className="font-black text-[11px]" style={{color:'#dde8ff'}}>
                            {row.primarySwell.height.toFixed(1)}
                            <span className="text-[8px] ml-0.5" style={{opacity:0.4,color:'#536280'}}>
                              m
                            </span>
                          </span>
                          <span className="font-bold text-[10px]" style={{color:'#536280'}}>
                            {row.primarySwell.period}s
                          </span>
```

Find (direction text in primary swell):
```jsx
                            <span className="text-[9px] font-bold text-slate-400">
                              {getCardinal(row.primarySwell.dir)}
                            </span>
```

Replace with:
```jsx
                            <span className="text-[9px] font-bold" style={{color:'#536280'}}>
                              {getCardinal(row.primarySwell.dir)}
                            </span>
```

### Change 9K — Secondary swell cell

Find:
```jsx
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2 px-1">
                          {" "}
                          {/* Removed opacity-70 */}
                          <span className="font-black text-slate-500 text-[10px]">
                            {row.secondarySwell.height.toFixed(1)}m
                          </span>
                          <span className="font-bold text-slate-400 text-[9px]">
                            {row.secondarySwell.period}s
                          </span>
```

Replace with:
```jsx
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2 px-1">
                          <span className="font-black text-[10px]" style={{color:'#536280'}}>
                            {row.secondarySwell.height.toFixed(1)}m
                          </span>
                          <span className="font-bold text-[9px]" style={{color:'#26344f'}}>
                            {row.secondarySwell.period}s
                          </span>
```

Find (secondary swell direction):
```jsx
                            <span className="text-[8px] font-black text-slate-400 uppercase">
                              {getCardinal(row.secondarySwell.dir)}
                            </span>
```

Replace with:
```jsx
                            <span className="text-[8px] font-black uppercase" style={{color:'#26344f'}}>
                              {getCardinal(row.secondarySwell.dir)}
                            </span>
```

### Change 9L — Wind cell

Find:
```jsx
                            <span className="font-black text-[11px] text-slate-800 leading-none">
                              {row.wind.toFixed(0)}
                            </span>
                            <span className="text-[8px] font-bold text-red-400/70">
                              {row.gust.toFixed(0)}
                              <span className="text-[7px] opacity-60 ml-0.5">g</span>
                            </span>
```

Replace with:
```jsx
                            <span className="font-black text-[11px] leading-none" style={{color:'#dde8ff'}}>
                              {row.wind.toFixed(0)}
                            </span>
                            <span className="text-[8px] font-bold" style={{color:'rgba(239,68,68,0.6)'}}>
                              {row.gust.toFixed(0)}
                              <span className="text-[7px] ml-0.5" style={{opacity:0.6}}>g</span>
                            </span>
```

Find:
```jsx
                          <div className="flex items-center gap-1 bg-blue-50/50 px-1.5 py-0.5 rounded-md border border-blue-100/50">
                            <span className="text-[9px] font-bold text-blue-600">
                              {getCardinal(row.windDir)}
                            </span>
```

Replace with:
```jsx
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md" style={{background:'rgba(34,211,238,0.08)',border:'0.5px solid rgba(34,211,238,0.15)'}}>
                            <span className="text-[9px] font-bold" style={{color:'#22d3ee'}}>
                              {getCardinal(row.windDir)}
                            </span>
```

Find:
```jsx
                              className="text-blue-600 fill-blue-50"
```

Replace with:
```jsx
                              style={{color:'#22d3ee',fill:'rgba(34,211,238,0.15)'}}
```

### Change 9M — Energy cell — add mini bar

Find:
```jsx
                      <td className="px-2 py-2 text-center">
                        <span className="font-black text-slate-400 text-[10px] tracking-tighter">
                          {row.energy}
                          <span className="text-[8px] ml-0.5 opacity-40 uppercase">
                            kj
                          </span>
                        </span>
                      </td>
```

Replace with:
```jsx
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-1 items-end">
                          <span className="font-black text-[10px] tracking-tighter" style={{color:'#dde8ff'}}>
                            {row.energy}
                            <span className="text-[8px] ml-0.5 uppercase" style={{opacity:0.35,color:'#536280'}}>kj</span>
                          </span>
                          <div className="h-[3px] rounded-full overflow-hidden" style={{width:'48px',background:'rgba(255,255,255,0.07)'}}>
                            <div className="h-full rounded-full" style={{width:`${Math.min(100,(row.energy/400)*100)}%`,background:'#22d3ee'}}/>
                          </div>
                        </div>
                      </td>
```

### Change 9N — Weather cell

Find:
```jsx
                          <span className="font-black text-slate-600 text-[10px]">
                            {row.temp}°
                          </span>
```

Replace with:
```jsx
                          <span className="font-black text-[10px]" style={{color:'#536280'}}>
                            {row.temp}°
                          </span>
```

### Change 9O — Rain cell

Find:
```jsx
                        <span className="font-black text-slate-400 text-[9px] tracking-widest">
```

Replace with:
```jsx
                        <span className="font-black text-[9px] tracking-widest" style={{color:'#536280'}}>
```

---

## File 10 — `src/components/ForecastChart.jsx`

### Change 10A — Outer card container

Find:
```jsx
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">
```

Replace with:
```jsx
        <div className="rounded-3xl p-8" style={{background:'rgba(255,255,255,0.025)',border:'0.5px solid rgba(255,255,255,0.07)'}}>
```

### Change 10B — Header title and subtitle

Find:
```jsx
            <h3 className="font-black text-xl text-slate-800 tracking-tight">Today's Forecast</h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5 uppercase tracking-widest">
              Surf height · Wind speed
            </p>
```

Replace with:
```jsx
            <h3 className="font-black text-xl tracking-tight" style={{color:'#dde8ff'}}>Today's Forecast</h3>
            <p className="text-xs font-semibold mt-0.5 uppercase tracking-widest" style={{color:'#536280'}}>
              Surf height · Wind speed
            </p>
```

### Change 10C — Legend items

Find:
```jsx
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Surf (m)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 border-t-2 border-dashed border-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Wind (kts)</span>
            </div>
```

Replace with:
```jsx
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{background:'#22d3ee',boxShadow:'0 0 8px rgba(34,211,238,0.5)'}} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{color:'#536280'}}>Surf (m)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8" style={{borderTop:'2px dashed rgba(245,158,11,0.7)'}} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{color:'#536280'}}>Wind (kts)</span>
            </div>
```

### Change 10D — Chart grid and gradient colors

Find:
```jsx
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
```

Replace with:
```jsx
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
              />
```

Find:
```jsx
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
```

Replace with:
```jsx
                  <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
```

### Change 10E — Surf area stroke and wind line colors

Find:
```jsx
              <Area
                yAxisId="surf"
                type="monotone"
                dataKey="surf"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#surfGradient)"
                dot={false}
                activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
```

Replace with:
```jsx
              <Area
                yAxisId="surf"
                type="monotone"
                dataKey="surf"
                stroke="#22d3ee"
                strokeWidth={2.5}
                fill="url(#surfGradient)"
                dot={false}
                activeDot={{ r: 5, fill: '#22d3ee', strokeWidth: 2, stroke: '#06101f' }}
```

Find:
```jsx
              <Line
                yAxisId="wind"
                type="monotone"
                dataKey="windKnots"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                activeDot={{ r: 4, fill: '#94a3b8', strokeWidth: 2, stroke: '#fff' }}
```

Replace with:
```jsx
              <Line
                yAxisId="wind"
                type="monotone"
                dataKey="windKnots"
                stroke="rgba(245,158,11,0.7)"
                strokeWidth={1.8}
                strokeDasharray="5 4"
                dot={false}
                activeDot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#06101f' }}
```

### Change 10F — Axis tick colors

Find:
```jsx
                tick={{ fill: '#3b82f6', fontSize: 10, fontWeight: 700 }}
                tickFormatter={v => `${v}m`}
```

Replace with:
```jsx
                tick={{ fill: '#22d3ee', fontSize: 9, fontWeight: 700 }}
                tickFormatter={v => `${v}m`}
```

Find:
```jsx
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                tickFormatter={v => `${v}kt`}
```

Replace with:
```jsx
                tick={{ fill: 'rgba(245,158,11,0.6)', fontSize: 9, fontWeight: 700 }}
                tickFormatter={v => `${v}kt`}
```

---

## File 11 — `src/components/TideChart.jsx`

### Change 11A — Outer card container

Find:
```jsx
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">
```

Replace with:
```jsx
        <div className="rounded-3xl p-8" style={{background:'rgba(255,255,255,0.025)',border:'0.5px solid rgba(255,255,255,0.07)'}}>
```

### Change 11B — Header title and spot name

Find:
```jsx
            <h3 className="font-black text-xl text-slate-800 tracking-tight">Tides</h3>
            {spotName && (
              <p className="text-xs text-slate-400 font-semibold mt-0.5 uppercase tracking-widest">
```

Replace with:
```jsx
            <h3 className="font-black text-xl tracking-tight" style={{color:'#dde8ff'}}>Tides</h3>
            {spotName && (
              <p className="text-xs font-semibold mt-0.5 uppercase tracking-widest" style={{color:'#536280'}}>
```

### Change 11C — Legend items

Find:
```jsx
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-800" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-red-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Now</span>
            </div>
```

Replace with:
```jsx
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{background:'#2563eb'}} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{color:'#536280'}}>High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{background:'#475569'}} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{color:'#536280'}}>Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-px" style={{background:'#ef4444'}} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{color:'#536280'}}>Now</span>
            </div>
```

### Change 11D — Night shading fill color

Find (appears twice — both ReferenceArea fills):
```jsx
                      fill="#f1f5f9"
                      fillOpacity={0.6}
```

Replace both with:
```jsx
                      fill="rgba(0,0,0,0.3)"
                      fillOpacity={0.7}
```

### Change 11E — Baseline reference line

Find:
```jsx
              <ReferenceLine y={0} stroke="#e2e8f0" strokeWidth={1} />
```

Replace with:
```jsx
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
```

### Change 11F — Y-axis tick color

Find:
```jsx
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                tickFormatter={v => `${v.toFixed(1)}m`}
```

Replace with:
```jsx
                tick={{ fill: '#536280', fontSize: 9, fontWeight: 700 }}
                tickFormatter={v => `${v.toFixed(1)}m`}
```

### Change 11G — Tide gradient

Find:
```jsx
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.03} />
```

Replace with:
```jsx
                  <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.03} />
```

---

## Verification Checklist

After all changes, open the app and confirm:

- [ ] Page background is deep navy `#06101f`, no white background visible
- [ ] Navbar has dark frosted glass, cyan-highlighted active elements
- [ ] Location dropdown is dark with cyan selection highlights
- [ ] Hero image still shows, gradient now deepens to `#06101f`
- [ ] Swell detail cards are dark with `#dde8ff` values
- [ ] ForecastTable rows have colored left accent bars per condition
- [ ] Current hour row has red `NOW` label and subtle red wash
- [ ] Surf height number is large and condition-colored (amber/green/purple)
- [ ] Energy column has cyan mini progress bar
- [ ] ForecastChart has cyan surf line, amber dashed wind line, dark grid
- [ ] TideChart night bands are dark, curve is blue, grid is near-invisible
- [ ] No white cards, no `bg-white` flashes anywhere on the page

---

## Files Modified Summary

| File | Changes |
|---|---|
| `src/index.css` | Background colors |
| `src/App.jsx` | Loader + footer |
| `src/components/Navbar.jsx` | Full dark nav |
| `src/components/LocationSelector.jsx` | Dark dropdown |
| `src/components/HeroSection.jsx` | Gradient depth |
| `src/components/SwellDetails.jsx` | All cards dark |
| `src/components/NearbySpots.jsx` | Dark spot cards |
| `src/components/SwellCompass.jsx` | Dark compass |
| `src/components/ForecastTable.jsx` | Full hero redesign |
| `src/components/ForecastChart.jsx` | Dark chart |
| `src/components/TideChart.jsx` | Dark chart |

**Total: 11 files. Zero files renamed. Zero logic changed.**
