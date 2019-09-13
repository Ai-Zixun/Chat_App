import jwt 

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
        try 
