// src/components/goals/AddGoalModal.tsx

import { useState } from 'react';
import { X } from 'lucide-react';
import { GoalDatePicker } from './GoalDatePicker';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (goalData: GoalFormData) => void;
}

interface GoalFormData {
    title: string;
    description: string;
    targetAmount: string;
    deadline: string;
    category: string;
    icon: string;
    color: string;
    priority: 'low' | 'medium' | 'high';
}

const GOAL_CATEGORIES = [
    { id: 'savings', name: 'Savings', icon: '💰', color: 'green' },
    { id: 'vacation', name: 'Vacation', icon: '✈️', color: 'blue' },
    { id: 'education', name: 'Education', icon: '📚', color: 'purple' },
    { id: 'emergency', name: 'Emergency Fund', icon: '🆘', color: 'red' },
    { id: 'purchase', name: 'Big Purchase', icon: '🛍️', color: 'amber' },
    { id: 'debt', name: 'Debt Payment', icon: '💳', color: 'blue' }
];

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
                                                              isOpen,
                                                              onClose,
                                                              onSubmit
                                                          }) => {
    const [formData, setFormData] = useState<GoalFormData>({
        title: '',
        description: '',
        targetAmount: '',
        deadline: '',
        category: 'savings',
        icon: '💰',
        color: 'green',
        priority: 'medium'
    });

    const handleCategoryChange = (categoryId: string) => {
        const category = GOAL_CATEGORIES.find(c => c.id === categoryId);
        if (category) {
            setFormData({
                ...formData,
                category: categoryId,
                icon: category.icon,
                color: category.color
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.targetAmount || !formData.deadline) {
            return;
        }
        onSubmit(formData);
        setFormData({
            title: '',
            description: '',
            targetAmount: '',
            deadline: '',
            category: 'savings',
            icon: '💰',
            color: 'green',
            priority: 'medium'
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in shadow-large">
                <div className="sticky top-0 bg-white border-b border-dark-100 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-dark-900">Create New Goal</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-dark-100 hover:bg-dark-200 transition-colors flex items-center justify-center"
                    >
                        <X className="w-5 h-5 text-dark-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Goal Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Emergency Fund"
                            className="w-full px-4 py-3 border-2 border-dark-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="What is this goal for?"
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-dark-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Category *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {GOAL_CATEGORIES.map(category => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={`p-3 rounded-xl border-2 transition-all ${
                                        formData.category === category.id
                                            ? 'border-primary-500 bg-primary-50'
                                            : 'border-dark-200 hover:border-dark-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-1">{category.icon}</div>
                                    <div className="text-xs font-medium text-dark-700">{category.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Target Amount */}
                    <div>
                        <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Target Amount *
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={formData.targetAmount}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setFormData({ ...formData, targetAmount: value });
                                }}
                                placeholder="0"
                                className="w-full px-4 py-3 border-2 border-dark-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                required
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 font-medium">
                kr
              </span>
                        </div>
                    </div>

                    {/* Deadline with GoalDatePicker */}
                    <GoalDatePicker
                        value={formData.deadline}
                        onChange={(date) => setFormData({ ...formData, deadline: date })}
                    />

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-semibold text-dark-700 mb-2">
                            Priority
                        </label>
                        <div className="flex gap-2">
                            {['low', 'medium', 'high'].map(priority => (
                                <button
                                    key={priority}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, priority: priority as any })}
                                    className={`flex-1 py-2 rounded-xl font-medium capitalize transition-all ${
                                        formData.priority === priority
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                                    }`}
                                >
                                    {priority}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-semibold bg-dark-100 text-dark-700 hover:bg-dark-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-xl font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                        >
                            Create Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};