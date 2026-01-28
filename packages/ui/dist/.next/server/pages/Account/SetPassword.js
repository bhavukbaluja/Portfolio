"use strict";

(() => {
  var e = {};
  e.id = 859, e.ids = [220, 859], e.modules = {
    361: e => {
      e.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
    },
    2015: e => {
      e.exports = require("react");
    },
    3873: e => {
      e.exports = require("path");
    },
    8732: e => {
      e.exports = require("react/jsx-runtime");
    },
    9606: (e, t, r) => {
      r.r(t), r.d(t, {
        config: () => P,
        default: () => l,
        getServerSideProps: () => g,
        getStaticPaths: () => d,
        getStaticProps: () => S,
        reportWebVitals: () => b,
        routeModule: () => h,
        unstable_getServerProps: () => _,
        unstable_getServerSideProps: () => x,
        unstable_getStaticParams: () => v,
        unstable_getStaticPaths: () => m,
        unstable_getStaticProps: () => M
      });
      var s = r(2636),
        a = r(4850),
        i = r(3410),
        o = r(2150),
        n = r.n(o),
        u = r(7326),
        p = r.n(u),
        c = r(9997);
      let l = (0, i.M)(c, "default"),
        S = (0, i.M)(c, "getStaticProps"),
        d = (0, i.M)(c, "getStaticPaths"),
        g = (0, i.M)(c, "getServerSideProps"),
        P = (0, i.M)(c, "config"),
        b = (0, i.M)(c, "reportWebVitals"),
        M = (0, i.M)(c, "unstable_getStaticProps"),
        m = (0, i.M)(c, "unstable_getStaticPaths"),
        v = (0, i.M)(c, "unstable_getStaticParams"),
        _ = (0, i.M)(c, "unstable_getServerProps"),
        x = (0, i.M)(c, "unstable_getServerSideProps"),
        h = new s.PagesRouteModule({
          definition: {
            kind: a.A.PAGES,
            page: "/Account/SetPassword",
            pathname: "/Account/SetPassword",
            bundlePath: "",
            filename: ""
          },
          components: {
            App: p(),
            Document: n()
          },
          userland: c
        });
    }
  };
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = e => t(t.s = e),
    s = t.X(0, [150, 775, 997], () => r(9606));
  module.exports = s;
})();