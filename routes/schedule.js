// Schedule logic
var moment = require('moment');

// Returns the opening and closing times for the date
function getTimes(storeInfo, date){
	result = "-1"

	Object.keys(storeInfo.schedules).forEach(function (key){
		if (key === "default") return;

		dates = key.split('-');
		start = moment(dates[0], "YYYYMMDD");
		end = moment(dates[1], "YYYYMMDD");

		if (date.isSame(start, "day") || (date.isAfter(start, "day") && date.isBefore(end, "day")) 
			|| date.isSame(end, "day")) {

			result = storeInfo.schedules[key][date.isoWeekday().toString()]
			return
		}
	});

	if (result = "-1") return storeInfo.schedules["default"][date.isoWeekday().toString()]
	return result
}

// Determines whether the passed store is open or not
function isOpen(storeInfo){
	now = moment();
	var todaysTimes = getTimes(storeInfo, now).split(':');

	if (todaysTimes === "") return false

	var result = false

	todaysTimes.forEach(function(time){
		if (time === "") return
		var times = time.split('-');
		var opening = moment(times[0],"HHmm");
		var closing = moment(times[1],"HHmm");

		if (now.isAfter(opening) && now.isBefore(closing))
			result = true

	});

	return result
}

module.exports = function(db){
    
	return function(req, res){
		var restaurants = db.get('restaurants');

		open = [];
		closed = [];

		restaurants.find({}, function (err, docs){
			if (err) return;
			docs.forEach(function(storeListing){
				var storeInfo = {};
				
				// Copy static info
				storeInfo.name = storeListing.name;
				storeInfo.location = storeListing.location;

				// Determine if restaurant is open or closed
				if (isOpen(storeListing)){
					open.push(storeInfo);
				} else {
					closed.push(storeInfo);
				}

				// Probably should change this...
				storeInfo.closeData = 0;
			});

			// Pack everything up and render the page
			var toSend = {"openLoc" : open, "closedLoc" : closed}
			res.render('index', toSend)
		});
	}
};