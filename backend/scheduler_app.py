from datetime import datetime, timedelta
import json

from flask import Response, request, Blueprint
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL

scheduler = Blueprint('scheduler', __name__)

SCHEDULER_TABLE = 'todos'

SCHEDULER_TABLE = "todos"


def getMySQL():
	from app import getMySQL
	return getMySQL()

	
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
	
	
def changeOrderFor(user, orderPair, dbConn):
	userId = getUserId(user)
	id = orderPair[0]
	order = orderPair[1]
	
	sql = "UPDATE " + SCHEDULER_TABLE + " SET ord={} WHERE id={} AND userId={}".format(order, id, userId)
	
	curs = dbConn.cursor()
	try: 
		curs.execute(sql)
		dbConn.commit()
	except Exception as e:
		raise e
	

class TodoElement:
	def __init__(self, id, title, text, datetime, order, priority, tab):
		self.id = id
		self.title = title
		self.text = text
		self.datetime = datetime
		self.order = order
		self.priority = priority
		self.tab = tab


def fetchTodoElementsFrom(user, dbCur):
	userId = getUserId(user)
	sql = "SELECT * FROM " + SCHEDULER_TABLE + " WHERE userId={}".format(userId)
	
	dbCur.execute(sql)
	res = dbCur.fetchall()
	elements = []
	for todo in res:
		newTab = handleTodoMoveTabs(user, todo)
		tab = todo[6]
		if (newTab != ''):
			tab = newTab
		element = TodoElement(todo[0], todo[1], todo[2], todo[3], todo[4], todo[5], tab)
		elements.append(element.__dict__)
	return Response(json.dumps(elements), mimetype="application/json")
	
	
def insertTodoElementIn(user, dbConn, title, content, datetime, priority, tab):
	userId = getUserId(user)
	sql = "INSERT INTO " + SCHEDULER_TABLE + \
		" (title, content, datetime, priority, tab, userId) VALUES (%s, %s, %s, {}, %s, {})".format(priority, userId)
	curs = dbConn.cursor()
	try:
		curs.execute(sql, (title, content, datetime, tab))
		dbConn.commit()
	except Exception:
		return Response(status=400)
	return Response(status=200)


def updateTodoElementIn(user, dbConn, title, content, datetime, priority, id):
	userId = getUserId(user)
	sql = str("UPDATE " + SCHEDULER_TABLE + " "
			"SET title=%s,"
			" content=%s,"
			" datetime='{}',"
			" priority={}"
			" WHERE id={} AND userId={}").format(datetime, priority, id, userId)
	curs = dbConn.cursor()
	try:
		curs.execute(sql, (title, content))
		dbConn.commit()
	except Exception as e:
		print(e)
		return Response(status=400)
	return Response(status=200)
	
def markTodoCompleted(user, dbConn, id):
	userId = getUserId(user)
	sql = "UPDATE " + SCHEDULER_TABLE + " SET tab='Completed', ord=0 WHERE id=%s AND userId={}".format(userId)
	curs = dbConn.cursor()
	try:
		curs.execute(sql, id)
		dbConn.commit()
	except Exception:
		return Response(status=400)
	return Response(status=200)

	
def clearCompletedTodos(user, dbConn):
	userId = getUserId(user)
	sql = "DELETE FROM " + SCHEDULER_TABLE + " WHERE tab='Completed' AND userId={}".format(userId)
	curs = dbConn.cursor()
	try:
		curs.execute(sql)
		dbConn.commit()
	except Exception:
		return Response(status=400)
	return Response(status=200)


def handleTodoMoveTabs(user, todo):
	userId = getUserId(user)
	todoId = todo[0]
	todoDate = todo[3]
	todoTab = todo[6]
	if (todoDate == 'T' or todoTab == 'Completed'):
		return ''
	todoDate = todoDate.split('T')[0]
	("Date: {}".format(todoDate))
	nowDate = str(datetime.now() - timedelta(hours=7)).split(' ')[0]
	tomorrowDate = str(datetime.now() - timedelta(hours=7) + timedelta(days=1)).split(' ')[0]
	if (todoDate <= nowDate):
		return setTodoTabFor(userId, todoId, 'Today')
	if (todoDate == tomorrowDate):
		return setTodoTabFor(userId, todoId, 'Tomorrow')
	if (todoDate > tomorrowDate):
		return setTodoTabFor(userId, todoId, 'Soon')
	return ''

def setTodoTabFor(userId, todoId, tabName):
	sql = "UPDATE " + SCHEDULER_TABLE + " SET tab='{}' WHERE id={} AND userId={}".format(tabName, int(todoId), userId)
	conn = getMySQL().connect()
	curs = conn.cursor()
	try:
		curs.execute(sql)
		conn.commit()
	except Exception as e:
		print(e)
		return Response(status=400)
	return tabName

def getUserId(user):
	from app import getUserId
	id = getUserId(user)[0]
	return id
