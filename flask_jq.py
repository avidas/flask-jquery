from flask import Flask, jsonify, render_template, request, current_app, redirect, flash
from functools import wraps
from flask.ext.socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'not_so_secret'
socketio = SocketIO(app)

def jsonp(f):
	'''Wrap JSONified output for JSONP'''
	@wraps(f)
	def decorated_function(*args, **kwargs):
		callback = request.args.get('callback', False)
		if callback:
			content = str(callback) + '(' + str(f(*args,**kwargs)) + ')'
			return current_app.response_class(content, 
												mimetype='application/javascript')
		else:
			return f(*args, **kwargs)
	return decorated_function

@app.route('/test', methods=['GET'])
@jsonp
def test():
    flash('Previous', category='info')
    return jsonify({"foo":"bar"})

@app.route('/dom', methods=['GET'])
def dom():
    return render_template('dom_edit.html')

@app.route('/snake', methods=['GET'])
def snake():
    """
    Make a snake game
    """
    return render_template('snake.html')

@app.route('/_add_numbers')
@jsonp
def add_numbers():
    ''' Because numbers must be added server side '''
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)

#Sending
@socketio.on('test event')
def test_message(message):
    emit('test response', {'data': 'received'})

#Receiving
@socketio.on('test receive')
def test_receive(message):
    print('received json: ' + str(json))

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run('0.0.0.0',port=4000)
