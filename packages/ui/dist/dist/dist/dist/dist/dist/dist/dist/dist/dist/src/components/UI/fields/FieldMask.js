"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
var FieldMask = function FieldMask() {
  return /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.5,
      backgroundColor: "#d2d2d2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    size: "xl",
    icon: _freeSolidSvgIcons.faSpinner,
    spinPulse: true
  }));
};
var _default = exports["default"] = FieldMask;