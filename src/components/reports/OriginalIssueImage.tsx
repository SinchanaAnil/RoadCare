
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface OriginalIssueImageProps {
  originalImage: string | null;
  setOriginalImage?: (image: string | null) => void;
  editable?: boolean;
}

const OriginalIssueImage = ({ 
  originalImage, 
  setOriginalImage,
  editable = false
}: OriginalIssueImageProps) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!setOriginalImage) return;
    
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Simulate image upload
    setTimeout(() => {
      // Create URL for selected image
      setOriginalImage(URL.createObjectURL(files[0]));
      
      toast({
        title: "Image uploaded",
        description: "Original issue image has been uploaded successfully.",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="space-y-2">
      <Label>Original Issue Image</Label>
      {originalImage ? (
        <div className="relative aspect-video rounded-md overflow-hidden border bg-muted mb-4">
          <img src={originalImage} alt="Original Issue" className="w-full h-full object-cover" />
          {editable && setOriginalImage && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => setOriginalImage(null)}
            >
              ×
            </Button>
          )}
        </div>
      ) : editable && setOriginalImage ? (
        <div 
          className="flex flex-col items-center justify-center gap-4 border border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors mb-4" 
          onClick={() => document.getElementById('originalIssueImage')?.click()}
        >
          <Camera className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium">Upload original issue photo</p>
            <p className="text-sm text-muted-foreground">Upload a clear photo of the issue before repair</p>
          </div>
          <input 
            id="originalIssueImage" 
            type="file" 
            accept="image/*" 
            className="sr-only" 
            onChange={handleImageUpload}
          />
        </div>
      ) : null}
    </div>
  );
};

export default OriginalIssueImage;
