import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'amber' | 'purple' | 'red' | 'blue' | 'gray' | 'dark';
  size?: 'sm' | 'md' | 'xs';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray',
  size = 'sm',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
    amber: 'bg-amber-50 text-amber-900 border-amber-200/70',
    purple: 'bg-purple-50 text-purple-800 border-purple-200/60',
    red: 'bg-rose-50 text-rose-800 border-rose-200/60',
    blue: 'bg-sky-50 text-sky-800 border-sky-200/60',
    gray: 'bg-slate-100 text-slate-700 border-slate-200/80',
    dark: 'bg-slate-800 text-white border-slate-700',
  };

  const sizeStyles = {
    xs: 'text-[10px] px-1.5 py-0.5 tracking-wider uppercase font-semibold',
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  const dotColors = {
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    red: 'bg-rose-500',
    blue: 'bg-sky-500',
    gray: 'bg-slate-400',
    dark: 'bg-emerald-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]} animate-pulse`}
        />
      )}
      {children}
    </span>
  );
};
