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
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _NotFoundImage = _interopRequireDefault(require("@assets/NotFoundImage2.png"));
require("./Common.scss");
var _useNavigateTo = _interopRequireDefault(require("@utils/helper/ApiConfig/useNavigateTo"));
var _SafeImage = _interopRequireDefault(require("@utils/helper/SafeImage"));
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
var NotFound = function NotFound() {
  var NavigateTo = (0, _useNavigateTo["default"])();
  var _useContext = (0, _react.useContext)(_LanguageProvider.LanguageContext),
    lang = _useContext.lang;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "notFound"
  }, /*#__PURE__*/_react["default"].createElement(_SafeImage["default"], {
    src: _NotFoundImage["default"],
    style: {
      height: '60vh'
    }
  }), /*#__PURE__*/_react["default"].createElement("p", null, _literals["default"][lang].brokenLinkMsg1), /*#__PURE__*/_react["default"].createElement("p", null, _literals["default"][lang].brokenLinkMsg2), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "form-button",
    onClick: function onClick() {
      return NavigateTo("/", "", true);
    }
  }, _literals["default"][lang].backToHome));
};
var _default = exports["default"] = NotFound;