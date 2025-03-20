
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

type EmailLoginFormProps = {
  userType: "citizen" | "municipal";
};

const EmailLoginForm = ({ userType }: EmailLoginFormProps) => {
  const [email, setEmail] = useState("");
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
    
    // Show specific welcome message based on user type
    sonnerToast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
    
    // Route to correct dashboard based on user type
    navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
  };

  return (
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
        className="bg-[#F97316] text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider border border-transparent w-full hover:bg-[#f97316]/90"
      >
        Continue with Email
      </button>
    </form>
  );
};

export default EmailLoginForm;
