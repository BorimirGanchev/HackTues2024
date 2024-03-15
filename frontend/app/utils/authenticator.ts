'use client'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { cookies } from "./cookieHandler";

export function useCheckUserToken() {
  const router = useRouter();

  useEffect(() => {
    if (cookies.token.get() === undefined || cookies.token.get() === null) {
      console.log('redirect');
      router.push('/frontend/app/login');
    }
  }, [router]);
}


