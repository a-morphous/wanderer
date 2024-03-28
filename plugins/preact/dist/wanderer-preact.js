var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a3, b3) => {
  for (var prop in b3 || (b3 = {}))
    if (__hasOwnProp.call(b3, prop))
      __defNormalProp(a3, prop, b3[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b3)) {
      if (__propIsEnum.call(b3, prop))
        __defNormalProp(a3, prop, b3[prop]);
    }
  return a3;
};
var __spreadProps = (a3, b3) => __defProps(a3, __getOwnPropDescs(b3));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../node_modules/.pnpm/dayjs@1.11.4/node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "../../node_modules/.pnpm/dayjs@1.11.4/node_modules/dayjs/dayjs.min.js"(exports, module) {
    !function(t3, e2) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e2() : "function" == typeof define && define.amd ? define(e2) : (t3 = "undefined" != typeof globalThis ? globalThis : t3 || self).dayjs = e2();
    }(exports, function() {
      "use strict";
      var t3 = 1e3, e2 = 6e4, n4 = 36e5, r2 = "millisecond", i3 = "second", s3 = "minute", u3 = "hour", a3 = "day", o3 = "week", f3 = "month", h3 = "quarter", c3 = "year", d2 = "date", $ = "Invalid Date", l3 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m4 = function(t4, e3, n5) {
        var r3 = String(t4);
        return !r3 || r3.length >= e3 ? t4 : "" + Array(e3 + 1 - r3.length).join(n5) + t4;
      }, g3 = { s: m4, z: function(t4) {
        var e3 = -t4.utcOffset(), n5 = Math.abs(e3), r3 = Math.floor(n5 / 60), i4 = n5 % 60;
        return (e3 <= 0 ? "+" : "-") + m4(r3, 2, "0") + ":" + m4(i4, 2, "0");
      }, m: function t4(e3, n5) {
        if (e3.date() < n5.date())
          return -t4(n5, e3);
        var r3 = 12 * (n5.year() - e3.year()) + (n5.month() - e3.month()), i4 = e3.clone().add(r3, f3), s4 = n5 - i4 < 0, u4 = e3.clone().add(r3 + (s4 ? -1 : 1), f3);
        return +(-(r3 + (n5 - i4) / (s4 ? i4 - u4 : u4 - i4)) || 0);
      }, a: function(t4) {
        return t4 < 0 ? Math.ceil(t4) || 0 : Math.floor(t4);
      }, p: function(t4) {
        return { M: f3, y: c3, w: o3, d: a3, D: d2, h: u3, m: s3, s: i3, ms: r2, Q: h3 }[t4] || String(t4 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t4) {
        return void 0 === t4;
      } }, v2 = "en", D3 = {};
      D3[v2] = M2;
      var p2 = function(t4) {
        return t4 instanceof _;
      }, S3 = function t4(e3, n5, r3) {
        var i4;
        if (!e3)
          return v2;
        if ("string" == typeof e3) {
          var s4 = e3.toLowerCase();
          D3[s4] && (i4 = s4), n5 && (D3[s4] = n5, i4 = s4);
          var u4 = e3.split("-");
          if (!i4 && u4.length > 1)
            return t4(u4[0]);
        } else {
          var a4 = e3.name;
          D3[a4] = e3, i4 = a4;
        }
        return !r3 && i4 && (v2 = i4), i4 || !r3 && v2;
      }, w3 = function(t4, e3) {
        if (p2(t4))
          return t4.clone();
        var n5 = "object" == typeof e3 ? e3 : {};
        return n5.date = t4, n5.args = arguments, new _(n5);
      }, O2 = g3;
      O2.l = S3, O2.i = p2, O2.w = function(t4, e3) {
        return w3(t4, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
      };
      var _ = function() {
        function M3(t4) {
          this.$L = S3(t4.locale, null, true), this.parse(t4);
        }
        var m5 = M3.prototype;
        return m5.parse = function(t4) {
          this.$d = function(t5) {
            var e3 = t5.date, n5 = t5.utc;
            if (null === e3)
              return /* @__PURE__ */ new Date(NaN);
            if (O2.u(e3))
              return /* @__PURE__ */ new Date();
            if (e3 instanceof Date)
              return new Date(e3);
            if ("string" == typeof e3 && !/Z$/i.test(e3)) {
              var r3 = e3.match(l3);
              if (r3) {
                var i4 = r3[2] - 1 || 0, s4 = (r3[7] || "0").substring(0, 3);
                return n5 ? new Date(Date.UTC(r3[1], i4, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s4)) : new Date(r3[1], i4, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s4);
              }
            }
            return new Date(e3);
          }(t4), this.$x = t4.x || {}, this.init();
        }, m5.init = function() {
          var t4 = this.$d;
          this.$y = t4.getFullYear(), this.$M = t4.getMonth(), this.$D = t4.getDate(), this.$W = t4.getDay(), this.$H = t4.getHours(), this.$m = t4.getMinutes(), this.$s = t4.getSeconds(), this.$ms = t4.getMilliseconds();
        }, m5.$utils = function() {
          return O2;
        }, m5.isValid = function() {
          return !(this.$d.toString() === $);
        }, m5.isSame = function(t4, e3) {
          var n5 = w3(t4);
          return this.startOf(e3) <= n5 && n5 <= this.endOf(e3);
        }, m5.isAfter = function(t4, e3) {
          return w3(t4) < this.startOf(e3);
        }, m5.isBefore = function(t4, e3) {
          return this.endOf(e3) < w3(t4);
        }, m5.$g = function(t4, e3, n5) {
          return O2.u(t4) ? this[e3] : this.set(n5, t4);
        }, m5.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m5.valueOf = function() {
          return this.$d.getTime();
        }, m5.startOf = function(t4, e3) {
          var n5 = this, r3 = !!O2.u(e3) || e3, h4 = O2.p(t4), $2 = function(t5, e4) {
            var i4 = O2.w(n5.$u ? Date.UTC(n5.$y, e4, t5) : new Date(n5.$y, e4, t5), n5);
            return r3 ? i4 : i4.endOf(a3);
          }, l4 = function(t5, e4) {
            return O2.w(n5.toDate()[t5].apply(n5.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n5);
          }, y3 = this.$W, M4 = this.$M, m6 = this.$D, g4 = "set" + (this.$u ? "UTC" : "");
          switch (h4) {
            case c3:
              return r3 ? $2(1, 0) : $2(31, 11);
            case f3:
              return r3 ? $2(1, M4) : $2(0, M4 + 1);
            case o3:
              var v3 = this.$locale().weekStart || 0, D4 = (y3 < v3 ? y3 + 7 : y3) - v3;
              return $2(r3 ? m6 - D4 : m6 + (6 - D4), M4);
            case a3:
            case d2:
              return l4(g4 + "Hours", 0);
            case u3:
              return l4(g4 + "Minutes", 1);
            case s3:
              return l4(g4 + "Seconds", 2);
            case i3:
              return l4(g4 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m5.endOf = function(t4) {
          return this.startOf(t4, false);
        }, m5.$set = function(t4, e3) {
          var n5, o4 = O2.p(t4), h4 = "set" + (this.$u ? "UTC" : ""), $2 = (n5 = {}, n5[a3] = h4 + "Date", n5[d2] = h4 + "Date", n5[f3] = h4 + "Month", n5[c3] = h4 + "FullYear", n5[u3] = h4 + "Hours", n5[s3] = h4 + "Minutes", n5[i3] = h4 + "Seconds", n5[r2] = h4 + "Milliseconds", n5)[o4], l4 = o4 === a3 ? this.$D + (e3 - this.$W) : e3;
          if (o4 === f3 || o4 === c3) {
            var y3 = this.clone().set(d2, 1);
            y3.$d[$2](l4), y3.init(), this.$d = y3.set(d2, Math.min(this.$D, y3.daysInMonth())).$d;
          } else
            $2 && this.$d[$2](l4);
          return this.init(), this;
        }, m5.set = function(t4, e3) {
          return this.clone().$set(t4, e3);
        }, m5.get = function(t4) {
          return this[O2.p(t4)]();
        }, m5.add = function(r3, h4) {
          var d3, $2 = this;
          r3 = Number(r3);
          var l4 = O2.p(h4), y3 = function(t4) {
            var e3 = w3($2);
            return O2.w(e3.date(e3.date() + Math.round(t4 * r3)), $2);
          };
          if (l4 === f3)
            return this.set(f3, this.$M + r3);
          if (l4 === c3)
            return this.set(c3, this.$y + r3);
          if (l4 === a3)
            return y3(1);
          if (l4 === o3)
            return y3(7);
          var M4 = (d3 = {}, d3[s3] = e2, d3[u3] = n4, d3[i3] = t3, d3)[l4] || 1, m6 = this.$d.getTime() + r3 * M4;
          return O2.w(m6, this);
        }, m5.subtract = function(t4, e3) {
          return this.add(-1 * t4, e3);
        }, m5.format = function(t4) {
          var e3 = this, n5 = this.$locale();
          if (!this.isValid())
            return n5.invalidDate || $;
          var r3 = t4 || "YYYY-MM-DDTHH:mm:ssZ", i4 = O2.z(this), s4 = this.$H, u4 = this.$m, a4 = this.$M, o4 = n5.weekdays, f4 = n5.months, h4 = function(t5, n6, i5, s5) {
            return t5 && (t5[n6] || t5(e3, r3)) || i5[n6].slice(0, s5);
          }, c4 = function(t5) {
            return O2.s(s4 % 12 || 12, t5, "0");
          }, d3 = n5.meridiem || function(t5, e4, n6) {
            var r4 = t5 < 12 ? "AM" : "PM";
            return n6 ? r4.toLowerCase() : r4;
          }, l4 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a4 + 1, MM: O2.s(a4 + 1, 2, "0"), MMM: h4(n5.monthsShort, a4, f4, 3), MMMM: h4(f4, a4), D: this.$D, DD: O2.s(this.$D, 2, "0"), d: String(this.$W), dd: h4(n5.weekdaysMin, this.$W, o4, 2), ddd: h4(n5.weekdaysShort, this.$W, o4, 3), dddd: o4[this.$W], H: String(s4), HH: O2.s(s4, 2, "0"), h: c4(1), hh: c4(2), a: d3(s4, u4, true), A: d3(s4, u4, false), m: String(u4), mm: O2.s(u4, 2, "0"), s: String(this.$s), ss: O2.s(this.$s, 2, "0"), SSS: O2.s(this.$ms, 3, "0"), Z: i4 };
          return r3.replace(y2, function(t5, e4) {
            return e4 || l4[t5] || i4.replace(":", "");
          });
        }, m5.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m5.diff = function(r3, d3, $2) {
          var l4, y3 = O2.p(d3), M4 = w3(r3), m6 = (M4.utcOffset() - this.utcOffset()) * e2, g4 = this - M4, v3 = O2.m(this, M4);
          return v3 = (l4 = {}, l4[c3] = v3 / 12, l4[f3] = v3, l4[h3] = v3 / 3, l4[o3] = (g4 - m6) / 6048e5, l4[a3] = (g4 - m6) / 864e5, l4[u3] = g4 / n4, l4[s3] = g4 / e2, l4[i3] = g4 / t3, l4)[y3] || g4, $2 ? v3 : O2.a(v3);
        }, m5.daysInMonth = function() {
          return this.endOf(f3).$D;
        }, m5.$locale = function() {
          return D3[this.$L];
        }, m5.locale = function(t4, e3) {
          if (!t4)
            return this.$L;
          var n5 = this.clone(), r3 = S3(t4, e3, true);
          return r3 && (n5.$L = r3), n5;
        }, m5.clone = function() {
          return O2.w(this.$d, this);
        }, m5.toDate = function() {
          return new Date(this.valueOf());
        }, m5.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m5.toISOString = function() {
          return this.$d.toISOString();
        }, m5.toString = function() {
          return this.$d.toUTCString();
        }, M3;
      }(), T3 = _.prototype;
      return w3.prototype = T3, [["$ms", r2], ["$s", i3], ["$m", s3], ["$H", u3], ["$W", a3], ["$M", f3], ["$y", c3], ["$D", d2]].forEach(function(t4) {
        T3[t4[1]] = function(e3) {
          return this.$g(e3, t4[0], t4[1]);
        };
      }), w3.extend = function(t4, e3) {
        return t4.$i || (t4(e3, _, w3), t4.$i = true), w3;
      }, w3.locale = S3, w3.isDayjs = p2, w3.unix = function(t4) {
        return w3(1e3 * t4);
      }, w3.en = D3[v2], w3.Ls = D3, w3.p = {}, w3;
    });
  }
});

// src/index.tsx
import path5 from "path";
import fs3 from "fs";

// ../../packages/template/index.mjs
var import_dayjs = __toESM(require_dayjs_min(), 1);
import fs from "fs";
import path from "path";

// ../../node_modules/.pnpm/marked@4.0.18/node_modules/marked/lib/marked.esm.js
function getDefaults() {
  return {
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
var defaults = getDefaults();
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = /[&<>"']/g;
var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html) {
  return html.replace(unescapeTest, (_, n4) => {
    n4 = n4.toLowerCase();
    if (n4 === "colon")
      return ":";
    if (n4.charAt(0) === "#") {
      return n4.charAt(1) === "x" ? String.fromCharCode(parseInt(n4.substring(2), 16)) : String.fromCharCode(+n4.substring(1));
    }
    return "";
  });
}
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
var nonWordAndColonTest = /[^\w:]/g;
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e2) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e2) {
    return null;
  }
  return href;
}
var baseUrls = {};
var justDomain = /^[^:]+:\/*[^/]*$/;
var protocol = /^([^:]+:)[\s\S]*$/;
var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, "$1") + href;
  } else {
    return base + href;
  }
}
var noopTest = { exec: function noopTest2() {
} };
function merge(obj) {
  let i3 = 1, target, key;
  for (; i3 < arguments.length; i3++) {
    target = arguments[i3];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }
  return obj;
}
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i3 = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i3 < cells.length; i3++) {
    cells[i3] = cells[i3].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c3, invert) {
  const l3 = str.length;
  if (l3 === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l3) {
    const currChar = str.charAt(l3 - suffLen - 1);
    if (currChar === c3 && !invert) {
      suffLen++;
    } else if (currChar !== c3 && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l3 - suffLen);
}
function findClosingBracket(str, b3) {
  if (str.indexOf(b3[1]) === -1) {
    return -1;
  }
  const l3 = str.length;
  let level = 0, i3 = 0;
  for (; i3 < l3; i3++) {
    if (str[i3] === "\\") {
      i3++;
    } else if (str[i3] === b3[0]) {
      level++;
    } else if (str[i3] === b3[1]) {
      level--;
      if (level < 0) {
        return i3;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
function outputLink(cap, link, raw, lexer2) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text, [])
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var Tokenizer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim() : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      const token = {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *>[ \t]?/gm, "");
      return {
        type: "blockquote",
        raw: cap[0],
        tokens: this.lexer.blockTokens(text, []),
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i3, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      while (src) {
        endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        line = cap[2].split("\n", 1)[0];
        nextLine = src.split("\n", 1)[0];
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            rawLine = src.split("\n", 1)[0];
            line = rawLine;
            if (this.options.pedantic) {
              line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(line)) {
              break;
            }
            if (headingBeginRegex.test(line)) {
              break;
            }
            if (nextBulletRegex.test(line)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (line.search(/[^ ]/) >= indent || !line.trim()) {
              itemContents += "\n" + line.slice(indent);
            } else if (!blankLine) {
              itemContents += "\n" + line;
            } else {
              break;
            }
            if (!blankLine && !line.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l3 = list.items.length;
      for (i3 = 0; i3 < l3; i3++) {
        this.lexer.state.top = false;
        list.items[i3].tokens = this.lexer.blockTokens(list.items[i3].text, []);
        const spacers = list.items[i3].tokens.filter((t3) => t3.type === "space");
        const hasMultipleLineBreaks = spacers.every((t3) => {
          const chars = t3.raw.split("");
          let lineBreaks = 0;
          for (const char of chars) {
            if (char === "\n") {
              lineBreaks += 1;
            }
            if (lineBreaks > 1) {
              return true;
            }
          }
          return false;
        });
        if (!list.loose && spacers.length && hasMultipleLineBreaks) {
          list.loose = true;
          list.items[i3].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        token.type = "paragraph";
        token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
        token.tokens = [];
        this.lexer.inline(token.text, token.tokens);
      }
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      if (cap[3])
        cap[3] = cap[3].substring(1, cap[3].length - 1);
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      return {
        type: "def",
        tag,
        raw: cap[0],
        href: cap[2],
        title: cap[3]
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: "table",
        header: splitCells(cap[1]).map((c3) => {
          return { text: c3 };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap[0];
        let l3 = item.align.length;
        let i3, j3, k3, row;
        for (i3 = 0; i3 < l3; i3++) {
          if (/^ *-+: *$/.test(item.align[i3])) {
            item.align[i3] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i3])) {
            item.align[i3] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i3])) {
            item.align[i3] = "left";
          } else {
            item.align[i3] = null;
          }
        }
        l3 = item.rows.length;
        for (i3 = 0; i3 < l3; i3++) {
          item.rows[i3] = splitCells(item.rows[i3], item.header.length).map((c3) => {
            return { text: c3 };
          });
        }
        l3 = item.header.length;
        for (j3 = 0; j3 < l3; j3++) {
          item.header[j3].tokens = [];
          this.lexer.inline(item.header[j3].text, item.header[j3].tokens);
        }
        l3 = item.rows.length;
        for (j3 = 0; j3 < l3; j3++) {
          row = item.rows[j3];
          for (k3 = 0; k3 < row.length; k3++) {
            row[k3].tokens = [];
            this.lexer.inline(row[k3].text, row[k3].tokens);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      const token = {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const token = {
        type: "paragraph",
        raw: cap[0],
        text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      const token = {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = src.slice(1, lLength + match.index + rLength);
          return {
            type: "em",
            raw: src.slice(0, lLength + match.index + rLength + 1),
            text: text2,
            tokens: this.lexer.inlineTokens(text2, [])
          };
        }
        const text = src.slice(2, lLength + match.index + rLength - 1);
        return {
          type: "strong",
          raw: src.slice(0, lLength + match.index + rLength + 1),
          text,
          tokens: this.lexer.inlineTokens(text, [])
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2], [])
      };
    }
  }
  autolink(src, mangle2) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + text;
        } else {
          href = text;
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
      } else {
        text = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
var block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = merge({}, block);
block.gfm = merge({}, block.normal, {
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  // Cells
});
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = merge({}, block.normal, {
  html: edit(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
});
var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //          () Skip orphan inside strong  () Consume to delim (1) #***                (2) a***#, a***                   (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
    rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
    // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline.escapedEmSt = /\\\*|\\_/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = merge({}, inline);
inline.pedantic = merge({}, inline.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
});
inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
function smartypants(text) {
  return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text) {
  let out = "", i3, ch;
  const l3 = text.length;
  for (i3 = 0; i3 < l3; i3++) {
    ch = text.charCodeAt(i3);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
var Lexer = class _Lexer {
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new _Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new _Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  /**
   * Lexing
   */
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens) {
    this.inlineQueue.push({ src, tokens });
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var Renderer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  }
  /**
   * @param {string} quote
   */
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html) {
    return html;
  }
  /**
   * @param {string} text
   * @param {string} level
   * @param {string} raw
   * @param {any} slugger
   */
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text}</h${level}>
`;
    }
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  /**
   * @param {string} text
   */
  listitem(text) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  /**
   * @param {string} text
   */
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  /**
   * @param {string} header
   * @param {string} body
   */
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  /**
   * @param {string} content
   */
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag + content + `</${type}>
`;
  }
  /**
   * span level renderer
   * @param {string} text
   */
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  /**
   * @param {string} text
   */
  em(text) {
    return `<em>${text}</em>`;
  }
  /**
   * @param {string} text
   */
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  /**
   * @param {string} text
   */
  del(text) {
    return `<del>${text}</del>`;
  }
  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return text;
  }
};
var TextRenderer = class {
  // no need for block level renderers
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var Slugger = class {
  constructor() {
    this.seen = {};
  }
  /**
   * @param {string} value
   */
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  /**
   * Finds the next safe (unique) slug to use
   * @param {string} originalSlug
   * @param {boolean} isDryRun
   */
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  /**
   * Convert string to unique id
   * @param {object} [options]
   * @param {boolean} [options.dryrun] Generates the next unique slug without
   * updating the internal accumulator.
   */
  slug(value, options2 = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options2.dryrun);
  }
};
var Parser = class _Parser {
  constructor(options2) {
    this.options = options2 || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new _Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new _Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "", i3, j3, k3, l22, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
    const l4 = tokens.length;
    for (i3 = 0; i3 < l4; i3++) {
      token = tokens[i3];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape(this.parseInline(token.tokens, this.textRenderer)),
            this.slugger
          );
          continue;
        }
        case "code": {
          out += this.renderer.code(
            token.text,
            token.lang,
            token.escaped
          );
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l22 = token.header.length;
          for (j3 = 0; j3 < l22; j3++) {
            cell += this.renderer.tablecell(
              this.parseInline(token.header[j3].tokens),
              { header: true, align: token.align[j3] }
            );
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l22 = token.rows.length;
          for (j3 = 0; j3 < l22; j3++) {
            row = token.rows[j3];
            cell = "";
            l3 = row.length;
            for (k3 = 0; k3 < l3; k3++) {
              cell += this.renderer.tablecell(
                this.parseInline(row[k3].tokens),
                { header: false, align: token.align[k3] }
              );
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l22 = token.items.length;
          body = "";
          for (j3 = 0; j3 < l22; j3++) {
            item = token.items[j3];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i3 + 1 < l4 && tokens[i3 + 1].type === "text") {
            token = tokens[++i3];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "", i3, token, ret;
    const l3 = tokens.length;
    for (i3 = 0; i3 < l3; i3++) {
      token = tokens[i3];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer.text(token.text);
          break;
        }
        case "html": {
          out += renderer.html(token.text);
          break;
        }
        case "link": {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case "image": {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case "em": {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case "codespan": {
          out += renderer.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case "text": {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
function marked(src, opt, callback) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  if (typeof opt === "function") {
    callback = opt;
    opt = null;
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  if (callback) {
    const highlight = opt.highlight;
    let tokens;
    try {
      tokens = Lexer.lex(src, opt);
    } catch (e2) {
      return callback(e2);
    }
    const done = function(err) {
      let out;
      if (!err) {
        try {
          if (opt.walkTokens) {
            marked.walkTokens(tokens, opt.walkTokens);
          }
          out = Parser.parse(tokens, opt);
        } catch (e2) {
          err = e2;
        }
      }
      opt.highlight = highlight;
      return err ? callback(err) : callback(null, out);
    };
    if (!highlight || highlight.length < 3) {
      return done();
    }
    delete opt.highlight;
    if (!tokens.length)
      return done();
    let pending = 0;
    marked.walkTokens(tokens, function(token) {
      if (token.type === "code") {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function(err, code) {
            if (err) {
              return done(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }
            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });
    if (pending === 0) {
      done();
    }
    return;
  }
  try {
    const tokens = Lexer.lex(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parse(tokens, opt);
  } catch (e2) {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
    }
    throw e2;
  }
}
marked.options = marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = getDefaults;
marked.defaults = defaults;
marked.use = function(...args) {
  const opts = merge({}, ...args);
  const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
  let hasExtensions;
  args.forEach((pack) => {
    if (pack.extensions) {
      hasExtensions = true;
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
          if (prevRenderer) {
            extensions.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
    }
    if (pack.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args2) => {
          let ret = pack.renderer[prop].apply(renderer, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args2) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack.walkTokens) {
      const walkTokens2 = marked.defaults.walkTokens;
      opts.walkTokens = function(token) {
        pack.walkTokens.call(this, token);
        if (walkTokens2) {
          walkTokens2.call(this, token);
        }
      };
    }
    if (hasExtensions) {
      opts.extensions = extensions;
    }
    marked.setOptions(opts);
  });
};
marked.walkTokens = function(tokens, callback) {
  for (const token of tokens) {
    callback.call(marked, token);
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          marked.walkTokens(cell.tokens, callback);
        }
        for (const row of token.rows) {
          for (const cell of row) {
            marked.walkTokens(cell.tokens, callback);
          }
        }
        break;
      }
      case "list": {
        marked.walkTokens(token.items, callback);
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            marked.walkTokens(token[childTokens], callback);
          });
        } else if (token.tokens) {
          marked.walkTokens(token.tokens, callback);
        }
      }
    }
  }
};
marked.parseInline = function(src, opt) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked.parseInline(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  try {
    const tokens = Lexer.lexInline(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parseInline(tokens, opt);
  } catch (e2) {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
    }
    throw e2;
  }
};
marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = Parser.parse;
var lexer = Lexer.lex;

// ../../packages/template/index.mjs
var render = (template, config, layer) => {
  layer = layer || 0;
  if (layer > 10) {
    throw new Error(
      "More than 10 nested imports discovered. Either you have a very deep import tree (please don't), or there's a circular import, which is not supported."
    );
  }
  const baseDir = config._baseDir || process.cwd();
  const escapedTemplate = template;
  const o3 = __spreadValues({}, config);
  const premadePartials = __spreadValues({}, config._partials) || {};
  for (let key of Object.keys(premadePartials)) {
    const possiblePath = premadePartials[key];
    if (possiblePath.endsWith(".html")) {
      const partialPath = path.resolve(baseDir, possiblePath);
      if (!fs.existsSync(partialPath)) {
        console.warn(`Partial at path ${partialPath} was not found. Your site may look incorrect.`);
        continue;
      }
      premadePartials[key] = fs.readFileSync(partialPath, "utf-8");
    }
  }
  const splits = escapedTemplate.split(/\r\n|\r|\n/g);
  let finishedImports = false;
  let processedTemplate = "";
  const importedPartials = {};
  for (const line of splits) {
    if (finishedImports) {
      processedTemplate += line + "\n";
      continue;
    }
    if (!line.trim().length) {
      continue;
    }
    if (line.startsWith("import ")) {
      const tokens = line.split(" ");
      if (tokens.length < 3) {
        throw new Error("Invalid import statement");
      }
      const key = tokens[1];
      const value = tokens[tokens.length - 1];
      let partialPath = value;
      if (partialPath.startsWith('"') || partialPath.startsWith("'")) {
        partialPath = partialPath.slice(1);
      }
      if (partialPath.endsWith('"') || partialPath.endsWith("'")) {
        partialPath = partialPath.slice(0, partialPath.length - 1);
      }
      importedPartials[key] = fs.readFileSync(path.resolve(baseDir, partialPath), "utf-8");
      continue;
    }
    processedTemplate += line + "\n";
    finishedImports = true;
  }
  const unparsedPartials = __spreadValues(__spreadValues({}, premadePartials), importedPartials);
  o3._partials = unparsedPartials;
  const partials = {};
  for (let key of Object.keys(unparsedPartials)) {
    const p2 = unparsedPartials[key];
    if (template.indexOf("partials." + key) > -1 || template.indexOf('macro("' + key) > -1 || template.indexOf("macro('" + key) > -1) {
      partials[key] = render(p2, o3, layer + 1);
    }
  }
  const macro = (partialName, vars) => {
    const macroConfig = __spreadProps(__spreadValues({}, vars), {
      _partials: unparsedPartials
    });
    if (typeof partialName !== "string") {
      throw new Error(
        "The macro first argument should be a string that is either the name of the partial, or a link to the partial value"
      );
    }
    const partialValue = unparsedPartials[partialName] || partialName;
    return render(partialValue, macroConfig, layer + 1);
  };
  const md = (text) => {
    return marked.parse(text, {
      smartypants: true,
      smartLists: true
    });
  };
  const date = (rawDate) => {
    return (0, import_dayjs.default)(rawDate).format("MMM D, YYYY");
  };
  const moreTemplateStrings = /^(?!.*\\\${).*\${/gm;
  let currentString = processedTemplate;
  let renderLayers = 0;
  while (moreTemplateStrings.test(currentString) === true && currentString.indexOf("}") > -1) {
    renderLayers += 1;
    if (renderLayers > 10) {
      throw new Error(
        "More than 10 nested imports discovered. Either you have a very deep import tree (please don't), or there's a circular import, which is not supported."
      );
    }
    const evaluationFunction = new Function("o", "macro", "md", "date", "partials", `
			return \`${currentString}\`
		`);
    currentString = evaluationFunction(o3, macro, md, date, partials);
  }
  return currentString.replace(/\\\$/gm, "$");
};

