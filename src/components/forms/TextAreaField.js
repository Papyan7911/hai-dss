import React from 'react';

const TextAreaField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  rows = 3, 
  required = false,
  className = ""
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-2 font-bold text-gray-600">
        {label}:
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-vertical"
      />
    </div>
  );
};

export default TextAreaField;