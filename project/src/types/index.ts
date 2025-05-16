export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  note?: string;
}

export interface WaterEntry {
  id: string;
  date: string;
  cups: number;
  goal: number;
}

export interface SleepEntry {
  id: string;
  date: string;
  hours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  note?: string;
}

export interface ActivityItem {
  id: string;
  name: string;
  duration: number;
  completed: boolean;
}

export interface ActivityEntry {
  id: string;
  date: string;
  activities: ActivityItem[];
  completed: boolean;
}

export type TrackingType = 'mood' | 'water' | 'sleep' | 'activity';

export interface AppState {
  moodEntries: MoodEntry[];
  waterEntries: WaterEntry[];
  sleepEntries: SleepEntry[];
  activityEntries: ActivityEntry[];
  waterGoal: number;
  activeTab: TrackingType;
}