import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBarGeneral = () => {
    return ( <nav navbar className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to="/">Back</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/general_flights">Get Flights</NavLink>
        </li>   
        <li className="nav-item">
          <NavLink className="nav-link" to="/general_airlines">Get Airlines</NavLink>
        </li>   
        <li className="nav-item">
          <NavLink className="nav-link" to="/general_countries">Get Countries</NavLink>
        </li>  
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/general_newuser">Create User</NavLink>
        </li>               */}
      </ul>
    </div>
  </nav> );
}
 
export default NavBarGeneral;