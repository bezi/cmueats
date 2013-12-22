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
		if (result || time === "") return;
		var times = time.split('-');
		var opening = moment(times[0],"HHmm");
		var closing = moment(times[1],"HHmm");

		if (now.isAfter(opening) && now.isBefore(closing))
			result = true

	});

	return result
}

function closeTime(storeListing, date){
	var todaysTimes = getTimes(storeListing, date).split(':')
	var result = moment("0", "X");

	todaysTimes.forEach(function(time){
		if (!result.isSame(moment("0", "X"))) return;
		var times = time.split('-');
		var opening = moment(date)
		opening.hour(moment(times[0],"HHmm").hour());
		opening.minute(moment(times[0],"HHmm").minute());
		var closing = moment(date)
		closing.hour(moment(times[1],"HHmm").hour());
		closing.minute(moment(times[1],"HHmm").minute());

		if (date.isSame(opening) || (date.isAfter(opening) && date.isBefore(closing)) 
			|| date.isSame(closing))
			result = closing
	});

	if (result.isSame(moment("2400", "HHmm")) || result.isSame(moment("0", "X"))) 
		return closeTime(storeListing, date.startOf('day').add('days', 1));
	
	return result.format("X")
}

function openTime(storeListing, date){
	var todaysTimes = getTimes(storeListing, date).split(':')
	var result = moment("0", "X");

	todaysTimes.forEach(function(time){
		if (!result.isSame(moment("0", "X"))) return
			var times = time.split('-');
		var opening = moment(date)
		opening.hour(moment(times[0],"HHmm").hour());
		opening.minute(moment(times[0],"HHmm").minute());

		if (date.isSame(opening) || date.isBefore(opening))
			result = opening
	});

	if (result.isSame(moment("0", "X"))) 
		return openTime(storeListing, date.startOf('day').add('days', 1));
	
	return result.format("X")
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
					storeInfo.closeDate = closeTime(storeListing, moment())
					open.push(storeInfo);
				} else {
					storeInfo.closeDate = openTime(storeListing, moment())
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