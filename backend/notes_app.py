import json

from flask import Response, request, Blueprint
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL

notes = Blueprint('notes', __name__)

NOTES_TABLE = 'notes'


### UTILS ###


class Note:
    def __init__(self, id, content, noteType, name):
        self.id = id
        self.content = content
        self.noteType = noteType
        self.name = name


def getMySQL():
    from app import getMySQL
    return getMySQL()


### ENDPOINTS ###

@notes.route('/retrieveNotes')
@cross_origin()
def retrieveNotes():
    user = request.args.get('user')
    conn = getMySQL().connect()
    return fetchNotesFor(user, conn.cursor())


@notes.route('/updateNote', methods=['POST'])
@cross_origin()
def updateNotes():
    responseData = json.loads(request.data)
    user = responseData['user']
    content = responseData['content']
    name = responseData['name']
    id = responseData['id']
    conn = getMySQL().connect()
    return updateNotesFor(user, content, name, id, conn)


@notes.route('/deleteNote', methods=['POST'])
@cross_origin()
def deleteNote():
    responseData = json.loads(request.data)
    user = responseData['user']
    id = responseData['id']
    conn = getMySQL().connect()
    return deleteNoteFor(user, id, conn)


@notes.route('/addNote', methods=['POST'])
@cross_origin()
def addNote():
    responseData = json.loads(request.data)
    user = responseData['user']
    content = responseData['content']
    name = responseData['name']
    noteType = responseData['type']
    conn = getMySQL().connect()
    return addNoteFor(user, content, name, noteType, conn)


### API HELPERS ###
def getUserId(user):
    from app import getUserId
    id = getUserId(user)[0]
    return id


def addNoteFor(user, content, name, noteType, conn):
    userId = getUserId(user)
    sql = str("INSERT INTO " + NOTES_TABLE + " "
            "(userId, name, content, type) "
            "VALUES ({}, %s, %s, %s)").format(userId)
    curs = conn.cursor()
    try: 
        curs.execute(sql, (name, content, noteType))
        conn.commit()
    except Exception as e:
        print(e)
        return Response(status=400)
    return Response(status=200)


def deleteNoteFor(user, id, conn):
    userId = getUserId(user)
    sql = "DELETE FROM " + NOTES_TABLE + " WHERE userId={} AND id={}".format(userId, id)
    
    curs = conn.cursor()
    try:
        curs.execute(sql)
        conn.commit()
    except Exception as e:
        print(e)
        return Response(status=400)
    return Response(status=200)


def fetchNotesFor(user, curs):
    userId = getUserId(user)
    sql = "SELECT * FROM " + NOTES_TABLE + " WHERE userId={}".format(userId)

    curs.execute(sql)
    res = curs.fetchall()
    notes = []
    for note in res:
        resNote = Note(note[0], note[1], note[2], note[4])
        notes.append(resNote.__dict__)
    return Response(json.dumps(notes), mimetype="application/json")


def updateNotesFor(user, content, name, id, conn):
    userId = getUserId(user)
    sql = str("UPDATE " + NOTES_TABLE + " "
            "SET content=%s, "
            "name=%s "
            "WHERE userId={} AND id={}").format(userId, id)
    curs = conn.cursor()
    try:
       curs.execute(sql, (content, name))
       conn.commit()
    except Exception as e:
        print(e)
        return Response(status=400)
    return Response(status=200)

