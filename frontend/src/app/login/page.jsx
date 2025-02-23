'use client';

import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import EyeSlash from "../components/icons/EyeSlash"
import Eye from "../components/icons/Eye"

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate, isLoading, error } = useLogin();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setTimeout(() => {
          router.refresh();
          router.push('/');
        }, 500);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className={`w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none ${errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            {...register('username', { required: 'Username is required' })}
          />
          <p className="mt-1 text-sm text-red-500 min-h-5">
            {errors.username?.message}
          </p>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className={`w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
          >
            {showPassword ? <Eye /> : <EyeSlash />}
          </button>
          <p className="mt-1 text-sm text-red-500 min-h-5">
            {errors.password?.message}
          </p>
        </div>

        <p className="mb-4 text-center text-red-500 min-h-5">
          {error?.response?.data?.error}
        </p>

        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <span
            role="button"
            className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline"
            onClick={() => router.push('/register')}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}
