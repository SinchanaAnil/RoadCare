
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

// User badge types for gamification
export type BadgeType = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface UserBadge {
  type: BadgeType;
  name: string;
  description: string;
  imageUrl?: string;
  unlockedAt: string;
}

export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  date: string;
  points: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    badge?: BadgeType;
    avatar?: string;
  };
  date: string;
  likes: number;
  comments: ForumComment[];
  images?: string[];
  location?: string;
  lat?: number;
  lng?: number;
}

export interface ForumComment {
  id: string;
  author: {
    id: string;
    name: string;
    badge?: BadgeType;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar?: string;
  badge: BadgeType;
  reportsCount: number;
  points: number;
  area?: string;
}
