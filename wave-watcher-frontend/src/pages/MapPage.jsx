import React from "react";
import BigMap from "../components/BigMap";
import { Loader2 } from "lucide-react";

const MapPage = ({
  data,
  loading,
  error,
  activeSpotId,
  activeCountryKey,
  activeRegionKey,
  onSpotSelect,
  transformedData,
}) => {
  if (loading && !data) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center bg-slate-900 gap-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">
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
    <div className="min-h-screen bg-slate-950">
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
