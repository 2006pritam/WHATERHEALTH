import React from 'react';
import { Edit2, Trash2, Clock } from 'lucide-react';
import { ActivityItem } from '../../types';

interface ActivityListProps {
  activities: ActivityItem[];
  onToggle: (id: string) => void;
  onEdit: (activity: ActivityItem) => void;
  onDelete: (id: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ 
  activities, 
  onToggle, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="space-y-2">
      {activities.map((activity) => (
        <div 
          key={activity.id}
          className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${
            activity.completed
              ? 'bg-gray-50 border-gray-200'
              : 'bg-white border-gray-200 hover:border-teal-200'
          }`}
        >
          <div className="flex-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={activity.completed}
                onChange={() => onToggle(activity.id)}
                className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className={`ml-3 font-medium ${
                activity.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}>
                {activity.name}
              </span>
            </div>
            <div className="flex items-center ml-8 mt-1">
              <Clock size={14} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{activity.duration} minutes</span>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(activity)}
              className="p-1.5 text-gray-500 hover:text-teal-600 transition-colors duration-200"
              aria-label="Edit activity"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(activity.id)}
              className="p-1.5 text-gray-500 hover:text-red-600 transition-colors duration-200"
              aria-label="Delete activity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;