from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'mysecretkey'
socketio = SocketIO(app)

@app.route('/')
def sessions():
    #return render_template('session_example.html')
    return render_template('index.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)

if __name__ == '__main__':
    socketio.run(app, debug=True)