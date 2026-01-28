"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _BaseDialog = _interopRequireDefault(require("../fields/BaseDialog"));
require("./CustomAlertBox.scss");
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var CustomConfirmBox = function CustomConfirmBox(_ref) {
  var Msg = _ref.Msg,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? [] : _ref$children,
    title = _ref.title,
    open = _ref.open,
    setOpen = _ref.setOpen,
    clickedYes = _ref.clickedYes;
  var _useContext = (0, _react.useContext)(_LanguageProvider.LanguageContext),
    lang = _useContext.lang;
  if (!Array.isArray(children)) {
    children = [];
  }
  var ConfirmMsg = function ConfirmMsg() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: "flex",
        flexDirection: "row"
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: Msg
      }
    }));
  };
  return /*#__PURE__*/_react["default"].createElement(_BaseDialog["default"], {
    title: title || _literals["default"][lang].confirm,
    bodyComponent: /*#__PURE__*/_react["default"].createElement(ConfirmMsg, null),
    open: open,
    setOpen: setOpen,
    button: /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: "flex",
        flexDirection: "row",
        gap: '20px'
      }
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: "form-button",
      type: "button",
      onClick: function onClick() {
        setOpen(false);
        clickedYes();
      }
    }, _literals["default"][lang].yes), /*#__PURE__*/_react["default"].createElement("button", {
      className: "alert-box-button",
      type: "button",
      onClick: function onClick() {
        setOpen(false);
      }
    }, _literals["default"][lang].no)),
    isAlert: true
  });
};
var _default = exports["default"] = CustomConfirmBox;