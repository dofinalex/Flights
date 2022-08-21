import Joi from 'joi-browser';
import React, { Component } from 'react';
import Input from './common/input';
import * as customerService from '../services/customerServices'

class CustomerForm extends Component {
    state = {
      account:{first_name:'aabbb',last_name:'',
               address:'',phone_no:'',
               card_no:'',user_id:'',username:'',
               password_no:'',email:'',user_role:''},
      errors:{}
    }
    schema={
      username:Joi.string().required().label('User name'),
      password:Joi.string().required().label('Password'),
      email:Joi.string().email().required().label('Email'),
      user_role:Joi.string().required().label('User Role'),
    }
    validate=()=>{
      const errors={}
      const {account}=this.state
      if(account.first_name.trim()==="")
         errors.first_name='The first name  is required'
      if(account.last_name.trim()==="")
         errors.last_name='The second name is required'
      if(account.address.trim()==="")
         errors.address='The address is required'
      if(account.phone_no.trim()==="")
         errors.phone_no='The phone number is required'
      if(account.card_no.trim()==="")
         errors.card_no='The credit card number is required'
      if(account.username_no.trim()==="")
         errors.username_no='The username is required'
      if(account.password_no.trim()==="")
         errors.password_no='The password is required'
      if(account.email.trim()==="")
         errors.email='The email address is required'
      return Object.keys(errors).length ? errors:null

    }
    validateProperty=(input)=>{
      const errors={}
      const {account}=this.state
      if (input.name==="first_name"){
        if (input.value.trim()==="") return 'The first name is required'
     }
     else if (input.name==="last_name"){
       if (input.value.trim()==="") return 'The last name is required'
     }
     else if (input.name==="address"){
        if (input.value.trim()==="") return 'The address is required'
     }
     else if (input.name==="phone_no"){
       if (input.value.trim()==="") return 'The phone number is required'
     }
       if (input.name==="card_no"){
        if (input.value.trim()==="") return 'The credit card number is required'
     }
     else if (input.name==="username_no"){
       if (input.value.trim()==="") return 'The username is required'
     }
      else if (input.name==="password"){
        if (input.value.trim()==="") return 'The password is required'
      }
      else if (input.name==="email"){
        if (input.value.trim()==="") return 'The email address is required'
      }
      return null
    }
    handleSubmit=e=>{
   e.preventDefault()
   const errors=this.validate()
   this.setState({errors})
   await customerService.cregister(this.state.account);
  //  const {account}=this.state
  //  console.log('submitted',account.first_name,account.last_name,
  //  account.address,account.phone_no,account.card_no,account.username_no,
  //  account.password_no,account.email)
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
      this.props.history.replace('/visitor')
    };
    render() {
      const {account,errors}=this.state;
        return (<div>
            <h2>Create Customer Profile </h2>
            <form onSubmit={this.handleSubmit}>     
               <Input name="first_name" 
                label="First Name" 
                value={account.first_name} 
                onChange={this.handleChange}
                error={errors==null ? null: errors.first_name}>            
              </Input> 
              <Input name="last_name" 
                label="Last Name" 
                value={account.last_name}                 
                onChange={this.handleChange}
                error={errors==null ? null:errors.last_name}>
              </Input>   
              <Input name="address" 
                label="Address" 
                value={account.address}                 
                onChange={this.handleChange}
                error={errors==null ? null:errors.address}>
              </Input> 
              <Input name="phone_no" 
                label="Phone" 
                value={account.phone_no}                 
                onChange={this.handleChange}
                error={errors==null ? null:errors.phone_no}>
              </Input> 
              <Input name="card_no" 
                label="Credit Card" 
                value={account.card_no}                 
                onChange={this.handleChange}
                error={errors==null ? null:errors.card_no}>
              </Input> 
              <Input name="email" 
                label="Email Address" 
                value={account.email}                 
                onChange={this.handleChange}
                error={errors==null ? null:errors.email}>
              </Input>
              <Input name="username_no" 
                label="User Name" 
                value={account.username_no}                 
                onChange={this.handleChange}
                error={errors==null ? null:errors.username_no}>
              </Input> 
               <Input name="password" 
                label="Password" 
                value={account.password}                 
                onChange={this.handleChange}
                error={errors==null ? null:errors.password}>
              </Input>     
              <button className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;
              <button onClick={this.handleBack} className="btn btn-secondary">Back</button>
            </form>
        </div>);
    }
}
export default CustomerForm;