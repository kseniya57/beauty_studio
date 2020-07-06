import React, { useMemo } from 'react';

export default function Checkbox({ onChange, value: providedValue, ...props }) {
    const value = useMemo(() => providedValue && providedValue !== "0", [providedValue]);
    const handleChange = (e) =>  {
        onChange(Object.assign(e, {
            target: Object.assign(e.target, { value: value ? 0 : 1 })
        }));
    };
    return <input type="checkbox" checked={value} onChange={handleChange} {...props}/>
}

Checkbox.defaultProps = {
    onChange: () => {}
};