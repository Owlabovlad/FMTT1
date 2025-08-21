import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { MOCK_CALENDAR_EVENTS } from '../constants';
import type { CalendarEvent } from '../types';

const EventCard: React.FC<{ event: CalendarEvent; onSelect: (event: CalendarEvent) => void; }> = ({ event, onSelect }) => {
    const { date, homeTeam, awayTeam, stadium, inventory } = event;
    const inventoryBadgeColor = inventory.total > 100 ? 'bg-success-100 text-success-800' : inventory.total > 20 ? 'bg-warning-100 text-warning-800' : 'bg-danger-100 text-danger-800';
    return (
        <div className="bg-white rounded-lg shadow-card p-4 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-base text-neutral-500">{date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                        <p className="font-semibold text-black">{homeTeam} vs {awayTeam}</p>
                        <p className="text-sm text-neutral-500">{stadium}</p>
                    </div>
                    <span className={`px-2 py-1 text-sm font-bold rounded-full ${inventoryBadgeColor}`}>{inventory.total}</span>
                </div>
                <div className="mt-4 text-sm space-y-1 text-neutral-700">
                    <p>Listed: {inventory.listed}</p>
                    <p>Sold: {inventory.sold}</p>
                    <p>Reserved: {inventory.reserved}</p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => onSelect(event)} className="text-base font-medium text-primary hover:text-primary/80">
                    Open Event
                </button>
            </div>
        </div>
    );
};

const CalendarScreen: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    return (
        <>
            <PageHeader
                title="Calendar"
                description="Time-based view to plan listings and fulfillment."
            />

            {/* Filters */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-card flex items-center gap-4 text-base">
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-primary text-white rounded-md">Month</button>
                    <button className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200">Week</button>
                </div>
                <div className="w-px h-6 bg-neutral-200"></div>
                <input type="text" placeholder="Filter by Club..." className="bg-neutral-700 text-neutral-100 placeholder-neutral-300 rounded-md px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-primary border border-transparent"/>
                <input type="text" placeholder="Filter by Competition..." className="bg-neutral-700 text-neutral-100 placeholder-neutral-300 rounded-md px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-primary border border-transparent"/>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
                    <span>Inventory > 0</span>
                </label>
            </div>

            <div className="flex gap-8">
                {/* Main Content */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300 ${selectedEvent ? 'lg:grid-cols-2 xl:grid-cols-3' : ''}`}>
                    {MOCK_CALENDAR_EVENTS.map((event, i) => <EventCard key={i} event={event} onSelect={setSelectedEvent} />)}
                </div>

                {/* Right Drawer */}
                <div className={`transition-all duration-300 ${selectedEvent ? 'w-1/3 opacity-100' : 'w-0 opacity-0'}`}>
                    {selectedEvent && (
                        <div className="bg-white rounded-lg shadow-card p-6 sticky top-8">
                           <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-black">{selectedEvent.homeTeam} vs {selectedEvent.awayTeam}</h3>
                                    <p className="text-base text-neutral-500">{selectedEvent.date.toLocaleDateString('en-GB', { dateStyle: 'full' })}</p>
                                </div>
                                <button onClick={() => setSelectedEvent(null)} className="text-neutral-500 hover:text-black">&times;</button>
                            </div>
                            <div className="mt-4 border-t pt-4">
                                <p className="text-base font-semibold mb-2">Tickets Breakdown</p>
                                <div className="text-center text-neutral-500 py-16 bg-neutral-100 rounded-md">
                                    <p>Detailed ticket breakdown table placeholder.</p>
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <button className="w-full text-base bg-primary text-white rounded-md py-2 hover:bg-primary/90">Bulk Price Rule</button>
                                    <button className="w-full text-base bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-md py-2 hover:bg-neutral-200">Bulk List</button>
                                    <button className="w-full text-base bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-md py-2 hover:bg-neutral-200">Export CSV</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CalendarScreen;