import React from 'react';

const Input = ({ name, label, value, onChange, error }) => {
  return (
    <div className="form-group"><label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        id={name} type="text" className="form-control"
        onChange={onChange} />
      { error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}

export default Input;