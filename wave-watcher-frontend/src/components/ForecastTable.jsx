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
import { MIN_SURF_PERIOD } from '../utils/spotConstants';

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

const ForecastTable = ({ data, spotId, spotsMetadata, inputScaleFactor = 1.0, energyMultiplier = 14 }) => {
  const [expandedDays, setExpandedDays] = useState({});
  const spotMeta = spotsMetadata?.[spotId];

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

    const pSwellHeight = data.swell_height?.[i] ?? 0;
    const pSwellPeriod = data.swell_period?.[i] ?? 12;
    const pSwellDir = data.swell_direction?.[i] ?? 210;

    const sSwellHeight = data.secondary_swell_height?.[i] ?? 0;
    const sSwellPeriod = data.secondary_swell_period?.[i] ?? 8;
    const sSwellDir = data.secondary_swell_direction?.[i] ?? 240;

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
      inputScaleFactor,
    );
    const sSurf = (sSwellPeriod >= MIN_SURF_PERIOD)
      ? calculateSurfHeight(
          sSwellHeight,
          sSwellPeriod,
          sSwellDir,
          windDir,
          windSpeed,
          spotMeta,
          inputScaleFactor,
        )
      : { min: 0, max: 0, windFactor: 1.0, directionalFactor: 1.0 };

    const surfMin = Math.sqrt(pSurf.min ** 2 + sSurf.min ** 2);
    const surfMax = Math.sqrt(pSurf.max ** 2 + sSurf.max ** 2);

    // Condition Rating
    const dominant = pSurf.max >= sSurf.max ? pSurf : sSurf;
    const rating = calculateConditionRating(
      surfMax,
      windSpeed,
      dominant.windFactor,
      dominant.directionalFactor,
      spotMeta?.breakType // ADDED
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
    const eMult = energyMultiplier;
    const energyValue =
      calculateEnergy(pSwellHeight, pSwellPeriod, eMult) +
      calculateEnergy(sSwellHeight, sSwellPeriod, eMult);

    dayEntry.allHours.push({
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
        height: pSwellHeight,
        period: Math.round(pSwellPeriod),
        dir: pSwellDir,
      },
      secondarySwell: {
        height: sSwellHeight,
        period: Math.round(sSwellPeriod),
        dir: sSwellDir,
      },
      energy: energyValue,
      temp: Math.round(data.temperature?.[i] ?? 26),
      rain: data.rain?.[i] ?? 0,
      cloudCover: data.cloud_cover?.[i] ?? 0,
    });
  });

  const now = new Date();

  return (
    <div className="space-y-4">
      {days.slice(0, 6).map((day) => {
        const isExpanded = expandedDays[day.dateStr];
        let displayRows = isExpanded
          ? day.allHours
          : day.allHours.filter((h) => intervals.includes(h.hour));

        // Filter out past hours for today
        if (day.isToday) {
          displayRows = displayRows.filter((h) => h.timestamp >= now);
        }

        // If it's today and all hours are past, don't show the day at all
        if (day.isToday && displayRows.length === 0) return null;

        return (
          <div
            key={day.dateStr}
            className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
          >
            {/* Day Header - Clickable */}
            <div
              onClick={() => toggleDay(day.dateStr)}
              className="px-6 py-3 border-b border-white/40 flex items-center justify-between bg-white/20 cursor-pointer hover:bg-white/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown size={14} className="text-slate-400" />
                ) : (
                  <ChevronRight size={14} className="text-slate-400" />
                )}
                <h3 className="font-black text-xs text-slate-800 tracking-tight flex items-center gap-2">
                  {day.displayDate}
                  {day.isToday && (
                    <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                      Today
                    </span>
                  )}
                </h3>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {isExpanded ? "Click to collapse" : "Click for hourly view"}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
                <thead>
                  <tr className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100/50 bg-slate-50/30">
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
                      className="group hover:bg-white/60 transition-colors"
                    >
                      <td className="pl-6 py-2">
                        <span className="font-black text-[10px] text-slate-400 group-hover:text-slate-600">
                          {row.time}
                        </span>
                      </td>

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
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="text-[9px] font-bold text-slate-400">
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
                          {" "}
                          {/* Removed opacity-70 */}
                          <span className="font-black text-slate-500 text-[10px]">
                            {row.secondarySwell.height.toFixed(1)}m
                          </span>
                          <span className="font-bold text-slate-400 text-[9px]">
                            {row.secondarySwell.period}s
                          </span>
                          <div className="flex items-center gap-1 ml-auto">
                            {/* Cardinal direction now much clearer */}
                            <span className="text-[8px] font-black text-slate-400 uppercase">
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
                            <span className="font-black text-[11px] text-slate-800 leading-none">
                              {row.wind.toFixed(0)}
                            </span>
                            <span className="text-[8px] font-bold text-red-400/70">
                              {row.gust.toFixed(0)}
                              <span className="text-[7px] opacity-60 ml-0.5">g</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1 bg-blue-50/50 px-1.5 py-0.5 rounded-md border border-blue-100/50">
                            <span className="text-[9px] font-bold text-blue-600">
                              {getCardinal(row.windDir)}
                            </span>
                            <Navigation
                              size={10}
                              className="text-blue-600 fill-blue-50"
                              style={{ transform: `rotate(${row.windDir}deg)` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-2 text-center">
                        <span className="font-black text-slate-400 text-[10px] tracking-tighter">
                          {row.energy}
                          <span className="text-[8px] ml-0.5 opacity-40 uppercase">
                            kj
                          </span>
                        </span>
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex items-center justify-center gap-1.5">
                          {(() => {
                            const isDay = row.hour >= 6 && row.hour <= 18;
                            if (row.rain > 0.5) return <CloudRain size={12} className="text-blue-400" />;
                            if (isDay && row.cloudCover < 40) return <Sun size={12} className="text-amber-400" />;
                            return <Cloud size={12} className="text-slate-300" />;
                          })()}
                          <span className="font-black text-slate-600 text-[10px]">
                            {row.temp}°
                          </span>
                        </div>
                      </td>

                      <td className="pr-6 py-2 text-right">
                        <span className="font-black text-slate-400 text-[9px] tracking-widest">
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
