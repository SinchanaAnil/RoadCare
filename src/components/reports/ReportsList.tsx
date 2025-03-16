
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, ThumbsUp, AlertCircle, Clock, Check } from "lucide-react";
import { Link } from "react-router-dom";

type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  date: string;
  upvotes: number;
  category: string;
  severity: string;
  lat: number;
  lng: number;
};

type ReportsListProps = {
  reports: Report[];
};

const ReportsList = ({ reports }: ReportsListProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-fixit-primary/10 text-fixit-primary border-fixit-primary/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-fixit-warning/10 text-fixit-warning border-fixit-warning/20">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-fixit-success/10 text-fixit-success border-fixit-success/20">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return (
          <Badge variant="outline" className="bg-fixit-danger/10 text-fixit-danger border-fixit-danger/20">
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-fixit-warning/10 text-fixit-warning border-fixit-warning/20">
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted/20">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {reports.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No reports found</p>
        </div>
      ) : (
        reports.map((report) => (
          <Card key={report.id} className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{report.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {getStatusBadge(report.status)}
                    {getSeverityBadge(report.severity)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 mb-2">{report.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{report.location}</span>
                  </div>
                  <div>
                    <span>Reported: {new Date(report.date).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="outline" className="bg-background border-input">
                    {report.category}
                  </Badge>
                </div>
              </div>
              <div className="flex md:flex-col items-center gap-2 md:border-l md:pl-4">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{report.upvotes}</span>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/report/${report.id}`}>Details</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ReportsList;
