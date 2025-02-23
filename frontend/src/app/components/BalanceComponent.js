'use client';

import { useSelector } from 'react-redux';

const BalanceComponent = () => {
  const selectedAccount = useSelector((state) => state.account.selectedAccount);

  if (!selectedAccount)
    return (
      <p className='text-lg font-semibold text-secondary-dark'>
        Choose one account to see your balance.
      </p>
    );

  return (
    <div className='text-2xl text-font-white flex gap-2 border-b-2 border-secondary-light'>
      <h2 className='text-lg font-semibold text-secondary-dark '>
        Your Balance:
      </h2>
      <p className='text-primary text-lg font-semibold'>
        R$ {selectedAccount.balance}
      </p>
    </div>
  );
};

export default BalanceComponent;
