import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const withdraw = async ({ amount, id }) => {
  console.log('Chamando API de saque com:', amount);

  const { data } = await api.post(
    '/transaction/withdraw',
    { amount, id },
    { withCredentials: true }
  );

  return data;
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdraw,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['balance']);
    },
    onError: (err) => {},
  });
};
