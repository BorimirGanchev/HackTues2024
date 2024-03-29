'use client'
import React from "react";
import Form from "../components/Form";
import { cookies } from "../utils/cookieHandler";
import { authApi } from "../utils/api";

const Login: React.FC = () => {
  const handleSubmit = async (data: { [key: string]: string }) => {
    try {
      const userData = {
        username: data.username,
        password: data.password,
      };

      const response = await authApi.login(userData);
      const token = response.data.token;

      console.log("Token:", token);
      cookies.token.set(token);

      // Use Next.js Router for navigation instead of window.location.href to avoid full page refresh
      if (typeof window !== 'undefined') {
        window.location.href = "/workout";
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle the error, maybe set an error message in your state and display it to the user
    }
  };

  const fields = [
    { label: "Username", type: "text", name: "username" },
    { label: "Password", type: "password", name: "password" },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl my-4 border-l-4 pl-2 font-sans font-bold border-teal-400 dark:text-gray-200">
          Log In
        </h1>
        <div className="w-full flex flex-col items-center">
          <Form onSubmit={handleSubmit} fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default Login;

