"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  var e = {};
  e.id = 26, e.ids = [26, 220], e.modules = {
    361: function _(e) {
      "use strict";

      e.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
    },
    2015: function _(e) {
      "use strict";

      e.exports = require("react");
    },
    2695: function _(e, t, r) {
      "use strict";

      r.r(t), r.d(t, {
        "default": function _default() {
          return f;
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
        s = r(9051);
      r(2053);
      var l = r(2081),
        d = r(1155),
        c = r(1819),
        u = r(2650),
        m = r(9029);
      !function () {
        var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var p = r(3039),
        O = r(5411);
      !function () {
        var e = Error("Cannot find module 'react-router-dom'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }(), r(9997);
      var f = function f(_ref) {
        var e = _ref.loading,
          t = _ref.setAlertTitle,
          r = _ref.setLoading,
          f = _ref.setAlertMsg,
          g = _ref.setOpenAlert,
          _ = _ref.setChildren,
          h = _ref.showSnackBar,
          b = _ref.setDialogOpen,
          x = _ref.action,
          N = _ref.setImageRefreshKey;
        var _a$useContext = a().useContext(c.s),
          j = _a$useContext.lang,
          _ref2 = (0, p.G)(),
          v = _ref2.register,
          _ref3 = (0, n.useState)("submit"),
          _ref4 = _slicedToArray(_ref3, 2),
          E = _ref4[0],
          D = _ref4[1],
          _ref5 = (0, n.useState)({}),
          _ref6 = _slicedToArray(_ref5, 2),
          C = _ref6[0],
          U = _ref6[1],
          _Object = Object(function () {
            var e = Error("Cannot find module 'react-router-dom'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }())(),
          _Object2 = _slicedToArray(_Object, 1),
          M = _Object2[0],
          _ref7 = (0, n.useState)({
            fullName: "",
            email: "",
            mobile: "",
            countryCode: ""
          }),
          _ref8 = _slicedToArray(_ref7, 2),
          w = _ref8[0],
          T = _ref8[1],
          _ref9 = (0, n.useState)("email"),
          _ref10 = _slicedToArray(_ref9, 2),
          A = _ref10[0],
          S = _ref10[1],
          _ref11 = (0, n.useState)(""),
          _ref12 = _slicedToArray(_ref11, 2),
          y = _ref12[0],
          P = _ref12[1],
          L = function L(e) {
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
          F = /*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
              var t;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    e.preventDefault(), r(!0);
                    t = {};
                    if (!("mobile" !== A ? (delete w.mobile, delete w.countryCode) : delete w.email, Object.keys(w).forEach(function (e) {
                      var _w$e;
                      if ("countryCode" !== e) {
                        var _r = (0, m.jr)(e, w[e]);
                        (0, m.Im)(_r) || (t[e] = _r);
                      }
                      ((_w$e = w[e]) === null || _w$e === void 0 ? void 0 : _w$e.toString().trim()) || (t[e] = "This field is required.");
                    }), U(t), Object.keys(t).length > 0)) {
                      _context.next = 4;
                      break;
                    }
                    return _context.abrupt("return", void r(!1));
                  case 4:
                    B();
                  case 5:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function F(_x) {
              return _ref13.apply(this, arguments);
            };
          }(),
          k = /*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    r(!0);
                    D("resend");
                    _context2.next = 4;
                    return B(e);
                  case 4:
                    D("submit");
                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function k(_x2) {
              return _ref14.apply(this, arguments);
            };
          }(),
          B = /*#__PURE__*/function () {
            var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
              var t;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    t = {};
                    t.fullName = w.fullName;
                    t.mobileOrEmail = e || w.email || w.mobile;
                    _context3.next = 5;
                    return v(u.Am, t).then(function (e) {
                      h(e), P(e);
                    })["catch"](function (e) {});
                  case 5:
                    r(!1);
                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function B(_x3) {
              return _ref15.apply(this, arguments);
            };
          }();
        return (0, o.jsx)(o.Fragment, {
          children: (0, m.Im)(y) && (0, m.Im)(M.get("mobileOrEmail")) ? (0, o.jsxs)(Object(function () {
            var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()), {
            className: "signup-login",
            onSubmit: F,
            children: [(0, o.jsx)(i.A, {
              id: "fullName-input",
              label: "Name",
              name: "fullName",
              required: !0,
              placeHolderText: "fullNamePlaceholder",
              value: w.fullName,
              onChange: L,
              errorMsg: C.fullName
            }), (0, o.jsx)(s.A, {
              options: [{
                label: "email",
                value: "email"
              }, {
                label: "mobile",
                value: "mobile"
              }],
              value: A,
              onChange: S,
              dress: !0
            }), "email" === A ? (0, o.jsxs)(o.Fragment, {
              children: [(0, o.jsx)(i.A, {
                id: "email-input",
                label: "Email",
                name: "email",
                required: !0,
                placeHolderText: "Enter your email",
                value: w.email,
                onChange: L,
                errorMsg: C.email
              }), (0, o.jsxs)("div", {
                children: [(0, o.jsx)("b", {
                  children: "Note:"
                }), " ", d.A[j].receiveOTP.replace("{0}", "Email")]
              })]
            }) : (0, o.jsxs)(o.Fragment, {
              children: [(0, o.jsx)("div", {
                className: "mobile-container",
                children: (0, o.jsx)(l.A, {
                  formData: w,
                  setFormData: T,
                  errors: C,
                  setErrors: U,
                  required: !0
                })
              }), (0, o.jsxs)("div", {
                children: [(0, o.jsx)("b", {
                  children: "Note:"
                }), " ", d.A[j].receiveOTP.replace("{0}", "Mobile no")]
              })]
            }), (0, o.jsx)("div", {
              className: "form-button-container",
              children: (0, o.jsx)("button", {
                disabled: e || Object.keys(C).length > 0,
                type: "submit",
                className: "form-button",
                onClick: F,
                children: e ? d.A[j].registering : d.A[j].register
              })
            })]
          }) : (0, o.jsx)(O["default"], {
            lang: j,
            setLoading: r,
            loading: e,
            value: (0, m.Im)(M.get("mobileOrEmail")) ? "mobile" == A ? w === null || w === void 0 ? void 0 : w.mobile : w === null || w === void 0 ? void 0 : w.email : M.get("mobileOrEmail"),
            showSnackBar: h,
            setAlertMsg: f,
            setAlertTitle: t,
            setOpenAlert: g,
            PreOtp: M.get("otp"),
            resendOTP: k,
            loadingParam: E,
            setDialogOpen: b,
            action: x,
            setChildren: _,
            setImageRefreshKey: N
          })
        });
      };
    },
    3873: function _(e) {
      "use strict";

      e.exports = require("path");
    },
    5417: function _(e, t, r) {
      "use strict";

      r.d(t, {
        A: function A() {
          return i;
        }
      });
      var o = r(8732);
      r(2015), !function () {
        var e = Error("Cannot find module '@base-ui-components/react/dialog'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var n = r(3987),
        a = r.n(n);
      function i(_ref16) {
        var e = _ref16.title,
          t = _ref16.bodyComponent,
          r = _ref16.open,
          n = _ref16.setOpen,
          i = _ref16.button,
          s = _ref16.isAlert;
        return (0, o.jsx)(Object(function () {
          var e = Error("Cannot find module '@base-ui-components/react/dialog'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()).Root, {
          open: r,
          onOpenChange: function onOpenChange(e) {
            return e && n(e);
          },
          children: (0, o.jsxs)(Object(function () {
            var e = Error("Cannot find module '@base-ui-components/react/dialog'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()).Portal, {
            children: [(0, o.jsx)(Object(function () {
              var e = Error("Cannot find module '@base-ui-components/react/dialog'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()).Backdrop, {
              className: s ? a().AlertBackdrop : a().Backdrop,
              onClick: function onClick(e) {
                return e.stopPropagation();
              }
            }), (0, o.jsxs)(Object(function () {
              var e = Error("Cannot find module '@base-ui-components/react/dialog'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()).Popup, {
              className: s ? a().AlertPopup : a().Popup,
              children: [(0, o.jsx)(Object(function () {
                var e = Error("Cannot find module '@base-ui-components/react/dialog'");
                throw e.code = "MODULE_NOT_FOUND", e;
              }()).Close, {
                className: a().closeButton,
                onClick: function onClick() {
                  return n(!1);
                },
                children: (0, o.jsx)(Object(function () {
                  var e = Error("Cannot find module '@mui/icons-material/Close'");
                  throw e.code = "MODULE_NOT_FOUND", e;
                }()), {
                  fontSize: "large"
                })
              }), (0, o.jsx)(Object(function () {
                var e = Error("Cannot find module '@base-ui-components/react/dialog'");
                throw e.code = "MODULE_NOT_FOUND", e;
              }()).Title, {
                className: a().Title,
                children: e
              }), (0, o.jsxs)("div", {
                className: a().dialogContent,
                children: [(0, o.jsx)("div", {
                  className: a().dialogContent,
                  children: t
                }), (0, o.jsx)("div", {
                  className: s ? a().AlertActions : i ? a().Actions : a().ActionsHidden,
                  children: i
                })]
              })]
            })]
          })
        });
      }
      !function () {
        var e = Error("Cannot find module '@mui/icons-material/Close'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
    },
    8559: function _() {},
    8732: function _(e) {
      "use strict";

      e.exports = require("react/jsx-runtime");
    },
    9237: function _(e, t, r) {
      "use strict";

      r.r(t), r.d(t, {
        config: function config() {
          return C;
        },
        "default": function _default() {
          return j;
        },
        getServerSideProps: function getServerSideProps() {
          return D;
        },
        getStaticPaths: function getStaticPaths() {
          return E;
        },
        getStaticProps: function getStaticProps() {
          return v;
        },
        reportWebVitals: function reportWebVitals() {
          return U;
        },
        routeModule: function routeModule() {
          return y;
        },
        unstable_getServerProps: function unstable_getServerProps() {
          return A;
        },
        unstable_getServerSideProps: function unstable_getServerSideProps() {
          return S;
        },
        unstable_getStaticParams: function unstable_getStaticParams() {
          return T;
        },
        unstable_getStaticPaths: function unstable_getStaticPaths() {
          return w;
        },
        unstable_getStaticProps: function unstable_getStaticProps() {
          return M;
        }
      });
      var o = {};
      r.r(o), r.d(o, {
        "default": function _default() {
          return N;
        }
      });
      var n = r(2636),
        a = r(4850),
        i = r(3410),
        s = r(2150),
        l = r.n(s),
        d = r(7326),
        c = r.n(d),
        u = r(8732),
        m = r(2015),
        p = r.n(m),
        O = r(5417),
        f = r(2695),
        g = r(9418);
      r(8559);
      var _ = r(1155),
        h = r(1819);
      function b(e) {
        var _p$useContext = p().useContext(h.s),
          t = _p$useContext.lang;
        return (0, u.jsxs)(Object(function () {
          var e = Error("Cannot find module '__barrel_optimize__?names=Backdrop,Box,CircularProgress,Typography!=!@mui/material'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          className: "custom-backdrop",
          sx: {
            zIndex: function zIndex(e) {
              return e.zIndex.drawer + 1;
            }
          },
          open: e.loading,
          children: [e.isBackdropLoaderBoxHidden && (0, u.jsxs)(p().Fragment, {
            children: [(0, u.jsx)(Object(function () {
              var e = Error("Cannot find module '@fortawesome/react-fontawesome'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()), {
              size: "2xl",
              icon: Object(function () {
                var e = Error("Cannot find module '@fortawesome/free-solid-svg-icons'");
                throw e.code = "MODULE_NOT_FOUND", e;
              }()),
              spinPulse: !0
            }), !e.typographyHidden && (0, u.jsx)(Object(function () {
              var e = Error("Cannot find module '__barrel_optimize__?names=Backdrop,Box,CircularProgress,Typography!=!@mui/material'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()), {
              sx: {
                paddingLeft: 2
              },
              children: e.text || _.A[t].pleaseWait
            })]
          }), !e.isBackdropLoaderBoxHidden && (0, u.jsxs)(Object(function () {
            var e = Error("Cannot find module '__barrel_optimize__?names=Backdrop,Box,CircularProgress,Typography!=!@mui/material'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()), {
            className: "backdrop-loader",
            children: [(0, u.jsx)(Object(function () {
              var e = Error("Cannot find module '@fortawesome/react-fontawesome'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()), {
              size: "2xl",
              icon: Object(function () {
                var e = Error("Cannot find module '@fortawesome/free-solid-svg-icons'");
                throw e.code = "MODULE_NOT_FOUND", e;
              }()),
              spinPulse: !0
            }), !e.typographyHidden && (0, u.jsx)(Object(function () {
              var e = Error("Cannot find module '__barrel_optimize__?names=Backdrop,Box,CircularProgress,Typography!=!@mui/material'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()), {
              sx: {
                paddingLeft: 2
              },
              children: e.text || _.A[t].pleaseWait
            })]
          })]
        });
      }
      !function () {
        var e = Error("Cannot find module '__barrel_optimize__?names=Backdrop,Box,CircularProgress,Typography!=!@mui/material'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }(), function () {
        var e = Error("Cannot find module '@fortawesome/react-fontawesome'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }(), function () {
        var e = Error("Cannot find module '@fortawesome/free-solid-svg-icons'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }(), function () {
        var e = Error("Cannot find module '@base-ui-components/react/dialog'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var x = function x(_ref17) {
        var e = _ref17.Msg,
          _ref17$children = _ref17.children,
          t = _ref17$children === void 0 ? [] : _ref17$children,
          r = _ref17.title,
          o = _ref17.open,
          n = _ref17.setOpen;
        return Array.isArray(t) || (t = []), (0, u.jsx)(O.A, {
          title: r || "Alert",
          bodyComponent: (0, u.jsx)(function () {
            return (0, u.jsxs)("div", {
              style: {
                display: "flex",
                flexDirection: "column"
              },
              children: [(0, u.jsx)("div", {
                children: e
              }), Array.isArray(t) && t.length > 0 && (0, u.jsx)("ul", {
                children: t.map(function (e, t) {
                  return (0, u.jsx)("li", {
                    dangerouslySetInnerHTML: {
                      __html: e
                    }
                  }, t);
                })
              })]
            });
          }, {}),
          open: o,
          setOpen: n,
          button: (0, u.jsx)("button", {
            className: "alert-box-button",
            type: "button",
            onClick: function onClick() {
              return n(!1);
            },
            children: "Close"
          }),
          isAlert: !0
        });
      };
      !function () {
        var e = Error("Cannot find module '../..components/UI/fields/BaseTabs'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      var N = function N(_ref18) {
          var e = _ref18.open,
            t = _ref18.setOpen,
            r = _ref18.action,
            o = _ref18.showSnackBar,
            n = _ref18.setImageRefreshKey;
          var _p$useContext2 = p().useContext(h.s),
            a = _p$useContext2.lang,
            _ref19 = (0, m.useState)(!1),
            _ref20 = _slicedToArray(_ref19, 2),
            i = _ref20[0],
            s = _ref20[1],
            _ref21 = (0, m.useState)(!1),
            _ref22 = _slicedToArray(_ref21, 2),
            l = _ref22[0],
            d = _ref22[1],
            _ref23 = (0, m.useState)(""),
            _ref24 = _slicedToArray(_ref23, 2),
            c = _ref24[0],
            N = _ref24[1],
            _ref25 = (0, m.useState)(""),
            _ref26 = _slicedToArray(_ref25, 2),
            j = _ref26[0],
            v = _ref26[1],
            _ref27 = (0, m.useState)([]),
            _ref28 = _slicedToArray(_ref27, 2),
            E = _ref28[0],
            D = _ref28[1];
          return "login" != r && "signup" != r && (r = "signup"), (0, u.jsxs)("div", {
            children: [(0, u.jsx)(O.A, {
              open: e,
              setOpen: t,
              bodyComponent: function () {
                var e = [{
                  label: _.A[a].login,
                  value: "login",
                  PanelComponent: (0, u.jsx)(g["default"], {
                    loading: i,
                    setAlertTitle: v,
                    setLoading: s,
                    setAlertMsg: N,
                    setOpenAlert: d,
                    setChildren: D,
                    showSnackBar: o,
                    setDialogOpen: t,
                    action: r,
                    setImageRefreshKey: n
                  })
                }, {
                  label: _.A[a].signup,
                  value: "signup",
                  PanelComponent: (0, u.jsx)(f["default"], {
                    loading: i,
                    setAlertTitle: v,
                    setLoading: s,
                    setAlertMsg: N,
                    setOpenAlert: d,
                    setChildren: D,
                    showSnackBar: o,
                    setDialogOpen: t,
                    action: r,
                    setImageRefreshKey: n
                  })
                }];
                return (0, u.jsx)(Object(function () {
                  var e = Error("Cannot find module '../..components/UI/fields/BaseTabs'");
                  throw e.code = "MODULE_NOT_FOUND", e;
                }()), {
                  tabItems: e,
                  defaultValue: r,
                  sx: {
                    width: "auto",
                    maxWidth: "80vw",
                    minWidth: "600px"
                  }
                });
              }()
            }), (0, u.jsx)(b, {
              loading: i
            }), (0, u.jsx)(x, {
              Msg: c,
              open: l,
              setOpen: d,
              children: E
            })]
          });
        },
        j = (0, i.M)(o, "default"),
        v = (0, i.M)(o, "getStaticProps"),
        E = (0, i.M)(o, "getStaticPaths"),
        D = (0, i.M)(o, "getServerSideProps"),
        C = (0, i.M)(o, "config"),
        U = (0, i.M)(o, "reportWebVitals"),
        M = (0, i.M)(o, "unstable_getStaticProps"),
        w = (0, i.M)(o, "unstable_getStaticPaths"),
        T = (0, i.M)(o, "unstable_getStaticParams"),
        A = (0, i.M)(o, "unstable_getServerProps"),
        S = (0, i.M)(o, "unstable_getServerSideProps"),
        y = new n.PagesRouteModule({
          definition: {
            kind: a.A.PAGES,
            page: "/Account/Login_Signup",
            pathname: "/Account/Login_Signup",
            bundlePath: "",
            filename: ""
          },
          components: {
            App: c(),
            Document: l()
          },
          userland: o
        });
    }
  };
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = function r(e) {
      return t(t.s = e);
    },
    o = t.X(0, [150, 775, 997, 418], function () {
      return r(9237);
    });
  module.exports = o;
})();