"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _HomePage = _interopRequireDefault(require("../../../HomePage"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
var VerifyPage = function VerifyPage(_ref) {
  var isMobile = _ref.isMobile,
    onLoginSignupVerify = _ref.onLoginSignupVerify;
  (0, _react.useEffect)(function () {
    onLoginSignupVerify();
  }, []);
  return /*#__PURE__*/React.createElement(_HomePage["default"], {
    isMobile: isMobile
  });
};
var _default = exports["default"] = VerifyPage;