
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
    toast({
      title: "Welcome to RoadCare",
      description: `You have successfully logged in as a ${userType === "citizen" ? "citizen" : "municipal employee"}`,
    });
    navigate("/dashboard");
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
        className="bg-[#2da0a8] text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider border border-transparent w-full"
      >
        Continue with Email
      </button>
    </form>
  );
};

export default EmailLoginForm;
