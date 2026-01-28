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
var _BaseDialog = _interopRequireDefault(require("@ui/components/UI/fields/BaseDialog"));
var _BaseTabs = _interopRequireDefault(require("@ui/components/UI/fields/BaseTabs"));
var _Signup = _interopRequireDefault(require("./Signup"));
var _Login = _interopRequireDefault(require("./Login"));
var _CustomBackdrop = _interopRequireDefault(require("@ui/components/UI/widgets/CustomBackdrop"));
var _CustomAlertBox = _interopRequireDefault(require("@ui/components/UI/widgets/CustomAlertBox"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _literals = _interopRequireDefault(require("@ui/literals"));
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
var Login_Signup = function Login_Signup(_ref) {
  var open = _ref.open,
    setOpen = _ref.setOpen,
    action = _ref.action,
    showSnackBar = _ref.showSnackBar,
    setImageRefreshKey = _ref.setImageRefreshKey;
  var _React$useContext = _react["default"].useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    openAlert = _useState4[0],
    setOpenAlert = _useState4[1];
  var _useState5 = (0, _react.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    alertMsg = _useState6[0],
    setAlertMsg = _useState6[1];
  var _useState7 = (0, _react.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    alertTitle = _useState8[0],
    setAlertTitle = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    children = _useState10[0],
    setChildren = _useState10[1];
  if (action != "login" && action != "signup") {
    action = "signup";
  }
  var BodyComponent = function BodyComponent() {
    var tabItems = [{
      label: _literals["default"][lang].login,
      value: "login",
      PanelComponent: /*#__PURE__*/_react["default"].createElement(_Login["default"], {
        loading: loading,
        setAlertTitle: setAlertTitle,
        setLoading: setLoading,
        setAlertMsg: setAlertMsg,
        setOpenAlert: setOpenAlert,
        setChildren: setChildren,
        showSnackBar: showSnackBar,
        setDialogOpen: setOpen,
        action: action,
        setImageRefreshKey: setImageRefreshKey
      })
    }, {
      label: _literals["default"][lang].signup,
      value: "signup",
      PanelComponent: /*#__PURE__*/_react["default"].createElement(_Signup["default"], {
        loading: loading,
        setAlertTitle: setAlertTitle,
        setLoading: setLoading,
        setAlertMsg: setAlertMsg,
        setOpenAlert: setOpenAlert,
        setChildren: setChildren,
        showSnackBar: showSnackBar,
        setDialogOpen: setOpen,
        action: action,
        setImageRefreshKey: setImageRefreshKey
      })
    }];
    return /*#__PURE__*/_react["default"].createElement(_BaseTabs["default"], {
      tabItems: tabItems,
      defaultValue: action,
      sx: {
        width: 'auto',
        maxWidth: '80vw',
        minWidth: '600px'
      }
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_BaseDialog["default"], {
    open: open,
    setOpen: setOpen,
    bodyComponent: BodyComponent()
  }), /*#__PURE__*/_react["default"].createElement(_CustomBackdrop["default"], {
    loading: loading
  }), /*#__PURE__*/_react["default"].createElement(_CustomAlertBox["default"], {
    Msg: alertMsg,
    open: openAlert,
    setOpen: setOpenAlert,
    children: children
  }));
};
var _default = exports["default"] = Login_Signup;