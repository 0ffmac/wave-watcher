import React from "react";
import {
  Navigation,
  Wind,
  Thermometer,
  Droplets,
  Sun,
  ChevronRight,
  Info,
} from "lucide-react";
import { getRatingSegments, getSurfDesc } from "../utils/surfCalculations";
import NearbySpots from "./NearbySpots";

const SwellDetails = ({
  swells,
  wind,
  hourly,
  currentIdx = 0,
  temperatures,
  tide,
  tideForecast,
  rating,
  surfRange,
  activeSpotId,
  activeCountryKey,
  activeRegionKey,
  onSpotSelect,
}) => {
  const getCompass = (d) => {
    if (d === undefined) return "N/A";
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(d / 22.5) % 16];
  };

  const ratingInfo = getRatingSegments(rating);

  // Generate tide path
  const getTidePath = () => {
    if (!tideForecast || tideForecast.length < 24) return "";
    const slice = tideForecast.slice(0, 24);
    const min = Math.min(...slice);
    const max = Math.max(...slice);
    const range = max - min || 1;

    // We lift the graph: 30 is the new bottom baseline (leaving 20 units of 'ground' space)
    const getY = (val) => 30 - ((val - min) / range) * 20;

    let path = `M 0 ${getY(slice[0])}`;
    for (let i = 1; i < slice.length; i++) {
      const x = (i / (slice.length - 1)) * 100;
      const y = getY(slice[i]);
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const tidePath = getTidePath();

  // Prefer the hourly value at current index for consistency with the table.
  // Fall back to data.current.wind.speed if hourly is unavailable.
  const displayWindSpeed =
    (hourly?.wind_speed?.[currentIdx] != null)
      ? hourly.wind_speed[currentIdx]
      : (wind?.speed ?? 0);

  const displayWindDir =
    (hourly?.wind_direction?.[currentIdx] != null)
      ? hourly.wind_direction[currentIdx]
      : (wind?.direction ?? 0);

  const displayWindGusts =
    (hourly?.wind_gusts?.[currentIdx] != null)
      ? hourly.wind_gusts[currentIdx]
      : (wind?.gusts ?? displayWindSpeed);

  return (
    <div className="container mx-auto px-6 py-8 space-y-4">
      {/* 1. Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-black tracking-tight" style={{color:'var(--ww-text)'}}>
          Current Surf Conditions
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{color:'var(--ww-text-2)'}}>
          Local time:{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          , WIB (UTC+7)
        </p>
      </div>

      {/* 2. Rating Bar Card */}
      <div className="rounded-xl p-4 flex items-center justify-between" style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)'}}>
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
              Condition Rating
            </span>
            <div className="flex items-center gap-4">
              <span className="font-black text-lg tracking-tighter" style={{color: ratingInfo.label==='EPIC'?'#8b5cf6':ratingInfo.label==='GOOD'?'#10b981':ratingInfo.label==='FAIR'?'#f59e0b':ratingInfo.label==='BLOWN OUT'?'#ef4444':'#64748b'}}>
                {ratingInfo.label}
              </span>
              <div className="flex gap-1.5">
                {ratingInfo.segments.map((active, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${active ? ratingInfo.color : "bg-slate-100"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2" style={{opacity:0.3}}>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase tracking-tighter" style={{color:'var(--ww-text-2)'}}>
              WaveWatcher Engine • Cloudflare Powered
            </span>
          </div>
          <Info size={14} />
        </div>
      </div>

      {/* 3. Detailed Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Surf Height */}
        <div className="rounded-xl p-5 flex flex-col justify-between h-40" style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)'}}>
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
              Surf Height
            </span>
            <div className="mt-3">
              <h3 className="text-3xl font-black tracking-tighter" style={{color:'var(--ww-accent)'}}>
                {surfRange}
              </h3>
              <p className="text-xs font-bold mt-1" style={{color:'var(--ww-text-2)'}}>
                {getSurfDesc(surfRange)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1" style={{opacity:0.2}}>
            <span className="text-[8px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
              WaveWatcher Engine
            </span>
          </div>
        </div>

        {/* Swells List */}
        <div className="rounded-xl p-5 flex flex-col justify-between lg:col-span-1 h-40" style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)'}}>
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
              Swell
            </span>
            <div className="mt-3 space-y-2">
              {swells &&
                swells.slice(0, 2).map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2" style={{color: i === 0 ? 'var(--ww-text)' : 'var(--ww-text-2)'}}
                  >
                    <span
                      className={`font-black tracking-tighter ${i === 0 ? "text-lg" : "text-xs"}`}
                    >
                      {s.height.toFixed(1)}m
                    </span>
                    <span
                      className={`font-bold ${i === 0 ? "text-sm" : "text-[10px]"}`}
                    >
                      {s.period.toFixed(0)}s
                    </span>
                    <Navigation
                      size={i === 0 ? 14 : 10}
                      className={`${i === 0 ? "text-blue-500 fill-blue-500" : "text-slate-300"}`}
                      style={{ transform: `rotate(${s.direction}deg)` }}
                    />
                    <span
                      className={`font-bold ${i === 0 ? "text-xs" : "text-[10px]"}`}
                    >
                      {s.compass || getCompass(s.direction)}{" "}
                      {s.direction.toFixed(0)}°
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-1" style={{opacity:0.2}}>
            <span className="text-[8px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
              WaveWatcher Engine
            </span>
          </div>
        </div>

        {/* Wind Card + Satellite Dial */}
        <div className="rounded-xl p-5 flex items-center justify-between lg:col-span-1 h-40 overflow-hidden" style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)'}}>
          <div className="flex flex-col justify-between h-full min-w-[120px]">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
                Wind
              </span>
              <div className="mt-3">
                <h3 className="text-xl font-black tracking-tighter" style={{color:'var(--ww-text)'}}>
                  {displayWindSpeed.toFixed(0)}
                  <span className="text-xs font-bold ml-0.5" style={{color:'var(--ww-text-2)'}}>
                    kph
                  </span>{" "}
                  {getCompass(displayWindDir)}
                </h3>
                <p className="text-[10px] font-bold mt-1" style={{color:'var(--ww-text-2)'}}>
                  {displayWindGusts.toFixed(0)}kph gusts,{" "}
                  {wind.texture}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1" style={{opacity:0.2}}>
              <span className="text-[8px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
                Model Forecast
              </span>
            </div>
          </div>

          {/* Visual Wind Dial */}
          <div className="relative h-24 w-24 flex-shrink-0">
            <div className="absolute inset-0 rounded-full overflow-hidden" style={{background:'var(--ww-dropdown-bg)',border:'0.5px solid var(--ww-border)',boxShadow:'0 0 20px var(--ww-accent-bg)'}}>
              {/* Compass Marks */}
              <div className="absolute inset-1 border border-white/5 rounded-full" />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[6px] font-black text-white/40">
                0°
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[6px] font-black text-white/40">
                180°
              </div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[6px] font-black text-white/40">
                270°
              </div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[6px] font-black text-white/40">
                90°
              </div>

              {/* Center Arrow */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-1000"
                style={{ transform: `rotate(${displayWindDir + 180}deg)` }}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="w-0.5 h-12 bg-gradient-to-t from-white to-transparent absolute bottom-1/2 rounded-full" />
                  <Navigation
                    size={18}
                    className="text-white fill-white drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tide Card */}
        {tide !== undefined && (
          <div className="rounded-xl p-5 flex flex-col justify-between h-40" style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)'}}>
            <div className="relative h-full">
              <span className="text-[9px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
                Tide
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-3xl font-black tracking-tighter" style={{color:'var(--ww-accent)'}}>
                  {tide.toFixed(1)}
                  <span className="text-xs font-bold ml-1" style={{color:'var(--ww-text-2)'}}>
                    m
                  </span>
                </h3>
                {tideForecast && tideForecast[1] > tideForecast[0] ? (
                  <div className="text-[10px] text-emerald-500 font-black flex items-center gap-0.5 uppercase tracking-tighter">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-bottom-[6px] border-b-emerald-500" />
                    Rising
                  </div>
                ) : (
                  <div className="text-[10px] text-amber-500 font-black flex items-center gap-0.5 uppercase tracking-tighter">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-top-[6px] border-t-amber-500" />
                    Falling
                  </div>
                )}
              </div>

              {/* Tide Graph */}
              <div className="mt-4 h-16 relative w-full overflow-hidden">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 100 50"
                >
                  <defs>
                    <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`${tidePath} L 100 50 L 0 50 Z`}
                    fill="url(#tideGradient)"
                  />
                  <path
                    d={tidePath}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* Current Position Marker */}
                  <circle
                    cx="0"
                    cy={
                      tideForecast && tideForecast.length > 0 ? (
                        30 -
                        ((tideForecast[0] -
                          Math.min(...tideForecast.slice(0, 24))) /
                          (Math.max(...tideForecast.slice(0, 24)) -
                            Math.min(...tideForecast.slice(0, 24)) || 1)) *
                          20
                      ) : 0
                    }
                    r="2.5"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
                <div className="absolute bottom-4 w-full flex justify-between text-[6px] font-black text-slate-400 uppercase px-1 pointer-events-none">
                  <span>Now</span>
                  <span>12h</span>
                  <span>24h</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Temp Card */}
        {temperatures && (
          <div className="rounded-xl p-5 flex flex-col justify-between h-40" style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)'}}>
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
                Temperature
              </span>
              <div className="mt-3 flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <Droplets size={16} className="text-blue-400" />
                  <span className="text-xl font-black" style={{color:'var(--ww-text)'}}>
                    {temperatures.water.toFixed(0)}°
                    <span className="text-[10px] ml-0.5">c</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun size={16} className="text-amber-400" />
                  <span className="text-xl font-black" style={{color:'var(--ww-text)'}}>
                    {temperatures.air.toFixed(0)}°
                    <span className="text-[10px] ml-0.5">c</span>
                  </span>
                </div>
              </div>
              <p className="text-xs font-bold mt-2" style={{color:'var(--ww-text-2)'}}>Rashguard</p>
            </div>

            <button className="flex items-center justify-between w-full rounded-lg px-3 py-1.5 transition-colors" style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)'}}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-white">
                  ☀
                </div>
                <span className="text-[9px] font-black uppercase" style={{color:'var(--ww-text-2)'}}>
                  Use SPF 50
                </span>
              </div>
              <ChevronRight size={10} style={{color:'var(--ww-text-2)'}} />
            </button>
          </div>
        )}
      </div>

      {/* Nearby Spots Section */}
      <NearbySpots
        activeSpotId={activeSpotId}
        activeCountryKey={activeCountryKey}
        activeRegionKey={activeRegionKey}
        currentSwell={swells[0] || { height: 0, period: 0, direction: 0 }}
        currentWind={wind}
        onSpotSelect={onSpotSelect}
      />
    </div>
  );
};

export default SwellDetails;
