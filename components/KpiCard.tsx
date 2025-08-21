
import React from 'react';
import type { Kpi } from '../types';

interface KpiCardProps {
  kpi: Kpi;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  const isIncrease = kpi.changeType === 'increase';
  const changeColor = isIncrease ? 'text-success-800' : 'text-danger-800';
  const changeBg = isIncrease ? 'bg-success-100' : 'bg-danger-100';
  const changeIcon = isIncrease ? '▲' : '▼';

  return (
    <div className="bg-white p-6 rounded-lg shadow-card">
      <p className="text-base font-medium text-neutral-500">{kpi.title}</p>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-bold text-black">{kpi.value}</p>
      </div>
      <div className="mt-2 flex items-center text-base">
        <span className={`px-2 py-0.5 rounded-full text-sm font-semibold ${changeColor} ${changeBg}`}>
          {changeIcon} {kpi.change}
        </span>
        <span className="ml-2 text-neutral-500">vs last 7d</span>
      </div>
    </div>
  );
};

export default KpiCard;