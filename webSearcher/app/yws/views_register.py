from flask import render_template, request, url_for, flash, redirect
from app.forms import RegisterForm
from app.models import db, User
from app.yws import yws


@yws.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST':
        if db.session.query(User).filter(User.username == form.username.data).scalar():
            flash('用户名已存在！')
            form.username.data = ''
            return render_template('register.html', form=form)
        user = [{'username': form.username.data,
                'password': form.password.data}]
        db.session.bulk_insert_mappings(User, user)
        db.session.commit()
        flash('You can login now.')
        form.username.data = ''
        return redirect(url_for('login'))
    form.username.data = ''
    return render_template('register.html', form=form)