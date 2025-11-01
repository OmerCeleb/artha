// src/config/categories.ts

import { Category, CategoryType } from '../types';

export { CategoryType };

export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'Food & Dining',
    icon: '🍽️',
    color: '#ef4444',
    type: CategoryType.EXPENSE,
    translations: { en: 'Food & Dining', sv: 'Mat & Restaurang', tr: 'Yemek & Restoran' }
  },
  {
    id: 'groceries',
    name: 'Groceries',
    icon: '🛒',
    color: '#f97316',
    type: CategoryType.EXPENSE,
    translations: { en: 'Groceries', sv: 'Matinköp', tr: 'Market' }
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: '🚗',
    color: '#3b82f6',
    type: CategoryType.EXPENSE,
    translations: { en: 'Transportation', sv: 'Transport', tr: 'Ulaşım' }
  },
  {
    id: 'housing',
    name: 'Housing',
    icon: '🏠',
    color: '#8b5cf6',
    type: CategoryType.EXPENSE,
    translations: { en: 'Housing', sv: 'Boende', tr: 'Konut' }
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: '💡',
    color: '#eab308',
    type: CategoryType.EXPENSE,
    translations: { en: 'Utilities', sv: 'Utilities', tr: 'Faturalar' }
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎮',
    color: '#ec4899',
    type: CategoryType.EXPENSE,
    translations: { en: 'Entertainment', sv: 'Underhållning', tr: 'Eğlence' }
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    color: '#14b8a6',
    type: CategoryType.EXPENSE,
    translations: { en: 'Shopping', sv: 'Shopping', tr: 'Alışveriş' }
  },
  {
    id: 'health',
    name: 'Health',
    icon: '💊',
    color: '#06b6d4',
    type: CategoryType.EXPENSE,
    translations: { en: 'Health', sv: 'Hälsa', tr: 'Sağlık' }
  }
];

export const INCOME_CATEGORIES: Category[] = [
  {
    id: 'salary',
    name: 'Salary',
    icon: '💼',
    color: '#10b981',
    type: CategoryType.INCOME,
    translations: { en: 'Salary', sv: 'Lön', tr: 'Maaş' }
  },
  {
    id: 'freelance',
    name: 'Freelance',
    icon: '💻',
    color: '#059669',
    type: CategoryType.INCOME,
    translations: { en: 'Freelance', sv: 'Frilans', tr: 'Serbest' }
  },
  {
    id: 'business',
    name: 'Business',
    icon: '🏢',
    color: '#047857',
    type: CategoryType.INCOME,
    translations: { en: 'Business', sv: 'Företag', tr: 'İş' }
  },
  {
    id: 'investment',
    name: 'Investment',
    icon: '📈',
    color: '#34d399',
    type: CategoryType.INCOME,
    translations: { en: 'Investment', sv: 'Investering', tr: 'Yatırım' }
  }
];

export const ALL_CATEGORIES: Category[] = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const getCategoryById = (id: string): Category | undefined => {
  return ALL_CATEGORIES.find(cat => cat.id === id);
};

export const getCategoriesByType = (type: CategoryType): Category[] => {
  return ALL_CATEGORIES.filter(cat => cat.type === type);
};

export const getCategoryName = (id: string, language: 'en' | 'sv' | 'tr'): string => {
  const category = getCategoryById(id);
  return category ? category.translations[language] : 'Unknown';
};
