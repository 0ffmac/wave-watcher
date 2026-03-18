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
        meta.breakType,
        surf.max
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
        <h3 className="text-[10px] font-black uppercase tracking-widest" style={{color:'#26344f'}}>Nearby Spots in this Region</h3>
        <div className="h-px flex-grow mx-4" style={{background:'rgba(255,255,255,0.07)'}}></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {nearbySpots.map((spot) => (
          <div 
            key={spot.id}
            onClick={() => onSpotSelect && onSpotSelect(spot.id)}
            className="rounded-lg p-2.5 flex items-center justify-between group cursor-pointer transition-all duration-300" style={{background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(255,255,255,0.07)'}}
          >
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[11px] font-black tracking-tight transition-colors truncate" style={{color:'#dde8ff'}}>{spot.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold whitespace-nowrap" style={{color:'#536280'}}>{spot.surfRange}</span>
                <div className="flex gap-1">
                   {spot.ratingInfo.segments.map((active, i) => (
                     <div key={i} className={`w-1 h-1 rounded-full ${active ? spot.ratingInfo.color : 'bg-slate-100'}`} />
                   ))}
                </div>
              </div>
            </div>
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-all flex-shrink-0" style={{color:'#26344f'}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbySpots;
