"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _InfoTipIcon = _interopRequireDefault(require("../tooltip/InfoTipIcon"));
var _CustomTooltip = _interopRequireDefault(require("../tooltip/CustomTooltip"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _iconsMaterial = require("@mui/icons-material");
var _FieldMask = _interopRequireDefault(require("./FieldMask"));
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _literals = _interopRequireDefault(require("@ui/literals"));
var _excluded = ["maxLength", "fieldLabel", "hideLabel", "showRequired", "showToolTip", "showToolTipMessage", "placeHolderText", "hidePasswordIcon", "handleChange", "handleBlur", "inputProps", "inputRef", "readOnly", "multiline", "formik", "type", "showActionBtn", "handleEditBtnClick", "handleAddBtnClick", "inputPropsOption", "loading", "styles", "handleFldClick", "labelProps", "showHelpText"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var BaseTextField = /*#__PURE__*/React.memo(function BaseTextField(_ref) {
  var maxLength = _ref.maxLength,
    fieldLabel = _ref.fieldLabel,
    hideLabel = _ref.hideLabel,
    showRequired = _ref.showRequired,
    showToolTip = _ref.showToolTip,
    showToolTipMessage = _ref.showToolTipMessage,
    placeHolderText = _ref.placeHolderText,
    hidePasswordIcon = _ref.hidePasswordIcon,
    handleChange = _ref.handleChange,
    handleBlur = _ref.handleBlur,
    inputProps = _ref.inputProps,
    inputRef = _ref.inputRef,
    readOnly = _ref.readOnly,
    multiline = _ref.multiline,
    formik = _ref.formik,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "text" : _ref$type,
    showActionBtn = _ref.showActionBtn,
    handleEditBtnClick = _ref.handleEditBtnClick,
    handleAddBtnClick = _ref.handleAddBtnClick,
    _ref$inputPropsOption = _ref.inputPropsOption,
    inputPropsOption = _ref$inputPropsOption === void 0 ? "" : _ref$inputPropsOption,
    _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$styles = _ref.styles,
    styles = _ref$styles === void 0 ? {} : _ref$styles,
    handleFldClick = _ref.handleFldClick,
    _ref$labelProps = _ref.labelProps,
    labelProps = _ref$labelProps === void 0 ? {} : _ref$labelProps,
    _ref$showHelpText = _ref.showHelpText,
    showHelpText = _ref$showHelpText === void 0 ? false : _ref$showHelpText,
    props = _objectWithoutProperties(_ref, _excluded);
  var _React$useContext = React.useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  var labelText = _literals["default"][lang][fieldLabel] || fieldLabel;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    showPassword = _React$useState2[0],
    setShowPassword = _React$useState2[1];
  var handleClick = function handleClick(e) {
    if (handleFldClick) {
      handleFldClick(e);
    }
  };
  var handleClickShowPassword = function handleClickShowPassword() {
    return setShowPassword(function (show) {
      return !show;
    });
  };
  var handleMouseDownPassword = function handleMouseDownPassword(event) {
    event.preventDefault();
  };
  var handleMouseUpPassword = function handleMouseUpPassword(event) {
    event.preventDefault();
  };
  var LabelPropsObj = _objectSpread({
    htmlFor: props.id
  }, labelProps);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !hideLabel && /*#__PURE__*/React.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(_material.Tooltip, {
    title: labelText,
    arrow: true
  }, /*#__PURE__*/React.createElement(_material.InputLabel, LabelPropsObj, labelText)), showRequired && /*#__PURE__*/React.createElement("span", {
    className: "form-label-required-field"
  }, "*"), showToolTip && /*#__PURE__*/React.createElement(_InfoTipIcon["default"], {
    tipMsg: showToolTipMessage,
    anchorHorizontal: props === null || props === void 0 ? void 0 : props.anchorHorizontal,
    transformHorizontal: props === null || props === void 0 ? void 0 : props.transformHorizontal
  })), /*#__PURE__*/React.createElement(_material.Stack, {
    direction: "row",
    gap: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    sx: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(_material.TextField, _extends({
    fullWidth: true
  }, props, {
    size: "small",
    variant: "outlined",
    placeholder: _literals["default"][lang][placeHolderText] || placeHolderText,
    onChange: handleChange,
    onBlur: handleBlur,
    multiline: multiline,
    rows: multiline ? props !== null && props !== void 0 && props.rows ? props === null || props === void 0 ? void 0 : props.rows : 3 : undefined,
    autoComplete: "off",
    inputRef: inputRef,
    onClick: handleClick,
    sx: {
      background: "#fff"
    },
    InputProps: inputPropsOption || _objectSpread(_objectSpread({}, inputProps), {}, {
      ref: inputRef,
      maxLength: maxLength,
      readOnly: readOnly,
      type: multiline ? undefined : showPassword ? "text" : type,
      endAdornment: type == "password" && !hidePasswordIcon ? /*#__PURE__*/React.createElement(_material.InputAdornment, {
        position: "end"
      }, /*#__PURE__*/React.createElement(_material.IconButton, {
        "aria-label": "toggle password visibility",
        onClick: handleClickShowPassword,
        onMouseDown: handleMouseDownPassword,
        onMouseUp: handleMouseUpPassword,
        disabled: readOnly
      }, showPassword ? /*#__PURE__*/React.createElement(_iconsMaterial.VisibilityOff, null) : /*#__PURE__*/React.createElement(_iconsMaterial.Visibility, null))) : ""
    })
  })), showActionBtn && /*#__PURE__*/React.createElement(_CustomTooltip["default"], {
    title: props !== null && props !== void 0 && props.value ? "edit" : "addButton"
  }, /*#__PURE__*/React.createElement(_material.IconButton, {
    className: "adp-btn-dark rounded-icon-btn",
    onClick: props !== null && props !== void 0 && props.value ? handleEditBtnClick : handleAddBtnClick
  }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
    size: "sm",
    icon: props !== null && props !== void 0 && props.value ? _freeSolidSvgIcons.faPen : _freeSolidSvgIcons.faPlus
  }))), loading && /*#__PURE__*/React.createElement(_FieldMask["default"], null)));
});
var _default = exports["default"] = BaseTextField;