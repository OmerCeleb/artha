// src/config/initialGoals.ts

import { Goal } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const getInitialGoals = (userId: string): Goal[] => {
    const now = new Date();
    const threeMonthsLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    const sixMonthsLater = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
    const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

    return [
        {
            id: uuidv4(),
            userId: userId,
            title: 'Emergency Fund',
            description: 'Build 6 months of expenses for financial security',
            targetAmount: 50000,
            currentAmount: 12500,
            startDate: now,
            deadline: oneYearLater,
            category: 'emergency',
            color: 'red',
            icon: '🆘',
            completed: false,
            priority: 'high'
        },
        {
            id: uuidv4(),
            userId: userId,
            title: 'Summer Vacation',
            description: 'Trip to Greece with family',
            targetAmount: 15000,
            currentAmount: 5500,
            startDate: now,
            deadline: sixMonthsLater,
            category: 'vacation',
            color: 'blue',
            icon: '✈️',
            completed: false,
            priority: 'medium'
        },
        {
            id: uuidv4(),
            userId: userId,
            title: 'New Laptop',
            description: 'MacBook Pro for work',
            targetAmount: 25000,
            currentAmount: 8000,
            startDate: now,
            deadline: threeMonthsLater,
            category: 'purchase',
            color: 'amber',
            icon: '💻',
            completed: false,
            priority: 'medium'
        }
    ];
};