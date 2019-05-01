import os

from flask import Flask
from flask_mail import Mail, Message


SENDER = os.environ['EMAIL_SERVER_ACCOUNT']

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": SENDER,
    "MAIL_PASSWORD": os.environ['EMAIL_SERVER_PASSWORD']
}


def returnMailApp(app):
	app.config.update(mail_settings)
	return Mail(app)

	
def sendMessage(mail, messageSubject, messageBody, recipient):
	msg = Message(messageSubject, sender=("NO_REPLY", SENDER), recipients=[recipient])
	msg.html = messageBody
	mail.send(msg)
	