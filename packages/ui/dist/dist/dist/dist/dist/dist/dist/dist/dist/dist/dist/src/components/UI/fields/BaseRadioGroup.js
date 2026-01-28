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
exports["default"] = BaseRadioGroup;
var React = _interopRequireWildcard(require("react"));
var _radio = require("@base-ui-components/react/radio");
var _radioGroup = require("@base-ui-components/react/radio-group");
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
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
function BaseRadioGroup(_ref) {
  var _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    defaultValue = _ref.defaultValue,
    value = _ref.value,
    onChange = _ref.onChange,
    title = _ref.title,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    dress = _ref.dress,
    sx = _ref.sx;
  var _React$useContext = React.useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  return /*#__PURE__*/React.createElement(React.Fragment, null, title && /*#__PURE__*/React.createElement("div", {
    className: _BaseModule["default"].Label,
    id: "radio-group-label"
  }, _literals["default"][lang][title] || title), /*#__PURE__*/React.createElement(_radioGroup.RadioGroup, {
    "aria-labelledby": "radio-group-label",
    defaultValue: defaultValue,
    value: value,
    onValueChange: onChange,
    className: "".concat(_BaseModule["default"].RadioGroup, " ").concat(className),
    sx: sx
  }, options.map(function (_ref2) {
    var label = _ref2.label,
      value = _ref2.value;
    // Check if value contains "dress" and apply dress styling
    var isDress = dress || false;
    return /*#__PURE__*/React.createElement("label", {
      key: value,
      className: _BaseModule["default"].Item
    }, /*#__PURE__*/React.createElement(_radio.Radio.Root, {
      value: value,
      className: isDress ? _BaseModule["default"].DressRadio : _BaseModule["default"].Radio
    }, /*#__PURE__*/React.createElement(_radio.Radio.Indicator, {
      className: isDress ? _BaseModule["default"].Indicator : _BaseModule["default"].RadioIndicator
    })), _literals["default"][lang][label] || label);
  })));
}