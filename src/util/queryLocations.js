import axios from "axios";
import { DateTime } from "luxon";

const BASE_URL = "https://dining.apis.scottylabs.org/locations";

/**
 * Convert a string to title case
 * @param {string} str string to convert to title case
 * @returns the same string, but in title case
 */
function toTitleCase(str) {
  return str
    .trim(" ")
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word.length > 1) {
        return word[0].toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join(" ");
}

/**
 * Determine if a given location's time slot covers the current time
 * @param {{ hour: int, minute: int, weekday: int }} start The time slot the location opens
 * @param {{ hour: int, minute: int, weekday: int }} end The time slot the location closes
 * @returns true if the location is open, false otherwise
 */
function isOpen(start, end) {
  const startTime = DateTime.fromObject(start);
  const endTime = DateTime.fromObject(end);
  const now = DateTime.now();
  const nowTime = DateTime.fromObject({
    hour: now.hour,
    minute: now.minute,
    weekday: now.weekday,
  });

  const diffStart = startTime.diff(nowTime);
  const diffEnd = endTime.diff(nowTime);

  const open = diffStart.milliseconds < 0 && diffEnd.milliseconds > 0;

  return open;
}

function apiDateToDateTime(date) {
  const { day, hour, minute } = date;
  return DateTime.fromObject({
    weekday: day,
    hour,
    minute,
  });
}

/**
 * Gets the next available time slot for a given location
 * @param {any[]} times List of time slots for a location
 * @returns The next time slot when the location opens
 */
function getNextTimeSlot(times) {
  const now = DateTime.now();
  const nowTime = DateTime.fromObject({
    hour: now.hour,
    minute: now.minute,
    weekday: now.weekday,
  });

  // Map times to DateTime objects
  const timeSlots = times.map(({ start, end }) => {
    const startTime = apiDateToDateTime(start);
    const endTime = apiDateToDateTime(end);

    return { startTime, endTime };
  });

  // Find the first time slot that opens after now
  const nextTimeSlot = timeSlots.find(({ startTime }) => {
    return startTime.diff(nowTime).milliseconds > 0;
  });

  if (nextTimeSlot == null) {
    // End of the week. Return the first time slot instead.
    const { start, end } = times[0];
    const startTime = apiDateToDateTime(start);
    const endTime = apiDateToDateTime(end);
    return { startTime, endTime };
  } else {
    return nextTimeSlot;
  }
}

function getStatusMessage(timeSlot, isOpen) {
  let diff = timeSlot.diffNow();
  let diffDaysRaw = diff.as("days");
  // console.log(diffDaysRaw);
  if (diffDaysRaw < 0) {
    diffDaysRaw += 7;
  }
  // console.log(diffDaysRaw);

  let diffDays = parseInt(Math.floor(Math.abs(diffDaysRaw)));
  const diffHours = parseInt(Math.floor(Math.abs(diff.as("hours"))));

  // console.log(diffDays, diffHours);

  const time = timeSlot.toFormat("hh:mm a");
  const action = isOpen ? "Closes" : "Opens";
  const day = timeSlot.weekdayLong;

  if (diffDays > 1) {
    return `${action} in ${diffDays} days (${day} at ${time})`;
  } else if (diffDays === 1) {
    return `${action} in a day (tomorrow at ${time})`;
  } else if (diffDays === 0) {
    if (diffHours >= 1) {
      return `${action} in ${diffHours} hours (today at ${time})`;
    } else {
      const diffMinutes = parseInt(Math.floor(Math.abs(diff.as("minutes"))));
      return `${action} in ${diffMinutes} minutes (today at ${time})`;
    }
  }
}

async function queryLocations() {
  try {
    // Query locations
    const { data } = await axios.get(BASE_URL);
    if (data == null) {
      return [];
    }

    let { locations } = data;
    locations.forEach(
      (location) => (location.name = toTitleCase(location.name))
    );
    // locations = locations.filter((location, idx) => idx === 0);

    // Determine status of locations
    for (const location of locations) {
      const { times } = location;
      const timeSlot = times.find(({ start, end }) => {
        return isOpen(
          {
            weekday: start.day,
            hour: start.hour,
            minute: start.minute,
          },
          {
            weekday: end.day,
            hour: end.hour,
            minute: end.minute,
          }
        );
      });

      if (timeSlot != null) {
        // Location is open
        location.isOpen = true;
        const endTime = apiDateToDateTime(timeSlot.end);
        location.statusMsg = getStatusMessage(endTime, true);
      } else {
        // Location is closed
        location.isOpen = false;
        const nextTimeSlot = getNextTimeSlot(times);
        const { startTime } = nextTimeSlot;
        location.statusMsg = getStatusMessage(startTime, false);
        // console.log(location.name);
        // console.log(location.statusMessage);
      }
    }

    // console.log(locations);
    return locations;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default queryLocations;
