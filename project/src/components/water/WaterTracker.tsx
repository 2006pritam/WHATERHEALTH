import React, { useState } from 'react';
import { WaterEntry } from '../../types';
import { getTodayFormatted, getDisplayDate, getPastWeekDates } from '../../utils/dateUtils';
import WaterIntakeInput from './WaterIntakeInput';
import WaterProgress from './WaterProgress';

interface WaterTrackerProps {
  entries: WaterEntry[];
  waterGoal: number;
  onAddEntry: (entry: WaterEntry) => void;
  onUpdateGoal: (goal: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ 
  entries, 
  waterGoal, 
  onAddEntry, 
  onUpdateGoal 
}) => {
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [newGoal, setNewGoal] = useState(waterGoal);
  
  const todayEntry = entries.find(entry => entry.date === getTodayFormatted()) || {
    id: Date.now().toString(),
    date: getTodayFormatted(),
    cups: 0,
    goal: waterGoal
  };
  
  const handleAddCup = () => {
    const updatedEntry = {
      ...todayEntry,
      cups: Math.min(todayEntry.cups + 1, waterGoal)
    };
    onAddEntry(updatedEntry);
  };
  
  const handleRemoveCup = () => {
    const updatedEntry = {
      ...todayEntry,
      cups: Math.max(todayEntry.cups - 1, 0)
    };
    onAddEntry(updatedEntry);
  };
  
  const handleSetCups = (cups: number) => {
    const updatedEntry = {
      ...todayEntry,
      cups: Math.max(0, Math.min(cups, waterGoal))
    };
    onAddEntry(updatedEntry);
  };
  
  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoal(newGoal);
    setShowGoalSetting(false);
  };
  
  const weekDates = getPastWeekDates();
  
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Water Tracker</h1>
        <div className="text-sm text-gray-600">{getDisplayDate(getTodayFormatted())}</div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Today's Progress</h2>
          <button 
            onClick={() => setShowGoalSetting(true)}
            className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            Set Goal
          </button>
        </div>
        
        {showGoalSetting ? (
          <form onSubmit={handleGoalSubmit} className="mb-6 animate-fadeIn">
            <div className="mb-4">
              <label htmlFor="waterGoal" className="block text-sm font-medium text-gray-700 mb-1">
                Daily water goal (cups)
              </label>
              <input
                type="number"
                id="waterGoal"
                min={1}
                max={20}
                value={newGoal}
                onChange={(e) => setNewGoal(parseInt(e.target.value) || waterGoal)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowGoalSetting(false)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <WaterProgress cups={todayEntry.cups} goal={waterGoal} />
        )}
        
        <WaterIntakeInput
          cups={todayEntry.cups}
          goal={waterGoal}
          onAddCup={handleAddCup}
          onRemoveCup={handleRemoveCup}
          onSetCups={handleSetCups}
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Weekly Overview</h2>
        <div className="flex items-end justify-between h-48">
          {weekDates.map(date => {
            const entry = entries.find(e => e.date === date);
            const percentage = entry ? (entry.cups / entry.goal) * 100 : 0;
            
            return (
              <div key={date} className="flex flex-col items-center w-1/7">
                <div className="flex-grow flex items-end h-40">
                  <div 
                    className="w-8 bg-blue-500 rounded-t transition-all duration-500 ease-out"
                    style={{ 
                      height: `${percentage}%`,
                      opacity: entry?.cups ? 1 : 0.3 
                    }}
                  ></div>
                </div>
                <span className="text-xs mt-2 text-gray-500">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;