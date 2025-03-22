
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, TrendingUp } from 'lucide-react';
import DiscussionsTab from '@/components/community/DiscussionsTab';
import LeaderboardTab from '@/components/community/LeaderboardTab';
import { mockPosts, mockLeaderboard } from '@/components/community/mockData';

const Community = () => {
  const { user } = useAuth();

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

        <TabsContent value="discussions">
          <DiscussionsTab initialPosts={mockPosts} />
        </TabsContent>

        <TabsContent value="leaderboard">
          <LeaderboardTab initialLeaderboard={mockLeaderboard} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
