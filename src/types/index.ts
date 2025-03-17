
export type ReportStatus = 'pending' | 'in-progress' | 'completed';

export type ReportSeverity = 'low' | 'medium' | 'high';

export type ReportCategory = 
  | 'pothole' 
  | 'crack' 
  | 'drainage' 
  | 'sign' 
  | 'sidewalk' 
  | 'other';

export type AIVerificationStatus = 'not_verified' | 'approved' | 'rejected';

export interface ReportComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  status: ReportStatus;
  date: string;
  updatedAt: string;
  category: ReportCategory;
  severity: ReportSeverity;
  upvotes?: number;
  images?: string[];
  comments?: ReportComment[];
  lat?: number;
  lng?: number;
  aiVerificationStatus?: AIVerificationStatus;
  repairImageUrl?: string;
  repairDate?: string;
  assignedEmployee?: string;
}
