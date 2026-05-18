"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

from django.urls import path
from .consumers import TaskConsumer

websocket_urlpatterns = [
    path("ws/tasks/", TaskConsumer.as_asgi()),
]