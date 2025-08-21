import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import { REPORT_CHART_DATA, ICONS } from '../constants';
import DateInput from '../components/DateInput';

const ChartCard: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-card">
        <h3 className="text-lg font-semibold text-black mb-4">{title}</h3>
        <div style={{ width: '100%', height: 300 }}>
            {children}
        </div>
    </div>
);

const ReportsScreen: React.FC = () => {
    return (
        <>
            <PageHeader
                title="Reports & Analytics"
                description="Visualize sales trends, profit margins, and top-performing events."
            >
                <button className="px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                    Export Data
                </button>
            </PageHeader>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-card flex items-center gap-4 text-base">
                <DateInput className="w-48" placeholder="ДД.ММ.ГГГГ" ariaLabel="Start date" />
                <span className="text-neutral-500">to</span>
                <DateInput className="w-48" placeholder="ДД.ММ.ГГГГ" ariaLabel="End date" />
                 <div className="relative">
                    <select className="bg-neutral-700 text-neutral-100 rounded-md pl-3 pr-8 py-1.5 appearance-none focus:outline-none focus:ring-2 focus:ring-primary border border-transparent">
                        <option>Club: All</option>
                        <option>Man United</option>
                        <option>Chelsea</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-300">
                        {ICONS.chevronDown}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartCard title="Tickets Sold vs. Bought (Trend)">
                    <ResponsiveContainer>
                        <LineChart data={REPORT_CHART_DATA.sales}>
                            <CartesianGrid stroke="#ededed" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sold" stroke="rgb(255, 81, 118)" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="bought" stroke="#b196a6" />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
                
                <ChartCard title="Profit by Club">
                    <ResponsiveContainer>
                        <BarChart data={REPORT_CHART_DATA.profit}>
                            <CartesianGrid stroke="#ededed" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `£${value}`} />
                            <Legend />
                            <Bar dataKey="profit" fill="#ed3253" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </>
    );
};

export default ReportsScreen;