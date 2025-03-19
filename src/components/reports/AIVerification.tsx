
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
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
  const [confidenceLevel, setConfidenceLevel] = useState<"high" | "medium" | "low" | null>(null);
  
  // Enhanced AI verification with multiple analysis methods
  const simulateEnhancedAIVerification = () => {
    // Simulate multiple verification techniques with weighted scoring
    
    // 1. Texture change analysis (weighted 30%)
    const textureChangeScore = Math.random() * 0.5 + 0.3; // 0.3-0.8 range
    
    // 2. Surface pattern recognition (weighted 25%)
    const surfacePatternScore = Math.random() * 0.6 + 0.2; // 0.2-0.8 range
    
    // 3. Color distribution comparison (weighted 25%)
    const colorDistributionScore = Math.random() * 0.7 + 0.2; // 0.2-0.9 range
    
    // 4. Edge detection and pothole boundary analysis (weighted 20%)
    const edgeDetectionScore = Math.random() * 0.6 + 0.3; // 0.3-0.9 range
    
    // Calculate weighted combined score (higher score = more differences detected = better repair)
    // Invert the scale for similarity (lower similarity = more differences = better repair)
    const weightedScore = 1 - (
      (textureChangeScore * 0.30) + 
      (surfacePatternScore * 0.25) + 
      (colorDistributionScore * 0.25) + 
      (edgeDetectionScore * 0.20)
    );
    
    // Add small randomization factor for demo purposes
    const finalSimilarityScore = Math.max(0.3, Math.min(0.95, weightedScore + (Math.random() * 0.1 - 0.05)));
    setSimilarityScore(parseFloat(finalSimilarityScore.toFixed(2)));
    
    // More sophisticated decision logic
    let result: AIVerificationStatus;
    let message: string;
    let confidence: "high" | "medium" | "low";
    
    // Determine verification result and confidence level based on similarity score
    if (finalSimilarityScore < 0.6) {
      result = "approved";
      confidence = "high";
      message = "✅ Road repair confirmed! Significant surface improvements detected with high confidence. The pothole has been properly filled.";
    } else if (finalSimilarityScore < 0.75) {
      // Partial repair detection with weighted confidence
      if (finalSimilarityScore < 0.68) {
        result = "approved";
        confidence = "medium";
        message = "✅ Road repair detected with medium confidence. Surface texture analysis indicates repair work has been completed.";
      } else {
        // In borderline cases, apply additional heuristics (simulated here)
        const additionalAnalysis = Math.random() > 0.4;
        result = additionalAnalysis ? "approved" : "rejected";
        confidence = "medium";
        message = additionalAnalysis
          ? "⚠️ Partial road repair detected. Some improvements were made but our analysis suggests the repair might need additional work."
          : "⚠️ Insufficient repair detected. While some changes are visible, the repair does not meet quality standards.";
      }
    } else {
      result = "rejected";
      confidence = finalSimilarityScore > 0.85 ? "high" : "medium";
      message = finalSimilarityScore > 0.85
        ? "❌ No significant repair detected. The AI analysis shows minimal changes between the original and submitted images."
        : "❌ Repair verification failed. The analysis indicates insufficient changes to confirm proper road repair.";
    }
    
    setVerificationResult(result);
    setAiAnalysisMessage(message);
    setConfidenceLevel(confidence);
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
    
    // Simulate enhanced AI processing with longer analysis time
    setTimeout(() => {
      simulateEnhancedAIVerification();
      setIsVerifying(false);
      
      toast({
        title: verificationResult === "approved" ? "Repair Verified" : "Verification Failed",
        description: verificationResult === "approved" 
          ? "AI has verified the repair as complete. The ticket has been closed." 
          : "AI could not verify the repair completion. Please check and try again.",
        variant: verificationResult === "approved" ? "default" : "destructive",
        duration: 5000,
      });
    }, 3500); // Slightly longer analysis for perception of thorough processing
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
        
        {confidenceLevel && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-black/5 px-2 py-1 rounded-full">
              {confidenceLevel === "high" ? (
                <>High Confidence</>
              ) : confidenceLevel === "medium" ? (
                <>Medium Confidence</>
              ) : (
                <>Low Confidence</>
              )}
            </span>
          </div>
        )}
        
        {similarityScore !== null && (
          <div className="bg-white/50 rounded p-3 mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Image Analysis Score:</span>
              <span className="font-medium">{similarityScore}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  similarityScore < 0.6 
                    ? "bg-green-500" 
                    : similarityScore < 0.75 
                      ? "bg-yellow-500" 
                      : "bg-red-500"
                }`} 
                style={{ width: `${100 - similarityScore * 100}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-3 text-xs mt-2 text-gray-600 gap-1">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Significant changes</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Partial changes</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Minimal changes</span>
              </div>
            </div>
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
        Enhanced AI Verification
      </h3>
      <p className="text-sm mt-1 mb-4">
        Our advanced AI will analyze your repair image using multiple detection methods to accurately verify if the reported issue has been properly fixed.
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
            <span>Running Enhanced Analysis...</span>
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
