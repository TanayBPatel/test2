import React from 'react';
import { Skill } from '../../types';
import { Card, CardBody } from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-900">{skill.name}</h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {skill.category}
          </span>
        </div>
        <ProgressBar 
          value={skill.level} 
          max={5} 
          showValue={true}
          color={skill.level >= 4 ? "success" : skill.level >= 2 ? "default" : "warning"}
        />
      </CardBody>
    </Card>
  );
};

export default SkillCard;