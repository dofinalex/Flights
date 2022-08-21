import http from './httpServices'
import config from '../config.json'


const apiendPoint=config.apiendPoint+'/customer_gettickets'
function getUrla(id){
    return `${apiendPoint}/${id}`;
  }

export function getTickets(id){
    // return http.get(apiendPoint,{user_id:121})
    // return http.get(apiendPoint,{params: { user_name: username }})  
    return http.get(getUrla(id))
    // return http.get(apiendPoint,{params:{id:id}})
    // return http.get(apiendPoint)
}


const apiendPoint2=config.apiendPoint+'/customer_removetickets'

function getUrlu(id){
    return `${apiendPoint2}/${id}`;
}
export function getCustomerTickets(id){
    // return http.get(apiendPoint,{user_id:121})
    return http.get(getUrlu(id))
}

function getUrlt(id,fid){
    return `${apiendPoint2}/${id}/${fid}`;
}
export function deleteTicket(Id,fid){  
    return http.delete(getUrlt(Id,fid))
}

const apiendPoint3=config.apiendPoint+'/customer_addtickets'

export function getCustomerAllTickets(){
    // return http.get(apiendPoint,{user_id:121})
    return http.get(apiendPoint3)
}

function getUrltc(id,cid){
    return `${apiendPoint3}/${id}/${cid}`;
}
export function addTicket(Id,cid){  
    return http.post(getUrltc(Id,cid))
    // return http.get(getUrltc(Id,cid))
}

export function saveAddTickets(flight){
    
    //exists
    if(flight.id){
      // '/cars/id'
      const body = {...flight};
      delete body.id
      return http.post(getUrltc(flight.id),flight)
    }

    // new
    return  http.post(apiendPoint3, flight)    
  }