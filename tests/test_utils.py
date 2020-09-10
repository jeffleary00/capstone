#!/usr/bin/env python3

import unittest
import datetime
from cs_mon.utils import random_health_state, get_server_health

class TestUtils(unittest.TestCase):
    """ Test Utility Functions """

    def test_random_health(self):
        """Test our random health returns expected results"""

        health = random_health_state()
        assert health is not None
        assert health[0] in [0, 1, 2]
        assert health[1] in ['ok', 'minor', 'major']

    def test_multiple_randoms(self):
        """Run many random checks, ensure we get a variety"""

        results = []
        for n in range(0,100):
            health = random_health_state()
            if health not in results:
                results.append(health)
        assert len(results) == 3

    def test_recent_server_health(self):
        """Ensure current health does not create new value"""

        results = []
        now = datetime.datetime.utcnow()
        data = {'id': 1, 'health': [1,'minor'], 'updated': now}
        for n in range(0,100):
            health = get_server_health(data)
            if health is not None and health not in results:
                results.append(health)

        assert len(results) == 0

    def test_stale_server_health(self):
        """Ensure stale health does create new values"""

        results = []
        now = datetime.datetime.utcnow()
        then = now - datetime.timedelta(minutes=10)
        data = {'id': 1, 'health': [0,'ok'], 'updated': then}
        for n in range(0,100):
            health = get_server_health(data)
            if health not in results:
                results.append(health)

        assert len(results) > 1

if __name__ == '__main__':
    unittest.main()
