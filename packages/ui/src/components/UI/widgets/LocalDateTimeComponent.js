import React, { useContext } from "react";
// import * as dateFnsTz from 'date-fns-tz';

import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import { format, isToday } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";
import { getGUITimeFormat } from "@utils/helper/Helper";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";

const LocalDateTimeComponent = ({
  serverTimestamp,
  dateFormat = "MMM dd yyyy", // Default format with year
  showDateOnly,
  hideSeconds,
}) => {
  const { lang } = useContext(LanguageContext);
  // Get the user's local time zone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let dynamicTimeFormat;
  let isTwelveHourFormat = getGUITimeFormat() === "12";
  // Dynamically set the time format based on getGUITimeZone value
  if (hideSeconds) {
    dynamicTimeFormat = isTwelveHourFormat ? "h:mm a" : "HH:mm";
  } else {
    dynamicTimeFormat = isTwelveHourFormat ? "h:mm:ss a" : "HH:mm:ss";
  }
  let serverDate;
  // Check if serverTimestamp is a string
  if (typeof serverTimestamp === "string") {
    // Check if the timestamp string contains fractional seconds with more than 3 digits
    const timestampParts = serverTimestamp.split('.');
    if (timestampParts.length > 1 && timestampParts[1].length > 3) {
      // Truncate the fractional seconds to milliseconds (3 digits)
      serverTimestamp = `${timestampParts[0]}.${timestampParts[1].slice(0, 3)}`;
    }
  
    // Now we can safely convert the string to a Date object
    const timestampNumber = Date.parse(serverTimestamp);
  
    if (!isNaN(timestampNumber)) {
      // Successfully created a Date object
      serverDate = new Date(timestampNumber);
      // Proceed with serverDate
    } else {
      // Handle the case where the string is still invalid
      console.error("Invalid timestamp string:", serverTimestamp);
    }
  } else {
    // Assume serverTimestamp is already a valid number or Date object
    serverDate = new Date(serverTimestamp);
    // Proceed with serverDate
  }
  
  // } else {
  //   // Assume serverTimestamp is already a valid number or Date object
  //   serverDate = new Date(serverTimestamp);
  //   // Proceed with serverDate
  // }
  

  // Convert the UTC server date to the user's local time zone
  const zonedDate = utcToZonedTime(serverDate, timeZone);

  // Get the current year and the year of the timestamp
  const currentYear = new Date().getFullYear();
  const timestampYear = zonedDate.getFullYear();

  // Remove the year if the timestamp is from the current year
  const adjustedDateFormat =
    dateFormat !== "MMM dd yyyy"
      ? dateFormat
      : currentYear === timestampYear
      ? "MMM dd"
      : dateFormat;

  // Check if the date is today
  const isCurrentDateToday = isToday(zonedDate);

  // Format the date and time
  const formattedTime = format(zonedDate, dynamicTimeFormat); // Use dynamic format
  const formattedDate = format(zonedDate, adjustedDateFormat); // Uses adjusted format

  // Determine what to display
  let displayDateTime = "";
  if (showDateOnly) {
    displayDateTime =
      (isCurrentDateToday ? Literal[lang].today : formattedDate) +
      " " +
      formattedTime;
  } else {
    displayDateTime = isCurrentDateToday
      ? `${Literal[lang].modified} ${Literal[lang].today} ${Literal[lang].at} ${formattedTime}`
      : `${Literal[lang].modifiedOn} ${formattedDate} ${Literal[lang].at} ${formattedTime}`;
  }

  return <span>{displayDateTime}</span>;
};

export default LocalDateTimeComponent;
