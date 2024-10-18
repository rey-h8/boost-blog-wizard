import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className='bg-blue-700 hover:bg-blue-600 text-blue-100 transition duration-200 ease-in-out rounded focus:outline-none px-4 py-2 text-md'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
