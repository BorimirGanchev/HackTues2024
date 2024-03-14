'use client'
import React from 'react';
import Form from '../components/Form';


const Login: React.FC = () => {
  const handleSubmit = (data: { [key: string]: string }) => {
    console.log(data);
  };

  const fields = [
    { label: 'Username', type: 'text', name: 'username' },
    { label: 'Password', type: 'password', name: 'password' },
  ];

  return ( 
  <div className='bg-white dark:bg-slate-800 h-[100vh] w-[100vw] px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'>
    <Form onSubmit={handleSubmit} fields={fields} />
  </div>
  );
};

export default Login;
