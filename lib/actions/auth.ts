'use server';

import { signIn } from '@/auth';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params;
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: result.error };
    }
    return { success: true, message: 'User signed in' };
  } catch {
    return { success: false, message: 'Error signing in' };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { email, password, universityId, fullName, universityCard } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toString()));

  if (existingUser.length > 0) {
    return { success: false, message: 'User already exists' };
  }

  const hashedPassword = await hash(password.toString(), 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, 'Signup error');
    return { success: false, error: 'Signup error' };
  }
};
