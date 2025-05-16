import React from 'react';
import { MoodEntry } from '../../types';

interface MoodCalendarProps {
  entries: MoodEntry[];
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ entries }) => {
  // Get current month and year
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get first day of month and total days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const monthName = today.toLocaleString('default', { month: 'long' });
  
  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Empty cells for days before the 1st of the month
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split('T')[0];
    const entry = entries.find(e => e.date === dateString);
    
    calendarDays.push({
      day,
      date: dateString,
      entry
    });
  }
  
  // Fill out the last row if needed
  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  for (let i = calendarDays.length; i < totalCells; i++) {
    calendarDays.push(null);
  }
  
  return (
    <div className="overflow-hidden">
      <div className="text-center mb-4">
        <h3 className="font-medium">{monthName} {currentYear}</h3>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayData, index) => {
          if (!dayData) {
            return <div key={`empty-${index}`} className="h-10 rounded-full"></div>;
          }
          
          const isToday = dayData.date === today.toISOString().split('T')[0];
          const { day, entry } = dayData;
          
          return (
            <div 
              key={`day-${day}`}
              className={`h-10 flex items-center justify-center relative ${
                isToday ? 'font-bold' : ''
              }`}
            >
              {entry ? (
                <div 
                  className="w-10 h-10 flex items-center justify-center rounded-full text-sm transition-transform duration-200 hover:scale-110 cursor-pointer"
                  title={entry.note || entry.mood}
                >
                  {entry.mood}
                </div>
              ) : (
                <span className={`text-sm ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodCalendar;