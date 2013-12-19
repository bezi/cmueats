# Create your views here.
from scheduler import *

from django.http import HttpResponse
from django.shortcuts import render_to_response

from time import strftime

from random import choice

def about(request):
  return render_to_response('about.html', {'nav': "about"})

def contact(request):
  return render_to_response('contact.html', {'nav': "contact"})

def what(request):
  return render_to_response('what.html', {'nav': "what"})

def map(request):
  return render_to_response('map.html', {'nav' : "map"})

def home(request):
    data = getSchedule()
    openData = [];
    closedData = [];
    for x in data:
        r_time = "error"
        l_time = strftime("%A",localtime());
        if l_time == "Monday":
            r_time = x["times"].get("M")
        if l_time == "Tuesday":
            r_time = x["times"].get("T")
        if l_time == "Wednesday":
            r_time = x["times"].get("W")
        if l_time == "Thursday":
            r_time = x["times"].get("R")
        if l_time == "Friday":
            r_time = x["times"].get("F")
        if l_time == "Saturday":
            r_time = x["times"].get("S")
        if l_time == "Sunday":
            r_time = x["times"].get("U")
            
        l_time = strftime("%H%M")
        x["isOpen"] = isOpen(r_time, l_time)
        x["infoString"] = timeInfoString(r_time, l_time, x)

    for x in data:
        if x["isOpen"]:
            openData.append(x)
        else:
            closedData.append(x)

    if not openData:
        return render_to_response('index.html',
            { 
                'nav': "home", 
                'openLoc' : openData,
                'closedLoc': closedData, 
                'bestPick': False
            })

    return render_to_response('index.html',
            {
                'nav': "home", 
                'openLoc' : openData,
                'closedLoc': closedData, 
                'bestPick': choice(openData)
            })
