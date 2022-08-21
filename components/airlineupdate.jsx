import React, { Component } from "react";
import jwt_decode from "jwt-decode";
// import Pagination from "./common/pagination";
import { paginate } from "./utilities/paginate";
// import _ from "lodash"
import { getUpdateAirlines } from "../services/airlineServices";
import AirlineTable from "./airlinetable";

class AirlinesUpdate extends Component {
  state = {
    airline_lst: [],
    airline_lst1: [],
    years: [],
    pageSize: 10,
    currentPage: 1
    
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      await this.setState({ user });
    } catch (error) {}

    
    const {data :airlines} = await getUpdateAirlines();
    
    await this.setState({
      airline_lst: [...airlines],
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
    if (this.state.airline_lst.length === 0) return <h1>No records</h1>;
    const air=this.state.airline_lst.filter(c=>{return c.id===this.state.user.spid})
    this.setState({airline_lst1:[...air]})
    const airlines=paginate(this.state.airline_lst1,this.state.currentPage,this.state.pageSize)
    return (
        
      <div className="row">
        <div className="col">
        <button onClick={this.handleBack} className="btn btn-primary">Back</button>
        <h1>Update Airline Company</h1>
          <p>There are ({this.state.airline_lst1.length}) records</p>
         
           <AirlineTable airlines={airlines}></AirlineTable>
         
          {/* <Pagination
            ItemCount={this.state.airline_lst.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination> */}
        </div> 
      </div>
    );
  }
}

export default AirlinesUpdate;
