
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
    // Only redirect if user is authenticated
    if (isAuthenticated && user) {
      // Show welcome message based on user type
      sonnerToast.success(user.user_type === "citizen" ? "Welcome Citizen!!" : "Welcome Municipal Worker!!");
      navigate(user.user_type === "citizen" ? "/dashboard" : "/municipal-dashboard");
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
            src="/lovable-uploads/5aafa63a-5abd-4dbb-b7d3-6244ac17c705.png" 
            alt="RoadCare Logo" 
            className="w-64 h-64 mb-4 rounded-full shadow-md"
          />
          <h1 className="text-4xl font-bold text-[#333333] drop-shadow-md">
            Welcome to <span className="font-michroma text-fixit-primary">Road</span><span className="font-michroma text-fixit-accent">Care</span>
          </h1>
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
