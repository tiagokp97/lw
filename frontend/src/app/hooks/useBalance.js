'use client';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchBalance = async () => {
  const { data } = await api.get('/transaction/balance', {
    withCredentials: true,
  });

  return data;
};

export const useBalance = () => {
  return useQuery({
    queryKey: ['balance'],
    queryFn: fetchBalance,
    retry: false,
  });
};
