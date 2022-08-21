import React, { Component } from "react";
import Joi from "joi-browser";
// import Form from "./common/form";
import Form from "./common/form";
import { getUpdateFlight,saveFlight,getAirlinesComp } from "../services/flightServices";
import { getCountries} from "../services/airlineServices";
import withTooltip from './common/withTooltip';


class FlightsUpdateForm extends Form {
  state = {
    data: {
        airline_company_id_id:"",
        origin_country_id_id: "",
        destination_country_id_id: "",
        departure_time: "",
        landing_time: "",
        remaining_tickets:""
    },
    airlines:[],
    countries:[],
    errors: {},
  };

  schema = {
    id: Joi.number(),
    airline_company_id_id: Joi.number().required().label("airline_company_id_id"),
    origin_country_id_id: Joi.number().required().label("origin_country_id_id"),
    destination_country_id_id: Joi.number().required().label("destination_country_id_id"),
    departure_time: Joi.string().required().label("departure_time"),
    landing_time: Joi.string().required().label("landing_time"),
    remaining_tickets: Joi.number().required().label("remaining_tickets")
    // username_no: Joi.string().required().label("username_no"),
    // password: Joi.string().required().label("password"),
    // email: Joi.number().required().label("price")
  };


  async populateFlights() {
    try {
      const flightId = this.props.match.params.id;
      const { data: flight } = await getUpdateFlight(flightId);
      this.setState({ data: this.mapToViewModel(flight) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async populateCountries() {
    const { data:countries } = await getCountries();
    console.log('populateCountries:', countries);
    this.setState({ countries });
  }
  async populateAirlines() {
    const { data:airlines } = await getAirlinesComp();
    // console.log('populateCountries:', countries);
    this.setState({ airlines });
  }
  getAirlinesComp
  async componentDidMount() {
    await this.populateFlights();
    await this.populateCountries();
    await this.populateAirlines()
  }

  mapToViewModel(flight) {
    return {
        id: flight.id,
        airline_company_id_id: flight.airline_company_id_id,
        origin_country_id_id: flight.origin_country_id_id,
        destination_country_id_id: flight.destination_country_id_id,
        departure_time: flight.departure_time,
        landing_time: flight.landing_time,
        remaining_tickets:flight.remaining_tickets
        // username_no: customer.username_no,
        // password: customer.password,
        // email: customer.email,
    };
  }

  doSubmit = async () => {
    try{
    await saveFlight(this.state.data);
    this.props.history.push('/aircompany_updateflight');
    }
    catch(ex){
      alert("Please check whether Departure date is greater than Landing date or Remaining Tickets is less or equal to zero or Orifinal country is equal to Destination country")
    }
    // await deleteCar(this.state.data.id);
  };
  
  cancel =  () => {
    this.props.history.replace("/aircompany_updateflight");
  };
  render() {
    return (
      <div>
        <h1>Flight Form</h1>
        <form onSubmit={this.handleSubmit}>    
          {this.renderSelect("airline_company_id_id", "Airline Company", this.state.airlines)}   
          {/* {this.renderInput("airline_company_id_id", "Airline Company")} */}
          {this.renderSelect("origin_country_id_id", "Origin Country", this.state.countries)}
          {this.renderSelect("destination_country_id_id", "Destination Country", this.state.countries)}
          {/* {this.renderInput("destination_country_id_id", "Destination Country")} */}
          {this.renderInput("departure_time", "Departure Time")}
          {this.props.showTooltip && <div style={{ color: 'blue' }}>DD-MM-YYYY:HH:MM:SS</div>}    
          {this.renderInput("landing_time", "Landing Time")}
          {this.props.showTooltip && <div style={{ color: 'blue' }}>DD-MM-YYYY:HH:MM:SS</div>}    
          {this.renderInput("remaining_tickets", "Remaining Tickets")}
          {/* {this.renderInput("username_no", "username_no")}
          {this.renderInput("password", "password")}
          {this.renderInput("email", "email")}         */}

          {this.renderButton("Save", true)}
          {this.renderLink("Cancel", "/aircompany_updateflight", "btn btn-light")}
        </form>
      </div>
    );
  }
}

export default withTooltip(FlightsUpdateForm);
