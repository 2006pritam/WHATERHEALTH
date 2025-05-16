import React from 'react';

interface MoodSelectorProps {
  selectedMood: string;
  onSelect: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
  const moods = [
    { emoji: '😀', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '🤒', label: 'Sick' }
  ];
  
  return (
    <div className="grid grid-cols-4 gap-3">
      {moods.map((mood) => (
        <button
          key={mood.emoji}
          type="button"
          onClick={() => onSelect(mood.emoji)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
            selectedMood === mood.emoji
              ? 'bg-blue-100 border-2 border-blue-500 transform scale-105'
              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
          }`}
          aria-label={mood.label}
        >
          <span className="text-2xl mb-1">{mood.emoji}</span>
          <span className="text-xs text-gray-600">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;