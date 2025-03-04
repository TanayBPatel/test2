import React from 'react';
import { Video, Calendar, Star } from 'lucide-react';
import { Mentor } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start space-x-4">
          <Avatar src={mentor.avatar} alt={mentor.name} size="lg" status="online" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-gray-900">{mentor.name}</h3>
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 fill-current" />
                <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{mentor.bio}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {mentor.expertise.map((skill, index) => (
                <Badge key={index} variant="info" size="sm">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Calendar size={16} />}
        >
          Schedule
        </Button>
        <Button 
          variant="primary" 
          size="sm" 
          icon={<Video size={16} />}
        >
          Call Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MentorCard;