import React, { Component } from 'react';
import Pagination from './common/pagination';
import { paginate } from './utilities/paginate';
import {getFlights} from '../services/flightServices';
import SearchBox from "./common/searchBox";
import _ from "lodash"

class Flights extends Component {
    state={
       flight_lst:[],
       pageSize:5,
       currentPage:1,
       sortColumn:{path:['id','airline_company_id','origin_country_id','destination_country_id','departure_time','landing_time'],order:'asc'},
       columns:[
        {path:"id",label:"id"},
        {path:"airline_company_id",label:"Airline Company"},
        {path:"origin_country_id",label:"Origin Country"},
        {path:"destination_country_id",label:"Destination Country"},
        {path:"departure_time",label:"Departure Time"}, 
        {path:"landing_time",label:"Landing Time"},
        {path:"remaining_tickets",label:"Remaining Tickets"}
       ],
       searchQuery0: "",
       searchQuery1: "",
       searchQuery2: "",
       searchQuery3: ""
     
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
      handlePageChange =page=>{
        this.setState({currentPage:page})
       }
    async componentDidMount(){
        const {data:flights}=await getFlights()
        console.log(flights)
          this.setState({
            flight_lst:[...flights]
          })
      }
      handleSearch0 = (query)=>{
        console.log(query)
        this.setState({searchQuery0: query, currentPage: 1})
      }
      handleSearch1 = (query)=>{
        console.log(query)
        this.setState({searchQuery1: query, currentPage: 1})
      }
      handleSearch2 = (query)=>{
        console.log(query)
        this.setState({searchQuery2: query, currentPage: 1})
      }
      handleSearch3 = (query)=>{
        console.log(query)
        this.setState({searchQuery3: query, currentPage: 1})
      }
    render() {
    const {columns}=this.state
    if (this.state.flight_lst.length===0)
       return <h1>There is no records</h1>
    
    const { flight_lst: allFlights, sortColumn, searchQuery0,searchQuery1,searchQuery2,searchQuery3 } = this.state;
    // let filtered = allFlights;
    // if(searchQuery)
    //   filtered = allFlights.filter(c=>c.origin_country_id.toLowerCase().startsWith(searchQuery.toLowerCase()))
    // else{
    //   filtered =  allFlights
    //    }
    let filtered = allFlights;
  if(searchQuery0)
    filtered = filtered.filter(c=>c.id>=searchQuery0 )
   else{
    filtered =  filtered
  }
    if(searchQuery1)
        filtered = filtered.filter(c=>c.origin_country_id.toLowerCase().startsWith(searchQuery1.toLowerCase()))
    else{
        filtered =  filtered
      }
    if(searchQuery2)
       filtered = filtered.filter(c=>c.destination_country_id.toLowerCase().startsWith(searchQuery2.toLowerCase()))
    else{
       filtered = filtered
        }
    if(searchQuery3)
      filtered = filtered.filter(c=>c.departure_time.toLowerCase().startsWith(searchQuery3.toLowerCase()))
    else{
      filtered =  filtered
      }
    // const sorted=_.orderBy(this.state.flight_lst,this.state.sortColumn.path,this.state.sortColumn.order)
    const sorted=_.orderBy(filtered,sortColumn.path,sortColumn.order)
    const flights=paginate(sorted,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>General Flight Information</h1>
            <p>There are {this.state.flight_lst.length} records</p>
            <p>Search by flight id <style>padding:0</style></p><SearchBox value={searchQuery0} onChange={this.handleSearch0} containerStyle={{margin:0,padding: 0 }}></SearchBox>
            <p>Search by Origin Country </p><SearchBox value={searchQuery1} onChange={this.handleSearch1}></SearchBox>
            <p>Search by Destination Country</p><SearchBox value={searchQuery2} onChange={this.handleSearch2}></SearchBox>
            <p>Search by Departure Date</p><SearchBox value={searchQuery3} onChange={this.handleSearch3}></SearchBox>
          
           <table className="table">
            <thead>
                <tr>
                    {/* <th>flight id</th>
                    <th>Airline Company</th>
                    <th>Origin Country</th>
                    <th>Destination Country</th>
                    <th>Departure Time</th>
                    <th>Landing Time</th>
                    <th>Remaining Tickets</th> */}
                    {columns.map((c)=>{
                      return (
                    <th className="clickable" key={c.key || c.path} onClick={()=>this.raiseSort(c.path)}>{c.label} {this.renderSortIcon(c)}</th>
                      )
                    })}
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
           <Pagination ItemCount={this.state.flight_lst.length} 
                       pageSize={this.state.pageSize} 
                       currentPage={this.state.currentPage}
                       onPageChange={this.handlePageChange}>
           </Pagination>
           </div>)
    }
}
export default Flights

