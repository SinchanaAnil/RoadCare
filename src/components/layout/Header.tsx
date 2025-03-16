
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Menu, AlertCircle, User, BarChart3, Clock } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6 pt-6">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-lg font-bold"
                  onClick={closeSheet}
                >
                  <span className="text-fixit-primary">FixIt</span>
                  <span className="text-fixit-accent">Tracker</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={closeSheet}
                  >
                    <MapPin size={18} />
                    <span>Map</span>
                  </Link>
                  <Link
                    to="/report"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={closeSheet}
                  >
                    <AlertCircle size={18} />
                    <span>Report Issue</span>
                  </Link>
                  <Link
                    to="/my-reports"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={closeSheet}
                  >
                    <Clock size={18} />
                    <span>My Reports</span>
                  </Link>
                  <Link
                    to="/stats"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={closeSheet}
                  >
                    <BarChart3 size={18} />
                    <span>Statistics</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={closeSheet}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-1 text-lg font-bold">
            <span className="text-fixit-primary">FixIt</span>
            <span className="text-fixit-accent">Tracker</span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin size={18} />
            <span>Map</span>
          </Link>
          <Link
            to="/report"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <AlertCircle size={18} />
            <span>Report Issue</span>
          </Link>
          <Link
            to="/my-reports"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Clock size={18} />
            <span>My Reports</span>
          </Link>
          <Link
            to="/stats"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <BarChart3 size={18} />
            <span>Statistics</span>
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Profile">
              <User size={18} />
            </Button>
          </Link>
          <Link to="/report">
            <Button className="bg-fixit-accent hover:bg-fixit-accent/90">
              Report Issue
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
