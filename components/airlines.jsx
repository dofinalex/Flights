import React, { Component } from 'react';
import Pagination from './common/pagination';
import { paginate } from './utilities/paginate';
import {getAirlines} from '../services/airlineServices';
import SearchBox from "./common/searchBox";
import _ from "lodash"

class Airlines extends Component {
    state={
       airline_lst:[],
       pageSize:20,
       currentPage:1,
       sortColumn:{path:['id','name','country_id'],order:'asc'},
       columns:[
        {path:"id",label:"ailine id"},
        {path:"name",label:"Airline Name"},
        {path:"country_id",label:"Origin Country"}],
        searchQuery0: "",
        searchQuery1: ""
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
        this.props.history.replace('/general')
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
       handleSearch0 = (query)=>{
        console.log(query)
        this.setState({searchQuery0: query, currentPage: 1})
      }
      handleSearch1 = (query)=>{
        console.log(query)
        this.setState({searchQuery1: query, currentPage: 1})
      }
    render() {
    const {columns}=this.state
     console.log(columns)
    if (this.state.airline_lst.length===0)
       return <h1>There is no records</h1>
    const { airline_lst: allAirlines, pageSize, currentPage, sortColumn, searchQuery0,searchQuery1 } = this.state;
    let filtered = allAirlines;
    if(searchQuery0)
        filtered = filtered.filter(c=>c.id>=searchQuery0)
    else{
        filtered =  filtered
        }
    if(searchQuery1)
        filtered = filtered.filter(c=>c.name.toLowerCase().startsWith(searchQuery1.toLowerCase()))
    else{
        filtered =  filtered
        }
    // const sorted=_.orderBy(this.state.airline_lst,this.state.sortColumn.path,this.state.sortColumn.order)
    const sorted=_.orderBy(filtered,sortColumn.path,sortColumn.order)
    const airlines=paginate(sorted,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>General Airline Companies Information</h1>
            <p>There are {this.state.airline_lst.length} records</p>
            <p>Search by airline id</p><SearchBox value={searchQuery0} onChange={this.handleSearch0}></SearchBox>
            <p>Search by Ailine Name</p><SearchBox value={searchQuery1} onChange={this.handleSearch1}></SearchBox>
           <table className="table">
            <thead>
                {/* <tr>
                    <th>Airline Name</th>
                    <th>Origin Country</th>
                </tr> */}
                <tr>
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
export default Airlines

