import React, { useEffect, useState } from 'react';
import { Droplets } from 'lucide-react';

interface WaterProgressProps {
  cups: number;
  goal: number;
}

const WaterProgress: React.FC<WaterProgressProps> = ({ cups, goal }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const percentage = (cups / goal) * 100;
    
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [cups, goal]);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600 text-sm">
          {cups} of {goal} cups
        </span>
        <span className="text-sm font-medium text-blue-600">
          {Math.round((cups / goal) * 100)}%
        </span>
      </div>
      
      <div className="relative h-6 bg-blue-100 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ease-out flex items-center justify-end"
          style={{ width: `${Math.min(animatedPercentage, 100)}%` }}
        >
          {cups > 0 && animatedPercentage > 15 && (
            <Droplets size={16} className="text-white mr-2" />
          )}
        </div>
      </div>
      
      <div className="mt-1 text-xs text-gray-500 text-center">
        {cups >= goal ? (
          "Great job! You've reached your daily goal!"
        ) : (
          `${goal - cups} more ${goal - cups === 1 ? 'cup' : 'cups'} to go`
        )}
      </div>
    </div>
  );
};

export default WaterProgress;