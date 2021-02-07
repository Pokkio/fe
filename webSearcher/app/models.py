from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from app import create_app


apps = create_app()
db = SQLAlchemy(apps)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(128))
    password = db.Column(db.String(128))

    @property
    def password(self):
        raise AttributeError('password is not readable a attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User %r>' % self.username