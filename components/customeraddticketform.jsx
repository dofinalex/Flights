import React, { Component } from "react";
import Joi from "joi-browser";
import jwt_decode from "jwt-decode";
// import Form from "./common/form";
import Form from "./common/form";
import { addTicket, saveAddTickets} from "../services/ticketsServices";



class CustomersAddTicketsForm extends Form {
  state = {
    data: {
        airline_company_id: "",
        origin_country_id: "",
        destination_country_id: "",
        departure_time: "",
        landing_time: ""
    },
    errors: {},
  };

  schema = {
    id: Joi.number(),
    airline_company_id: Joi.string().required().label("airline_company_id"),
    origin_country_id: Joi.string().required().label("origin_country_id"),
    destination_country_id: Joi.string().required().label("destination_country_id"),
    departure_time: Joi.string().required().label("departure_time"),
    landing_time: Joi.string().required().label("landing_timer"),
  };


  async populateFlights(cid) {
    try {
      const flightId = this.props.match.params.id;
      const { data: flight } = await addTicket(flightId,cid);
      console.log(flightId)
      this.setState({ data: this.mapToViewModel(flight) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
      
  async componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      await this.setState({ user });
    } catch (error) {}

    await this.populateFlights(this.state.user.spid);
  }

  mapToViewModel(flight) {
    return {
        id: flight.id,
        airline_company_id: flight.airline_company_id,
        origin_country_id: flight.origin_country_id,
        destination_country_id: flight.destination_country_id,
        departure_time: flight.departure_time,
        landing_time: flight.landing_time

    };
  }

  doSubmit = async () => {
    try{
    await saveAddTickets(this.state.data);
    this.props.history.push('/customer_addtickets') 
    }
    catch(ex){
      alert('The all tickets have been sold out already')
    // await deleteCar(this.state.data.id);
  };
}
  cancel =  () => {
    this.props.history.replace("/customer_addtickets");
  };
  render() {
    return (
      <div>
        <h1>Ticket Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputReadOnly("airline_company_id", "Airline Company")}
          {this.renderInputReadOnly("origin_country_id", "Origin Country")}
          {this.renderInputReadOnly("destination_country_id", "Destination Country")}
          {this.renderInputReadOnly("departure_time", "Departure Time")}
          {this.renderInputReadOnly("landing_time", "Landing Time")}
          {/* {this.renderInput("username_no", "username_no")}
          {this.renderInput("password", "password")}
          {this.renderInput("email", "email")}         */}

          {this.renderButton("Buy", true)}
          {this.renderLink("Cancel", "/customer_addtickets", "btn btn-light")}
        </form>
      </div>
    );
  }
}

export default CustomersAddTicketsForm;
