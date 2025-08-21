import React from 'react';
import type { CalendarEvent, ClubAccount, Kpi, Order, PricingRule, SyncHealth, Ticket, CaptchaTask, Session, ApiToken, UserSession } from './types';
import { Status } from './types';

export const ICONS = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M4 4h16v4H4z" /></svg>,
    calendar: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    inventory: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
    orders: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    marketplace: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    bots: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l-1.414-1.414M6.343 6.343l-1.414 1.414m12.728 0l-1.414-1.414M6.343 17.657l-1.414-1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    reports: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    logs: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    captcha: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    session: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    dev: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    chevronDown: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
    search: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    sync: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" /></svg>,
    user: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    dot: <svg viewBox="0 0 8 8" className="h-2 w-2"><circle cx="4" cy="4" r="3" /></svg>,
    profile: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    security: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    notifications: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    api: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    sessions: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    sparkles: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M17 3v4m-2-2h4m-6 8v4m-2-2h4m5-13l-1.06 1.06M6.06 6.06L5 5m13 14l-1.06-1.06M6.06 17.94L5 19m0-13l1.06 1.06M17.94 6.06L19 5m-14 14l1.06-1.06M17.94 17.94L19 19" /></svg>,
};

export const NAV_LINKS = {
    primary: [
        { name: 'Dashboard', href: '/dashboard', icon: ICONS.dashboard },
        { name: 'Calendar', href: '/calendar', icon: ICONS.calendar },
        { name: 'Inventory', href: '/inventory', icon: ICONS.inventory },
        { name: 'Orders', href: '/orders', icon: ICONS.orders },
        { name: 'Marketplace', href: '/marketplace', icon: ICONS.marketplace },
        { name: 'Pricing Bots', href: '/pricing-bots', icon: ICONS.bots },
        { name: 'Reports', href: '/reports', icon: ICONS.reports },
        { name: 'Audit Logs', href: '/audit-logs', icon: ICONS.logs },
        { name: 'Settings', href: '/settings', icon: ICONS.settings },
    ],
    secondary: [
        { name: 'Captcha Queue', href: '/operational-tools', icon: ICONS.captcha },
        { name: 'Session Health', href: '/operational-tools', icon: ICONS.session },
        { name: 'Dev Tools', href: '/operational-tools', icon: ICONS.dev },
    ]
};

export const MOCK_KPIS: Kpi[] = [
    { title: 'Tickets Available', value: '1,428', change: '+12.5%', changeType: 'increase' },
    { title: 'Tickets Listed (Today)', value: '256', change: '+8.2%', changeType: 'increase' },
    { title: 'Orders Today', value: '84', change: '-2.1%', changeType: 'decrease' },
    { title: 'Gross Profit (Today)', value: '£12,450', change: '+5.7%', changeType: 'increase' },
];

export const MOCK_SYNC_HEALTH: SyncHealth[] = [
    { name: 'Man United Portal', status: Status.Success, lastSync: '2 min ago' },
    { name: 'StubHub Marketplace', status: Status.Success, lastSync: '3 min ago' },
    { name: 'Viagogo Competitor', status: Status.Warning, lastSync: '15 min ago' },
    { name: 'Chelsea FC Portal', status: Status.Error, lastSync: '1 hr ago' },
];

export const MOCK_ORDERS: Order[] = [
    { id: 'ORD-2407-001', event: 'Man United vs Arsenal', quantity: 2, price: 450.00, status: Status.New, age: '5m', assignedTicket: 'A123-B45-C6', marketplace: 'StubHub', netRevenue: 405.00 },
    { id: 'ORD-2407-002', event: 'Chelsea vs Liverpool', quantity: 4, price: 820.00, status: Status.InProgress, age: '2h', marketplace: 'Viagogo', netRevenue: 738.00 },
    { id: 'ORD-2407-003', event: 'Spurs vs Man City', quantity: 1, price: 180.00, status: Status.Fulfilled, age: '1d', assignedTicket: 'D987-E65-F4', marketplace: 'StubHub', netRevenue: 162.00 },
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
    { date: new Date(2024, 7, 10), homeTeam: 'Man United', awayTeam: 'Fulham', stadium: 'Old Trafford', inventory: { total: 120, reserved: 10, listed: 80, sold: 30 } },
    { date: new Date(2024, 7, 12), homeTeam: 'Chelsea', awayTeam: 'Man City', stadium: 'Stamford Bridge', inventory: { total: 80, reserved: 5, listed: 60, sold: 15 } },
    { date: new Date(2024, 7, 17), homeTeam: 'Arsenal', awayTeam: 'Liverpool', stadium: 'Emirates Stadium', inventory: { total: 200, reserved: 20, listed: 150, sold: 30 } },
];

export const MOCK_CLUB_ACCOUNTS: ClubAccount[] = [
    { club: 'Man United', alias: 'Main Account 1', email: 'user***@gmail.com', sessionStatus: Status.Active, lastSync: '2 min ago', requirements: ['2FA'], inventoryCount: 58 },
    { club: 'Chelsea FC', alias: 'Backup Account', email: 'chel***@outlook.com', sessionStatus: Status.NeedsLogin, lastSync: '1 hr ago', requirements: ['Captcha', '2FA'], inventoryCount: 22 },
    { club: 'Spurs', alias: 'Bulk Buyer', email: 'tot***@proton.me', sessionStatus: Status.Active, lastSync: '15 min ago', requirements: [], inventoryCount: 112 },
    { club: 'Man City', alias: 'Primary MCFC', email: 'city***@gmail.com', sessionStatus: Status.Error, lastSync: '3 hr ago', requirements: ['2FA'], inventoryCount: 41 },
];

