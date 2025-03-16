
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, Check, MapPin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockReports = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole causing damage to vehicles',
    location: 'Main Street & 5th Avenue',
    status: 'pending',
    date: '2023-10-15',
    updatedAt: '2023-10-15',
    category: 'pothole',
    severity: 'high',
    images: ['https://placehold.co/300x200'],
    comments: [
      { id: '1', author: 'System', text: 'Report received', date: '2023-10-15' }
    ]
  },
  {
    id: '2',
    title: 'Cracked sidewalk near school',
    description: 'Multiple cracks in sidewalk creating tripping hazard',
    location: 'Oak Elementary School',
    status: 'in-progress',
    date: '2023-10-12',
    updatedAt: '2023-10-14',
    category: 'sidewalk',
    severity: 'medium',
    images: ['https://placehold.co/300x200'],
    comments: [
      { id: '1', author: 'System', text: 'Report received', date: '2023-10-12' },
      { id: '2', author: 'Admin', text: 'Assigned to repair team', date: '2023-10-14' }
    ]
  },
  {
    id: '3',
    title: 'Road sign damaged',
    description: 'Stop sign bent and difficult to see',
    location: 'Pine St. & Washington Ave.',
    status: 'completed',
    date: '2023-10-01',
    updatedAt: '2023-10-10',
    category: 'sign',
    severity: 'medium',
    images: ['https://placehold.co/300x200'],
    comments: [
      { id: '1', author: 'System', text: 'Report received', date: '2023-10-01' },
      { id: '2', author: 'Admin', text: 'Assigned to repair team', date: '2023-10-03' },
      { id: '3', author: 'Repair Team', text: 'Repair completed', date: '2023-10-10' }
    ]
  }
];

const MyReports = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const getFilteredReports = () => {
    if (activeTab === 'all') return mockReports;
    return mockReports.filter(report => report.status === activeTab);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5" />;
      case 'in-progress':
        return <Clock className="h-5 w-5" />;
      case 'completed':
        return <Check className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-fixit-primary text-white';
      case 'in-progress':
        return 'bg-fixit-warning text-white';
      case 'completed':
        return 'bg-fixit-success text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Reports</h1>
          <p className="text-muted-foreground">
            Track and manage all your submitted reports
          </p>
        </div>
        <Button asChild className="bg-fixit-accent hover:bg-fixit-accent/90">
          <Link to="/report">
            <AlertCircle className="h-4 w-4 mr-2" />
            Report New Issue
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
            All Reports
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
            <AlertCircle className="h-4 w-4 mr-2" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
            <Clock className="h-4 w-4 mr-2" />
            In Progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
            <Check className="h-4 w-4 mr-2" />
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {getFilteredReports().length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No reports found in this category</p>
              <Button asChild>
                <Link to="/report">Report New Issue</Link>
              </Button>
            </Card>
          ) : (
            getFilteredReports().map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <div className="md:flex">
                  {report.images && report.images.length > 0 && (
                    <div className="md:w-1/4 h-48 md:h-auto bg-muted">
                      <img 
                        src={report.images[0]} 
                        alt={report.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{report.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {report.category}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{report.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${getStatusColor(report.status)}`}>
                          {getStatusIcon(report.status)}
                        </div>
                        <div>
                          <p className="text-sm font-medium capitalize">
                            {report.status.replace('-', ' ')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Updated: {new Date(report.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {report.description}
                    </p>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>{report.comments.length} updates</span>
                        </div>
                        <Button asChild variant="link" className="p-0 h-auto">
                          <Link to={`/report/${report.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyReports;
