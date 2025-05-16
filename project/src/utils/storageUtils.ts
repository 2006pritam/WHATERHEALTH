import { AppState } from '../types';

const STORAGE_KEY = 'health-tracker-data';

const defaultState: AppState = {
  moodEntries: [],
  waterEntries: [],
  sleepEntries: [],
  activityEntries: [],
  waterGoal: 8,
  activeTab: 'mood'
};

export const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return defaultState;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return defaultState;
  }
};

export const saveState = (state: AppState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};