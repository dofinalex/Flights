import http from './httpServices'
import config from '../config.json'

const apiendPoint=config.apiendPoint+'/general_newuser1'
export function register(user){
const data={
    username:user.username,
    password:user.password,
    email:user.email,
    user_role:user.user_role
}
   return http.post(apiendPoint,data)
  }
