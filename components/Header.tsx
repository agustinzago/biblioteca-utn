'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header = () => {
    const pathname = usePathname();
  return (
    <header className='flex justify-between items-center my-10 gap-5'>
        <Link href='/'>Inicio</Link>

        <ul className='flex flex-row items-center gap-8'>
            <li>
                <Link href='/biblioteca' 
                    className={cn(
                    'text-base cursor-pointer capitalize', 
                    pathname === '/library' ? 
                    'text-light-200' : 
                    'text-light-100')}
                >
                        Bliblioteca
                </Link>
            </li>
        </ul>
    </header>
  );
};

export default Header;