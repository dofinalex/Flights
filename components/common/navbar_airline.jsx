import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBarAirline = () => {
    return ( <nav navbar className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand"  to="/">Back</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/aircompany_update">Update Airline Company<span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/aircompany_getflights">Get Flights</NavLink>
        </li>  
        <li className="nav-item">
          <NavLink className="nav-link" to="/aircompany_register">Add Flights</NavLink>
        </li> 
        <li className="nav-item">
          <NavLink className="nav-link" to="/aircompany_updateflight">Update Flights</NavLink>
        </li>   
        <li className="nav-item">
          <NavLink className="nav-link" to="/aircompany_removeflights">Remove Flights</NavLink>
        </li>             
      </ul>
    </div>
  </nav> );
}
 
export default NavBarAirline;