
import React from 'react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import { Status } from '../types';

const Card: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="bg-white rounded-lg shadow-card">
        <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-black">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const MarketplaceScreen: React.FC = () => {
    return (
        <>
            <PageHeader
                title="Marketplace Integration"
                description="Manage connection to your primary 3rd-party marketplace."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <Card title="Connection Status">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src="https://picsum.photos/seed/stubhub/48/48" alt="Marketplace Logo" className="w-12 h-12 rounded-md" />
                                <div>
                                    <p className="font-bold text-lg text-black">StubHub</p>
                                    <p className="text-base text-neutral-500">Primary Marketplace</p>
                                </div>
                            </div>
                            <StatusBadge status={Status.Connected} />
                        </div>
                        <div className="mt-4 border-t pt-4 text-base text-neutral-700 space-y-2">
                             <p><strong>Mode:</strong> Headless Automation</p>
                             <p><strong>Last Sync:</strong> 3 minutes ago</p>
                             <p><strong>Rate Limits:</strong> 95/100 requests remaining</p>
                        </div>
                    </Card>

                    <Card title="Listing Workflow: Headless Automation">
                        <div className="space-y-4 text-base">
                            <div className="flex justify-between items-center p-3 bg-neutral-100 rounded-md">
                                <p>Headless Browser Pool:</p>
                                <StatusBadge status={Status.Active} showDot={false} />
                            </div>
                             <div className="flex justify-between items-center p-3 bg-neutral-100 rounded-md">
                                <p>Captcha Requirements:</p>
                                <span className="font-semibold text-warning-600">hCaptcha</span>
                            </div>
                             <div className="flex justify-between items-center p-3 bg-neutral-100 rounded-md">
                                <p>Proxy Pool Status:</p>
                                <StatusBadge status={Status.Active} showDot={false} />
                            </div>
                        </div>
                    </Card>

                     <Card title="Sync Controls">
                        <div className="space-y-4 text-base">
                             <div className="flex justify-between items-center">
                                <label htmlFor="sync-direction" className="font-medium text-neutral-700">Sync Direction</label>
                                <select id="sync-direction" className="border border-neutral-300 rounded-md px-3 py-1.5">
                                    <option>One-way (Internal → Marketplace)</option>
                                    <option>Two-way</option>
                                </select>
                            </div>
                             <div className="flex justify-between items-center">
                                <label htmlFor="sync-interval" className="font-medium text-neutral-700">Sync Interval</label>
                                <input type="text" id="sync-interval" value="5 minutes" className="border border-neutral-300 rounded-md px-3 py-1.5 w-32 text-center" />
                            </div>
                        </div>
                     </Card>
                </div>
                
                <Card title="Activity Log">
                    <div className="h-96 overflow-y-auto bg-neutral-900 text-white font-mono text-sm p-4 rounded-md">
                        <p><span className="text-green-400">[SUCCESS]</span> [2024-07-22 10:30:15] Listed ticket MU-AR-S12-R5-P10 on StubHub.</p>
                        <p><span className="text-green-400">[SUCCESS]</span> [2024-07-22 10:30:18] Updated price for CH-LP-S5-R20-P4 to £275.00.</p>
                        <p><span className="text-yellow-400">[WARNING]</span> [2024-07-22 10:31:05] Captcha challenge encountered for listing SP-MC-S9-R1-P18. Queued for solving.</p>
                        <p><span className="text-red-400">[ERROR]</span> [2024-07-22 10:32:00] API rate limit exceeded. Throttling for 60s.</p>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default MarketplaceScreen;