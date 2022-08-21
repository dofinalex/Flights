import React, { Component } from "react";
import Joi from "joi-browser";
import jwt_decode from "jwt-decode";
// import Form from "./common/form";
import {getUpdateCustomer, saveCustomer } from "../services/customerServices";
import Form from "./common/form";



class CustomersUpdateForm extends Form {
  state = {
    data: {
        first_name: "",
        last_name: "",
        address: "",
        phone_no: "",
        credit_card_no: ""
        // username_no: "",
        // password: "",
        // email: ""
    },
    errors: {},
  };

  schema = {
    id: Joi.number(),
    first_name: Joi.string().required().label("first_name"),
    last_name: Joi.string().required().label("last_name"),
    address: Joi.string().required().label("address"),
    phone_no: Joi.string().required().label("phone_no"),
    credit_card_no: Joi.string().required().label("card_nor"),
    // username_no: Joi.string().required().label("username_no"),
    // password: Joi.string().required().label("password"),
    // email: Joi.number().required().label("price")
  };


  async populateCustomers() {
    try {
      const customerId =this.props.match.params.id;
      const { data: customer } = await getUpdateCustomer(customerId);
      console.log(customerId)
      console.log(this.state.data)
      await this.setState({ data: this.mapToViewModel(customer) });
      
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
      
  async componentDidMount() {
    await this.populateCustomers();
  }

  mapToViewModel(customer) {
    return {
        id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        address: customer.address,
        phone_no: customer.phone_no,
        credit_card_no: customer.credit_card_no
        // username_no: customer.username_no,
        // password: customer.password,
        // email: customer.email,
    };
  }

  doSubmit = async () => {
    await saveCustomer(this.state.data);
    this.props.history.push('/customer_update');
    // await deleteCar(this.state.data.id);
  };
  
  cancel =  () => {
    this.props.history.replace("/customer_update");
  };
  render() {
    return (
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("first_name", "First Name")}
          {this.renderInput("last_name", "Last Name")}
          {this.renderInput("address", "Address")}
          {this.renderInput("phone_no", "Phone_no")}
          {this.renderInput("credit_card_no", "Credit Card Card number")}
          {/* {this.renderInput("username_no", "username_no")}
          {this.renderInput("password", "password")}
          {this.renderInput("email", "email")}         */}

          {this.renderButton("Save", true)}
          {this.renderLink("Cancel", "/customer_update", "btn btn-light")}
        </form>
      </div>
    );
  }
}

export default CustomersUpdateForm;
