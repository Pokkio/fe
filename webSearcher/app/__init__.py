# -*- coding: utf-8 -*-
from flask import Flask
from app.yws import yws
from flask_bootstrap import Bootstrap
from app.config import Config


def create_app():
    app = Flask(__name__)
    app.register_blueprint(yws)
    app.config.from_object(Config)
    Bootstrap().init_app(app)
    return app