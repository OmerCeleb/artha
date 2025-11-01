// src/utils/calculations.ts

import { Transaction, TransactionType } from '../types';

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpense = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateBalance = (transactions: Transaction[]): number => {
  return calculateTotalIncome(transactions) - calculateTotalExpense(transactions);
};

export const calculateSavingsRate = (income: number, expense: number): number => {
  if (income === 0) return 0;
  return Math.round(((income - expense) / income) * 100);
};

export const filterTransactionsByMonth = (transactions: Transaction[], date: Date): Transaction[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  return transactions.filter(t => {
    const tDate = new Date(t.date);
    return tDate.getFullYear() === year && tDate.getMonth() === month;
  });
};

export const groupTransactionsByCategory = (transactions: Transaction[]): Record<string, Transaction[]> => {
  return transactions.reduce((acc, transaction) => {
    const category = transaction.categoryId;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);
};
