import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, CheckCircle, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { mockMentors, mockStudents, mockAssignments } from '../../data/mockData';

const Assignments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedAssignments, setExpandedAssignments] = useState<string[]>([]);
  
  // For demo purposes, we'll use the first mentor
  const currentMentor = mockMentors[0];
  
  // Get mentor's assignments
  const mentorAssignments = mockAssignments.filter(assignment => 
    assignment.mentorId === currentMentor.id
  );
  
  // Filter assignments based on search and status
  const filteredAssignments = mentorAssignments.filter(assignment => {
    const matchesSearch = searchTerm === '' || 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const toggleAssignmentExpand = (assignmentId: string) => {
    if (expandedAssignments.includes(assignmentId)) {
      setExpandedAssignments(expandedAssignments.filter(id => id !== assignmentId));
    } else {
      setExpandedAssignments([...expandedAssignments, assignmentId]);
    }
  };
  
  // Group assignments by status
  const assignmentsByStatus = {
    assigned: filteredAssignments.filter(a => a.status === 'assigned'),
    'in-progress': filteredAssignments.filter(a => a.status === 'in-progress'),
    submitted: filteredAssignments.filter(a => a.status === 'submitted'),
    reviewed: filteredAssignments.filter(a => a.status === 'reviewed')
  };
  
  // Count assignments by status
  const assignmentCounts = {
    all: filteredAssignments.length,
    assigned: assignmentsByStatus.assigned.length,
    'in-progress': assignmentsByStatus['in-progress'].length,
    submitted: assignmentsByStatus.submitted.length,
    reviewed: assignmentsByStatus.reviewed.length
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Create Assignment
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`cursor-pointer ${statusFilter === 'all' ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => setStatusFilter('all')}>
          <CardBody className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">All Assignments</p>
              <p className="text-xl font-semibold text-gray-900">{assignmentCounts.all}</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <FileText size={20} className="text-gray-600" />
            </div>
          </CardBody>
        </Card>
        
        <Card className={`cursor-pointer ${statusFilter === 'submitted' ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => setStatusFilter('submitted')}>
          <CardBody className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Needs Review</p>
              <p className="text-xl font-semibold text-yellow-600">{assignmentCounts.submitted}</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <Clock size={20} className="text-yellow-600" />
            </div>
          </CardBody>
        </Card>
        
        <Card className={`cursor-pointer ${statusFilter === 'in-progress' ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => setStatusFilter('in-progress')}>
          <CardBody className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-xl font-semibold text-blue-600">{assignmentCounts['in-progress']}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock size={20} className="text-blue-600" />
            </div>
          </CardBody>
        </Card>
        
        <Card className={`cursor-pointer ${statusFilter === 'reviewed' ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => setStatusFilter('reviewed')}>
          <CardBody className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-semibold text-green-600">{assignmentCounts.reviewed}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle size={20} className="text-green-600" />
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
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" icon={<Filter size={16} />}>
            Filter
          </Button>
          <select 
            className="block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="submitted">Submitted</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map(assignment => {
            const isExpanded = expandedAssignments.includes(assignment.id);
            const student = mockStudents.find(s => s.id === assignment.studentId);
            
            if (!student) return null;
            
            return (
              <Card key={assignment.id}>
                <CardBody>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${
                        assignment.status === 'submitted' 
                          ? 'bg-yellow-100' 
                          : assignment.status === 'reviewed' 
                            ? 'bg-green-100' 
                            : assignment.status === 'in-progress'
                              ? 'bg-blue-100'
                              : 'bg-gray-100'
                      }`}>
                        <FileText size={20} className={`${
                          assignment.status === 'submitted' 
                            ? 'text-yellow-600' 
                            : assignment.status === 'reviewed' 
                              ? 'text-green-600' 
                              : assignment.status === 'in-progress'
                                ? 'text-blue-600'
                                : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <div className="flex items-center mt-1">
                          <Avatar src={student.avatar} alt={student.name} size="sm" />
                          <span className="ml-2 text-sm text-gray-600">Assigned to {student.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <Badge 
                        variant={
                          assignment.status === 'submitted' ? 'warning' :
                          assignment.status === 'reviewed' ? 'success' :
                          assignment.status === 'in-progress' ? 'info' :
                          'default'
                        }
                      >
                        {assignment.status.replace('-', ' ')}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-1" />
                        <span>Due: {assignment.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <button
                        onClick={() => toggleAssignmentExpand(assignment.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Assignment Details</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">{assignment.description}</p>
                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Assigned Date:</span>
                                <span className="font-medium text-gray-900">
                                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Due Date:</span>
                                <span className="font-medium text-gray-900">
                                  {assignment.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Status:</span>
                                <Badge 
                                  variant={
                                    assignment.status === 'submitted' ? 'warning' :
                                    assignment.status === 'reviewed' ? 'success' :
                                    assignment.status === 'in-progress' ? 'info' :
                                    'default'
                                  }
                                >
                                  {assignment.status.replace('-', ' ')}
                                </Badge>
                              </div>
                              {assignment.grade > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Grade:</span>
                                  <span className="font-medium text-gray-900">{assignment.grade}/100</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Student Submission</h4>
                          {assignment.status === 'submitted' || assignment.status === 'reviewed' ? (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-700 mb-4">
                                {assignment.status === 'submitted' 
                                  ? "The student has submitted this assignment and it's waiting for your review."
                                  : "You've already reviewed this assignment."}
                              </p>
                              
                              {assignment.status === 'reviewed' && assignment.feedback && (
                                <div className="mb-4">
                                  <h5 className="text-sm font-medium text-gray-700 mb-1">Your Feedback:</h5>
                                  <p className="text-sm text-gray-600 bg-white p-3 rounded border border-gray-200">
                                    {assignment.feedback}
                                  </p>
                                </div>
                              )}
                              
                              <div className="flex justify-end">
                                {assignment.status === 'submitted' ? (
                                  <Button variant="primary" size="sm">
                                    Review Submission
                                  </Button>
                                ) : (
                                  <Button variant="outline" size="sm">
                                    Edit Review
                                  </Button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-700 mb-4">
                                {assignment.status === 'assigned' 
                                  ? "The student hasn't started working on this assignment yet."
                                  : "The student is currently working on this assignment."}
                              </p>
                              <div className="flex justify-end">
                                <Button variant="outline" size="sm">
                                  Send Reminder
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          <h4 className="font-medium text-gray-900 mt-4 mb-2">Student Information</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-3 mb-3">
                              <Avatar src={student.avatar} alt={student.name} size="md" />
                              <div>
                                <h5 className="font-medium text-gray-900">{student.name}</h5>
                                <p className="text-xs text-gray-500">{student.email}</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Assignments Completed:</span>
                                <span className="font-medium text-gray-900">
                                  {mockAssignments.filter(a => a.studentId === student.id && a.status === 'reviewed').length}/
                                  {mockAssignments.filter(a => a.studentId === student.id).length}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Average Grade:</span>
                                <span className="font-medium text-gray-900">85/100</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Submission Rate:</span>
                                <span className="font-medium text-gray-900">90%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Edit Assignment
                        </Button>
                        <Button variant="primary" size="sm">
                          {assignment.status === 'submitted' ? 'Review Submission' : 'View Details'}
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
            <FileText size={48} className="mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No assignments found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm 
                ? "Try adjusting your search criteria." 
                : statusFilter !== 'all' 
                  ? `There are no assignments with status "${statusFilter.replace('-', ' ')}".` 
                  : "You haven't created any assignments yet."}
            </p>
            <div className="mt-6">
              <Button variant="primary" icon={<Plus size={18} />}>
                Create Assignment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;