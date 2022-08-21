import http from './httpServices'
import config from '../config.json'

const apiendPoint=config.apiendPoint+'/visitor_profile1'
export function cregister(customer){
const data={
    username:customer.username,
    password:customer.password,
    email:customer.email,
    first_name:customer.first_name,
    last_name:customer.last_name,
    address:customer.address,
    phone_no:customer.phone_no,
    credit_card_no:customer.credit_card_no
}
   return http.post(apiendPoint,data)
  }

const apiendPoint2=config.apiendPoint+'/customer_update'

function getUrlp(uid){
  return `${apiendPoint2}/${uid}`;
} 

export function getUpdateCustomers(){
    return http.get(apiendPoint2)
    // return http.get(getUrlp(uid))
  }

function getUrlt(id){
  return `${apiendPoint2}/${id}`;
}
export function getUpdateCustomer(id){
    return http.get(getUrlt(id))
  }
  export function saveCustomer(customer){
    
    //exists
    if(customer.id){
      // '/cars/id'
      const body = {...customer};
      delete body.id
      return http.put(getUrlt(customer.id), body)
    }

    // new
    return  http.post(apiendPoint2, customer)    
  }