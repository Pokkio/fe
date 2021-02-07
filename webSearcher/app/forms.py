# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField,  SubmitField, PasswordField
from wtforms.validators import DataRequired, Length, Regexp, EqualTo


class LoginForm(FlaskForm):
    '''
    登录表单
    '''
    username = StringField('', validators=[DataRequired()], render_kw={'placeholder': 'username'})
    password = PasswordField('', validators=[DataRequired()], render_kw={'placeholder': 'password'})
    submit = SubmitField('登录')


class RegisterForm(FlaskForm):
    '''
    注册表单
    '''
    username = StringField('', validators=[DataRequired(), Length(1, 32), Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0, '账户以字母开头')], render_kw={'placeholder': 'username'})
    password = PasswordField('', validators=[DataRequired(), Length(8, 12, '密码个数在8到12之间'), EqualTo('password2', message='password must match.')], render_kw={'placeholder': 'password'})
    password2 = PasswordField('', validators=[DataRequired()], render_kw={'placeholder': 'confirm your password'})
    submit = SubmitField('注册')