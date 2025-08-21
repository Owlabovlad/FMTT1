
import React from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { MOCK_CAPTCHA_QUEUE, MOCK_SESSIONS } from '../constants';
import type { CaptchaTask, Session } from '../types';
import { Status } from '../types';

const SessionCard: React.FC<{ session: Session }> = ({ session }) => {
    const statusClasses = {
        [Status.Active]: 'border-l-4 border-success-600',
        [Status.Warning]: 'border-l-4 border-warning-600',
        [Status.Expired]: 'border-l-4 border-danger-600',
        [Status.Blocked]: 'border-l-4 border-danger-600 bg-danger-100',
    };
    const cardClass = statusClasses[session.status] || 'border-l-4 border-neutral-300';

    return (
        <div className={`bg-white p-4 rounded-md shadow-card ${cardClass}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-black">{session.portal}</p>
                    <StatusBadge status={session.status} showDot={false}/>
                </div>
                 <button className="text-base font-medium text-primary hover:text-primary/80">
                    Re-login
                </button>
            </div>
            <div className="mt-3 text-sm text-neutral-500 space-y-1">
                <p><strong>Last Login:</strong> {session.lastLogin}</p>
                <p><strong>Failures (24h):</strong> <span className={session.failures24h > 0 ? 'text-danger-600 font-semibold' : ''}>{session.failures24h}</span></p>
                <p><strong>Next Login:</strong> {session.nextScheduledLogin}</p>
                <p><strong>Proxy:</strong> <span className="font-mono">{session.proxy}</span></p>
            </div>
        </div>
    );
};

const OperationalToolsScreen: React.FC = () => {

    const captchaColumns = [
        { header: 'Target Site', accessor: 'targetSite' as keyof CaptchaTask, render: (item: CaptchaTask) => <span className="font-semibold text-black">{item.targetSite}</span> },
        { header: 'Type', accessor: 'type' as keyof CaptchaTask },
        { header: 'Owner Account', accessor: 'ownerAccount' as keyof CaptchaTask },
        { header: 'Created', accessor: 'createdAt' as keyof CaptchaTask },
        { header: 'Status', accessor: 'status' as keyof CaptchaTask, render: (item: CaptchaTask) => <StatusBadge status={item.status}/> },
        { header: 'Actions', accessor: 'id' as keyof CaptchaTask, render: () => (
            <div className="flex gap-2">
                <button className="text-base font-medium text-primary hover:text-primary/80">Assign Solver</button>
                <button className="text-base font-medium text-warning-600 hover:text-warning-800">Retry</button>
            </div>
        )}
    ];

    return (
        <>
            <PageHeader
                title="Operational Tools"
                description="Manage captcha queues and monitor account session health."
            />
            
            <div className="space-y-12">
                <div>
                    <h2 className="text-xl font-semibold text-black mb-4">Captcha Queue</h2>
                    <DataTable columns={captchaColumns} data={MOCK_CAPTCHA_QUEUE} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-black mb-4">Session Health</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {MOCK_SESSIONS.map(session => <SessionCard key={session.portal} session={session} />)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OperationalToolsScreen;