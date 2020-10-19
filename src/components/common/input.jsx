import React from 'react';

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group"><label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        id={name} type="text" className="form-control"
        onChange={onChange} />
    </div>
  )
}

export default Input;