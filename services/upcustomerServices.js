import http from './httpServices'
import config from '../config.json'

const apiendPoint1=config.apiendPoint+ '/customer_update'

function getUrl(id){
    return `${apiendPoint1}/${id}`;
}
export function getCustomer(Id){  
    return http.delete(getUrl(Id))
}