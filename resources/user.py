from flask_restful import Resource,reqparse
from models.tablesdefinition import *

class UserRegister(Resource):
    parser=reqparse.RequestParser()
    parser.add_argument('username',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('password',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('email',type=str,required=True,help='This field cannot be blank')
    parser.add_argument('user_role',type=int,required=True,help='This field cannot be blank')
    
    def post(self):
        data=UserRegister.parser.parse_args()
        if Users.find_by_username(data['username']):
            return {"message":"The user with similar username already exist"},400
        user=Users(data['username'],data['password'],data['email'],data['user_role'])
        user.save_to_db()   
        return {"message":"The user has been created successfully"},201
    
class UpdateUser(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=int
                        )
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('password',   
                        type=str,                     
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('address',
                        type=str,
                        required=True,
                         help="This field cannot be left blank!"
                    )
    parser.add_argument('email',
                        type=str,
                        required=True,
                         help="This field cannot be left blank!"
                    )

    def put(self, id):
        data = UpdateUser.parser.parse_args()
        user = Users.find_by_id(id)
        if user:
            user.username = data.username
            user.password =  data.password
            user.email =  data.email
            return user.json()

    