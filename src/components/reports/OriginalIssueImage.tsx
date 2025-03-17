
import { Label } from "@/components/ui/label";

interface OriginalIssueImageProps {
  originalImage: string | null;
}

const OriginalIssueImage = ({ originalImage }: OriginalIssueImageProps) => {
  if (!originalImage) return null;
  
  return (
    <div className="space-y-2">
      <Label>Original Issue Image</Label>
      <div className="aspect-video rounded-md overflow-hidden border bg-muted mb-4">
        <img src={originalImage} alt="Original Issue" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default OriginalIssueImage;
