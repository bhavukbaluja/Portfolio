"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BaseShowImage = function BaseShowImage(_ref) {
  var imageUrl = _ref.imageUrl,
    alt = _ref.alt,
    aspectRatio = _ref.aspectRatio;
  return /*#__PURE__*/_react["default"].createElement("img", {
    src: imageUrl,
    alt: alt,
    style: {
      width: "100%",
      aspectRatio: {
        aspectRatio: aspectRatio
      },
      objectFit: "cover",
      border: "1px solid #ccc",
      borderRadius: "8px",
      height: '-webkit-fill-available'
    }
  });
};
var _default = exports["default"] = BaseShowImage;