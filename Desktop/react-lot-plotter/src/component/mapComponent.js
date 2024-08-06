// src/application/components/LotPlotter.js

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import DraggableForm from '../component/DraggableForm';
import { calculateNewPoint } from '../plotter/plotter';
import 'bootstrap/dist/css/bootstrap.min.css';

const tiePoints = [
  {
    "id": 1,
    "tie_pt_name": "BBM No. 17, Cad 1141 D, Baay Licuan Cadastre",
    "province": "ABRA",
    "municipality": "BAAY LICUAN",
    "lat": "17.54724722",
    "lon": "120.8752639",
    "zone": "3",
    "x": "486756.9881",
    "y": "1940602.171"
  }
];

const LotPlotter = () => {
  const [tiePointLatLng, setTiePointLatLng] = useState(tiePoints.map(pt => [parseFloat(pt.lat), parseFloat(pt.lon)]));
  const [lines, setLines] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = ({ azimuth, distance }) => {
    const lastPoint = tiePointLatLng[tiePointLatLng.length - 1];
    const newPoint = calculateNewPoint(lastPoint[0], lastPoint[1], azimuth, distance);
    setTiePointLatLng([...tiePointLatLng, newPoint]);
    setLines([...lines, { start: lastPoint, end: newPoint, distance, azimuth }]);
    setShowForm(false);
  };

  return (
    <div>
      <Button onClick={() => setShowForm(true)}>Add Tie Line</Button>
      <div className='block'>
      {showForm && (
        <DraggableForm
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
      </div>
      <MapContainer center={[17.54724722, 120.8752639]} zoom={20} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {tiePointLatLng.map((point, index) => (
          <Marker key={index} position={point}></Marker>
        ))}
        {lines.map((line, index) => (
          <Polyline key={index} positions={[line.start, line.end]} color="blue">
            <Popup>Distance: {line.distance} meters<br/>Azimuth: {line.azimuth}</Popup>
          </Polyline>
        ))}
      </MapContainer>
  
    </div>
  );
};

export default LotPlotter;
