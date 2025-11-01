// src/components/onboarding/CurrencySelect.tsx

import React from 'react';
import { Currency } from '../../types';
import { CURRENCIES } from '../../config/currencies';
import { Button } from '../common/Button';
import { Check, ArrowRight } from 'lucide-react';

interface CurrencySelectProps {
  selected: Currency | null;
  onSelect: (currency: Currency) => void;
  onContinue: () => void;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  selected,
  onSelect,
  onContinue
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 p-6 pt-12">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10 max-w-sm mx-auto">
          <div className="flex-1 h-1 bg-primary-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-primary-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-dark-200 rounded-full"></div>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 mb-2">
              Select Currency
            </h2>
            <p className="text-dark-600">
              Choose your primary currency for tracking
            </p>
          </div>

          <div className="space-y-2">
            {CURRENCIES.map((currency) => (
              <button
                key={currency.code}
                onClick={() => onSelect(currency.code)}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  selected === currency.code
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-dark-200 hover:border-dark-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currency.flag}</span>
                    <div>
                      <p className="font-semibold text-dark-900">
                        {currency.code}
                      </p>
                      <p className="text-sm text-dark-600">
                        {currency.name}
                      </p>
                    </div>
                  </div>
                  {selected === currency.code && (
                    <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-dark-100">
        <Button
          onClick={onContinue}
          disabled={!selected}
          fullWidth
          size="lg"
          className="bg-primary-600 hover:bg-primary-700 text-white"
          icon={<ArrowRight className="w-5 h-5" />}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
