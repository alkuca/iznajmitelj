import React from "react";

const InputField = ({ value, label, name, type, onChange, className, required }) => (
    <div className={className}>
        <input
            type={type}
            value={value}
            name={name}
            placeholder={" "}
            onChange={onChange}
            required={required}
        />
        {label && <label htmlFor="input-field">{label}</label>}
    </div>
);

export default InputField;