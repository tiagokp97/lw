'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTransactions } from '../hooks/useTransaction';
import AmountComponent from '../components/AmountComponent';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const YearlyView = ({ year }) => {
  const selectedAccount = useSelector((state) => state.account.selectedAccount);
  const { data = [], isLoading, error } = useTransactions(null, year, 'in');

  if (!selectedAccount)
    return (
      <div className='p-4 border rounded-lg shadow-md min-h-[320px] max-h-[320px] dark:bg-white bg-gray-200  overflow-hidden overflow-y-auto transition-all'>
        <div className='text-lg font-semibold mb-2 text-gray-400 dark:border-b-2 dark:border-secondary-light flex justify-between pr-2 pl-2'>
          Choose one account to see information
        </div>
      </div>
    );

  const monthlyIncome = data.reduce((acc, tx) => {
    const month = new Date(tx.createdAt).getMonth() + 1;
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {});

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}`,
    income: monthlyIncome[i + 1] || 0,
  }));

  return (
    <div className='p-4 rounded-lg shadow-md dark:bg-white bg-gray-200'>
      <h2 className='text-lg font-semibold mb-2 text-secondary-dark border-b-2 border-secondary-light flex justify-between pr-2 pl-2'>
        Year Income:{' '}
        <span className='text-primary'>
          R$ {data.reduce((acc, tx) => acc + tx.amount, 0).toFixed(2)}
        </span>
      </h2>

      <div className='w-full h-64 mb-4 flex gap-4 '>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='month'
              tickFormatter={(tick) => `Month ${tick}`}
            />
            <YAxis />
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Line
              type='monotone'
              dataKey='income'
              stroke='#8884d8'
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className='w-full max-h-[240px] overflow-hidden overflow-y-auto transition-all'>
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
    </div>
  );
};

export default YearlyView;
