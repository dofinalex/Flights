import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class AirlineTable extends Component {
  state = {};

  columns = [
    { path: "id", label: "id" ,
    content: (airline)=> <Link to={`/aircompany_update/${airline.id}`}>{airline.id}</Link>,
  },
    { path: "name", label: "Company Name" },
    { path: "country_id", label: "Country" }
    // { path: "username_no", label: "User Name" },
    // { path: "password", label: "Password" },
    // { path: "email", label: "Email Address" }
  ];

  render() {
    const { airlines} = this.props;
    return (
     <table className="table">
         <TableHeader
          columns={this.columns}
        ></TableHeader>
        <TableBody
          data={airlines}
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

export default AirlineTable;
