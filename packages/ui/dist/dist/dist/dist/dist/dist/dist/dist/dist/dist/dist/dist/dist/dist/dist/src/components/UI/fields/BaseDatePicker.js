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
exports["default"] = BaseDatePicker;
var _field = require("@base-ui-components/react/field");
var _AdapterDayjs = require("@mui/x-date-pickers/AdapterDayjs");
var _DatePicker = require("@mui/x-date-pickers/DatePicker");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _dayjs = _interopRequireDefault(require("dayjs"));
var React = _interopRequireWildcard(require("react"));
var _Helper = require("@utils/helper/Helper");
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
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
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function BaseDatePicker(_ref) {
  var label = _ref.label,
    required = _ref.required,
    errorMsg = _ref.errorMsg,
    description = _ref.description,
    sx = _ref.sx,
    name = _ref.name,
    value = _ref.value,
    defaultValue = _ref.defaultValue,
    onChange = _ref.onChange;
  var _React$useContext = React.useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  var threeYearsAgo = (0, _dayjs["default"])().subtract(3, 'year');
  return /*#__PURE__*/React.createElement(_LocalizationProvider.LocalizationProvider, {
    dateAdapter: _AdapterDayjs.AdapterDayjs
  }, /*#__PURE__*/React.createElement(_field.Field.Root, {
    name: name,
    className: _BaseModule["default"].Field,
    sx: sx
  }, /*#__PURE__*/React.createElement(_field.Field.Label, {
    className: _BaseModule["default"].Label
  }, _literals["default"][lang][label] || label, required && /*#__PURE__*/React.createElement("span", {
    className: _BaseModule["default"].red_icon
  }, "*")), /*#__PURE__*/React.createElement(_DatePicker.DatePicker
  //   value={value}
  , {
    defaultValue: defaultValue,
    onChange: onChange,
    maxDate: threeYearsAgo,
    format: "DD/MM/YYYY",
    slotProps: {
      textField: {
        size: 'small',
        fullWidth: true,
        sx: {
          height: '100%',
          // minWidth: '250px',
          '& .MuiInputBase-root': {
            paddingLeft: '0.875rem',
            paddingRight: '20px',
            width: "100%",
            height: "50px",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            backgroundColor: "transparent",
            color: "var(--color-gray-900)"
          },
          // ✅ Focus styles here
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-blue)',
            // your custom color
            borderWidth: '2px'
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            zIndex: 2,
            outline: 'none',
            boxShadow: 'none !important' // or your desired shadow
          }
        },
        error: !(0, _Helper.isEmpty)(errorMsg),
        helperText: ''
      }
    },
    openTo: "year"
  }), /*#__PURE__*/React.createElement(_field.Field.Description, {
    className: !(0, _Helper.isEmpty)(errorMsg) ? _BaseModule["default"].Error : _BaseModule["default"].Description
  }, !(0, _Helper.isEmpty)(errorMsg) ? errorMsg : _literals["default"][lang][description] || description)));
}