import React, { Component } from 'react';
const Input = ({name,label,value,error,onChange}) => {
    return ( <div className="form-group">
             <label htmlFor={name}>{label}</label>
             <input 
              name={name}
              value={value}             
              id={name}               
              onChange={onChange}
              type="text"
              className="form-control"
              /> 
              {error && <div className="alert alert-danger">{error}</div>}
              </div> 
    );
}
 
export default Input;