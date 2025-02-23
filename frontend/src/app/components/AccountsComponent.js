'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useBalance } from '../hooks/useBalance';
import { useCreateAccount } from '../hooks/useCreateAccount';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '@/store/slices/accountSlice';
import { toast } from 'react-hot-toast';

export default function AccountsComponent() {
  const { data, isLoading } = useBalance();
  const { mutate: createAccount, isLoading: isCreating } = useCreateAccount();
  const dispatch = useDispatch();
  const selectedAccount = useSelector((state) => state.account.selectedAccount);
  const [selectedId, setSelectedId] = useState(selectedAccount?.id || null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (selectedAccount) {
      const updatedAccount = data?.accounts.find(
        (acc) => acc.id === selectedAccount.id
      );
      if (updatedAccount) {
        dispatch(selectAccount(updatedAccount));
      }
    }
  }, [data, selectedAccount, dispatch]);

  useEffect(() => {
    const updateScrollButtons = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };

    if (carouselRef.current) {
      updateScrollButtons();
      carouselRef.current.addEventListener('scroll', updateScrollButtons);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', updateScrollButtons);
      }
    };
  }, [data]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  const handleCreateAccount = () => {
    setIsModalOpen(true);
  };

  const confirmCreateAccount = () => {
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    createAccount({ amount: Number(amount) });
    setIsModalOpen(false);
  };

  if (isLoading) return <p className='text-secondary-light'>Loading...</p>;

  return (
    <div className='relative flex flex-col overflow-hidden'>
      <h2 className='text-lg font-semibold dark:text-white text-secondary-dark mb-2'>
        Your Accounts:
      </h2>

      <div className='relative w-full flex items-center'>
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className='absolute left-0 z-10 bg-secondary-dark p-2 rounded-full shadow-lg hover:bg-primary transition-all'
          >
            <p className='w-14'>Left</p>
          </button>
        )}

        <div
          ref={carouselRef}
          className='flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-20 h-17 ml-20 mr-20'
        >
          {data.accounts.map((account) => (
            <button
              key={account.id}
              className={`h-12 min-w-24 flex items-center justify-center rounded-lg text-white font-semibold transition-all shadow-md
              ${
                selectedId === account.id
                  ? 'bg-primary-dark scale-105 shadow-lg'
                  : 'bg-secondary-dark hover:bg-primary hover:scale-105'
              }`}
              onClick={() => {
                setSelectedId(account.id);
                dispatch(selectAccount(account));
              }}
            >
              Id: {account.id}
            </button>
          ))}
          <button
            onClick={handleCreateAccount}
            disabled={isCreating}
            className={`h-12 mb-3 px-4 py-2 rounded-lg font-semibold transition-all shadow-md text-white ${
              isCreating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isCreating ? 'Creating...' : 'Create Account'}
          </button>
        </div>

        {canScrollRight && (
          <button
            onClick={scrollRight}
            className='absolute right-0 z-10 bg-secondary-dark p-2 rounded-full shadow-lg hover:bg-primary transition-all'
          >
            <p className='w-14'>Next</p>
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[350px]'>
            <h2 className='text-lg font-bold text-gray-800 dark:text-white mb-4'>
              Create New Account
            </h2>
            <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
              Are you sure you want to create a new account?
            </p>

            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Initial Amount
            </label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Enter initial amount'
              className='w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
            />

            <div className='flex justify-end mt-4 gap-2'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition'
              >
                Cancel
              </button>
              <button
                onClick={confirmCreateAccount}
                disabled={isCreating}
                className={`px-4 py-2 text-white rounded-lg transition ${
                  isCreating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isCreating ? 'Creating...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
