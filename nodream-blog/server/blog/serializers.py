# -*- coding: utf-8 -*-
from .models import Article, Tag, Category, Photos
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, RelatedField, StringRelatedField


class CategoryRelatedField(RelatedField):
    """处理分类1对多序列化字段显示"""
    def to_representation(self, value):
        return value.name


class PostSerializer(ModelSerializer):

    tags = StringRelatedField(many=True)
    category = CategoryRelatedField(read_only=True)

    class Meta:
        model = Article
        fields = ('url', 'id', 'title', 'excerpt', 'category',
                  'tags', 'img', 'body', 'user', 'views', 'tui',
                  'created_time', 'modified_time')


class TagSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Tag
        fields = ('url', 'id', 'name')


class CateSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Category
        fields = ('url', 'id', 'name', 'index')


class PhotosSerializer(ModelSerializer):

    class Meta:
        model = Photos
        fields = ('imgurl', 'id', 'desc', 'created_time')
