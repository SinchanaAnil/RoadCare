
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Bot, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VerifyRepair = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [repairImage, setRepairImage] = useState<string | null>(null);
  const [repairNotes, setRepairNotes] = useState("");
  const [verificationResult, setVerificationResult] = useState<"approved" | "rejected" | null>(null);

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
    
    // Simulate AI verification process
    setTimeout(() => {
      // For demo purposes, we'll randomly approve or reject
      const result = Math.random() > 0.3 ? "approved" : "rejected";
      setVerificationResult(result);
      setIsVerifying(false);
      
      toast({
        title: result === "approved" ? "Repair Verified" : "Verification Failed",
        description: result === "approved" 
          ? "AI has verified the repair as complete. The ticket has been closed." 
          : "AI could not verify the repair completion. Please check and try again.",
        variant: result === "approved" ? "default" : "destructive",
        duration: 5000,
      });
    }, 3000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!verificationResult) {
      handleVerify();
      return;
    }
    
    // If verified, submit the final repair
    setIsSubmitting(true);
    
    // Simulate submission
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
                <p className="text-sm mt-1">
                  {verificationResult === "approved"
                    ? "Our AI has verified that the repair has been properly completed. The ticket will be closed automatically."
                    : "Our AI could not verify that the repair has been properly completed. Please check the issue and try again with a clearer image."}
                </p>
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
