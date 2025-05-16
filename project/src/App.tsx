import React, { useState, useEffect } from 'react';
import { AppState, TrackingType } from './types';
import { loadState, saveState } from './utils/storageUtils';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/mood/MoodTracker';
import WaterTracker from './components/water/WaterTracker';
import SleepTracker from './components/sleep/SleepTracker';
import ActivityTracker from './components/activity/ActivityTracker';

function App() {
  const [state, setState] = useState<AppState>(loadState());
  
  // Save state to local storage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);
  
  const handleTabChange = (tab: TrackingType) => {
    setState(prevState => ({
      ...prevState,
      activeTab: tab
    }));
  };
  
  const handleAddMoodEntry = (entry: any) => {
    setState(prevState => {
      const filteredEntries = prevState.moodEntries.filter(e => e.date !== entry.date);
      return {
        ...prevState,
        moodEntries: [...filteredEntries, entry]
      };
    });
  };
  
  const handleAddWaterEntry = (entry: any) => {
    setState(prevState => {
      const filteredEntries = prevState.waterEntries.filter(e => e.date !== entry.date);
      return {
        ...prevState,
        waterEntries: [...filteredEntries, entry]
      };
    });
  };
  
  const handleUpdateWaterGoal = (goal: number) => {
    setState(prevState => ({
      ...prevState,
      waterGoal: goal
    }));
  };
  
  const handleAddSleepEntry = (entry: any) => {
    setState(prevState => {
      const filteredEntries = prevState.sleepEntries.filter(e => e.date !== entry.date);
      return {
        ...prevState,
        sleepEntries: [...filteredEntries, entry]
      };
    });
  };
  
  const handleAddActivityEntry = (entry: any) => {
    setState(prevState => {
      const filteredEntries = prevState.activityEntries.filter(e => e.date !== entry.date);
      return {
        ...prevState,
        activityEntries: [...filteredEntries, entry]
      };
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:pt-16">
        {/* Content based on active tab */}
        {state.activeTab === 'mood' && (
          <MoodTracker 
            entries={state.moodEntries} 
            onAddEntry={handleAddMoodEntry}
          />
        )}
        
        {state.activeTab === 'water' && (
          <WaterTracker 
            entries={state.waterEntries}
            waterGoal={state.waterGoal}
            onAddEntry={handleAddWaterEntry}
            onUpdateGoal={handleUpdateWaterGoal}
          />
        )}
        
        {state.activeTab === 'sleep' && (
          <SleepTracker 
            entries={state.sleepEntries}
            onAddEntry={handleAddSleepEntry}
          />
        )}
        
        {state.activeTab === 'activity' && (
          <ActivityTracker 
            entries={state.activityEntries}
            onAddEntry={handleAddActivityEntry}
          />
        )}
      </div>
      
      {/* Navigation */}
      <Navigation 
        activeTab={state.activeTab} 
        setActiveTab={handleTabChange} 
      />
    </div>
  );
}

export default App;