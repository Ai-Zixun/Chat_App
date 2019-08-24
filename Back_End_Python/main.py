from db import * 
from const import * 
from logic import * 

if __name__ == '__main__':
    con = DBConnection(host = DB_HOST, dbname = DB_NAME, port = DB_PORT, user = DB_USER, password = DB_PASSWORD)
    logic = Logic()
    
    con.status() 
    con.estublish_connection()
    con.estublish_cursor()

    print(con.fetch_user_id_via_user_name('admin'))
    print(con.check_user_exit_via_user_name('admin'))
    print(con.fetch_user_password_via_user_id(2))
    print(logic.check_password(con, 'admin', 'admin'))

    con.close_cursor()
    con.close_connection()