
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast as sonnerToast } from "sonner";

interface LoginTabsProps {
  userType: "citizen" | "municipal";
}

const LoginTabs = ({ userType }: LoginTabsProps) => {
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
    
    login(email, undefined, userType);
    
    sonnerToast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
    
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
    
    sonnerToast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
    
    navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
  };

  return (
    <Tabs defaultValue="email" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#F4F4F4] rounded-lg">
        <TabsTrigger 
          value="email" 
          className="flex items-center gap-2 data-[state=active]:bg-[#3498DB] data-[state=active]:text-white rounded-md transition-all duration-200"
        >
          <Mail className="h-4 w-4" />
          Email
        </TabsTrigger>
        <TabsTrigger 
          value="phone" 
          className="flex items-center gap-2 data-[state=active]:bg-[#3498DB] data-[state=active]:text-white rounded-md transition-all duration-200"
        >
          <Phone className="h-4 w-4" />
          Phone
        </TabsTrigger>
      </TabsList>

      <TabsContent value="email" className="animate-in fade-in-50 duration-200">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#333333]">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#3498DB]/20 focus:border-[#3498DB] focus:ring-[#3498DB] transition-all duration-200"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#3498DB] hover:bg-[#3498DB]/90 text-white transition-all duration-200 flex items-center justify-center"
          >
            Continue with Email
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="phone" className="animate-in fade-in-50 duration-200">
        <form onSubmit={handlePhoneLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-[#333333]">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-[#3498DB]/20 focus:border-[#3498DB] focus:ring-[#3498DB] transition-all duration-200"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#3498DB] hover:bg-[#3498DB]/90 text-white transition-all duration-200 flex items-center justify-center"
          >
            Continue with Phone
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default LoginTabs;
