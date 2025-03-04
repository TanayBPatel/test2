import React from 'react';
import { Calendar, MessageSquare, Video, Star, Clock, FileText } from 'lucide-react';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { currentUser, mockMeetings, mockAssignments } from '../../data/mockData';

const MyMentors: React.FC = () => {
  const userMentors = currentUser.mentors;
  
  // Get upcoming meetings for each mentor
  const getMentorMeetings = (mentorId: string) => {
    return mockMeetings.filter(
      meeting => meeting.mentorId === mentorId && meeting.studentId === currentUser.id
    );
  };
  
  // Get assignments from each mentor
  const getMentorAssignments = (mentorId: string) => {
    return mockAssignments.filter(
      assignment => assignment.mentorId === mentorId && assignment.studentId === currentUser.id
    );
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Mentors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100">Total Mentors</p>
                <h3 className="text-3xl font-bold mt-1">{userMentors.length}</h3>
                <p className="text-indigo-100 text-sm mt-1">Across {userMentors.flatMap(m => m.expertise).length} skill areas</p>
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
                <h3 className="text-3xl font-bold mt-1">{mockMeetings.filter(m => m.studentId === currentUser.id).length}</h3>
                <p className="text-purple-100 text-sm mt-1">Next session in 2 days</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Calendar size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Assignments</p>
                <h3 className="text-3xl font-bold mt-1">{mockAssignments.filter(a => a.studentId === currentUser.id && a.status !== 'reviewed').length}</h3>
                <p className="text-green-100 text-sm mt-1">2 due this week</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FileText size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="space-y-8">
        {userMentors.map(mentor => {
          const mentorMeetings = getMentorMeetings(mentor.id);
          const mentorAssignments = getMentorAssignments(mentor.id);
          
          return (
            <Card key={mentor.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-24"></div>
              <div className="px-6 -mt-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                  <div className="flex items-end">
                    <Avatar src={mentor.avatar} alt={mentor.name} size="xl" status="online" className="border-4 border-white" />
                    <div className="ml-4 mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{mentor.name}</h2>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <Button variant="outline" size="sm" icon={<MessageSquare size={16} />}>
                      Message
                    </Button>
                    <Button variant="primary" size="sm" icon={<Video size={16} />}>
                      Schedule Call
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">{mentor.bio}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="info">{skill}</Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
                      {mentorMeetings.length > 0 ? (
                        <div className="space-y-4">
                          {mentorMeetings.map(meeting => (
                            <div key={meeting.id} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                                <Badge variant="info">
                                  {new Date(meeting.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{meeting.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock size={14} className="mr-1" />
                                  <span>
                                    {new Date(meeting.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <Button variant="outline" size="sm" icon={<Video size={14} />}>
                                  Join
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <Calendar size={24} className="mx-auto text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">No upcoming sessions</p>
                          <Button variant="outline" size="sm" className="mt-2" icon={<Calendar size={14} />}>
                            Schedule
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Assignments</h3>
                      {mentorAssignments.length > 0 ? (
                        <div className="space-y-4">
                          {mentorAssignments.map(assignment => (
                            <div key={assignment.id} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                                <Badge 
                                  variant={
                                    assignment.status === 'assigned' ? 'info' :
                                    assignment.status === 'in-progress' ? 'warning' :
                                    assignment.status === 'submitted' ? 'success' : 'default'
                                  }
                                >
                                  {assignment.status.replace('-', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar size={14} className="mr-1" />
                                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                                <Button variant="outline" size="sm" icon={<FileText size={14} />}>
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <FileText size={24} className="mx-auto text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">No current assignments</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <CardFooter className="bg-gray-50 mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Mentoring since {new Date().getFullYear() - 2}
                </div>
                <Button variant="outline" size="sm">
                  View Full Profile
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// Helper component for the MyMentors page
const Users: React.FC<{ size: number, className?: string }> = ({ size, className = '' }) => (
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export default MyMentors;