"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utcToZonedTime = _interopRequireDefault(require("date-fns-tz/utcToZonedTime"));
var _dateFns = require("date-fns");
var _Helper = require("@utils/helper/Helper");
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
    "default": e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n["default"] = e, t && t.set(e, n), n;
}
// import * as dateFnsTz from 'date-fns-tz';

// import { utcToZonedTime } from "date-fns-tz";

var LocalDateTimeComponent = function LocalDateTimeComponent(_ref) {
  var serverTimestamp = _ref.serverTimestamp,
    _ref$dateFormat = _ref.dateFormat,
    dateFormat = _ref$dateFormat === void 0 ? "MMM dd yyyy" : _ref$dateFormat,
    showDateOnly = _ref.showDateOnly,
    hideSeconds = _ref.hideSeconds;
  var _useContext = (0, _react.useContext)(_LanguageProvider.LanguageContext),
    lang = _useContext.lang;
  // Get the user's local time zone
  var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var dynamicTimeFormat;
  var isTwelveHourFormat = (0, _Helper.getGUITimeFormat)() === "12";
  // Dynamically set the time format based on getGUITimeZone value
  if (hideSeconds) {
    dynamicTimeFormat = isTwelveHourFormat ? "h:mm a" : "HH:mm";
  } else {
    dynamicTimeFormat = isTwelveHourFormat ? "h:mm:ss a" : "HH:mm:ss";
  }
  var serverDate;
  // Check if serverTimestamp is a string
  if (typeof serverTimestamp === "string") {
    // Check if the timestamp string contains fractional seconds with more than 3 digits
    var timestampParts = serverTimestamp.split('.');
    if (timestampParts.length > 1 && timestampParts[1].length > 3) {
      // Truncate the fractional seconds to milliseconds (3 digits)
      serverTimestamp = "".concat(timestampParts[0], ".").concat(timestampParts[1].slice(0, 3));
    }

    // Now we can safely convert the string to a Date object
    var timestampNumber = Date.parse(serverTimestamp);
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
  var zonedDate = (0, _utcToZonedTime["default"])(serverDate, timeZone);

  // Get the current year and the year of the timestamp
  var currentYear = new Date().getFullYear();
  var timestampYear = zonedDate.getFullYear();

  // Remove the year if the timestamp is from the current year
  var adjustedDateFormat = dateFormat !== "MMM dd yyyy" ? dateFormat : currentYear === timestampYear ? "MMM dd" : dateFormat;

  // Check if the date is today
  var isCurrentDateToday = (0, _dateFns.isToday)(zonedDate);

  // Format the date and time
  var formattedTime = (0, _dateFns.format)(zonedDate, dynamicTimeFormat); // Use dynamic format
  var formattedDate = (0, _dateFns.format)(zonedDate, adjustedDateFormat); // Uses adjusted format

  // Determine what to display
  var displayDateTime = "";
  if (showDateOnly) {
    displayDateTime = (isCurrentDateToday ? _literals["default"][lang].today : formattedDate) + " " + formattedTime;
  } else {
    displayDateTime = isCurrentDateToday ? "".concat(_literals["default"][lang].modified, " ").concat(_literals["default"][lang].today, " ").concat(_literals["default"][lang].at, " ").concat(formattedTime) : "".concat(_literals["default"][lang].modifiedOn, " ").concat(formattedDate, " ").concat(_literals["default"][lang].at, " ").concat(formattedTime);
  }
  return /*#__PURE__*/_react["default"].createElement("span", null, displayDateTime);
};
var _default = exports["default"] = LocalDateTimeComponent;