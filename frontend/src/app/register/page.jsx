'use client';

import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import EyeSlash from "../components/icons/EyeSlash";
import Eye from "../components/icons/Eye";

export default function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { mutate, isLoading, error } = useRegister();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const onSubmit = (data) => {
        mutate(
            { username: data.username, password: data.password, amount: Number(data.amount) },
            {
                onSuccess: () => {
                    setTimeout(() => {
                        router.refresh();
                        router.push('/login');
                    }, 500);
                },
            }
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Create Account
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
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Minimum 6 characters' }
                        })}
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

                <div className="mb-4 relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        className={`w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === watch('password') || 'Passwords do not match'
                        })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
                    >
                        {showConfirmPassword ? <Eye /> : <EyeSlash />}
                    </button>
                    <p className="mt-1 text-sm text-red-500 min-h-5">
                        {errors.confirmPassword?.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Initial Amount</label>
                    <input
                        type="number"
                        placeholder="Enter initial amount"
                        className={`w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none ${errors.amount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        {...register('amount', {
                            required: 'Amount is required',
                            min: { value: 1, message: 'Minimum amount is 1' }
                        })}
                    />
                    <p className="mt-1 text-sm text-red-500 min-h-5">
                        {errors.amount?.message}
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
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                    Already have an account?{' '}
                    <span
                        role="button"
                        className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline"
                        onClick={() => router.push('/login')}
                    >
                        Sign in here
                    </span>
                </p>
            </form>
        </div>
    );
}
