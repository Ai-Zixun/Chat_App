import os
from flask import Flask, send_from_directory
from flask_socketio import SocketIO

app = Flask(__name__, static_folder='react/build/')
app.config['SECRET_KEY'] = 'mysecretkey'
socketio = SocketIO(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != '' and os.path.exists(app.static_folder + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

def transmission_received(methods=['GET', 'POST']):
    print('Client received transmission')

@socketio.on('client_transmission')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received client transmission: ' + str(json))
    socketio.emit('server_transmission', json, callback=transmission_received)

if __name__ == '__main__':
    socketio.run(app, debug=True)