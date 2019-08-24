from db import * 
from const import * 

if __name__ == '__main__':
    con = DBConnection(host = DB_HOST, dbname = DB_NAME, port = DB_PORT, user = DB_USER, password = DB_PASSWORD)
    con.status() 
    con.estublish_connection()
    con.fetch_user_table()
    con.close_connection()