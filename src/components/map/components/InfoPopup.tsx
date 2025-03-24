
import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

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

type WardInfo = {
  id: number;
  wardNumber: number;
  wardName: string;
  constituency: string;
  complaints: number;
};

type InfoPopupProps = {
  selectedReport: Report | null;
  selectedWard: WardInfo | null;
  onClose: () => void;
};

const InfoPopup: React.FC<InfoPopupProps> = ({ selectedReport, selectedWard, onClose }) => {
  if (!selectedReport && !selectedWard) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-20">
      <Card className="p-4 shadow-lg">
        {selectedReport && (
          <>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{selectedReport.title}</h4>
              <button 
                onClick={onClose}
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
          </>
        )}

        {selectedWard && (
          <>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{selectedWard.wardName}</h4>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="text-xs">Ward #: <span className="font-medium">{selectedWard.wardNumber}</span></div>
              <div className="text-xs">Complaints: <span className="font-medium text-red-600">{selectedWard.complaints}</span></div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mb-3">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{selectedWard.constituency} Constituency</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: `${Math.min(selectedWard.complaints / 10, 100)}%` }}></div>
            </div>
            <div className="mt-2 text-xs text-right text-muted-foreground">
              Severity based on complaint count
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default InfoPopup;
