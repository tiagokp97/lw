import { toast } from 'react-hot-toast';

export async function fetchBalance() {
  const res = await fetch('http://localhost:3001/api/transaction/balance', {
    cache: 'no-store',
  });

  if (!res.ok) {
    toast.error('Error getting balance');
  }

  return res.json();
}
