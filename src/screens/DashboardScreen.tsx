// src/screens/DashboardScreen.tsx

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateTotalIncome, calculateTotalExpense, calculateBalance, filterTransactionsByMonth } from '../utils/calculations';
import { formatCurrency } from '../utils/currency';
import { formatRelativeDate } from '../utils/date';
import { TransactionType } from '../types';
import { getCategoryById } from '../config/categories';

interface DashboardScreenProps {
  onAddTransaction: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onAddTransaction }) => {
  const { user } = useAuth();
  const { transactions } = useTransactions();

  // Calculate current month stats
  const currentMonthTransactions = filterTransactionsByMonth(transactions, new Date());
  const totalIncome = calculateTotalIncome(currentMonthTransactions);
  const totalExpense = calculateTotalExpense(currentMonthTransactions);
  const balance = calculateBalance(transactions);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="p-6 pb-4">
        <p className="text-sm text-dark-600 mb-1">Good morning,</p>
        <h1 className="text-2xl font-bold text-dark-900">{user?.name}</h1>
      </div>

      {/* Balance Card */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
          <div className="mb-4">
            <p className="text-primary-100 text-sm mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold">
              {user && formatCurrency(balance, user.currency)}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <p className="text-xs text-primary-100">Income</p>
              </div>
              <p className="text-lg font-semibold">
                {user && formatCurrency(totalIncome, user.currency)}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4" />
                <p className="text-xs text-primary-100">Expenses</p>
              </div>
              <p className="text-lg font-semibold">
                {user && formatCurrency(totalExpense, user.currency)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <Button
          onClick={onAddTransaction}
          fullWidth
          size="lg"
          className="bg-dark-900 hover:bg-dark-800 text-white"
          icon={<Plus className="w-5 h-5" />}
        >
          Add Transaction
        </Button>
      </div>

      {/* Recent Transactions */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-dark-900">Recent</h3>
          {transactions.length > 5 && (
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              See All
            </button>
          )}
        </div>

        {recentTransactions.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-5xl mb-4">💰</div>
            <p className="text-dark-900 font-semibold mb-1">No transactions yet</p>
            <p className="text-sm text-dark-600">
              Start tracking by adding your first transaction
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentTransactions.map((transaction) => {
              const category = getCategoryById(transaction.categoryId);
              const isIncome = transaction.type === TransactionType.INCOME;
              
              return (
                <Card key={transaction.id} padding="none" hover>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        isIncome ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        {category?.icon || '💰'}
                      </div>
                      <div>
                        <p className="font-semibold text-dark-900">
                          {transaction.description || category?.name || 'Transaction'}
                        </p>
                        <p className="text-sm text-dark-600">
                          {formatRelativeDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        isIncome ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isIncome ? '+' : '-'}
                        {user && formatCurrency(transaction.amount, user.currency)}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
