// src/components/goals/GoalList.tsx

import React from 'react';
import { Award, Check } from 'lucide-react';
import { Goal } from '../../types';
import { GoalCard } from './GoalCard';

interface GoalListProps {
    goals: Goal[];
    onAddMoney: (goal: Goal) => void;
    onEdit: (goal: Goal) => void;
    onCreateGoal: () => void;
    formatAmount: (amount: number) => string;
}

export const GoalList: React.FC<GoalListProps> = ({
                                                      goals,
                                                      onAddMoney,
                                                      onEdit,
                                                      onCreateGoal,
                                                      formatAmount
                                                  }) => {
    const activeGoals = goals.filter(g => !g.completed);
    const completedGoals = goals.filter(g => g.completed);

    return (
        <div className="space-y-6">
            {/* Active Goals */}
            <div>
                <h2 className="text-xl font-bold text-dark-900 mb-4">Active Goals</h2>

                {activeGoals.length === 0 ? (
                    <div className="card-minimal p-8 text-center">
                        <div className="text-6xl mb-4">🎯</div>
                        <h3 className="text-lg font-semibold text-dark-900 mb-2">No active goals yet</h3>
                        <p className="text-dark-600 mb-4">Start by creating your first financial goal</p>
                        <button
                            onClick={onCreateGoal}
                            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Create Goal
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activeGoals.map(goal => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onAddMoney={onAddMoney}
                                onEdit={onEdit}
                                formatAmount={formatAmount}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Completed Goals */}
            {completedGoals.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-dark-900 mb-4 flex items-center gap-2">
                        <Award className="w-6 h-6 text-amber-500" />
                        Completed Goals
                    </h2>
                    <div className="space-y-3">
                        {completedGoals.map(goal => (
                            <div
                                key={goal.id}
                                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 shadow-soft"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{goal.icon}</div>
                                        <div>
                                            <h3 className="font-semibold text-dark-900">{goal.title}</h3>
                                            <p className="text-sm text-dark-600">{formatAmount(goal.targetAmount)}</p>
                                        </div>
                                    </div>
                                    <Check className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};