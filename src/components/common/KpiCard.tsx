import React from 'react';
import { Card } from './Card';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: {
    text: string;
    variant: 'green' | 'amber' | 'purple' | 'red' | 'blue' | 'gray';
  };
  icon?: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  icon,
  trend,
  trendPositive,
}) => {
  return (
    <Card className="p-4 flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {icon && <div className="text-slate-400">{icon}</div>}
        {badge && (
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              badge.variant === 'green'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                : badge.variant === 'amber'
                ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                : badge.variant === 'red'
                ? 'bg-rose-50 text-rose-700 border border-rose-200/50'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {badge.text}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold ${
              trendPositive ? 'text-emerald-600' : 'text-slate-500'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
          {subtitle}
        </p>
      )}
    </Card>
  );
};
