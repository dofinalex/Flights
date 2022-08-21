import React, { Component } from 'react';
import logo6 from './pcs/planes1.jpg'

import NavBarGeneral from './common/navbar_general';

const General = () => {
    return <React.Fragment>
             <NavBarGeneral></NavBarGeneral>
             <h1>General Information</h1>             
             <img src={logo6} width="1000" height="600"/> 
              
             </React.Fragment>

}
 
export default General;