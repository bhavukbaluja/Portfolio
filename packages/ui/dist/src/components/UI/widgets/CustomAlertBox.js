"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseDialog = _interopRequireDefault(require("../fields/BaseDialog"));
require("./CustomAlertBox.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CustomAlertBox = function CustomAlertBox(_ref) {
  var Msg = _ref.Msg,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? [] : _ref$children,
    title = _ref.title,
    open = _ref.open,
    setOpen = _ref.setOpen;
  if (!Array.isArray(children)) {
    children = [];
  }
  var ErrorMsg = function ErrorMsg() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: Msg
      }
    }), Array.isArray(children) && children.length > 0 && /*#__PURE__*/_react["default"].createElement("ul", null, children.map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: index,
        dangerouslySetInnerHTML: {
          __html: item
        }
      });
    })));
  };
  return /*#__PURE__*/_react["default"].createElement(_BaseDialog["default"], {
    title: title || "Alert",
    bodyComponent: /*#__PURE__*/_react["default"].createElement(ErrorMsg, null),
    open: open,
    setOpen: setOpen,
    button: /*#__PURE__*/_react["default"].createElement("button", {
      className: "alert-box-button",
      type: "button",
      onClick: function onClick() {
        return setOpen(false);
      }
    }, "Close"),
    isAlert: true
  });
};
var _default = exports["default"] = CustomAlertBox;