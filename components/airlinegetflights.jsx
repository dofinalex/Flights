import React, { Component } from 'react';
import Pagination from './common/pagination';
import jwt_decode from "jwt-decode";
import { paginate } from './utilities/paginate';
import { getAirlinesComp } from '../services/airlineServices';

class AirlineGetFlights extends Component {
    state={
       flight_lst:[],
       flight_lst1:[],
       pageSize:20,
       currentPage:1,
     
    }
    handleBack = () => {
        // Navigate to /products
        // this.props.history.push('/products')
        this.props.history.replace('/aircompany')
      };
    async componentDidMount(){
      try {
        const token = localStorage.getItem("token");
        const user = jwt_decode(token);
        await this.setState({ user });
      } catch (error) {}

        const {data:flights}=await getAirlinesComp()
        console.log(flights)
        await  this.setState({
            flight_lst:[...flights]
          })
      }
      handlePageChange =page=>{
        this.setState({currentPage:page})
       }
    render() {
    if (this.state.flight_lst.length===0)
       return (<div>
              <button onClick={this.handleBack} className="btn btn-primary">Back</button>
              <h1>There is no records</h1>
              </div>)
    const fl=this.state.flight_lst.filter(c=>{return c.airline_company_id_id===this.state.user.spid})
    this.setState({flight_lst1:[...fl]})
    const flights=paginate(this.state.flight_lst1,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>Flights List</h1>
            <p>There are {this.state.flight_lst1.length} records</p>
           <table className="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Airline Name</th>
                    <th>Origin Country</th>
                    <th>Destination Country</th>
                    <th>Departure Time</th>
                    <th>Landing Time</th>
                    <th>Remanining Tickets</th>
                </tr>
            </thead>
            <tbody>
                {flights.map(flight=>{
                return(
                 <tr key={flight.id}>
                 <td>{flight.id}</td>
                 <td>{flight.airline_company_id}</td>
                 <td>{flight.origin_country_id}</td>
                 <td>{flight.destination_country_id}</td>
                 <td>{flight.departure_time}</td>
                 <td>{flight.landing_time}</td>
                 <td>{flight.remaining_tickets}</td>
                </tr> 
                )  
                })}
           
            </tbody>
           </table>
           <Pagination ItemCount={this.state.flight_lst1.length} 
                       pageSize={this.state.pageSize} 
                       currentPage={this.state.currentPage}
                       onPageChange={this.handlePageChange}>
           </Pagination>
           </div>)
    }
}
export default AirlineGetFlights

