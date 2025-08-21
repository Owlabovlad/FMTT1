import React from 'react';

const DateInput: React.FC<{ placeholder?: string; className?: string; ariaLabel: string; }> = ({ placeholder = 'ДД.ММ.ГГГГ', className = '', ariaLabel }) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.type = 'date';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            e.target.type = 'text';
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="bg-neutral-700 text-neutral-100 placeholder-neutral-300 rounded-md pl-3 pr-10 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-primary appearance-none border border-transparent"
                aria-label={ariaLabel}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </span>
        </div>
    );
};

export default DateInput;
