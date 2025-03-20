
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Apple, Mail, Phone, ArrowRight, User, Building2 } from "lucide-react";
import { toast as sonnerToast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<"citizen" | "municipal">("citizen");
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
    
    // Use Sonner toast for a more modern look with welcome message based on user type
    sonnerToast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
    
    // Route to correct dashboard based on user type
    navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
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
    
    // Use Sonner toast for a more modern look with welcome message based on user type
    sonnerToast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
    
    // Route to correct dashboard based on user type
    navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
  };

  const handleSocialLogin = (provider: string) => {
    sonnerToast(`${provider} Login`, {
      description: `${provider} login integration will be implemented soon`,
    });
    
    // Mock login for demo with correct user type
    login("demo@roadcare.com", undefined, userType);
    
    // Show welcome message based on user type
    sonnerToast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
    
    // Route to correct dashboard based on user type
    navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0EA5E9] to-[#0056b3] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">RoadCare</h1>
          <p className="text-white/90 font-medium">Report road issues and track repairs efficiently</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-blue-200 transition-all duration-300 hover:shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-[#0EA5E9] mb-4">Choose Account Type</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                variant="outline" 
                className={`flex flex-col items-center p-4 h-auto gap-2 transition-all duration-200 ${userType === "citizen" ? "bg-blue-100 border-[#0EA5E9]" : "border-blue-200 hover:bg-blue-50"}`}
                onClick={() => setUserType("citizen")}
              >
                <User className="h-6 w-6 text-[#0EA5E9]" />
                <span className="text-sm font-medium">Citizen</span>
              </Button>
              <Button 
                variant="outline" 
                className={`flex flex-col items-center p-4 h-auto gap-2 transition-all duration-200 ${userType === "municipal" ? "bg-blue-100 border-[#0EA5E9]" : "border-blue-200 hover:bg-blue-50"}`}
                onClick={() => setUserType("municipal")}
              >
                <Building2 className="h-6 w-6 text-[#0EA5E9]" />
                <span className="text-sm font-medium">Administrative</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50 rounded-lg">
              <TabsTrigger 
                value="email" 
                className="flex items-center gap-2 data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white rounded-md transition-all duration-200"
              >
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger 
                value="phone" 
                className="flex items-center gap-2 data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white rounded-md transition-all duration-200"
              >
                <Phone className="h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="animate-in fade-in-50 duration-200">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-blue-200 focus:border-[#0EA5E9] focus:ring-[#0EA5E9] transition-all duration-200"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white transition-all duration-200 flex items-center justify-center"
                >
                  Continue with Email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="phone" className="animate-in fade-in-50 duration-200">
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-blue-200 focus:border-[#0EA5E9] focus:ring-[#0EA5E9] transition-all duration-200"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white transition-all duration-200 flex items-center justify-center"
                >
                  Continue with Phone
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center gap-2 border-blue-200 hover:bg-blue-50 text-gray-700 transition-all duration-200"
            >
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="#4285F4"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Apple")}
              className="flex items-center justify-center gap-2 border-blue-200 hover:bg-blue-50 text-gray-700 transition-all duration-200"
            >
              <Apple className="h-4 w-4" />
              Apple
            </Button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            By continuing, you agree to RoadCare's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
