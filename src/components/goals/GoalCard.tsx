// src/components/goals/GoalCard.tsx

import React from 'react';
import { Calendar, Plus, Edit } from 'lucide-react';
import { Goal } from '../../types';
import { GoalProgress } from './GoalProgress';

interface GoalCardProps {
    goal: Goal;
    onAddMoney: (goal: Goal) => void;
    onEdit: (goal: Goal) => void;
    formatAmount: (amount: number) => string;
}

const GOAL_CATEGORIES = [
    { id: 'savings', name: 'Savings', icon: '💰' },
    { id: 'vacation', name: 'Vacation', icon: '✈️' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'emergency', name: 'Emergency Fund', icon: '🆘' },
    { id: 'purchase', name: 'Big Purchase', icon: '🛍️' },
    { id: 'debt', name: 'Debt Payment', icon: '💳' }
];

export const GoalCard: React.FC<GoalCardProps> = ({
                                                      goal,
                                                      onAddMoney,
                                                      onEdit,
                                                      formatAmount
                                                  }) => {
    const getDaysRemaining = (deadline: Date) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diff = deadlineDate.getTime() - today.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; badge: string }> = {
            red: { bg: 'bg-red-50', badge: 'bg-red-100 text-red-700' },
            blue: { bg: 'bg-primary-50', badge: 'bg-primary-100 text-primary-700' },
            purple: { bg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-700' },
            amber: { bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700' },
            green: { bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' }
        };
        return colors[color] || colors.blue;
    };

    const daysLeft = getDaysRemaining(goal.deadline);
    const category = GOAL_CATEGORIES.find(c => c.id === goal.category);
    const colorClasses = getColorClasses(goal.color);

    return (
        <div className="card-minimal p-5 animate-fade-in">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${colorClasses.bg}`}>
                        {goal.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-dark-900 text-lg">{goal.title}</h3>
                        {goal.description && (
                            <p className="text-sm text-dark-600 mt-1">{goal.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
              <span className={`text-xs px-2 py-1 rounded-lg font-medium ${colorClasses.badge}`}>
                {category?.name}
              </span>
                            <span className="text-xs text-dark-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                                {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
              </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="mb-4">
                <GoalProgress
                    current={goal.currentAmount}
                    target={goal.targetAmount}
                    color={goal.color as any}
                    formatAmount={formatAmount}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => onAddMoney(goal)}
                    className="flex-1 bg-primary-600 text-white py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Money
                </button>
                <button
                    onClick={() => onEdit(goal)}
                    className="w-12 h-12 bg-dark-100 rounded-xl flex items-center justify-center hover:bg-dark-200 transition-colors"
                >
                    <Edit className="w-5 h-5 text-dark-600" />
                </button>
            </div>
        </div>
    );
};