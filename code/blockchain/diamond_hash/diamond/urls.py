
from rest_framework.routers import DefaultRouter
from django.conf.urls import url
from . import views

router = DefaultRouter()

urlpatterns = router.urls

urlpatterns += [
	url(r'^get_diamond_hash/$', views.get_diamond_hash, name='get_diamond_hash'),    

]
