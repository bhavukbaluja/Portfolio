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
exports.OverviewIcon = OverviewIcon;
exports.PersonIcon = PersonIcon;
exports.ProjectIcon = ProjectIcon;
exports["default"] = BaseTabs;
var React = _interopRequireWildcard(require("react"));
var _tabs = require("@base-ui-components/react/tabs");
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
var _Helper = require("../../../../../utils/src/helper/Helper");
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
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function BaseTabs(_ref) {
  var _tabItems$;
  var tabItems = _ref.tabItems,
    defaultValue = _ref.defaultValue,
    sx = _ref.sx;
  return /*#__PURE__*/React.createElement(_tabs.Tabs.Root, {
    className: _BaseModule["default"].Tabs,
    defaultValue: !(0, _Helper.isEmpty)(defaultValue) ? defaultValue : ((_tabItems$ = tabItems[0]) === null || _tabItems$ === void 0 ? void 0 : _tabItems$.value) || ""
  }, /*#__PURE__*/React.createElement(_tabs.Tabs.List, {
    className: _BaseModule["default"].List,
    sx: sx
  }, tabItems.map(function (_ref2, index) {
    var label = _ref2.label,
      value = _ref2.value;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: value
    }, /*#__PURE__*/React.createElement(_tabs.Tabs.Tab, {
      className: _BaseModule["default"].Tab,
      value: value
    }, label), index < tabItems.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: _BaseModule["default"].Divider
    }));
  }), /*#__PURE__*/React.createElement(_tabs.Tabs.Indicator, {
    className: _BaseModule["default"].Indicator
  })), tabItems.map(function (_ref3) {
    var value = _ref3.value,
      PanelComponent = _ref3.PanelComponent;
    return /*#__PURE__*/React.createElement(_tabs.Tabs.Panel, {
      key: value,
      className: _BaseModule["default"].Panel,
      value: value
    }, PanelComponent);
  }));
}
function OverviewIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "40",
    height: "40",
    viewBox: "0 0 30 30",
    fill: "currentColor"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M 6 4 C 4.895 4 4 4.895 4 6 L 4 12 C 4 13.105 4.895 14 6 14 L 12 14 C 13.105 14 14 13.105 14 12 L 14 6 C 14 4.895 13.105 4 12 4 L 6 4 z M 18 4 C 16.895 4 16 4.895 16 6 L 16 12 C 16 13.105 16.895 14 18 14 L 24 14 C 25.105 14 26 13.105 26 12 L 26 6 C 26 4.895 25.105 4 24 4 L 18 4 z ..."
  }));
}
function ProjectIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "40",
    height: "40",
    viewBox: "0 0 30 30",
    fill: "currentColor"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M 14.984375 1.9863281 A 1.0001 1.0001 0 0 0 14 3 L 14 4 L 5 4 L 4 4 A 1.0001 1.0001 0 1 0 3.9804688 6 ..."
  }));
}
function PersonIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "40",
    height: "40",
    viewBox: "0 0 30 30",
    fill: "currentColor"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M8,22.141 c1.167-3.5,4.667-2.134,5.25-4.03v-1.264..."
  }));
}