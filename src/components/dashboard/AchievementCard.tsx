import React from 'react';
import { Award } from 'lucide-react';
import { format } from 'date-fns';
import { Achievement } from '../../types';
import { Card, CardBody } from '../ui/Card';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
      <CardBody className="flex items-center space-x-4">
        <div className="bg-yellow-100 p-3 rounded-full">
          <Award size={24} className="text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            Unlocked on {format(achievement.unlockedAt, 'MMM d, yyyy')}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default AchievementCard;