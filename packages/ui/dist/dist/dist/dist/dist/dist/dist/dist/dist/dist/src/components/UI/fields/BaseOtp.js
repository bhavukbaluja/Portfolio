"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
var _Helper = require("@utils/helper/Helper");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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
var MuiOtpInput = (0, _dynamic["default"])(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('mui-one-time-password-input'));
  }).then(function (mod) {
    return mod.MuiOtpInput;
  });
}, {
  ssr: false
});
var BaseOtp = function BaseOtp(_ref) {
  var value = _ref.value,
    handleChange = _ref.handleChange,
    id = _ref.id,
    errorMsg = _ref.errorMsg,
    required = _ref.required;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _BaseModule["default"].mobileContainer
  }, /*#__PURE__*/_react["default"].createElement(MuiOtpInput, {
    value: value,
    onChange: handleChange,
    id: id,
    required: required,
    length: 6
  }), errorMsg && /*#__PURE__*/_react["default"].createElement("span", {
    className: !(0, _Helper.isEmpty)(errorMsg) ? _BaseModule["default"].ErrorForMobile : _BaseModule["default"].Description
  }, /*#__PURE__*/_react["default"].createElement("p", null, errorMsg)));
};
var _default = exports["default"] = BaseOtp;