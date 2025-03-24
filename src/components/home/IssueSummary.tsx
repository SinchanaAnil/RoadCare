
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Clock } from 'lucide-react';
import { Report } from '@/types/reports';

type IssueSummaryProps = {
  filteredReports: Report[];
};

const IssueSummary = ({ filteredReports }: IssueSummaryProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">Issue Summary</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
        <Card className="p-4 bg-fixit-primary/10 border-fixit-primary/20">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-fixit-primary text-white">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Issues</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-fixit-warning/10 border-fixit-warning/20">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-fixit-warning text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">16</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-fixit-success/10 border-fixit-success/20">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-fixit-success text-white">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">42</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IssueSummary;
