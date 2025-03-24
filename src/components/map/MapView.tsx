
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WardComplaint } from '@/data/bangaloreComplaints';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Import the smaller components
import BangaloreFocus from './components/BangaloreFocus';
import FlyToLocation from './components/FlyToLocation';
import MapMarkers from './components/MapMarkers';
import InfoPopup from './components/InfoPopup';
import SearchBar from './components/SearchBar';

// Set up default Leaflet icon
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
  showBangaloreWards?: boolean;
};

const MapView = ({ reports, showBangaloreWards = true }: MapViewProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardComplaint | null>(null);
  const [searchResult, setSearchResult] = useState<[number, number] | null>(null);
  
  // Default center coordinates for India
  const defaultCenter: [number, number] = [20, 78];
  
  const handleSearch = (coordinates: [number, number]) => {
    setSearchResult(coordinates);
  };

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
    setSelectedWard(null);
  };

  const handleWardSelect = (ward: WardComplaint) => {
    setSelectedWard(ward);
    setSelectedReport(null);
  };

  const handleClosePopup = () => {
    setSelectedReport(null);
    setSelectedWard(null);
  };

  return (
    <div className="relative w-full h-full">
      {/* Search bar component */}
      <SearchBar onSearch={handleSearch} />
      
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
          
          {/* Map markers component */}
          <MapMarkers 
            reports={reports} 
            showBangaloreWards={showBangaloreWards}
            onReportSelect={handleReportSelect}
            onWardSelect={handleWardSelect}
          />
          
          {/* Utility components for map positioning */}
          <FlyToLocation searchResult={searchResult} />
          <BangaloreFocus />
        </MapContainer>
      </div>
      
      {/* Info popup component */}
      <InfoPopup 
        selectedReport={selectedReport} 
        selectedWard={selectedWard}
        onClose={handleClosePopup}
      />
      
      {/* Attribution in bottom right */}
      <div className="absolute bottom-0 right-0 text-xs bg-white/80 px-1 rounded-tl-md z-10">
        © <a href="https://www.openstreetmap.org/copyright" className="underline">OpenStreetMap</a> contributors
      </div>
    </div>
  );
};

export default MapView;
