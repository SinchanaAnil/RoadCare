
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Camera, Upload, MapPin, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ReportIssue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState('');
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [severity, setSeverity] = useState([5]);
  const [images, setImages] = useState<string[]>([]);

  const handleFetchLocation = () => {
    setFetchingLocation(true);
    // Simulate location fetching
    setTimeout(() => {
      setLocation('Example Street, City');
      setFetchingLocation(false);
      toast({
        title: "Location detected",
        description: "Your current location has been detected successfully.",
        duration: 3000,
      });
    }, 1500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Simulate image upload
    setIsSubmitting(true);
    setTimeout(() => {
      // Create URLs for selected images
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        newImages.push(URL.createObjectURL(files[i]));
      }
      setImages([...images, ...newImages]);
      setIsSubmitting(false);
      
      toast({
        title: "Images uploaded",
        description: `Successfully uploaded ${files.length} image${files.length > 1 ? 's' : ''}.`,
        duration: 3000,
      });
    }, 1500);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report submitted",
        description: "Your report has been submitted successfully. You will receive updates as it progresses.",
        duration: 5000,
      });
      navigate('/report-success');
    }, 2000);
  };

  return (
    <div className="container py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Report a Road Issue</h1>
        <p className="text-muted-foreground">
          Fill out the form below to report a road issue. Your report will help authorities fix it faster.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input 
                id="title" 
                placeholder="E.g., Large pothole on Main Street" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the issue in detail. Include size, hazard level, etc." 
                className="min-h-[120px]" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input 
                  id="location" 
                  placeholder="Enter location or use current location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required 
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleFetchLocation}
                  disabled={fetchingLocation}
                >
                  {fetchingLocation ? (
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full border-2 border-fixit-primary/50 border-t-fixit-primary animate-spin"></div>
                      <span>Detecting</span>
                    </div>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      Current
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Issue Type</Label>
              <Select defaultValue="pothole">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pothole">Pothole</SelectItem>
                  <SelectItem value="crack">Road Crack</SelectItem>
                  <SelectItem value="drainage">Drainage Issue</SelectItem>
                  <SelectItem value="sign">Damaged Sign</SelectItem>
                  <SelectItem value="sidewalk">Damaged Sidewalk</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Severity</Label>
                <span className="text-sm text-muted-foreground">
                  {severity[0] <= 3 ? 'Low' : severity[0] <= 7 ? 'Medium' : 'High'}
                </span>
              </div>
              <Slider
                defaultValue={[5]}
                max={10}
                step={1}
                value={severity}
                onValueChange={setSeverity}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Images</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden border bg-muted">
                    <img src={img} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground border border-dashed rounded-md aspect-square cursor-pointer hover:bg-muted/50 transition-colors">
                  <Camera className="h-6 w-6" />
                  <span>Add Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="sr-only" 
                    onChange={handleImageUpload}
                    disabled={isSubmitting}
                  />
                </label>
              </div>
              <div className="text-xs text-muted-foreground">
                Upload clear images of the issue. This helps in assessment and faster resolution.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-fixit-primary hover:bg-fixit-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-primary-foreground/50 border-t-primary-foreground animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
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

export default ReportIssue;
