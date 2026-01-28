"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CustomBackdrop;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
require("./CustomAlertBox.scss");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _literals = _interopRequireDefault(require("../../../literals"));
var _LanguageProvider = require("../../../literals/LanguageProvider");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function CustomBackdrop(props) {
  var _React$useContext = _react["default"].useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  return /*#__PURE__*/_react["default"].createElement(_material.Backdrop, {
    className: "custom-backdrop",
    sx: {
      zIndex: function zIndex(theme) {
        return theme.zIndex.drawer + 1;
      }
    },
    open: props.loading
  }, props.isBackdropLoaderBoxHidden && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    size: "2xl",
    icon: _freeSolidSvgIcons.faSpinner,
    spinPulse: true
  }), !props.typographyHidden && /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    sx: {
      paddingLeft: 2
    }
  }, props.text || _literals["default"][lang]["pleaseWait"])), !props.isBackdropLoaderBoxHidden && /*#__PURE__*/_react["default"].createElement(_material.Box, {
    className: "backdrop-loader"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    size: "2xl",
    icon: _freeSolidSvgIcons.faSpinner,
    spinPulse: true
  }), !props.typographyHidden && /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    sx: {
      paddingLeft: 2
    }
  }, props.text || _literals["default"][lang]["pleaseWait"])));
}