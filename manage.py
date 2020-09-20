"""
Part of the Capstone-Monitor project for Udacity FSND final project.
Used for database migrations.
"""

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from app import app
from models import db, setup_db, Cluster, Server

manager = Manager(app)
setup_db(app)

migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
