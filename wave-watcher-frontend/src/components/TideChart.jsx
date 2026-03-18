import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { format, parseISO, isToday } from 'date-fns';

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Find all local peaks (high tide) and valleys (low tide) in the height array.
 * A peak at index i means heights[i] > heights[i-1] && heights[i] > heights[i+1].
 */
const findTideExtremes = (heights) => {
  const extremes = [];
  for (let i = 1; i < heights.length - 1; i++) {
    const prev = heights[i - 1];
    const curr = heights[i];
    const next = heights[i + 1];
    if (curr != null && prev != null && next != null) {
      if (curr > prev && curr > next) {
        extremes.push({ index: i, type: 'high', value: curr });
      } else if (curr < prev && curr < next) {
        extremes.push({ index: i, type: 'low', value: curr });
      }
    }
  }
  return extremes;
};

/**
 * Calculate approximate sunrise and sunset for a given date and latitude.
 * Uses a simplified solar equation — accurate to ±15 minutes for low latitudes.
 * Returns { sunriseHour, sunsetHour } as decimal hours in local time.
 */
const getSolarTimes = (dateStr, lat) => {
  try {
    const date     = new Date(dateStr);
    const dayOfYear = Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 86400000
    );
    const B         = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180);
    const eqTime    = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    const latRad    = lat * (Math.PI / 180);
    const declRad   = 23.45 * Math.sin(B) * (Math.PI / 180);
    const cosHA     = -Math.tan(latRad) * Math.tan(declRad);
    if (cosHA < -1 || cosHA > 1) {
      // Polar conditions — return safe defaults
      return { sunriseHour: 6, sunsetHour: 18 };
    }
    const HA        = Math.acos(cosHA) * (180 / Math.PI);
    const sunriseHour = 12 - HA / 15 - eqTime / 60;
    const sunsetHour  = 12 + HA / 15 - eqTime / 60;
    return { sunriseHour, sunsetHour };
  } catch {
    return { sunriseHour: 6, sunsetHour: 18 };
  }
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const TideTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d || d.height == null) return null;
  return (
    <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 px-3 py-2 rounded-xl shadow-xl">
      <p className="text-xs font-black text-slate-600">{d.timeLabel}</p>
      <p className="text-sm font-black text-slate-800">{d.height.toFixed(1)}m</p>
    </div>
  );
};

// ─── Custom High/Low Tide Dot ─────────────────────────────────────────────────

const TideExtremeDot = ({ cx, cy, payload }) => {
  if (!payload?.isExtreme) return null;
  const isHigh = payload.extremeType === 'high';
  const labelY = isHigh ? cy - 28 : cy + 32;
  return (
    <g>
      {/* Dot */}
      <circle cx={cx} cy={cy} r={4} fill={isHigh ? '#1e40af' : '#64748b'} stroke="#fff" strokeWidth={2} />
      {/* Label */}
      <text
        x={cx} y={labelY}
        textAnchor="middle"
        fill={isHigh ? '#1e40af' : '#64748b'}
        fontSize={10}
        fontWeight={800}
      >
        {payload.height?.toFixed(1)}m
      </text>
      <text
        x={cx} y={labelY + 12}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={9}
        fontWeight={600}
      >
        {payload.timeLabel}
      </text>
    </g>
  );
};

// ─── Main TideChart Component ─────────────────────────────────────────────────

/**
 * TideChart
 *
 * Props:
 *   tideForecast  — number[]  — sea_level_height_msl array from Open-Meteo hourly
 *   times         — string[]  — ISO time strings matching tideForecast indexes
 *   lat           — number    — spot latitude (for solar time calculation)
 *   spotName      — string    — displayed in header
 */
