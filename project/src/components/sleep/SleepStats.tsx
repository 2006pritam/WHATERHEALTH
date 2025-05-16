import React from 'react';
import { Moon, ThumbsUp, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { SleepEntry } from '../../types';

interface SleepStatsProps {
  avgSleep: number;
  entries: SleepEntry[];
}

const SleepStats: React.FC<SleepStatsProps> = ({ avgSleep, entries }) => {
  if (entries.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <Moon size={32} className="mx-auto text-indigo-300 mb-2" />
        <p>No sleep data available yet.</p>
        <p className="text-sm mt-1">Log your sleep to see statistics.</p>
      </div>
    );
  }
  
  const qualityCounts = entries.reduce((acc, entry) => {
    acc[entry.quality] = (acc[entry.quality] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const bestQuality = Object.entries(qualityCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  
  const sortedByHours = [...entries].sort((a, b) => b.hours - a.hours);
  const mostSleep = sortedByHours[0]?.hours || 0;
  const leastSleep = sortedByHours[sortedByHours.length - 1]?.hours || 0;
  
  const stats = [
    {
      label: 'Average',
      value: `${avgSleep.toFixed(1)} hrs`,
      icon: <Clock size={18} className="text-indigo-400" />,
      color: 'bg-indigo-50 text-indigo-800'
    },
    {
      label: 'Most',
      value: `${mostSleep} hrs`,
      icon: <ArrowUp size={18} className="text-green-500" />,
      color: 'bg-green-50 text-green-800'
    },
    {
      label: 'Least',
      value: `${leastSleep} hrs`,
      icon: <ArrowDown size={18} className="text-red-500" />,
      color: 'bg-red-50 text-red-800'
    },
    {
      label: 'Best Quality',
      value: bestQuality ? bestQuality.charAt(0).toUpperCase() + bestQuality.slice(1) : 'N/A',
      icon: <ThumbsUp size={18} className="text-blue-500" />,
      color: 'bg-blue-50 text-blue-800'
    }
  ];
  
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className={`p-3 rounded-lg ${stat.color}`}>
          <div className="flex items-center mb-1">
            {stat.icon}
            <span className="ml-1 text-sm font-medium">{stat.label}</span>
          </div>
          <div className="text-lg font-semibold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SleepStats;