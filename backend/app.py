import json
import sys

from flask import Flask, Response, request
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL

app = Flask(__name__)
cors = CORS(app)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Gateway15012@'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_DB'] = 'reactLoginSystem'
app.config['CORS_HEADERS'] = 'Content-Type'
mysql.init_app(app)

db_table = 'loginUsers'

def generateResponse(error, user, email):
	e = str(error[1])
	status = 400
	message = e
	print(e)
	e = e.lower()
	if "duplicate" in e:
		status = 409
	return Response(status=status)

@app.route('/addUser', methods=['POST'])
@cross_origin()
def addUser():
	user = request.args.get('user')
	email = request.args.get('email')
	password = request.args.get('password')
	salt = request.args.get('salt')
	sql = "INSERT INTO " + db_table + " (user, email, pass, salt) VALUES ('" + user + "', '" + email + "', '" + password + "', '" + salt + "')"
	
	conn = mysql.connect()
	curs = conn.cursor()
	response = Response(json.dumps({'response': 'Account created successfully', 'status': 200}))
	try:
		curs.execute(sql)
		conn.commit()
	except Exception as e:
		response = generateResponse(e, user, email)
		pass
	return response
	
@app.route('/getUser', methods=['GET'])
@cross_origin()
def getUser():
	user = request.args.get('user')
	sql = "SELECT user, pass, salt FROM " + db_table + " WHERE user='" + user + "'"
	
	conn = mysql.connect()
	curs = conn.cursor()
	curs.execute(sql)
	sqlRes = curs.fetchone()
	if sqlRes == None:
		return Response(status=404)
	else:
		return Response(json.dumps(sqlRes), mimetype='application/json')
	
@app.route('/viewUsers')
@cross_origin()
def viewUsers():
	sql = "SELECT * FROM " + db_table + ""
	
	conn = mysql.connect()
	curs = conn.cursor()
	curs.execute(sql)
	res = curs.fetchall()
	users = []
	for x in res:
		users.append(x[1])
	return Response(json.dumps(users), mimetype="application/json")

if __name__ == '__main__':
    app.run(host='192.168.0.26')