import Joi from 'joi-browser';
import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import Input from './common/input';
import * as flightService from '../services/flightServices'
import { getCountries} from "../services/airlineServices";
import Select from "./common/select";
import withTooltip from './common/withTooltip';

class FlightForm extends Component {
    state = {
      user:"",
      account:{origin_country_id: "",
              destination_country_id: "",
              departure_time: "",
              landing_time: "",
              remaining_tickets:""},
      countries:[],
      errors:{}
    }
    schema={
        origin_country_id: Joi.number().required().label("origin_country_id_id"),
        destination_country_id: Joi.number().required().label("destination_country_id_id"),
        departure_time: Joi.string().required().label("departure_time"),
        landing_time: Joi.string().required().label("landing_time"),
        remaining_tickets: Joi.number().required().label("remaining_tickets")
  
    };
        async populateCountries() {
        const { data:countries } = await getCountries();
        this.setState({ countries });
      }
          
      async componentDidMount() {
        try {
          const token = localStorage.getItem("token");
          const user = jwt_decode(token);
          await this.setState({ user });
        } catch (error) {}

        await this.populateCountries()
      }

    validate=()=>{
      const validationResult=Joi.validate(this.state.account,this.schema,{abortEarly:false})
      // console.log(validationResult)
      const errors={}
      if (!validationResult.error) return null
      for(let item of validationResult.error.details)
          errors[item.path[0]]=item.message
      
      // console.log(errors)
      return errors
    }
    validateProperty=(input)=>{
      const {name,value}=input;
      const obj={[name]:value}
      const schema={[name]:this.schema[name]}
      const {error}=Joi.validate(obj,schema)
      return error ? error.details[0].message:null
    }
   handleSubmit=async(e) =>{
   e.preventDefault()
   const errors=this.validate()
   this.setState({errors:errors ||{}})
   try{
   await flightService.flregister(this.state.account,this.state.user.spid);
   this.props.history.push('/aircompany')
   }catch(ex){
    // if(ex.response && ex.response.status===400){
    // const errors={...this.state.errors};
    //  errors.username=ex.response.data.message;
    //  console.log(errors.username)
    // this.setState({errors})
    // }
    alert("Please check whether Departure date is greater than Landing date or Remaining Tickets is less or equal to zero or Orifinal country is equal to Destination country")
    }
  }
    
    handleChange=({currentTarget:input})=>{
     const account={...this.state.account}
     const errorMessage=this.validateProperty(input);
     const errors={...this.state.errors}

    if (errorMessage)
       errors[input.name]=errorMessage
    else 
        delete errors[input.name]

     account[input.name]=input.value
     this.setState({account,errors})
    }
    handleBack = () => {
      // Navigate to /products
      // this.props.history.push('/products')
      this.props.history.replace('/aircompany')
    };
    render() {
      const {account,errors}=this.state;
        return (<div>
            <h2>Create Flight </h2>
            <form onSubmit={this.handleSubmit}>  
               {/* <Input name="origin_country_id_id" 
                label="Origin Country" 
                value={account.origin_country_id_id}                 
                onChange={this.handleChange}
                error={errors.username}>
              </Input> 
               <Input name="destination_country_id_id" 
                label="Destination Country" 
                value={account.destination_country_id_id}                 
                onChange={this.handleChange}
                error={errors.password}>
              </Input>   */}
               <Select
                  name='origin_country_id'
                  value={account.origin_country_id}
                  label='Origin Country'
                  options={this.state.countries}
                  onChange={this.handleChange}
                  error={errors.origin_country_id}
                />
                <Select
                  name='destination_country_id'
                  value={account.destination_country_id}
                  label='Destination Country'
                  options={this.state.countries}
                  onChange={this.handleChange}
                  error={errors.destination_country_id}
                />
            <Input name="departure_time" 
                label="Departure Time" 
                value={account.departure_time}                 
                onChange={this.handleChange}
                error={errors.email}>
               </Input>  
               {this.props.showTooltip && <div style={{ color: 'blue' }}>DD-MM-YYYY:HH:MM:SS</div>}    
               <Input name="landing_time" 
                label="Landing Time" 
                value={account.landing_time} 
                onChange={this.handleChange}
                error={errors.first_name}>            
              </Input> 
              {this.props.showTooltip && <div style={{ color: 'blue' }}>DD-MM-YYYY:HH:MM:SS</div>}
              <Input name="remaining_tickets" 
                label="Remaining Tickets" 
                value={account.remaining_tickets}                 
                onChange={this.handleChange}
                error={errors.last_name}>
              </Input>   
              <button disabled={this.validate()} className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;
              <button onClick={this.handleBack} className="btn btn-secondary">Back</button>
            </form>
        </div>);
    }
}
export default withTooltip(FlightForm);