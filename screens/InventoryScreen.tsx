
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import type { ClubAccount, Ticket } from '../types';
import { MOCK_CLUB_ACCOUNTS, MOCK_TICKETS, ICONS } from '../constants';

const InventoryScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState('tickets');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedPrice, setSuggestedPrice] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTicket(null);
        setSuggestedPrice(null);
        setApiError(null);
    };

    const fetchSuggestedPrice = async (ticket: Ticket) => {
        setIsLoading(true);
        setSuggestedPrice(null);
        setApiError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Given the following ticket details and market context, suggest a single optimal listing price in GBP. Return only the numerical price, without currency symbols, commas, or any explanatory text. For example: 245.50

Ticket Details:
- Event: ${ticket.event}
- Seat: Block ${ticket.block}, Row ${ticket.row}, Seat ${ticket.seat}
- Your Purchase Price: £${ticket.purchasePrice.toFixed(2)}

Market Context:
- Historical sales for similar events show prices ranging from £${(ticket.purchasePrice * 1.5).toFixed(0)} to £${(ticket.purchasePrice * 4).toFixed(0)}.
- Recent sales velocity for this category is high.
- Competitor prices for this specific event are currently between £${(ticket.suggestedPrice * 0.9).toFixed(0)} and £${(ticket.suggestedPrice * 1.2).toFixed(0)}.
- The event is in 3 days, so demand is expected to be at its peak.

Based on this, what is the optimal listing price?`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const price = response.text.trim();
            if (!isNaN(parseFloat(price)) && isFinite(Number(price))) {
                 setSuggestedPrice(parseFloat(price).toFixed(2));
            } else {
                console.warn("Gemini returned a non-numeric response, using fallback:", response.text);
                setApiError("Received an invalid response from the AI. Using a fallback suggestion.");
                setSuggestedPrice((ticket.suggestedPrice * 1.05).toFixed(2));
            }
        } catch (error) {
            console.error("Error fetching suggested price from Gemini API:", error);
            setApiError("Failed to get a suggestion. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestPriceClick = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
        fetchSuggestedPrice(ticket);
    };

    const accountColumns = [
        { header: 'Club', accessor: 'club' as keyof ClubAccount, render: (item: ClubAccount) => <span className="font-semibold">{item.club}</span> },
        { header: 'Account Alias', accessor: 'alias' as keyof ClubAccount },
        { header: 'Email/ID', accessor: 'email' as keyof ClubAccount },
        { header: 'Session Status', accessor: 'sessionStatus' as keyof ClubAccount, render: (item: ClubAccount) => <StatusBadge status={item.sessionStatus} /> },
        { header: 'Last Sync', accessor: 'lastSync' as keyof ClubAccount },
        { header: 'Inventory', accessor: 'inventoryCount' as keyof ClubAccount },
        { header: 'Actions', accessor: 'club' as keyof ClubAccount, render: () => (
            <div className="flex gap-2">
                <button className="text-base font-medium text-primary hover:text-primary/80">Login</button>
                <button className="text-base font-medium text-primary hover:text-primary/80">Refresh</button>
            </div>
        )},
    ];

    const ticketColumns = [
        { header: 'Event', accessor: 'event' as keyof Ticket, render: (item: Ticket) => <span className="font-semibold">{item.event}</span> },
        { header: 'Seat', accessor: 'seat' as keyof Ticket, render: (item: Ticket) => `${item.block}/${item.row}/${item.seat}`},
        { header: 'Purchase Price', accessor: 'purchasePrice' as keyof Ticket, render: (item: Ticket) => `£${item.purchasePrice.toFixed(2)}` },
        { header: 'Suggested Price', accessor: 'suggestedPrice' as keyof Ticket, render: (item: Ticket) => `£${item.suggestedPrice.toFixed(2)}` },
        { header: 'Status', accessor: 'status' as keyof Ticket, render: (item: Ticket) => <StatusBadge status={item.status} /> },
        { header: 'Marketplace', accessor: 'marketplace' as keyof Ticket },
        { header: 'Actions', accessor: 'id' as keyof Ticket, render: (item: Ticket) => (
            <div className="flex items-center gap-4">
                <button onClick={() => handleSuggestPriceClick(item)} className="flex items-center gap-1 text-base font-medium text-primary hover:text-primary/80">
                  {ICONS.sparkles} Suggest
                </button>
                <button className="text-base font-medium text-primary hover:text-primary/80">Open</button>
                <button className="text-base font-medium text-primary hover:text-primary/80">List</button>
            </div>
        )},
    ];
    
    return (
        <>
            <PageHeader title="Inventory Management" description="Manage your club accounts and the tickets they hold."/>
            
            <div className="mb-6">
                <div className="border-b border-neutral-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('accounts')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${activeTab === 'accounts' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                        >
                            Club Accounts
                        </button>
                        <button
                            onClick={() => setActiveTab('tickets')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${activeTab === 'tickets' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                        >
                            Tickets
                        </button>
                    </nav>
                </div>
            </div>

            {activeTab === 'accounts' && <DataTable columns={accountColumns} data={MOCK_CLUB_ACCOUNTS} />}
            {activeTab === 'tickets' && <DataTable columns={ticketColumns} data={MOCK_TICKETS} />}

            {activeTab === 'tickets' && MOCK_TICKETS.length === 0 && (
                <div className="text-center py-20 bg-white rounded-lg shadow-card">
                    <h3 className="text-lg font-semibold text-black">No tickets found for filters</h3>
                    <p className="mt-1 text-base text-neutral-500">Clear filters or Sync now to find tickets.</p>
                    <button className="mt-4 px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                        Sync Now
                    </button>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={`AI Price Suggestion for ${selectedTicket?.event}`}
            >
                <div className="text-center min-h-[150px] flex flex-col justify-center">
                    {isLoading && (
                        <div>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-neutral-700">Generating suggestion...</p>
                        </div>
                    )}
                    {apiError && !isLoading && (
                        <div className="text-danger-600">
                            <p className="font-semibold">Error</p>
                            <p className="text-base">{apiError}</p>
                        </div>
                    )}
                    {suggestedPrice && !isLoading && (
                        <div>
                            <p className="text-base text-neutral-500">Our AI suggests the optimal listing price is:</p>
                            <p className="text-4xl font-bold text-success-600 my-2">£{suggestedPrice}</p>
                             <div className="mt-6 flex justify-center gap-4">
                                <button onClick={handleCloseModal} className="px-6 py-2 text-base font-medium text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200 border border-neutral-300">
                                    Close
                                </button>
                                 <button onClick={handleCloseModal} className="px-6 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                                    Accept & Update
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default InventoryScreen;