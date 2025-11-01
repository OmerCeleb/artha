// src/utils/currency.ts

import { Currency } from '../types';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.SEK]: 'kr',
  [Currency.TRY]: '₺',
  [Currency.GBP]: '£'
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.abs(amount));

  if (currency === Currency.SEK) {
    return `${formatted} ${symbol}`;
  }

  return `${symbol}${formatted}`;
};

export const parseCurrencyInput = (value: string): number => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
