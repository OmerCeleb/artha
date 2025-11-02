// src/components/goals/ContributeModal.tsx

import React, { useState } from 'react';
import { Goal } from '../../types';

interface ContributeModalProps {
    isOpen: boolean;
    goal: Goal | null;
    onClose: () => void;
    onSubmit: (amount: number) => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
                                                                    isOpen,
                                                                    goal,
                                                                    onClose,
                                                                    onSubmit
                                                                }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) return;

        onSubmit(numAmount);
        setAmount('');
    };

    const handleClose = () => {
        setAmount('');
        onClose();
    };

    if (!isOpen || !goal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up shadow-large">
                <div className="w-12 h-1 bg-dark-300 rounded-full mx-auto mb-6" />

                <h3 className="text-2xl font-bold text-dark-900 mb-2">Add Money</h3>
                <p className="text-dark-600 mb-6">Contribute to: {goal.title}</p>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                        Amount
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            min="0"
                            step="10"
                            className="w-full text-2xl font-bold border-2 border-dark-200 rounded-xl px-4 py-4 focus:border-primary-500 focus:outline-none transition-colors"
                            autoFocus
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-dark-400">
              kr
            </span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleClose}
                        className="flex-1 bg-dark-100 text-dark-700 py-3 rounded-xl font-semibold hover:bg-dark-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};