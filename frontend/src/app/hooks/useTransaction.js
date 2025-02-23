'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import api from '../services/api';

const fetchTransactions = async ({ queryKey }) => {
  const [_key, { id, month, year, type }] = queryKey;

  if (!id) return [];

  const params = new URLSearchParams();
  params.append('id', id);
  if (month) params.append('month', month);
  if (type) params.append('type', type);
  if (year) params.append('year', year);

  const { data } = await api.get(`/transaction?${params.toString()}`, {
    withCredentials: true,
  });

  return data.transactions.map((tx) => ({
    ...tx,
    amount: Number(tx.amount),
  }));
};

export const useTransactions = (month, year, type) => {
  const queryClient = useQueryClient();
  const selectedAccount = useSelector((state) => state.account.selectedAccount);

  return useQuery({
    queryKey: ['transactions', { id: selectedAccount?.id, month, year, type }],
    queryFn: fetchTransactions,
    enabled: !!selectedAccount?.id,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
