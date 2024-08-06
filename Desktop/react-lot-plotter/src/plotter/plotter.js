export const calculateNewPoint = (lat, lon, azimuth, distance) => {
    const R = 6378137; // Earth radius in meters
    let bearing = parseAzimuth(azimuth);
  
    const bearingRad = bearing * (Math.PI / 180); 
    const latRad = lat * (Math.PI / 180); 
    const lonRad = lon * (Math.PI / 180); 
  
    const newLatRad = Math.asin(Math.sin(latRad) * Math.cos(distance / R) +
      Math.cos(latRad) * Math.sin(distance / R) * Math.cos(bearingRad));
    const newLonRad = lonRad + Math.atan2(Math.sin(bearingRad) * Math.sin(distance / R) * Math.cos(latRad),
      Math.cos(distance / R) - Math.sin(latRad) * Math.sin(newLatRad));
  
    const newLat = newLatRad * (180 / Math.PI); 
    const newLon = newLonRad * (180 / Math.PI); 
  
    return [newLat, newLon];
  };
  
  export const parseAzimuth = (azimuth) => {
    const regex = /([NS])\s*(\d+)d(\d+)\s*([EW])/;
    const match = azimuth.match(regex);
  
    if (!match) {
      throw new Error('Invalid azimuth format');
    }
  
    const [, ns, degrees, minutes, ew] = match;
    let bearing = parseInt(degrees) + parseInt(minutes) / 60;
  
    if (ns === 'S') bearing = 180 - bearing;
    if (ew === 'W') bearing = 360 - bearing;
  
    return bearing;
  };
  