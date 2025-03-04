import React from 'react';
import { Award, Trophy, Star, Lock, CheckCircle, Target } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { currentUser, mockAchievements } from '../../data/mockData';

const Achievements: React.FC = () => {
  // Unlocked achievements for the current user
  const unlockedAchievements = currentUser.achievements;
  
  // Locked achievements (not yet unlocked)
  const lockedAchievements = mockAchievements.filter(
    achievement => !unlockedAchievements.some(a => a.id === achievement.id)
  );
  
  // Calculate achievement stats
  const totalAchievements = mockAchievements.length;
  const unlockedCount = unlockedAchievements.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Achievements & Gamification</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Achievements Unlocked</p>
                <h3 className="text-3xl font-bold mt-1">{unlockedCount}/{totalAchievements}</h3>
                <p className="text-yellow-100 text-sm mt-1">{completionPercentage}% completed</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Trophy size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100">Current Level</p>
                <h3 className="text-3xl font-bold mt-1">Level 7</h3>
                <p className="text-indigo-100 text-sm mt-1">Advanced Beginner</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Star size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Experience Points</p>
                <h3 className="text-3xl font-bold mt-1">1,250 XP</h3>
                <p className="text-green-100 text-sm mt-1">750 XP to next level</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Target size={24} className="text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Level Progress</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-lg font-medium text-gray-900">Level 7</span>
                  <span className="text-sm text-gray-500 ml-2">Advanced Beginner</span>
                </div>
                <span className="text-sm text-gray-500">1,250 / 2,000 XP</span>
              </div>
              <ProgressBar value={1250} max={2000} color="default" size="lg" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex items-center mb-2">
                  <CheckCircle size={18} className="text-indigo-600 mr-2" />
                  <h3 className="font-medium text-indigo-900">Recent Achievements</h3>
                </div>
                <p className="text-sm text-indigo-700">
                  You've unlocked 2 achievements in the last week!
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <Target size={18} className="text-green-600 mr-2" />
                  <h3 className="font-medium text-green-900">XP Earned This Week</h3>
                </div>
                <p className="text-sm text-green-700">
                  You've earned 350 XP this week, 25% more than last week!
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="flex items-center mb-2">
                  <Trophy size={18} className="text-yellow-600 mr-2" />
                  <h3 className="font-medium text-yellow-900">Next Milestone</h3>
                </div>
                <p className="text-sm text-yellow-700">
                  Complete 3 more assignments to reach "Coding Ninja" status!
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Unlocked Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unlockedAchievements.map(achievement => (
            <Card key={achievement.id} className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
              <CardBody>
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Award size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Unlocked on {achievement.unlockedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    +100 XP
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements to Unlock</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lockedAchievements.map(achievement => (
            <Card key={achievement.id} className="bg-gray-50 border border-gray-200">
              <CardBody>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 p-3 rounded-full">
                    <Lock size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">{achievement.title}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                    +100 XP
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
          
          {/* Additional locked achievements */}
          <Card className="bg-gray-50 border border-gray-200">
            <CardBody>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-3 rounded-full">
                  <Lock size={24} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Perfect Attendance</h3>
                  <p className="text-sm text-gray-500">Attend 10 consecutive mentor sessions without missing any.</p>
                </div>
              </div>
              <div className="mt-4 text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                  +150 XP
                </span>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-gray-50 border border-gray-200">
            <CardBody>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-3 rounded-full">
                  <Lock size={24} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Community Leader</h3>
                  <p className="text-sm text-gray-500">Create a post that receives 25+ likes from the community.</p>
                </div>
              </div>
              <div className="mt-4 text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                  +200 XP
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Leaderboard</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    XP
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Achievements
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-yellow-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Sarah Chen
                        </div>
                        <div className="text-sm text-gray-500">
                          Data Science
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Level 12
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    3,450 XP
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    24/30
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Michael Rodriguez
                        </div>
                        <div className="text-sm text-gray-500">
                          Web Development
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Level 10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    2,890 XP
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    21/30
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    3
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={currentUser.avatar} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {currentUser.name} (You)
                        </div>
                        <div className="text-sm text-gray-500">
                          Full Stack
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Level 7
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    1,250 XP
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {unlockedCount}/30
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    4
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          James Wilson
                        </div>
                        <div className="text-sm text-gray-500">
                          Mobile Development
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Level 6
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    980 XP
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    15/30
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Emily Thompson
                        </div>
                        <div className="text-sm text-gray-500">
                          UX Design
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Level 5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    750 XP
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    12/30
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Achievements;