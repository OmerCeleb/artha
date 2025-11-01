// src/components/onboarding/WelcomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { ArrowRight, TrendingUp, PieChart, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <TrendingUp className="w-16 h-16 text-primary-600" />,
      title: 'Track Every Transaction',
      description: 'Monitor your spending habits and income streams with ease'
    },
    {
      icon: <PieChart className="w-16 h-16 text-primary-600" />,
      title: 'Visualize Your Money',
      description: 'Beautiful charts and insights to understand your finances'
    },
    {
      icon: <Target className="w-16 h-16 text-primary-600" />,
      title: 'Achieve Your Goals',
      description: 'Set targets and watch your savings grow over time'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip button */}
      <div className="p-6 flex justify-end">
        <button
          onClick={onGetStarted}
          className="text-sm text-dark-500 hover:text-dark-900 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Icon */}
        <div className="mb-8 animate-scale-in">
          {slides[currentSlide].icon}
        </div>

        {/* Title & Description */}
        <div className="text-center mb-12 max-w-sm animate-fade-in">
          <h1 className="text-3xl font-bold text-dark-900 mb-3">
            {slides[currentSlide].title}
          </h1>
          <p className="text-dark-600 text-lg leading-relaxed">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center gap-2 mb-16">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-primary-600'
                  : 'w-2 bg-dark-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 pb-8">
        <Button
          onClick={onGetStarted}
          fullWidth
          size="lg"
          className="bg-primary-600 hover:bg-primary-700 text-white"
          icon={<ArrowRight className="w-5 h-5" />}
        >
          Get Started
        </Button>
        <p className="text-center text-xs text-dark-500 mt-4">
          Free forever • No credit card required
        </p>
      </div>
    </div>
  );
};
