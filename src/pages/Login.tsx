
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Phone, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<"citizen" | "municipal">("citizen");
  const [activeSide, setActiveSide] = useState<"left" | "right">("left"); // For panel animation
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    login(email, undefined, userType);
    toast({
      title: "Welcome to RoadCare",
      description: `You have successfully logged in as a ${userType === "citizen" ? "citizen" : "municipal employee"}`,
    });
    navigate("/dashboard");
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    
    login(undefined, phone, userType);
    toast({
      title: "Welcome to RoadCare",
      description: `You have successfully logged in as a ${userType === "citizen" ? "citizen" : "municipal employee"}`,
    });
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `${provider} login integration will be implemented soon`,
    });
    
    // Mock login for demo
    login("demo@roadcare.com", undefined, userType);
    navigate("/dashboard");
  };

  // Toggle between citizen and municipal employee
  const toggleUserType = () => {
    setUserType(userType === "citizen" ? "municipal" : "citizen");
    setActiveSide(activeSide === "left" ? "right" : "left");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] p-4 font-['Montserrat',sans-serif]">
      <div className={cn(
        "bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden w-full max-w-[768px] min-h-[480px] relative",
        activeSide === "right" ? "active" : ""
      )}>
        {/* Left Panel - Login Forms */}
        <div className="form-container w-1/2 h-full absolute top-0 left-0 z-2 transition-all duration-600 ease-in-out">
          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold mb-2">RoadCare</h1>
              <p className="text-sm text-gray-600">Login to report and track road issues</p>
            </div>
            
            <div className="mb-4 w-full">
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 rounded-md">
                  <TabsTrigger 
                    value="email" 
                    className="flex items-center gap-2 data-[state=active]:bg-[#2da0a8] data-[state=active]:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger 
                    value="phone" 
                    className="flex items-center gap-2 data-[state=active]:bg-[#2da0a8] data-[state=active]:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    Phone
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form onSubmit={handleEmailLogin} className="space-y-4 w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#eee] border-none rounded-lg px-4 py-3 text-sm w-full outline-none"
                    />
                    <button 
                      type="submit" 
                      className="bg-[#2da0a8] text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider border border-transparent w-full"
                    >
                      Continue with Email
                    </button>
                  </form>
                </TabsContent>

                <TabsContent value="phone">
                  <form onSubmit={handlePhoneLogin} className="space-y-4 w-full">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-[#eee] border-none rounded-lg px-4 py-3 text-sm w-full outline-none"
                    />
                    <button 
                      type="submit" 
                      className="bg-[#2da0a8] text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider border border-transparent w-full"
                    >
                      Continue with Phone
                    </button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            <div className="relative w-full my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

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
            
            <p className="text-center text-xs text-gray-500 mt-4">
              By continuing, you agree to RoadCare's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        
        {/* Right Panel - Sliding Panel */}
        <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-l-[150px] z-10">
          <div className="toggle bg-gradient-to-r from-[#5c6bc0] to-[#2da0a8] text-white relative left-[-100%] h-full w-[200%] transition-all duration-600 ease-in-out">
            {/* Left Toggle Panel (hidden by default) */}
            <div className="toggle-panel toggle-left absolute w-1/2 h-full flex flex-col items-center justify-center p-8 text-center transform -translate-x-[200%] transition-all duration-600 ease-in-out">
              <h1 className="text-2xl font-bold mb-2">Citizen Login</h1>
              <p className="text-sm mb-6">Report road issues and track repairs as a citizen</p>
              <div className="mb-6">
                <User className="h-12 w-12 mx-auto mb-2" />
              </div>
              <button 
                onClick={toggleUserType}
                className="bg-transparent border border-white text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider"
              >
                Switch to Citizen
              </button>
            </div>
            
            {/* Right Toggle Panel (visible by default) */}
            <div className="toggle-panel toggle-right absolute right-0 w-1/2 h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-600 ease-in-out">
              <h1 className="text-2xl font-bold mb-2">Municipal Login</h1>
              <p className="text-sm mb-6">Login as municipal staff to manage road repairs</p>
              <div className="mb-6">
                <Building2 className="h-12 w-12 mx-auto mb-2" />
              </div>
              <button 
                onClick={toggleUserType}
                className="bg-transparent border border-white text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider"
              >
                Switch to Municipal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
