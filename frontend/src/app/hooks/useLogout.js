'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectAccount } from '@/store/slices/accountSlice';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const logout = async () => {
  const { data } = await api.post(
    '/auth/logout',
    {},
    { withCredentials: true }
  );
  return data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['balance'] }),
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
      ]);

      dispatch(selectAccount(null));
      router.refresh();
      router.push('/login');
    },
    onError: (err) => {
      toast.error('Error logging out:');
    },
  });
};
