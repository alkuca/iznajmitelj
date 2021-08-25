import React from "react";

const InputTextarea = ({ value, label, name, id, onChange, className, rows, cols, required }) => (
    <div className={className}>
        {label && <label htmlFor="input-textarea">{label}</label>}
        <textarea
            value={value}
            name={name}
            id={id}
            onChange={onChange}
            rows={rows}
            cols={cols}
            required={required}
        />
    </div>
);

export default InputTextarea;