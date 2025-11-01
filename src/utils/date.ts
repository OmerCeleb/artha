// src/utils/date.ts

import { format, formatDistance, isToday, isYesterday, startOfMonth, endOfMonth } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd, yyyy');
};

export const formatDateShort = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd');
};

export const formatRelativeDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  
  return formatDistance(d, new Date(), { addSuffix: true });
};

export const getMonthRange = (date: Date = new Date()) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};
