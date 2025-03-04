import React from 'react';
import { Calendar, Users, FileText, Video } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import ProgressBar from '../../components/ui/ProgressBar';
import { mockMentors, mockStudents, mockMeetings, mockAssignments } from '../../data/mockData';

const MentorDashboard: React.FC = () => {
  // For demo purposes, we'll use the first mentor
  const currentMentor = mockMentors[0];
  
  // Get mentor's students
  const mentorStudents = mockStudents.filter(student => 
    student.mentors.some(mentor => mentor.id === currentMentor.id)
  );
  
  // Get upcoming meetings
  const upcomingMeetings = mockMeetings.filter(meeting => 
    meeting.mentorId === currentMentor.id && meeting.status === 'scheduled'
  ).slice(0, 3);
  
  // Get pending assignments
  const pendingAssignments = mockAssignments.filter(assignment => 
    assignment.mentorId === currentMentor.id && assignment.status === 'submitted'
  ).slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentMentor.name}!</h1>
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
                <p className="text-indigo-100">Your Students</p>
                <h3 className="text-3xl font-bold mt-1">{mentorStudents.length}</h3>
                <p className="text-indigo-100 text-sm mt-1">2 new this month</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Users size={24} className="text-white" />
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
                <p className="text-purple-100 text-sm mt-1">Next session in 2 days</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Video size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Pending Reviews</p>
                <h3 className="text-3xl font-bold mt-1">{pendingAssignments.length}</h3>
                <p className="text-green-100 text-sm mt-1">Assignments to review</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FileText size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Students</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <Card>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200">
                {mentorStudents.map(student => (
                  <div key={student.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar src={student.avatar} alt={student.name} size="md" status="online" />
                      <div>
                        <h3 className="font-medium text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-500">
                          {student.skills.map(skill => skill.name).join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" icon={<MessageSquare size={16} />}>
                        Message
                      </Button>
                      <Button variant="primary" size="sm" icon={<Video size={16} />}>
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
            <Button variant="outline" size="sm">Schedule New</Button>
          </div>
          <Card>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200">
                {upcomingMeetings.map(meeting => {
                  const student = mockStudents.find(s => s.id === meeting.studentId);
                  return student ? (
                    <div key={meeting.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar src={student.avatar} alt={student.name} size="sm" status="online" />
                          <div>
                            <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                            <p className="text-xs text-gray-500">with {student.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>
                            {new Date(meeting.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{meeting.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>
                            {new Date(meeting.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <Button variant="primary" size="sm" icon={<Video size={14} />}>
                          Join Call
                        </Button>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Assignments to Review</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <Card>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200">
                {pendingAssignments.map(assignment => {
                  const student = mockStudents.find(s => s.id === assignment.studentId);
                  return student ? (
                    <div key={assignment.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar src={student.avatar} alt={student.name} size="sm" />
                          <div>
                            <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                            <p className="text-xs text-gray-500">Submitted by {student.name}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Needs Review
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>
                            Submitted on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <Button variant="primary" size="sm" icon={<FileText size={14} />}>
                          Review
                        </Button>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Student Progress</h2>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          <Card>
            <CardBody>
              <div className="space-y-6">
                {mentorStudents.slice(0, 3).map(student => (
                  <div key={student.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar src={student.avatar} alt={student.name} size="sm" />
                        <h3 className="font-medium text-gray-900">{student.name}</h3>
                      </div>
                      <span className="text-sm text-gray-500">
                        {student.goals.filter(g => g.status === 'completed').length}/{student.goals.length} goals completed
                      </span>
                    </div>
                    <ProgressBar 
                      value={Math.round(student.goals.reduce((sum, goal) => sum + goal.progress, 0) / student.goals.length)} 
                      color="default"
                    />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Mentor Insights</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-indigo-800 mb-2">Teaching Impact</h3>
              <p className="text-sm text-indigo-700 mb-3">
                Your students show a 25% higher completion rate compared to platform average.
              </p>
              <div className="text-xs text-indigo-600 font-medium">
                Top performing areas:
              </div>
              <ul className="mt-1 space-y-1 text-xs text-indigo-700">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-1.5"></span>
                  <span>React fundamentals (92% mastery)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-1.5"></span>
                  <span>Data structures (88% mastery)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">Student Engagement</h3>
              <p className="text-sm text-green-700 mb-3">
                Your session attendance rate is 95%, which is excellent.
              </p>
              <div className="text-xs text-green-600 font-medium">
                Engagement metrics:
              </div>
              <ul className="mt-1 space-y-1 text-xs text-green-700">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5"></span>
                  <span>Average session length: 52 minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5"></span>
                  <span>Follow-up completion: 87%</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 className="font-medium text-purple-800 mb-2">Suggested Actions</h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-1.5"></span>
                  <span>Alex needs help with React state management</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-1.5"></span>
                  <span>Schedule follow-up with Jamie on ML project</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-1.5"></span>
                  <span>Create new assignment for advanced students</span>
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

// Helper components for the MentorDashboard page
const MessageSquare: React.FC<{ size: number }> = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const Clock: React.FC<{ size: number, className?: string }> = ({ size, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default MentorDashboard;