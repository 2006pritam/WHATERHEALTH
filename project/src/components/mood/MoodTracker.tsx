import React, { useState } from 'react';
import { Plus, Info } from 'lucide-react';
import { MoodEntry } from '../../types';
import { getTodayFormatted, getDisplayDate } from '../../utils/dateUtils';
import MoodSelector from './MoodSelector';
import MoodCalendar from './MoodCalendar';

interface MoodTrackerProps {
  entries: MoodEntry[];
  onAddEntry: (entry: MoodEntry) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ entries, onAddEntry }) => {
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) return;
    
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: getTodayFormatted(),
      mood: selectedMood,
      note: note.trim() || undefined
    };
    
    onAddEntry(newEntry);
    setShowEntryForm(false);
    setSelectedMood('');
    setNote('');
  };
  
  const todayEntry = entries.find(entry => entry.date === getTodayFormatted());
  
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Mood Tracker</h1>
        {!showEntryForm && !todayEntry && (
          <button
            onClick={() => setShowEntryForm(true)}
            className="flex items-center justify-center h-10 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            aria-label="Add mood entry"
          >
            <Plus size={18} className="mr-1" />
            <span>Today</span>
          </button>
        )}
      </div>
      
      {showEntryForm ? (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100 animate-fadeIn">
          <h2 className="text-lg font-medium text-gray-800 mb-4">How are you feeling today?</h2>
          
          <form onSubmit={handleSubmit}>
            <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
            
            <div className="mt-4">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                Add a note (optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                rows={3}
                placeholder="Write something about how you're feeling..."
              />
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={() => setShowEntryForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedMood}
                className={`px-4 py-2 rounded-md text-white transition-colors duration-200 ${
                  selectedMood ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : todayEntry ? (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-gray-800">Today's Mood</h2>
            <span className="text-sm text-gray-500">{getDisplayDate(todayEntry.date)}</span>
          </div>
          
          <div className="flex items-center justify-center py-4">
            <span className="text-5xl">{todayEntry.mood}</span>
          </div>
          
          {todayEntry.note && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <div className="flex items-start">
                <Info size={16} className="text-gray-400 mr-2 mt-0.5" />
                <p className="text-sm text-gray-600">{todayEntry.note}</p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowEntryForm(true)}
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Update Today's Entry
          </button>
        </div>
      ) : null}
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Mood Calendar</h2>
        <MoodCalendar entries={entries} />
      </div>
    </div>
  );
};

export default MoodTracker;