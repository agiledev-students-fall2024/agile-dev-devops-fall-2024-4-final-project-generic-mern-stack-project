import React from 'react';
import Button from './button'

// InputField Component
function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-purpleGrey">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}

// Dropdown Component
function Dropdown({ options, onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)} className="border p-2 rounded bg-purpleLighter border-purpleGrey text-gray-400">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Form Component
function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="p-4">
      {children}  {/* Allows dynamic components to be passed in */}
      <Button type="submit" >
        Submit
      </Button>
    </form>
  );
}

export { Form, InputField, Dropdown };
