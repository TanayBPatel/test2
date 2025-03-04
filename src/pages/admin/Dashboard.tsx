import React from 'react';
import { Users, UserCheck, Award, BarChart2, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { mockMentors, mockStudents, mockCommunities } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Mentors</p>
                <h3 className="text-3xl font-bold mt-1">{mockMentors.length}</h3>
                <p className="text-purple-100 text-sm mt-1">+2 this month</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <UserCheck size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Sessions</p>
                <h3 className="text-3xl font-bold mt-1">24</h3>
                <p className="text-green-100 text-sm mt-1">Last 7 days</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Award size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Platform Growth</p>
                <h3 className="text-3xl font-bold mt-1">+18%</h3>
                <p className="text-blue-100 text-sm mt-1">Month over month</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <TrendingUp size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Mentors</h2>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200">
              {mockMentors.map(mentor => (
                <div key={mentor.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar src={mentor.avatar} alt={mentor.name} size="md" status="online" />
                    <div>
                      <h3 className="font-medium text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-500">
                        {mentor.expertise.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{mentor.students.length} students</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200">
              {mockStudents.slice(0, 5).map(student => (
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
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{student.mentors.length} mentors</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Platform Analytics</h2>
          </CardHeader>
          <CardBody>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <BarChart2 size={48} className="text-gray-300" />
              <p className="ml-4 text-gray-500">Analytics chart will be displayed here</p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-1">User Engagement</h3>
                <p className="text-2xl font-bold text-indigo-600">87%</p>
                <p className="text-sm text-gray-500">+12% from last month</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-1">Completion Rate</h3>
                <p className="text-2xl font-bold text-green-600">72%</p>
                <p className="text-sm text-gray-500">+5% from last month</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-1">Avg. Session Time</h3>
                <p className="text-2xl font-bold text-purple-600">48 min</p>
                <p className="text-sm text-gray-500">+8 min from last month</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Communities</h2>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200">
              {mockCommunities.map(community => (
                <div key={community.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{community.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {community.members.length} members
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{community.description}</p>
                  <div className="flex -space-x-2">
                    {community.members.slice(0, 5).map((member, index) => (
                      <Avatar 
                        key={index} 
                        src={member.avatar} 
                        alt={member.name} 
                        size="sm" 
                        className="border-2 border-white"
                      />
                    ))}
                    {community.members.length > 5 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-white text-xs font-medium text-gray-700">
                        +{community.members.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <h3 className="font-medium text-green-900">All Systems Operational</h3>
              </div>
              <p className="text-sm text-green-700">
                All services are running normally. Last incident: 15 days ago.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                <h3 className="font-medium text-indigo-900">AI Assistant</h3>
              </div>
              <p className="text-sm text-indigo-700">
                AI services are operating at 99.9% uptime. 1,250 queries processed today.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <h3 className="font-medium text-purple-900">Video Conferencing</h3>
              </div>
              <p className="text-sm text-purple-700">
                Video services are operating normally. 24 active sessions right now.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminDashboard;