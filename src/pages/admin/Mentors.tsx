import React, { useState } from 'react';
import { Search, Filter, Plus, Star, ChevronDown, ChevronUp, UserCheck, Users, Calendar, BarChart2 } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { mockMentors } from '../../data/mockData';

const AdminMentors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMentors, setExpandedMentors] = useState<string[]>([]);
  
  // Filter mentors based on search
  const filteredMentors = mockMentors.filter(mentor => 
    searchTerm === '' || 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const toggleMentorExpand = (mentorId: string) => {
    if (expandedMentors.includes(mentorId)) {
      setExpandedMentors(expandedMentors.filter(id => id !== mentorId));
    } else {
      setExpandedMentors([...expandedMentors, mentorId]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Mentors</h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Add New Mentor
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100">Total Mentors</p>
                <h3 className="text-3xl font-bold mt-1">{mockMentors.length}</h3>
                <p className="text-indigo-100 text-sm mt-1">Across {Array.from(new Set(mockMentors.flatMap(m => m.expertise))).length} expertise areas</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <UserCheck size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Active Mentors</p>
                <h3 className="text-3xl font-bold mt-1">{mockMentors.length}</h3>
                <p className="text-purple-100 text-sm mt-1">100% activity rate</p>
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
                <p className="text-green-100">Average Rating</p>
                <h3 className="text-3xl font-bold mt-1">
                  {(mockMentors.reduce((sum, mentor) => sum + mentor.rating, 0) / mockMentors.length).toFixed(1)}
                </h3>
                <p className="text-green-100 text-sm mt-1">Out of 5.0</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Star size={24} className="text-white" />
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
            placeholder="Search mentors by name or expertise..."
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
            <option>All Mentors</option>
            <option>Most Active</option>
            <option>Highest Rated</option>
            <option>Most Students</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredMentors.length > 0 ? (
          filteredMentors.map(mentor => {
            const isExpanded = expandedMentors.includes(mentor.id);
            
            return (
              <Card key={mentor.id}>
                <CardBody>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar src={mentor.avatar} alt={mentor.name} size="lg" status="online" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-sm text-gray-600">
                          {mentor.email} • Joined {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {mentor.expertise.map((skill, index) => (
                            <Badge key={index} variant="info" size="sm">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">{mentor.students.length} students</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="primary" size="sm">
                          View Profile
                        </Button>
                        <button
                          onClick={() => toggleMentorExpand(mentor.id)}
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
                            Students
                          </h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm font-medium text-gray-700">Total Students</span>
                              <span className="text-sm font-bold text-gray-900">{mentor.students.length}</span>
                            </div>
                            <div className="space-y-3">
                              {mentor.students.slice(0, 3).map(student => (
                                <div key={student.id} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Avatar src={student.avatar} alt={student.name} size="sm" />
                                    <span className="ml-2 text-sm text-gray-700">{student.name}</span>
                                  </div>
                                  <Badge variant="default" size="sm">Active</Badge>
                                </div>
                              ))}
                              {mentor.students.length > 3 && (
                                <Button variant="outline" size="sm" fullWidth>
                                  View All Students
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                            <Calendar size={18} className="mr-2 text-indigo-600" />
                            Availability & Schedule
                          </h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                              {mentor.availability.map((slot, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <span className="text-sm text-gray-700">{slot.day}</span>
                                  <span className="text-sm font-medium text-gray-900">{slot.startTime} - {slot.endTime}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Sessions This Month</span>
                                <span className="text-sm font-bold text-gray-900">24</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">Hours Mentored</span>
                                <span className="text-sm font-bold text-gray-900">36.5</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                            <BarChart2 size={18} className="mr-2 text-indigo-600" />
                            Performance
                          </h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Student Satisfaction</span>
                                <span className="text-sm font-medium text-gray-900">
                                  {(mentor.rating * 20).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Assignment Completion</span>
                                <span className="text-sm font-medium text-gray-900">92%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Response Time</span>
                                <span className="text-sm font-medium text-gray-900">3.2 hours</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Student Progress Rate</span>
                                <span className="text-sm font-medium text-gray-900">+18%</span>
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
                          Manage Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Assign Students
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or add a new mentor.
            </p>
            <div className="mt-6">
              <Button variant="primary" icon={<Plus size={18} />}>
                Add New Mentor
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMentors;