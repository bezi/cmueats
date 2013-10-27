from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'cmueats.views.home', name='home'),
    url(r'^home/$', 'cmueats.views.home', name='home'), 
    url(r'^about/$', 'cmueats.views.about', name='about'),
    url(r'^contact/$', 'cmueats.views.contact', name='contact'),
    url(r'^what/$', 'cmueats.views.what', name='what'),
)
