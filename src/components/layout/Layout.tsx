
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import ChatBot from '../chatbot/ChatBot';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      {isAuthenticated && <Header />}
      <motion.main 
        className="flex-1"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      {isAuthenticated && <Footer />}
      <ChatBot />
    </div>
  );
};

export default Layout;
