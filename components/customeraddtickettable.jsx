import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class CustomerAddTicketsTable extends Component {
  state = {};

  columns = [
    { path: "id", label: "id" ,
    content: (flight)=> <Link to={`/customer_addtickets/${flight.id}`}>{flight.id}</Link>,
  },
    { path: "airline_company_id", label: "Airline Company" },
    { path: "origin_country_id", label: "Origin Country" },
    { path: "destination_country_id", label: "Destination Country" },
    { path: "departure_time", label: "Departure Time" },
    { path: "landing_time", label: "Landing Time" }

    // { path: "username_no", label: "User Name" },
    // { path: "password", label: "Password" },
    // { path: "email", label: "Email Address" }
  ];

  render() {
    const { tickets} = this.props;
    return (
     <table className="table">
         <TableHeader
          columns={this.columns}
        ></TableHeader>
        <TableBody
          data={tickets}
          columns={this.columns}
        ></TableBody>
     {/* <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.address}</td>
                <td>{customer.phone_no}</td>
                <td>{customer.card_no}</td>
                <td>{customer.username_no}</td>
                <td>{customer.password}</td>
                <td>{customer.email}</td>
              </tr>
            );
          })}
        </tbody> */}
      </table>
    );
  }
}

export default CustomerAddTicketsTable;
