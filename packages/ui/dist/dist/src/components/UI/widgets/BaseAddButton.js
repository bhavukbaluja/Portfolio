"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
require("./Base.scss");
var _AddOutlined = _interopRequireDefault(require("@mui/icons-material/AddOutlined"));
var _RefreshOutlined = _interopRequireDefault(require("@mui/icons-material/RefreshOutlined"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
var BaseAddButton = function BaseAddButton(_ref) {
  var handleClick = _ref.handleClick,
    addMsg = _ref.addMsg,
    handleRefresh = _ref.handleRefresh;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "Add-Button",
    onClick: handleClick
  }, /*#__PURE__*/_react["default"].createElement(_AddOutlined["default"], null), " ", addMsg), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "refresh-Button",
    onClick: handleRefresh
  }, /*#__PURE__*/_react["default"].createElement(_RefreshOutlined["default"], null), " "));
};
var _default = exports["default"] = BaseAddButton;