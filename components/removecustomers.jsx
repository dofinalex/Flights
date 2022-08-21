import React, { Component } from 'react';
import Pagination from './common/pagination';
import { paginate } from './utilities/paginate';
import {getCustomers,deleteCustomers} from '../services/allcustomersServices';
import SearchBox from "./common/searchBox";
import _ from "lodash"

class RemoveCustomers extends Component {
    state={
       customer_lst:[],
       pageSize:5,
       currentPage:1,
       sortColumn:{path:['id','first_name','last_name'],order:'asc'},
       columns:[
        {path:"id",label:"id"},
        {path:"first_name",label:"First Name"},
        {path:"last_name",label:"Last Name"},
        {path:"address",label:"Address"},
        {path:"phone_no",label:"Phone no"}, 
        {path:"credit_card_no",label:"Credit Card no"},
        {path:"user_id",label:"User id"}
       ],
       searchQuery: ""
    }
    raiseSort=(path)=>{   
      let sortColumn={...this.state.sortColumn};
      if (path===sortColumn.path){
          sortColumn.order=sortColumn.order==='asc' ? 'desc':'asc'
      }
      else sortColumn={path:path,order:'asc'}
      this.handleSort(sortColumn)
  };
  renderSortIcon=(column)=>{
      const {sortColumn}=this.state
      console.log(sortColumn.order)
      if(column.path!==sortColumn.path) return null;
      if(sortColumn.order==='asc') return <i className="fa fa-sort-asc" aria-hidden="true"></i>
      return <i className="fa fa-sort-desc" aria-hidden="true"></i>
  }
  handleSort=columnn=>{
    this.setState({sortColumn:columnn})
}
    handleBack = () => {
        // Navigate to /products
        // this.props.history.push('/products')
        this.props.history.replace('/admin')
      };
      handlePageChange =page=>{
        this.setState({currentPage:page})
       }
    async componentDidMount(){
        const {data:customers}=await getCustomers()
        console.log(customers)
          this.setState({
            customer_lst:[...customers]
          })
      }
      handleDelete=async (customer)=>{
        const customers=this.state.customer_lst.filter(c=>c.id !==customer.id)
        this.setState({customer_lst:customers})
        await deleteCustomers(customer.id)
        this.props.history.replace('/admin')
        }
        handleSearch = (query)=>{
          console.log(query)
          this.setState({searchQuery: query, currentPage: 1})
        }
    render() {
    const {columns}=this.state
    if (this.state.customer_lst.length===0)
       return (<div>
               <button onClick={this.handleBack} className="btn btn-primary">Back</button>
               <h1>There is no records</h1>
              </div>)
    const { customer_lst: allCustomers, pageSize, currentPage, sortColumn, searchQuery } = this.state;
    let filtered = allCustomers;
    if(searchQuery)
        filtered = allCustomers.filter(c=>c.last_name.toLowerCase().startsWith(searchQuery.toLowerCase()))
    else{
        filtered =  allCustomers
        }
    const sorted=_.orderBy(filtered,sortColumn.path,sortColumn.order)
    const customers=paginate(sorted,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>General Customer Information</h1>
            <p>There are {this.state.customer_lst.length} records</p>
            <p>Search by Last Name</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch}></SearchBox>
           <table className="table">
            <thead>
                <tr>
                    {/* <th>id</th>
                    <th>Firts Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone no</th>
                    <th>Credit Card no</th>
                    <th>User id</th>
                    <th></th> */}
                    {columns.map((c)=>{
                      return (
                    <th className="clickable" key={c.key || c.path} onClick={()=>this.raiseSort(c.path)}>{c.label} {this.renderSortIcon(c)}</th>
                      )
                    })}
                </tr>
            </thead>
            <tbody>
                {customers.map(customer=>{
                return(
                 <tr key={customer.id}>
                 <td>{customer.id}</td>
                 <td>{customer.first_name}</td>
                 <td>{customer.last_name}</td>
                 <td>{customer.address}</td>
                 <td>{customer.phone_no}</td>
                 <td>{customer.credit_card_no}</td>
                 <td>{customer.user_id}</td>
                 <td><button onClick={()=>this.handleDelete(customer)} className="btn btn-danger btn-sm">delete</button></td>
                </tr> 
                )  
                })}
           
            </tbody>
           </table>
           <Pagination ItemCount={this.state.customer_lst.length} 
                       pageSize={this.state.pageSize} 
                       currentPage={this.state.currentPage}
                       onPageChange={this.handlePageChange}>
           </Pagination>
           </div>)
    }
}
export default RemoveCustomers

