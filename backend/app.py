from email_server import sendMessage, returnMailApp

import json
import sys

from flask import Flask, Response, request
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL

app = Flask(__name__)
mail = returnMailApp(app)
cors = CORS(app)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Gateway15012@'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_DB'] = 'reactLoginSystem'
app.config['CORS_HEADERS'] = 'Content-Type'
mysql.init_app(app)

db_table = 'loginUsers'

def generateResponse(error):
	e = str(error[1])
	status = 400
	message = e
	print(e)
	e = e.lower()
	if "duplicate" in e:
		status = 409
	return Response(status=status)
	
def sendValidationEmail(activationCode):
	messageBody = "<p>Please verify you account by clicking the below link. If it does not appear as a link, please copy and paste into your browser</p>" + \
	"<p><a href='http://192.168.0.26:5000/validateUser?user=" + user + "&activationCode=" + activationCode + "'>Validate Email Address</a></p>"
	messageSubject = "Please verify your account"
	sendMessage(mail, messageSubject, messageBody, "email.servser.host@gmail.com")


@app.route('/validateUser', methods=['GET'])
@cross_origin()
def validateUser():
	user = request.args.get('user')
	activationCode = request.args.get('activationCode')
	sql = "SELECT hash, active FROM " + db_table + " WHERE user='" + user + "'"
	
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
			sql = "UPDATE " + db_table + " SET active=1 WHERE user='" + user + "' AND hash='" + activationCode + "' AND active=0"
			try:
				curs.execute(sql)
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
	sql = "INSERT INTO " + db_table + " (user, email, pass, salt, hash, active) VALUES ('" + user + "', '" + email + "', '" + password + "', '" + salt + "', '" + activationCode + "', 0)"
	
	conn = mysql.connect()
	curs = conn.cursor()
	response = Response(status=200)
	try:
		curs.execute(sql)
		conn.commit()
	except Exception as e:
		response = generateResponse(e)
	finally: 
		return response
	sendValidationEmail(activationCode)
	return response
	
@app.route('/getUser', methods=['GET'])
@cross_origin()
def getUser():
	user = request.args.get('user')
	sql = "SELECT user, pass, salt, active FROM " + db_table + " WHERE user='" + user + "'"
	
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
	
@app.route('/testMessage')
@cross_origin()
def testEmail():
	sendValidationEmail("testing_activation_code")
	return Response(status=200)

	
if __name__ == '__main__':
    app.run(host='192.168.0.26')