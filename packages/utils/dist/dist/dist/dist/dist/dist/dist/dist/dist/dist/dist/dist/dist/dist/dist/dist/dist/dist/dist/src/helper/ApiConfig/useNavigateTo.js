"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRouterDom = require("react-router-dom");
var useNavigateTo = function useNavigateTo() {
  var navigate = (0, _reactRouterDom.useNavigate)();
  var location = (0, _reactRouterDom.useLocation)();
  return function (newURL, oldURL) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var pathSegments = location.pathname.split("/").filter(Boolean);
    var lastSegment = pathSegments[pathSegments.length - 1];
    if (force || lastSegment === oldURL || lastSegment === "signup" || lastSegment === "login") {
      navigate(newURL);
    }
  };
};
var _default = exports["default"] = useNavigateTo;