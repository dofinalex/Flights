import React, { Component } from "react";
import Joi from "joi-browser";
import { getUpdateAirline, saveAirline } from "../services/airlineServices";
// import Form from "./common/form";
import Form from "./common/form";



class AirlinesUpdateForm extends Form {
  state = {
    data: {
        name: "",
        country_id: ""
        // username_no: "",
        // password: "",
        // email: ""
    },
    errors: {},
  };

  schema = {
    id: Joi.number(),
    name: Joi.string().required().label("first_name"),
    country_id: Joi.string().required().label("last_name")
    // username_no: Joi.string().required().label("username_no"),
    // password: Joi.string().required().label("password"),
    // email: Joi.number().required().label("price")
  };


  async populateAirlines() {
    try {
      const customerId = this.props.match.params.id;
      const { data: customer } = await getUpdateAirline(customerId);
      console.log(customerId)
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
      
  async componentDidMount() {
    await this.populateAirlines();
  }

  mapToViewModel(customer) {
    return {
        id: customer.id,
        name: customer.name,
        country_id: customer.country_id
        // username_no: customer.username_no,
        // password: customer.password,
        // email: customer.email,
    };
  }

  doSubmit = async () => {
    await saveAirline(this.state.data);
    this.props.history.push('/aircompany_update');
    // await deleteCar(this.state.data.id);
  };
  
  cancel =  () => {
    this.props.history.replace("/aircompany_update");
  };
  render() {
    return (
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "name")}
          {this.renderInput("country_id", "country_id")}
          {/* {this.renderInput("username_no", "username_no")}
          {this.renderInput("password", "password")}
          {this.renderInput("email", "email")}         */}

          {this.renderButton("Save", true)}
          {this.renderLink("Cancel", "/aircompany_update", "btn btn-light")}
        </form>
      </div>
    );
  }
}

export default AirlinesUpdateForm;
