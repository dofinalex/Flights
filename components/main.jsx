import React, { Component } from 'react';
import logo from './pcs/TLV_1-984x554.jpg'
import logo1 from './pcs/ben-gurion-airport-shabbat.jpg'
import logo2 from './pcs/BenGurion.jpg'
import NavBarMain from './common/navbar_main';

class  Main extends Component {
    state = {  } 
    render() { 
    return (<React.Fragment>
             <NavBarMain></NavBarMain>
             <h1>Welcome to the airport information system</h1>             
             <img src={logo1} width="1000" height="400"/> 
              
             </React.Fragment>
    )

}
} 
export default Main;
