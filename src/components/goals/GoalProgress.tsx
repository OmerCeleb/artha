// src/components/goals/GoalProgress.tsx
import React from 'react';

interface GoalProgressProps {
    current: number;
    target: number;
    color?: 'blue' | 'red' | 'green' | 'purple' | 'amber';
    showPercentage?: boolean;
    formatAmount?: (amount: number) => string;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({
                                                              current,
                                                              target,
                                                              color = 'blue',
                                                              showPercentage = true,
                                                              formatAmount = (amount) => amount.toString()
                                                          }) => {
    const progress = Math.min((current / target) * 100, 100);

    const colorClasses = {
        blue: { progress: 'bg-primary-500', text: 'text-primary-600' },
        red: { progress: 'bg-red-500', text: 'text-red-600' },
        green: { progress: 'bg-emerald-500', text: 'text-emerald-600' },
        purple: { progress: 'bg-purple-500', text: 'text-purple-600' },
        amber: { progress: 'bg-amber-500', text: 'text-amber-600' }
    };

    const classes = colorClasses[color];

    return (
        <div>
            {/* Amount Labels */}
            <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-semibold text-dark-700">
          {formatAmount(current)}
        </span>
                <span className="text-dark-500">
          of {formatAmount(target)}
        </span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-dark-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${classes.progress}`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Percentage */}
            {showPercentage && (
                <div className="text-right mt-1">
          <span className={`text-sm font-semibold ${classes.text}`}>
            {Math.round(progress)}%
          </span>
                </div>
            )}
        </div>
    );
};