
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Bell, 
  LogOut, 
  Clock,
  AlertCircle,
  Check,
  Award,
  Star,
  TrendingUp,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BadgeType, UserAchievement, UserBadge } from '@/types';

// Mock user badges and achievements
const mockUserBadges: UserBadge[] = [
  {
    type: 'gold',
    name: 'Road Guardian',
    description: 'Awarded for reporting 25+ road issues',
    unlockedAt: '2023-05-20T10:15:00Z',
  },
  {
    type: 'silver',
    name: 'Community Voice',
    description: 'Awarded for receiving 50+ upvotes on reports',
    unlockedAt: '2023-03-12T14:30:00Z',
  },
  {
    type: 'bronze',
    name: 'First Responder',
    description: 'Awarded for verifying 10+ repairs',
    unlockedAt: '2023-02-05T09:45:00Z',
  }
];

const mockAchievements: UserAchievement[] = [
  {
    id: '1',
    name: 'Issue Reporter',
    description: 'Reported first road issue',
    date: '2023-01-20T10:15:00Z',
    points: 100,
  },
  {
    id: '2',
    name: 'Helpful Citizen',
    description: 'Received 10 upvotes on reports',
    date: '2023-02-15T14:30:00Z',
    points: 250,
  },
  {
    id: '3',
    name: 'Road Hero',
    description: 'Reported 10 validated issues',
    date: '2023-04-10T09:45:00Z',
    points: 500,
  },
  {
    id: '4',
    name: 'Community Pillar',
    description: 'Contributed to 5 discussions',
    date: '2023-05-05T16:20:00Z',
    points: 300,
  },
  {
    id: '5',
    name: 'Verification Expert',
    description: 'Verified 5 fixed issues',
    date: '2023-06-12T11:05:00Z',
    points: 350,
  }
];

