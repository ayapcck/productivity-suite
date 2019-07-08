from datetime import datetime, timedelta
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
	priority = responseData['priority']
	tab = responseData['tab']
	conn = getMySQL().connect()
	return insertTodoElementIn(user, conn, title, content, datetime, priority, tab)


@scheduler.route('/updateTodo', methods=['POST'])
@cross_origin()
def updateTodo():
	responseData = json.loads(request.data)
	user = responseData['user']
	title = responseData['title']
	content = responseData['content']
	datetime = responseData['datetime']
	priority = responseData['priority']
	id = responseData['id']
	conn = getMySQL().connect()
	return updateTodoElementIn(user, conn, title, content, datetime, priority, id)
	
	
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
			"ord INT, "
			"priority BOOLEAN, "
			"tab VARCHAR(255), "
			"PRIMARY KEY (id))").format(user)
			
	conn = getMySQL().connect()
	curs = conn.cursor()
	curs.execute(sql)
	return Response(json.dumps([]), status=200)
	
	
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
	

class TodoElement:
	def __init__(self, title, text, datetime, id, order, priority, tab):
		self.title = title
		self.text = text
		self.datetime = datetime
		self.id = id
		self.order = order
		self.priority = priority
		self.tab = tab


def fetchTodoElementsFrom(scheduler_table, dbCur):
	sql = "SELECT * FROM " + scheduler_table + ""
	
	dbCur.execute(sql)
	res = dbCur.fetchall()
	elements = []
	for todo in res:
		newTab = handleTodoMoveTabs(scheduler_table, todo)
		tab = todo[6]
		if (newTab != ''):
			tab = newTab
		element = TodoElement(todo[0], todo[1], todo[2], todo[3], todo[4], todo[5], tab)
		elements.append(element.__dict__)
	return Response(json.dumps(elements), mimetype="application/json")
	
	
def insertTodoElementIn(scheduler_table, dbConn, title, content, datetime, priority, tab):
	sql = "INSERT INTO " + scheduler_table + \
		" (title, content, datetime, priority, tab) VALUES (%s, %s, %s, {}, %s)".format(priority)
	curs = dbConn.cursor()
	try:
		curs.execute(sql, (title, content, datetime, tab))
		dbConn.commit()
	except Exception:
		return Response(status=400)
	return Response(status=200)


def updateTodoElementIn(scheduler_table, dbConn, title, content, datetime, priority, id):
	sql = str("UPDATE " + scheduler_table + " "
			"SET title=%s,"
			" content=%s,"
			" datetime='{}',"
			" priority={}"
			" WHERE id={}").format(datetime, priority, id)
	curs = dbConn.cursor()
	try:
		curs.execute(sql, (title, content))
		dbConn.commit()
	except Exception as e:
		print(e)
		return Response(status=400)
	return Response(status=200)
	
def markTodoCompleted(scheduler_table, dbConn, id):
	sql = "UPDATE " + scheduler_table + " SET tab='Completed', ord=0 WHERE id=%s"
	curs = dbConn.cursor()
	try:
		curs.execute(sql, id)
		dbConn.commit()
	except Exception:
		return Response(status=400)
	return Response(status=200)

	
def clearCompletedTodos(scheduler_table, dbConn):
	sql = "DELETE FROM " + scheduler_table + " WHERE tab='Completed'"
	curs = dbConn.cursor()
	try:
		curs.execute(sql)
		dbConn.commit()
	except Exception:
		return Response(status=400)
	return Response(status=200)

def handleTodoMoveTabs(user, todo):
	todoDate = todo[2]
	todoTab = todo[6]
	todoId = todo[3]
	if (todoDate == 'T' or todoTab == 'Completed'):
		return ''
	todoDate = todoDate.split('T')[0]
	nowDate = str(datetime.now() - timedelta(hours=7)).split(' ')[0]
	tomorrowDate = str(datetime.now() - timedelta(hours=7) + timedelta(days=1)).split(' ')[0]
	if (todoDate <= nowDate):
		return setTodoTabFor(user, todoId, 'Today')
	if (todoDate == tomorrowDate):
		return setTodoTabFor(user, todoId, 'Tomorrow')
	if (todoDate > tomorrowDate):
		return setTodoTabFor(user, todoId, 'Soon')
	return ''

def setTodoTabFor(user, todoId, tabName):
	sql = "UPDATE {} SET tab='{}' WHERE id={}".format(user, tabName, int(todoId))
	conn = getMySQL().connect()
	curs = conn.cursor()
	try:
		curs.execute(sql)
		conn.commit()
	except Exception as e:
		print(e)
		return Response(status=400)
	return tabName