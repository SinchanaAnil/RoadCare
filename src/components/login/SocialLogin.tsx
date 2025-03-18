
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type SocialLoginProps = {
  userType: "citizen" | "municipal";
};

const SocialLogin = ({ userType }: SocialLoginProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `${provider} login integration will be implemented soon`,
    });
    
    // Mock login for demo
    login("demo@roadcare.com", undefined, userType);
    navigate("/dashboard");
  };

  return (
    <div className="social-icons flex gap-2 my-4">
      <a href="#" onClick={() => handleSocialLogin('Google')} className="icon border border-gray-300 rounded-md w-10 h-10 flex items-center justify-center">
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
      </a>
      <a href="#" onClick={() => handleSocialLogin('Facebook')} className="icon border border-gray-300 rounded-md w-10 h-10 flex items-center justify-center">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" onClick={() => handleSocialLogin('Github')} className="icon border border-gray-300 rounded-md w-10 h-10 flex items-center justify-center">
        <i className="fab fa-github"></i>
      </a>
      <a href="#" onClick={() => handleSocialLogin('LinkedIn')} className="icon border border-gray-300 rounded-md w-10 h-10 flex items-center justify-center">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  );
};

export default SocialLogin;
