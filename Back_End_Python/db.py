import psycopg2

class DBConnection:
    def __init__(self, host, dbname, port, user, password): 
        self.host = host
        self.dbname = dbname
        self.port = port
        self.user = user
        self.password = password
        self.connection_connected =  False 
    
    def status(self):
        print("\tHOST: " + self.host)
        print("\tNAME: " + self.dbname)
        print("\tPOST: " + str(self.port))
        print("\tUSER: " + self.user)
        print("\tPASSWORD: " + self.password)
        print("\tCONNECTED: " + str(self.connection_connected))

    def estublish_connection(self): 
        if (not self.connection_connected): 
            self.connection = psycopg2.connect(
                host = self.host,
                dbname = self.dbname,
                port = self.port, 
                user = self.user,
                password = self.password) 
            self.connection_connected = True 

    def close_connection(self):
        if (self.connection_connected): 
            self.connection.close() 
            self.connection_connected = False 

    def estublish_cursor(self):
        self.cursor = self.connection.cursor()
    
    def close_cursor(self):
        self.cursor.close()

    # USER TABLE - FETCH 

    def fetch_user_table(self): 
        self.cursor.execute("SELECT * FROM user_table;")
        data = self.cursor.fetchall()
        return data 
    
    def fetch_all_user_id(self): 
        self.cursor.execute("SELECT user_id FROM user_table;")
        data = self.cursor.fetchall()
        return data 
    
    def fetch_user_id_via_user_name(self, user_name):
        sql_command = ("SELECT user_id FROM user_table WHERE user_name = \'" + user_name + "\';")
        self.cursor.execute(sql_command)
        data = self.cursor.fetchall()
        return data[0][0]

    def check_user_exit_via_user_name(self, user_name): 
        sql_command = ("SELECT COUNT(1) FROM user_table WHERE user_name = \'" + user_name + "\';")
        self.cursor.execute(sql_command)
        data = self.cursor.fetchall()
        return (int(data[0][0]) >= 1) 
    
    def fetch_user_password_via_user_id(self, user_id): 
        sql_command = ("SELECT user_password FROM user_table WHERE user_id = " + str(user_id) + ";")
        self.cursor.execute(sql_command)
        data = self.cursor.fetchall()
        return data[0][0]  

    # USER TABLE - CREATE  

    def create_user(self, user_name, user_password, user_email = "NULL"): 
        sql_command = ("INSERT INTO user_table (user_id, user_name, user_password, user_email, created_date) VALUES  (DEFAULT, '" + str(user_name) + "', '" + str(user_password) + "', '" + user_email + "', CURRENT_TIMESTAMP);")
        self.cursor.execute(sql_command)
        self.connection.commit()

    # MESSAGE TABLE - FETCH 

    def fetch_message_via_chatroom_id(self, chatroom_id):
        sql_command = ("SELECT message_id, user_id, message_text, created_date FROM message_table WHERE chatroom_id = " + str(chatroom_id) + ";")
        self.cursor.execute(sql_command)
        data = self.cursor.fetchall()
        return data       

    # MESSAGE TABLE - CREATE

    def create_message(self, chatroom_id, user_id, message_text):
        sql_command = ("INSERT INTO message_table (message_id, user_id, chatroom_id, message_text, created_date) VALUES  (DEFAULT, " + str(user_id) + ", " + str(chatroom_id) + ", '" + message_text + "', CURRENT_TIMESTAMP);")
        self.cursor.execute(sql_command)
        self.connection.commit()


