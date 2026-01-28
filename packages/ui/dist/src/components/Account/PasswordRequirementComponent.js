"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PasswordRequirementComponent;
var _react = _interopRequireDefault(require("react"));
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
require("./UserActivationPage.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function PasswordRequirementComponent() {
  var _React$useContext = _react["default"].useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "password-req-header"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    variant: "h7"
  }, _literals["default"][lang].passwordRequirementMsg, ":")), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "password-req-list"
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: "password-req-list-li"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Aa (", _literals["default"][lang].upperLowerCase, ")")), /*#__PURE__*/_react["default"].createElement("li", {
    className: "password-req-list-li"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "13 (", _literals["default"][lang].numericals, ")")), /*#__PURE__*/_react["default"].createElement("li", {
    className: "password-req-list-li"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "@! (", _literals["default"][lang].specialChar, ")"))));
}