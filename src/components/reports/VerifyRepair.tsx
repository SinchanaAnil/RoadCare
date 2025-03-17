
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Bot, ArrowLeft, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AIVerificationStatus } from "@/types";

// This component simulates what would normally be done by the backend
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
      
      // This would be the image URL from your database
      // For demo, we're using a placeholder
      setOriginalImage("/placeholder.svg");
    };
    
    fetchReportData();
  }, [id]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Simulate image upload
    setIsSubmitting(true);
    setTimeout(() => {
      // Create URL for selected image
      setRepairImage(URL.createObjectURL(files[0]));
      setIsSubmitting(false);
      
      toast({
        title: "Image uploaded",
        description: "Repair image has been uploaded successfully.",
        duration: 3000,
      });
    }, 1000);
  };

  const simulateAIVerification = () => {
    // This simulates what would be done by the backend AI model you provided
    // In a real implementation, this would call your backend API
    
    // Generate a random score between 0.5 and 0.95 for demo purposes
    const randomSimilarityScore = Math.random() * 0.45 + 0.5;
    setSimilarityScore(parseFloat(randomSimilarityScore.toFixed(2)));
    
    // Decide the verification result based on the simulated score
    // This mimics the logic in your analyze_road function
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
            {originalImage && (
              <div className="space-y-2">
                <Label>Original Issue Image</Label>
                <div className="aspect-video rounded-md overflow-hidden border bg-muted mb-4">
                  <img src={originalImage} alt="Original Issue" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="repairNotes">Repair Notes</Label>
              <Textarea 
                id="repairNotes" 
                placeholder="Describe the repair work performed..." 
                className="min-h-[100px]" 
                value={repairNotes}
                onChange={(e) => setRepairNotes(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Repair Image</Label>
              {repairImage ? (
                <div className="relative aspect-video rounded-md overflow-hidden border bg-muted mb-4">
                  <img src={repairImage} alt="Repair" className="w-full h-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setRepairImage(null)}
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 border border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors mb-4" onClick={() => document.getElementById('repairImage')?.click()}>
                  <Camera className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Upload repair photo</p>
                    <p className="text-sm text-muted-foreground">Upload a clear photo of the repaired area</p>
                  </div>
                  <input 
                    id="repairImage" 
                    type="file" 
                    accept="image/*" 
                    className="sr-only" 
                    onChange={handleImageUpload}
                    disabled={isSubmitting}
                  />
                </div>
              )}
            </div>

            {repairImage && !verificationResult && (
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
            )}

            {verificationResult && (
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
            )}

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
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto"
                disabled={isSubmitting || isVerifying}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default VerifyRepair;
