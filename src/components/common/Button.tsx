import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'amber';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#14352a] hover:bg-[#1c4839] text-white border-transparent shadow-sm active:bg-[#0f2820]',
    secondary: 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-sm active:bg-emerald-800',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm active:bg-slate-100',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white border-transparent shadow-sm active:bg-rose-800',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 border-transparent',
    amber: 'bg-[#b87a2a] hover:bg-[#a36821] text-white border-transparent shadow-sm',
  };

  const sizeStyles = {
    xs: 'text-[11px] px-2 py-1 gap-1 rounded-md font-medium',
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg font-medium',
    md: 'text-sm px-4 py-2 gap-2 rounded-lg font-medium',
    lg: 'text-base px-5 py-2.5 gap-2.5 rounded-xl font-semibold',
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center border transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-[#14352a]/40 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
