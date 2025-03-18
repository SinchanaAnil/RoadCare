
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

const MapView = ({ reports }: MapViewProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<[number, number] | null>(null);
  
  // Bangalore center coordinates as default
  const defaultCenter: [number, number] = [12.9716, 77.5946];
  
  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    
    try {
      // Using Nominatim for geocoding (OpenStreetMap's free geocoding service)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        setSearchResult([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        // Show error or notification that location wasn't found
        console.log('Location not found');
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  // Function to create custom marker icons based on report status
  const getMarkerIcon = (status: string) => {
    let color;
    let icon;
    
    if (status === 'pending') {
      color = 'var(--fixit-primary)';
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';
    } else if (status === 'in-progress') {
      color = 'var(--fixit-warning)';
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
    } else {
      color = 'var(--fixit-success)';
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    }
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">${icon}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
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
            placeholder="Search for a location..."
            className="pl-8 pr-4 h-10 w-full bg-white/90 backdrop-blur-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="h-10"
        >
          Search
        </Button>
      </div>
      
      {/* Map container */}
      <div className="absolute inset-0 rounded-md overflow-hidden">
        <MapContainer 
          center={defaultCenter} 
          zoom={11} 
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {reports.map((report) => (
            <Marker 
              key={report.id}
              position={[report.lat, report.lng]}
              icon={getMarkerIcon(report.status)}
              eventHandlers={{
                click: () => setSelectedReport(report),
              }}
            />
          ))}
          
          <FlyToLocation searchResult={searchResult} />
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
                ${selectedReport.status === 'pending' ? 'bg-fixit-primary/10 text-fixit-primary' : 
                  selectedReport.status === 'in-progress' ? 'bg-fixit-warning/10 text-fixit-warning' : 
                  'bg-fixit-success/10 text-fixit-success'}`}>
                {selectedReport.status === 'pending' ? 'Pending' :
                  selectedReport.status === 'in-progress' ? 'In Progress' : 'Completed'}
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
