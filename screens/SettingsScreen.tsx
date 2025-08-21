
import React from 'react';
import PageHeader from '../components/PageHeader';

const SettingsSection: React.FC<{title: string, description: string, children: React.ReactNode}> = ({ title, description, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-neutral-200">
        <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-black">{title}</h3>
            <p className="mt-1 text-base text-neutral-500">{description}</p>
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-card">
            {children}
        </div>
    </div>
);

const SettingsScreen: React.FC = () => {
    return (
        <>
            <PageHeader
                title="Settings"
                description="Manage application-wide configurations, security, and users."
            />

            <div className="divide-y divide-neutral-200">
                <SettingsSection
                    title="Users & Roles"
                    description="Manage team members and their access levels."
                >
                    <div className="text-center text-neutral-500 py-10">
                        <p>User list and role/permission matrix placeholder.</p>
                        <button className="mt-4 px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                            Invite User
                        </button>
                    </div>
                </SettingsSection>

                <SettingsSection
                    title="Secrets Management"
                    description="API keys for marketplaces, captcha solvers, and other integrations."
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-base font-medium text-neutral-700">Marketplace API Key</label>
                            <input type="password" value="**************" readOnly className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm font-mono"/>
                        </div>
                         <div>
                            <label className="block text-base font-medium text-neutral-700">Captcha Solver API Key</label>
                            <input type="password" value="**************" readOnly className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm font-mono"/>
                        </div>
                    </div>
                </SettingsSection>

                 <SettingsSection
                    title="Proxy & Fingerprint Profiles"
                    description="Configure proxy pools and browser fingerprint rotation policies."
                >
                    <div className="text-center text-neutral-500 py-10">
                        <p>Proxy and fingerprint configuration placeholder.</p>
                    </div>
                </SettingsSection>
            </div>
        </>
    );
};

export default SettingsScreen;