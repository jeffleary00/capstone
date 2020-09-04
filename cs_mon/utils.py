import random
import datetime

def random_health_state():
    """
    Return a random, weighted health state of any device. For demo only.
    In the real world, the health of any device would be the last received
    health status.

    args:
        - none
    returns:
        - list [health int, health name]
    """

    choices = [[0, 'ok'], [1, 'minor'], [2, 'major']]
    weights = [0.7, 0.2, 0.1]
    health = random.choices(population=choices, weights=weights, k=1)
    return health[0]

def get_server_health(data):
    """
    Get a server objects health status.
    args:
        - dict repr of a Server object.
    returns:
        Health List, or None.
    raises ValueError, KeyError
    """

    # validation
    required = ['id', 'health', 'updated']
    if type(data) is not dict:
        raise ValueError("Excpecting a dict.")
    for r in required:
        if r not in data:
            raise KeyError("Key %s required" % r)

    # demo only. in the real world, this should get info from the actual device.
    now = datetime.datetime.utcnow()
    stale_seconds = 60
    if 'updated' not in data or data['updated'] is None or \
        (now - data['updated']).seconds > stale_seconds:
        return random_health_state()
    else:
        return None
