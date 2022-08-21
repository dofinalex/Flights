import React, { Component } from 'react';
import CarsTable from './carsTable';
import Pagination from './common/pagination';
import { paginate } from '../utilities/paginatet';
import ListGroups from './common/listgroup';
import _ from "lodash"
import {getFlights} from '../services/flightServices';



class Flights extends Component {
    state={
       flight_lst:[],
       pageSize:3,
       currentPage:1,
       sortColumn:{path:'airline_company_id',order:'asc'}
         
    }
    async componentDidMount(){
      const {data:flights}=await getFlights()
      console.log(flights)
        this.setState({
          flight_lst:[...flights]
        })
    }

    handlePageChange =page=>{
     this.setState({currentPage:page})
    }
    handleSort=columnn=>{
        this.setState({sortColumn:columnn})
    }
    render() {
    if (this.state.flight_lst.length===0)
       return <h1>There is no records</h1>
    const {flight_lst,pageSize,currentPage,sortColumn}=this.state
   
    const sorted=_.orderBy(filtered,sortColumn.path,sortColumn.order)
    const cars=paginate(sorted,this.state.currentPage,this.state.pageSize)
    return (<div className="row"> 
         <div className="col-2">
        <p>There are {this.state.flight_lst.length} records</p>   
            <CarsTable flights={flights} sortColumn={sortColumn} onSort={this.handleSort}></CarsTable>
           <Pagination ItemCount={filtered.length} 
                       pageSize={pageSize} 
                       currentPage={currentPage}>
                      onPageChange={this.handlePageChange}
           </Pagination>
        </div>        
    </div>)
    }
}
export default Flights

