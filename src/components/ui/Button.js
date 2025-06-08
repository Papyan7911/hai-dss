import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = "",
    type = 'button'
}) => {
    const baseClasses = "rounded-lg font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:-translate-y-1 hover:shadow-lg",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:-translate-y-1 hover:shadow-lg",
        danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:-translate-y-1 hover:shadow-lg"
    };

    const sizeClasses = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;