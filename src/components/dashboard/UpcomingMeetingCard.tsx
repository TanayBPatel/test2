import React from 'react';
import { Video, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Meeting, Mentor, Student } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface UpcomingMeetingCardProps {
  meeting: Meeting;
  mentor?: Mentor;
  student?: Student;
  userRole: 'student' | 'mentor';
}

const UpcomingMeetingCard: React.FC<UpcomingMeetingCardProps> = ({ 
  meeting, 
  mentor, 
  student,
  userRole 
}) => {
  const person = userRole === 'student' ? mentor : student;
  
  if (!person) return null;
  
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">{meeting.title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-1" />
            <span>{format(meeting.startTime, 'h:mm a')}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{meeting.description}</p>
        <div className="flex items-center space-x-3">
          <Avatar src={person.avatar} alt={person.name} size="md" status="online" />
          <div>
            <p className="font-medium text-gray-900">{person.name}</p>
            <p className="text-xs text-gray-500 capitalize">{userRole === 'student' ? 'Mentor' : 'Student'}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>{format(meeting.startTime, 'MMM d, yyyy')}</span>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          icon={<Video size={16} />}
        >
          Join Call
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingMeetingCard;