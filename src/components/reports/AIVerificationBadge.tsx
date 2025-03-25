
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";

type AIVerificationBadgeProps = {
  status?: "not_verified" | "approved" | "rejected";
};

const AIVerificationBadge = ({ status }: AIVerificationBadgeProps) => {
  if (!status) return null;
  
  switch (status) {
    case 'approved':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
          <Bot className="h-3 w-3 mr-1" />
          AI Verified
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
          <Bot className="h-3 w-3 mr-1" />
          AI Rejected
        </Badge>
      );
    case 'not_verified':
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
          <Bot className="h-3 w-3 mr-1" />
          Pending AI Verification
        </Badge>
      );
    default:
      return null;
  }
};

export default AIVerificationBadge;
