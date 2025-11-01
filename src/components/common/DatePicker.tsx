// src/components/common/DatePicker.tsx

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from './Modal';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get starting day of week (0 = Sunday)
  const startingDayOfWeek = monthStart.getDay();
  
  // Pad the start with empty cells
  const paddingDays = Array(startingDayOfWeek).fill(null);

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleToday = () => {
    const today = new Date();
    onChange(today);
    setCurrentMonth(today);
    setIsOpen(false);
  };

  return (
    <>
      <div>
        {label && (
          <label className="block text-sm font-medium text-dark-700 mb-2">
            {label}
          </label>
        )}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-dark-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none bg-white text-dark-900 text-left relative"
        >
          <Calendar className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
          <span>{format(value, 'MMM dd, yyyy')}</span>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Select Date">
        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-dark-50 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-dark-900">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-dark-50 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-dark-500 py-2">
                {day}
              </div>
            ))}
            
            {/* Padding days */}
            {paddingDays.map((_, index) => (
              <div key={`pad-${index}`} />
            ))}
            
            {/* Calendar days */}
            {daysInMonth.map((day) => {
              const isSelected = isSameDay(day, value);
              const isTodayDate = isToday(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);

              return (
                <button
                  key={day.toString()}
                  onClick={() => handleDateSelect(day)}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-primary-600 text-white'
                      : isTodayDate
                      ? 'bg-primary-50 text-primary-600 border-2 border-primary-600'
                      : isCurrentMonth
                      ? 'hover:bg-dark-50 text-dark-900'
                      : 'text-dark-300'
                  }`}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-4 border-t border-dark-100">
            <button
              onClick={handleToday}
              className="flex-1 py-2.5 px-4 bg-dark-50 hover:bg-dark-100 text-dark-900 rounded-lg font-medium transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
