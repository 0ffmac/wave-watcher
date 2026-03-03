import React from 'react';

const HeroSection = ({ spotName, rating, surfRange, location }) => {
  const getRatingColor = (r) => {
    if (!r) return 'bg-slate-200';
    if (r.includes('EPIC')) return 'bg-purple-500';
    if (r.includes('GOOD')) return 'bg-emerald-500';
    if (r.includes('FAIR')) return 'bg-yellow-500';
    if (r.includes('POOR')) return 'bg-orange-500';
    if (r.includes('RAINY')) return 'bg-blue-400';
    if (r.includes('BLOWN OUT')) return 'bg-red-500';
    if (r.includes('FLAT')) return 'bg-slate-400';
    return 'bg-blue-500';
  };

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-end">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/ocean wave.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 pb-12 relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <span className={`px-4 py-1.5 rounded-full text-white font-black text-sm tracking-widest shadow-lg ${getRatingColor(rating)} animate-pulse`}>
                {rating}
             </span>
             <span className="text-white/80 font-medium tracking-tight bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                {location}
             </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
            {spotName}
          </h1>
          <p className="text-3xl md:text-4xl font-bold text-white/90 tracking-tight">
            {surfRange}
          </p>
        </div>

        <div className="flex flex-col gap-2">
           <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
             Live Cam
           </button>
           <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
             Full Forecast
           </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
