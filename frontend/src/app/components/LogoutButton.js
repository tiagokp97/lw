'use client';
import React from 'react';
import { useLogout } from '../hooks/useLogout';

export default function LogoutButton() {
  const { mutate: logout, isLoading } = useLogout();

  return (
    <button
      onClick={logout}
      disabled={isLoading}
      className='p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition'
    >
      {isLoading ? 'Saindo...' : 'Logout'}
    </button>
  );
}
