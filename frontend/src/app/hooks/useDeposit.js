import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '@/store/slices/accountSlice';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const deposit = async ({ amount, id }) => {
  const { data } = await api.post(
    '/transaction/deposit',
    { amount, id },
    { withCredentials: true }
  );

  return data;
};

export const useDeposit = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const selectedAccount = useSelector((state) => state.account.selectedAccount);

  return useMutation({
    mutationFn: deposit,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['balance'] });
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });

      const updatedBalance = queryClient.getQueryData(['balance']);

      if (selectedAccount && selectedAccount.id === data.id) {
        dispatch(
          selectAccount({
            ...selectedAccount,
            balance:
              updatedBalance?.accounts.find(
                (acc) => acc.id === selectedAccount.id
              )?.balance || selectedAccount.balance,
          })
        );
      }
    },
    onError: (err) => {
      toast.error('Error depositing');
    },
  });
};
