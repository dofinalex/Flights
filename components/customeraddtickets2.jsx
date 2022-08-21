import React, { Component } from "react";

import Pagination from "./common/pagination";
import { paginate } from "./utilities/paginate";
import _ from "lodash"
import { getCustomerAllTickets } from "../services/ticketsServices";
import CustomerAddTicketsTable from "./customeraddtickettable";

class CustomersAddTicketsAll extends Component {
  state = {
    ticket_lst: [],
    years: [],
    pageSize: 3,
    currentPage: 1
    
  };

  async componentDidMount() {
    
    const {data :tickets} = await getCustomerAllTickets();
    
    this.setState({
      ticket_lst: [...tickets],
    });
  }
  
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //   handleItemSelected = year => {
    handleBack = () => {
        // Navigate to /products
        // this.props.history.push('/products')
        this.props.history.replace('/customer')
      };
  render() {
    if (this.state.ticket_lst.length === 0) return <h1>No records</h1>;
  //  const {customers}=this.props;
   const tickets=paginate(this.state.ticket_lst,this.state.currentPage,this.state.pageSize)
    return (
        
      <div className="row">
        <div className="col">
        <button onClick={this.handleBack} className="btn btn-primary">Back</button>
        <h1>Buy Ticket</h1>
          <p>There are ({this.state.ticket_lst.length}) records</p>
         
           <CustomerAddTicketsTable tickets={tickets}></CustomerAddTicketsTable>
         
          <Pagination
            ItemCount={this.state.ticket_lst.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div> 
      </div>
    );
  }
}

export default CustomersAddTicketsAll;
