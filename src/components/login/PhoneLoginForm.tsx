
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
    
    login(undefined, phone, userType);
    toast({
      title: "Welcome to RoadCare",
      description: `You have successfully logged in as a ${userType === "citizen" ? "citizen" : "municipal employee"}`,
    });
    navigate("/dashboard");
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
        className="bg-[#2da0a8] text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider border border-transparent w-full"
      >
        Continue with Phone
      </button>
    </form>
  );
};

export default PhoneLoginForm;
