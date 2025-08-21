
import React from 'react';
import { Status } from '../types';
import { ICONS } from '../constants';

interface StatusBadgeProps {
  status: Status | 'Unlisted' | 'Listed' | 'Sold' | 'Held';
  showDot?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showDot = true }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium capitalize";
  
  const statusConfig = {
    [Status.Success]: { text: 'text-success-800', bg: 'bg-success-100', dot: 'fill-success-600' },
    [Status.Active]: { text: 'text-success-800', bg: 'bg-success-100', dot: 'fill-success-600' },
    [Status.Connected]: { text: 'text-success-800', bg: 'bg-success-100', dot: 'fill-success-600' },
    [Status.Fulfilled]: { text: 'text-success-800', bg: 'bg-success-100', dot: 'fill-success-600' },
    [Status.Solved]: { text: 'text-success-800', bg: 'bg-success-100', dot: 'fill-success-600' },
    [Status.Warning]: { text: 'text-warning-800', bg: 'bg-warning-100', dot: 'fill-warning-600' },
    [Status.InProgress]: { text: 'text-warning-800', bg: 'bg-warning-100', dot: 'fill-warning-600' },
    [Status.Pending]: { text: 'text-warning-800', bg: 'bg-warning-100', dot: 'fill-warning-600' },
    [Status.Error]: { text: 'text-danger-800', bg: 'bg-danger-100', dot: 'fill-danger-600' },
    [Status.Blocked]: { text: 'text-danger-800', bg: 'bg-danger-100', dot: 'fill-danger-600' },
    [Status.NeedsLogin]: { text: 'text-danger-800', bg: 'bg-danger-100', dot: 'fill-danger-600' },
    [Status.NeedsReauth]: { text: 'text-danger-800', bg: 'bg-danger-100', dot: 'fill-danger-600' },
    [Status.Expired]: { text: 'text-danger-800', bg: 'bg-danger-100', dot: 'fill-danger-600' },
    [Status.Info]: { text: 'text-info-800', bg: 'bg-info-100', dot: 'fill-info-600' },
    [Status.New]: { text: 'text-info-800', bg: 'bg-info-100', dot: 'fill-info-600' },
    'Listed': { text: 'text-success-800', bg: 'bg-success-100', dot: 'fill-success-600' },
    'Unlisted': { text: 'text-neutral-700', bg: 'bg-neutral-200', dot: 'fill-neutral-500' },
    'Sold': { text: 'text-info-800', bg: 'bg-info-100', dot: 'fill-info-600' },
    'Held': { text: 'text-yellow-800', bg: 'bg-yellow-100', dot: 'fill-yellow-500' },
  };

  const config = statusConfig[status] || statusConfig[Status.Info];

  return (
    <span className={`${baseClasses} ${config.text} ${config.bg}`}>
      {showDot && <span className={`mr-1.5 ${config.dot}`}>{ICONS.dot}</span>}
      {status}
    </span>
  );
};

export default StatusBadge;