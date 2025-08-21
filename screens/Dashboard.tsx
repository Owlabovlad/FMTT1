
import React from 'react';
import PageHeader from '../components/PageHeader';
import KpiCard from '../components/KpiCard';
import HealthCard from '../components/HealthCard';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import type { Order } from '../types';
import { MOCK_KPIS, MOCK_ORDERS, MOCK_SYNC_HEALTH } from '../constants';

const Dashboard: React.FC = () => {

  const orderColumns = [
    { header: 'Order ID', accessor: 'id' as keyof Order, render: (item: Order) => <span className="font-mono text-primary">{item.id}</span> },
    { header: 'Event', accessor: 'event' as keyof Order },
    { header: 'Qty', accessor: 'quantity' as keyof Order },
    { header: 'Price', accessor: 'price' as keyof Order, render: (item: Order) => `£${item.price.toFixed(2)}` },
    { header: 'Status', accessor: 'status' as keyof Order, render: (item: Order) => <StatusBadge status={item.status} /> },
    { header: 'Age', accessor: 'age' as keyof Order },
    { header: 'Actions', accessor: 'id' as keyof Order, render: () => <button className="font-medium text-primary hover:text-primary/80">Mark Fulfilled</button> }
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Single-glance view of today’s operations and system health."
      />
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {MOCK_KPIS.map(kpi => <KpiCard key={kpi.title} kpi={kpi} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Open Orders */}
          <DataTable title="Open Orders" columns={orderColumns} data={MOCK_ORDERS} />
          {/* Calendar Widget Placeholder */}
           <div className="bg-white p-6 rounded-lg shadow-card">
              <h3 className="text-lg font-semibold text-black mb-4">Upcoming Fixtures (Next 2 Weeks)</h3>
              <div className="text-center text-neutral-500 py-10">
                Compact calendar widget would be displayed here.
              </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Sync Health */}
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold text-black mb-4">Sync Health</h3>
            <div className="space-y-3">
              {MOCK_SYNC_HEALTH.map(item => <HealthCard key={item.name} item={item} />)}
            </div>
          </div>

          {/* Captcha Queue Mini */}
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold text-black">Captcha Queue</h3>
            <div className="mt-4 flex justify-between items-baseline">
                <div>
                    <p className="text-3xl font-bold text-warning-600">12</p>
                    <p className="text-base text-neutral-500">Pending</p>
                </div>
                <div>
                    <p className="text-lg font-semibold">45s</p>
                    <p className="text-base text-neutral-500">Avg. Wait</p>
                </div>
            </div>
             <a href="#/operational-tools" className="mt-4 block text-center text-base font-medium text-primary hover:text-primary/80">View Full Queue →</a>
          </div>

          {/* Session Health Mini */}
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold text-black">Session Health</h3>
            <div className="mt-4 flex justify-between items-baseline">
                <div>
                    <p className="text-3xl font-bold text-success-600">42</p>
                    <p className="text-base text-neutral-500">Active</p>
                </div>
                <div>
                    <p className="text-lg font-semibold text-danger-600">8</p>
                    <p className="text-base text-neutral-500">Failures (24h)</p>
                </div>
            </div>
             <a href="#/operational-tools" className="mt-4 block text-center text-base font-medium text-primary hover:text-primary/80">View All Sessions →</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;