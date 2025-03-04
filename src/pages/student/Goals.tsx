import React, { useState } from 'react';
import { Plus, Target, Calendar, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { currentUser, mockGoals } from '../../data/mockData';

const Goals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed' | 'not-started'>('all');
  const [expandedGoals, setExpandedGoals] = useState<string[]>([]);
  
  const toggleGoalExpand = (goalId: string) => {
    if (expandedGoals.includes(goalId)) {
      setExpandedGoals(expandedGoals.filter(id => id !== goalId));
    } else {
      setExpandedGoals([...expandedGoals, goalId]);
    }
  };
  
  // Filter goals based on active tab
  const filteredGoals = mockGoals.filter(goal => {
    if (activeTab === 'all') return true;
    return goal.status === activeTab;
  });
  
  // Calculate overall progress
  const overallProgress = mockGoals.length > 0
    ? Math.round(mockGoals.reduce((sum, goal) => sum + goal.progress, 0) / mockGoals.length)
    : 0;
  
  // Count goals by status
  const goalCounts = {
    total: mockGoals.length,
    completed: mockGoals.filter(goal => goal.status === 'completed').length,
    inProgress: mockGoals.filter(goal => goal.status === 'in-progress').length,
    notStarted: mockGoals.filter(goal => goal.status === 'not-started').length
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Goals & Progress Tracking</h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Add New Goal
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100">Overall Progress</p>
                <h3 className="text-3xl font-bold mt-1">{overallProgress}%</h3>
                <p className="text-indigo-100 text-sm mt-1">Across all goals</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Target size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Target size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Goals</p>
              <h3 className="text-xl font-bold text-gray-900">{goalCounts.total}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <h3 className="text-xl font-bold text-gray-900">{goalCounts.completed}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <h3 className="text-xl font-bold text-gray-900">{goalCounts.inProgress}</h3>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'all'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Goals ({goalCounts.total})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'in-progress'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              In Progress ({goalCounts.inProgress})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'completed'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed ({goalCounts.completed})
            </button>
            <button
              onClick={() => setActiveTab('not-started')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'not-started'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Not Started ({goalCounts.notStarted})
            </button>
          </nav>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredGoals.length > 0 ? (
            filteredGoals.map(goal => {
              const isExpanded = expandedGoals.includes(goal.id);
              const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={goal.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className={`p-2 rounded-full ${
                            goal.status === 'completed' 
                              ? 'bg-green-100' 
                              : goal.status === 'in-progress' 
                                ? 'bg-yellow-100' 
                                : 'bg-gray-100'
                          }`}>
                            <Target size={20} className={`${
                              goal.status === 'completed' 
                                ? 'text-green-600' 
                                : goal.status === 'in-progress' 
                                  ? 'text-yellow-600' 
                                  : 'text-gray-600'
                            }`} />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-1" />
                        <span>Due: {format(goal.deadline, 'MMM d, yyyy')}</span>
                      </div>
                      <Badge 
                        variant={
                          goal.status === 'completed' ? 'success' :
                          goal.status === 'in-progress' ? 'info' :
                          'default'
                        }
                      >
                        {goal.status.replace('-', ' ')}
                      </Badge>
                      <button
                        onClick={() => toggleGoalExpand(goal.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <ProgressBar 
                      value={goal.progress} 
                      label="Progress" 
                      showValue={true}
                      color={goal.progress > 75 ? "success" : goal.progress > 25 ? "default" : "warning"}
                    />
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Created:</span>
                              <span className="font-medium text-gray-900">{format(goal.createdAt, 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Last Updated:</span>
                              <span className="font-medium text-gray-900">{format(goal.updatedAt, 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Deadline:</span>
                              <span className="font-medium text-gray-900">{format(goal.deadline, 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Days Left:</span>
                              <span className={`font-medium ${daysLeft < 3 ? 'text-red-600' : 'text-gray-900'}`}>
                                {daysLeft} days
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2" />
                              <span className="text-sm text-gray-600">Research phase completed</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2" />
                              <span className="text-sm text-gray-600">Initial draft created</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full mt-0.5 mr-2"></div>
                              <span className="text-sm text-gray-600">Peer review</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full mt-0.5 mr-2"></div>
                              <span className="text-sm text-gray-600">Final submission</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Related Resources</h4>
                          <ul className="space-y-2">
                            <li>
                              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                                </svg>
                                Project Documentation
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                Tutorial Video
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                                Reference Guide
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Edit Goal
                        </Button>
                        <Button variant="primary" size="sm">
                          Update Progress
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <Target size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No goals found</h3>
              <p className="text-gray-500 mb-4">
                {activeTab === 'all' 
                  ? "You haven't created any goals yet." 
                  : `You don't have any ${activeTab.replace('-', ' ')} goals.`}
              </p>
              <Button variant="primary" icon={<Plus size={18} />}>
                Create Your First Goal
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;