// ../../packages/common/src/url.ts
import path2 from "path";
var defaultUrl = (file, site) => {
  var _a;
  let relativeDir;
  if ((_a = file.configuration) == null ? void 0 : _a.dir) {
    const resolvedDir = path2.resolve(site.contentDirectory, file.configuration.dir);
    relativeDir = path2.relative(site.contentDirectory, resolvedDir);
  } else {
    relativeDir = path2.relative(site.contentDirectory, file.sourceDir);
  }
  let urlPiece = relativeDir + path2.sep + file.name;
  if (file.name === "index") {
    const pathSplit = file.id.split(path2.sep);
    if (pathSplit.length > 1) {
      const targetDir = pathSplit[pathSplit.length - 2];
      const relativeSplit = relativeDir.split(path2.sep);
      if (targetDir !== relativeSplit[relativeSplit.length - 1]) {
        urlPiece = relativeDir + path2.sep + targetDir + path2.sep + "index";
      }
    }
  }
  if (["404", "index"].includes(file.name)) {
    return urlPiece + ".html";
  }
  return urlPiece + path2.sep + "index.html";
};

// ../../packages/common/src/title.ts
var defaultTitle = (file, site) => {
  var _a;
  const page = file;
  let title = "";
  if (page.text.trimStart().startsWith("#")) {
    title = page.text.trim().split(/\r\n|\r|\n/g)[0].slice(2).trim();
  }
  return ((_a = file.configuration) == null ? void 0 : _a.title) || title || file.name;
};

