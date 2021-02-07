"""
WSGI config for myblog project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myblog.settings')

if os.environ.get('DEV') is True:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.dev")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")

application = get_wsgi_application()
