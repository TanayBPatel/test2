import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Assignment } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface AssignmentCardProps {
  assignment: Assignment;
  userRole: 'student' | 'mentor';
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, userRole }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned':
        return <Badge variant="info">Assigned</Badge>;
      case 'in-progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'submitted':
        return <Badge variant="success">Submitted</Badge>;
      case 'reviewed':
        return <Badge variant="default">Reviewed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">{assignment.title}</h3>
          {getStatusBadge(assignment.status)}
        </div>
        <p className="text-gray-600 text-sm mb-4">{assignment.description}</p>
        
        {assignment.feedback && (
          <div className="bg-gray-50 p-3 rounded-md mb-3">
            <p className="text-sm font-medium text-gray-700">Feedback:</p>
            <p className="text-sm text-gray-600">{assignment.feedback}</p>
            {assignment.grade > 0 && (
              <p className="text-sm font-medium text-gray-700 mt-1">
                Grade: <span className="text-indigo-600">{assignment.grade}/100</span>
              </p>
            )}
          </div>
        )}
      </CardBody>
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>Due: {format(assignment.dueDate, 'MMM d, yyyy')}</span>
        </div>
        {userRole === 'student' && assignment.status !== 'reviewed' && (
          <Button 
            variant={assignment.status === 'submitted' ? 'secondary' : 'primary'} 
            size="sm" 
            icon={<FileText size={16} />}
          >
            {assignment.status === 'submitted' ? 'View Submission' : 'Submit Assignment'}
          </Button>
        )}
        {userRole === 'mentor' && (
          <Button 
            variant="primary" 
            size="sm" 
            icon={<FileText size={16} />}
          >
            {assignment.status === 'submitted' ? 'Review' : 'View Details'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;