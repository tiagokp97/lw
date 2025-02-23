import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const transfer = async ({ origin, destination, amount }) => {
  const { data } = await api.post(
    '/transaction/transfer',
    { origin, destination, amount },
    { withCredentials: true }
  );

  return data;
};

export const useTransfer = (amount) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transfer,
    onSuccess: (data) => {
      toast.success(`Transfer R$ ${amount} done!`);
      queryClient.invalidateQueries(['balance']);
    },
    onError: (err) => {
      toast.error('Transfer error');
    },
  });
};
