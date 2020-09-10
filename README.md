# CAPSTONE MONITOR
A datacenter server hardware health monitoring application.

## Purpose
For Udacity FSND Nanodegree Capstone final project.

## Details
Servers are assigned to Clusters, aka Datacenters.
Healths reported are as follows:
 - OK - healthy, green
 - MINOR - minor problems, orange
 - MAJOR - major problems, red

## Requirements
 - Python 3.6+
 - Flask
 - Mithril JS

## Permissions
- Role ENGINEER can perform view cluster and server details.
- Role MANAGER can perform ENGINEER, plus add, edit, and delete clusters and servers.

## Technical
- The REST API is a Flask application.
- The WEB GUI is a small Mithril/JS app.
- Authentication and RBAC provided by Auth0

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

## Tests

## Author
J Leary (jeffleary00@gmail.com)
