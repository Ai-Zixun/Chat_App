from db import * 
from const import * 
from logic import * 

from flask import Flask
from flask import request, abort, jsonify

def init():
    connection = DBConnection(host = DB_HOST, dbname = DB_NAME, port = DB_PORT, user = DB_USER, password = DB_PASSWORD)
    logic = Logic()
    connection.estublish_connection()
    connection.estublish_cursor()
    return (connection, logic)

def close(connection):
    connection.close_cursor()
    connection.close_connection()

connection, logic = init()
app = Flask(__name__)

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