// ../../packages/common/src/gen.ts
import path3 from "path";
import fs2 from "fs";
var genLayout = (siteInfo, file) => {
  var _a;
  const layout = ((_a = file.configuration) == null ? void 0 : _a.layout) || "default";
  const layoutPath = path3.resolve(siteInfo.frameDirectory, "layouts", layout + ".html");
  let layoutText = "${o.content}";
  if (fs2.existsSync(layoutPath)) {
    layoutText = fs2.readFileSync(path3.resolve(siteInfo.frameDirectory, "layouts", layout + ".html")).toString();
  }
  return layoutText;
};
var genPageStatics = (file, allFiles) => {
  const possiblePageStatics = allFiles.getFilesWithSimilarNames(file);
  const staticObj = {
    statics: []
  };
  for (let staticFile of possiblePageStatics) {
    if (staticFile.ext === ".css") {
      staticObj.css = staticFile;
    } else if (staticFile.ext === ".js") {
      staticObj.js = staticFile;
    } else {
      staticObj.statics.push(staticFile);
    }
  }
  return staticObj;
};
var genFeeds = (file, filePool, allURLs) => {
  var _a;
  const feeds = {};
  const referenceFeeds = {};
  if ((_a = file.configuration) == null ? void 0 : _a.feeds) {
    for (let feedName of Object.keys(file.configuration.feeds)) {
      const feed = file.configuration.feeds[feedName];
      const rawQuery = feed.query;
      let query = {};
      query.sortBy = feed.sortBy;
      query.isAscending = feed.isAscending;
      query.limit = feed.limit;
      if (typeof rawQuery === "string") {
        if (rawQuery.startsWith(".")) {
          const directory = path3.resolve(file.sourceDir, rawQuery);
          feeds[feedName] = filePool.queryDirectory(directory, query, false);
          continue;
        }
        if (rawQuery.toLocaleLowerCase().startsWith("dir:")) {
          const directory = path3.resolve(file.sourceDir, rawQuery.slice(4));
          feeds[feedName] = filePool.queryDirectory(directory, query, false);
          continue;
        }
        query.rawQuery = rawQuery;
      } else if (Array.isArray(rawQuery)) {
        query.predicates = rawQuery;
      } else {
        query.predicates = [rawQuery];
      }
      feeds[feedName] = filePool.query(query);
    }
  }
  for (let feedName in feeds) {
    const rawFeed = feeds[feedName];
    referenceFeeds[feedName] = [];
    for (let feedFile of rawFeed) {
      referenceFeeds[feedName].push(genPageReference(feedFile, filePool, allURLs));
    }
  }
  return referenceFeeds;
};
var genPageReference = (file, filePool, allURLs, existingFeed) => {
  var _a;
  const pageReference = {
    id: file.id,
    title: (_a = file.title) != null ? _a : file.name,
    //TODO: actual method to get the title
    url: "/" + allURLs[file.id],
    sourceName: path3.basename(file.sourcePath),
    // filename before we did any processing
    created: file.created,
    updated: file.updated,
    date: file.date,
    configuration: file.configuration
  };
  if (existingFeed) {
    const currentIndex = existingFeed.indexOf(file);
    if (currentIndex > 0) {
      pageReference.previousPage = genPageReference(
        existingFeed[currentIndex - 1],
        filePool,
        allURLs
      );
    }
    if (currentIndex >= 0 && currentIndex < existingFeed.length - 1) {
      pageReference.nextPage = genPageReference(existingFeed[currentIndex + 1], filePool, allURLs);
    }
  }
  return pageReference;
};

