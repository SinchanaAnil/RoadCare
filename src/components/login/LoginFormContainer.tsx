
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone } from "lucide-react";
import EmailLoginForm from "./EmailLoginForm";
import PhoneLoginForm from "./PhoneLoginForm";
import SocialLogin from "./SocialLogin";

type LoginFormContainerProps = {
  userType: "citizen" | "municipal";
};

const LoginFormContainer = ({ userType }: LoginFormContainerProps) => {
  return (
    <div className="form-container w-1/2 h-full absolute top-0 left-0 z-2 transition-all duration-600 ease-in-out">
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">RoadCare</h1>
          <p className="text-sm text-gray-600">Login to report and track road issues</p>
        </div>
        
        <div className="mb-4 w-full">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 rounded-md">
              <TabsTrigger 
                value="email" 
                className="flex items-center gap-2 data-[state=active]:bg-[#2da0a8] data-[state=active]:text-white"
              >
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger 
                value="phone" 
                className="flex items-center gap-2 data-[state=active]:bg-[#2da0a8] data-[state=active]:text-white"
              >
                <Phone className="h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <EmailLoginForm userType={userType} />
            </TabsContent>

            <TabsContent value="phone">
              <PhoneLoginForm userType={userType} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="relative w-full my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">or continue with</span>
          </div>
        </div>

        <SocialLogin userType={userType} />
        
        <p className="text-center text-xs text-gray-500 mt-4">
          By continuing, you agree to RoadCare's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginFormContainer;
