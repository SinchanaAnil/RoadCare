
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LeaderboardEntry } from '@/types';
import { getBadgeColorClass } from './ForumPost';
import BadgeCriteria from './BadgeCriteria';

interface LeaderboardTabProps {
  initialLeaderboard: LeaderboardEntry[];
}

const LeaderboardTab = ({ initialLeaderboard }: LeaderboardTabProps) => {
  const [areaFilter, setAreaFilter] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);

  // Filter leaderboard by area
  useEffect(() => {
    if (!areaFilter) {
      setLeaderboard(initialLeaderboard);
    } else {
      const filtered = initialLeaderboard.filter(entry => 
        entry.area?.toLowerCase().includes(areaFilter.toLowerCase())
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

      <BadgeCriteria />
    </div>
  );
};

export default LeaderboardTab;
