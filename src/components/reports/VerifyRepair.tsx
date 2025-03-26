import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AIVerificationStatus } from "@/types";

// Import our new components
import OriginalIssueImage from "./OriginalIssueImage";
import RepairNotes from "./RepairNotes";
import RepairImageUpload from "./RepairImageUpload";
import AIVerification from "./AIVerification";
import VerifyRepairActions from "./VerifyRepairActions";

const VerifyRepair = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [repairImage, setRepairImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [repairNotes, setRepairNotes] = useState("");
  const [verificationResult, setVerificationResult] = useState<AIVerificationStatus | null>(null);
  const [aiAnalysisMessage, setAiAnalysisMessage] = useState<string>("");
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);

  // Fetch the original report image (simulated)
  useEffect(() => {
    // In a real implementation, this would fetch the report data from your API
    const fetchReportData = async () => {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real implementation, if an image exists in the database, set it
      // For demo, we'll keep it null to show the upload option
      setOriginalImage(null);
    };
    
    fetchReportData();
  }, [id]);

  const handleVerify = () => {
    // This is handled by the AIVerification component now
    setIsVerifying(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!repairImage) {
      toast({
        title: "Error",
        description: "Please upload a repair image first",
        variant: "destructive",
      });
      return;
    }
    
    if (!verificationResult) {
      handleVerify();
      return;
    }
    
    // If verified, submit the final repair
    setIsSubmitting(true);
    
    // Simulate submission to backend
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Repair Submitted",
        description: "The repair has been recorded and the report has been updated.",
        duration: 3000,
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="container py-8 max-w-2xl">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Reports
      </Button>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Verify Repair Completion</h1>
        <p className="text-muted-foreground">
          Upload a photo of the completed repair. Our AI will verify if the issue has been properly fixed.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 border-blue-200">
          <div className="space-y-6">
            {/* Original Issue Image Component with upload capability */}
            <OriginalIssueImage 
              originalImage={originalImage} 
              setOriginalImage={setOriginalImage}
              editable={true}
            />

            {/* Repair Notes Component */}
            <RepairNotes 
              repairNotes={repairNotes} 
              setRepairNotes={setRepairNotes} 
            />

            {/* Repair Image Upload Component */}
            <RepairImageUpload 
              repairImage={repairImage} 
              setRepairImage={setRepairImage} 
              isSubmitting={isSubmitting} 
            />

            {/* AI Verification Component */}
            {repairImage && (
              <AIVerification
                repairImage={repairImage}
                verificationResult={verificationResult}
                setVerificationResult={setVerificationResult}
                aiAnalysisMessage={aiAnalysisMessage}
                setAiAnalysisMessage={setAiAnalysisMessage}
                similarityScore={similarityScore}
                setSimilarityScore={setSimilarityScore}
              />
            )}

            {/* Verify Repair Actions Component */}
            <VerifyRepairActions
              verificationResult={verificationResult}
              isSubmitting={isSubmitting}
              isVerifying={isVerifying}
              onCancel={() => navigate(-1)}
            />
          </div>
        </Card>
      </form>
    </div>
  );
};

export default VerifyRepair;
