import React from "react";

const InputField = ({ value, label, name, type, onChange, className, required, min }) => (
    <div className={className}>
        <input
            type={type}
            value={value}
            name={name}
            placeholder={" "}
            onChange={onChange}
            required={required}
            min={min}
        />
        {label && <label htmlFor="input-field">{label}</label>}
    </div>
);

export default InputField;