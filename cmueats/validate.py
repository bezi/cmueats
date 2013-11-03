from schedule_data import schedule_data
from scheduler import getTime

def validate_entry(i):
    # i is an entry for a location
    # check that every entry has all days
    if "M" not in i["times"]:
        return False
    if "T" not in i["times"]:
        return False
    if "W" not in i["times"]:
        return False
    if "R" not in i["times"]:
        return False
    if "F" not in i["times"]:
        return False
    if "S" not in i["times"]:
        return False
    if "U" not in i["times"]:
        return False

    for x in i["times"]:
        # val is the times for a day
        val = i["times"].get(x)

        # doesn't open today
        if val == "":
            return True
        
        # to deal with multiple times per day
        times = val.split(":")
               
        for time in times:
            if len(time) != 9:
                return False
            hours = time.split("-");
    return True    

if __name__ == "__main__":
    print "Validating schedule_data.py. . ."
    for i in schedule_data:
        if not validate_entry(i):
            print "Error, incorrectly formatted field {}.".format(i["name"]); 
    print "Completed!"
