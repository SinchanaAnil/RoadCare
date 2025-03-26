
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AIVerificationCardProps {
  theme: string;
  cardBg: string;
  cardBorder: string;
  darkBg: string;
  headingText: string;
  subtitleText: string;
}

const AIVerificationCard: React.FC<AIVerificationCardProps> = ({
  theme,
  cardBg,
  cardBorder,
  darkBg,
  headingText,
  subtitleText
}) => {
  return (
    <Card className={`p-6 ${cardBg} border-${cardBorder} border-2`}>
      <h2 className={`text-xl font-bold ${headingText} mb-4`}>AI Verification</h2>
      <p className={`text-sm ${subtitleText} mb-4`}>
        Upload repair photos to verify issue resolution with our AI system. Get instant verification and close tickets efficiently.
      </p>
      <div className={`p-4 ${darkBg} rounded-lg mb-4`}>
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className={`h-5 w-5 ${theme === 'dark' ? 'text-[#E57373]' : 'text-[#D32F2F]'}`} />
          <h4 className={`font-medium ${headingText}`}>Pending Verifications</h4>
        </div>
        <p className={`text-sm ${subtitleText} mb-2`}>5 repairs awaiting your verification</p>
        <Button variant="outline" size="sm" className="w-full justify-center" asChild>
          <Link to="/dashboard">View All</Link>
        </Button>
      </div>
      <Button className={`w-full ${theme === 'dark' ? 'bg-[#D2B48C] hover:bg-[#D2B48C]/90 text-[#1A2337]' : 'bg-[#B87333] hover:bg-[#B87333]/90 text-white'}`} asChild>
        <Link to="/verify-repair/new">
          <Wrench className="h-4 w-4 mr-2" />
          Start New Repair Verification
        </Link>
      </Button>
    </Card>
  );
};

export default AIVerificationCard;
