
export type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  date: string;
  upvotes: number;
  category: string;
  severity: string;
  lat: number;
  lng: number;
  aiVerificationStatus?: "not_verified" | "approved" | "rejected";
  repairImageUrl?: string;
};
