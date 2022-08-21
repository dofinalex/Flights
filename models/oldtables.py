import json
import sqlite3
from  datetime import datetime
from sqlalchemy import delete, func,and_
from flask import Flask, jsonify,render_template,request,redirect, url_for,make_response
from flask_sqlalchemy import SQLAlchemy
from security import authenticate,identity
from flask_jwt import JWT,jwt_required
from flask_cors import CORS
import json
import pytest
from apiclient import APIClient
from flask_restframework import status
from model_bakery import baker


app = Flask(__name__)
CORS(app)
app.secret_key='mysecretkey'
jwt=JWT(app,authenticate,identity)

app.config['SQLALCHEMY_DATABASE_URI'] ="sqlite:///Flights_db.db"
app.config['SQLALCHEMY_TRACK_MODIFICATION'] =False
db = SQLAlchemy(app)

class Administrators(db.Model):
    __tablename__='Administrators'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    user_id = db.Column(db.Integer,db.ForeignKey("Users.id"),unique=True)
    def __init__(self,id,first_name,last_name,user_id):
        self.id=id
        self.first_name=first_name
        self.last_name=last_name
        self.user_id=user_id
   
class Airlines_Companies(db.Model):
    __tablename__='Airlines_Companies'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String(200),unique=True)
    country_id=db.Column(db.Integer,db.ForeignKey("Countries.id"))
    user_id=db.Column(db.Integer,db.ForeignKey("Users.id"),unique=True)
    def __init__(self,id,name,country_id,user_id):
        self.id=id
        self.name=name
        self.country_id=country_id
        self.user_id=user_id
        

class Countries(db.Model):
    __tablename__='Countries'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String(200),unique=True)    
    def __init__(self,id,name):
        self.id=id  
        self.name=name
    
class Customers(db.Model):
    __tablename__='Customers'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    first_name = db.Column(db.String(200))  
    last_name = db.Column(db.String(200)) 
    address = db.Column(db.String(500)) 
    phone_no = db.Column(db.String(20),unique=True) 
    credit_card_no = db.Column(db.String(20),unique=True) 
    user_id=db.Column(db.Integer,db.ForeignKey("Users.id"),unique=True)
    def __init__(self,id,first_name,last_name,address,phone_no,credit_card_no,user_id):
        self.id=id  
        self.first_name=first_name
        self.last_name=last_name
        self.address=address
        self.phone_no=phone_no
        self.credit_card_no=credit_card_no
        self.user_id=user_id
        
         
    
class Flights(db.Model):
    __tablename__='Flights'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    airline_company_id = db.Column(db.Integer,db.ForeignKey("Airlines_Companies.id"))  
    origin_country_id = db.Column(db.Integer,db.ForeignKey("Countries.id"))   
    destination_country_id = db.Column(db.Integer,db.ForeignKey("Countries.id"))   
    departure_time = db.Column(db.String(50)) 
    landing_time = db.Column(db.String(50)) 
    remaining_tickets=db.Column(db.Integer)
    def __init__(self,id,airline_company_id,origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets):
        self.id=id  
        self.airline_company_id=airline_company_id
        self.origin_country_id=origin_country_id
        self.destination_country_id=destination_country_id
        self.departure_time=departure_time
        self.landing_time=landing_time
        self.remaining_tickets=remaining_tickets
    
class Tickets(db.Model):
    __tablename__='Tickets'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)   
    flight_id=db.Column(db.Integer,db.ForeignKey("Flights.id"),unique=True)  
    customer_id=db.Column(db.Integer,db.ForeignKey("Customers.id"),unique=True) 
    def __init__(self,id,flight_id,customer_id):
        self.id=id
        self.flight_id=flight_id
        self.customer_id=customer_id

class User_Roles(db.Model):
    __tablename__='User_Roles'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True) 
    role_name=db.Column(db.String(50),unique=True)
    def __init__(self,id,role_name):
        self.id=id
        self.role_name=role_name
        
    
class Users(db.Model):
    __tablename__='Users'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True) 
    username=db.Column(db.String(50),unique=True)
    password=db.Column(db.String(50))
    email=db.Column(db.String(50),unique=True)
    user_role=db.Column(db.Integer,db.ForeignKey("User_Roles.id")) 
    
    def __init__(self,id,username,password,email,user_role):
        self.id=id
        self.username=username
        self.password=password
        self.email=email
        self.user_role=user_role
    
if __name__ == '__main__':
   db.create_all()

class Repository:
    def add_new(self,Table,*vars):
        t=Table(*vars)
        db.session.add(t)
        db.session.commit()

    def get_all(self,Table):
        t=Table.query.all()
        return t
    
    def get_by_id(self,Table,id_no):
        t=Table.query.filter_by(id=id_no)
        return t
    
    def update_row(self,Table,id_no,**vars):
        Table.query.filter_by(id=id_no).update(dict(**vars))
        db.session.commit()
        
    def delete_row(self,Table,id_no):
        db.session.query(Table).filter_by(id=id_no).delete()
        db.session.commit()

    @classmethod       
    def get_user_by_username(self,username_no):
        t=Users.query.filter_by(username=username_no)
        return t

    @classmethod       
    def get_user_by_id(self,id_no):
        t=Users.query.filter_by(id=id_no)
        return t
    
    def getAirlinesByCountry(self,country_id_no):
        t=Airlines_Companies.query.filter_by(country_id=country_id_no)
        return t
        
    def getFlightsByOriginCountryId(self,country_id_no):
        t=Flights.query.filter_by(origin_country_id=country_id_no)
        return t   
    
    def getFlightsByDestinationCountryId(self,country_id_no):
        t=Flights.query.filter_by(destination_country_id=country_id_no)
        return t
    
    def getFlightsByDepartureDate(self,date_n):
        t=Flights.query.filter(func.date(func.substr(Flights.departure_time,7,4)+'-'+func.substr(Flights.departure_time,4,2)+'-'+func.substr(Flights.departure_time,1,2))==func.date(func.substr(date_n,7,4)+'-'+func.substr(date_n,4,2)+'-'+func.substr(date_n,1,2)))  
        return t
    
    def getFlightsByLandingDate(self,date_n):
        t=Flights.query.filter(func.date(func.substr(Flights.landing_time,7,4)+'-'+func.substr(Flights.landing_time,4,2)+'-'+func.substr(Flights.landing_time,1,2))==func.date(func.substr(date_n,7,4)+'-'+func.substr(date_n,4,2)+'-'+func.substr(date_n,1,2)))  
        return t 

    # def getFlightsByCustomer(self,customer_id_no):
    #     rows=Tickets.query.filter_by(customer_id=customer_id_no).first()
    #     t=rows.__dict_
    #     t1=Flights.query.filter_by(id=t['flight_id']) 
    #     return t1 
    def getFlightsByCustomer(self,customer_id_no):
        rows=Tickets.query.filter_by(customer_id=customer_id_no).all()
        t=(r.__dict__['flight_id'] for r in rows)
        t1=Flights.query.filter(Flights.id.in_(t)) 
        return t1 
        
    def SP_get_airline_by_username(self,username):
        self.st=[row.strip() for row in open('get_airline_by_username')]
        self.st=self.st[:-2]
        self.strg=' '.join(self.st)
        #strg='"'+self.strg+'"'

        self.connection=sqlite3.connect("Flights_db.db")
        try:
           self.cursor = self.connection.cursor()
           self.cursor.row_factory=sqlite3.Row
           #self.strg=f"select Airlines_Companies.Id,Airlines_Companies.Name from Airlines_Companies inner join Users on Users.Id=Airlines_Companies.User_id where Users.Username='{username}'"
           self.cursor.execute(f"{self.strg}")
           # fetch result parameters
           results =self.cursor.fetchall()
           #self.connection.commit()
           #self.cursor.close()
        finally:
          self.connection.close()        
        #t=db.session.execute("get_airline_by_username")
        return results
    
class FacadeBase(Repository):
    def get_all_flights(self):
       t=super().get_all(Flights)
       return t 
   
    def get_flight_by_id(self,id_no):
        self.id_no=id_no
        t=super().get_by_id(Flights,id_no)
        return t
    def get_flights_by_parameters(self,origin_country_id_no,destination_id_no,date_n):
        t=Flights.query.filter(Flights.origin_country_id==origin_country_id_no,Flights.destination_country_id==destination_id_no,
        func.date(func.substr(Flights.departure_time,7,4)+'-'+func.substr(Flights.departure_time,4,2)+'-'+func.substr(Flights.departure_time,1,2))==func.date(func.substr(date_n,7,4)+'-'+func.substr(date_n,4,2)+'-'+func.substr(date_n,1,2)))
        return t
    
    def get_all_airlines(self):
       t=super().get_all(Airlines_Companies)
       return t         

    def get_airlines_by_id(self,id_no):
        self.id_no=id_no
        t=super().get_by_id(Airlines_Companies,id_no)
        return t    
    
    def get_airlines_by_parameters(self,country_id_no):
        self.country_id_no=country_id_no
        t=super().getAirlinesByCountry(self.country_id_no)
        return t
    
    def get_all_countries(self):
        t=super().get_all(Countries)
        return t    
    
    def get_countries_by_id(self,id_no):
        self.id_no=id_no
        t=super().get_by_id(Countries,self.id_no)   
        return t    
    
    def create_new_user(self,*vars):
        super().add_new(Users,*vars)
 
class AnonymousFacade(FacadeBase):
    #def login (self,username,password ):
       
    def add_customer(self,first_name,last_name,address,phone_no,card_no,username_no,password_no,email):
        new_id=Users.query.count()+1
        #k=FacadeBase()
        super().create_new_user(new_id,username_no,password_no,email,2)
        cust_id=Customers.query.count()+1
        r = Repository()
        r.add_new(Customers,cust_id,first_name,last_name,address,phone_no,card_no,new_id)

class CustomerFacade(AnonymousFacade):
    def update_customer(self,fname,lname,**vars):
        self.r=Repository()
        self.c=Customers.query.filter_by(first_name=fname,last_name=lname).first()
        self.r.update_row(Customers,self.c.id,**vars)
    
    # def add_ticket(self,cust_id,origin_country,destination_country):
    #     orgn_c=Countries.query.filter_by(name=origin_country.upper()).first()
    #     dstn_c=Countries.query.filter_by(name=destination_country.upper()).first()
    #     rows=Flights.query.filter_by(origin_country_id=orgn_c.id,destination_country_id=dstn_c.id)
    #     t=(r.__dict__ for r in rows if r.__dict__['remaining_tickets']>0)
    #     #t1=Flights.query.filter(Flights.id.in_(t)) 
    #     return t
    def add_ticket(self,cust_id,flight_id_no):
        self.cust_id=cust_id
        self.flight_id_no=flight_id_no
        self.r=Repository()
        self.f=Flights.query.filter_by(id=flight_id_no).first()
        if self.f.__dict__['remaining_tickets']>0:
           self.t=self.f.__dict__['remaining_tickets']-1
           self.r.update_row(Flights,self.f.id,remaining_tickets=self.t)
           self.new_id=Tickets.query.count()+1
           self.r.add_new(Tickets,self.new_id,self.flight_id_no,self.cust_id)
    
    def remove_ticket(self,cust_id,flight_id_no):
        self.cust_id=cust_id
        self.flight_id_no=flight_id_no
        self.r=Repository()
        self.f=Flights.query.filter_by(id=flight_id_no).first()
        self.t=self.f.__dict__['remaining_tickets']+1
        self.r.update_row(Flights,self.f.id,remaining_tickets=self.t)
        self.ticket=Tickets.query.filter_by(customer_id=self.cust_id,flight_id=self.flight_id_no).first()
        self.r.delete_row(Tickets,self.ticket.id)
        
    def get_my_tickets(self,cust_id):
        self.cust_id=cust_id
        # self.rows=Tickets.query.filter_by(customer_id=self.cust_id).all()
        r=Repository()
        self.rows=r.getFlightsByCustomer(self.cust_id)
        return self.rows 
    
