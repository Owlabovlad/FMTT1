
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import { REPORT_CHART_DATA } from '../constants';

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
                <input type="date" className="border border-neutral-300 rounded-md px-3 py-1.5"/>
                <span className="text-neutral-500">to</span>
                <input type="date" className="border border-neutral-300 rounded-md px-3 py-1.5"/>
                 <select className="border border-neutral-300 rounded-md px-3 py-1.5">
                    <option>Club: All</option>
                    <option>Man United</option>
                    <option>Chelsea</option>
                </select>
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