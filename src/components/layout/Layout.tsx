
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      {isAuthenticated && <Header />}
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default Layout;
