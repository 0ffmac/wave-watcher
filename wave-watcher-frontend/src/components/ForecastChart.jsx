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
import { format, parseISO, isToday } from 'date-fns';
import { calculateSurfHeight } from '../utils/surfCalculations';

// ─── Helpers ────────────────────────────────────────────────────────────────

const getCardinalArrow = (deg) => {
  if (deg == null) return '–';
  const arrows = ['↑','↗','→','↘','↓','↙','←','↖'];
  return arrows[Math.round(((deg % 360) + 360) % 360 / 45) % 8];
};

const kmhToKnots = (kmh) => +(kmh / 1.852).toFixed(1);

const TIME_LABELS = {
  0: '12AM', 3: '3AM', 6: '6AM', 9: '9AM',
  12: '12PM', 15: '3PM', 18: '6PM', 21: '9PM',
};

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="backdrop-blur-md p-4 rounded-2xl shadow-2xl min-w-[160px]" style={{background:'var(--ww-tooltip-bg)',border:'0.5px solid var(--ww-border)'}}>
      <p className="font-black text-sm mb-3 pb-2" style={{color:'var(--ww-text)',borderBottom:'0.5px solid var(--ww-border)'}}>
        {d.timeLabel}
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>Surf</span>
          <span className="text-sm font-black text-blue-500">{d.surf.toFixed(1)}m</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>Wind</span>
          <span className="text-sm font-black text-slate-500">{d.windKnots}kts</span>
        </div>
        {d.period > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>Period</span>
            <span className="text-sm font-black text-indigo-400">{d.period}s</span>
          </div>
        )}
        {d.swellDir != null && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>Swell</span>
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

  const isNow = label === 'NOW';
  const isDayLabel = ['TODAY', 'TMW', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].includes(label);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill={isNow ? '#ef4444' : isDayLabel ? '#334155' : '#94a3b8'}
        fontSize={isNow || isDayLabel ? 11 : 10}
        fontWeight={isNow || isDayLabel ? 800 : 600}
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

    // Show the full current day: 00:00 to 23:00.
    // NOW is marked at currentIdx so the red line moves as time passes.
    const todayStart = times.findIndex(t => isToday(parseISO(t)));
    const todayEnd   = times.findLastIndex(t => isToday(parseISO(t)));
    if (todayStart === -1) return [];

    return times.slice(todayStart, todayEnd + 1).map((time, offset) => {
      const i = todayStart + offset;

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

      const parsed    = parseISO(time);
      const timeLabel = format(parsed, 'ha');
      const hour      = parsed.getHours();

      // Mark the current hour as NOW; all others get 3-hourly labels.
      let tickLabel = i === currentIdx ? 'NOW' : (TIME_LABELS[hour] ?? '');

      return {
        key:       time,
        timeLabel,
        tickLabel,
        surf:      +Math.max(pSurf.max, sSurf.max).toFixed(2),
        windKnots: kmhToKnots(windSpeed),
        period:    Math.round(period),
        swellDir,
      };
    });
  }, [data, spotMeta, inputScaleFactor, currentIdx]);

  // Max values for Y-axis domains
  const maxSurf = Math.max(...chartData.map(d => d.surf), 1);
  const maxWind = Math.max(...chartData.map(d => d.windKnots), 5);

  if (!hasMounted) return null;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="rounded-3xl p-8" style={{background:'var(--ww-card-2)',border:'0.5px solid var(--ww-border)'}}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-black text-xl tracking-tight" style={{color:'var(--ww-text)'}}>Today's Forecast</h3>
            <p className="text-xs font-semibold mt-0.5 uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
              Surf height · Wind speed
            </p>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{background:'var(--ww-accent)',boxShadow:'0 0 8px var(--ww-accent-bg)'}} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>Surf (m)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8" style={{borderTop:'2px dashed rgba(245,158,11,0.7)'}} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>Wind (kts)</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
              <defs>
                <linearGradient id="surfGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--ww-chart-grid)"
              />

              {/* "Now" indicator */}
              <ReferenceLine
                x="NOW"
                stroke="#ef4444"
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />

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
                tick={{ fill: '#22d3ee', fontSize: 9, fontWeight: 700 }}
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
                tick={{ fill: 'rgba(245,158,11,0.6)', fontSize: 9, fontWeight: 700 }}
                tickFormatter={v => `${v}kt`}
                width={36}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

              {/* Surf Height — Area */}
              <Area
                yAxisId="surf"
                type="monotone"
                dataKey="surf"
                stroke="#22d3ee"
                strokeWidth={2.5}
                fill="url(#surfGradient)"
                dot={false}
                activeDot={{ r: 5, fill: '#22d3ee', strokeWidth: 2, stroke: '#06101f' }}
                connectNulls
              />

              {/* Wind Speed — dashed Line */}
              <Line
                yAxisId="wind"
                type="monotone"
                dataKey="windKnots"
                stroke="rgba(245,158,11,0.7)"
                strokeWidth={1.8}
                strokeDasharray="5 4"
                dot={false}
                activeDot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#06101f' }}
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
