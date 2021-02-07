"""
    @Desc: URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
# 导入静态文件模块
from rest_framework.routers import DefaultRouter
from blog.views import PostViewSet, TagViewSet, CategoryViewSet, PhotosViewSet


router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'tags', TagViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'photos', PhotosViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('mdeditor/', include('mdeditor.urls')),  # 添加mdeditor的URL
    path('', include(router.urls))
]
