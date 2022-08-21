import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Pagination from "./common/pagination";
import { paginate } from "./utilities/paginate";
import _ from "lodash"
import { getUpdateFlights } from "../services/flightServices";
import FlightsTable from "./flighttable";

class FlightsUpdate extends Component {
  state = {
    flight_lst: [],
    flight_lst1: [],
    years: [],
    pageSize: 20,
    currentPage: 1
    
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      await this.setState({ user });
    } catch (error) {}

    
    const {data :flights} = await getUpdateFlights();
    
    await this.setState({
      flight_lst: [...flights],
    });
    
  }
  
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //   handleItemSelected = year => {
    handleBack = () => {
        // Navigate to /products
        // this.props.history.push('/products')
        this.props.history.replace('/aircompany')
      };
  render() {
  if (this.state.flight_lst.length === 0) return <h1>No records</h1>;
  const fl=this.state.flight_lst.filter(c=>{return c.airline_company_id_id===this.state.user.spid})
  this.setState({flight_lst1:[...fl]})
   const flights=paginate(this.state.flight_lst1,this.state.currentPage,this.state.pageSize)
    return (
        
      <div className="row">
        <div className="col">
        <button onClick={this.handleBack} className="btn btn-primary">Back</button>
        <h1>Update Flight List</h1>
          <p>There are ({this.state.flight_lst1.length}) records</p>
         
           <FlightsTable flights={flights}></FlightsTable>
         
          {/* <Pagination
            ItemCount={this.state.flight_lst.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination> */}
        </div> 
      </div>
    );
  }
}

export default FlightsUpdate;
