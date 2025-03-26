
import { bangaloreComplaints } from '@/data/bangaloreComplaints';
import { mockReports } from '@/data/mockReports';

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

// Knowledge base for the chatbot
const knowledgeBase = {
  app: {
    name: "RoadCare",
    description: "RoadCare is a citizen engagement platform that allows residents of Bengaluru to report and track infrastructure issues like potholes, broken streetlights, and damaged roads.",
    features: [
      "Report road infrastructure issues with photos and location",
      "Track status of reported issues",
      "View reported issues on an interactive map",
      "Community engagement through upvoting and discussions",
      "Municipal worker dashboard for managing repairs",
      "AI verification of completed repairs",
      "Statistics and analytics on citywide infrastructure"
    ],
    navigation: [
      "Home - Overview of the application and recent activities",
      "Report Issue - Form to submit new infrastructure problems",
      "My Reports - Track your submitted reports and their status",
      "Community - Engage with other users and see trending issues",
      "Statistics - View data analysis of infrastructure issues",
      "Profile - Manage your account settings"
    ]
  },
  bengaluru: {
    roadIssues: [
      "Bengaluru has approximately 14,000 km of roads, many of which suffer from maintenance issues",
      "Potholes are a major concern, especially after the monsoon season",
      "The BBMP (Bruhat Bengaluru Mahanagara Palike) is responsible for road maintenance",
      "High-traffic areas like Silk Board, Whitefield, and Hebbal see frequent road deterioration",
      "Citizens can report potholes through the BBMP Sahaaya app or through RoadCare"
    ],
    commonIssues: {
      potholes: "Potholes are depressions in the road surface that can damage vehicles and cause accidents. Bengaluru reported over 3,000 potholes after the 2022 monsoon season.",
      streetlights: "Non-functioning streetlights affect road safety and security. About 15% of Bengaluru's 485,000 streetlights require repairs at any given time.",
      drainage: "Poor drainage leads to waterlogging, which damages road surfaces. Areas like Koramangala, HSR Layout, and parts of Whitefield frequently experience this issue.",
      sidewalks: "Damaged or missing sidewalks force pedestrians onto the roads. Only about 40% of Bengaluru's roads have proper pedestrian infrastructure.",
      signage: "Missing or damaged road signs contribute to traffic confusion and accidents. Over 25% of the city's road signage needs replacement or repair."
    },
    workflowProcess: "When you report an issue in RoadCare, it is verified, assigned to municipal workers, scheduled for repair, fixed, and then verified again with AI technology to ensure quality completion."
  }
};

// Helper function to find matches in knowledge base
const findInKnowledgeBase = (query: string): string => {
  query = query.toLowerCase();
  
  // Check for app information
  if (query.includes("what is") && (query.includes("roadcare") || query.includes("this app") || query.includes("the app"))) {
    return knowledgeBase.app.description;
  }
  
  // Check for features
  if (query.includes("feature") || query.includes("what can") || query.includes("capabilities") || query.includes("functionality")) {
    return `RoadCare offers the following features:\n\n${knowledgeBase.app.features.map(f => `• ${f}`).join('\n')}`;
  }
  
  // Check for navigation help
  if (query.includes("navigate") || query.includes("find") || query.includes("where is") || query.includes("how to use") || query.includes("menu")) {
    return `You can navigate RoadCare through these main sections:\n\n${knowledgeBase.app.navigation.map(n => `• ${n}`).join('\n')}`;
  }
  
  // Check for Bengaluru-specific information
  if (query.includes("bengaluru") || query.includes("bangalore") || query.includes("city")) {
    if (query.includes("pothole")) {
      return knowledgeBase.bengaluru.commonIssues.potholes;
    }
    if (query.includes("street light") || query.includes("streetlight")) {
      return knowledgeBase.bengaluru.commonIssues.streetlights;
    }
    if (query.includes("drainage") || query.includes("water") || query.includes("flood")) {
      return knowledgeBase.bengaluru.commonIssues.drainage;
    }
    if (query.includes("sidewalk") || query.includes("footpath") || query.includes("pedestrian")) {
      return knowledgeBase.bengaluru.commonIssues.sidewalks;
    }
    if (query.includes("sign") || query.includes("signage") || query.includes("signal")) {
      return knowledgeBase.bengaluru.commonIssues.signage;
    }
    
    // General Bengaluru information
    return `Bengaluru road infrastructure information:\n\n${knowledgeBase.bengaluru.roadIssues.map(i => `• ${i}`).join('\n')}`;
  }
  
  // Check for process information
  if (query.includes("process") || query.includes("workflow") || query.includes("how does it work") || query.includes("what happens")) {
    return knowledgeBase.bengaluru.workflowProcess;
  }
  
  // Check for stats or data questions
  if (query.includes("stat") || query.includes("data") || query.includes("numbers") || query.includes("how many")) {
    const totalReports = mockReports.length;
    const pendingReports = mockReports.filter(r => r.status === 'pending').length;
    const completedReports = mockReports.filter(r => r.status === 'completed').length;
    const topWard = bangaloreComplaints[0];
    
    return `RoadCare statistics:\n\n• Total reports in demo data: ${totalReports}\n• Pending reports: ${pendingReports}\n• Completed reports: ${completedReports}\n• Ward with most complaints: ${topWard.wardName} (${topWard.complaints} complaints)`;
  }
  
  // Default response if no match
  return "I don't have specific information about that. You can report road issues, track repairs, engage with the community, and view statistics in RoadCare. How else can I assist you?";
};

// The main function to generate responses
export const generateChatbotResponse = async (
  query: string,
  previousMessages: Message[]
): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Simple keyword matching for greetings
  if (/^(hi|hello|hey|greetings)/i.test(query)) {
    return "Hello! How can I help you with RoadCare today? You can ask about features, navigation, or Bengaluru's road infrastructure.";
  }
  
  // Check for thank you
  if (/thank you|thanks/i.test(query)) {
    return "You're welcome! Feel free to ask if you have any other questions about RoadCare.";
  }
  
  // Check for goodbye
  if (/bye|goodbye|see you/i.test(query)) {
    return "Goodbye! Feel free to come back if you have more questions about RoadCare.";
  }
  
  // Handle specific help requests
  if (/help|assist/i.test(query)) {
    return "I can help you with information about RoadCare's features, navigation, Bengaluru's road issues, or how to report problems. What would you like to know?";
  }

  // Search the knowledge base for relevant information
  return findInKnowledgeBase(query);
};