export const MOCK_TICKETS: Ticket[] = [
    { id: 'MU-AR-S12-R5-P10', event: 'Man United vs Arsenal', block: 'N1404', row: '12', seat: '101', purchasePrice: 85.00, suggestedPrice: 225.00, status: 'Listed', marketplace: 'StubHub', lastPriceUpdate: '1h ago' },
    { id: 'CH-LP-S5-R20-P4', event: 'Chelsea vs Liverpool', block: 'East Upper', row: '20', seat: '44', purchasePrice: 110.00, suggestedPrice: 280.00, status: 'Unlisted', lastPriceUpdate: '4h ago' },
    { id: 'SP-MC-S9-R1-P18', event: 'Spurs vs Man City', block: 'South Lower', row: '1', seat: '18', purchasePrice: 95.00, suggestedPrice: 240.00, status: 'Sold', lastPriceUpdate: '2d ago' },
];

export const MOCK_PRICING_RULES: PricingRule[] = [
    { name: 'Aggressive Undercut', scope: 'Man United, Home Games', strategy: 'Undercut by £1', floors: '£150 / £500', cooldown: '5 min', active: true },
    { name: 'Match Median - Top Tiers', scope: 'Tier 1 Events', strategy: 'Match median', floors: '£200 / £800', cooldown: '15 min', active: true },
    { name: 'Weekend Surge Pricing', scope: 'All Events (Sat/Sun)', strategy: 'Percent Undercut (2%)', floors: '£100 / £600', cooldown: '10 min', active: false },
];

export const MOCK_CAPTCHA_QUEUE: CaptchaTask[] = [
    { id: 'C-001', targetSite: 'ManUtd.com/login', type: 'reCAPTCHA v2', ownerAccount: 'Main Account 1', createdAt: '2 min ago', status: Status.Pending },
    { id: 'C-002', targetSite: 'Viagogo.com/list', type: 'hCaptcha', ownerAccount: 'Marketplace Bot', createdAt: '5 min ago', status: Status.Pending },
    { id: 'C-003', targetSite: 'ChelseaFC.com/login', type: 'reCAPTCHA v3', ownerAccount: 'Backup Account', createdAt: '10 min ago', status: Status.Solved },
];

export const MOCK_SESSIONS: Session[] = [
    { portal: 'ManUnited', status: Status.Active, lastLogin: '2 hours ago', failures24h: 0, nextScheduledLogin: 'in 4 hours', proxy: 'US-NY-RES-01' },
    { portal: 'Chelsea', status: Status.Expired, lastLogin: '1 day ago', failures24h: 3, nextScheduledLogin: 'in 15 minutes', proxy: 'UK-LDN-DC-05' },
    { portal: 'Spurs', status: Status.Active, lastLogin: '15 minutes ago', failures24h: 0, nextScheduledLogin: 'in 6 hours', proxy: 'US-NY-RES-02' },
    { portal: 'ManCity', status: Status.Blocked, lastLogin: '4 hours ago', failures24h: 8, nextScheduledLogin: 'Paused', proxy: 'UK-LDN-DC-08' },
    { portal: 'Liverpool', status: Status.Active, lastLogin: '30 minutes ago', failures24h: 0, nextScheduledLogin: 'in 2 hours', proxy: 'US-DAL-RES-11' },
    { portal: 'NFL@Spurs', status: Status.Warning, lastLogin: '6 hours ago', failures24h: 1, nextScheduledLogin: 'in 1 hour', proxy: 'UK-MAN-DC-01' },
];

export const REPORT_CHART_DATA = {
    sales: [
        { name: 'Jan', sold: 400, bought: 240 }, { name: 'Feb', sold: 300, bought: 139 },
        { name: 'Mar', sold: 200, bought: 980 }, { name: 'Apr', sold: 278, bought: 390 },
        { name: 'May', sold: 189, bought: 480 }, { name: 'Jun', sold: 239, bought: 380 },
        { name: 'Jul', sold: 349, bought: 430 },
    ],
    profit: [
        { name: 'Man United', profit: 4000 }, { name: 'Chelsea', profit: 3000 },
        { name: 'Spurs', profit: 2000 }, { name: 'Man City', profit: 2780 },
        { name: 'Liverpool', profit: 1890 }, { name: 'Arsenal', profit: 2390 },
    ]
};

export const MOCK_API_TOKENS: ApiToken[] = [
    { id: 'tok_1', name: 'Reporting Script', created: '2024-06-15', lastUsed: '2024-07-22', scope: ['orders:read', 'inventory:read'] },
    { id: 'tok_2', name: 'External Dashboard', created: '2024-05-20', lastUsed: '2024-07-21', scope: ['reports:read'] },
];

export const MOCK_USER_SESSIONS: UserSession[] = [
    { id: 'sess_1', device: 'Chrome on macOS', ip: '8.8.8.8', location: 'New York, USA', lastActive: 'Current session', created: '2024-07-22' },
    { id: 'sess_2', device: 'iPhone App', ip: '2001:4860::', location: 'London, UK', lastActive: '2 hours ago', created: '2024-07-21' },
];