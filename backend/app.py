import json

from flask import Flask
from flask import Response
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

def addUser(user, email, password):
	sql = "INSERT INTO " + db_table + " (user, email, pass) VALUES ('" + user + "', '" + email + "', '" + password + "')"
	curs.execute(sql)
	conn.commit()
	return ""
	
@app.route('/viewUsers')
@cross_origin()
def hello():
	sql = "SELECT * FROM " + db_table + ""
	
	conn = mysql.connect()
	curs = conn.cursor()
	curs.execute(sql)
	res = curs.fetchall()
	users = []
	for x in res:
		users.append(x[1])
	return Response(json.dumps(users), mimetype="application.json")

if __name__ == '__main__':
    app.run(host='192.168.0.26')