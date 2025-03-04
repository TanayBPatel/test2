import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, ChevronUp, Users, Target, Award, BarChart2 } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { mockStudents, mockMentors } from '../../data/mockData';

const AdminStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudents, setExpandedStudents] = useState<string[]>([]);
  
  // Filter students based on search
  const filteredStudents = mockStudents.filter(student => 
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Add New Student
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100">Total Students</p>
                <h3 className="text-3xl font-bold mt-1">{mockStudents.length}</h3>
                <p className="text-indigo-100 text-sm mt-1">+5 this month</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Users size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Students</p>
                <h3 className="text-3xl font-bold mt-1">{mockStudents.length}</h3>
                <p className="text-green-100 text-sm mt-1">100% activity rate</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Target size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Average Progress</p>
                <h3 className="text-3xl font-bold mt-1">76%</h3>
                <p className="text-purple-100 text-sm mt-1">Across all goals</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Award size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
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
            <option>Most Active</option>
            <option>Highest Progress</option>
            <option>Needs Attention</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => {
            const isExpanded = expandedStudents.includes(student.id);
            
            // Calculate overall progress
            const overallProgress = student.goals.length > 0
              ? Math.round(student.goals.reduce((sum, goal) => sum + goal.progress, 0) / student.goals.length)
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
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-600">{student.mentors.length} mentors</span>
                        <span className="text-sm text-gray-600">Progress: {overallProgress}%</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="primary" size="sm">
                          View Profile
                        </Button>
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                            <Users size={18} className="mr-2 text-indigo-600" />
                            Assigned Mentors
                          </h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                              {student.mentors.map(mentor => {
                                const mentorData = mockMentors.find(m => m.id === mentor.id);
                                return mentorData ? (
                                  <div key={mentorData.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <Avatar src={mentorData.avatar} alt={mentorData.name} size="sm" />
                                      <div className="ml-2">
                                        <p className="text-sm font-medium text-gray-700">{mentorData.name}</p>
                                        <p className="text-xs text-gray-500">{mentorData.expertise[0]}</p>
                                      </div>
                                    </div>
                                    <Badge variant="default" size="sm">Active</Badge>
                                  </div>
                                ) : null;
                              })}
                              <Button variant="outline" size="sm" fullWidth>
                                Assign New Mentor
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                            <Target size={18} className="mr-2 text-indigo-600" />
                            Goals & Progress
                          </h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                                <span className="text-sm text-gray-600">{overallProgress}%</span>
                              </div>
                              <ProgressBar 
                                value={overallProgress} 
                                color={overallProgress > 75 ? "success" : overallProgress > 25 ? "default" : "warning"}
                              />
                            </div>
                            <div className="space-y-3">
                              {student.goals.map(goal => (
                                <div key={goal.id}>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                                    <Badge 
                                      variant={
                                        goal.status === 'completed' ? 'success' :
                                        goal.status === 'in-progress' ? 'info' :
                                        'default'
                                      }
                                      size="sm"
                                    >
                                      {goal.status.replace('-', ' ')}
                                    </Badge>
                                  </div>
                                  <ProgressBar 
                                    value={goal.progress} 
                                    size="sm"
                                    color={goal.progress > 75 ? "success" : goal.progress > 25 ? "default" : "warning"}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                            <BarChart2 size={18} className="mr-2 text-indigo-600" />
                            Activity & Engagement
                          </h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Login Frequency</span>
                                <span className="text-sm font-medium text-gray-900">4.2 days/week</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Session Attendance</span>
                                <span className="text-sm font-medium text-gray-900">92%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Assignment Completion</span>
                                <span className="text-sm font-medium text-gray-900">85%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Community Participation</span>
                                <span className="text-sm font-medium text-gray-900">High</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Last Active</span>
                                <span className="text-sm font-medium text-gray-900">Today</span>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Button variant="outline" size="sm" fullWidth>
                                View Detailed Analytics
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Reset Password
                        </Button>
                        <Button variant="outline" size="sm">
                          Manage Mentors
                        </Button>
                        <Button variant="primary" size="sm">
                          View Full Profile
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

export default AdminStudents;