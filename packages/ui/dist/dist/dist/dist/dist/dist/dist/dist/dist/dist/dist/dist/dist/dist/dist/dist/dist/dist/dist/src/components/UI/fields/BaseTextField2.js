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
exports["default"] = BaseTextField2;
var React = _interopRequireWildcard(require("react"));
var _field = require("@base-ui-components/react/field");
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
var _literals = _interopRequireDefault(require("../../../literals"));
var _LanguageProvider = require("../../../literals/LanguageProvider");
var _Helper = require("../../../../../utils/src/helper/Helper");
var _iconsMaterial = require("@mui/icons-material");
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
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
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function BaseTextField2(_ref) {
  var label = _ref.label,
    placeHolderText = _ref.placeHolderText,
    description = _ref.description,
    errorMsg = _ref.errorMsg,
    required = _ref.required,
    sx = _ref.sx,
    name = _ref.name,
    value = _ref.value,
    _onChange = _ref.onChange,
    type = _ref.type,
    inputRef = _ref.inputRef,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus;
  var _React$useContext = React.useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    showPassword = _React$useState2[0],
    setShowPassword = _React$useState2[1];
  return /*#__PURE__*/React.createElement(_field.Field.Root, {
    name: name,
    className: _BaseModule["default"].Field,
    sx: sx
  }, /*#__PURE__*/React.createElement(_field.Field.Label, {
    className: _BaseModule["default"].Label
  }, _literals["default"][lang][label] || label, required && /*#__PURE__*/React.createElement("span", {
    className: _BaseModule["default"].red_icon
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: _BaseModule["default"].inputWrapper
  }, /*#__PURE__*/React.createElement(_field.Field.Control, {
    required: required,
    placeholder: _literals["default"][lang][placeHolderText] || placeHolderText,
    className: "".concat(_BaseModule["default"].Input, " ").concat(type === "password" && !showPassword ? _BaseModule["default"].passwordInput : ""),
    value: value,
    onChange: function onChange(e) {
      return _onChange({
        target: {
          name: name,
          value: e.target.value
        }
      });
    },
    onBlur: onBlur // Set onBlur handler
    ,

    onFocus: onFocus,
    type: type === "password" && !showPassword ? "password" : "text",
    ref: inputRef // Assign ref to the input
  }), type === "password" && /*#__PURE__*/React.createElement(_IconButton["default"], {
    onClick: function onClick() {
      return setShowPassword(function (prev) {
        return !prev;
      });
    },
    className: _BaseModule["default"].eyeIcon,
    tabIndex: -1
  }, showPassword ? /*#__PURE__*/React.createElement(_iconsMaterial.VisibilityOff, null) : /*#__PURE__*/React.createElement(_iconsMaterial.Visibility, null))), /*#__PURE__*/React.createElement(_field.Field.Description, {
    className: !(0, _Helper.isEmpty)(errorMsg) ? _BaseModule["default"].Error : _BaseModule["default"].Description
  }, !(0, _Helper.isEmpty)(errorMsg) ? errorMsg : _literals["default"][lang][description] || description));
}