import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Controls from './controls';

const LotPlotter = () => {
  const [mapCenter, setMapCenter] = useState([14.54724722, 120.8752639]);
  const [zoomLevel,setZoomLevel] = useState(6)
  // const [formData, setFormData] = useState({});

  const handleFormSubmit = (data) => {
    setMapCenter([data.lat,data.lon]);
    setZoomLevel(20)
  };

  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Controls onFormSubmit={handleFormSubmit} />
      </MapContainer>
    </div>
  );
};

export default LotPlotter;
