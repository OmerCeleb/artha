// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Currency, Language, UserLevel } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { saveUser, getUser, clearUser } from '../services/storage';

interface AuthContextType {
    user: User | null;
    login: (userData: Partial<User>) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    updateLevel: (levelUpdates: Partial<UserLevel>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = getUser();
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = (userData: Partial<User>) => {
        const newUser: User = {
            id: userData.id || uuidv4(),
            name: userData.name || 'Guest User',
            email: userData.email,
            avatar: userData.avatar,
            currency: userData.currency || Currency.USD,
            language: userData.language || Language.EN,
            createdAt: new Date(),
            preferences: {
                theme: 'light',
                notifications: {
                    enabled: true,
                    dailyReminder: true,
                    goalReminder: true,
                    budgetAlert: true
                },
                privacy: {
                    showBalance: true,
                    requireAuth: false
                }
            },
            level: {
                level: 1,
                currentXP: 0,
                xpToNextLevel: 100,
                totalXP: 0,
                streak: 0,
                achievements: []
            }
        };

        setUser(newUser);
        saveUser(newUser);
    };

    const logout = () => {
        setUser(null);
        clearUser();
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        saveUser(updatedUser);
    };

    const updateLevel = (levelUpdates: Partial<UserLevel>) => {
        if (!user) return;

        const updatedUser = {
            ...user,
            level: { ...user.level, ...levelUpdates }
        };
        setUser(updatedUser);
        saveUser(updatedUser);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateUser,
                updateLevel,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};