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

    def fetch_user_table(self): 
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM user_table;")
        print(cursor.fetchall())

