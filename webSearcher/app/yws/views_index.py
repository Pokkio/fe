from app.yws import yws
from flask import render_template


@yws.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')