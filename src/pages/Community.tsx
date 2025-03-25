
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, TrendingUp } from 'lucide-react';
import DiscussionsTab from '@/components/community/DiscussionsTab';
import LeaderboardTab from '@/components/community/LeaderboardTab';
import WorkerLeaderboardTab from '@/components/community/WorkerLeaderboardTab';
import { mockPosts, mockLeaderboard } from '@/components/community/mockData';

const Community = () => {
  const { user } = useAuth();
  const isMunicipalWorker = user?.user_type === "municipal";

  return (
    <div className="container py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        <span className="font-michroma">RoadCare</span> Community Forum
      </h1>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="w-full flex mb-6 bg-muted p-1 rounded-lg">
          <TabsTrigger 
            value="discussions" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Discussions
          </TabsTrigger>
          <TabsTrigger 
            value="leaderboard" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            {isMunicipalWorker ? "Worker Details" : "Leaderboard"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussions">
          <DiscussionsTab initialPosts={mockPosts} />
        </TabsContent>

        <TabsContent value="leaderboard">
          {isMunicipalWorker ? (
            <WorkerLeaderboardTab />
          ) : (
            <LeaderboardTab initialLeaderboard={mockLeaderboard} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
