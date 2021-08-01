import React from "react";

const InputField = ({ value, label, name, type, onChange, className }) => (
    <div className={className}>
        <input
            type={type}
            value={value}
            name={name}
            placeholder={" "}
            onChange={onChange}
        />
        {label && <label htmlFor="input-field">{label}</label>}
    </div>
);

export default InputField;