"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Cancel = _interopRequireDefault(require("@mui/icons-material/Cancel"));
var _CheckCircle = _interopRequireDefault(require("@mui/icons-material/CheckCircle"));
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _Theme = _interopRequireDefault(require("@utils/Config/Theme"));
var _literals = _interopRequireDefault(require("@ui/literals"));
var _BaseTextField = _interopRequireDefault(require("../UI/fields/BaseTextField2"));
require("./UserActivationPage.scss");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var SetPasswordComp = function SetPasswordComp(_ref) {
  var SubmitButton = _ref.SubmitButton,
    lang = _ref.lang,
    formData = _ref.formData,
    setFormData = _ref.setFormData,
    setErrors = _ref.setErrors,
    errors = _ref.errors,
    loading = _ref.loading,
    setLoading = _ref.setLoading,
    value = _ref.value,
    showSnackBar = _ref.showSnackBar,
    setOpenAlert = _ref.setOpenAlert,
    setAlertMsg = _ref.setAlertMsg,
    loadingParam = _ref.loadingParam,
    setDialogOpen = _ref.setDialogOpen,
    action = _ref.action,
    setChildren = _ref.setChildren;
  var textRef = (0, _react.useRef)(null);
  var popperRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    strength = _useState2[0],
    setStrength = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    anchorEl = _useState4[0],
    setAnchorEl = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    openPopper = _useState6[0],
    setOpenPopper = _useState6[1];
  var mobileOrEmail = value;
  var requirements = [{
    id: 1,
    label: _literals["default"][lang].minimum8Char,
    regex: /.{8,}/
  }, {
    id: 2,
    label: _literals["default"][lang].oneUpperCase,
    regex: /[A-Z]/
  }, {
    id: 3,
    label: _literals["default"][lang].oneLowerCase,
    regex: /[a-z]/
  }, {
    id: 4,
    label: _literals["default"][lang].atLeastOneSpecialChar,
    regex: /[!@#$%^&*(),.?":{}|<>]/
  }, {
    id: 5,
    label: _literals["default"][lang].atLeastOneNumericals,
    regex: /\d/
  }];
  var checkStrength = function checkStrength(password) {
    var passed = 0;
    requirements.forEach(function (requirement) {
      if (requirement.regex.test(password)) passed += 1;
    });
    setStrength(passed / requirements.length * 100);
    if (passed / requirements.length * 100 === 100) {
      setAnchorEl(null);
      setOpenPopper(false);
    }
  };
  var handlePasswordChange = function handlePasswordChange(event) {
    var _event$target = event.target,
      name = _event$target.name,
      value = _event$target.value;
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, value));
    });
    if (name === "password") {
      handlePopperOpen(event);
      checkStrength(value);
      var _loop = function _loop() {
        var requirement = _requirements[_i];
        if (!requirement.regex.test(value)) {
          var error = _literals["default"][lang].passReqNotFulfil;
          setErrors(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, error));
          });
          return 1; // break
        } else {
          setErrors(function (prev) {
            var updated = _objectSpread({}, prev);
            delete updated[name];
            return updated;
          });
        }
      };
      for (var _i = 0, _requirements = requirements; _i < _requirements.length; _i++) {
        if (_loop()) break;
      }
    }
    if (name == "confirmPassword") {
      if ((formData === null || formData === void 0 ? void 0 : formData.password) != value) {
        var error = _literals["default"][lang].confirmPasswordNotMatchPassword;
        setErrors(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, error));
        });
      } else {
        setErrors(function (prev) {
          var updated = _objectSpread({}, prev);
          delete updated[name];
          return updated;
        });
      }
    }
  };
  var handlePopperOpen = function handlePopperOpen(event) {
    if (textRef.current) {
      setAnchorEl(textRef.current); // use ref directly instead of event.target
      setOpenPopper(true);
      textRef.current.focus();
    }
  };
  var handlePopperClose = function handlePopperClose(event) {
    var _popperRef$current, _textRef$current;
    if (popperRef.current && !(popperRef !== null && popperRef !== void 0 && (_popperRef$current = popperRef.current) !== null && _popperRef$current !== void 0 && _popperRef$current.contains(event === null || event === void 0 ? void 0 : event.relatedTarget)) && !(textRef !== null && textRef !== void 0 && (_textRef$current = textRef.current) !== null && _textRef$current !== void 0 && _textRef$current.contains(event.relatedTarget))) {
      setAnchorEl(null);
      setOpenPopper(false);
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, action == "update" && /*#__PURE__*/_react["default"].createElement(_BaseTextField["default"], {
    name: "oldPassword",
    id: "oldPassword",
    label: "oldPassword",
    required: true,
    type: "password",
    onChange: handlePasswordChange,
    errorMsg: errors === null || errors === void 0 ? void 0 : errors.oldPassword
  }), /*#__PURE__*/_react["default"].createElement(_material.ClickAwayListener, {
    onClickAway: handlePopperClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "password-comp-div"
  }, /*#__PURE__*/_react["default"].createElement(_BaseTextField["default"], {
    inputRef: textRef,
    name: "password",
    id: "password",
    label: "password",
    required: true,
    type: "password",
    onChange: handlePasswordChange,
    onBlur: handlePopperClose,
    errorMsg: errors === null || errors === void 0 ? void 0 : errors.password
  }), /*#__PURE__*/_react["default"].createElement(_material.Popper, {
    sx: {
      marginTop: "1px !important",
      zIndex: 1500
    },
    open: openPopper,
    anchorEl: anchorEl,
    "data-testid": "password-popper",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    transition: true
  }, function (_ref2) {
    var TransitionProps = _ref2.TransitionProps,
      placement = _ref2.placement;
    return /*#__PURE__*/_react["default"].createElement(_material.Grow, _extends({}, TransitionProps, {
      id: "password-popper",
      style: {
        transformOrigin: placement === "bottom" ? "top left" : "bottom left"
      }
    }), /*#__PURE__*/_react["default"].createElement(_material.Paper, null, /*#__PURE__*/_react["default"].createElement(_material.Box, {
      ref: popperRef,
      sx: {
        background: "#f8f9fa",
        padding: "10px",
        borderRadius: "5px"
      }
    }, requirements.map(function (requirement) {
      return /*#__PURE__*/_react["default"].createElement(_material.Typography, {
        key: requirement.id,
        sx: {
          display: "flex",
          alignItems: "center",
          color: requirement.regex.test(formData === null || formData === void 0 ? void 0 : formData.password) ? _Theme["default"].colors.success : _Theme["default"].colors.danger
        }
      }, requirement.regex.test(formData === null || formData === void 0 ? void 0 : formData.password) ? /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
        fontSize: "small"
      }) : /*#__PURE__*/_react["default"].createElement(_Cancel["default"], {
        fontSize: "small"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          marginLeft: "8px"
        }
      }, requirement.label));
    }), /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        marginTop: "10px"
      }
    }, /*#__PURE__*/_react["default"].createElement(_material.Typography, null, _literals["default"].passwordStrength), /*#__PURE__*/_react["default"].createElement(_material.LinearProgress, {
      variant: "determinate",
      value: strength,
      "aria-valuenow": strength,
      "data-testid": "password-progressbar"
    })))));
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "password-comp-div"
  }, /*#__PURE__*/_react["default"].createElement(_BaseTextField["default"], {
    name: "confirmPassword",
    id: "confirmPassword",
    label: "confirmPassword",
    required: true,
    type: "password",
    onChange: handlePasswordChange,
    errorMsg: errors === null || errors === void 0 ? void 0 : errors.confirmPassword
  })), /*#__PURE__*/_react["default"].createElement(_material.Box, {
    className: "submit-button"
  }, SubmitButton));
};
var _default = exports["default"] = SetPasswordComp;