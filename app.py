from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jwt import JWT
from flask_jwt_extended import JWTManager
from resources.airlines import AirlinesList, RemoveAirlinesList,AirlineListUpdate,UpdateAirline
from resources.countries import CountriesList

from resources.flights import FlightList, FlightListUpdate,GetFlights,DeleteGetFlights,DeleteFlights, UpdateFlight,FlightRegister
from resources.user import UserRegister
from resources.customer import CustomerAddTicketsPost, CustomerAddTickets, CustomerList, CustomerRegister, DeleteGetTickets, DeleteTickets,GetTickets,RemoveCustomerList,DeleteCustomerList, UpdateCustomer,CustomerListUpdate
from resources.airlines import AirlineRegister,DeleteAirlinesList
from resources.admin import AdminRegister,RemoveAdminList,DeleteAdminList
from security import authenticate, identity
from resources.security.userApi import UserApiLogin



app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///Flights_db.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['PROPAGANT_EXCEPTIONS']=True



app.secret_key='my'
api=Api(app)

@app.before_first_request
def create_table():
       db.create_all()
       
jwt = JWT(app, authenticate, identity)
jwt = JWTManager(app)
cors=CORS(app,resources={r"/*":{"origins":"*"}})
api.add_resource(FlightList,'/general_flights')
api.add_resource(AirlinesList,'/general_airlines')
api.add_resource(CountriesList,'/general_countries') 
api.add_resource(UserRegister,'/general_newuser1')
api.add_resource(CustomerRegister,'/visitor_profile1')
api.add_resource(CustomerListUpdate, '/customer_update')
api.add_resource(UpdateCustomer, '/customer_update/<int:id>')
api.add_resource(GetTickets,'/customer_gettickets/<int:id>')
api.add_resource(CustomerAddTickets,'/customer_addtickets')
api.add_resource(CustomerAddTicketsPost,'/customer_addtickets/<int:id>/<int:cid>')
api.add_resource(DeleteGetTickets,'/customer_removetickets/<int:id>')
api.add_resource(DeleteTickets,'/customer_removetickets/<int:id>/<int:fid>')
api.add_resource(AirlineListUpdate, '/aircompany_update')
api.add_resource(UpdateAirline, '/aircompany_update/<int:id>')
api.add_resource(GetFlights,'/aircompany_getflights')
api.add_resource(FlightRegister,'/aircompany_register1')
api.add_resource(FlightListUpdate, '/aircompany_updateflight')
api.add_resource(UpdateFlight, '/aircompany_updateflight/<int:id>')
api.add_resource(DeleteGetFlights,'/aircompany_removeflights')
api.add_resource(DeleteFlights, '/aircompany_removeflights/<int:id>')
api.add_resource(CustomerList,'/admin_customers')
api.add_resource(AirlineRegister,'/admin_airline1')
api.add_resource(AdminRegister,'/admin_admin1')
api.add_resource(RemoveAirlinesList,'/admin_remove_airline')
api.add_resource(RemoveCustomerList,'/admin_remove_customers')
api.add_resource(RemoveAdminList,'/admin_remove_admin')
api.add_resource(DeleteAirlinesList, '/admin_remove_airline/<int:id>')
api.add_resource(DeleteCustomerList,'/admin_remove_customers/<int:id>')
api.add_resource(DeleteAdminList,'/admin_remove_admin/<int:id>')
api.add_resource(UserApiLogin, '/visitor_login')

from db import db
db.init_app(app)


if __name__=='__main__':
       app.run(debug=True)



