import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Goal } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="default">Not Started</Badge>;
      default:
        return null;
    }
  };

  const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">{goal.title}</h3>
          {getStatusBadge(goal.status)}
        </div>
        <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
        <ProgressBar 
          value={goal.progress} 
          label="Progress" 
          showValue={true}
          color={goal.progress > 75 ? "success" : goal.progress > 25 ? "default" : "warning"}
        />
      </CardBody>
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>Due: {format(goal.deadline, 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          <span>{daysLeft} days left</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;