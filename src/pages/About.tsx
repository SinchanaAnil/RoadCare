
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-[#3498DB]">
        About <span className="font-michroma">RoadCare</span>
      </h1>
      
      <Card className="mb-8 shadow-md">
        <CardContent className="p-6">
          <p className="text-lg leading-relaxed mb-4 text-gray-700">
            <span className="font-michroma">RoadCare</span> is a community-driven platform designed to empower citizens of Bengaluru to take an active role in improving our city's road infrastructure. We provide a simple and efficient way to report road damage, such as potholes, to the relevant authorities. By utilizing image uploads and location data, we ensure accurate and timely reporting.
          </p>
          
          <p className="text-lg leading-relaxed mb-4 text-gray-700">
            Our mission is to foster collaboration between citizens and the Bruhat Bengaluru Mahanagara Palike (BBMP) to create safer and smoother roads for everyone. We believe that by working together, we can make a significant positive impact on our city's infrastructure.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700">
            <span className="font-michroma">RoadCare</span> is more than just a reporting tool. We are building a community of engaged citizens who are passionate about improving their city. Through features like community forums, gamification, and data visualization, we aim to create a transparent and accountable system that benefits all road users in Bengaluru.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#3498DB]/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#3498DB]">Our Vision</h2>
          <p className="text-gray-700">
            To create a collaborative platform where citizens and municipal authorities work together to ensure safer roads for all Bengaluru residents.
          </p>
        </div>
        
        <div className="bg-[#3498DB]/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#3498DB]">Our Approach</h2>
          <p className="text-gray-700">
            We combine easy-to-use technology with community engagement to create an efficient system for reporting and tracking road repairs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
