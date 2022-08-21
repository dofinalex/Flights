import React, { Component } from 'react';
import Pagination from './common/pagination';
import { paginate } from './utilities/paginate';
import {getAirlines,deleteAirlines} from '../services/airlineServices';
import SearchBox from "./common/searchBox";
import _ from "lodash"

class RemoveAirlines extends Component {
    state={
       airline_lst:[],
       pageSize:20,
       currentPage:1,
       sortColumn:{path:['id','name','country_id'],order:'asc'},
       columns:[
        {path:"id",label:"ailine id"},
        {path:"name",label:"Airline Name"},
        {path:"country_id",label:"Origin Country"}],
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
    handleBack = () => {
        // Navigate to /products
        // this.props.history.push('/products')
        this.props.history.replace('/admin')
      };
    async componentDidMount(){
        const {data:airlines}=await getAirlines()
        console.log(airlines)
          this.setState({
            airline_lst:[...airlines]
          })
      }
      handlePageChange =page=>{
        this.setState({currentPage:page})
       }
       handleDelete=async (airline)=>{
        const airlines=this.state.airline_lst.filter(c=>c.id !==airline.id)
        this.setState({airline_lst:airlines})
        console.log(airline.id)
        await deleteAirlines(airline.id)
        this.props.history.replace('/admin')
        }
        handleSearch = (query)=>{
          console.log(query)
          this.setState({searchQuery: query, currentPage: 1})
        }
    render() {
    const {columns}=this.state
    if (this.state.airline_lst.length===0)
       return (<div>
                <button onClick={this.handleBack} className="btn btn-primary">Back</button>
               <h1>There is no records</h1>
               </div>)
    const { airline_lst: allAirlines, pageSize, currentPage, sortColumn, searchQuery } = this.state;
    let filtered = allAirlines;
    if(searchQuery)
        filtered = allAirlines.filter(c=>c.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
    else{
        filtered =  allAirlines
        }
    const sorted=_.orderBy(filtered,sortColumn.path,sortColumn.order)
    const airlines=paginate(sorted,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>General Airline Companies Information</h1>
            <p>There are {this.state.airline_lst.length} records</p>
            <p>Search by Ailine Name</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch}></SearchBox>
           <table className="table">
            <thead>
                <tr>
                    {/* <th>ailine id</th>
                    <th>Airline Name</th>
                    <th>Origin Country</th>
                    <th></th> */}
                      {columns.map((c)=>{
                return (
                    // <th className="clickable" key={c.key || c.path} onClick={()=>this.raiseSort(c.path)}>{c.label} </th>
                    <th className="clickable" key={c.key || c.path} onClick={()=>this.raiseSort(c.path)}>{c.label} {this.renderSortIcon(c)}</th>
                )
             })}
                </tr>
               
            </thead>
            <tbody>
                {airlines.map(airline=>{
                return(
                 <tr key={airline.id}>
                 <td>{airline.id}</td>
                 <td>{airline.name}</td>
                 <td>{airline.country_id}</td>
                 <td><button onClick={()=>this.handleDelete(airline)} className="btn btn-danger btn-sm">delete</button></td>
                </tr> 
                )  
                })}
           
            </tbody>
           </table>
           <Pagination ItemCount={this.state.airline_lst.length} 
                       pageSize={this.state.pageSize} 
                       currentPage={this.state.currentPage}
                       onPageChange={this.handlePageChange}>
           </Pagination>
           </div>)
    }
}
export default RemoveAirlines

