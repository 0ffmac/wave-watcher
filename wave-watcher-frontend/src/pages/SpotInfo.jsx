import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { ArrowLeft, AlertTriangle, Info, Map, Navigation, Calendar } from 'lucide-react';
import { SPOT_INFO } from '../data/spotInfo';

// ─── Difficulty stars ────────────────────────────────────────────────────────
const DifficultyBadge = ({ level, label }) => {
  const colours = {
    1: 'bg-green-100 text-green-700 border-green-200',
    2: 'bg-lime-100 text-lime-700 border-lime-200',
    3: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    4: 'bg-orange-100 text-orange-700 border-orange-200',
    5: 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-black uppercase tracking-widest ${colours[level] || colours[3]}`}>
      {'★'.repeat(level)}{'☆'.repeat(5 - level)} {label}
    </span>
  );
};

// ─── Hazard level pill ───────────────────────────────────────────────────────
const HazardPill = ({ level }) => {
  const map = {
    high:   'bg-red-100 text-red-600 border-red-200',
    medium: 'bg-orange-100 text-orange-600 border-orange-200',
    low:    'bg-yellow-100 text-yellow-600 border-yellow-200',
  };
  return (
    <span className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${map[level] || map.medium}`}>
      {level}
    </span>
  );
};

// ─── Season chart tooltip ────────────────────────────────────────────────────
const SeasonTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-black text-slate-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill || p.stroke }}>
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: <strong>{p.value}/10</strong>
        </p>
      ))}
    </div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
const SpotInfo = ({ activeSpotId }) => {
  const navigate    = useNavigate();
  const spotId      = activeSpotId || 'ujung_bocur';
  const info        = SPOT_INFO[spotId];

  // Graceful fallback if spot has no info page yet
  if (!info) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-slate-400">
        <Info size={48} strokeWidth={1.5} />
        <div className="text-center">
          <p className="text-xl font-black text-slate-700">No Info Available Yet</p>
          <p className="text-sm mt-1">Detailed information for this spot is coming soon.</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-black text-sm hover:bg-blue-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Forecast
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={info.heroImage}
          alt={info.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">
            {info.region} · {info.country}
          </p>
          <h1 className="text-white font-black text-5xl md:text-7xl tracking-tight leading-none mb-4">
            {info.name}
          </h1>
          <DifficultyBadge level={info.difficulty.level} label={info.difficulty.label} />
          <p className="text-white/80 text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
            {info.tagline}
          </p>
        </div>
      </div>

      {/* ── Quick Stats Strip ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {info.stats.map((s, i) => (
              <div key={i} className="flex-shrink-0 px-6 py-5 border-r border-slate-100 last:border-0 text-center min-w-[120px]">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-sm font-black text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-12 space-y-10">

        {/* Story */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="font-black text-3xl text-slate-800 mb-6">{info.story.heading}</h2>
          <div className="space-y-4 max-w-3xl">
            {info.story.body.map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-base">{para}</p>
            ))}
          </div>
        </div>

        {/* Technical breakdown */}
        <div>
          <h2 className="font-black text-2xl text-slate-800 mb-5 px-1">Technical Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {info.technical.map((t, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{t.icon}</span>
                  <h3 className="font-black text-slate-800 text-base">{t.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{t.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hazards */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={22} className="text-orange-500" />
            <h2 className="font-black text-2xl text-slate-800">Hazards</h2>
          </div>
          <div className="space-y-4">
            {info.hazards.map((h, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex-shrink-0 pt-0.5">
                  <HazardPill level={h.level} />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm mb-1">{h.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{h.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 italic">
            {info.difficulty.note}
          </p>
        </div>

        {/* Best Season Chart */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={22} className="text-blue-500" />
            <h2 className="font-black text-2xl text-slate-800">Best Time of Year</h2>
          </div>
          <p className="text-slate-400 text-sm mb-6 ml-9">{info.seasonNote}</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={info.seasonChart} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                />
                <YAxis
                  domain={[0, 10]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                  tickFormatter={v => `${v}`}
                />
                <Tooltip content={<SeasonTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="overall" radius={[6, 6, 0, 0]} name="overall">
                  {info.seasonChart.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.overall >= 9
                        ? '#1d4ed8'
                        : entry.overall >= 7
                          ? '#3b82f6'
                          : entry.overall >= 5
                            ? '#93c5fd'
                            : '#dbeafe'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center mt-4">
            {[
              { colour: 'bg-blue-800', label: 'Epic (9–10)' },
              { colour: 'bg-blue-500', label: 'Good (7–8)' },
              { colour: 'bg-blue-300', label: 'Fair (5–6)' },
              { colour: 'bg-blue-100', label: 'Slow (1–4)' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${item.colour}`} />
                <span className="text-xs font-semibold text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Access Guide */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Navigation size={22} className="text-green-500" />
            <h2 className="font-black text-2xl text-slate-800">How to Get There</h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
            {info.access.overview}
          </p>
          <ol className="space-y-3">
            {info.access.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-slate-600 text-sm leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
            <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-1">Local Tip</p>
            <p className="text-sm text-blue-600">{info.access.tip}</p>
          </div>
        </div>

        {/* Photo Gallery */}
        <div>
          <h2 className="font-black text-2xl text-slate-800 mb-5 px-1">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {info.gallery.map((photo, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-3xl shadow-xl ${i === 0 ? 'col-span-2 row-span-2 md:col-span-2' : ''}`}
                style={{ minHeight: i === 0 ? '320px' : '160px' }}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white/90 text-xs font-semibold">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SpotInfo;
