"use client";
import React, { useState } from "react";
import Form from "../components/Form";
import axios from "axios";

const Signup: React.FC = () => {
  const [isReqSuccessful, setIsReqSuccessful] = useState<undefined | string>(
    undefined
  );
  const handleSubmit = async (data: { [key: string]: string }) => {
    const res = await axios.post(`${process.env.GATEWAY_URL}`, {
      body: {
        username: data.username,
        password: data.password,
      },
    });
    console.log("token -> ", res);
    setIsReqSuccessful(res.data.message);
  };

  const fields = [
    { label: "Username", type: "text", name: "username" },
    { label: "Email", type: "email", name: "email" },
    { label: "Password", type: "password", name: "password" },
  ];

  if (isReqSuccessful) {
  }

  return (
    <div className="bg-white dark:bg-slate-800 min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div>{isReqSuccessful ? <div>Redirecting ...</div> : <></>} </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl my-4 border-l-4 pl-2 font-sans font-bold border-teal-400 dark:text-gray-200">
          Sign Up
        </h1>
        <div className="w-full flex flex-col items-center">
          <Form onSubmit={handleSubmit} fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
