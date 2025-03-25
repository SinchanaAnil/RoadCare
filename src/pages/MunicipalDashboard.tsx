
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Building2, Wrench, ClipboardList, MapPin, AlertTriangle, CheckCircle, Filter, FileSearch, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MapView from '@/components/map/MapView';
import ReportsList from '@/components/reports/ReportsList';
import { Link } from 'react-router-dom';

// Mock data for demonstration - similar to what's in Dashboard component
const mockReports = [
  {
    id: '1',
    title: 'Large pothole on MG Road',
    description: 'Deep pothole causing damage to vehicles',
    location: 'MG Road & Residency Road',
    status: 'pending',
    date: '2023-10-15',
    upvotes: 12,
    category: 'pothole',
    severity: 'high',
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: '2',
    title: 'Cracked sidewalk near school',
    description: 'Multiple cracks in sidewalk creating tripping hazard',
    location: 'Indiranagar 100ft Road',
    status: 'in-progress',
    date: '2023-10-12',
    upvotes: 8,
    category: 'sidewalk',
    severity: 'medium',
    lat: 12.9784,
    lng: 77.6408
  },
  {
    id: '3',
    title: 'Road sign damaged',
    description: 'Stop sign bent and difficult to see',
    location: 'Koramangala 80ft Road',
    status: 'completed',
    date: '2023-10-01',
    upvotes: 5,
    category: 'sign',
    severity: 'medium',
    lat: 12.9352,
    lng: 77.6245
  },
  {
    id: '4',
    title: 'Water logging issue',
    description: 'Street floods during rain causing traffic issues',
    location: 'Silk Board Junction',
    status: 'pending',
    date: '2023-10-14',
    upvotes: 15,
    category: 'drainage',
    severity: 'high',
    lat: 12.9177,
    lng: 77.6233
  }
];

const MunicipalDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('map');
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

  const dashboardItems = [
    {
      title: 'Pending Issues',
      count: 24,
      icon: <AlertTriangle className="h-8 w-8 text-[#E57373]" />,
      description: 'Road issues awaiting your action',
      color: 'bg-[#28354A] border-[#E57373]/20',
    },
    {
      title: 'Resolved Issues',
      count: 156,
      icon: <CheckCircle className="h-8 w-8 text-[#A0CED9]" />,
      description: 'Successfully completed repairs',
      color: 'bg-[#28354A] border-[#A0CED9]/20',
    },
    {
      title: 'Work Orders',
      count: 18,
      icon: <ClipboardList className="h-8 w-8 text-[#D2B48C]" />,
      description: 'Active maintenance tasks',
      color: 'bg-[#28354A] border-[#D2B48C]/20',
    },
    {
      title: 'Service Areas',
      count: 5,
      icon: <MapPin className="h-8 w-8 text-[#A0CED9]" />,
      description: 'Districts under your supervision',
      color: 'bg-[#28354A] border-[#A0CED9]/20',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#A0CED9] mb-2">Municipal Worker Dashboard</h1>
        <p className="text-[#D2B48C]">Welcome back, {user.name}! Manage and respond to road infrastructure issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-[#A0CED9]">Road Issue Tracker</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reports..."
                  className="w-full sm:w-[250px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`p-6 ${item.color} border-2 hover:shadow-lg transition-all duration-200`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-[#A0CED9] mb-1">{item.title}</h3>
                        <p className="text-3xl font-bold text-white mb-2">{item.count}</p>
                        <p className="text-sm text-[#A0CED9]/70">{item.description}</p>
                      </div>
                      <div className="p-3 rounded-full bg-[#1A2337]/50">
                        {item.icon}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Map/List View Tabs */}
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
          </div>
        </div>
        
        <div>
          <div className="flex flex-col gap-4">
            <Card className="p-6 bg-[#28354A] border-[#A0CED9]/20 border-2">
              <h2 className="text-xl font-bold text-[#A0CED9] mb-4">Your Performance</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#A0CED9]/70">Response Time</span>
                    <span className="text-sm font-medium text-[#D2B48C]">9.2 hours</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A2337] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D2B48C] rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#A0CED9]/70">Resolution Rate</span>
                    <span className="text-sm font-medium text-[#D2B48C]">92%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A2337] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D2B48C] rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#A0CED9]/70">Citizen Satisfaction</span>
                    <span className="text-sm font-medium text-[#D2B48C]">4.7/5</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A2337] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D2B48C] rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-[#28354A] border-[#A0CED9]/20 border-2">
              <h2 className="text-xl font-bold text-[#A0CED9] mb-4">Recent Issues</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 bg-[#1A2337] rounded-lg flex items-center gap-4">
                    <div className="p-2 rounded-full bg-[#28354A]">
                      <Wrench className="h-5 w-5 text-[#D2B48C]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#A0CED9]">Pothole Repair #{item + 1000}</h4>
                      <p className="text-sm text-[#A0CED9]/70">HSR Layout, Sector {item}</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200" asChild>
                        <Link to={`/verify-repair/${item}`}>Submit Repair</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 bg-[#28354A] border-[#A0CED9]/20 border-2">
              <h2 className="text-xl font-bold text-[#A0CED9] mb-4">AI Verification</h2>
              <p className="text-sm text-[#A0CED9]/80 mb-4">
                Upload repair photos to verify issue resolution with our AI system. Get instant verification and close tickets efficiently.
              </p>
              <div className="p-4 bg-[#1A2337] rounded-lg mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-[#E57373]" />
                  <h4 className="font-medium text-[#A0CED9]">Pending Verifications</h4>
                </div>
                <p className="text-sm text-[#A0CED9]/70 mb-2">5 repairs awaiting your verification</p>
                <Button variant="outline" size="sm" className="w-full justify-center" asChild>
                  <Link to="/dashboard">View All</Link>
                </Button>
              </div>
              <Button className="w-full bg-[#D2B48C] hover:bg-[#D2B48C]/90 text-[#1A2337]">
                <Wrench className="h-4 w-4 mr-2" />
                Start New Repair Verification
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MunicipalDashboard;

