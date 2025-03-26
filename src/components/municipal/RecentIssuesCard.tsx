
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Image, ImagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface RecentIssuesCardProps {
  theme: string;
  cardBg: string;
  cardBorder: string;
  darkBg: string;
  headingText: string;
  subtitleText: string;
}

const RecentIssuesCard: React.FC<RecentIssuesCardProps> = ({
  theme,
  cardBg,
  cardBorder,
  darkBg,
  headingText,
  subtitleText
}) => {
  const [preRepairImages, setPreRepairImages] = useState<{ [key: number]: string | null }>({});
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, issueId: number) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Create URL for selected image
    const imageUrl = URL.createObjectURL(files[0]);
    setPreRepairImages(prev => ({ ...prev, [issueId]: imageUrl }));
    
    toast({
      title: "Image uploaded",
      description: "Pre-repair image has been uploaded successfully.",
      duration: 3000,
    });
  };

  return (
    <Card className={`p-6 ${cardBg} border-${cardBorder} border-2`}>
      <h2 className={`text-xl font-bold ${headingText} mb-4`}>Recent Issues</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className={`p-4 ${darkBg} rounded-lg flex flex-col gap-4`}>
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-[#28354A]' : 'bg-[#D2E1EE]'}`}>
                <Wrench className={`h-5 w-5 ${theme === 'dark' ? 'text-[#D2B48C]' : 'text-[#B87333]'}`} />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${headingText}`}>Pothole Repair #{item + 1000}</h4>
                <p className={`text-sm ${subtitleText}`}>HSR Layout, Sector {item}</p>
              </div>
              <div>
                <Button variant="outline" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200" asChild>
                  <Link to={`/verify-repair/${item}`}>Submit Repair</Link>
                </Button>
              </div>
            </div>
            
            {/* Pre-repair image preview or upload button */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                {preRepairImages[item] ? (
                  <div className="relative">
                    <img 
                      src={preRepairImages[item] || ''} 
                      alt={`Pre-repair #${item + 1000}`} 
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setPreRepairImages(prev => ({ ...prev, [item]: null }))}
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="flex items-center justify-center gap-2 border border-dashed rounded-md p-3 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => document.getElementById(`preRepairImage-${item}`)?.click()}
                  >
                    <ImagePlus className={`h-5 w-5 ${theme === 'dark' ? 'text-[#A0CED9]' : 'text-blue-500'}`} />
                    <span className={`text-sm ${subtitleText}`}>Add pre-repair image</span>
                    <input 
                      id={`preRepairImage-${item}`} 
                      type="file" 
                      accept="image/*" 
                      className="sr-only" 
                      onChange={(e) => handleImageUpload(e, item)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentIssuesCard;
