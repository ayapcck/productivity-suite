import json

from flask import Response, request, Blueprint
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL

scheduler = Blueprint('scheduler', __name__)


def getMySQL():
	from app import getMySQLForScheduler
	return getMySQLForScheduler()

	
@scheduler.route('/retrieveTodos')
@cross_origin()
def retrieveTodos():
	user = request.args.get('user')
	conn = getMySQL().connect()
	return fetchTodoElementsFrom(user, conn.cursor())

	
@scheduler.route('/addTodo', methods=['POST'])
@cross_origin()
def addTodo():
	responseData = json.loads(request.data)
	user = responseData['user']
	title = responseData['title']
	content = responseData['content']
	datetime = responseData['datetime']
	conn = getMySQL().connect()
	return insertTodoElementIn(user, conn, title, content, datetime)
	
	
@scheduler.route('/markCompleted', methods=['POST'])
@cross_origin()
def markCompleted():
	id = request.args.get('id')
	user = request.args.get('user')
	conn = getMySQL().connect()
	return markTodoCompleted(user, conn, id)


@scheduler.route('/changeOrder', methods=['POST'])	
@cross_origin()
def changeOrder():
	responseData = json.loads(request.data)
	user = responseData['user']
	orderObj = responseData['orderObj']
	conn = getMySQL().connect()
	for pair in orderObj:
		try: 
			changeOrderFor(user, pair, conn)
		except Exception as e:
			print(str(e))
			return Response(status=400)
	return Response(status=200)
	
	
@scheduler.route('/clearCompleted', methods=['POST'])
@cross_origin()
def clearCompleted():
	user = request.args.get('user')
	conn = getMySQL().connect()
	return clearCompletedTodos(user, conn)
	
	
@scheduler.route('/createUserTable')
@cross_origin()
def createUserTable():
	user = request.args.get('user')
	sql = str("CREATE TABLE IF NOT EXISTS {} ("
			"title VARCHAR(255), "
			"content VARCHAR(255), "
			"datetime VARCHAR(255), "
			"id INT NOT NULL AUTO_INCREMENT, "
			"completed BOOLEAN DEFAULT false, "
			"PRIMARY KEY (id))").format(user)
			
	conn = getMySQL().connect()
	curs = conn.cursor()
	curs.execute(sql)
	return Response(status=200)
	
	
def changeOrderFor(scheduler_table, orderPair, dbConn):
	id = orderPair[0]
	order = orderPair[1]
	
	sql = "UPDATE {} SET ord={} WHERE id={}".format(scheduler_table, order, id)
	
	curs = dbConn.cursor()
	try: 
		curs.execute(sql)
		dbConn.commit()
	except Exception as e:
		raise e
	

def fetchTodoElementsFrom(scheduler_table, dbCur):
	sql = "SELECT * FROM " + scheduler_table + ""
	
	dbCur.execute(sql)
	res = dbCur.fetchall()
	elements = []
	for x in res:
		elements.append(x)
	return Response(json.dumps(elements), mimetype="application/json")
	
	
def insertTodoElementIn(scheduler_table, dbConn, title, content, datetime):
	sql = "INSERT INTO " + scheduler_table + " (title, content, datetime) VALUES (%s, %s, %s)"
	curs = dbConn.cursor()
	try:
		curs.execute(sql, (title, content, datetime))
		dbConn.commit()
	except Exception as e:
		return Response(status=400)
	return Response(status=200)

	
def markTodoCompleted(scheduler_table, dbConn, id):
	sql = "UPDATE " + scheduler_table + " SET completed=1 WHERE id=%s"
	curs = dbConn.cursor()
	try:
		curs.execute(sql, id)
		dbConn.commit()
	except Exception as e:
		return Response(status=400)
	return Response(status=200)

	
def clearCompletedTodos(scheduler_table, dbConn):
	sql = "DELETE FROM " + scheduler_table + " WHERE completed=1"
	curs = dbConn.cursor()
	try:
		curs.execute(sql)
		dbConn.commit()
	except Exception as e:
		return Response(status=400)
	return Response(status=200)
