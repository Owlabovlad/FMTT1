
export enum Status {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
  Info = 'Info',
  Active = 'Active',
  NeedsLogin = 'Needs Login',
  Expired = 'Expired',
  Blocked = 'Blocked',
  Pending = 'Pending',
  Solved = 'Solved',
  InProgress = 'In Progress',
  Fulfilled = 'Fulfilled',
  New = 'New',
  Connected = 'Connected',
  NeedsReauth = 'Needs Reauth',
}

export interface Kpi {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export interface SyncHealth {
  name: string;
  status: Status;
  lastSync: string;
}

export interface Order {
  id: string;
  event: string;
  quantity: number;
  price: number;
  status: Status;
  age: string;
  assignedTicket?: string;
  marketplace: string;
  netRevenue: number;
}

export interface CalendarEvent {
  date: Date;
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  inventory: {
    total: number;
    reserved: number;
    listed: number;
    sold: number;
  };
}

export interface ClubAccount {
  club: string;
  alias: string;
  email: string;
  sessionStatus: Status;
  lastSync: string;
  requirements: string[];
  inventoryCount: number;
}

export interface Ticket {
  id: string;
  event: string;
  block: string;
  row: string;
  seat: string;
  purchasePrice: number;
  suggestedPrice: number;
  status: 'Unlisted' | 'Listed' | 'Sold' | 'Held';
  marketplace?: string;
  lastPriceUpdate: string;
}

export interface PricingRule {
  name: string;
  scope: string;
  strategy: string;
  floors: string;
  cooldown: string;
  active: boolean;
}

export interface CaptchaTask {
  id: string;
  targetSite: string;
  type: 'reCAPTCHA v2' | 'reCAPTCHA v3' | 'hCaptcha';
  ownerAccount: string;
  createdAt: string;
  status: Status;
}

export interface Session {
    portal: string;
    status: Status;
    lastLogin: string;
    failures24h: number;
    nextScheduledLogin: string;
    proxy: string;
}

export interface ApiToken {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  scope: string[];
}

export interface UserSession {
  id: string;
  device: string;
  ip: string;
  location: string;
  lastActive: string;
  created: string;
}
