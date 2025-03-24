
import React from 'react';
import { Card } from '@/components/ui/card';
import { constituencyComplaints, bangaloreComplaints } from '@/data/bangaloreComplaints';

interface HeatMapProps {
  title?: string;
}

const HeatMap: React.FC<HeatMapProps> = ({ title = "Bengaluru Complaints Heat Map" }) => {
  // Sort complaints in descending order
  const sortedConstituencies = [...constituencyComplaints].sort((a, b) => b.complaints - a.complaints);
  const maxComplaints = sortedConstituencies[0].complaints;
  
  // Sort ward-level complaints
  const sortedWards = [...bangaloreComplaints].sort((a, b) => b.complaints - a.complaints);
  const topWards = sortedWards.slice(0, 15); // Show top 15 wards
  const maxWardComplaints = sortedWards[0].complaints;

  // Calculate heat colors based on complaint counts
  const getHeatColor = (count: number, max: number) => {
    // Calculate intensity (0-1)
    const intensity = count / max;
    
    // Red-based heat map color
    if (intensity > 0.7) {
      return 'bg-red-600';
    } else if (intensity > 0.5) {
      return 'bg-red-500';
    } else if (intensity > 0.3) {
      return 'bg-red-400';
    } else if (intensity > 0.1) {
      return 'bg-red-300';
    } else {
      return 'bg-red-200';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">Visualizing complaint density across Bengaluru areas</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Constituency Heat Map */}
        <div>
          <h3 className="text-base font-medium mb-3">Constituency Level Complaints</h3>
          <div className="space-y-3">
            {sortedConstituencies.slice(0, 10).map((constituency) => (
              <div key={constituency.name} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>{constituency.name}</span>
                  <span className="font-medium">{constituency.complaints} complaints</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getHeatColor(constituency.complaints, maxComplaints)} rounded-full`}
                    style={{ width: `${(constituency.complaints / maxComplaints) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ward Level Heat Map */}
        <div>
          <h3 className="text-base font-medium mb-3">Top 10 Wards by Complaint Count</h3>
          <div className="space-y-3">
            {topWards.slice(0, 10).map((ward) => (
              <div key={ward.id} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>{ward.wardName} (Ward #{ward.wardNumber})</span>
                  <span className="font-medium">{ward.complaints} complaints</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getHeatColor(ward.complaints, maxWardComplaints)} rounded-full`}
                    style={{ width: `${(ward.complaints / maxWardComplaints) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HeatMap;
