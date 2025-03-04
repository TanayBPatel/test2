import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, MessageSquare, Video, FileText, BarChart2 } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { mockMentors, mockStudents, mockGoals, mockAssignments } from '../../data/mockData';

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudents, setExpandedStudents] = useState<string[]>([]);
  
  // For demo purposes, we'll use the first mentor
  const currentMentor = mockMentors[0];
  
  // Get mentor's students
  const mentorStudents = mockStudents.filter(student => 
    student.mentors.some(mentor => mentor.id === currentMentor.id)
  );
  
  // Filter students based on search
  const filteredStudents = mentorStudents.filter(student => 
    searchTerm === '' || 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const toggleStudentExpand = (studentId: string) => {
    if (expandedStudents.includes(studentId)) {
      setExpandedStudents(expandedStudents.filter(id => id !== studentId));
    } else {
      setExpandedStudents([...expandedStudents, studentId]);
    }
  };
  
  // Get student's goals
  const getStudentGoals = (studentId: string) => {
    return mockGoals.filter(goal => 
      mockStudents.find(s => s.id === studentId)?.goals.some(g => g.id === goal.id)
    );
  };
  
  // Get student's assignments
  const getStudentAssignments = (studentId: string) => {
    return mockAssignments.filter(assignment => 
      assignment.studentId === studentId && assignment.mentorId === currentMentor.id
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Your Students</h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Add New Student
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" icon={<Filter size={16} />}>
            Filter
          </Button>
          <select className="block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
            <option>All Students</option>
            <option>Active Students</option>
            <option>Needs Attention</option>
            <option>New Students</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => {
            const isExpanded = expandedStudents.includes(student.id);
            const studentGoals = getStudentGoals(student.id);
            const studentAssignments = getStudentAssignments(student.id);
            
            // Calculate overall progress
            const overallProgress = studentGoals.length > 0
              ? Math.round(studentGoals.reduce((sum, goal) => sum + goal.progress, 0) / studentGoals.length)
              : 0;
            
            return (
              <Card key={student.id}>
                <CardBody>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar src={student.avatar} alt={student.name} size="lg" status="online" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">
                          {student.email} • Joined {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {student.skills.map((skill, index) => (
                            <Badge key={index} variant="info" size="sm">{skill.name}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                      <div className="flex space-x-2 mb-2">
                        <Button variant="outline" size="sm" icon={<MessageSquare size={16} />}>
                          Message
                        </Button>
                        <Button variant="primary" size="sm" icon={<Video size={16} />}>
                          Call
                        </Button>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">Overall Progress: {overallProgress}%</span>
                        <button
                          onClick={() => toggleStudentExpand(student.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                            <Target size={18} className="mr-2 text-indigo-600" />
                            Current Goals
                          </h4>
                          {studentGoals.length > 0 ? (
                            <div className="space-y-4">
                              {studentGoals.map(goal => (
                                <div key={goal.id} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-medium text-gray-900">{goal.title}</h5>
                                    <Badge 
                                      variant={
                                        goal.status === 'completed' ? 'success' :
                                        goal.status === 'in-progress' ? 'info' :
                                        'default'
                                      }
                                    >
                                      {goal.status.replace('-', ' ')}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                                  <ProgressBar 
                                    value={goal.progress} 
                                    color={goal.progress > 75 ? "success" : goal.progress > 25 ? "default" : "warning"}
                                  />
                                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                                    <span>Created: {goal.createdAt.toLocaleDateString()}</span>
                                    <span>Due: {goal.deadline.toLocaleDateString()}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                              <Target size={24} className="mx-auto text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">No goals set yet</p>
                              <Button variant="outline" size="sm" className="mt-2">
                                Set a Goal
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                            <FileText size={18} className="mr-2 text-indigo-600" />
                            Assignments
                          </h4>
                          {studentAssignments.length > 0 ? (
                            <div className="space-y-4">
                              {studentAssignments.map(assignment => (
                                <div key={assignment.id} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-medium text-gray-900">{assignment.title}</h5>
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
                                    <span className="text-xs text-gray-500">
                                      Due: {assignment.dueDate.toLocaleDateString()}
                                    </span>
                                    <Button 
                                      variant={assignment.status === 'submitted' ? 'primary' : 'outline'} 
                                      size="sm"
                                    >
                                      {assignment.status === 'submitted' ? 'Review' : 'View'}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                              <FileText size={24} className="mx-auto text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">No assignments yet</p>
                              <Button variant="outline" size="sm" className="mt-2">
                                Assign Task
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                          <BarChart2 size={18} className="mr-2 text-indigo-600" />
                          Progress Analytics
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Skill Progress</h5>
                              <div className="space-y-3">
                                {student.skills.map(skill => (
                                  <div key={skill.id}>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-xs font-medium text-gray-700">{skill.name}</span>
                                      <span className="text-xs text-gray-500">{skill.level}/5</span>
                                    </div>
                                    <ProgressBar 
                                      value={skill.level} 
                                      max={5} 
                                      size="sm"
                                      color={skill.level >= 4 ? "success" : skill.level >= 2 ? "default" : "warning"}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Engagement</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">Session Attendance</span>
                                  <span className="text-xs font-medium text-gray-900">90%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">Assignment Completion</span>
                                  <span className="text-xs font-medium text-gray-900">85%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">Response Time</span>
                                  <span className="text-xs font-medium text-gray-900">4.5 hours</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">Platform Activity</span>
                                  <span className="text-xs font-medium text-gray-900">High</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Notes & Recommendations</h5>
                              <p className="text-xs text-gray-600 mb-2">
                                Student shows strong aptitude for frontend development but needs more practice with state management concepts.
                              </p>
                              <div className="flex justify-end">
                                <Button variant="outline" size="sm">
                                  Add Note
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" icon={<FileText size={16} />}>
                          Assign Task
                        </Button>
                        <Button variant="primary" size="sm" icon={<Calendar size={16} />}>
                          Schedule Session
                        </Button>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Search size={48} className="mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or add a new student.
            </p>
            <div className="mt-6">
              <Button variant="primary" icon={<Plus size={18} />}>
                Add New Student
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper components for the Students page
const Plus: React.FC<{ size: number }> = ({ size }) => (
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
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Target: React.FC<{ size: number, className?: string }> = ({ size, className = '' }) => (
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
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const Calendar: React.FC<{ size: number }> = ({ size }) => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default Students;