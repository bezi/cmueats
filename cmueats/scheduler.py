# File responsible for functions to assist rendering main page

import string
from types import NoneType
from time import strftime, localtime

def getTime(string):
    mins = string[2:]
    hours = string[:2]
    return hours + " hours and " + mins + " minutes."

def opensIn(r_time):
  l_time = strftime("%H%M")

  if r_time != "" and type(r_time) != NoneType:
    times = string.split(r_time,":")
    for x in times: 
      time = string.split(x,"-")
      if int(l_time) <= int(time[0]):
        return getTime(str(int(time[0]) - int(l_time)))

def isOpen(r_time): 
  l_time = strftime("%H%M")
  if r_time != "":
    times = string.split(r_time,":")
    for x in times: 
      time = string.split(x,"-")
      if int(time[0]) <= int(l_time) and int(l_time) <= int(time[1]):
        return True
  return False
