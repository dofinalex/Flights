import http from './httpServices'
import config from '../config.json'

const apiendPoint=config.apiendPoint+'/general_countries'
export function getCountries(){
    return http.get(apiendPoint)
  }
