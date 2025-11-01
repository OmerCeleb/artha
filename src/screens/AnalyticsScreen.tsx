// src/screens/AnalyticsScreen.tsx

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionContext';
import { Card } from '../components/common/Card';
import { TrendingUp, TrendingDown, PieChart, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { getCategoryById } from '../config/categories';
import { TransactionType } from '../types';
import { 
  filterTransactionsByMonth, 
  calculateTotalIncome, 
  calculateTotalExpense,
  groupTransactionsByCategory 
} from '../utils/calculations';
import { format, subMonths } from 'date-fns';

export const AnalyticsScreen: React.FC = () => {
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Filter transactions for selected month
  const monthTransactions = filterTransactionsByMonth(transactions, selectedMonth);
  const totalIncome = calculateTotalIncome(monthTransactions);
  const totalExpense = calculateTotalExpense(monthTransactions);
  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  // Group by category
  const expenseTransactions = monthTransactions.filter(t => t.type === TransactionType.EXPENSE);
  const incomeTransactions = monthTransactions.filter(t => t.type === TransactionType.INCOME);
  const expensesByCategory = groupTransactionsByCategory(expenseTransactions);
  const incomeByCategory = groupTransactionsByCategory(incomeTransactions);

  // Calculate category totals
  const expenseCategoryTotals = Object.entries(expensesByCategory).map(([categoryId, txns]) => ({
    categoryId,
    total: txns.reduce((sum, t) => sum + t.amount, 0),
    count: txns.length
  })).sort((a, b) => b.total - a.total);

  const incomeCategoryTotals = Object.entries(incomeByCategory).map(([categoryId, txns]) => ({
    categoryId,
    total: txns.reduce((sum, t) => sum + t.amount, 0),
    count: txns.length
  })).sort((a, b) => b.total - a.total);

  // Month navigation
  const handlePrevMonth = () => setSelectedMonth(subMonths(selectedMonth, 1));
  const handleNextMonth = () => setSelectedMonth(new Date()); // Can't go beyond current month
  const isCurrentMonth = format(selectedMonth, 'yyyy-MM') === format(new Date(), 'yyyy-MM');

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-2xl font-bold text-dark-900 mb-1">Analytics</h1>
        <p className="text-sm text-dark-600">Track your spending patterns</p>
      </div>

      {/* Month Selector */}
      <div className="px-6 mb-6">
        <Card padding="sm">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-dark-50 rounded-lg transition-colors"
            >
              <Calendar className="w-5 h-5 text-dark-600" />
            </button>
            <div className="text-center">
              <p className="text-lg font-bold text-dark-900">
                {format(selectedMonth, 'MMMM yyyy')}
              </p>
            </div>
            <button
              onClick={handleNextMonth}
              disabled={isCurrentMonth}
              className="p-2 hover:bg-dark-50 rounded-lg transition-colors disabled:opacity-30"
            >
              <Calendar className="w-5 h-5 text-dark-600" />
            </button>
          </div>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="px-6 mb-6 grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <p className="text-xs text-green-100">Income</p>
          </div>
          <p className="text-2xl font-bold">
            {user && formatCurrency(totalIncome, user.currency)}
          </p>
          <p className="text-xs text-green-100 mt-1">
            {incomeTransactions.length} transactions
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4" />
            <p className="text-xs text-red-100">Expenses</p>
          </div>
          <p className="text-2xl font-bold">
            {user && formatCurrency(totalExpense, user.currency)}
          </p>
          <p className="text-xs text-red-100 mt-1">
            {expenseTransactions.length} transactions
          </p>
        </Card>
      </div>

      {/* Net Savings */}
      <div className="px-6 mb-6">
        <Card className={`${netSavings >= 0 ? 'bg-gradient-to-br from-primary-500 to-primary-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1">Net Savings</p>
              <p className="text-3xl font-bold">
                {user && formatCurrency(netSavings, user.currency)}
              </p>
              <p className="text-sm text-white/80 mt-2">
                Savings Rate: {savingsRate}%
              </p>
            </div>
            <div className="text-5xl opacity-20">
              {netSavings >= 0 ? '📈' : '📉'}
            </div>
          </div>
        </Card>
      </div>

      {/* Expense Breakdown */}
      {expenseCategoryTotals.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-dark-900" />
            <h2 className="text-lg font-bold text-dark-900">Top Expenses</h2>
          </div>

          <div className="space-y-3">
            {expenseCategoryTotals.slice(0, 5).map((item) => {
              const category = getCategoryById(item.categoryId);
              const percentage = totalExpense > 0 ? Math.round((item.total / totalExpense) * 100) : 0;

              return (
                <Card key={item.categoryId} padding="sm" hover>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl">
                        {category?.icon || '💰'}
                      </div>
                      <div>
                        <p className="font-semibold text-dark-900">
                          {category?.name || 'Unknown'}
                        </p>
                        <p className="text-xs text-dark-600">
                          {item.count} {item.count === 1 ? 'transaction' : 'transactions'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-dark-900">
                        {user && formatCurrency(item.total, user.currency)}
                      </p>
                      <p className="text-xs text-dark-600">{percentage}%</p>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-dark-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Income Breakdown */}
      {incomeCategoryTotals.length > 0 && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-dark-900 mb-4">Income Sources</h2>

          <div className="space-y-3">
            {incomeCategoryTotals.map((item) => {
              const category = getCategoryById(item.categoryId);
              const percentage = totalIncome > 0 ? Math.round((item.total / totalIncome) * 100) : 0;

              return (
                <Card key={item.categoryId} padding="sm" hover>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                        {category?.icon || '💰'}
                      </div>
                      <div>
                        <p className="font-semibold text-dark-900">
                          {category?.name || 'Unknown'}
                        </p>
                        <p className="text-xs text-dark-600">
                          {item.count} {item.count === 1 ? 'transaction' : 'transactions'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-dark-900">
                        {user && formatCurrency(item.total, user.currency)}
                      </p>
                      <p className="text-xs text-dark-600">{percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-dark-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {monthTransactions.length === 0 && (
        <div className="px-6">
          <Card className="text-center py-12">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-dark-900 font-semibold mb-1">No data for this month</p>
            <p className="text-sm text-dark-600">
              Add transactions to see your analytics
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};
