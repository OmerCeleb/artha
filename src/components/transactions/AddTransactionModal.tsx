// src/components/transactions/AddTransactionModal.tsx

import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { DatePicker } from '../common/DatePicker';
import { TransactionType } from '../../types';
import { useTransactions } from '../../contexts/TransactionContext';
import { useAuth } from '../../contexts/AuthContext';
import { getCategoriesByType, CategoryType } from '../../config/categories';
import { DollarSign } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useTransactions();
  const { user } = useAuth();
  
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date());

  const categories = getCategoriesByType(
    type === TransactionType.INCOME ? CategoryType.INCOME : CategoryType.EXPENSE
  );

  const handleSubmit = () => {
    if (!amount || !categoryId || !user) return;

    const category = categories.find(c => c.id === categoryId);
    
    addTransaction({
      type,
      amount: parseFloat(amount),
      category: category?.name || '',
      categoryId,
      description,
      date
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategoryId('');
    setDate(new Date());
    onClose();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and one decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction" size="lg">
      <div className="space-y-6">
        {/* Type Selector */}
        <div className="flex gap-2 p-1 bg-dark-50 rounded-xl">
          <button
            onClick={() => {
              setType(TransactionType.EXPENSE);
              setCategoryId('');
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              type === TransactionType.EXPENSE
                ? 'bg-white text-dark-900 shadow-sm'
                : 'text-dark-600'
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => {
              setType(TransactionType.INCOME);
              setCategoryId('');
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              type === TransactionType.INCOME
                ? 'bg-white text-dark-900 shadow-sm'
                : 'text-dark-600'
            }`}
          >
            Income
          </button>
        </div>

        {/* Amount */}
        <Input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          label="Amount"
          icon={<DollarSign className="w-5 h-5" />}
          className="text-2xl font-bold"
        />

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-dark-700 mb-3">
            Category
          </label>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategoryId(category.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  categoryId === category.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-dark-200 hover:border-dark-300'
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <p className="text-xs font-medium text-dark-900 truncate">
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <Input
          type="text"
          placeholder="e.g., Grocery shopping"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description (Optional)"
        />

        {/* Date */}
        <DatePicker
          value={date}
          onChange={setDate}
          label="Date"
        />

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!amount || !categoryId}
          fullWidth
          size="lg"
          className="bg-primary-600 hover:bg-primary-700 text-white"
        >
          Add Transaction
        </Button>
      </div>
    </Modal>
  );
};
