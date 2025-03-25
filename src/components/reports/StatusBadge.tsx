
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, Check } from "lucide-react";

type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
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

export default StatusBadge;
