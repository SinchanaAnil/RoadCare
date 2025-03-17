
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RepairImageUploadProps {
  repairImage: string | null;
  setRepairImage: (image: string | null) => void;
  isSubmitting: boolean;
}

const RepairImageUpload = ({ 
  repairImage, 
  setRepairImage, 
  isSubmitting 
}: RepairImageUploadProps) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Simulate image upload
    setTimeout(() => {
      // Create URL for selected image
      setRepairImage(URL.createObjectURL(files[0]));
      
      toast({
        title: "Image uploaded",
        description: "Repair image has been uploaded successfully.",
        duration: 3000,
      });
    }, 1000);
  };

  return (
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
        <div 
          className="flex flex-col items-center justify-center gap-4 border border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors mb-4" 
          onClick={() => document.getElementById('repairImage')?.click()}
        >
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
  );
};

export default RepairImageUpload;
