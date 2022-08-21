import React, { Component } from 'react';
import NavBarAirline from './common/navbar_airline';
import jwt_decode from "jwt-decode";
import logo6 from './pcs/airline2.jpg'

class  Airline extends Component {
    state = {user:""  } 
    componentDidMount() {
      try {
        const token = localStorage.getItem("token");
        const user = jwt_decode(token);
        this.setState({ user });
      } catch (error) {}
    }
    render(){
    return (<React.Fragment>
        <NavBarAirline></NavBarAirline>
             <h2>Nice to see you again Dear {this.state.user.user_label}</h2>
             <h2>Please select what would you like to do today</h2>
             <img src={logo6} width="1000" height="600"/>               
             </React.Fragment>

    )
    }
}
 
export default Airline;