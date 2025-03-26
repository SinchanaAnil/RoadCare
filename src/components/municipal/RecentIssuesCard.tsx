
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentIssuesCardProps {
  theme: string;
  cardBg: string;
  cardBorder: string;
  darkBg: string;
  headingText: string;
  subtitleText: string;
}

const RecentIssuesCard: React.FC<RecentIssuesCardProps> = ({
  theme,
  cardBg,
  cardBorder,
  darkBg,
  headingText,
  subtitleText
}) => {
  return (
    <Card className={`p-6 ${cardBg} border-${cardBorder} border-2`}>
      <h2 className={`text-xl font-bold ${headingText} mb-4`}>Recent Issues</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className={`p-4 ${darkBg} rounded-lg flex items-center gap-4`}>
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-[#28354A]' : 'bg-[#D2E1EE]'}`}>
              <Wrench className={`h-5 w-5 ${theme === 'dark' ? 'text-[#D2B48C]' : 'text-[#B87333]'}`} />
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${headingText}`}>Pothole Repair #{item + 1000}</h4>
              <p className={`text-sm ${subtitleText}`}>HSR Layout, Sector {item}</p>
            </div>
            <div>
              <Button variant="outline" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200" asChild>
                <Link to={`/verify-repair/${item}`}>Submit Repair</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentIssuesCard;
