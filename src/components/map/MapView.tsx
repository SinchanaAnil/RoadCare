
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, AlertCircle, Clock, Check } from 'lucide-react';

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

  // This is a placeholder for an actual map integration
  // In a real implementation, we would use a library like Mapbox or Google Maps

  return (
    <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
      {/* Placeholder for actual map */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,12,0/1000x500?access_token=pk.example')] bg-cover bg-center opacity-50"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="bg-background/80 backdrop-blur-sm p-4 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2">Map Placeholder</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This is a placeholder for the interactive map. In a real implementation, 
            this would be an interactive map using Mapbox or Google Maps showing all reported issues.
          </p>
        </Card>
      </div>
      
      {/* Sample markers */}
      {reports.map((report) => (
        <div 
          key={report.id}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ 
            left: `${Math.random() * 80 + 10}%`, 
            top: `${Math.random() * 80 + 10}%` 
          }}
          onClick={() => setSelectedReport(report)}
        >
          <div className={`rounded-full p-2 shadow-md
            ${report.status === 'pending' ? 'bg-fixit-primary text-white' : 
              report.status === 'in-progress' ? 'bg-fixit-warning text-white' : 
              'bg-fixit-success text-white'}`}>
            {report.status === 'pending' ? <AlertCircle className="h-5 w-5" /> :
              report.status === 'in-progress' ? <Clock className="h-5 w-5" /> :
              <Check className="h-5 w-5" />}
          </div>
        </div>
      ))}
      
      {/* Info popup for selected report */}
      {selectedReport && (
        <div 
          className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-20"
        >
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
