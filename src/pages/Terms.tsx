
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Terms = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-[#3498DB]">
        Terms of Service - <span className="font-michroma">RoadCare</span>
      </h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <p className="text-lg mb-6 text-gray-700">
          Welcome to <span className="font-michroma">RoadCare</span>! By using our platform, you agree to the following terms:
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[#3498DB] font-medium">User Responsibility</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              You are responsible for the accuracy of the information you provide, including images and location data.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[#3498DB] font-medium">Appropriate Use</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              You agree not to use <span className="font-michroma">RoadCare</span> for any unlawful or inappropriate purposes, including uploading offensive content or providing false information.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[#3498DB] font-medium">Data Usage</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              You grant <span className="font-michroma">RoadCare</span> the right to use the data you provide to improve our services and share it with the BBMP for road repair purposes.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[#3498DB] font-medium">Liability</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              <span className="font-michroma">RoadCare</span> is not liable for any damages or losses arising from your use of the platform.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-[#3498DB] font-medium">Modification</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              <span className="font-michroma">RoadCare</span> reserves the right to modify these terms at any time. We will notify you of any significant changes.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-[#3498DB] font-medium">BBMP Integration</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              You acknowledge that we integrate with the BBMP, and the BBMP's terms and policies may also apply.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-[#3498DB] font-medium">Community Guidelines</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Users are expected to respect other members of the community and contribute constructively to discussions.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-[#3498DB] font-medium">Location Accuracy</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Users understand that location accuracy is dependent on the device used to report, and may not be 100% accurate.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-[#3498DB] font-medium">Image Usage</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Images uploaded will be used for reporting and analysis of road conditions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <p className="mt-6 text-gray-700">
          By using <span className="font-michroma">RoadCare</span>, you agree to these terms.
        </p>
      </div>
    </div>
  );
};

export default Terms;
