
import { Badge } from "@/components/ui/badge";

type SeverityBadgeProps = {
  severity: string;
};

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  switch (severity) {
    case 'high':
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
          High
        </Badge>
      );
    case 'medium':
      return (
        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
          Medium
        </Badge>
      );
    case 'low':
      return (
        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
          Low
        </Badge>
      );
    default:
      return null;
  }
};

export default SeverityBadge;
