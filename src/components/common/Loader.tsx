import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'text-orange-500',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${className} flex justify-center items-center`}>
      <div className={`${sizeClasses[size]} ${color} animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;