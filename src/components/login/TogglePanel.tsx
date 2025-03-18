
import { Building2, User } from "lucide-react";

type TogglePanelProps = {
  toggleUserType: () => void;
  activeSide: "left" | "right";
};

const TogglePanel = ({ toggleUserType, activeSide }: TogglePanelProps) => {
  return (
    <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-l-[150px] z-10">
      <div className="toggle bg-gradient-to-r from-[#0EA5E9] to-[#F97316] text-white relative left-[-100%] h-full w-[200%] transition-all duration-600 ease-in-out">
        {/* Left Toggle Panel (hidden by default) */}
        <div className="toggle-panel toggle-left absolute w-1/2 h-full flex flex-col items-center justify-center p-8 text-center transform -translate-x-[200%] transition-all duration-600 ease-in-out">
          <h1 className="text-2xl font-bold mb-2">Citizen Login</h1>
          <p className="text-sm mb-6">Report road issues and track repairs as a citizen</p>
          <div className="mb-6">
            <User className="h-12 w-12 mx-auto mb-2" />
          </div>
          <button 
            onClick={toggleUserType}
            className="bg-transparent border border-white text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider"
          >
            Switch to Citizen
          </button>
        </div>
        
        {/* Right Toggle Panel (visible by default) */}
        <div className="toggle-panel toggle-right absolute right-0 w-1/2 h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-600 ease-in-out">
          <h1 className="text-2xl font-bold mb-2">Municipal Login</h1>
          <p className="text-sm mb-6">Login as municipal staff to manage road repairs</p>
          <div className="mb-6">
            <Building2 className="h-12 w-12 mx-auto mb-2" />
          </div>
          <button 
            onClick={toggleUserType}
            className="bg-transparent border border-white text-white px-10 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider"
          >
            Switch to Municipal
          </button>
        </div>
      </div>
    </div>
  );
};

export default TogglePanel;
