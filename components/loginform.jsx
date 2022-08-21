import Joi from "joi-browser";
import React, { Component } from 'react';
import Input from './common/input';
import { login } from '../services/authServices'


class LoginForm extends Component {
    state = {
      account: { username: "", password: "" },
      errors : {}
    };
  
    schema ={
        username: Joi.string().required(),
        password: Joi.string().required().label('Password'),
  
    }
    username = React.createRef();
    password = React.createRef();
  
    //   componentDidMount() {
    //       this.username.current.focus();
    //   }
  
    validate = () => {
      // const errors = {};
      // const { account } = this.state;
      
      // if (account.username.trim() === "")
      //   errors.username = "User name is required";
  
      // if (account.password.trim() === "")
      //   errors.password = "Password is required";
  
      // return Object.keys(errors).length ? errors : null
  
      
  
      const validatonResult = Joi.validate(this.state.account, this.schema, {abortEarly:false});
  
      const errors = {}
      if(!validatonResult.error)return null;
  
      for(let item of validatonResult.error.details)
          errors[item.path[0]] = item.message;
  
      return errors;
    };
  
    validateProperty = (input) =>{
        // const errors = {};
        // const {account} = this.state;
  
        if(input.name === "username"){
          if(input.value.trim() === "") return "Username is required"
        }else if(input.name === "password"){
          if(input.value.trim() === "") return "Password is required"
        }
        return null;
  
    }
  
    handleSubmit = async(e) => {
      e.preventDefault();
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      
      try {
        const { account } = this.state;
        const { data } =  await login(account.username,account.password)
        localStorage.setItem('token', data.access_token)
        // this.props.history.push('/cars')
        window.location = '/'
  
        const {state} = this.props.location;
        console.log(state.from.pathname)
        window.location = state ?  state.from.pathname :  '/'
      
      } catch (ex) {
        console.log(ex)
        if(ex.response && ex.response.status === 401){
          const errors = {...this.state.errors};
          errors.username = ex.response.data.description;
          this.setState({errors});
        }
      }
    };
  
    handleChange = ({ currentTarget: input }) => {
      const account = { ...this.state.account };
      const errorMessage = this.validateProperty(input);
      const errors = {...this.state.errors};
      
      if(errorMessage)
          errors[input.name] = errorMessage;
      else
          delete errors[input.name];
      
      account[input.name] = input.value;
      this.setState({ account, errors });
    };
    handleBack = () => {
      // Navigate to /products
      // this.props.history.push('/products')
      this.props.history.replace('/visitor')
    };
    render() {
        const {account, errors} = this.state;
      return (
        <div>
          <h1>login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              label={"User"}
              value={account.username}
              onChange={this.handleChange}
              error={errors.username}
            ></Input>
            <Input
              name="password"
              label={"Password"}
              value={account.password}
              onChange={this.handleChange}
              error={errors.password}
            ></Input>
            {/*
               <div className="form-group">
              <label htmlFor="username">User</label>
              <input
                autoFocus
                ref={this.username}
                type="text"
                id="username"
                className="form-control"
                value={this.state.account.username}
                onChange={this.handleChange}
                name="username"
              /> 
            </div>*/}
            {/* <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                ref={this.username}
                type="text"
                id="password"
                className="form-control"
                value={this.state.account.password}
                onChange={this.handleChange}
                name="password"
              />
            </div> */}
            <button disabled={this.validate()} className="btn btn-primary">Login</button>&nbsp;&nbsp;&nbsp;
            <button onClick={this.handleBack} className="btn btn-secondary">Back</button>
          </form>
        </div>
      );
    }
  }
  
  export default LoginForm;
  