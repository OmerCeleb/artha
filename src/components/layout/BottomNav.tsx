// src/components/layout/BottomNav.tsx

import React from 'react';
import { Home, TrendingUp, Target, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'dashboard' | 'analytics' | 'goals' | 'profile';
  onTabChange: (tab: 'dashboard' | 'analytics' | 'goals' | 'profile') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard' as const, icon: Home, label: 'Home' },
    { id: 'analytics' as const, icon: TrendingUp, label: 'Analytics' },
    { id: 'goals' as const, icon: Target, label: 'Goals' },
    { id: 'profile' as const, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-40">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
