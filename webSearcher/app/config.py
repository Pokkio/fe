# 配置文件
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = 'pA$$w0rD..'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_COMMIT_TEARDOWN = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')