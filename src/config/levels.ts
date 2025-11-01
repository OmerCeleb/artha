// src/config/levels.ts

import { Achievement } from '../types';

export const XP_REWARDS = {
    TRANSACTION_ADD: 10,
    GOAL_CREATE: 25,
    GOAL_COMPLETE: 100,
    DAILY_STREAK: 5,
    WEEKLY_STREAK: 30,
    MONTHLY_STREAK: 100
};

export interface LevelInfo {
    level: number;
    xpRequired: number;
    title: string;
    icon: string;
    color: string;
    translations: { en: string; sv: string; tr: string };
}

export const LEVEL_SYSTEM: LevelInfo[] = [
    { level: 1, xpRequired: 0, title: 'Beginner', icon: '🌱', color: '#86efac', translations: { en: 'Beginner', sv: 'Nybörjare', tr: 'Başlangıç' }},
    { level: 2, xpRequired: 100, title: 'Novice', icon: '🌿', color: '#4ade80', translations: { en: 'Novice', sv: 'Novis', tr: 'Acemi' }},
    { level: 3, xpRequired: 250, title: 'Learner', icon: '🍃', color: '#22c55e', translations: { en: 'Learner', sv: 'Lärling', tr: 'Öğrenci' }},
    { level: 4, xpRequired: 500, title: 'Saver', icon: '💚', color: '#16a34a', translations: { en: 'Saver', sv: 'Sparare', tr: 'Tasarrufçu' }},
    { level: 5, xpRequired: 1000, title: 'Planner', icon: '📊', color: '#15803d', translations: { en: 'Planner', sv: 'Planerare', tr: 'Planlayıcı' }},
    { level: 6, xpRequired: 1750, title: 'Tracker', icon: '🎯', color: '#3b82f6', translations: { en: 'Tracker', sv: 'Spårare', tr: 'Takipçi' }},
    { level: 7, xpRequired: 2750, title: 'Analyst', icon: '📈', color: '#2563eb', translations: { en: 'Analyst', sv: 'Analytiker', tr: 'Analist' }},
    { level: 8, xpRequired: 4000, title: 'Expert', icon: '⭐', color: '#1d4ed8', translations: { en: 'Expert', sv: 'Expert', tr: 'Uzman' }},
    { level: 9, xpRequired: 6000, title: 'Master', icon: '👑', color: '#7c3aed', translations: { en: 'Master', sv: 'Mästare', tr: 'Usta' }},
    { level: 10, xpRequired: 10000, title: 'Legend', icon: '🏆', color: '#f59e0b', translations: { en: 'Legend', sv: 'Legend', tr: 'Efsane' }}
];

export const ACHIEVEMENTS: Achievement[] = [
    { id: 'first_transaction', title: 'First Step', description: 'Add your first transaction', icon: '🎉', category: 'transactions', xpReward: 50, unlocked: false, requirement: 1 },
    { id: 'ten_transactions', title: 'Getting Started', description: 'Add 10 transactions', icon: '📝', category: 'transactions', xpReward: 100, unlocked: false, requirement: 10 },
    { id: 'first_goal', title: 'Dreamer', description: 'Create your first goal', icon: '🎯', category: 'goals', xpReward: 50, unlocked: false, requirement: 1 },
    { id: 'complete_goal', title: 'Achiever', description: 'Complete a goal', icon: '✅', category: 'goals', xpReward: 150, unlocked: false, requirement: 1 },
    { id: 'week_streak', title: 'Week Warrior', description: '7 day streak', icon: '🔥', category: 'streak', xpReward: 100, unlocked: false, requirement: 7 }
];

export const getLevelInfo = (level: number): LevelInfo => {
    return LEVEL_SYSTEM.find(l => l.level === level) || LEVEL_SYSTEM[0];
};

export const calculateLevel = (totalXP: number): { level: number; currentXP: number; xpToNextLevel: number } => {
    let level = 1;
    let xpForCurrentLevel = 0;

    for (let i = LEVEL_SYSTEM.length - 1; i >= 0; i--) {
        if (totalXP >= LEVEL_SYSTEM[i].xpRequired) {
            level = LEVEL_SYSTEM[i].level;
            xpForCurrentLevel = LEVEL_SYSTEM[i].xpRequired;
            break;
        }
    }

    const nextLevel = LEVEL_SYSTEM.find(l => l.level === level + 1);
    const xpToNextLevel = nextLevel ? nextLevel.xpRequired - totalXP : 0;
    const currentXP = totalXP - xpForCurrentLevel;

    return { level, currentXP, xpToNextLevel };
};