import React from 'react';
import { ChevronRight } from 'lucide-react';
import { getSpotsForRegion } from '../data/spotConfig';
import { calculateSurfHeight, calculateConditionRating, getRatingSegments } from '../utils/surfCalculations';

const NearbySpots = ({ activeSpotId, activeCountryKey, activeRegionKey, currentSwell, currentWind, onSpotSelect }) => {
  const spots = getSpotsForRegion(activeCountryKey, activeRegionKey);
  
  const nearbySpots = Object.entries(spots)
    .filter(([id]) => id !== activeSpotId)
    .map(([id, meta]) => {
      const surf = calculateSurfHeight(
        currentSwell.height,
        currentSwell.period,
        currentSwell.direction,
        currentWind.direction,
        currentWind.speed,
        meta
      );
      
      const rating = calculateConditionRating(
        surf.max,
        currentWind.speed,
        surf.windFactor,
        surf.directionalFactor,
        meta.breakType
      );
      
      return {
        id,
        name: meta.name,
        surfRange: `${surf.min.toFixed(1)}–${surf.max.toFixed(1)}m`,
        rating,
        ratingInfo: getRatingSegments(rating)
      };
    });

  if (nearbySpots.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nearby Spots in this Region</h3>
        <div className="h-px flex-grow mx-4 bg-slate-100"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {nearbySpots.map((spot) => (
          <div 
            key={spot.id}
            onClick={() => onSpotSelect && onSpotSelect(spot.id)}
            className="bg-white/70 backdrop-blur-md border border-slate-100/50 rounded-lg p-2.5 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-white hover:border-blue-200 transition-all duration-300"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[11px] font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors truncate">{spot.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{spot.surfRange}</span>
                <div className="flex gap-1">
                   {spot.ratingInfo.segments.map((active, i) => (
                     <div key={i} className={`w-1 h-1 rounded-full ${active ? spot.ratingInfo.color : 'bg-slate-100'}`} />
                   ))}
                </div>
              </div>
            </div>
            <ChevronRight size={12} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbySpots;
