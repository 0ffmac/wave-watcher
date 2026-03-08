import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const getCardinal = (angle) => {
  if (angle === undefined || angle === null) return "N/A";
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(angle / 22.5) % 16];
};

const WindyIcon = ({ wind, swells }) => {
  const primarySwell = swells?.[0];
  const secondarySwell = swells?.[1];

  const colorMap = {
    wind: "#22d3ee",
    swell: "#fbbf24",
    swell2: "#34d399",
  };

  const createArrowHTML = (angle, color, label, type, dist, stemHeight) => {
    if (angle === undefined || angle === null) return "";
    const card = getCardinal(angle);

    return `
      <div style="position: absolute; top: 50%; left: 50%; width: 0; height: 0; transform: translate(-50%, -50%) rotate(${angle}deg); z-index: ${500 - dist};">
        <div style="position: absolute; top: -${dist}px; left: -50px; width: 100px; display: flex; flex-direction: column; align-items: center;">
          
          <div style="background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(4px); color: white; padding: 5px 10px; border-radius: 10px; border: 2px solid ${color}; box-shadow: 0 10px 25px rgba(0,0,0,0.4); transform: rotate(${-angle}deg); min-width: 85px; text-align: center; margin-bottom: 8px;">
            <div style="font-size: 7px; font-weight: 900; color: ${color}; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 2px;">${type}</div>
            <div style="font-size: 11px; font-weight: 900; line-height: 1; margin-bottom: 2px;">${label}</div>
            <div style="font-size: 8px; font-weight: 800; opacity: 0.8; color: #94a3b8;">${angle.toFixed(0)}° ${card}</div>
          </div>
          
          <div style="width: 4px; height: ${stemHeight}px; background: linear-gradient(to bottom, ${color}, ${color}44); border-radius: 3px; margin-top: -4px;"></div>
          
          <div style="width: 0; height: 0; border-left: 9px solid transparent; border-right: 9px solid transparent; border-top: 13px solid ${color}; margin-top: -2px;"></div>
        </div>
      </div>
    `;
  };

  const html = `
    <div style="position: relative; width: 600px; height: 600px; pointer-events: none;">
      ${wind ? createArrowHTML(wind.direction, colorMap.wind, `${wind.speed.toFixed(0)}kph`, "WIND", 110, 50) : ""}
      ${primarySwell && primarySwell.height > 0 ? createArrowHTML(primarySwell.direction, colorMap.swell, `${primarySwell.height.toFixed(1)}m ${primarySwell.period.toFixed(0)}s`, "SWELL", 165, 105) : ""}
      ${secondarySwell && secondarySwell.height > 0 ? createArrowHTML(secondarySwell.direction, colorMap.swell2, `${secondarySwell.height.toFixed(1)}m ${secondarySwell.period.toFixed(0)}s`, "SWELL 2", 130, 70) : ""}
    </div>
  `;

  return L.divIcon({
    html: html,
    className: "windy-v5-overlay",
    iconSize: [600, 600],
    iconAnchor: [300, 300],
  });
};

const SpotMap = ({ lat, lon, wind, swells }) => {
  const position = [lat, lon];
  const windyIcon = useMemo(() => WindyIcon({ wind, swells }), [wind, swells]);

  return (
    <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl overflow-hidden">
      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>

      <div className="flex items-center justify-between mb-5 px-2">
        <h3 className="font-black text-2xl text-white tracking-tight">
          Location Map
        </h3>
        <span className="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em] bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
          Satellite View
        </span>
      </div>

      <div className="h-[600px] w-full rounded-[2rem] overflow-hidden border border-white/5 relative bg-slate-950">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <ChangeView center={position} zoom={13} />
          <TileLayer
            attribution="&copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <Marker position={position} icon={windyIcon} interactive={false} />
        </MapContainer>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1001] flex items-center justify-center">
          <div className="absolute w-10 h-10 rounded-full bg-blue-500/30 animate-ping-slow"></div>
          <div className="w-5 h-5 rounded-full border-2 border-white/90 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotMap;
