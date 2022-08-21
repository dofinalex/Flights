import React, { Component } from 'react';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import { Link } from 'react-router-dom';

class FlightsTable extends Component {
    state = {} 
    columns = [
        { path: "id", label: "id" ,
        content: (flight)=> <Link to={`/aircompany_updateflight/${flight.id}`}>{flight.id}</Link>,
        },
        {path:"airline_company_id",label:"Airline Company"},
        {path:"origin_country_id",label:"Origin Country"},
        {path:"destination_country_id",label:"Destination Country"},
        {path:"departure_time",label:"Departure Time"},
        {path:"landing_time",label:"Landing Time"},
        {path:"remaining_tickets",label:"Remaining Tickets"}
    ]

    render() { 
        const {flights,sortColumn,onSort}=this.props
        return (
            <table className="table">
            <TableHeader columns={this.columns} onSort={onSort} sortColumn={sortColumn}></TableHeader>
           <TableBody
            data={flights}
            columns={this.columns}>
           </TableBody>
     </table>
        );
        
    }
}
 
export default FlightsTable;