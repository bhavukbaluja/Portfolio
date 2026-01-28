"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _material = require("@mui/material");
var _react = require("react");
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
var SuggestionList = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    selectedIndex = _useState2[0],
    setSelectedIndex = _useState2[1];
  var selectItem = function selectItem(index) {
    if (index >= props.items.length) return;
    var suggestion = props.items[index];
    var mentionItem = {
      id: suggestion.id,
      label: suggestion.mentionLabel
    };
    props.command(mentionItem);
  };
  var upHandler = function upHandler() {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };
  var downHandler = function downHandler() {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };
  var enterHandler = function enterHandler() {
    selectItem(selectedIndex);
  };
  (0, _react.useEffect)(function () {
    return setSelectedIndex(0);
  }, [props.items]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      onKeyDown: function onKeyDown(_ref) {
        var event = _ref.event;
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }
        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }
        if (event.key === "Enter") {
          enterHandler();
          return true;
        }
        return false;
      }
    };
  });
  return props.items.length > 0 ? /*#__PURE__*/React.createElement(_material.Paper, {
    elevation: 5
  }, /*#__PURE__*/React.createElement(_material.List, {
    dense: true,
    sx: {
      overflow: "hidden"
    }
  }, props.items.map(function (item, index) {
    return /*#__PURE__*/React.createElement(_material.ListItem, {
      key: item.id,
      disablePadding: true
    }, /*#__PURE__*/React.createElement(_material.ListItemButton, {
      selected: index === selectedIndex,
      onClick: function onClick() {
        return selectItem(index);
      }
    }, item.mentionLabel));
  }))) : null;
});
SuggestionList.displayName = "SuggestionList";
var _default = exports["default"] = SuggestionList;