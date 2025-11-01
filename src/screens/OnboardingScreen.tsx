// src/screens/OnboardingScreen.tsx

import React, { useState } from 'react';
import { WelcomeScreen } from '../components/onboarding/WelcomeScreen';
import { AuthScreen } from '../components/onboarding/AuthScreen';
import { CurrencySelect } from '../components/onboarding/CurrencySelect';
import { Currency } from '../types';

interface OnboardingScreenProps {
  onComplete: (data: {
    provider: string;
    email?: string;
    currency: Currency;
  }) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'auth' | 'currency'>('welcome');
  const [authData, setAuthData] = useState<{ provider: string; email?: string } | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

  const handleGetStarted = () => {
    setStep('auth');
  };

  const handleAuth = (provider: 'apple' | 'google' | 'email', email?: string) => {
    setAuthData({ provider, email });
    setStep('currency');
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
  };

  const handleComplete = () => {
    if (authData && selectedCurrency) {
      onComplete({
        ...authData,
        currency: selectedCurrency
      });
    }
  };

  switch (step) {
    case 'welcome':
      return <WelcomeScreen onGetStarted={handleGetStarted} />;
    
    case 'auth':
      return (
        <AuthScreen
          onAuth={handleAuth}
          onBack={() => setStep('welcome')}
        />
      );
    
    case 'currency':
      return (
        <CurrencySelect
          selected={selectedCurrency}
          onSelect={handleCurrencySelect}
          onContinue={handleComplete}
        />
      );
    
    default:
      return null;
  }
};
