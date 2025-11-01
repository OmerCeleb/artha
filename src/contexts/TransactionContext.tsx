// src/contexts/TransactionContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Goal } from '../types';
import { v4 as uuidv4 } from 'uuid';
import {
  getTransactions,
  addTransaction as addTransactionToStorage,
  updateTransaction as updateTransactionInStorage,
  deleteTransaction as deleteTransactionFromStorage,
  getGoals,
  addGoal as addGoalToStorage,
  updateGoal as updateGoalInStorage,
  deleteGoal as deleteGoalFromStorage
} from '../services/storage';
import { useAuth } from './AuthContext';
import { XP_REWARDS } from '../config/levels';

interface TransactionContextType {
  transactions: Transaction[];
  goals: Goal[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'userId' | 'startDate' | 'completed'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  completeGoal: (id: string) => void;
  isLoading: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, updateLevel } = useAuth();

  useEffect(() => {
    const loadedTransactions = getTransactions();
    const loadedGoals = getGoals();
    setTransactions(loadedTransactions);
    setGoals(loadedGoals);
    setIsLoading(false);
  }, []);

  const addXP = (amount: number) => {
    if (!user) return;
    
    const newTotalXP = user.level.totalXP + amount;
    updateLevel({
      totalXP: newTotalXP,
      currentXP: user.level.currentXP + amount
    });
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newTransaction: Transaction = {
      ...transactionData,
      id: uuidv4(),
      userId: user.id,
      createdAt: new Date()
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    addTransactionToStorage(newTransaction);

    addXP(XP_REWARDS.TRANSACTION_ADD);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
    );
    setTransactions(updatedTransactions);
    updateTransactionInStorage(id, updates);
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    deleteTransactionFromStorage(id);
  };

  const addGoal = (goalData: Omit<Goal, 'id' | 'userId' | 'startDate' | 'completed'>) => {
    if (!user) return;

    const newGoal: Goal = {
      ...goalData,
      id: uuidv4(),
      userId: user.id,
      startDate: new Date(),
      completed: false
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    addGoalToStorage(newGoal);

    addXP(XP_REWARDS.GOAL_CREATE);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    const updatedGoals = goals.map(g => 
      g.id === id ? { ...g, ...updates } : g
    );
    setGoals(updatedGoals);
    updateGoalInStorage(id, updates);
  };

  const deleteGoal = (id: string) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    deleteGoalFromStorage(id);
  };

  const completeGoal = (id: string) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    updateGoal(id, { 
      completed: true, 
      completedAt: new Date(),
      currentAmount: goal.targetAmount
    });

    addXP(XP_REWARDS.GOAL_COMPLETE);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        goals,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        completeGoal,
        isLoading
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
};
