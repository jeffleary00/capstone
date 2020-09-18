import os
import json
import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (Column, Integer, String, Text, DateTime, Boolean,
    ForeignKey, func)
from sqlalchemy.orm import relationship
from utils import get_server_health

database_url = os.getenv('DATABASE_URL', 'sqlite:///')
db = SQLAlchemy()

def setup_db(app, url=database_url):
    """Initialize SQLAlchemy database engine."""

    app.config["SQLALCHEMY_DATABASE_URI"] = url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()

class Cluster(db.Model):
    """A Cluster is for storing a collection of servers. Like a datacenter."""

    __tablename__ = 'clusters'

    id = Column(Integer, primary_key=True)
    name = Column(String(48), unique=True, nullable=False)
    notes = Column(Text, nullable=True)
    created = Column(DateTime, default=func.now())

    # relationships
    servers = relationship('Server',
        backref='cluster',
        lazy=True, cascade='all,delete')

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def as_dict(self):
        results = {
            'id': self.id,
            'name': self.name,
            'notes': self.notes,
            'health': (0, 'ok'),
            'servers': []}

        for s in self.servers:
            data = s.as_dict(True)
            results['servers'].append(data)
            if s.is_active:
                # cascade health from active servers only
                if data['health'][0] > results['health'][0]:
                    results['health'] = data['health']

        return results

class Server(db.Model):
    """Server Hardware Object"""

    __tablename__ = 'servers'

    id = Column(Integer, primary_key=True)
    name = Column(String(48), unique=True, nullable=False)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    health = Column(String(24), nullable=False, default=json.dumps([0,'ok']))
    updated = Column(DateTime)
    created = Column(DateTime, default=func.now())

    # relationships
    cluster_id = Column(Integer, ForeignKey('clusters.id'))

    def insert(self):
        """Add self to db."""

        db.session.add(self)
        db.session.commit()

    def update(self):
        """Update self in db."""

        db.session.commit()

    def delete(self):
        """Delete self from db."""

        db.session.delete(self)
        db.session.commit()

    def as_dict(self, update=False):
        """
        Get dict representation of the object.
        args:
            - bool, force update of health status?
        returns:
            - dict
        """

        if update:
            self.update_health()

        return {
            'id': self.id,
            'cluster_id': self.cluster_id,
            'name': self.name,
            'notes': self.notes,
            'is_active': self.is_active,
            'health': json.loads(self.health),
            'updated': self.updated,
            'created': self.created}

    def update_health(self):
        """Get latest health and update self."""

        health = get_server_health(self.as_dict())
        if health is not None:
            self.health = json.dumps(health)
            self.updated = datetime.datetime.utcnow()
            db.session.commit()
        return
