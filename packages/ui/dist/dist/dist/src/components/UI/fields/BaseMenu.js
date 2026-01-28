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
exports["default"] = BaseMenu;
var _react = _interopRequireWildcard(require("react"));
var _menu = require("@base-ui-components/react/menu");
var _indexModule = _interopRequireDefault(require("./index.module.scss"));
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
function BaseMenu(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Menu" : _ref$title,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    onSelect = _ref.onSelect,
    selectedItem = _ref.selectedItem;
  var handleSelect = function handleSelect(item) {
    onSelect(item);
    // closeMenu(); // Close the menu after selection
  };
  return /*#__PURE__*/_react["default"].createElement(_menu.Menu.Root, null, /*#__PURE__*/_react["default"].createElement(_menu.Menu.Trigger, {
    className: _indexModule["default"].Button
  }, (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.label) || title, " ", /*#__PURE__*/_react["default"].createElement(ChevronDownIcon, {
    className: _indexModule["default"].ButtonIcon
  })), /*#__PURE__*/_react["default"].createElement(_menu.Menu.Portal, null, /*#__PURE__*/_react["default"].createElement(_menu.Menu.Positioner, {
    className: _indexModule["default"].Positioner,
    sideOffset: 8
  }, /*#__PURE__*/_react["default"].createElement(_menu.Menu.Popup, {
    className: _indexModule["default"].Popup
  }, /*#__PURE__*/_react["default"].createElement(_menu.Menu.Arrow, {
    className: _indexModule["default"].Arrow
  }), items === null || items === void 0 ? void 0 : items.map(function (item, index) {
    return item !== null && item !== void 0 && item.separator ? /*#__PURE__*/_react["default"].createElement(_menu.Menu.Separator, {
      key: index,
      className: _indexModule["default"].Separator
    }) : /*#__PURE__*/_react["default"].createElement(_menu.Menu.Item, {
      key: index,
      className: "".concat(_indexModule["default"] === null || _indexModule["default"] === void 0 ? void 0 : _indexModule["default"].Item, " ").concat((selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.label) === (item === null || item === void 0 ? void 0 : item.label) ? _indexModule["default"] === null || _indexModule["default"] === void 0 ? void 0 : _indexModule["default"].Selected : ''),
      onClick: function onClick() {
        return handleSelect(item);
      }
    }, item === null || item === void 0 ? void 0 : item.label);
  })))));
}

// SVG Components
function ArrowSvg(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    width: "20",
    height: "10",
    viewBox: "0 0 20 10",
    fill: "none"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z",
    className: _indexModule["default"].ArrowFill
  }));
}
function ChevronDownIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    width: "10",
    height: "10",
    viewBox: "0 0 10 10",
    fill: "none"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M1 3.5L5 7.5L9 3.5",
    stroke: "currentcolor",
    strokeWidth: "1.5"
  }));
}