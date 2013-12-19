import copy

schedule_data = [{"name" : "Asiana",
  "location":"Newell Simon Hall Atrium",
  "times":{"M":"1030-1930",
  "T":"1030-1930",
  "W":"1030-1930",
  "R":"1030-1930",
  "F":"1030-1930",
  "S":"1030-1930",
  "U":""
  },
  "tags":{}
  },
  { "name" : "Carnegie Mellon Cafe",
  "location":"Resnik House",
  "times":{"M": "0730-2400",
  "T": "0730-2400",
  "W": "0730-2400",
  "R": "0730-2400",
  "F": "0730-2400",
  "S": "1000-2400",
  "U": "1000-2400"
  },
  "tags":{}
  },
  {
  "name":"El Gallo de Oro",
  "location":"University Center 1st Floor",
  "times":{"M": "1030-2200",
  "T": "1030-2200",
  "W": "1030-2200",
  "R": "1030-2200",
  "F": "1030-2200",
  "S": "1030-2200",
  "U": "1030-2200"
  },
  "tags":{}
  },
  {
  "name":"Entropy",
  "location":"University Center 1st Floor",
  "times":{"M": "0000-0300:0730-2400",
  "T": "0000-0300:0730-2400",
  "W": "0000-0300:0730-2400",
  "R": "0000-0300:0730-2400",
  "F": "0000-0300:0730-2400",
  "S": "0000-0100:1000-2400",
  "U": "0000-0100:1000-2400"
  },
  "tags":{}
  },
  {
  "name" : "The Exchange",
  "location":"Posner Hall",
  "times":{"M": "0800-1900",
  "T": "0800-1900",
  "W": "0800-1900",
  "R": "0800-1900",
  "F": "0800-1700",
  "S": "",
  "U": ""
  },
  "tags":{},
  },
  {
  "name" : "Gingers Express",
  "location":"Baker Hall, Purnell Center of Arts",
  "times":{"M": "0800-1600",
  "T": "0800-1600",
  "W": "0800-1600",
  "R": "0800-1600",
  "F": "0800-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  { "name" : "Heinz Cafe",
  "location":"Heinz Institute",
  "times":{"M": "0830-1700",
  "T": "0830-1700",
  "W": "0830-1700",
  "R": "0830-1700",
  "F": "0830-1400",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {  "name" : "La Prima Espresso",
  "location":"Wean Hall 4th Floor",
  "times":{"M": "0800-1800",
  "T": "0800-1800",
  "W": "0800-1800",
  "R": "0800-1800",
  "F": "0800-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {  "name" : "Maggie Murph Cafe",
  "location":"Hunt Library",
  "times":{"M": "0000-2400",
  "T": "0000-2400",
  "W": "0000-2400",
  "R": "0000-2400",
  "F": "0000-2100",
  "S": "1000-1700",
  "U": "1200-2400"
  },
  "tags":{}
  },
  {
  "name" : "City Grill",
  "location":"University Center 2nd Floor",
  "times":{"M": "1100-1600",
  "T": "1100-1600",
  "W": "1100-1600",
  "R": "1100-1600",
  "F": "1100-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Evgefstos",
  "location":"University Center 2nd Floor",
  "times":{"M": "1100-1600",
  "T": "1100-1600",
  "W": "1100-1600",
  "R": "1100-1600",
  "F": "1100-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Pasta Villaggio",
  "location":"University Center 2nd Floor",
  "times":{"M": "1100-1600",
  "T": "1100-1600",
  "W": "1100-1600",
  "R": "1100-1600",
  "F": "1100-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Quik Piks",
  "location":"University Center 2nd Floor",
  "times":{"M": "1100-1600",
  "T": "1100-1600",
  "W": "1100-1600",
  "R": "1100-1600",
  "F": "1100-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Take Comfort Too",
  "location":"University Center 2nd Floor",
  "times":{"M": "1100-1600",
  "T": "1100-1600",
  "W": "1100-1600",
  "R": "1100-1600",
  "F": "1100-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Creperie",
  "location":"University Center 2nd Floor",
  "times":{"M": "1100-2000",
  "T": "1100-2000",
  "W": "1100-2000",
  "R": "1100-2000",
  "F": "1100-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Downtown Deli",
  "location":"University Center 2nd Floor",
  "times":{"M": "1100-2000",
  "T": "1100-2000",
  "W": "1100-2000",
  "R": "1100-2000",
  "F": "1100-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Spinning Salads",
  "location":"University Center 2nd Floor",
  "times":{"M": "1100-2000",
  "T": "1100-2000",
  "W": "1100-2000",
  "R": "1100-2000",
  "F": "1100-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Mitchell's Mainstreet",
  "location":"Newell Simon Hall",
  "times":{"M": "0800-1500",
  "T": "0800-1500",
  "W": "0800-1500",
  "R": "0800-1500",
  "F": "0800-1500",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "The Pomegranate",
  "location":"University Center",
  "times":{"M": "1100-2000",
  "T": "1100-2000",
  "W": "1100-2000",
  "R": "1100-2000",
  "F": "1100-1430",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Nakama Express",
  "location":"Resnik Servery",
  "times":{"M": "1100-1430:1700-2100",
  "T": "1100-1430:1700-2100",
  "W": "1100-1430:1700-2100",
  "R": "1100-1430:1700-2100",
  "F": "1100-1430:1700-2100",
  "S": "1700-2100",
  "U": "1700-2100"
  },
  "tags":{}
  },
  {
  "name" : "Soup & Salad",
  "location":"Resnik Servery",
  "times" : {"M": "1100-1430:1700-2100",
  "T": "1100-1430:1700-2100",
  "W": "1100-1430:1700-2100",
  "R": "1100-1430:1700-2100",
  "F": "1100-1430:1700-2100",
  "S": "1700-2100",
  "U": "1700-2100"
  },
  "tags":{}
  },
  {
  "name" : "Spice it Up Grill",
  "location":"Resnik Servery",
  "times" : {"M": "1100-1430:1700-2100",
  "T": "1100-1430:1700-2100",
  "W": "1100-1430:1700-2100",
  "R": "1100-1430:1700-2100",
  "F": "1100-1430:1700-2100",
  "S": "1700-2100",
  "U": "1700-2100"
  },
  "tags":{}
  },
  {
  "name" : "Stackers Fresh Subs",
  "location":"Resnik Servery",
  "times" : {"M": "1100-1430:1700-2100",
  "T": "1100-1430:1700-2100",
  "W": "1100-1430:1700-2100",
  "R": "1100-1430:1700-2100",
  "F": "1100-1430:1700-2100",
  "S": "1700-2100",
  "U": "1700-2100"
  },
  "tags":{}
  },
  {
  "name" : "Take Comfort",
  "location":"Resnik Servery",
  "times" : {"M": "1100-1430:1700-2100",
  "T": "1100-1430:1700-2100",
  "W": "1100-1430:1700-2100",
  "R": "1100-1430:1700-2100",
  "F": "1100-1430:1700-2100",
  "S": "1700-2100",
  "U": "1700-2100"
  },
  "tags":{}
  },
  {
  "name" : "Taste of India",
  "location":"Resnik Servery",
  "times" : {"M": "1100-1430:1700-2100",
  "T": "1100-1430:1700-2100",
  "W": "1100-1430:1700-2100",
  "R": "1100-1430:1700-2100",
  "F": "1100-1430:1700-2100",
  "S": "1700-2100",
  "U": "1700-2100",
  },
  "tags":{}
  },
  {"name" : "Schatz Dining Room",
  "location":"University Center 2nd Floor",
  "times" : {"M": "0730-1030:1130-1400:1700-2000",
  "T": "0730-1030:1130-1400:1700-2000",
  "W": "0730-1030:1130-1400:1700-2000",
  "R": "0730-1030:1130-1400:1700-2000",
  "F": "0730-1030:1130-1400",
  "S": "1030-1430",
  "U": "1030-1430"
  },
  "tags":{}
  },
  {
  "name" : "Seiber Cafe",
  "location":"Software Engineering Institute",
  "times" : {"M": "0730-1500",
  "T": "0730-1500",
  "W": "0730-1500",
  "R": "0730-1500",
  "F": "0730-1500",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  { "name" : "Skibo Cafe",
  "location":"University Center 2nd Floor",
  "times" : {"M": "0000-0200:0900-2400",
  "T": "0000-0200:0900-2400",
  "W": "0000-0200:0900-2400",
  "R": "0000-0200:0900-2400",
  "F": "0000-0200:0900-2400",
  "S": "0000-0200:0900-2400",
  "U": "0000-0200:0900-2400"
  },
  "tags":{}
  },
  { "name" : "Stephanie's",
  "location":"Mellon Institute",
  "times" : { "M": "0800-1400",
  "T": "0800-1400",
  "W": "0800-1400",
  "R": "0800-1400",
  "F": "0800-1400",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  { "name":"Tartans Pavilion",
  "location":"Tartans Pavilion",
  "times":{"M": "1100-2300",
  "T": "1100-2300",
  "W": "1100-2300",
  "R": "1100-2300",
  "F": "1100-2300",
  "S": "1700-2300",
  "U": "1700-2300"
  },
  "tags":{}
  },
  { "name" : "Worlds of Flavor",
  "location":"Tartans Pavilion",
  "times" : {"M": "1700-2100",
  "T": "1700-2100",
  "W": "1700-2100",
  "R": "1700-2100",
  "F": "",
  "S": "",
  "U": "1700-2100"
  },
  "tags":{}
  },
  { "name" : "Tazza D'Oro",
  "location":"Gates Hillman Center 3rd Floor",
  "times" : {"M": "0700-1900",
  "T": "0700-1900",
  "W": "0700-1900",
  "R": "0700-1900",
  "F": "0700-1900",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  { "name" : "The Underground",
  "location":"Morewood E-Tower",
  "times" : {"M": "0830-2300",
  "T": "0830-2300",
  "W": "0830-2300",
  "R": "0830-2300",
  "F": "0830-2300",
  "S": "1030-2300",
  "U": "1030-2300"
  },
  "tags":{}
  },
  { "name" : "The Zebra Lounge",
  "location":"College of Fine Arts",
  "times": {"M": "0800-1700",
  "T": "0800-1700",
  "W": "0800-1700",
  "R": "0800-1700",
  "F": "0800-1700",
  "S": "",
  "U":""
  },
  "tags":{}
  }
  ]

closedtimes = {"M": "",
  "T": "",
  "W": "",
  "R": "",
  "F": "",
  "S": "",
  "U": ""
  }

winter_break1 = [{"name" : "Asiana",
  "location":"Newell Simon Hall Atrium",
  "times":{"M":"",
  "T":"",
  "W":"",
  "R":"1030-1930",
  "F":"1030-1930",
  "S":"1030-1930",
  "U":""
  },
  "tags":{}
  },
  { "name" : "Carnegie Mellon Cafe",
  "location":"Resnik House",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name":"El Gallo de Oro",
  "location":"University Center 1st Floor",
  "times":{"M": "1030-2200",
  "T": "",
  "W": "",
  "R": "1100-1400",
  "F": "1100-1400",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name":"Entropy",
  "location":"University Center 1st Floor",
  "times":{"M": "",
  "T": "",
  "W": "",
  "R": "0800-1600",
  "F": "0800-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "The Exchange",
  "location":"Posner Hall",
  "times": closedtimes,
  "tags":{},
  },
  {
  "name" : "Gingers Express",
  "location":"Baker Hall, Purnell Center of Arts",
  "times": closedtimes,
  "tags":{}
  },
  { "name" : "Heinz Cafe",
  "location":"Heinz Institute",
  "times": closedtimes,
  "tags":{}
  },
  {  "name" : "La Prima Espresso",
  "location":"Wean Hall 4th Floor",
  "times":{"M": "",
  "T": "",
  "W": "",
  "R": "0800-1600",
  "F": "0800-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {  "name" : "Maggie Murph Cafe",
  "location":"Hunt Library",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "City Grill",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Evgefstos",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Pasta Villaggio",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Quik Piks",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Take Comfort Too",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Creperie",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Downtown Deli",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Spinning Salads",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Mitchell's Mainstreet",
  "location":"Newell Simon Hall",
  "times":{"M": "",
  "T": "",
  "W": "",
  "R": "0800-1400",
  "F": "0800-1400",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "The Pomegranate",
  "location":"University Center",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Nakama Express",
  "location":"Resnik Servery",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Soup & Salad",
  "location":"Resnik Servery",
  "times" : closedtimes,
  "tags":{}
  },
  {
  "name" : "Spice it Up Grill",
  "location":"Resnik Servery",
  "times" : closedtimes,
  "tags":{}
  },
  {
  "name" : "Stackers Fresh Subs",
  "location":"Resnik Servery",
  "times" : closedtimes,
  "tags":{}
  },
  {
  "name" : "Take Comfort",
  "location":"Resnik Servery",
  "times" : closedtimes,
  "tags":{}
  },
  {
  "name" : "Taste of India",
  "location": "University Center 2nd Floor",
  "times" : {"M": "",
  "T": "",
  "W": "",
  "R": "1100-1400",
  "F": "1100-1400",
  "S": "",
  "U": "",
  },
  "tags":{}
  },
  {"name" : "Schatz Dining Room",
  "location":"University Center 2nd Floor",
  "times" : {"M": "",
  "T": "",
  "W": "",
  "R": "1130-1400",
  "F": "1130-1400",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Seiber Cafe",
  "location":"Software Engineering Institute",
  "times" : {"M": "",
  "T": "",
  "W": "",
  "R": "0730-1500",
  "F": "0730-1300",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  { "name" : "Skibo Cafe",
  "location":"University Center 2nd Floor",
  "times" : closedtimes,
  "tags":{}
  },
  { "name" : "Stephanie's",
  "location":"Mellon Institute",
  "times" : closedtimes,
  "tags":{}
  },
  { "name":"Tartans Pavilion",
  "location":"Tartans Pavilion",
  "times": closedtimes,
  "tags":{}
  },
  { "name" : "Worlds of Flavor",
  "location":"Tartans Pavilion",
  "times" : closedtimes,
  "tags":{}
  },
  { "name" : "Tazza D'Oro",
  "location":"Gates Hillman Center 3rd Floor",
  "times" : {"M": "",
  "T": "",
  "W": "",
  "R": "0800-1700",
  "F": "0800-1700"
  },
  "tags":{}
  },
  { "name" : "The Underground",
  "location":"Morewood E-Tower",
  "times" : closedtimes,
  "tags":{}
  },
  { "name" : "The Zebra Lounge",
  "location":"College of Fine Arts",
  "times": closedtimes,
  "tags":{}
  }
  ]

allclosed = []
for x in schedule_data:
  newdata = x.copy()
  newdata["times"] = closedtimes
  allclosed.append(newdata)

winter_break2 = []
for x in winter_break1:
  data = x.copy()
  if data["name"] == "Taste of India":
    data["times"]["M"] = "1100-1400"
    data["location"] = "University Center 2nd Floor"
  elif data["name"] == "Seiber Cafe":
    data["times"]["F"] = "0730-1500"

  winter_break2.append(data)

winter_break3 = [{"name" : "Asiana",
  "location":"Newell Simon Hall Atrium",
  "times":{"M":"1030-1930",
  "T":"1030-1930",
  "W":"1030-1930",
  "R":"1030-1930",
  "F":"1030-1930",
  "S":"1030-1930",
  "U":""
  },
  "tags":{}
  },
  { "name" : "Carnegie Mellon Cafe",
  "location":"Resnik House",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name":"El Gallo de Oro",
  "location":"University Center 1st Floor",
  "times":{"M": "1100-1400",
  "T": "1100-1400",
  "W": "1100-1400",
  "R": "1100-1400",
  "F": "1100-1400",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name":"Entropy",
  "location":"University Center 1st Floor",
  "times":{"M": "0800-1600",
  "T": "0800-1600",
  "W": "0800-1600",
  "R": "0800-1600",
  "F": "0800-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "The Exchange",
  "location":"Posner Hall",
  "times": {"M": "",
  "T": "",
  "W": "",
  "R": "",
  "F": "0800-1400",
  "S": "",
  "U": ""
  },
  "tags":{},
  },
  {
  "name" : "Gingers Express",
  "location":"Baker Hall, Purnell Center of Arts",
  "times": closedtimes,
  "tags":{}
  },
  { "name" : "Heinz Cafe",
  "location":"Heinz Institute",
  "times": closedtimes,
  "tags":{}
  },
  {  "name" : "La Prima Espresso",
  "location":"Wean Hall 4th Floor",
  "times":{"M": "0800-1600",
  "T": "0800-1600",
  "W": "0800-1600",
  "R": "0800-1600",
  "F": "0800-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {  "name" : "Maggie Murph Cafe",
  "location":"Hunt Library",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "City Grill",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Evgefstos",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Pasta Villaggio",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Quik Piks",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Take Comfort Too",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Creperie",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Downtown Deli",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Spinning Salads",
  "location":"University Center 2nd Floor",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Mitchell's Mainstreet",
  "location":"Newell Simon Hall",
  "times":{"M": "0800-1400",
  "T": "0800-1400",
  "W": "0800-1400",
  "R": "0800-1400",
  "F": "0800-1400",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "The Pomegranate",
  "location":"University Center",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Nakama Express",
  "location":"Resnik Servery",
  "times": closedtimes,
  "tags":{}
  },
  {
  "name" : "Soup & Salad",
  "location":"Resnik Servery",
  "times" : closedtimes,
  "tags":{}
  },
  {
  "name" : "Spice it Up Grill",
  "location":"Resnik Servery",
  "times" : closedtimes,
  "tags":{}
  },
  {
  "name" : "Stackers Fresh Subs",
  "location":"Resnik Servery",
  "times" : closedtimes,
  "tags":{}
  },
  {
  "name" : "Take Comfort",
  "location":"Resnik Servery",
  "times" : closedtimes,
  "tags":{}
  },
  {
  "name" : "Taste of India",
  "location": "University Center 2nd Floor",
  "times" : {"M": "",
  "T": "",
  "W": "",
  "R": "1100-1400",
  "F": "1100-1400",
  "S": "",
  "U": "",
  },
  "tags":{}
  },
  {"name" : "Schatz Dining Room",
  "location":"University Center 2nd Floor",
  "times" : {"M": "1130-1400",
  "T": "1130-1400",
  "W": "1130-1400",
  "R": "1130-1400",
  "F": "1130-1400",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  {
  "name" : "Seiber Cafe",
  "location":"Software Engineering Institute",
  "times" : {"M": "0730-1500",
  "T": "0730-1500",
  "W": "0730-1500",
  "R": "0730-1500",
  "F": "0730-1500",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  { "name" : "Skibo Cafe",
  "location":"University Center 2nd Floor",
  "times" : {"M": "1000-1600",
  "T": "1000-1600",
  "W": "1000-1600",
  "R": "1000-1600",
  "F": "1000-1600",
  "S": "",
  "U": ""
  },
  "tags":{}
  },
  { "name" : "Stephanie's",
  "location":"Mellon Institute",
  "times" : closedtimes,
  "tags":{}
  },
  { "name":"Tartans Pavilion",
  "location":"Tartans Pavilion",
  "times": closedtimes,
  "tags":{}
  },
  { "name" : "Worlds of Flavor",
  "location":"Tartans Pavilion",
  "times" : closedtimes,
  "tags":{}
  },
  { "name" : "Tazza D'Oro",
  "location":"Gates Hillman Center 3rd Floor",
  "times" : {"M": "0800-1700",
  "T": "0800-1700",
  "W": "0800-1700",
  "R": "0800-1700",
  "F": "0800-1700"
  },
  "tags":{}
  },
  { "name" : "The Underground",
  "location":"Morewood E-Tower",
  "times" : closedtimes,
  "tags":{}
  },
  { "name" : "The Zebra Lounge",
  "location":"College of Fine Arts",
  "times": closedtimes,
  "tags":{}
  }
  ]

schedules = {"default" : schedule_data,
  "20131219-20131221" : winter_break1,
  "20131222-20131229" : allclosed,
  "20131230-20140105" : winter_break2,
  "20140106-20140111" : winter_break3 
  }
