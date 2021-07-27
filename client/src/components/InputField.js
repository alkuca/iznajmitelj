import React from "react";

const InputField = ({ value, label, name, placeholder, type, onChange, className }) => (
    <div className={className}>
        {label && <label htmlFor="input-field">{label}</label>}
        <input
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
);

export default InputField;