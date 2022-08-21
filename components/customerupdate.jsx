import React, { Component } from "react";
import jwt_decode from "jwt-decode";
// import Pagination from "./common/pagination";
import { paginate } from "./utilities/paginate";
// import _ from "lodash"
import { getUpdateCustomers } from "../services/customerServices";
import CustomerTable from "./customertable";

class CustomersUpdate extends Component {
  state = {
    user:"",
    customer_lst: [],
    customer_lst1: [],
    years: [],
    pageSize: 3,
    currentPage: 1
    
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      await this.setState({ user });
    } catch (error) {}

    
    const {data :customers} = await getUpdateCustomers();
    await this.setState({
      customer_lst: [...customers],
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
    if (this.state.customer_lst.length === 0) return <h1>No records</h1>;
    const customs=this.state.customer_lst.filter(c=>{return c.id===this.state.user.spid})
    this.setState({customer_lst1:[...customs]})
   const customers=paginate(this.state.customer_lst1,this.state.currentPage,this.state.pageSize)
    return (
        
      <div className="row">
        <div className="col">
        <button onClick={this.handleBack} className="btn btn-primary">Back</button>
        <h1>Update Customer</h1>
          <p>There are ({this.state.customer_lst1.length}) records</p>
         
           <CustomerTable customers={customers}></CustomerTable>
         
          {/* <Pagination
            ItemCount={this.state.customer_lst.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination> */}
        </div> 
      </div>
    );
  }
}

export default CustomersUpdate;
