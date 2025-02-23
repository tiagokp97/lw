import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const createAccount = async ({ amount }) => {
  const { data } = await api.post(
    '/account/create',
    { amount },
    { withCredentials: true }
  );
  return data;
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['balance'] });
      toast.success('Account created successfully!');
    },
    onError: (err) => {
      toast.error('Error creating account');
    },
  });
};
