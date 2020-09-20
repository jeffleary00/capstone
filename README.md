# CAPSTONE MONITOR
A datacenter server hardware health monitoring application api.

## Purpose
For Udacity FSND Nanodegree Capstone final project.

## Project URL
https://cs-monitor.herokuapp.com/

## Overview
Servers are assigned to Clusters(aka, Datacenters).
The health of a Cluster is determined by the health of all it's server children.
If a server has a minor or major fault, that error propagates up to the cluster
and its health is reflected accordingly.

Healths reported are as follows:
 - OK: healthy, green
 - MINOR: minor problems, orange
 - MAJOR: major problems, red

## Requirements
 - Python 3.6+
 - Flask
 - Mithril JS

## Technical
 - The REST API is a Flask application.
 - The WEB GUI is a small Mithril/JS app.
 - Authentication and RBAC provided by Auth0

## Installation
If you wish to fork your own copy of this project, and test from a local server,
follow these instructions. Otherwise, skip to the **Testing** section below.

### Clone from repository.
```
$> git clone https://github.com/jeffleary00/capstone.git
$> cd capstone
```

### For testing, installation into a Python virtualenv is recommended.
Create a new virtualenv named "venv", and activate it.
```
$> python3 -m venv venv
$> source venv/bin/activate
(venv)$>
```

### Install the projects python requirements
```
(venv)$> pip3 install -r ./requirements.txt
```

### Install the cs-mon module
```
(venv)$> pip3 install -e .
```

### Set up database connection ENV variable
The env variable DATABASE_URL dictates how SQLAlchemy connects its models to a database.

By default, the application will use an SQLite in-memory database.
This is fine for initial tryout/testing, but not sufficient for most other purposes.

For a bare minimum, file-based SQLite install, set the environment variable something like:
```
$> export DATABASE_URL="sqlite:////tmp/csmonitor.db"
```

For a more robust, Postgresql based install, set the environment something like:
```
$> export DATABASE_URL="postgresql+psycopg2://${POSTGRES_USERNAME}:${POSTGRES_PASSWD}@${POSTGRES_ADDRESS}/${POSTGRES_DATABASE}"
```

### Initialize the database
```
(venv)$> python3 manage.py db init
(venv)$> python3 manage.py db migrate
(venv)$> python3 manage.py db upgrade
```

### Update configurations for your new environment.
The following files and variables should be edited, to reflect your Auth0 settings.
- setup.sh (vaiables = AUTH0_DOMAIN, AUTH0_API_AUDIENCE)
- auth.py (variables = AUTH0_DOMAIN, AUTH0_API_AUDIENCE)
- static/js/src/auth.js (variables = environment.domain: environment.client_id, environment.redirect_uri, environment.audience)

### Starting the test server
```
(venv)$> python3 ./app.py
* Serving Flask app "app" (lazy loading)
* Environment: production
    WARNING: This is a development server. Do not use it in a production deployment.
    Use a production WSGI server instead.
* Debug mode: off
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

## Testing
### Test Users
There are two users built for testing purposes:
- manager@capstone-monitor.net (pw="Changeme001!")
- engineer@capstone-monitor.net (pw="Changeme001!")

### JWT Token for testing
Log into the app gui with one of the test accounts, and click the Token button in the menu to view and copy the token.

### Testing with curl on the command line
```
# temporarily store the copied token in ENV variable, to make curl commands easier.
$> TOKEN="<TOKEN STRING COPIED FROM STEP ABOVE>"

# Create an initial cluster
$> curl -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -X POST -d '{"name": "test cluster", "notes": "this is a test"}' https://cs-monitor.herokuapp.com/api/v1.0/clusters

*response*
{"clusters":[{"health":[0,"ok"],"id":1,"name":"test cluster","notes":"this is a test","servers":[]}],"success":true}

# Add server to cluster returned from the previous command
$> curl -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -X POST -d '{"name": "server-1", "notes": "this is a test test server", "cluster_id": <cluster id number from last command>}' https://cs-monitor.herokuapp.com/api/v1.0/servers

*response*
{"servers":[{"health":[0,"ok"],"id":1,"name":"server-1","notes":"this is a test server","cluster_id":1}],"success":true}

# Get list of clusters, and their child servers
$> curl -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -X GET https://cs-monitor.herokuapp.com/api/v1.0/clusters

*response*
{"clusters":[{"health":[0,"ok"],"id":1,"name":"test cluster","notes":"this is a test","servers":[{"health":[0,"ok"],"id":1,"name":"server-1","notes":"this is a test server","cluster_id":1}]}],"success":true}
```

## Testing with Postman
### Importing Postman configs.
There is a custom Postman Environment file for these tests, called *cs-mon-api.postman_environment.json*. Please import this environment file into Postman. This ensures that test variables can be stored correctly and tests will pass seamlessly.

The Postman Collection for all API tests is found in the file *cs-mon-api.postman_collection.json* in this repository. Import this file into Postman.
Then choose the "cs-mon-api" collection. Ensure that the collection is set to use the imported "CSmon Test Environment"

### Update Authorization tokens for each role.
Edit the Authorization settings for the "manager-role", "engineer-role", and "manager-cleanup" folders with their correct tokens.
1. Log into web gui as an account with *Manager* permissions.
 - Copy Token value from menu.
 - Edit "manager-role" folder settings in Postman, and assign Bearer Token in the Authorization tab.
 - Also, edit "manager-cleanup" folder settings in Postman, and assign Bearer Token in the Authorization tab.
 - Logout of the gui application.
2. Log into web gui as an account with *Engineer* permissions.
 - Copy Token value from menu.
 - Edit "engineer-role" folder settings in Postman, and assign Bearer Token in the Authorization tab.
 - Logout of the gui application.
3. Click postman "Runner" for the entire "cs-mon-api" folder. This will perform sequentially all tests in the *manager-role*, *engineer-role*, and *manager-cleanup* collections.

## Permissions
- Role ENGINEER can perform GET and PATCH of cluster and server details.
- Role MANAGER can perform POST, PATCH, GET, DELETE of cluster and servers.

## API
| ENDPOINT                | METHOD  | DESCRIPTION | PARAMS | RETURN CODE |
| ---                     | ---     | --- | --- | --- |
| api/v1.0/clusters       | GET     | Get list of all defined clusters | NONE | 200 |
| api/v1.0/clusters       | POST    | Create new cluster | name, notes | 200 |
| api/v1.0/clusters/<id>  | GET     | Get cluster with id | NONE | 200 |
| api/v1.0/clusters/<id>  | PATCH   | Edit cluster with id | name, notes | 200 |
| api/v1.0/clusters/<id>  | DELETE  | Delete cluster with id | NONE | 200 |
| ---                     | ---     | --- | --- | --- |
| api/v1.0/servers        | GET     | Get list of all defined servers | NONE | 200 |
| api/v1.0/servers        | POST    | Create new server | name, notes, is_active, cluster_id | 200 |
| api/v1.0/servers/<id>   | GET     | Get server with id | NONE | 200 |
| api/v1.0/servers/<id>   | PATCH   | Edit server with id | name, notes, is_active, cluster_id | 200 |
| api/v1.0/servers/<id>   | DELETE  | Delete server with id | NONE | 200 |

## Demo Notes
Health states of the servers are randomly generated for demo purposes.
Each time you query the info, you may get different health states.

## Author
J Leary (jeffleary00@gmail.com)
