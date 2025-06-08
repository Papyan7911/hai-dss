import React from 'react';

const ProgressBar = ({
    value,
    className = "",
    color = 'green',
    height = 'h-3',
    animated = true,
    showLabel = false
}) => {
    const colorClasses = {
        green: 'from-green-500 to-emerald-500',
        blue: 'from-blue-500 to-indigo-500',
        purple: 'from-purple-500 to-indigo-500',
        red: 'from-red-500 to-pink-500'
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Առաջընթաց</span>
                    <span>{value}%</span>
                </div>
            )}
            <div className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden my-2`}>
                <div
                    className={`${height} bg-gradient-to-r ${colorClasses[color]} ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
