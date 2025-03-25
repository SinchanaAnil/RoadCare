
import React from "react";

const LoginHeader = () => {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3">
        <img 
          src="/lovable-uploads/5aafa63a-5abd-4dbb-b7d3-6244ac17c705.png" 
          alt="RoadCare Logo" 
          className="w-16 h-16 rounded-full shadow-md"
        />
        <h2 className="text-2xl font-bold text-[#333333] drop-shadow-md">RoadCare</h2>
      </div>
      <p className="text-[#333333]/90 text-sm mt-2">Report road issues and track repairs efficiently</p>
    </div>
  );
};

export default LoginHeader;
