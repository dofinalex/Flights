import React, { Component } from 'react';
import NavBarCustomer from "./common/navbar_customer";
import jwt_decode from "jwt-decode";
import logo5 from './pcs/customer1.jpeg'


class  Customer extends Component {
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
        <NavBarCustomer></NavBarCustomer>
             <h2>Nice to see you again Dear {this.state.user.user_label}</h2>
             <h2>Please select what would you like to do today</h2>
             <img src={logo5} width="1000" height="600"/>               
             </React.Fragment>
    )
    }
}
 
export default Customer;