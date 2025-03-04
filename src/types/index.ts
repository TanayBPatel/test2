export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'mentor' | 'admin';
}

export interface Student extends User {
  role: 'student';
  mentors: Mentor[];
  goals: Goal[];
  progress: Progress[];
  achievements: Achievement[];
  skills: Skill[];
}

export interface Mentor extends User {
  role: 'mentor';
  students: Student[];
  expertise: string[];
  rating: number;
  availability: Availability[];
  bio: string;
}

export interface Admin extends User {
  role: 'admin';
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Progress {
  id: string;
  goalId: string;
  date: Date;
  value: number;
  notes: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Availability {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Meeting {
  id: string;
  mentorId: string;
  studentId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'assigned' | 'in-progress' | 'submitted' | 'reviewed';
  feedback: string;
  grade: number;
  mentorId: string;
  studentId: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: User[];
  posts: Post[];
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: Date;
}