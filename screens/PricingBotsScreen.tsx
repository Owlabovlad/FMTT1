
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { MOCK_PRICING_RULES } from '../constants';
import type { PricingRule } from '../types';

const PricingBotsScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState('rules');

    const ruleColumns = [
        { header: 'Rule Name', accessor: 'name' as keyof PricingRule, render: (item: PricingRule) => <span className="font-semibold text-black">{item.name}</span> },
        { header: 'Scope', accessor: 'scope' as keyof PricingRule },
        { header: 'Strategy', accessor: 'strategy' as keyof PricingRule },
        { header: 'Floors (Min/Max)', accessor: 'floors' as keyof PricingRule },
        { header: 'Cooldown', accessor: 'cooldown' as keyof PricingRule },
        { header: 'Status', accessor: 'active' as keyof PricingRule, render: (item: PricingRule) => (
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={item.active} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
        )},
        { header: 'Actions', accessor: 'name' as keyof PricingRule, render: () => (
             <div className="flex gap-2">
                <button className="text-base font-medium text-primary hover:text-primary/80">Edit</button>
                <button className="text-base font-medium text-danger-600 hover:text-danger-800">Delete</button>
            </div>
        )},
    ];
    
    return (
        <>
            <PageHeader title="Pricing Bots" description="Automate your ticket pricing with custom rules and competitor monitoring."/>

            <div className="mb-6">
                <div className="border-b border-neutral-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('rules')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${activeTab === 'rules' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                        >
                            Rules
                        </button>
                        <button
                            onClick={() => setActiveTab('competitors')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${activeTab === 'competitors' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                        >
                            Competitors
                        </button>
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${activeTab === 'logs' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                        >
                            Logs
                        </button>
                    </nav>
                </div>
            </div>

            {activeTab === 'rules' && (
                <div>
                     <div className="flex justify-end mb-4">
                        <button className="px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                            Create New Rule
                        </button>
                    </div>
                    <DataTable columns={ruleColumns} data={MOCK_PRICING_RULES} />
                </div>
            )}
            {activeTab === 'competitors' && (
                 <div className="text-center py-20 bg-white rounded-lg shadow-card">
                    <h3 className="text-lg font-semibold text-black">Competitor Monitoring</h3>
                    <p className="mt-1 text-base text-neutral-500">Live table of competing listings would be displayed here.</p>
                </div>
            )}
            {activeTab === 'logs' && (
                 <div className="text-center py-20 bg-white rounded-lg shadow-card">
                    <h3 className="text-lg font-semibold text-black">Pricing Logs</h3>
                     <p className="mt-1 text-base text-neutral-500">A log of all price changes would be displayed here.</p>
                </div>
            )}

        </>
    );
};

export default PricingBotsScreen;