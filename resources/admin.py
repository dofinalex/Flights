from flask_restful import Resource,reqparse
from models.tablesdefinition import *


class RemoveAdminList(Resource):
    def get(self):
        return list(map(lambda x:x.json(),Administrators.query.all())) 
    
class DeleteAdminList(Resource):
   def delete(self, id):
        admin = Administrators.find_by_id(id)
        user = Users.find_by_id(admin.user_id)
        if (admin and user):
            admin.delete_from_db()
            user.delete_from_db()
            return {'message': 'Administrator Deleted'}       
        return {'message' : 'Administrator not found'}, 404  
   
    
class AdminRegister(Resource):
    parser=reqparse.RequestParser()
    parser.add_argument('username',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('password',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('email',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('first_name',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('last_name',type=str,required=True,help='This field cannot be blank')
  
    def post(self):
        data=AdminRegister.parser.parse_args()
        if Users.find_by_username(data['username']):
            return {"message":"The user with similar username already exist"},400
        user=Users(data['username'],data['password'],data['email'],1)
        user.save_to_db()   
        obj=Users.find_by_username(data['username'])
        customer=Administrators(data['first_name'],data['last_name'],obj.id)
        customer.save_to_db()   
        return {"message":"The administrator has been created successfully"},201
    
    
