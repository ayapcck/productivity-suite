import json
import os
import sys

from flask import Flask, Response, request, escape
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL

from email_server import sendMessage, returnMailApp
from notes_app import notes
from scheduler_app import scheduler

app = Flask(__name__)
app.register_blueprint(scheduler)
app.register_blueprint(notes)
mail = returnMailApp(app)
cors = CORS(app)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'ayapcck'
app.config['MYSQL_DATABASE_PASSWORD'] = os.environ['REACT_DATABASE_PASSWORD']
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_DB'] = 'reactWebsiteData'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MYSQL_DATABASE_DB'] = 'productivity_suite'
mysql.init_app(app)

USER_TABLE = 'users'


def getMySQL():
	return mysql

	
def generateResponse(error):
	e = str(error[1])
	status = 400
	print(e)
	e = e.lower()
	if "duplicate" in e:
		status = 409
	return Response(status=status)
	
	
def sendValidationEmail(user, email, activationCode):
	messageBody = "<p>Please verify you account by clicking the below link. If it does not appear as a link, please copy and paste into your browser</p>" + \
	"<p><a href='http://10.0.2.15:5000/validateUser?user=" + user + "&activationCode=" + activationCode + "'>Validate Email Address</a></p>"
	messageSubject = "Please verify your account"
	sendMessage(mail, messageSubject, messageBody, email)


@app.route('/validateUser', methods=['GET'])
@cross_origin()
def validateUser():
	user = request.args.get('user')
	activationCode = request.args.get('activationCode')
	sql = "SELECT activation, active FROM " + USER_TABLE + " WHERE user='" + user + "'"
	
	conn = mysql.connect()
	curs = conn.cursor()
	curs.execute(sql)
	sqlRes = curs.fetchone()
	if sqlRes == None:
		return Response(status=404)
	else:
		resHash = sqlRes[0]
		resActive = sqlRes[1]
		print("hash: " + resHash)
		print("active: " + str(resActive))
		if (resActive == 0 and activationCode == resHash ):
			sql = "UPDATE " + USER_TABLE + " SET active=1 WHERE user=%s AND activation=%s AND active=0"
			try:
				curs.execute(sql, (user, activationCode))
				conn.commit()
			except Exception as e:
				return generateResponse(e)
			return "You may now log in"
		else:
			return "Either your activation code is stale, or your email is already verified"
	
	
@app.route('/addUser', methods=['POST'])
@cross_origin()
def addUser():
	responseData = json.loads(request.data)
	user = responseData['user']
	email = responseData['email']
	password = responseData['password']
	salt = responseData['salt']
	activationCode = responseData['activationCode']
	sql = "INSERT INTO " + USER_TABLE + " (user, email, pass, salt, activation, active) VALUES (%s, %s, %s, %s, %s, 0)"
	
	conn = mysql.connect()
	curs = conn.cursor()
	try:
		curs.execute(sql, (user, email, password, salt, activationCode))
		conn.commit()
	except Exception as e:
		return generateResponse(e)
	sendValidationEmail(user, email, activationCode)
	return Response(status=200)
	
	
@app.route('/getUser', methods=['GET'])
@cross_origin()
def getUser():
	user = request.args.get('user')
	sql = "SELECT user, pass, salt, active FROM " + USER_TABLE + " WHERE user=%s"
	
	conn = mysql.connect()
	curs = conn.cursor()
	curs.execute(sql, user)
	sqlRes = curs.fetchone()
	if sqlRes == None:
		return Response(status=404)
	else:
		return Response(json.dumps(sqlRes), mimetype='application/json')
	
	
@app.route('/testMessage')
@cross_origin()
def testEmail():
	sendValidationEmail("test", "", "testing_activation_code")
	return Response(status=200)


@app.route('/testServer')
@cross_origin()
def testServer():
	return "Hello world"
	

def getUserId(user):
	sql = "SELECT id FROM " + USER_TABLE + " WHERE user=%s"

	conn = mysql.connect()
	curs = conn.cursor()
	curs.execute(sql, user)
	sqlRes = curs.fetchone()
	if sqlRes == None:
		return Response(status=404)
	else:
		return sqlRes

if __name__ == '__main__':
    app.run(host='10.0.2.15')
