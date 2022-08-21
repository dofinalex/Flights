import React, { Component } from 'react';
import Joi from "joi-browser";
import Input from './common/input';
import { getUpdateCustomer, saveCustomer } from '../services/customerServices';

class UpdateCustomer extends Component {
    state = {     
    data: {
      first_name: "",
      last_name: "",
      address: "",
      phone_no: "",
      card_no: "",
      username_no: "",
      password: "",
      email: ""
    },
    errors: {},
  };
  schema = {
    id: Joi.number(),
    first_name: Joi.string().required().label("first_mamee"),
    last_name: Joi.string().required().label("last_name"),
    address: Joi.string().required().label("address"),
    phone_no: Joi.string().required().label("phone_no"),
    card_no: Joi.string().required().label("card_nor"),
    username_no: Joi.string().required().label("username_no"),
    password: Joi.string().required().label("password"),
    email: Joi.number().required().label("price")
  };
  async populateCustomers() {
    try {    
      const { data: customer } = await getUpdateCustomer(6);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateCustomers() 
  }
  mapToViewModel(customer) {
    return {
      id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      address: customer.address,
      phone_no: customer.phone_no,
      card_nor: customer.card_no,
      username_no: customer.username_no,
      password: customer.password,
      email: customer.email
    };
  }
  doSubmit = async () => {
    await saveCustomer(this.state.data);
    // await deleteCar(this.state.data.id);

    this.props.history.push("/customer");
  };
  cancel =  () => {
    
    this.props.history.push("/customer");
  };
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
    handleSubmit=e=>{
   e.preventDefault()
  //  const errors=this.validate()
  //  this.setState({errors})

   const {account}=this.state
   console.log('submitted',account.first_name,account.last_name,
   account.address,account.phone_no,account.card_no,account.username_no,
   account.password,account.email)
    }
    
    handleChange=({currentTarget:input})=>{
     const account={...this.state.account}
    //  const errorMessage=this.validateProperty(input);
    //  const errors={...this.state.errors}

    // if (errorMessage)
    //    errors[input.name]=errorMessage
    // else 
    //     delete errors[input.name]

     account[input.name]=input.value
     this.setState({account})
    }
    handleBack = () => {
      // Navigate to /products
      // this.props.history.push('/products')
      this.props.history.replace('/customer')
    };
    
    render() {
      const {account}=this.state;
        return (<div>
            <h2>Update Customer Profile </h2>
            <form onSubmit={this.handleSubmit}>     
               <Input name="first_name" 
                label="First Name" 
                value={account.first_name} 
                onChange={this.handleChange}
               >       
              </Input> 
              <Input name="last_name" 
                label="Last Name" 
                value={account.last_name}                 
                onChange={this.handleChange}
              >
              </Input>   
              <Input name="address" 
                label="Address" 
                value={account.address}                 
                onChange={this.handleChange}
               >
              </Input> 
              <Input name="phone_no" 
                label="Phone" 
                value={account.phone_no}                 
                onChange={this.handleChange}
                >
              </Input> 
              <Input name="card_no" 
                label="Credit Card" 
                value={account.card_no}                 
                onChange={this.handleChange}
                >
              </Input> 
              <Input name="email" 
                label="Email Address" 
                value={account.email}                 
                onChange={this.handleChange}
               >
              </Input>
              <Input name="username_no" 
                label="User Name" 
                value={account.username_no}                 
                onChange={this.handleChange}
               >
              </Input> 
               <Input name="password" 
                label="Password" 
                value={account.password}                 
                onChange={this.handleChange}
                >
              </Input>     
              <button className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;
              <button onClick={this.handleBack} className="btn btn-secondary">Back</button>
            </form>
        </div>);
    }
}
export default UpdateCustomer;