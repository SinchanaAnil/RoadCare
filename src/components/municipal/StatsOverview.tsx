
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ClipboardList, MapPin } from 'lucide-react';

interface StatsItemProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  description: string;
  color: string;
  index: number;
}

const StatsItem: React.FC<StatsItemProps> = ({ title, count, icon, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <Card className={`p-6 ${color} border-2 hover:shadow-lg transition-all duration-200`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-medium mb-1`}>{title}</h3>
          <p className={`text-3xl font-bold mb-2`}>{count}</p>
          <p className={`text-sm`}>{description}</p>
        </div>
        <div className={`p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </Card>
  </motion.div>
);

interface StatsOverviewProps {
  theme: string;
  cardBg: string;
  darkBg: string;
  headingText: string;
  subtitleText: string;
  countText: string;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ 
  theme, 
  cardBg, 
  darkBg, 
  headingText, 
  subtitleText, 
  countText 
}) => {
  const dashboardItems = [
    {
      title: 'Pending Issues',
      count: 24,
      icon: <AlertTriangle className={`h-8 w-8 ${theme === 'dark' ? 'text-[#E57373]' : 'text-[#D32F2F]'}`} />,
      description: 'Road issues awaiting your action',
      color: `${cardBg} border-${theme === 'dark' ? '[#E57373]/20' : '[#E57373]/30'}`,
    },
    {
      title: 'Resolved Issues',
      count: 156,
      icon: <CheckCircle className={`h-8 w-8 ${theme === 'dark' ? 'text-[#A0CED9]' : 'text-[#2CB67D]'}`} />,
      description: 'Successfully completed repairs',
      color: `${cardBg} border-${theme === 'dark' ? '[#A0CED9]/20' : '[#2CB67D]/30'}`,
    },
    {
      title: 'Work Orders',
      count: 18,
      icon: <ClipboardList className={`h-8 w-8 ${theme === 'dark' ? 'text-[#D2B48C]' : 'text-[#B87333]'}`} />,
      description: 'Active maintenance tasks',
      color: `${cardBg} border-${theme === 'dark' ? '[#D2B48C]/20' : '[#B87333]/30'}`,
    },
    {
      title: 'Service Areas',
      count: 5,
      icon: <MapPin className={`h-8 w-8 ${theme === 'dark' ? 'text-[#A0CED9]' : 'text-[#2E4053]'}`} />,
      description: 'Districts under your supervision',
      color: `${cardBg} border-${theme === 'dark' ? '[#A0CED9]/20' : '[#2E4053]/30'}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {dashboardItems.map((item, index) => (
        <StatsItem
          key={index}
          title={item.title}
          count={item.count}
          icon={item.icon}
          description={item.description}
          color={item.color}
          index={index}
        />
      ))}
    </div>
  );
};

export default StatsOverview;
