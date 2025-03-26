
import { Report } from '@/types/reports';

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Large pothole on MG Road',
    description: 'Deep pothole causing damage to vehicles',
    location: 'MG Road & Residency Road',
    status: 'pending',
    date: '2023-10-15',
    upvotes: 12,
    category: 'pothole',
    severity: 'high',
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: '2',
    title: 'Cracked sidewalk near school',
    description: 'Multiple cracks in sidewalk creating tripping hazard',
    location: 'Indiranagar 100ft Road',
    status: 'in-progress',
    date: '2023-10-12',
    upvotes: 8,
    category: 'sidewalk',
    severity: 'medium',
    lat: 12.9784,
    lng: 77.6408
  },
  {
    id: '3',
    title: 'Road sign damaged',
    description: 'Stop sign bent and difficult to see',
    location: 'Koramangala 80ft Road',
    status: 'completed',
    date: '2023-10-01',
    upvotes: 5,
    category: 'sign',
    severity: 'medium',
    lat: 12.9352,
    lng: 77.6245
  },
  {
    id: '4',
    title: 'Water logging issue',
    description: 'Street floods during rain causing traffic issues',
    location: 'Silk Board Junction',
    status: 'pending',
    date: '2023-10-14',
    upvotes: 15,
    category: 'drainage',
    severity: 'high',
    lat: 12.9177,
    lng: 77.6233
  }
];
