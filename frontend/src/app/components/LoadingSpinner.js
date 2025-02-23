import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center h-32'>
      <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  );
}
