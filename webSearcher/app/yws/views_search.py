from app.yws import yws
from flask import request, render_template
from app.spiders import FilmSpider


@yws.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'GET':
        name = request.args['fn']
        res_list = FilmSpider(name).get()
    return render_template('content.html', res_list=res_list, name=name)