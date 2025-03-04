import React, { useState } from 'react';
import { MessageSquare, Users, Search, Plus, Filter, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import PostCard from '../../components/community/PostCard';
import { currentUser, mockCommunities, mockPosts, mockStudents, mockMentors } from '../../data/mockData';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'communities' | 'discover'>('feed');
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  
  // Get all users for post authors
  const allUsers = [...mockStudents, ...mockMentors];
  
  // Filter posts based on selected community
  const filteredPosts = selectedCommunity
    ? mockPosts.filter(post => {
        const community = mockCommunities.find(c => c.id === selectedCommunity);
        return community?.posts.some(p => p.id === post.id);
      })
    : mockPosts;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Community</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'feed'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2" />
                Feed
              </div>
            </button>
            <button
              onClick={() => setActiveTab('communities')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'communities'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Users size={16} className="mr-2" />
                My Communities
              </div>
            </button>
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'discover'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Search size={16} className="mr-2" />
                Discover
              </div>
            </button>
          </nav>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardBody>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" status="online" />
                <div>
                  <p className="font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
              
              <Button variant="primary" fullWidth icon={<Plus size={16} />}>
                Create New Post
              </Button>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="font-medium text-gray-900">My Communities</h3>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200">
                {mockCommunities.map(community => (
                  <button
                    key={community.id}
                    onClick={() => setSelectedCommunity(selectedCommunity === community.id ? null : community.id)}
                    className={`w-full px-4 py-3 flex items-center text-left hover:bg-gray-50 ${
                      selectedCommunity === community.id ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <Users size={16} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className={`font-medium ${selectedCommunity === community.id ? 'text-indigo-600' : 'text-gray-900'}`}>
                        {community.name}
                      </p>
                      <p className="text-xs text-gray-500">{community.members.length} members</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="font-medium text-gray-900">Trending Topics</h3>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200">
                {['React Hooks', 'Machine Learning', 'UX Research', 'Career Advice', 'Technical Interviews'].map((topic, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 flex items-center text-left hover:bg-gray-50"
                  >
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      <MessageCircle size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">#{topic}</p>
                      <p className="text-xs text-gray-500">{Math.floor(Math.random() * 50) + 10} posts today</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          {activeTab === 'feed' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCommunity 
                    ? mockCommunities.find(c => c.id === selectedCommunity)?.name 
                    : 'Community Feed'}
                </h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" icon={<Filter size={16} />}>
                    Filter
                  </Button>
                  <select className="block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Commented</option>
                  </select>
                </div>
              </div>
              
              <Card>
                <CardBody className="p-4">
                  <div className="flex space-x-3">
                    <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
                    <div className="flex-1">
                      <textarea
                        placeholder="Share something with the community..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={3}
                      ></textarea>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        </div>
                        <Button variant="primary" size="sm">
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => {
                    const author = allUsers.find(user => user.id === post.authorId);
                    return author ? (
                      <PostCard key={post.id} post={post} author={author} />
                    ) : null;
                  })
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <MessageSquare size={48} className="mx-auto text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No posts yet</h3>
                    <p className="mt-1 text-gray-500">
                      Be the first to share something with the community!
                    </p>
                    <div className="mt-6">
                      <Button variant="primary" icon={<Plus size={18} />}>
                        Create New Post
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'communities' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">My Communities</h2>
                <Button variant="primary" size="sm" icon={<Plus size={16} />}>
                  Create Community
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCommunities.map(community => (
                  <Card key={community.id}>
                    <CardBody>
                      <div className="flex items-start space-x-4">
                        <div className="bg-indigo-100 p-3 rounded-full">
                          <Users size={24} className="text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{community.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{community.description}</p>
                          <div className="mt-3 flex items-center">
                            <div className="flex -space-x-2 mr-2">
                              {community.members.slice(0, 3).map((member, index) => (
                                <Avatar 
                                  key={index} 
                                  src={member.avatar} 
                                  alt={member.name} 
                                  size="sm" 
                                  className="border-2 border-white"
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              {community.members.length} members
                            </span>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              {community.posts.length} posts
                            </div>
                            <Button variant="outline" size="sm">
                              View Community
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'discover' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Discover Communities</h2>
                <div className="relative max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search communities..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Python Developers',
                    description: 'A community for Python enthusiasts to share knowledge and collaborate on projects.',
                    members: 1250,
                    posts: 320,
                    tags: ['Python', 'Programming', 'Data Science']
                  },
                  {
                    name: 'UI/UX Design',
                    description: 'For designers to share work, get feedback, and discuss design principles and trends.',
                    members: 980,
                    posts: 215,
                    tags: ['Design', 'UI', 'UX']
                  },
                  {
                    name: 'Cloud Computing',
                    description: 'Discuss cloud technologies, architectures, and best practices for cloud deployments.',
                    members: 750,
                    posts: 180,
                    tags: ['AWS', 'Azure', 'GCP', 'DevOps']
                  },
                  {
                    name: 'Mobile Development',
                    description: 'For mobile app developers to share tips, tricks, and discuss platform-specific challenges.',
                    members: 1100,
                    posts: 290,
                    tags: ['iOS', 'Android', 'React Native']
                  }
                ].map((community, index) => (
                  <Card key={index}>
                    <CardBody>
                      <div className="flex items-start space-x-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <Users size={24} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{community.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{community.description}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {community.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="default" size="sm">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              {community.members} members • {community.posts} posts
                            </div>
                            <Button variant="primary" size="sm">
                              Join
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;