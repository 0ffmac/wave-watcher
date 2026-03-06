import React from "react";

const HeroSection = ({ spotName, rating, surfRange, location }) => {
  const getRatingColor = (r) => {
    if (!r) return "bg-slate-200";
    if (r.includes("EPIC")) return "bg-indigo-600";
    if (r.includes("GOOD")) return "bg-blue-600";
    if (r.includes("FAIR")) return "bg-amber-500";
    if (r.includes("POOR")) return "bg-slate-500";
    return "bg-blue-500";
  };

  return (
    /* This version maintains the 16:9 shape without over-cropping on desktop */
    <section className="relative w-full aspect-video max-h-[50vh] min-h-[300px] overflow-hidden flex items-end">
      {/* Background Image - Original '/ocean wave.jpg' */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url('/ocean wave.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 pb-6 md:pb-10 relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-white font-black text-[10px] uppercase tracking-widest shadow-lg ${getRatingColor(rating)}`}
            >
              {rating}
            </span>
            <span className="text-white/70 font-bold text-xs uppercase tracking-wider bg-black/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              {location}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
            {spotName}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white/90 tracking-tight">
            {surfRange}
          </p>
        </div>

        <div className="flex flex-row md:flex-col gap-2">
          <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            Live Cam
          </button>
          {/* Reverted back to your preferred transparent/glass style */}
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">
            Full Forecast
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
