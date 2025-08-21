
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { ICONS, MOCK_API_TOKENS, MOCK_USER_SESSIONS } from '../constants';
import DataTable from '../components/DataTable';
import type { ApiToken, UserSession } from '../types';


const ProfileScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const tabs = [
        { name: 'Profile', icon: ICONS.profile },
        { name: 'Security', icon: ICONS.security },
        { name: 'Notifications', icon: ICONS.notifications },
        { name: 'API & Integrations', icon: ICONS.api },
        { name: 'Sessions', icon: ICONS.sessions },
    ];
    
    const apiTokenColumns = [
        { header: 'Name', accessor: 'name' as keyof ApiToken, render: (item: ApiToken) => <span className="font-semibold text-black">{item.name}</span> },
        { header: 'Created', accessor: 'created' as keyof ApiToken },
        { header: 'Last Used', accessor: 'lastUsed' as keyof ApiToken },
        { header: 'Scope', accessor: 'scope' as keyof ApiToken, render: (item: ApiToken) => item.scope.map(s => <span key={s} className="mr-1 inline-flex items-center px-2 py-0.5 rounded text-sm font-mono bg-neutral-100 text-neutral-800">{s}</span>) },
        { header: 'Actions', accessor: 'id' as keyof ApiToken, render: () => <button className="font-medium text-danger-600 hover:text-danger-800">Revoke</button> },
    ];

    const sessionColumns = [
        { header: 'Device / Browser', accessor: 'device' as keyof UserSession, render: (item: UserSession) => <span className="font-semibold text-black">{item.device}</span> },
        { header: 'IP Address', accessor: 'ip' as keyof UserSession, render: (item: UserSession) => <span className="font-mono">{item.ip}</span> },
        { header: 'Location', accessor: 'location' as keyof UserSession },
        { header: 'Last Active', accessor: 'lastActive' as keyof UserSession },
        { header: 'Actions', accessor: 'id' as keyof UserSession, render: (item: UserSession) => <button className="font-medium text-danger-600 hover:text-danger-800" disabled={item.lastActive === 'Current session'}>Sign out</button> },
    ];

    const TabContent = () => {
        switch (activeTab) {
            case 'Security':
                return (
                    <div className="space-y-8">
                        <SectionCard title="Change Password">
                            <form className="space-y-4">
                                <div><label className="block text-base font-medium">Current Password</label><input type="password" className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm" /></div>
                                <div><label className="block text-base font-medium">New Password</label><input type="password" className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm" /></div>
                                <div><label className="block text-base font-medium">Confirm New Password</label><input type="password" className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm" /></div>
                                <div className="text-right"><button className="px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">Update Password</button></div>
                            </form>
                        </SectionCard>
                        <SectionCard title="Two-Factor Authentication (2FA)">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-semibold">2FA is currently disabled.</h4>
                                    <p className="text-base text-neutral-500 mt-1">Add an extra layer of security to your account.</p>
                                </div>
                                <button className="px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">Enable 2FA</button>
                            </div>
                        </SectionCard>
                         <SectionCard title="Danger Zone" borderClass="border-danger-300">
                             <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-semibold text-danger-800">Disable Account</h4>
                                    <p className="text-base text-neutral-500 mt-1">Your account will be deactivated and you will lose access.</p>
                                </div>
                                <button className="px-4 py-2 text-base font-medium text-white bg-danger-600 rounded-md hover:bg-danger-700">Disable My Account</button>
                            </div>
                        </SectionCard>
                    </div>
                );
            case 'Notifications':
                return <SectionCard title="Notification Settings"><p className="text-neutral-500 text-center py-10">Notification settings placeholder.</p></SectionCard>;
            case 'API & Integrations':
                 return (
                    <div>
                         <div className="flex justify-end mb-4">
                            <button className="px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                                Create New Token
                            </button>
                        </div>
                        <DataTable columns={apiTokenColumns} data={MOCK_API_TOKENS} title="Personal API Tokens"/>
                    </div>
                );
            case 'Sessions':
                return <DataTable columns={sessionColumns} data={MOCK_USER_SESSIONS} title="Active Sessions" />;
            case 'Profile':
            default:
                return (
                     <SectionCard title="Personal Information">
                        <form className="space-y-4">
                             <div className="flex items-center gap-4">
                                <img src="https://picsum.photos/seed/user/96/96" alt="User" className="w-24 h-24 rounded-full"/>
                                <button type="button" className="px-3 py-1.5 text-base border border-neutral-300 rounded-md hover:bg-neutral-100">Change Avatar</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-base font-medium">First Name</label><input type="text" defaultValue="Admin" className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm" /></div>
                                <div><label className="block text-base font-medium">Last Name</label><input type="text" defaultValue="User" className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm" /></div>
                            </div>
                            <div><label className="block text-base font-medium">Email Address</label><input type="email" defaultValue="admin.user@example.com" className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm" /></div>
                            <div className="text-right"><button className="px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">Save Changes</button></div>
                        </form>
                    </SectionCard>
                );
        }
    };
    
    return (
        <>
            <PageHeader
                title="Profile & Settings"
                description="Manage your personal info, security, and integrations."
            />
            
            <div className="mb-6 border-b border-neutral-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`whitespace-nowrap flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-base ${activeTab === tab.name ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div>
                <TabContent />
            </div>
        </>
    );
};


const SectionCard: React.FC<{title: string; children: React.ReactNode; borderClass?: string}> = ({title, children, borderClass = 'border-neutral-200'}) => (
     <div className={`bg-white rounded-lg shadow-card border ${borderClass}`}>
        <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-black">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
)

export default ProfileScreen;