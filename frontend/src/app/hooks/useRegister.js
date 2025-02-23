import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/auth';

export function useRegister() {
  const mutation = useMutation({ mutationFn: registerUser });
  return {
    ...mutation,
    isLoading: mutation.status === 'pending',
  };
}
