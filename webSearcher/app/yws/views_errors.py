from app.yws import yws
from flask import redirect, render_template, url_for


@yws.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('index'))


@yws.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500