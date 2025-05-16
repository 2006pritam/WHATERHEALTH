import React, { useState } from 'react';
import { Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ActivityEntry, ActivityItem } from '../../types';
import { getTodayFormatted, getDisplayDate } from '../../utils/dateUtils';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

interface ActivityTrackerProps {
  entries: ActivityEntry[];
  onAddEntry: (entry: ActivityEntry) => void;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ entries, onAddEntry }) => {
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  
  const todayEntry = entries.find(entry => entry.date === getTodayFormatted()) || {
    id: Date.now().toString(),
    date: getTodayFormatted(),
    activities: [],
    completed: false
  };
  
  const handleAddActivity = (activity: ActivityItem) => {
    const updatedActivities = editingActivity
      ? todayEntry.activities.map(a => a.id === editingActivity.id ? activity : a)
      : [...todayEntry.activities, activity];
    
    const updatedEntry = {
      ...todayEntry,
      activities: updatedActivities,
      completed: updatedActivities.every(a => a.completed)
    };
    
    onAddEntry(updatedEntry);
    setShowEntryForm(false);
    setEditingActivity(null);
  };
  
  const handleToggleActivity = (id: string) => {
    const updatedActivities = todayEntry.activities.map(activity => {
      if (activity.id === id) {
        return { ...activity, completed: !activity.completed };
      }
      return activity;
    });
    
    const updatedEntry = {
      ...todayEntry,
      activities: updatedActivities,
      completed: updatedActivities.every(a => a.completed)
    };
    
    onAddEntry(updatedEntry);
  };
  
  const handleEditActivity = (activity: ActivityItem) => {
    setEditingActivity(activity);
    setShowEntryForm(true);
  };
  
  const handleDeleteActivity = (id: string) => {
    const updatedActivities = todayEntry.activities.filter(a => a.id !== id);
    
    const updatedEntry = {
      ...todayEntry,
      activities: updatedActivities,
      completed: updatedActivities.every(a => a.completed)
    };
    
    onAddEntry(updatedEntry);
  };
  
  const completedCount = todayEntry.activities.filter(a => a.completed).length;
  const totalCount = todayEntry.activities.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Activity Tracker</h1>
        <div className="text-sm text-gray-600">{getDisplayDate(getTodayFormatted())}</div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Today's Activities</h2>
          <button
            onClick={() => {
              setEditingActivity(null);
              setShowEntryForm(true);
            }}
            className="flex items-center justify-center h-9 px-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
            aria-label="Add activity"
          >
            <Plus size={16} className="mr-1" />
            <span className="text-sm">Add</span>
          </button>
        </div>
        
        {showEntryForm ? (
          <div className="animate-fadeIn">
            <ActivityForm
              initialActivity={editingActivity || undefined}
              onSubmit={handleAddActivity}
              onCancel={() => {
                setShowEntryForm(false);
                setEditingActivity(null);
              }}
            />
          </div>
        ) : todayEntry.activities.length > 0 ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Daily progress</span>
                <span className="text-sm text-teal-600">
                  {completedCount}/{totalCount} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-teal-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <ActivityList
              activities={todayEntry.activities}
              onToggle={handleToggleActivity}
              onEdit={handleEditActivity}
              onDelete={handleDeleteActivity}
            />
            
            {todayEntry.completed && (
              <div className="mt-4 p-3 bg-green-50 rounded-md flex items-center">
                <CheckCircle2 size={18} className="text-green-500 mr-2" />
                <p className="text-sm text-green-700">Great job! You've completed all activities for today.</p>
              </div>
            )}
          </>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <AlertCircle size={32} className="mx-auto text-gray-300 mb-2" />
            <p>No activities added yet.</p>
            <p className="text-sm mt-1">Click the Add button to create your first activity.</p>
          </div>
        )}
      </div>
      
      {entries.length > 1 && (
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Activity History</h2>
          
          <div className="space-y-4">
            {entries
              .filter(entry => entry.date !== getTodayFormatted() && entry.activities.length > 0)
              .slice(0, 5)
              .map(entry => {
                const completed = entry.activities.filter(a => a.completed).length;
                const total = entry.activities.length;
                const percentage = (completed / total) * 100;
                
                return (
                  <div key={entry.id} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{getDisplayDate(entry.date)}</span>
                      <span className={`text-sm ${
                        entry.completed ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {completed}/{total} completed
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ease-out ${
                          entry.completed ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracker;