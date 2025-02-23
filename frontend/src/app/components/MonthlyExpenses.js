'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTransactions } from '../hooks/useTransaction';
import AmountComponent from '../components/AmountComponent';
import { formatCurrencyBRL } from '../utils/formatCurrencyBRL';
import LoadingSpinner from '../components/LoadingSpinner';
import DownArrow from '../components/icons/DownArrow';

const MonthlyIncome = ({ month, year }) => {
  const selectedAccount = useSelector((state) => state.account.selectedAccount);
  const { data = [], isLoading, error } = useTransactions(month, year, 'out');
  if (!selectedAccount)
    return (
      <div className='p-4 border rounded-lg shadow-md min-h-[240px] max-h-[240px] dark:bg-white bg-gray-200  overflow-hidden overflow-y-auto transition-all'>
        <div className='text-lg font-semibold mb-2 text-gray-400  border-b-2 border-secondary-light flex justify-between pr-2 pl-2'>
          Choose one account to see information
        </div>
      </div>
    );
  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className='p-4 border rounded-lg shadow-md min-h-[240px] max-h-[240px] dark:bg-white bg-gray-200  overflow-hidden overflow-y-auto transition-all'>
        <div className='text-lg font-semibold mb-2 text-gray-400  border-b-2 border-secondary-light flex justify-between pr-2 pl-2'>
          There's no monthly expenses
        </div>
      </div>
    );

  const totalIncome = data.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className='p-4 dark:bg-white bg-gray-200rounded-lg shadow-md min-h-[240px] max-h-[240px] dark:bg-white bg-gray-200 overflow-hidden overflow-y-auto transition-all'>
      <h2 className='text-lg font-semibold mb-2 text-secondary-dark border-b-2 border-secondary-light flex justify-between pr-2 pl-2'>
        Monthly expenses:{' '}
        <span className='text-red-700 font-bold flex min-w-[120px] justify-end'>
          <span>{formatCurrencyBRL(totalIncome)}</span>
        </span>
      </h2>

      <ul className='space-y-2'>
        {data.length === 0 ? (
          <p className='text-gray-500'>Nenhuma transação encontrada.</p>
        ) : (
          data.map((tx) => (
            <AmountComponent
              key={tx.id}
              tx={tx}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default MonthlyIncome;
