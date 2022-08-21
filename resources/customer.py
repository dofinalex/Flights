from pickletools import int4
from flask_restful import Resource,reqparse
from flask import request
from models.tablesdefinition import *
from flask_jwt_extended import create_access_token   
from resources.user import UpdateUser
from sqlalchemy import delete
from resources.security.auth import Auth
import jwt,datetime

class CustomerList(Resource):
    def get(self):         
        return list(map(lambda x:x.json(),Customers.query.all()))       

class RemoveCustomerList(Resource):
    def get(self):
        return list(map(lambda x:x.json(),Customers.query.all())) 

class DeleteCustomerList(Resource):
    def delete(self, id):
        customer = Customers.find_by_id(id)
        user = Users.find_by_id(customer.user_id)
        if (customer and user):
            customer.delete_from_db()
            user.delete_from_db()
            return {'message': 'Customer Deleted'}       
        return {'message' : 'Customer not found'}, 404      
    
class GetTickets(Resource):             
    def get(self,id):
        customer=Customers.find_by_user_id(id)
        tk=Tickets.find_by_customer_id(customer.id)
        t=(r.__dict__['flight_id'] for r in tk)
        t1=Flights.query.filter(Flights.id.in_(t)) 
        
        # flList = Tickets.query.join(Flights, tk.flight_id==Flights.id).add_columns(Tickets.id,Flights.airline_company_id,Flights.origin_country_id,Flights.destination_country_id,Flights.departure_time,Flights.landing_time,Flights.remaining_tickets)    
        return list(map(lambda x:x.json(),t1)) 
    
class CustomerAddTickets(Resource):  
    def get(self):
        return list(map(lambda x:x.json(),Flights.query.all()))   

class CustomerAddTicketsPost(Resource):
    parser=reqparse.RequestParser()
    parser.add_argument('id',type=int,required=True,help='This field cannot be blank')
    parser.add_argument('flight_id',type=int,required=True,help='This field cannot be blank')
    parser.add_argument('customer_id',type=int,required=True,help='This field cannot be blank')      
       
      
    def get(self,id,cid):
        flt = Flights.find_by_id(id)
        if flt:
            return flt.json()

        return {'message' : 'Flight not found'}, 404
          
    def post(self,id,cid):
        flt=Flights.find_by_id(id)
        if flt.remaining_tickets<=0:
            return {"message":"The stock is empty-no tickets"},400
        else:
            ticket=Tickets(id,cid)
            ticket.save_to_db()  
            flt.remaining_tickets=flt.remaining_tickets-1
            flt.save_to_db()
                
               
            return {"message":"The ticket has been purchased successfully"},201   
        
     
class DeleteGetTickets(Resource):  
    def get(self,id):
        customer=Customers.find_by_user_id(id)
        tk=Tickets.find_by_customer_id(customer.id)
        t=(r.__dict__['flight_id'] for r in tk)
        t1=Flights.query.filter(Flights.id.in_(t)) 
        return list(map(lambda x:x.json(),t1)) 
    
class DeleteTickets(Resource):       
    def delete(self, id,fid):
        customer=Customers.find_by_user_id(id)
        flt=Flights.find_by_id(fid)
        ticket=Tickets.query.filter(and_(Tickets.customer_id==customer.id,Tickets.flight_id==fid)).first()
        if (ticket):
            ticket.delete_from_db()
            flt.remaining_tickets=flt.remaining_tickets+1
            flt.save_to_db()
            return {'message': 'The Ticket has been deleted'}              
        return {'message' : 'The ticket is not found'}, 404  
           
class CustomerRegister(Resource):
    parser=reqparse.RequestParser()
    parser.add_argument('username',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('password',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('email',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('first_name',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('last_name',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('address',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('phone_no',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('credit_card_no',type=str,required=True,help='This field cannot be blank')
    
    
    def post(self):
        data=CustomerRegister.parser.parse_args()
        if Users.find_by_username(data['username']):
           return {"message":"The user with similar username already exist"},400
        user=Users(data['username'],data['password'],data['email'],2)
        user.save_to_db()   
        obj=Users.find_by_username(data['username'])
        customer=Customers(data['first_name'],data['last_name'],data['address'],data['phone_no'],data['credit_card_no'],obj.id)
        customer.save_to_db()  
        cst=Customers.find_by_user_id(obj.id)
        try:
            payload = {
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1, hours=0, minutes=0, seconds=20),
                "iat": datetime.datetime.utcnow(),
                "user_id":obj.id,
                "user_name":data['username'],
                "user_role" : 2,
                "user_label":data['first_name']+' '+data['last_name'],
                "user_position":'Customer',
                "spid":cst.id
            }
            signature = jwt.encode(payload, 'jbs', algorithm="HS256")
            return {'access_token': signature.decode('utf-8')}, 201
        except Exception as e:
            return e

class CustomerListUpdate (Resource):
    def get(self):
        return list(map(lambda x:x.json(),Customers.query.all())) 

class UpdateCustomer(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=int
                        )
    parser.add_argument('first_name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('last_name',   
                        type=str,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('address',
                        type=str,
                        required=True,
                         help="This field cannot be left blank!"
                    )
    parser.add_argument('phone_no',
                        type=str,
                        required=True,
                         help="This field cannot be left blank!"
                    )
    parser.add_argument('credit_card_no',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                         )

    def get(self,id):
        car = Customers.find_by_id(id)
        if car:
            return car.json()

        return {'message' : 'Customer not found'}, 404

    def put(self, id):
        data1 = UpdateCustomer.parser.parse_args()
        customer = Customers.find_by_id(id)
        if data1 :
            customer.first_name = data1.first_name
            customer.last_name =  data1.last_name
            customer.address =  data1.address
            customer.phone_no =  data1.phone_no
            customer.credit_card_no =  data1.credit_card_no
            customer.save_to_db()
            return customer.json()

    