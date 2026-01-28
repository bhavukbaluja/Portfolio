"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
exports.id = 997, exports.ids = [997], exports.modules = {
  674: function _(e, r, o) {
    "use strict";

    o.d(r, {
      A: function A() {
        return c;
      }
    });
    var a = o(8732),
      s = o(2015);
    !function () {
      var e = Error("Cannot find module '@base-ui-components/react/field'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var n = o(3987),
      t = o.n(n),
      i = o(1155),
      l = o(1819),
      d = o(9029);
    function c(_ref) {
      var e = _ref.label,
        r = _ref.placeHolderText,
        o = _ref.description,
        n = _ref.errorMsg,
        c = _ref.required,
        u = _ref.sx,
        m = _ref.name,
        p = _ref.value,
        _ = _ref.onChange,
        b = _ref.type,
        O = _ref.inputRef,
        w = _ref.onBlur,
        h = _ref.onFocus;
      var _s$useContext = s.useContext(l.s),
        f = _s$useContext.lang,
        _s$useState = s.useState(!1),
        _s$useState2 = _slicedToArray(_s$useState, 2),
        j = _s$useState2[0],
        x = _s$useState2[1];
      return (0, a.jsxs)(Object(function () {
        var e = Error("Cannot find module '@base-ui-components/react/field'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }()).Root, {
        name: m,
        className: t().Field,
        sx: u,
        children: [(0, a.jsxs)(Object(function () {
          var e = Error("Cannot find module '@base-ui-components/react/field'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()).Label, {
          className: t().Label,
          children: [i.A[f][e] || e, c && (0, a.jsx)("span", {
            className: t().red_icon,
            children: "*"
          })]
        }), (0, a.jsxs)("div", {
          className: t().inputWrapper,
          children: [(0, a.jsx)(Object(function () {
            var e = Error("Cannot find module '@base-ui-components/react/field'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()).Control, {
            required: c,
            placeholder: i.A[f][r] || r,
            className: "".concat(t().Input, " ").concat("password" === b && !j ? t().passwordInput : ""),
            value: p,
            onChange: function onChange(e) {
              return _({
                target: {
                  name: m,
                  value: e.target.value
                }
              });
            },
            onBlur: w,
            onFocus: h,
            type: "password" !== b || j ? "text" : "password",
            ref: O
          }), "password" === b && (0, a.jsx)(Object(function () {
            var e = Error("Cannot find module '@mui/material/IconButton'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()), {
            onClick: function onClick() {
              return x(function (e) {
                return !e;
              });
            },
            className: t().eyeIcon,
            tabIndex: -1,
            children: j ? (0, a.jsx)(Object(function () {
              var e = Error("Cannot find module '__barrel_optimize__?names=Visibility,VisibilityOff!=!@mui/icons-material'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()), {}) : (0, a.jsx)(Object(function () {
              var e = Error("Cannot find module '__barrel_optimize__?names=Visibility,VisibilityOff!=!@mui/icons-material'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()), {})
          })]
        }), (0, a.jsx)(Object(function () {
          var e = Error("Cannot find module '@base-ui-components/react/field'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()).Description, {
          className: (0, d.Im)(n) ? t().Description : t().Error,
          children: (0, d.Im)(n) ? i.A[f][o] || o : n
        })]
      });
    }
    !function () {
      var e = Error("Cannot find module '__barrel_optimize__?names=Visibility,VisibilityOff!=!@mui/icons-material'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), function () {
      var e = Error("Cannot find module '@mui/material/IconButton'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
  },
  1819: function _(e, r, o) {
    "use strict";

    o.d(r, {
      s: function s() {
        return a;
      }
    }), o(8732);
    var a = (0, o(2015).createContext)();
  },
  3039: function _(e, r, o) {
    "use strict";

    o.d(r, {
      G: function G() {
        return s;
      }
    });
    var a = o(4233);
    var s = function s() {
      var _ref2 = (0, a.w)(),
        e = _ref2.CallApi;
      return {
        getAboutUs: function () {
          var _getAboutUs = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(r, o) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return e(r, "GET", o);
                case 2:
                  return _context.abrupt("return", _context.sent);
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function getAboutUs(_x, _x2) {
            return _getAboutUs.apply(this, arguments);
          }
          return getAboutUs;
        }(),
        register: function () {
          var _register = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(r, o) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return e(r, "POST", o);
                case 2:
                  return _context2.abrupt("return", _context2.sent);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function register(_x3, _x4) {
            return _register.apply(this, arguments);
          }
          return register;
        }(),
        validateOtp: function () {
          var _validateOtp = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(r, o) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return e(r, "POST", o);
                case 2:
                  return _context3.abrupt("return", _context3.sent);
                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          function validateOtp(_x5, _x6) {
            return _validateOtp.apply(this, arguments);
          }
          return validateOtp;
        }(),
        login: function () {
          var _login = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(r, o) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return e(r, "POST", o);
                case 2:
                  return _context4.abrupt("return", _context4.sent);
                case 3:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));
          function login(_x7, _x8) {
            return _login.apply(this, arguments);
          }
          return login;
        }(),
        updateAboutUs: function () {
          var _updateAboutUs = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(r, o) {
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return e(r, "POST", o);
                case 2:
                  return _context5.abrupt("return", _context5.sent);
                case 3:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));
          function updateAboutUs(_x9, _x10) {
            return _updateAboutUs.apply(this, arguments);
          }
          return updateAboutUs;
        }(),
        updateDetails: function () {
          var _updateDetails = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(r, o) {
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return e(r, "POST", o);
                case 2:
                  return _context6.abrupt("return", _context6.sent);
                case 3:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));
          function updateDetails(_x11, _x12) {
            return _updateDetails.apply(this, arguments);
          }
          return updateDetails;
        }()
      };
    };
  },
  3987: function _() {
    throw Error("Module build failed (from ../../node_modules/next/dist/compiled/sass-loader/cjs.js):\nError: Cannot find module 'sass'\nRequire stack:\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/sass-loader/cjs.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/loader-runner/LoaderRunner.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/webpack/bundle5.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/webpack/webpack.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/shared/lib/get-webpack-bundler.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/build/compiler.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/build/webpack-build/impl.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/jest-worker/processChild.js\n    at Function.<anonymous> (node:internal/modules/cjs/loader:1244:15)\n    at /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/server/require-hook.js:55:36\n    at Function._load (node:internal/modules/cjs/loader:1070:27)\n    at TracingChannel.traceSync (node:diagnostics_channel:322:14)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:217:24)\n    at Module.<anonymous> (node:internal/modules/cjs/loader:1335:12)\n    at mod.require (/Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/server/require-hook.js:65:28)\n    at require (node:internal/modules/helpers:136:16)\n    at 438 (/Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/sass-loader/cjs.js:1:12362)\n    at __nccwpck_require__ (/Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/sass-loader/cjs.js:1:14176)");
  },
  4706: function _() {},
  9997: function _(e, r, o) {
    "use strict";

    o.r(r), o.d(r, {
      "default": function _default() {
        return _;
      }
    });
    var a = o(8732),
      s = o(2015),
      n = o.n(s),
      t = o(1155),
      i = o(1819);
    function l() {
      var _n$useContext = n().useContext(i.s),
        e = _n$useContext.lang;
      return (0, a.jsxs)("div", {
        children: [(0, a.jsx)("div", {
          className: "password-req-header",
          children: (0, a.jsxs)("span", {
            variant: "h7",
            children: [t.A[e].passwordRequirementMsg, ":"]
          })
        }), (0, a.jsxs)("ul", {
          className: "password-req-list",
          children: [(0, a.jsx)("li", {
            className: "password-req-list-li",
            children: (0, a.jsxs)("span", {
              children: ["Aa (", t.A[e].upperLowerCase, ")"]
            })
          }), (0, a.jsx)("li", {
            className: "password-req-list-li",
            children: (0, a.jsxs)("span", {
              children: ["13 (", t.A[e].numericals, ")"]
            })
          }), (0, a.jsx)("li", {
            className: "password-req-list-li",
            children: (0, a.jsxs)("span", {
              children: ["@! (", t.A[e].specialChar, ")"]
            })
          })]
        })]
      });
    }
    o(4706);
    var d = o(674);
    !function () {
      var e = Error("Cannot find module '@mui/icons-material/Cancel'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), function () {
      var e = Error("Cannot find module '@mui/icons-material/CheckCircle'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), function () {
      var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), function () {
      var e = Error("Cannot find module '../../../Config/Theme'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var c = function c(_ref3) {
      var e = _ref3.SubmitButton,
        r = _ref3.lang,
        o = _ref3.formData,
        n = _ref3.setFormData,
        i = _ref3.setErrors,
        l = _ref3.errors,
        c = _ref3.loading,
        u = _ref3.setLoading,
        m = _ref3.value,
        p = _ref3.showSnackBar,
        _ = _ref3.setOpenAlert,
        b = _ref3.setAlertMsg,
        O = _ref3.loadingParam,
        w = _ref3.setDialogOpen,
        h = _ref3.action,
        f = _ref3.setChildren;
      var j = (0, s.useRef)(null),
        x = (0, s.useRef)(null),
        _ref4 = (0, s.useState)(0),
        _ref5 = _slicedToArray(_ref4, 2),
        U = _ref5[0],
        C = _ref5[1],
        _ref6 = (0, s.useState)(null),
        _ref7 = _slicedToArray(_ref6, 2),
        N = _ref7[0],
        g = _ref7[1],
        _ref8 = (0, s.useState)(!1),
        _ref9 = _slicedToArray(_ref8, 2),
        E = _ref9[0],
        D = _ref9[1],
        v = [{
          id: 1,
          label: t.A[r].minimum8Char,
          regex: /.{8,}/
        }, {
          id: 2,
          label: t.A[r].oneUpperCase,
          regex: /[A-Z]/
        }, {
          id: 3,
          label: t.A[r].oneLowerCase,
          regex: /[a-z]/
        }, {
          id: 4,
          label: t.A[r].atLeastOneSpecialChar,
          regex: /[!@#$%^&*(),.?":{}|<>]/
        }, {
          id: 5,
          label: t.A[r].atLeastOneNumericals,
          regex: /\d/
        }],
        y = function y(e) {
          var r = 0;
          v.forEach(function (o) {
            o.regex.test(e) && (r += 1);
          }), C(r / v.length * 100), r / v.length * 100 == 100 && (g(null), D(!1));
        },
        L = function L(e) {
          var _e$target = e.target,
            a = _e$target.name,
            s = _e$target.value;
          if (n(function (e) {
            return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, a, s));
          }), "password" === a) {
            var _loop = function _loop() {
              var o = _arr[_i];
              if (o.regex.test(s)) i(function (e) {
                var r = _objectSpread({}, e);
                return delete r[a], r;
              });else {
                var _e = t.A[r].passReqNotFulfil;
                i(function (r) {
                  return _objectSpread(_objectSpread({}, r), {}, _defineProperty({}, a, _e));
                });
                return 1; // break
              }
            };
            for (var _i = 0, _arr = (P(e), y(s), v); _i < _arr.length; _i++) {
              if (_loop()) break;
            }
          }
          if ("confirmPassword" == a) if ((o === null || o === void 0 ? void 0 : o.password) != s) {
            var _e2 = t.A[r].confirmPasswordNotMatchPassword;
            i(function (r) {
              return _objectSpread(_objectSpread({}, r), {}, _defineProperty({}, a, _e2));
            });
          } else i(function (e) {
            var r = _objectSpread({}, e);
            return delete r[a], r;
          });
        },
        P = function P(e) {
          j.current && (g(j.current), D(!0), j.current.focus());
        },
        T = function T(e) {
          var _x$current, _j$current;
          !x.current || (x === null || x === void 0 || (_x$current = x.current) === null || _x$current === void 0 ? void 0 : _x$current.contains(e === null || e === void 0 ? void 0 : e.relatedTarget)) || (j === null || j === void 0 || (_j$current = j.current) === null || _j$current === void 0 ? void 0 : _j$current.contains(e.relatedTarget)) || (g(null), D(!1));
        };
      return (0, a.jsxs)(a.Fragment, {
        children: ["update" == h && (0, a.jsx)(d.A, {
          name: "oldPassword",
          id: "oldPassword",
          label: "oldPassword",
          required: !0,
          type: "password",
          onChange: L,
          errorMsg: l === null || l === void 0 ? void 0 : l.oldPassword
        }), (0, a.jsx)(Object(function () {
          var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          onClickAway: T,
          children: (0, a.jsxs)("div", {
            className: "password-comp-div",
            children: [(0, a.jsx)(d.A, {
              inputRef: j,
              name: "password",
              id: "password",
              label: "password",
              required: !0,
              type: "password",
              onChange: L,
              onBlur: T,
              errorMsg: l === null || l === void 0 ? void 0 : l.password
            }), (0, a.jsx)(Object(function () {
              var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()), {
              sx: {
                marginTop: "1px !important",
                zIndex: 1500
              },
              open: E,
              anchorEl: N,
              "data-testid": "password-popper",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left"
              },
              transition: !0,
              children: function children(_ref10) {
                var e = _ref10.TransitionProps,
                  r = _ref10.placement;
                return (0, a.jsx)(Object(function () {
                  var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
                  throw e.code = "MODULE_NOT_FOUND", e;
                }()), _objectSpread(_objectSpread({}, e), {}, {
                  id: "password-popper",
                  style: {
                    transformOrigin: "bottom" === r ? "top left" : "bottom left"
                  },
                  children: (0, a.jsx)(Object(function () {
                    var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
                    throw e.code = "MODULE_NOT_FOUND", e;
                  }()), {
                    children: (0, a.jsxs)(Object(function () {
                      var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
                      throw e.code = "MODULE_NOT_FOUND", e;
                    }()), {
                      ref: x,
                      sx: {
                        background: "#f8f9fa",
                        padding: "10px",
                        borderRadius: "5px"
                      },
                      children: [v.map(function (e) {
                        return (0, a.jsxs)(Object(function () {
                          var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
                          throw e.code = "MODULE_NOT_FOUND", e;
                        }()), {
                          sx: {
                            display: "flex",
                            alignItems: "center",
                            color: e.regex.test(o === null || o === void 0 ? void 0 : o.password) ? Object(function () {
                              var e = Error("Cannot find module '../../../Config/Theme'");
                              throw e.code = "MODULE_NOT_FOUND", e;
                            }()).success : Object(function () {
                              var e = Error("Cannot find module '../../../Config/Theme'");
                              throw e.code = "MODULE_NOT_FOUND", e;
                            }()).danger
                          },
                          children: [e.regex.test(o === null || o === void 0 ? void 0 : o.password) ? (0, a.jsx)(Object(function () {
                            var e = Error("Cannot find module '@mui/icons-material/CheckCircle'");
                            throw e.code = "MODULE_NOT_FOUND", e;
                          }()), {
                            fontSize: "small"
                          }) : (0, a.jsx)(Object(function () {
                            var e = Error("Cannot find module '@mui/icons-material/Cancel'");
                            throw e.code = "MODULE_NOT_FOUND", e;
                          }()), {
                            fontSize: "small"
                          }), (0, a.jsx)("span", {
                            style: {
                              marginLeft: "8px"
                            },
                            children: e.label
                          })]
                        }, e.id);
                      }), (0, a.jsxs)(Object(function () {
                        var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
                        throw e.code = "MODULE_NOT_FOUND", e;
                      }()), {
                        sx: {
                          marginTop: "10px"
                        },
                        children: [(0, a.jsx)(Object(function () {
                          var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
                          throw e.code = "MODULE_NOT_FOUND", e;
                        }()), {
                          children: t.A.passwordStrength
                        }), (0, a.jsx)(Object(function () {
                          var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
                          throw e.code = "MODULE_NOT_FOUND", e;
                        }()), {
                          variant: "determinate",
                          value: U,
                          "aria-valuenow": U,
                          "data-testid": "password-progressbar"
                        })]
                      })]
                    })
                  })
                }));
              }
            })]
          })
        }), (0, a.jsx)("div", {
          className: "password-comp-div",
          children: (0, a.jsx)(d.A, {
            name: "confirmPassword",
            id: "confirmPassword",
            label: "confirmPassword",
            required: !0,
            type: "password",
            onChange: L,
            errorMsg: l === null || l === void 0 ? void 0 : l.confirmPassword
          })
        }), (0, a.jsx)(Object(function () {
          var e = Error("Cannot find module '__barrel_optimize__?names=Box,ClickAwayListener,Grow,LinearProgress,Paper,Popper,Typography!=!@mui/material'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          className: "submit-button",
          children: e
        })]
      });
    };
    var u = o(2650),
      m = o(1370),
      p = o(3039);
    !function () {
      var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var _ = function _(_ref11) {
      var e = _ref11.lang,
        r = _ref11.loading,
        o = _ref11.setLoading,
        n = _ref11.value,
        i = _ref11.showSnackBar,
        d = _ref11.setOpenAlert,
        _ = _ref11.setAlertMsg,
        b = _ref11.setAlertTitle,
        O = _ref11.loadingParam,
        w = _ref11.setDialogOpen,
        h = _ref11.action,
        f = _ref11.setChildren;
      var _ref12 = (0, s.useState)({
          password: "",
          confirmPassword: "",
          oldPassword: ""
        }),
        _ref13 = _slicedToArray(_ref12, 2),
        j = _ref13[0],
        x = _ref13[1],
        _ref14 = (0, s.useState)({}),
        _ref15 = _slicedToArray(_ref14, 2),
        U = _ref15[0],
        C = _ref15[1],
        _ref16 = (0, p.G)(),
        N = _ref16.updateDetails,
        g = (0, m.A)(),
        E = /*#__PURE__*/function () {
          var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            var r;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  o(!0);
                  r = {};
                  r.password = j === null || j === void 0 ? void 0 : j.password;
                  r.mobileOrEmail = n;
                  "update" == h && (r.oldPassword = j === null || j === void 0 ? void 0 : j.oldPassword);
                  _context7.next = 7;
                  return N(u.yF, r).then(function (r) {
                    "signup" == h ? r ? (i(t.A[e].signedUp), w(!1), g("/")) : (d(!0), _(t.A[e].failedToSignUp)) : "login" == h ? r ? (i(t.A[e].loggedIn), w(!1), g("/")) : (d(!0), _(t.A[e].failedToLogIn)) : "update" == h && r && (i(t.A[e].passwordUpdated), w(!1), g("/"));
                  })["catch"](function (e) {});
                case 7:
                  o(!1);
                case 8:
                case "end":
                  return _context7.stop();
              }
            }, _callee7);
          }));
          return function E() {
            return _ref17.apply(this, arguments);
          };
        }();
      return (0, a.jsx)(a.Fragment, {
        children: (0, a.jsxs)(Object(function () {
          var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          className: "signup-login",
          children: [(0, a.jsx)("div", {
            className: "verify-login",
            children: (0, a.jsx)(l, {})
          }), (0, a.jsx)(c, {
            SubmitButton: "update" == h ? (0, a.jsxs)("div", {
              className: "form-button-container",
              children: [(0, a.jsx)("button", {
                type: "button",
                className: "form-cancel-button",
                onClick: function onClick() {
                  return w(!1);
                },
                children: t.A[e].cancel
              }), (0, a.jsx)("button", {
                onClick: E,
                variant: "contained",
                type: "submit",
                className: "form-button",
                disabled: (j === null || j === void 0 ? void 0 : j.password) == "" || (j === null || j === void 0 ? void 0 : j.confirmPassword) == "" || (j === null || j === void 0 ? void 0 : j.password) != (j === null || j === void 0 ? void 0 : j.confirmPassword) || (j === null || j === void 0 ? void 0 : j.oldPassword) == "",
                children: t.A[e].update
              })]
            }) : (0, a.jsxs)("div", {
              className: "form-button-container",
              children: [(0, a.jsx)("button", {
                onClick: function onClick() {
                  g("/"), w(!1);
                },
                variant: "contained",
                type: "submit",
                className: "form-skip-button",
                children: t.A[e].skip
              }), (0, a.jsx)("button", {
                onClick: E,
                variant: "contained",
                type: "submit",
                className: "form-button",
                disabled: (j === null || j === void 0 ? void 0 : j.password) == "",
                children: t.A[e].setPassword
              })]
            }),
            lang: e,
            setLoading: o,
            loading: r,
            value: n,
            showSnackBar: i,
            setAlertMsg: _,
            setAlertTitle: b,
            setOpenAlert: d,
            loadingParam: O,
            setDialogOpen: w,
            action: h,
            setChildren: f,
            setFormData: x,
            formData: j,
            errors: U,
            setErrors: C
          })]
        })
      });
    };
  }
};