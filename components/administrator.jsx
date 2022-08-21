import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import NavBarAdmin from './common/navbar_admin';
import logo7 from './pcs/BenGurion.jpg'

class  Admin extends Component {
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
        <NavBarAdmin></NavBarAdmin>
             <h2>Hello {this.state.user.user_label}</h2>
             <h2>What would you like to choose</h2>
             <img src={logo7} width="1000" height="600"/>               
             </React.Fragment>

        )
    }
}
export default Admin;
