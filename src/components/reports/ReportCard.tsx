
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Report } from "@/types/reports";
import StatusBadge from "./StatusBadge";
import SeverityBadge from "./SeverityBadge";
import AIVerificationBadge from "./AIVerificationBadge";
import { useAuth } from "@/contexts/AuthContext";

type ReportCardProps = {
  report: Report;
};

const ReportCard = ({ report }: ReportCardProps) => {
  const { user } = useAuth();
  const isMunicipal = user?.user_type === "municipal";

  return (
    <Card className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold">{report.title}</h3>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={report.status} />
              <SeverityBadge severity={report.severity} />
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
            {report.aiVerificationStatus && <AIVerificationBadge status={report.aiVerificationStatus} />}
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
          {isMunicipal && report.status !== "completed" && (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
              asChild
            >
              <Link to={`/verify-repair/${report.id}`}>Submit Repair</Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReportCard;
