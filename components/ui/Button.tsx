import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: Props) {
  const base =
    'px-4 py-2 rounded-md font-medium focus:outline-none transition-colors duration-200';

  const variantClass =
    variant === 'primary'
      ? 'bg-[#1659E6] text-white hover:bg-[#0f4ad6]'
      : 'bg-transparent text-gray-700 hover:text-blue-600';

  return (
    <button className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
