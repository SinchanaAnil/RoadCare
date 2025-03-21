
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare,
  ThumbsUp,
  Send,
  User,
  Image as ImageIcon,
  MapPin,
  Search,
  TrendingUp,
  Award,
  Filter
} from 'lucide-react';
import { ForumPost, LeaderboardEntry, BadgeType } from '@/types';

// Mock data for the forum posts
const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Large pothole on Indiranagar 100ft Road',
    content: 'There is a large pothole that has been causing accidents near the Sony signal. It needs to be fixed urgently as it\'s in the middle of a busy intersection.',
    author: {
      id: '1',
      name: 'Rajesh Kumar',
      badge: 'gold',
    },
    date: '2023-10-15T10:30:00',
    likes: 24,
    comments: [
      {
        id: '1',
        author: {
          id: '2',
          name: 'Priya Sharma',
          badge: 'silver',
        },
        content: 'I agree! My car was damaged because of this last week.',
        date: '2023-10-15T14:25:00',
        likes: 8,
      },
      {
        id: '2',
        author: {
          id: '3',
          name: 'Amit Patel',
          badge: 'bronze',
        },
        content: 'I\'ve reported this to the BBMP already. Hope they take action soon.',
        date: '2023-10-16T09:10:00',
        likes: 5,
      }
    ],
    images: ['/lovable-uploads/699255ca-9aff-4587-8b6c-fc1b70acefc1.png'],
    location: 'Indiranagar 100ft Road, Sony Signal',
    lat: 12.9782,
    lng: 77.6408,
  },
  {
    id: '2',
    title: 'Damaged sidewalk in Koramangala',
    content: 'The sidewalk near the 5th block in Koramangala is completely broken. It\'s very difficult for pedestrians, especially the elderly, to walk safely.',
    author: {
      id: '4',
      name: 'Sanjay Singh',
      badge: 'platinum',
    },
    date: '2023-10-14T16:45:00',
    likes: 32,
    comments: [
      {
        id: '3',
        author: {
          id: '5',
          name: 'Meera Reddy',
          badge: 'gold',
        },
        content: 'I walk there every day and it\'s getting worse with each rain. We need to fix this before the next monsoon.',
        date: '2023-10-14T18:20:00',
        likes: 12,
      }
    ],
    location: 'Koramangala 5th Block, Near Jyoti Nivas College',
    lat: 12.9347,
    lng: 77.6205,
  },
  {
    id: '3',
    title: 'Broken traffic light at Brigade Road',
    content: 'The traffic light at the intersection of Brigade Road and MG Road has been broken for over a week now. This is causing major traffic congestion during peak hours.',
    author: {
      id: '6',
      name: 'Divya Krishnan',
      badge: 'silver',
    },
    date: '2023-10-13T12:15:00',
    likes: 18,
    comments: [],
    location: 'Brigade Road and MG Road Intersection',
    lat: 12.9719,
    lng: 77.6186,
  }
];

