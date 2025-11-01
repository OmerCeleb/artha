// src/services/storage.ts - LocalStorage Service

import { Transaction, Goal, User } from '../types';

const STORAGE_KEYS = {
    USER: 'finance_app_user',
    TRANSACTIONS: 'finance_app_transactions',
    GOALS: 'finance_app_goals',
    ONBOARDING: 'finance_app_onboarding_complete'
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const safeStringify = (data: any): string => {
    try {
        return JSON.stringify(data);
    } catch (error) {
        console.error('Error stringifying data:', error);
        return '{}';
    }
};

const safeParse = <T>(data: string | null, fallback: T): T => {
    if (!data) return fallback;
    try {
        return JSON.parse(data) as T;
    } catch (error) {
        console.error('Error parsing data:', error);
        return fallback;
    }
};

// ============================================
// USER STORAGE
// ============================================

export const saveUser = (user: User): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.USER, safeStringify(user));
    } catch (error) {
        console.error('Error saving user:', error);
    }
};

export const getUser = (): User | null => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USER);
        return safeParse<User | null>(data, null);
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

export const clearUser = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
        console.error('Error clearing user:', error);
    }
};

// ============================================
// TRANSACTION STORAGE
// ============================================

export const saveTransactions = (transactions: Transaction[]): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, safeStringify(transactions));
    } catch (error) {
        console.error('Error saving transactions:', error);
    }
};

export const getTransactions = (): Transaction[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        return safeParse<Transaction[]>(data, []);
    } catch (error) {
        console.error('Error getting transactions:', error);
        return [];
    }
};

export const addTransaction = (transaction: Transaction): void => {
    try {
        const transactions = getTransactions();
        transactions.push(transaction);
        saveTransactions(transactions);
    } catch (error) {
        console.error('Error adding transaction:', error);
    }
};

export const updateTransaction = (id: string, updates: Partial<Transaction>): void => {
    try {
        const transactions = getTransactions();
        const index = transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            transactions[index] = { ...transactions[index], ...updates };
            saveTransactions(transactions);
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
    }
};

export const deleteTransaction = (id: string): void => {
    try {
        const transactions = getTransactions();
        const filtered = transactions.filter(t => t.id !== id);
        saveTransactions(filtered);
    } catch (error) {
        console.error('Error deleting transaction:', error);
    }
};

// ============================================
// GOAL STORAGE
// ============================================

export const saveGoals = (goals: Goal[]): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.GOALS, safeStringify(goals));
    } catch (error) {
        console.error('Error saving goals:', error);
    }
};

export const getGoals = (): Goal[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.GOALS);
        return safeParse<Goal[]>(data, []);
    } catch (error) {
        console.error('Error getting goals:', error);
        return [];
    }
};

export const addGoal = (goal: Goal): void => {
    try {
        const goals = getGoals();
        goals.push(goal);
        saveGoals(goals);
    } catch (error) {
        console.error('Error adding goal:', error);
    }
};

export const updateGoal = (id: string, updates: Partial<Goal>): void => {
    try {
        const goals = getGoals();
        const index = goals.findIndex(g => g.id === id);
        if (index !== -1) {
            goals[index] = { ...goals[index], ...updates };
            saveGoals(goals);
        }
    } catch (error) {
        console.error('Error updating goal:', error);
    }
};

export const deleteGoal = (id: string): void => {
    try {
        const goals = getGoals();
        const filtered = goals.filter(g => g.id !== id);
        saveGoals(filtered);
    } catch (error) {
        console.error('Error deleting goal:', error);
    }
};

// ============================================
// ONBOARDING STATUS
// ============================================

export const setOnboardingComplete = (complete: boolean): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.ONBOARDING, String(complete));
    } catch (error) {
        console.error('Error setting onboarding status:', error);
    }
};

export const isOnboardingComplete = (): boolean => {
    try {
        return localStorage.getItem(STORAGE_KEYS.ONBOARDING) === 'true';
    } catch (error) {
        console.error('Error checking onboarding status:', error);
        return false;
    }
};

// ============================================
// CLEAR ALL DATA
// ============================================

export const clearAllData = (): void => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error('Error clearing all data:', error);
    }
};