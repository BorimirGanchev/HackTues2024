'use client'
import { useEffect } from 'react';
import { cookies } from "./cookieHandler";
//import { redirect } from 'next/navigation';

export function useCheckUserToken() {
  
    if (cookies.token.get() === undefined || cookies.token.get() === null) {
      console.log('redirect');
      //redirect('/workout');
    }
}


