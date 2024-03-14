'use client'
import React from 'react';
import Form from '../components/Form';

const Signup: React.FC = () => {
  const handleSubmit = (data: { [key: string]: string }) => {
    console.log(data);
  };

  const fields = [
    { label: 'Username', type: 'text', name: 'username' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' },
  ];

  return ( 
    <div className='bg-white dark:bg-slate-800 min-h-screen flex justify-center items-center px-4'>
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className='text-xl md:text-2xl lg:text-3xl my-4 border-l-4 pl-2 font-sans font-bold border-teal-400 dark:text-gray-200'>Sign Up</h1>
        <div className="w-full flex flex-col items-center">
          <Form onSubmit={handleSubmit} fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

