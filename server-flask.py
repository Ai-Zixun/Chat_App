from db import * 
from const import * 
from logic import * 

from flask import Flask
from flask import request, abort, jsonify
from flask_socketio import SocketIO


def init():
    connection = DBConnection(host = DB_HOST, dbname = DB_NAME, port = DB_PORT, user = DB_USER, password = DB_PASSWORD)
    logic = Logic()
    connection.estublish_connection()
    connection.estublish_cursor()
    return (connection, logic)

def close(connection):
    connection.close_cursor()
    connection.close_connection()

app = Flask(__name__)
connection, logic = init()


# Hello World 
@app.route('/')
def hello_world():
    return 'Hello, World!'

# API
@app.route('/api/login')
def login():
    user_name = request.args.get('user_name')
    user_password = request.args.get('user_password')
    if (user_name == None or user_password == None):
        abort(400)
    if (connection.check_user_exit_via_user_name(user_name)):
        if (logic.check_password(connection, user_name, user_password)):
            return {
                "success": True, 
                "user_id": connection.fetch_user_id_via_user_name(user_name)
            }
    return {
        "success": False
    }

@app.route('/api/user_exist')
def user_exist():
    user_name = request.args.get('user_name')
    if (user_name == None):
        abort(400)
    if (connection.check_user_exit_via_user_name(user_name)):
        return {
            "exist": True
        }
    else : 
        return {
            "exist": False
        }

@app.route('/api/user_by_id')
def user_by_id():
    user_id = request.args.get('user_id')
    if (user_id == None):
        abort(400)
    print("USER BY ID - REQUEST " + str(user_id))
    username = connection.fetch_user_name_via_user_id(user_id); 
    return {
        "username": username
    }


@app.route('/api/create_user')
def create_user():
    user_name = request.args.get('user_name')
    user_password = request.args.get('user_password')
    if (user_name == None or user_password == None):
        abort(400)
    if (connection.create_user(user_name, user_password) == 0):
        return {
            "success": True, 
            "user_id": connection.fetch_user_id_via_user_name(user_name)
        }
    return {
        "success": False
    }

@app.route('/api/chatroom_list')
def chatroom_list():
    data = connection.fetch_chatroom()
    result = []
    for room in data: 
        result.append({"chatroom_id": room[0], "chatroom_name": room[1]})
    return jsonify(result)

@app.route('/api/chatroom_roomname_exist')
def chatroom_roomname_exist():
    chatroom_name = request.args.get('roomname')
    if (chatroom_name == None):
        abort(400)
    if (connection.check_chatroom_exit_via_chatroom_name(chatroom_name)):
        return {
            "exist": True
        }
    else : 
        return {
            "exist": False
        }

@app.route('/api/chatroom_create')
def chatroom_create():
    chatroom_name = request.args.get('roomname')
    if (chatroom_name == None):
        abort(400) 
    chatroom_id = connection.create_chatroom(chatroom_name) 
    return {
        "chatroom_id": chatroom_id
    }
    
@app.route('/api/chatroom_messages')
def chatroom_messages():
    chatroom_id = request.args.get('chatroom_id')
    data = connection.fetch_message_via_chatroom_id(chatroom_id)
    result = []
    for message in data: 
        result.append({"message_id": message[0], "user_name": message[1], "message": message[2], "created_date": message[3]})
    return jsonify(result)

if __name__ == "__main__":
    app.run(
        host="localhost",
        port="5000",
        threaded=True
    )