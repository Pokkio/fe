# 创建蓝图
import os

from flask.blueprints import Blueprint

base_path = os.path.dirname(os.path.dirname(__file__))  # 获取app包路径

yws = Blueprint('yws', __name__,
                static_folder=os.path.join(base_path, 'static'),
                template_folder=os.path.join(base_path, 'templates'))

import app.yws.views_index
import app.yws.views_cinema
import app.yws.views_errors
import app.yws.views_search