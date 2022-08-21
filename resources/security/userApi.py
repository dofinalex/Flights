from logging.config import valid_ident
# from django import db
from flask_restful import Resource, reqparse
from pkg_resources import require
from flask import Flask, request, make_response

from flask import jsonify
from models.tablesdefinition import *
from resources.security.auth import Auth


def token_required(f):
    def decorator(*args, **kwargs):
        token = None
        
        if 'x-auth-token' in request.headers:
            token = request.headers['x-auth-token']
        if not token:
            return make_response(jsonify({"message": "A valid token missing"}), 401)        
        try:
            data = Auth.decode_auth_token(token)
            current_user = Users.find_by_id(data['user_id'])
            kwargs['user'] = current_user
           
        except:
            return make_response(jsonify({"message": "Invalid token"}), 401)

        return f(*args, **kwargs)
    return decorator


class UserApi(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('Authorization',location='headers')
    
    def get(self):
        token=UserApi.parser.parse_args.get('Authorization')
        # if token is valid
        # search user in db
        # if exist create token
        
class UserApiLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str, required=True, help="must have")
    parser.add_argument('password', type=str, required=True, help="must have")

    def post(self):
        data = UserApiLogin.parser.parse_args()
        username = data['username']
        password = data['password']
        return Auth.authenticate(username, password)