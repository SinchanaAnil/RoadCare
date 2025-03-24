
import { useState, useEffect } from 'react';
import HeatMap from '@/components/map/HeatMap';
import { mockReports } from '@/data/mockReports';
import Header from '@/components/home/Header';
import MapSection from '@/components/home/MapSection';
import IssueSummary from '@/components/home/IssueSummary';
import RecentActivities from '@/components/home/RecentActivities';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState(mockReports);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredReports(mockReports);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = mockReports.filter(
        report => 
          report.title.toLowerCase().includes(query) ||
          report.description.toLowerCase().includes(query) ||
          report.location.toLowerCase().includes(query)
      );
      setFilteredReports(filtered);
    }
  }, [searchQuery]);

  return (
    <div className="container py-6 px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <MapSection filteredReports={filteredReports} />
            {/* Heat Map Section */}
            <HeatMap title="Bengaluru Road Issues Heat Map" />
          </div>
        </div>
        
        <div>
          <div className="flex flex-col gap-4">
            <IssueSummary filteredReports={filteredReports} />
            <RecentActivities reports={filteredReports} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
