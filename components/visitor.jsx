import React, { Component } from 'react';
import NavBarVisitor from './common/navbar_visitor';
import logo3 from './pcs/dep1.jpg'
import logo4 from './pcs/dep2.jpg'
import logo5 from './pcs/airport_590x332.jpg'


const Visitor = ({user}) => {
    return <React.Fragment>      
        <NavBarVisitor user={user} ></NavBarVisitor>
             <h2>Please log in ,if you already created customer profile</h2>
             <h2>or create a new profile</h2>
             <img src={logo5} width="1000" height="600"/>               
             </React.Fragment>

}
export default Visitor;