
import { ForumPost, LeaderboardEntry, BadgeType } from '@/types';

// Mock data for the forum posts
export const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Large pothole on Indiranagar 100ft Road',
    content: 'There is a large pothole that has been causing accidents near the Sony signal. It needs to be fixed urgently as it\'s in the middle of a busy intersection.',
    author: {
      id: '1',
      name: 'Rajesh Kumar',
      badge: 'gold',
    },
    date: '2023-10-15T10:30:00',
    likes: 24,
    comments: [
      {
        id: '1',
        author: {
          id: '2',
          name: 'Priya Sharma',
          badge: 'silver',
        },
        content: 'I agree! My car was damaged because of this last week.',
        date: '2023-10-15T14:25:00',
        likes: 8,
      },
      {
        id: '2',
        author: {
          id: '3',
          name: 'Amit Patel',
          badge: 'bronze',
        },
        content: 'I\'ve reported this to the BBMP already. Hope they take action soon.',
        date: '2023-10-16T09:10:00',
        likes: 5,
      }
    ],
    images: ['/lovable-uploads/699255ca-9aff-4587-8b6c-fc1b70acefc1.png'],
    location: 'Indiranagar 100ft Road, Sony Signal',
    lat: 12.9782,
    lng: 77.6408,
  },
  {
    id: '2',
    title: 'Damaged sidewalk in Koramangala',
    content: 'The sidewalk near the 5th block in Koramangala is completely broken. It\'s very difficult for pedestrians, especially the elderly, to walk safely.',
    author: {
      id: '4',
      name: 'Sanjay Singh',
      badge: 'platinum',
    },
    date: '2023-10-14T16:45:00',
    likes: 32,
    comments: [
      {
        id: '3',
        author: {
          id: '5',
          name: 'Meera Reddy',
          badge: 'gold',
        },
        content: 'I walk there every day and it\'s getting worse with each rain. We need to fix this before the next monsoon.',
        date: '2023-10-14T18:20:00',
        likes: 12,
      }
    ],
    location: 'Koramangala 5th Block, Near Jyoti Nivas College',
    lat: 12.9347,
    lng: 77.6205,
  },
  {
    id: '3',
    title: 'Broken traffic light at Brigade Road',
    content: 'The traffic light at the intersection of Brigade Road and MG Road has been broken for over a week now. This is causing major traffic congestion during peak hours.',
    author: {
      id: '6',
      name: 'Divya Krishnan',
      badge: 'silver',
    },
    date: '2023-10-13T12:15:00',
    likes: 18,
    comments: [],
    location: 'Brigade Road and MG Road Intersection',
    lat: 12.9719,
    lng: 77.6186,
  }
];

// Mock data for the leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: '1',
    name: 'Rajesh Kumar',
    badge: 'gold',
    reportsCount: 37,
    points: 3720,
    area: 'Indiranagar',
  },
  {
    userId: '4',
    name: 'Sanjay Singh',
    badge: 'platinum',
    reportsCount: 54,
    points: 6240,
    area: 'Koramangala',
  },
  {
    userId: '5',
    name: 'Meera Reddy',
    badge: 'gold',
    reportsCount: 28,
    points: 3150,
    area: 'Whitefield',
  },
  {
    userId: '2',
    name: 'Priya Sharma',
    badge: 'silver',
    reportsCount: 16,
    points: 1820,
    area: 'Jayanagar',
  },
  {
    userId: '7',
    name: 'Vikram Mehta',
    badge: 'gold',
    reportsCount: 31,
    points: 3420,
    area: 'HSR Layout',
  },
  {
    userId: '8',
    name: 'Ravi Desai',
    badge: 'silver',
    reportsCount: 19,
    points: 2140,
    area: 'BTM Layout',
  },
  {
    userId: '3',
    name: 'Amit Patel',
    badge: 'bronze',
    reportsCount: 9,
    points: 980,
    area: 'JP Nagar',
  },
  {
    userId: '9',
    name: 'Neha Gupta',
    badge: 'bronze',
    reportsCount: 7,
    points: 780,
    area: 'RT Nagar',
  },
  {
    userId: '10',
    name: 'Karthik Subramanian',
    badge: 'silver',
    reportsCount: 22,
    points: 2380,
    area: 'Malleswaram',
  },
  {
    userId: '6',
    name: 'Divya Krishnan',
    badge: 'silver',
    reportsCount: 15,
    points: 1650,
    area: 'Yelahanka',
  }
];
