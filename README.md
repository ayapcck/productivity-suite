# The Peacock Productivity Suite

Currently, the Peacock Productivity Suite features a login system, to-do scheduler, and a notes tracker. One must have an account created in order to utilize the to-do scheduler or notes tracker as they rely on being able to save and load data per user. 

## Login System

![login_and_signup](https://user-images.githubusercontent.com/22089166/85163886-64e65f80-b218-11ea-876d-5d04160ed881.gif)

### Features

* Regex error checking on user creation fields
* Password hashing and salting

## To-Do Scheduler

![To-do_Scheduler](https://user-images.githubusercontent.com/22089166/85164209-e0481100-b218-11ea-924c-eaa2b43ac290.png)

### Features

* Drag-and-drop to-do rearrangement
* Automatically places new to-do in correct tab based on date
* Automatically moves to-dos into new tab (i.e. from Tomorrow to Today) when date necessitates

## Notes Tracker

![notes_tracker](https://user-images.githubusercontent.com/22089166/85164304-053c8400-b219-11ea-9fe9-ccd000634a73.png)

### Features

* Able to create both notes and lists

## COMING SOON: Budget Helper

**Goal:** to implement a DSL that interfaces with Google Sheets API in order to simplify creation of various budget templates.

Sample DSL code
```
use spreadsheet XXXXX

add monthly_budget
  date June 2020
  expenses [ "eating out", "coffee", "groceries" ]
add

use
```
When finished, the above code should be translated into a google sheet that has rows for each day in June, as well as columns for each of the three expenses. In addition, there will also be various features that are inherent to a monthly budget tracker, and need not be explicitly written. 


## Technologies Used

* Python Flask
* Virtualenv
* MySQL
* Node and NPM
* React
* React-Router
* Redux
* LESS
* Styled-Components
* Babel
* Webpack
* Storybook
* Jest

Note: All of this currently runs inside a virtual Linux machine

## Front-End

To start the front-end server (run these in the /app directory)
1. `npm install`
2. `npm run build`
3. `npm run start`

## Back-End

Currently the back-end is written using Python Flask. The Flask application handles communication between the front-end and the MySQL server.

To start the back-end server (run commands starting in main directory)
1. `pip install virtualenv`
2. `source env/bin/activate`
3. `pip install -r requirements.txt`
4. `cd backend`
5. `python app.py`

Note: `requirements.txt` contains requirements for our virtual env.

## Storybook

To run storybook simply run the following in main directory
1. `npm run storybook`

## Tests

To run all test suites run the following
1. `npm run test`
