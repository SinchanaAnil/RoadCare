
import L from 'leaflet';
import { Marker, Popup, Circle } from 'react-leaflet';
import { bangaloreComplaints, WardComplaint } from '@/data/bangaloreComplaints';

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

type MapMarkersProps = {
  reports: Report[];
  showBangaloreWards: boolean;
  onReportSelect: (report: Report) => void;
  onWardSelect: (ward: WardComplaint) => void;
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

// Function to create ward marker icons with complaint count
const getWardMarkerIcon = (complaints: number) => {
  // Determine color based on complaint count
  let color;
  if (complaints > 500) {
    color = '#E74C3C'; // High - Red
  } else if (complaints > 300) {
    color = '#FF8C00'; // Medium-high - Orange
  } else if (complaints > 100) {
    color = '#3498DB'; // Medium - Blue
  } else {
    color = '#2ECC71'; // Low - Green
  }
  
  return L.divIcon({
    className: 'ward-pin-icon',
    html: `
      <div style="position: relative;">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="${color}" opacity="0.7" />
          <circle cx="16" cy="16" r="8" fill="white" opacity="0.7" />
        </svg>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: bold; color: #333; font-size: 10px;">
          ${complaints}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const MapMarkers = ({ reports, showBangaloreWards, onReportSelect, onWardSelect }: MapMarkersProps) => {
  return (
    <>
      {/* Report Markers */}
      {reports.map((report) => (
        <Marker 
          key={report.id}
          position={[report.lat, report.lng]}
          icon={getMarkerIcon(report.severity)}
          eventHandlers={{
            click: () => onReportSelect(report),
          }}
        />
      ))}
      
      {/* Ward Markers */}
      {showBangaloreWards && bangaloreComplaints.filter(ward => ward.lat && ward.lng).map((ward) => (
        <Marker
          key={`ward-${ward.id}`}
          position={[ward.lat!, ward.lng!]}
          icon={getWardMarkerIcon(ward.complaints)}
          eventHandlers={{
            click: () => onWardSelect(ward),
          }}
        >
          <Popup>
            <div className="text-sm font-medium">{ward.wardName} (Ward #{ward.wardNumber})</div>
            <div className="text-xs mt-1">Complaints: {ward.complaints}</div>
            <div className="text-xs mt-1">Constituency: {ward.constituency}</div>
          </Popup>
        </Marker>
      ))}

      {/* Heat Circles */}
      {showBangaloreWards && bangaloreComplaints.filter(ward => ward.lat && ward.lng).map((ward) => (
        <Circle
          key={`heat-${ward.id}`}
          center={[ward.lat!, ward.lng!]}
          radius={ward.complaints > 500 ? 1000 : ward.complaints > 300 ? 800 : ward.complaints > 100 ? 600 : 400}
          pathOptions={{
            fillColor: ward.complaints > 500 ? '#E74C3C' : 
                      ward.complaints > 300 ? '#FF8C00' : 
                      ward.complaints > 100 ? '#3498DB' : '#2ECC71',
            fillOpacity: 0.3,
            weight: 0
          }}
        />
      ))}
    </>
  );
};

export default MapMarkers;
