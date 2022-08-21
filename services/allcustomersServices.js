import http from './httpServices'
import config from '../config.json'

const apiendPoint=config.apiendPoint+'/admin_customers'
export function getCustomers(){
    return http.get(apiendPoint)
  }

const apiendPoint1=config.apiendPoint+ '/admin_remove_customers'

function getUrl(id){
    return `${apiendPoint1}/${id}`;
}
export function deleteCustomers(Id){  
    return http.delete(getUrl(Id))
}

