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
var _moment = _interopRequireDefault(require("moment"));
var _DateRangePicker = _interopRequireDefault(require("rsuite/DateRangePicker"));
require("rsuite/dist/rsuite.min.css");
require("./BasicDateRangePicker.scss");
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
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
var BasicDateRangePicker = function BasicDateRangePicker(props) {
  var _props$data, _props$data2, _props$data3, _props$data4;
  var _useState = (0, _react.useState)(props.startDate || new Date()),
    _useState2 = _slicedToArray(_useState, 2),
    startDate = _useState2[0],
    setStartDate = _useState2[1];
  var _useState3 = (0, _react.useState)(props.endDate || new Date()),
    _useState4 = _slicedToArray(_useState3, 2),
    endDate = _useState4[0],
    setEndDate = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showPicker = _useState6[0],
    setShowPicker = _useState6[1];
  var _useState7 = (0, _react.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    date = _useState8[0],
    setDate = _useState8[1];
  (0, _react.useEffect)(function () {
    handleDates();
    document.addEventListener("click", handleClickOutside, true);
    return function () {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  var handleDates = function handleDates() {
    setStartDate(props.startDate || new Date());
    setEndDate(props.endDate || new Date());
    if (props.startDate && props.endDate) {
      setDate((0, _moment["default"])(new Date(props.startDate)).format("MM/DD/YYYY") + " - " + (0, _moment["default"])(new Date(props.endDate)).format("MM/DD/YYYY"));
    } else {
      setDate();
    }
  };
  var handleClickOutside = function handleClickOutside(event) {
    var _props$datePickerRef, _props$datePickerRef2;
    if ((_props$datePickerRef = props.datePickerRef) !== null && _props$datePickerRef !== void 0 && _props$datePickerRef.current && !((_props$datePickerRef2 = props.datePickerRef) !== null && _props$datePickerRef2 !== void 0 && _props$datePickerRef2.current.contains(event.target))) {
      if (showPicker) {
        var dates = {
          startDate: startDate,
          endDate: endDate
        };
        props.handleSelect(dates);
        setShowPicker(false);
      }
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (props.openByZoom ? !props.openByZoom : true) && /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], {
    className: "custom-date-range-picker ".concat(props === null || props === void 0 ? void 0 : props.className),
    size: "xs",
    format: "MM-dd-yyyy",
    onClose: function onClose() {
      return props.onClickOutside(props.data);
    },
    preventOverflow: true,
    defaultOpen: props === null || props === void 0 ? void 0 : props.isOpen,
    onChange: function onChange(item) {
      return props.handleSelect(item, props.data, false);
    },
    placeholder: "Select Date Range",
    value: props.value ? props.value : props !== null && props !== void 0 && (_props$data = props.data) !== null && _props$data !== void 0 && _props$data.defaultDate ? props === null || props === void 0 || (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : _props$data2.defaultDate : null,
    cleanable: true,
    placement: "bottom"
  }), (props.openByZoom ? props.openByZoom : false) && /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], {
    className: "custom-date-range-picker ".concat(props === null || props === void 0 ? void 0 : props.className),
    size: "xs",
    format: "MM-dd-yyyy",
    preventOverflow: true,
    onChange: function onChange(item) {
      return props.handleSelect(item, props.data, false);
    },
    placeholder: "Select Date Range",
    value: props.value ? props.value : props !== null && props !== void 0 && (_props$data3 = props.data) !== null && _props$data3 !== void 0 && _props$data3.defaultDate ? props === null || props === void 0 || (_props$data4 = props.data) === null || _props$data4 === void 0 ? void 0 : _props$data4.defaultDate : null,
    cleanable: true,
    placement: "bottom"
  }));
};
var _default = exports["default"] = BasicDateRangePicker;