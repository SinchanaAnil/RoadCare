
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-4">
        <div className="flex items-center gap-1 text-lg font-bold">
          <span className="text-fixit-primary">Road</span>
          <span className="text-fixit-accent">Care</span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} RoadCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
