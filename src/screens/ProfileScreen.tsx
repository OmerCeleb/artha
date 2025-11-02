// src/screens/ProfileScreen.tsx

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionContext';
import {
    User,
    Settings,
    Award,
    TrendingUp,
    LogOut,
    ChevronRight,
    Edit2
} from 'lucide-react';
import { CURRENCIES } from '../config/currencies';
import { getLevelInfo } from '../config/levels';

export const ProfileScreen: React.FC = () => {
    const { user, logout, updateUser } = useAuth();
    const { transactions, goals } = useTransactions();
    const [showSettings, setShowSettings] = useState(false);

    if (!user) return null;

    const levelInfo = getLevelInfo(user.level.level);
    const progress = (user.level.currentXP / user.level.xpToNextLevel) * 100;

    // Calculate stats
    const totalTransactions = transactions.length;
    const activeGoals = goals.filter(g => !g.completed).length;
    const completedGoals = goals.filter(g => g.completed).length;

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white px-6 pt-12 pb-24">
                <h1 className="text-2xl font-bold mb-2">Profile</h1>
                <p className="text-primary-100">Manage your account</p>
            </div>

            {/* Profile Card - Overlapping */}
            <div className="px-6 -mt-16">
                <div className="bg-white rounded-2xl shadow-large p-6">
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <Edit2 className="w-4 h-4 text-dark-600" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-dark-900">{user.name}</h2>
                            {user.email && (
                                <p className="text-sm text-dark-600">{user.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Level Progress */}
                    <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{levelInfo.icon}</span>
                                <div>
                                    <div className="text-sm font-medium text-dark-700">Level {user.level.level}</div>
                                    <div className="text-xs text-dark-500">{levelInfo.title}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-primary-600">{user.level.totalXP} XP</div>
                                <div className="text-xs text-dark-500">{user.level.xpToNextLevel} to next</div>
                            </div>
                        </div>
                        <div className="h-2 bg-white rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-dark-900">{totalTransactions}</div>
                            <div className="text-xs text-dark-600">Transactions</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-dark-900">{activeGoals}</div>
                            <div className="text-xs text-dark-600">Active Goals</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-dark-900">{completedGoals}</div>
                            <div className="text-xs text-dark-600">Completed</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="px-6 mt-6 space-y-4">
                {/* Achievements */}
                <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between hover:shadow-medium transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="text-left">
                            <div className="font-semibold text-dark-900">Achievements</div>
                            <div className="text-sm text-dark-600">View your badges</div>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-dark-400" />
                </button>

                {/* Statistics */}
                <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between hover:shadow-medium transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <div className="font-semibold text-dark-900">Statistics</div>
                            <div className="text-sm text-dark-600">Your financial insights</div>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-dark-400" />
                </button>

                {/* Settings */}
                <button
                    onClick={() => setShowSettings(true)}
                    className="w-full bg-white rounded-2xl p-4 flex items-center justify-between hover:shadow-medium transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Settings className="w-6 h-6 text-dark-600" />
                        </div>
                        <div className="text-left">
                            <div className="font-semibold text-dark-900">Settings</div>
                            <div className="text-sm text-dark-600">Preferences & privacy</div>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-dark-400" />
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center justify-between hover:bg-red-100 transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <LogOut className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="text-left">
                            <div className="font-semibold text-red-700">Logout</div>
                            <div className="text-sm text-red-600">Sign out of your account</div>
                        </div>
                    </div>
                </button>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <SettingsModal
                    user={user}
                    onClose={() => setShowSettings(false)}
                    onUpdate={updateUser}
                />
            )}
        </div>
    );
};

// Settings Modal Component
interface SettingsModalProps {
    user: any;
    onClose: () => void;
    onUpdate: (updates: any) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ user, onClose, onUpdate }) => {
    const [selectedCurrency, setSelectedCurrency] = useState(user.currency);

    const handleSave = () => {
        onUpdate({ currency: selectedCurrency });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

                <h3 className="text-2xl font-bold text-dark-900 mb-6">Settings</h3>

                {/* Currency Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark-700 mb-3">
                        Currency
                    </label>
                    <div className="space-y-2">
                        {CURRENCIES.map((currency) => (
                            <button
                                key={currency.code}
                                onClick={() => setSelectedCurrency(currency.code)}
                                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                                    selectedCurrency === currency.code
                                        ? 'border-primary-600 bg-primary-50'
                                        : 'border-dark-200 hover:border-dark-300'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{currency.flag}</span>
                                    <div>
                                        <div className="font-semibold text-dark-900">{currency.code}</div>
                                        <div className="text-sm text-dark-600">{currency.name}</div>
                                    </div>
                                </div>
                                <span className="text-lg font-bold text-dark-700">{currency.symbol}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme (Coming Soon) */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark-700 mb-3">
                        Theme
                    </label>
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                        <p className="text-sm text-dark-600">Coming soon...</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-dark-100 text-dark-700 py-3 rounded-xl font-semibold hover:bg-dark-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};