import json
import sqlite3
from sqlalchemy import delete, func,and_
import pytest
from apiclient import APIClient
from flask_restframework import status
from model_bakery import baker

from db import db

class Administrators(db.Model):
    __tablename__='Administrators'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    user_id = db.Column(db.Integer,db.ForeignKey("Users.id"),unique=True)
    def __init__(self,first_name,last_name,user_id):
        self.first_name=first_name
        self.last_name=last_name
        self.user_id=user_id
    
    def json(self):
        return {'id':self.id,
                'first_name':self.first_name, 
                'last_name':self.last_name, 
                'user_id':self.user_id
                }
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()    
    
    @classmethod    
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    @classmethod    
    def find_by_user_id(cls,id):
        return cls.query.filter_by(user_id=id).first()
        
class Airlines_Companies(db.Model):
    __tablename__='Airlines_Companies'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String(200),unique=True)
    country_id=db.Column(db.Integer,db.ForeignKey("Countries.id"))
    user_id=db.Column(db.Integer,db.ForeignKey("Users.id"),unique=True)
    def __init__(self,name,country_id,user_id):
        self.name=name
        self.country_id=country_id
        self.user_id=user_id
        
    def json(self):
        return {'id':self.id,
                'name':self.name,   
                'country_id_id':self.country_id, 
                'country_id':Countries.query.filter_by(id=self.country_id).first().name,
                'user_id':self.user_id
                }   
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
    
    @classmethod    
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    @classmethod    
    def find_by_user_id(cls,id):
        return cls.query.filter_by(user_id=id).first()
             
class Countries(db.Model):
    __tablename__='Countries'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String(200),unique=True)    
    def __init__(self,id,name):
        self.id=id  
        self.name=name
    def json(self):
        return {'id':self.id,
                'name':self.name          
                }   
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod    
    def find_by_name(cls,name):
        return cls.query.filter_by(name=name).first()
    
class Customers(db.Model):
    __tablename__='Customers'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    first_name = db.Column(db.String(200))  
    last_name = db.Column(db.String(200)) 
    address = db.Column(db.String(500)) 
    phone_no = db.Column(db.String(20),unique=True) 
    credit_card_no = db.Column(db.String(20),unique=True) 
    user_id=db.Column(db.Integer,db.ForeignKey("Users.id"),unique=True)
    def __init__(self,first_name,last_name,address,phone_no,credit_card_no,user_id):
        self.first_name=first_name
        self.last_name=last_name
        self.address=address
        self.phone_no=phone_no
        self.credit_card_no=credit_card_no
        self.user_id=user_id
    
    def json(self):
        return {'id':self.id,
                'first_name':self.first_name, 
                'last_name':self.last_name, 
                'address':self.address,
                'phone_no':self.phone_no,
                'credit_card_no':self.credit_card_no,
                'user_id':self.user_id
                }  
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()  
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()   
    
    @classmethod    
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    @classmethod    
    def find_by_user_id(cls,id):
        return cls.query.filter_by(user_id=id).first()
    
    
class Flights(db.Model):
    __tablename__='Flights'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    airline_company_id = db.Column(db.Integer,db.ForeignKey("Airlines_Companies.id"))  
    origin_country_id = db.Column(db.Integer,db.ForeignKey("Countries.id"))   
    destination_country_id = db.Column(db.Integer,db.ForeignKey("Countries.id"))   
    departure_time = db.Column(db.String(50)) 
    landing_time = db.Column(db.String(50)) 
    remaining_tickets=db.Column(db.Integer)
    
    def __init__(self,airline_company_id,origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets):
        self.airline_company_id=airline_company_id
        self.origin_country_id=origin_country_id
        self.destination_country_id=destination_country_id
        self.departure_time=departure_time
        self.landing_time=landing_time
        self.remaining_tickets=remaining_tickets
        
    def json(self):
        return {'id':self.id,
                'airline_company_id_id':self.airline_company_id,
                'airline_company_id':Airlines_Companies.query.filter_by(id=self.airline_company_id).first().name, 
                'origin_country_id_id':self.origin_country_id,
                'origin_country_id':Countries.query.filter_by(id=self.origin_country_id).first().name, 
                'destination_country_id_id':self.destination_country_id,
                'destination_country_id':Countries.query.filter_by(id=self.destination_country_id).first().name,
                'departure_time':self.departure_time,
                'landing_time':self.landing_time,
                'remaining_tickets':self.remaining_tickets
                } 
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()  
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()  
        
    @classmethod    
    def find_by_id(cls,id):
         return cls.query.filter_by(id=id).first() 
    
    @classmethod    
    def find_by_airline_id(cls,id):
         return cls.query.filter_by(airline_company_id=id).first() 

    @classmethod    
    def find_by_user_id(cls,id):
        return cls.query.filter_by(user_id=id).first()
           
