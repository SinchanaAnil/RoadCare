
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatsOverview from '@/components/municipal/StatsOverview';
import SearchHeader from '@/components/municipal/SearchHeader';
import MapListView from '@/components/municipal/MapListView';
import PerformanceCard from '@/components/municipal/PerformanceCard';
import RecentIssuesCard from '@/components/municipal/RecentIssuesCard';
import AIVerificationCard from '@/components/municipal/AIVerificationCard';
import { mockReports } from '@/components/municipal/mockData';

const MunicipalDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState(mockReports);

  // Redirect if user is not authenticated or not a municipal worker
  if (!user || user.user_type !== 'municipal') {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // Filter reports based on search query
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

  // Color variables - change these based on theme
  const cardBg = theme === 'dark' ? 'bg-[#28354A]' : 'bg-[#F0F4F8]';
  const cardBorder = theme === 'dark' ? 'border-[#A0CED9]/20' : 'border-[#D2E1EE]';
  const darkBg = theme === 'dark' ? 'bg-[#1A2337]' : 'bg-[#E2EAF2]';
  const headingText = theme === 'dark' ? 'text-[#A0CED9]' : 'text-[#2E4053]';
  const subtitleText = theme === 'dark' ? 'text-[#A0CED9]/70' : 'text-[#708090]';
  const countText = theme === 'dark' ? 'text-white' : 'text-[#2E4053]';
  const progressBg = theme === 'dark' ? 'bg-[#1A2337]' : 'bg-[#D2E1EE]';
  const progressFill = theme === 'dark' ? 'bg-[#D2B48C]' : 'bg-[#B87333]';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${headingText} mb-2`}>Municipal Worker Dashboard</h1>
        <p className={theme === 'dark' ? 'text-[#D2B48C]' : 'text-[#708090]'}>Welcome back, {user.name}! Manage and respond to road infrastructure issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            {/* Search and Filter Section */}
            <SearchHeader 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              headingText={headingText} 
            />
            
            {/* Stats Overview */}
            <StatsOverview 
              theme={theme}
              cardBg={cardBg}
              darkBg={darkBg}
              headingText={headingText}
              subtitleText={subtitleText}
              countText={countText}
            />
            
            {/* Map/List View */}
            <MapListView 
              filteredReports={filteredReports}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              headingText={headingText}
            />
          </div>
        </div>
        
        <div>
          <div className="flex flex-col gap-4">
            {/* Performance Card */}
            <PerformanceCard 
              theme={theme}
              cardBg={cardBg}
              cardBorder={cardBorder}
              headingText={headingText}
              subtitleText={subtitleText}
              progressBg={progressBg}
              progressFill={progressFill}
            />
            
            {/* Recent Issues Card */}
            <RecentIssuesCard 
              theme={theme}
              cardBg={cardBg}
              cardBorder={cardBorder}
              darkBg={darkBg}
              headingText={headingText}
              subtitleText={subtitleText}
            />
            
            {/* AI Verification Card */}
            <AIVerificationCard 
              theme={theme}
              cardBg={cardBg}
              cardBorder={cardBorder}
              darkBg={darkBg}
              headingText={headingText}
              subtitleText={subtitleText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MunicipalDashboard;
