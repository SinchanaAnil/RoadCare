
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Privacy = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-[#3498DB]">
        Privacy Policy - <span className="font-michroma">RoadCare</span>
      </h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <p className="text-lg mb-6 text-gray-700">
          Your privacy is important to us. This policy outlines how we collect, use, and protect your information:
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[#3498DB] font-medium">Information Collection</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              We collect information you provide when reporting road damage, including images, location data, and descriptions.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[#3498DB] font-medium">Data Usage</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              <p>We use this information to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Facilitate road damage reporting</li>
                <li>Improve our services</li>
                <li>Share data with the BBMP for road repair purposes</li>
                <li>Analyze road conditions</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[#3498DB] font-medium">Data Sharing</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              We may share your data with the BBMP and relevant authorities. We will not share your data with third parties for marketing purposes without your consent.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[#3498DB] font-medium">Data Security</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              We take reasonable measures to protect your data from unauthorized access or disclosure.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-[#3498DB] font-medium">Location Data</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Location data is collected to accurately mark road damage locations.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-[#3498DB] font-medium">Image Data</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Images are stored to visually display and analyze road conditions.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-[#3498DB] font-medium">User Accounts</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              If accounts are created, we store user information for account management.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-[#3498DB] font-medium">Cookies</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              We may use cookies to improve your browsing experience.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-[#3498DB] font-medium">Policy Updates</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              We may update this policy from time to time. We will notify you of any significant changes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <p className="mt-6 text-gray-700">
          By using <span className="font-michroma">RoadCare</span>, you consent to our privacy policy.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