// ../../packages/common/src/get-relative-url.ts
import path4 from "path";
var getRelativeURL = (site, sourceFileURL, targetURL) => {
  const newLink = path4.relative(
    path4.resolve(site.contentDirectory, path4.dirname(sourceFileURL)),
    path4.resolve(site.contentDirectory, targetURL)
  );
  return newLink;
};

// ../../node_modules/.pnpm/preact@10.20.1/node_modules/preact/dist/preact.mjs
var n;
var l;
var u;
var t;
var i;
var o;
var r;
var f;
var e;
var c = {};
var s = [];
var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var h = Array.isArray;
function v(n4, l3) {
  for (var u3 in l3)
    n4[u3] = l3[u3];
  return n4;
}
function p(n4) {
  var l3 = n4.parentNode;
  l3 && l3.removeChild(n4);
}
function y(l3, u3, t3) {
  var i3, o3, r2, f3 = {};
  for (r2 in u3)
    "key" == r2 ? i3 = u3[r2] : "ref" == r2 ? o3 = u3[r2] : f3[r2] = u3[r2];
  if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps)
    for (r2 in l3.defaultProps)
      void 0 === f3[r2] && (f3[r2] = l3.defaultProps[r2]);
  return d(l3, f3, i3, o3, null);
}
function d(n4, t3, i3, o3, r2) {
  var f3 = { type: n4, props: t3, key: i3, ref: o3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r2 ? ++u : r2, __i: -1, __u: 0 };
  return null == r2 && null != l.vnode && l.vnode(f3), f3;
}
function g(n4) {
  return n4.children;
}
function b(n4, l3) {
  this.props = n4, this.context = l3;
}
function m(n4, l3) {
  if (null == l3)
    return n4.__ ? m(n4.__, n4.__i + 1) : null;
  for (var u3; l3 < n4.__k.length; l3++)
    if (null != (u3 = n4.__k[l3]) && null != u3.__e)
      return u3.__e;
  return "function" == typeof n4.type ? m(n4) : null;
}
function w(n4) {
  var l3, u3;
  if (null != (n4 = n4.__) && null != n4.__c) {
    for (n4.__e = n4.__c.base = null, l3 = 0; l3 < n4.__k.length; l3++)
      if (null != (u3 = n4.__k[l3]) && null != u3.__e) {
        n4.__e = n4.__c.base = u3.__e;
        break;
      }
    return w(n4);
  }
}
function k(n4) {
  (!n4.__d && (n4.__d = true) && i.push(n4) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
}
function x() {
  var n4, u3, t3, o3, r2, e2, c3, s3, a3;
  for (i.sort(f); n4 = i.shift(); )
    n4.__d && (u3 = i.length, o3 = void 0, e2 = (r2 = (t3 = n4).__v).__e, s3 = [], a3 = [], (c3 = t3.__P) && ((o3 = v({}, r2)).__v = r2.__v + 1, l.vnode && l.vnode(o3), F(c3, o3, r2, t3.__n, void 0 !== c3.ownerSVGElement, 32 & r2.__u ? [e2] : null, s3, null == e2 ? m(r2) : e2, !!(32 & r2.__u), a3), o3.__v = r2.__v, o3.__.__k[o3.__i] = o3, L(s3, o3, a3), o3.__e != e2 && w(o3)), i.length > u3 && i.sort(f));
  x.__r = 0;
}
function C(n4, l3, u3, t3, i3, o3, r2, f3, e2, a3, h3) {
  var v2, p2, y2, d2, _, g3 = t3 && t3.__k || s, b3 = l3.length;
  for (u3.__d = e2, P(u3, l3, g3), e2 = u3.__d, v2 = 0; v2 < b3; v2++)
    null != (y2 = u3.__k[v2]) && "boolean" != typeof y2 && "function" != typeof y2 && (p2 = -1 === y2.__i ? c : g3[y2.__i] || c, y2.__i = v2, F(n4, y2, p2, i3, o3, r2, f3, e2, a3, h3), d2 = y2.__e, y2.ref && p2.ref != y2.ref && (p2.ref && O(p2.ref, null, y2), h3.push(y2.ref, y2.__c || d2, y2)), null == _ && null != d2 && (_ = d2), 65536 & y2.__u || p2.__k === y2.__k ? (d2 || p2.__e != e2 || (e2 = m(p2)), e2 = S(y2, e2, n4)) : "function" == typeof y2.type && void 0 !== y2.__d ? e2 = y2.__d : d2 && (e2 = d2.nextSibling), y2.__d = void 0, y2.__u &= -196609);
  u3.__d = e2, u3.__e = _;
}
function P(n4, l3, u3) {
  var t3, i3, o3, r2, f3, e2 = l3.length, c3 = u3.length, s3 = c3, a3 = 0;
  for (n4.__k = [], t3 = 0; t3 < e2; t3++)
    r2 = t3 + a3, null != (i3 = n4.__k[t3] = null == (i3 = l3[t3]) || "boolean" == typeof i3 || "function" == typeof i3 ? null : "string" == typeof i3 || "number" == typeof i3 || "bigint" == typeof i3 || i3.constructor == String ? d(null, i3, null, null, null) : h(i3) ? d(g, { children: i3 }, null, null, null) : void 0 === i3.constructor && i3.__b > 0 ? d(i3.type, i3.props, i3.key, i3.ref ? i3.ref : null, i3.__v) : i3) ? (i3.__ = n4, i3.__b = n4.__b + 1, f3 = I(i3, u3, r2, s3), i3.__i = f3, o3 = null, -1 !== f3 && (s3--, (o3 = u3[f3]) && (o3.__u |= 131072)), null == o3 || null === o3.__v ? (-1 == f3 && a3--, "function" != typeof i3.type && (i3.__u |= 65536)) : f3 !== r2 && (f3 === r2 + 1 ? a3++ : f3 > r2 ? s3 > e2 - r2 ? a3 += f3 - r2 : a3-- : f3 < r2 ? f3 == r2 - 1 && (a3 = f3 - r2) : a3 = 0, f3 !== t3 + a3 && (i3.__u |= 65536))) : (o3 = u3[r2]) && null == o3.key && o3.__e && 0 == (131072 & o3.__u) && (o3.__e == n4.__d && (n4.__d = m(o3)), j(o3, o3, false), u3[r2] = null, s3--);
  if (s3)
    for (t3 = 0; t3 < c3; t3++)
      null != (o3 = u3[t3]) && 0 == (131072 & o3.__u) && (o3.__e == n4.__d && (n4.__d = m(o3)), j(o3, o3));
}
function S(n4, l3, u3) {
  var t3, i3;
  if ("function" == typeof n4.type) {
    for (t3 = n4.__k, i3 = 0; t3 && i3 < t3.length; i3++)
      t3[i3] && (t3[i3].__ = n4, l3 = S(t3[i3], l3, u3));
    return l3;
  }
  n4.__e != l3 && (u3.insertBefore(n4.__e, l3 || null), l3 = n4.__e);
  do {
    l3 = l3 && l3.nextSibling;
  } while (null != l3 && 8 === l3.nodeType);
  return l3;
}
function I(n4, l3, u3, t3) {
  var i3 = n4.key, o3 = n4.type, r2 = u3 - 1, f3 = u3 + 1, e2 = l3[u3];
  if (null === e2 || e2 && i3 == e2.key && o3 === e2.type && 0 == (131072 & e2.__u))
    return u3;
  if (t3 > (null != e2 && 0 == (131072 & e2.__u) ? 1 : 0))
    for (; r2 >= 0 || f3 < l3.length; ) {
      if (r2 >= 0) {
        if ((e2 = l3[r2]) && 0 == (131072 & e2.__u) && i3 == e2.key && o3 === e2.type)
          return r2;
        r2--;
      }
      if (f3 < l3.length) {
        if ((e2 = l3[f3]) && 0 == (131072 & e2.__u) && i3 == e2.key && o3 === e2.type)
          return f3;
        f3++;
      }
    }
  return -1;
}
function H(n4, l3, u3) {
  "-" === l3[0] ? n4.setProperty(l3, null == u3 ? "" : u3) : n4[l3] = null == u3 ? "" : "number" != typeof u3 || a.test(l3) ? u3 : u3 + "px";
}
function T(n4, l3, u3, t3, i3) {
  var o3;
  n:
    if ("style" === l3)
      if ("string" == typeof u3)
        n4.style.cssText = u3;
      else {
        if ("string" == typeof t3 && (n4.style.cssText = t3 = ""), t3)
          for (l3 in t3)
            u3 && l3 in u3 || H(n4.style, l3, "");
        if (u3)
          for (l3 in u3)
            t3 && u3[l3] === t3[l3] || H(n4.style, l3, u3[l3]);
      }
    else if ("o" === l3[0] && "n" === l3[1])
      o3 = l3 !== (l3 = l3.replace(/(PointerCapture)$|Capture$/i, "$1")), l3 = l3.toLowerCase() in n4 || "onFocusOut" === l3 || "onFocusIn" === l3 ? l3.toLowerCase().slice(2) : l3.slice(2), n4.l || (n4.l = {}), n4.l[l3 + o3] = u3, u3 ? t3 ? u3.u = t3.u : (u3.u = Date.now(), n4.addEventListener(l3, o3 ? D : A, o3)) : n4.removeEventListener(l3, o3 ? D : A, o3);
    else {
      if (i3)
        l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" !== l3 && "height" !== l3 && "href" !== l3 && "list" !== l3 && "form" !== l3 && "tabIndex" !== l3 && "download" !== l3 && "rowSpan" !== l3 && "colSpan" !== l3 && "role" !== l3 && l3 in n4)
        try {
          n4[l3] = null == u3 ? "" : u3;
          break n;
        } catch (n5) {
        }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" !== l3[4] ? n4.removeAttribute(l3) : n4.setAttribute(l3, u3));
    }
}
function A(n4) {
  if (this.l) {
    var u3 = this.l[n4.type + false];
    if (n4.t) {
      if (n4.t <= u3.u)
        return;
    } else
      n4.t = Date.now();
    return u3(l.event ? l.event(n4) : n4);
  }
}
function D(n4) {
  if (this.l)
    return this.l[n4.type + true](l.event ? l.event(n4) : n4);
}
function F(n4, u3, t3, i3, o3, r2, f3, e2, c3, s3) {
  var a3, p2, y2, d2, _, m4, w3, k3, x2, P3, S3, $, I2, H2, T3, A3 = u3.type;
  if (void 0 !== u3.constructor)
    return null;
  128 & t3.__u && (c3 = !!(32 & t3.__u), r2 = [e2 = u3.__e = t3.__e]), (a3 = l.__b) && a3(u3);
  n:
    if ("function" == typeof A3)
      try {
        if (k3 = u3.props, x2 = (a3 = A3.contextType) && i3[a3.__c], P3 = a3 ? x2 ? x2.props.value : a3.__ : i3, t3.__c ? w3 = (p2 = u3.__c = t3.__c).__ = p2.__E : ("prototype" in A3 && A3.prototype.render ? u3.__c = p2 = new A3(k3, P3) : (u3.__c = p2 = new b(k3, P3), p2.constructor = A3, p2.render = z), x2 && x2.sub(p2), p2.props = k3, p2.state || (p2.state = {}), p2.context = P3, p2.__n = i3, y2 = p2.__d = true, p2.__h = [], p2._sb = []), null == p2.__s && (p2.__s = p2.state), null != A3.getDerivedStateFromProps && (p2.__s == p2.state && (p2.__s = v({}, p2.__s)), v(p2.__s, A3.getDerivedStateFromProps(k3, p2.__s))), d2 = p2.props, _ = p2.state, p2.__v = u3, y2)
          null == A3.getDerivedStateFromProps && null != p2.componentWillMount && p2.componentWillMount(), null != p2.componentDidMount && p2.__h.push(p2.componentDidMount);
        else {
          if (null == A3.getDerivedStateFromProps && k3 !== d2 && null != p2.componentWillReceiveProps && p2.componentWillReceiveProps(k3, P3), !p2.__e && (null != p2.shouldComponentUpdate && false === p2.shouldComponentUpdate(k3, p2.__s, P3) || u3.__v === t3.__v)) {
            for (u3.__v !== t3.__v && (p2.props = k3, p2.state = p2.__s, p2.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.forEach(function(n5) {
              n5 && (n5.__ = u3);
            }), S3 = 0; S3 < p2._sb.length; S3++)
              p2.__h.push(p2._sb[S3]);
            p2._sb = [], p2.__h.length && f3.push(p2);
            break n;
          }
          null != p2.componentWillUpdate && p2.componentWillUpdate(k3, p2.__s, P3), null != p2.componentDidUpdate && p2.__h.push(function() {
            p2.componentDidUpdate(d2, _, m4);
          });
        }
        if (p2.context = P3, p2.props = k3, p2.__P = n4, p2.__e = false, $ = l.__r, I2 = 0, "prototype" in A3 && A3.prototype.render) {
          for (p2.state = p2.__s, p2.__d = false, $ && $(u3), a3 = p2.render(p2.props, p2.state, p2.context), H2 = 0; H2 < p2._sb.length; H2++)
            p2.__h.push(p2._sb[H2]);
          p2._sb = [];
        } else
          do {
            p2.__d = false, $ && $(u3), a3 = p2.render(p2.props, p2.state, p2.context), p2.state = p2.__s;
          } while (p2.__d && ++I2 < 25);
        p2.state = p2.__s, null != p2.getChildContext && (i3 = v(v({}, i3), p2.getChildContext())), y2 || null == p2.getSnapshotBeforeUpdate || (m4 = p2.getSnapshotBeforeUpdate(d2, _)), C(n4, h(T3 = null != a3 && a3.type === g && null == a3.key ? a3.props.children : a3) ? T3 : [T3], u3, t3, i3, o3, r2, f3, e2, c3, s3), p2.base = u3.__e, u3.__u &= -161, p2.__h.length && f3.push(p2), w3 && (p2.__E = p2.__ = null);
      } catch (n5) {
        u3.__v = null, c3 || null != r2 ? (u3.__e = e2, u3.__u |= c3 ? 160 : 32, r2[r2.indexOf(e2)] = null) : (u3.__e = t3.__e, u3.__k = t3.__k), l.__e(n5, u3, t3);
      }
    else
      null == r2 && u3.__v === t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : u3.__e = M(t3.__e, u3, t3, i3, o3, r2, f3, c3, s3);
  (a3 = l.diffed) && a3(u3);
}
function L(n4, u3, t3) {
  u3.__d = void 0;
  for (var i3 = 0; i3 < t3.length; i3++)
    O(t3[i3], t3[++i3], t3[++i3]);
  l.__c && l.__c(u3, n4), n4.some(function(u4) {
    try {
      n4 = u4.__h, u4.__h = [], n4.some(function(n5) {
        n5.call(u4);
      });
    } catch (n5) {
      l.__e(n5, u4.__v);
    }
  });
}
function M(l3, u3, t3, i3, o3, r2, f3, e2, s3) {
  var a3, v2, y2, d2, _, g3, b3, w3 = t3.props, k3 = u3.props, x2 = u3.type;
  if ("svg" === x2 && (o3 = true), null != r2) {
    for (a3 = 0; a3 < r2.length; a3++)
      if ((_ = r2[a3]) && "setAttribute" in _ == !!x2 && (x2 ? _.localName === x2 : 3 === _.nodeType)) {
        l3 = _, r2[a3] = null;
        break;
      }
  }
  if (null == l3) {
    if (null === x2)
      return document.createTextNode(k3);
    l3 = o3 ? document.createElementNS("http://www.w3.org/2000/svg", x2) : document.createElement(x2, k3.is && k3), r2 = null, e2 = false;
  }
  if (null === x2)
    w3 === k3 || e2 && l3.data === k3 || (l3.data = k3);
  else {
    if (r2 = r2 && n.call(l3.childNodes), w3 = t3.props || c, !e2 && null != r2)
      for (w3 = {}, a3 = 0; a3 < l3.attributes.length; a3++)
        w3[(_ = l3.attributes[a3]).name] = _.value;
    for (a3 in w3)
      _ = w3[a3], "children" == a3 || ("dangerouslySetInnerHTML" == a3 ? y2 = _ : "key" === a3 || a3 in k3 || T(l3, a3, null, _, o3));
    for (a3 in k3)
      _ = k3[a3], "children" == a3 ? d2 = _ : "dangerouslySetInnerHTML" == a3 ? v2 = _ : "value" == a3 ? g3 = _ : "checked" == a3 ? b3 = _ : "key" === a3 || e2 && "function" != typeof _ || w3[a3] === _ || T(l3, a3, _, w3[a3], o3);
    if (v2)
      e2 || y2 && (v2.__html === y2.__html || v2.__html === l3.innerHTML) || (l3.innerHTML = v2.__html), u3.__k = [];
    else if (y2 && (l3.innerHTML = ""), C(l3, h(d2) ? d2 : [d2], u3, t3, i3, o3 && "foreignObject" !== x2, r2, f3, r2 ? r2[0] : t3.__k && m(t3, 0), e2, s3), null != r2)
      for (a3 = r2.length; a3--; )
        null != r2[a3] && p(r2[a3]);
    e2 || (a3 = "value", void 0 !== g3 && (g3 !== l3[a3] || "progress" === x2 && !g3 || "option" === x2 && g3 !== w3[a3]) && T(l3, a3, g3, w3[a3], false), a3 = "checked", void 0 !== b3 && b3 !== l3[a3] && T(l3, a3, b3, w3[a3], false));
  }
  return l3;
}
function O(n4, u3, t3) {
  try {
    "function" == typeof n4 ? n4(u3) : n4.current = u3;
  } catch (n5) {
    l.__e(n5, t3);
  }
}
function j(n4, u3, t3) {
  var i3, o3;
  if (l.unmount && l.unmount(n4), (i3 = n4.ref) && (i3.current && i3.current !== n4.__e || O(i3, null, u3)), null != (i3 = n4.__c)) {
    if (i3.componentWillUnmount)
      try {
        i3.componentWillUnmount();
      } catch (n5) {
        l.__e(n5, u3);
      }
    i3.base = i3.__P = null, n4.__c = void 0;
  }
  if (i3 = n4.__k)
    for (o3 = 0; o3 < i3.length; o3++)
      i3[o3] && j(i3[o3], u3, t3 || "function" != typeof n4.type);
  t3 || null == n4.__e || p(n4.__e), n4.__ = n4.__e = n4.__d = void 0;
}
function z(n4, l3, u3) {
  return this.constructor(n4, u3);
}
n = s.slice, l = { __e: function(n4, l3, u3, t3) {
  for (var i3, o3, r2; l3 = l3.__; )
    if ((i3 = l3.__c) && !i3.__)
      try {
        if ((o3 = i3.constructor) && null != o3.getDerivedStateFromError && (i3.setState(o3.getDerivedStateFromError(n4)), r2 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n4, t3 || {}), r2 = i3.__d), r2)
          return i3.__E = i3;
      } catch (l4) {
        n4 = l4;
      }
  throw n4;
} }, u = 0, t = function(n4) {
  return null != n4 && null == n4.constructor;
}, b.prototype.setState = function(n4, l3) {
  var u3;
  u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = v({}, this.state), "function" == typeof n4 && (n4 = n4(v({}, u3), this.props)), n4 && v(u3, n4), null != n4 && this.__v && (l3 && this._sb.push(l3), k(this));
}, b.prototype.forceUpdate = function(n4) {
  this.__v && (this.__e = true, n4 && this.__h.push(n4), k(this));
}, b.prototype.render = g, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n4, l3) {
  return n4.__v.__b - l3.__v.__b;
}, x.__r = 0, e = 0;

