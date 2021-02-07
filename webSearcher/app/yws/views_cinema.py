from app.yws import yws
from flask import render_template


@yws.route('/cinema', methods=['GET'])
def cinema():
    return render_template('cinema.html')