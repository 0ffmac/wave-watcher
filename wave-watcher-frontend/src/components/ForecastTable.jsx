import React, { useState } from "react";
import { format, parseISO, isSameDay } from "date-fns";
import {
  Wind,
  Navigation,
  Droplets,
  Sun,
  Cloud,
  CloudRain,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  calculateSurfHeight,
  calculateEnergy,
  calculateConditionRating,
} from "../utils/surfCalculations";
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

// Helper for cardinal directions
const getCardinal = (deg) => {
  if (deg === null || deg === undefined) return "N/A";
  const dirs = [
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
  const ix = Math.floor((deg + 11.25) / 22.5);
  return dirs[ix % 16];
};

const ForecastTable = ({
  data,
  spotId,
  spotsMetadata,
  finalScaleFactor = 1.0,   // replaces inputScaleFactor — combined regional + spot factor
  energyMultiplier = 14,
  currentIdx = 0,
}) => {
  const [expandedDays, setExpandedDays] = useState({});
  const spotMeta = spotsMetadata?.[spotId];
  const periodCorrection = getPeriodCorrection(spotMeta?.region);

  const toggleDay = (dayStr) => {
    setExpandedDays((prev) => ({ ...prev, [dayStr]: !prev[dayStr] }));
  };

  const intervals = [6, 12, 18];

  // Group ALL hourly data by day
  const days = [];
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  (data?.times || []).forEach((timeStr, i) => {
    const date = parseISO(timeStr);
    const dayStr = format(date, "yyyy-MM-dd");

    // Only process today and future days
    if (date < todayStart && !isSameDay(date, new Date())) return;

    let dayEntry = days.find((d) => d.dateStr === dayStr);

    if (!dayEntry) {
      dayEntry = {
        dateStr: dayStr,
        displayDate: format(date, "EEEE, M/d"),
        isToday: isSameDay(date, new Date()),
        allHours: [],
      };
      days.push(dayEntry);
    }

    const pSwellHeight  = data.swell_height?.[i] ?? 0;
    const pSwellPeriodRaw = data.swell_period?.[i] ?? 12;
    const pSwellPeriod  = pSwellPeriodRaw * periodCorrection;   // corrected for display + energy
    const pSwellDir     = data.swell_direction?.[i] ?? 210;

    const sSwellHeight  = data.secondary_swell_height?.[i] ?? 0;
    const sSwellPeriodRaw = data.secondary_swell_period?.[i] ?? 8;
    const sSwellPeriod  = sSwellPeriodRaw * periodCorrection;   // corrected for display + energy
    const sSwellDir     = data.secondary_swell_direction?.[i] ?? 240;

    const windSpeed = data.wind_speed?.[i] ?? 0;
    const windDir = data.wind_direction?.[i] ?? 0;

    // Calculate surf from both swells
    const pSurf = calculateSurfHeight(
      pSwellHeight,
      pSwellPeriod,
      pSwellDir,
      windDir,
      windSpeed,
      spotMeta,
      finalScaleFactor,
    );
    const sSurf = (sSwellPeriod >= MIN_SURF_PERIOD)
      ? calculateSurfHeight(
          sSwellHeight,
          sSwellPeriod,
          sSwellDir,
          windDir,
          windSpeed,
          spotMeta,
          finalScaleFactor,
        )
      : { min: 0, max: 0, windFactor: 1.0, directionalFactor: 1.0 };

    // Dominant-wave approach: report the larger swell rather than summing both.
    // Prevents over-reporting on messy beach breaks with multiple small swell trains.
    const surfMin = Math.max(pSurf.min, sSurf.min);
    const surfMax = Math.max(pSurf.max, sSurf.max);

    // Condition Rating
    const dominant = pSurf.max >= sSurf.max ? pSurf : sSurf;
    const rating = calculateConditionRating(
      surfMax,
      windSpeed,
      dominant.windFactor,
      dominant.directionalFactor,
      spotMeta?.breakType,
      surfMax
    );
    const getRatingColor = (r) => {
      if (r === "EPIC") return "bg-purple-500";
      if (r === "GOOD") return "bg-emerald-400";
      if (r === "FAIR") return "bg-yellow-400";
      if (r === "POOR") return "bg-orange-400";
      if (r === "BLOWN OUT") return "bg-red-400";
      return "bg-slate-300";
    };

    // Energy: centralized calculation
    const eMult = Math.max(energyMultiplier, getEnergyMultiplier(spotMeta?.region));
    // Energy uses the calculated surf face height (surfMax) — not raw Hs.
    // surfMax already incorporates directionalFactor, windFactor, breakFactor
    // and chopDamping, so energy stays consistent with the Surf (m) column.
    // A 0.6m surf face cannot show 650kJ — it should show ~150–200kJ.
    const energyValue = calculateEnergy(surfMax, pSwellPeriod, eMult);


    dayEntry.allHours.push({
      idx: i,
      timestamp: date,
      time: format(date, "ha").toLowerCase(),
      hour: date.getHours(),
      wave: data.wave_height?.[i] ?? 0,
      surfMin,
      surfMax,
      ratingColor: getRatingColor(rating),
      wind: windSpeed,
      windDir: windDir,
      gust: data.wind_gusts?.[i] ?? 0,
      primarySwell: {
        height: parseFloat(((pSwellHeight ?? 0) * finalScaleFactor).toFixed(2)),
        period: Math.round(pSwellPeriod),
        dir: pSwellDir,
      },
      secondarySwell: {
        height: parseFloat(((sSwellHeight ?? 0) * finalScaleFactor).toFixed(2)),
        period: Math.round(sSwellPeriod),
        dir: sSwellDir,
      },
      energy: energyValue,
      temp: Math.round(data.temperature?.[i] ?? 26),
      rain: data.rain?.[i] ?? 0,
      cloudCover: data.cloud_cover?.[i] ?? 0,
    });
  });

  return (
    <div className="space-y-4">
      {days.slice(0, 6).map((day) => {
        const isExpanded = expandedDays[day.dateStr];
        let displayRows = isExpanded
          ? day.allHours
          : day.allHours.filter((h) => intervals.includes(h.hour));

        // Filter out past hours for today using currentIdx (timezone-safe).
        // currentIdx is computed in dataTransformers.js using the spot's own timezone
        // via the JS Intl API — always correct regardless of the user's browser timezone.
        // We show from currentIdx - 1 so the most recently completed hour stays visible.
        if (day.isToday) {
          displayRows = displayRows.filter((h) => h.idx >= currentIdx - 1);
        }

        // If it's today and all hours are past, don't show the day at all
        if (day.isToday && displayRows.length === 0) return null;

        return (
          <div
            key={day.dateStr}
            className="rounded-2xl overflow-hidden transition-all duration-300" style={{background:'var(--ww-card-2)',border:'0.5px solid var(--ww-border)'}}
          >
            {/* Day Header - Clickable */}
            <div
              onClick={() => toggleDay(day.dateStr)}
              className="px-6 py-3 flex items-center justify-between cursor-pointer transition-colors" style={{borderBottom:'0.5px solid var(--ww-border)',background:'var(--ww-card-2)'}}
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown size={14} className="text-slate-400" />
                ) : (
                  <ChevronRight size={14} className="text-slate-400" />
                )}
                <h3 className="font-black text-xs tracking-tight flex items-center gap-2" style={{color:'var(--ww-text)'}}>
                    {day.displayDate}
                    {day.isToday && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-widest" style={{background:'var(--ww-accent-bg)',color:'var(--ww-accent)'}}>
                        Today
                      </span>
                    )}
                  </h3>              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{color:'var(--ww-text-3)'}}>
                {isExpanded ? "Click to collapse" : "Click for hourly view"}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
                <thead>
                  <tr className="text-[9px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-3)',borderBottom:'0.5px solid var(--ww-border-2)'}}>
                    <th className="pl-6 py-2 w-16">Time</th>
                    <th className="px-2 py-2 w-24">Surf (m)</th>
                    <th className="px-2 py-2 w-44">Primary Swell</th>
                    <th className="px-2 py-2 w-40">Secondary Swell</th>
                    <th className="px-2 py-2 w-32">Wind</th>
                    <th className="px-2 py-2 text-center w-20">Energy</th>
                    <th className="px-2 py-2 text-center w-20">Weather</th>
                    <th className="pr-6 py-2 text-right w-16">Rain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/20">
                  {displayRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="group transition-colors"
                      style={{
                        background: row.idx === currentIdx
                          ? 'var(--ww-row-now)'
                          : 'transparent',
                      }}
                    >
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
                        <span className="font-black text-[10px]" style={{color: row.idx === currentIdx ? '#ef4444' : 'var(--ww-text-2)'}}>
                          {row.idx === currentIdx ? 'NOW' : row.time}
                        </span>
                      </td>

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
                          <span className="font-bold text-[9px]" style={{color:'var(--ww-text-2)'}}>{row.surfMin.toFixed(1)}–{row.surfMax.toFixed(1)}m</span>
                        </div>
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{background:'var(--ww-inline-card)',border:'0.5px solid var(--ww-inline-border)'}}>
                          <span className="font-black text-[11px]" style={{color:'var(--ww-text)'}}>
                            {row.primarySwell.height.toFixed(1)}
                            <span className="text-[8px] ml-0.5" style={{opacity:0.4,color:'var(--ww-text-2)'}}>
                              m
                            </span>
                          </span>
                          <span className="font-bold text-[10px]" style={{color:'var(--ww-text-2)'}}>
                            {row.primarySwell.period}s
                          </span>
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="text-[9px] font-bold" style={{color:'var(--ww-text-2)'}}>
                              {getCardinal(row.primarySwell.dir)}
                            </span>
                            <Navigation
                              size={10}
                              className="text-blue-400 fill-blue-400"
                              style={{
                                transform: `rotate(${row.primarySwell.dir}deg)`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2 px-1">
                          <span className="font-black text-[10px]" style={{color:'var(--ww-text-2)'}}>
                            {row.secondarySwell.height.toFixed(1)}m
                          </span>
                          <span className="font-bold text-[9px]" style={{color:'var(--ww-text-3)'}}>
                            {row.secondarySwell.period}s
                          </span>
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="text-[8px] font-black uppercase" style={{color:'var(--ww-text-3)'}}>
                              {getCardinal(row.secondarySwell.dir)}
                            </span>
                            <Navigation
                              size={9}
                              className="text-blue-300 fill-blue-300/20"
                              style={{
                                transform: `rotate(${row.secondarySwell.dir}deg)`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col items-end min-w-[24px]">
                            <span className="font-black text-[11px] leading-none" style={{color:'var(--ww-text)'}}>
                              {row.wind.toFixed(0)}
                            </span>
                            <span className="text-[8px] font-bold" style={{color:'rgba(239,68,68,0.6)'}}>
                              {row.gust.toFixed(0)}
                              <span className="text-[7px] ml-0.5" style={{opacity:0.6}}>g</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md" style={{background:'var(--ww-wind-pill-bg)',border:'0.5px solid var(--ww-wind-pill-border)'}}>
                            <span className="text-[9px] font-bold" style={{color:'var(--ww-accent)'}}>
                              {getCardinal(row.windDir)}
                            </span>
                            <Navigation
                              size={10}
                              style={{color:'var(--ww-accent)',fill:'rgba(34,211,238,0.15)', transform: `rotate(${row.windDir}deg)`}}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-1 items-end">
                          <span className="font-black text-[10px] tracking-tighter" style={{color:'var(--ww-text)'}}>
                            {row.energy}
                            <span className="text-[8px] ml-0.5 uppercase" style={{opacity:0.35,color:'var(--ww-text-2)'}}>kj</span>
                          </span>
                          <div className="h-[3px] rounded-full overflow-hidden" style={{width:'48px',background:'var(--ww-border)'}}>
                            <div className="h-full rounded-full" style={{width:`${Math.min(100,(row.energy/400)*100)}%`,background:'var(--ww-accent)'}}/>
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex items-center justify-center gap-1.5">
                          {(() => {
                            const isDay = row.hour >= 6 && row.hour <= 18;
                            if (row.rain > 0.5) return <CloudRain size={12} className="text-blue-400" />;
                            if (isDay && row.cloudCover < 40) return <Sun size={12} className="text-amber-400" />;
                            return <Cloud size={12} className="text-slate-300" />;
                          })()}
                          <span className="font-black text-[10px]" style={{color:'var(--ww-text-2)'}}>
                            {row.temp}°
                          </span>
                        </div>
                      </td>

                      <td className="pr-6 py-2 text-right">
                        <span className="font-black text-[9px] tracking-widest" style={{color:'var(--ww-text-2)'}}>
                          {row.rain > 0 ? `${row.rain.toFixed(1)}` : "–"}
                          {row.rain > 0 && (
                            <span className="text-[7px] ml-0.5 opacity-50">mm</span>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastTable;
