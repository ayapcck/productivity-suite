import json

from flask import Response


def fetchTodoElementsFrom(scheduler_table, dbCur):
	sql = "SELECT * FROM " + scheduler_table + ""
	
	dbCur.execute(sql)
	res = dbCur.fetchall()
	elements = []
	for x in res:
		elements.append(x)
	return Response(json.dumps(elements), mimetype="application/json")
	
	
def insertTodoElementIn(scheduler_table, dbConn, title, content, datetime):
	sql = "INSERT INTO " + scheduler_table + " (title, content, datetime) VALUES ('" + title + "', '" + content + "', '" + datetime + "')"
	curs = dbConn.cursor()
	try:
		curs.execute(sql)
		dbConn.commit()
	except Exception as e:
		print(str(e))
		return Response(status=400)
	return Response(status=200)

	
def markTodoCompleted(scheduler_table, dbConn, title, datetime):
	sql = "UPDATE " + scheduler_table + " SET completed=1 WHERE title='" + title + "' AND datetime='" + datetime + "'"
	curs = dbConn.cursor()
	try:
		curs.execute(sql)
		dbConn.commit()
	except Exception as e:
		print(str(e))
		return Response(status=400)
	return Response(status=200)