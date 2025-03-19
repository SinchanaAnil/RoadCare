
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to appropriate dashboard
    if (isAuthenticated) {
      navigate(user?.userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const handleGetStarted = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0EA5E9] to-[#0056b3] p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-md">Welcome to RoadCare</h1>
        <p className="text-xl text-white/90 mb-8">Report road issues and track repairs efficiently</p>
        <Button 
          onClick={handleGetStarted}
          size="lg" 
          className="bg-[#F97316] hover:bg-[#F97316]/90 text-white text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-200"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
