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
exports.AuthProvider = exports.AuthContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _API_Helper = require("./API_Helper");
var _CallApi = require("../CallApi");
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
var AuthContext = exports.AuthContext = /*#__PURE__*/(0, _react.createContext)();
var AuthProvider = exports.AuthProvider = function AuthProvider(_ref) {
  var children = _ref.children;
  var _useState = (0, _react.useState)((0, _API_Helper.getUserInfo)()),
    _useState2 = _slicedToArray(_useState, 2),
    user = _useState2[0],
    setUser = _useState2[1];
  var _useCallApi = (0, _CallApi.useCallApi)(),
    CallApi = _useCallApi.CallApi;
  var _useState3 = (0, _react.useState)((0, _API_Helper.getAuthToken)()),
    _useState4 = _slicedToArray(_useState3, 2),
    token = _useState4[0],
    setToken = _useState4[1];
  var _useState5 = (0, _react.useState)((0, _API_Helper.getCartItemsFromCookies)()),
    _useState6 = _slicedToArray(_useState5, 2),
    cartItems = _useState6[0],
    setCartItems = _useState6[1]; // Initialize cart from cookies

  // Update state on login
  var setLogin = function setLogin(userData, tokenData) {
    (0, _API_Helper.setUserInfo)(userData);
    (0, _API_Helper.setAuthToken)(tokenData);
    setUser(userData);
    setToken(tokenData);

    // Save cart items to the backend on login
    if (userData && cartItems.length > 0) {
      (0, _API_Helper.saveCartItemsToDatabase)(CallApi, userData === null || userData === void 0 ? void 0 : userData.id, cartItems);
    }

    // Clear cart items from cookies after sync
    (0, _API_Helper.clearCartItemsFromCookies)();
  };

  // Clear state on logout
  var logout = function logout() {
    (0, _API_Helper.removeAuthDetails)();
    setUser(null);
    setToken(null);
    setCartItems([]); // Clear cart items on logout
    (0, _API_Helper.clearCartItemsFromCookies)(); // Remove cart items from cookies
  };
  (0, _react.useEffect)(function () {
    var syncAuth = function syncAuth() {
      setUser((0, _API_Helper.getUserInfo)());
      setToken((0, _API_Helper.getAuthToken)());
      setCartItems((0, _API_Helper.getCartItemsFromCookies)()); // Sync cart items from cookies across tabs
    };
    window.addEventListener("storage", syncAuth);
    return function () {
      return window.removeEventListener("storage", syncAuth);
    };
  }, []);

  // Function to handle adding/removing items from the cart
  var updateCart = function updateCart(newCartItems) {
    setCartItems(newCartItems);
    (0, _API_Helper.setCartItemsToCookies)(newCartItems); // Update cart items in cookies
  };
  return /*#__PURE__*/_react["default"].createElement(AuthContext.Provider, {
    value: {
      user: user,
      setUser: setUser,
      token: token,
      setLogin: setLogin,
      logout: logout,
      cartItems: cartItems,
      updateCart: updateCart
    }
  }, children);
};