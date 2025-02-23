'use client';

import Image from 'next/image';

export default function Wallet() {
  return (
    <Image
      src='https://public.lwtecnologia.com.br/public/FavIcon.svg'
      alt='Wallet Icon'
      width={20}
      height={20}
      priority
    />
  );
}
