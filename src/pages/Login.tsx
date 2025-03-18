
import { useState } from "react";
import { cn } from "@/lib/utils";
import LoginFormContainer from "@/components/login/LoginFormContainer";
import TogglePanel from "@/components/login/TogglePanel";

const Login = () => {
  const [userType, setUserType] = useState<"citizen" | "municipal">("citizen");
  const [activeSide, setActiveSide] = useState<"left" | "right">("left"); // For panel animation

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
        <LoginFormContainer userType={userType} />
        
        {/* Right Panel - Sliding Panel */}
        <TogglePanel toggleUserType={toggleUserType} activeSide={activeSide} />
      </div>
    </div>
  );
};

export default Login;
