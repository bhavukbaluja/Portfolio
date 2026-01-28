"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _muiOneTimePasswordInput = require("mui-one-time-password-input");
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
var _Helper = require("../../../../../utils/src/helper/Helper");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
var BaseOtp = function BaseOtp(_ref) {
  var value = _ref.value,
    handleChange = _ref.handleChange,
    id = _ref.id,
    errorMsg = _ref.errorMsg,
    required = _ref.required;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _BaseModule["default"].mobileContainer
  }, /*#__PURE__*/_react["default"].createElement(_muiOneTimePasswordInput.MuiOtpInput, {
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