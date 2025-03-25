
import { Badge } from "@/components/ui/badge";

type SeverityBadgeProps = {
  severity: string;
};

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
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

export default SeverityBadge;
