
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Bell, 
  Shield, 
  LogOut, 
  Clock,
  AlertCircle,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock user stats
  const userStats = {
    totalReports: 12,
    pendingReports: 4,
    inProgressReports: 3,
    completedReports: 5,
    upvotesReceived: 32,
    joinedDate: '2023-01-15'
  };

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-fixit-primary/10">
                    <User className="h-12 w-12 text-fixit-primary" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">Bangalore, Karnataka</p>
              
              <div className="w-full grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2">
                  <p className="text-2xl font-bold">{userStats.totalReports}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="p-2">
                  <p className="text-2xl font-bold">{userStats.upvotesReceived}</p>
                  <p className="text-xs text-muted-foreground">Upvotes</p>
                </div>
                <div className="p-2">
                  <p className="text-2xl font-bold">{userStats.completedReports}</p>
                  <p className="text-xs text-muted-foreground">Fixed</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="profile" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
                  <User className="h-4 w-4 mr-2" />
                  Profile Details
                </TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  My Reports
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="p-6">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <p className="text-sm text-muted-foreground">Update your account details</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Name</span>
                      </div>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Email</span>
                      </div>
                      <p className="font-medium">{user?.email || 'Not provided'}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone</span>
                      </div>
                      <p className="font-medium">{user?.phone || 'Not provided'}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Location</span>
                      </div>
                      <p className="font-medium">Bangalore, Karnataka</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Preferences</h3>
                    <p className="text-sm text-muted-foreground">Manage your notification settings</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive email about report updates</p>
                        </div>
                      </div>
                      <div>
                        <input type="checkbox" id="email-notifications" className="sr-only peer" defaultChecked />
                        <label htmlFor="email-notifications" className="relative inline-flex h-5 w-9 cursor-pointer rounded-full bg-muted peer-checked:bg-fixit-primary">
                          <span className="absolute h-4 w-4 rounded-full bg-white transform translate-x-0.5 translate-y-0.5 transition peer-checked:translate-x-4" />
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Push Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive push notifications about nearby issues</p>
                        </div>
                      </div>
                      <div>
                        <input type="checkbox" id="push-notifications" className="sr-only peer" defaultChecked />
                        <label htmlFor="push-notifications" className="relative inline-flex h-5 w-9 cursor-pointer rounded-full bg-muted peer-checked:bg-fixit-primary">
                          <span className="absolute h-4 w-4 rounded-full bg-white transform translate-x-0.5 translate-y-0.5 transition peer-checked:translate-x-4" />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-fixit-primary hover:bg-fixit-primary/90">Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reports" className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">My Reports</h3>
                      <p className="text-sm text-muted-foreground">Track the status of your reported issues</p>
                    </div>
                    <Button asChild size="sm" className="bg-fixit-accent hover:bg-fixit-accent/90">
                      <a href="/report">Report New Issue</a>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 bg-fixit-primary/10 border-fixit-primary/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-fixit-primary text-white">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-xl font-bold">{userStats.pendingReports}</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-fixit-warning/10 border-fixit-warning/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-fixit-warning text-white">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">In Progress</p>
                          <p className="text-xl font-bold">{userStats.inProgressReports}</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-fixit-success/10 border-fixit-success/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-fixit-success text-white">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="text-xl font-bold">{userStats.completedReports}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Large pothole on MG Road</h4>
                          <p className="text-sm text-muted-foreground">Reported on 15 Oct 2023</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-fixit-primary/10 text-fixit-primary">
                          Pending
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Broken traffic light at Brigade Road</h4>
                          <p className="text-sm text-muted-foreground">Reported on 10 Oct 2023</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-fixit-warning/10 text-fixit-warning">
                          In Progress
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Cracked sidewalk near Cubbon Park</h4>
                          <p className="text-sm text-muted-foreground">Reported on 5 Oct 2023</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-fixit-success/10 text-fixit-success">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <a href="/my-reports">View All Reports</a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
