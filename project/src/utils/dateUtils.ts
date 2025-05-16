export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getTodayFormatted = (): string => {
  return formatDate(new Date());
};

export const getDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getDaysOfWeek = (): string[] => {
  const today = new Date();
  const result: string[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    result.push(formatDate(date));
  }
  
  return result;
};

export const isToday = (dateString: string): boolean => {
  return dateString === getTodayFormatted();
};

export const getPastWeekDates = (): string[] => {
  return getDaysOfWeek();
};