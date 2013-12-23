// Schedule logic
var moment = require('moment');

// Returns the opening and closing times for the date
function getTimes(storeInfo, date){

	// Get keys for schedules
	keys = Object.keys(storeInfo.schedules);

	// Iterate through the schedule keys to find the correct schedule
	for (i = 0; i < keys.length; i++){
		// Skip default for now
		if (keys[i] === "default") continue;

		// Find the starting and ending dates for this schedule
		dates = keys[i].split('-');
		start = moment(dates[0], "YYYYMMDD");
		start.startOf('day');
		end = moment(dates[1], "YYYYMMDD");
		end.endOf('day');

		// If the passed date is within this key, we return times from this schedule
		if (date.isSame(start, "day") || (date.isAfter(start, "day") && date.isBefore(end, "day")) 
			|| date.isSame(end, "day")) {
			return storeInfo.schedules[keys[i]][date.isoWeekday().toString()];
		}
	}

	// If we didn't find a special schedule, return the default
	return storeInfo.schedules["default"][date.isoWeekday().toString()];
}

// Determines whether the passed store is open or not now
function isOpen(storeInfo){
	// Get the time right now
	now = moment();

	// Get the times for today
	var todaysTimes = getTimes(storeInfo, now);

	// If the store is closed all day, return false
	if (todaysTimes === "") return false;

	// Iterate through the times, and see if now is during an open time
	var todaysTimeBlocks = todaysTimes.split(":")
	for (i = 0; i < todaysTimeBlocks.length; i++){
		var times = todaysTimeBlocks[i].split('-');
		var opening = moment(times[0], "HHmm");
		opening.startOf('minute');
		var closing = moment(times[1], "HHmm");
		closing.startOf('minute');

		if (now.isSame(opening) || (now.isAfter(opening) && now.isBefore(closing)) || now.isSame(closing))
			return true;
	}

	// If we didn't find a time where the store was open that corresponds with now, it's closed.
	return false;
}

function openTime(storeListing, date){

	// Get times for this date
	var todaysTimes = getTimes(storeListing, date);
	
	// If no times today, look for tomorrow
	if (todaysTimes === "") return openTime(storeListing, date.startOf('day').add('days', 1));

	// Iterate through the times, and find the next opening time after the date
	var todaysTimeBlocks = todaysTimes.split(":");
	for (i = 0; i < todaysTimeBlocks.length; i++){
		var times = todaysTimeBlocks[i].split('-');

		// Set to opening time on the correct date
		var opening = moment(date);
		opening.hour(moment(times[0],"HHmm").hour());
		opening.minute(moment(times[0],"HHmm").minute());
		opening.startOf('minute');

		if (date.isSame(opening) || date.isBefore(opening)) return opening.format("X");
	}

	// Return for tomorrow
	return openTime(storeListing, date.startOf('day').add('days', 1));
}

function closeTime(storeListing, date){

	// Get times for this date
	var todaysTimes = getTimes(storeListing, date);
	
	// If no times today, look for tomorrow
	if (todaysTimes === "") return closeTime(storeListing, date.startOf('day').add('days', 1));

	// Iterate through the times, and find the next closing time after the date
	var todaysTimeBlocks = todaysTimes.split(":");
	for (i = 0; i < todaysTimeBlocks.length; i++){
		var times = todaysTimeBlocks[i].split('-');

		// Set to closing time on the correct date
		var closing = moment(date);
		closing.hour(moment(times[1],"HHmm").hour());
		closing.minute(moment(times[1],"HHmm").minute());
		closing.startOf('minute');

		// See if we have a match
		if (date.isSame(closing) || date.isBefore(closing)){
			// Set up variables for midnight, and tomorrow
			midnight = moment(date).startOf('day');
			tomorrow = moment(midnight).add('days', 1);

			// If the closing time is midnight, and the store opens at midnight tomorrow, it hasn't actually closed
			if (closing.isSame(midnight, 'minute') && moment(openTime(storeListing, tomorrow), "X").isSame(tomorrow, 'minute')){
				// Return for tomorrow
				return closeTime(storeListing, date.startOf('day').add('days', 1));
			}

			// We found the closing!
			return closing.format("X");
		}
	}

	// Return for tomorrow
	return closeTime(storeListing, date.startOf('day').add('days', 1));
}

// Function retrieves schedules from the database and render the main page
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
			});

			// Pack everything up and render the page
			var toSend = {"openLoc" : open, "closedLoc" : closed}
			res.render('index', toSend)
		});
	}
};
