from flask_restful import Resource,reqparse
from sqlalchemy import func
from datetime import datetime
from models.tablesdefinition import *

       
class FlightList(Resource):
    def get(self):
        return list(map(lambda x:x.json(),Flights.query.all())) 
    
class GetFlights(Resource):
    def get(self):
        return list(map(lambda x:x.json(),Flights.query.all())) 
        
class DeleteGetFlights(Resource):  
   def get(self):
        return list(map(lambda x:x.json(),Flights.query.all())) 
    
class DeleteFlights(Resource):       
    def delete(self, id):
        flight=Flights.find_by_id(id)
        if (flight):
            flight.delete_from_db()
            return {'message': 'The Flight has been deleted'}              
        return {'message' : 'The Flight is not found'}, 404  
    
class FlightListUpdate (Resource):
    def get(self):
        return list(map(lambda x:x.json(),Flights.query.all())) 

class UpdateFlight(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=int
                        )
    parser.add_argument('airline_company_id_id',   
                        type=int,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('origin_country_id_id',   
                        type=int,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('destination_country_id_id',   
                        type=int,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('departure_time',   
                        type=str,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('landing_time',   
                        type=str,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('remaining_tickets',   
                        type=int,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )            

    def get(self, id):
        customer = Flights.find_by_id(id)
        if customer:
            return customer.json()

        return {'message' : 'Flight not found'}, 404

    def put(self, id):
        data = UpdateFlight.parser.parse_args()
        flight = Flights.find_by_id(id)
        ddate=datetime.strptime(data.departure_time,'%d-%m-%Y:%H:%M:%S')
        ldate=datetime.strptime(data.landing_time,'%d-%m-%Y:%H:%M:%S')
        if ddate>=ldate :
           return {"message":"Departure date is greater than Landing date,plese correct"},400
        elif data['remaining_tickets']<=0:
            return {"message":"Remaining tickets not greater than 0,plese correct"},400
        elif data['origin_country_id_id']==data['destination_country_id_id']:
            return {"message":"Original Country is the same like Destination Country,plese correct"},400
        else: 
            flight.airline_company_id = data.airline_company_id_id
            flight.origin_country_id = data.origin_country_id_id
            flight.destination_country_id = data.destination_country_id_id
            flight.departure_time = data.departure_time
            flight.landing_time = data.landing_time
            flight.remaining_tickets = data.remaining_tickets
          
            flight.save_to_db()
            return flight.json()
        
class FlightRegister(Resource):
    parser=reqparse.RequestParser()
    parser.add_argument('airline_company_id',type=int,required=True,help='This field cannot be blank')
    parser.add_argument('origin_country_id',type=int,required=True,help='This field cannot be blank')
    parser.add_argument('destination_country_id',type=int,required=True,help='This field cannot be blank')
    parser.add_argument('departure_time',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('landing_time',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('remaining_tickets',type=int,required=True,help='This field cannot be blank')
     
    def post(self):
        data=FlightRegister.parser.parse_args()
        flight=Flights(data['airline_company_id'],data['origin_country_id'],data['destination_country_id'],data['departure_time'],data['landing_time'],data['remaining_tickets'])
        ddate=datetime.strptime(flight.departure_time,'%d-%m-%Y:%H:%M:%S')
        ldate=datetime.strptime(flight.landing_time,'%d-%m-%Y:%H:%M:%S')
        if ddate>=ldate:
           return {"message":"Departure date is greater than Landing date,plese correct"},400
        elif data['remaining_tickets']<=0:
            return {"message":"Remaining tickets not greater than 0,plese correct"},400
        elif data['origin_country_id']==data['destination_country_id']:
            return {"message":"Original Country is the same like Destination Country,plese correct"},400
        else:
           flight.save_to_db()   
           return {"message":"The flight has been created successfully"},201
    
    
