import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  bg?: string;
  textColor?: string;
  ring?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 'md',
  className = '',
  bg = 'bg-[#14352a]',
  textColor = 'text-white',
  ring = false,
}) => {
  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-xs font-medium',
    lg: 'w-10 h-10 text-sm font-semibold',
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full select-none shrink-0 ${sizeMap[size]} ${bg} ${textColor} ${
        ring ? 'ring-2 ring-emerald-400/40 ring-offset-1' : ''
      } ${className}`}
    >
      {initials}
    </div>
  );
};
