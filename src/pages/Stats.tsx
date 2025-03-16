
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  PieChart, 
  AreaChart, 
  MapPin, 
  TrendingUp, 
  BarChart, 
  Calendar,
  Clock,
  AlertCircle,
  Check
} from 'lucide-react';

const Stats = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [viewType, setViewType] = useState('overview');

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Bangalore Road Statistics</h1>
          <p className="text-muted-foreground">
            Analytics and insights on road issues across Bangalore
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Yearly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-3 bg-fixit-primary/10">
              <AlertCircle className="h-6 w-6 text-fixit-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">82</p>
                <p className="text-xs text-fixit-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12%
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-3 bg-fixit-warning/10">
              <Clock className="h-6 w-6 text-fixit-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">5.2</p>
                <p className="text-sm">days</p>
                <p className="text-xs text-fixit-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8%
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-3 bg-fixit-success/10">
              <Check className="h-6 w-6 text-fixit-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">76%</p>
                <p className="text-xs text-fixit-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5%
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Tabs value={viewType} onValueChange={setViewType} className="mb-6">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
            <PieChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
            <BarChart className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="locations" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            Locations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Issue Categories</h3>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="h-64 flex items-center justify-center">
                {/* Placeholder for Pie Chart */}
                <div className="text-center space-y-4">
                  <div className="flex gap-4 justify-center">
                    <div className="w-32 h-32 rounded-full border-8 border-fixit-primary relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-8 border-fixit-warning" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0% 25%)' }}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-fixit-success" style={{ clipPath: 'polygon(0 0, 15% 0, 15% 100%, 0% 100%)' }}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-fixit-accent" style={{ clipPath: 'polygon(100% 25%, 100% 40%, 0 40%, 0 25%)' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-fixit-primary rounded-full mr-2"></span>
                      <span>Potholes (65%)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-fixit-warning rounded-full mr-2"></span>
                      <span>Drainage (15%)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-fixit-success rounded-full mr-2"></span>
                      <span>Cracks (10%)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-fixit-accent rounded-full mr-2"></span>
                      <span>Others (10%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Issue Status</h3>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-fixit-primary mr-2"></span>
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="text-sm font-medium">24 (29%)</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 bg-fixit-primary rounded-full" style={{ width: '29%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-fixit-warning mr-2"></span>
                      <span className="text-sm">In Progress</span>
                    </div>
                    <span className="text-sm font-medium">16 (20%)</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 bg-fixit-warning rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-fixit-success mr-2"></span>
                      <span className="text-sm">Completed</span>
                    </div>
                    <span className="text-sm font-medium">42 (51%)</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 bg-fixit-success rounded-full" style={{ width: '51%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Issue Reports Over Time</h3>
              <Button variant="outline" size="sm">
                <AreaChart className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="h-80 text-center">
              {/* Placeholder for Bar Chart */}
              <div className="h-full flex items-end justify-between gap-1 pt-10 pb-8 px-4 relative">
                <div className="absolute inset-x-0 bottom-0 border-t border-muted"></div>
                <div className="absolute inset-y-0 left-0 border-r border-muted"></div>
                
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex">
                      <div className="w-6 bg-fixit-primary rounded-t h-20" style={{ height: `${Math.random() * 100 + 20}px` }}></div>
                      <div className="w-6 bg-fixit-warning rounded-t h-16" style={{ height: `${Math.random() * 60 + 20}px` }}></div>
                      <div className="w-6 bg-fixit-success rounded-t h-24" style={{ height: `${Math.random() * 80 + 20}px` }}></div>
                    </div>
                    <span className="text-xs mt-2">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm mt-4">
                <div className="flex items-center justify-center">
                  <span className="w-3 h-3 bg-fixit-primary rounded-full mr-2"></span>
                  <span>Pending</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-3 h-3 bg-fixit-warning rounded-full mr-2"></span>
                  <span>In Progress</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-3 h-3 bg-fixit-success rounded-full mr-2"></span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="locations">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Issue Hotspots in Bangalore</h3>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                {/* Placeholder for Bangalore map */}
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Bangalore area map with issue hotspots
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Top Issue Areas</h4>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Koramangala</span>
                    <span className="text-sm font-medium">24 reports</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 bg-fixit-primary rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Indiranagar</span>
                    <span className="text-sm font-medium">18 reports</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 bg-fixit-primary rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Whitefield</span>
                    <span className="text-sm font-medium">15 reports</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 bg-fixit-primary rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Electronic City</span>
                    <span className="text-sm font-medium">12 reports</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 bg-fixit-primary rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Jayanagar</span>
                    <span className="text-sm font-medium">8 reports</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 bg-fixit-primary rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Stats;