// ../../node_modules/.pnpm/htm@3.1.1/node_modules/htm/dist/htm.mjs
var n2 = function(t3, s3, r2, e2) {
  var u3;
  s3[0] = 0;
  for (var h3 = 1; h3 < s3.length; h3++) {
    var p2 = s3[h3++], a3 = s3[h3] ? (s3[0] |= p2 ? 1 : 2, r2[s3[h3++]]) : s3[++h3];
    3 === p2 ? e2[0] = a3 : 4 === p2 ? e2[1] = Object.assign(e2[1] || {}, a3) : 5 === p2 ? (e2[1] = e2[1] || {})[s3[++h3]] = a3 : 6 === p2 ? e2[1][s3[++h3]] += a3 + "" : p2 ? (u3 = t3.apply(a3, n2(t3, a3, r2, ["", null])), e2.push(u3), a3[0] ? s3[0] |= 2 : (s3[h3 - 2] = 0, s3[h3] = u3)) : e2.push(a3);
  }
  return e2;
};
var t2 = /* @__PURE__ */ new Map();
function htm_default(s3) {
  var r2 = t2.get(this);
  return r2 || (r2 = /* @__PURE__ */ new Map(), t2.set(this, r2)), (r2 = n2(this, r2.get(s3) || (r2.set(s3, r2 = function(n4) {
    for (var t3, s4, r3 = 1, e2 = "", u3 = "", h3 = [0], p2 = function(n5) {
      1 === r3 && (n5 || (e2 = e2.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h3.push(0, n5, e2) : 3 === r3 && (n5 || e2) ? (h3.push(3, n5, e2), r3 = 2) : 2 === r3 && "..." === e2 && n5 ? h3.push(4, n5, 0) : 2 === r3 && e2 && !n5 ? h3.push(5, 0, true, e2) : r3 >= 5 && ((e2 || !n5 && 5 === r3) && (h3.push(r3, 0, e2, s4), r3 = 6), n5 && (h3.push(r3, n5, 0, s4), r3 = 6)), e2 = "";
    }, a3 = 0; a3 < n4.length; a3++) {
      a3 && (1 === r3 && p2(), p2(a3));
      for (var l3 = 0; l3 < n4[a3].length; l3++)
        t3 = n4[a3][l3], 1 === r3 ? "<" === t3 ? (p2(), h3 = [h3], r3 = 3) : e2 += t3 : 4 === r3 ? "--" === e2 && ">" === t3 ? (r3 = 1, e2 = "") : e2 = t3 + e2[0] : u3 ? t3 === u3 ? u3 = "" : e2 += t3 : '"' === t3 || "'" === t3 ? u3 = t3 : ">" === t3 ? (p2(), r3 = 1) : r3 && ("=" === t3 ? (r3 = 5, s4 = e2, e2 = "") : "/" === t3 && (r3 < 5 || ">" === n4[a3][l3 + 1]) ? (p2(), 3 === r3 && (h3 = h3[0]), r3 = h3, (h3 = h3[0]).push(2, 0, r3), r3 = 0) : " " === t3 || "	" === t3 || "\n" === t3 || "\r" === t3 ? (p2(), r3 = 2) : e2 += t3), 3 === r3 && "!--" === e2 && (r3 = 4, h3 = h3[0]);
    }
    return p2(), h3;
  }(s3)), r2), arguments, [])).length > 1 ? r2 : r2[0];
}

// ../../node_modules/.pnpm/htm@3.1.1/node_modules/htm/preact/index.mjs
var m2 = htm_default.bind(y);

// ../../node_modules/.pnpm/preact-render-to-string@6.4.1_preact@10.20.1/node_modules/preact-render-to-string/dist/index.mjs
var n3 = /[\s\n\\/='"\0<>]/;
var o2 = /^(xlink|xmlns|xml)([A-Z])/;
var i2 = /^accessK|^auto[A-Z]|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|readO|rowS|spellC|src[A-Z]|tabI|item[A-Z]/;
var a2 = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/;
var c2 = /["&<]/;
function s2(e2) {
  if (0 === e2.length || false === c2.test(e2))
    return e2;
  for (var t3 = 0, r2 = 0, n4 = "", o3 = ""; r2 < e2.length; r2++) {
    switch (e2.charCodeAt(r2)) {
      case 34:
        o3 = "&quot;";
        break;
      case 38:
        o3 = "&amp;";
        break;
      case 60:
        o3 = "&lt;";
        break;
      default:
        continue;
    }
    r2 !== t3 && (n4 += e2.slice(t3, r2)), n4 += o3, t3 = r2 + 1;
  }
  return r2 !== t3 && (n4 += e2.slice(t3, r2)), n4;
}
var l2 = {};
var u2 = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]);
var f2 = /[A-Z]/g;
function h2(e2) {
  var t3 = "";
  for (var r2 in e2) {
    var n4 = e2[r2];
    if (null != n4 && "" !== n4) {
      var o3 = "-" == r2[0] ? r2 : l2[r2] || (l2[r2] = r2.replace(f2, "-$&").toLowerCase()), i3 = ";";
      "number" != typeof n4 || o3.startsWith("--") || u2.has(o3) || (i3 = "px;"), t3 = t3 + o3 + ":" + n4 + i3;
    }
  }
  return t3 || void 0;
}
var m3;
var g2;
var b2;
var k2;
var w2 = [];
var A2 = Array.isArray;
var C2 = Object.assign;
function S2(n4, o3) {
  var i3 = l.__s;
  l.__s = true, m3 = l.__b, g2 = l.diffed, b2 = l.__r, k2 = l.unmount;
  var a3 = y(g, null);
  a3.__k = [n4];
  try {
    return T2(n4, o3 || D2, false, void 0, a3, false);
  } catch (e2) {
    if (e2.then)
      throw new Error('Use "renderToStringAsync" for suspenseful rendering.');
    throw e2;
  } finally {
    l.__c && l.__c(n4, w2), l.__s = i3, w2.length = 0;
  }
}
function L2() {
  this.__d = true;
}
var D2 = {};
function E(e2, t3) {
  var r2, n4 = e2.type, o3 = true;
  return e2.__c ? (o3 = false, (r2 = e2.__c).state = r2.__s) : r2 = new n4(e2.props, t3), e2.__c = r2, r2.__v = e2, r2.props = e2.props, r2.context = t3, r2.__d = true, null == r2.state && (r2.state = D2), null == r2.__s && (r2.__s = r2.state), n4.getDerivedStateFromProps ? r2.state = C2({}, r2.state, n4.getDerivedStateFromProps(r2.props, r2.state)) : o3 && r2.componentWillMount ? (r2.componentWillMount(), r2.state = r2.__s !== r2.state ? r2.__s : r2.state) : !o3 && r2.componentWillUpdate && r2.componentWillUpdate(), b2 && b2(e2), r2.render(r2.props, r2.state, t3);
}
function T2(t3, c3, l3, u3, f3, p2) {
  if (null == t3 || true === t3 || false === t3 || "" === t3)
    return "";
  if ("object" != typeof t3)
    return "function" == typeof t3 ? "" : s2(t3 + "");
  if (A2(t3)) {
    var d2, _ = "";
    f3.__k = t3;
    for (var v2 = 0; v2 < t3.length; v2++) {
      var y2 = t3[v2];
      if (null != y2 && "boolean" != typeof y2) {
        var x2, w3 = T2(y2, c3, l3, u3, f3, p2);
        "string" == typeof w3 ? _ += w3 : (d2 = d2 || [], _ && d2.push(_), _ = "", Array.isArray(w3) ? (x2 = d2).push.apply(x2, w3) : d2.push(w3));
      }
    }
    return d2 ? (_ && d2.push(_), d2) : _;
  }
  if (void 0 !== t3.constructor)
    return "";
  t3.__ = f3, m3 && m3(t3);
  var S3, D3, P3, U = t3.type, Z = t3.props, F2 = c3;
  if ("function" == typeof U) {
    if (U === g) {
      if (Z.tpl) {
        for (var W = "", $ = 0; $ < Z.tpl.length; $++)
          if (W += Z.tpl[$], Z.exprs && $ < Z.exprs.length) {
            var M2 = Z.exprs[$];
            if (null == M2)
              continue;
            "object" != typeof M2 || void 0 !== M2.constructor && !A2(M2) ? W += M2 : W += T2(M2, c3, l3, u3, t3, p2);
          }
        return W;
      }
      if (Z.UNSTABLE_comment)
        return "<!--" + s2(Z.UNSTABLE_comment || "") + "-->";
      D3 = Z.children;
    } else {
      if (null != (S3 = U.contextType)) {
        var z2 = c3[S3.__c];
        F2 = z2 ? z2.props.value : S3.__;
      }
      if (U.prototype && "function" == typeof U.prototype.render)
        D3 = E(t3, F2), P3 = t3.__c;
      else {
        t3.__c = P3 = { __v: t3, props: Z, context: F2, setState: L2, forceUpdate: L2, __d: true, __h: [] };
        for (var H2 = 0; P3.__d && H2++ < 25; )
          P3.__d = false, b2 && b2(t3), D3 = U.call(P3, Z, F2);
        P3.__d = true;
      }
      if (null != P3.getChildContext && (c3 = C2({}, c3, P3.getChildContext())), (U.getDerivedStateFromError || P3.componentDidCatch) && l.errorBoundaries) {
        var q = "";
        D3 = null != D3 && D3.type === g && null == D3.key ? D3.props.children : D3;
        try {
          return q = T2(D3, c3, l3, u3, t3, p2);
        } catch (e2) {
          return U.getDerivedStateFromError && (P3.__s = U.getDerivedStateFromError(e2)), P3.componentDidCatch && P3.componentDidCatch(e2, {}), P3.__d && (D3 = E(t3, c3), null != (P3 = t3.__c).getChildContext && (c3 = C2({}, c3, P3.getChildContext())), q = T2(D3 = null != D3 && D3.type === g && null == D3.key ? D3.props.children : D3, c3, l3, u3, t3, p2)), q;
        } finally {
          g2 && g2(t3), t3.__ = null, k2 && k2(t3);
        }
      }
    }
    D3 = null != D3 && D3.type === g && null == D3.key ? D3.props.children : D3;
    var B = function() {
      return T2(D3, c3, l3, u3, t3, p2);
    };
    try {
      var I2 = B();
      return g2 && g2(t3), t3.__ = null, k2 && k2(t3), I2;
    } catch (e2) {
      if (!p2)
        throw e2;
      if (!e2 || "function" != typeof e2.then)
        throw e2;
      var N2 = function e3() {
        try {
          return B();
        } catch (t4) {
          if (!t4 || "function" != typeof t4.then)
            throw t4;
          return t4.then(function() {
            return B();
          }, function() {
            return e3();
          });
        }
      };
      return e2.then(function() {
        return N2();
      });
    }
  }
  var O2, R = "<" + U, V = "";
  for (var K in Z) {
    var G = Z[K];
    switch (K) {
      case "children":
        O2 = G;
        continue;
      case "key":
      case "ref":
      case "__self":
      case "__source":
        continue;
      case "htmlFor":
        if ("for" in Z)
          continue;
        K = "for";
        break;
      case "className":
        if ("class" in Z)
          continue;
        K = "class";
        break;
      case "defaultChecked":
        K = "checked";
        break;
      case "defaultSelected":
        K = "selected";
        break;
      case "defaultValue":
      case "value":
        switch (K = "value", U) {
          case "textarea":
            O2 = G;
            continue;
          case "select":
            u3 = G;
            continue;
          case "option":
            u3 != G || "selected" in Z || (R += " selected");
        }
        break;
      case "dangerouslySetInnerHTML":
        V = G && G.__html;
        continue;
      case "style":
        "object" == typeof G && (G = h2(G));
        break;
      case "acceptCharset":
        K = "accept-charset";
        break;
      case "httpEquiv":
        K = "http-equiv";
        break;
      default:
        if (o2.test(K))
          K = K.replace(o2, "$1:$2").toLowerCase();
        else {
          if (n3.test(K))
            continue;
          "-" !== K[4] && "draggable" !== K || null == G ? l3 ? a2.test(K) && (K = "panose1" === K ? "panose-1" : K.replace(/([A-Z])/g, "-$1").toLowerCase()) : i2.test(K) && (K = K.toLowerCase()) : G += "";
        }
    }
    null != G && false !== G && "function" != typeof G && (R = true === G || "" === G ? R + " " + K : R + " " + K + '="' + s2(G + "") + '"');
  }
  if (n3.test(U))
    throw new Error(U + " is not a valid HTML tag name in " + R + ">");
  if (V || ("string" == typeof O2 ? V = s2(O2) : null != O2 && false !== O2 && true !== O2 && (V = T2(O2, c3, "svg" === U || "foreignObject" !== U && l3, u3, t3, p2))), g2 && g2(t3), t3.__ = null, k2 && k2(t3), !V && j2.has(U))
    return R + "/>";
  var J = "</" + U + ">", Q = R + ">";
  return Array.isArray(V) ? [Q].concat(V, [J]) : "string" != typeof V ? [Q, V, J] : Q + V + J;
}
var j2 = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
var P2 = S2;

// src/index.tsx
var ReactPlugin = class {
  constructor() {
    this.extensions = [".mjs"];
  }
  url(file, site) {
    return defaultUrl(file, site);
  }
  title(file, site) {
    return defaultTitle(file, site);
  }
  build(opts, dryRun) {
    return __async(this, null, function* () {
      var _a, _b;
      const file = opts.file;
      const layoutText = genLayout(opts.site, file);
      const pageStatics = genPageStatics(file, opts.allFiles);
      const feeds = genFeeds(file, opts.database, opts.allURLs);
      const ReactPage = yield import(file.sourcePath);
      const pageStaticsURL = {};
      if (pageStatics.css) {
        pageStaticsURL.css = getRelativeURL(
          opts.site,
          opts.url,
          (_a = opts.allURLs[pageStatics.css.id]) != null ? _a : pageStatics.css.id
        );
      }
      if (pageStatics.js) {
        pageStaticsURL.js = getRelativeURL(
          opts.site,
          opts.url,
          (_b = opts.allURLs[pageStatics.js.id]) != null ? _b : pageStatics.js.id
        );
      }
      const pageReference = genPageReference(
        opts.file,
        opts.database,
        opts.allURLs,
        opts.database.queryDirectory(opts.file.sourceDir, {
          predicates: [
            {
              key: "name",
              value: "index",
              operator: "NOT",
              modifier: "="
            },
            {
              key: "name",
              value: "404",
              operator: "NOT",
              modifier: "="
            }
          ]
        })
      );
      const props = __spreadProps(__spreadValues({}, pageStaticsURL), {
        next: pageReference.nextPage,
        previous: pageReference.previousPage,
        feeds,
        _baseDir: opts.site.frameDirectory
      });
      const html = P2(m2`<${ReactPage.default} ...${props}/>`);
      const templateVars = __spreadValues(__spreadValues(__spreadProps(__spreadValues({}, props), {
        content: html
      }), file), file.configuration);
      const templatedHTML = render(layoutText, templateVars);
      const targetPath = path5.resolve(opts.site.buildDirectory, opts.url);
      if (dryRun) {
        console.log(opts);
        console.log(`React plugin running, to save ${targetPath}`);
        return true;
      }
      if (!fs3.existsSync(targetPath)) {
        fs3.mkdirSync(path5.dirname(targetPath), { recursive: true });
      }
      fs3.writeFileSync(targetPath, templatedHTML);
      file.html = html;
      return true;
    });
  }
};
export {
  ReactPlugin as default
};
