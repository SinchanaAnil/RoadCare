
/**
 * Generates a unique ticket number for issue reports
 * Format: RC-YYYYMMDD-XXXX where XXXX is a random 4-digit number
 */
export const generateTicketNumber = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  // Generate random 4-digit number
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  
  return `RC-${year}${month}${day}-${randomPart}`;
};
