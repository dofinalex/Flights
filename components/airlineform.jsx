import React, { Component } from "react";
import Joi from "joi-browser";
// import Form from "./common/form";
import Form from "./common/form";
import { getCountries, getUpdateAirline, saveAirline } from "../services/airlineServices";



class AirlinesUpdateForm extends Form {
  state = {
    data: {
        name: "",
        country_id_id: "",
        country_id:""
        // username_no: "",
        // password: "",
        // email: ""
    },
    countries:[],
    errors: {},
  };

  schema = {
    id: Joi.number(),
    name: Joi.string().required().label("name"),
    country_id_id: Joi.number().required().label("country_id"),
    // username_no: Joi.string().required().label("username_no"),
    // password: Joi.string().required().label("password"),
    // email: Joi.number().required().label("price")
  };


  async populateAirlines() {
    try {
      const airlineId = this.props.match.params.id;
      const { data: airline } = await getUpdateAirline(airlineId);
      console.log(airlineId)
      this.setState({ data: this.mapToViewModel(airline) });
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
      
  async componentDidMount() {
    await this.populateAirlines();
    await this.populateCountries()
  }

  mapToViewModel(airline) {
    return {
        id: airline.id,
        name: airline.name,
        country_id_id: airline.country_id_id

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
        <h1>Airline Company Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Company Name")}
          {/* {this.renderInput("country_id_id", "Country Id")} */}
          {this.renderSelect("country_id_id", "Country", this.state.countries)}
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
