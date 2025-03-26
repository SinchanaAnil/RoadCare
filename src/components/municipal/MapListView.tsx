
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, FileSearch, Filter, Search } from 'lucide-react';
import MapView from '@/components/map/MapView';
import ReportsList from '@/components/reports/ReportsList';
import { Report } from '@/types/reports';

interface MapListViewProps {
  filteredReports: Report[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  headingText: string;
}

const MapListView: React.FC<MapListViewProps> = ({ 
  filteredReports, 
  searchQuery, 
  setSearchQuery,
  headingText
}) => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <Card className="overflow-hidden">
      <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <TabsList>
            <TabsTrigger value="map" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
              <FileSearch className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <TabsContent value="map" className="m-0">
          <div className="h-[500px]">
            <MapView reports={filteredReports} />
          </div>
        </TabsContent>
        <TabsContent value="list" className="m-0">
          <div className="p-4">
            <ReportsList reports={filteredReports} />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MapListView;
