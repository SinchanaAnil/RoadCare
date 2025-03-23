
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

type PhoneLoginFormProps = {
  userType: "citizen" | "municipal";
};

const PhoneLoginForm = ({ userType }: PhoneLoginFormProps) => {
  const [phone, setPhone] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    
    // Modified to use just phone as email and pass userType as second arg
    login(phone, userType);
    
    // Show specific welcome message based on user type
    sonnerToast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Municipal Worker!!");
    
    // Route to correct dashboard based on user type
    navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
  };

  return (
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
        className="bg-[#F97316] text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider border border-transparent w-full hover:bg-[#f97316]/90"
      >
        Continue with Phone
      </button>
    </form>
  );
};

export default PhoneLoginForm;
