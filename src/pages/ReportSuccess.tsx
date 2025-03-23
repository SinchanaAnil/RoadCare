
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, ArrowLeft, MapPin, Clock, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportSuccess = () => {
  const location = useLocation();
  const { toast } = useToast();
  const ticketNumber = location.state?.ticketNumber || "RC-00000000-0000";

  const copyTicketNumber = () => {
    navigator.clipboard.writeText(ticketNumber);
    toast({
      title: "Copied to clipboard",
      description: "The ticket number has been copied to your clipboard.",
      duration: 3000,
    });
  };

  return (
    <div className="container py-12 max-w-md">
      <Card className="p-8 text-center">
        <div className="rounded-full bg-fixit-success/10 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Check className="h-8 w-8 text-fixit-success" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Report Submitted!</h1>
        <p className="text-muted-foreground mb-4">
          Thank you for your report. Your contribution helps make our roads safer for everyone.
        </p>
        
        <div className="bg-muted/20 rounded-lg p-4 mb-4 flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-1">Your Ticket Number</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-mono font-bold">{ticketNumber}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={copyTicketNumber}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy ticket number</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Save this number for tracking your report status
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-medium mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="mt-0.5 rounded-full bg-fixit-primary text-white p-1">
                <Check className="h-3 w-3" />
              </div>
              <span>Your report has been received and is under review.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-0.5 rounded-full bg-fixit-primary text-white p-1">
                <MapPin className="h-3 w-3" />
              </div>
              <span>Authorities will assess the location and determine repair priority.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-0.5 rounded-full bg-fixit-primary text-white p-1">
                <Clock className="h-3 w-3" />
              </div>
              <span>You'll receive notifications as your report progresses.</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full bg-fixit-primary hover:bg-fixit-primary/90">
            <Link to="/my-reports">
              View My Reports
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReportSuccess;
