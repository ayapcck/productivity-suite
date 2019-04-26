from flask import Flask
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Gateway15012@'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_DB'] = 'loginSystem'
mysql.init_app(app)

conn = mysql.connect()
curs = conn.cursor()

db_table = 'loginUsers'

def outputUsers():
	curs.execute("SELECT * FROM tz_login")
	res = curs.fetchone()
	for x in res:
		print(x)
	return "Hello"

@app.route('/')
def hello():
    return outputUsers()

if __name__ == '__main__':
    app.run(host='192.168.0.26')