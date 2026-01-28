"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseDialog;
var React = _interopRequireWildcard(require("react"));
var _dialog = require("@base-ui-components/react/dialog");
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
    "default": e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n["default"] = e, t && t.set(e, n), n;
}
function BaseDialog(_ref) {
  var title = _ref.title,
    bodyComponent = _ref.bodyComponent,
    open = _ref.open,
    setOpen = _ref.setOpen,
    button = _ref.button,
    isAlert = _ref.isAlert;
  return /*#__PURE__*/React.createElement(_dialog.Dialog.Root, {
    open: open,
    onOpenChange: function onOpenChange(isOpen) {
      return isOpen && setOpen(isOpen);
    }
  }, /*#__PURE__*/React.createElement(_dialog.Dialog.Portal, null, /*#__PURE__*/React.createElement(_dialog.Dialog.Backdrop, {
    className: isAlert ? _BaseModule["default"].AlertBackdrop : _BaseModule["default"].Backdrop,
    onClick: function onClick(e) {
      return e.stopPropagation();
    } // Prevent closing on backdrop click
  }), /*#__PURE__*/React.createElement(_dialog.Dialog.Popup, {
    className: isAlert ? _BaseModule["default"].AlertPopup : _BaseModule["default"].Popup
  }, /*#__PURE__*/React.createElement(_dialog.Dialog.Close, {
    className: _BaseModule["default"].closeButton,
    onClick: function onClick() {
      return setOpen(false);
    }
  }, /*#__PURE__*/React.createElement(_Close["default"], {
    fontSize: "large"
  })), /*#__PURE__*/React.createElement(_dialog.Dialog.Title, {
    className: _BaseModule["default"].Title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: _BaseModule["default"].dialogContent
  }, /*#__PURE__*/React.createElement("div", {
    className: _BaseModule["default"].dialogContent
  }, bodyComponent), /*#__PURE__*/React.createElement("div", {
    className: isAlert ? _BaseModule["default"].AlertActions : button ? _BaseModule["default"].Actions : _BaseModule["default"].ActionsHidden
  }, button)))));
}