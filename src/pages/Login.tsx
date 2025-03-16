
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Apple, Mail, Phone, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    
    login(email);
    toast({
      title: "Welcome to RoadCare",
      description: "You have successfully logged in",
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
    
    login(undefined, phone);
    toast({
      title: "Welcome to RoadCare",
      description: "You have successfully logged in",
    });
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `${provider} login integration will be implemented soon`,
    });
    
    // Mock login for demo
    login("demo@roadcare.com");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-fixit-light to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-fixit-primary mb-2">RoadCare</h1>
          <p className="text-muted-foreground">Report road issues in Bangalore and track repairs</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-fixit-primary">
                  Continue with Email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="phone">
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-fixit-primary">
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
              <span className="px-2 bg-white text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center gap-2"
            >
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Apple")}
              className="flex items-center justify-center gap-2"
            >
              <Apple className="h-4 w-4" />
              Apple
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to RoadCare's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
