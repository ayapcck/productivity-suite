# Aya's Productivity Suite

## Backend

Currently this is running on a Linux Raspberry Pi. There is a Python Flask application communicating with the node frontend and MySQL server. The MySQL server also exists on the Raspberry Pi. 

### Database

The application uses the database `reactWebsiteData` and currently has three tables, `notes`, `todos`, and `users`.

1. `mysql -p -u root` and enter the password to access the database when you have an ssh connection to the Raspberry Pi.

### Python Flask Server

`requirements.txt` contains requirements for our virtual env.

1. `pip install virtualenv`
2. `source env/bin/activate`
3. `pip install -r requirements.txt`

## Frontend

Currently this is running on a node application on a Windows PC. We have a package.json and package-lock.json

1. `npm install`
2. `npm run build`
3. `npm run start`
