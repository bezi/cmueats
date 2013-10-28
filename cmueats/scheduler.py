# File responsible for functions to assist rendering main page

import string
from time import localtime,strftime
from types import NoneType
from random import choice

def getTime(string):
    mins = string[-2:]
    if len(string) == 4:
        hours = string[:3]
    else:
        hours = string[:2]
    return hours + " hours and " + mins + " minutes"

def closesIn(loc):
  r_time = "error"
  l_time = strftime("%A",localtime());
  if l_time == "Monday":
    r_time = loc["times"].get("M")
  if l_time == "Tuesday":
    r_time = loc["times"].get("T")
  if l_time == "Wednesday":
    r_time = loc["times"].get("W")
  if l_time == "Thursday":
    r_time = loc["times"].get("R")
  if l_time == "Friday":
    r_time = loc["times"].get("F")
  if l_time == "Saturday":
    r_time = loc["times"].get("S")
  if l_time == "Sunday":
    r_time = loc["times"].get("U")

  l_time = strftime("%H%M")
  if r_time != "" and type(r_time) != NoneType:
    times = string.split(r_time,":")
    for x in times: 
        time = string.split(x,"-")
        return getTime(str(int(time[1]) - int(l_time))) 

  return False

def opensIn(loc):
  r_time = "error"
  l_time = strftime("%A",localtime());
  if l_time == "Monday":
    r_time = loc["times"].get("M")
  if l_time == "Tuesday":
    r_time = loc["times"].get("T")
  if l_time == "Wednesday":
    r_time = loc["times"].get("W")
  if l_time == "Thursday":
    r_time = loc["times"].get("R")
  if l_time == "Friday":
    r_time = loc["times"].get("F")
  if l_time == "Saturday":
    r_time = loc["times"].get("S")
  if l_time == "Sunday":
    r_time = loc["times"].get("U")

  l_time = strftime("%H%M")
  if r_time != "" and type(r_time) != NoneType:
    times = string.split(r_time,":")
    for x in times: 
      time = string.split(x,"-")
      if int(l_time) <= int(time[0]):
        return getTime(str(int(time[0]) - int(l_time)))
  else:
    return False 
    

  return False


def isOpen(loc): 
  r_time = "error"
  l_time = strftime("%A",localtime());
  if l_time == "Monday":
    r_time = loc["times"].get("M")
  if l_time == "Tuesday":
    r_time = loc["times"].get("T")
  if l_time == "Wednesday":
    r_time = loc["times"].get("W")
  if l_time == "Thursday":
    r_time = loc["times"].get("R")
  if l_time == "Friday":
    r_time = loc["times"].get("F")
  if l_time == "Saturday":
    r_time = loc["times"].get("S")
  if l_time == "Sunday":
    r_time = loc["times"].get("U")

  l_time = strftime("%H%M")
  if r_time != "" and type(r_time) != NoneType:
    times = string.split(r_time,":")
    for x in times: 
      time = string.split(x,"-")
      if int(time[0]) <= int(l_time) and int(l_time) <= int(time[1]):
        return True
  return False
