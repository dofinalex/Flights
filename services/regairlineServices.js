import http from './httpServices'
import config from '../config.json'

const apiendPoint=config.apiendPoint+'/admin_airline1'
export function arregister(airline){
const data={
    username:airline.username,
    password:airline.password,
    email:airline.email,
    name:airline.name,
    country_id:airline.country_id
}
   return http.post(apiendPoint,data)
  }
