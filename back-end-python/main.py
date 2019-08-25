from db import * 
from const import * 
from logic import * 

if __name__ == '__main__':
    con = DBConnection(host = DB_HOST, dbname = DB_NAME, port = DB_PORT, user = DB_USER, password = DB_PASSWORD)
    logic = Logic()
    
    con.status() 
    con.estublish_connection()
    con.estublish_cursor()

    con.close_cursor()
    con.close_connection()




