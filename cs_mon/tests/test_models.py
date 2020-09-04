#!/usr/bin/env python3

import os
import unittest
import datetime
import json
from cs_mon.app import app
from cs_mon.models import db, setup_db, Cluster, Server

class TestClusterModels(unittest.TestCase):
    """ Test Model Definitions and db functions """

    def setUp(self):
        setup_db(app, "sqlite:///")

    def tearDown(self):
        db.session.close()

    def test_normal(self):
        """should insert object with no errors"""

        opts = {'name': 'test cluster', 'notes': 'ignore this'}
        c = Cluster(**opts)
        c.insert()
        assert c.id is not None

    @unittest.expectedFailure
    def test_abnormal(self):
        """missing name should cause exception"""

        opts = {'name': None, 'notes': 'this should not succeed'}
        c = Cluster(**opts)
        c.insert()

    def test_edit(self):
        """ensure obj updates are ok"""

        opts = {'name': 'test cluster 2', 'notes': 'ignore this'}
        c = Cluster(**opts)
        c.insert()
        c.name = "changed name"
        c.update()
        self.assertEqual(c.name, "changed name")

    def test_delete(self):
        """ensure obj gets deleted ok"""
        
        opts = {'name': 'ghost', 'notes': 'ignore this'}
        c = Cluster(**opts)
        c.insert()
        assert c.id is not None
        c.delete()
        results = Cluster.query.filter(Cluster.name == 'ghost').first()
        assert results is None


class TestServerModels(unittest.TestCase):
    """ Test Model Definitions and db functions """

    def setUp(self):
        setup_db(app, "sqlite:///")

    def tearDown(self):
        db.session.close()

    def test_normal(self):
        """should insert object with no errors"""

        opts = {'name': 'server 1', 'notes': 'normal server'}
        s = Server(**opts)
        s.insert()
        assert s.id is not None
        assert s.is_active is True
        assert s.updated is None
        self.assertEqual(json.loads(s.health), [0,'ok'])

    @unittest.expectedFailure
    def test_abnormal(self):
        """missing name should cause exception"""

        opts = {'name': None, 'notes': 'this should not succeed'}
        s = Server(**opts)
        s.insert()

    def test_active(self):
        """ensure active setting is accutate"""

        opts = {'name': 'server 2', 'notes': 'normal', 'is_active': False}
        s = Server(**opts)
        s.insert()
        assert s.is_active is False

    def test_health(self):
        """ensure health setting is accutate"""

        opts = {
            'name': 'server 3',
            'notes': 'normal',
            'is_active': True,
            'health': json.dumps((2, 'major'))}

        s = Server(**opts)
        s.insert()
        self.assertEqual(json.loads(s.health), [2,'major'])

    def test_edit(self):
        """ensure attribute change updates correctly"""

        opts = {'name': 'server 3', 'notes': 'normal server'}
        s = Server(**opts)
        s.insert()
        s.name = "changed"
        s.update()
        self.assertEqual(s.name, "changed")

    def test_delete(self):
        """ensure obj delete is ok"""

        opts = {'name': 'ghost', 'notes': 'normal server'}
        s = Server(**opts)
        s.insert()
        s.delete()
        results = Server.query.filter(Server.name == 'ghost').first()
        assert results is None

if __name__ == '__main__':
    unittest.main()
