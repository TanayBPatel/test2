import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Calendar, ChevronDown } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { mockMentors } from '../../data/mockData';

const MentorSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  
  // Get unique expertise areas from all mentors
  const allExpertise = Array.from(
    new Set(mockMentors.flatMap(mentor => mentor.expertise))
  );
  
  // Filter mentors based on search and filters
  const filteredMentors = mockMentors.filter(mentor => {
    // Search by name or expertise
    const matchesSearch = searchTerm === '' || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by selected expertise
    const matchesExpertise = selectedExpertise.length === 0 ||
      selectedExpertise.some(skill => mentor.expertise.includes(skill));
    
    // Filter by rating
    const matchesRating = selectedRating === 0 || mentor.rating >= selectedRating;
    
    return matchesSearch && matchesExpertise && matchesRating;
  });
  
  const toggleExpertise = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter(item => item !== expertise));
    } else {
      setSelectedExpertise([...selectedExpertise, expertise]);
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Find Your Perfect Mentor</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardBody>
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Expertise</h3>
                  <div className="space-y-2">
                    {allExpertise.map((expertise, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          id={`expertise-${index}`}
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={selectedExpertise.includes(expertise)}
                          onChange={() => toggleExpertise(expertise)}
                        />
                        <label htmlFor={`expertise-${index}`} className="ml-2 text-sm text-gray-700">
                          {expertise}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h3>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`p-1 rounded-full ${selectedRating >= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        <Star size={20} className="fill-current" />
                      </button>
                    ))}
                    {selectedRating > 0 && (
                      <button 
                        className="ml-2 text-xs text-gray-500 hover:text-gray-700"
                        onClick={() => setSelectedRating(0)}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
                  <div className="space-y-2">
                    {['Weekdays', 'Weekends', 'Evenings', 'Mornings'].map((time, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          id={`time-${index}`}
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`time-${index}`} className="ml-2 text-sm text-gray-700">
                          {time}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center space-x-2">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Any price</option>
                      <option>$0 - $25</option>
                      <option>$25 - $50</option>
                      <option>$50 - $100</option>
                      <option>$100+</option>
                    </select>
                  </div>
                </div>
                
                <Button variant="outline" fullWidth>
                  Reset Filters
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, expertise, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredMentors.length}</span> mentors
            </p>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">Sort by:</span>
              <select className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Relevance</option>
                <option>Rating: High to Low</option>
                <option>Experience: High to Low</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredMentors.map(mentor => (
              <Card key={mentor.id}>
                <CardBody>
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <Avatar src={mentor.avatar} alt={mentor.name} size="xl" status="online" />
                      <div className="mt-2 flex items-center justify-center">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{mentor.bio}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button variant="primary" size="sm">View Profile</Button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill, index) => (
                            <Badge key={index} variant="info">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.availability.map((slot, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <Clock size={14} className="mr-1" />
                              <span>{slot.day} {slot.startTime}-{slot.endTime}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex items-center text-sm text-gray-600 mb-4 sm:mb-0">
                          <Calendar size={16} className="mr-1" />
                          <span>Next available: Tomorrow, 10:00 AM</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" icon={<Calendar size={16} />}>
                            Schedule
                          </Button>
                          <Button variant="primary" size="sm">
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
            
            {filteredMentors.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <Search size={48} />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No mentors found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedExpertise([]);
                      setSelectedRating(0);
                    }}
                  >
                    Reset all filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {filteredMentors.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Button variant="outline">
                Load More
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorSearch;