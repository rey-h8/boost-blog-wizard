import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className='bg-violet-700/80 rounded-lg hover:bg-violet-600/80 text-blue-100 transition duration-300 ease-in-out  focus:outline-none px-5 py-2 text-md'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
