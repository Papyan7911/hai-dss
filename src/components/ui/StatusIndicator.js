import React from 'react';

const StatusIndicator = ({ status, children, size = 'sm' }) => {
    const colorMap = {
        pending: 'bg-yellow-400',
        processing: 'bg-orange-400',
        complete: 'bg-green-400',
        error: 'bg-red-400',
        info: 'bg-blue-400'
    };

    const sizeMap = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    return (
        <div className="flex items-center">
            <span className={`${sizeMap[size]} ${colorMap[status]} rounded-full mr-2 animate-pulse`}></span>
            {children}
        </div>
    );
};

export default StatusIndicator;