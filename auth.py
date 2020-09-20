"""
Part of the Capstone-Monitor project for Udacity FSND final project.
Used for authentication and validation of permission claims from JWT.
"""

import os
import json
from flask import request, _request_ctx_stack
from functools import wraps
from jose import jwt
from urllib.request import urlopen
import ssl

AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN')
API_AUDIENCE = os.getenv('AUTH0_API_AUDIENCE')
ALGORITHMS = ['RS256']


class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def get_token_auth_header():
    """
    Extract token from the request headers
    args:
        - none
    returns:
        - str(token), raises AuthError if validation does not pass
    """

    if not hasattr(request, 'headers') or \
            'Authorization' not in request.headers:
        raise AuthError("Missing auth header", 401)

    atoms = request.headers['Authorization'].split()
    if atoms[0].lower() != 'bearer':
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header invalid'
        }, 401)
    elif len(atoms) == 1:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Token not found.'
        }, 401)

    return atoms[1]


def check_permissions(permission, payload):
    """
    Check JWT for needed permissions.
    args:
        - str (permission required, like get:drinks)
        - str (payload)
    returns:
        True if success, otherwise raises AuthError exception.
    """

    if 'permissions' not in payload:
        raise AuthError({
            'code': 'invalid_claims',
            'description': 'Permissions not included in JWT.',
            'permission': permission,
            'payload': payload
        }, 400)

    if permission not in payload['permissions']:
        raise AuthError({
            'code': 'unauthorized',
            'description': 'Permission not found.'
        }, 401)

    return True


def verify_decode_jwt(token):
    """
    Verify token.
    args:
        - str (token)
    returns:
        - str (decoded payload)
    """

    jsonurl = urlopen(f'https://{AUTH0_DOMAIN}/.well-known/jwks.json',
                      context=ssl._create_unverified_context())
    jwks = json.loads(jsonurl.read())
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    if 'kid' not in unverified_header:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization malformed.'
        }, 401)

    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']}

    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer='https://' + AUTH0_DOMAIN + '/'
            )

            return payload

        except jwt.ExpiredSignatureError:
            raise AuthError({
                'code': 'token_expired',
                'description': 'Token expired.'}, 401)

        except jwt.JWTClaimsError:
            raise AuthError({
                'code': 'invalid_claims',
                'description': 'Bad claim. check audience and issuer.'}, 401)
        except Exception:
            raise AuthError({
                'code': 'invalid_header',
                'description': 'Unable to parse authentication token.'}, 400)

    raise AuthError({
        'code': 'invalid_header',
                'description': 'Unable to find the appropriate key.'}, 400)


def requires_auth(permission=''):
    """
    Decorator for @requires_auth(permission) decorator method
    input:
        - str (permission, like get:servers)
    returns:
        decoded payload
    """

    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token_auth_header()
            payload = verify_decode_jwt(token)
            check_permissions(permission, payload)
            return f(*args, **kwargs)

        return wrapper

    return requires_auth_decorator
