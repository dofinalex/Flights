import http from './httpServices'
import config from '../config.json'

const apiendPoint=config.apiendPoint+'/admin_admin1'
export function adregister(admin){
const data={
    username:admin.username,
    password:admin.password,
    email:admin.email,
    first_name:admin.first_name,
    last_name:admin.last_name
}
   return http.post(apiendPoint,data)
  }

const apiendPointAdmin=config.apiendPoint+'/admin_remove_admin'
export function getAdmin(){
    return http.get(apiendPointAdmin)
  }

function getUrl(id){
      return `${apiendPointAdmin}/${id}`;
  }
  export function deleteAdmin(Id){  
      return http.delete(getUrl(Id))
  }
