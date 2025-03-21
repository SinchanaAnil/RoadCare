
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast as sonnerToast } from "sonner";
import LoginBackground from "@/components/login/LoginBackground";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to appropriate dashboard
    if (isAuthenticated) {
      // Show welcome message based on user type when redirecting from index
      sonnerToast.success(user?.userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
      navigate(user?.userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <LoginBackground />

      <div className="text-center max-w-2xl z-10">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/lovable-uploads/23e8e241-bed4-4cca-809e-0f8e97775704.png" 
            alt="RoadCare Logo" 
            className="w-64 h-auto mb-4 rounded-lg shadow-md"
          />
          <h1 className="text-4xl font-bold text-[#333333] drop-shadow-md">Welcome to RoadCare</h1>
        </div>
        <p className="text-xl text-[#333333]/90 mb-8">Report road issues and track repairs efficiently</p>
        <Button 
          onClick={handleGetStarted}
          size="lg" 
          className="bg-[#3498DB] hover:bg-[#3498DB]/90 text-white text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-200"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
