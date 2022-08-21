import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBarVisitor = ({ user }) => {
    return ( <nav navbar className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to="/">Back</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
        {!user && (
          <React.Fragment>
          <NavLink className="nav-link" to="/visitor_login">Login<span className="sr-only">(current)</span></NavLink>
          </React.Fragment>
        )}
         {user && (
          <React.Fragment>
          <NavLink className="nav-link" to="/visitor_logout">Logout <span className="sr-only">(current)</span></NavLink>
          </React.Fragment>
        )}
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/visitor_profile">Create Customer Profile</NavLink>
        </li>                 
      </ul>
    </div>
  </nav> );
}
 
export default NavBarVisitor;