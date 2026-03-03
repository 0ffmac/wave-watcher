import React from 'react';
import { Navigation, Wind, Thermometer, Droplets, Sun, ChevronRight, Info } from 'lucide-react';

const SwellDetails = ({ swells, wind, temperatures, tide, rating, surfRange }) => {
  
  // Helper for Rating Segments
  const getRatingSegments = (r) => {
    const segments = [false, false, false, false, false];
    let label = "N/A";
    let color = "bg-slate-200";

    if (!r) return { segments, label, color };

    if (r.includes("RAINY")) { segments[0] = segments[1] = true; label = "RAINY"; color = "bg-blue-400"; }
    else if (r.includes("BLOWN OUT")) { segments[0] = true; label = "BLOWN OUT"; color = "bg-red-500"; }
    else if (r.includes("FLAT")) { segments[0] = true; label = "FLAT"; color = "bg-slate-400"; }
    else if (r.includes("POOR")) { segments[0] = segments[1] = true; label = "POOR"; color = "bg-orange-400"; }
    else if (r.includes("FAIR")) { segments[0] = segments[1] = segments[2] = true; label = "FAIR"; color = "bg-yellow-400"; }
    else if (r.includes("GOOD")) { segments[0] = segments[1] = segments[2] = segments[3] = true; label = "GOOD"; color = "bg-emerald-400"; }
    else if (r.includes("EPIC")) { segments.fill(true); label = "EPIC"; color = "bg-purple-500"; }
    
    
    return { segments, label: label, color };
  };

  const ratingInfo = getRatingSegments(rating);

  // Helper for Surf Description (Simulated)
  const getSurfDesc = (range) => {
    const height = parseFloat(range.split('–')[0]);
    if (height < 0.5) return "Flat";
    if (height < 0.8) return "Knee to thigh";
    if (height < 1.2) return "Thigh to waist";
    if (height < 1.8) return "Waist to head";
    return "Overhead";
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-4">
      
      {/* 1. Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Current Surf Conditions</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          Local time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, WIB (UTC+7)
        </p>
      </div>

      {/* 2. Rating Bar Card */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Condition Rating</span>
               <div className="flex items-center gap-4">
                  <span className={`font-black text-lg tracking-tighter ${ratingInfo.color.replace('bg-', 'text-')}`}>
                    {ratingInfo.label}
                  </span>
                  <div className="flex gap-1">
                     {ratingInfo.segments.map((active, i) => (
                       <div key={i} className={`w-6 h-2 rounded-sm ${active ? ratingInfo.color : 'bg-slate-100'}`} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-2 opacity-40">
            <div className="flex flex-col items-end">
               <span className="text-[8px] font-black uppercase tracking-tighter">LOTUS Forecast</span>
            </div>
            <Info size={14} />
         </div>
      </div>

      {/* 3. Detailed Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Surf Height */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col justify-between h-40">
           <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Surf Height</span>
              <div className="mt-3">
                 <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{surfRange}</h3>
                 <p className="text-xs font-bold text-slate-500 mt-1">{getSurfDesc(surfRange)}</p>
              </div>
           </div>
           <div className="flex items-center gap-1 opacity-30">
              <span className="text-[8px] font-black uppercase tracking-widest">LOTUS Forecast</span>
           </div>
        </div>

        {/* Swells List */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col justify-between lg:col-span-1 h-40">
           <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Swell</span>
              <div className="mt-3 space-y-1.5">
                 {swells.map((s, i) => (
                   <div key={i} className={`flex items-center gap-2 ${i === 0 ? 'text-slate-800' : 'text-slate-400 opacity-80'}`}>
                      <span className={`font-black tracking-tighter ${i === 0 ? 'text-sm' : 'text-xs'}`}>{s.height.toFixed(1)}m</span>
                      <span className={`font-bold ${i === 0 ? 'text-xs' : 'text-[10px]'}`}>{s.period.toFixed(0)}s</span>
                      <Navigation size={i === 0 ? 12 : 10} className={`${i === 0 ? 'text-blue-500 fill-blue-500' : 'text-slate-300'}`} style={{ transform: `rotate(${s.direction}deg)` }} />
                      <span className={`font-bold ${i === 0 ? 'text-xs' : 'text-[10px]'}`}>{s.compass} {s.direction}°</span>
                   </div>
                 ))}
              </div>
           </div>
           <div className="flex items-center gap-1 opacity-30">
              <span className="text-[8px] font-black uppercase tracking-widest">LOTUS Forecast</span>
           </div>
        </div>

        {/* Wind Card + Satellite Dial */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-5 shadow-sm flex items-center justify-between lg:col-span-1 h-40 overflow-hidden">
           <div className="flex flex-col justify-between h-full min-w-[120px]">
              <div>
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Wind</span>
                 <div className="mt-3">
                    <h3 className="text-xl font-black text-slate-800 tracking-tighter">
                       {wind.speed.toFixed(0)}<span className="text-xs font-bold text-slate-400 ml-0.5">kph</span> {wind.compass}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 mt-1">
                       {wind.gusts?.toFixed(0) || wind.speed.toFixed(0)}kph gusts, {wind.texture}
                    </p>
                 </div>
              </div>
              <div className="flex items-center gap-1 opacity-30">
                 <span className="text-[8px] font-black uppercase tracking-widest">Model Forecast</span>
              </div>
           </div>
           
           {/* Visual Wind Dial */}
           <div className="relative h-24 w-24 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-slate-800/90 shadow-xl border border-slate-700 overflow-hidden">
                 {/* Compass Marks */}
                 <div className="absolute inset-1 border border-white/5 rounded-full" />
                 <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[6px] font-black text-white/40">0°</div>
                 <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[6px] font-black text-white/40">180°</div>
                 <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[6px] font-black text-white/40">270°</div>
                 <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[6px] font-black text-white/40">90°</div>
                 
                 {/* Center Arrow */}
                 <div className="absolute inset-0 flex items-center justify-center transition-transform duration-1000" style={{ transform: `rotate(${wind.direction + 180}deg)` }}>
                    <div className="w-10 h-10 flex items-center justify-center">
                       <div className="w-0.5 h-12 bg-gradient-to-t from-white to-transparent absolute bottom-1/2 rounded-full" />
                       <Navigation size={18} className="text-white fill-white drop-shadow-lg" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Tide Card */}
        {tide !== undefined && (
        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col justify-between h-40">
           <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tide</span>
              <div className="mt-3 flex items-baseline gap-2">
                 <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{tide.toFixed(1)}<span className="text-xs font-bold text-slate-400 ml-1">m</span></h3>
                 <ChevronRight size={16} className="text-slate-400 rotate-90" />
              </div>
              
              {/* Mini Tide Graph */}
              <div className="mt-4 h-12 relative w-full overflow-hidden">
                 <svg className="w-full h-full" viewBox="0 0 100 40">
                    <path d="M 0 30 Q 25 10 50 30 T 100 30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                    <path d="M 0 30 Q 25 10 50 30 T 100 30 L 100 40 L 0 40 Z" fill="#f8fafc" />
                    <circle cx="30" cy="20" r="2" fill="#64748b" />
                 </svg>
                 <div className="absolute bottom-0 w-full flex justify-between text-[7px] font-black text-slate-300 uppercase px-1">
                    <span>9am</span>
                    <span>Noon</span>
                    <span>6pm</span>
                 </div>
              </div>
           </div>
        </div>
        )}

        {/* Temp Card */}
        {temperatures && (
        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col justify-between h-40">
           <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Temperature</span>
              <div className="mt-3 flex items-center gap-6">
                 <div className="flex items-center gap-1.5">
                    <Droplets size={16} className="text-blue-400" />
                    <span className="text-xl font-black text-slate-800">{temperatures.water.toFixed(0)}°<span className="text-[10px] ml-0.5">c</span></span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <Sun size={16} className="text-amber-400" />
                    <span className="text-xl font-black text-slate-800">{temperatures.air.toFixed(0)}°<span className="text-[10px] ml-0.5">c</span></span>
                 </div>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-2">Rashguard</p>
           </div>
           
           <button className="flex items-center justify-between w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-white">☀</div>
                 <span className="text-[9px] font-black uppercase text-slate-500">Use SPF 50</span>
              </div>
              <ChevronRight size={10} className="text-slate-400" />
           </button>
        </div>
        )}

      </div>

      {/* Bottom Ad Bar */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl p-4 shadow-sm flex items-center justify-between mt-4 group cursor-pointer hover:bg-white transition-all">
         <span className="text-xs font-bold text-slate-500">Explore surfboards for when the waves get better.</span>
         <div className="flex items-center gap-4">
            <div className="font-black text-xl italic text-slate-800">JS</div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-800 transition-colors" />
         </div>
      </div>

    </div>
  );
};

export default SwellDetails;