class AirlineFacade(AnonymousFacade):
    def get_my_flights(self,airline_id):
        self.airline_id=airline_id
        self.r=Flights.query.filter_by(airline_company_id=self.airline_id).all()
        return self.r
    
    def update_airline(self,ailine_id,**vars):
        self.ailine_id=ailine_id
        self.r=Repository()
        self.r.update_row(Airlines_Companies,self.ailine_id,**vars)
    
    def add_flight(self,*vars):
        r=Repository()
        r.add_new(Flights,*vars)
        
    def update_flight(self,flight_id_no,**vars):
        self.flight_id_no=flight_id_no
        self.r=Repository()
        self.r.update_row(Flights,self.flight_id_no,**vars)
        
    def remove_flight(self,ailine_id,flight_id_no):
        self.ailine_id=ailine_id
        self.flight_id_no=flight_id_no
        self.r=Repository()
        self.f=Flights.query.filter_by(id=self.flight_id_no).first()
        if self.ailine_id==self.f.airline_company_id:
            self.r.delete_row(Flights,self.flight_id_no)

class Administrator(AnonymousFacade):   
    def get_all_customers(self):
        self.r=Repository()
        self.t=self.r.get_all(Customers)   
        return self.t
    
    def add_airline(self,id_no,name_new,country_id_no,user_id_no,
                    username_no,password_no,email_new):
        self.id_no=id_no
        self.name_new=name_new.upper()
        self.country_id_no=country_id_no
        self.user_id_no=user_id_no
        self.username_no=username_no.upper()
        self.password_no=password_no
        self.email_new=email_new
        self.f=FacadeBase()
        self.f.create_new_user(self.user_id_no,self.username_no,self.password_no,self.email_new,3)
        r=Repository()
        r.add_new(Airlines_Companies,self.id_no,self.name_new,self.country_id_no,self.user_id_no)
    
    def add_customer(self,id_no,first_name_no,last_name_no,address_no,phone_no_no,credit_card_no_no,
                     user_id_no,username_no,password_no,email_new):
        self.id_no=id_no
        self.first_name_no=first_name_no.upper()
        self.last_name_no=last_name_no.upper()
        self.address_no=address_no
        self.phone_no_no=phone_no_no
        self.credit_card_no_no=credit_card_no_no
        self.user_id_no=user_id_no
        self.username_no=username_no.upper()
        self.password_no=password_no
        self.email_new=email_new
        self.f=FacadeBase()
        self.f.create_new_user(self.user_id_no,self.username_no,self.password_no,self.email_new,2)
        r=Repository()
        r.add_new(Customers,self.id_no,self.first_name_no,self.last_name_no,self.address_no,self.phone_no_no,
                  self.credit_card_no_no,self.user_id_no)
        
    def add_administrator(self,id_no,first_name_no,last_name_no,user_id_no,username_no,password_no,email_new):
        self.id_no=id_no
        self.first_name_no=first_name_no.upper()
        self.last_name_no=last_name_no.upper()
        self.user_id_no=user_id_no
        self.username_no=username_no.upper()
        self.password_no=password_no
        self.email_new=email_new
        self.f=FacadeBase()
        self.f.create_new_user(self.user_id_no,self.username_no,self.password_no,self.email_new,1)
        r=Repository()
        r.add_new(Administrators,self.id_no,self.first_name_no,self.last_name_no,self.user_id_no)
    
    def remove_airline(self,airline_id):
        self.airline_id=airline_id
        self.r=Repository()
        self.comp=Airlines_Companies.query.filter_by(id=self.airline_id).first()
        self.r.delete_row(Airlines_Companies,self.airline_id)
        self.r.delete_row(Users,self.comp.user_id)
        
    def remove_customer(self,customer_id_no):
        self.customer_id_no=customer_id_no
        self.r=Repository()
        self.comp=Customers.query.filter_by(id=self.customer_id_n).first()
        self.r.delete_row(Customers,self.airline_id)
        self.r.delete_row(Users,self.comp.user_id)
    
    def remove_administrator(self,adm_id):
        self.adm_id=adm_id
        self.r=Repository()
        self.comp=Administrators.query.filter_by(id=self.adm_id).first()
        self.r.delete_row(Administrators,self.airline_id)
        self.r.delete_row(Users,self.comp.user_id)

class Test_Product:
    def test_airport_system_available(self):
        client=APIClient()
        response=client.get('/')  
        assert response.status_code==status.HTTP_200_OK
        print('result code is',response.status_code) 
           
    def test_airport_flights_list(self):
        products=baker.make(Flights,_quantity=3)
        client=APIClient()
        response=client.get('/')
        assert response.status_code==status.HTTP_200_OK
        print('result code is',response.status_code)  
        
