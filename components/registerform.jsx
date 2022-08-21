import Joi from 'joi-browser';
import React, { Component } from 'react';
import Input from './common/input';
import * as userService from '../services/userServices'

class RegisterForm extends Component {
    state = {
      account:{username:'aaa1',password:'',email:'',user_role:''},
      errors:{}
    }
    schema={
      username:Joi.string().required().label('User name'),
      password:Joi.string().required().label('Password'),
      email:Joi.string().email().required().label('Email'),
      user_role:Joi.string().required().label('User Role'),
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
    handleSubmit=async(e)=>{
   e.preventDefault()
   const errors=this.validate()
   this.setState({errors:errors ||{}})
   try{
   await userService.register(this.state.account);
   this.props.history.push('/general')
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
      this.props.history.replace('/general')
    };
    render() {
      const {account,errors}=this.state;
        return (<div>
            <h1>New User</h1>
            <form onSubmit={this.handleSubmit}>     
               <Input  htmlFor="username" name="username" 
                label="User Name" 
                value={account.username} 
                onChange={this.handleChange}
                // error={errors==null ? null:errors.username}
                error={errors.username}>             
              </Input>               
               <Input htmlFor="password" name="password" 
                label="Password" 
                value={account.password}                 
                onChange={this.handleChange}
                 // error={errors==null ? null:errors.password}
                error={errors.password}>
              </Input>  
              <Input  htmlFor="email" name="email" 
                label="Email" 
                value={account.email} 
                onChange={this.handleChange}
                 // error={errors==null ? null:errors.email}
                 error={errors.email}>             
              </Input> 
              <Input htmlFor="user_role" name="user_role" 
                label="User Role" 
                value={account.user_role}                 
                onChange={this.handleChange}
                 // error={errors==null ? null:errors.password}
                error={errors.user_role}>
              </Input>    
              <button  disabled={this.validate()} className="btn btn-primary">Register</button>&nbsp;&nbsp;&nbsp;
              <button onClick={this.handleBack} className="btn btn-secondary">Back</button>
            </form>
        </div>);
    }
}

export default RegisterForm;