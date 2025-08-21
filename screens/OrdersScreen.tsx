
import React from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import type { Order } from '../types';
import { MOCK_ORDERS } from '../constants';

const OrdersScreen: React.FC = () => {
    
    const orderColumns = [
        { header: 'Order ID', accessor: 'id' as keyof Order, render: (item: Order) => <span className="font-mono text-primary font-semibold">{item.id}</span> },
        { header: 'Marketplace', accessor: 'marketplace' as keyof Order },
        { header: 'Event', accessor: 'event' as keyof Order, render: (item: Order) => <span className="font-semibold text-black">{item.event}</span> },
        { header: 'Qty', accessor: 'quantity' as keyof Order },
        { header: 'Sale Price', accessor: 'price' as keyof Order, render: (item: Order) => `£${item.price.toFixed(2)}` },
        { header: 'Net Revenue', accessor: 'netRevenue' as keyof Order, render: (item: Order) => `£${item.netRevenue.toFixed(2)}` },
        { header: 'Status', accessor: 'status' as keyof Order, render: (item: Order) => <StatusBadge status={item.status} /> },
        { header: 'Age', accessor: 'age' as keyof Order },
        { header: 'Linked Ticket(s)', accessor: 'assignedTicket' as keyof Order, render: (item: Order) => item.assignedTicket ? <span className="font-mono text-sm">{item.assignedTicket}</span> : <span className="text-neutral-500">N/A</span> },
        { header: 'Actions', accessor: 'id' as keyof Order, render: (item: Order) => (
             <div className="flex gap-2">
                <button className="text-base font-medium text-primary hover:text-primary/80">View</button>
                {item.status !== 'Fulfilled' && <button className="text-base font-medium text-primary hover:text-primary/80">Fulfill</button>}
            </div>
        ) }
    ];

    return (
        <>
            <PageHeader
                title="Orders"
                description="Manage incoming sales from all marketplaces."
            >
                <button className="px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                    Export Orders
                </button>
            </PageHeader>
            
            {/* Filters */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-card flex items-center gap-4 text-base">
                 <select className="border border-neutral-300 rounded-md px-3 py-1.5">
                    <option>Status: All</option>
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Fulfilled</option>
                </select>
                <input type="text" placeholder="Filter by Event..." className="border border-neutral-300 rounded-md px-3 py-1.5 w-48"/>
                <input type="text" placeholder="Filter by Marketplace..." className="border border-neutral-300 rounded-md px-3 py-1.5 w-48"/>
            </div>

            <DataTable columns={orderColumns} data={MOCK_ORDERS} />
        </>
    );
};

export default OrdersScreen;