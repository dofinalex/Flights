import http from './httpServices'
import config from '../config.json'

const apiEndPoint = config.apiendPoint + '/visitor_login'
// const apiEndPoint = config.apiendPoint + '/auth'
export function login(username, password){
    return http.post(apiEndPoint, {username, password})
}