import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Controls from './controls';


const LotPlotter = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[14.54724722, 120.8752639]} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Controls/>
      </MapContainer>
    </div>
  );
};

export default LotPlotter;
