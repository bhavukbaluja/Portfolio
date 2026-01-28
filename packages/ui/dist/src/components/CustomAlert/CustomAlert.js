"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("hooks");
var _proSolidSvgIcons = require("@fortawesome/pro-solid-svg-icons");
require("./CustomAlert.scss");
var _material = require("@mui/material");
var _CustomIconButton = _interopRequireDefault(require("components/UI/CustomIconButton/CustomIconButton"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _helper = require("_helpers/helper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var handleSave = function handleSave() {};
var CustomAlert = function CustomAlert(props) {
  var _props$showBullets;
  var handleClose = function handleClose(event, reason) {
    if (reason === "backdropClick") {
      return;
    }
    props === null || props === void 0 || props.closeAlert(false);
  };
  var _useI18n = (0, _hooks.useI18n)(),
    _t = _useI18n._t,
    Literal = _useI18n.Literal;
  return /*#__PURE__*/_react["default"].createElement(_material.Dialog, {
    sx: {
      height: 600
    },
    "data-testid": "custom-alert",
    open: props === null || props === void 0 ? void 0 : props.open,
    onClose: handleClose,
    maxWidth: (props === null || props === void 0 ? void 0 : props.minWidth) || "sm",
    fullWidth: true,
    scroll: "paper",
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_material.DialogTitle, {
    className: "dialog-header py-1"
  }, /*#__PURE__*/_react["default"].createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement(_material.Typography, null, _t(props === null || props === void 0 ? void 0 : props.title)), /*#__PURE__*/_react["default"].createElement(_CustomIconButton["default"], {
    title: "close",
    type: "close-btn",
    buttonClick: handleClose,
    "data-testid": "custom-alert-ok-btn",
    icon: /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      size: "sm",
      icon: _proSolidSvgIcons.faClose
    })
  }))), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    className: "mb-0"
  }), /*#__PURE__*/_react["default"].createElement(_material.DialogContent, {
    className: "custom-alert-content"
  }, /*#__PURE__*/_react["default"].createElement(_material.Stack, {
    direction: {
      xs: "row"
    },
    spacing: {
      xs: 1
    },
    sx: {
      wordBreak: "keep-all",
      whitespace: "normal"
    }
  }, !(props !== null && props !== void 0 && props.isInfoIcon) && /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "custom-alert-warning-icon",
    icon: _proSolidSvgIcons.faExclamationTriangle
  }), (props === null || props === void 0 ? void 0 : props.isInfoIcon) && /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "custom-alert-info-icon",
    icon: _proSolidSvgIcons.faCircleInfo
  }), (0, _helper.renderHTML)(props === null || props === void 0 ? void 0 : props.children, "14px")), (props === null || props === void 0 || (_props$showBullets = props.showBullets) === null || _props$showBullets === void 0 ? void 0 : _props$showBullets.length) > 0 && (props === null || props === void 0 ? void 0 : props.showBullets.map(function (point, index) {
    return /*#__PURE__*/_react["default"].createElement(_material.Box, {
      className: "custom-alert-content-bullets",
      key: index
    }, /*#__PURE__*/_react["default"].createElement(_material.Stack, {
      direction: {
        xs: "row"
      },
      spacing: {
        xs: 1
      }
    }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      className: "custom-alert-warning",
      icon: _proSolidSvgIcons.faChevronRight
    }), (0, _helper.renderHTML)(point, "14px")));
  }))), /*#__PURE__*/_react["default"].createElement(_material.DialogActions, {
    className: "custom-alert-action"
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    "data-testid": "custom-alert-ok-btn",
    onClick: handleClose,
    className: "adp-btn-dark",
    variant: "contained"
  }, Literal.ok)));
};
var _default = exports["default"] = CustomAlert;