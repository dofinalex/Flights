import React, { Component } from 'react';
import Pagination from './common/pagination';
import { paginate } from './utilities/paginate';
import {getCountries} from '../services/countryServices';
import SearchBox from "./common/searchBox";
import _ from "lodash"

class Countries extends Component {
    state={
       country_lst:[],
       pageSize:20,
       currentPage:1,
       sortColumn:{path:['id','name'],order:'asc'},
       columns:[
        {path:"id",label:"ailine id"},
        {path:"name",label:"Country Name"}],
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
        const {data:countries}=await getCountries()
        console.log(countries)
          this.setState({
            country_lst:[...countries]
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
    if (this.state.country_lst.length===0)
       return <h1>There is no records</h1>
    const { country_lst: allCountries,sortColumn,searchQuery0,searchQuery1 } = this.state;
    let filtered = allCountries;
    if(searchQuery0)
        filtered = filtered.filter(c=>c.id>=searchQuery0)
    else{
        filtered =  filtered}
    if(searchQuery1)
        filtered = filtered.filter(c=>c.name.toLowerCase().startsWith(searchQuery1.toLowerCase()))
    else{
        filtered =  filtered}
    const sorted =_.orderBy(filtered, sortColumn.path, sortColumn.order)
    const countries=paginate(sorted,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>General Country Information</h1>
            <p>There are {this.state.country_lst.length} records</p>
            <p>Search by country id</p><SearchBox value={searchQuery0} onChange={this.handleSearch0}></SearchBox>
            <p>Search by Country Name</p><SearchBox value={searchQuery1} onChange={this.handleSearch1}></SearchBox>
           <table className="table">
            <thead>
                <tr>
                    {/* <th>Country Id</th>
                    <th >Country Name</th> */}
                     {columns.map((c)=>{
                return (
                    // <th className="clickable" key={c.key || c.path} onClick={()=>this.raiseSort(c.path)}>{c.label} </th>
                    <th className="clickable" key={c.key || c.path} onClick={()=>this.raiseSort(c.path)}>{c.label} {this.renderSortIcon(c)}</th>
                )
             })}
                </tr>
            </thead>
            <tbody>
                {countries.map(country=>{
                return(
                 <tr key={country.id}>
                 <td>{country.id}</td>
                 <td>{country.name}</td>
                </tr> 
                )  
                })}
           
            </tbody>
           </table>
           <Pagination ItemCount={this.state.country_lst.length} 
                       pageSize={this.state.pageSize} 
                       currentPage={this.state.currentPage}
                       onPageChange={this.handlePageChange}>
           </Pagination>
           </div>)
    }
}
export default Countries

