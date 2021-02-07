from setuptools import find_packages, setup

setup(
    name='CLay.FilmSearchWerSite',
    version='1.0.2',
    description='学习web开发的鸡肋电影搜索网站',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'requests'
    ],
    author='CLay',
    author_email='clay0510@163.com',
    maintainer='CLay'
)