import React, { Component } from 'react';
import Pagination from './common/pagination';
import jwt_decode from "jwt-decode";
import { paginate } from './utilities/paginate';
import {getTickets} from '../services/ticketsServices';

class CustomerGetickets extends Component {
    state={
      user:"",
       tk_lst:[],
       pageSize:20,
       currentPage:1,
     
    }
    handleBack = () => {
        // Navigate to /products
        // this.props.history.push('/products')
        this.props.history.replace('/customer')
      };
      
    async componentDidMount(){
        try {
        const token = localStorage.getItem("token");
        const user = jwt_decode(token);
        await this.setState({ user });
      } catch (error) {}

        const {data:tickets}=await getTickets(this.state.user.user_id)
        console.log(tickets)
          this.setState({
            tk_lst:[...tickets]
          })
      }
      handlePageChange =page=>{
        this.setState({currentPage:page})
       }
    render() {
    if (this.state.tk_lst.length===0)
       return  (<div>
                <button onClick={this.handleBack} className="btn btn-primary">Back</button>
               <h1>There is no records</h1>
               </div>)
    const tickets=paginate(this.state.tk_lst,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>Ticket List</h1>
            <p>There are {this.state.tk_lst.length} records</p>
           <table className="table">
            <thead>
                <tr>
                    <th>flight id</th>
                    <th>Airline Name</th>
                    <th>Origin Country</th>
                    <th>Destination Country</th>
                    <th>Departure Time</th>
                    <th>Landing Time</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map(ticket=>{
                return(
                 <tr key={ticket.id}>
                 <td>{ticket.id}</td>
                 <td>{ticket.airline_company_id}</td>
                 <td>{ticket.origin_country_id}</td>
                 <td>{ticket.destination_country_id}</td>
                 <td>{ticket.departure_time}</td>
                 <td>{ticket.landing_time}</td>
                </tr> 
                )  
                })}
           
            </tbody>
           </table>
           <Pagination ItemCount={this.state.tk_lst.length} 
                       pageSize={this.state.pageSize} 
                       currentPage={this.state.currentPage}
                       onPageChange={this.handlePageChange}>
           </Pagination>
           </div>)
    }
}
export default CustomerGetickets

