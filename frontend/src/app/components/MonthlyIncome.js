'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTransactions } from '../hooks/useTransaction';
import AmountComponent from '../components/AmountComponent';
import LoadingSpinner from '../components/LoadingSpinner';
import UpArrow from '../components/icons/UpArrow';
import { formatCurrencyBRL } from '../utils/formatCurrencyBRL';

const MonthlyIncome = () => {
  const selectedAccount = useSelector((state) => state.account.selectedAccount);
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const { data = [], isLoading, error } = useTransactions(month, year, 'in');

  if (!selectedAccount)
    return (
      <div className='p-4 border rounded-lg shadow-md min-h-[240px] max-h-[240px] dark:bg-gray-300 bg-gray-200  overflow-hidden overflow-y-auto transition-all'>
        <div className='text-lg font-semibold mb-2 text-gray-400  border-b-2 border-secondary-light flex justify-between pr-2 pl-2'>
          Choose one account to see information
        </div>
      </div>
    );
  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className='p-4  dark:bg-white bg-gray-200  rounded-lg shadow-md h-[240px]  overflow-hidden overflow-y-auto transition-all'>
        <div className='text-lg font-semibold mb-2 text-gray-400  border-b-2 border-secondary-light flex justify-between pr-2 pl-2'>
          There's no monthly income
        </div>
      </div>
    );

  const totalIncome = data.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className='p-4 dark:bg-white bg-gray-200  shadow-md rounded-lg p-4 min-h-[240px] max-h-[240px] overflow-hidden overflow-y-auto transition-all'>
      <h2 className='text-lg font-semibold mb-2 text-secondary-dark border-b-2 border-secondary-light flex justify-between pl-2 pr-2 min-w-[120px]'>
        Monthly Income:{' '}
        <span className='text-green-700 font-bold flex min-w-[120px] justify-end'>
          <span>{formatCurrencyBRL(totalIncome)}</span>
        </span>
      </h2>

      <div className=''>
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
    </div>
  );
};

export default MonthlyIncome;
