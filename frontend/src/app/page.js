'use client';
import { useAuth } from './hooks/useAuth';
import BalanceComponent from './components/BalanceComponent';
import DepositComponent from './components/DepositComponent';
import TransferComponent from './components/TransferComponent';
import WithdrawComponent from './components/WithdrawComponent';
import AccountsComponent from './components/AccountsComponent';
import MonthlyIncome from './components/MonthlyIncome';
import MonthlyExpenses from './components/MonthlyExpenses';
import YearlyView from './components/YearlyView';
import LogoutButton from './components/LogoutButton';
import Wallet from './components/icons/Wallet';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);
  if (isAuthenticated === null) {
    return (
      <div className='h-screen flex items-center justify-center text-white'>
        Checking authentication...
      </div>
    );
  }

  return (
    <div className='min-h-screen grid grid-rows-[auto,1fr,auto] dark:bg-primary-dark bg-gray-900'>
      <header className=' text-white pl-5 pt-4 h-20 relative flex justify-between pr-5 items-center'>
        <div className='flex gap-2'>
          <Wallet />
          <h1 className='text-xl font-semibold'>LW - Wallet</h1>
        </div>
        <div className='flex gap-2'>
          <ThemeToggle />
          <LogoutButton />
        </div>
        <div className='absolute bottom-0 left-5 right-5 border-b-2 border-none dark:border-white'></div>
      </header>

      <main className='py-4 dark:bg-gray-900 bg-gray-100 '>
        <div className='grid grid-cols-12 gap-4 px-4'>
          <div className='col-span-12 min-h-[80px]'>
            <AccountsComponent />
          </div>

          <div className='col-span-6 dark:bg-white bg-gray-200 rounded-lg flex flex-col shadow-md border-2 border-gray-300 dark:border-white'>
            <div className='p-4 min-h-[240px] '>
              <BalanceComponent />

              <div className='flex justify-between gap-2 mt-2'>
                <DepositComponent className='flex-grow' />
                <TransferComponent className='flex-grow' />
                <WithdrawComponent className='flex-grow' />
              </div>
            </div>
          </div>

          <div className='col-span-3 rounded-lg h-[240px] border-2 border-gray-300 dark:border-white '>
            <MonthlyIncome />
          </div>

          <div className='col-span-3 rounded-lg h-[240px] border-2 border-gray-300 dark:border-white '>
            <MonthlyExpenses />
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4 px-4 mt-4 '>
          <div className='col-span-12 border-2 border-gray-300 dark:border-white rounded-lg rounded-lg max-h-[320px] overflow-hidden  '>
            <YearlyView></YearlyView>
          </div>
        </div>
      </main>

      <footer className='bg-primary-dark text-white p-4 text-center shadow-lg'>
        <span className='font-medium'>
          © 2024 Financial Dashboard - Tiago Pesch
        </span>
      </footer>
    </div>
  );
}
