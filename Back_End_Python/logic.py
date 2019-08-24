class Logic: 
    def __init__(self):
        pass 
    
    def next_available_user_id(self, dbconnection):
        user_list = dbconnection.fetch_all_user_id()
        next_id = 0
        for user in user_list:
            if next_id <= user[0]:
                next_id += 1
        return next_id

    def check_password(self, dbconnection, user_name, inputed_password):
        if not dbconnection.check_user_exit_via_user_name(user_name):
            return false 
        user_id = dbconnection.fetch_user_id_via_user_name(user_name)
        correct_password = dbconnection.fetch_user_password_via_user_id(user_id)
        return correct_password == inputed_password
