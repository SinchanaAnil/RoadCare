
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-[#3498DB]">
        Contact <span className="font-michroma">RoadCare</span>
      </h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <p className="text-lg mb-6 text-gray-700">
          We'd love to hear from you! If you have any questions, feedback, or suggestions, please contact us using the information below:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Mail className="h-10 w-10 text-[#3498DB] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <a href="mailto:roadcare.services@gmail.com" className="text-[#3498DB] hover:underline">
                roadcare.services@gmail.com
              </a>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="h-10 w-10 text-[#3498DB] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-700">
                No. 243 2nd cross<br />
                Kempapura Hebbal<br />
                Bengaluru-560024
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Phone className="h-10 w-10 text-[#3498DB] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <a href="tel:9874533212" className="text-[#3498DB] hover:underline">
                9874533212
              </a>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-[#3498DB]/10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Technical Support</h3>
          <p className="text-gray-700 mb-4">
            For technical support, please provide a detailed description of the issue, including screenshots if possible.
          </p>
          
          <h3 className="text-lg font-semibold mb-3">Urgent Road Hazards</h3>
          <p className="text-gray-700">
            To report urgent road hazards, please contact the BBMP directly at their emergency contact number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
