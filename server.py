import os
import json

from db import DBConnection 
from const import * 
from logic import * 

from flask import Flask
from flask import request, abort, jsonify, send_from_directory
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

connection, logic = init()
app = Flask(__name__, static_folder='react/build/')
app.config['SECRET_KEY'] = 'mysecretkey'
socketio = SocketIO(app)

# Static Files (React Build)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != '' and os.path.exists(app.static_folder + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# API
@app.route('/api/login')
def login():
    user_name = request.args.get('user_name')
    user_password = request.args.get('user_password')
    if (user_name == None or user_password == None):
        abort(400)
    if (connection.check_user_exist_via_user_name(user_name)):
        if (logic.check_password(connection, user_name, user_password)):
            user_id = connection.fetch_user_id_via_user_name(user_name)
            token = logic.encode_auth_token(user_id) 
            print(type(token))
            result = {
                "success": True, 
                "user_id": connection.fetch_user_id_via_user_name(user_name),
                "token": token 
            }
            return json.dumps(result, indent=4, sort_keys=True, default=str)
    result = { "success": False }
    return json.dumps(result, indent=4, sort_keys=True, default=str)

@app.route('/api/token_data')
def token_data():
    token = request.args.get('token')
    token_id = logic.decode_auth_token(token)
    return json.dumps({'id': token_id}, indent=4, sort_keys=True, default=str)

@app.route('/api/user_exist')
def user_exist():
    user_name = request.args.get('user_name')
    if (user_name == None):
        abort(400)
    if (connection.check_user_exist_via_user_name(user_name)):
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
    username = connection.fetch_user_name_via_user_id(user_id)
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
    if (connection.check_chatroom_exist_via_chatroom_name(chatroom_name)):
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

"""     
@app.route('/api/chatroom_messages')
def chatroom_messages():
    chatroom_id = request.args.get('chatroom_id')
    data = connection.fetch_message_via_chatroom_id(chatroom_id)
    result = []
    for message in data: 
        result.append({"message_id": message[0], "user_name": message[1], "message": message[2], "created_date": message[3]})
    return jsonify(result)
"""

@app.route('/api/chatroom_messages_all')
def chatroom_messages_all():
    data = connection.fetch_message_all()
    result = []
    for message in data: 
        result.append({"message_id": message[0], "user_name": message[1], "message": message[2], "created_date": message[3], "chatroom_id": message[4]})
    return json.dumps(result, indent=4, sort_keys=True, default=str)

# ---- SOCKET IO PART ---- 
@socketio.on('client_transmission')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('\n ----- \n received client transmission: ' + str(json))
    socketio.emit('server_transmission', json)

def emit_new_message_data():
    data = connection.fetch_message_all()
    result = []
    for message in data: 
        result.append({"message_id": message[0], "user_name": message[1], "message": message[2], "created_date": message[3], "chatroom_id": message[4]})
    socketio.emit('server_update', json.dumps(result, indent=4, sort_keys=True, default=str))

@socketio.on('client_message')
def handle_client_message(transmission, methods=['GET', 'POST']):
    print('\n ----- \n received client message: ')
    print(transmission)
    chatroom_id = transmission['chatroom_id']
    connection.create_message(chatroom_id = chatroom_id, user_id = transmission['user_id'], message_text = transmission['message'])
    emit_new_message_data()

@socketio.on('chatroom_list_update')
def chatroom_list_update(transmission, methods=['GET', 'POST']):
    data = connection.fetch_chatroom()
    result = []
    for room in data: 
        result.append({"chatroom_id": room[0], "chatroom_name": room[1]})
    socketio.emit('chatroom_list_update_server', json.dumps(result, indent=4, sort_keys=True, default=str))

if __name__ == '__main__':
    # Development Environment
    socketio.run(app, debug=True)
    # Deployment Environment 
    # socketio.run(app, host='0.0.0.0', port=80, debug=False)