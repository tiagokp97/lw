// hooks/useLogin.js
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/auth';

export function useLogin() {
  const mutation = useMutation({ mutationFn: loginUser });
  return {
    ...mutation,
    isLoading: mutation.status === 'pending',
  };
}
