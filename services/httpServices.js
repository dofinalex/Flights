import axios from "axios"
import {toast} from 'react-toastify'
import logger from './logServices'

axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token')
axios.interceptors.response.use(null/*success*/,error=>{
    const expectedError=error.response && error.response.status>=400 && error.response.status<=500
    if(!expectedError){
      logger.log(error)
      console.log('error logged',error)
      toast.error('unexpected error occured')  
      // console.log('Error loged',error)
  }
  return Promise.reject(error)
  })
  export default{
    get:axios.get,
    post:axios.post,
    delete:axios.delete,
    put:axios.put
  }