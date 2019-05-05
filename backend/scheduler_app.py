import json

from flask import Response


def fetchTodoElementsFrom(scheduler_table, dbCur):
	sql = "SELECT * FROM " + scheduler_table + ""
	
	dbCur.execute(sql)
	res = dbCur.fetchall()
	elements = []
	for x in res:
		elements.append(x[1])
	return Response(json.dumps(elements), mimetype="application/json")
	
	
def insertTodoElementIn(scheduler_table, dbCur, title, content, datetime):
	sql = "INSERT INTO " + scheduler_table + " (title, content, datetime) VALUES ('" + title + "', '" + content + "', '" + datetime + "')"
	conn = mysql.connect()
	curs = conn.cursor()
	curs.execute(sql)
	conn.commit()
	return Response(status=200)
