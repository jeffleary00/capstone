import os
import json
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from cs_mon.models import setup_db, Server, Cluster
from cs_mon.auth import AuthError, requires_auth

app = Flask(__name__)
CORS(app)
setup_db(app)

# CLUSTER ROUTES
@app.route("/api/v1.0/clusters", methods=['GET'])
#@requires_auth('get:clusters')
def clusters_get():
    """
    GET list of all available clusters.

    args:
        - none
    returns:
        - response with json payload and http status code
    """

    clusters = Cluster.query.order_by(Cluster.name).all()
    if clusters is None or len(clusters) < 1:
        abort(404, 'no clusters found')

    return jsonify({
        'success': True,
        'clusters': [c.as_dict() for c in clusters]}), 200

@app.route("/api/v1.0/clusters", methods=['POST'])
#@requires_auth('post:clusters')
def clusters_post():
    """
    CREATE new cluster from POST data.

    args:
        - none
    expected request json:
        - {'name': str, 'notes': str}
    returns:
        - response with json payload and http status code
    """

    try:
        data = request.json
        keys = ['name','notes']
        cluster = Cluster()
        for key in keys:
            if key not in data:
                continue
            setattr(cluster, key, data[key])

        cluster.insert()
        return jsonify({
            'success': True,
            'clusters': [cluster.as_dict()]}), 200
    except Exception as x:
        abort(422, str(x))

@app.route("/api/v1.0/clusters/<int:id>", methods=['GET'])
#@requires_auth('get:clusters')
def clusters_get_id(id):
    """
    GET clusters.

    args:
        - int id
    returns:
        - response with json payload and http status code
    """

    cluster = Cluster.query.get(id)
    if cluster is None:
        abort(404, 'cluster with id %d not found' % id)

    return jsonify({
        'success': True,
        'clusters': [cluster.as_dict()]}), 200

@app.route("/api/v1.0/clusters/<int:id>", methods=['PATCH'])
#@requires_auth('patch:clusters')
def clusters_edit(id):
    """
    EDIT cluster with id.

    args:
        - int, id of cluster to edit
    expected request json:
        - {'name': str, 'notes': str}
    returns:
        - response with json payload and http status code
    """

    cluster = Cluster.query.get(id)
    if cluster is None:
        abort(404, 'cluster with id %d not found' % id)

    try:
        data = request.json
        keys = ['name','notes']
        for key in keys:
            if key not in data:
                continue
            setattr(cluster, key, data[key])

        cluster.update()
        return jsonify({
            'success': True,
            'clusters': [cluster.as_dict()]}), 200
    except Exception as x:
        abort(422, str(x))

@app.route("/api/v1.0/clusters/<int:id>", methods=['DELETE'])
#@requires_auth('delete:clusters')
def clusters_delete(id):
    """
    DELETE cluster with id

    args:
        - int, id of cluster to delete
    returns:
        - response with json payload and http status code
    """

    try:
        cluster = Cluster.query.get(id)
        cluster.delete()
        return jsonify({
            'success': True,
            'delete': id}), 200
    except Exception as x:
        abort(404, str(x))

# SERVER ROUTES
@app.route("/api/v1.0/servers", methods=['GET'])
#@requires_auth('get:servers')
def servers_get():
    """
    GET list of all available servers.

    args:
        - none
    returns:
        - response with json payload and http status code
    """

    servers = Server.query.order_by(Server.name).all()
    if servers is None or len(servers) < 1:
        abort(404, 'no servers found')

    return jsonify({
        'success': True,
        'servers': [s.as_dict() for s in servers]}), 200

@app.route("/api/v1.0/servers", methods=['POST'])
#@requires_auth('post:servers')
def servers_post():
    """
    CREATE new server from POST data.

    args:
        - none
    expected request json:
        - {'name': str, 'notes': str, 'cluster_id': int, 'is_active': bool}
    returns:
        - response with json payload and http status code
    """

    try:
        data = request.json
        keys = ['name','notes','is_active','cluster_id']
        server = Server()
        for key in keys:
            if key not in data:
                continue
            setattr(server, key, data[key])

        server.insert()
        return jsonify({
            'success': True,
            'servers': [server.as_dict()]}), 200
    except Exception as x:
        abort(422, str(x))

@app.route("/api/v1.0/servers/<int:id>", methods=['GET'])
#@requires_auth('get:servers')
def servers_get_id(id):
    """
    GET servers.

    args:
        - int id
    returns:
        - response with json payload and http status code
    """

    server = Server.query.get(id)
    if server is None:
        abort(404, 'server with id %d not found' % id)

    return jsonify({
        'success': True,
        'servers': [server.as_dict()]}), 200

@app.route("/api/v1.0/servers/<int:id>", methods=['PATCH'])
#@requires_auth('patch:servers')
def servers_edit(id):
    """
    EDIT server with id.

    args:
        - int, id of server to edit
    expected request json:
        - {'name': str, 'notes': str, 'cluster_id': int, 'is_active': bool}
    returns:
        - response with json payload and http status code
    """

    server = Server.query.get(id)
    if server is None:
        abort(404, 'server with id %d not found' % id)

    try:
        data = request.json
        keys = ['name','notes','is_active','cluster_id']
        for key in keys:
            if key not in data:
                continue
            setattr(server, key, data[key])

        server.update()
        return jsonify({
            'success': True,
            'servers': [server.as_dict()]}), 200
    except Exception as x:
        abort(422, str(x))

@app.route("/api/v1.0/servers/<int:id>", methods=['DELETE'])
#@requires_auth('delete:servers')
def servers_delete(id):
    """
    DELETE server with id

    args:
        - int, id of server to delete
    returns:
        - response with json payload and http status code
    """

    try:
        server = Server.query.get(id)
        server.delete()
        return jsonify({
            'success': True,
            'delete': id}), 200
    except Exception as x:
        abort(404, str(x))

## --- error handlers --- ##
@app.errorhandler(422)
def e_unprocessable(error):
    return jsonify({
                    "success": False,
                    "error": 422,
                    "message": "unprocessable"
                    }), 422

@app.errorhandler(404)
def e_notfound(error):
    return jsonify({
                    "success": False,
                    "error": 404,
                    "message": "not found"
                    }), 404

@app.errorhandler(AuthError)
def handle_auth_err(err):
    """
    AuthError handler.

    args:
        - error
    returns:
        - error response with json payload
    """

    return jsonify({
        "success": False,
        "error": err.status_code,
        "message": err.error}), err.status_code

if __name__ == '__main__':
    app.run()
