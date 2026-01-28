"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseAccordian;
var React = _interopRequireWildcard(require("react"));
var _accordion = require("@base-ui-components/react/accordion");
var _AccordianModule = _interopRequireDefault(require("./Accordian.module.scss"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function BaseAccordian(_ref) {
  var title = _ref.title,
    items = _ref.items;
  return /*#__PURE__*/React.createElement(_accordion.Accordion.Root, {
    className: _AccordianModule["default"].Accordion
  }, /*#__PURE__*/React.createElement(_accordion.Accordion.Item, {
    className: _AccordianModule["default"].Item
  }, /*#__PURE__*/React.createElement(_accordion.Accordion.Header, {
    className: _AccordianModule["default"].Header
  }, /*#__PURE__*/React.createElement(_accordion.Accordion.Trigger, {
    className: _AccordianModule["default"].Trigger
  }, title, /*#__PURE__*/React.createElement(PlusIcon, {
    className: _AccordianModule["default"].TriggerIcon
  }))), /*#__PURE__*/React.createElement(_accordion.Accordion.Panel, {
    className: _AccordianModule["default"].Panel
  }, /*#__PURE__*/React.createElement("ul", {
    className: "footer-links-contents-mobile"
  }, items.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: "footer-links"
    }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
      to: item.path,
      className: "footer-links"
    }, /*#__PURE__*/React.createElement("span", {
      className: "Nav-text"
    }, item.label)));
  })))));
}
function PlusIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 12 12",
    fill: "currentcolor"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z"
  }));
}