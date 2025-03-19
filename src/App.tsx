
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import ReportSuccess from "./pages/ReportSuccess";
import MyReports from "./pages/MyReports";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";
import VerifyRepairPage from "./pages/VerifyRepairPage";

const queryClient = new QueryClient();

// Protected route wrapper that also checks user type
const ProtectedRoute = ({ children, requiredUserType }: { children: React.ReactNode, requiredUserType?: "citizen" | "municipal" }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If a specific user type is required and user doesn't match, redirect to appropriate dashboard
  if (requiredUserType && user?.userType !== requiredUserType) {
    return <Navigate to={user?.userType === "citizen" ? "/dashboard" : "/municipal-dashboard"} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        {/* Citizen routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredUserType="citizen">
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute requiredUserType="citizen">
            <ReportIssue />
          </ProtectedRoute>
        } />
        <Route path="/report-success" element={
          <ProtectedRoute requiredUserType="citizen">
            <ReportSuccess />
          </ProtectedRoute>
        } />
        <Route path="/my-reports" element={
          <ProtectedRoute requiredUserType="citizen">
            <MyReports />
          </ProtectedRoute>
        } />
        
        {/* Municipal employee routes */}
        <Route path="/municipal-dashboard" element={
          <ProtectedRoute requiredUserType="municipal">
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/verify-repair/:id" element={
          <ProtectedRoute requiredUserType="municipal">
            <VerifyRepairPage />
          </ProtectedRoute>
        } />
        
        {/* Common routes for both user types */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/stats" element={<Stats />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
