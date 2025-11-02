// src/screens/GoalsScreen.tsx

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionContext';
import { GoalList } from '../components/goals/GoalList';
import { AddGoalModal } from '../components/goals/AddGoalModal';
import { ContributeModal } from '../components/goals/ContributeModal';
import { Goal } from '../types';

export const GoalsScreen: React.FC = () => {
    const { user } = useAuth();
    const { goals, addGoal, updateGoal } = useTransactions();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showContributeModal, setShowContributeModal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    const formatAmount = (amount: number) => {
        if (!user) return amount.toString();

        return new Intl.NumberFormat('sv-SE', {
            style: 'currency',
            currency: user.currency,
            minimumFractionDigits: 0
        }).format(amount);
    };

    const calculateProgress = (current: number, target: number) => {
        return Math.min((current / target) * 100, 100);
    };

    const handleCreateGoal = (goalData: any) => {
        addGoal({
            title: goalData.title,
            description: goalData.description,
            targetAmount: parseFloat(goalData.targetAmount),
            currentAmount: 0,
            deadline: new Date(goalData.deadline),
            category: goalData.category,
            icon: goalData.icon,
            color: goalData.color,
            priority: goalData.priority
        });
    };

    const handleAddMoney = (goal: Goal) => {
        setSelectedGoal(goal);
        setShowContributeModal(true);
    };

    const handleContribute = (amount: number) => {
        if (!selectedGoal) return;

        const newAmount = Math.min(
            selectedGoal.currentAmount + amount,
            selectedGoal.targetAmount
        );

        updateGoal(selectedGoal.id, {
            currentAmount: newAmount,
            completed: newAmount >= selectedGoal.targetAmount,
            completedAt: newAmount >= selectedGoal.targetAmount ? new Date() : undefined
        });

        setShowContributeModal(false);
        setSelectedGoal(null);
    };

    const handleEdit = (goal: Goal) => {
        // TODO: Implement edit functionality
        console.log('Edit goal:', goal);
    };

    const activeGoals = goals.filter(g => !g.completed);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white px-6 pt-12 pb-8 shadow-large">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Goals</h1>
                        <p className="text-primary-100">Track your financial dreams</p>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-4 py-2">
                        <div className="text-xs text-primary-100">Total Target</div>
                        <div className="text-xl font-bold">
                            {formatAmount(goals.reduce((sum, g) => sum + g.targetAmount, 0))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-3">
                        <div className="text-2xl font-bold">{activeGoals.length}</div>
                        <div className="text-xs text-primary-100">Active</div>
                    </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-3">
                        <div className="text-2xl font-bold">
                            {goals.filter(g => g.completed).length}
                        </div>
                        <div className="text-xs text-primary-100">Completed</div>
                    </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-3">
                        <div className="text-2xl font-bold">
                            {goals.length > 0
                                ? Math.round(
                                    goals.reduce((sum, g) => sum + calculateProgress(g.currentAmount, g.targetAmount), 0) /
                                    goals.length
                                )
                                : 0}%
                        </div>
                        <div className="text-xs text-primary-100">Avg Progress</div>
                    </div>
                </div>
            </div>

            {/* Goal List */}
            <div className="px-6 py-6">
                <GoalList
                    goals={goals}
                    onAddMoney={handleAddMoney}
                    onEdit={handleEdit}
                    onCreateGoal={() => setShowAddModal(true)}
                    formatAmount={formatAmount}
                />
            </div>

            {/* Floating Add Button */}
            {activeGoals.length > 0 && (
                <button
                    onClick={() => setShowAddModal(true)}
                    className="fixed bottom-24 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-large hover:bg-primary-700 transition-all hover:scale-110 flex items-center justify-center z-40"
                >
                    <Plus className="w-6 h-6" />
                </button>
            )}

            {/* Modals */}
            <AddGoalModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleCreateGoal}
            />

            <ContributeModal
                isOpen={showContributeModal}
                goal={selectedGoal}
                onClose={() => {
                    setShowContributeModal(false);
                    setSelectedGoal(null);
                }}
                onSubmit={handleContribute}
            />
        </div>
    );
};