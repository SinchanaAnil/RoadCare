
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const BangaloreFocus = () => {
  const map = useMap();
  
  useEffect(() => {
    // Bangalore coordinates
    const bangaloreCoords: [number, number] = [12.9716, 77.5946];
    map.setView(bangaloreCoords, 12);
  }, [map]);
  
  return null;
};

export default BangaloreFocus;