@app.route('/customer_gettickets')
def index():
   p = CustomerFacade()
   customers=p.get_my_tickets(5)
#    rows=[]
#    for row in customers:
#        r=(row[0],row[1],row[2],row[3],row[4],row[5])
#        rows.append(r)
#    rowjson=json.dumps(customers)
   return render_template('index22.html', administrator=customers)
app.run(port=5000)               

              
# @app.route('/',methods=['OPTIONS','GET','POST'])
# def greeting():    
#     if request.method == 'OPTIONS':
#         return build_preflight_response()
#     elif (request.method != 'OPTIONS'):
#         req = request.get_json()
#         # query user with req['id']
#         # for demonstration, we assume the username to be Eric
#         return build_actual_response(index)

# def build_preflight_response():
#     response = make_response()
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add('Access-Control-Allow-Headers', "*")
#     response.headers.add('Access-Control-Allow-Methods', "*")
#     return response

# def build_actual_response(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response
# app.run(port=5000)  

# @app.route('/',methods=['GET'])
# def index():
#    p = FacadeBase()
#    administrators=p. get_flight_by_id(1)
# #    administrators=p.get_all_flights()
#    return render_template('index21.html', administrator=administrators)
# #    return jsonify({'data':administrators.id})

# app.run(port=5000)  
# @app.route('/')
# def index():
#    p = FacadeBase()
#    administrators=p.get_all_flights()
#    return render_template('index2.html', administrator=administrators)
# app.run(port=5000)       
# @app.route('/login')
# def index():
#     if request.method=='GET':
#        #d={'username':None,'password':None}
#        #return render_template('login.html',incoming=d)
#        return render_template('login.html')
   
# @app.route('/login/result',methods=['GET','POST'])
# def result():
#     if request.method=='POST':
#        d=request.get_json()
#        print(d)
#        #d1={'username':'aa','password':123}
#        return render_template('login_result.html',result=d)
  
# app.run(port=5000)  


#@jwt_required()
# @app.route('/login')
# def enter():
#     return render_template('login.html')
# @app.route('/login',methods=['POST'])
# def login():
#     if request.method == 'POST':
#       user = request.data
#       un=user['username']
#       return redirect(url_for('/login',name = user))
# app.run(port=5000)        
# @app.route('/')
# def index():
#    p = Administrator()
#    p.remove_airline(116)
#    #return render_template('index7.html', administrator=customers)
# app.run(port=5000) 
        
# @app.route('/')
# def index():
#    p = Administrator()
#    p.add_airline(116,'cook airlines',214,130,'cook','c1R4Efhj','COOK@gmail.com')
#    #return render_template('index7.html', administrator=customers)
# app.run(port=5000)     
        
# @app.route('/')
# def index():
#    p = Administrator()
#    p.add_airline(id=116,name='cook airlines',country_id=214,user_id=130)
#    #return render_template('index7.html', administrator=customers)
# app.run(port=5000)         
          
# @app.route('/')
# def index():
#    p = Administrator()
#    customers=p.get_all_customers()
#    return render_template('index7.html', administrator=customers)
# app.run(port=5000)                
# @app.route('/')
# def index():
#    p = AirlineFacade()
#    p.remove_flight(68,11)
#    #return render_template('index2.html', administrator=administrators)
# app.run(port=5000)   
                    
# @app.route('/')
# def index():
#    p = AirlineFacade()
#    p.update_flight(11,remaining_tickets=30)
#    #return render_template('index2.html', administrator=administrators)
# app.run(port=5000)   
        
# @app.route('/')
# def index():
#    p = AirlineFacade()
#    p.add_flight(id=11,airline_company_id=68,origin_country_id=215,destination_country_id=111,
#                departure_time='23-05-2022:12:30:00',landing_time='24-05-2022:06:13:00',remaining_tickets=29)
#    #return render_template('index2.html', administrator=administrators)
# app.run(port=5000)         
                                   
# @app.route('/')
# def index():
#    p = AirlineFacade()
#    p.update_airline(115,country_id=103,user_id=116)
#    #return render_template('index2.html', administrator=administrators)
# app.run(port=5000)         
                
