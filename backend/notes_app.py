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
    print("here?")
    return fetchNotesFor(user, conn.cursor())


### API HELPERS ###
def getUserId(user):
    from app import getUserId
    id = getUserId(user)[0]
    return id

def fetchNotesFor(user, curs):
    userId = getUserId(user)
    print(userId)
    sql = "SELECT * FROM " + NOTES_TABLE + " WHERE userId={}".format(userId)

    curs.execute(sql)
    res = curs.fetchall()
    notes = []
    for note in res:
        resNote = Note(note[0], note[1], note[2], note[4])
        print(resNote)
        print(resNote.__dict__)
        notes.append(resNote.__dict__)
    return Response(json.dumps(notes), mimetype="application/json")
