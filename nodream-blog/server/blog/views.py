# -*- coding: utf-8 -*-
from rest_framework import viewsets, mixins
from .models import Article, Tag, Category, Photos
from .serializers import PostSerializer, TagSerializer, CateSerializer, PhotosSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    处理 /api/posts/<pk>/ GET
    """
    queryset = Article.objects.all()
    serializer_class = PostSerializer


class TagViewSet(viewsets.ModelViewSet):
    """
    处理 /api/tags/ GET  /api/tags/<pk>/ GET
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    处理 /api/categories/ GET
    """
    queryset = Category.objects.all()
    serializer_class = CateSerializer


class PhotosViewSet(viewsets.ModelViewSet):
    """
    处理 /api/categories/ GET
    """
    queryset = Photos.objects.all()
    serializer_class = PhotosSerializer