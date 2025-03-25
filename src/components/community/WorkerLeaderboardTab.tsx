
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, User, Wrench, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getBadgeColorClass } from './ForumPost';
import BadgeCriteria from './BadgeCriteria';

// Mock data for municipal workers
const mockWorkerLeaderboard = [
  {
    userId: "w1",
    name: "Rajesh Kumar",
    badge: "expert",
    repairsCount: 86,
    issuesResolved: 73,
    responseTime: "8h",
    area: "Koramangala",
    specialization: "Road Repairs"
  },
  {
    userId: "w2",
    name: "Sunita Sharma",
    badge: "gold",
    repairsCount: 64,
    issuesResolved: 61,
    responseTime: "12h",
    area: "Indiranagar",
    specialization: "Drainage Systems"
  },
  {
    userId: "w3",
    name: "Mohan Das",
    badge: "silver",
    repairsCount: 52,
    issuesResolved: 45,
    responseTime: "24h",
    area: "Jayanagar",
    specialization: "Street Lighting"
  },
  {
    userId: "w4",
    name: "Priya Patel",
    badge: "bronze",
    repairsCount: 37,
    issuesResolved: 31,
    responseTime: "36h",
    area: "HSR Layout",
    specialization: "Pothole Repairs"
  },
  {
    userId: "w5",
    name: "Arun Joshi",
    badge: "bronze",
    repairsCount: 28,
    issuesResolved: 24,
    responseTime: "48h",
    area: "Whitefield",
    specialization: "Traffic Signs"
  }
];

interface WorkerLeaderboardTabProps {
  initialLeaderboard?: any[];
}

const WorkerLeaderboardTab = ({ initialLeaderboard = mockWorkerLeaderboard }: WorkerLeaderboardTabProps) => {
  const [areaFilter, setAreaFilter] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);

  // Filter leaderboard by area
  useEffect(() => {
    if (!areaFilter) {
      setLeaderboard(initialLeaderboard);
    } else {
      const filtered = initialLeaderboard.filter(entry => 
        entry.area?.toLowerCase().includes(areaFilter.toLowerCase()) ||
        entry.specialization?.toLowerCase().includes(areaFilter.toLowerCase())
      );
      setLeaderboard(filtered);
    }
  }, [areaFilter, initialLeaderboard]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by area or specialization..."
            className="pl-10"
            value={areaFilter || ''}
            onChange={(e) => setAreaFilter(e.target.value)}
          />
        </div>
        <Button 
          variant="outline"
          className="flex items-center gap-2 border-primary/20"
          onClick={() => setAreaFilter(null)}
        >
          <Filter className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>

      <div className="bg-white dark:bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-primary text-primary-foreground p-3 text-sm font-medium">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-3">Worker</div>
          <div className="col-span-2 text-center">Specialization</div>
          <div className="col-span-1 text-center">Badge</div>
          <div className="col-span-1 text-center">Repairs</div>
          <div className="col-span-1 text-center">Resolved</div>
          <div className="col-span-1 text-center">Resp. Time</div>
          <div className="col-span-2 text-center">Area</div>
        </div>
        
        {leaderboard.map((worker, index) => (
          <div 
            key={worker.userId} 
            className={`grid grid-cols-12 p-3 text-sm items-center ${
              index % 2 === 0 ? 'bg-white dark:bg-card' : 'bg-gray-50 dark:bg-card/80'
            } hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors`}
          >
            <div className="col-span-1 text-center font-bold text-primary">
              {index + 1}
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">{worker.name}</span>
            </div>
            <div className="col-span-2 text-center flex items-center justify-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-secondary" />
              <span className="text-xs">{worker.specialization}</span>
            </div>
            <div className="col-span-1 text-center">
              <Badge className={`${getBadgeColorClass(worker.badge)}`}>
                {worker.badge.charAt(0).toUpperCase() + worker.badge.slice(1)}
              </Badge>
            </div>
            <div className="col-span-1 text-center font-medium">
              {worker.repairsCount}
            </div>
            <div className="col-span-1 text-center font-medium text-accent">
              {worker.issuesResolved}
            </div>
            <div className="col-span-1 text-center">
              <div className="flex items-center justify-center gap-1">
                <Zap className="h-3 w-3 text-secondary" />
                <span className="text-xs font-medium">{worker.responseTime}</span>
              </div>
            </div>
            <div className="col-span-2 text-center text-xs text-muted-foreground">
              {worker.area}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-card rounded-lg border p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Municipal Worker Performance Criteria</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#8B5CF6] text-white">Expert</Badge>
              <span className="text-sm">Over 75 repairs with 90%+ resolution rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-[#F59E0B] text-white">Gold</Badge>
              <span className="text-sm">50+ repairs with 85%+ resolution rate</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#94A3B8] text-white">Silver</Badge>
              <span className="text-sm">40+ repairs with 80%+ resolution rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-[#B87333] text-white">Bronze</Badge>
              <span className="text-sm">25+ repairs with 75%+ resolution rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerLeaderboardTab;
