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
 - OK - healthy, green
 - MINOR - minor problems, orange
 - MAJOR - major problems, red

## Requirements
 - Python 3.6+
 - Flask
 - Mithril JS

## Technical
- The REST API is a Flask application.
- The WEB GUI is a small Mithril/JS app.
- Authentication and RBAC provided by Auth0

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

## Tests
The Postman profile for all API tests is found in the file *cs-mon-api.postman_collection.json* in this repository.

### Test Users
There are two users built for testing purposes:
- manager@capstone-monitor.net (pw="Changeme001!")
- engineer@capstone-monitor.net (pw="Changeme001!")

These users can log into the application page, and fetch the JWT info to update the testing profiles in Postman with the latest Authorization/Bearer information.
The "Token" button in the menu bar will display the logged-in users JWT token.

## Author
J Leary (jeffleary00@gmail.com)
