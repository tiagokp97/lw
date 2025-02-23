'use client';

import { toast } from 'react-hot-toast';

import { useState } from 'react';
import { useTransfer } from '../hooks/useTransfer';
import { useSelector } from 'react-redux';

export default function TransferComponent() {
  const [amount, setAmount] = useState(0);
  const [destination, setDestination] = useState('');
  const { mutate, isLoading, error } = useTransfer(amount);
  const selectedAccount = useSelector((state) => state.account.selectedAccount);

  const handleTransfer = () => {
    if (!amount || !destination) return toast.error('Fill all fields!');
    const amountToNumber = Number(amount);

    if (!selectedAccount || !selectedAccount.id) {
      toast.error('Select one account!');
    }

    mutate(
      {
        origin: selectedAccount.id,
        destination: Number(destination),
        amount: amountToNumber,
      },
      {
        onSuccess: () => {
          setAmount('');
          setDestination('');
        },
      }
    );
  };

  return (
    <div className='flex flex-col gap-3 p-4 rounded-lg shadow-md  w-full max-w-sm max-h-[180px] dark:bg-white bg-grey-200 border-2 dark:border border-gray-300 dark:border-secondary-light'>
      <h2 className='text-lg font-semibold text-secondary-dark'>Transfer</h2>
      <div className='flex gap-2'>
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Amount'
          className='w-full p-2 text-secondary-dark border border-secondary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
          min='0'
        />

        <input
          type='text'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder='Destination'
          className='w-full p-2 text-secondary-dark border border-secondary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
        />
      </div>

      <button
        onClick={handleTransfer}
        disabled={isLoading}
        className={`w-full p-2 text-white font-semibold rounded-md transition-all 
          ${
            isLoading
              ? 'bg-primary-light cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark'
          }`}
      >
        {isLoading ? 'Transfering' : 'Transfer'}
      </button>
    </div>
  );
}
