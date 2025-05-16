import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface WaterIntakeInputProps {
  cups: number;
  goal: number;
  onAddCup: () => void;
  onRemoveCup: () => void;
  onSetCups: (cups: number) => void;
}

const WaterIntakeInput: React.FC<WaterIntakeInputProps> = ({
  cups,
  goal,
  onAddCup,
  onRemoveCup,
  onSetCups
}) => {
  const handleQuickSet = (percentage: number) => {
    const newCups = Math.round(goal * percentage);
    onSetCups(newCups);
  };
  
  return (
    <div className="mt-6">
      <div className="flex justify-center mb-4">
        <button
          onClick={onRemoveCup}
          disabled={cups <= 0}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            cups <= 0 
              ? 'bg-gray-200 cursor-not-allowed' 
              : 'bg-blue-100 hover:bg-blue-200 transition-colors duration-200'
          }`}
          aria-label="Remove cup"
        >
          <Minus size={20} className={cups <= 0 ? 'text-gray-400' : 'text-blue-500'} />
        </button>
        
        <div className="flex mx-4 overflow-x-auto no-scrollbar">
          {Array.from({ length: goal }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSetCups(index + 1)}
              className={`w-8 h-12 mx-1 rounded-lg transition-colors duration-200 ${
                index < cups 
                  ? 'bg-blue-500' 
                  : 'bg-blue-100'
              }`}
              aria-label={`Cup ${index + 1}`}
            >
              <div 
                className={`h-8 mt-2 mx-auto w-5 rounded-b ${
                  index < cups ? 'bg-blue-200' : 'bg-white'
                }`}
              ></div>
            </button>
          ))}
        </div>
        
        <button
          onClick={onAddCup}
          disabled={cups >= goal}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            cups >= goal 
              ? 'bg-gray-200 cursor-not-allowed' 
              : 'bg-blue-100 hover:bg-blue-200 transition-colors duration-200'
          }`}
          aria-label="Add cup"
        >
          <Plus size={20} className={cups >= goal ? 'text-gray-400' : 'text-blue-500'} />
        </button>
      </div>
      
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => handleQuickSet(0.25)}
          className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors duration-200"
        >
          25%
        </button>
        <button
          onClick={() => handleQuickSet(0.5)}
          className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors duration-200"
        >
          50%
        </button>
        <button
          onClick={() => handleQuickSet(0.75)}
          className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors duration-200"
        >
          75%
        </button>
        <button
          onClick={() => handleQuickSet(1)}
          className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors duration-200"
        >
          100%
        </button>
      </div>
    </div>
  );
};

export default WaterIntakeInput;