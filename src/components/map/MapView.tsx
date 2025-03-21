
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, AlertCircle, Clock, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  date: string;
  upvotes: number;
  category: string;
  severity: string;
  lat: number;
  lng: number;
};

type MapViewProps = {
  reports: Report[];
};

// Component to move map to search result
const FlyToLocation = ({ searchResult }: { searchResult: [number, number] | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (searchResult) {
      map.flyTo(searchResult, 15);
    }
  }, [map, searchResult]);
  
  return null;
};

// Add Bangalore focus
const BangaloreFocus = () => {
  const map = useMap();
  
  useEffect(() => {
    // Bangalore coordinates
    const bangaloreCoords: [number, number] = [12.9716, 77.5946];
    map.setView(bangaloreCoords, 12);
  }, [map]);
  
  return null;
};

const MapView = ({ reports }: MapViewProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<[number, number] | null>(null);
  
  // Default center coordinates for India
  const defaultCenter: [number, number] = [20, 78];
  
  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    
    try {
      // Using Nominatim for geocoding (OpenStreetMap's free geocoding service)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}, Bangalore&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        setSearchResult([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        console.log('Location not found');
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  // Function to create custom marker icons based on report severity
  const getMarkerIcon = (severity: string) => {
    let color;
    
    if (severity === 'high') {
      color = '#E74C3C'; // Red for high severity
    } else if (severity === 'medium') {
      color = '#3498DB'; // Blue for medium severity
    } else {
      color = '#2ECC71'; // Green for low severity
    }
    
    return L.divIcon({
      className: 'custom-pin-icon',
      html: `
        <div style="position: relative;">
          <svg width="24" height="36" viewBox="0 0 24 36">
            <path d="M12 0C5.383 0 0 5.383 0 12c0 9 12 24 12 24s12-15 12-24c0-6.617-5.383-12-12-12z" 
                  fill="${color}" />
            <circle cx="12" cy="12" r="6" fill="white" />
          </svg>
        </div>
      `,
      iconSize: [24, 36],
      iconAnchor: [12, 36],
      popupAnchor: [0, -36]
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* Search bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a location in Bangalore..."
            className="pl-8 pr-4 h-10 w-full bg-white/90 backdrop-blur-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="h-10 bg-[#3498DB] hover:bg-[#3498DB]/90"
        >
          Search
        </Button>
      </div>
      
      {/* Map container */}
      <div className="absolute inset-0 rounded-md overflow-hidden">
        <MapContainer 
          center={defaultCenter} 
          zoom={5} 
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
          preferCanvas={true}
          zoomAnimation={false}
          inertia={true}
          inertiaDeceleration={2000}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {reports.map((report) => (
            <Marker 
              key={report.id}
              position={[report.lat, report.lng]}
              icon={getMarkerIcon(report.severity)}
              eventHandlers={{
                click: () => setSelectedReport(report),
              }}
            />
          ))}
          
          <FlyToLocation searchResult={searchResult} />
          <BangaloreFocus />
        </MapContainer>
      </div>
      
      {/* Info popup for selected report */}
      {selectedReport && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-20">
          <Card className="p-4 shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{selectedReport.title}</h4>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            <p className="text-sm mb-2">{selectedReport.description}</p>
            <div className="flex items-center text-xs text-muted-foreground mb-3">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{selectedReport.location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs px-2 py-1 rounded-full
                ${selectedReport.severity === 'high' ? 'bg-[#E74C3C]/10 text-[#E74C3C]' : 
                  selectedReport.severity === 'medium' ? 'bg-[#3498DB]/10 text-[#3498DB]' : 
                  'bg-[#2ECC71]/10 text-[#2ECC71]'}`}>
                {selectedReport.severity === 'high' ? 'High Priority' :
                  selectedReport.severity === 'medium' ? 'Medium Priority' : 'Low Priority'}
              </span>
              <span className="text-xs text-muted-foreground">
                Reported: {new Date(selectedReport.date).toLocaleDateString()}
              </span>
            </div>
          </Card>
        </div>
      )}
      
      {/* Attribution in bottom right */}
      <div className="absolute bottom-0 right-0 text-xs bg-white/80 px-1 rounded-tl-md z-10">
        © <a href="https://www.openstreetmap.org/copyright" className="underline">OpenStreetMap</a> contributors
      </div>
    </div>
  );
};

export default MapView;
