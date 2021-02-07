from flask import render_template, request, url_for, redirect
from app.forms import LoginForm
from app.models import db, User
from app.yws import yws


@yws.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST':
        if db.session.query(User).filter(User.username == form.username.data,
                                         User.password == form.password.data).scalar():
            return redirect(url_for('index'))
    return render_template('login.html', form=form)