const getBadgeColorClass = (badge: BadgeType) => {
  switch (badge) {
    case 'platinum':
      return 'bg-slate-300 text-slate-900';
    case 'gold':
      return 'bg-amber-400 text-amber-900';
    case 'silver':
      return 'bg-gray-300 text-gray-800';
    case 'bronze':
      return 'bg-amber-700 text-amber-50';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

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
    joinedDate: '2023-01-15',
    points: 1520,
    currentBadge: 'silver' as BadgeType,
    pointsToNextBadge: 1480,
    nextBadge: 'gold' as BadgeType
  };

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-[#3498DB]">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-[#3498DB]/10 mb-4 overflow-hidden relative">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-12 w-12 text-[#3498DB]" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                  <div className={`rounded-full p-1 ${getBadgeColorClass(userStats.currentBadge)}`}>
                    <Award className="h-3 w-3" />
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge className={`${getBadgeColorClass(userStats.currentBadge)}`}>
                  {userStats.currentBadge.charAt(0).toUpperCase() + userStats.currentBadge.slice(1)}
                </Badge>
                <p className="text-xs text-muted-foreground">Member since {new Date(userStats.joinedDate).toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Bangalore, Karnataka</p>
              
              <div className="w-full mb-4">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-muted-foreground">Level Progress</span>
                  <span className="font-medium">{userStats.points}/{userStats.points + userStats.pointsToNextBadge} points</span>
                </div>
                <div className="w-full h-2 bg-[#F4F4F4] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#3498DB]" 
                    style={{ width: `${(userStats.points / (userStats.points + userStats.pointsToNextBadge)) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {userStats.pointsToNextBadge} more points to reach {userStats.nextBadge} badge
                </p>
              </div>
              
              <div className="w-full grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 bg-[#3498DB]/5 rounded-md">
                  <p className="text-2xl font-bold text-[#3498DB]">{userStats.totalReports}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="p-2 bg-[#3498DB]/5 rounded-md">
                  <p className="text-2xl font-bold text-[#3498DB]">{userStats.upvotesReceived}</p>
                  <p className="text-xs text-muted-foreground">Upvotes</p>
                </div>
                <div className="p-2 bg-[#3498DB]/5 rounded-md">
                  <p className="text-2xl font-bold text-[#3498DB]">{userStats.completedReports}</p>
                  <p className="text-xs text-muted-foreground">Fixed</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-[#3498DB]/20 text-[#333333] hover:bg-[#3498DB]/5" 
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
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger 
                  value="profile" 
                  className="data-[state=active]:bg-[#3498DB] data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="data-[state=active]:bg-[#3498DB] data-[state=active]:text-white"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  My Reports
                </TabsTrigger>
                <TabsTrigger 
                  value="achievements" 
                  className="data-[state=active]:bg-[#3498DB] data-[state=active]:text-white"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Achievements
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
                        <label htmlFor="email-notifications" className="relative inline-flex h-5 w-9 cursor-pointer rounded-full bg-muted peer-checked:bg-[#3498DB]">
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
                        <label htmlFor="push-notifications" className="relative inline-flex h-5 w-9 cursor-pointer rounded-full bg-muted peer-checked:bg-[#3498DB]">
                          <span className="absolute h-4 w-4 rounded-full bg-white transform translate-x-0.5 translate-y-0.5 transition peer-checked:translate-x-4" />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-[#3498DB] hover:bg-[#3498DB]/90">Save Changes</Button>
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
                    <Button asChild size="sm" className="bg-[#3498DB] hover:bg-[#3498DB]/90">
                      <a href="/report">Report New Issue</a>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 bg-[#3498DB]/10 border-[#3498DB]/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-[#3498DB] text-white">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-xl font-bold">{userStats.pendingReports}</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-[#E74C3C]/10 border-[#E74C3C]/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-[#E74C3C] text-white">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">In Progress</p>
                          <p className="text-xl font-bold">{userStats.inProgressReports}</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-[#2ECC71]/10 border-[#2ECC71]/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-[#2ECC71] text-white">
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
                        <span className="text-xs px-2 py-1 rounded-full bg-[#3498DB]/10 text-[#3498DB]">
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
                        <span className="text-xs px-2 py-1 rounded-full bg-[#E74C3C]/10 text-[#E74C3C]">
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
                        <span className="text-xs px-2 py-1 rounded-full bg-[#2ECC71]/10 text-[#2ECC71]">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" asChild className="border-[#3498DB]/20 text-[#3498DB] hover:bg-[#3498DB]/5">
                      <a href="/my-reports">View All Reports</a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="achievements" className="p-6">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-[#3498DB]" />
                      My Achievements
                    </h3>
                    <p className="text-sm text-muted-foreground">View your badges and achievements</p>
                  </div>
                  
                  <div className="bg-[#3498DB]/5 rounded-lg p-4">
                    <h4 className="text-base font-medium mb-3 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-[#3498DB]" />
                      Badges Earned
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {mockUserBadges.map((badge) => (
                        <Card key={badge.name} className="p-3 flex flex-col items-center text-center">
                          <div className={`rounded-full p-3 ${getBadgeColorClass(badge.type)} mb-2`}>
                            <Award className="h-5 w-5" />
                          </div>
                          <h5 className="font-medium text-sm">{badge.name}</h5>
                          <Badge className={`my-1 ${getBadgeColorClass(badge.type)}`}>
                            {badge.type.charAt(0).toUpperCase() + badge.type.slice(1)}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Awarded: {new Date(badge.unlockedAt).toLocaleDateString()}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-[#3498DB]/5 rounded-lg p-4">
                    <h4 className="text-base font-medium mb-3 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-[#3498DB]" />
                      Recent Achievements
                    </h4>
                    <div className="space-y-3">
                      {mockAchievements.map((achievement) => (
                        <div key={achievement.id} className="bg-white p-3 rounded-lg border flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#3498DB]/10 rounded-full p-2">
                              <Star className="h-4 w-4 text-[#3498DB]" />
                            </div>
                            <div>
                              <h5 className="font-medium text-sm">{achievement.name}</h5>
                              <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs px-2 py-1 rounded-full bg-[#3498DB]/10 text-[#3498DB] font-medium">
                              +{achievement.points} pts
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      asChild 
                      className="border-[#3498DB]/20 text-[#3498DB] hover:bg-[#3498DB]/5"
                    >
                      <a href="/community">View Community Leaderboard</a>
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
