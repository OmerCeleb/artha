// src/config/constants.ts

export const APP_CONFIG = {
  name: 'FinanceFlow',
  tagline: 'Smart Money Tracking',
  version: '1.0.0'
};

export const SUBSCRIPTION_PLANS = {
  monthly: {
    id: 'monthly_premium',
    name: 'Monthly Premium',
    price: 4.99,
    currency: 'USD',
    interval: 'month',
    features: [
      'Unlimited transactions',
      'Advanced analytics',
      'Custom categories',
      'Export data',
      'Priority support',
      'Ad-free experience'
    ]
  },
  yearly: {
    id: 'yearly_premium',
    name: 'Yearly Premium',
    price: 49.99,
    currency: 'USD',
    interval: 'year',
    features: [
      'All Monthly features',
      'Save 17%',
      'Early access to features',
      'Exclusive badges'
    ]
  }
};

export const FREE_PLAN_LIMITS = {
  maxTransactions: 50,
  maxGoals: 3,
  analyticsMonths: 3
};
