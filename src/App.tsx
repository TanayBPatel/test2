import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import Analytics from './pages/student/Analytics';
import AIAssistant from './pages/student/AIAssistant';
import VideoCall from './pages/student/VideoCall';
import MentorSearch from './pages/student/MentorSearch';
import MyMentors from './pages/student/MyMentors';
import Goals from './pages/student/Goals';
import Achievements from './pages/student/Achievements';
import Community from './pages/student/Community';

// Mentor Pages
import MentorDashboard from './pages/mentor/Dashboard';
import Students from './pages/mentor/Students';
import Assignments from './pages/mentor/Assignments';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminMentors from './pages/admin/Mentors';
import AdminStudents from './pages/admin/Students';

// Mock Data
import { currentUser } from './data/mockData';

function App() {
  // For demo purposes, we'll use the current user from mock data
  const user = currentUser;
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          {/* Student Routes */}
          {user.role === 'student' && (
            <>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="video-call" element={<VideoCall />} />
              <Route path="mentor-search" element={<MentorSearch />} />
              <Route path="my-mentors" element={<MyMentors />} />
              <Route path="goals" element={<Goals />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="community" element={<Community />} />
            </>
          )}
          
          {/* Mentor Routes */}
          {user.role === 'mentor' && (
            <>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<MentorDashboard />} />
              <Route path="video-call" element={<VideoCall />} />
              <Route path="students" element={<Students />} />
              <Route path="assignments" element={<Assignments />} />
            </>
          )}
          
          {/* Admin Routes */}
          {user.role === 'admin' && (
            <>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="mentors" element={<AdminMentors />} />
              <Route path="students" element={<AdminStudents />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;