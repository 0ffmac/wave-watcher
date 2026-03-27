import React from "react";
import BigMap from "../components/BigMap";
import { Loader2 } from "lucide-react";

const MapPage = ({
  data,
  loading,
  activeSpotId,
  activeCountryKey,
  activeRegionKey,
  onSpotSelect,
  transformedData,
}) => {
  if (loading && !data) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4" style={{background:'var(--ww-bg)'}}>
        <Loader2 className="animate-spin" size={48} style={{color:'var(--ww-accent)'}} />
        <p className="font-black text-xs uppercase tracking-[0.3em]" style={{color:'var(--ww-text-2)'}}>
          Loading Map Data
        </p>
      </div>
    );
  }

  const {
    spotName,
    lat,
    lon,
    mapSwells,
    wind,
  } = transformedData;

  return (
    <div className="min-h-screen" style={{background:'var(--ww-bg)'}}>
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-8">
        <BigMap
          lat={lat}
          lon={lon}
          spotName={spotName}
          wind={wind}
          swells={mapSwells}
          activeSpotId={activeSpotId}
          activeCountryKey={activeCountryKey}
          activeRegionKey={activeRegionKey}
          onSpotSelect={onSpotSelect}
        />
      </div>
    </div>
  );
};

export default MapPage;
