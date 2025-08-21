
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS, ICONS } from '../constants';

const Sidebar: React.FC = () => {
  const [isSecondaryNavOpen, setSecondaryNavOpen] = useState(true);

  const navLinkClasses = "flex items-center px-4 py-2.5 text-base font-medium rounded-md transition-colors";
  const activeClasses = "bg-primary text-white shadow-sm";
  const inactiveClasses = "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700";

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">T</div>
          <span className="text-xl font-bold text-black">Phase 1</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <div>
          <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Primary</h3>
          <div className="space-y-1">
            {NAV_LINKS.primary.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          <button
            onClick={() => setSecondaryNavOpen(!isSecondaryNavOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 hover:text-neutral-700"
          >
            <span>Secondary</span>
            <span className={`transform transition-transform ${isSecondaryNavOpen ? 'rotate-180' : ''}`}>{ICONS.chevronDown}</span>
          </button>
          {isSecondaryNavOpen && (
            <div className="space-y-1">
              {NAV_LINKS.secondary.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive, isPending }) => `${navLinkClasses} text-sm ${isActive ? activeClasses : inactiveClasses}`}
                >
                  <span className="mr-3 w-6 h-6 flex items-center justify-center">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>
      <div className="px-6 pb-6 mt-auto">
        <div className="bg-neutral-100 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-neutral-700">Need help?</h4>
            <p className="text-sm text-neutral-500 mt-1">Contact support or check our internal documentation.</p>
            <button className="mt-3 w-full text-base bg-white border border-neutral-300 rounded-md py-1.5 hover:bg-neutral-200 transition-colors">Documentation</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;