// Mock data for the leaderboard
const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: '1',
    name: 'Rajesh Kumar',
    badge: 'gold',
    reportsCount: 37,
    points: 3720,
    area: 'Indiranagar',
  },
  {
    userId: '4',
    name: 'Sanjay Singh',
    badge: 'platinum',
    reportsCount: 54,
    points: 6240,
    area: 'Koramangala',
  },
  {
    userId: '5',
    name: 'Meera Reddy',
    badge: 'gold',
    reportsCount: 28,
    points: 3150,
    area: 'Whitefield',
  },
  {
    userId: '2',
    name: 'Priya Sharma',
    badge: 'silver',
    reportsCount: 16,
    points: 1820,
    area: 'Jayanagar',
  },
  {
    userId: '7',
    name: 'Vikram Mehta',
    badge: 'gold',
    reportsCount: 31,
    points: 3420,
    area: 'HSR Layout',
  },
  {
    userId: '8',
    name: 'Ravi Desai',
    badge: 'silver',
    reportsCount: 19,
    points: 2140,
    area: 'BTM Layout',
  },
  {
    userId: '3',
    name: 'Amit Patel',
    badge: 'bronze',
    reportsCount: 9,
    points: 980,
    area: 'JP Nagar',
  },
  {
    userId: '9',
    name: 'Neha Gupta',
    badge: 'bronze',
    reportsCount: 7,
    points: 780,
    area: 'RT Nagar',
  },
  {
    userId: '10',
    name: 'Karthik Subramanian',
    badge: 'silver',
    reportsCount: 22,
    points: 2380,
    area: 'Malleswaram',
  },
  {
    userId: '6',
    name: 'Divya Krishnan',
    badge: 'silver',
    reportsCount: 15,
    points: 1650,
    area: 'Yelahanka',
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

const Community = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(mockPosts);
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
  const [areaFilter, setAreaFilter] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

  // Filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setPosts(mockPosts);
    } else {
      const filtered = mockPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPosts(filtered);
    }
  }, [searchQuery]);

  // Filter leaderboard by area
  useEffect(() => {
    if (!areaFilter) {
      setLeaderboard(mockLeaderboard);
    } else {
      const filtered = mockLeaderboard.filter(entry => 
        entry.area?.toLowerCase().includes(areaFilter.toLowerCase())
      );
      setLeaderboard(filtered);
    }
  }, [areaFilter]);

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => 
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `new-${Date.now()}`,
          author: {
            id: user?.id || 'current-user',
            name: user?.name || 'Current User',
            badge: 'bronze' as BadgeType,
          },
          content: commentText,
          date: new Date().toISOString(),
          likes: 0,
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
    
    setCommentText('');
  };

  return (
    <div className="container py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6 text-[#3498DB]">Community Forum</h1>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="w-full flex mb-6 bg-[#F4F4F4] p-1 rounded-lg">
          <TabsTrigger 
            value="discussions" 
            className="flex-1 data-[state=active]:bg-[#3498DB] data-[state=active]:text-white"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Discussions
          </TabsTrigger>
          <TabsTrigger 
            value="leaderboard" 
            className="flex-1 data-[state=active]:bg-[#3498DB] data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-[#3498DB] hover:bg-[#3498DB]/90">
              New Post
            </Button>
          </div>

          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#3498DB]/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-[#3498DB]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{post.author.name}</span>
                          {post.author.badge && (
                            <Badge 
                              className={`text-xs ${getBadgeColorClass(post.author.badge)}`}
                            >
                              {post.author.badge.charAt(0).toUpperCase() + post.author.badge.slice(1)}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-muted-foreground hover:text-[#3498DB]"
                        onClick={() => handleLikePost(post.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm mb-3">{post.content}</p>
                  
                  {post.location && (
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{post.location}</span>
                    </div>
                  )}
                  
                  {post.images && post.images.length > 0 && (
                    <div className="mb-4">
                      <img 
                        src={post.images[0]} 
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium">
                        Comments ({post.comments.length})
                      </h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => setSelectedPost(selectedPost?.id === post.id ? null : post)}
                      >
                        {selectedPost?.id === post.id ? 'Hide Comments' : 'View All Comments'}
                      </Button>
                    </div>
                    
                    {selectedPost?.id === post.id && post.comments.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-[#F4F4F4] p-3 rounded-md">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">{comment.author.name}</span>
                                {comment.author.badge && (
                                  <Badge 
                                    className={`text-xs ${getBadgeColorClass(comment.author.badge)}`}
                                  >
                                    {comment.author.badge.charAt(0).toUpperCase() + comment.author.badge.slice(1)}
                                  </Badge>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-[#3498DB]"
                                onClick={() => handleLikeComment(post.id, comment.id)}
                              >
                                <ThumbsUp className="h-3 w-3" />
                                <span className="ml-1 text-xs">{comment.likes}</span>
                              </Button>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(comment.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a comment..." 
                        className="text-sm"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      />
                      <Button 
                        size="icon" 
                        className="bg-[#3498DB] hover:bg-[#3498DB]/90"
                        onClick={() => handleAddComment(post.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No discussions found. Be the first to start a conversation!
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by area..."
                className="pl-10"
                value={areaFilter || ''}
                onChange={(e) => setAreaFilter(e.target.value)}
              />
            </div>
            <Button 
              variant="outline"
              className="flex items-center gap-2 border-[#3498DB]/20"
              onClick={() => setAreaFilter(null)}
            >
              <Filter className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 bg-[#3498DB] text-white p-3 text-sm font-medium">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">User</div>
              <div className="col-span-2 text-center">Badge</div>
              <div className="col-span-2 text-center">Reports</div>
              <div className="col-span-2 text-center">Points</div>
              <div className="col-span-1 text-center">Area</div>
            </div>
            
            {leaderboard.map((entry, index) => (
              <div 
                key={entry.userId} 
                className={`grid grid-cols-12 p-3 text-sm items-center ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-[#3498DB]/5 transition-colors`}
              >
                <div className="col-span-1 text-center font-bold text-[#3498DB]">
                  {index + 1}
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#3498DB]/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-[#3498DB]" />
                  </div>
                  <span className="font-medium">{entry.name}</span>
                </div>
                <div className="col-span-2 text-center">
                  <Badge className={`${getBadgeColorClass(entry.badge)}`}>
                    {entry.badge.charAt(0).toUpperCase() + entry.badge.slice(1)}
                  </Badge>
                </div>
                <div className="col-span-2 text-center font-medium">
                  {entry.reportsCount}
                </div>
                <div className="col-span-2 text-center font-medium text-[#3498DB]">
                  {entry.points.toLocaleString()}
                </div>
                <div className="col-span-1 text-center text-xs text-muted-foreground">
                  {entry.area}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#3498DB]/10 rounded-lg p-4 border border-[#3498DB]/20">
            <h3 className="text-lg font-semibold text-[#3498DB] mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Badge Achievement Criteria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getBadgeColorClass('bronze')}>Bronze</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Awarded for reporting 5+ issues or earning 500+ points. Entry level badge for all community members.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getBadgeColorClass('silver')}>Silver</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Awarded for reporting 15+ issues or earning 1,500+ points. Shows consistent contributions.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getBadgeColorClass('gold')}>Gold</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Awarded for reporting 25+ issues or earning 3,000+ points. Recognizes dedicated contributors.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getBadgeColorClass('platinum')}>Platinum</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Awarded for reporting 50+ issues or earning 5,000+ points. Our most prestigious badge for top contributors.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
