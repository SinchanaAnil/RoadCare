
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  
  // Instead of returning null, let's just render the content without Header/Footer for non-authenticated users
  return (
    <div className="flex min-h-screen flex-col">
      {isAuthenticated && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default Layout;
