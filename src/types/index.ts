// src/types/index.ts - Ana Type Definitions

// ============================================
// ENUMS
// ============================================

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

export enum Language {
    EN = 'en',
    SV = 'sv',
    TR = 'tr'
}

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    SEK = 'SEK',
    TRY = 'TRY',
    GBP = 'GBP'
}

export enum CategoryType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

// ============================================
// TRANSACTION TYPES
// ============================================

export interface Transaction {
    id: string;
    userId: string;
    type: TransactionType;
    amount: number;
    category: string;
    categoryId: string;
    description: string;
    date: Date;
    createdAt: Date;
    updatedAt?: Date;
    tags?: string[];
    recurring?: RecurringInfo;
}

export interface RecurringInfo {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    nextDate?: Date;
    endDate?: Date;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    type: CategoryType;
    budget?: number;
    translations: {
        en: string;
        sv: string;
        tr: string;
    };
}

// ============================================
// GOAL TYPES
// ============================================

export interface Goal {
    id: string;
    userId: string;
    title: string;
    description?: string;
    targetAmount: number;
    currentAmount: number;
    startDate: Date;
    deadline: Date;
    category: string;
    color: string;
    icon: string;
    completed: boolean;
    completedAt?: Date;
    priority: 'low' | 'medium' | 'high';
}

export interface GoalContribution {
    id: string;
    goalId: string;
    amount: number;
    date: Date;
    note?: string;
}

// ============================================
// USER & AUTH TYPES
// ============================================

export interface User {
    id: string;
    email?: string;
    name: string;
    avatar?: string;
    currency: Currency;
    language: Language;
    createdAt: Date;
    preferences: UserPreferences;
    level: UserLevel;
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    notifications: {
        enabled: boolean;
        dailyReminder: boolean;
        goalReminder: boolean;
        budgetAlert: boolean;
    };
    privacy: {
        showBalance: boolean;
        requireAuth: boolean;
    };
}

// ============================================
// LEVEL & GAMIFICATION TYPES
// ============================================

export interface UserLevel {
    level: number;
    currentXP: number;
    xpToNextLevel: number;
    totalXP: number;
    streak: number;
    lastActivityDate?: Date;
    achievements: Achievement[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'transactions' | 'goals' | 'streak' | 'savings' | 'special';
    xpReward: number;
    unlocked: boolean;
    unlockedAt?: Date;
    progress?: number;
    requirement: number;
}

export interface XPReward {
    amount: number;
    reason: string;
    type: 'transaction' | 'goal' | 'streak' | 'achievement';
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface MonthlyStats {
    month: string;
    totalIncome: number;
    totalExpense: number;
    netSavings: number;
    transactionCount: number;
    categoryBreakdown: CategoryStats[];
}

export interface CategoryStats {
    categoryId: string;
    categoryName: string;
    amount: number;
    percentage: number;
    transactionCount: number;
    trend: 'up' | 'down' | 'stable';
}

export interface SpendingTrend {
    date: string;
    amount: number;
    category?: string;
}

export interface BudgetAlert {
    id: string;
    categoryId: string;
    categoryName: string;
    budgetLimit: number;
    currentSpending: number;
    percentage: number;
    severity: 'warning' | 'danger' | 'critical';
}

// ============================================
// APP STATE TYPES
// ============================================

export interface AppState {
    user: User | null;
    transactions: Transaction[];
    categories: Category[];
    goals: Goal[];
    isLoading: boolean;
    error: string | null;
}

export interface TransactionFilters {
    type?: TransactionType;
    category?: string;
    dateFrom?: Date;
    dateTo?: Date;
    minAmount?: number;
    maxAmount?: number;
    searchQuery?: string;
}

// ============================================
// FORM TYPES
// ============================================

export interface TransactionFormData {
    type: TransactionType;
    amount: string;
    category: string;
    description: string;
    date: Date;
    recurring?: RecurringInfo;
}

export interface GoalFormData {
    title: string;
    description: string;
    targetAmount: string;
    deadline: Date;
    category: string;
    priority: 'low' | 'medium' | 'high';
}

// ============================================
// UTILITY TYPES
// ============================================

export type SortDirection = 'asc' | 'desc';

export interface DashboardStats {
    currentBalance: number;
    monthlyIncome: number;
    monthlyExpense: number;
    savingsRate: number;
}