import Joi from 'joi-browser';
import React, { Component } from 'react';
import Input from './common/input';
import * as regairlineService from '../services/regairlineServices'
import { getCountries} from "../services/airlineServices";
import Select from "./common/select";

class AirlineForm extends Component {
    state = {
      account:{name:'',country_id:'',username:'',
               password:'',email:''},
      countries:[],
      errors:{}
    }
    schema={
      name:Joi.string().required().label('Airline Name'),
      country_id:Joi.number().required().label('Country'),
      username:Joi.string().required().label('User name'),
      password:Joi.string().required().label('Password'),
      email:Joi.string().email().required().label('Email')
    }
    async populateCountries() {
      const { data:countries } = await getCountries();
      this.setState({ countries });
    }
        
    async componentDidMount() {
      await this.populateCountries()
    }
    validate=()=>{
      const validationResult=Joi.validate(this.state.account,this.schema,{abortEarly:false})
      console.log(validationResult)
      const errors={}
      if (!validationResult.error) return  null
      for(let item of validationResult.error.details)
          errors[item.path[0]]=item.message
      
      console.log(errors)
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
   await regairlineService.arregister(this.state.account);
   this.props.history.push('/admin')
   }catch(ex){
    if(ex.response && ex.response.status===400){
      const errors={...this.state.errors};
      errors.username=ex.response.data.message;
      console.log(errors.username)
      this.setState({errors})
    }
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
      this.props.history.replace('/admin')
    };
    render() {
      const {account,errors}=this.state;
        return (<div>
            <h2>Create Airline Profile </h2>
            <form onSubmit={this.handleSubmit}>  
               <Input name="username" 
                label="User Name" 
                value={account.username}                 
                onChange={this.handleChange}
                error={errors.username}>
              </Input> 
               <Input name="password" 
                label="Password" 
                value={account.password}                 
                onChange={this.handleChange}
                error={errors.password}>
              </Input>  
            <Input name="email" 
                label="Email Address" 
                value={account.email}                 
                onChange={this.handleChange}
                error={errors.email}>
              </Input>      
               <Input name="name" 
                label="Airline Name" 
                value={account.name} 
                onChange={this.handleChange}
                error={errors.name}>            
              </Input> 
              {/* <Input name="country" 
                label="Country" 
                value={account.country}                 
                onChange={this.handleChange}
                error={errors.country}>
              </Input>    */}
               <Select
                  name='country_id'
                  value={account.country_id}
                  label='Origin Country'
                  options={this.state.countries}
                  onChange={this.handleChange}
                  error={errors.country_id}
                />
              <button disabled={this.validate()} className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;
              <button onClick={this.handleBack} className="btn btn-secondary">Back</button>
            </form>
        </div>);
    }
}
export default AirlineForm;