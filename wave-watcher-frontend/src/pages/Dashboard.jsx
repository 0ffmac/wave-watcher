import React from "react";
import HeroSection from "../components/HeroSection";
import SwellDetails from "../components/SwellDetails";
import ForecastChart from "../components/ForecastChart";
import ForecastTable from "../components/ForecastTable";
import SpotMap from "../components/SpotMap";

const Dashboard = ({
  data,
  transformedData,
  activeSpotId,
  activeCountryKey,
  activeRegionKey,
  setActiveSpotId,
  SPOTS,
}) => {
  const {
    spotName,
    location,
    lat,
    lon,
    surfRange,
    rating,
    mapSwells,
    wind,
    temperatures,
    tide,
    hourly,
    inputScaleFactor,
    energyMultiplier,
    currentIdx,
  } = transformedData;

  return (
    <div className="pb-24">
      <HeroSection
        spotName={spotName}
        rating={rating}
        surfRange={surfRange}
        location={location}
      />

      <SwellDetails
        swells={mapSwells}
        wind={wind}
        hourly={hourly}
        currentIdx={currentIdx}
        temperatures={temperatures}
        tide={tide}
        tideForecast={data?.hourly?.sea_level_height_msl}
        times={data?.hourly?.times}
        rating={rating}
        surfRange={surfRange}
        activeSpotId={activeSpotId}
        activeCountryKey={activeCountryKey}
        activeRegionKey={activeRegionKey}
        onSpotSelect={setActiveSpotId}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 container mx-auto gap-8 px-6">
        <div className="xl:col-span-3">
          <ForecastTable
            data={hourly}
            spotId={activeSpotId}
            spotsMetadata={SPOTS}
            inputScaleFactor={inputScaleFactor ?? 1.0}
            energyMultiplier={energyMultiplier ?? 14}
          />
        </div>
        <div className="xl:col-span-1">
          <div className="sticky top-28 space-y-8">
            <SpotMap
              lat={lat}
              lon={lon}
              spotName={spotName}
              wind={wind}
              swells={mapSwells}
            />
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <h4 className="font-black text-2xl mb-2 relative z-10">
                Go Premium
              </h4>
              <p className="text-white/80 text-sm mb-6 relative z-10">
                Get 17-day forecasts, ad-free experience, and high-def live
                cams.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest relative z-10 hover:shadow-xl transition-shadow">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <ForecastChart
        data={hourly}
        spotId={activeSpotId}
        spotsMetadata={SPOTS}
        inputScaleFactor={inputScaleFactor ?? 1.0}
      />
    </div>
  );
};

export default Dashboard;
