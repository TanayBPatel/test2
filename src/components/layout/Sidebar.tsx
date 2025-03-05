import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  Bot, 
  Video, 
  Search, 
  Users, 
  Target, 
  Award, 
  MessageSquare,
  LogOut
} from 'lucide-react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
    { to: '/ai-assistant', icon: <Bot size={20} />, label: 'AI Assistant' },
    { to: '/video-call', icon: <Video size={20} />, label: 'Video Call' },
    { to: '/mentor-search', icon: <Search size={20} />, label: 'Mentor Search' },
    { to: '/my-mentors', icon: <Users size={20} />, label: 'My Mentors' },
    { to: '/goals', icon: <Target size={20} />, label: 'Goals & Progress' },
    { to: '/achievements', icon: <Award size={20} />, label: 'Achievements' },
    { to: '/community', icon: <MessageSquare size={20} />, label: 'Community' },
  ];

  const mentorNavItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/video-call', icon: <Video size={20} />, label: 'Video Call' },
    { to: '/students', icon: <Users size={20} />, label: 'My Students' },
    { to: '/assignments', icon: <Target size={20} />, label: 'Assignments' },
  ];

  const adminNavItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/mentors', icon: <Users size={20} />, label: 'Mentors' },
    { to: '/students', icon: <Users size={20} />, label: 'Students' },
  ];

  const items = user.role === 'student' 
    ? navItems 
    : user.role === 'mentor' 
      ? mentorNavItems 
      : adminNavItems;

  return (
    <div className="h-screen w-64 bg-indigo-900 text-white flex flex-col">
      <div className="p-6 border-b border-indigo-800">
        <h1 className="text-xl font-bold">Mentor Hub</h1>
      </div>
      
      <div className="p-4 border-b border-indigo-800 flex items-center space-x-3">
        <Avatar src={user.avatar} alt={user.name} status="online" />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-indigo-300 capitalize">{user.role}</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-indigo-800 text-white' 
                      : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-indigo-800">
      <button
        className="flex items-center space-x-3 text-indigo-200 hover:text-white w-full px-4 py-3 rounded-md transition-colors"
        onClick={() => window.location.href = "https://finaltest-beige.vercel.app/"}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>

      </div>
    </div>
  );
};

export default Sidebar;