import React from "react";
import HeroSection from "../components/HeroSection";
import SwellDetails from "../components/SwellDetails";
import ForecastChart from "../components/ForecastChart";
import TideChart from "../components/TideChart";
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
    finalScaleFactor,
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
        currentIdx={currentIdx ?? 0}
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
            finalScaleFactor={finalScaleFactor ?? 1.0}
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
            <div className="rounded-3xl p-8 relative overflow-hidden group" style={{background:'var(--ww-premium-bg)',border:'0.5px solid var(--ww-premium-border)'}}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" style={{background:'var(--ww-premium-orb)'}} />
              <h4 className="font-black text-2xl mb-2 relative z-10" style={{color:'var(--ww-text)'}}>
                Go Premium
              </h4>
              <p className="text-sm mb-6 relative z-10" style={{color:'var(--ww-text-2)'}}>
                Get 17-day forecasts, ad-free experience, and high-def live
                cams.
              </p>
              <button className="px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest relative z-10 hover:scale-105 transition-all" style={{background:'var(--ww-accent)',color:'var(--ww-accent-text)',boxShadow:'0 0 20px var(--ww-accent-bg)'}}>
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
        inputScaleFactor={finalScaleFactor ?? 1.0}
        currentIdx={currentIdx ?? 0}
      />

      <TideChart
        tideForecast={data?.hourly?.sea_level_height_msl}
        times={data?.hourly?.times}
        lat={lat}
        spotName={spotName}
        currentIdx={currentIdx ?? 0}
      />
    </div>
  );
};

export default Dashboard;
