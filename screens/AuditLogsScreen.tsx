
import React from 'react';
import PageHeader from '../components/PageHeader';

const AuditLogsScreen: React.FC = () => {
    const mockLogs = [
        { timestamp: '2024-07-22 10:30:15', actor: 'Bot-PriceUpdater', action: 'PRICE_UPDATE', target: 'Ticket/CH-LP-S5-R20-P4', result: 'Success', metadata: 'Price changed from £280.00 to £275.00' },
        { timestamp: '2024-07-22 10:25:01', actor: 'Admin User', action: 'LOGIN', target: 'System', result: 'Success', metadata: 'IP: 192.168.1.1' },
        { timestamp: '2024-07-22 10:20:45', actor: 'Bot-Sync', action: 'INVENTORY_SYNC', target: 'Account/Main Account 1', result: 'Failure', metadata: 'Error: Session expired' },
    ];
    
    return (
        <>
            <PageHeader
                title="Audit Logs"
                description="Review actions performed by users and bots across the system."
            >
                <button className="px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                    Export Logs
                </button>
            </PageHeader>
            
             <div className="mb-6 p-4 bg-white rounded-lg shadow-card flex items-center gap-4 text-base">
                 <select className="border border-neutral-300 rounded-md px-3 py-1.5">
                    <option>Module: All</option>
                    <option>Inventory</option>
                    <option>Marketplace</option>
                    <option>Pricing</option>
                </select>
                <input type="text" placeholder="Filter by User/Bot..." className="border border-neutral-300 rounded-md px-3 py-1.5 w-48"/>
                 <input type="date" className="border border-neutral-300 rounded-md px-3 py-1.5"/>
            </div>

             <div className="bg-white rounded-lg shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-base text-left text-neutral-500">
                        <thead className="text-sm text-neutral-700 uppercase bg-neutral-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                                <th scope="col" className="px-6 py-3">Actor</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                                <th scope="col" className="px-6 py-3">Target</th>
                                <th scope="col" className="px-6 py-3">Result</th>
                                <th scope="col" className="px-6 py-3">Metadata</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockLogs.map((log, index) => (
                                <tr key={index} className="bg-white border-b border-neutral-200 hover:bg-neutral-50 font-mono text-sm">
                                    <td className="px-6 py-4">{log.timestamp}</td>
                                    <td className="px-6 py-4 text-black">{log.actor}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-neutral-200 text-neutral-700 rounded">{log.action}</span></td>
                                    <td className="px-6 py-4">{log.target}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-sans font-semibold ${log.result === 'Success' ? 'text-success-600' : 'text-danger-600'}`}>
                                            {log.result}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{log.metadata}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
        </>
    );
};

export default AuditLogsScreen;