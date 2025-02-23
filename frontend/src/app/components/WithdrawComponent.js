'use client';

import { useState } from 'react';
import { useWithdraw } from '../hooks/useWithdraw';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function WithdrawComponent() {
  const [amount, setAmount] = useState('');
  const { mutate, isLoading } = useWithdraw();
  const [error, setError] = useState('');
  const selectedAccount = useSelector((state) => state.account.selectedAccount);

  const handleWithdraw = () => {
    if (!amount) return toast.error('Digite um valor válido!');

    if (!selectedAccount || !selectedAccount.id) {
      return toast.error('Nenhuma conta selecionada!');
    }

    mutate(
      { amount: Number(amount), id: selectedAccount.id },
      {
        onSuccess: (data) => {
          toast.success(`Withdraw R$ ${amount} with success!`);
          setAmount('');
          setError('');
        },
        onError: (err) => {
          setError(err.response?.data?.error || 'Erro ao processar o saque.');
        },
      }
    );
  };

  return (
    <div className='flex flex-col gap-3 p-4 rounded-lg shadow-md light w-full max-w-sm max-h-[180px] dark:bg-white bg-grey-200 border-2 dark:border border-gray-300 dark:border-secondary-light'>
      <h2 className='text-lg font-semibold text-secondary-dark'>Saque</h2>

      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Digite o valor do saque'
        className='w-full p-2 text-secondary-dark border border-secondary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
        min='0'
      />

      <button
        onClick={handleWithdraw}
        disabled={isLoading}
        className={`w-full p-2 text-white font-semibold rounded-md transition-all 
          ${
            isLoading
              ? 'bg-primary-light cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark'
          }`}
      >
        {isLoading ? 'Sacando...' : 'Sacar'}
      </button>

      {error && (
        <p className='text-red-500 text-sm text-center'>Erro: {error}</p>
      )}
    </div>
  );
}
