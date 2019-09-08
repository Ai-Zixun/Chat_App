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
    
    def reestublish_connection_and_cursor(self):
        self.close_connection()
        self.estublish_connection()
        self.estublish_cursor()

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
    
    def fetch_user_name_via_user_id(self, user_id):
        data = []
        while (data == []):
            sql_command = ("SELECT user_name FROM user_table WHERE user_id = " + user_id + ";")
            self.cursor.execute(sql_command)
            data = self.cursor.fetchall()
        return data[0][0]

    def check_user_exit_via_user_name(self, user_name): 
        sql_command = ("SELECT COUNT(1) FROM user_table WHERE user_name = \'" + user_name + "\';")
        self.cursor.execute(sql_command)
        data = self.cursor.fetchall()
        return (int(data[0][0]) >= 1) 
    
    def fetch_user_password_via_user_id(self, user_id): 
        data = []
        while (data == []):
            sql_command = ("SELECT user_password FROM user_table WHERE user_id = " + str(user_id) + ";")
            self.cursor.execute(sql_command)
            data = self.cursor.fetchall()
        return data[0][0]  

    # USER TABLE - CREATE  

    def create_user(self, user_name, user_password): 
        sql_command = ("INSERT INTO user_table (user_id, user_name, user_password, user_email, created_date) VALUES  (DEFAULT, '" + str(user_name) + "', '" + str(user_password) + "', NULL, CURRENT_TIMESTAMP);")
        try:
            self.cursor.execute(sql_command)
            self.connection.commit()
        except:
            self.connection.rollback()
            return -1
        return 0

    # MESSAGE TABLE - FETCH 

    def fetch_message_via_chatroom_id(self, chatroom_id):
        sql_command =  "SELECT message_id, user_name, message_text, message_table.created_date "
        sql_command += "FROM message_table, user_table "
        sql_command += "WHERE chatroom_id = " + str(chatroom_id) + " AND user_table.user_id = message_table.user_id "
        sql_command += "ORDER BY message_id ASC;"
        self.cursor.execute(sql_command)
        data = self.cursor.fetchall()
        return data       

    # MESSAGE TABLE - CREATE

    def create_message(self, chatroom_id, user_id, message_text):
        sql_command = ("INSERT INTO message_table (message_id, user_id, chatroom_id, message_text, created_date) VALUES  (DEFAULT, " + str(user_id) + ", " + str(chatroom_id) + ", '" + message_text + "', CURRENT_TIMESTAMP);")
        try:
            self.cursor.execute(sql_command)
            self.connection.commit()
        except:
            self.connection.rollback()
            return -1
        return 0
    
    # CHATROOM TABLE - FETCH 

    def fetch_chatroom(self):
        data = []
        while (data == []):
            sql_command = ("SELECT chatroom_id, chatroom_name FROM chatroom_table;")
            self.cursor.execute(sql_command)
            data = self.cursor.fetchall()
        return data    

    def check_chatroom_exit_via_chatroom_name(self, chatroom_name): 
        sql_command = ("SELECT COUNT(1) FROM chatroom_table WHERE chatroom_name = \'" + chatroom_name + "\';")
        self.cursor.execute(sql_command)
        data = self.cursor.fetchall()
        return (int(data[0][0]) >= 1) 

    # CHATROOM TABLE - CREATE CHATROOM

    def chatroom_get_chatroom_id_via_chatroom_name(self, chatroom_name):
        sql_command = ("SELECT chatroom_id FROM chatroom_table WHERE chatroom_name = \'" + chatroom_name + "\';")
        self.cursor.execute(sql_command)
        data = self.cursor.fetchall()
        return data[0][0]

    def create_chatroom(self, chatroom_name):
        sql_command = ("INSERT INTO chatroom_table (chatroom_id, chatroom_name, created_date) VALUES  (DEFAULT, '" + chatroom_name + "', CURRENT_TIMESTAMP);")
        try:
            self.cursor.execute(sql_command)
            self.connection.commit()
            return self.chatroom_get_chatroom_id_via_chatroom_name(chatroom_name)
        except:
            self.connection.rollback()
        return -1



