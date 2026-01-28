"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var BasePopover = function BasePopover(_ref) {
  var id = _ref.id,
    anchorPosition = _ref.anchorPosition,
    setAnchorPosition = _ref.setAnchorPosition,
    _ref$isMobile = _ref.isMobile,
    isMobile = _ref$isMobile === void 0 ? false : _ref$isMobile,
    onClose = _ref.onClose,
    children = _ref.children,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 300 : _ref$width,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 2 : _ref$padding,
    _ref$disablePortal = _ref.disablePortal,
    disablePortal = _ref$disablePortal === void 0 ? false : _ref$disablePortal;
  var open = Boolean(anchorPosition);
  var handleClose = function handleClose() {
    var forceClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!forceClose && isMobile) return;
    setAnchorPosition(null);
    onClose === null || onClose === void 0 || onClose();
  };
  return /*#__PURE__*/_react["default"].createElement(_material.Popover, {
    id: id,
    open: open,
    disablePortal: disablePortal,
    anchorReference: "anchorPosition",
    anchorPosition: anchorPosition,
    onClose: function onClose() {
      return handleClose(false);
    },
    disableAutoFocus: true,
    disableEnforceFocus: true,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    style: {
      pointerEvents: 'auto'
    },
    PaperProps: {
      // onMouseLeave: !isMobile ? () => handleClose(true) : undefined,
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      style: {
        padding: 16,
        width: width,
        overflow: 'visible'
      }
    },
    onTouchStart: function onTouchStart(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      width: '270px',
      padding: 2
    }
  }, children));
};
var _default = exports["default"] = BasePopover;