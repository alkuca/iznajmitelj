import React from "react";

const InputTextarea = ({ value, label, name, id, onChange, className, rows, cols }) => (
    <div className={className}>
        {label && <label htmlFor="input-textarea">{label}</label>}
        <textarea
            value={value}
            name={name}
            id={id}
            onChange={onChange}
            rows={rows}
            cols={cols}
        />
    </div>
);

export default InputTextarea;