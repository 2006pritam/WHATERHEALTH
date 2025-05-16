import React from 'react';
import { Ban as Bar, Calendar, TrendingUp } from 'lucide-react';
import { AppState } from '../types';
import { getDisplayDate, getTodayFormatted, getPastWeekDates } from '../utils/dateUtils';

interface DashboardProps {
  state: AppState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const { moodEntries, waterEntries, sleepEntries, activityEntries, waterGoal } = state;
  const today = getTodayFormatted();
  const weekDates = getPastWeekDates();
  
  const todayWaterEntry = waterEntries.find(entry => entry.date === today);
  const todaySleepEntry = sleepEntries.find(entry => entry.date === today);
  const todayMoodEntry = moodEntries.find(entry => entry.date === today);
  const todayActivityEntry = activityEntries.find(entry => entry.date === today);
  
  const completedActivities = todayActivityEntry ? 
    todayActivityEntry.activities.filter(a => a.completed).length : 0;
  const totalActivities = todayActivityEntry ? todayActivityEntry.activities.length : 0;
  
  const waterProgress = todayWaterEntry ? (todayWaterEntry.cups / waterGoal) * 100 : 0;
  
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Health Dashboard</h1>
        <p className="text-lg font-medium text-gray-600">{getDisplayDate(today)}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center mb-2">
            <Smile size={18} className="text-purple-500 mr-2" />
            <h2 className="text-sm font-medium text-gray-700">Today's Mood</h2>
          </div>
          <div className="flex items-center justify-center h-16">
            {todayMoodEntry ? (
              <span className="text-3xl">{todayMoodEntry.mood}</span>
            ) : (
              <span className="text-gray-400 text-sm">Not tracked yet</span>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center mb-2">
            <Droplets size={18} className="text-blue-500 mr-2" />
            <h2 className="text-sm font-medium text-gray-700">Water Intake</h2>
          </div>
          <div className="flex flex-col items-center justify-center h-16">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(waterProgress, 100)}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {todayWaterEntry ? `${todayWaterEntry.cups}/${waterGoal} cups` : `0/${waterGoal} cups`}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center mb-2">
            <Moon size={18} className="text-indigo-500 mr-2" />
            <h2 className="text-sm font-medium text-gray-700">Sleep</h2>
          </div>
          <div className="flex items-center justify-center h-16">
            {todaySleepEntry ? (
              <div className="text-center">
                <span className="text-2xl font-medium text-indigo-600">
                  {todaySleepEntry.hours}
                </span>
                <span className="text-sm text-gray-600 ml-1">hrs</span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Not logged yet</span>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center mb-2">
            <Activity size={18} className="text-teal-500 mr-2" />
            <h2 className="text-sm font-medium text-gray-700">Activity</h2>
          </div>
          <div className="flex items-center justify-center h-16">
            {totalActivities > 0 ? (
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {completedActivities}/{totalActivities} complete
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-teal-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(completedActivities / totalActivities) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">No activities set</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
        <div className="flex items-center mb-4">
          <TrendingUp size={18} className="text-blue-500 mr-2" />
          <h2 className="font-medium text-gray-700">Weekly Sleep Trends</h2>
        </div>
        <div className="h-32">
          <div className="flex items-end justify-between h-24">
            {weekDates.map(date => {
              const entry = sleepEntries.find(e => e.date === date);
              const height = entry ? (entry.hours / 12) * 100 : 0;
              
              return (
                <div key={date} className="flex flex-col items-center w-1/7">
                  <div className="flex-grow flex items-end">
                    <div 
                      className="w-6 bg-indigo-500 rounded-t transition-all duration-500 ease-out"
                      style={{ 
                        height: `${height}%`,
                        opacity: entry ? 1 : 0.3 
                      }}
                    ></div>
                  </div>
                  <span className="text-xs mt-1 text-gray-500">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;