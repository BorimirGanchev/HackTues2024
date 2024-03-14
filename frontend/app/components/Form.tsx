'use client'
import React, { useState } from 'react';

interface Field {
  label: string;
  type: string;
  name: string;
}

interface Props {
  onSubmit: (data: { [key: string]: string }) => void;
  fields: Field[];
}

const Form: React.FC<Props> = ({ onSubmit, fields }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-lg">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block mb-2">
            {field.label}
          </label>
          <input
            type={field.type === 'password' ? 'password' : 'text'}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(e, field.name)}
            className="w-[30%] px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:bg-gray-600"
          />
        </div>
      ))}
      <button type="submit" className="w-[30%] bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default Form;
