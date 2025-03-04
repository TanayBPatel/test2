import React from 'react';
import { Calendar, Target, Award, Video } from 'lucide-react';
import { currentUser, mockGoals, mockMeetings, mockMentors, mockAchievements } from '../../data/mockData';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import GoalCard from '../../components/dashboard/GoalCard';
import MentorCard from '../../components/dashboard/MentorCard';
import UpcomingMeetingCard from '../../components/dashboard/UpcomingMeetingCard';
import AchievementCard from '../../components/dashboard/AchievementCard';
import Button from '../../components/ui/Button';

const Dashboard: React.FC = () => {
  // Filter data for the current user
  const upcomingGoals = mockGoals.filter(goal => goal.status !== 'completed').slice(0, 2);
  const upcomingMeetings = mockMeetings.filter(meeting => 
    meeting.studentId === currentUser.id && meeting.status === 'scheduled'
  ).slice(0, 2);
  const userMentors = currentUser.mentors.slice(0, 2);
  const recentAchievements = mockAchievements.slice(0, 2);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100">Weekly Progress</p>
                <h3 className="text-3xl font-bold mt-1">78%</h3>
                <p className="text-indigo-100 text-sm mt-1">You're doing great! Keep it up.</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Target size={24} />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Completed Goals</p>
                <h3 className="text-3xl font-bold mt-1">12</h3>
                <p className="text-green-100 text-sm mt-1">You've completed 3 goals this week.</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Award size={24} />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Upcoming Sessions</p>
                <h3 className="text-3xl font-bold mt-1">{upcomingMeetings.length}</h3>
                <p className="text-purple-100 text-sm mt-1">Next session in 2 days.</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Video size={24} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Today's Goals</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {upcomingGoals.map(goal => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
            <Button variant="outline" size="sm">Schedule New</Button>
          </div>
          <div className="space-y-4">
            {upcomingMeetings.map(meeting => {
              const mentor = mockMentors.find(m => m.id === meeting.mentorId);
              return mentor ? (
                <UpcomingMeetingCard 
                  key={meeting.id} 
                  meeting={meeting} 
                  mentor={mentor}
                  userRole="student"
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Mentors</h2>
            <Button variant="outline" size="sm">Find More</Button>
          </div>
          <div className="space-y-4">
            {userMentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">AI Assistant Insights</h2>
        </CardHeader>
        <CardBody>
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <p className="text-indigo-800 font-medium mb-2">Based on your recent progress:</p>
            <ul className="space-y-2 text-indigo-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-1.5 mr-2"></span>
                <span>You're making excellent progress on your React learning goals. Consider exploring advanced state management next.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-1.5 mr-2"></span>
                <span>Your technical writing skills could use more practice. I've suggested some resources to your mentor.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-1.5 mr-2"></span>
                <span>You've been consistent with your learning schedule. Great job maintaining your study routine!</span>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;