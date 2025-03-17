
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AIVerificationStatus } from "@/types";

interface AIVerificationProps {
  repairImage: string | null;
  verificationResult: AIVerificationStatus | null;
  setVerificationResult: (result: AIVerificationStatus | null) => void;
  aiAnalysisMessage: string;
  setAiAnalysisMessage: (message: string) => void;
  similarityScore: number | null;
  setSimilarityScore: (score: number | null) => void;
}

const AIVerification = ({
  repairImage,
  verificationResult,
  setVerificationResult,
  aiAnalysisMessage,
  setAiAnalysisMessage,
  similarityScore,
  setSimilarityScore
}: AIVerificationProps) => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  
  const simulateAIVerification = () => {
    // Generate a random score between 0.5 and 0.95 for demo purposes
    const randomSimilarityScore = Math.random() * 0.45 + 0.5;
    setSimilarityScore(parseFloat(randomSimilarityScore.toFixed(2)));
    
    // Decide the verification result based on the simulated score
    let result: AIVerificationStatus;
    let message: string;
    
    if (randomSimilarityScore < 0.7) {
      result = "approved";
      message = "✅ Road repair detected! Significant changes were found between the original issue and repair images.";
    } else if (randomSimilarityScore < 0.85) {
      // For demo purposes, we'll still sometimes approve partial repairs
      result = Math.random() > 0.5 ? "approved" : "rejected";
      message = "⚠️ Partial road repair detected. Some improvements were made but the repair may be incomplete.";
    } else {
      result = "rejected";
      message = "❌ No major changes detected. The AI could not verify that repairs were completed.";
    }
    
    setVerificationResult(result);
    setAiAnalysisMessage(message);
  };
  
  const handleVerify = () => {
    if (!repairImage) {
      toast({
        title: "Error",
        description: "Please upload a repair image first",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      simulateAIVerification();
      setIsVerifying(false);
      
      toast({
        title: verificationResult === "approved" ? "Repair Verified" : "Verification Failed",
        description: verificationResult === "approved" 
          ? "AI has verified the repair as complete. The ticket has been closed." 
          : "AI could not verify the repair completion. Please check and try again.",
        variant: verificationResult === "approved" ? "default" : "destructive",
        duration: 5000,
      });
    }, 3000);
  };
  
  if (verificationResult) {
    return (
      <div className={`border rounded-md p-4 ${verificationResult === "approved" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
        <h3 className={`font-medium flex items-center gap-2 ${verificationResult === "approved" ? "text-green-700" : "text-red-700"}`}>
          <Bot className="h-5 w-5" />
          Verification {verificationResult === "approved" ? "Successful" : "Failed"}
        </h3>
        <p className="text-sm mt-1 mb-2">
          {aiAnalysisMessage}
        </p>
        
        {similarityScore !== null && (
          <div className="bg-white/50 rounded p-3 mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Similarity Score:</span>
              <span className="font-medium">{similarityScore}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  similarityScore < 0.7 
                    ? "bg-green-500" 
                    : similarityScore < 0.85 
                      ? "bg-yellow-500" 
                      : "bg-red-500"
                }`} 
                style={{ width: `${100 - similarityScore * 100}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 text-gray-600">
              Lower similarity indicates more changes between images (better chance of repair)
            </p>
          </div>
        )}
        
        <div className="flex items-center gap-2 mt-3">
          {verificationResult === "approved" ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <p className="text-sm font-medium">
            {verificationResult === "approved" 
              ? "Ticket will be automatically closed"
              : "Please submit a clearer image of the completed repair"}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
      <h3 className="font-medium flex items-center gap-2">
        <Bot className="h-5 w-5 text-blue-600" />
        AI Verification
      </h3>
      <p className="text-sm mt-1 mb-4">
        Our AI will analyze your repair image and verify if the reported issue has been properly fixed.
      </p>
      <Button 
        type="button" 
        onClick={handleVerify}
        disabled={isVerifying}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isVerifying ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-primary-foreground/50 border-t-primary-foreground animate-spin"></div>
            <span>Verifying with AI...</span>
          </div>
        ) : (
          <>
            <Bot className="h-4 w-4 mr-2" />
            Verify with AI
          </>
        )}
      </Button>
    </div>
  );
};

export default AIVerification;
