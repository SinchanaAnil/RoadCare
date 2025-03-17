
import { Button } from "@/components/ui/button";
import { CheckCircle, Upload, Bot } from "lucide-react";
import { AIVerificationStatus } from "@/types";

interface VerifyRepairActionsProps {
  verificationResult: AIVerificationStatus | null;
  isSubmitting: boolean;
  isVerifying: boolean;
  onCancel: () => void;
}

const VerifyRepairActions = ({ 
  verificationResult, 
  isSubmitting, 
  isVerifying,
  onCancel
}: VerifyRepairActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <Button 
        type="submit" 
        className={`w-full sm:w-auto ${verificationResult === "approved" ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"}`}
        disabled={isSubmitting || isVerifying}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-primary-foreground/50 border-t-primary-foreground animate-spin"></div>
            <span>Submitting...</span>
          </div>
        ) : verificationResult === "approved" ? (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Submit & Close Ticket
          </>
        ) : verificationResult === "rejected" ? (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Try Different Image
          </>
        ) : (
          <>
            <Bot className="h-4 w-4 mr-2" />
            Verify & Submit
          </>
        )}
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="w-full sm:w-auto"
        disabled={isSubmitting || isVerifying}
      >
        Cancel
      </Button>
    </div>
  );
};

export default VerifyRepairActions;
