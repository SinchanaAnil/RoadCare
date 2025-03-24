
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Clock } from 'lucide-react';
import { Report } from '@/types/reports';

type RecentActivitiesProps = {
  reports: Report[];
};

const RecentActivities = ({ reports }: RecentActivitiesProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {reports.slice(0, 3).map((report) => (
          <div key={report.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
            <div className={`mt-0.5 rounded-full p-1.5 
              ${report.status === 'pending' ? 'bg-fixit-primary text-white' : 
                report.status === 'in-progress' ? 'bg-fixit-warning text-white' : 
                'bg-fixit-success text-white'}`}>
              {report.status === 'pending' ? <AlertCircle className="h-3 w-3" /> :
                report.status === 'in-progress' ? <Clock className="h-3 w-3" /> :
                <Check className="h-3 w-3" />}
            </div>
            <div>
              <p className="text-sm font-medium">{report.title}</p>
              <p className="text-xs text-muted-foreground">
                {report.location} • {new Date(report.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="link" className="text-fixit-primary p-0 h-auto mt-2">
        View all activities
      </Button>
    </Card>
  );
};

export default RecentActivities;
