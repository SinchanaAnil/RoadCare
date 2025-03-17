
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, AlertCircle, Clock, Check } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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

const MapView = ({ reports }: MapViewProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [mapToken, setMapToken] = useState<string | null>(localStorage.getItem('mapbox_token'));
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Function to handle token input
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;
    
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapToken(token);
    }
  };

  // Initialize map when component mounts and token is available
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    // Remove any existing map
    if (map.current) {
      markers.current.forEach(marker => marker.remove());
      map.current.remove();
    }

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    // Center on Bangalore, India
    const defaultCenter = [77.5946, 12.9716]; // Bangalore coordinates
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: defaultCenter,
      zoom: 11
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Wait for map to load before adding markers
    map.current.on('load', () => {
      // Clear any existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Add markers for each report
      reports.forEach(report => {
        // Create a marker element
        const el = document.createElement('div');
        el.className = 'marker';
        
        // Style based on status
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        
        if (report.status === 'pending') {
          el.style.backgroundColor = 'var(--fixit-primary)';
        } else if (report.status === 'in-progress') {
          el.style.backgroundColor = 'var(--fixit-warning)';
        } else {
          el.style.backgroundColor = 'var(--fixit-success)';
        }
        
        // Add icon inside marker
        const icon = document.createElement('div');
        icon.innerHTML = report.status === 'pending' 
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>'
          : report.status === 'in-progress'
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>';
        icon.style.color = 'white';
        el.appendChild(icon);
        
        // Create the marker and add to map
        const marker = new mapboxgl.Marker(el)
          .setLngLat([report.lng, report.lat])
          .addTo(map.current!);
          
        // Add click handler
        el.addEventListener('click', () => {
          setSelectedReport(report);
        });
        
        // Save marker reference for cleanup
        markers.current.push(marker);
      });
    });

    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        map.current.remove();
      }
    };
  }, [reports, mapToken]);

  if (!mapToken) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <h3 className="text-lg font-semibold mb-4">Mapbox Token Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To display the interactive map, please enter your Mapbox public token. 
            You can get a free token by signing up at <a href="https://mapbox.com" className="text-fixit-primary underline" target="_blank" rel="noreferrer">mapbox.com</a>.
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <input 
              type="text" 
              name="token" 
              placeholder="Enter your Mapbox public token"
              className="w-full p-2 border rounded-md"
              required
            />
            <button 
              type="submit"
              className="w-full p-2 bg-fixit-primary text-white rounded-md hover:bg-fixit-primary/90"
            >
              Save Token
            </button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* The map container */}
      <div ref={mapContainer} className="absolute inset-0 rounded-md overflow-hidden" />
      
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
    </div>
  );
};

export default MapView;
