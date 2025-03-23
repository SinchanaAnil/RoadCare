
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();

  // Don't show header on login page
  if (location.pathname === '/login') {
    return null;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-1">
          <Link to="/" className="flex items-center gap-1 text-lg font-bold">
            <span className="text-fixit-primary font-michroma">Road</span>
            <span className="text-fixit-accent font-michroma">Care</span>
          </Link>
        </div>

        {/* Navigation links for desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/report" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/report' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Report Issue
          </Link>
          <Link 
            to="/my-reports" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/my-reports' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            My Reports
          </Link>
          <Link 
            to="/community" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/community' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Community
          </Link>
          <Link 
            to="/stats" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/stats' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Statistics
          </Link>
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full">
                <Link to="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full md:hidden" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link 
              to="/" 
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/report" 
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/report' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Report Issue
            </Link>
            <Link 
              to="/my-reports" 
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/my-reports' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Reports
            </Link>
            <Link 
              to="/community" 
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/community' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/stats" 
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/stats' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Statistics
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
