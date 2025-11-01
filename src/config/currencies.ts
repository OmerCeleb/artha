// src/config/currencies.ts

import { Currency } from '../types';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: Currency.USD, symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: Currency.EUR, symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: Currency.SEK, symbol: 'kr', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: Currency.TRY, symbol: '₺', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: Currency.GBP, symbol: '£', name: 'British Pound', flag: '🇬🇧' }
];

export const getCurrencyInfo = (code: Currency): CurrencyInfo | undefined => {
  return CURRENCIES.find(c => c.code === code);
};
