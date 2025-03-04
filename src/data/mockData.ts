import { Student, Mentor, Admin, Goal, Achievement, Skill, Meeting, Assignment, Community, Post } from '../types';
import { addDays, subDays } from 'date-fns';

// Mock Users
export const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    role: 'student',
    mentors: [],
    goals: [],
    progress: [],
    achievements: [],
    skills: []
  },
  {
    id: 's2',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    role: 'student',
    mentors: [],
    goals: [],
    progress: [],
    achievements: [],
    skills: []
  },
  {
    id: 's3',
    name: 'Taylor Wilson',
    email: 'taylor@example.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    role: 'student',
    mentors: [],
    goals: [],
    progress: [],
    achievements: [],
    skills: []
  }
];

export const mockMentors: Mentor[] = [
  {
    id: 'm1',
    name: 'Dr. Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    role: 'mentor',
    students: [],
    expertise: ['Machine Learning', 'Data Science', 'Python'],
    rating: 4.9,
    availability: [
      { id: 'a1', day: 'Monday', startTime: '10:00', endTime: '12:00' },
      { id: 'a2', day: 'Wednesday', startTime: '14:00', endTime: '16:00' }
    ],
    bio: 'PhD in Computer Science with 10+ years of industry experience at top tech companies.'
  },
  {
    id: 'm2',
    name: 'Prof. Michael Rodriguez',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    role: 'mentor',
    students: [],
    expertise: ['Web Development', 'JavaScript', 'React'],
    rating: 4.8,
    availability: [
      { id: 'a3', day: 'Tuesday', startTime: '09:00', endTime: '11:00' },
      { id: 'a4', day: 'Thursday', startTime: '15:00', endTime: '17:00' }
    ],
    bio: 'Full-stack developer and educator with a passion for teaching the next generation of coders.'
  },
  {
    id: 'm3',
    name: 'Dr. Olivia Washington',
    email: 'olivia@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    role: 'mentor',
    students: [],
    expertise: ['UX Design', 'Product Management', 'Design Thinking'],
    rating: 4.7,
    availability: [
      { id: 'a5', day: 'Monday', startTime: '13:00', endTime: '15:00' },
      { id: 'a6', day: 'Friday', startTime: '10:00', endTime: '12:00' }
    ],
    bio: 'UX researcher and designer with experience at Fortune 500 companies and startups alike.'
  }
];

export const mockAdmins: Admin[] = [
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    role: 'admin'
  }
];

// Connect mentors and students
mockStudents[0].mentors = [mockMentors[0], mockMentors[1]];
mockStudents[1].mentors = [mockMentors[1]];
mockStudents[2].mentors = [mockMentors[0], mockMentors[2]];

mockMentors[0].students = [mockStudents[0], mockStudents[2]];
mockMentors[1].students = [mockStudents[0], mockStudents[1]];
mockMentors[2].students = [mockStudents[2]];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: 'g1',
    title: 'Learn React Fundamentals',
    description: 'Master the basics of React including components, props, and state',
    deadline: addDays(new Date(), 14),
    status: 'in-progress',
    progress: 65,
    createdAt: subDays(new Date(), 10),
    updatedAt: subDays(new Date(), 2)
  },
  {
    id: 'g2',
    title: 'Complete Machine Learning Project',
    description: 'Build and deploy a machine learning model for image classification',
    deadline: addDays(new Date(), 30),
    status: 'in-progress',
    progress: 40,
    createdAt: subDays(new Date(), 20),
    updatedAt: subDays(new Date(), 5)
  },
  {
    id: 'g3',
    title: 'Improve Technical Writing',
    description: 'Practice writing technical documentation and blog posts',
    deadline: addDays(new Date(), 7),
    status: 'not-started',
    progress: 0,
    createdAt: subDays(new Date(), 3),
    updatedAt: subDays(new Date(), 3)
  }
];

// Assign goals to students
mockStudents[0].goals = [mockGoals[0], mockGoals[2]];
mockStudents[1].goals = [mockGoals[1]];
mockStudents[2].goals = [mockGoals[0], mockGoals[1]];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'First Milestone',
    description: 'Completed your first learning goal',
    icon: 'award',
    unlockedAt: subDays(new Date(), 15)
  },
  {
    id: 'ach2',
    title: 'Consistent Learner',
    description: 'Logged in for 7 consecutive days',
    icon: 'calendar',
    unlockedAt: subDays(new Date(), 10)
  },
  {
    id: 'ach3',
    title: 'Feedback Master',
    description: 'Received positive feedback on 5 assignments',
    icon: 'thumbs-up',
    unlockedAt: subDays(new Date(), 5)
  }
];

// Assign achievements to students
mockStudents[0].achievements = [mockAchievements[0], mockAchievements[1]];
mockStudents[1].achievements = [mockAchievements[2]];
mockStudents[2].achievements = [mockAchievements[0], mockAchievements[1], mockAchievements[2]];

// Mock Skills
export const mockSkills: Skill[] = [
  {
    id: 'sk1',
    name: 'JavaScript',
    level: 4,
    category: 'Programming'
  },
  {
    id: 'sk2',
    name: 'React',
    level: 3,
    category: 'Frontend'
  },
  {
    id: 'sk3',
    name: 'Python',
    level: 2,
    category: 'Programming'
  },
  {
    id: 'sk4',
    name: 'UX Design',
    level: 4,
    category: 'Design'
  },
  {
    id: 'sk5',
    name: 'Data Analysis',
    level: 3,
    category: 'Data Science'
  }
];

