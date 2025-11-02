// src/components/goals/GoalDatePicker.tsx

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface GoalDatePickerProps {
    value: string;
    onChange: (date: string) => void;
}

export const GoalDatePicker: React.FC<GoalDatePickerProps> = ({ value, onChange }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => {
        if (value) return new Date(value);
        return new Date();
    });

    const quickOptions = [
        { label: '3 Months', months: 3 },
        { label: '6 Months', months: 6 },
        { label: '1 Year', months: 12 }
    ];

    const handleQuickSelect = (months: number) => {
        const date = new Date();
        date.setMonth(date.getMonth() + months);
        onChange(date.toISOString().split('T')[0]);
        setShowCalendar(false);
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDateSelect = (day: number) => {
        const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        onChange(selected.toISOString().split('T')[0]);
        setShowCalendar(false);
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const today = new Date();
    const selectedDate = value ? new Date(value) : null;

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return 'Select deadline';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const isDateDisabled = (day: number) => {
        const date = new Date(year, month, day);
        return date < today;
    };

    const isDateSelected = (day: number) => {
        if (!selectedDate) return false;
        return (
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year
        );
    };

    const isToday = (day: number) => {
        return (
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year
        );
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
                Deadline *
            </label>

            {/* Quick Select Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-3">
                {quickOptions.map((option) => (
                    <button
                        key={option.label}
                        type="button"
                        onClick={() => handleQuickSelect(option.months)}
                        className="py-2.5 rounded-xl font-medium text-sm transition-all bg-dark-100 text-dark-700 hover:bg-dark-200"
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Date Display Button */}
            <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full px-4 py-3 border-2 border-dark-200 rounded-xl focus:border-primary-500 transition-colors text-left flex items-center justify-between hover:border-dark-300"
            >
        <span className={value ? 'text-dark-900' : 'text-dark-400'}>
          {formatDisplayDate(value)}
        </span>
                <Calendar className="w-5 h-5 text-dark-400" />
            </button>

            {/* Calendar Dropdown */}
            {showCalendar && (
                <div className="mt-2 p-4 bg-white border-2 border-dark-200 rounded-xl shadow-medium animate-scale-in">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-dark-600" />
                        </button>
                        <h3 className="font-semibold text-dark-900">
                            {monthNames[month]} {year}
                        </h3>
                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-dark-600" />
                        </button>
                    </div>

                    {/* Day Names */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map((day) => (
                            <div
                                key={day}
                                className="text-center text-xs font-medium text-dark-500 py-1"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {/* Empty cells for days before month starts */}
                        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                            <div key={`empty-${index}`} />
                        ))}

                        {/* Actual days */}
                        {Array.from({ length: daysInMonth }).map((_, index) => {
                            const day = index + 1;
                            const disabled = isDateDisabled(day);
                            const selected = isDateSelected(day);
                            const isCurrentDay = isToday(day);

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => !disabled && handleDateSelect(day)}
                                    disabled={disabled}
                                    className={`
                    aspect-square p-2 rounded-lg text-sm font-medium transition-all
                    ${disabled ? 'text-dark-300 cursor-not-allowed' : 'hover:bg-dark-100 cursor-pointer'}
                    ${selected ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
                    ${isCurrentDay && !selected ? 'border-2 border-primary-600 text-primary-600' : ''}
                    ${!disabled && !selected && !isCurrentDay ? 'text-dark-900' : ''}
                  `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    {/* Today Button */}
                    <button
                        type="button"
                        onClick={() => {
                            const todayStr = today.toISOString().split('T')[0];
                            onChange(todayStr);
                            setShowCalendar(false);
                        }}
                        className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        Select Today
                    </button>
                </div>
            )}

            {/* Selected Date Display */}
            {value && (
                <p className="text-xs text-primary-600 mt-2 font-medium">
                    Goal deadline: {formatDisplayDate(value)}
                </p>
            )}
        </div>
    );
};