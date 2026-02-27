'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user, isManager } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(isManager ? '/dashboard' : '/products');
    } else {
      router.push('/login');
    }
  }, [user, isManager, router]);

  return null;
}
