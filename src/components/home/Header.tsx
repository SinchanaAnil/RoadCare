
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/5aafa63a-5abd-4dbb-b7d3-6244ac17c705.png" 
          alt="RoadCare Logo" 
          className="h-8 w-auto mr-3 rounded-full"
        />
        <h1 className="text-2xl font-bold">Bengaluru Road Issue Tracker</h1>
      </div>
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search reports..."
          className="w-full sm:w-[250px] pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;
