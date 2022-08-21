from flask_restful import Resource,reqparse
from models.tablesdefinition import *

class AirlineListUpdate (Resource):
    def get(self):
        return list(map(lambda x:x.json(),Airlines_Companies.query.all())) 

class UpdateAirline(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=int
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('country_id_id',   
                        type=int,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )

    def get(self, id):
        customer = Airlines_Companies.find_by_id(id)
        if customer:
            return customer.json()

        return {'message' : 'Customer not found'}, 404

    def put(self, id):
        data1 = UpdateAirline.parser.parse_args()
        airline = Airlines_Companies.find_by_id(id)
        if data1 :
            airline.name = data1.name
            airline.country_id = data1.country_id_id
            airline.save_to_db()
            return airline.json()
    
class AirlinesList(Resource):
    def get(self):
        return list(map(lambda x:x.json(),Airlines_Companies.query.all())) 

class RemoveAirlinesList(Resource):
    def get(self):
        return list(map(lambda x:x.json(),Airlines_Companies.query.all()))  
    
    def delete(self, id):
        airline = Airlines_Companies.find_by_id(id)
        user = Users.find_by_id(airline.user_id)
        if (airline and user):
            airline.delete_from_db()
            user.delete_from_db()
            return {'message': 'Airline Deleted'}       
        return {'message' : 'Airline not found'}, 404  
    
class DeleteAirlinesList(Resource):
    def delete(self, id):
        airline = Airlines_Companies.find_by_id(id)
        user = Users.find_by_id(airline.user_id)
        if (airline and user):
            airline.delete_from_db()
            user.delete_from_db()
            return {'message': 'Airline Deleted'}       
        return {'message' : 'Airline not found'}, 404  
   


class AirlineRegister(Resource):
    parser=reqparse.RequestParser()
    parser.add_argument('username',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('password',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('email',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('name',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('country_id',type=int,required=True,help='This field cannot be blank')
     
    def post(self):
        data=AirlineRegister.parser.parse_args()
        if Users.find_by_username(data['username']):
            return {"message":"The user with similar username already exist"},400
        user=Users(data['username'],data['password'],data['email'],3)
        user.save_to_db()   
        obj=Users.find_by_username(data['username'])       
        customer=Airlines_Companies(data['name'],data['country_id'],obj.id)
        customer.save_to_db()   
        return {"message":"The airline has been created successfully"},201
    
    
