
import React from 'react';
import type { SyncHealth } from '../types';
import StatusBadge from './StatusBadge';

interface HealthCardProps {
  item: SyncHealth;
}

const HealthCard: React.FC<HealthCardProps> = ({ item }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-card flex items-center justify-between">
      <div>
        <p className="font-semibold text-black">{item.name}</p>
        <p className="text-sm text-neutral-500">Last sync: {item.lastSync}</p>
      </div>
      <div className="flex items-center gap-4">
        <StatusBadge status={item.status} />
        <button className="text-base font-medium text-primary hover:text-primary/80">Retry</button>
      </div>
    </div>
  );
};

export default HealthCard;