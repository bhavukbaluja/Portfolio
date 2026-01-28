"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactPhoneInput = _interopRequireDefault(require("react-phone-input-2"));
require("react-phone-input-2/lib/style.css");
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _Helper = require("@utils/helper/Helper");
var _field = require("@base-ui-components/react/field");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Ensure default styles are loaded
var BaseMobileField = function BaseMobileField(_ref) {
  var formData = _ref.formData,
    setFormData = _ref.setFormData,
    errors = _ref.errors,
    setErrors = _ref.setErrors,
    required = _ref.required,
    label = _ref.label,
    description = _ref.description,
    name = _ref.name;
  var _useContext = (0, _react.useContext)(_LanguageProvider.LanguageContext),
    lang = _useContext.lang;
  if ((0, _Helper.isEmpty)(formData === null || formData === void 0 ? void 0 : formData.mobile)) {
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        mobile: "+91"
      });
    });
  }
  var handlePhoneChange = function handlePhoneChange(value, country) {
    var error = "";
    var cleanedNumber = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    var fullNumber = "+".concat(cleanedNumber); // Store full number with country code

    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        mobile: fullNumber
      });
    });
    var nationalNumber = cleanedNumber.slice(country.dialCode.length);
    if (!nationalNumber.trim()) {
      if (required) {
        error = "This field is required.";
      }
    } else if (!/^\d{7,15}$/.test(nationalNumber)) {
      error = "Invalid mobile number (7-15 digits required).";
    }
    setErrors(function (prevErrors) {
      var newErrors = _objectSpread({}, prevErrors);
      if (newErrors.hasOwnProperty("mobile")) delete newErrors["mobile"];
      if (error) newErrors["mobile"] = error;
      return newErrors;
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_field.Field.Root, {
    name: name,
    className: _BaseModule["default"].Field
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _BaseModule["default"].mobileContainer
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: _BaseModule["default"].phoneInputLabel
  }, label ? _literals["default"][lang][label] || label : _literals["default"][lang].mobile, required && /*#__PURE__*/_react["default"].createElement("span", {
    className: _BaseModule["default"].red_icon
  }, "*")), /*#__PURE__*/_react["default"].createElement("div", {
    className: _BaseModule["default"].mobileInputField
  }, /*#__PURE__*/_react["default"].createElement(_reactPhoneInput["default"], {
    country: "in",
    value: formData === null || formData === void 0 ? void 0 : formData.mobile,
    focusBlur: false,
    onChange: handlePhoneChange,
    inputProps: {
      name: "mobile",
      required: required,
      id: "mobile",
      tabIndex: -1
    },
    containerClass: _BaseModule["default"].phoneInputContainer,
    inputClass: _BaseModule["default"].phoneInputField,
    buttonClass: _BaseModule["default"].flagDropdown,
    dropdownClass: _BaseModule["default"].countryList,
    autoFormat: true,
    disableDropdown: false,
    countryCodeEditable: false,
    specialLabel: ""
  })), /*#__PURE__*/_react["default"].createElement(_field.Field.Description, {
    className: !(0, _Helper.isEmpty)(errors.mobile) ? _BaseModule["default"].Error : _BaseModule["default"].Description
  }, !(0, _Helper.isEmpty)(errors.mobile) ? errors.mobile : _literals["default"][lang][description] || description)));
};
var _default = exports["default"] = BaseMobileField;