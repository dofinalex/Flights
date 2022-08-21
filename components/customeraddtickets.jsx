import React, { Component } from 'react';
import Pagination from './common/pagination';
import jwt_decode from "jwt-decode";
import SearchBox from "./common/searchBox";
import { paginate } from './utilities/paginate';
import {addTicket, getCustomerAllTickets} from '../services/ticketsServices';

class CustomerAddTickets extends Component {
    state={
       tk_lst:[],
       tk_lst1:[],
       pageSize:5,
       currentPage:1,
       searchQuery: "",
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
 
        const {data:tickets}=await getCustomerAllTickets()
        console.log(tickets)
          this.setState({
            tk_lst:[...tickets]           
          })  
          // this.state.tk_lst1=this.state.tk_lst.map((ticket, index) => ({
          //   id: ticket.id,
          //   tkidx: index + 1,
          //   airline_company_id:ticket.airline_company_id,
          //   origin_country_id:ticket.origin_country_id,
          //   destination_country_id:ticket.destination_country_id,
          //   departure_time:ticket.departure_time,
          //   landing_time:ticket.landing_time
          // }))
      }
      handlePageChange =page=>{
        this.setState({currentPage:page})
       }
       handleSave=async (ticket)=>{
        try{
        await addTicket(ticket.id,this.state.user.spid)
        this.props.history.push('/customer');
        }
        catch(ex){
          alert("The all tickets have been sod out already!")
        }
        }
        handleSearch = (query)=>{
          console.log(query)
          this.setState({searchQuery: query, currentPage: 1})
        }
    render() {
    if (this.state.tk_lst.length===0)        
        return (<div>
               <button onClick={this.handleBack} className="btn btn-primary">Back</button>
               <h1>There is no records</h1>
               </div>)
    const { tk_lst: allFlights,searchQuery } = this.state;  
    let filtered = allFlights;
    if(searchQuery)
      filtered = filtered.filter(c=>c.id>=searchQuery)
     else{
      filtered =  filtered
    }     
    const tickets=paginate(filtered,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>Ticket List</h1>
            <p>There are {this.state.tk_lst.length} records</p>
            <p>Search by flight id</p><SearchBox value={searchQuery} onChange={this.handleSearch}></SearchBox>
           <table className="table">
            <thead>
                <tr>
                    {/* <th>Customer id</th>
                    <th>Flight id </th> */}
                    {/* <th>order no</th> */}
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
                 {/* <td>{ticket.customer_id}</td>
                 <td>{ticket.flight_id}</td> */}
                 {/* <td>{ticket.tkidx}</td> */}
                 <td>{ticket.id}</td>
                 <td>{ticket.airline_company_id}</td>
                 <td>{ticket.origin_country_id}</td>
                 <td>{ticket.destination_country_id}</td>
                 <td>{ticket.departure_time}</td>
                 <td>{ticket.landing_time}</td>
                 <td><button onClick={()=>this.handleSave(ticket)} className="btn btn-danger btn-sm">buy</button></td>
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
export default CustomerAddTickets

