import Joi from 'joi-browser';
import React, { Component } from 'react';
import Input from './common/input';
import * as adminService from '../services/adminServices'

class AdminForm extends Component {
    state = {
      account:{first_name:'aabbb',last_name:'',
               username:'',password:'',email:''},
      errors:{}
    }
    schema={
      first_name:Joi.string().required().label('First name'),
      last_name:Joi.string().required().label('Last name'),
      username:Joi.string().required().label('User name'),
      password:Joi.string().required().label('Password'),
      email:Joi.string().email().required().label('Email')
  
    }
    validate=()=>{
      const validationResult=Joi.validate(this.state.account,this.schema,{abortEarly:false})
      console.log(validationResult)
      const errors={}
      if (!validationResult.error) return null
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
   await adminService.adregister(this.state.account);
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
            <h2>Create Customer Profile </h2>
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
               <Input name="first_name" 
                label="First Name" 
                value={account.first_name} 
                onChange={this.handleChange}
                error={errors.first_name}>            
              </Input> 
              <Input name="last_name" 
                label="Last Name" 
                value={account.last_name}                 
                onChange={this.handleChange}
                error={errors.last_name}>
              </Input>   
              <button disabled={this.validate()} className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;
              <button onClick={this.handleBack} className="btn btn-secondary">Back</button>
            </form>
        </div>);
    }
}
export default AdminForm;