const TideChart = ({ tideForecast, times, lat = 0, spotName = '', currentIdx = 0 }) => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => { setHasMounted(true); }, []);

  const chartData = React.useMemo(() => {
    if (!tideForecast?.length || !times?.length) return [];

    // Show full current day: 00:00 to 23:00.
    const todayStart = times.findIndex(t => isToday(parseISO(t)));
    const todayEnd   = times.findLastIndex(t => isToday(parseISO(t)));
    if (todayStart === -1) return [];

    const extremeIndexes = new Set(
      findTideExtremes(tideForecast).map(e => e.index)
    );
    const extremeMap = {};
    findTideExtremes(tideForecast).forEach(e => { extremeMap[e.index] = e; });

    return tideForecast.slice(todayStart, todayEnd + 1).map((h, offset) => {
      const i    = todayStart + offset;
      const time = times[i];
      if (!time) return null;
      const parsed = parseISO(time);
      const isExtreme = extremeIndexes.has(i);
      const hour = parsed.getHours();

      let tickLabel = '';
      if (hour === 0)       tickLabel = 'TODAY';
      else if (hour === 6)  tickLabel = '6AM';
      else if (hour === 12) tickLabel = '12PM';
      else if (hour === 18) tickLabel = '6PM';

      // Override with NOW at the current hour so the red line is correctly placed.
      if (i === currentIdx) tickLabel = 'NOW';

      return {
        key:         time,
        timeLabel:   format(parsed, 'h:mma').toLowerCase(),
        tickLabel,
        hour:        parsed.getHours() + parsed.getMinutes() / 60,
        dateStr:     format(parsed, 'yyyy-MM-dd'),
        height:      h ?? null,
        isExtreme,
        extremeType: extremeMap[i]?.type ?? null,
      };
    }).filter(Boolean);
  }, [tideForecast, times, currentIdx]);

  // nowKey is the ISO timestamp of the current hour.
  // Used to anchor the red ReferenceLine at the correct position mid-chart.
  const nowKey = React.useMemo(() => {
    return chartData.find(d => d.tickLabel === 'NOW')?.key ?? null;
  }, [chartData]);

  // Build daylight ReferenceArea bands
  const daylightBands = React.useMemo(() => {
    const days = [...new Set(chartData.map(d => d.dateStr))];
    return days.map(dateStr => {
      const { sunriseHour, sunsetHour } = getSolarTimes(dateStr, lat);
      const dayPoints = chartData.filter(d => d.dateStr === dateStr);
      if (!dayPoints.length) return null;
      const sunriseKey = dayPoints.reduce((acc, d) =>
        Math.abs(d.hour - sunriseHour) < Math.abs((acc?.hour ?? 99) - sunriseHour) ? d : acc
      , null)?.key;
      const sunsetKey = dayPoints.reduce((acc, d) =>
        Math.abs(d.hour - sunsetHour) < Math.abs((acc?.hour ?? 99) - sunsetHour) ? d : acc
      , null)?.key;
      return { dateStr, sunriseKey, sunsetKey };
    }).filter(Boolean);
  }, [chartData, lat]);

  const minH = Math.min(...chartData.map(d => d.height).filter(h => h != null), 0);
  const maxH = Math.max(...chartData.map(d => d.height).filter(h => h != null), 1.5);
  const yMin = Math.floor(minH * 2) / 2 - 0.2;
  const yMax = Math.ceil(maxH * 2) / 2 + 0.4;

  if (!hasMounted || !chartData.length) return null;

  return (
    <div className="container mx-auto px-6 pb-8">
      <div className="rounded-3xl p-8" style={{background:'rgba(255,255,255,0.025)',border:'0.5px solid rgba(255,255,255,0.07)'}}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-black text-xl tracking-tight" style={{color:'#dde8ff'}}>Tides</h3>
            {spotName && (
              <p className="text-xs font-semibold mt-0.5 uppercase tracking-widest" style={{color:'#536280'}}>
                {spotName}
              </p>
            )}
          </div>
          <div className="flex gap-4">
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
          </div>
        </div>

        {/* Chart */}
        <div style={{ width: '100%', height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 30, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              {/* Nighttime shading — everything outside daylight bands */}
              {/* Night = dark before sunrise and after sunset */}
              {daylightBands.map(({ dateStr, sunriseKey, sunsetKey }) => {
                const allKeys = chartData.map(d => d.key);
                const dayPoints = chartData.filter(d => d.dateStr === dateStr).map(d => d.key);
                const dayStart = dayPoints[0];
                const dayEnd   = dayPoints[dayPoints.length - 1];
                return (
                  <React.Fragment key={dateStr}>
                    {/* Pre-sunrise night band */}
                    <ReferenceArea
                      x1={dayStart}
                      x2={sunriseKey}
                      fill="rgba(0,0,0,0.3)"
                      fillOpacity={0.7}
                    />
                    {/* Post-sunset night band */}
                    <ReferenceArea
                      x1={sunsetKey}
                      x2={dayEnd}
                      fill="rgba(0,0,0,0.3)"
                      fillOpacity={0.7}
                    />
                  </React.Fragment>
                );
              })}

              {/* Single baseline grid at 0m only */}
              <CartesianGrid
                horizontal={false}
                vertical={false}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

              <XAxis
                dataKey="key"
                axisLine={false}
                tickLine={false}
                interval={0}
                height={32}
                tick={({ x, y, payload }) => {
                  const entry = chartData.find(d => d.key === payload?.value);
                  const label = entry?.tickLabel;
                  if (!label) return null;
                  const isNow = label === 'NOW';
                  const isDayLabel = !['6AM','12PM','6PM','NOW'].includes(label);
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0} y={0} dy={14}
                        textAnchor="middle"
                        fill={isNow ? '#ef4444' : isDayLabel ? '#334155' : '#94a3b8'}
                        fontSize={isNow || isDayLabel ? 11 : 10}
                        fontWeight={isNow || isDayLabel ? 800 : 600}
                      >
                        {label}
                      </text>
                    </g>
                  );
                }}
              />

              <YAxis
                domain={[yMin, yMax]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#536280', fontSize: 9, fontWeight: 700 }}
                tickFormatter={v => `${v.toFixed(1)}m`}
                width={36}
              />

              <Tooltip content={<TideTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />

              {/* "Now" vertical reference line */}
              {nowKey && (
                <ReferenceLine
                  x={nowKey}
                  stroke="#ef4444"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  label={{
                    value: 'Now',
                    position: 'insideTopRight',
                    fill: '#ef4444',
                    fontSize: 9,
                    fontWeight: 800,
                    offset: 6,
                  }}
                />
              )}

              {/* Tide curve */}
              <Area
                type="monotone"
                dataKey="height"
                stroke="#1e40af"
                strokeWidth={2}
                fill="url(#tideGradient)"
                dot={<TideExtremeDot />}
                activeDot={{ r: 4, fill: '#1e40af', stroke: '#fff', strokeWidth: 2 }}
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default TideChart;
