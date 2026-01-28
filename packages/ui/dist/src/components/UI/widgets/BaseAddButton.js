"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
require("./Base.scss");
var _AddOutlined = _interopRequireDefault(require("@mui/icons-material/AddOutlined"));
var _RefreshOutlined = _interopRequireDefault(require("@mui/icons-material/RefreshOutlined"));
var _HomeOutlined = _interopRequireDefault(require("@mui/icons-material/HomeOutlined"));
var _AnimatedSearchBar = _interopRequireDefault(require("./AnimatedSearchBar"));
var _ChaletOutlined = _interopRequireDefault(require("@mui/icons-material/ChaletOutlined"));
var _material = require("@mui/material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BaseAddButton = function BaseAddButton(_ref) {
  var handleClick = _ref.handleClick,
    addMsg = _ref.addMsg,
    handleRefresh = _ref.handleRefresh,
    handleHome = _ref.handleHome,
    entity = _ref.entity,
    clickSearch = _ref.clickSearch,
    initialQuery = _ref.initialQuery,
    handleParents = _ref.handleParents;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, entity != "webSites" ? /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "Add-Button",
    onClick: handleClick
  }, /*#__PURE__*/_react["default"].createElement(_AddOutlined["default"], null), " ", addMsg) : /*#__PURE__*/_react["default"].createElement(_material.Box, {
    className: "Add-Button",
    paddingTop: "8px"
  }, addMsg), entity == "category" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "refresh-Button",
    onClick: handleParents
  }, /*#__PURE__*/_react["default"].createElement(_ChaletOutlined["default"], null), " "), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "refresh-Button",
    onClick: handleHome
  }, /*#__PURE__*/_react["default"].createElement(_HomeOutlined["default"], null), " ")), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "refresh-Button",
    onClick: handleRefresh
  }, /*#__PURE__*/_react["default"].createElement(_RefreshOutlined["default"], null), " "), !(entity == "webSites" || entity == "webTrendingBar") && /*#__PURE__*/_react["default"].createElement(_AnimatedSearchBar["default"], {
    entity: entity,
    expandFrom: "left",
    clickSearch: clickSearch,
    initialQuery: initialQuery
  }));
};
var _default = exports["default"] = BaseAddButton;