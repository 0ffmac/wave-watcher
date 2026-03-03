import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const SpotMap = ({ lat, lon, spotName }) => {
  const position = [lat, lon];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">
        <h3 className="font-black text-xl text-slate-800 tracking-tight mb-6">Location Map</h3>
        <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
           <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
             <ChangeView center={position} zoom={13} />
             <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
             <Marker position={position}>
               <Popup>
                 <span className="font-bold">{spotName}</span>
               </Popup>
             </Marker>
           </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default SpotMap;