class Tickets(db.Model):
    __tablename__='Tickets'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)   
    flight_id=db.Column(db.Integer,db.ForeignKey("Flights.id"),unique=True)  
    customer_id=db.Column(db.Integer,db.ForeignKey("Customers.id"),unique=True) 
    def __init__(self,flight_id,customer_id):
        self.flight_id=flight_id
        self.customer_id=customer_id
    def json(self):
        return {'id':self.id,
                'flight_id':self.flight_id, 
                'customer_id':self.customer_id
                }  
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()  
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()  
        
    @classmethod 
    def find_by_id(cls,id):
         return cls.query.filter_by(id=id).first() 
         
    @classmethod    
    def find_by_customer_id(cls,id):
        return cls.query.filter_by(customer_id=id).all()
    
    @classmethod   
    def find_by_customer_flight(cls,customer_id,flight_id):
       return cls.query.filter_by(and_(customer_id=customer_id,flight_id=flight_id)).first()
        
        
class User_Roles(db.Model):
    __tablename__='User_Roles'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True) 
    role_name=db.Column(db.String(50),unique=True)
    def __init__(self,role_name):
        self.role_name=role_name
    def json(self):
        return {'id':self.id,
                'role_name':self.role_name
                }      
    
class Users(db.Model):
    __tablename__='Users'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True) 
    username=db.Column(db.String(50),unique=True)
    password=db.Column(db.String(50))
    email=db.Column(db.String(50),unique=True)
    user_role=db.Column(db.Integer,db.ForeignKey("User_Roles.id"))
    ur=db.relationship('User_Roles') 
    
    def __init__(self,username,password,email,user_role):
        self.username=username
        self.password=password
        self.email=email
        self.user_role=user_role
    
    def json(self):
        return {'id':self.id,
                'username':self.username, 
                'password':self.password,
                'email':self.email,
                'user_role':self.user_role
                }  
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
               
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
    
    @classmethod    
    def find_by_username(cls,username):
        return cls.query.filter_by(username=username).first()
    
    @classmethod    
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
        
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
           self.cursor.execute(f"{self.strg}")
           results =self.cursor.fetchall()
          
        finally:
          self.connection.close()        
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
    def test_flaskenv_airport_system_available(self):
        client=APIClient()
        response=client.get('/main')  
        assert response.status_code==status.HTTP_200_OK
        print('result code is',response.status_code) 
           
    def test_flasknv_general_flights(self):
        # products=baker.make(Flights,_quantity=3)
        client=APIClient()
        response=client.get('/general_flights')
        assert response.status_code==status.HTTP_200_OK
        print('result code is',response.status_code)  
        
    def test_flaskenv_general_airlines(self):
        client=APIClient()
        response=client.get('/general_airlines')
        assert response.status_code==status.HTTP_200_OK
        print('result code is',response.status_code)  
        
    def test_flaskenv_general_countries(self):
        client=APIClient()
        response=client.get('/general_countries')
        assert response.status_code==status.HTTP_200_OK
        print('result code is',response.status_code)  
        
    def test_flaskenv_visitor_profile(self):
        client=APIClient()
        response=client.get('/visitor_profile1')
        assert response.status_code==status.HTTP_200_OK
        print('result code is',response.status_code)  
        
        
