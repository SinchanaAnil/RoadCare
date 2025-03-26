
import React from 'react';
import { Card } from '@/components/ui/card';

interface PerformanceCardProps {
  theme: string;
  cardBg: string;
  cardBorder: string;
  headingText: string;
  subtitleText: string;
  progressBg: string;
  progressFill: string;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  theme,
  cardBg,
  cardBorder,
  headingText,
  subtitleText,
  progressBg,
  progressFill
}) => {
  return (
    <Card className={`p-6 ${cardBg} border-${cardBorder} border-2`}>
      <h2 className={`text-xl font-bold ${headingText} mb-4`}>Your Performance</h2>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${subtitleText}`}>Response Time</span>
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-[#D2B48C]' : 'text-[#B87333]'}`}>9.2 hours</span>
          </div>
          <div className={`w-full h-2 ${progressBg} rounded-full overflow-hidden`}>
            <div className={`h-full ${progressFill} rounded-full`} style={{ width: '75%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${subtitleText}`}>Resolution Rate</span>
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-[#D2B48C]' : 'text-[#B87333]'}`}>92%</span>
          </div>
          <div className={`w-full h-2 ${progressBg} rounded-full overflow-hidden`}>
            <div className={`h-full ${progressFill} rounded-full`} style={{ width: '92%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${subtitleText}`}>Citizen Satisfaction</span>
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-[#D2B48C]' : 'text-[#B87333]'}`}>4.7/5</span>
          </div>
          <div className={`w-full h-2 ${progressBg} rounded-full overflow-hidden`}>
            <div className={`h-full ${progressFill} rounded-full`} style={{ width: '94%' }}></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceCard;
