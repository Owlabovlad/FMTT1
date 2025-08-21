
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex-shrink-0">
      <div className="flex items-center justify-between h-full px-6 lg:px-8">
        {/* Global Search */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
            {ICONS.search}
          </span>
          <input
            type="search"
            placeholder="Search events, orders, tickets..."
            className="w-64 lg:w-96 pl-10 pr-4 py-2 text-base border border-neutral-300 rounded-md bg-neutral-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-success-100 text-success-800 border border-green-200">
            Production
          </span>
          
          <button className="flex items-center gap-2 px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm">
            {ICONS.sync}
            <span>Sync Now</span>
          </button>
          
          <div className="w-px h-6 bg-neutral-200"></div>

          <div className="relative" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2">
              <img 
                src="https://picsum.photos/seed/user/40/40" 
                alt="User" 
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left hidden md:block">
                  <p className="text-base font-medium text-black">Admin User</p>
                  <p className="text-sm text-neutral-500">System Administrator</p>
              </div>
              <span className={`text-neutral-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>{ICONS.chevronDown}</span>
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-neutral-200">
                <Link to="/profile" className="block px-4 py-2 text-base text-neutral-700 hover:bg-neutral-100">My Profile</Link>
                <Link to="/settings" className="block px-4 py-2 text-base text-neutral-700 hover:bg-neutral-100">Admin Settings</Link>
                <div className="border-t border-neutral-100 my-1"></div>
                <Link to="/signin" className="block px-4 py-2 text-base text-danger-600 hover:bg-danger-100">Sign Out</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;