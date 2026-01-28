"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports.id = 775, exports.ids = [775], exports.modules = {
  1155: function _(e, r, t) {
    "use strict";

    var _en;
    t.d(r, {
      A: function A() {
        return a;
      }
    });
    var a = {
      en: (_en = {
        login: "Log In",
        signup: "Sign Up",
        forgotPassword: "Forgot Password?",
        welcome: "Welcome, User!",
        logout: "Log Out",
        requiredField: "This field is required.",
        invalidEmail: "Please enter a valid email address.",
        name: "Name",
        fullNamePlaceholder: "Enter your Name",
        firstName: "First Name",
        lastName: "Last Name",
        mobileOrEmail: "Email Id or Mobile no.",
        firstNamePlaceHolder: "Enter your First Name",
        lastNamePlaceHolder: "Enter your Last Name",
        email: "Email",
        emailPlaceHolder: "Enter your Email",
        mobile: "Mobile No.",
        mobilePlaceHolder: "Enter you Mobile no.",
        receiveOTP: "You will receive an OTP on this {0}.",
        pleaseWait: "Please Wait...",
        fetchingDataFailedTitle: "Unable to fetch the requested data.",
        failureMessage: "We faced an error while processing your request.",
        technicalGlitch: "This may be due to temporary glitch. Try again after some time.",
        contactSupport: 'Contact Support at <a href="{supportEmail}" style="text-decoration:none; target="_blank" rel="noopener noreferrer" color: #27c0e0;">{supportEmail}</a>.',
        register: "Register",
        registering: "Registering....",
        submitOTP: "Verify OTP",
        submittingOTP: "Verifying OTP....",
        otp: "OTP",
        otpPlaceholder: "Enter the OTP",
        enterOTP: "Kindly Enter the OTP you have received on ({value}).",
        signedUp: "You have Signed Up Successfully!",
        failedToSignUp: "You have failed to sign up.",
        loggedIn: "You have Logged In Successfully!",
        failedToLogIn: "You have failed to log in.",
        resendOTP: "Resend OTP",
        resendingOTP: "Resending OTP....",
        password: "Password",
        logingin: "Logging In",
        passwordPlaceHolder: "Enter your Password",
        otpChild1: "OTP may be incorrect",
        otpChild2: "OTP may be expired.",
        otpChild3: "There might be network issue.",
        otpChild4: "Server may be down",
        passwordRequirementMsg: "To safeguard your account, create a password with a minimum of eight (8) characters, including",
        passwordRequireMent: "Password Requirements",
        upperLowerCase: "Upper & Lower Case",
        subHeadingIns: "For strong password, your password should comply to following points",
        minimum8Char: "Minimum 8 characters (mandatory)",
        atLeastOneNumericals: "Atleast one numerals (mandatory)",
        numericals: "Numerals",
        specialChar: "Special Characters",
        oneUpperCase: "Atleast one upper case character (mandatory)",
        oneLowerCase: "Atleast one lower case character (mandatory)",
        partnerCompanyName: "Partner's Company Name",
        atLeastOneSpecialChar: "Atleast one special character (mandatory)",
        skip: "Skip",
        confirmPassword: "Confirm Password",
        setPassword: "Set Password",
        accountInstruction: "To access account and manage orders",
        aboutUs: "About Us",
        contactUs: "Contact Us",
        profile: "Profile",
        orders: "Orders",
        wishlist: "Wishlist",
        loginSignup: "Log In/Sign Up"
      }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_en, "welcome", "Welcome"), "profileImgUpdated", "Profile Image Updated Successfully"), "save", "Save"), "cancel", "Cancel"), "adjustImage", "Adjust Image"), "dragSqrToChangeImgSizePos", "Drag the square to change the size and position."), "preview", "Preview"), "imageCropped", "Cropped Image Saved Successfully!"), "alternateMobile", "Alternate Mobile No."), "male", "Male"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_en, "female", "Female"), "others", "Others"), "genderLabel", "Kindly select your gender:"), "dob", "Date of Birth"), "update", "Update"), "changePassword", "Change Password"), "updatePassword", "Update Password"), "updateProfile", "Update Profile"), "oldPassword", "Old Password"), "confirmPasswordNotMatchPassword", "Confirm Password did not match with Password."), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_en, "passReqNotFulfil", "Password requirement not fulfilled."), "passwordUpdated", "Password Updated Successfully!"), "profileUpdated", "Profile Updated Successfully!"), "pageNotFound", "Page Not Found"), "brokenLinkMsg1", "The link you clicked may be broken or the page may be removed."), "brokenLinkMsg2", "Visit the Home page or contact us about the problem."), "backToHome", "Back to Home Page")),
      hi: {
        login: "लॉग इन करें",
        signup: "साइन अप करें",
        forgotPassword: "पासवर्ड भूल गए?",
        welcome: "स्वागत है, उपयोगकर्ता!",
        logout: "लॉग आउट",
        requiredField: "यह फ़ील्ड आवश्यक है।",
        invalidEmail: "कृपया एक मान्य ईमेल पता दर्ज करें।"
      }
    };
  },
  1370: function _(e, r, t) {
    "use strict";

    t.d(r, {
      A: function A() {
        return a;
      }
    }), function () {
      var e = Error("Cannot find module 'react-router-dom'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var a = function a() {
      var e = Object(function () {
          var e = Error("Cannot find module 'react-router-dom'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }())(),
        r = Object(function () {
          var e = Error("Cannot find module 'react-router-dom'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }())();
      return function (t, a) {
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
        var s = r.pathname.split("/").filter(Boolean),
          n = s[s.length - 1];
        (o || n === a || "signup" === n || "login" === n) && e(t);
      };
    };
  },
  2650: function _(e, r, t) {
    "use strict";

    t.d(r, {
      Am: function Am() {
        return o;
      },
      Ge: function Ge() {
        return m;
      },
      JV: function JV() {
        return n;
      },
      Lo: function Lo() {
        return c;
      },
      Mh: function Mh() {
        return s;
      },
      TP: function TP() {
        return a;
      },
      X9: function X9() {
        return i;
      },
      XK: function XK() {
        return d;
      },
      dF: function dF() {
        return p;
      },
      gH: function gH() {
        return l;
      },
      yF: function yF() {
        return u;
      }
    });
    var a = {
        API_URL: "http://localhost:8080",
        IMAGE_URL: "assets/images/automation/"
      },
      o = "/api/auth/register",
      s = "/api/auth/login",
      n = "/api/auth/validateOtp",
      i = "/api/auth/refresh",
      l = "/api/user/userInfo",
      u = "/api/user/updatePassword",
      d = "/api/user/updateProfile",
      c = "/api/user/profileImage",
      m = "/api/user/uploadProfileImage",
      p = "/api/user/cropimage/";
  },
  3410: function _(e, r) {
    "use strict";

    Object.defineProperty(r, "M", {
      enumerable: !0,
      get: function get() {
        return function e(r, t) {
          return t in r ? r[t] : "then" in r && "function" == typeof r.then ? r.then(function (r) {
            return e(r, t);
          }) : "function" == typeof r && "default" === t ? r : void 0;
        };
      }
    });
  },
  3422: function _(e, r, t) {
    "use strict";

    t.d(r, {
      J: function J() {
        return s;
      }
    }), function () {
      var e = Error("Cannot find module 'axios'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var a = t(7452),
      o = t(2650);
    var s = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _e;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Object(function () {
                var e = Error("Cannot find module 'axios'");
                throw e.code = "MODULE_NOT_FOUND", e;
              }())(o.TP.API_URL + o.X9, {}, {
                withCredentials: !0
              });
            case 3:
              _e = _context.sent.data.accessToken;
              if (!_e) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", ((0, a.O5)(_e), _e));
            case 6:
              _context.next = 11;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.error("Error refreshing token:", _context.t0), (0, a.rY)();
            case 11:
              return _context.abrupt("return", null);
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 8]]);
      }));
      return function s() {
        return _ref.apply(this, arguments);
      };
    }();
  },
  4233: function _(e, r, t) {
    "use strict";

    t.d(r, {
      w: function w() {
        return d;
      }
    });
    var a = t(3422),
      o = t(2650);
    !function () {
      var e = Error("Cannot find module 'axios'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var s = Object(function () {
      var e = Error("Cannot find module 'axios'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }())({
      baseURL: o.TP.API_URL,
      withCredentials: !0
    });
    s.interceptors.request.use(/*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
        var r;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              r = localStorage.getItem("accessToken");
              return _context2.abrupt("return", (r && (e.headers.Authorization = "Bearer ".concat(r)), e));
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), function (e) {
      return Promise.reject(e);
    }), s.interceptors.response.use(function (e) {
      return e;
    }, /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
        var _e$response;
        var _r;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(((_e$response = e.response) === null || _e$response === void 0 ? void 0 : _e$response.status) === 401)) {
                _context3.next = 11;
                break;
              }
              _context3.prev = 1;
              _context3.next = 4;
              return (0, a.J)();
            case 4:
              _r = _context3.sent;
              return _context3.abrupt("return", (e.config.headers.Authorization = "Bearer ".concat(_r), Object(function () {
                var e = Error("Cannot find module 'axios'");
                throw e.code = "MODULE_NOT_FOUND", e;
              }())(e.config)));
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", Promise.reject(_context3.t0));
            case 11:
              return _context3.abrupt("return", Promise.reject(e));
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 8]]);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
    var n = t(9029);
    t(1155);
    var i = t(2015),
      l = t(6024);
    !function () {
      var e = Error("Cannot find module 'axios'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var u = function u() {
        var _ref4 = (0, l.useError)(),
          e = _ref4.showError,
          r = (0, i.useCallback)(function (r, t) {
            var a = r === null || r === void 0 ? void 0 : r.response,
              o = "Something went wrong!",
              s = {},
              i = "Alert";
            if ((a === null || a === void 0 ? void 0 : a.status) === 401) (0, n.kY)(), window.location.reload();else {
              var _a$data, _a$data2, _a$data3;
              if (!t && (a === null || a === void 0 ? void 0 : a.status) >= 200 && (a === null || a === void 0 ? void 0 : a.status) < 300) return a;
              !t && !(0, n.Im)(a) && !(0, n.Im)(a === null || a === void 0 ? void 0 : a.status) && (a === null || a === void 0 ? void 0 : a.status) >= 400 ? (i = (a === null || a === void 0 ? void 0 : a.statusText) || i, e(i, o = (a === null || a === void 0 || (_a$data = a.data) === null || _a$data === void 0 ? void 0 : _a$data.message) || (a === null || a === void 0 || (_a$data2 = a.data) === null || _a$data2 === void 0 ? void 0 : _a$data2.error) || (a === null || a === void 0 ? void 0 : a.data) || o, (a === null || a === void 0 || (_a$data3 = a.data) === null || _a$data3 === void 0 ? void 0 : _a$data3.errors) || {})) : (i = (a === null || a === void 0 ? void 0 : a.statusText) || i, e(i, o = (r === null || r === void 0 ? void 0 : r.message) || o, (r === null || r === void 0 ? void 0 : r.details) || {}));
            }
            return Promise.reject(r);
          }, [e]),
          t = (0, i.useCallback)(/*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e, t) {
              var a,
                o,
                _a$headers,
                _args4 = arguments;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    a = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                    o = _args4.length > 3 ? _args4[3] : undefined;
                    _context4.prev = 2;
                    _context4.next = 5;
                    return s.get(e, {
                      params: t,
                      headers: (_a$headers = a === null || a === void 0 ? void 0 : a.headers) !== null && _a$headers !== void 0 ? _a$headers : {}
                    });
                  case 5:
                    return _context4.abrupt("return", _context4.sent);
                  case 8:
                    _context4.prev = 8;
                    _context4.t0 = _context4["catch"](2);
                    return _context4.abrupt("return", r(_context4.t0, o === null || o === void 0 ? void 0 : o.hideErrorDialog));
                  case 11:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, null, [[2, 8]]);
            }));
            return function (_x3, _x4) {
              return _ref5.apply(this, arguments);
            };
          }(), [r]),
          a = (0, i.useCallback)(/*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e, t) {
              var a,
                o,
                _args5 = arguments;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    a = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                    o = _args5.length > 3 ? _args5[3] : undefined;
                    _context5.prev = 2;
                    _context5.next = 5;
                    return s.post(e, t, _objectSpread({}, a));
                  case 5:
                    return _context5.abrupt("return", _context5.sent);
                  case 8:
                    _context5.prev = 8;
                    _context5.t0 = _context5["catch"](2);
                    return _context5.abrupt("return", r(_context5.t0, o === null || o === void 0 ? void 0 : o.hideErrorDialog));
                  case 11:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[2, 8]]);
            }));
            return function (_x5, _x6) {
              return _ref6.apply(this, arguments);
            };
          }(), [r]);
        return {
          GET: t,
          POST: a,
          PUT: (0, i.useCallback)(/*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e, t) {
              var a,
                o,
                _args6 = arguments;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    a = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                    o = _args6.length > 3 ? _args6[3] : undefined;
                    _context6.prev = 2;
                    _context6.next = 5;
                    return s.put(e, t, _objectSpread({}, a));
                  case 5:
                    return _context6.abrupt("return", _context6.sent);
                  case 8:
                    _context6.prev = 8;
                    _context6.t0 = _context6["catch"](2);
                    return _context6.abrupt("return", r(_context6.t0, o === null || o === void 0 ? void 0 : o.hideErrorDialog));
                  case 11:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6, null, [[2, 8]]);
            }));
            return function (_x7, _x8) {
              return _ref7.apply(this, arguments);
            };
          }(), [r]),
          DELETE: (0, i.useCallback)(/*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(e) {
              var t,
                a,
                _args7 = arguments;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    t = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                    a = _args7.length > 2 ? _args7[2] : undefined;
                    _context7.prev = 2;
                    _context7.next = 5;
                    return s["delete"](e, _objectSpread({}, t));
                  case 5:
                    return _context7.abrupt("return", _context7.sent);
                  case 8:
                    _context7.prev = 8;
                    _context7.t0 = _context7["catch"](2);
                    return _context7.abrupt("return", r(_context7.t0, a === null || a === void 0 ? void 0 : a.hideErrorDialog));
                  case 11:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[2, 8]]);
            }));
            return function (_x9) {
              return _ref8.apply(this, arguments);
            };
          }(), [r])
        };
      },
      d = function d() {
        var _u = u(),
          e = _u.GET,
          r = _u.POST,
          t = _u.PUT,
          a = _u.DELETE;
        return {
          CallApi: function () {
            var _CallApi = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(o, s, i, l, u) {
              var _d, _a$response, _e2, _r2, _t;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.prev = 0;
                    _context8.next = 3;
                    return {
                      GET: e,
                      POST: r,
                      PUT: t,
                      DELETE: a
                    }[s](o, i, l, u);
                  case 3:
                    _d = _context8.sent;
                    if (!((0, n.Im)(_d) || (0, n.Im)(_d === null || _d === void 0 ? void 0 : _d.status) || (_d === null || _d === void 0 ? void 0 : _d.status) !== 200)) {
                      _context8.next = 6;
                      break;
                    }
                    throw _d;
                  case 6:
                    if (!((_d === null || _d === void 0 ? void 0 : _d.status) == 200)) {
                      _context8.next = 8;
                      break;
                    }
                    return _context8.abrupt("return", _d === null || _d === void 0 ? void 0 : _d.data);
                  case 8:
                    return _context8.abrupt("return");
                  case 11:
                    _context8.prev = 11;
                    _context8.t0 = _context8["catch"](0);
                    _e2 = _context8.t0 === null || _context8.t0 === void 0 ? void 0 : _context8.t0.status, _r2 = _context8.t0 === null || _context8.t0 === void 0 || (_a$response = _context8.t0.response) === null || _a$response === void 0 ? void 0 : _a$response.data, _t = _context8.t0 === null || _context8.t0 === void 0 ? void 0 : _context8.t0.data;
                    if (!((u === null || u === void 0 ? void 0 : u.resdataOnly) === !0)) {
                      _context8.next = 16;
                      break;
                    }
                    return _context8.abrupt("return", _r2 !== null && _r2 !== void 0 ? _r2 : _t);
                  case 16:
                    throw {
                      status: !(0, n.Im)(_e2) && _e2,
                      data: _r2 || ((0, n.Im)(_t) ? "error" : _t)
                    };
                  case 17:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8, null, [[0, 11]]);
            }));
            function CallApi(_x10, _x11, _x12, _x13, _x14) {
              return _CallApi.apply(this, arguments);
            }
            return CallApi;
          }()
        };
      };
  },
  4850: function _(e, r) {
    "use strict";

    Object.defineProperty(r, "A", {
      enumerable: !0,
      get: function get() {
        return t;
      }
    });
    var t = function (e) {
      return e.PAGES = "PAGES", e.PAGES_API = "PAGES_API", e.APP_PAGE = "APP_PAGE", e.APP_ROUTE = "APP_ROUTE", e.IMAGE = "IMAGE", e;
    }({});
  },
  6024: function _() {
    throw Error("Module parse failed: Unexpected token (36:8)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n|     return (\n>         <ErrorContext.Provider value={{ showError, closeError }}>\n|             {children}\n| ");
  },
  7326: function _(e, r, t) {
    "use strict";

    Object.defineProperty(r, "__esModule", {
      value: !0
    }), Object.defineProperty(r, "default", {
      enumerable: !0,
      get: function get() {
        return l;
      }
    });
    var a = t(8485),
      o = t(8732),
      s = a._(t(2015)),
      n = t(7108);
    function i(_x15) {
      return _i.apply(this, arguments);
    }
    function _i() {
      _i = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(e) {
        var r, t;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              r = e.Component, t = e.ctx;
              _context9.next = 3;
              return (0, n.loadGetInitialProps)(r, t);
            case 3:
              _context9.t0 = _context9.sent;
              return _context9.abrupt("return", {
                pageProps: _context9.t0
              });
            case 5:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      return _i.apply(this, arguments);
    }
    var l = /*#__PURE__*/function (_s$default$Component) {
      function l() {
        _classCallCheck(this, l);
        return _callSuper(this, l, arguments);
      }
      _inherits(l, _s$default$Component);
      return _createClass(l, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
            e = _this$props.Component,
            r = _this$props.pageProps;
          return (0, o.jsx)(e, _objectSpread({}, r));
        }
      }]);
    }(s["default"].Component);
    l.origGetInitialProps = i, l.getInitialProps = i, ("function" == typeof r["default"] || "object" == _typeof(r["default"]) && null !== r["default"]) && void 0 === r["default"].__esModule && (Object.defineProperty(r["default"], "__esModule", {
      value: !0
    }), Object.assign(r["default"], r), e.exports = r["default"]);
  },
  7452: function _(e, r, t) {
    "use strict";

    t.d(r, {
      O5: function O5() {
        return s;
      },
      c4: function c4() {
        return n;
      },
      rY: function rY() {
        return l;
      },
      xJ: function xJ() {
        return u;
      }
    }), function () {
      var e = Error("Cannot find module 'universal-cookie'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), t(4233);
    var a = t(2650);
    var o = Object(function () {
        var e = Error("Cannot find module 'universal-cookie'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }())(),
      s = function s(e) {
        localStorage.setItem("accessToken", e);
      },
      n = function n() {
        return localStorage.getItem("accessToken");
      },
      i = function i(e) {
        localStorage.setItem("userInfo", JSON.stringify(e));
      },
      l = function l() {
        localStorage.removeItem("accessToken"), localStorage.removeItem("userInfo"), o.remove("refreshToken", {
          path: "/"
        });
      },
      u = /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(e) {
          var _r3, _e3;
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return e(a.gH, "GET");
              case 3:
                _r3 = _context10.sent;
                if (_r3 !== null && _r3 !== void 0 && _r3.userInfo) {
                  _context10.next = 6;
                  break;
                }
                return _context10.abrupt("return", (console.error("Failed to fetch user info, status:", _r3 === null || _r3 === void 0 ? void 0 : _r3.status), null));
              case 6:
                _e3 = _r3 === null || _r3 === void 0 ? void 0 : _r3.userInfo;
                if (!_e3) {
                  _context10.next = 9;
                  break;
                }
                return _context10.abrupt("return", (i(_e3), _e3));
              case 9:
                return _context10.abrupt("return", (console.error("User info is missing in the response"), null));
              case 12:
                _context10.prev = 12;
                _context10.t0 = _context10["catch"](0);
                return _context10.abrupt("return", (console.error("Failed to fetch user info:", _context10.t0), null));
              case 15:
              case "end":
                return _context10.stop();
            }
          }, _callee10, null, [[0, 12]]);
        }));
        return function u(_x16) {
          return _ref9.apply(this, arguments);
        };
      }();
  },
  9029: function _(e, r, t) {
    "use strict";

    t.d(r, {
      CT: function CT() {
        return l;
      },
      Im: function Im() {
        return s;
      },
      XA: function XA() {
        return d;
      },
      kY: function kY() {
        return n;
      },
      jr: function jr() {
        return i;
      }
    });
    var a = t(7452),
      o = t(3422);
    !function () {
      var e = Error("Cannot find module 'universal-cookie'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), function () {
      var e = Error("Cannot find module 'dayjs'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), function () {
      var e = Error("Cannot find module 'dayjs/plugin/customParseFormat'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var s = function s(e) {
        return null == e || "" === e || Array.isArray(e) && 0 === e.length || "object" == _typeof(e) && 0 === Object.keys(e).length;
      },
      n = function n() {
        var e = Object(function () {
          var e = Error("Cannot find module 'universal-cookie'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }())();
        e.remove(window.uiTokenName, {
          path: "/"
        }), e.remove("saml-user-attributes", {
          path: "/"
        }), e.remove("seis", {
          path: "/"
        }), e.remove("JSESSIONID", {
          path: "/"
        });
      },
      i = function i(e, r) {
        var t = "";
        if (r.trim()) switch (e) {
          case "otp":
            6 != r.length && (t = "".concat(e.toUpperCase(), " must be 6 digits"));
            break;
          case "fullName":
          case "lastName":
            r.length < 3 && (t = "Name must be at least 3 characters.");
            break;
          case "email":
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r) || (t = "Invalid email address.");
            break;
          case "mobile":
            /^\+?\d{9,18}$/.test(r) || (t = "Invalid mobile number (must be 7–15 digits, optionally starting with '+').");
        } else t = "This field is required.";
        return t;
      },
      l = function l(e) {
        if (!e) return "";
        if (/^\d+$/.test(e)) {
          var _r4 = e.length;
          if (_r4 <= 4) return "*".repeat(_r4);
          {
            if (_r4 <= 6) return "".concat(e.slice(0, 1)).concat("*".repeat(_r4 - 2));
            var _t2 = "*".repeat(_r4 - 4);
            return "".concat(e.slice(0, 1)).concat(_t2).concat(e.slice(-2));
          }
        }
        {
          var _e$split = e.split("@"),
            _e$split2 = _slicedToArray(_e$split, 2),
            _r5 = _e$split2[0],
            _t3 = _e$split2[1];
          if (_r5.length <= 2) return "".concat(_r5[0]).concat("*".repeat(_r5.length - 1), "@").concat(_t3);
          var _a = "*".repeat(_r5.length - 3);
          return "".concat(_r5.slice(0, 2)).concat(_a).concat(_r5.slice(-1), "@").concat(_t3);
        }
      },
      u = /*#__PURE__*/function () {
        var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(e) {
          var _r6, _t4, _s;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _r6 = (0, a.c4)();
                _context11.next = 4;
                return fetch(e, {
                  headers: {
                    Authorization: "Bearer ".concat(_r6)
                  }
                });
              case 4:
                _t4 = _context11.sent;
                if (!((_t4 === null || _t4 === void 0 ? void 0 : _t4.status) == 401 && (0, o.J)(), !_t4.ok)) {
                  _context11.next = 7;
                  break;
                }
                throw Error("Image fetch failed");
              case 7:
                _context11.next = 9;
                return _t4.blob();
              case 9:
                _s = _context11.sent;
                return _context11.abrupt("return", URL.createObjectURL(_s));
              case 13:
                _context11.prev = 13;
                _context11.t0 = _context11["catch"](0);
                console.error("Failed to fetch profile image:", _context11.t0);
              case 16:
              case "end":
                return _context11.stop();
            }
          }, _callee11, null, [[0, 13]]);
        }));
        return function u(_x17) {
          return _ref10.apply(this, arguments);
        };
      }(),
      d = /*#__PURE__*/function () {
        var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(e, r) {
          var t, a, _a2, _o;
          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                t = "profileImageBlob_".concat(r), a = sessionStorage.getItem(t);
                if (!a) {
                  _context12.next = 3;
                  break;
                }
                return _context12.abrupt("return", a);
              case 3:
                _a2 = "".concat(e, "?t=").concat(r);
                _context12.next = 6;
                return u(_a2);
              case 6:
                _o = _context12.sent;
                return _context12.abrupt("return", (sessionStorage.setItem(t, _o), _o));
              case 8:
              case "end":
                return _context12.stop();
            }
          }, _callee12);
        }));
        return function d(_x18, _x19) {
          return _ref11.apply(this, arguments);
        };
      }();
    Object(function () {
      var e = Error("Cannot find module 'dayjs'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }())(Object(function () {
      var e = Error("Cannot find module 'dayjs/plugin/customParseFormat'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }()));
  }
};