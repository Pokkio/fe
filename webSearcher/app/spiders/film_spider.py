# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlencode
import os
import random
from concurrent.futures.process import ProcessPoolExecutor


class FilmSpider:
    '''
    采集电影链接
    '''

    def __init__(self, name):
        self.name = name

    def get_useragent(self):
        useragent = ['Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
                     'Mozilla/5.0 (compatible; Baiduspider/2.0; - +http://www.baidu.com/search/spider.html)',
                     'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
                     'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                     'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
                     'Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; M9 Build/IML74K)']
        return {'User-Agent': random.choice(useragent)}

    def spider_yg(self, name_yg) -> dict:
        '''
        获取阳光电影链接
        :param name_yg: 电影参数
        :return:
        '''
        try:
            headers = self.get_useragent()
            encode_param = urlencode({'name': name_yg.encode('GBK')})[5:]
            url = f'http://s.ygdy8.com/plus/so.php?typeid=1&keyword={encode_param}'
            html = requests.get(url, headers=headers, timeout=2)
            encode_text = html.text.encode('iso-8859-1').decode('GB2312')
            soup = BeautifulSoup(encode_text, 'lxml')
            label_a_list = [label_a for label_a in soup.find_all('a')]
            partial_url = [label_a.get('href') for label_a in label_a_list if name_yg in label_a.text]
            if os.path.join('https://www.ygdy8.com', partial_url[0]) if partial_url != [] else None:
                return {'阳光电影': {name_yg: 'https://www.ygdy8.com' + partial_url[0]}}
            return {'阳光电影': {name_yg: None}}
        except (BaseException, ConnectionError, TimeoutError) as e:
            return {'阳光电影': {name_yg: None}}

    def spider_4k(self, name_4k):
        '''
        获取4k电影链接
        :param name_4k:
        :return:
        '''
        try:
            headers = self.get_useragent()
            encode_param = urlencode({'name': name_4k})[5:]
            url = f'https://www.4kdy.net/index.php?c=search&wd={encode_param}'
            html = requests.get(url, headers=headers, timeout=1)
            soup = BeautifulSoup(html.text, 'lxml')
            if soup.select('li.activeclearfix'):
                href = soup.select('li.activeclearfix .title')[0].select('a')[0].get('href')
                res_url = 'https://www.4kdy.net' + href
                return {'4k电影': {name_4k: res_url}}
            return {'4k电影': {name_4k: None}}
        except (BaseException, ConnectionError, TimeoutError) as e:
            return {'4k电影': {name_4k: None}}

    def spider_aqy(self, name_aqy):
        '''
        获取爱奇艺电影链接
        :param name_aqy:
        :return:
        '''
        try:
            headers = self.get_useragent()
            encode_param = urlencode({'name': name_aqy})[5:]
            url = f'https://so.iqiyi.com/so/q_{encode_param}?source=input'
            html = requests.get(url, headers=headers, timeout=1)
            soup = BeautifulSoup(html.text, 'lxml')
            label_div = soup.select('ul.mod_result_list')[0].find_all('div', attrs={'class': 'bottom_left'})
            if label_div[0].select('a.info_play_btn')[0].get('href'):
                return {'爱奇艺电影': {name_aqy: label_div[0].select('a.info_play_btn')[0].get('href')}}
            return {'爱奇艺电影': {name_aqy: None}}
        except (BaseException, ConnectionError, TimeoutError) as e:
            return {'爱奇艺电影': {name_aqy: None}}

    def get(self):
        x, y, z = self.spider_yg(name_yg=self.name), self.spider_4k(name_4k=self.name), self.spider_aqy(name_aqy=self.name)
        return [x, y, z]


if __name__ == '__main__':
    pass
