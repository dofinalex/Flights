from flask_restful import Resource,reqparse
from models.tablesdefinition import *

class CountriesList(Resource):
    def get(self):
        return list(map(lambda x:x.json(),Countries.query.all())) 