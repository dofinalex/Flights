import React, { Component } from 'react';
import Input from './common/input';
import { login } from '../services/authServices'

class LoginFrom extends Component {
    state = {
      account:{username:'aaa1',password:''},
      errors:{}
    }

    username = React.createRef();
    password = React.createRef();

    validate=()=>{
      const errors={}
      const {account}=this.state
      if(account.username.trim()==="")
         errors.username='User name is required'
      if(account.password.trim()==="")
         errors.password='Password is required'
      return Object.keys(errors).length ? errors:null

    }
    validateProperty=(input)=>{
      const errors={}
      const {account}=this.state
      if (input.name==="username"){
         if (input.value.trim()==="") return 'User name is required'
      }
      else if (input.name==="password"){
        if (input.value.trim()==="") return 'password is required'
      }
      return null
    }
    handleSubmit=async(e)=>{
   e.preventDefault()
   const errors = this.validate();
   this.setState({ errors: errors || {} });
   
  //  const errors=this.validate()
  //  this.setState({errors})

  //  const {account}=this.state
  //  console.log('submitted',account.username,account.password)
  try {
    const { account } = this.state;
    const { data } =  await login(account.username, account.password)
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
            <h2>Log in </h2>
            <form onSubmit={this.handleSubmit}>     
               <Input name="username" 
                label="User Name" 
                value={account.username} 
                onChange={this.handleChange}
                error={errors==null ? null:errors.username}>
              {/* </Input> <span>{this.state.errors.username}</span>   */}              
              </Input> 
               <Input name="password" 
                label="Password" 
                value={account.password}                 
                onChange={this.handleChange}
                error={errors==null ? null:errors.password}>
              </Input>     
              <button disabled={this.validate()} className="btn btn-primary">Log In</button>&nbsp;&nbsp;&nbsp;
              <button onClick={this.handleBack} className="btn btn-secondary">Back</button>
            </form>
        </div>);
    }
}

export default LoginFrom;