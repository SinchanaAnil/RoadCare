
import React from "react";
import { Button } from "@/components/ui/button";
import { User, Building2 } from "lucide-react";

interface AccountTypeSelectorProps {
  userType: "citizen" | "municipal";
  setUserType: (type: "citizen" | "municipal") => void;
}

const AccountTypeSelector = ({ userType, setUserType }: AccountTypeSelectorProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-center text-[#3498DB] mb-4">Choose Account Type</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline" 
          className={`flex flex-col items-center p-4 h-auto gap-2 transition-all duration-200 ${userType === "citizen" ? "bg-[#3498DB]/10 border-[#3498DB] text-[#3498DB]" : "border-[#3498DB]/20 hover:bg-[#3498DB]/5"}`}
          onClick={() => setUserType("citizen")}
        >
          <User className="h-6 w-6 text-[#3498DB]" />
          <span className="text-sm font-medium">Citizen</span>
        </Button>
        <Button 
          variant="outline" 
          className={`flex flex-col items-center p-4 h-auto gap-2 transition-all duration-200 bg-white ${userType === "municipal" ? "bg-[#3498DB]/10 border-[#3498DB] text-[#3498DB]" : "border-[#3498DB]/20 hover:bg-[#3498DB]/5"}`}
          onClick={() => setUserType("municipal")}
        >
          <Building2 className="h-6 w-6 text-[#3498DB]" />
          <span className="text-sm font-medium">Municipal Worker</span>
        </Button>
      </div>
    </div>
  );
};

export default AccountTypeSelector;
