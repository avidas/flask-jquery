from flask import Flask, jsonify, render_template, request, current_app, redirect, flash
from functools import wraps
import json

app = Flask(__name__)

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

@app.route('/_add_numbers')
@jsonp
def add_numbers():
    ''' Because numbers must be added server side '''
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run('0.0.0.0',port=4000)
