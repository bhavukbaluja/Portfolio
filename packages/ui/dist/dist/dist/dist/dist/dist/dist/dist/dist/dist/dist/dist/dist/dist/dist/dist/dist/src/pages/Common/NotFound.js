"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _NotFoundImage = _interopRequireDefault(require("@ui/assets/NotFoundImage2.png"));
require("./Common.scss");
var _useNavigateTo = _interopRequireDefault(require("@utils/helper/ApiConfig/useNavigateTo"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
var NotFound = function NotFound() {
  var NavigateTo = (0, _useNavigateTo["default"])();
  var _useContext = (0, _react.useContext)(_LanguageProvider.LanguageContext),
    lang = _useContext.lang;
  return /*#__PURE__*/React.createElement("div", {
    className: "notFound"
  }, /*#__PURE__*/React.createElement("img", {
    src: _NotFoundImage["default"],
    style: {
      height: '60vh'
    }
  }), /*#__PURE__*/React.createElement("p", null, _literals["default"][lang].brokenLinkMsg1), /*#__PURE__*/React.createElement("p", null, _literals["default"][lang].brokenLinkMsg2), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "form-button",
    onClick: function onClick() {
      return NavigateTo("/", "", true);
    }
  }, _literals["default"][lang].backToHome));
};
var _default = exports["default"] = NotFound;