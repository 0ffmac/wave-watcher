import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format, parseISO } from 'date-fns';
import { calculateSurfHeight } from '../utils/surfCalculations';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-xl">
        <p className="font-black text-slate-800 mb-2">{label}</p>
        <div className="space-y-1">
           <p className="text-sm font-bold text-blue-500">Surf: {payload[0].value.toFixed(1)}m</p>
           <p className="text-sm font-bold text-slate-500">Wind: {payload[1].value.toFixed(1)}kts</p>
        </div>
      </div>
    );
  }
  return null;
};

const ForecastChart = ({ data, spotId, spotsMetadata }) => {
  const spotMeta = spotsMetadata?.[spotId];

  // data is { times, wave_height, wind_speed, swell_height, swell_period ... }
  const chartData = (data?.times || []).slice(0, 48).map((time, i) => {
    const windDir = data.wind_direction?.[i] ?? 0;
    const windSpeed = data.wind_speed?.[i] ?? 0;

    const pSurf = calculateSurfHeight(
      data.swell_height?.[i] ?? 0,
      data.swell_period?.[i] ?? 12,
      data.swell_direction?.[i] ?? 210,
      windDir,
      windSpeed,
      spotMeta
    );
    const sSurf = calculateSurfHeight(
      data.secondary_swell_height?.[i] ?? 0,
      data.secondary_swell_period?.[i] ?? 8,
      data.secondary_swell_direction?.[i] ?? 240,
      windDir,
      windSpeed,
      spotMeta
    );

    const surfHeight = Math.max(pSurf.max, sSurf.max);

    return {
      time: format(parseISO(time), 'ha'),
      day: format(parseISO(time), 'EEE'),
      wave: surfHeight,
      wind: data?.wind_speed?.[i] ?? 0,
    };
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
           <h3 className="font-black text-xl text-slate-800 tracking-tight">48-Hour Forecast</h3>
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-blue-500 rounded-full" />
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Surf Height (m)</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-slate-400 rounded-full" />
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Wind Speed (kts)</span>
              </div>
           </div>
        </div>

        <div style={{ width: '100%', height: 300, minHeight: 300, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                interval={3}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="wave" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorWave)" 
              />
              <Area 
                type="monotone" 
                dataKey="wind" 
                stroke="#94a3b8" 
                strokeWidth={2}
                fillOpacity={0}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;
