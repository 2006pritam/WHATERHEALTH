import React, { useState } from 'react';
import { Plus, Moon } from 'lucide-react';
import { SleepEntry } from '../../types';
import { getTodayFormatted, getDisplayDate, getPastWeekDates } from '../../utils/dateUtils';
import SleepEntryForm from './SleepEntryForm';
import SleepStats from './SleepStats';

interface SleepTrackerProps {
  entries: SleepEntry[];
  onAddEntry: (entry: SleepEntry) => void;
}

const SleepTracker: React.FC<SleepTrackerProps> = ({ entries, onAddEntry }) => {
  const [showEntryForm, setShowEntryForm] = useState(false);
  
  const todayEntry = entries.find(entry => entry.date === getTodayFormatted());
  const weekDates = getPastWeekDates();
  
  const weekEntries = weekDates.map(date => 
    entries.find(entry => entry.date === date)
  ).filter(Boolean) as SleepEntry[];
  
  const avgSleep = weekEntries.length > 0
    ? weekEntries.reduce((sum, entry) => sum + entry.hours, 0) / weekEntries.length
    : 0;
  
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Sleep Tracker</h1>
        {!showEntryForm && !todayEntry && (
          <button
            onClick={() => setShowEntryForm(true)}
            className="flex items-center justify-center h-10 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
            aria-label="Log sleep"
          >
            <Plus size={18} className="mr-1" />
            <span>Log Sleep</span>
          </button>
        )}
      </div>
      
      {showEntryForm ? (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100 animate-fadeIn">
          <SleepEntryForm 
            initialEntry={todayEntry}
            onSubmit={(entry) => {
              onAddEntry(entry);
              setShowEntryForm(false);
            }}
            onCancel={() => setShowEntryForm(false)}
          />
        </div>
      ) : todayEntry ? (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Today's Sleep</h2>
            <button
              onClick={() => setShowEntryForm(true)}
              className="text-sm text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
            >
              Edit
            </button>
          </div>
          
          <div className="flex items-center justify-center py-4">
            <div className="flex items-end">
              <span className="text-4xl font-medium text-indigo-600">{todayEntry.hours}</span>
              <span className="text-xl text-gray-600 ml-1 mb-1">hours</span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-center">
            <div className={`px-3 py-1 rounded-full text-sm ${
              todayEntry.quality === 'excellent' ? 'bg-green-100 text-green-800' :
              todayEntry.quality === 'good' ? 'bg-blue-100 text-blue-800' :
              todayEntry.quality === 'fair' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {todayEntry.quality.charAt(0).toUpperCase() + todayEntry.quality.slice(1)} quality
            </div>
          </div>
          
          {todayEntry.note && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">{todayEntry.note}</p>
            </div>
          )}
        </div>
      ) : null}
      
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Weekly Overview</h2>
        
        <SleepStats avgSleep={avgSleep} entries={weekEntries} />
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Past 7 Days</span>
            <span className="text-sm text-gray-500">
              Avg: <span className="font-medium">{avgSleep.toFixed(1)} hrs</span>
            </span>
          </div>
          
          <div className="flex items-end justify-between h-32">
            {weekDates.map(date => {
              const entry = entries.find(e => e.date === date);
              const percentage = entry ? (entry.hours / 12) * 100 : 0;
              
              return (
                <div key={date} className="flex flex-col items-center flex-1">
                  <div className="flex-grow flex items-end w-full px-1">
                    <div 
                      className={`w-full rounded-t transition-all duration-500 ease-out ${
                        entry ? (
                          entry.quality === 'excellent' ? 'bg-green-400' :
                          entry.quality === 'good' ? 'bg-blue-400' :
                          entry.quality === 'fair' ? 'bg-yellow-400' :
                          'bg-red-400'
                        ) : 'bg-gray-200'
                      }`}
                      style={{ height: `${percentage}%` }}
                    >
                      {entry && (
                        <div className="flex justify-center text-white text-xs font-medium pt-1">
                          {entry.hours}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs mt-1 text-gray-500">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {entries.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Sleep Logs</h2>
          
          <div className="space-y-3">
            {entries.slice(0, 5).map(entry => (
              <div 
                key={entry.id} 
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <Moon size={18} className="text-indigo-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-800">{getDisplayDate(entry.date)}</div>
                    <div className="text-sm text-gray-500">
                      {entry.hours} hours • {entry.quality.charAt(0).toUpperCase() + entry.quality.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SleepTracker;