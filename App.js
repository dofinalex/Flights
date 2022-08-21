import './App.css';
import React ,{Component} from 'react'
import { Redirect,Route,Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Main from './components/main';
import Visitor from './components/visitor';
import LoginFrom from './components/loginform';
import CustomerForm from './components/customerprofile';
import Customer from './components/customer';
import CustomerGetickets from './components/customergetickets';
import Airline from './components/airlinecompany';
import Admin from './components/administrator';

import NotFound from './components/common/notfound';
import General from './components/general';
import Flights from './components/flights';
import Airlines from './components/airlines';
import Countries from './components/countries';
import AirlineForm from './components/airlineprofile';
import CustomerAdminForm from './components/customeradminprofile';
import AdminForm from './components/adminrprofile';
import Customers from './components/getcustomers';
import RemoveAirlines from './components/removeairlines';
import RemoveCustomers from './components/removecustomers';
import RemoveAdmin from './components/removeadmin';
import CustomerRemoveTickets from './components/customerremoveticket';
import AirlineGetFlights from './components/airlinegetflights';
import AirlineRemoveFlights from './components/airlineremoveflight';
import CustomersUpdate from './components/customerupdate';
import CustomersUpdateForm from './components/customerform';
import CustomersAddTicketsAll from './components/customeraddtickets';
import CustomersAddTicketsForm from './components/customeraddticketform';
import AirlinesUpdateForm from './components/airlineform';
import AirlinesUpdate from './components/airlineupdate';
import FlightsUpdate from './components/flightupdate';
import FlightsUpdateForm from './components/flightform';
import FlightForm from './components/flightprofile';
import Logout from './components/logout';


function App () {
  return (
    <div>
    <main className="container">
    <Switch>   
    <Route path='/main' component={Main}></Route>
    <Route path='/general' component={General}></Route>
    <Route path='/general_flights' component={Flights}></Route>
    <Route path='/general_airlines' component={Airlines}></Route>
    <Route path='/general_countries' component={Countries}></Route>
    <Route path='/visitor' component={Visitor}></Route>
    <Route path='/visitor_login' component={LoginFrom}></Route>
    <Route path='/visitor_profile' component={CustomerForm}></Route>
    <Route path='/customer' component={Customer}></Route>
    <Route path="/customer_gettickets" component={CustomerGetickets}></Route>
    <Route path="/customer_update/:id" component={CustomersUpdateForm} ></Route>
    <Route path="/customer_update" component={CustomersUpdate} ></Route>
    <Route path="/customer_addtickets" component={CustomersAddTicketsAll} ></Route>
    <Route path='/customer_removetickets' component={CustomerRemoveTickets}></Route>
    <Route path='/aircompany' component={Airline}></Route>
    <Route path="/aircompany_update/:id" component={AirlinesUpdateForm} ></Route>
    <Route path="/aircompany_update" component={AirlinesUpdate} ></Route>
    <Route path='/aircompany_getflights' component={AirlineGetFlights}></Route>
    <Route path='/aircompany_register' component={FlightForm}></Route>
    <Route path="/aircompany_updateflight/:id" component={FlightsUpdateForm} ></Route>
    <Route path="/aircompany_updateflight" component={FlightsUpdate} ></Route>
    <Route path='/aircompany_removeflights' component={AirlineRemoveFlights}></Route>
    <Route path='/admin' component={Admin}></Route>
    <Route path='/admin_customers' component={Customers}></Route>
    <Route path='/admin_airline' component={AirlineForm}></Route>
    <Route path='/admin_customer' component={CustomerAdminForm}></Route>
    <Route path='/admin_admin' component={AdminForm}></Route>
    <Route path='/admin_remove_airline' component={RemoveAirlines}></Route>
    <Route path='/admin_remove_customers' component={RemoveCustomers}></Route>
    <Route path='/admin_remove_admin' component={RemoveAdmin}></Route>
    <Route path="/admin_remove_admin/:id" component={RemoveAirlines} ></Route>
    <Route path="/admin_remove_customers/:id" component={RemoveCustomers} ></Route>
    <Route path="/admin_remove_admin/:id" component={RemoveAdmin} ></Route>
    <Route path="/visitor_logout" component={Logout}></Route>

    <Route path='/notfound' component={NotFound}></Route>
    <Redirect exact from='/' to='/main'></Redirect>
    <Redirect  to='/notfound'>Not Found</Redirect>
    </Switch>
    </main>
    </div>
  )
}
export default App;
