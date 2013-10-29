# File responsible for functions to assist rendering main page

import string
from types import NoneType
from time import strftime, localtime

def getHours(string):
    return string[:2]

def getMins(string):
    return string[2:]

def getTime(string):
    mins = getMins(string)
    hours = getHours(string)
    ampm = "AM"

    if int(hours) == 12 and int(mins) == 0:
        return "noon"
    if int(hours) == 0 and int(mins) == 0:
        return "midnight"
    if int(hours) == 24 and int(mins) == 0:
        return "midnight"

    if int(hours) > 12:
        hours = str(int(hours) - 12)
        ampm = "PM"
    return hours + ":" + mins + ampm

def inHowLong(time_i, time_f):
    infoString = "Error parsing."

    return infoString

def tomorrow(time):
    if time == "Monday" or time == "M":
        return "T"
    if time == "Tuesday" or time == "T":
        return "W"
    if time == "Wednesday" or time == "W":
        return "R"
    if time == "Thursday" or time == "R":
        return "F"
    if time == "Friday" or time == "F":
        return "S"
    if time == "Saturday" or time == "S":
        return "U"
    if time == "Sunday" or time == "U":
        return "M"
    return "Error!  Invalid time {}".format(time)

def isOpen(r_time, l_time): 
    if r_time != "":
        times = string.split(r_time,":")
        for x in times: 
            time = string.split(x,"-")
            if int(time[0]) <= int(l_time) and int(l_time) <= int(time[1]):
                return True
    return False

def timeInfoString(r_time, l_time, restaurant):
    infoString = "Error."
    if isOpen(r_time, l_time):
        times = string.split(r_time, ":")
        for x in times:
            time = string.split(x, '-')
            if int(time[0]) <= int(l_time) and int(l_time) <= int(time[1]):
                tempTime = getTime(time[1])
                # Check it it's open until tomorrow morning
                if tempTime == "midnight":
                    new_r_time = x["times"].get(tomorrow(strftime("%A", localtime()))
                    if string.split(new_r_time, "-")[0] == "0000":
                        return "Closes tomorrow at " + getTime(new_r_time.split("-")[1]) + "."
                return "Closes at " + tempTime + "."
    else:
        infoString = "Shit, it's closed :("
    return infoString
