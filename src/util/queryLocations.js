import axios from "axios";
import { DateTime } from "luxon";

const BASE_URL = "https://apis.dining.scottylabs.org/locations";

function getNextTimeSlot(times) {
  const today = new Date();
  const day = today.getDay();
  const hour = today.getHours();
  const minute = today.getMinutes();

  // Find first time slot that
  const nextTimeSlot = times.find(({ end }) => {
    return end.day >= day && end.hour >= hour && end.minute >= minute;
  });

  if (nextTimeSlot == null) {
    // End of the week. Return the first time slot instead.
    return times[0];
  } else {
    return nextTimeSlot;
  }
}

async function queryLocations() {
  try {
    // Query locations
    const { data } = await axios.get(BASE_URL);
    if (data == null) {
      return [];
    }

    const today = new Date();
    const day = today.getDay();
    const hour = today.getHours();
    const minute = today.getMinutes();

    const { locations } = data;

    // Determine status of locations
    for (const location of locations) {
      const { times } = location;
      const timeSlot = times.find(({ start, end }) => {
        return (
          start.day <= day &&
          start.hour <= hour &&
          start.minute <= minute &&
          end.day >= day &&
          end.hour >= hour &&
          end.minute >= minute
        );
      });

      if (timeSlot != null) {
        // Location is open

        location.isOpen = true;
        const hoursLeft = timeSlot.end.hour - hour;
        const today = timeSlot.end.day === day;

        const closeTime = DateTime.fromObject({
          day: timeSlot.end.day,
          hour: timeSlot.end.hour,
          minute: timeSlot.end.minute,
        })

        const closeTimeHour = timeSlot.end.hour % 12;
        const closeTimeMinute = timeSlot.end.minute;
        const closeTimePeriod = timeSlot.end.hour >= 12 ? "PM" : "AM";
        const closeTime = `${closeTimeHour}:${closeTimeMinute} ${closeTimePeriod}`;

        const closeMessage = `${today ? "today" : "tomorrow"} at ${closeTime}`;
        location.statusMsg = `Closes in ${hoursLeft} hours (${closeMessage})`;
      } else {
        // Location is closed

        location.isOpen = false;
      }
    }
  } catch (err) {
    return [];
  }
}

export default queryLocations;
