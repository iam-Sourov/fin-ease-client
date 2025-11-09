import React from 'react';

const FormInput = ({ name, label, type, placeholder }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-2">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full px-4 py-2 border-2  rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
};

export default FormInput;