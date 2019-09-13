from db import * 
from const import * 
from logic import * 
from server import * 

def init():
    con = DBConnection(host = DB_HOST, dbname = DB_NAME, port = DB_PORT, user = DB_USER, password = DB_PASSWORD)
    logic = Logic()
    con.estublish_connection()
    con.estublish_cursor()
    return (con, logic)

def close(con):
    con.close_cursor()
    con.close_connection()

def print_list(list):
    for item in list: 
        print("\t" + str(item))

def test_db(con):
    print("\n--- TEST DB ---")

    # Fetch User Table 
    print("Test: Fetch User Table")
    print_list(con.fetch_user_table())

    # Fetch All User ID
    print("Test: Fetch All User ID")
    print_list(con.fetch_all_user_id())

    # Fetch User ID via User Name
    print("Test: Fetch User ID via User Name")
    print("\t" + str(con.fetch_user_id_via_user_name("admin"))) 
    print("\t" + str(con.fetch_user_id_via_user_name("admin") == 0))
    print("\t" + str(con.fetch_user_id_via_user_name("user2")))
    print("\t" + str(con.fetch_user_id_via_user_name("user2") == 2))

    # Check User Exist 
    print("Test: Check User Exist")
    print("\t" + str(con.check_user_exit_via_user_name("admin") == True))
    print("\t" + str(con.check_user_exit_via_user_name("user2") == True))
    print("\t" + str(con.check_user_exit_via_user_name("Something that does not exist") == False))
    
    # Fetch User Password via User ID
    print("Test: Fetch User Password via User ID ") 
    print("\t" + str(con.fetch_user_password_via_user_id(0) == "admin"))
    print("\t" + str(con.fetch_user_password_via_user_id(3) == "password"))
    print("\t" + str(con.fetch_user_password_via_user_id(2) != "user1"))

    # Create User 
    print("Test: Create User")
    print("\t" + str(con.create_user("NewUser", "password")))
    
    # Fetch Message via Chatroom ID
    print("Test: Fetch User Password via User ID")
    print_list(con.fetch_message_via_chatroom_id(0))

    # Create Message
    print("Test: Create Message")
    print("\t" + str(con.create_message(0, 0, "Sent From Python")))

    # Fetch Chatroom 
    print("Test: Fetch Chatroom")
    print_list(con.fetch_chatroom())

    # Create Message
    print("Test: Create Chatroom")
    print("\t" + str(con.create_chatroom("New Room")))

def test_logic(con, logic):
    print("\n--- TEST LOGIC ---")

    # Check Password
    print("Test: Check Password")
    print("\t" + str(logic.check_password(con, "admin2", "admin") == True))
    print("\t" + str(logic.check_password(con, "kurosuha", "admin") == False))

def server_and_logic():
    con, logic = init()
    test_db(con)
    test_logic(con, logic)
    close(con) 

def jwt_test(): 
    logic = Logic()
    jwt = logic.encode_auth_token(1)
    print(jwt)
    print(type(jwt))
    print (logic.decode_auth_token(jwt))

if __name__ == '__main__':
    jwt_test()

