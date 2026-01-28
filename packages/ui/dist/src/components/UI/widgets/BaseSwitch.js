"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseSwitch;
var React = _interopRequireWildcard(require("react"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Switch = _interopRequireDefault(require("@mui/material/Switch"));
var _styles = require("@mui/material/styles");
var _PowerSettingsNewOutlined = _interopRequireDefault(require("@mui/icons-material/PowerSettingsNewOutlined"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Default style switch
var MaterialUISwitch = (0, _styles.styled)(_Switch["default"])(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#ffffff',
        transform: 'translateX(24px)',
        '& .MuiSwitch-thumb': {
          backgroundColor: "var(--success-color)",
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'><path d='M20.285 2.998L9 14.283l-5.285-5.285L2 10.713l7 7L22 4z'/></svg>\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '20px 20px'
        },
        '& + .MuiSwitch-track': {
          backgroundColor: '#b2fab4',
          // ✅ Matching PowerSwitch checked color
          opacity: 1
        }
      }
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: 'var(--danger-color)',
      width: 30,
      height: 30,
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'><path d='M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.42L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z'/></svg>\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '20px 20px'
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#ffe6e6',
      // ✅ Updated to match PowerSwitch's improved visibility
      opacity: 1,
      borderRadius: 16,
      transition: theme.transitions.create(['background-color'], {
        duration: 500 // ✅ Matching transition duration
      })
    }
  };
});

// Power button styled switch with icon inside thumb
var PowerSwitch = (0, _styles.styled)(function (props) {
  return /*#__PURE__*/React.createElement(_Switch["default"], _extends({
    focusVisibleClassName: ".Mui-focusVisible",
    disableRipple: true
  }, props, {
    icon: /*#__PURE__*/React.createElement("div", {
      className: "custom-thumb"
    }, /*#__PURE__*/React.createElement(_PowerSettingsNewOutlined["default"], {
      fontSize: "small",
      style: {
        color: 'white'
      }
    })),
    checkedIcon: /*#__PURE__*/React.createElement("div", {
      className: "custom-thumb"
    }, /*#__PURE__*/React.createElement(_PowerSettingsNewOutlined["default"], {
      fontSize: "small",
      style: {
        color: 'white'
      }
    }))
  }));
})(function (_ref2) {
  var theme = _ref2.theme;
  return {
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 1,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        transform: 'translateX(24px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#b2fab4',
          opacity: 1
        }
      }
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#ffe6e6',
      borderRadius: 16,
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500
      })
    },
    '& .custom-thumb': {
      backgroundColor: "var(--danger-color)",
      width: 30,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%'
    },
    '& .Mui-checked .custom-thumb': {
      backgroundColor: "var(--success-color)"
    }
  };
});

// Exported switch component
function BaseSwitch(_ref3) {
  var _ref3$defaultChecked = _ref3.defaultChecked,
    defaultChecked = _ref3$defaultChecked === void 0 ? false : _ref3$defaultChecked,
    _ref3$name = _ref3.name,
    name = _ref3$name === void 0 ? 'status' : _ref3$name,
    onToggle = _ref3.onToggle,
    switchKey = _ref3.switchKey,
    row = _ref3.row,
    _ref3$powerStyle = _ref3.powerStyle,
    powerStyle = _ref3$powerStyle === void 0 ? false : _ref3$powerStyle;
  var _React$useState = React.useState(defaultChecked),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    checked = _React$useState2[0],
    setChecked = _React$useState2[1];
  var handleChange = function handleChange(event) {
    var isChecked = event.target.checked;
    setChecked(isChecked);
    if (onToggle) onToggle(isChecked, row);
  };
  var SwitchComponent = powerStyle ? PowerSwitch : MaterialUISwitch;
  return /*#__PURE__*/React.createElement(_FormControlLabel["default"], {
    key: switchKey,
    control: /*#__PURE__*/React.createElement(SwitchComponent, {
      checked: checked,
      onChange: handleChange,
      name: name
    })
  });
}