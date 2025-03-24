
import { Report } from '@/types/reports';

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole causing damage to vehicles',
    location: 'Main Street & 5th Avenue',
    status: 'pending',
    date: '2023-10-15',
    upvotes: 12,
    category: 'pothole',
    severity: 'high',
    lat: 12.9759, // Updated to Bangalore coordinates
    lng: 77.5946
  },
  {
    id: '2',
    title: 'Cracked sidewalk near school',
    description: 'Multiple cracks in sidewalk creating tripping hazard',
    location: 'Oak Elementary School',
    status: 'in-progress',
    date: '2023-10-12',
    upvotes: 8,
    category: 'sidewalk',
    severity: 'medium',
    lat: 12.9815, // Updated to Bangalore coordinates
    lng: 77.6089
  },
  {
    id: '3',
    title: 'Road sign damaged',
    description: 'Stop sign bent and difficult to see',
    location: 'Pine St. & Washington Ave.',
    status: 'completed',
    date: '2023-10-01',
    upvotes: 5,
    category: 'sign',
    severity: 'medium',
    lat: 12.9651, // Updated to Bangalore coordinates
    lng: 77.5636
  },
  {
    id: '4',
    title: 'Water logging issue',
    description: 'Street floods during rain causing traffic issues',
    location: 'Market Street',
    status: 'pending',
    date: '2023-10-14',
    upvotes: 15,
    category: 'drainage',
    severity: 'high',
    lat: 12.9352, // Updated to Bangalore coordinates
    lng: 77.6245
  }
];
