import React from 'react';
import { isoYearMonthDayMinutes } from '../utils/dateConvert';
import UpArrow from '../components/icons/UpArrow';
import DownArrow from '../components/icons/DownArrow';
import { formatCurrencyBRL } from '../utils/formatCurrencyBRL';

export default function amountComponent({ tx }) {
  return (
    <li className='flex justify-between p-2 border-b w-full flex items-center'>
      <span className='text-gray-600 capitalize min-w-[90px]  gap-1'>
        {tx.type.replace('_', ' ')}
      </span>
      <span className='text-gray-400 text-sm'>
        {isoYearMonthDayMinutes(tx.createdAt)}
      </span>
      <span className='text-primary font-bold flex min-w-[120px] justify-between'>
        <div>{tx.type === 'transfer_out' ? <DownArrow /> : <UpArrow />}</div>
        <span>{formatCurrencyBRL(tx.amount)}</span>
      </span>
    </li>
  );
}
