"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseUploadButton;
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function BaseUploadButton(props) {
  var _React$useContext = _react["default"].useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  var VisuallyHiddenInput = (0, _styledComponents["default"])("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1
  });
  return /*#__PURE__*/_react["default"].createElement(_material.Button, {
    component: "label",
    className: props !== null && props !== void 0 && props.className ? props === null || props === void 0 ? void 0 : props.className : "adp-btn-light",
    size: "small",
    sx: {
      width: "85px"
    },
    startIcon: /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faUpload
    })
  }, _literals["default"][lang][props === null || props === void 0 ? void 0 : props.text], /*#__PURE__*/_react["default"].createElement(VisuallyHiddenInput, {
    type: "file",
    accept: (props === null || props === void 0 ? void 0 : props.accept) || "image/*",
    onChange: props === null || props === void 0 ? void 0 : props.imageHandleUpload
  }));
}