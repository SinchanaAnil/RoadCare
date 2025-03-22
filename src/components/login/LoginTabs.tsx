
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginTabsProps {
  userType: "citizen" | "municipal";
  isSignUp: boolean;
  onEmailSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const LoginTabs = ({ userType, isSignUp, onEmailSubmit, loading }: LoginTabsProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await onEmailSubmit(email, password);
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
          disabled
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
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[#333333]">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#3498DB]/20 focus:border-[#3498DB] focus:ring-[#3498DB] transition-all duration-200"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#3498DB] hover:bg-[#3498DB]/90 text-white transition-all duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing in..."}
              </>
            ) : (
              <>
                {isSignUp ? "Create Account" : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="phone" className="animate-in fade-in-50 duration-200">
        <form className="space-y-4">
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
            type="button" 
            className="w-full bg-[#3498DB] hover:bg-[#3498DB]/90 text-white transition-all duration-200 flex items-center justify-center"
            disabled
          >
            <span className="opacity-60">Coming Soon</span>
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default LoginTabs;
