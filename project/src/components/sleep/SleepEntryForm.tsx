import React, { useState } from 'react';
import { SleepEntry } from '../../types';
import { getTodayFormatted } from '../../utils/dateUtils';

interface SleepEntryFormProps {
  initialEntry?: SleepEntry;
  onSubmit: (entry: SleepEntry) => void;
  onCancel: () => void;
}

const SleepEntryForm: React.FC<SleepEntryFormProps> = ({ 
  initialEntry, 
  onSubmit, 
  onCancel 
}) => {
  const [hours, setHours] = useState(initialEntry?.hours || 7);
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>(
    initialEntry?.quality || 'good'
  );
  const [note, setNote] = useState(initialEntry?.note || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: SleepEntry = {
      id: initialEntry?.id || Date.now().toString(),
      date: getTodayFormatted(),
      hours,
      quality,
      note: note.trim() || undefined
    };
    
    onSubmit(newEntry);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        {initialEntry ? 'Edit Sleep Entry' : 'Log Your Sleep'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
          How many hours did you sleep?
        </label>
        <div className="flex items-center">
          <input
            type="range"
            id="hours"
            min="0"
            max="12"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="flex-grow accent-indigo-500"
          />
          <span className="ml-4 font-medium text-indigo-600 min-w-[3rem] text-center">
            {hours} hrs
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sleep Quality
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['poor', 'fair', 'good', 'excellent'] as const).map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setQuality(q)}
              className={`py-2 px-1 rounded-md text-sm transition-colors duration-200 ${
                quality === q
                  ? q === 'excellent' ? 'bg-green-100 text-green-800 border-2 border-green-500' :
                    q === 'good' ? 'bg-blue-100 text-blue-800 border-2 border-blue-500' :
                    q === 'fair' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500' :
                    'bg-red-100 text-red-800 border-2 border-red-500'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {q.charAt(0).toUpperCase() + q.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          rows={3}
          placeholder="Any notes about your sleep..."
        />
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
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors duration-200"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SleepEntryForm;