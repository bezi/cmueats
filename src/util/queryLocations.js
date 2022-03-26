import axios from "axios";
import { DateTime } from "luxon";

const BASE_URL = "https://dining.apis.scottylabs.org/locations";
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEK_MINUTES = 7 * 24 * 60;
const now = DateTime.now();

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
 * Convert an API time entry to minutes
 * @param {int} days The number of days since Sunday (0 if Sunday)
 * @param {int} hours The number of hours (0-23) since midnight (0 if midnight)
 * @param {int} minutes The number of minutes since the start of the hour (0-59)
 * @returns the number of minutes since the start of the week
 */
function toMinutes(days, hours, minutes) {
  return days * 24 * 60 + hours * 60 + minutes;
}

/**
 * Determine if a given time slot is open, i.e. encompasses the current time
 * @param {int} start The time the location opens (in minutes since midnight on Sunday)
 * @param {int} end The time slot the location closes (in minutes since midnight on Sunday)
 * @returns true if the location is open, false otherwise
 */
function isOpen(start, end) {
  const weekday = now.weekday === 7 ? 0 : now.weekday;
  const nowMinutes = toMinutes(weekday, now.hour, now.minute);

  return start <= nowMinutes && nowMinutes <= end;
}

/**
 * Gets the next available time slot for a given location
 * @param {any[]} times List of time slots for a location
 * @returns The next time slot when the location opens
 */
function getNextTimeSlot(times) {
  const weekday = now.weekday === 7 ? 0 : now.weekday;
  const nowMinutes = toMinutes(weekday, now.hour, now.minute);

  // Find the first time slot that opens after now
  const nextTimeSlot = times.find(({ start }) => {
    return start.rawMinutes >= nowMinutes;
  });

  if (nextTimeSlot == null) {
    // End of the week. Return the first time slot instead.
    return times[0];
  } else {
    return nextTimeSlot;
  }
}

/**
 * Return the status message for a dining location, given the current or next available
 * time slot, and whether or not the location is currently open
 * @param {{ start, end }} timeSlot The current or next available time slot
 * @param {boolean} isOpen whether or not the location is currently open
 * @returns {str} The status message for the location
 */
function getStatusMessage(timeSlot, isOpen) {
  const weekday = now.weekday === 7 ? 0 : now.weekday;
  const nowMinutes = toMinutes(weekday, now.hour, now.minute);

  const { start, end } = timeSlot;
  // If open, look at when timeSlot closes. If closed, look at when timeSlot opens.
  const refTime = isOpen ? end : start;

  // Get difference
  const diff = (isOpen ? 0 : WEEK_MINUTES) + refTime.rawMinutes - nowMinutes;
  const diffMinutes = diff % 60;
  const diffHours = Math.floor((diff / 60) % 24);
  const diffDays = Math.floor(diff / (60 * 24));

  // Create time string
  const { hour, minute } = refTime;
  const hour12H = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  const minutePadded = minute < 10 ? `0${minute}` : minute;
  const time = `${hour12H}:${minutePadded} ${ampm}`;

  const action = isOpen ? "Closes" : "Opens";
  const day = WEEKDAYS[timeSlot.start.day];

  if (diffDays > 1) {
    return `${action} in ${diffDays} days (${day} at ${time})`;
  } else if (diffDays === 1) {
    return `${action} in a day (tomorrow at ${time})`;
  } else if (diffDays === 0) {
    if (diffHours >= 1) {
      return `${action} in ${diffHours} hours (today at ${time})`;
    } else {
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

    // Convert names to title case and append "raw time" to each time slot
    let { locations } = data;
    locations.forEach((location) => {
      location.name = toTitleCase(location.name);
      location.times = location.times.map(({ start, end }) => ({
        // Add minutes since start of the week for isOpen computation
        start: {
          ...start,
          rawMinutes: toMinutes(start.day, start.hour, start.minute),
        },
        end: {
          ...end,
          rawMinutes: toMinutes(end.day, end.hour, end.minute),
        },
      }));
    });

    // console.log(locations);
    // locations = locations.filter((location, idx) => idx === 2);

    // Determine status of locations
    for (const location of locations) {
      const { times } = location;
      const timeSlot = times.find(({ start, end }) => {
        return isOpen(start.rawMinutes, end.rawMinutes);
      });

      if (timeSlot != null) {
        // Location is open
        location.isOpen = true;
        location.statusMsg = getStatusMessage(timeSlot, true);
      } else {
        // Location is closed
        location.isOpen = false;
        const nextTimeSlot = getNextTimeSlot(times);
        location.statusMsg = getStatusMessage(nextTimeSlot, false);
      }
    }

    return locations;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default queryLocations;
