import { sampleBooks } from '@/app/constants';
import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import React from 'react';

const page = () => {
  return (
    <>
        <form action={ async () => {
            'use server';
            await signOut({ redirectTo: 'http://localhost:3000/sign-in' });
        }}
        className='mb-10'
        >
            <Button type='submit'>
                Sign out
            </Button>
        </form>
        <BookList title='My Books' books={sampleBooks}/>
    </>
  );
};

export default page;
