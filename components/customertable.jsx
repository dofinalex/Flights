import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class CustomerTable extends Component {
  state = {};

  columns = [
    { path: "id", label: "id" ,
    content: (customer)=> <Link to={`/customer_update/${customer.id}`}>{customer.id}</Link>,
  },
    { path: "first_name", label: "Firt Name" },
    { path: "last_name", label: "Last Name" },
    { path: "address", label: "Address" },
    { path: "phone_no", label: "Phone Number" },
    { path: "credit_card_no", label: "Credit Card" }

    // { path: "username_no", label: "User Name" },
    // { path: "password", label: "Password" },
    // { path: "email", label: "Email Address" }
  ];

  render() {
    const { customers} = this.props;
    return (
     <table className="table">
         <TableHeader
          columns={this.columns}
        ></TableHeader>
        <TableBody
          data={customers}
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

export default CustomerTable;
