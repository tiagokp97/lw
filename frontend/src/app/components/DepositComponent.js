'use client';

import { useState } from 'react';
import { useDeposit } from '../hooks/useDeposit';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function DepositComponent() {
  const selectedAccount = useSelector((state) => state.account.selectedAccount);
  const [amount, setAmount] = useState('');
  const { mutate, isLoading, error } = useDeposit();

  const handleDeposit = () => {
    if (!amount) return toast.error('Enter a valid amount!');

    if (!selectedAccount || !selectedAccount.id) {
      return toast.error('No account selected!');
    }

    const numericAmount = Number(amount);

    if (numericAmount <= 0) {
      return toast.error('Amount must be greater than zero!');
    }

    if (numericAmount > 99999) {
      return toast.error('Deposit amount cannot exceed 99.999,00!');
    }

    mutate(
      { amount: numericAmount, id: selectedAccount.id },
      {
        onSuccess: (data) => {
          toast.success(`Deposit of $${amount} successfully completed!`);
          setAmount('');
        },
        onError: (err) => {
          console.error('Error while depositing:', err);
          toast.error('Error while depositing.');
        },
      }
    );
  };

  return (
    <div className='flex flex-col gap-3 dark:bg-white bg-grey-200 p-4 rounded-lg shadow-md border-2 dark:border border-gray-300 dark:border-secondary-light min-w-[160px] max-h-[200px]'>
      <h2 className='text-lg font-semibold text-secondary-dark'>Deposit</h2>

      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Amount'
        className='w-full p-2 border border-secondary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-secondary-dark'
        min='0'
      />

      <button
        onClick={handleDeposit}
        disabled={isLoading}
        className={`w-full p-2 text-white font-semibold rounded-md transition-all 
          ${
            isLoading
              ? 'bg-primary-light cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark'
          }`}
      >
        {isLoading ? 'Depositing...' : 'Deposit'}
      </button>

      {error && (
        <p className='text-red-500 text-sm text-center'>
          Error: {error.message}
        </p>
      )}
    </div>
  );
}
