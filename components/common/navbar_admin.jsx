import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBarAdmin = () => {
    return ( <nav navbar className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand"  to="/">Back</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin_customers">Get All Customers<span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin_airline">Add Airline</NavLink>
        </li>  
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin_customer">Add Customer</NavLink>
        </li> 
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin_admin">Add Administrator</NavLink>
        </li>   
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin_remove_airline">Remove Airline</NavLink>
        </li>    
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin_remove_customers">Remove Customer</NavLink>
        </li>   
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin_remove_admin">Remove Administrator</NavLink>
        </li>            
      </ul>
    </div>
  </nav> );
}
 
export default NavBarAdmin;