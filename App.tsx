
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import CalendarScreen from './screens/CalendarScreen';
import InventoryScreen from './screens/InventoryScreen';
import OrdersScreen from './screens/OrdersScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import PricingBotsScreen from './screens/PricingBotsScreen';
import ReportsScreen from './screens/ReportsScreen';
import OperationalToolsScreen from './screens/OperationalToolsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AuditLogsScreen from './screens/AuditLogsScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import PasswordRecoveryScreen from './screens/PasswordRecoveryScreen';
import ProfileScreen from './screens/ProfileScreen';


const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Auth routes without the main layout */}
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/password-recovery" element={<PasswordRecoveryScreen />} />

        {/* Main application routes with the layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<CalendarScreen />} />
          <Route path="inventory" element={<InventoryScreen />} />
          <Route path="orders" element={<OrdersScreen />} />
          <Route path="marketplace" element={<MarketplaceScreen />} />
          <Route path="pricing-bots" element={<PricingBotsScreen />} />
          <Route path="reports" element={<ReportsScreen />} />
          <Route path="audit-logs" element={<AuditLogsScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="operational-tools" element={<OperationalToolsScreen />} />
          {/* A placeholder for a ticket detail page if needed, though drawers are used */}
          <Route path="inventory/ticket/:id" element={<div>Ticket Detail Page</div>} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
