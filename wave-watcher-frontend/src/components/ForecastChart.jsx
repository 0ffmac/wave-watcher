import React from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';
import { calculateSurfHeight } from '../utils/surfCalculations';

// ─── Helpers ────────────────────────────────────────────────────────────────

const getCardinalArrow = (deg) => {
  if (deg == null) return '–';
  const arrows = ['↑','↗','→','↘','↓','↙','←','↖'];
  return arrows[Math.round(((deg % 360) + 360) % 360 / 45) % 8];
};

const kmhToKnots = (kmh) => +(kmh / 1.852).toFixed(1);

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 rounded-2xl shadow-2xl min-w-[160px]">
      <p className="font-black text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">
        {d.dayLabel} · {d.timeLabel}
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Surf</span>
          <span className="text-sm font-black text-blue-500">{d.surf.toFixed(1)}m</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Wind</span>
          <span className="text-sm font-black text-slate-500">{d.windKnots}kts</span>
        </div>
        {d.period > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Period</span>
            <span className="text-sm font-black text-indigo-400">{d.period}s</span>
          </div>
        )}
        {d.swellDir != null && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Swell</span>
            <span className="text-sm font-black text-slate-500">
              {getCardinalArrow(d.swellDir)} {Math.round(d.swellDir)}°
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── X-axis tick renderer ─────────────────────────────────────────────────────

const ChartTick = ({ x, y, payload }) => {
  const label = payload?.value;
  if (!label) return null;

  const isDayLabel = ['TODAY', 'TMW', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].includes(label);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill={isDayLabel ? '#334155' : '#94a3b8'}
        fontSize={isDayLabel ? 11 : 10}
        fontWeight={isDayLabel ? 800 : 600}
        letterSpacing={isDayLabel ? 0.5 : 0}
      >
        {label}
      </text>
    </g>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const ForecastChart = ({ data, spotId, spotsMetadata, inputScaleFactor = 1.0, currentIdx = 0 }) => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => { setHasMounted(true); }, []);

  const spotMeta = spotsMetadata?.[spotId];

  // Build chart data for the next 48 hours
  const chartData = React.useMemo(() => {
    const times = data?.times || [];
    if (!times.length) return [];

    // Start from currentIdx so the chart always opens at the present hour —
    // matching exactly what ForecastTable shows as its first row.
    // Show 48 hours forward from now.
    const start = currentIdx ?? 0;
    let lastDay = null;

    return times.slice(start, start + 48).map((time, offset) => {
      const i = start + offset;   // ← real index into the data arrays

      const windDir   = data.wind_direction?.[i]  ?? 0;
      const windSpeed = data.wind_speed?.[i]       ?? 0;
      const swellDir  = data.swell_direction?.[i]  ?? 0;
      const period    = data.swell_period?.[i]     ?? 0;

      const pSurf = calculateSurfHeight(
        data.swell_height?.[i]           ?? 0,
        period,
        swellDir,
        windDir, windSpeed, spotMeta, inputScaleFactor
      );
      const sSurf = calculateSurfHeight(
        data.secondary_swell_height?.[i]  ?? 0,
        data.secondary_swell_period?.[i]  ?? 0,
        data.secondary_swell_direction?.[i] ?? 0,
        windDir, windSpeed, spotMeta, inputScaleFactor
      );

      const parsed   = parseISO(time);
      const timeLabel = format(parsed, 'ha');
      const dayStr   = format(parsed, 'EEE').toUpperCase();
      const isNewDay = dayStr !== lastDay;
      if (isNewDay) lastDay = dayStr;

      const dayLabel = isNewDay
        ? (isToday(parsed) ? 'TODAY' : isTomorrow(parsed) ? 'TMW' : dayStr)
        : '';

      const hour = parsed.getHours();
      let tickLabel = '';
      if (hour === 0)  tickLabel = isNewDay
        ? (isToday(parsed) ? 'TODAY' : isTomorrow(parsed) ? 'TMW' : dayStr)
        : '';
      else if (hour === 6)  tickLabel = '6AM';
      else if (hour === 12) tickLabel = '12PM';
      else if (hour === 18) tickLabel = '6PM';

      return {
        key:       time,
        dayLabel,
        timeLabel,
        tickLabel,
        xLabel:    `${dayLabel}|${timeLabel}`,
        surf:      +Math.max(pSurf.max, sSurf.max).toFixed(2),
        windKnots: kmhToKnots(windSpeed),
        period:    Math.round(period),
        swellDir,
        isNewDay,
      };
    });
  }, [data, spotMeta, inputScaleFactor, currentIdx]);

  // Find day-boundary tickLabels for ReferenceLine separators
  const dayBoundaries = chartData
    .filter((d, i) => d.isNewDay && i > 0)
    .map(d => d.tickLabel)
    .filter(Boolean);

  // Max values for Y-axis domains
  const maxSurf = Math.max(...chartData.map(d => d.surf), 1);
  const maxWind = Math.max(...chartData.map(d => d.windKnots), 5);

  if (!hasMounted) return null;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-black text-xl text-slate-800 tracking-tight">48-Hour Forecast</h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5 uppercase tracking-widest">
              Surf height · Wind speed
            </p>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Surf (m)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 border-t-2 border-dashed border-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Wind (kts)</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
              <defs>
                <linearGradient id="surfGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              {/* Day separator reference lines */}
              {dayBoundaries.map(label => (
                <ReferenceLine
                  key={label}
                  x={label}
                  stroke="#cbd5e1"
                  strokeWidth={1}
                  strokeDasharray="4 2"
                  label={{ value: '', position: 'top' }}
                />
              ))}

              <XAxis
                dataKey="tickLabel"
                axisLine={false}
                tickLine={false}
                tick={<ChartTick />}
                interval={0}
                height={36}
              />

              {/* Left Y-axis — Surf Height */}
              <YAxis
                yAxisId="surf"
                orientation="left"
                domain={[0, Math.ceil(maxSurf * 1.3)]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#3b82f6', fontSize: 10, fontWeight: 700 }}
                tickFormatter={v => `${v}m`}
                width={36}
              />

              {/* Right Y-axis — Wind Speed */}
              <YAxis
                yAxisId="wind"
                orientation="right"
                domain={[0, Math.ceil(maxWind * 1.4)]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                tickFormatter={v => `${v}kt`}
                width={36}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

              {/* Surf Height — Area */}
              <Area
                yAxisId="surf"
                type="monotone"
                dataKey="surf"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#surfGradient)"
                dot={false}
                activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                connectNulls
              />

              {/* Wind Speed — dashed Line */}
              <Line
                yAxisId="wind"
                type="monotone"
                dataKey="windKnots"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                activeDot={{ r: 4, fill: '#94a3b8', strokeWidth: 2, stroke: '#fff' }}
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default ForecastChart;