// Assign skills to students
mockStudents[0].skills = [mockSkills[0], mockSkills[1], mockSkills[2]];
mockStudents[1].skills = [mockSkills[2], mockSkills[4]];
mockStudents[2].skills = [mockSkills[0], mockSkills[3], mockSkills[4]];

// Mock Meetings
export const mockMeetings: Meeting[] = [
  {
    id: 'meet1',
    mentorId: mockMentors[0].id,
    studentId: mockStudents[0].id,
    title: 'Weekly Progress Review',
    description: 'Review progress on React learning goals and set next steps',
    startTime: addDays(new Date(), 2),
    endTime: addDays(new Date(), 2),
    status: 'scheduled',
    notes: ''
  },
  {
    id: 'meet2',
    mentorId: mockMentors[1].id,
    studentId: mockStudents[1].id,
    title: 'Project Feedback Session',
    description: 'Provide feedback on the machine learning project implementation',
    startTime: addDays(new Date(), 1),
    endTime: addDays(new Date(), 1),
    status: 'scheduled',
    notes: ''
  },
  {
    id: 'meet3',
    mentorId: mockMentors[2].id,
    studentId: mockStudents[2].id,
    title: 'UX Design Portfolio Review',
    description: 'Review portfolio and provide guidance on improvements',
    startTime: addDays(new Date(), 3),
    endTime: addDays(new Date(), 3),
    status: 'scheduled',
    notes: ''
  }
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: 'assign1',
    title: 'Build a React Component Library',
    description: 'Create a reusable component library with at least 5 components',
    dueDate: addDays(new Date(), 7),
    status: 'in-progress',
    feedback: '',
    grade: 0,
    mentorId: mockMentors[1].id,
    studentId: mockStudents[0].id
  },
  {
    id: 'assign2',
    title: 'Implement a Neural Network from Scratch',
    description: 'Build a simple neural network without using any ML libraries',
    dueDate: addDays(new Date(), 14),
    status: 'assigned',
    feedback: '',
    grade: 0,
    mentorId: mockMentors[0].id,
    studentId: mockStudents[1].id
  },
  {
    id: 'assign3',
    title: 'Design a Mobile App Prototype',
    description: 'Create a high-fidelity prototype for a mobile app of your choice',
    dueDate: addDays(new Date(), 10),
    status: 'submitted',
    feedback: 'Great work on the visual hierarchy. Consider improving the navigation flow.',
    grade: 85,
    mentorId: mockMentors[2].id,
    studentId: mockStudents[2].id
  }
];

// Mock Communities
export const mockCommunities: Community[] = [
  {
    id: 'comm1',
    name: 'Web Development',
    description: 'A community for web developers to share knowledge and resources',
    members: [...mockStudents, mockMentors[1]],
    posts: []
  },
  {
    id: 'comm2',
    name: 'Data Science Hub',
    description: 'Discuss data science topics, share projects, and get feedback',
    members: [mockStudents[1], mockStudents[2], mockMentors[0]],
    posts: []
  },
  {
    id: 'comm3',
    name: 'Design Thinkers',
    description: 'For UX/UI designers to share work and discuss design principles',
    members: [mockStudents[0], mockStudents[2], mockMentors[2]],
    posts: []
  }
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: 'post1',
    authorId: mockStudents[0].id,
    content: 'Just completed my first React project! Check it out: [link]',
    likes: 12,
    comments: [
      {
        id: 'comment1',
        authorId: mockMentors[1].id,
        content: 'Great work! I especially like how you structured your components.',
        likes: 3,
        createdAt: subDays(new Date(), 2)
      }
    ],
    createdAt: subDays(new Date(), 3)
  },
  {
    id: 'post2',
    authorId: mockMentors[0].id,
    content: 'Sharing a great resource on machine learning fundamentals: [link]',
    likes: 24,
    comments: [
      {
        id: 'comment2',
        authorId: mockStudents[1].id,
        content: 'Thanks for sharing! This is exactly what I needed for my project.',
        likes: 2,
        createdAt: subDays(new Date(), 1)
      }
    ],
    createdAt: subDays(new Date(), 4)
  },
  {
    id: 'post3',
    authorId: mockStudents[2].id,
    content: 'Looking for feedback on my UX design portfolio. Any takers?',
    likes: 8,
    comments: [
      {
        id: 'comment3',
        authorId: mockMentors[2].id,
        content: 'I d be happy to review it. Send me a DM!',
        likes: 1,
        createdAt: subDays(new Date(), 1)
      }
    ],
    createdAt: subDays(new Date(), 2)
  }
];

// Assign posts to communities
mockCommunities[0].posts = [mockPosts[0]];
mockCommunities[1].posts = [mockPosts[1]];
mockCommunities[2].posts = [mockPosts[2]];

// Current user for demo purposes
export const currentUser: Student = {
  ...mockStudents[0],
  mentors: [mockMentors[0], mockMentors[1]]
};