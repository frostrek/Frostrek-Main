import React from 'react';

interface FlipTextProps {
  children: React.ReactNode;
  className?: string;
}

const FlipText: React.FC<FlipTextProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden h-[1.6em] pointer-events-none ${className}`}>
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-1/2">
        <span className="flex items-center justify-center gap-2 whitespace-nowrap h-[1.6em] px-0.5">
          {children}
        </span>
        <span className="flex items-center justify-center gap-2 whitespace-nowrap h-[1.6em] px-0.5">
          {children}
        </span>
      </div>
    </div>
  );
};

export default FlipText;
