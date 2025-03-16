
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Check, Clock, FileSearch, Filter, MapPin, Search, PieChart, BarChart, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ReportsList from '@/components/reports/ReportsList';
import MapView from '@/components/map/MapView';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for demonstration
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

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('map');
  const [filteredReports, setFilteredReports] = useState(mockReports);
  const [timeRange, setTimeRange] = useState('weekly');

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

  return (
    <div className="container py-6 px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-muted-foreground">Here's what's happening in Bangalore roads</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold">Road Issue Tracker</h2>
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
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Statistics</h2>
              <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
                <TabsList className="h-8">
                  <TabsTrigger value="weekly" className="text-xs h-7 px-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="text-xs h-7 px-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    Monthly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              <Card className="p-4 bg-fixit-primary/10 border-fixit-primary/20">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-fixit-primary text-white">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Issues</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-fixit-warning/10 border-fixit-warning/20">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-fixit-warning text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold">16</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-fixit-success/10 border-fixit-success/20">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-fixit-success text-white">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Report Analytics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <PieChart className="h-4 w-4 mr-2 text-fixit-primary" />
                    <span className="text-sm font-medium">Issue Categories</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{timeRange === 'weekly' ? 'Last 7 days' : 'Last 30 days'}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Potholes</span>
                      <span className="text-xs font-semibold">65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-fixit-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Drainage</span>
                      <span className="text-xs font-semibold">15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-fixit-secondary h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Cracks</span>
                      <span className="text-xs font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-fixit-warning h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Others</span>
                      <span className="text-xs font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-fixit-accent h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Your Recent Activities</h3>
              <div className="space-y-4">
                {filteredReports.slice(0, 3).map((report) => (
                  <div key={report.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className={`mt-0.5 rounded-full p-1.5 
                      ${report.status === 'pending' ? 'bg-fixit-primary text-white' : 
                        report.status === 'in-progress' ? 'bg-fixit-warning text-white' : 
                        'bg-fixit-success text-white'}`}>
                      {report.status === 'pending' ? <AlertCircle className="h-3 w-3" /> :
                        report.status === 'in-progress' ? <Clock className="h-3 w-3" /> :
                        <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{report.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.location} • {new Date(report.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="text-fixit-primary p-0 h-auto mt-2">
                View all activities
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Quick Report</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Noticed a road issue in Bangalore? Report it quickly to get it fixed!
              </p>
              <Button className="w-full bg-fixit-accent hover:bg-fixit-accent/90">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report New Issue
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
