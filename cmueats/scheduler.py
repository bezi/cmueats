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
    if int(mins) == 0:
        return hours.lstrip('0') + ampm
    return hours.lstrip('0') + ":" + mins + ampm

def inHowLong(time_i, time_f):
    infoString = "Error parsing."

    return infoString

def today(time):
    if time == "M":
        return "Monday"
    if time == "T":
        return "Tuesday"
    if time == "W":
        return "Wednesday"
    if time == "R":
        return "Thursday"
    if time == "F":
        return "Friday"
    if time == "S":
        return "Saturday"
    if time == "U":
        return "Sunday"
    return "Error!  Invalid time {}".format(time)
    

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
        times = r_time.split(":")
        for x in times: 
            time = x.split("-")
            if int(time[0]) <= int(l_time) and int(l_time) <= int(time[1]):
                return True
    return False

def timeInfoString(r_time, l_time, restaurant):
    times = r_time.split(":")
    if isOpen(r_time, l_time):
        for x in times:
            time = x.split('-')
            if int(time[0]) <= int(l_time) and int(l_time) <= int(time[1]):
                tempTime = getTime(time[1])
                # Check it it's open until tomorrow morning
                if tempTime == "midnight":
                    day = tomorrow(strftime("%A", localtime()))
                    new_r_time = restaurant["times"].get(day)
                    new_r_times = new_r_time.split("-")
                    if new_r_times[0] == "0000":
                        if new_r_times[1] != "2400":
                            return "Closes tomorrow at " + getTime(new_r_times[1]) + "."
                        while new_r_times[1] == "2400":
                            day = tomorrow(day)
                            new_r_time = restaurant["times"].get(day)
                            new_r_times = new_r_time.split("-")
                        return "Closes on " + today(day) + " at " + getTime(new_r_times[1]) + "."
                return "Closes at " + tempTime + "."
    else:
        times = r_time.split(":")
        done_for_day = True;
        for x in times:
            time = x.split("-")
            if int(time[0]) > int(l_time):
                done_for_day = False

        if done_for_day:
            day = tomorrow(strftime("%A", localtime()))
            r_time = restaurant["times"].get(day)
            if r_time != "":
                return "Closed until tomorrow at " + getTime(rtime.split("-")[0]) + "."
            while r_time == "":
                day = tomorrow(strftime("%A", localtime()))
                r_time = restaurant["times"].get(day)
            return "Closed until " + today(day) + " at " + getTime(rtime.split("-")[0]) + "."
        else:
            return "Opens at " + getTime(times[0].split("-")[0]) + "."
    return "Error."
