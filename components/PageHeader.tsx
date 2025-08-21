
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="mb-6 md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold leading-7 text-black sm:text-3xl sm:truncate">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-base text-neutral-500">{description}</p>
        )}
      </div>
      {children && (
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;