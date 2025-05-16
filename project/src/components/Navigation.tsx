import React from 'react';
import { Smile, Droplets, Moon, Activity } from 'lucide-react';
import { TrackingType } from '../types';

interface NavigationProps {
  activeTab: TrackingType;
  setActiveTab: (tab: TrackingType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TrackingType; label: string; icon: React.ReactNode }[] = [
    { id: 'mood', label: 'Mood', icon: <Smile size={20} /> },
    { id: 'water', label: 'Water', icon: <Droplets size={20} /> },
    { id: 'sleep', label: 'Sleep', icon: <Moon size={20} /> },
    { id: 'activity', label: 'Activity', icon: <Activity size={20} /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:top-0 md:bottom-auto md:h-16 z-10">
      <div className="flex justify-around items-center h-16 max-w-3xl mx-auto px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
              activeTab === tab.id 
                ? 'text-blue-500 font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label={tab.label}
          >
            <div className="flex items-center justify-center">
              {tab.icon}
            </div>
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;