import React from 'react';

const Alert = ({ type = 'info', children, className = "" }) => {
    const typeMap = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800'
    };

    const iconMap = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };

    return (
        <div className={`border rounded-lg p-4 ${typeMap[type]} ${className}`}>
            <div className="flex items-start">
                <span className="text-lg mr-2">{iconMap[type]}</span>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
};

export default Alert;