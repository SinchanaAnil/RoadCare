
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, User } from "lucide-react";
import LoginBackground from "@/components/login/LoginBackground";
import LoginHeader from "@/components/login/LoginHeader";
import AccountTypeSelector from "@/components/login/AccountTypeSelector";
import LoginTabs from "@/components/login/LoginTabs";
import SocialLoginOptions from "@/components/login/SocialLoginOptions";

const Login = () => {
  const [userType, setUserType] = useState<"citizen" | "municipal">("citizen");
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, socialLogin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    socialLogin(provider);
  };

  const handleEmailSubmit = async (email: string) => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    
    // Use the same login function for both sign in and sign up
    await login(email, userType);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <LoginBackground />
      
      <div className="w-full max-w-md z-10">
        <LoginHeader />

        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-[#3498DB]/20 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm bg-white/95">
          <AccountTypeSelector userType={userType} setUserType={setUserType} />
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#3498DB]">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <button 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="text-sm text-[#3498DB] hover:underline"
            >
              {isSignUp ? "Already have an account?" : "New to RoadCare?"}
            </button>
          </div>
          
          <LoginTabs 
            userType={userType} 
            isSignUp={isSignUp}
            onEmailSubmit={handleEmailSubmit}
            loading={loading}
          />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#3498DB]/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#333333]/70">Or continue with</span>
            </div>
          </div>

          <SocialLoginOptions onSocialLogin={handleSocialLogin} />

          <p className="text-center text-xs text-[#333333]/70 mt-6">
            By continuing, you agree to RoadCare's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
