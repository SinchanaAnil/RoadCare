
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type FlyToLocationProps = {
  searchResult: [number, number] | null;
};

const FlyToLocation = ({ searchResult }: FlyToLocationProps) => {
  const map = useMap();
  
  useEffect(() => {
    if (searchResult) {
      map.flyTo(searchResult, 15);
    }
  }, [map, searchResult]);
  
  return null;
};

export default FlyToLocation;
