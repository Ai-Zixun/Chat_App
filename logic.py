import jwt 
import os 
import datetime 
import time 
from const import JWT_SECRET_KEY 

class Logic: 
    def __init__(self):
        pass 
    
    def check_password(self, dbconnection, user_name, inputed_password):
        if not dbconnection.check_user_exist_via_user_name(user_name):
            return False 
        user_id = dbconnection.fetch_user_id_via_user_name(user_name)
        correct_password = dbconnection.fetch_user_password_via_user_id(user_id)
        return correct_password == inputed_password

    def encode_auth_token(self, user_id): 
        try:         
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0.5),
                'iat': datetime.datetime.utcnow(),
                'uid': user_id
            }
            return jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
        except Exception as exception:
            return exception
    
    def decode_auth_token(self, token): 
        try:
            data = jwt.decode(token, JWT_SECRET_KEY)
            # Token Not Expired 
            if (datetime.datetime.fromtimestamp(data['exp']) >= datetime.datetime.utcnow()):
                return data['uid']
            else:
                return -1
        except:
            return -1

