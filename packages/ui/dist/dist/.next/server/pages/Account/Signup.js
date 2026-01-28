"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var e = {};
  e.id = 836, e.ids = [220, 836], e.modules = {
    361: function _(e) {
      "use strict";

      e.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
    },
    2015: function _(e) {
      "use strict";

      e.exports = require("react");
    },
    2053: function _() {},
    2081: function _(e, t, r) {
      "use strict";

      r.d(t, {
        A: function A() {
          return u;
        }
      });
      var o = r(8732),
        n = r(2015);
      !function () {
        var e = Error("Cannot find module 'react-phone-input-2'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }(), function () {
        var e = Error("Cannot find module 'react-phone-input-2/lib/style.css'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var a = r(3987),
        i = r.n(a),
        l = r(1155),
        s = r(1819),
        d = r(9029);
      !function () {
        var e = Error("Cannot find module '@base-ui-components/react/field'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var u = function u(_ref) {
        var e = _ref.formData,
          t = _ref.setFormData,
          r = _ref.errors,
          a = _ref.setErrors,
          u = _ref.required,
          c = _ref.label,
          m = _ref.description,
          p = _ref.name;
        var _ref2 = (0, n.useContext)(s.s),
          b = _ref2.lang;
        return (0, d.Im)(e === null || e === void 0 ? void 0 : e.mobile) && t(function (e) {
          return _objectSpread(_objectSpread({}, e), {}, {
            mobile: "+91"
          });
        }), (0, o.jsx)(Object(function () {
          var e = Error("Cannot find module '@base-ui-components/react/field'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()).Root, {
          name: p,
          className: i().Field,
          children: (0, o.jsxs)("div", {
            className: i().mobileContainer,
            children: [(0, o.jsxs)("label", {
              className: i().phoneInputLabel,
              children: [c ? l.A[b][c] || c : l.A[b].mobile, u && (0, o.jsx)("span", {
                className: i().red_icon,
                children: "*"
              })]
            }), (0, o.jsx)("div", {
              className: i().mobileInputField,
              children: (0, o.jsx)(Object(function () {
                var e = Error("Cannot find module 'react-phone-input-2'");
                throw e.code = "MODULE_NOT_FOUND", e;
              }()), {
                country: "in",
                value: e === null || e === void 0 ? void 0 : e.mobile,
                focusBlur: !1,
                onChange: function onChange(e, r) {
                  var o = "",
                    n = e.replace(/[^0-9]/g, ""),
                    i = "+".concat(n);
                  t(function (e) {
                    return _objectSpread(_objectSpread({}, e), {}, {
                      mobile: i
                    });
                  });
                  var l = n.slice(r.dialCode.length);
                  l.trim() ? /^\d{7,15}$/.test(l) || (o = "Invalid mobile number (7-15 digits required).") : u && (o = "This field is required."), a(function (e) {
                    var t = _objectSpread({}, e);
                    return t.hasOwnProperty("mobile") && delete t.mobile, o && (t.mobile = o), t;
                  });
                },
                inputProps: {
                  name: "mobile",
                  required: u,
                  id: "mobile",
                  tabIndex: -1
                },
                containerClass: i().phoneInputContainer,
                inputClass: i().phoneInputField,
                buttonClass: i().flagDropdown,
                dropdownClass: i().countryList,
                autoFormat: !0,
                disableDropdown: !1,
                countryCodeEditable: !1,
                specialLabel: ""
              })
            }), (0, o.jsx)(Object(function () {
              var e = Error("Cannot find module '@base-ui-components/react/field'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()).Description, {
              className: (0, d.Im)(r.mobile) ? i().Description : i().Error,
              children: (0, d.Im)(r.mobile) ? l.A[b][m] || m : r.mobile
            })]
          })
        });
      };
    },
    2695: function _(e, t, r) {
      "use strict";

      r.r(t), r.d(t, {
        "default": function _default() {
          return h;
        }
      });
      var o = r(8732),
        n = r(2015),
        a = r.n(n);
      !function () {
        var e = Error("Cannot find module 'react-phone-input-2/lib/style.css'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var i = r(674),
        l = r(9051);
      r(2053);
      var s = r(2081),
        d = r(1155),
        u = r(1819),
        c = r(2650),
        m = r(9029);
      !function () {
        var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var p = r(3039),
        b = r(5411);
      !function () {
        var e = Error("Cannot find module 'react-router-dom'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }(), r(9997);
      var h = function h(_ref3) {
        var e = _ref3.loading,
          t = _ref3.setAlertTitle,
          r = _ref3.setLoading,
          h = _ref3.setAlertMsg,
          f = _ref3.setOpenAlert,
          O = _ref3.setChildren,
          g = _ref3.showSnackBar,
          v = _ref3.setDialogOpen,
          N = _ref3.action,
          _ = _ref3.setImageRefreshKey;
        var _a$useContext = a().useContext(u.s),
          x = _a$useContext.lang,
          _ref4 = (0, p.G)(),
          j = _ref4.register,
          _ref5 = (0, n.useState)("submit"),
          _ref6 = _slicedToArray(_ref5, 2),
          C = _ref6[0],
          E = _ref6[1],
          _ref7 = (0, n.useState)({}),
          _ref8 = _slicedToArray(_ref7, 2),
          D = _ref8[0],
          U = _ref8[1],
          _Object = Object(function () {
            var e = Error("Cannot find module 'react-router-dom'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }())(),
          _Object2 = _slicedToArray(_Object, 1),
          A = _Object2[0],
          _ref9 = (0, n.useState)({
            fullName: "",
            email: "",
            mobile: "",
            countryCode: ""
          }),
          _ref10 = _slicedToArray(_ref9, 2),
          M = _ref10[0],
          T = _ref10[1],
          _ref11 = (0, n.useState)("email"),
          _ref12 = _slicedToArray(_ref11, 2),
          w = _ref12[0],
          S = _ref12[1],
          _ref13 = (0, n.useState)(""),
          _ref14 = _slicedToArray(_ref13, 2),
          F = _ref14[0],
          P = _ref14[1],
          y = function y(e) {
            var _e$target = e.target,
              t = _e$target.name,
              r = _e$target.value;
            T(function (e) {
              return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, t, r));
            }), U(function (e) {
              var o = _objectSpread({}, e);
              t in o && delete o[t];
              var n = (0, m.jr)(t, r);
              return n && (o[t] = n), _objectSpread({}, o);
            });
          },
          L = /*#__PURE__*/function () {
            var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
              var t;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    e.preventDefault(), r(!0);
                    t = {};
                    if (!("mobile" !== w ? (delete M.mobile, delete M.countryCode) : delete M.email, Object.keys(M).forEach(function (e) {
                      var _M$e;
                      if ("countryCode" !== e) {
                        var _r = (0, m.jr)(e, M[e]);
                        (0, m.Im)(_r) || (t[e] = _r);
                      }
                      ((_M$e = M[e]) === null || _M$e === void 0 ? void 0 : _M$e.toString().trim()) || (t[e] = "This field is required.");
                    }), U(t), Object.keys(t).length > 0)) {
                      _context.next = 4;
                      break;
                    }
                    return _context.abrupt("return", void r(!1));
                  case 4:
                    q();
                  case 5:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function L(_x) {
              return _ref15.apply(this, arguments);
            };
          }(),
          I = /*#__PURE__*/function () {
            var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    r(!0);
                    E("resend");
                    _context2.next = 4;
                    return q(e);
                  case 4:
                    E("submit");
                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function I(_x2) {
              return _ref16.apply(this, arguments);
            };
          }(),
          q = /*#__PURE__*/function () {
            var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
              var t;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    t = {};
                    t.fullName = M.fullName;
                    t.mobileOrEmail = e || M.email || M.mobile;
                    _context3.next = 5;
                    return j(c.Am, t).then(function (e) {
                      g(e), P(e);
                    })["catch"](function (e) {});
                  case 5:
                    r(!1);
                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function q(_x3) {
              return _ref17.apply(this, arguments);
            };
          }();
        return (0, o.jsx)(o.Fragment, {
          children: (0, m.Im)(F) && (0, m.Im)(A.get("mobileOrEmail")) ? (0, o.jsxs)(Object(function () {
            var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()), {
            className: "signup-login",
            onSubmit: L,
            children: [(0, o.jsx)(i.A, {
              id: "fullName-input",
              label: "Name",
              name: "fullName",
              required: !0,
              placeHolderText: "fullNamePlaceholder",
              value: M.fullName,
              onChange: y,
              errorMsg: D.fullName
            }), (0, o.jsx)(l.A, {
              options: [{
                label: "email",
                value: "email"
              }, {
                label: "mobile",
                value: "mobile"
              }],
              value: w,
              onChange: S,
              dress: !0
            }), "email" === w ? (0, o.jsxs)(o.Fragment, {
              children: [(0, o.jsx)(i.A, {
                id: "email-input",
                label: "Email",
                name: "email",
                required: !0,
                placeHolderText: "Enter your email",
                value: M.email,
                onChange: y,
                errorMsg: D.email
              }), (0, o.jsxs)("div", {
                children: [(0, o.jsx)("b", {
                  children: "Note:"
                }), " ", d.A[x].receiveOTP.replace("{0}", "Email")]
              })]
            }) : (0, o.jsxs)(o.Fragment, {
              children: [(0, o.jsx)("div", {
                className: "mobile-container",
                children: (0, o.jsx)(s.A, {
                  formData: M,
                  setFormData: T,
                  errors: D,
                  setErrors: U,
                  required: !0
                })
              }), (0, o.jsxs)("div", {
                children: [(0, o.jsx)("b", {
                  children: "Note:"
                }), " ", d.A[x].receiveOTP.replace("{0}", "Mobile no")]
              })]
            }), (0, o.jsx)("div", {
              className: "form-button-container",
              children: (0, o.jsx)("button", {
                disabled: e || Object.keys(D).length > 0,
                type: "submit",
                className: "form-button",
                onClick: L,
                children: e ? d.A[x].registering : d.A[x].register
              })
            })]
          }) : (0, o.jsx)(b["default"], {
            lang: x,
            setLoading: r,
            loading: e,
            value: (0, m.Im)(A.get("mobileOrEmail")) ? "mobile" == w ? M === null || M === void 0 ? void 0 : M.mobile : M === null || M === void 0 ? void 0 : M.email : A.get("mobileOrEmail"),
            showSnackBar: g,
            setAlertMsg: h,
            setAlertTitle: t,
            setOpenAlert: f,
            PreOtp: A.get("otp"),
            resendOTP: I,
            loadingParam: C,
            setDialogOpen: v,
            action: N,
            setChildren: O,
            setImageRefreshKey: _
          })
        });
      };
    },
    2918: function _() {
      throw Error("Module parse failed: Unexpected token (66:4)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n|   return (\n>     <AuthContext.Provider value={{ \n|       user, \n|       setUser, ");
    },
    3873: function _(e) {
      "use strict";

      e.exports = require("path");
    },
    5411: function _(e, t, r) {
      "use strict";

      r.r(t), r.d(t, {
        "default": function _default() {
          return b;
        }
      });
      var o = r(8732),
        n = r(2015),
        a = r(1155),
        i = r(9029),
        l = r(3039),
        s = r(2650),
        d = r(3987),
        u = r.n(d);
      !function () {
        var e = Error("Cannot find module 'mui-one-time-password-input'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var c = function c(_ref18) {
        var e = _ref18.value,
          t = _ref18.handleChange,
          r = _ref18.id,
          n = _ref18.errorMsg,
          a = _ref18.required;
        return (0, o.jsxs)("div", {
          className: u().mobileContainer,
          children: [(0, o.jsx)(Object(function () {
            var e = Error("Cannot find module 'mui-one-time-password-input'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()), {
            value: e,
            onChange: t,
            id: r,
            required: a,
            length: 6
          }), n && (0, o.jsx)("span", {
            className: (0, i.Im)(n) ? u().Description : u().ErrorForMobile,
            children: (0, o.jsx)("p", {
              children: n
            })
          })]
        });
      };
      var m = r(1370),
        p = r(2918);
      !function () {
        var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var b = function b(_ref19) {
        var e = _ref19.lang,
          t = _ref19.loading,
          r = _ref19.setLoading,
          d = _ref19.value,
          u = _ref19.showSnackBar,
          b = _ref19.setOpenAlert,
          h = _ref19.setAlertMsg,
          f = _ref19.PreOtp,
          O = _ref19.resendOTP,
          g = _ref19.loadingParam,
          v = _ref19.setDialogOpen,
          N = _ref19.action,
          _ = _ref19.setChildren,
          x = _ref19.setImageRefreshKey;
        var _ref20 = (0, n.useState)(f || ""),
          _ref21 = _slicedToArray(_ref20, 2),
          j = _ref21[0],
          C = _ref21[1],
          _ref22 = (0, n.useState)(""),
          _ref23 = _slicedToArray(_ref22, 2),
          E = _ref23[0],
          D = _ref23[1],
          _ref24 = (0, l.G)(),
          U = _ref24.validateOtp,
          _ref25 = (0, n.useContext)(p.AuthContext),
          A = _ref25.setLogin,
          M = (0, m.A)();
        (0, n.useEffect)(function () {
          d && j && T(d, j);
        }, [d]);
        var T = /*#__PURE__*/function () {
          var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(t, o) {
            var n, l;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  n = (0, i.jr)("otp", o);
                  if (!(D(n), !(0, i.Im)(n))) {
                    _context4.next = 3;
                    break;
                  }
                  return _context4.abrupt("return");
                case 3:
                  r(!0);
                  l = {};
                  l.otp = o;
                  l.mobileOrEmail = t;
                  _context4.next = 9;
                  return U(s.JV, l).then(function (t) {
                    if ((0, i.Im)(t === null || t === void 0 ? void 0 : t.status) || t !== null && t !== void 0 && t.status && (t === null || t === void 0 ? void 0 : t.status) < 300) {
                      if (t !== null && t !== void 0 && t.accessToken && t !== null && t !== void 0 && t.userInfo) {
                        var _e = t.accessToken,
                          _r2 = t.userInfo;
                        A(JSON.parse(_r2), _e), v(!1);
                      }
                      _([a.A[e].otpChild1, a.A[e].otpChild2, a.A[e].otpChild3, a.A[e].otpChild4]), "signup" == N ? t ? (u(a.A[e].signedUp), v(!1), M("/")) : (b(!0), h(a.A[e].failedToSignUp)) : (N = "login", t ? (u(a.A[e].loggedIn), v(!1), M("/")) : (b(!0), h(a.A[e].failedToLogIn)));
                    }
                    x(Date.now());
                  })["catch"](function (e) {});
                case 9:
                  r(!1);
                case 10:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));
          return function T(_x4, _x5) {
            return _ref26.apply(this, arguments);
          };
        }();
        return (0, o.jsx)(o.Fragment, {
          children: (0, o.jsxs)(Object(function () {
            var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()), {
            className: "signup-login",
            sx: {
              justifyContent: "space-between",
              gap: "100px",
              marginTop: "50px"
            },
            children: [(0, o.jsxs)("div", {
              className: "verify-login",
              children: [(0, o.jsx)("div", {
                children: a.A[e].enterOTP.replace("{value}", (0, i.CT)(d))
              }), (0, o.jsx)("div", {
                children: (0, o.jsx)(c, {
                  id: "otp-input",
                  label: "otp",
                  name: "otp",
                  required: !0,
                  placeHolderText: "otpPlaceholder",
                  value: j,
                  handleChange: function handleChange(e) {
                    var _e$target2, _e$target3;
                    var t, r;
                    e !== null && e !== void 0 && e.target ? (t = e === null || e === void 0 || (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.name, r = e === null || e === void 0 || (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : _e$target3.value) : r = e, C(r), (0, i.Im)(t) && (t = "otp"), D((0, i.jr)(t, r));
                  },
                  errorMsg: E
                })
              })]
            }), (0, o.jsxs)("div", {
              className: "form-button-container",
              children: [(0, o.jsx)("button", {
                disabled: t && "resend" == g,
                type: "submit",
                className: "form-button",
                onClick: function onClick() {
                  return O(d);
                },
                children: t && "resend" == g ? a.A[e].resendingOTP : a.A[e].resendOTP
              }), (0, o.jsx)("button", {
                disabled: t && "submit" == g,
                type: "submit",
                className: "form-button",
                onClick: function onClick() {
                  return T(d, j);
                },
                children: t && "submit" == g ? a.A[e].submittingOTP : a.A[e].submitOTP
              })]
            })]
          })
        });
      };
    },
    8354: function _(e, t, r) {
      "use strict";

      r.r(t), r.d(t, {
        config: function config() {
          return h;
        },
        "default": function _default() {
          return c;
        },
        getServerSideProps: function getServerSideProps() {
          return b;
        },
        getStaticPaths: function getStaticPaths() {
          return p;
        },
        getStaticProps: function getStaticProps() {
          return m;
        },
        reportWebVitals: function reportWebVitals() {
          return f;
        },
        routeModule: function routeModule() {
          return x;
        },
        unstable_getServerProps: function unstable_getServerProps() {
          return N;
        },
        unstable_getServerSideProps: function unstable_getServerSideProps() {
          return _;
        },
        unstable_getStaticParams: function unstable_getStaticParams() {
          return v;
        },
        unstable_getStaticPaths: function unstable_getStaticPaths() {
          return g;
        },
        unstable_getStaticProps: function unstable_getStaticProps() {
          return O;
        }
      });
      var o = r(2636),
        n = r(4850),
        a = r(3410),
        i = r(2150),
        l = r.n(i),
        s = r(7326),
        d = r.n(s),
        u = r(2695);
      var c = (0, a.M)(u, "default"),
        m = (0, a.M)(u, "getStaticProps"),
        p = (0, a.M)(u, "getStaticPaths"),
        b = (0, a.M)(u, "getServerSideProps"),
        h = (0, a.M)(u, "config"),
        f = (0, a.M)(u, "reportWebVitals"),
        O = (0, a.M)(u, "unstable_getStaticProps"),
        g = (0, a.M)(u, "unstable_getStaticPaths"),
        v = (0, a.M)(u, "unstable_getStaticParams"),
        N = (0, a.M)(u, "unstable_getServerProps"),
        _ = (0, a.M)(u, "unstable_getServerSideProps"),
        x = new o.PagesRouteModule({
          definition: {
            kind: n.A.PAGES,
            page: "/Account/Signup",
            pathname: "/Account/Signup",
            bundlePath: "",
            filename: ""
          },
          components: {
            App: d(),
            Document: l()
          },
          userland: u
        });
    },
    8732: function _(e) {
      "use strict";

      e.exports = require("react/jsx-runtime");
    },
    9051: function _(e, t, r) {
      "use strict";

      r.d(t, {
        A: function A() {
          return d;
        }
      });
      var o = r(8732),
        n = r(2015);
      !function () {
        var e = Error("Cannot find module '@base-ui-components/react/radio'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }(), function () {
        var e = Error("Cannot find module '@base-ui-components/react/radio-group'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var a = r(3987),
        i = r.n(a),
        l = r(1155),
        s = r(1819);
      function d(_ref27) {
        var _ref27$options = _ref27.options,
          e = _ref27$options === void 0 ? [] : _ref27$options,
          t = _ref27.defaultValue,
          r = _ref27.value,
          a = _ref27.onChange,
          d = _ref27.title,
          _ref27$className = _ref27.className,
          u = _ref27$className === void 0 ? "" : _ref27$className,
          c = _ref27.dress,
          m = _ref27.sx;
        var _n$useContext = n.useContext(s.s),
          p = _n$useContext.lang;
        return (0, o.jsxs)(o.Fragment, {
          children: [d && (0, o.jsx)("div", {
            className: i().Label,
            id: "radio-group-label",
            children: l.A[p][d] || d
          }), (0, o.jsx)(Object(function () {
            var e = Error("Cannot find module '@base-ui-components/react/radio-group'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()), {
            "aria-labelledby": "radio-group-label",
            defaultValue: t,
            value: r,
            onValueChange: a,
            className: "".concat(i().RadioGroup, " ").concat(u),
            sx: m,
            children: e.map(function (_ref28) {
              var e = _ref28.label,
                t = _ref28.value;
              var r = c || !1;
              return (0, o.jsxs)("label", {
                className: i().Item,
                children: [(0, o.jsx)(Object(function () {
                  var e = Error("Cannot find module '@base-ui-components/react/radio'");
                  throw e.code = "MODULE_NOT_FOUND", e;
                }()).Root, {
                  value: t,
                  className: r ? i().DressRadio : i().Radio,
                  children: (0, o.jsx)(Object(function () {
                    var e = Error("Cannot find module '@base-ui-components/react/radio'");
                    throw e.code = "MODULE_NOT_FOUND", e;
                  }()).Indicator, {
                    className: r ? i().Indicator : i().RadioIndicator
                  })
                }), l.A[p][e] || e]
              }, t);
            })
          })]
        });
      }
    }
  };
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = function r(e) {
      return t(t.s = e);
    },
    o = t.X(0, [150, 775, 997], function () {
      return r(8354);
    });
  module.exports = o;
})();