import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import { NavLink } from 'react-router-dom';

class  NavBarMain extends Component {
    state = {  } 
    componentDidMount() {
      try {
        const token = localStorage.getItem("token");
        const user = jwt_decode(token);
        this.setState({ user });
      } catch (error) {}
    }
    render() { 
    return ( <nav navbar className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to="/main">Airport Information System<span className="sr-only">(current)</span></NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
         <li className="nav-item">
          <NavLink className="nav-link" to="/general">General</NavLink>
        </li>
        {!this.state.user && (
        <li className="nav-item">
          <NavLink className="nav-link" to="/visitor">Visitor</NavLink>
        </li>
        )}
        {this.state.user && this.state.user.user_role===2 && (
        <li className="nav-item">
          <NavLink className="nav-link" to="/customer">Customer</NavLink>
        </li>  
        )}
         {this.state.user && this.state.user.user_role===3 && (
        <li className="nav-item">
          <NavLink className="nav-link" to="/aircompany">Airline Company</NavLink>
        </li>  
         )} 
          {this.state.user && this.state.user.user_role===1 && (
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin">Administrator</NavLink>
        </li>  
          )}
        <li className="nav-item">  
        {this.state.user && (
          <React.Fragment>
          <NavLink className="nav-link" to="/visitor_logout">Logout: {this.state.user.user_position}-{this.state.user.user_label} <span className="sr-only">(current)</span></NavLink>
          </React.Fragment>
        )}  
         </li>     
      </ul>
    </div>
  </nav> );
}
}
 
export default NavBarMain;

