
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

type EmailLoginFormProps = {
  userType: "citizen" | "municipal";
};

const EmailLoginForm = ({ userType }: EmailLoginFormProps) => {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // Login but don't navigate here - let the auth context handle navigation
    await login(email, userType);
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
