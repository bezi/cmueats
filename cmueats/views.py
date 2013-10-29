# Create your views here.
from schedule_data import schedule_data
from scheduler import *

from django.http import HttpResponse
from django.shortcuts import render_to_response

from time import strftime

from random import choice

def about(request):
  return render_to_response('about.html')

def contact(request):
  return render_to_response('contact.html')

def what(request):
  return render_to_response('what.html')


def home(request):
    data = schedule_data 
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
        return render_to_response('index.html',{'openLoc' : openData,'closedLoc': closedData, 'bestPick': False})
    
    return render_to_response('index.html',{'openLoc' : openData,'closedLoc': closedData, 'bestPick': choice(openData)})
