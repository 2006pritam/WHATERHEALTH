import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { ActivityItem } from '../../types';

interface ActivityFormProps {
  initialActivity?: ActivityItem;
  onSubmit: (activity: ActivityItem) => void;
  onCancel: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ 
  initialActivity, 
  onSubmit, 
  onCancel 
}) => {
  const [name, setName] = useState(initialActivity?.name || '');
  const [duration, setDuration] = useState(initialActivity?.duration || 30);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    const newActivity: ActivityItem = {
      id: initialActivity?.id || Date.now().toString(),
      name: name.trim(),
      duration,
      completed: initialActivity?.completed || false
    };
    
    onSubmit(newActivity);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="activityName" className="block text-sm font-medium text-gray-700 mb-1">
          Activity Name
        </label>
        <input
          type="text"
          id="activityName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
          placeholder="e.g., Morning Run, Yoga, Stretching..."
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duration (minutes)
        </label>
        <div className="flex items-center">
          <Clock size={18} className="text-gray-400 mr-2" />
          <input
            type="range"
            id="duration"
            min="5"
            max="120"
            step="5"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="flex-grow accent-teal-500"
          />
          <span className="ml-4 font-medium text-teal-600 min-w-[3rem] text-center">
            {duration} min
          </span>
        </div>
      </div>
      
      <div className="flex justify-end mt-4 space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!name.trim()}
          className={`px-4 py-2 rounded-md text-white transition-colors duration-200 ${
            name.trim() ? 'bg-teal-500 hover:bg-teal-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {initialActivity ? 'Update' : 'Add'} Activity
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;