# @app.route('/')
# def index():
#    p = AirlineFacade()
#    administrators=p.get_my_flights(111)
#    return render_template('index2.html', administrator=administrators)
# app.run(port=5000)         
               
# @app.route('/')
# def index():
#    p = CustomerFacade()
#    administrators=p.get_my_tickets(4)
#    return render_template('index6.html', administrator=administrators)
# app.run(port=5000)     
# @app.route('/')
# def index():
#    p = CustomerFacade()
#    p.remove_ticket(5,10)
#    #return render_template('index2.html', administrator=administrators)
# app.run(port=5000)   
# @app.route('/')
# def index():
#    p = CustomerFacade()
#    p.add_ticket(11,4)
#    #return render_template('index2.html', administrator=administrators)
# app.run(port=5000)             
                  
        
        
        
    # @app.route('/',method=['POST'])
    # def index():
    #    return render_template('index5.html')
    # app.run(port=5000)        
# @app.route('/')
# def index():
#    p = CustomerFacade()
#    p.update_customer('ANTON','CHEHOV',first_name='GENA')
# app.run(port=5000)  
        
            
# adm=Administrators.query.filter_by(first_name='Alex').first()
# print(adm.first_name)
# print(adm.id)

# cnt=Countries.query.filter_by(id=1).first()
# print(cnt.name)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     administrators=r.get_all_flights()
#     return render_template('index2.html', administrator=administrators)
# app.run(port=5000)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     administrators=r.get_flight_by_id(4)
#     return render_template('index2.html', administrator=administrators)
# app.run(port=5000)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     administrators=r.get_flights_by_parameters(101,80,'22-05-2022')
#     return render_template('index2.html', administrator=administrators)
# app.run(port=5000)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     administrators=r.get_all_airlines()
#     return render_template('index4.html', administrator=administrators)
# app.run(port=5000)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     administrators=r.get_airlines_by_id(23)
#     return render_template('index4.html', administrator=administrators)
# app.run(port=5000)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     administrators=r.get_airlines_by_parameters(215)
#     return render_template('index4.html', administrator=administrators)
# app.run(port=5000)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     administrators=r.get_all_countries()
#     return render_template('index.html', administrator=administrators)
# app.run(port=5000)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     administrators=r.get_countries_by_id(214)
#     return render_template('index.html', administrator=administrators)
# app.run(port=5000)
# @app.route('/')
# def index():
#     r = FacadeBase()
#     new_id=Users.query.count()+1   
#     r.create_new_user(new_id,'Ab','Ab1','Ab@gmsil.com',1)
#     return new_id
# app.run(port=5000)
# def index():
#     administrators = Customers.query.all()
#     return render_template('index.html', administrator=administrators)
# def index():
#     r= Repository()
#     administrators=r.get_all(Administrators)
#     return render_template('index.html', administrator=administrators)
# def index():
#     r= Repository()
#     administrators=r.get_by_id(Administrators,1)
#     return render_template('index.html', administrator=administrators)
# # def index():
#     r = Repository()
#     administrators=r.add_new(Administrators,5,'Puk','Puk',129)
# def index():
#     r = Repository()
#     administrators=r.delete_row(Administrators,4)
# def index():
#     r = Repository()
#     administrators=r.update_row(Administrators,1,last_name='Farrahy')
   
# def index():
#     r= Repository()
#     administrators=r.get_by_id(Airlines_Companies,1)
#     return render_template('index.html', administrator=administrators)
# def index():
#     r= Repository()
#     administrators=r.getAirlinesByCountry(215)
#     return render_template('index.html', administrator=administrators)

# def index():
#     r= Repository()
#     administrators=r.getFlightsByDepartureDate('22-05-2022')
#     return render_template('index.html', administrator=administrators)
# def index():
#     r= Repository()
#     administrators=r.getFlightsByLandingDate('23-05-2022')
#     return render_template('index.html', administrator=administrators)

# def index():
#     r= Repository()
#     administrators=r.getFlightsByCustomer(5)
#     return render_template('index2.html', administrator=administrators)
# @app.route('/')
# def index():
#     r= Repository()
#     administrators=r.SP_get_airline_by_username("ALITALIA")
#     return render_template('index.html', administrator=administrators)
# app.run(port=5000)



