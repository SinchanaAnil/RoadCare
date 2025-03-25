
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Building2, Tool, ClipboardList, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

const MunicipalDashboard = () => {
  const { user } = useAuth();

  // Redirect if user is not authenticated or not a municipal worker
  if (!user || user.user_type !== 'municipal') {
    return <Navigate to="/login" replace />;
  }

  const dashboardItems = [
    {
      title: 'Pending Issues',
      count: 24,
      icon: <AlertTriangle className="h-8 w-8 text-[#E57373]" />,
      description: 'Road issues awaiting your action',
      color: 'bg-[#28354A] border-[#E57373]/20',
    },
    {
      title: 'Resolved Issues',
      count: 156,
      icon: <CheckCircle className="h-8 w-8 text-[#A0CED9]" />,
      description: 'Successfully completed repairs',
      color: 'bg-[#28354A] border-[#A0CED9]/20',
    },
    {
      title: 'Work Orders',
      count: 18,
      icon: <ClipboardList className="h-8 w-8 text-[#D2B48C]" />,
      description: 'Active maintenance tasks',
      color: 'bg-[#28354A] border-[#D2B48C]/20',
    },
    {
      title: 'Service Areas',
      count: 5,
      icon: <MapPin className="h-8 w-8 text-[#A0CED9]" />,
      description: 'Districts under your supervision',
      color: 'bg-[#28354A] border-[#A0CED9]/20',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#A0CED9] mb-2">Municipal Worker Dashboard</h1>
        <p className="text-[#D2B48C]">Welcome back, {user.name}! Manage and respond to road infrastructure issues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`p-6 ${item.color} border-2 hover:shadow-lg transition-all duration-200`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-[#A0CED9] mb-1">{item.title}</h3>
                  <p className="text-3xl font-bold text-white mb-2">{item.count}</p>
                  <p className="text-sm text-[#A0CED9]/70">{item.description}</p>
                </div>
                <div className="p-3 rounded-full bg-[#1A2337]/50">
                  {item.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6 bg-[#28354A] border-[#A0CED9]/20 border-2">
          <h2 className="text-xl font-bold text-[#A0CED9] mb-4">Recent Issues</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 bg-[#1A2337] rounded-lg flex items-center gap-4">
                <div className="p-2 rounded-full bg-[#28354A]">
                  <Tool className="h-5 w-5 text-[#D2B48C]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-[#A0CED9]">Pothole Repair #{item + 1000}</h4>
                  <p className="text-sm text-[#A0CED9]/70">HSR Layout, Sector {item}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 text-xs rounded-full bg-[#E57373]/20 text-[#E57373]">
                    High Priority
                  </span>
                  <p className="text-xs text-[#A0CED9]/70 mt-1">Reported 2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-[#28354A] border-[#A0CED9]/20 border-2">
          <h2 className="text-xl font-bold text-[#A0CED9] mb-4">Your Performance</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#A0CED9]/70">Response Time</span>
                <span className="text-sm font-medium text-[#D2B48C]">9.2 hours</span>
              </div>
              <div className="w-full h-2 bg-[#1A2337] rounded-full overflow-hidden">
                <div className="h-full bg-[#D2B48C] rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#A0CED9]/70">Resolution Rate</span>
                <span className="text-sm font-medium text-[#D2B48C]">92%</span>
              </div>
              <div className="w-full h-2 bg-[#1A2337] rounded-full overflow-hidden">
                <div className="h-full bg-[#D2B48C] rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#A0CED9]/70">Citizen Satisfaction</span>
                <span className="text-sm font-medium text-[#D2B48C]">4.7/5</span>
              </div>
              <div className="w-full h-2 bg-[#1A2337] rounded-full overflow-hidden">
                <div className="h-full bg-[#D2B48C] rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MunicipalDashboard;
