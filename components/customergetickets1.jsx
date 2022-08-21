import React,{useState,useEffect} from 'react'

const CustomerGetickets = () => {
const [myData, setMyData] = useState([{}])
  useEffect(() => {
    fetch('/customer_gettickets').then(
      response => response.json()
    ).then(data => setMyData(data.myData))
  }, []);
  return (
    <div>
      <table>
        <thead>
        <tr>
           <td>Id</td>
           <td>Airline Company</td>
           <td>Origin Country</td>
           <td>Destination Country</td>
           <td>Departure Time</td>
           <td>Landing Time</td>
        </tr>  
        </thead>    
        <tbody>
        {myData.map((item) => (
         <tr>
         <td>{item.id}</td>
         <td>{item.airline_company_id}</td>
         <td>{item.origin_country_id}</td>
         <td>{item.destination_country_id}</td>
         <td>{item.departure_time}</td>
         <td>{item.landing_time}</td>
         </tr>
        ))}
       
        </tbody>
       </table>
    </div>
  );
}
 
export default CustomerGetickets;