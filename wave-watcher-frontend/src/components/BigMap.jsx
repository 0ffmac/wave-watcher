import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getSpotsForRegion } from "../data/spotConfig";

const ChangeView = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.panTo(center, { animate: true, duration: 1 });
    }
  }, [center, map]);
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

const StandardSpotIcon = (isActive) => {
  const color = isActive ? "#3b82f6" : "#94a3b8";
  const html = `
    <div style="position: relative; display: flex; items-center; justify-center; width: 20px; height: 20px;">
      <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${color}4d; ${isActive ? 'animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;' : ''}"></div>
      <div style="position: relative; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; background: ${color}; box-shadow: 0 0 10px ${color}cc;"></div>
    </div>
  `;
  return L.divIcon({
    html: html,
    className: "standard-spot-marker",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const BigMap = ({
  activeSpotId,
  activeCountryKey,
  activeRegionKey,
  wind,
  swells,
  onSpotSelect,
}) => {
  const spots = getSpotsForRegion(activeCountryKey, activeRegionKey);
  const activeSpot = spots[activeSpotId];
  const position = activeSpot ? [activeSpot.lat, activeSpot.lon] : [0, 0];
  
  const windyIcon = useMemo(() => WindyIcon({ wind, swells }), [wind, swells]);

  return (
    <div className="w-full h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] rounded-[2.5rem] p-4 md:p-6 overflow-hidden">
      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .leaflet-container {
          background: #0f172a !important;
          border-radius: 2rem;
        }
      `}</style>

      <div className="h-full w-full rounded-[2rem] overflow-hidden border border-white/5 relative shadow-2xl">
        <MapContainer
          center={position}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <ChangeView center={position} />
          <TileLayer
            attribution="&copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          
          {/* Active Windy Overlay */}
          <Marker position={position} icon={windyIcon} interactive={false} />

          {/* All Spots Markers */}
          {Object.entries(spots).map(([id, spot]) => (
            <Marker
              key={id}
              position={[spot.lat, spot.lon]}
              icon={StandardSpotIcon(id === activeSpotId)}
              eventHandlers={{
                click: () => onSpotSelect && onSpotSelect(id),
              }}
            >
              <Popup className="spot-popup">
                <div className="p-1">
                  <h4 className="font-black text-slate-900">{spot.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{spot.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend / Overlay Info */}
        <div className="absolute top-6 right-6 z-[1001] bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl pointer-events-none">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Spot</span>
            </div>
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-3 h-3 rounded-full bg-slate-400"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Nearby Spots</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 z-[1001] flex flex-col gap-2 pointer-events-none">
          <h2 className="text-white font-black text-2xl md:text-3xl drop-shadow-2xl">
            {activeSpot?.name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em] bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 backdrop-blur-md">
              {activeRegionKey}, {activeCountryKey}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigMap;
