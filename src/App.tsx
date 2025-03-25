
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/toaster';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/layout/Layout';
import Index from './pages/Index';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ReportIssue from './pages/ReportIssue';
import ReportSuccess from './pages/ReportSuccess';
import MyReports from './pages/MyReports';
import Community from './pages/Community';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import Dashboard from './pages/Dashboard';
import VerifyRepairPage from './pages/VerifyRepairPage';

const queryClient = new QueryClient();

// Create a component for animated routes
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="report" element={<ReportIssue />} />
          <Route path="report-success" element={<ReportSuccess />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stats" element={<Stats />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="verify-repair/:id" element={<VerifyRepairPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AnimatedRoutes />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
