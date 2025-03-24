
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type SearchBarProps = {
  onSearch: (result: [number, number]) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    
    try {
      // Using Nominatim for geocoding (OpenStreetMap's free geocoding service)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}, Bangalore&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        onSearch([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        console.log('Location not found');
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a location in Bangalore..."
          className="pl-8 pr-4 h-10 w-full bg-white/90 backdrop-blur-sm"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      <Button 
        onClick={handleSearch}
        className="h-10 bg-[#3498DB] hover:bg-[#3498DB]/90"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
