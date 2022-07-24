var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS2 = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key2) && key2 !== except)
        __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target, mod));

// ../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js
var require_upath2 = __commonJS2({
  "../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js"(exports2) {
    var VERSION = "1.2.0";
    var extraFn;
    var extraFunctions;
    var isFunction;
    var isString;
    var isValidExt;
    var name;
    var path8;
    var propName;
    var propValue;
    var toUnix;
    var upath;
    var slice = [].slice;
    var indexOf = [].indexOf || function(item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item)
          return i;
      }
      return -1;
    };
    var hasProp = {}.hasOwnProperty;
    path8 = __require("path");
    isFunction = function(val) {
      return val instanceof Function;
    };
    isString = function(val) {
      return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
    };
    upath = exports2;
    upath.VERSION = typeof VERSION !== "undefined" && VERSION !== null ? VERSION : "NO-VERSION";
    toUnix = function(p) {
      var double;
      p = p.replace(/\\/g, "/");
      double = /\/\//;
      while (p.match(double)) {
        p = p.replace(double, "/");
      }
      return p;
    };
    for (propName in path8) {
      propValue = path8[propName];
      if (isFunction(propValue)) {
        upath[propName] = function(propName2) {
          return function() {
            var args, result;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            args = args.map(function(p) {
              if (isString(p)) {
                return toUnix(p);
              } else {
                return p;
              }
            });
            result = path8[propName2].apply(path8, args);
            if (isString(result)) {
              return toUnix(result);
            } else {
              return result;
            }
          };
        }(propName);
      } else {
        upath[propName] = propValue;
      }
    }
    upath.sep = "/";
    extraFunctions = {
      toUnix,
      normalizeSafe: function(p) {
        p = toUnix(p);
        if (p.startsWith("./")) {
          if (p.startsWith("./..") || p === "./") {
            return upath.normalize(p);
          } else {
            return "./" + upath.normalize(p);
          }
        } else {
          return upath.normalize(p);
        }
      },
      normalizeTrim: function(p) {
        p = upath.normalizeSafe(p);
        if (p.endsWith("/")) {
          return p.slice(0, +(p.length - 2) + 1 || 9e9);
        } else {
          return p;
        }
      },
      joinSafe: function() {
        var p, result;
        p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        result = upath.join.apply(null, p);
        if (p[0].startsWith("./") && !result.startsWith("./")) {
          result = "./" + result;
        }
        return result;
      },
      addExt: function(file, ext) {
        if (!ext) {
          return file;
        } else {
          if (ext[0] !== ".") {
            ext = "." + ext;
          }
          return file + (file.endsWith(ext) ? "" : ext);
        }
      },
      trimExt: function(filename, ignoreExts, maxSize) {
        var oldExt;
        if (maxSize == null) {
          maxSize = 7;
        }
        oldExt = upath.extname(filename);
        if (isValidExt(oldExt, ignoreExts, maxSize)) {
          return filename.slice(0, +(filename.length - oldExt.length - 1) + 1 || 9e9);
        } else {
          return filename;
        }
      },
      removeExt: function(filename, ext) {
        if (!ext) {
          return filename;
        } else {
          ext = ext[0] === "." ? ext : "." + ext;
          if (upath.extname(filename) === ext) {
            return upath.trimExt(filename);
          } else {
            return filename;
          }
        }
      },
      changeExt: function(filename, ext, ignoreExts, maxSize) {
        if (maxSize == null) {
          maxSize = 7;
        }
        return upath.trimExt(filename, ignoreExts, maxSize) + (!ext ? "" : ext[0] === "." ? ext : "." + ext);
      },
      defaultExt: function(filename, ext, ignoreExts, maxSize) {
        var oldExt;
        if (maxSize == null) {
          maxSize = 7;
        }
        oldExt = upath.extname(filename);
        if (isValidExt(oldExt, ignoreExts, maxSize)) {
          return filename;
        } else {
          return upath.addExt(filename, ext);
        }
      }
    };
    isValidExt = function(ext, ignoreExts, maxSize) {
      if (ignoreExts == null) {
        ignoreExts = [];
      }
      return ext && ext.length <= maxSize && indexOf.call(ignoreExts.map(function(e) {
        return (e && e[0] !== "." ? "." : "") + e;
      }), ext) < 0;
    };
    for (name in extraFunctions) {
      if (!hasProp.call(extraFunctions, name))
        continue;
      extraFn = extraFunctions[name];
      if (upath[name] !== void 0) {
        throw new Error("path." + name + " already exists.");
      } else {
        upath[name] = extraFn;
      }
    }
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/parser.js
var require_parser = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/parser.js"(exports2, module2) {
    "use strict";
    var ParserEND = 1114112;
    var ParserError = class extends Error {
      constructor(msg, filename, linenumber) {
        super("[ParserError] " + msg, filename, linenumber);
        this.name = "ParserError";
        this.code = "ParserError";
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, ParserError);
      }
    };
    var State = class {
      constructor(parser) {
        this.parser = parser;
        this.buf = "";
        this.returned = null;
        this.result = null;
        this.resultTable = null;
        this.resultArr = null;
      }
    };
    var Parser = class {
      constructor() {
        this.pos = 0;
        this.col = 0;
        this.line = 0;
        this.obj = {};
        this.ctx = this.obj;
        this.stack = [];
        this._buf = "";
        this.char = null;
        this.ii = 0;
        this.state = new State(this.parseStart);
      }
      parse(str) {
        if (str.length === 0 || str.length == null)
          return;
        this._buf = String(str);
        this.ii = -1;
        this.char = -1;
        let getNext;
        while (getNext === false || this.nextChar()) {
          getNext = this.runOne();
        }
        this._buf = null;
      }
      nextChar() {
        if (this.char === 10) {
          ++this.line;
          this.col = -1;
        }
        ++this.ii;
        this.char = this._buf.codePointAt(this.ii);
        ++this.pos;
        ++this.col;
        return this.haveBuffer();
      }
      haveBuffer() {
        return this.ii < this._buf.length;
      }
      runOne() {
        return this.state.parser.call(this, this.state.returned);
      }
      finish() {
        this.char = ParserEND;
        let last;
        do {
          last = this.state.parser;
          this.runOne();
        } while (this.state.parser !== last);
        this.ctx = null;
        this.state = null;
        this._buf = null;
        return this.obj;
      }
      next(fn) {
        if (typeof fn !== "function")
          throw new ParserError("Tried to set state to non-existent state: " + JSON.stringify(fn));
        this.state.parser = fn;
      }
      goto(fn) {
        this.next(fn);
        return this.runOne();
      }
      call(fn, returnWith) {
        if (returnWith)
          this.next(returnWith);
        this.stack.push(this.state);
        this.state = new State(fn);
      }
      callNow(fn, returnWith) {
        this.call(fn, returnWith);
        return this.runOne();
      }
      return(value) {
        if (this.stack.length === 0)
          throw this.error(new ParserError("Stack underflow"));
        if (value === void 0)
          value = this.state.buf;
        this.state = this.stack.pop();
        this.state.returned = value;
      }
      returnNow(value) {
        this.return(value);
        return this.runOne();
      }
      consume() {
        if (this.char === ParserEND)
          throw this.error(new ParserError("Unexpected end-of-buffer"));
        this.state.buf += this._buf[this.ii];
      }
      error(err) {
        err.line = this.line;
        err.col = this.col;
        err.pos = this.pos;
        return err;
      }
      parseStart() {
        throw new ParserError("Must declare a parseStart method");
      }
    };
    Parser.END = ParserEND;
    Parser.Error = ParserError;
    module2.exports = Parser;
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-datetime.js
var require_create_datetime = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-datetime.js"(exports2, module2) {
    "use strict";
    module2.exports = (value) => {
      const date2 = new Date(value);
      if (isNaN(date2)) {
        throw new TypeError("Invalid Datetime");
      } else {
        return date2;
      }
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/format-num.js
var require_format_num = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/format-num.js"(exports2, module2) {
    "use strict";
    module2.exports = (d, num) => {
      num = String(num);
      while (num.length < d)
        num = "0" + num;
      return num;
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-datetime-float.js
var require_create_datetime_float = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-datetime-float.js"(exports2, module2) {
    "use strict";
    var f = require_format_num();
    var FloatingDateTime = class extends Date {
      constructor(value) {
        super(value + "Z");
        this.isFloating = true;
      }
      toISOString() {
        const date2 = `${this.getUTCFullYear()}-${f(2, this.getUTCMonth() + 1)}-${f(2, this.getUTCDate())}`;
        const time = `${f(2, this.getUTCHours())}:${f(2, this.getUTCMinutes())}:${f(2, this.getUTCSeconds())}.${f(3, this.getUTCMilliseconds())}`;
        return `${date2}T${time}`;
      }
    };
    module2.exports = (value) => {
      const date2 = new FloatingDateTime(value);
      if (isNaN(date2)) {
        throw new TypeError("Invalid Datetime");
      } else {
        return date2;
      }
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-date.js
var require_create_date = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-date.js"(exports2, module2) {
    "use strict";
    var f = require_format_num();
    var DateTime = global.Date;
    var Date2 = class extends DateTime {
      constructor(value) {
        super(value);
        this.isDate = true;
      }
      toISOString() {
        return `${this.getUTCFullYear()}-${f(2, this.getUTCMonth() + 1)}-${f(2, this.getUTCDate())}`;
      }
    };
    module2.exports = (value) => {
      const date2 = new Date2(value);
      if (isNaN(date2)) {
        throw new TypeError("Invalid Datetime");
      } else {
        return date2;
      }
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-time.js
var require_create_time = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-time.js"(exports2, module2) {
    "use strict";
    var f = require_format_num();
    var Time = class extends Date {
      constructor(value) {
        super(`0000-01-01T${value}Z`);
        this.isTime = true;
      }
      toISOString() {
        return `${f(2, this.getUTCHours())}:${f(2, this.getUTCMinutes())}:${f(2, this.getUTCSeconds())}.${f(3, this.getUTCMilliseconds())}`;
      }
    };
    module2.exports = (value) => {
      const date2 = new Time(value);
      if (isNaN(date2)) {
        throw new TypeError("Invalid Datetime");
      } else {
        return date2;
      }
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/toml-parser.js
var require_toml_parser = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/toml-parser.js"(exports, module) {
    "use strict";
    module.exports = makeParserClass(require_parser());
    module.exports.makeParserClass = makeParserClass;
    var TomlError = class extends Error {
      constructor(msg) {
        super(msg);
        this.name = "TomlError";
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, TomlError);
        this.fromTOML = true;
        this.wrapped = null;
      }
    };
    TomlError.wrap = (err) => {
      const terr = new TomlError(err.message);
      terr.code = err.code;
      terr.wrapped = err;
      return terr;
    };
    module.exports.TomlError = TomlError;
    var createDateTime = require_create_datetime();
    var createDateTimeFloat = require_create_datetime_float();
    var createDate = require_create_date();
    var createTime = require_create_time();
    var CTRL_I = 9;
    var CTRL_J = 10;
    var CTRL_M = 13;
    var CTRL_CHAR_BOUNDARY = 31;
    var CHAR_SP = 32;
    var CHAR_QUOT = 34;
    var CHAR_NUM = 35;
    var CHAR_APOS = 39;
    var CHAR_PLUS = 43;
    var CHAR_COMMA = 44;
    var CHAR_HYPHEN = 45;
    var CHAR_PERIOD = 46;
    var CHAR_0 = 48;
    var CHAR_1 = 49;
    var CHAR_7 = 55;
    var CHAR_9 = 57;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_A = 65;
    var CHAR_E = 69;
    var CHAR_F = 70;
    var CHAR_T = 84;
    var CHAR_U = 85;
    var CHAR_Z = 90;
    var CHAR_LOWBAR = 95;
    var CHAR_a = 97;
    var CHAR_b = 98;
    var CHAR_e = 101;
    var CHAR_f = 102;
    var CHAR_i = 105;
    var CHAR_l = 108;
    var CHAR_n = 110;
    var CHAR_o = 111;
    var CHAR_r = 114;
    var CHAR_s = 115;
    var CHAR_t = 116;
    var CHAR_u = 117;
    var CHAR_x = 120;
    var CHAR_z = 122;
    var CHAR_LCUB = 123;
    var CHAR_RCUB = 125;
    var CHAR_LSQB = 91;
    var CHAR_BSOL = 92;
    var CHAR_RSQB = 93;
    var CHAR_DEL = 127;
    var SURROGATE_FIRST = 55296;
    var SURROGATE_LAST = 57343;
    var escapes = {
      [CHAR_b]: "\b",
      [CHAR_t]: "	",
      [CHAR_n]: "\n",
      [CHAR_f]: "\f",
      [CHAR_r]: "\r",
      [CHAR_QUOT]: '"',
      [CHAR_BSOL]: "\\"
    };
    function isDigit(cp) {
      return cp >= CHAR_0 && cp <= CHAR_9;
    }
    function isHexit(cp) {
      return cp >= CHAR_A && cp <= CHAR_F || cp >= CHAR_a && cp <= CHAR_f || cp >= CHAR_0 && cp <= CHAR_9;
    }
    function isBit(cp) {
      return cp === CHAR_1 || cp === CHAR_0;
    }
    function isOctit(cp) {
      return cp >= CHAR_0 && cp <= CHAR_7;
    }
    function isAlphaNumQuoteHyphen(cp) {
      return cp >= CHAR_A && cp <= CHAR_Z || cp >= CHAR_a && cp <= CHAR_z || cp >= CHAR_0 && cp <= CHAR_9 || cp === CHAR_APOS || cp === CHAR_QUOT || cp === CHAR_LOWBAR || cp === CHAR_HYPHEN;
    }
    function isAlphaNumHyphen(cp) {
      return cp >= CHAR_A && cp <= CHAR_Z || cp >= CHAR_a && cp <= CHAR_z || cp >= CHAR_0 && cp <= CHAR_9 || cp === CHAR_LOWBAR || cp === CHAR_HYPHEN;
    }
    var _type = Symbol("type");
    var _declared = Symbol("declared");
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var defineProperty = Object.defineProperty;
    var descriptor = { configurable: true, enumerable: true, writable: true, value: void 0 };
    function hasKey(obj, key2) {
      if (hasOwnProperty.call(obj, key2))
        return true;
      if (key2 === "__proto__")
        defineProperty(obj, "__proto__", descriptor);
      return false;
    }
    var INLINE_TABLE = Symbol("inline-table");
    function InlineTable() {
      return Object.defineProperties({}, {
        [_type]: { value: INLINE_TABLE }
      });
    }
    function isInlineTable(obj) {
      if (obj === null || typeof obj !== "object")
        return false;
      return obj[_type] === INLINE_TABLE;
    }
    var TABLE = Symbol("table");
    function Table() {
      return Object.defineProperties({}, {
        [_type]: { value: TABLE },
        [_declared]: { value: false, writable: true }
      });
    }
    function isTable(obj) {
      if (obj === null || typeof obj !== "object")
        return false;
      return obj[_type] === TABLE;
    }
    var _contentType = Symbol("content-type");
    var INLINE_LIST = Symbol("inline-list");
    function InlineList(type) {
      return Object.defineProperties([], {
        [_type]: { value: INLINE_LIST },
        [_contentType]: { value: type }
      });
    }
    function isInlineList(obj) {
      if (obj === null || typeof obj !== "object")
        return false;
      return obj[_type] === INLINE_LIST;
    }
    var LIST = Symbol("list");
    function List() {
      return Object.defineProperties([], {
        [_type]: { value: LIST }
      });
    }
    function isList(obj) {
      if (obj === null || typeof obj !== "object")
        return false;
      return obj[_type] === LIST;
    }
    var _custom;
    try {
      const utilInspect = eval("require('util').inspect");
      _custom = utilInspect.custom;
    } catch (_) {
    }
    var _inspect = _custom || "inspect";
    var BoxedBigInt = class {
      constructor(value) {
        try {
          this.value = global.BigInt.asIntN(64, value);
        } catch (_) {
          this.value = null;
        }
        Object.defineProperty(this, _type, { value: INTEGER });
      }
      isNaN() {
        return this.value === null;
      }
      toString() {
        return String(this.value);
      }
      [_inspect]() {
        return `[BigInt: ${this.toString()}]}`;
      }
      valueOf() {
        return this.value;
      }
    };
    var INTEGER = Symbol("integer");
    function Integer(value) {
      let num = Number(value);
      if (Object.is(num, -0))
        num = 0;
      if (global.BigInt && !Number.isSafeInteger(num)) {
        return new BoxedBigInt(value);
      } else {
        return Object.defineProperties(new Number(num), {
          isNaN: { value: function() {
            return isNaN(this);
          } },
          [_type]: { value: INTEGER },
          [_inspect]: { value: () => `[Integer: ${value}]` }
        });
      }
    }
    function isInteger(obj) {
      if (obj === null || typeof obj !== "object")
        return false;
      return obj[_type] === INTEGER;
    }
    var FLOAT = Symbol("float");
    function Float(value) {
      return Object.defineProperties(new Number(value), {
        [_type]: { value: FLOAT },
        [_inspect]: { value: () => `[Float: ${value}]` }
      });
    }
    function isFloat(obj) {
      if (obj === null || typeof obj !== "object")
        return false;
      return obj[_type] === FLOAT;
    }
    function tomlType(value) {
      const type = typeof value;
      if (type === "object") {
        if (value === null)
          return "null";
        if (value instanceof Date)
          return "datetime";
        if (_type in value) {
          switch (value[_type]) {
            case INLINE_TABLE:
              return "inline-table";
            case INLINE_LIST:
              return "inline-list";
            case TABLE:
              return "table";
            case LIST:
              return "list";
            case FLOAT:
              return "float";
            case INTEGER:
              return "integer";
          }
        }
      }
      return type;
    }
    function makeParserClass(Parser) {
      class TOMLParser extends Parser {
        constructor() {
          super();
          this.ctx = this.obj = Table();
        }
        atEndOfWord() {
          return this.char === CHAR_NUM || this.char === CTRL_I || this.char === CHAR_SP || this.atEndOfLine();
        }
        atEndOfLine() {
          return this.char === Parser.END || this.char === CTRL_J || this.char === CTRL_M;
        }
        parseStart() {
          if (this.char === Parser.END) {
            return null;
          } else if (this.char === CHAR_LSQB) {
            return this.call(this.parseTableOrList);
          } else if (this.char === CHAR_NUM) {
            return this.call(this.parseComment);
          } else if (this.char === CTRL_J || this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M) {
            return null;
          } else if (isAlphaNumQuoteHyphen(this.char)) {
            return this.callNow(this.parseAssignStatement);
          } else {
            throw this.error(new TomlError(`Unknown character "${this.char}"`));
          }
        }
        parseWhitespaceToEOL() {
          if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M) {
            return null;
          } else if (this.char === CHAR_NUM) {
            return this.goto(this.parseComment);
          } else if (this.char === Parser.END || this.char === CTRL_J) {
            return this.return();
          } else {
            throw this.error(new TomlError("Unexpected character, expected only whitespace or comments till end of line"));
          }
        }
        parseAssignStatement() {
          return this.callNow(this.parseAssign, this.recordAssignStatement);
        }
        recordAssignStatement(kv) {
          let target = this.ctx;
          let finalKey = kv.key.pop();
          for (let kw of kv.key) {
            if (hasKey(target, kw) && (!isTable(target[kw]) || target[kw][_declared])) {
              throw this.error(new TomlError("Can't redefine existing key"));
            }
            target = target[kw] = target[kw] || Table();
          }
          if (hasKey(target, finalKey)) {
            throw this.error(new TomlError("Can't redefine existing key"));
          }
          if (isInteger(kv.value) || isFloat(kv.value)) {
            target[finalKey] = kv.value.valueOf();
          } else {
            target[finalKey] = kv.value;
          }
          return this.goto(this.parseWhitespaceToEOL);
        }
        parseAssign() {
          return this.callNow(this.parseKeyword, this.recordAssignKeyword);
        }
        recordAssignKeyword(key2) {
          if (this.state.resultTable) {
            this.state.resultTable.push(key2);
          } else {
            this.state.resultTable = [key2];
          }
          return this.goto(this.parseAssignKeywordPreDot);
        }
        parseAssignKeywordPreDot() {
          if (this.char === CHAR_PERIOD) {
            return this.next(this.parseAssignKeywordPostDot);
          } else if (this.char !== CHAR_SP && this.char !== CTRL_I) {
            return this.goto(this.parseAssignEqual);
          }
        }
        parseAssignKeywordPostDot() {
          if (this.char !== CHAR_SP && this.char !== CTRL_I) {
            return this.callNow(this.parseKeyword, this.recordAssignKeyword);
          }
        }
        parseAssignEqual() {
          if (this.char === CHAR_EQUALS) {
            return this.next(this.parseAssignPreValue);
          } else {
            throw this.error(new TomlError('Invalid character, expected "="'));
          }
        }
        parseAssignPreValue() {
          if (this.char === CHAR_SP || this.char === CTRL_I) {
            return null;
          } else {
            return this.callNow(this.parseValue, this.recordAssignValue);
          }
        }
        recordAssignValue(value) {
          return this.returnNow({ key: this.state.resultTable, value });
        }
        parseComment() {
          do {
            if (this.char === Parser.END || this.char === CTRL_J) {
              return this.return();
            }
          } while (this.nextChar());
        }
        parseTableOrList() {
          if (this.char === CHAR_LSQB) {
            this.next(this.parseList);
          } else {
            return this.goto(this.parseTable);
          }
        }
        parseTable() {
          this.ctx = this.obj;
          return this.goto(this.parseTableNext);
        }
        parseTableNext() {
          if (this.char === CHAR_SP || this.char === CTRL_I) {
            return null;
          } else {
            return this.callNow(this.parseKeyword, this.parseTableMore);
          }
        }
        parseTableMore(keyword) {
          if (this.char === CHAR_SP || this.char === CTRL_I) {
            return null;
          } else if (this.char === CHAR_RSQB) {
            if (hasKey(this.ctx, keyword) && (!isTable(this.ctx[keyword]) || this.ctx[keyword][_declared])) {
              throw this.error(new TomlError("Can't redefine existing key"));
            } else {
              this.ctx = this.ctx[keyword] = this.ctx[keyword] || Table();
              this.ctx[_declared] = true;
            }
            return this.next(this.parseWhitespaceToEOL);
          } else if (this.char === CHAR_PERIOD) {
            if (!hasKey(this.ctx, keyword)) {
              this.ctx = this.ctx[keyword] = Table();
            } else if (isTable(this.ctx[keyword])) {
              this.ctx = this.ctx[keyword];
            } else if (isList(this.ctx[keyword])) {
              this.ctx = this.ctx[keyword][this.ctx[keyword].length - 1];
            } else {
              throw this.error(new TomlError("Can't redefine existing key"));
            }
            return this.next(this.parseTableNext);
          } else {
            throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"));
          }
        }
        parseList() {
          this.ctx = this.obj;
          return this.goto(this.parseListNext);
        }
        parseListNext() {
          if (this.char === CHAR_SP || this.char === CTRL_I) {
            return null;
          } else {
            return this.callNow(this.parseKeyword, this.parseListMore);
          }
        }
        parseListMore(keyword) {
          if (this.char === CHAR_SP || this.char === CTRL_I) {
            return null;
          } else if (this.char === CHAR_RSQB) {
            if (!hasKey(this.ctx, keyword)) {
              this.ctx[keyword] = List();
            }
            if (isInlineList(this.ctx[keyword])) {
              throw this.error(new TomlError("Can't extend an inline array"));
            } else if (isList(this.ctx[keyword])) {
              const next = Table();
              this.ctx[keyword].push(next);
              this.ctx = next;
            } else {
              throw this.error(new TomlError("Can't redefine an existing key"));
            }
            return this.next(this.parseListEnd);
          } else if (this.char === CHAR_PERIOD) {
            if (!hasKey(this.ctx, keyword)) {
              this.ctx = this.ctx[keyword] = Table();
            } else if (isInlineList(this.ctx[keyword])) {
              throw this.error(new TomlError("Can't extend an inline array"));
            } else if (isInlineTable(this.ctx[keyword])) {
              throw this.error(new TomlError("Can't extend an inline table"));
            } else if (isList(this.ctx[keyword])) {
              this.ctx = this.ctx[keyword][this.ctx[keyword].length - 1];
            } else if (isTable(this.ctx[keyword])) {
              this.ctx = this.ctx[keyword];
            } else {
              throw this.error(new TomlError("Can't redefine an existing key"));
            }
            return this.next(this.parseListNext);
          } else {
            throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"));
          }
        }
        parseListEnd(keyword) {
          if (this.char === CHAR_RSQB) {
            return this.next(this.parseWhitespaceToEOL);
          } else {
            throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"));
          }
        }
        parseValue() {
          if (this.char === Parser.END) {
            throw this.error(new TomlError("Key without value"));
          } else if (this.char === CHAR_QUOT) {
            return this.next(this.parseDoubleString);
          }
          if (this.char === CHAR_APOS) {
            return this.next(this.parseSingleString);
          } else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) {
            return this.goto(this.parseNumberSign);
          } else if (this.char === CHAR_i) {
            return this.next(this.parseInf);
          } else if (this.char === CHAR_n) {
            return this.next(this.parseNan);
          } else if (isDigit(this.char)) {
            return this.goto(this.parseNumberOrDateTime);
          } else if (this.char === CHAR_t || this.char === CHAR_f) {
            return this.goto(this.parseBoolean);
          } else if (this.char === CHAR_LSQB) {
            return this.call(this.parseInlineList, this.recordValue);
          } else if (this.char === CHAR_LCUB) {
            return this.call(this.parseInlineTable, this.recordValue);
          } else {
            throw this.error(new TomlError("Unexpected character, expecting string, number, datetime, boolean, inline array or inline table"));
          }
        }
        recordValue(value) {
          return this.returnNow(value);
        }
        parseInf() {
          if (this.char === CHAR_n) {
            return this.next(this.parseInf2);
          } else {
            throw this.error(new TomlError('Unexpected character, expected "inf", "+inf" or "-inf"'));
          }
        }
        parseInf2() {
          if (this.char === CHAR_f) {
            if (this.state.buf === "-") {
              return this.return(-Infinity);
            } else {
              return this.return(Infinity);
            }
          } else {
            throw this.error(new TomlError('Unexpected character, expected "inf", "+inf" or "-inf"'));
          }
        }
        parseNan() {
          if (this.char === CHAR_a) {
            return this.next(this.parseNan2);
          } else {
            throw this.error(new TomlError('Unexpected character, expected "nan"'));
          }
        }
        parseNan2() {
          if (this.char === CHAR_n) {
            return this.return(NaN);
          } else {
            throw this.error(new TomlError('Unexpected character, expected "nan"'));
          }
        }
        parseKeyword() {
          if (this.char === CHAR_QUOT) {
            return this.next(this.parseBasicString);
          } else if (this.char === CHAR_APOS) {
            return this.next(this.parseLiteralString);
          } else {
            return this.goto(this.parseBareKey);
          }
        }
        parseBareKey() {
          do {
            if (this.char === Parser.END) {
              throw this.error(new TomlError("Key ended without value"));
            } else if (isAlphaNumHyphen(this.char)) {
              this.consume();
            } else if (this.state.buf.length === 0) {
              throw this.error(new TomlError("Empty bare keys are not allowed"));
            } else {
              return this.returnNow();
            }
          } while (this.nextChar());
        }
        parseSingleString() {
          if (this.char === CHAR_APOS) {
            return this.next(this.parseLiteralMultiStringMaybe);
          } else {
            return this.goto(this.parseLiteralString);
          }
        }
        parseLiteralString() {
          do {
            if (this.char === CHAR_APOS) {
              return this.return();
            } else if (this.atEndOfLine()) {
              throw this.error(new TomlError("Unterminated string"));
            } else if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I) {
              throw this.errorControlCharInString();
            } else {
              this.consume();
            }
          } while (this.nextChar());
        }
        parseLiteralMultiStringMaybe() {
          if (this.char === CHAR_APOS) {
            return this.next(this.parseLiteralMultiString);
          } else {
            return this.returnNow();
          }
        }
        parseLiteralMultiString() {
          if (this.char === CTRL_M) {
            return null;
          } else if (this.char === CTRL_J) {
            return this.next(this.parseLiteralMultiStringContent);
          } else {
            return this.goto(this.parseLiteralMultiStringContent);
          }
        }
        parseLiteralMultiStringContent() {
          do {
            if (this.char === CHAR_APOS) {
              return this.next(this.parseLiteralMultiEnd);
            } else if (this.char === Parser.END) {
              throw this.error(new TomlError("Unterminated multi-line string"));
            } else if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I && this.char !== CTRL_J && this.char !== CTRL_M) {
              throw this.errorControlCharInString();
            } else {
              this.consume();
            }
          } while (this.nextChar());
        }
        parseLiteralMultiEnd() {
          if (this.char === CHAR_APOS) {
            return this.next(this.parseLiteralMultiEnd2);
          } else {
            this.state.buf += "'";
            return this.goto(this.parseLiteralMultiStringContent);
          }
        }
        parseLiteralMultiEnd2() {
          if (this.char === CHAR_APOS) {
            return this.return();
          } else {
            this.state.buf += "''";
            return this.goto(this.parseLiteralMultiStringContent);
          }
        }
        parseDoubleString() {
          if (this.char === CHAR_QUOT) {
            return this.next(this.parseMultiStringMaybe);
          } else {
            return this.goto(this.parseBasicString);
          }
        }
        parseBasicString() {
          do {
            if (this.char === CHAR_BSOL) {
              return this.call(this.parseEscape, this.recordEscapeReplacement);
            } else if (this.char === CHAR_QUOT) {
              return this.return();
            } else if (this.atEndOfLine()) {
              throw this.error(new TomlError("Unterminated string"));
            } else if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I) {
              throw this.errorControlCharInString();
            } else {
              this.consume();
            }
          } while (this.nextChar());
        }
        recordEscapeReplacement(replacement) {
          this.state.buf += replacement;
          return this.goto(this.parseBasicString);
        }
        parseMultiStringMaybe() {
          if (this.char === CHAR_QUOT) {
            return this.next(this.parseMultiString);
          } else {
            return this.returnNow();
          }
        }
        parseMultiString() {
          if (this.char === CTRL_M) {
            return null;
          } else if (this.char === CTRL_J) {
            return this.next(this.parseMultiStringContent);
          } else {
            return this.goto(this.parseMultiStringContent);
          }
        }
        parseMultiStringContent() {
          do {
            if (this.char === CHAR_BSOL) {
              return this.call(this.parseMultiEscape, this.recordMultiEscapeReplacement);
            } else if (this.char === CHAR_QUOT) {
              return this.next(this.parseMultiEnd);
            } else if (this.char === Parser.END) {
              throw this.error(new TomlError("Unterminated multi-line string"));
            } else if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I && this.char !== CTRL_J && this.char !== CTRL_M) {
              throw this.errorControlCharInString();
            } else {
              this.consume();
            }
          } while (this.nextChar());
        }
        errorControlCharInString() {
          let displayCode = "\\u00";
          if (this.char < 16) {
            displayCode += "0";
          }
          displayCode += this.char.toString(16);
          return this.error(new TomlError(`Control characters (codes < 0x1f and 0x7f) are not allowed in strings, use ${displayCode} instead`));
        }
        recordMultiEscapeReplacement(replacement) {
          this.state.buf += replacement;
          return this.goto(this.parseMultiStringContent);
        }
        parseMultiEnd() {
          if (this.char === CHAR_QUOT) {
            return this.next(this.parseMultiEnd2);
          } else {
            this.state.buf += '"';
            return this.goto(this.parseMultiStringContent);
          }
        }
        parseMultiEnd2() {
          if (this.char === CHAR_QUOT) {
            return this.return();
          } else {
            this.state.buf += '""';
            return this.goto(this.parseMultiStringContent);
          }
        }
        parseMultiEscape() {
          if (this.char === CTRL_M || this.char === CTRL_J) {
            return this.next(this.parseMultiTrim);
          } else if (this.char === CHAR_SP || this.char === CTRL_I) {
            return this.next(this.parsePreMultiTrim);
          } else {
            return this.goto(this.parseEscape);
          }
        }
        parsePreMultiTrim() {
          if (this.char === CHAR_SP || this.char === CTRL_I) {
            return null;
          } else if (this.char === CTRL_M || this.char === CTRL_J) {
            return this.next(this.parseMultiTrim);
          } else {
            throw this.error(new TomlError("Can't escape whitespace"));
          }
        }
        parseMultiTrim() {
          if (this.char === CTRL_J || this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M) {
            return null;
          } else {
            return this.returnNow();
          }
        }
        parseEscape() {
          if (this.char in escapes) {
            return this.return(escapes[this.char]);
          } else if (this.char === CHAR_u) {
            return this.call(this.parseSmallUnicode, this.parseUnicodeReturn);
          } else if (this.char === CHAR_U) {
            return this.call(this.parseLargeUnicode, this.parseUnicodeReturn);
          } else {
            throw this.error(new TomlError("Unknown escape character: " + this.char));
          }
        }
        parseUnicodeReturn(char) {
          try {
            const codePoint = parseInt(char, 16);
            if (codePoint >= SURROGATE_FIRST && codePoint <= SURROGATE_LAST) {
              throw this.error(new TomlError("Invalid unicode, character in range 0xD800 - 0xDFFF is reserved"));
            }
            return this.returnNow(String.fromCodePoint(codePoint));
          } catch (err) {
            throw this.error(TomlError.wrap(err));
          }
        }
        parseSmallUnicode() {
          if (!isHexit(this.char)) {
            throw this.error(new TomlError("Invalid character in unicode sequence, expected hex"));
          } else {
            this.consume();
            if (this.state.buf.length >= 4)
              return this.return();
          }
        }
        parseLargeUnicode() {
          if (!isHexit(this.char)) {
            throw this.error(new TomlError("Invalid character in unicode sequence, expected hex"));
          } else {
            this.consume();
            if (this.state.buf.length >= 8)
              return this.return();
          }
        }
        parseNumberSign() {
          this.consume();
          return this.next(this.parseMaybeSignedInfOrNan);
        }
        parseMaybeSignedInfOrNan() {
          if (this.char === CHAR_i) {
            return this.next(this.parseInf);
          } else if (this.char === CHAR_n) {
            return this.next(this.parseNan);
          } else {
            return this.callNow(this.parseNoUnder, this.parseNumberIntegerStart);
          }
        }
        parseNumberIntegerStart() {
          if (this.char === CHAR_0) {
            this.consume();
            return this.next(this.parseNumberIntegerExponentOrDecimal);
          } else {
            return this.goto(this.parseNumberInteger);
          }
        }
        parseNumberIntegerExponentOrDecimal() {
          if (this.char === CHAR_PERIOD) {
            this.consume();
            return this.call(this.parseNoUnder, this.parseNumberFloat);
          } else if (this.char === CHAR_E || this.char === CHAR_e) {
            this.consume();
            return this.next(this.parseNumberExponentSign);
          } else {
            return this.returnNow(Integer(this.state.buf));
          }
        }
        parseNumberInteger() {
          if (isDigit(this.char)) {
            this.consume();
          } else if (this.char === CHAR_LOWBAR) {
            return this.call(this.parseNoUnder);
          } else if (this.char === CHAR_E || this.char === CHAR_e) {
            this.consume();
            return this.next(this.parseNumberExponentSign);
          } else if (this.char === CHAR_PERIOD) {
            this.consume();
            return this.call(this.parseNoUnder, this.parseNumberFloat);
          } else {
            const result = Integer(this.state.buf);
            if (result.isNaN()) {
              throw this.error(new TomlError("Invalid number"));
            } else {
              return this.returnNow(result);
            }
          }
        }
        parseNoUnder() {
          if (this.char === CHAR_LOWBAR || this.char === CHAR_PERIOD || this.char === CHAR_E || this.char === CHAR_e) {
            throw this.error(new TomlError("Unexpected character, expected digit"));
          } else if (this.atEndOfWord()) {
            throw this.error(new TomlError("Incomplete number"));
          }
          return this.returnNow();
        }
        parseNoUnderHexOctBinLiteral() {
          if (this.char === CHAR_LOWBAR || this.char === CHAR_PERIOD) {
            throw this.error(new TomlError("Unexpected character, expected digit"));
          } else if (this.atEndOfWord()) {
            throw this.error(new TomlError("Incomplete number"));
          }
          return this.returnNow();
        }
        parseNumberFloat() {
          if (this.char === CHAR_LOWBAR) {
            return this.call(this.parseNoUnder, this.parseNumberFloat);
          } else if (isDigit(this.char)) {
            this.consume();
          } else if (this.char === CHAR_E || this.char === CHAR_e) {
            this.consume();
            return this.next(this.parseNumberExponentSign);
          } else {
            return this.returnNow(Float(this.state.buf));
          }
        }
        parseNumberExponentSign() {
          if (isDigit(this.char)) {
            return this.goto(this.parseNumberExponent);
          } else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) {
            this.consume();
            this.call(this.parseNoUnder, this.parseNumberExponent);
          } else {
            throw this.error(new TomlError("Unexpected character, expected -, + or digit"));
          }
        }
        parseNumberExponent() {
          if (isDigit(this.char)) {
            this.consume();
          } else if (this.char === CHAR_LOWBAR) {
            return this.call(this.parseNoUnder);
          } else {
            return this.returnNow(Float(this.state.buf));
          }
        }
        parseNumberOrDateTime() {
          if (this.char === CHAR_0) {
            this.consume();
            return this.next(this.parseNumberBaseOrDateTime);
          } else {
            return this.goto(this.parseNumberOrDateTimeOnly);
          }
        }
        parseNumberOrDateTimeOnly() {
          if (this.char === CHAR_LOWBAR) {
            return this.call(this.parseNoUnder, this.parseNumberInteger);
          } else if (isDigit(this.char)) {
            this.consume();
            if (this.state.buf.length > 4)
              this.next(this.parseNumberInteger);
          } else if (this.char === CHAR_E || this.char === CHAR_e) {
            this.consume();
            return this.next(this.parseNumberExponentSign);
          } else if (this.char === CHAR_PERIOD) {
            this.consume();
            return this.call(this.parseNoUnder, this.parseNumberFloat);
          } else if (this.char === CHAR_HYPHEN) {
            return this.goto(this.parseDateTime);
          } else if (this.char === CHAR_COLON) {
            return this.goto(this.parseOnlyTimeHour);
          } else {
            return this.returnNow(Integer(this.state.buf));
          }
        }
        parseDateTimeOnly() {
          if (this.state.buf.length < 4) {
            if (isDigit(this.char)) {
              return this.consume();
            } else if (this.char === CHAR_COLON) {
              return this.goto(this.parseOnlyTimeHour);
            } else {
              throw this.error(new TomlError("Expected digit while parsing year part of a date"));
            }
          } else {
            if (this.char === CHAR_HYPHEN) {
              return this.goto(this.parseDateTime);
            } else {
              throw this.error(new TomlError("Expected hyphen (-) while parsing year part of date"));
            }
          }
        }
        parseNumberBaseOrDateTime() {
          if (this.char === CHAR_b) {
            this.consume();
            return this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerBin);
          } else if (this.char === CHAR_o) {
            this.consume();
            return this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerOct);
          } else if (this.char === CHAR_x) {
            this.consume();
            return this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerHex);
          } else if (this.char === CHAR_PERIOD) {
            return this.goto(this.parseNumberInteger);
          } else if (isDigit(this.char)) {
            return this.goto(this.parseDateTimeOnly);
          } else {
            return this.returnNow(Integer(this.state.buf));
          }
        }
        parseIntegerHex() {
          if (isHexit(this.char)) {
            this.consume();
          } else if (this.char === CHAR_LOWBAR) {
            return this.call(this.parseNoUnderHexOctBinLiteral);
          } else {
            const result = Integer(this.state.buf);
            if (result.isNaN()) {
              throw this.error(new TomlError("Invalid number"));
            } else {
              return this.returnNow(result);
            }
          }
        }
        parseIntegerOct() {
          if (isOctit(this.char)) {
            this.consume();
          } else if (this.char === CHAR_LOWBAR) {
            return this.call(this.parseNoUnderHexOctBinLiteral);
          } else {
            const result = Integer(this.state.buf);
            if (result.isNaN()) {
              throw this.error(new TomlError("Invalid number"));
            } else {
              return this.returnNow(result);
            }
          }
        }
        parseIntegerBin() {
          if (isBit(this.char)) {
            this.consume();
          } else if (this.char === CHAR_LOWBAR) {
            return this.call(this.parseNoUnderHexOctBinLiteral);
          } else {
            const result = Integer(this.state.buf);
            if (result.isNaN()) {
              throw this.error(new TomlError("Invalid number"));
            } else {
              return this.returnNow(result);
            }
          }
        }
        parseDateTime() {
          if (this.state.buf.length < 4) {
            throw this.error(new TomlError("Years less than 1000 must be zero padded to four characters"));
          }
          this.state.result = this.state.buf;
          this.state.buf = "";
          return this.next(this.parseDateMonth);
        }
        parseDateMonth() {
          if (this.char === CHAR_HYPHEN) {
            if (this.state.buf.length < 2) {
              throw this.error(new TomlError("Months less than 10 must be zero padded to two characters"));
            }
            this.state.result += "-" + this.state.buf;
            this.state.buf = "";
            return this.next(this.parseDateDay);
          } else if (isDigit(this.char)) {
            this.consume();
          } else {
            throw this.error(new TomlError("Incomplete datetime"));
          }
        }
        parseDateDay() {
          if (this.char === CHAR_T || this.char === CHAR_SP) {
            if (this.state.buf.length < 2) {
              throw this.error(new TomlError("Days less than 10 must be zero padded to two characters"));
            }
            this.state.result += "-" + this.state.buf;
            this.state.buf = "";
            return this.next(this.parseStartTimeHour);
          } else if (this.atEndOfWord()) {
            return this.returnNow(createDate(this.state.result + "-" + this.state.buf));
          } else if (isDigit(this.char)) {
            this.consume();
          } else {
            throw this.error(new TomlError("Incomplete datetime"));
          }
        }
        parseStartTimeHour() {
          if (this.atEndOfWord()) {
            return this.returnNow(createDate(this.state.result));
          } else {
            return this.goto(this.parseTimeHour);
          }
        }
        parseTimeHour() {
          if (this.char === CHAR_COLON) {
            if (this.state.buf.length < 2) {
              throw this.error(new TomlError("Hours less than 10 must be zero padded to two characters"));
            }
            this.state.result += "T" + this.state.buf;
            this.state.buf = "";
            return this.next(this.parseTimeMin);
          } else if (isDigit(this.char)) {
            this.consume();
          } else {
            throw this.error(new TomlError("Incomplete datetime"));
          }
        }
        parseTimeMin() {
          if (this.state.buf.length < 2 && isDigit(this.char)) {
            this.consume();
          } else if (this.state.buf.length === 2 && this.char === CHAR_COLON) {
            this.state.result += ":" + this.state.buf;
            this.state.buf = "";
            return this.next(this.parseTimeSec);
          } else {
            throw this.error(new TomlError("Incomplete datetime"));
          }
        }
        parseTimeSec() {
          if (isDigit(this.char)) {
            this.consume();
            if (this.state.buf.length === 2) {
              this.state.result += ":" + this.state.buf;
              this.state.buf = "";
              return this.next(this.parseTimeZoneOrFraction);
            }
          } else {
            throw this.error(new TomlError("Incomplete datetime"));
          }
        }
        parseOnlyTimeHour() {
          if (this.char === CHAR_COLON) {
            if (this.state.buf.length < 2) {
              throw this.error(new TomlError("Hours less than 10 must be zero padded to two characters"));
            }
            this.state.result = this.state.buf;
            this.state.buf = "";
            return this.next(this.parseOnlyTimeMin);
          } else {
            throw this.error(new TomlError("Incomplete time"));
          }
        }
        parseOnlyTimeMin() {
          if (this.state.buf.length < 2 && isDigit(this.char)) {
            this.consume();
          } else if (this.state.buf.length === 2 && this.char === CHAR_COLON) {
            this.state.result += ":" + this.state.buf;
            this.state.buf = "";
            return this.next(this.parseOnlyTimeSec);
          } else {
            throw this.error(new TomlError("Incomplete time"));
          }
        }
        parseOnlyTimeSec() {
          if (isDigit(this.char)) {
            this.consume();
            if (this.state.buf.length === 2) {
              return this.next(this.parseOnlyTimeFractionMaybe);
            }
          } else {
            throw this.error(new TomlError("Incomplete time"));
          }
        }
        parseOnlyTimeFractionMaybe() {
          this.state.result += ":" + this.state.buf;
          if (this.char === CHAR_PERIOD) {
            this.state.buf = "";
            this.next(this.parseOnlyTimeFraction);
          } else {
            return this.return(createTime(this.state.result));
          }
        }
        parseOnlyTimeFraction() {
          if (isDigit(this.char)) {
            this.consume();
          } else if (this.atEndOfWord()) {
            if (this.state.buf.length === 0)
              throw this.error(new TomlError("Expected digit in milliseconds"));
            return this.returnNow(createTime(this.state.result + "." + this.state.buf));
          } else {
            throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"));
          }
        }
        parseTimeZoneOrFraction() {
          if (this.char === CHAR_PERIOD) {
            this.consume();
            this.next(this.parseDateTimeFraction);
          } else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) {
            this.consume();
            this.next(this.parseTimeZoneHour);
          } else if (this.char === CHAR_Z) {
            this.consume();
            return this.return(createDateTime(this.state.result + this.state.buf));
          } else if (this.atEndOfWord()) {
            return this.returnNow(createDateTimeFloat(this.state.result + this.state.buf));
          } else {
            throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"));
          }
        }
        parseDateTimeFraction() {
          if (isDigit(this.char)) {
            this.consume();
          } else if (this.state.buf.length === 1) {
            throw this.error(new TomlError("Expected digit in milliseconds"));
          } else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) {
            this.consume();
            this.next(this.parseTimeZoneHour);
          } else if (this.char === CHAR_Z) {
            this.consume();
            return this.return(createDateTime(this.state.result + this.state.buf));
          } else if (this.atEndOfWord()) {
            return this.returnNow(createDateTimeFloat(this.state.result + this.state.buf));
          } else {
            throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"));
          }
        }
        parseTimeZoneHour() {
          if (isDigit(this.char)) {
            this.consume();
            if (/\d\d$/.test(this.state.buf))
              return this.next(this.parseTimeZoneSep);
          } else {
            throw this.error(new TomlError("Unexpected character in datetime, expected digit"));
          }
        }
        parseTimeZoneSep() {
          if (this.char === CHAR_COLON) {
            this.consume();
            this.next(this.parseTimeZoneMin);
          } else {
            throw this.error(new TomlError("Unexpected character in datetime, expected colon"));
          }
        }
        parseTimeZoneMin() {
          if (isDigit(this.char)) {
            this.consume();
            if (/\d\d$/.test(this.state.buf))
              return this.return(createDateTime(this.state.result + this.state.buf));
          } else {
            throw this.error(new TomlError("Unexpected character in datetime, expected digit"));
          }
        }
        parseBoolean() {
          if (this.char === CHAR_t) {
            this.consume();
            return this.next(this.parseTrue_r);
          } else if (this.char === CHAR_f) {
            this.consume();
            return this.next(this.parseFalse_a);
          }
        }
        parseTrue_r() {
          if (this.char === CHAR_r) {
            this.consume();
            return this.next(this.parseTrue_u);
          } else {
            throw this.error(new TomlError("Invalid boolean, expected true or false"));
          }
        }
        parseTrue_u() {
          if (this.char === CHAR_u) {
            this.consume();
            return this.next(this.parseTrue_e);
          } else {
            throw this.error(new TomlError("Invalid boolean, expected true or false"));
          }
        }
        parseTrue_e() {
          if (this.char === CHAR_e) {
            return this.return(true);
          } else {
            throw this.error(new TomlError("Invalid boolean, expected true or false"));
          }
        }
        parseFalse_a() {
          if (this.char === CHAR_a) {
            this.consume();
            return this.next(this.parseFalse_l);
          } else {
            throw this.error(new TomlError("Invalid boolean, expected true or false"));
          }
        }
        parseFalse_l() {
          if (this.char === CHAR_l) {
            this.consume();
            return this.next(this.parseFalse_s);
          } else {
            throw this.error(new TomlError("Invalid boolean, expected true or false"));
          }
        }
        parseFalse_s() {
          if (this.char === CHAR_s) {
            this.consume();
            return this.next(this.parseFalse_e);
          } else {
            throw this.error(new TomlError("Invalid boolean, expected true or false"));
          }
        }
        parseFalse_e() {
          if (this.char === CHAR_e) {
            return this.return(false);
          } else {
            throw this.error(new TomlError("Invalid boolean, expected true or false"));
          }
        }
        parseInlineList() {
          if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M || this.char === CTRL_J) {
            return null;
          } else if (this.char === Parser.END) {
            throw this.error(new TomlError("Unterminated inline array"));
          } else if (this.char === CHAR_NUM) {
            return this.call(this.parseComment);
          } else if (this.char === CHAR_RSQB) {
            return this.return(this.state.resultArr || InlineList());
          } else {
            return this.callNow(this.parseValue, this.recordInlineListValue);
          }
        }
        recordInlineListValue(value) {
          if (this.state.resultArr) {
            const listType = this.state.resultArr[_contentType];
            const valueType = tomlType(value);
            if (listType !== valueType) {
              throw this.error(new TomlError(`Inline lists must be a single type, not a mix of ${listType} and ${valueType}`));
            }
          } else {
            this.state.resultArr = InlineList(tomlType(value));
          }
          if (isFloat(value) || isInteger(value)) {
            this.state.resultArr.push(value.valueOf());
          } else {
            this.state.resultArr.push(value);
          }
          return this.goto(this.parseInlineListNext);
        }
        parseInlineListNext() {
          if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M || this.char === CTRL_J) {
            return null;
          } else if (this.char === CHAR_NUM) {
            return this.call(this.parseComment);
          } else if (this.char === CHAR_COMMA) {
            return this.next(this.parseInlineList);
          } else if (this.char === CHAR_RSQB) {
            return this.goto(this.parseInlineList);
          } else {
            throw this.error(new TomlError("Invalid character, expected whitespace, comma (,) or close bracket (])"));
          }
        }
        parseInlineTable() {
          if (this.char === CHAR_SP || this.char === CTRL_I) {
            return null;
          } else if (this.char === Parser.END || this.char === CHAR_NUM || this.char === CTRL_J || this.char === CTRL_M) {
            throw this.error(new TomlError("Unterminated inline array"));
          } else if (this.char === CHAR_RCUB) {
            return this.return(this.state.resultTable || InlineTable());
          } else {
            if (!this.state.resultTable)
              this.state.resultTable = InlineTable();
            return this.callNow(this.parseAssign, this.recordInlineTableValue);
          }
        }
        recordInlineTableValue(kv) {
          let target = this.state.resultTable;
          let finalKey = kv.key.pop();
          for (let kw of kv.key) {
            if (hasKey(target, kw) && (!isTable(target[kw]) || target[kw][_declared])) {
              throw this.error(new TomlError("Can't redefine existing key"));
            }
            target = target[kw] = target[kw] || Table();
          }
          if (hasKey(target, finalKey)) {
            throw this.error(new TomlError("Can't redefine existing key"));
          }
          if (isInteger(kv.value) || isFloat(kv.value)) {
            target[finalKey] = kv.value.valueOf();
          } else {
            target[finalKey] = kv.value;
          }
          return this.goto(this.parseInlineTableNext);
        }
        parseInlineTableNext() {
          if (this.char === CHAR_SP || this.char === CTRL_I) {
            return null;
          } else if (this.char === Parser.END || this.char === CHAR_NUM || this.char === CTRL_J || this.char === CTRL_M) {
            throw this.error(new TomlError("Unterminated inline array"));
          } else if (this.char === CHAR_COMMA) {
            return this.next(this.parseInlineTable);
          } else if (this.char === CHAR_RCUB) {
            return this.goto(this.parseInlineTable);
          } else {
            throw this.error(new TomlError("Invalid character, expected whitespace, comma (,) or close bracket (])"));
          }
        }
      }
      return TOMLParser;
    }
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-pretty-error.js
var require_parse_pretty_error = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-pretty-error.js"(exports2, module2) {
    "use strict";
    module2.exports = prettyError;
    function prettyError(err, buf) {
      if (err.pos == null || err.line == null)
        return err;
      let msg = err.message;
      msg += ` at row ${err.line + 1}, col ${err.col + 1}, pos ${err.pos}:
`;
      if (buf && buf.split) {
        const lines = buf.split(/\n/);
        const lineNumWidth = String(Math.min(lines.length, err.line + 3)).length;
        let linePadding = " ";
        while (linePadding.length < lineNumWidth)
          linePadding += " ";
        for (let ii = Math.max(0, err.line - 1); ii < Math.min(lines.length, err.line + 2); ++ii) {
          let lineNum = String(ii + 1);
          if (lineNum.length < lineNumWidth)
            lineNum = " " + lineNum;
          if (err.line === ii) {
            msg += lineNum + "> " + lines[ii] + "\n";
            msg += linePadding + "  ";
            for (let hh = 0; hh < err.col; ++hh) {
              msg += " ";
            }
            msg += "^\n";
          } else {
            msg += lineNum + ": " + lines[ii] + "\n";
          }
        }
      }
      err.message = msg + "\n";
      return err;
    }
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-string.js
var require_parse_string = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-string.js"(exports2, module2) {
    "use strict";
    module2.exports = parseString;
    var TOMLParser = require_toml_parser();
    var prettyError = require_parse_pretty_error();
    function parseString(str) {
      if (global.Buffer && global.Buffer.isBuffer(str)) {
        str = str.toString("utf8");
      }
      const parser = new TOMLParser();
      try {
        parser.parse(str);
        return parser.finish();
      } catch (err) {
        throw prettyError(err, str);
      }
    }
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-async.js
var require_parse_async = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-async.js"(exports2, module2) {
    "use strict";
    module2.exports = parseAsync;
    var TOMLParser = require_toml_parser();
    var prettyError = require_parse_pretty_error();
    function parseAsync(str, opts) {
      if (!opts)
        opts = {};
      const index = 0;
      const blocksize = opts.blocksize || 40960;
      const parser = new TOMLParser();
      return new Promise((resolve, reject) => {
        setImmediate(parseAsyncNext, index, blocksize, resolve, reject);
      });
      function parseAsyncNext(index2, blocksize2, resolve, reject) {
        if (index2 >= str.length) {
          try {
            return resolve(parser.finish());
          } catch (err) {
            return reject(prettyError(err, str));
          }
        }
        try {
          parser.parse(str.slice(index2, index2 + blocksize2));
          setImmediate(parseAsyncNext, index2 + blocksize2, blocksize2, resolve, reject);
        } catch (err) {
          reject(prettyError(err, str));
        }
      }
    }
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-stream.js
var require_parse_stream = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-stream.js"(exports2, module2) {
    "use strict";
    module2.exports = parseStream;
    var stream = __require("stream");
    var TOMLParser = require_toml_parser();
    function parseStream(stm) {
      if (stm) {
        return parseReadable(stm);
      } else {
        return parseTransform(stm);
      }
    }
    function parseReadable(stm) {
      const parser = new TOMLParser();
      stm.setEncoding("utf8");
      return new Promise((resolve, reject) => {
        let readable;
        let ended = false;
        let errored = false;
        function finish() {
          ended = true;
          if (readable)
            return;
          try {
            resolve(parser.finish());
          } catch (err) {
            reject(err);
          }
        }
        function error(err) {
          errored = true;
          reject(err);
        }
        stm.once("end", finish);
        stm.once("error", error);
        readNext();
        function readNext() {
          readable = true;
          let data;
          while ((data = stm.read()) !== null) {
            try {
              parser.parse(data);
            } catch (err) {
              return error(err);
            }
          }
          readable = false;
          if (ended)
            return finish();
          if (errored)
            return;
          stm.once("readable", readNext);
        }
      });
    }
    function parseTransform() {
      const parser = new TOMLParser();
      return new stream.Transform({
        objectMode: true,
        transform(chunk, encoding, cb) {
          try {
            parser.parse(chunk.toString(encoding));
          } catch (err) {
            this.emit("error", err);
          }
          cb();
        },
        flush(cb) {
          try {
            this.push(parser.finish());
          } catch (err) {
            this.emit("error", err);
          }
          cb();
        }
      });
    }
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse.js
var require_parse = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse.js"(exports2, module2) {
    "use strict";
    module2.exports = require_parse_string();
    module2.exports.async = require_parse_async();
    module2.exports.stream = require_parse_stream();
    module2.exports.prettyError = require_parse_pretty_error();
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/stringify.js
var require_stringify = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/stringify.js"(exports2, module2) {
    "use strict";
    module2.exports = stringify;
    module2.exports.value = stringifyInline;
    function stringify(obj) {
      if (obj === null)
        throw typeError("null");
      if (obj === void 0)
        throw typeError("undefined");
      if (typeof obj !== "object")
        throw typeError(typeof obj);
      if (typeof obj.toJSON === "function")
        obj = obj.toJSON();
      if (obj == null)
        return null;
      const type = tomlType2(obj);
      if (type !== "table")
        throw typeError(type);
      return stringifyObject("", "", obj);
    }
    function typeError(type) {
      return new Error("Can only stringify objects, not " + type);
    }
    function arrayOneTypeError() {
      return new Error("Array values can't have mixed types");
    }
    function getInlineKeys(obj) {
      return Object.keys(obj).filter((key2) => isInline(obj[key2]));
    }
    function getComplexKeys(obj) {
      return Object.keys(obj).filter((key2) => !isInline(obj[key2]));
    }
    function toJSON(obj) {
      let nobj = Array.isArray(obj) ? [] : Object.prototype.hasOwnProperty.call(obj, "__proto__") ? { ["__proto__"]: void 0 } : {};
      for (let prop of Object.keys(obj)) {
        if (obj[prop] && typeof obj[prop].toJSON === "function" && !("toISOString" in obj[prop])) {
          nobj[prop] = obj[prop].toJSON();
        } else {
          nobj[prop] = obj[prop];
        }
      }
      return nobj;
    }
    function stringifyObject(prefix, indent, obj) {
      obj = toJSON(obj);
      var inlineKeys;
      var complexKeys;
      inlineKeys = getInlineKeys(obj);
      complexKeys = getComplexKeys(obj);
      var result = [];
      var inlineIndent = indent || "";
      inlineKeys.forEach((key2) => {
        var type = tomlType2(obj[key2]);
        if (type !== "undefined" && type !== "null") {
          result.push(inlineIndent + stringifyKey(key2) + " = " + stringifyAnyInline(obj[key2], true));
        }
      });
      if (result.length > 0)
        result.push("");
      var complexIndent = prefix && inlineKeys.length > 0 ? indent + "  " : "";
      complexKeys.forEach((key2) => {
        result.push(stringifyComplex(prefix, complexIndent, key2, obj[key2]));
      });
      return result.join("\n");
    }
    function isInline(value) {
      switch (tomlType2(value)) {
        case "undefined":
        case "null":
        case "integer":
        case "nan":
        case "float":
        case "boolean":
        case "string":
        case "datetime":
          return true;
        case "array":
          return value.length === 0 || tomlType2(value[0]) !== "table";
        case "table":
          return Object.keys(value).length === 0;
        default:
          return false;
      }
    }
    function tomlType2(value) {
      if (value === void 0) {
        return "undefined";
      } else if (value === null) {
        return "null";
      } else if (typeof value === "bigint" || Number.isInteger(value) && !Object.is(value, -0)) {
        return "integer";
      } else if (typeof value === "number") {
        return "float";
      } else if (typeof value === "boolean") {
        return "boolean";
      } else if (typeof value === "string") {
        return "string";
      } else if ("toISOString" in value) {
        return isNaN(value) ? "undefined" : "datetime";
      } else if (Array.isArray(value)) {
        return "array";
      } else {
        return "table";
      }
    }
    function stringifyKey(key2) {
      var keyStr = String(key2);
      if (/^[-A-Za-z0-9_]+$/.test(keyStr)) {
        return keyStr;
      } else {
        return stringifyBasicString(keyStr);
      }
    }
    function stringifyBasicString(str) {
      return '"' + escapeString(str).replace(/"/g, '\\"') + '"';
    }
    function stringifyLiteralString(str) {
      return "'" + str + "'";
    }
    function numpad(num, str) {
      while (str.length < num)
        str = "0" + str;
      return str;
    }
    function escapeString(str) {
      return str.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/([\u0000-\u001f\u007f])/, (c) => "\\u" + numpad(4, c.codePointAt(0).toString(16)));
    }
    function stringifyMultilineString(str) {
      let escaped = str.split(/\n/).map((str2) => {
        return escapeString(str2).replace(/"(?="")/g, '\\"');
      }).join("\n");
      if (escaped.slice(-1) === '"')
        escaped += "\\\n";
      return '"""\n' + escaped + '"""';
    }
    function stringifyAnyInline(value, multilineOk) {
      let type = tomlType2(value);
      if (type === "string") {
        if (multilineOk && /\n/.test(value)) {
          type = "string-multiline";
        } else if (!/[\b\t\n\f\r']/.test(value) && /"/.test(value)) {
          type = "string-literal";
        }
      }
      return stringifyInline(value, type);
    }
    function stringifyInline(value, type) {
      if (!type)
        type = tomlType2(value);
      switch (type) {
        case "string-multiline":
          return stringifyMultilineString(value);
        case "string":
          return stringifyBasicString(value);
        case "string-literal":
          return stringifyLiteralString(value);
        case "integer":
          return stringifyInteger(value);
        case "float":
          return stringifyFloat(value);
        case "boolean":
          return stringifyBoolean(value);
        case "datetime":
          return stringifyDatetime(value);
        case "array":
          return stringifyInlineArray(value.filter((_) => tomlType2(_) !== "null" && tomlType2(_) !== "undefined" && tomlType2(_) !== "nan"));
        case "table":
          return stringifyInlineTable(value);
        default:
          throw typeError(type);
      }
    }
    function stringifyInteger(value) {
      return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "_");
    }
    function stringifyFloat(value) {
      if (value === Infinity) {
        return "inf";
      } else if (value === -Infinity) {
        return "-inf";
      } else if (Object.is(value, NaN)) {
        return "nan";
      } else if (Object.is(value, -0)) {
        return "-0.0";
      }
      var chunks = String(value).split(".");
      var int = chunks[0];
      var dec = chunks[1] || 0;
      return stringifyInteger(int) + "." + dec;
    }
    function stringifyBoolean(value) {
      return String(value);
    }
    function stringifyDatetime(value) {
      return value.toISOString();
    }
    function isNumber(type) {
      return type === "float" || type === "integer";
    }
    function arrayType(values) {
      var contentType = tomlType2(values[0]);
      if (values.every((_) => tomlType2(_) === contentType))
        return contentType;
      if (values.every((_) => isNumber(tomlType2(_))))
        return "float";
      return "mixed";
    }
    function validateArray(values) {
      const type = arrayType(values);
      if (type === "mixed") {
        throw arrayOneTypeError();
      }
      return type;
    }
    function stringifyInlineArray(values) {
      values = toJSON(values);
      const type = validateArray(values);
      var result = "[";
      var stringified = values.map((_) => stringifyInline(_, type));
      if (stringified.join(", ").length > 60 || /\n/.test(stringified)) {
        result += "\n  " + stringified.join(",\n  ") + "\n";
      } else {
        result += " " + stringified.join(", ") + (stringified.length > 0 ? " " : "");
      }
      return result + "]";
    }
    function stringifyInlineTable(value) {
      value = toJSON(value);
      var result = [];
      Object.keys(value).forEach((key2) => {
        result.push(stringifyKey(key2) + " = " + stringifyAnyInline(value[key2], false));
      });
      return "{ " + result.join(", ") + (result.length > 0 ? " " : "") + "}";
    }
    function stringifyComplex(prefix, indent, key2, value) {
      var valueType = tomlType2(value);
      if (valueType === "array") {
        return stringifyArrayOfTables(prefix, indent, key2, value);
      } else if (valueType === "table") {
        return stringifyComplexTable(prefix, indent, key2, value);
      } else {
        throw typeError(valueType);
      }
    }
    function stringifyArrayOfTables(prefix, indent, key2, values) {
      values = toJSON(values);
      validateArray(values);
      var firstValueType = tomlType2(values[0]);
      if (firstValueType !== "table")
        throw typeError(firstValueType);
      var fullKey = prefix + stringifyKey(key2);
      var result = "";
      values.forEach((table) => {
        if (result.length > 0)
          result += "\n";
        result += indent + "[[" + fullKey + "]]\n";
        result += stringifyObject(fullKey + ".", indent, table);
      });
      return result;
    }
    function stringifyComplexTable(prefix, indent, key2, value) {
      var fullKey = prefix + stringifyKey(key2);
      var result = "";
      if (getInlineKeys(value).length > 0) {
        result += indent + "[" + fullKey + "]\n";
      }
      return result + stringifyObject(fullKey + ".", indent, value);
    }
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/toml.js
var require_toml = __commonJS2({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/toml.js"(exports2) {
    "use strict";
    exports2.parse = require_parse();
    exports2.stringify = require_stringify();
  }
});

// ../node_modules/.pnpm/jsonata@1.8.6/node_modules/jsonata/jsonata.js
var require_jsonata = __commonJS2({
  "../node_modules/.pnpm/jsonata@1.8.6/node_modules/jsonata/jsonata.js"(exports2, module2) {
    (function(f) {
      if (typeof exports2 === "object" && typeof module2 !== "undefined") {
        module2.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.jsonata = f();
      }
    })(function() {
      var define2, module3, exports3;
      return function() {
        function r(e, n, t) {
          function o2(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof __require && __require;
                if (!f && c)
                  return c(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o2(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++)
            o2(t[i]);
          return o2;
        }
        return r;
      }()({ 1: [function(require2, module4, exports4) {
        const utils = require2("./utils");
        const dateTime = function() {
          "use strict";
          const stringToArray = utils.stringToArray;
          const few = [
            "Zero",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen"
          ];
          const ordinals = [
            "Zeroth",
            "First",
            "Second",
            "Third",
            "Fourth",
            "Fifth",
            "Sixth",
            "Seventh",
            "Eighth",
            "Ninth",
            "Tenth",
            "Eleventh",
            "Twelfth",
            "Thirteenth",
            "Fourteenth",
            "Fifteenth",
            "Sixteenth",
            "Seventeenth",
            "Eighteenth",
            "Nineteenth"
          ];
          const decades = ["Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety", "Hundred"];
          const magnitudes = ["Thousand", "Million", "Billion", "Trillion"];
          function numberToWords(value, ordinal) {
            var lookup = function(num, prev, ord) {
              var words2 = "";
              if (num <= 19) {
                words2 = (prev ? " and " : "") + (ord ? ordinals[num] : few[num]);
              } else if (num < 100) {
                const tens = Math.floor(num / 10);
                const remainder = num % 10;
                words2 = (prev ? " and " : "") + decades[tens - 2];
                if (remainder > 0) {
                  words2 += "-" + lookup(remainder, false, ord);
                } else if (ord) {
                  words2 = words2.substring(0, words2.length - 1) + "ieth";
                }
              } else if (num < 1e3) {
                const hundreds = Math.floor(num / 100);
                const remainder = num % 100;
                words2 = (prev ? ", " : "") + few[hundreds] + " Hundred";
                if (remainder > 0) {
                  words2 += lookup(remainder, true, ord);
                } else if (ord) {
                  words2 += "th";
                }
              } else {
                var mag = Math.floor(Math.log10(num) / 3);
                if (mag > magnitudes.length) {
                  mag = magnitudes.length;
                }
                const factor = Math.pow(10, mag * 3);
                const mant = Math.floor(num / factor);
                const remainder = num - mant * factor;
                words2 = (prev ? ", " : "") + lookup(mant, false, false) + " " + magnitudes[mag - 1];
                if (remainder > 0) {
                  words2 += lookup(remainder, true, ord);
                } else if (ord) {
                  words2 += "th";
                }
              }
              return words2;
            };
            var words = lookup(value, false, ordinal);
            return words;
          }
          const wordValues = {};
          few.forEach(function(word, index) {
            wordValues[word.toLowerCase()] = index;
          });
          ordinals.forEach(function(word, index) {
            wordValues[word.toLowerCase()] = index;
          });
          decades.forEach(function(word, index) {
            const lword = word.toLowerCase();
            wordValues[lword] = (index + 2) * 10;
            wordValues[lword.substring(0, word.length - 1) + "ieth"] = wordValues[lword];
          });
          wordValues.hundredth = 100;
          magnitudes.forEach(function(word, index) {
            const lword = word.toLowerCase();
            const val = Math.pow(10, (index + 1) * 3);
            wordValues[lword] = val;
            wordValues[lword + "th"] = val;
          });
          function wordsToNumber(text3) {
            const parts = text3.split(/,\s|\sand\s|[\s\\-]/);
            const values = parts.map((part) => wordValues[part]);
            let segs = [0];
            values.forEach((value) => {
              if (value < 100) {
                let top = segs.pop();
                if (top >= 1e3) {
                  segs.push(top);
                  top = 0;
                }
                segs.push(top + value);
              } else {
                segs.push(segs.pop() * value);
              }
            });
            const result = segs.reduce((a, b) => a + b, 0);
            return result;
          }
          const romanNumerals = [
            [1e3, "m"],
            [900, "cm"],
            [500, "d"],
            [400, "cd"],
            [100, "c"],
            [90, "xc"],
            [50, "l"],
            [40, "xl"],
            [10, "x"],
            [9, "ix"],
            [5, "v"],
            [4, "iv"],
            [1, "i"]
          ];
          const romanValues = { "M": 1e3, "D": 500, "C": 100, "L": 50, "X": 10, "V": 5, "I": 1 };
          function decimalToRoman(value) {
            for (var index = 0; index < romanNumerals.length; index++) {
              const numeral = romanNumerals[index];
              if (value >= numeral[0]) {
                return numeral[1] + decimalToRoman(value - numeral[0]);
              }
            }
            return "";
          }
          function romanToDecimal(roman) {
            var decimal = 0;
            var max = 1;
            for (var i = roman.length - 1; i >= 0; i--) {
              const digit = roman[i];
              const value = romanValues[digit];
              if (value < max) {
                decimal -= value;
              } else {
                max = value;
                decimal += value;
              }
            }
            return decimal;
          }
          function decimalToLetters(value, aChar) {
            var letters = [];
            var aCode = aChar.charCodeAt(0);
            while (value > 0) {
              letters.unshift(String.fromCharCode((value - 1) % 26 + aCode));
              value = Math.floor((value - 1) / 26);
            }
            return letters.join("");
          }
          function lettersToDecimal(letters, aChar) {
            var aCode = aChar.charCodeAt(0);
            var decimal = 0;
            for (var i = 0; i < letters.length; i++) {
              decimal += (letters.charCodeAt(letters.length - i - 1) - aCode + 1) * Math.pow(26, i);
            }
            return decimal;
          }
          function formatInteger(value, picture) {
            if (typeof value === "undefined") {
              return void 0;
            }
            value = Math.floor(value);
            const format = analyseIntegerPicture(picture);
            return _formatInteger(value, format);
          }
          const formats = {
            DECIMAL: "decimal",
            LETTERS: "letters",
            ROMAN: "roman",
            WORDS: "words",
            SEQUENCE: "sequence"
          };
          const tcase = {
            UPPER: "upper",
            LOWER: "lower",
            TITLE: "title"
          };
          function _formatInteger(value, format) {
            let formattedInteger;
            const negative = value < 0;
            value = Math.abs(value);
            switch (format.primary) {
              case formats.LETTERS:
                formattedInteger = decimalToLetters(value, format.case === tcase.UPPER ? "A" : "a");
                break;
              case formats.ROMAN:
                formattedInteger = decimalToRoman(value);
                if (format.case === tcase.UPPER) {
                  formattedInteger = formattedInteger.toUpperCase();
                }
                break;
              case formats.WORDS:
                formattedInteger = numberToWords(value, format.ordinal);
                if (format.case === tcase.UPPER) {
                  formattedInteger = formattedInteger.toUpperCase();
                } else if (format.case === tcase.LOWER) {
                  formattedInteger = formattedInteger.toLowerCase();
                }
                break;
              case formats.DECIMAL:
                formattedInteger = "" + value;
                var padLength = format.mandatoryDigits - formattedInteger.length;
                if (padLength > 0) {
                  var padding = new Array(padLength + 1).join("0");
                  formattedInteger = padding + formattedInteger;
                }
                if (format.zeroCode !== 48) {
                  formattedInteger = stringToArray(formattedInteger).map((code) => {
                    return String.fromCodePoint(code.codePointAt(0) + format.zeroCode - 48);
                  }).join("");
                }
                if (format.regular) {
                  const n = Math.floor((formattedInteger.length - 1) / format.groupingSeparators.position);
                  for (let ii = n; ii > 0; ii--) {
                    const pos = formattedInteger.length - ii * format.groupingSeparators.position;
                    formattedInteger = formattedInteger.substr(0, pos) + format.groupingSeparators.character + formattedInteger.substr(pos);
                  }
                } else {
                  format.groupingSeparators.reverse().forEach((separator) => {
                    const pos = formattedInteger.length - separator.position;
                    formattedInteger = formattedInteger.substr(0, pos) + separator.character + formattedInteger.substr(pos);
                  });
                }
                if (format.ordinal) {
                  var suffix123 = { "1": "st", "2": "nd", "3": "rd" };
                  var lastDigit = formattedInteger[formattedInteger.length - 1];
                  var suffix = suffix123[lastDigit];
                  if (!suffix || formattedInteger.length > 1 && formattedInteger[formattedInteger.length - 2] === "1") {
                    suffix = "th";
                  }
                  formattedInteger = formattedInteger + suffix;
                }
                break;
              case formats.SEQUENCE:
                throw {
                  code: "D3130",
                  value: format.token
                };
            }
            if (negative) {
              formattedInteger = "-" + formattedInteger;
            }
            return formattedInteger;
          }
          const decimalGroups = [48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296];
          function analyseIntegerPicture(picture) {
            const format = {
              type: "integer",
              primary: formats.DECIMAL,
              case: tcase.LOWER,
              ordinal: false
            };
            let primaryFormat, formatModifier;
            const semicolon = picture.lastIndexOf(";");
            if (semicolon === -1) {
              primaryFormat = picture;
            } else {
              primaryFormat = picture.substring(0, semicolon);
              formatModifier = picture.substring(semicolon + 1);
              if (formatModifier[0] === "o") {
                format.ordinal = true;
              }
            }
            switch (primaryFormat) {
              case "A":
                format.case = tcase.UPPER;
              case "a":
                format.primary = formats.LETTERS;
                break;
              case "I":
                format.case = tcase.UPPER;
              case "i":
                format.primary = formats.ROMAN;
                break;
              case "W":
                format.case = tcase.UPPER;
                format.primary = formats.WORDS;
                break;
              case "Ww":
                format.case = tcase.TITLE;
                format.primary = formats.WORDS;
                break;
              case "w":
                format.primary = formats.WORDS;
                break;
              default: {
                let zeroCode = null;
                let mandatoryDigits = 0;
                let optionalDigits = 0;
                let groupingSeparators = [];
                let separatorPosition = 0;
                const formatCodepoints = stringToArray(primaryFormat).map((c) => c.codePointAt(0)).reverse();
                formatCodepoints.forEach((codePoint) => {
                  let digit = false;
                  for (let ii = 0; ii < decimalGroups.length; ii++) {
                    const group = decimalGroups[ii];
                    if (codePoint >= group && codePoint <= group + 9) {
                      digit = true;
                      mandatoryDigits++;
                      separatorPosition++;
                      if (zeroCode === null) {
                        zeroCode = group;
                      } else if (group !== zeroCode) {
                        throw {
                          code: "D3131"
                        };
                      }
                      break;
                    }
                  }
                  if (!digit) {
                    if (codePoint === 35) {
                      separatorPosition++;
                      optionalDigits++;
                    } else {
                      groupingSeparators.push({
                        position: separatorPosition,
                        character: String.fromCodePoint(codePoint)
                      });
                    }
                  }
                });
                if (mandatoryDigits > 0) {
                  format.primary = formats.DECIMAL;
                  format.zeroCode = zeroCode;
                  format.mandatoryDigits = mandatoryDigits;
                  format.optionalDigits = optionalDigits;
                  const regularRepeat = function(separators) {
                    if (separators.length === 0) {
                      return 0;
                    }
                    const sepChar = separators[0].character;
                    for (let ii = 1; ii < separators.length; ii++) {
                      if (separators[ii].character !== sepChar) {
                        return 0;
                      }
                    }
                    const indexes = separators.map((separator) => separator.position);
                    const gcd = function(a, b) {
                      return b === 0 ? a : gcd(b, a % b);
                    };
                    const factor = indexes.reduce(gcd);
                    for (let index = 1; index <= indexes.length; index++) {
                      if (indexes.indexOf(index * factor) === -1) {
                        return 0;
                      }
                    }
                    return factor;
                  };
                  const regular = regularRepeat(groupingSeparators);
                  if (regular > 0) {
                    format.regular = true;
                    format.groupingSeparators = {
                      position: regular,
                      character: groupingSeparators[0].character
                    };
                  } else {
                    format.regular = false;
                    format.groupingSeparators = groupingSeparators;
                  }
                } else {
                  format.primary = formats.SEQUENCE;
                  format.token = primaryFormat;
                }
              }
            }
            return format;
          }
          const defaultPresentationModifiers = {
            Y: "1",
            M: "1",
            D: "1",
            d: "1",
            F: "n",
            W: "1",
            w: "1",
            X: "1",
            x: "1",
            H: "1",
            h: "1",
            P: "n",
            m: "01",
            s: "01",
            f: "1",
            Z: "01:01",
            z: "01:01",
            C: "n",
            E: "n"
          };
          function analyseDateTimePicture(picture) {
            var spec = [];
            const format = {
              type: "datetime",
              parts: spec
            };
            const addLiteral = function(start2, end) {
              if (end > start2) {
                let literal = picture.substring(start2, end);
                literal = literal.split("]]").join("]");
                spec.push({ type: "literal", value: literal });
              }
            };
            var start = 0, pos = 0;
            while (pos < picture.length) {
              if (picture.charAt(pos) === "[") {
                if (picture.charAt(pos + 1) === "[") {
                  addLiteral(start, pos);
                  spec.push({ type: "literal", value: "[" });
                  pos += 2;
                  start = pos;
                  continue;
                }
                addLiteral(start, pos);
                start = pos;
                pos = picture.indexOf("]", start);
                if (pos === -1) {
                  throw {
                    code: "D3135"
                  };
                }
                let marker = picture.substring(start + 1, pos);
                marker = marker.split(/\s+/).join("");
                var def = {
                  type: "marker",
                  component: marker.charAt(0)
                };
                var comma = marker.lastIndexOf(",");
                var presMod;
                if (comma !== -1) {
                  const widthMod = marker.substring(comma + 1);
                  const dash = widthMod.indexOf("-");
                  let min, max;
                  const parseWidth = function(wm) {
                    if (typeof wm === "undefined" || wm === "*") {
                      return void 0;
                    } else {
                      return parseInt(wm);
                    }
                  };
                  if (dash === -1) {
                    min = widthMod;
                  } else {
                    min = widthMod.substring(0, dash);
                    max = widthMod.substring(dash + 1);
                  }
                  const widthDef = {
                    min: parseWidth(min),
                    max: parseWidth(max)
                  };
                  def.width = widthDef;
                  presMod = marker.substring(1, comma);
                } else {
                  presMod = marker.substring(1);
                }
                if (presMod.length === 1) {
                  def.presentation1 = presMod;
                } else if (presMod.length > 1) {
                  var lastChar = presMod.charAt(presMod.length - 1);
                  if ("atco".indexOf(lastChar) !== -1) {
                    def.presentation2 = lastChar;
                    if (lastChar === "o") {
                      def.ordinal = true;
                    }
                    def.presentation1 = presMod.substring(0, presMod.length - 1);
                  } else {
                    def.presentation1 = presMod;
                  }
                } else {
                  def.presentation1 = defaultPresentationModifiers[def.component];
                }
                if (typeof def.presentation1 === "undefined") {
                  throw {
                    code: "D3132",
                    value: def.component
                  };
                }
                if (def.presentation1[0] === "n") {
                  def.names = tcase.LOWER;
                } else if (def.presentation1[0] === "N") {
                  if (def.presentation1[1] === "n") {
                    def.names = tcase.TITLE;
                  } else {
                    def.names = tcase.UPPER;
                  }
                } else if ("YMDdFWwXxHhmsf".indexOf(def.component) !== -1) {
                  var integerPattern = def.presentation1;
                  if (def.presentation2) {
                    integerPattern += ";" + def.presentation2;
                  }
                  def.integerFormat = analyseIntegerPicture(integerPattern);
                  if (def.width && def.width.min !== void 0) {
                    if (def.integerFormat.mandatoryDigits < def.width.min) {
                      def.integerFormat.mandatoryDigits = def.width.min;
                    }
                  }
                  if ("YMD".indexOf(def.component) !== -1) {
                    def.n = -1;
                    if (def.width && def.width.max !== void 0) {
                      def.n = def.width.max;
                      def.integerFormat.mandatoryDigits = def.n;
                    } else {
                      var w = def.integerFormat.mandatoryDigits + def.integerFormat.optionalDigits;
                      if (w >= 2) {
                        def.n = w;
                      }
                    }
                  }
                }
                if (def.component === "Z" || def.component === "z") {
                  def.integerFormat = analyseIntegerPicture(def.presentation1);
                }
                spec.push(def);
                start = pos + 1;
              }
              pos++;
            }
            addLiteral(start, pos);
            return format;
          }
          const days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const millisInADay = 1e3 * 60 * 60 * 24;
          const startOfFirstWeek = function(ym) {
            const jan1 = Date.UTC(ym.year, ym.month);
            var dayOfJan1 = new Date(jan1).getUTCDay();
            if (dayOfJan1 === 0) {
              dayOfJan1 = 7;
            }
            return dayOfJan1 > 4 ? jan1 + (8 - dayOfJan1) * millisInADay : jan1 - (dayOfJan1 - 1) * millisInADay;
          };
          const yearMonth = function(year, month) {
            return {
              year,
              month,
              nextMonth: function() {
                return month === 11 ? yearMonth(year + 1, 0) : yearMonth(year, month + 1);
              },
              previousMonth: function() {
                return month === 0 ? yearMonth(year - 1, 11) : yearMonth(year, month - 1);
              },
              nextYear: function() {
                return yearMonth(year + 1, month);
              },
              previousYear: function() {
                return yearMonth(year - 1, month);
              }
            };
          };
          const deltaWeeks = function(start, end) {
            return (end - start) / (millisInADay * 7) + 1;
          };
          const getDateTimeFragment = (date2, component) => {
            let componentValue;
            switch (component) {
              case "Y":
                componentValue = date2.getUTCFullYear();
                break;
              case "M":
                componentValue = date2.getUTCMonth() + 1;
                break;
              case "D":
                componentValue = date2.getUTCDate();
                break;
              case "d": {
                const today = Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
                const firstJan = Date.UTC(date2.getUTCFullYear(), 0);
                componentValue = (today - firstJan) / millisInADay + 1;
                break;
              }
              case "F":
                componentValue = date2.getUTCDay();
                if (componentValue === 0) {
                  componentValue = 7;
                }
                break;
              case "W": {
                const thisYear = yearMonth(date2.getUTCFullYear(), 0);
                const startOfWeek1 = startOfFirstWeek(thisYear);
                const today = Date.UTC(thisYear.year, date2.getUTCMonth(), date2.getUTCDate());
                let week = deltaWeeks(startOfWeek1, today);
                if (week > 52) {
                  const startOfFollowingYear = startOfFirstWeek(thisYear.nextYear());
                  if (today >= startOfFollowingYear) {
                    week = 1;
                  }
                } else if (week < 1) {
                  const startOfPreviousYear = startOfFirstWeek(thisYear.previousYear());
                  week = deltaWeeks(startOfPreviousYear, today);
                }
                componentValue = Math.floor(week);
                break;
              }
              case "w": {
                const thisMonth = yearMonth(date2.getUTCFullYear(), date2.getUTCMonth());
                const startOfWeek1 = startOfFirstWeek(thisMonth);
                const today = Date.UTC(thisMonth.year, thisMonth.month, date2.getUTCDate());
                let week = deltaWeeks(startOfWeek1, today);
                if (week > 4) {
                  const startOfFollowingMonth = startOfFirstWeek(thisMonth.nextMonth());
                  if (today >= startOfFollowingMonth) {
                    week = 1;
                  }
                } else if (week < 1) {
                  const startOfPreviousMonth = startOfFirstWeek(thisMonth.previousMonth());
                  week = deltaWeeks(startOfPreviousMonth, today);
                }
                componentValue = Math.floor(week);
                break;
              }
              case "X": {
                const thisYear = yearMonth(date2.getUTCFullYear(), 0);
                const startOfISOYear = startOfFirstWeek(thisYear);
                const endOfISOYear = startOfFirstWeek(thisYear.nextYear());
                const now = date2.getTime();
                if (now < startOfISOYear) {
                  componentValue = thisYear.year - 1;
                } else if (now >= endOfISOYear) {
                  componentValue = thisYear.year + 1;
                } else {
                  componentValue = thisYear.year;
                }
                break;
              }
              case "x": {
                const thisMonth = yearMonth(date2.getUTCFullYear(), date2.getUTCMonth());
                const startOfISOMonth = startOfFirstWeek(thisMonth);
                const nextMonth = thisMonth.nextMonth();
                const endOfISOMonth = startOfFirstWeek(nextMonth);
                const now = date2.getTime();
                if (now < startOfISOMonth) {
                  componentValue = thisMonth.previousMonth().month + 1;
                } else if (now >= endOfISOMonth) {
                  componentValue = nextMonth.month + 1;
                } else {
                  componentValue = thisMonth.month + 1;
                }
                break;
              }
              case "H":
                componentValue = date2.getUTCHours();
                break;
              case "h":
                componentValue = date2.getUTCHours();
                componentValue = componentValue % 12;
                if (componentValue === 0) {
                  componentValue = 12;
                }
                break;
              case "P":
                componentValue = date2.getUTCHours() >= 12 ? "pm" : "am";
                break;
              case "m":
                componentValue = date2.getUTCMinutes();
                break;
              case "s":
                componentValue = date2.getUTCSeconds();
                break;
              case "f":
                componentValue = date2.getUTCMilliseconds();
                break;
              case "Z":
              case "z":
                break;
              case "C":
                componentValue = "ISO";
                break;
              case "E":
                componentValue = "ISO";
                break;
            }
            return componentValue;
          };
          let iso8601Spec = null;
          function formatDateTime(millis, picture, timezone) {
            var offsetHours = 0;
            var offsetMinutes = 0;
            if (typeof timezone !== "undefined") {
              const offset = parseInt(timezone);
              offsetHours = Math.floor(offset / 100);
              offsetMinutes = offset % 100;
            }
            var formatComponent = function(date2, markerSpec) {
              var componentValue = getDateTimeFragment(date2, markerSpec.component);
              if ("YMDdFWwXxHhms".indexOf(markerSpec.component) !== -1) {
                if (markerSpec.component === "Y") {
                  if (markerSpec.n !== -1) {
                    componentValue = componentValue % Math.pow(10, markerSpec.n);
                  }
                }
                if (markerSpec.names) {
                  if (markerSpec.component === "M" || markerSpec.component === "x") {
                    componentValue = months[componentValue - 1];
                  } else if (markerSpec.component === "F") {
                    componentValue = days[componentValue];
                  } else {
                    throw {
                      code: "D3133",
                      value: markerSpec.component
                    };
                  }
                  if (markerSpec.names === tcase.UPPER) {
                    componentValue = componentValue.toUpperCase();
                  } else if (markerSpec.names === tcase.LOWER) {
                    componentValue = componentValue.toLowerCase();
                  }
                  if (markerSpec.width && componentValue.length > markerSpec.width.max) {
                    componentValue = componentValue.substring(0, markerSpec.width.max);
                  }
                } else {
                  componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
                }
              } else if (markerSpec.component === "f") {
                componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
              } else if (markerSpec.component === "Z" || markerSpec.component === "z") {
                const offset = offsetHours * 100 + offsetMinutes;
                if (markerSpec.integerFormat.regular) {
                  componentValue = _formatInteger(offset, markerSpec.integerFormat);
                } else {
                  const numDigits = markerSpec.integerFormat.mandatoryDigits;
                  if (numDigits === 1 || numDigits === 2) {
                    componentValue = _formatInteger(offsetHours, markerSpec.integerFormat);
                    if (offsetMinutes !== 0) {
                      componentValue += ":" + formatInteger(offsetMinutes, "00");
                    }
                  } else if (numDigits === 3 || numDigits === 4) {
                    componentValue = _formatInteger(offset, markerSpec.integerFormat);
                  } else {
                    throw {
                      code: "D3134",
                      value: numDigits
                    };
                  }
                }
                if (offset >= 0) {
                  componentValue = "+" + componentValue;
                }
                if (markerSpec.component === "z") {
                  componentValue = "GMT" + componentValue;
                }
                if (offset === 0 && markerSpec.presentation2 === "t") {
                  componentValue = "Z";
                }
              }
              return componentValue;
            };
            let formatSpec;
            if (typeof picture === "undefined") {
              if (iso8601Spec === null) {
                iso8601Spec = analyseDateTimePicture("[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01].[f001][Z01:01t]");
              }
              formatSpec = iso8601Spec;
            } else {
              formatSpec = analyseDateTimePicture(picture);
            }
            const offsetMillis = (60 * offsetHours + offsetMinutes) * 60 * 1e3;
            const dateTime2 = new Date(millis + offsetMillis);
            let result = "";
            formatSpec.parts.forEach(function(part) {
              if (part.type === "literal") {
                result += part.value;
              } else {
                result += formatComponent(dateTime2, part);
              }
            });
            return result;
          }
          function generateRegex(formatSpec) {
            var matcher = {};
            if (formatSpec.type === "datetime") {
              matcher.type = "datetime";
              matcher.parts = formatSpec.parts.map(function(part) {
                var res = {};
                if (part.type === "literal") {
                  res.regex = part.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                } else if (part.component === "Z" || part.component === "z") {
                  let separator;
                  if (!Array.isArray(part.integerFormat.groupingSeparators)) {
                    separator = part.integerFormat.groupingSeparators;
                  }
                  res.regex = "";
                  if (part.component === "z") {
                    res.regex = "GMT";
                  }
                  res.regex += "[-+][0-9]+";
                  if (separator) {
                    res.regex += separator.character + "[0-9]+";
                  }
                  res.parse = function(value) {
                    if (part.component === "z") {
                      value = value.substring(3);
                    }
                    let offsetHours = 0, offsetMinutes = 0;
                    if (separator) {
                      offsetHours = Number.parseInt(value.substring(0, value.indexOf(separator.character)));
                      offsetMinutes = Number.parseInt(value.substring(value.indexOf(separator.character) + 1));
                    } else {
                      const numdigits = value.length - 1;
                      if (numdigits <= 2) {
                        offsetHours = Number.parseInt(value);
                      } else {
                        offsetHours = Number.parseInt(value.substring(0, 3));
                        offsetMinutes = Number.parseInt(value.substring(3));
                      }
                    }
                    return offsetHours * 60 + offsetMinutes;
                  };
                } else if (part.integerFormat) {
                  part.integerFormat.n = part.n;
                  res = generateRegex(part.integerFormat);
                } else {
                  res.regex = "[a-zA-Z]+";
                  var lookup = {};
                  if (part.component === "M" || part.component === "x") {
                    months.forEach(function(name, index) {
                      if (part.width && part.width.max) {
                        lookup[name.substring(0, part.width.max)] = index + 1;
                      } else {
                        lookup[name] = index + 1;
                      }
                    });
                  } else if (part.component === "F") {
                    days.forEach(function(name, index) {
                      if (index > 0) {
                        if (part.width && part.width.max) {
                          lookup[name.substring(0, part.width.max)] = index;
                        } else {
                          lookup[name] = index;
                        }
                      }
                    });
                  } else if (part.component === "P") {
                    lookup = { "am": 0, "AM": 0, "pm": 1, "PM": 1 };
                  } else {
                    throw {
                      code: "D3133",
                      value: part.component
                    };
                  }
                  res.parse = function(value) {
                    return lookup[value];
                  };
                }
                res.component = part.component;
                return res;
              });
            } else {
              matcher.type = "integer";
              const isUpper = formatSpec.case === tcase.UPPER;
              let occurrences;
              if (formatSpec.n && formatSpec.n > 0) {
                if (formatSpec.optionalDigits === 0) {
                  occurrences = `{${formatSpec.n}}`;
                } else {
                  occurrences = `{${formatSpec.n - formatSpec.optionalDigits},${formatSpec.n}}`;
                }
              } else {
                occurrences = "+";
              }
              switch (formatSpec.primary) {
                case formats.LETTERS:
                  matcher.regex = isUpper ? "[A-Z]+" : "[a-z]+";
                  matcher.parse = function(value) {
                    return lettersToDecimal(value, isUpper ? "A" : "a");
                  };
                  break;
                case formats.ROMAN:
                  matcher.regex = isUpper ? "[MDCLXVI]+" : "[mdclxvi]+";
                  matcher.parse = function(value) {
                    return romanToDecimal(isUpper ? value : value.toUpperCase());
                  };
                  break;
                case formats.WORDS:
                  matcher.regex = "(?:" + Object.keys(wordValues).concat("and", "[\\-, ]").join("|") + ")+";
                  matcher.parse = function(value) {
                    return wordsToNumber(value.toLowerCase());
                  };
                  break;
                case formats.DECIMAL:
                  matcher.regex = `[0-9]${occurrences}`;
                  if (formatSpec.ordinal) {
                    matcher.regex += "(?:th|st|nd|rd)";
                  }
                  matcher.parse = function(value) {
                    let digits = value;
                    if (formatSpec.ordinal) {
                      digits = value.substring(0, value.length - 2);
                    }
                    if (formatSpec.regular) {
                      digits = digits.split(",").join("");
                    } else {
                      formatSpec.groupingSeparators.forEach((sep) => {
                        digits = digits.split(sep.character).join("");
                      });
                    }
                    if (formatSpec.zeroCode !== 48) {
                      digits = digits.split("").map((char) => String.fromCodePoint(char.codePointAt(0) - formatSpec.zeroCode + 48)).join("");
                    }
                    return parseInt(digits);
                  };
                  break;
                case formats.SEQUENCE:
                  throw {
                    code: "D3130",
                    value: formatSpec.token
                  };
              }
            }
            return matcher;
          }
          function parseInteger(value, picture) {
            if (typeof value === "undefined") {
              return void 0;
            }
            const formatSpec = analyseIntegerPicture(picture);
            const matchSpec = generateRegex(formatSpec);
            const result = matchSpec.parse(value);
            return result;
          }
          function parseDateTime(timestamp, picture) {
            const formatSpec = analyseDateTimePicture(picture);
            const matchSpec = generateRegex(formatSpec);
            const fullRegex = "^" + matchSpec.parts.map((part) => "(" + part.regex + ")").join("") + "$";
            const matcher = new RegExp(fullRegex, "i");
            var info = matcher.exec(timestamp);
            if (info !== null) {
              const dmA = 161;
              const dmB = 130;
              const dmC = 84;
              const dmD = 72;
              const tmA = 23;
              const tmB = 47;
              const components = {};
              for (let i = 1; i < info.length; i++) {
                const mpart = matchSpec.parts[i - 1];
                if (mpart.parse) {
                  components[mpart.component] = mpart.parse(info[i]);
                }
              }
              if (Object.getOwnPropertyNames(components).length === 0) {
                return void 0;
              }
              let mask = 0;
              const shift = (bit) => {
                mask <<= 1;
                mask += bit ? 1 : 0;
              };
              const isType = (type) => {
                return !(~type & mask) && !!(type & mask);
              };
              "YXMxWwdD".split("").forEach((part) => shift(components[part]));
              const dateA = isType(dmA);
              const dateB = !dateA && isType(dmB);
              const dateC = isType(dmC);
              const dateD = !dateC && isType(dmD);
              mask = 0;
              "PHhmsf".split("").forEach((part) => shift(components[part]));
              const timeA = isType(tmA);
              const timeB = !timeA && isType(tmB);
              const dateComps = dateB ? "YD" : dateC ? "XxwF" : dateD ? "XWF" : "YMD";
              const timeComps = timeB ? "Phmsf" : "Hmsf";
              const comps = dateComps + timeComps;
              const now = this.environment.timestamp;
              let startSpecified = false;
              let endSpecified = false;
              comps.split("").forEach((part) => {
                if (typeof components[part] === "undefined") {
                  if (startSpecified) {
                    components[part] = "MDd".indexOf(part) !== -1 ? 1 : 0;
                    endSpecified = true;
                  } else {
                    components[part] = getDateTimeFragment(now, part);
                  }
                } else {
                  startSpecified = true;
                  if (endSpecified) {
                    throw {
                      code: "D3136"
                    };
                  }
                }
              });
              if (components.M > 0) {
                components.M -= 1;
              } else {
                components.M = 0;
              }
              if (dateB) {
                const firstJan = Date.UTC(components.Y, 0);
                const offsetMillis = (components.d - 1) * 1e3 * 60 * 60 * 24;
                const derivedDate = new Date(firstJan + offsetMillis);
                components.M = derivedDate.getUTCMonth();
                components.D = derivedDate.getUTCDate();
              }
              if (dateC) {
                throw {
                  code: "D3136"
                };
              }
              if (dateD) {
                throw {
                  code: "D3136"
                };
              }
              if (timeB) {
                components.H = components.h === 12 ? 0 : components.h;
                if (components.P === 1) {
                  components.H += 12;
                }
              }
              var millis = Date.UTC(components.Y, components.M, components.D, components.H, components.m, components.s, components.f);
              if (components.Z || components.z) {
                millis -= (components.Z || components.z) * 60 * 1e3;
              }
              return millis;
            }
          }
          var iso8601regex = new RegExp("^\\d{4}(-[01]\\d)*(-[0-3]\\d)*(T[0-2]\\d:[0-5]\\d:[0-5]\\d)*(\\.\\d+)?([+-][0-2]\\d:?[0-5]\\d|Z)?$");
          function toMillis(timestamp, picture) {
            if (typeof timestamp === "undefined") {
              return void 0;
            }
            if (typeof picture === "undefined") {
              if (!iso8601regex.test(timestamp)) {
                throw {
                  stack: new Error().stack,
                  code: "D3110",
                  value: timestamp
                };
              }
              return Date.parse(timestamp);
            } else {
              return parseDateTime.call(this, timestamp, picture);
            }
          }
          function fromMillis(millis, picture, timezone) {
            if (typeof millis === "undefined") {
              return void 0;
            }
            return formatDateTime.call(this, millis, picture, timezone);
          }
          return {
            formatInteger,
            parseInteger,
            fromMillis,
            toMillis
          };
        }();
        module4.exports = dateTime;
      }, { "./utils": 6 }], 2: [function(require2, module4, exports4) {
        (function(global2) {
          (function() {
            var utils = require2("./utils");
            const functions = (() => {
              "use strict";
              var isNumeric = utils.isNumeric;
              var isArrayOfStrings = utils.isArrayOfStrings;
              var isArrayOfNumbers = utils.isArrayOfNumbers;
              var createSequence = utils.createSequence;
              var isSequence = utils.isSequence;
              var isFunction = utils.isFunction;
              var isLambda = utils.isLambda;
              var isIterable = utils.isIterable;
              var getFunctionArity = utils.getFunctionArity;
              var deepEquals = utils.isDeepEqual;
              var stringToArray = utils.stringToArray;
              function sum(args) {
                if (typeof args === "undefined") {
                  return void 0;
                }
                var total = 0;
                args.forEach(function(num) {
                  total += num;
                });
                return total;
              }
              function count(args) {
                if (typeof args === "undefined") {
                  return 0;
                }
                return args.length;
              }
              function max(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                return Math.max.apply(Math, args);
              }
              function min(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                return Math.min.apply(Math, args);
              }
              function average(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                var total = 0;
                args.forEach(function(num) {
                  total += num;
                });
                return total / args.length;
              }
              function string3(arg, prettify = false) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var str;
                if (typeof arg === "string") {
                  str = arg;
                } else if (isFunction(arg)) {
                  str = "";
                } else if (typeof arg === "number" && !isFinite(arg)) {
                  throw {
                    code: "D3001",
                    value: arg,
                    stack: new Error().stack
                  };
                } else {
                  var space = prettify ? 2 : 0;
                  if (Array.isArray(arg) && arg.outerWrapper) {
                    arg = arg[0];
                  }
                  str = JSON.stringify(arg, function(key2, val) {
                    return typeof val !== "undefined" && val !== null && val.toPrecision && isNumeric(val) ? Number(val.toPrecision(15)) : val && isFunction(val) ? "" : val;
                  }, space);
                }
                return str;
              }
              function substring(str, start, length2) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var strArray = stringToArray(str);
                var strLength = strArray.length;
                if (strLength + start < 0) {
                  start = 0;
                }
                if (typeof length2 !== "undefined") {
                  if (length2 <= 0) {
                    return "";
                  }
                  var end = start >= 0 ? start + length2 : strLength + start + length2;
                  return strArray.slice(start, end).join("");
                }
                return strArray.slice(start).join("");
              }
              function substringBefore(str, chars) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var pos = str.indexOf(chars);
                if (pos > -1) {
                  return str.substr(0, pos);
                } else {
                  return str;
                }
              }
              function substringAfter(str, chars) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var pos = str.indexOf(chars);
                if (pos > -1) {
                  return str.substr(pos + chars.length);
                } else {
                  return str;
                }
              }
              function lowercase(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return str.toLowerCase();
              }
              function uppercase(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return str.toUpperCase();
              }
              function length(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return stringToArray(str).length;
              }
              function trim(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var result = str.replace(/[ \t\n\r]+/gm, " ");
                if (result.charAt(0) === " ") {
                  result = result.substring(1);
                }
                if (result.charAt(result.length - 1) === " ") {
                  result = result.substring(0, result.length - 1);
                }
                return result;
              }
              function pad(str, width, char) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (typeof char === "undefined" || char.length === 0) {
                  char = " ";
                }
                var result;
                var padLength = Math.abs(width) - length(str);
                if (padLength > 0) {
                  var padding = new Array(padLength + 1).join(char);
                  if (char.length > 1) {
                    padding = substring(padding, 0, padLength);
                  }
                  if (width > 0) {
                    result = str + padding;
                  } else {
                    result = padding + str;
                  }
                } else {
                  result = str;
                }
                return result;
              }
              function* evaluateMatcher(matcher, str) {
                var result = matcher.apply(this, [str]);
                if (isIterable(result)) {
                  result = yield* result;
                }
                if (result && !(typeof result.start === "number" || result.end === "number" || Array.isArray(result.groups) || isFunction(result.next))) {
                  throw {
                    code: "T1010",
                    stack: new Error().stack
                  };
                }
                return result;
              }
              function* contains(str, token) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var result;
                if (typeof token === "string") {
                  result = str.indexOf(token) !== -1;
                } else {
                  var matches = yield* evaluateMatcher(token, str);
                  result = typeof matches !== "undefined";
                }
                return result;
              }
              function* match(str, regex, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (limit < 0) {
                  throw {
                    stack: new Error().stack,
                    value: limit,
                    code: "D3040",
                    index: 3
                  };
                }
                var result = createSequence();
                if (typeof limit === "undefined" || limit > 0) {
                  var count2 = 0;
                  var matches = yield* evaluateMatcher(regex, str);
                  if (typeof matches !== "undefined") {
                    while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                      result.push({
                        match: matches.match,
                        index: matches.start,
                        groups: matches.groups
                      });
                      matches = yield* evaluateMatcher(matches.next);
                      count2++;
                    }
                  }
                }
                return result;
              }
              function* replace(str, pattern, replacement, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var self2 = this;
                if (pattern === "") {
                  throw {
                    code: "D3010",
                    stack: new Error().stack,
                    value: pattern,
                    index: 2
                  };
                }
                if (limit < 0) {
                  throw {
                    code: "D3011",
                    stack: new Error().stack,
                    value: limit,
                    index: 4
                  };
                }
                var replacer;
                if (typeof replacement === "string") {
                  replacer = function(regexMatch) {
                    var substitute = "";
                    var position2 = 0;
                    var index2 = replacement.indexOf("$", position2);
                    while (index2 !== -1 && position2 < replacement.length) {
                      substitute += replacement.substring(position2, index2);
                      position2 = index2 + 1;
                      var dollarVal = replacement.charAt(position2);
                      if (dollarVal === "$") {
                        substitute += "$";
                        position2++;
                      } else if (dollarVal === "0") {
                        substitute += regexMatch.match;
                        position2++;
                      } else {
                        var maxDigits;
                        if (regexMatch.groups.length === 0) {
                          maxDigits = 1;
                        } else {
                          maxDigits = Math.floor(Math.log(regexMatch.groups.length) * Math.LOG10E) + 1;
                        }
                        index2 = parseInt(replacement.substring(position2, position2 + maxDigits), 10);
                        if (maxDigits > 1 && index2 > regexMatch.groups.length) {
                          index2 = parseInt(replacement.substring(position2, position2 + maxDigits - 1), 10);
                        }
                        if (!isNaN(index2)) {
                          if (regexMatch.groups.length > 0) {
                            var submatch = regexMatch.groups[index2 - 1];
                            if (typeof submatch !== "undefined") {
                              substitute += submatch;
                            }
                          }
                          position2 += index2.toString().length;
                        } else {
                          substitute += "$";
                        }
                      }
                      index2 = replacement.indexOf("$", position2);
                    }
                    substitute += replacement.substring(position2);
                    return substitute;
                  };
                } else {
                  replacer = replacement;
                }
                var result = "";
                var position = 0;
                if (typeof limit === "undefined" || limit > 0) {
                  var count2 = 0;
                  if (typeof pattern === "string") {
                    var index = str.indexOf(pattern, position);
                    while (index !== -1 && (typeof limit === "undefined" || count2 < limit)) {
                      result += str.substring(position, index);
                      result += replacement;
                      position = index + pattern.length;
                      count2++;
                      index = str.indexOf(pattern, position);
                    }
                    result += str.substring(position);
                  } else {
                    var matches = yield* evaluateMatcher(pattern, str);
                    if (typeof matches !== "undefined") {
                      while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                        result += str.substring(position, matches.start);
                        var replacedWith = replacer.apply(self2, [matches]);
                        if (isIterable(replacedWith)) {
                          replacedWith = yield* replacedWith;
                        }
                        if (typeof replacedWith === "string") {
                          result += replacedWith;
                        } else {
                          throw {
                            code: "D3012",
                            stack: new Error().stack,
                            value: replacedWith
                          };
                        }
                        position = matches.start + matches.match.length;
                        count2++;
                        matches = yield* evaluateMatcher(matches.next);
                      }
                      result += str.substring(position);
                    } else {
                      result = str;
                    }
                  }
                } else {
                  result = str;
                }
                return result;
              }
              function base64encode(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var btoa = typeof window !== "undefined" ? window.btoa : function(str2) {
                  return new global2.Buffer.from(str2, "binary").toString("base64");
                };
                return btoa(str);
              }
              function base64decode(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var atob = typeof window !== "undefined" ? window.atob : function(str2) {
                  return new global2.Buffer.from(str2, "base64").toString("binary");
                };
                return atob(str);
              }
              function encodeUrlComponent(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = encodeURIComponent(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "encodeUrlComponent"
                  };
                }
                return returnVal;
              }
              function encodeUrl(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = encodeURI(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "encodeUrl"
                  };
                }
                return returnVal;
              }
              function decodeUrlComponent(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = decodeURIComponent(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "decodeUrlComponent"
                  };
                }
                return returnVal;
              }
              function decodeUrl(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = decodeURI(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "decodeUrl"
                  };
                }
                return returnVal;
              }
              function* split(str, separator, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (limit < 0) {
                  throw {
                    code: "D3020",
                    stack: new Error().stack,
                    value: limit,
                    index: 3
                  };
                }
                var result = [];
                if (typeof limit === "undefined" || limit > 0) {
                  if (typeof separator === "string") {
                    result = str.split(separator, limit);
                  } else {
                    var count2 = 0;
                    var matches = yield* evaluateMatcher(separator, str);
                    if (typeof matches !== "undefined") {
                      var start = 0;
                      while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                        result.push(str.substring(start, matches.start));
                        start = matches.end;
                        matches = yield* evaluateMatcher(matches.next);
                        count2++;
                      }
                      if (typeof limit === "undefined" || count2 < limit) {
                        result.push(str.substring(start));
                      }
                    } else {
                      result.push(str);
                    }
                  }
                }
                return result;
              }
              function join(strs, separator) {
                if (typeof strs === "undefined") {
                  return void 0;
                }
                if (typeof separator === "undefined") {
                  separator = "";
                }
                return strs.join(separator);
              }
              function formatNumber(value, picture, options) {
                if (typeof value === "undefined") {
                  return void 0;
                }
                var defaults = {
                  "decimal-separator": ".",
                  "grouping-separator": ",",
                  "exponent-separator": "e",
                  "infinity": "Infinity",
                  "minus-sign": "-",
                  "NaN": "NaN",
                  "percent": "%",
                  "per-mille": "\u2030",
                  "zero-digit": "0",
                  "digit": "#",
                  "pattern-separator": ";"
                };
                var properties = defaults;
                if (typeof options !== "undefined") {
                  Object.keys(options).forEach(function(key2) {
                    properties[key2] = options[key2];
                  });
                }
                var decimalDigitFamily = [];
                var zeroCharCode = properties["zero-digit"].charCodeAt(0);
                for (var ii = zeroCharCode; ii < zeroCharCode + 10; ii++) {
                  decimalDigitFamily.push(String.fromCharCode(ii));
                }
                var activeChars = decimalDigitFamily.concat([properties["decimal-separator"], properties["exponent-separator"], properties["grouping-separator"], properties.digit, properties["pattern-separator"]]);
                var subPictures = picture.split(properties["pattern-separator"]);
                if (subPictures.length > 2) {
                  throw {
                    code: "D3080",
                    stack: new Error().stack
                  };
                }
                var splitParts = function(subpicture) {
                  var prefix = function() {
                    var ch;
                    for (var ii2 = 0; ii2 < subpicture.length; ii2++) {
                      ch = subpicture.charAt(ii2);
                      if (activeChars.indexOf(ch) !== -1 && ch !== properties["exponent-separator"]) {
                        return subpicture.substring(0, ii2);
                      }
                    }
                  }();
                  var suffix = function() {
                    var ch;
                    for (var ii2 = subpicture.length - 1; ii2 >= 0; ii2--) {
                      ch = subpicture.charAt(ii2);
                      if (activeChars.indexOf(ch) !== -1 && ch !== properties["exponent-separator"]) {
                        return subpicture.substring(ii2 + 1);
                      }
                    }
                  }();
                  var activePart = subpicture.substring(prefix.length, subpicture.length - suffix.length);
                  var mantissaPart, exponentPart, integerPart, fractionalPart;
                  var exponentPosition = subpicture.indexOf(properties["exponent-separator"], prefix.length);
                  if (exponentPosition === -1 || exponentPosition > subpicture.length - suffix.length) {
                    mantissaPart = activePart;
                    exponentPart = void 0;
                  } else {
                    mantissaPart = activePart.substring(0, exponentPosition);
                    exponentPart = activePart.substring(exponentPosition + 1);
                  }
                  var decimalPosition = mantissaPart.indexOf(properties["decimal-separator"]);
                  if (decimalPosition === -1) {
                    integerPart = mantissaPart;
                    fractionalPart = suffix;
                  } else {
                    integerPart = mantissaPart.substring(0, decimalPosition);
                    fractionalPart = mantissaPart.substring(decimalPosition + 1);
                  }
                  return {
                    prefix,
                    suffix,
                    activePart,
                    mantissaPart,
                    exponentPart,
                    integerPart,
                    fractionalPart,
                    subpicture
                  };
                };
                var validate = function(parts2) {
                  var error2;
                  var ii2;
                  var subpicture = parts2.subpicture;
                  var decimalPos2 = subpicture.indexOf(properties["decimal-separator"]);
                  if (decimalPos2 !== subpicture.lastIndexOf(properties["decimal-separator"])) {
                    error2 = "D3081";
                  }
                  if (subpicture.indexOf(properties.percent) !== subpicture.lastIndexOf(properties.percent)) {
                    error2 = "D3082";
                  }
                  if (subpicture.indexOf(properties["per-mille"]) !== subpicture.lastIndexOf(properties["per-mille"])) {
                    error2 = "D3083";
                  }
                  if (subpicture.indexOf(properties.percent) !== -1 && subpicture.indexOf(properties["per-mille"]) !== -1) {
                    error2 = "D3084";
                  }
                  var valid = false;
                  for (ii2 = 0; ii2 < parts2.mantissaPart.length; ii2++) {
                    var ch = parts2.mantissaPart.charAt(ii2);
                    if (decimalDigitFamily.indexOf(ch) !== -1 || ch === properties.digit) {
                      valid = true;
                      break;
                    }
                  }
                  if (!valid) {
                    error2 = "D3085";
                  }
                  var charTypes = parts2.activePart.split("").map(function(char) {
                    return activeChars.indexOf(char) === -1 ? "p" : "a";
                  }).join("");
                  if (charTypes.indexOf("p") !== -1) {
                    error2 = "D3086";
                  }
                  if (decimalPos2 !== -1) {
                    if (subpicture.charAt(decimalPos2 - 1) === properties["grouping-separator"] || subpicture.charAt(decimalPos2 + 1) === properties["grouping-separator"]) {
                      error2 = "D3087";
                    }
                  } else if (parts2.integerPart.charAt(parts2.integerPart.length - 1) === properties["grouping-separator"]) {
                    error2 = "D3088";
                  }
                  if (subpicture.indexOf(properties["grouping-separator"] + properties["grouping-separator"]) !== -1) {
                    error2 = "D3089";
                  }
                  var optionalDigitPos = parts2.integerPart.indexOf(properties.digit);
                  if (optionalDigitPos !== -1 && parts2.integerPart.substring(0, optionalDigitPos).split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) > -1;
                  }).length > 0) {
                    error2 = "D3090";
                  }
                  optionalDigitPos = parts2.fractionalPart.lastIndexOf(properties.digit);
                  if (optionalDigitPos !== -1 && parts2.fractionalPart.substring(optionalDigitPos).split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) > -1;
                  }).length > 0) {
                    error2 = "D3091";
                  }
                  var exponentExists = typeof parts2.exponentPart === "string";
                  if (exponentExists && parts2.exponentPart.length > 0 && (subpicture.indexOf(properties.percent) !== -1 || subpicture.indexOf(properties["per-mille"]) !== -1)) {
                    error2 = "D3092";
                  }
                  if (exponentExists && (parts2.exponentPart.length === 0 || parts2.exponentPart.split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) === -1;
                  }).length > 0)) {
                    error2 = "D3093";
                  }
                  if (error2) {
                    throw {
                      code: error2,
                      stack: new Error().stack
                    };
                  }
                };
                var analyse = function(parts2) {
                  var getGroupingPositions = function(part, toLeft) {
                    var positions = [];
                    var groupingPosition = part.indexOf(properties["grouping-separator"]);
                    while (groupingPosition !== -1) {
                      var charsToTheRight = (toLeft ? part.substring(0, groupingPosition) : part.substring(groupingPosition)).split("").filter(function(char) {
                        return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
                      }).length;
                      positions.push(charsToTheRight);
                      groupingPosition = parts2.integerPart.indexOf(properties["grouping-separator"], groupingPosition + 1);
                    }
                    return positions;
                  };
                  var integerPartGroupingPositions = getGroupingPositions(parts2.integerPart);
                  var regular = function(indexes) {
                    if (indexes.length === 0) {
                      return 0;
                    }
                    var gcd = function(a, b) {
                      return b === 0 ? a : gcd(b, a % b);
                    };
                    var factor = indexes.reduce(gcd);
                    for (var index = 1; index <= indexes.length; index++) {
                      if (indexes.indexOf(index * factor) === -1) {
                        return 0;
                      }
                    }
                    return factor;
                  };
                  var regularGrouping = regular(integerPartGroupingPositions);
                  var fractionalPartGroupingPositions = getGroupingPositions(parts2.fractionalPart, true);
                  var minimumIntegerPartSize = parts2.integerPart.split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1;
                  }).length;
                  var scalingFactor = minimumIntegerPartSize;
                  var fractionalPartArray = parts2.fractionalPart.split("");
                  var minimumFactionalPartSize = fractionalPartArray.filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1;
                  }).length;
                  var maximumFactionalPartSize = fractionalPartArray.filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
                  }).length;
                  var exponentPresent = typeof parts2.exponentPart === "string";
                  if (minimumIntegerPartSize === 0 && maximumFactionalPartSize === 0) {
                    if (exponentPresent) {
                      minimumFactionalPartSize = 1;
                      maximumFactionalPartSize = 1;
                    } else {
                      minimumIntegerPartSize = 1;
                    }
                  }
                  if (exponentPresent && minimumIntegerPartSize === 0 && parts2.integerPart.indexOf(properties.digit) !== -1) {
                    minimumIntegerPartSize = 1;
                  }
                  if (minimumIntegerPartSize === 0 && minimumFactionalPartSize === 0) {
                    minimumFactionalPartSize = 1;
                  }
                  var minimumExponentSize = 0;
                  if (exponentPresent) {
                    minimumExponentSize = parts2.exponentPart.split("").filter(function(char) {
                      return decimalDigitFamily.indexOf(char) !== -1;
                    }).length;
                  }
                  return {
                    integerPartGroupingPositions,
                    regularGrouping,
                    minimumIntegerPartSize,
                    scalingFactor,
                    prefix: parts2.prefix,
                    fractionalPartGroupingPositions,
                    minimumFactionalPartSize,
                    maximumFactionalPartSize,
                    minimumExponentSize,
                    suffix: parts2.suffix,
                    picture: parts2.subpicture
                  };
                };
                var parts = subPictures.map(splitParts);
                parts.forEach(validate);
                var variables = parts.map(analyse);
                var minus_sign = properties["minus-sign"];
                var zero_digit = properties["zero-digit"];
                var decimal_separator = properties["decimal-separator"];
                var grouping_separator = properties["grouping-separator"];
                if (variables.length === 1) {
                  variables.push(JSON.parse(JSON.stringify(variables[0])));
                  variables[1].prefix = minus_sign + variables[1].prefix;
                }
                var pic;
                if (value >= 0) {
                  pic = variables[0];
                } else {
                  pic = variables[1];
                }
                var adjustedNumber;
                if (pic.picture.indexOf(properties.percent) !== -1) {
                  adjustedNumber = value * 100;
                } else if (pic.picture.indexOf(properties["per-mille"]) !== -1) {
                  adjustedNumber = value * 1e3;
                } else {
                  adjustedNumber = value;
                }
                var mantissa, exponent;
                if (pic.minimumExponentSize === 0) {
                  mantissa = adjustedNumber;
                } else {
                  var maxMantissa = Math.pow(10, pic.scalingFactor);
                  var minMantissa = Math.pow(10, pic.scalingFactor - 1);
                  mantissa = adjustedNumber;
                  exponent = 0;
                  while (mantissa < minMantissa) {
                    mantissa *= 10;
                    exponent -= 1;
                  }
                  while (mantissa > maxMantissa) {
                    mantissa /= 10;
                    exponent += 1;
                  }
                }
                var roundedNumber = round(mantissa, pic.maximumFactionalPartSize);
                var makeString = function(value2, dp) {
                  var str = Math.abs(value2).toFixed(dp);
                  if (zero_digit !== "0") {
                    str = str.split("").map(function(digit) {
                      if (digit >= "0" && digit <= "9") {
                        return decimalDigitFamily[digit.charCodeAt(0) - 48];
                      } else {
                        return digit;
                      }
                    }).join("");
                  }
                  return str;
                };
                var stringValue = makeString(roundedNumber, pic.maximumFactionalPartSize);
                var decimalPos = stringValue.indexOf(".");
                if (decimalPos === -1) {
                  stringValue = stringValue + decimal_separator;
                } else {
                  stringValue = stringValue.replace(".", decimal_separator);
                }
                while (stringValue.charAt(0) === zero_digit) {
                  stringValue = stringValue.substring(1);
                }
                while (stringValue.charAt(stringValue.length - 1) === zero_digit) {
                  stringValue = stringValue.substring(0, stringValue.length - 1);
                }
                decimalPos = stringValue.indexOf(decimal_separator);
                var padLeft = pic.minimumIntegerPartSize - decimalPos;
                var padRight = pic.minimumFactionalPartSize - (stringValue.length - decimalPos - 1);
                stringValue = (padLeft > 0 ? new Array(padLeft + 1).join(zero_digit) : "") + stringValue;
                stringValue = stringValue + (padRight > 0 ? new Array(padRight + 1).join(zero_digit) : "");
                decimalPos = stringValue.indexOf(decimal_separator);
                if (pic.regularGrouping > 0) {
                  var groupCount = Math.floor((decimalPos - 1) / pic.regularGrouping);
                  for (var group = 1; group <= groupCount; group++) {
                    stringValue = [stringValue.slice(0, decimalPos - group * pic.regularGrouping), grouping_separator, stringValue.slice(decimalPos - group * pic.regularGrouping)].join("");
                  }
                } else {
                  pic.integerPartGroupingPositions.forEach(function(pos) {
                    stringValue = [stringValue.slice(0, decimalPos - pos), grouping_separator, stringValue.slice(decimalPos - pos)].join("");
                    decimalPos++;
                  });
                }
                decimalPos = stringValue.indexOf(decimal_separator);
                pic.fractionalPartGroupingPositions.forEach(function(pos) {
                  stringValue = [stringValue.slice(0, pos + decimalPos + 1), grouping_separator, stringValue.slice(pos + decimalPos + 1)].join("");
                });
                decimalPos = stringValue.indexOf(decimal_separator);
                if (pic.picture.indexOf(decimal_separator) === -1 || decimalPos === stringValue.length - 1) {
                  stringValue = stringValue.substring(0, stringValue.length - 1);
                }
                if (typeof exponent !== "undefined") {
                  var stringExponent = makeString(exponent, 0);
                  padLeft = pic.minimumExponentSize - stringExponent.length;
                  if (padLeft > 0) {
                    stringExponent = new Array(padLeft + 1).join(zero_digit) + stringExponent;
                  }
                  stringValue = stringValue + properties["exponent-separator"] + (exponent < 0 ? minus_sign : "") + stringExponent;
                }
                stringValue = pic.prefix + stringValue + pic.suffix;
                return stringValue;
              }
              function formatBase(value, radix) {
                if (typeof value === "undefined") {
                  return void 0;
                }
                value = round(value);
                if (typeof radix === "undefined") {
                  radix = 10;
                } else {
                  radix = round(radix);
                }
                if (radix < 2 || radix > 36) {
                  throw {
                    code: "D3100",
                    stack: new Error().stack,
                    value: radix
                  };
                }
                var result = value.toString(radix);
                return result;
              }
              function number(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (typeof arg === "number") {
                  result = arg;
                } else if (typeof arg === "string" && /^-?[0-9]+(\.[0-9]+)?([Ee][-+]?[0-9]+)?$/.test(arg) && !isNaN(parseFloat(arg)) && isFinite(arg)) {
                  result = parseFloat(arg);
                } else if (arg === true) {
                  result = 1;
                } else if (arg === false) {
                  result = 0;
                } else {
                  throw {
                    code: "D3030",
                    value: arg,
                    stack: new Error().stack,
                    index: 1
                  };
                }
                return result;
              }
              function abs(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.abs(arg);
                return result;
              }
              function floor(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.floor(arg);
                return result;
              }
              function ceil(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.ceil(arg);
                return result;
              }
              function round(arg, precision) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (precision) {
                  var value = arg.toString().split("e");
                  arg = +(value[0] + "e" + (value[1] ? +value[1] + precision : precision));
                }
                result = Math.round(arg);
                var diff = result - arg;
                if (Math.abs(diff) === 0.5 && Math.abs(result % 2) === 1) {
                  result = result - 1;
                }
                if (precision) {
                  value = result.toString().split("e");
                  result = +(value[0] + "e" + (value[1] ? +value[1] - precision : -precision));
                }
                if (Object.is(result, -0)) {
                  result = 0;
                }
                return result;
              }
              function sqrt(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (arg < 0) {
                  throw {
                    stack: new Error().stack,
                    code: "D3060",
                    index: 1,
                    value: arg
                  };
                }
                result = Math.sqrt(arg);
                return result;
              }
              function power(arg, exp) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.pow(arg, exp);
                if (!isFinite(result)) {
                  throw {
                    stack: new Error().stack,
                    code: "D3061",
                    index: 1,
                    value: arg,
                    exp
                  };
                }
                return result;
              }
              function random() {
                return Math.random();
              }
              function boolean(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var result = false;
                if (Array.isArray(arg)) {
                  if (arg.length === 1) {
                    result = boolean(arg[0]);
                  } else if (arg.length > 1) {
                    var trues = arg.filter(function(val) {
                      return boolean(val);
                    });
                    result = trues.length > 0;
                  }
                } else if (typeof arg === "string") {
                  if (arg.length > 0) {
                    result = true;
                  }
                } else if (isNumeric(arg)) {
                  if (arg !== 0) {
                    result = true;
                  }
                } else if (arg !== null && typeof arg === "object") {
                  if (Object.keys(arg).length > 0) {
                    result = true;
                  }
                } else if (typeof arg === "boolean" && arg === true) {
                  result = true;
                }
                return result;
              }
              function not(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                return !boolean(arg);
              }
              function hofFuncArgs(func, arg1, arg2, arg3) {
                var func_args = [arg1];
                var length2 = getFunctionArity(func);
                if (length2 >= 2) {
                  func_args.push(arg2);
                }
                if (length2 >= 3) {
                  func_args.push(arg3);
                }
                return func_args;
              }
              function* map(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var result = createSequence();
                for (var i = 0; i < arr.length; i++) {
                  var func_args = hofFuncArgs(func, arr[i], i, arr);
                  var res = yield* func.apply(this, func_args);
                  if (typeof res !== "undefined") {
                    result.push(res);
                  }
                }
                return result;
              }
              function* filter(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var result = createSequence();
                for (var i = 0; i < arr.length; i++) {
                  var entry = arr[i];
                  var func_args = hofFuncArgs(func, entry, i, arr);
                  var res = yield* func.apply(this, func_args);
                  if (boolean(res)) {
                    result.push(entry);
                  }
                }
                return result;
              }
              function* single(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var hasFoundMatch = false;
                var result;
                for (var i = 0; i < arr.length; i++) {
                  var entry = arr[i];
                  var positiveResult = true;
                  if (typeof func !== "undefined") {
                    var func_args = hofFuncArgs(func, entry, i, arr);
                    var res = yield* func.apply(this, func_args);
                    positiveResult = boolean(res);
                  }
                  if (positiveResult) {
                    if (!hasFoundMatch) {
                      result = entry;
                      hasFoundMatch = true;
                    } else {
                      throw {
                        stack: new Error().stack,
                        code: "D3138",
                        index: i
                      };
                    }
                  }
                }
                if (!hasFoundMatch) {
                  throw {
                    stack: new Error().stack,
                    code: "D3139"
                  };
                }
                return result;
              }
              function zip() {
                var result = [];
                var args = Array.prototype.slice.call(arguments);
                var length2 = Math.min.apply(Math, args.map(function(arg) {
                  if (Array.isArray(arg)) {
                    return arg.length;
                  }
                  return 0;
                }));
                for (var i = 0; i < length2; i++) {
                  var tuple = args.map((arg) => {
                    return arg[i];
                  });
                  result.push(tuple);
                }
                return result;
              }
              function* foldLeft(sequence, func, init) {
                if (typeof sequence === "undefined") {
                  return void 0;
                }
                var result;
                var arity = getFunctionArity(func);
                if (arity < 2) {
                  throw {
                    stack: new Error().stack,
                    code: "D3050",
                    index: 1
                  };
                }
                var index;
                if (typeof init === "undefined" && sequence.length > 0) {
                  result = sequence[0];
                  index = 1;
                } else {
                  result = init;
                  index = 0;
                }
                while (index < sequence.length) {
                  var args = [result, sequence[index]];
                  if (arity >= 3) {
                    args.push(index);
                  }
                  if (arity >= 4) {
                    args.push(sequence);
                  }
                  result = yield* func.apply(this, args);
                  index++;
                }
                return result;
              }
              function keys(arg) {
                var result = createSequence();
                if (Array.isArray(arg)) {
                  var merge2 = {};
                  arg.forEach(function(item) {
                    var allkeys = keys(item);
                    allkeys.forEach(function(key2) {
                      merge2[key2] = true;
                    });
                  });
                  result = keys(merge2);
                } else if (arg !== null && typeof arg === "object" && !isLambda(arg)) {
                  Object.keys(arg).forEach((key2) => result.push(key2));
                }
                return result;
              }
              function lookup(input, key2) {
                var result;
                if (Array.isArray(input)) {
                  result = createSequence();
                  for (var ii = 0; ii < input.length; ii++) {
                    var res = lookup(input[ii], key2);
                    if (typeof res !== "undefined") {
                      if (Array.isArray(res)) {
                        res.forEach((val) => result.push(val));
                      } else {
                        result.push(res);
                      }
                    }
                  }
                } else if (input !== null && typeof input === "object") {
                  result = input[key2];
                }
                return result;
              }
              function append(arg1, arg2) {
                if (typeof arg1 === "undefined") {
                  return arg2;
                }
                if (typeof arg2 === "undefined") {
                  return arg1;
                }
                if (!Array.isArray(arg1)) {
                  arg1 = createSequence(arg1);
                }
                if (!Array.isArray(arg2)) {
                  arg2 = [arg2];
                }
                return arg1.concat(arg2);
              }
              function exists(arg) {
                if (typeof arg === "undefined") {
                  return false;
                } else {
                  return true;
                }
              }
              function spread(arg) {
                var result = createSequence();
                if (Array.isArray(arg)) {
                  arg.forEach(function(item) {
                    result = append(result, spread(item));
                  });
                } else if (arg !== null && typeof arg === "object" && !isLambda(arg)) {
                  for (var key2 in arg) {
                    var obj = {};
                    obj[key2] = arg[key2];
                    result.push(obj);
                  }
                } else {
                  result = arg;
                }
                return result;
              }
              function merge(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var result = {};
                arg.forEach(function(obj) {
                  for (var prop in obj) {
                    result[prop] = obj[prop];
                  }
                });
                return result;
              }
              function reverse(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var length2 = arr.length;
                var result = new Array(length2);
                for (var i = 0; i < length2; i++) {
                  result[length2 - i - 1] = arr[i];
                }
                return result;
              }
              function* each(obj, func) {
                var result = createSequence();
                for (var key2 in obj) {
                  var func_args = hofFuncArgs(func, obj[key2], key2, obj);
                  var val = yield* func.apply(this, func_args);
                  if (typeof val !== "undefined") {
                    result.push(val);
                  }
                }
                return result;
              }
              function error(message) {
                throw {
                  code: "D3137",
                  stack: new Error().stack,
                  message: message || "$error() function evaluated"
                };
              }
              function assert(condition, message) {
                if (!condition) {
                  throw {
                    code: "D3141",
                    stack: new Error().stack,
                    message: message || "$assert() statement failed"
                  };
                }
                return void 0;
              }
              function type(value) {
                if (value === void 0) {
                  return void 0;
                }
                if (value === null) {
                  return "null";
                }
                if (isNumeric(value)) {
                  return "number";
                }
                if (typeof value === "string") {
                  return "string";
                }
                if (typeof value === "boolean") {
                  return "boolean";
                }
                if (Array.isArray(value)) {
                  return "array";
                }
                if (isFunction(value)) {
                  return "function";
                }
                return "object";
              }
              function* sort(arr, comparator) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var comp;
                if (typeof comparator === "undefined") {
                  if (!isArrayOfNumbers(arr) && !isArrayOfStrings(arr)) {
                    throw {
                      stack: new Error().stack,
                      code: "D3070",
                      index: 1
                    };
                  }
                  comp = function* (a, b) {
                    return a > b;
                  };
                } else {
                  comp = comparator;
                }
                var merge2 = function* (l, r) {
                  var merge_iter = function* (result2, left, right) {
                    if (left.length === 0) {
                      Array.prototype.push.apply(result2, right);
                    } else if (right.length === 0) {
                      Array.prototype.push.apply(result2, left);
                    } else if (yield* comp(left[0], right[0])) {
                      result2.push(right[0]);
                      yield* merge_iter(result2, left, right.slice(1));
                    } else {
                      result2.push(left[0]);
                      yield* merge_iter(result2, left.slice(1), right);
                    }
                  };
                  var merged = [];
                  yield* merge_iter(merged, l, r);
                  return merged;
                };
                var msort = function* (array) {
                  if (!Array.isArray(array) || array.length <= 1) {
                    return array;
                  } else {
                    var middle = Math.floor(array.length / 2);
                    var left = array.slice(0, middle);
                    var right = array.slice(middle);
                    left = yield* msort(left);
                    right = yield* msort(right);
                    return yield* merge2(left, right);
                  }
                };
                var result = yield* msort(arr);
                return result;
              }
              function shuffle(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var result = new Array(arr.length);
                for (var i = 0; i < arr.length; i++) {
                  var j = Math.floor(Math.random() * (i + 1));
                  if (i !== j) {
                    result[i] = result[j];
                  }
                  result[j] = arr[i];
                }
                return result;
              }
              function distinct(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (!Array.isArray(arr) || arr.length <= 1) {
                  return arr;
                }
                var results = isSequence(arr) ? createSequence() : [];
                for (var ii = 0; ii < arr.length; ii++) {
                  var value = arr[ii];
                  var includes = false;
                  for (var jj = 0; jj < results.length; jj++) {
                    if (deepEquals(value, results[jj])) {
                      includes = true;
                      break;
                    }
                  }
                  if (!includes) {
                    results.push(value);
                  }
                }
                return results;
              }
              function* sift(arg, func) {
                var result = {};
                for (var item in arg) {
                  var entry = arg[item];
                  var func_args = hofFuncArgs(func, entry, item, arg);
                  var res = yield* func.apply(this, func_args);
                  if (boolean(res)) {
                    result[item] = entry;
                  }
                }
                if (Object.keys(result).length === 0) {
                  result = void 0;
                }
                return result;
              }
              return {
                sum,
                count,
                max,
                min,
                average,
                string: string3,
                substring,
                substringBefore,
                substringAfter,
                lowercase,
                uppercase,
                length,
                trim,
                pad,
                match,
                contains,
                replace,
                split,
                join,
                formatNumber,
                formatBase,
                number,
                floor,
                ceil,
                round,
                abs,
                sqrt,
                power,
                random,
                boolean,
                not,
                map,
                zip,
                filter,
                single,
                foldLeft,
                sift,
                keys,
                lookup,
                append,
                exists,
                spread,
                merge,
                reverse,
                each,
                error,
                assert,
                type,
                sort,
                shuffle,
                distinct,
                base64encode,
                base64decode,
                encodeUrlComponent,
                encodeUrl,
                decodeUrlComponent,
                decodeUrl
              };
            })();
            module4.exports = functions;
          }).call(this);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./utils": 6 }], 3: [function(require2, module4, exports4) {
        var datetime = require2("./datetime");
        var fn = require2("./functions");
        var utils = require2("./utils");
        var parser = require2("./parser");
        var parseSignature = require2("./signature");
        var jsonata2 = function() {
          "use strict";
          var isNumeric = utils.isNumeric;
          var isArrayOfStrings = utils.isArrayOfStrings;
          var isArrayOfNumbers = utils.isArrayOfNumbers;
          var createSequence = utils.createSequence;
          var isSequence = utils.isSequence;
          var isFunction = utils.isFunction;
          var isLambda = utils.isLambda;
          var isIterable = utils.isIterable;
          var getFunctionArity = utils.getFunctionArity;
          var isDeepEqual = utils.isDeepEqual;
          var staticFrame = createFrame(null);
          function* evaluate(expr, input, environment) {
            var result;
            var entryCallback = environment.lookup("__evaluate_entry");
            if (entryCallback) {
              entryCallback(expr, input, environment);
            }
            switch (expr.type) {
              case "path":
                result = yield* evaluatePath(expr, input, environment);
                break;
              case "binary":
                result = yield* evaluateBinary(expr, input, environment);
                break;
              case "unary":
                result = yield* evaluateUnary(expr, input, environment);
                break;
              case "name":
                result = evaluateName(expr, input, environment);
                break;
              case "string":
              case "number":
              case "value":
                result = evaluateLiteral(expr, input, environment);
                break;
              case "wildcard":
                result = evaluateWildcard(expr, input, environment);
                break;
              case "descendant":
                result = evaluateDescendants(expr, input, environment);
                break;
              case "parent":
                result = environment.lookup(expr.slot.label);
                break;
              case "condition":
                result = yield* evaluateCondition(expr, input, environment);
                break;
              case "block":
                result = yield* evaluateBlock(expr, input, environment);
                break;
              case "bind":
                result = yield* evaluateBindExpression(expr, input, environment);
                break;
              case "regex":
                result = evaluateRegex(expr, input, environment);
                break;
              case "function":
                result = yield* evaluateFunction(expr, input, environment);
                break;
              case "variable":
                result = evaluateVariable(expr, input, environment);
                break;
              case "lambda":
                result = evaluateLambda(expr, input, environment);
                break;
              case "partial":
                result = yield* evaluatePartialApplication(expr, input, environment);
                break;
              case "apply":
                result = yield* evaluateApplyExpression(expr, input, environment);
                break;
              case "transform":
                result = evaluateTransformExpression(expr, input, environment);
                break;
            }
            if (environment.async && (typeof result === "undefined" || result === null || typeof result.then !== "function")) {
              result = Promise.resolve(result);
            }
            if (environment.async && typeof result.then === "function" && expr.nextFunction && typeof result[expr.nextFunction] === "function") {
            } else {
              result = yield result;
            }
            if (Object.prototype.hasOwnProperty.call(expr, "predicate")) {
              for (var ii = 0; ii < expr.predicate.length; ii++) {
                result = yield* evaluateFilter(expr.predicate[ii].expr, result, environment);
              }
            }
            if (expr.type !== "path" && Object.prototype.hasOwnProperty.call(expr, "group")) {
              result = yield* evaluateGroupExpression(expr.group, result, environment);
            }
            var exitCallback = environment.lookup("__evaluate_exit");
            if (exitCallback) {
              exitCallback(expr, input, environment, result);
            }
            if (result && isSequence(result) && !result.tupleStream) {
              if (expr.keepArray) {
                result.keepSingleton = true;
              }
              if (result.length === 0) {
                result = void 0;
              } else if (result.length === 1) {
                result = result.keepSingleton ? result : result[0];
              }
            }
            return result;
          }
          function* evaluatePath(expr, input, environment) {
            var inputSequence;
            if (Array.isArray(input) && expr.steps[0].type !== "variable") {
              inputSequence = input;
            } else {
              inputSequence = createSequence(input);
            }
            var resultSequence;
            var isTupleStream = false;
            var tupleBindings = void 0;
            for (var ii = 0; ii < expr.steps.length; ii++) {
              var step = expr.steps[ii];
              if (step.tuple) {
                isTupleStream = true;
              }
              if (ii === 0 && step.consarray) {
                resultSequence = yield* evaluate(step, inputSequence, environment);
              } else {
                if (isTupleStream) {
                  tupleBindings = yield* evaluateTupleStep(step, inputSequence, tupleBindings, environment);
                } else {
                  resultSequence = yield* evaluateStep(step, inputSequence, environment, ii === expr.steps.length - 1);
                }
              }
              if (!isTupleStream && (typeof resultSequence === "undefined" || resultSequence.length === 0)) {
                break;
              }
              if (typeof step.focus === "undefined") {
                inputSequence = resultSequence;
              }
            }
            if (isTupleStream) {
              if (expr.tuple) {
                resultSequence = tupleBindings;
              } else {
                resultSequence = createSequence();
                for (ii = 0; ii < tupleBindings.length; ii++) {
                  resultSequence.push(tupleBindings[ii]["@"]);
                }
              }
            }
            if (expr.keepSingletonArray) {
              if (Array.isArray(resultSequence) && resultSequence.cons && !resultSequence.sequence) {
                resultSequence = createSequence(resultSequence);
              }
              resultSequence.keepSingleton = true;
            }
            if (expr.hasOwnProperty("group")) {
              resultSequence = yield* evaluateGroupExpression(expr.group, isTupleStream ? tupleBindings : resultSequence, environment);
            }
            return resultSequence;
          }
          function createFrameFromTuple(environment, tuple) {
            var frame = createFrame(environment);
            for (const prop in tuple) {
              frame.bind(prop, tuple[prop]);
            }
            return frame;
          }
          function* evaluateStep(expr, input, environment, lastStep) {
            var result;
            if (expr.type === "sort") {
              result = yield* evaluateSortExpression(expr, input, environment);
              if (expr.stages) {
                result = yield* evaluateStages(expr.stages, result, environment);
              }
              return result;
            }
            result = createSequence();
            for (var ii = 0; ii < input.length; ii++) {
              var res = yield* evaluate(expr, input[ii], environment);
              if (expr.stages) {
                for (var ss = 0; ss < expr.stages.length; ss++) {
                  res = yield* evaluateFilter(expr.stages[ss].expr, res, environment);
                }
              }
              if (typeof res !== "undefined") {
                result.push(res);
              }
            }
            var resultSequence = createSequence();
            if (lastStep && result.length === 1 && Array.isArray(result[0]) && !isSequence(result[0])) {
              resultSequence = result[0];
            } else {
              result.forEach(function(res2) {
                if (!Array.isArray(res2) || res2.cons) {
                  resultSequence.push(res2);
                } else {
                  res2.forEach((val) => resultSequence.push(val));
                }
              });
            }
            return resultSequence;
          }
          function* evaluateStages(stages, input, environment) {
            var result = input;
            for (var ss = 0; ss < stages.length; ss++) {
              var stage = stages[ss];
              switch (stage.type) {
                case "filter":
                  result = yield* evaluateFilter(stage.expr, result, environment);
                  break;
                case "index":
                  for (var ee = 0; ee < result.length; ee++) {
                    var tuple = result[ee];
                    tuple[stage.value] = ee;
                  }
                  break;
              }
            }
            return result;
          }
          function* evaluateTupleStep(expr, input, tupleBindings, environment) {
            var result;
            if (expr.type === "sort") {
              if (tupleBindings) {
                result = yield* evaluateSortExpression(expr, tupleBindings, environment);
              } else {
                var sorted = yield* evaluateSortExpression(expr, input, environment);
                result = createSequence();
                result.tupleStream = true;
                for (var ss = 0; ss < sorted.length; ss++) {
                  var tuple = { "@": sorted[ss] };
                  tuple[expr.index] = ss;
                  result.push(tuple);
                }
              }
              if (expr.stages) {
                result = yield* evaluateStages(expr.stages, result, environment);
              }
              return result;
            }
            result = createSequence();
            result.tupleStream = true;
            var stepEnv = environment;
            if (tupleBindings === void 0) {
              tupleBindings = input.map((item) => {
                return { "@": item };
              });
            }
            for (var ee = 0; ee < tupleBindings.length; ee++) {
              stepEnv = createFrameFromTuple(environment, tupleBindings[ee]);
              var res = yield* evaluate(expr, tupleBindings[ee]["@"], stepEnv);
              if (typeof res !== "undefined") {
                if (!Array.isArray(res)) {
                  res = [res];
                }
                for (var bb = 0; bb < res.length; bb++) {
                  tuple = {};
                  Object.assign(tuple, tupleBindings[ee]);
                  if (res.tupleStream) {
                    Object.assign(tuple, res[bb]);
                  } else {
                    if (expr.focus) {
                      tuple[expr.focus] = res[bb];
                      tuple["@"] = tupleBindings[ee]["@"];
                    } else {
                      tuple["@"] = res[bb];
                    }
                    if (expr.index) {
                      tuple[expr.index] = bb;
                    }
                    if (expr.ancestor) {
                      tuple[expr.ancestor.label] = tupleBindings[ee]["@"];
                    }
                  }
                  result.push(tuple);
                }
              }
            }
            if (expr.stages) {
              result = yield* evaluateStages(expr.stages, result, environment);
            }
            return result;
          }
          function* evaluateFilter(predicate, input, environment) {
            var results = createSequence();
            if (input && input.tupleStream) {
              results.tupleStream = true;
            }
            if (!Array.isArray(input)) {
              input = createSequence(input);
            }
            if (predicate.type === "number") {
              var index = Math.floor(predicate.value);
              if (index < 0) {
                index = input.length + index;
              }
              var item = input[index];
              if (typeof item !== "undefined") {
                if (Array.isArray(item)) {
                  results = item;
                } else {
                  results.push(item);
                }
              }
            } else {
              for (index = 0; index < input.length; index++) {
                var item = input[index];
                var context = item;
                var env = environment;
                if (input.tupleStream) {
                  context = item["@"];
                  env = createFrameFromTuple(environment, item);
                }
                var res = yield* evaluate(predicate, context, env);
                if (isNumeric(res)) {
                  res = [res];
                }
                if (isArrayOfNumbers(res)) {
                  res.forEach(function(ires) {
                    var ii = Math.floor(ires);
                    if (ii < 0) {
                      ii = input.length + ii;
                    }
                    if (ii === index) {
                      results.push(item);
                    }
                  });
                } else if (fn.boolean(res)) {
                  results.push(item);
                }
              }
            }
            return results;
          }
          function* evaluateBinary(expr, input, environment) {
            var result;
            var lhs = yield* evaluate(expr.lhs, input, environment);
            var op = expr.value;
            var evalrhs = function* () {
              return yield* evaluate(expr.rhs, input, environment);
            };
            if (op === "and" || op === "or") {
              try {
                return yield* evaluateBooleanExpression(lhs, evalrhs, op);
              } catch (err) {
                err.position = expr.position;
                err.token = op;
                throw err;
              }
            }
            var rhs = yield* evalrhs();
            try {
              switch (op) {
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                  result = evaluateNumericExpression(lhs, rhs, op);
                  break;
                case "=":
                case "!=":
                  result = evaluateEqualityExpression(lhs, rhs, op);
                  break;
                case "<":
                case "<=":
                case ">":
                case ">=":
                  result = evaluateComparisonExpression(lhs, rhs, op);
                  break;
                case "&":
                  result = evaluateStringConcat(lhs, rhs);
                  break;
                case "..":
                  result = evaluateRangeExpression(lhs, rhs);
                  break;
                case "in":
                  result = evaluateIncludesExpression(lhs, rhs);
                  break;
              }
            } catch (err) {
              err.position = expr.position;
              err.token = op;
              throw err;
            }
            return result;
          }
          function* evaluateUnary(expr, input, environment) {
            var result;
            switch (expr.value) {
              case "-":
                result = yield* evaluate(expr.expression, input, environment);
                if (typeof result === "undefined") {
                  result = void 0;
                } else if (isNumeric(result)) {
                  result = -result;
                } else {
                  throw {
                    code: "D1002",
                    stack: new Error().stack,
                    position: expr.position,
                    token: expr.value,
                    value: result
                  };
                }
                break;
              case "[":
                result = [];
                for (var ii = 0; ii < expr.expressions.length; ii++) {
                  var item = expr.expressions[ii];
                  var value = yield* evaluate(item, input, environment);
                  if (typeof value !== "undefined") {
                    if (item.value === "[") {
                      result.push(value);
                    } else {
                      result = fn.append(result, value);
                    }
                  }
                }
                if (expr.consarray) {
                  Object.defineProperty(result, "cons", {
                    enumerable: false,
                    configurable: false,
                    value: true
                  });
                }
                break;
              case "{":
                result = yield* evaluateGroupExpression(expr, input, environment);
                break;
            }
            return result;
          }
          function evaluateName(expr, input, environment) {
            return fn.lookup(input, expr.value);
          }
          function evaluateLiteral(expr) {
            return expr.value;
          }
          function evaluateWildcard(expr, input) {
            var results = createSequence();
            if (Array.isArray(input) && input.outerWrapper && input.length > 0) {
              input = input[0];
            }
            if (input !== null && typeof input === "object") {
              Object.keys(input).forEach(function(key2) {
                var value = input[key2];
                if (Array.isArray(value)) {
                  value = flatten(value);
                  results = fn.append(results, value);
                } else {
                  results.push(value);
                }
              });
            }
            return results;
          }
          function flatten(arg, flattened) {
            if (typeof flattened === "undefined") {
              flattened = [];
            }
            if (Array.isArray(arg)) {
              arg.forEach(function(item) {
                flatten(item, flattened);
              });
            } else {
              flattened.push(arg);
            }
            return flattened;
          }
          function evaluateDescendants(expr, input) {
            var result;
            var resultSequence = createSequence();
            if (typeof input !== "undefined") {
              recurseDescendants(input, resultSequence);
              if (resultSequence.length === 1) {
                result = resultSequence[0];
              } else {
                result = resultSequence;
              }
            }
            return result;
          }
          function recurseDescendants(input, results) {
            if (!Array.isArray(input)) {
              results.push(input);
            }
            if (Array.isArray(input)) {
              input.forEach(function(member) {
                recurseDescendants(member, results);
              });
            } else if (input !== null && typeof input === "object") {
              Object.keys(input).forEach(function(key2) {
                recurseDescendants(input[key2], results);
              });
            }
          }
          function evaluateNumericExpression(lhs, rhs, op) {
            var result;
            if (typeof lhs !== "undefined" && !isNumeric(lhs)) {
              throw {
                code: "T2001",
                stack: new Error().stack,
                value: lhs
              };
            }
            if (typeof rhs !== "undefined" && !isNumeric(rhs)) {
              throw {
                code: "T2002",
                stack: new Error().stack,
                value: rhs
              };
            }
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return result;
            }
            switch (op) {
              case "+":
                result = lhs + rhs;
                break;
              case "-":
                result = lhs - rhs;
                break;
              case "*":
                result = lhs * rhs;
                break;
              case "/":
                result = lhs / rhs;
                break;
              case "%":
                result = lhs % rhs;
                break;
            }
            return result;
          }
          function evaluateEqualityExpression(lhs, rhs, op) {
            var result;
            var ltype = typeof lhs;
            var rtype = typeof rhs;
            if (ltype === "undefined" || rtype === "undefined") {
              return false;
            }
            switch (op) {
              case "=":
                result = isDeepEqual(lhs, rhs);
                break;
              case "!=":
                result = !isDeepEqual(lhs, rhs);
                break;
            }
            return result;
          }
          function evaluateComparisonExpression(lhs, rhs, op) {
            var result;
            var ltype = typeof lhs;
            var rtype = typeof rhs;
            var lcomparable = ltype === "undefined" || ltype === "string" || ltype === "number";
            var rcomparable = rtype === "undefined" || rtype === "string" || rtype === "number";
            if (!lcomparable || !rcomparable) {
              throw {
                code: "T2010",
                stack: new Error().stack,
                value: !(ltype === "string" || ltype === "number") ? lhs : rhs
              };
            }
            if (ltype === "undefined" || rtype === "undefined") {
              return void 0;
            }
            if (ltype !== rtype) {
              throw {
                code: "T2009",
                stack: new Error().stack,
                value: lhs,
                value2: rhs
              };
            }
            switch (op) {
              case "<":
                result = lhs < rhs;
                break;
              case "<=":
                result = lhs <= rhs;
                break;
              case ">":
                result = lhs > rhs;
                break;
              case ">=":
                result = lhs >= rhs;
                break;
            }
            return result;
          }
          function evaluateIncludesExpression(lhs, rhs) {
            var result = false;
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return false;
            }
            if (!Array.isArray(rhs)) {
              rhs = [rhs];
            }
            for (var i = 0; i < rhs.length; i++) {
              if (rhs[i] === lhs) {
                result = true;
                break;
              }
            }
            return result;
          }
          function* evaluateBooleanExpression(lhs, evalrhs, op) {
            var result;
            var lBool = boolize(lhs);
            switch (op) {
              case "and":
                result = lBool && boolize(yield* evalrhs());
                break;
              case "or":
                result = lBool || boolize(yield* evalrhs());
                break;
            }
            return result;
          }
          function boolize(value) {
            var booledValue = fn.boolean(value);
            return typeof booledValue === "undefined" ? false : booledValue;
          }
          function evaluateStringConcat(lhs, rhs) {
            var result;
            var lstr = "";
            var rstr = "";
            if (typeof lhs !== "undefined") {
              lstr = fn.string(lhs);
            }
            if (typeof rhs !== "undefined") {
              rstr = fn.string(rhs);
            }
            result = lstr.concat(rstr);
            return result;
          }
          function* evaluateGroupExpression(expr, input, environment) {
            var result = {};
            var groups = {};
            var reduce = input && input.tupleStream ? true : false;
            if (!Array.isArray(input)) {
              input = createSequence(input);
            }
            if (input.length === 0) {
              input.push(void 0);
            }
            for (var itemIndex = 0; itemIndex < input.length; itemIndex++) {
              var item = input[itemIndex];
              var env = reduce ? createFrameFromTuple(environment, item) : environment;
              for (var pairIndex = 0; pairIndex < expr.lhs.length; pairIndex++) {
                var pair = expr.lhs[pairIndex];
                var key2 = yield* evaluate(pair[0], reduce ? item["@"] : item, env);
                if (typeof key2 !== "string" && key2 !== void 0) {
                  throw {
                    code: "T1003",
                    stack: new Error().stack,
                    position: expr.position,
                    value: key2
                  };
                }
                if (key2 !== void 0) {
                  var entry = { data: item, exprIndex: pairIndex };
                  if (groups.hasOwnProperty(key2)) {
                    if (groups[key2].exprIndex !== pairIndex) {
                      throw {
                        code: "D1009",
                        stack: new Error().stack,
                        position: expr.position,
                        value: key2
                      };
                    }
                    groups[key2].data = fn.append(groups[key2].data, item);
                  } else {
                    groups[key2] = entry;
                  }
                }
              }
            }
            for (key2 in groups) {
              entry = groups[key2];
              var context = entry.data;
              var env = environment;
              if (reduce) {
                var tuple = reduceTupleStream(entry.data);
                context = tuple["@"];
                delete tuple["@"];
                env = createFrameFromTuple(environment, tuple);
              }
              var value = yield* evaluate(expr.lhs[entry.exprIndex][1], context, env);
              if (typeof value !== "undefined") {
                result[key2] = value;
              }
            }
            return result;
          }
          function reduceTupleStream(tupleStream) {
            if (!Array.isArray(tupleStream)) {
              return tupleStream;
            }
            var result = {};
            Object.assign(result, tupleStream[0]);
            for (var ii = 1; ii < tupleStream.length; ii++) {
              for (const prop in tupleStream[ii]) {
                result[prop] = fn.append(result[prop], tupleStream[ii][prop]);
              }
            }
            return result;
          }
          function evaluateRangeExpression(lhs, rhs) {
            var result;
            if (typeof lhs !== "undefined" && !Number.isInteger(lhs)) {
              throw {
                code: "T2003",
                stack: new Error().stack,
                value: lhs
              };
            }
            if (typeof rhs !== "undefined" && !Number.isInteger(rhs)) {
              throw {
                code: "T2004",
                stack: new Error().stack,
                value: rhs
              };
            }
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return result;
            }
            if (lhs > rhs) {
              return result;
            }
            var size = rhs - lhs + 1;
            if (size > 1e7) {
              throw {
                code: "D2014",
                stack: new Error().stack,
                value: size
              };
            }
            result = new Array(size);
            for (var item = lhs, index = 0; item <= rhs; item++, index++) {
              result[index] = item;
            }
            result.sequence = true;
            return result;
          }
          function* evaluateBindExpression(expr, input, environment) {
            var value = yield* evaluate(expr.rhs, input, environment);
            environment.bind(expr.lhs.value, value);
            return value;
          }
          function* evaluateCondition(expr, input, environment) {
            var result;
            var condition = yield* evaluate(expr.condition, input, environment);
            if (fn.boolean(condition)) {
              result = yield* evaluate(expr.then, input, environment);
            } else if (typeof expr.else !== "undefined") {
              result = yield* evaluate(expr.else, input, environment);
            }
            return result;
          }
          function* evaluateBlock(expr, input, environment) {
            var result;
            var frame = createFrame(environment);
            for (var ii = 0; ii < expr.expressions.length; ii++) {
              result = yield* evaluate(expr.expressions[ii], input, frame);
            }
            return result;
          }
          function evaluateRegex(expr) {
            var re = new jsonata3.RegexEngine(expr.value);
            var closure = function(str, fromIndex) {
              var result;
              re.lastIndex = fromIndex || 0;
              var match = re.exec(str);
              if (match !== null) {
                result = {
                  match: match[0],
                  start: match.index,
                  end: match.index + match[0].length,
                  groups: []
                };
                if (match.length > 1) {
                  for (var i = 1; i < match.length; i++) {
                    result.groups.push(match[i]);
                  }
                }
                result.next = function() {
                  if (re.lastIndex >= str.length) {
                    return void 0;
                  } else {
                    var next = closure(str, re.lastIndex);
                    if (next && next.match === "") {
                      throw {
                        code: "D1004",
                        stack: new Error().stack,
                        position: expr.position,
                        value: expr.value.source
                      };
                    }
                    return next;
                  }
                };
              }
              return result;
            };
            return closure;
          }
          function evaluateVariable(expr, input, environment) {
            var result;
            if (expr.value === "") {
              result = input && input.outerWrapper ? input[0] : input;
            } else {
              result = environment.lookup(expr.value);
            }
            return result;
          }
          function* evaluateSortExpression(expr, input, environment) {
            var result;
            var lhs = input;
            var isTupleSort = input.tupleStream ? true : false;
            var comparator = function* (a, b) {
              var comp = 0;
              for (var index = 0; comp === 0 && index < expr.terms.length; index++) {
                var term = expr.terms[index];
                var context = a;
                var env = environment;
                if (isTupleSort) {
                  context = a["@"];
                  env = createFrameFromTuple(environment, a);
                }
                var aa = yield* evaluate(term.expression, context, env);
                context = b;
                env = environment;
                if (isTupleSort) {
                  context = b["@"];
                  env = createFrameFromTuple(environment, b);
                }
                var bb = yield* evaluate(term.expression, context, env);
                var atype = typeof aa;
                var btype = typeof bb;
                if (atype === "undefined") {
                  comp = btype === "undefined" ? 0 : 1;
                  continue;
                }
                if (btype === "undefined") {
                  comp = -1;
                  continue;
                }
                if (!(atype === "string" || atype === "number") || !(btype === "string" || btype === "number")) {
                  throw {
                    code: "T2008",
                    stack: new Error().stack,
                    position: expr.position,
                    value: !(atype === "string" || atype === "number") ? aa : bb
                  };
                }
                if (atype !== btype) {
                  throw {
                    code: "T2007",
                    stack: new Error().stack,
                    position: expr.position,
                    value: aa,
                    value2: bb
                  };
                }
                if (aa === bb) {
                  continue;
                } else if (aa < bb) {
                  comp = -1;
                } else {
                  comp = 1;
                }
                if (term.descending === true) {
                  comp = -comp;
                }
              }
              return comp === 1;
            };
            var focus = {
              environment,
              input
            };
            result = yield* fn.sort.apply(focus, [lhs, comparator]);
            return result;
          }
          function evaluateTransformExpression(expr, input, environment) {
            var transformer = function* (obj) {
              if (typeof obj === "undefined") {
                return void 0;
              }
              var cloneFunction = environment.lookup("clone");
              if (!isFunction(cloneFunction)) {
                throw {
                  code: "T2013",
                  stack: new Error().stack,
                  position: expr.position
                };
              }
              var result = yield* apply(cloneFunction, [obj], null, environment);
              var matches = yield* evaluate(expr.pattern, result, environment);
              if (typeof matches !== "undefined") {
                if (!Array.isArray(matches)) {
                  matches = [matches];
                }
                for (var ii = 0; ii < matches.length; ii++) {
                  var match = matches[ii];
                  var update = yield* evaluate(expr.update, match, environment);
                  var updateType = typeof update;
                  if (updateType !== "undefined") {
                    if (updateType !== "object" || update === null || Array.isArray(update)) {
                      throw {
                        code: "T2011",
                        stack: new Error().stack,
                        position: expr.update.position,
                        value: update
                      };
                    }
                    for (var prop in update) {
                      match[prop] = update[prop];
                    }
                  }
                  if (typeof expr.delete !== "undefined") {
                    var deletions = yield* evaluate(expr.delete, match, environment);
                    if (typeof deletions !== "undefined") {
                      var val = deletions;
                      if (!Array.isArray(deletions)) {
                        deletions = [deletions];
                      }
                      if (!isArrayOfStrings(deletions)) {
                        throw {
                          code: "T2012",
                          stack: new Error().stack,
                          position: expr.delete.position,
                          value: val
                        };
                      }
                      for (var jj = 0; jj < deletions.length; jj++) {
                        if (typeof match === "object" && match !== null) {
                          delete match[deletions[jj]];
                        }
                      }
                    }
                  }
                }
              }
              return result;
            };
            return defineFunction(transformer, "<(oa):o>");
          }
          var chainAST = parser("function($f, $g) { function($x){ $g($f($x)) } }");
          function* evaluateApplyExpression(expr, input, environment) {
            var result;
            var lhs = yield* evaluate(expr.lhs, input, environment);
            if (expr.rhs.type === "function") {
              result = yield* evaluateFunction(expr.rhs, input, environment, { context: lhs });
            } else {
              var func = yield* evaluate(expr.rhs, input, environment);
              if (!isFunction(func)) {
                throw {
                  code: "T2006",
                  stack: new Error().stack,
                  position: expr.position,
                  value: func
                };
              }
              if (isFunction(lhs)) {
                var chain = yield* evaluate(chainAST, null, environment);
                result = yield* apply(chain, [lhs, func], null, environment);
              } else {
                result = yield* apply(func, [lhs], null, environment);
              }
            }
            return result;
          }
          function* evaluateFunction(expr, input, environment, applyto) {
            var result;
            var proc = yield* evaluate(expr.procedure, input, environment);
            if (typeof proc === "undefined" && expr.procedure.type === "path" && environment.lookup(expr.procedure.steps[0].value)) {
              throw {
                code: "T1005",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.steps[0].value
              };
            }
            var evaluatedArgs = [];
            if (typeof applyto !== "undefined") {
              evaluatedArgs.push(applyto.context);
            }
            for (var jj = 0; jj < expr.arguments.length; jj++) {
              const arg = yield* evaluate(expr.arguments[jj], input, environment);
              if (isFunction(arg)) {
                const closure = function* (...params) {
                  return yield* apply(arg, params, null, environment);
                };
                closure.arity = getFunctionArity(arg);
                evaluatedArgs.push(closure);
              } else {
                evaluatedArgs.push(arg);
              }
            }
            var procName = expr.procedure.type === "path" ? expr.procedure.steps[0].value : expr.procedure.value;
            try {
              if (typeof proc === "object") {
                proc.token = procName;
                proc.position = expr.position;
              }
              result = yield* apply(proc, evaluatedArgs, input, environment);
            } catch (err) {
              if (!err.position) {
                err.position = expr.position;
              }
              if (!err.token) {
                err.token = procName;
              }
              throw err;
            }
            return result;
          }
          function* apply(proc, args, input, environment) {
            var result;
            result = yield* applyInner(proc, args, input, environment);
            while (isLambda(result) && result.thunk === true) {
              var next = yield* evaluate(result.body.procedure, result.input, result.environment);
              if (result.body.procedure.type === "variable") {
                next.token = result.body.procedure.value;
              }
              next.position = result.body.procedure.position;
              var evaluatedArgs = [];
              for (var ii = 0; ii < result.body.arguments.length; ii++) {
                evaluatedArgs.push(yield* evaluate(result.body.arguments[ii], result.input, result.environment));
              }
              result = yield* applyInner(next, evaluatedArgs, input, environment);
            }
            return result;
          }
          function* applyInner(proc, args, input, environment) {
            var result;
            try {
              var validatedArgs = args;
              if (proc) {
                validatedArgs = validateArguments(proc.signature, args, input);
              }
              if (isLambda(proc)) {
                result = yield* applyProcedure(proc, validatedArgs);
              } else if (proc && proc._jsonata_function === true) {
                var focus = {
                  environment,
                  input
                };
                result = proc.implementation.apply(focus, validatedArgs);
                if (isIterable(result)) {
                  result = yield* result;
                }
              } else if (typeof proc === "function") {
                result = proc.apply(input, validatedArgs);
                if (isIterable(result)) {
                  result = yield* result;
                }
              } else {
                throw {
                  code: "T1006",
                  stack: new Error().stack
                };
              }
            } catch (err) {
              if (proc) {
                if (typeof err.token == "undefined" && typeof proc.token !== "undefined") {
                  err.token = proc.token;
                }
                err.position = proc.position;
              }
              throw err;
            }
            return result;
          }
          function evaluateLambda(expr, input, environment) {
            var procedure = {
              _jsonata_lambda: true,
              input,
              environment,
              arguments: expr.arguments,
              signature: expr.signature,
              body: expr.body
            };
            if (expr.thunk === true) {
              procedure.thunk = true;
            }
            procedure.apply = function* (self2, args) {
              return yield* apply(procedure, args, input, self2.environment);
            };
            return procedure;
          }
          function* evaluatePartialApplication(expr, input, environment) {
            var result;
            var evaluatedArgs = [];
            for (var ii = 0; ii < expr.arguments.length; ii++) {
              var arg = expr.arguments[ii];
              if (arg.type === "operator" && arg.value === "?") {
                evaluatedArgs.push(arg);
              } else {
                evaluatedArgs.push(yield* evaluate(arg, input, environment));
              }
            }
            var proc = yield* evaluate(expr.procedure, input, environment);
            if (typeof proc === "undefined" && expr.procedure.type === "path" && environment.lookup(expr.procedure.steps[0].value)) {
              throw {
                code: "T1007",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.steps[0].value
              };
            }
            if (isLambda(proc)) {
              result = partialApplyProcedure(proc, evaluatedArgs);
            } else if (proc && proc._jsonata_function === true) {
              result = partialApplyNativeFunction(proc.implementation, evaluatedArgs);
            } else if (typeof proc === "function") {
              result = partialApplyNativeFunction(proc, evaluatedArgs);
            } else {
              throw {
                code: "T1008",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.type === "path" ? expr.procedure.steps[0].value : expr.procedure.value
              };
            }
            return result;
          }
          function validateArguments(signature, args, context) {
            if (typeof signature === "undefined") {
              return args;
            }
            var validatedArgs = signature.validate(args, context);
            return validatedArgs;
          }
          function* applyProcedure(proc, args) {
            var result;
            var env = createFrame(proc.environment);
            proc.arguments.forEach(function(param, index) {
              env.bind(param.value, args[index]);
            });
            if (typeof proc.body === "function") {
              result = yield* applyNativeFunction(proc.body, env);
            } else {
              result = yield* evaluate(proc.body, proc.input, env);
            }
            return result;
          }
          function partialApplyProcedure(proc, args) {
            var env = createFrame(proc.environment);
            var unboundArgs = [];
            proc.arguments.forEach(function(param, index) {
              var arg = args[index];
              if (arg && arg.type === "operator" && arg.value === "?") {
                unboundArgs.push(param);
              } else {
                env.bind(param.value, arg);
              }
            });
            var procedure = {
              _jsonata_lambda: true,
              input: proc.input,
              environment: env,
              arguments: unboundArgs,
              body: proc.body
            };
            return procedure;
          }
          function partialApplyNativeFunction(native, args) {
            var sigArgs = getNativeFunctionArguments(native);
            sigArgs = sigArgs.map(function(sigArg) {
              return "$" + sigArg.trim();
            });
            var body = "function(" + sigArgs.join(", ") + "){ _ }";
            var bodyAST = parser(body);
            bodyAST.body = native;
            var partial = partialApplyProcedure(bodyAST, args);
            return partial;
          }
          function* applyNativeFunction(proc, env) {
            var sigArgs = getNativeFunctionArguments(proc);
            var args = sigArgs.map(function(sigArg) {
              return env.lookup(sigArg.trim());
            });
            var focus = {
              environment: env
            };
            var result = proc.apply(focus, args);
            if (isIterable(result)) {
              result = yield* result;
            }
            return result;
          }
          function getNativeFunctionArguments(func) {
            var signature = func.toString();
            var sigParens = /\(([^)]*)\)/.exec(signature)[1];
            var sigArgs = sigParens.split(",");
            return sigArgs;
          }
          function defineFunction(func, signature) {
            var definition2 = {
              _jsonata_function: true,
              implementation: func
            };
            if (typeof signature !== "undefined") {
              definition2.signature = parseSignature(signature);
            }
            return definition2;
          }
          function* functionEval(expr, focus) {
            if (typeof expr === "undefined") {
              return void 0;
            }
            var input = this.input;
            if (typeof focus !== "undefined") {
              input = focus;
              if (Array.isArray(input) && !isSequence(input)) {
                input = createSequence(input);
                input.outerWrapper = true;
              }
            }
            try {
              var ast = parser(expr, false);
            } catch (err) {
              populateMessage(err);
              throw {
                stack: new Error().stack,
                code: "D3120",
                value: err.message,
                error: err
              };
            }
            try {
              var result = yield* evaluate(ast, input, this.environment);
            } catch (err) {
              populateMessage(err);
              throw {
                stack: new Error().stack,
                code: "D3121",
                value: err.message,
                error: err
              };
            }
            return result;
          }
          function functionClone(arg) {
            if (typeof arg === "undefined") {
              return void 0;
            }
            return JSON.parse(fn.string(arg));
          }
          function createFrame(enclosingEnvironment) {
            var bindings = {};
            return {
              bind: function(name, value) {
                bindings[name] = value;
              },
              lookup: function(name) {
                var value;
                if (bindings.hasOwnProperty(name)) {
                  value = bindings[name];
                } else if (enclosingEnvironment) {
                  value = enclosingEnvironment.lookup(name);
                }
                return value;
              },
              timestamp: enclosingEnvironment ? enclosingEnvironment.timestamp : null,
              async: enclosingEnvironment ? enclosingEnvironment.async : false,
              global: enclosingEnvironment ? enclosingEnvironment.global : {
                ancestry: [null]
              }
            };
          }
          staticFrame.bind("sum", defineFunction(fn.sum, "<a<n>:n>"));
          staticFrame.bind("count", defineFunction(fn.count, "<a:n>"));
          staticFrame.bind("max", defineFunction(fn.max, "<a<n>:n>"));
          staticFrame.bind("min", defineFunction(fn.min, "<a<n>:n>"));
          staticFrame.bind("average", defineFunction(fn.average, "<a<n>:n>"));
          staticFrame.bind("string", defineFunction(fn.string, "<x-b?:s>"));
          staticFrame.bind("substring", defineFunction(fn.substring, "<s-nn?:s>"));
          staticFrame.bind("substringBefore", defineFunction(fn.substringBefore, "<s-s:s>"));
          staticFrame.bind("substringAfter", defineFunction(fn.substringAfter, "<s-s:s>"));
          staticFrame.bind("lowercase", defineFunction(fn.lowercase, "<s-:s>"));
          staticFrame.bind("uppercase", defineFunction(fn.uppercase, "<s-:s>"));
          staticFrame.bind("length", defineFunction(fn.length, "<s-:n>"));
          staticFrame.bind("trim", defineFunction(fn.trim, "<s-:s>"));
          staticFrame.bind("pad", defineFunction(fn.pad, "<s-ns?:s>"));
          staticFrame.bind("match", defineFunction(fn.match, "<s-f<s:o>n?:a<o>>"));
          staticFrame.bind("contains", defineFunction(fn.contains, "<s-(sf):b>"));
          staticFrame.bind("replace", defineFunction(fn.replace, "<s-(sf)(sf)n?:s>"));
          staticFrame.bind("split", defineFunction(fn.split, "<s-(sf)n?:a<s>>"));
          staticFrame.bind("join", defineFunction(fn.join, "<a<s>s?:s>"));
          staticFrame.bind("formatNumber", defineFunction(fn.formatNumber, "<n-so?:s>"));
          staticFrame.bind("formatBase", defineFunction(fn.formatBase, "<n-n?:s>"));
          staticFrame.bind("formatInteger", defineFunction(datetime.formatInteger, "<n-s:s>"));
          staticFrame.bind("parseInteger", defineFunction(datetime.parseInteger, "<s-s:n>"));
          staticFrame.bind("number", defineFunction(fn.number, "<(nsb)-:n>"));
          staticFrame.bind("floor", defineFunction(fn.floor, "<n-:n>"));
          staticFrame.bind("ceil", defineFunction(fn.ceil, "<n-:n>"));
          staticFrame.bind("round", defineFunction(fn.round, "<n-n?:n>"));
          staticFrame.bind("abs", defineFunction(fn.abs, "<n-:n>"));
          staticFrame.bind("sqrt", defineFunction(fn.sqrt, "<n-:n>"));
          staticFrame.bind("power", defineFunction(fn.power, "<n-n:n>"));
          staticFrame.bind("random", defineFunction(fn.random, "<:n>"));
          staticFrame.bind("boolean", defineFunction(fn.boolean, "<x-:b>"));
          staticFrame.bind("not", defineFunction(fn.not, "<x-:b>"));
          staticFrame.bind("map", defineFunction(fn.map, "<af>"));
          staticFrame.bind("zip", defineFunction(fn.zip, "<a+>"));
          staticFrame.bind("filter", defineFunction(fn.filter, "<af>"));
          staticFrame.bind("single", defineFunction(fn.single, "<af?>"));
          staticFrame.bind("reduce", defineFunction(fn.foldLeft, "<afj?:j>"));
          staticFrame.bind("sift", defineFunction(fn.sift, "<o-f?:o>"));
          staticFrame.bind("keys", defineFunction(fn.keys, "<x-:a<s>>"));
          staticFrame.bind("lookup", defineFunction(fn.lookup, "<x-s:x>"));
          staticFrame.bind("append", defineFunction(fn.append, "<xx:a>"));
          staticFrame.bind("exists", defineFunction(fn.exists, "<x:b>"));
          staticFrame.bind("spread", defineFunction(fn.spread, "<x-:a<o>>"));
          staticFrame.bind("merge", defineFunction(fn.merge, "<a<o>:o>"));
          staticFrame.bind("reverse", defineFunction(fn.reverse, "<a:a>"));
          staticFrame.bind("each", defineFunction(fn.each, "<o-f:a>"));
          staticFrame.bind("error", defineFunction(fn.error, "<s?:x>"));
          staticFrame.bind("assert", defineFunction(fn.assert, "<bs?:x>"));
          staticFrame.bind("type", defineFunction(fn.type, "<x:s>"));
          staticFrame.bind("sort", defineFunction(fn.sort, "<af?:a>"));
          staticFrame.bind("shuffle", defineFunction(fn.shuffle, "<a:a>"));
          staticFrame.bind("distinct", defineFunction(fn.distinct, "<x:x>"));
          staticFrame.bind("base64encode", defineFunction(fn.base64encode, "<s-:s>"));
          staticFrame.bind("base64decode", defineFunction(fn.base64decode, "<s-:s>"));
          staticFrame.bind("encodeUrlComponent", defineFunction(fn.encodeUrlComponent, "<s-:s>"));
          staticFrame.bind("encodeUrl", defineFunction(fn.encodeUrl, "<s-:s>"));
          staticFrame.bind("decodeUrlComponent", defineFunction(fn.decodeUrlComponent, "<s-:s>"));
          staticFrame.bind("decodeUrl", defineFunction(fn.decodeUrl, "<s-:s>"));
          staticFrame.bind("eval", defineFunction(functionEval, "<sx?:x>"));
          staticFrame.bind("toMillis", defineFunction(datetime.toMillis, "<s-s?:n>"));
          staticFrame.bind("fromMillis", defineFunction(datetime.fromMillis, "<n-s?s?:s>"));
          staticFrame.bind("clone", defineFunction(functionClone, "<(oa)-:o>"));
          var errorCodes = {
            "S0101": "String literal must be terminated by a matching quote",
            "S0102": "Number out of range: {{token}}",
            "S0103": "Unsupported escape sequence: \\{{token}}",
            "S0104": "The escape sequence \\u must be followed by 4 hex digits",
            "S0105": "Quoted property name must be terminated with a backquote (`)",
            "S0106": "Comment has no closing tag",
            "S0201": "Syntax error: {{token}}",
            "S0202": "Expected {{value}}, got {{token}}",
            "S0203": "Expected {{value}} before end of expression",
            "S0204": "Unknown operator: {{token}}",
            "S0205": "Unexpected token: {{token}}",
            "S0206": "Unknown expression type: {{token}}",
            "S0207": "Unexpected end of expression",
            "S0208": "Parameter {{value}} of function definition must be a variable name (start with $)",
            "S0209": "A predicate cannot follow a grouping expression in a step",
            "S0210": "Each step can only have one grouping expression",
            "S0211": "The symbol {{token}} cannot be used as a unary operator",
            "S0212": "The left side of := must be a variable name (start with $)",
            "S0213": "The literal value {{value}} cannot be used as a step within a path expression",
            "S0214": "The right side of {{token}} must be a variable name (start with $)",
            "S0215": "A context variable binding must precede any predicates on a step",
            "S0216": "A context variable binding must precede the 'order-by' clause on a step",
            "S0217": "The object representing the 'parent' cannot be derived from this expression",
            "S0301": "Empty regular expressions are not allowed",
            "S0302": "No terminating / in regular expression",
            "S0402": "Choice groups containing parameterized types are not supported",
            "S0401": "Type parameters can only be applied to functions and arrays",
            "S0500": "Attempted to evaluate an expression containing syntax error(s)",
            "T0410": "Argument {{index}} of function {{token}} does not match function signature",
            "T0411": "Context value is not a compatible type with argument {{index}} of function {{token}}",
            "T0412": "Argument {{index}} of function {{token}} must be an array of {{type}}",
            "D1001": "Number out of range: {{value}}",
            "D1002": "Cannot negate a non-numeric value: {{value}}",
            "T1003": "Key in object structure must evaluate to a string; got: {{value}}",
            "D1004": "Regular expression matches zero length string",
            "T1005": "Attempted to invoke a non-function. Did you mean ${{{token}}}?",
            "T1006": "Attempted to invoke a non-function",
            "T1007": "Attempted to partially apply a non-function. Did you mean ${{{token}}}?",
            "T1008": "Attempted to partially apply a non-function",
            "D1009": "Multiple key definitions evaluate to same key: {{value}}",
            "T1010": "The matcher function argument passed to function {{token}} does not return the correct object structure",
            "T2001": "The left side of the {{token}} operator must evaluate to a number",
            "T2002": "The right side of the {{token}} operator must evaluate to a number",
            "T2003": "The left side of the range operator (..) must evaluate to an integer",
            "T2004": "The right side of the range operator (..) must evaluate to an integer",
            "D2005": "The left side of := must be a variable name (start with $)",
            "T2006": "The right side of the function application operator ~> must be a function",
            "T2007": "Type mismatch when comparing values {{value}} and {{value2}} in order-by clause",
            "T2008": "The expressions within an order-by clause must evaluate to numeric or string values",
            "T2009": "The values {{value}} and {{value2}} either side of operator {{token}} must be of the same data type",
            "T2010": "The expressions either side of operator {{token}} must evaluate to numeric or string values",
            "T2011": "The insert/update clause of the transform expression must evaluate to an object: {{value}}",
            "T2012": "The delete clause of the transform expression must evaluate to a string or array of strings: {{value}}",
            "T2013": "The transform expression clones the input object using the $clone() function.  This has been overridden in the current scope by a non-function.",
            "D2014": "The size of the sequence allocated by the range operator (..) must not exceed 1e6.  Attempted to allocate {{value}}.",
            "D3001": "Attempting to invoke string function on Infinity or NaN",
            "D3010": "Second argument of replace function cannot be an empty string",
            "D3011": "Fourth argument of replace function must evaluate to a positive number",
            "D3012": "Attempted to replace a matched string with a non-string value",
            "D3020": "Third argument of split function must evaluate to a positive number",
            "D3030": "Unable to cast value to a number: {{value}}",
            "D3040": "Third argument of match function must evaluate to a positive number",
            "D3050": "The second argument of reduce function must be a function with at least two arguments",
            "D3060": "The sqrt function cannot be applied to a negative number: {{value}}",
            "D3061": "The power function has resulted in a value that cannot be represented as a JSON number: base={{value}}, exponent={{exp}}",
            "D3070": "The single argument form of the sort function can only be applied to an array of strings or an array of numbers.  Use the second argument to specify a comparison function",
            "D3080": "The picture string must only contain a maximum of two sub-pictures",
            "D3081": "The sub-picture must not contain more than one instance of the 'decimal-separator' character",
            "D3082": "The sub-picture must not contain more than one instance of the 'percent' character",
            "D3083": "The sub-picture must not contain more than one instance of the 'per-mille' character",
            "D3084": "The sub-picture must not contain both a 'percent' and a 'per-mille' character",
            "D3085": "The mantissa part of a sub-picture must contain at least one character that is either an 'optional digit character' or a member of the 'decimal digit family'",
            "D3086": "The sub-picture must not contain a passive character that is preceded by an active character and that is followed by another active character",
            "D3087": "The sub-picture must not contain a 'grouping-separator' character that appears adjacent to a 'decimal-separator' character",
            "D3088": "The sub-picture must not contain a 'grouping-separator' at the end of the integer part",
            "D3089": "The sub-picture must not contain two adjacent instances of the 'grouping-separator' character",
            "D3090": "The integer part of the sub-picture must not contain a member of the 'decimal digit family' that is followed by an instance of the 'optional digit character'",
            "D3091": "The fractional part of the sub-picture must not contain an instance of the 'optional digit character' that is followed by a member of the 'decimal digit family'",
            "D3092": "A sub-picture that contains a 'percent' or 'per-mille' character must not contain a character treated as an 'exponent-separator'",
            "D3093": "The exponent part of the sub-picture must comprise only of one or more characters that are members of the 'decimal digit family'",
            "D3100": "The radix of the formatBase function must be between 2 and 36.  It was given {{value}}",
            "D3110": "The argument of the toMillis function must be an ISO 8601 formatted timestamp. Given {{value}}",
            "D3120": "Syntax error in expression passed to function eval: {{value}}",
            "D3121": "Dynamic error evaluating the expression passed to function eval: {{value}}",
            "D3130": "Formatting or parsing an integer as a sequence starting with {{value}} is not supported by this implementation",
            "D3131": "In a decimal digit pattern, all digits must be from the same decimal group",
            "D3132": "Unknown component specifier {{value}} in date/time picture string",
            "D3133": "The 'name' modifier can only be applied to months and days in the date/time picture string, not {{value}}",
            "D3134": "The timezone integer format specifier cannot have more than four digits",
            "D3135": "No matching closing bracket ']' in date/time picture string",
            "D3136": "The date/time picture string is missing specifiers required to parse the timestamp",
            "D3137": "{{{message}}}",
            "D3138": "The $single() function expected exactly 1 matching result.  Instead it matched more.",
            "D3139": "The $single() function expected exactly 1 matching result.  Instead it matched 0.",
            "D3140": "Malformed URL passed to ${{{functionName}}}(): {{value}}",
            "D3141": "{{{message}}}"
          };
          function populateMessage(err) {
            var template2 = errorCodes[err.code];
            if (typeof template2 !== "undefined") {
              var message = template2.replace(/\{\{\{([^}]+)}}}/g, function() {
                return err[arguments[1]];
              });
              message = message.replace(/\{\{([^}]+)}}/g, function() {
                return JSON.stringify(err[arguments[1]]);
              });
              err.message = message;
            }
          }
          function jsonata3(expr, options) {
            var ast;
            var errors;
            try {
              ast = parser(expr, options && options.recover);
              errors = ast.errors;
              delete ast.errors;
            } catch (err) {
              populateMessage(err);
              throw err;
            }
            var environment = createFrame(staticFrame);
            var timestamp = new Date();
            environment.bind("now", defineFunction(function(picture, timezone) {
              return datetime.fromMillis(timestamp.getTime(), picture, timezone);
            }, "<s?s?:s>"));
            environment.bind("millis", defineFunction(function() {
              return timestamp.getTime();
            }, "<:n>"));
            if (options && options.RegexEngine) {
              jsonata3.RegexEngine = options.RegexEngine;
            } else {
              jsonata3.RegexEngine = RegExp;
            }
            return {
              evaluate: function(input, bindings, callback) {
                if (typeof errors !== "undefined") {
                  var err = {
                    code: "S0500",
                    position: 0
                  };
                  populateMessage(err);
                  throw err;
                }
                if (typeof bindings !== "undefined") {
                  var exec_env;
                  exec_env = createFrame(environment);
                  for (var v in bindings) {
                    exec_env.bind(v, bindings[v]);
                  }
                } else {
                  exec_env = environment;
                }
                exec_env.bind("$", input);
                timestamp = new Date();
                exec_env.timestamp = timestamp;
                if (Array.isArray(input) && !isSequence(input)) {
                  input = createSequence(input);
                  input.outerWrapper = true;
                }
                var result, it;
                if (typeof callback === "function") {
                  exec_env.async = true;
                  var catchHandler = function(err2) {
                    populateMessage(err2);
                    callback(err2, null);
                  };
                  var thenHandler = function(response) {
                    result = it.next(response);
                    if (result.done) {
                      callback(null, result.value);
                    } else {
                      result.value.then(thenHandler).catch(catchHandler);
                    }
                  };
                  it = evaluate(ast, input, exec_env);
                  result = it.next();
                  result.value.then(thenHandler).catch(catchHandler);
                } else {
                  try {
                    it = evaluate(ast, input, exec_env);
                    result = it.next();
                    while (!result.done) {
                      result = it.next(result.value);
                    }
                    return result.value;
                  } catch (err2) {
                    populateMessage(err2);
                    throw err2;
                  }
                }
              },
              assign: function(name, value) {
                environment.bind(name, value);
              },
              registerFunction: function(name, implementation, signature) {
                var func = defineFunction(implementation, signature);
                environment.bind(name, func);
              },
              ast: function() {
                return ast;
              },
              errors: function() {
                return errors;
              }
            };
          }
          jsonata3.parser = parser;
          return jsonata3;
        }();
        module4.exports = jsonata2;
      }, { "./datetime": 1, "./functions": 2, "./parser": 4, "./signature": 5, "./utils": 6 }], 4: [function(require2, module4, exports4) {
        var parseSignature = require2("./signature");
        const parser = (() => {
          "use strict";
          var operators = {
            ".": 75,
            "[": 80,
            "]": 0,
            "{": 70,
            "}": 0,
            "(": 80,
            ")": 0,
            ",": 0,
            "@": 80,
            "#": 80,
            ";": 80,
            ":": 80,
            "?": 20,
            "+": 50,
            "-": 50,
            "*": 60,
            "/": 60,
            "%": 60,
            "|": 20,
            "=": 40,
            "<": 40,
            ">": 40,
            "^": 40,
            "**": 60,
            "..": 20,
            ":=": 10,
            "!=": 40,
            "<=": 40,
            ">=": 40,
            "~>": 40,
            "and": 30,
            "or": 25,
            "in": 40,
            "&": 50,
            "!": 0,
            "~": 0
          };
          var escapes2 = {
            '"': '"',
            "\\": "\\",
            "/": "/",
            "b": "\b",
            "f": "\f",
            "n": "\n",
            "r": "\r",
            "t": "	"
          };
          var tokenizer = function(path8) {
            var position = 0;
            var length = path8.length;
            var create = function(type, value) {
              var obj = { type, value, position };
              return obj;
            };
            var scanRegex = function() {
              var start = position;
              var depth = 0;
              var pattern;
              var flags;
              while (position < length) {
                var currentChar = path8.charAt(position);
                if (currentChar === "/" && path8.charAt(position - 1) !== "\\" && depth === 0) {
                  pattern = path8.substring(start, position);
                  if (pattern === "") {
                    throw {
                      code: "S0301",
                      stack: new Error().stack,
                      position
                    };
                  }
                  position++;
                  currentChar = path8.charAt(position);
                  start = position;
                  while (currentChar === "i" || currentChar === "m") {
                    position++;
                    currentChar = path8.charAt(position);
                  }
                  flags = path8.substring(start, position) + "g";
                  return new RegExp(pattern, flags);
                }
                if ((currentChar === "(" || currentChar === "[" || currentChar === "{") && path8.charAt(position - 1) !== "\\") {
                  depth++;
                }
                if ((currentChar === ")" || currentChar === "]" || currentChar === "}") && path8.charAt(position - 1) !== "\\") {
                  depth--;
                }
                position++;
              }
              throw {
                code: "S0302",
                stack: new Error().stack,
                position
              };
            };
            var next = function(prefix) {
              if (position >= length)
                return null;
              var currentChar = path8.charAt(position);
              while (position < length && " 	\n\r\v".indexOf(currentChar) > -1) {
                position++;
                currentChar = path8.charAt(position);
              }
              if (currentChar === "/" && path8.charAt(position + 1) === "*") {
                var commentStart = position;
                position += 2;
                currentChar = path8.charAt(position);
                while (!(currentChar === "*" && path8.charAt(position + 1) === "/")) {
                  currentChar = path8.charAt(++position);
                  if (position >= length) {
                    throw {
                      code: "S0106",
                      stack: new Error().stack,
                      position: commentStart
                    };
                  }
                }
                position += 2;
                currentChar = path8.charAt(position);
                return next(prefix);
              }
              if (prefix !== true && currentChar === "/") {
                position++;
                return create("regex", scanRegex());
              }
              if (currentChar === "." && path8.charAt(position + 1) === ".") {
                position += 2;
                return create("operator", "..");
              }
              if (currentChar === ":" && path8.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", ":=");
              }
              if (currentChar === "!" && path8.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", "!=");
              }
              if (currentChar === ">" && path8.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", ">=");
              }
              if (currentChar === "<" && path8.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", "<=");
              }
              if (currentChar === "*" && path8.charAt(position + 1) === "*") {
                position += 2;
                return create("operator", "**");
              }
              if (currentChar === "~" && path8.charAt(position + 1) === ">") {
                position += 2;
                return create("operator", "~>");
              }
              if (Object.prototype.hasOwnProperty.call(operators, currentChar)) {
                position++;
                return create("operator", currentChar);
              }
              if (currentChar === '"' || currentChar === "'") {
                var quoteType = currentChar;
                position++;
                var qstr = "";
                while (position < length) {
                  currentChar = path8.charAt(position);
                  if (currentChar === "\\") {
                    position++;
                    currentChar = path8.charAt(position);
                    if (Object.prototype.hasOwnProperty.call(escapes2, currentChar)) {
                      qstr += escapes2[currentChar];
                    } else if (currentChar === "u") {
                      var octets = path8.substr(position + 1, 4);
                      if (/^[0-9a-fA-F]+$/.test(octets)) {
                        var codepoint = parseInt(octets, 16);
                        qstr += String.fromCharCode(codepoint);
                        position += 4;
                      } else {
                        throw {
                          code: "S0104",
                          stack: new Error().stack,
                          position
                        };
                      }
                    } else {
                      throw {
                        code: "S0103",
                        stack: new Error().stack,
                        position,
                        token: currentChar
                      };
                    }
                  } else if (currentChar === quoteType) {
                    position++;
                    return create("string", qstr);
                  } else {
                    qstr += currentChar;
                  }
                  position++;
                }
                throw {
                  code: "S0101",
                  stack: new Error().stack,
                  position
                };
              }
              var numregex = /^-?(0|([1-9][0-9]*))(\.[0-9]+)?([Ee][-+]?[0-9]+)?/;
              var match = numregex.exec(path8.substring(position));
              if (match !== null) {
                var num = parseFloat(match[0]);
                if (!isNaN(num) && isFinite(num)) {
                  position += match[0].length;
                  return create("number", num);
                } else {
                  throw {
                    code: "S0102",
                    stack: new Error().stack,
                    position,
                    token: match[0]
                  };
                }
              }
              var name;
              if (currentChar === "`") {
                position++;
                var end = path8.indexOf("`", position);
                if (end !== -1) {
                  name = path8.substring(position, end);
                  position = end + 1;
                  return create("name", name);
                }
                position = length;
                throw {
                  code: "S0105",
                  stack: new Error().stack,
                  position
                };
              }
              var i = position;
              var ch;
              for (; ; ) {
                ch = path8.charAt(i);
                if (i === length || " 	\n\r\v".indexOf(ch) > -1 || Object.prototype.hasOwnProperty.call(operators, ch)) {
                  if (path8.charAt(position) === "$") {
                    name = path8.substring(position + 1, i);
                    position = i;
                    return create("variable", name);
                  } else {
                    name = path8.substring(position, i);
                    position = i;
                    switch (name) {
                      case "or":
                      case "in":
                      case "and":
                        return create("operator", name);
                      case "true":
                        return create("value", true);
                      case "false":
                        return create("value", false);
                      case "null":
                        return create("value", null);
                      default:
                        if (position === length && name === "") {
                          return null;
                        }
                        return create("name", name);
                    }
                  }
                } else {
                  i++;
                }
              }
            };
            return next;
          };
          var parser2 = function(source, recover) {
            var node;
            var lexer;
            var symbol_table = {};
            var errors = [];
            var remainingTokens = function() {
              var remaining = [];
              if (node.id !== "(end)") {
                remaining.push({ type: node.type, value: node.value, position: node.position });
              }
              var nxt = lexer();
              while (nxt !== null) {
                remaining.push(nxt);
                nxt = lexer();
              }
              return remaining;
            };
            var base_symbol = {
              nud: function() {
                var err2 = {
                  code: "S0211",
                  token: this.value,
                  position: this.position
                };
                if (recover) {
                  err2.remaining = remainingTokens();
                  err2.type = "error";
                  errors.push(err2);
                  return err2;
                } else {
                  err2.stack = new Error().stack;
                  throw err2;
                }
              }
            };
            var symbol = function(id, bp) {
              var s = symbol_table[id];
              bp = bp || 0;
              if (s) {
                if (bp >= s.lbp) {
                  s.lbp = bp;
                }
              } else {
                s = Object.create(base_symbol);
                s.id = s.value = id;
                s.lbp = bp;
                symbol_table[id] = s;
              }
              return s;
            };
            var handleError = function(err2) {
              if (recover) {
                err2.remaining = remainingTokens();
                errors.push(err2);
                var symbol2 = symbol_table["(error)"];
                node = Object.create(symbol2);
                node.error = err2;
                node.type = "(error)";
                return node;
              } else {
                err2.stack = new Error().stack;
                throw err2;
              }
            };
            var advance = function(id, infix2) {
              if (id && node.id !== id) {
                var code;
                if (node.id === "(end)") {
                  code = "S0203";
                } else {
                  code = "S0202";
                }
                var err2 = {
                  code,
                  position: node.position,
                  token: node.value,
                  value: id
                };
                return handleError(err2);
              }
              var next_token = lexer(infix2);
              if (next_token === null) {
                node = symbol_table["(end)"];
                node.position = source.length;
                return node;
              }
              var value = next_token.value;
              var type = next_token.type;
              var symbol2;
              switch (type) {
                case "name":
                case "variable":
                  symbol2 = symbol_table["(name)"];
                  break;
                case "operator":
                  symbol2 = symbol_table[value];
                  if (!symbol2) {
                    return handleError({
                      code: "S0204",
                      stack: new Error().stack,
                      position: next_token.position,
                      token: value
                    });
                  }
                  break;
                case "string":
                case "number":
                case "value":
                  symbol2 = symbol_table["(literal)"];
                  break;
                case "regex":
                  type = "regex";
                  symbol2 = symbol_table["(regex)"];
                  break;
                default:
                  return handleError({
                    code: "S0205",
                    stack: new Error().stack,
                    position: next_token.position,
                    token: value
                  });
              }
              node = Object.create(symbol2);
              node.value = value;
              node.type = type;
              node.position = next_token.position;
              return node;
            };
            var expression = function(rbp) {
              var left;
              var t = node;
              advance(null, true);
              left = t.nud();
              while (rbp < node.lbp) {
                t = node;
                advance();
                left = t.led(left);
              }
              return left;
            };
            var terminal = function(id) {
              var s = symbol(id, 0);
              s.nud = function() {
                return this;
              };
            };
            var infix = function(id, bp, led) {
              var bindingPower = bp || operators[id];
              var s = symbol(id, bindingPower);
              s.led = led || function(left) {
                this.lhs = left;
                this.rhs = expression(bindingPower);
                this.type = "binary";
                return this;
              };
              return s;
            };
            var infixr = function(id, bp, led) {
              var s = symbol(id, bp);
              s.led = led;
              return s;
            };
            var prefix = function(id, nud) {
              var s = symbol(id);
              s.nud = nud || function() {
                this.expression = expression(70);
                this.type = "unary";
                return this;
              };
              return s;
            };
            terminal("(end)");
            terminal("(name)");
            terminal("(literal)");
            terminal("(regex)");
            symbol(":");
            symbol(";");
            symbol(",");
            symbol(")");
            symbol("]");
            symbol("}");
            symbol("..");
            infix(".");
            infix("+");
            infix("-");
            infix("*");
            infix("/");
            infix("%");
            infix("=");
            infix("<");
            infix(">");
            infix("!=");
            infix("<=");
            infix(">=");
            infix("&");
            infix("and");
            infix("or");
            infix("in");
            terminal("and");
            terminal("or");
            terminal("in");
            prefix("-");
            infix("~>");
            infixr("(error)", 10, function(left) {
              this.lhs = left;
              this.error = node.error;
              this.remaining = remainingTokens();
              this.type = "error";
              return this;
            });
            prefix("*", function() {
              this.type = "wildcard";
              return this;
            });
            prefix("**", function() {
              this.type = "descendant";
              return this;
            });
            prefix("%", function() {
              this.type = "parent";
              return this;
            });
            infix("(", operators["("], function(left) {
              this.procedure = left;
              this.type = "function";
              this.arguments = [];
              if (node.id !== ")") {
                for (; ; ) {
                  if (node.type === "operator" && node.id === "?") {
                    this.type = "partial";
                    this.arguments.push(node);
                    advance("?");
                  } else {
                    this.arguments.push(expression(0));
                  }
                  if (node.id !== ",")
                    break;
                  advance(",");
                }
              }
              advance(")", true);
              if (left.type === "name" && (left.value === "function" || left.value === "\u03BB")) {
                this.arguments.forEach(function(arg, index) {
                  if (arg.type !== "variable") {
                    return handleError({
                      code: "S0208",
                      stack: new Error().stack,
                      position: arg.position,
                      token: arg.value,
                      value: index + 1
                    });
                  }
                });
                this.type = "lambda";
                if (node.id === "<") {
                  var sigPos = node.position;
                  var depth = 1;
                  var sig = "<";
                  while (depth > 0 && node.id !== "{" && node.id !== "(end)") {
                    var tok = advance();
                    if (tok.id === ">") {
                      depth--;
                    } else if (tok.id === "<") {
                      depth++;
                    }
                    sig += tok.value;
                  }
                  advance(">");
                  try {
                    this.signature = parseSignature(sig);
                  } catch (err2) {
                    err2.position = sigPos + err2.offset;
                    return handleError(err2);
                  }
                }
                advance("{");
                this.body = expression(0);
                advance("}");
              }
              return this;
            });
            prefix("(", function() {
              var expressions = [];
              while (node.id !== ")") {
                expressions.push(expression(0));
                if (node.id !== ";") {
                  break;
                }
                advance(";");
              }
              advance(")", true);
              this.type = "block";
              this.expressions = expressions;
              return this;
            });
            prefix("[", function() {
              var a = [];
              if (node.id !== "]") {
                for (; ; ) {
                  var item = expression(0);
                  if (node.id === "..") {
                    var range = { type: "binary", value: "..", position: node.position, lhs: item };
                    advance("..");
                    range.rhs = expression(0);
                    item = range;
                  }
                  a.push(item);
                  if (node.id !== ",") {
                    break;
                  }
                  advance(",");
                }
              }
              advance("]", true);
              this.expressions = a;
              this.type = "unary";
              return this;
            });
            infix("[", operators["["], function(left) {
              if (node.id === "]") {
                var step = left;
                while (step && step.type === "binary" && step.value === "[") {
                  step = step.lhs;
                }
                step.keepArray = true;
                advance("]");
                return left;
              } else {
                this.lhs = left;
                this.rhs = expression(operators["]"]);
                this.type = "binary";
                advance("]", true);
                return this;
              }
            });
            infix("^", operators["^"], function(left) {
              advance("(");
              var terms = [];
              for (; ; ) {
                var term = {
                  descending: false
                };
                if (node.id === "<") {
                  advance("<");
                } else if (node.id === ">") {
                  term.descending = true;
                  advance(">");
                } else {
                }
                term.expression = expression(0);
                terms.push(term);
                if (node.id !== ",") {
                  break;
                }
                advance(",");
              }
              advance(")");
              this.lhs = left;
              this.rhs = terms;
              this.type = "binary";
              return this;
            });
            var objectParser = function(left) {
              var a = [];
              if (node.id !== "}") {
                for (; ; ) {
                  var n = expression(0);
                  advance(":");
                  var v = expression(0);
                  a.push([n, v]);
                  if (node.id !== ",") {
                    break;
                  }
                  advance(",");
                }
              }
              advance("}", true);
              if (typeof left === "undefined") {
                this.lhs = a;
                this.type = "unary";
              } else {
                this.lhs = left;
                this.rhs = a;
                this.type = "binary";
              }
              return this;
            };
            prefix("{", objectParser);
            infix("{", operators["{"], objectParser);
            infixr(":=", operators[":="], function(left) {
              if (left.type !== "variable") {
                return handleError({
                  code: "S0212",
                  stack: new Error().stack,
                  position: left.position,
                  token: left.value
                });
              }
              this.lhs = left;
              this.rhs = expression(operators[":="] - 1);
              this.type = "binary";
              return this;
            });
            infix("@", operators["@"], function(left) {
              this.lhs = left;
              this.rhs = expression(operators["@"]);
              if (this.rhs.type !== "variable") {
                return handleError({
                  code: "S0214",
                  stack: new Error().stack,
                  position: this.rhs.position,
                  token: "@"
                });
              }
              this.type = "binary";
              return this;
            });
            infix("#", operators["#"], function(left) {
              this.lhs = left;
              this.rhs = expression(operators["#"]);
              if (this.rhs.type !== "variable") {
                return handleError({
                  code: "S0214",
                  stack: new Error().stack,
                  position: this.rhs.position,
                  token: "#"
                });
              }
              this.type = "binary";
              return this;
            });
            infix("?", operators["?"], function(left) {
              this.type = "condition";
              this.condition = left;
              this.then = expression(0);
              if (node.id === ":") {
                advance(":");
                this.else = expression(0);
              }
              return this;
            });
            prefix("|", function() {
              this.type = "transform";
              this.pattern = expression(0);
              advance("|");
              this.update = expression(0);
              if (node.id === ",") {
                advance(",");
                this.delete = expression(0);
              }
              advance("|");
              return this;
            });
            var tailCallOptimize = function(expr2) {
              var result;
              if (expr2.type === "function" && !expr2.predicate) {
                var thunk = { type: "lambda", thunk: true, arguments: [], position: expr2.position };
                thunk.body = expr2;
                result = thunk;
              } else if (expr2.type === "condition") {
                expr2.then = tailCallOptimize(expr2.then);
                if (typeof expr2.else !== "undefined") {
                  expr2.else = tailCallOptimize(expr2.else);
                }
                result = expr2;
              } else if (expr2.type === "block") {
                var length = expr2.expressions.length;
                if (length > 0) {
                  expr2.expressions[length - 1] = tailCallOptimize(expr2.expressions[length - 1]);
                }
                result = expr2;
              } else {
                result = expr2;
              }
              return result;
            };
            var ancestorLabel = 0;
            var ancestorIndex = 0;
            var ancestry = [];
            var seekParent = function(node2, slot) {
              switch (node2.type) {
                case "name":
                case "wildcard":
                  slot.level--;
                  if (slot.level === 0) {
                    if (typeof node2.ancestor === "undefined") {
                      node2.ancestor = slot;
                    } else {
                      ancestry[slot.index].slot.label = node2.ancestor.label;
                      node2.ancestor = slot;
                    }
                    node2.tuple = true;
                  }
                  break;
                case "parent":
                  slot.level++;
                  break;
                case "block":
                  if (node2.expressions.length > 0) {
                    node2.tuple = true;
                    slot = seekParent(node2.expressions[node2.expressions.length - 1], slot);
                  }
                  break;
                case "path":
                  node2.tuple = true;
                  var index = node2.steps.length - 1;
                  slot = seekParent(node2.steps[index--], slot);
                  while (slot.level > 0 && index >= 0) {
                    slot = seekParent(node2.steps[index--], slot);
                  }
                  break;
                default:
                  throw {
                    code: "S0217",
                    token: node2.type,
                    position: node2.position
                  };
              }
              return slot;
            };
            var pushAncestry = function(result, value) {
              if (typeof value.seekingParent !== "undefined" || value.type === "parent") {
                var slots = typeof value.seekingParent !== "undefined" ? value.seekingParent : [];
                if (value.type === "parent") {
                  slots.push(value.slot);
                }
                if (typeof result.seekingParent === "undefined") {
                  result.seekingParent = slots;
                } else {
                  Array.prototype.push.apply(result.seekingParent, slots);
                }
              }
            };
            var resolveAncestry = function(path8) {
              var index = path8.steps.length - 1;
              var laststep = path8.steps[index];
              var slots = typeof laststep.seekingParent !== "undefined" ? laststep.seekingParent : [];
              if (laststep.type === "parent") {
                slots.push(laststep.slot);
              }
              for (var is = 0; is < slots.length; is++) {
                var slot = slots[is];
                index = path8.steps.length - 2;
                while (slot.level > 0) {
                  if (index < 0) {
                    if (typeof path8.seekingParent === "undefined") {
                      path8.seekingParent = [slot];
                    } else {
                      path8.seekingParent.push(slot);
                    }
                    break;
                  }
                  var step = path8.steps[index--];
                  while (index >= 0 && step.focus && path8.steps[index].focus) {
                    step = path8.steps[index--];
                  }
                  slot = seekParent(step, slot);
                }
              }
            };
            var processAST = function(expr2) {
              var result;
              switch (expr2.type) {
                case "binary":
                  switch (expr2.value) {
                    case ".":
                      var lstep = processAST(expr2.lhs);
                      if (lstep.type === "path") {
                        result = lstep;
                      } else {
                        result = { type: "path", steps: [lstep] };
                      }
                      if (lstep.type === "parent") {
                        result.seekingParent = [lstep.slot];
                      }
                      var rest = processAST(expr2.rhs);
                      if (rest.type === "function" && rest.procedure.type === "path" && rest.procedure.steps.length === 1 && rest.procedure.steps[0].type === "name" && result.steps[result.steps.length - 1].type === "function") {
                        result.steps[result.steps.length - 1].nextFunction = rest.procedure.steps[0].value;
                      }
                      if (rest.type === "path") {
                        Array.prototype.push.apply(result.steps, rest.steps);
                      } else {
                        if (typeof rest.predicate !== "undefined") {
                          rest.stages = rest.predicate;
                          delete rest.predicate;
                        }
                        result.steps.push(rest);
                      }
                      result.steps.filter(function(step2) {
                        if (step2.type === "number" || step2.type === "value") {
                          throw {
                            code: "S0213",
                            stack: new Error().stack,
                            position: step2.position,
                            value: step2.value
                          };
                        }
                        return step2.type === "string";
                      }).forEach(function(lit) {
                        lit.type = "name";
                      });
                      if (result.steps.filter(function(step2) {
                        return step2.keepArray === true;
                      }).length > 0) {
                        result.keepSingletonArray = true;
                      }
                      var firststep = result.steps[0];
                      if (firststep.type === "unary" && firststep.value === "[") {
                        firststep.consarray = true;
                      }
                      var laststep = result.steps[result.steps.length - 1];
                      if (laststep.type === "unary" && laststep.value === "[") {
                        laststep.consarray = true;
                      }
                      resolveAncestry(result);
                      break;
                    case "[":
                      result = processAST(expr2.lhs);
                      var step = result;
                      var type = "predicate";
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                        type = "stages";
                      }
                      if (typeof step.group !== "undefined") {
                        throw {
                          code: "S0209",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (typeof step[type] === "undefined") {
                        step[type] = [];
                      }
                      var predicate = processAST(expr2.rhs);
                      if (typeof predicate.seekingParent !== "undefined") {
                        predicate.seekingParent.forEach((slot) => {
                          if (slot.level === 1) {
                            seekParent(step, slot);
                          } else {
                            slot.level--;
                          }
                        });
                        pushAncestry(step, predicate);
                      }
                      step[type].push({ type: "filter", expr: predicate, position: expr2.position });
                      break;
                    case "{":
                      result = processAST(expr2.lhs);
                      if (typeof result.group !== "undefined") {
                        throw {
                          code: "S0210",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      result.group = {
                        lhs: expr2.rhs.map(function(pair) {
                          return [processAST(pair[0]), processAST(pair[1])];
                        }),
                        position: expr2.position
                      };
                      break;
                    case "^":
                      result = processAST(expr2.lhs);
                      if (result.type !== "path") {
                        result = { type: "path", steps: [result] };
                      }
                      var sortStep = { type: "sort", position: expr2.position };
                      sortStep.terms = expr2.rhs.map(function(terms) {
                        var expression2 = processAST(terms.expression);
                        pushAncestry(sortStep, expression2);
                        return {
                          descending: terms.descending,
                          expression: expression2
                        };
                      });
                      result.steps.push(sortStep);
                      resolveAncestry(result);
                      break;
                    case ":=":
                      result = { type: "bind", value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      pushAncestry(result, result.rhs);
                      break;
                    case "@":
                      result = processAST(expr2.lhs);
                      step = result;
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                      }
                      if (typeof step.stages !== "undefined" || typeof step.predicate !== "undefined") {
                        throw {
                          code: "S0215",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (step.type === "sort") {
                        throw {
                          code: "S0216",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (expr2.keepArray) {
                        step.keepArray = true;
                      }
                      step.focus = expr2.rhs.value;
                      step.tuple = true;
                      break;
                    case "#":
                      result = processAST(expr2.lhs);
                      step = result;
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                      } else {
                        result = { type: "path", steps: [result] };
                        if (typeof step.predicate !== "undefined") {
                          step.stages = step.predicate;
                          delete step.predicate;
                        }
                      }
                      if (typeof step.stages === "undefined") {
                        step.index = expr2.rhs.value;
                      } else {
                        step.stages.push({ type: "index", value: expr2.rhs.value, position: expr2.position });
                      }
                      step.tuple = true;
                      break;
                    case "~>":
                      result = { type: "apply", value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      break;
                    default:
                      result = { type: expr2.type, value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      pushAncestry(result, result.lhs);
                      pushAncestry(result, result.rhs);
                  }
                  break;
                case "unary":
                  result = { type: expr2.type, value: expr2.value, position: expr2.position };
                  if (expr2.value === "[") {
                    result.expressions = expr2.expressions.map(function(item) {
                      var value = processAST(item);
                      pushAncestry(result, value);
                      return value;
                    });
                  } else if (expr2.value === "{") {
                    result.lhs = expr2.lhs.map(function(pair) {
                      var key2 = processAST(pair[0]);
                      pushAncestry(result, key2);
                      var value = processAST(pair[1]);
                      pushAncestry(result, value);
                      return [key2, value];
                    });
                  } else {
                    result.expression = processAST(expr2.expression);
                    if (expr2.value === "-" && result.expression.type === "number") {
                      result = result.expression;
                      result.value = -result.value;
                    } else {
                      pushAncestry(result, result.expression);
                    }
                  }
                  break;
                case "function":
                case "partial":
                  result = { type: expr2.type, name: expr2.name, value: expr2.value, position: expr2.position };
                  result.arguments = expr2.arguments.map(function(arg) {
                    var argAST = processAST(arg);
                    pushAncestry(result, argAST);
                    return argAST;
                  });
                  result.procedure = processAST(expr2.procedure);
                  break;
                case "lambda":
                  result = {
                    type: expr2.type,
                    arguments: expr2.arguments,
                    signature: expr2.signature,
                    position: expr2.position
                  };
                  var body = processAST(expr2.body);
                  result.body = tailCallOptimize(body);
                  break;
                case "condition":
                  result = { type: expr2.type, position: expr2.position };
                  result.condition = processAST(expr2.condition);
                  pushAncestry(result, result.condition);
                  result.then = processAST(expr2.then);
                  pushAncestry(result, result.then);
                  if (typeof expr2.else !== "undefined") {
                    result.else = processAST(expr2.else);
                    pushAncestry(result, result.else);
                  }
                  break;
                case "transform":
                  result = { type: expr2.type, position: expr2.position };
                  result.pattern = processAST(expr2.pattern);
                  result.update = processAST(expr2.update);
                  if (typeof expr2.delete !== "undefined") {
                    result.delete = processAST(expr2.delete);
                  }
                  break;
                case "block":
                  result = { type: expr2.type, position: expr2.position };
                  result.expressions = expr2.expressions.map(function(item) {
                    var part = processAST(item);
                    pushAncestry(result, part);
                    if (part.consarray || part.type === "path" && part.steps[0].consarray) {
                      result.consarray = true;
                    }
                    return part;
                  });
                  break;
                case "name":
                  result = { type: "path", steps: [expr2] };
                  if (expr2.keepArray) {
                    result.keepSingletonArray = true;
                  }
                  break;
                case "parent":
                  result = { type: "parent", slot: { label: "!" + ancestorLabel++, level: 1, index: ancestorIndex++ } };
                  ancestry.push(result);
                  break;
                case "string":
                case "number":
                case "value":
                case "wildcard":
                case "descendant":
                case "variable":
                case "regex":
                  result = expr2;
                  break;
                case "operator":
                  if (expr2.value === "and" || expr2.value === "or" || expr2.value === "in") {
                    expr2.type = "name";
                    result = processAST(expr2);
                  } else if (expr2.value === "?") {
                    result = expr2;
                  } else {
                    throw {
                      code: "S0201",
                      stack: new Error().stack,
                      position: expr2.position,
                      token: expr2.value
                    };
                  }
                  break;
                case "error":
                  result = expr2;
                  if (expr2.lhs) {
                    result = processAST(expr2.lhs);
                  }
                  break;
                default:
                  var code = "S0206";
                  if (expr2.id === "(end)") {
                    code = "S0207";
                  }
                  var err2 = {
                    code,
                    position: expr2.position,
                    token: expr2.value
                  };
                  if (recover) {
                    errors.push(err2);
                    return { type: "error", error: err2 };
                  } else {
                    err2.stack = new Error().stack;
                    throw err2;
                  }
              }
              if (expr2.keepArray) {
                result.keepArray = true;
              }
              return result;
            };
            lexer = tokenizer(source);
            advance();
            var expr = expression(0);
            if (node.id !== "(end)") {
              var err = {
                code: "S0201",
                position: node.position,
                token: node.value
              };
              handleError(err);
            }
            expr = processAST(expr);
            if (expr.type === "parent" || typeof expr.seekingParent !== "undefined") {
              throw {
                code: "S0217",
                token: expr.type,
                position: expr.position
              };
            }
            if (errors.length > 0) {
              expr.errors = errors;
            }
            return expr;
          };
          return parser2;
        })();
        module4.exports = parser;
      }, { "./signature": 5 }], 5: [function(require2, module4, exports4) {
        var utils = require2("./utils");
        const signature = (() => {
          "use strict";
          var arraySignatureMapping = {
            "a": "arrays",
            "b": "booleans",
            "f": "functions",
            "n": "numbers",
            "o": "objects",
            "s": "strings"
          };
          function parseSignature(signature2) {
            var position = 1;
            var params = [];
            var param = {};
            var prevParam = param;
            while (position < signature2.length) {
              var symbol = signature2.charAt(position);
              if (symbol === ":") {
                break;
              }
              var next = function() {
                params.push(param);
                prevParam = param;
                param = {};
              };
              var findClosingBracket = function(str, start, openSymbol, closeSymbol) {
                var depth = 1;
                var position2 = start;
                while (position2 < str.length) {
                  position2++;
                  symbol = str.charAt(position2);
                  if (symbol === closeSymbol) {
                    depth--;
                    if (depth === 0) {
                      break;
                    }
                  } else if (symbol === openSymbol) {
                    depth++;
                  }
                }
                return position2;
              };
              switch (symbol) {
                case "s":
                case "n":
                case "b":
                case "l":
                case "o":
                  param.regex = "[" + symbol + "m]";
                  param.type = symbol;
                  next();
                  break;
                case "a":
                  param.regex = "[asnblfom]";
                  param.type = symbol;
                  param.array = true;
                  next();
                  break;
                case "f":
                  param.regex = "f";
                  param.type = symbol;
                  next();
                  break;
                case "j":
                  param.regex = "[asnblom]";
                  param.type = symbol;
                  next();
                  break;
                case "x":
                  param.regex = "[asnblfom]";
                  param.type = symbol;
                  next();
                  break;
                case "-":
                  prevParam.context = true;
                  prevParam.contextRegex = new RegExp(prevParam.regex);
                  prevParam.regex += "?";
                  break;
                case "?":
                case "+":
                  prevParam.regex += symbol;
                  break;
                case "(":
                  var endParen = findClosingBracket(signature2, position, "(", ")");
                  var choice = signature2.substring(position + 1, endParen);
                  if (choice.indexOf("<") === -1) {
                    param.regex = "[" + choice + "m]";
                  } else {
                    throw {
                      code: "S0402",
                      stack: new Error().stack,
                      value: choice,
                      offset: position
                    };
                  }
                  param.type = "(" + choice + ")";
                  position = endParen;
                  next();
                  break;
                case "<":
                  if (prevParam.type === "a" || prevParam.type === "f") {
                    var endPos = findClosingBracket(signature2, position, "<", ">");
                    prevParam.subtype = signature2.substring(position + 1, endPos);
                    position = endPos;
                  } else {
                    throw {
                      code: "S0401",
                      stack: new Error().stack,
                      value: prevParam.type,
                      offset: position
                    };
                  }
                  break;
              }
              position++;
            }
            var regexStr = "^" + params.map(function(param2) {
              return "(" + param2.regex + ")";
            }).join("") + "$";
            var regex = new RegExp(regexStr);
            var getSymbol = function(value) {
              var symbol2;
              if (utils.isFunction(value)) {
                symbol2 = "f";
              } else {
                var type = typeof value;
                switch (type) {
                  case "string":
                    symbol2 = "s";
                    break;
                  case "number":
                    symbol2 = "n";
                    break;
                  case "boolean":
                    symbol2 = "b";
                    break;
                  case "object":
                    if (value === null) {
                      symbol2 = "l";
                    } else if (Array.isArray(value)) {
                      symbol2 = "a";
                    } else {
                      symbol2 = "o";
                    }
                    break;
                  case "undefined":
                  default:
                    symbol2 = "m";
                }
              }
              return symbol2;
            };
            var throwValidationError = function(badArgs, badSig) {
              var partialPattern = "^";
              var goodTo = 0;
              for (var index = 0; index < params.length; index++) {
                partialPattern += params[index].regex;
                var match = badSig.match(partialPattern);
                if (match === null) {
                  throw {
                    code: "T0410",
                    stack: new Error().stack,
                    value: badArgs[goodTo],
                    index: goodTo + 1
                  };
                }
                goodTo = match[0].length;
              }
              throw {
                code: "T0410",
                stack: new Error().stack,
                value: badArgs[goodTo],
                index: goodTo + 1
              };
            };
            return {
              definition: signature2,
              validate: function(args, context) {
                var suppliedSig = "";
                args.forEach(function(arg) {
                  suppliedSig += getSymbol(arg);
                });
                var isValid = regex.exec(suppliedSig);
                if (isValid) {
                  var validatedArgs = [];
                  var argIndex = 0;
                  params.forEach(function(param2, index) {
                    var arg = args[argIndex];
                    var match = isValid[index + 1];
                    if (match === "") {
                      if (param2.context && param2.contextRegex) {
                        var contextType = getSymbol(context);
                        if (param2.contextRegex.test(contextType)) {
                          validatedArgs.push(context);
                        } else {
                          throw {
                            code: "T0411",
                            stack: new Error().stack,
                            value: context,
                            index: argIndex + 1
                          };
                        }
                      } else {
                        validatedArgs.push(arg);
                        argIndex++;
                      }
                    } else {
                      match.split("").forEach(function(single) {
                        if (param2.type === "a") {
                          if (single === "m") {
                            arg = void 0;
                          } else {
                            arg = args[argIndex];
                            var arrayOK = true;
                            if (typeof param2.subtype !== "undefined") {
                              if (single !== "a" && match !== param2.subtype) {
                                arrayOK = false;
                              } else if (single === "a") {
                                if (arg.length > 0) {
                                  var itemType = getSymbol(arg[0]);
                                  if (itemType !== param2.subtype.charAt(0)) {
                                    arrayOK = false;
                                  } else {
                                    var differentItems = arg.filter(function(val) {
                                      return getSymbol(val) !== itemType;
                                    });
                                    arrayOK = differentItems.length === 0;
                                  }
                                }
                              }
                            }
                            if (!arrayOK) {
                              throw {
                                code: "T0412",
                                stack: new Error().stack,
                                value: arg,
                                index: argIndex + 1,
                                type: arraySignatureMapping[param2.subtype]
                              };
                            }
                            if (single !== "a") {
                              arg = [arg];
                            }
                          }
                          validatedArgs.push(arg);
                          argIndex++;
                        } else {
                          validatedArgs.push(arg);
                          argIndex++;
                        }
                      });
                    }
                  });
                  return validatedArgs;
                }
                throwValidationError(args, suppliedSig);
              }
            };
          }
          return parseSignature;
        })();
        module4.exports = signature;
      }, { "./utils": 6 }], 6: [function(require2, module4, exports4) {
        const utils = (() => {
          "use strict";
          function isNumeric(n) {
            var isNum = false;
            if (typeof n === "number") {
              isNum = !isNaN(n);
              if (isNum && !isFinite(n)) {
                throw {
                  code: "D1001",
                  value: n,
                  stack: new Error().stack
                };
              }
            }
            return isNum;
          }
          function isArrayOfStrings(arg) {
            var result = false;
            if (Array.isArray(arg)) {
              result = arg.filter(function(item) {
                return typeof item !== "string";
              }).length === 0;
            }
            return result;
          }
          function isArrayOfNumbers(arg) {
            var result = false;
            if (Array.isArray(arg)) {
              result = arg.filter(function(item) {
                return !isNumeric(item);
              }).length === 0;
            }
            return result;
          }
          function createSequence() {
            var sequence = [];
            sequence.sequence = true;
            if (arguments.length === 1) {
              sequence.push(arguments[0]);
            }
            return sequence;
          }
          function isSequence(value) {
            return value.sequence === true && Array.isArray(value);
          }
          function isFunction(arg) {
            return arg && (arg._jsonata_function === true || arg._jsonata_lambda === true) || typeof arg === "function";
          }
          function getFunctionArity(func) {
            var arity = typeof func.arity === "number" ? func.arity : typeof func.implementation === "function" ? func.implementation.length : typeof func.length === "number" ? func.length : func.arguments.length;
            return arity;
          }
          function isLambda(arg) {
            return arg && arg._jsonata_lambda === true;
          }
          var $Symbol = typeof Symbol === "function" ? Symbol : {};
          var iteratorSymbol = $Symbol.iterator || "@@iterator";
          function isIterable(arg) {
            return typeof arg === "object" && arg !== null && iteratorSymbol in arg && "next" in arg && typeof arg.next === "function";
          }
          function isDeepEqual(lhs, rhs) {
            if (lhs === rhs) {
              return true;
            }
            if (typeof lhs === "object" && typeof rhs === "object" && lhs !== null && rhs !== null) {
              if (Array.isArray(lhs) && Array.isArray(rhs)) {
                if (lhs.length !== rhs.length) {
                  return false;
                }
                for (var ii = 0; ii < lhs.length; ii++) {
                  if (!isDeepEqual(lhs[ii], rhs[ii])) {
                    return false;
                  }
                }
                return true;
              }
              var lkeys = Object.getOwnPropertyNames(lhs);
              var rkeys = Object.getOwnPropertyNames(rhs);
              if (lkeys.length !== rkeys.length) {
                return false;
              }
              lkeys = lkeys.sort();
              rkeys = rkeys.sort();
              for (ii = 0; ii < lkeys.length; ii++) {
                if (lkeys[ii] !== rkeys[ii]) {
                  return false;
                }
              }
              for (ii = 0; ii < lkeys.length; ii++) {
                var key2 = lkeys[ii];
                if (!isDeepEqual(lhs[key2], rhs[key2])) {
                  return false;
                }
              }
              return true;
            }
            return false;
          }
          function stringToArray(str) {
            var arr = [];
            for (let char of str) {
              arr.push(char);
            }
            return arr;
          }
          return {
            isNumeric,
            isArrayOfStrings,
            isArrayOfNumbers,
            createSequence,
            isSequence,
            isFunction,
            isLambda,
            isIterable,
            getFunctionArity,
            isDeepEqual,
            stringToArray
          };
        })();
        module4.exports = utils;
      }, {}] }, {}, [3])(3);
    });
  }
});

// ../plugins/markdown/dist/wanderer-markdown.js
var require_wanderer_markdown = __commonJS2({
  "../plugins/markdown/dist/wanderer-markdown.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __esm = (fn, res) => function __init() {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    };
    var __commonJS = (cb, mod) => function __require2() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key2) && key2 !== except)
            __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var require_upath = __commonJS({
      "../../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js"(exports2) {
        var VERSION = "1.2.0";
        var extraFn;
        var extraFunctions;
        var isFunction;
        var isString;
        var isValidExt;
        var name;
        var path52;
        var propName;
        var propValue;
        var toUnix;
        var upath;
        var slice = [].slice;
        var indexOf = [].indexOf || function(item) {
          for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
              return i;
          }
          return -1;
        };
        var hasProp = {}.hasOwnProperty;
        path52 = __require("path");
        isFunction = function(val) {
          return val instanceof Function;
        };
        isString = function(val) {
          return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
        };
        upath = exports2;
        upath.VERSION = typeof VERSION !== "undefined" && VERSION !== null ? VERSION : "NO-VERSION";
        toUnix = function(p) {
          var double;
          p = p.replace(/\\/g, "/");
          double = /\/\//;
          while (p.match(double)) {
            p = p.replace(double, "/");
          }
          return p;
        };
        for (propName in path52) {
          propValue = path52[propName];
          if (isFunction(propValue)) {
            upath[propName] = function(propName2) {
              return function() {
                var args, result;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                args = args.map(function(p) {
                  if (isString(p)) {
                    return toUnix(p);
                  } else {
                    return p;
                  }
                });
                result = path52[propName2].apply(path52, args);
                if (isString(result)) {
                  return toUnix(result);
                } else {
                  return result;
                }
              };
            }(propName);
          } else {
            upath[propName] = propValue;
          }
        }
        upath.sep = "/";
        extraFunctions = {
          toUnix,
          normalizeSafe: function(p) {
            p = toUnix(p);
            if (p.startsWith("./")) {
              if (p.startsWith("./..") || p === "./") {
                return upath.normalize(p);
              } else {
                return "./" + upath.normalize(p);
              }
            } else {
              return upath.normalize(p);
            }
          },
          normalizeTrim: function(p) {
            p = upath.normalizeSafe(p);
            if (p.endsWith("/")) {
              return p.slice(0, +(p.length - 2) + 1 || 9e9);
            } else {
              return p;
            }
          },
          joinSafe: function() {
            var p, result;
            p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            result = upath.join.apply(null, p);
            if (p[0].startsWith("./") && !result.startsWith("./")) {
              result = "./" + result;
            }
            return result;
          },
          addExt: function(file, ext) {
            if (!ext) {
              return file;
            } else {
              if (ext[0] !== ".") {
                ext = "." + ext;
              }
              return file + (file.endsWith(ext) ? "" : ext);
            }
          },
          trimExt: function(filename, ignoreExts, maxSize) {
            var oldExt;
            if (maxSize == null) {
              maxSize = 7;
            }
            oldExt = upath.extname(filename);
            if (isValidExt(oldExt, ignoreExts, maxSize)) {
              return filename.slice(0, +(filename.length - oldExt.length - 1) + 1 || 9e9);
            } else {
              return filename;
            }
          },
          removeExt: function(filename, ext) {
            if (!ext) {
              return filename;
            } else {
              ext = ext[0] === "." ? ext : "." + ext;
              if (upath.extname(filename) === ext) {
                return upath.trimExt(filename);
              } else {
                return filename;
              }
            }
          },
          changeExt: function(filename, ext, ignoreExts, maxSize) {
            if (maxSize == null) {
              maxSize = 7;
            }
            return upath.trimExt(filename, ignoreExts, maxSize) + (!ext ? "" : ext[0] === "." ? ext : "." + ext);
          },
          defaultExt: function(filename, ext, ignoreExts, maxSize) {
            var oldExt;
            if (maxSize == null) {
              maxSize = 7;
            }
            oldExt = upath.extname(filename);
            if (isValidExt(oldExt, ignoreExts, maxSize)) {
              return filename;
            } else {
              return upath.addExt(filename, ext);
            }
          }
        };
        isValidExt = function(ext, ignoreExts, maxSize) {
          if (ignoreExts == null) {
            ignoreExts = [];
          }
          return ext && ext.length <= maxSize && indexOf.call(ignoreExts.map(function(e) {
            return (e && e[0] !== "." ? "." : "") + e;
          }), ext) < 0;
        };
        for (name in extraFunctions) {
          if (!hasProp.call(extraFunctions, name))
            continue;
          extraFn = extraFunctions[name];
          if (upath[name] !== void 0) {
            throw new Error("path." + name + " already exists.");
          } else {
            upath[name] = extraFn;
          }
        }
      }
    });
    var require_dayjs_min = __commonJS({
      "../../node_modules/.pnpm/dayjs@1.11.4/node_modules/dayjs/dayjs.min.js"(exports2, module2) {
        !function(t, e) {
          "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
        }(exports2, function() {
          "use strict";
          var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o2 = "week", f = "month", h = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
            var r2 = String(t2);
            return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
          }, g = { s: m, z: function(t2) {
            var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
            return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
          }, m: function t2(e2, n2) {
            if (e2.date() < n2.date())
              return -t2(n2, e2);
            var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
            return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
          }, a: function(t2) {
            return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
          }, p: function(t2) {
            return { M: f, y: c, w: o2, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
          }, u: function(t2) {
            return void 0 === t2;
          } }, v = "en", D = {};
          D[v] = M;
          var p = function(t2) {
            return t2 instanceof _;
          }, S = function t2(e2, n2, r2) {
            var i2;
            if (!e2)
              return v;
            if ("string" == typeof e2) {
              var s2 = e2.toLowerCase();
              D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
              var u2 = e2.split("-");
              if (!i2 && u2.length > 1)
                return t2(u2[0]);
            } else {
              var a2 = e2.name;
              D[a2] = e2, i2 = a2;
            }
            return !r2 && i2 && (v = i2), i2 || !r2 && v;
          }, w = function(t2, e2) {
            if (p(t2))
              return t2.clone();
            var n2 = "object" == typeof e2 ? e2 : {};
            return n2.date = t2, n2.args = arguments, new _(n2);
          }, O = g;
          O.l = S, O.i = p, O.w = function(t2, e2) {
            return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
          };
          var _ = function() {
            function M2(t2) {
              this.$L = S(t2.locale, null, true), this.parse(t2);
            }
            var m2 = M2.prototype;
            return m2.parse = function(t2) {
              this.$d = function(t3) {
                var e2 = t3.date, n2 = t3.utc;
                if (null === e2)
                  return new Date(NaN);
                if (O.u(e2))
                  return new Date();
                if (e2 instanceof Date)
                  return new Date(e2);
                if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                  var r2 = e2.match(l);
                  if (r2) {
                    var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                    return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                  }
                }
                return new Date(e2);
              }(t2), this.$x = t2.x || {}, this.init();
            }, m2.init = function() {
              var t2 = this.$d;
              this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
            }, m2.$utils = function() {
              return O;
            }, m2.isValid = function() {
              return !(this.$d.toString() === $);
            }, m2.isSame = function(t2, e2) {
              var n2 = w(t2);
              return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
            }, m2.isAfter = function(t2, e2) {
              return w(t2) < this.startOf(e2);
            }, m2.isBefore = function(t2, e2) {
              return this.endOf(e2) < w(t2);
            }, m2.$g = function(t2, e2, n2) {
              return O.u(t2) ? this[e2] : this.set(n2, t2);
            }, m2.unix = function() {
              return Math.floor(this.valueOf() / 1e3);
            }, m2.valueOf = function() {
              return this.$d.getTime();
            }, m2.startOf = function(t2, e2) {
              var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), $2 = function(t3, e3) {
                var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
                return r2 ? i2 : i2.endOf(a);
              }, l2 = function(t3, e3) {
                return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
              }, y2 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
              switch (h2) {
                case c:
                  return r2 ? $2(1, 0) : $2(31, 11);
                case f:
                  return r2 ? $2(1, M3) : $2(0, M3 + 1);
                case o2:
                  var v2 = this.$locale().weekStart || 0, D2 = (y2 < v2 ? y2 + 7 : y2) - v2;
                  return $2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
                case a:
                case d:
                  return l2(g2 + "Hours", 0);
                case u:
                  return l2(g2 + "Minutes", 1);
                case s:
                  return l2(g2 + "Seconds", 2);
                case i:
                  return l2(g2 + "Milliseconds", 3);
                default:
                  return this.clone();
              }
            }, m2.endOf = function(t2) {
              return this.startOf(t2, false);
            }, m2.$set = function(t2, e2) {
              var n2, o3 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), $2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o3], l2 = o3 === a ? this.$D + (e2 - this.$W) : e2;
              if (o3 === f || o3 === c) {
                var y2 = this.clone().set(d, 1);
                y2.$d[$2](l2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
              } else
                $2 && this.$d[$2](l2);
              return this.init(), this;
            }, m2.set = function(t2, e2) {
              return this.clone().$set(t2, e2);
            }, m2.get = function(t2) {
              return this[O.p(t2)]();
            }, m2.add = function(r2, h2) {
              var d2, $2 = this;
              r2 = Number(r2);
              var l2 = O.p(h2), y2 = function(t2) {
                var e2 = w($2);
                return O.w(e2.date(e2.date() + Math.round(t2 * r2)), $2);
              };
              if (l2 === f)
                return this.set(f, this.$M + r2);
              if (l2 === c)
                return this.set(c, this.$y + r2);
              if (l2 === a)
                return y2(1);
              if (l2 === o2)
                return y2(7);
              var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r2 * M3;
              return O.w(m3, this);
            }, m2.subtract = function(t2, e2) {
              return this.add(-1 * t2, e2);
            }, m2.format = function(t2) {
              var e2 = this, n2 = this.$locale();
              if (!this.isValid())
                return n2.invalidDate || $;
              var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o3 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
                return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
              }, c2 = function(t3) {
                return O.s(s2 % 12 || 12, t3, "0");
              }, d2 = n2.meridiem || function(t3, e3, n3) {
                var r3 = t3 < 12 ? "AM" : "PM";
                return n3 ? r3.toLowerCase() : r3;
              }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o3, 2), ddd: h2(n2.weekdaysShort, this.$W, o3, 3), dddd: o3[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
              return r2.replace(y, function(t3, e3) {
                return e3 || l2[t3] || i2.replace(":", "");
              });
            }, m2.utcOffset = function() {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }, m2.diff = function(r2, d2, $2) {
              var l2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, v2 = O.m(this, M3);
              return v2 = (l2 = {}, l2[c] = v2 / 12, l2[f] = v2, l2[h] = v2 / 3, l2[o2] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y2] || g2, $2 ? v2 : O.a(v2);
            }, m2.daysInMonth = function() {
              return this.endOf(f).$D;
            }, m2.$locale = function() {
              return D[this.$L];
            }, m2.locale = function(t2, e2) {
              if (!t2)
                return this.$L;
              var n2 = this.clone(), r2 = S(t2, e2, true);
              return r2 && (n2.$L = r2), n2;
            }, m2.clone = function() {
              return O.w(this.$d, this);
            }, m2.toDate = function() {
              return new Date(this.valueOf());
            }, m2.toJSON = function() {
              return this.isValid() ? this.toISOString() : null;
            }, m2.toISOString = function() {
              return this.$d.toISOString();
            }, m2.toString = function() {
              return this.$d.toUTCString();
            }, M2;
          }(), T = _.prototype;
          return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
            T[t2[1]] = function(e2) {
              return this.$g(e2, t2[0], t2[1]);
            };
          }), w.extend = function(t2, e2) {
            return t2.$i || (t2(e2, _, w), t2.$i = true), w;
          }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
            return w(1e3 * t2);
          }, w.en = D[v], w.Ls = D, w.p = {}, w;
        });
      }
    });
    var characterEntities;
    var init_character_entities = __esm({
      "../../node_modules/.pnpm/character-entities@2.0.2/node_modules/character-entities/index.js"() {
        characterEntities = {
          AElig: "\xC6",
          AMP: "&",
          Aacute: "\xC1",
          Abreve: "\u0102",
          Acirc: "\xC2",
          Acy: "\u0410",
          Afr: "\u{1D504}",
          Agrave: "\xC0",
          Alpha: "\u0391",
          Amacr: "\u0100",
          And: "\u2A53",
          Aogon: "\u0104",
          Aopf: "\u{1D538}",
          ApplyFunction: "\u2061",
          Aring: "\xC5",
          Ascr: "\u{1D49C}",
          Assign: "\u2254",
          Atilde: "\xC3",
          Auml: "\xC4",
          Backslash: "\u2216",
          Barv: "\u2AE7",
          Barwed: "\u2306",
          Bcy: "\u0411",
          Because: "\u2235",
          Bernoullis: "\u212C",
          Beta: "\u0392",
          Bfr: "\u{1D505}",
          Bopf: "\u{1D539}",
          Breve: "\u02D8",
          Bscr: "\u212C",
          Bumpeq: "\u224E",
          CHcy: "\u0427",
          COPY: "\xA9",
          Cacute: "\u0106",
          Cap: "\u22D2",
          CapitalDifferentialD: "\u2145",
          Cayleys: "\u212D",
          Ccaron: "\u010C",
          Ccedil: "\xC7",
          Ccirc: "\u0108",
          Cconint: "\u2230",
          Cdot: "\u010A",
          Cedilla: "\xB8",
          CenterDot: "\xB7",
          Cfr: "\u212D",
          Chi: "\u03A7",
          CircleDot: "\u2299",
          CircleMinus: "\u2296",
          CirclePlus: "\u2295",
          CircleTimes: "\u2297",
          ClockwiseContourIntegral: "\u2232",
          CloseCurlyDoubleQuote: "\u201D",
          CloseCurlyQuote: "\u2019",
          Colon: "\u2237",
          Colone: "\u2A74",
          Congruent: "\u2261",
          Conint: "\u222F",
          ContourIntegral: "\u222E",
          Copf: "\u2102",
          Coproduct: "\u2210",
          CounterClockwiseContourIntegral: "\u2233",
          Cross: "\u2A2F",
          Cscr: "\u{1D49E}",
          Cup: "\u22D3",
          CupCap: "\u224D",
          DD: "\u2145",
          DDotrahd: "\u2911",
          DJcy: "\u0402",
          DScy: "\u0405",
          DZcy: "\u040F",
          Dagger: "\u2021",
          Darr: "\u21A1",
          Dashv: "\u2AE4",
          Dcaron: "\u010E",
          Dcy: "\u0414",
          Del: "\u2207",
          Delta: "\u0394",
          Dfr: "\u{1D507}",
          DiacriticalAcute: "\xB4",
          DiacriticalDot: "\u02D9",
          DiacriticalDoubleAcute: "\u02DD",
          DiacriticalGrave: "`",
          DiacriticalTilde: "\u02DC",
          Diamond: "\u22C4",
          DifferentialD: "\u2146",
          Dopf: "\u{1D53B}",
          Dot: "\xA8",
          DotDot: "\u20DC",
          DotEqual: "\u2250",
          DoubleContourIntegral: "\u222F",
          DoubleDot: "\xA8",
          DoubleDownArrow: "\u21D3",
          DoubleLeftArrow: "\u21D0",
          DoubleLeftRightArrow: "\u21D4",
          DoubleLeftTee: "\u2AE4",
          DoubleLongLeftArrow: "\u27F8",
          DoubleLongLeftRightArrow: "\u27FA",
          DoubleLongRightArrow: "\u27F9",
          DoubleRightArrow: "\u21D2",
          DoubleRightTee: "\u22A8",
          DoubleUpArrow: "\u21D1",
          DoubleUpDownArrow: "\u21D5",
          DoubleVerticalBar: "\u2225",
          DownArrow: "\u2193",
          DownArrowBar: "\u2913",
          DownArrowUpArrow: "\u21F5",
          DownBreve: "\u0311",
          DownLeftRightVector: "\u2950",
          DownLeftTeeVector: "\u295E",
          DownLeftVector: "\u21BD",
          DownLeftVectorBar: "\u2956",
          DownRightTeeVector: "\u295F",
          DownRightVector: "\u21C1",
          DownRightVectorBar: "\u2957",
          DownTee: "\u22A4",
          DownTeeArrow: "\u21A7",
          Downarrow: "\u21D3",
          Dscr: "\u{1D49F}",
          Dstrok: "\u0110",
          ENG: "\u014A",
          ETH: "\xD0",
          Eacute: "\xC9",
          Ecaron: "\u011A",
          Ecirc: "\xCA",
          Ecy: "\u042D",
          Edot: "\u0116",
          Efr: "\u{1D508}",
          Egrave: "\xC8",
          Element: "\u2208",
          Emacr: "\u0112",
          EmptySmallSquare: "\u25FB",
          EmptyVerySmallSquare: "\u25AB",
          Eogon: "\u0118",
          Eopf: "\u{1D53C}",
          Epsilon: "\u0395",
          Equal: "\u2A75",
          EqualTilde: "\u2242",
          Equilibrium: "\u21CC",
          Escr: "\u2130",
          Esim: "\u2A73",
          Eta: "\u0397",
          Euml: "\xCB",
          Exists: "\u2203",
          ExponentialE: "\u2147",
          Fcy: "\u0424",
          Ffr: "\u{1D509}",
          FilledSmallSquare: "\u25FC",
          FilledVerySmallSquare: "\u25AA",
          Fopf: "\u{1D53D}",
          ForAll: "\u2200",
          Fouriertrf: "\u2131",
          Fscr: "\u2131",
          GJcy: "\u0403",
          GT: ">",
          Gamma: "\u0393",
          Gammad: "\u03DC",
          Gbreve: "\u011E",
          Gcedil: "\u0122",
          Gcirc: "\u011C",
          Gcy: "\u0413",
          Gdot: "\u0120",
          Gfr: "\u{1D50A}",
          Gg: "\u22D9",
          Gopf: "\u{1D53E}",
          GreaterEqual: "\u2265",
          GreaterEqualLess: "\u22DB",
          GreaterFullEqual: "\u2267",
          GreaterGreater: "\u2AA2",
          GreaterLess: "\u2277",
          GreaterSlantEqual: "\u2A7E",
          GreaterTilde: "\u2273",
          Gscr: "\u{1D4A2}",
          Gt: "\u226B",
          HARDcy: "\u042A",
          Hacek: "\u02C7",
          Hat: "^",
          Hcirc: "\u0124",
          Hfr: "\u210C",
          HilbertSpace: "\u210B",
          Hopf: "\u210D",
          HorizontalLine: "\u2500",
          Hscr: "\u210B",
          Hstrok: "\u0126",
          HumpDownHump: "\u224E",
          HumpEqual: "\u224F",
          IEcy: "\u0415",
          IJlig: "\u0132",
          IOcy: "\u0401",
          Iacute: "\xCD",
          Icirc: "\xCE",
          Icy: "\u0418",
          Idot: "\u0130",
          Ifr: "\u2111",
          Igrave: "\xCC",
          Im: "\u2111",
          Imacr: "\u012A",
          ImaginaryI: "\u2148",
          Implies: "\u21D2",
          Int: "\u222C",
          Integral: "\u222B",
          Intersection: "\u22C2",
          InvisibleComma: "\u2063",
          InvisibleTimes: "\u2062",
          Iogon: "\u012E",
          Iopf: "\u{1D540}",
          Iota: "\u0399",
          Iscr: "\u2110",
          Itilde: "\u0128",
          Iukcy: "\u0406",
          Iuml: "\xCF",
          Jcirc: "\u0134",
          Jcy: "\u0419",
          Jfr: "\u{1D50D}",
          Jopf: "\u{1D541}",
          Jscr: "\u{1D4A5}",
          Jsercy: "\u0408",
          Jukcy: "\u0404",
          KHcy: "\u0425",
          KJcy: "\u040C",
          Kappa: "\u039A",
          Kcedil: "\u0136",
          Kcy: "\u041A",
          Kfr: "\u{1D50E}",
          Kopf: "\u{1D542}",
          Kscr: "\u{1D4A6}",
          LJcy: "\u0409",
          LT: "<",
          Lacute: "\u0139",
          Lambda: "\u039B",
          Lang: "\u27EA",
          Laplacetrf: "\u2112",
          Larr: "\u219E",
          Lcaron: "\u013D",
          Lcedil: "\u013B",
          Lcy: "\u041B",
          LeftAngleBracket: "\u27E8",
          LeftArrow: "\u2190",
          LeftArrowBar: "\u21E4",
          LeftArrowRightArrow: "\u21C6",
          LeftCeiling: "\u2308",
          LeftDoubleBracket: "\u27E6",
          LeftDownTeeVector: "\u2961",
          LeftDownVector: "\u21C3",
          LeftDownVectorBar: "\u2959",
          LeftFloor: "\u230A",
          LeftRightArrow: "\u2194",
          LeftRightVector: "\u294E",
          LeftTee: "\u22A3",
          LeftTeeArrow: "\u21A4",
          LeftTeeVector: "\u295A",
          LeftTriangle: "\u22B2",
          LeftTriangleBar: "\u29CF",
          LeftTriangleEqual: "\u22B4",
          LeftUpDownVector: "\u2951",
          LeftUpTeeVector: "\u2960",
          LeftUpVector: "\u21BF",
          LeftUpVectorBar: "\u2958",
          LeftVector: "\u21BC",
          LeftVectorBar: "\u2952",
          Leftarrow: "\u21D0",
          Leftrightarrow: "\u21D4",
          LessEqualGreater: "\u22DA",
          LessFullEqual: "\u2266",
          LessGreater: "\u2276",
          LessLess: "\u2AA1",
          LessSlantEqual: "\u2A7D",
          LessTilde: "\u2272",
          Lfr: "\u{1D50F}",
          Ll: "\u22D8",
          Lleftarrow: "\u21DA",
          Lmidot: "\u013F",
          LongLeftArrow: "\u27F5",
          LongLeftRightArrow: "\u27F7",
          LongRightArrow: "\u27F6",
          Longleftarrow: "\u27F8",
          Longleftrightarrow: "\u27FA",
          Longrightarrow: "\u27F9",
          Lopf: "\u{1D543}",
          LowerLeftArrow: "\u2199",
          LowerRightArrow: "\u2198",
          Lscr: "\u2112",
          Lsh: "\u21B0",
          Lstrok: "\u0141",
          Lt: "\u226A",
          Map: "\u2905",
          Mcy: "\u041C",
          MediumSpace: "\u205F",
          Mellintrf: "\u2133",
          Mfr: "\u{1D510}",
          MinusPlus: "\u2213",
          Mopf: "\u{1D544}",
          Mscr: "\u2133",
          Mu: "\u039C",
          NJcy: "\u040A",
          Nacute: "\u0143",
          Ncaron: "\u0147",
          Ncedil: "\u0145",
          Ncy: "\u041D",
          NegativeMediumSpace: "\u200B",
          NegativeThickSpace: "\u200B",
          NegativeThinSpace: "\u200B",
          NegativeVeryThinSpace: "\u200B",
          NestedGreaterGreater: "\u226B",
          NestedLessLess: "\u226A",
          NewLine: "\n",
          Nfr: "\u{1D511}",
          NoBreak: "\u2060",
          NonBreakingSpace: "\xA0",
          Nopf: "\u2115",
          Not: "\u2AEC",
          NotCongruent: "\u2262",
          NotCupCap: "\u226D",
          NotDoubleVerticalBar: "\u2226",
          NotElement: "\u2209",
          NotEqual: "\u2260",
          NotEqualTilde: "\u2242\u0338",
          NotExists: "\u2204",
          NotGreater: "\u226F",
          NotGreaterEqual: "\u2271",
          NotGreaterFullEqual: "\u2267\u0338",
          NotGreaterGreater: "\u226B\u0338",
          NotGreaterLess: "\u2279",
          NotGreaterSlantEqual: "\u2A7E\u0338",
          NotGreaterTilde: "\u2275",
          NotHumpDownHump: "\u224E\u0338",
          NotHumpEqual: "\u224F\u0338",
          NotLeftTriangle: "\u22EA",
          NotLeftTriangleBar: "\u29CF\u0338",
          NotLeftTriangleEqual: "\u22EC",
          NotLess: "\u226E",
          NotLessEqual: "\u2270",
          NotLessGreater: "\u2278",
          NotLessLess: "\u226A\u0338",
          NotLessSlantEqual: "\u2A7D\u0338",
          NotLessTilde: "\u2274",
          NotNestedGreaterGreater: "\u2AA2\u0338",
          NotNestedLessLess: "\u2AA1\u0338",
          NotPrecedes: "\u2280",
          NotPrecedesEqual: "\u2AAF\u0338",
          NotPrecedesSlantEqual: "\u22E0",
          NotReverseElement: "\u220C",
          NotRightTriangle: "\u22EB",
          NotRightTriangleBar: "\u29D0\u0338",
          NotRightTriangleEqual: "\u22ED",
          NotSquareSubset: "\u228F\u0338",
          NotSquareSubsetEqual: "\u22E2",
          NotSquareSuperset: "\u2290\u0338",
          NotSquareSupersetEqual: "\u22E3",
          NotSubset: "\u2282\u20D2",
          NotSubsetEqual: "\u2288",
          NotSucceeds: "\u2281",
          NotSucceedsEqual: "\u2AB0\u0338",
          NotSucceedsSlantEqual: "\u22E1",
          NotSucceedsTilde: "\u227F\u0338",
          NotSuperset: "\u2283\u20D2",
          NotSupersetEqual: "\u2289",
          NotTilde: "\u2241",
          NotTildeEqual: "\u2244",
          NotTildeFullEqual: "\u2247",
          NotTildeTilde: "\u2249",
          NotVerticalBar: "\u2224",
          Nscr: "\u{1D4A9}",
          Ntilde: "\xD1",
          Nu: "\u039D",
          OElig: "\u0152",
          Oacute: "\xD3",
          Ocirc: "\xD4",
          Ocy: "\u041E",
          Odblac: "\u0150",
          Ofr: "\u{1D512}",
          Ograve: "\xD2",
          Omacr: "\u014C",
          Omega: "\u03A9",
          Omicron: "\u039F",
          Oopf: "\u{1D546}",
          OpenCurlyDoubleQuote: "\u201C",
          OpenCurlyQuote: "\u2018",
          Or: "\u2A54",
          Oscr: "\u{1D4AA}",
          Oslash: "\xD8",
          Otilde: "\xD5",
          Otimes: "\u2A37",
          Ouml: "\xD6",
          OverBar: "\u203E",
          OverBrace: "\u23DE",
          OverBracket: "\u23B4",
          OverParenthesis: "\u23DC",
          PartialD: "\u2202",
          Pcy: "\u041F",
          Pfr: "\u{1D513}",
          Phi: "\u03A6",
          Pi: "\u03A0",
          PlusMinus: "\xB1",
          Poincareplane: "\u210C",
          Popf: "\u2119",
          Pr: "\u2ABB",
          Precedes: "\u227A",
          PrecedesEqual: "\u2AAF",
          PrecedesSlantEqual: "\u227C",
          PrecedesTilde: "\u227E",
          Prime: "\u2033",
          Product: "\u220F",
          Proportion: "\u2237",
          Proportional: "\u221D",
          Pscr: "\u{1D4AB}",
          Psi: "\u03A8",
          QUOT: '"',
          Qfr: "\u{1D514}",
          Qopf: "\u211A",
          Qscr: "\u{1D4AC}",
          RBarr: "\u2910",
          REG: "\xAE",
          Racute: "\u0154",
          Rang: "\u27EB",
          Rarr: "\u21A0",
          Rarrtl: "\u2916",
          Rcaron: "\u0158",
          Rcedil: "\u0156",
          Rcy: "\u0420",
          Re: "\u211C",
          ReverseElement: "\u220B",
          ReverseEquilibrium: "\u21CB",
          ReverseUpEquilibrium: "\u296F",
          Rfr: "\u211C",
          Rho: "\u03A1",
          RightAngleBracket: "\u27E9",
          RightArrow: "\u2192",
          RightArrowBar: "\u21E5",
          RightArrowLeftArrow: "\u21C4",
          RightCeiling: "\u2309",
          RightDoubleBracket: "\u27E7",
          RightDownTeeVector: "\u295D",
          RightDownVector: "\u21C2",
          RightDownVectorBar: "\u2955",
          RightFloor: "\u230B",
          RightTee: "\u22A2",
          RightTeeArrow: "\u21A6",
          RightTeeVector: "\u295B",
          RightTriangle: "\u22B3",
          RightTriangleBar: "\u29D0",
          RightTriangleEqual: "\u22B5",
          RightUpDownVector: "\u294F",
          RightUpTeeVector: "\u295C",
          RightUpVector: "\u21BE",
          RightUpVectorBar: "\u2954",
          RightVector: "\u21C0",
          RightVectorBar: "\u2953",
          Rightarrow: "\u21D2",
          Ropf: "\u211D",
          RoundImplies: "\u2970",
          Rrightarrow: "\u21DB",
          Rscr: "\u211B",
          Rsh: "\u21B1",
          RuleDelayed: "\u29F4",
          SHCHcy: "\u0429",
          SHcy: "\u0428",
          SOFTcy: "\u042C",
          Sacute: "\u015A",
          Sc: "\u2ABC",
          Scaron: "\u0160",
          Scedil: "\u015E",
          Scirc: "\u015C",
          Scy: "\u0421",
          Sfr: "\u{1D516}",
          ShortDownArrow: "\u2193",
          ShortLeftArrow: "\u2190",
          ShortRightArrow: "\u2192",
          ShortUpArrow: "\u2191",
          Sigma: "\u03A3",
          SmallCircle: "\u2218",
          Sopf: "\u{1D54A}",
          Sqrt: "\u221A",
          Square: "\u25A1",
          SquareIntersection: "\u2293",
          SquareSubset: "\u228F",
          SquareSubsetEqual: "\u2291",
          SquareSuperset: "\u2290",
          SquareSupersetEqual: "\u2292",
          SquareUnion: "\u2294",
          Sscr: "\u{1D4AE}",
          Star: "\u22C6",
          Sub: "\u22D0",
          Subset: "\u22D0",
          SubsetEqual: "\u2286",
          Succeeds: "\u227B",
          SucceedsEqual: "\u2AB0",
          SucceedsSlantEqual: "\u227D",
          SucceedsTilde: "\u227F",
          SuchThat: "\u220B",
          Sum: "\u2211",
          Sup: "\u22D1",
          Superset: "\u2283",
          SupersetEqual: "\u2287",
          Supset: "\u22D1",
          THORN: "\xDE",
          TRADE: "\u2122",
          TSHcy: "\u040B",
          TScy: "\u0426",
          Tab: "	",
          Tau: "\u03A4",
          Tcaron: "\u0164",
          Tcedil: "\u0162",
          Tcy: "\u0422",
          Tfr: "\u{1D517}",
          Therefore: "\u2234",
          Theta: "\u0398",
          ThickSpace: "\u205F\u200A",
          ThinSpace: "\u2009",
          Tilde: "\u223C",
          TildeEqual: "\u2243",
          TildeFullEqual: "\u2245",
          TildeTilde: "\u2248",
          Topf: "\u{1D54B}",
          TripleDot: "\u20DB",
          Tscr: "\u{1D4AF}",
          Tstrok: "\u0166",
          Uacute: "\xDA",
          Uarr: "\u219F",
          Uarrocir: "\u2949",
          Ubrcy: "\u040E",
          Ubreve: "\u016C",
          Ucirc: "\xDB",
          Ucy: "\u0423",
          Udblac: "\u0170",
          Ufr: "\u{1D518}",
          Ugrave: "\xD9",
          Umacr: "\u016A",
          UnderBar: "_",
          UnderBrace: "\u23DF",
          UnderBracket: "\u23B5",
          UnderParenthesis: "\u23DD",
          Union: "\u22C3",
          UnionPlus: "\u228E",
          Uogon: "\u0172",
          Uopf: "\u{1D54C}",
          UpArrow: "\u2191",
          UpArrowBar: "\u2912",
          UpArrowDownArrow: "\u21C5",
          UpDownArrow: "\u2195",
          UpEquilibrium: "\u296E",
          UpTee: "\u22A5",
          UpTeeArrow: "\u21A5",
          Uparrow: "\u21D1",
          Updownarrow: "\u21D5",
          UpperLeftArrow: "\u2196",
          UpperRightArrow: "\u2197",
          Upsi: "\u03D2",
          Upsilon: "\u03A5",
          Uring: "\u016E",
          Uscr: "\u{1D4B0}",
          Utilde: "\u0168",
          Uuml: "\xDC",
          VDash: "\u22AB",
          Vbar: "\u2AEB",
          Vcy: "\u0412",
          Vdash: "\u22A9",
          Vdashl: "\u2AE6",
          Vee: "\u22C1",
          Verbar: "\u2016",
          Vert: "\u2016",
          VerticalBar: "\u2223",
          VerticalLine: "|",
          VerticalSeparator: "\u2758",
          VerticalTilde: "\u2240",
          VeryThinSpace: "\u200A",
          Vfr: "\u{1D519}",
          Vopf: "\u{1D54D}",
          Vscr: "\u{1D4B1}",
          Vvdash: "\u22AA",
          Wcirc: "\u0174",
          Wedge: "\u22C0",
          Wfr: "\u{1D51A}",
          Wopf: "\u{1D54E}",
          Wscr: "\u{1D4B2}",
          Xfr: "\u{1D51B}",
          Xi: "\u039E",
          Xopf: "\u{1D54F}",
          Xscr: "\u{1D4B3}",
          YAcy: "\u042F",
          YIcy: "\u0407",
          YUcy: "\u042E",
          Yacute: "\xDD",
          Ycirc: "\u0176",
          Ycy: "\u042B",
          Yfr: "\u{1D51C}",
          Yopf: "\u{1D550}",
          Yscr: "\u{1D4B4}",
          Yuml: "\u0178",
          ZHcy: "\u0416",
          Zacute: "\u0179",
          Zcaron: "\u017D",
          Zcy: "\u0417",
          Zdot: "\u017B",
          ZeroWidthSpace: "\u200B",
          Zeta: "\u0396",
          Zfr: "\u2128",
          Zopf: "\u2124",
          Zscr: "\u{1D4B5}",
          aacute: "\xE1",
          abreve: "\u0103",
          ac: "\u223E",
          acE: "\u223E\u0333",
          acd: "\u223F",
          acirc: "\xE2",
          acute: "\xB4",
          acy: "\u0430",
          aelig: "\xE6",
          af: "\u2061",
          afr: "\u{1D51E}",
          agrave: "\xE0",
          alefsym: "\u2135",
          aleph: "\u2135",
          alpha: "\u03B1",
          amacr: "\u0101",
          amalg: "\u2A3F",
          amp: "&",
          and: "\u2227",
          andand: "\u2A55",
          andd: "\u2A5C",
          andslope: "\u2A58",
          andv: "\u2A5A",
          ang: "\u2220",
          ange: "\u29A4",
          angle: "\u2220",
          angmsd: "\u2221",
          angmsdaa: "\u29A8",
          angmsdab: "\u29A9",
          angmsdac: "\u29AA",
          angmsdad: "\u29AB",
          angmsdae: "\u29AC",
          angmsdaf: "\u29AD",
          angmsdag: "\u29AE",
          angmsdah: "\u29AF",
          angrt: "\u221F",
          angrtvb: "\u22BE",
          angrtvbd: "\u299D",
          angsph: "\u2222",
          angst: "\xC5",
          angzarr: "\u237C",
          aogon: "\u0105",
          aopf: "\u{1D552}",
          ap: "\u2248",
          apE: "\u2A70",
          apacir: "\u2A6F",
          ape: "\u224A",
          apid: "\u224B",
          apos: "'",
          approx: "\u2248",
          approxeq: "\u224A",
          aring: "\xE5",
          ascr: "\u{1D4B6}",
          ast: "*",
          asymp: "\u2248",
          asympeq: "\u224D",
          atilde: "\xE3",
          auml: "\xE4",
          awconint: "\u2233",
          awint: "\u2A11",
          bNot: "\u2AED",
          backcong: "\u224C",
          backepsilon: "\u03F6",
          backprime: "\u2035",
          backsim: "\u223D",
          backsimeq: "\u22CD",
          barvee: "\u22BD",
          barwed: "\u2305",
          barwedge: "\u2305",
          bbrk: "\u23B5",
          bbrktbrk: "\u23B6",
          bcong: "\u224C",
          bcy: "\u0431",
          bdquo: "\u201E",
          becaus: "\u2235",
          because: "\u2235",
          bemptyv: "\u29B0",
          bepsi: "\u03F6",
          bernou: "\u212C",
          beta: "\u03B2",
          beth: "\u2136",
          between: "\u226C",
          bfr: "\u{1D51F}",
          bigcap: "\u22C2",
          bigcirc: "\u25EF",
          bigcup: "\u22C3",
          bigodot: "\u2A00",
          bigoplus: "\u2A01",
          bigotimes: "\u2A02",
          bigsqcup: "\u2A06",
          bigstar: "\u2605",
          bigtriangledown: "\u25BD",
          bigtriangleup: "\u25B3",
          biguplus: "\u2A04",
          bigvee: "\u22C1",
          bigwedge: "\u22C0",
          bkarow: "\u290D",
          blacklozenge: "\u29EB",
          blacksquare: "\u25AA",
          blacktriangle: "\u25B4",
          blacktriangledown: "\u25BE",
          blacktriangleleft: "\u25C2",
          blacktriangleright: "\u25B8",
          blank: "\u2423",
          blk12: "\u2592",
          blk14: "\u2591",
          blk34: "\u2593",
          block: "\u2588",
          bne: "=\u20E5",
          bnequiv: "\u2261\u20E5",
          bnot: "\u2310",
          bopf: "\u{1D553}",
          bot: "\u22A5",
          bottom: "\u22A5",
          bowtie: "\u22C8",
          boxDL: "\u2557",
          boxDR: "\u2554",
          boxDl: "\u2556",
          boxDr: "\u2553",
          boxH: "\u2550",
          boxHD: "\u2566",
          boxHU: "\u2569",
          boxHd: "\u2564",
          boxHu: "\u2567",
          boxUL: "\u255D",
          boxUR: "\u255A",
          boxUl: "\u255C",
          boxUr: "\u2559",
          boxV: "\u2551",
          boxVH: "\u256C",
          boxVL: "\u2563",
          boxVR: "\u2560",
          boxVh: "\u256B",
          boxVl: "\u2562",
          boxVr: "\u255F",
          boxbox: "\u29C9",
          boxdL: "\u2555",
          boxdR: "\u2552",
          boxdl: "\u2510",
          boxdr: "\u250C",
          boxh: "\u2500",
          boxhD: "\u2565",
          boxhU: "\u2568",
          boxhd: "\u252C",
          boxhu: "\u2534",
          boxminus: "\u229F",
          boxplus: "\u229E",
          boxtimes: "\u22A0",
          boxuL: "\u255B",
          boxuR: "\u2558",
          boxul: "\u2518",
          boxur: "\u2514",
          boxv: "\u2502",
          boxvH: "\u256A",
          boxvL: "\u2561",
          boxvR: "\u255E",
          boxvh: "\u253C",
          boxvl: "\u2524",
          boxvr: "\u251C",
          bprime: "\u2035",
          breve: "\u02D8",
          brvbar: "\xA6",
          bscr: "\u{1D4B7}",
          bsemi: "\u204F",
          bsim: "\u223D",
          bsime: "\u22CD",
          bsol: "\\",
          bsolb: "\u29C5",
          bsolhsub: "\u27C8",
          bull: "\u2022",
          bullet: "\u2022",
          bump: "\u224E",
          bumpE: "\u2AAE",
          bumpe: "\u224F",
          bumpeq: "\u224F",
          cacute: "\u0107",
          cap: "\u2229",
          capand: "\u2A44",
          capbrcup: "\u2A49",
          capcap: "\u2A4B",
          capcup: "\u2A47",
          capdot: "\u2A40",
          caps: "\u2229\uFE00",
          caret: "\u2041",
          caron: "\u02C7",
          ccaps: "\u2A4D",
          ccaron: "\u010D",
          ccedil: "\xE7",
          ccirc: "\u0109",
          ccups: "\u2A4C",
          ccupssm: "\u2A50",
          cdot: "\u010B",
          cedil: "\xB8",
          cemptyv: "\u29B2",
          cent: "\xA2",
          centerdot: "\xB7",
          cfr: "\u{1D520}",
          chcy: "\u0447",
          check: "\u2713",
          checkmark: "\u2713",
          chi: "\u03C7",
          cir: "\u25CB",
          cirE: "\u29C3",
          circ: "\u02C6",
          circeq: "\u2257",
          circlearrowleft: "\u21BA",
          circlearrowright: "\u21BB",
          circledR: "\xAE",
          circledS: "\u24C8",
          circledast: "\u229B",
          circledcirc: "\u229A",
          circleddash: "\u229D",
          cire: "\u2257",
          cirfnint: "\u2A10",
          cirmid: "\u2AEF",
          cirscir: "\u29C2",
          clubs: "\u2663",
          clubsuit: "\u2663",
          colon: ":",
          colone: "\u2254",
          coloneq: "\u2254",
          comma: ",",
          commat: "@",
          comp: "\u2201",
          compfn: "\u2218",
          complement: "\u2201",
          complexes: "\u2102",
          cong: "\u2245",
          congdot: "\u2A6D",
          conint: "\u222E",
          copf: "\u{1D554}",
          coprod: "\u2210",
          copy: "\xA9",
          copysr: "\u2117",
          crarr: "\u21B5",
          cross: "\u2717",
          cscr: "\u{1D4B8}",
          csub: "\u2ACF",
          csube: "\u2AD1",
          csup: "\u2AD0",
          csupe: "\u2AD2",
          ctdot: "\u22EF",
          cudarrl: "\u2938",
          cudarrr: "\u2935",
          cuepr: "\u22DE",
          cuesc: "\u22DF",
          cularr: "\u21B6",
          cularrp: "\u293D",
          cup: "\u222A",
          cupbrcap: "\u2A48",
          cupcap: "\u2A46",
          cupcup: "\u2A4A",
          cupdot: "\u228D",
          cupor: "\u2A45",
          cups: "\u222A\uFE00",
          curarr: "\u21B7",
          curarrm: "\u293C",
          curlyeqprec: "\u22DE",
          curlyeqsucc: "\u22DF",
          curlyvee: "\u22CE",
          curlywedge: "\u22CF",
          curren: "\xA4",
          curvearrowleft: "\u21B6",
          curvearrowright: "\u21B7",
          cuvee: "\u22CE",
          cuwed: "\u22CF",
          cwconint: "\u2232",
          cwint: "\u2231",
          cylcty: "\u232D",
          dArr: "\u21D3",
          dHar: "\u2965",
          dagger: "\u2020",
          daleth: "\u2138",
          darr: "\u2193",
          dash: "\u2010",
          dashv: "\u22A3",
          dbkarow: "\u290F",
          dblac: "\u02DD",
          dcaron: "\u010F",
          dcy: "\u0434",
          dd: "\u2146",
          ddagger: "\u2021",
          ddarr: "\u21CA",
          ddotseq: "\u2A77",
          deg: "\xB0",
          delta: "\u03B4",
          demptyv: "\u29B1",
          dfisht: "\u297F",
          dfr: "\u{1D521}",
          dharl: "\u21C3",
          dharr: "\u21C2",
          diam: "\u22C4",
          diamond: "\u22C4",
          diamondsuit: "\u2666",
          diams: "\u2666",
          die: "\xA8",
          digamma: "\u03DD",
          disin: "\u22F2",
          div: "\xF7",
          divide: "\xF7",
          divideontimes: "\u22C7",
          divonx: "\u22C7",
          djcy: "\u0452",
          dlcorn: "\u231E",
          dlcrop: "\u230D",
          dollar: "$",
          dopf: "\u{1D555}",
          dot: "\u02D9",
          doteq: "\u2250",
          doteqdot: "\u2251",
          dotminus: "\u2238",
          dotplus: "\u2214",
          dotsquare: "\u22A1",
          doublebarwedge: "\u2306",
          downarrow: "\u2193",
          downdownarrows: "\u21CA",
          downharpoonleft: "\u21C3",
          downharpoonright: "\u21C2",
          drbkarow: "\u2910",
          drcorn: "\u231F",
          drcrop: "\u230C",
          dscr: "\u{1D4B9}",
          dscy: "\u0455",
          dsol: "\u29F6",
          dstrok: "\u0111",
          dtdot: "\u22F1",
          dtri: "\u25BF",
          dtrif: "\u25BE",
          duarr: "\u21F5",
          duhar: "\u296F",
          dwangle: "\u29A6",
          dzcy: "\u045F",
          dzigrarr: "\u27FF",
          eDDot: "\u2A77",
          eDot: "\u2251",
          eacute: "\xE9",
          easter: "\u2A6E",
          ecaron: "\u011B",
          ecir: "\u2256",
          ecirc: "\xEA",
          ecolon: "\u2255",
          ecy: "\u044D",
          edot: "\u0117",
          ee: "\u2147",
          efDot: "\u2252",
          efr: "\u{1D522}",
          eg: "\u2A9A",
          egrave: "\xE8",
          egs: "\u2A96",
          egsdot: "\u2A98",
          el: "\u2A99",
          elinters: "\u23E7",
          ell: "\u2113",
          els: "\u2A95",
          elsdot: "\u2A97",
          emacr: "\u0113",
          empty: "\u2205",
          emptyset: "\u2205",
          emptyv: "\u2205",
          emsp13: "\u2004",
          emsp14: "\u2005",
          emsp: "\u2003",
          eng: "\u014B",
          ensp: "\u2002",
          eogon: "\u0119",
          eopf: "\u{1D556}",
          epar: "\u22D5",
          eparsl: "\u29E3",
          eplus: "\u2A71",
          epsi: "\u03B5",
          epsilon: "\u03B5",
          epsiv: "\u03F5",
          eqcirc: "\u2256",
          eqcolon: "\u2255",
          eqsim: "\u2242",
          eqslantgtr: "\u2A96",
          eqslantless: "\u2A95",
          equals: "=",
          equest: "\u225F",
          equiv: "\u2261",
          equivDD: "\u2A78",
          eqvparsl: "\u29E5",
          erDot: "\u2253",
          erarr: "\u2971",
          escr: "\u212F",
          esdot: "\u2250",
          esim: "\u2242",
          eta: "\u03B7",
          eth: "\xF0",
          euml: "\xEB",
          euro: "\u20AC",
          excl: "!",
          exist: "\u2203",
          expectation: "\u2130",
          exponentiale: "\u2147",
          fallingdotseq: "\u2252",
          fcy: "\u0444",
          female: "\u2640",
          ffilig: "\uFB03",
          fflig: "\uFB00",
          ffllig: "\uFB04",
          ffr: "\u{1D523}",
          filig: "\uFB01",
          fjlig: "fj",
          flat: "\u266D",
          fllig: "\uFB02",
          fltns: "\u25B1",
          fnof: "\u0192",
          fopf: "\u{1D557}",
          forall: "\u2200",
          fork: "\u22D4",
          forkv: "\u2AD9",
          fpartint: "\u2A0D",
          frac12: "\xBD",
          frac13: "\u2153",
          frac14: "\xBC",
          frac15: "\u2155",
          frac16: "\u2159",
          frac18: "\u215B",
          frac23: "\u2154",
          frac25: "\u2156",
          frac34: "\xBE",
          frac35: "\u2157",
          frac38: "\u215C",
          frac45: "\u2158",
          frac56: "\u215A",
          frac58: "\u215D",
          frac78: "\u215E",
          frasl: "\u2044",
          frown: "\u2322",
          fscr: "\u{1D4BB}",
          gE: "\u2267",
          gEl: "\u2A8C",
          gacute: "\u01F5",
          gamma: "\u03B3",
          gammad: "\u03DD",
          gap: "\u2A86",
          gbreve: "\u011F",
          gcirc: "\u011D",
          gcy: "\u0433",
          gdot: "\u0121",
          ge: "\u2265",
          gel: "\u22DB",
          geq: "\u2265",
          geqq: "\u2267",
          geqslant: "\u2A7E",
          ges: "\u2A7E",
          gescc: "\u2AA9",
          gesdot: "\u2A80",
          gesdoto: "\u2A82",
          gesdotol: "\u2A84",
          gesl: "\u22DB\uFE00",
          gesles: "\u2A94",
          gfr: "\u{1D524}",
          gg: "\u226B",
          ggg: "\u22D9",
          gimel: "\u2137",
          gjcy: "\u0453",
          gl: "\u2277",
          glE: "\u2A92",
          gla: "\u2AA5",
          glj: "\u2AA4",
          gnE: "\u2269",
          gnap: "\u2A8A",
          gnapprox: "\u2A8A",
          gne: "\u2A88",
          gneq: "\u2A88",
          gneqq: "\u2269",
          gnsim: "\u22E7",
          gopf: "\u{1D558}",
          grave: "`",
          gscr: "\u210A",
          gsim: "\u2273",
          gsime: "\u2A8E",
          gsiml: "\u2A90",
          gt: ">",
          gtcc: "\u2AA7",
          gtcir: "\u2A7A",
          gtdot: "\u22D7",
          gtlPar: "\u2995",
          gtquest: "\u2A7C",
          gtrapprox: "\u2A86",
          gtrarr: "\u2978",
          gtrdot: "\u22D7",
          gtreqless: "\u22DB",
          gtreqqless: "\u2A8C",
          gtrless: "\u2277",
          gtrsim: "\u2273",
          gvertneqq: "\u2269\uFE00",
          gvnE: "\u2269\uFE00",
          hArr: "\u21D4",
          hairsp: "\u200A",
          half: "\xBD",
          hamilt: "\u210B",
          hardcy: "\u044A",
          harr: "\u2194",
          harrcir: "\u2948",
          harrw: "\u21AD",
          hbar: "\u210F",
          hcirc: "\u0125",
          hearts: "\u2665",
          heartsuit: "\u2665",
          hellip: "\u2026",
          hercon: "\u22B9",
          hfr: "\u{1D525}",
          hksearow: "\u2925",
          hkswarow: "\u2926",
          hoarr: "\u21FF",
          homtht: "\u223B",
          hookleftarrow: "\u21A9",
          hookrightarrow: "\u21AA",
          hopf: "\u{1D559}",
          horbar: "\u2015",
          hscr: "\u{1D4BD}",
          hslash: "\u210F",
          hstrok: "\u0127",
          hybull: "\u2043",
          hyphen: "\u2010",
          iacute: "\xED",
          ic: "\u2063",
          icirc: "\xEE",
          icy: "\u0438",
          iecy: "\u0435",
          iexcl: "\xA1",
          iff: "\u21D4",
          ifr: "\u{1D526}",
          igrave: "\xEC",
          ii: "\u2148",
          iiiint: "\u2A0C",
          iiint: "\u222D",
          iinfin: "\u29DC",
          iiota: "\u2129",
          ijlig: "\u0133",
          imacr: "\u012B",
          image: "\u2111",
          imagline: "\u2110",
          imagpart: "\u2111",
          imath: "\u0131",
          imof: "\u22B7",
          imped: "\u01B5",
          in: "\u2208",
          incare: "\u2105",
          infin: "\u221E",
          infintie: "\u29DD",
          inodot: "\u0131",
          int: "\u222B",
          intcal: "\u22BA",
          integers: "\u2124",
          intercal: "\u22BA",
          intlarhk: "\u2A17",
          intprod: "\u2A3C",
          iocy: "\u0451",
          iogon: "\u012F",
          iopf: "\u{1D55A}",
          iota: "\u03B9",
          iprod: "\u2A3C",
          iquest: "\xBF",
          iscr: "\u{1D4BE}",
          isin: "\u2208",
          isinE: "\u22F9",
          isindot: "\u22F5",
          isins: "\u22F4",
          isinsv: "\u22F3",
          isinv: "\u2208",
          it: "\u2062",
          itilde: "\u0129",
          iukcy: "\u0456",
          iuml: "\xEF",
          jcirc: "\u0135",
          jcy: "\u0439",
          jfr: "\u{1D527}",
          jmath: "\u0237",
          jopf: "\u{1D55B}",
          jscr: "\u{1D4BF}",
          jsercy: "\u0458",
          jukcy: "\u0454",
          kappa: "\u03BA",
          kappav: "\u03F0",
          kcedil: "\u0137",
          kcy: "\u043A",
          kfr: "\u{1D528}",
          kgreen: "\u0138",
          khcy: "\u0445",
          kjcy: "\u045C",
          kopf: "\u{1D55C}",
          kscr: "\u{1D4C0}",
          lAarr: "\u21DA",
          lArr: "\u21D0",
          lAtail: "\u291B",
          lBarr: "\u290E",
          lE: "\u2266",
          lEg: "\u2A8B",
          lHar: "\u2962",
          lacute: "\u013A",
          laemptyv: "\u29B4",
          lagran: "\u2112",
          lambda: "\u03BB",
          lang: "\u27E8",
          langd: "\u2991",
          langle: "\u27E8",
          lap: "\u2A85",
          laquo: "\xAB",
          larr: "\u2190",
          larrb: "\u21E4",
          larrbfs: "\u291F",
          larrfs: "\u291D",
          larrhk: "\u21A9",
          larrlp: "\u21AB",
          larrpl: "\u2939",
          larrsim: "\u2973",
          larrtl: "\u21A2",
          lat: "\u2AAB",
          latail: "\u2919",
          late: "\u2AAD",
          lates: "\u2AAD\uFE00",
          lbarr: "\u290C",
          lbbrk: "\u2772",
          lbrace: "{",
          lbrack: "[",
          lbrke: "\u298B",
          lbrksld: "\u298F",
          lbrkslu: "\u298D",
          lcaron: "\u013E",
          lcedil: "\u013C",
          lceil: "\u2308",
          lcub: "{",
          lcy: "\u043B",
          ldca: "\u2936",
          ldquo: "\u201C",
          ldquor: "\u201E",
          ldrdhar: "\u2967",
          ldrushar: "\u294B",
          ldsh: "\u21B2",
          le: "\u2264",
          leftarrow: "\u2190",
          leftarrowtail: "\u21A2",
          leftharpoondown: "\u21BD",
          leftharpoonup: "\u21BC",
          leftleftarrows: "\u21C7",
          leftrightarrow: "\u2194",
          leftrightarrows: "\u21C6",
          leftrightharpoons: "\u21CB",
          leftrightsquigarrow: "\u21AD",
          leftthreetimes: "\u22CB",
          leg: "\u22DA",
          leq: "\u2264",
          leqq: "\u2266",
          leqslant: "\u2A7D",
          les: "\u2A7D",
          lescc: "\u2AA8",
          lesdot: "\u2A7F",
          lesdoto: "\u2A81",
          lesdotor: "\u2A83",
          lesg: "\u22DA\uFE00",
          lesges: "\u2A93",
          lessapprox: "\u2A85",
          lessdot: "\u22D6",
          lesseqgtr: "\u22DA",
          lesseqqgtr: "\u2A8B",
          lessgtr: "\u2276",
          lesssim: "\u2272",
          lfisht: "\u297C",
          lfloor: "\u230A",
          lfr: "\u{1D529}",
          lg: "\u2276",
          lgE: "\u2A91",
          lhard: "\u21BD",
          lharu: "\u21BC",
          lharul: "\u296A",
          lhblk: "\u2584",
          ljcy: "\u0459",
          ll: "\u226A",
          llarr: "\u21C7",
          llcorner: "\u231E",
          llhard: "\u296B",
          lltri: "\u25FA",
          lmidot: "\u0140",
          lmoust: "\u23B0",
          lmoustache: "\u23B0",
          lnE: "\u2268",
          lnap: "\u2A89",
          lnapprox: "\u2A89",
          lne: "\u2A87",
          lneq: "\u2A87",
          lneqq: "\u2268",
          lnsim: "\u22E6",
          loang: "\u27EC",
          loarr: "\u21FD",
          lobrk: "\u27E6",
          longleftarrow: "\u27F5",
          longleftrightarrow: "\u27F7",
          longmapsto: "\u27FC",
          longrightarrow: "\u27F6",
          looparrowleft: "\u21AB",
          looparrowright: "\u21AC",
          lopar: "\u2985",
          lopf: "\u{1D55D}",
          loplus: "\u2A2D",
          lotimes: "\u2A34",
          lowast: "\u2217",
          lowbar: "_",
          loz: "\u25CA",
          lozenge: "\u25CA",
          lozf: "\u29EB",
          lpar: "(",
          lparlt: "\u2993",
          lrarr: "\u21C6",
          lrcorner: "\u231F",
          lrhar: "\u21CB",
          lrhard: "\u296D",
          lrm: "\u200E",
          lrtri: "\u22BF",
          lsaquo: "\u2039",
          lscr: "\u{1D4C1}",
          lsh: "\u21B0",
          lsim: "\u2272",
          lsime: "\u2A8D",
          lsimg: "\u2A8F",
          lsqb: "[",
          lsquo: "\u2018",
          lsquor: "\u201A",
          lstrok: "\u0142",
          lt: "<",
          ltcc: "\u2AA6",
          ltcir: "\u2A79",
          ltdot: "\u22D6",
          lthree: "\u22CB",
          ltimes: "\u22C9",
          ltlarr: "\u2976",
          ltquest: "\u2A7B",
          ltrPar: "\u2996",
          ltri: "\u25C3",
          ltrie: "\u22B4",
          ltrif: "\u25C2",
          lurdshar: "\u294A",
          luruhar: "\u2966",
          lvertneqq: "\u2268\uFE00",
          lvnE: "\u2268\uFE00",
          mDDot: "\u223A",
          macr: "\xAF",
          male: "\u2642",
          malt: "\u2720",
          maltese: "\u2720",
          map: "\u21A6",
          mapsto: "\u21A6",
          mapstodown: "\u21A7",
          mapstoleft: "\u21A4",
          mapstoup: "\u21A5",
          marker: "\u25AE",
          mcomma: "\u2A29",
          mcy: "\u043C",
          mdash: "\u2014",
          measuredangle: "\u2221",
          mfr: "\u{1D52A}",
          mho: "\u2127",
          micro: "\xB5",
          mid: "\u2223",
          midast: "*",
          midcir: "\u2AF0",
          middot: "\xB7",
          minus: "\u2212",
          minusb: "\u229F",
          minusd: "\u2238",
          minusdu: "\u2A2A",
          mlcp: "\u2ADB",
          mldr: "\u2026",
          mnplus: "\u2213",
          models: "\u22A7",
          mopf: "\u{1D55E}",
          mp: "\u2213",
          mscr: "\u{1D4C2}",
          mstpos: "\u223E",
          mu: "\u03BC",
          multimap: "\u22B8",
          mumap: "\u22B8",
          nGg: "\u22D9\u0338",
          nGt: "\u226B\u20D2",
          nGtv: "\u226B\u0338",
          nLeftarrow: "\u21CD",
          nLeftrightarrow: "\u21CE",
          nLl: "\u22D8\u0338",
          nLt: "\u226A\u20D2",
          nLtv: "\u226A\u0338",
          nRightarrow: "\u21CF",
          nVDash: "\u22AF",
          nVdash: "\u22AE",
          nabla: "\u2207",
          nacute: "\u0144",
          nang: "\u2220\u20D2",
          nap: "\u2249",
          napE: "\u2A70\u0338",
          napid: "\u224B\u0338",
          napos: "\u0149",
          napprox: "\u2249",
          natur: "\u266E",
          natural: "\u266E",
          naturals: "\u2115",
          nbsp: "\xA0",
          nbump: "\u224E\u0338",
          nbumpe: "\u224F\u0338",
          ncap: "\u2A43",
          ncaron: "\u0148",
          ncedil: "\u0146",
          ncong: "\u2247",
          ncongdot: "\u2A6D\u0338",
          ncup: "\u2A42",
          ncy: "\u043D",
          ndash: "\u2013",
          ne: "\u2260",
          neArr: "\u21D7",
          nearhk: "\u2924",
          nearr: "\u2197",
          nearrow: "\u2197",
          nedot: "\u2250\u0338",
          nequiv: "\u2262",
          nesear: "\u2928",
          nesim: "\u2242\u0338",
          nexist: "\u2204",
          nexists: "\u2204",
          nfr: "\u{1D52B}",
          ngE: "\u2267\u0338",
          nge: "\u2271",
          ngeq: "\u2271",
          ngeqq: "\u2267\u0338",
          ngeqslant: "\u2A7E\u0338",
          nges: "\u2A7E\u0338",
          ngsim: "\u2275",
          ngt: "\u226F",
          ngtr: "\u226F",
          nhArr: "\u21CE",
          nharr: "\u21AE",
          nhpar: "\u2AF2",
          ni: "\u220B",
          nis: "\u22FC",
          nisd: "\u22FA",
          niv: "\u220B",
          njcy: "\u045A",
          nlArr: "\u21CD",
          nlE: "\u2266\u0338",
          nlarr: "\u219A",
          nldr: "\u2025",
          nle: "\u2270",
          nleftarrow: "\u219A",
          nleftrightarrow: "\u21AE",
          nleq: "\u2270",
          nleqq: "\u2266\u0338",
          nleqslant: "\u2A7D\u0338",
          nles: "\u2A7D\u0338",
          nless: "\u226E",
          nlsim: "\u2274",
          nlt: "\u226E",
          nltri: "\u22EA",
          nltrie: "\u22EC",
          nmid: "\u2224",
          nopf: "\u{1D55F}",
          not: "\xAC",
          notin: "\u2209",
          notinE: "\u22F9\u0338",
          notindot: "\u22F5\u0338",
          notinva: "\u2209",
          notinvb: "\u22F7",
          notinvc: "\u22F6",
          notni: "\u220C",
          notniva: "\u220C",
          notnivb: "\u22FE",
          notnivc: "\u22FD",
          npar: "\u2226",
          nparallel: "\u2226",
          nparsl: "\u2AFD\u20E5",
          npart: "\u2202\u0338",
          npolint: "\u2A14",
          npr: "\u2280",
          nprcue: "\u22E0",
          npre: "\u2AAF\u0338",
          nprec: "\u2280",
          npreceq: "\u2AAF\u0338",
          nrArr: "\u21CF",
          nrarr: "\u219B",
          nrarrc: "\u2933\u0338",
          nrarrw: "\u219D\u0338",
          nrightarrow: "\u219B",
          nrtri: "\u22EB",
          nrtrie: "\u22ED",
          nsc: "\u2281",
          nsccue: "\u22E1",
          nsce: "\u2AB0\u0338",
          nscr: "\u{1D4C3}",
          nshortmid: "\u2224",
          nshortparallel: "\u2226",
          nsim: "\u2241",
          nsime: "\u2244",
          nsimeq: "\u2244",
          nsmid: "\u2224",
          nspar: "\u2226",
          nsqsube: "\u22E2",
          nsqsupe: "\u22E3",
          nsub: "\u2284",
          nsubE: "\u2AC5\u0338",
          nsube: "\u2288",
          nsubset: "\u2282\u20D2",
          nsubseteq: "\u2288",
          nsubseteqq: "\u2AC5\u0338",
          nsucc: "\u2281",
          nsucceq: "\u2AB0\u0338",
          nsup: "\u2285",
          nsupE: "\u2AC6\u0338",
          nsupe: "\u2289",
          nsupset: "\u2283\u20D2",
          nsupseteq: "\u2289",
          nsupseteqq: "\u2AC6\u0338",
          ntgl: "\u2279",
          ntilde: "\xF1",
          ntlg: "\u2278",
          ntriangleleft: "\u22EA",
          ntrianglelefteq: "\u22EC",
          ntriangleright: "\u22EB",
          ntrianglerighteq: "\u22ED",
          nu: "\u03BD",
          num: "#",
          numero: "\u2116",
          numsp: "\u2007",
          nvDash: "\u22AD",
          nvHarr: "\u2904",
          nvap: "\u224D\u20D2",
          nvdash: "\u22AC",
          nvge: "\u2265\u20D2",
          nvgt: ">\u20D2",
          nvinfin: "\u29DE",
          nvlArr: "\u2902",
          nvle: "\u2264\u20D2",
          nvlt: "<\u20D2",
          nvltrie: "\u22B4\u20D2",
          nvrArr: "\u2903",
          nvrtrie: "\u22B5\u20D2",
          nvsim: "\u223C\u20D2",
          nwArr: "\u21D6",
          nwarhk: "\u2923",
          nwarr: "\u2196",
          nwarrow: "\u2196",
          nwnear: "\u2927",
          oS: "\u24C8",
          oacute: "\xF3",
          oast: "\u229B",
          ocir: "\u229A",
          ocirc: "\xF4",
          ocy: "\u043E",
          odash: "\u229D",
          odblac: "\u0151",
          odiv: "\u2A38",
          odot: "\u2299",
          odsold: "\u29BC",
          oelig: "\u0153",
          ofcir: "\u29BF",
          ofr: "\u{1D52C}",
          ogon: "\u02DB",
          ograve: "\xF2",
          ogt: "\u29C1",
          ohbar: "\u29B5",
          ohm: "\u03A9",
          oint: "\u222E",
          olarr: "\u21BA",
          olcir: "\u29BE",
          olcross: "\u29BB",
          oline: "\u203E",
          olt: "\u29C0",
          omacr: "\u014D",
          omega: "\u03C9",
          omicron: "\u03BF",
          omid: "\u29B6",
          ominus: "\u2296",
          oopf: "\u{1D560}",
          opar: "\u29B7",
          operp: "\u29B9",
          oplus: "\u2295",
          or: "\u2228",
          orarr: "\u21BB",
          ord: "\u2A5D",
          order: "\u2134",
          orderof: "\u2134",
          ordf: "\xAA",
          ordm: "\xBA",
          origof: "\u22B6",
          oror: "\u2A56",
          orslope: "\u2A57",
          orv: "\u2A5B",
          oscr: "\u2134",
          oslash: "\xF8",
          osol: "\u2298",
          otilde: "\xF5",
          otimes: "\u2297",
          otimesas: "\u2A36",
          ouml: "\xF6",
          ovbar: "\u233D",
          par: "\u2225",
          para: "\xB6",
          parallel: "\u2225",
          parsim: "\u2AF3",
          parsl: "\u2AFD",
          part: "\u2202",
          pcy: "\u043F",
          percnt: "%",
          period: ".",
          permil: "\u2030",
          perp: "\u22A5",
          pertenk: "\u2031",
          pfr: "\u{1D52D}",
          phi: "\u03C6",
          phiv: "\u03D5",
          phmmat: "\u2133",
          phone: "\u260E",
          pi: "\u03C0",
          pitchfork: "\u22D4",
          piv: "\u03D6",
          planck: "\u210F",
          planckh: "\u210E",
          plankv: "\u210F",
          plus: "+",
          plusacir: "\u2A23",
          plusb: "\u229E",
          pluscir: "\u2A22",
          plusdo: "\u2214",
          plusdu: "\u2A25",
          pluse: "\u2A72",
          plusmn: "\xB1",
          plussim: "\u2A26",
          plustwo: "\u2A27",
          pm: "\xB1",
          pointint: "\u2A15",
          popf: "\u{1D561}",
          pound: "\xA3",
          pr: "\u227A",
          prE: "\u2AB3",
          prap: "\u2AB7",
          prcue: "\u227C",
          pre: "\u2AAF",
          prec: "\u227A",
          precapprox: "\u2AB7",
          preccurlyeq: "\u227C",
          preceq: "\u2AAF",
          precnapprox: "\u2AB9",
          precneqq: "\u2AB5",
          precnsim: "\u22E8",
          precsim: "\u227E",
          prime: "\u2032",
          primes: "\u2119",
          prnE: "\u2AB5",
          prnap: "\u2AB9",
          prnsim: "\u22E8",
          prod: "\u220F",
          profalar: "\u232E",
          profline: "\u2312",
          profsurf: "\u2313",
          prop: "\u221D",
          propto: "\u221D",
          prsim: "\u227E",
          prurel: "\u22B0",
          pscr: "\u{1D4C5}",
          psi: "\u03C8",
          puncsp: "\u2008",
          qfr: "\u{1D52E}",
          qint: "\u2A0C",
          qopf: "\u{1D562}",
          qprime: "\u2057",
          qscr: "\u{1D4C6}",
          quaternions: "\u210D",
          quatint: "\u2A16",
          quest: "?",
          questeq: "\u225F",
          quot: '"',
          rAarr: "\u21DB",
          rArr: "\u21D2",
          rAtail: "\u291C",
          rBarr: "\u290F",
          rHar: "\u2964",
          race: "\u223D\u0331",
          racute: "\u0155",
          radic: "\u221A",
          raemptyv: "\u29B3",
          rang: "\u27E9",
          rangd: "\u2992",
          range: "\u29A5",
          rangle: "\u27E9",
          raquo: "\xBB",
          rarr: "\u2192",
          rarrap: "\u2975",
          rarrb: "\u21E5",
          rarrbfs: "\u2920",
          rarrc: "\u2933",
          rarrfs: "\u291E",
          rarrhk: "\u21AA",
          rarrlp: "\u21AC",
          rarrpl: "\u2945",
          rarrsim: "\u2974",
          rarrtl: "\u21A3",
          rarrw: "\u219D",
          ratail: "\u291A",
          ratio: "\u2236",
          rationals: "\u211A",
          rbarr: "\u290D",
          rbbrk: "\u2773",
          rbrace: "}",
          rbrack: "]",
          rbrke: "\u298C",
          rbrksld: "\u298E",
          rbrkslu: "\u2990",
          rcaron: "\u0159",
          rcedil: "\u0157",
          rceil: "\u2309",
          rcub: "}",
          rcy: "\u0440",
          rdca: "\u2937",
          rdldhar: "\u2969",
          rdquo: "\u201D",
          rdquor: "\u201D",
          rdsh: "\u21B3",
          real: "\u211C",
          realine: "\u211B",
          realpart: "\u211C",
          reals: "\u211D",
          rect: "\u25AD",
          reg: "\xAE",
          rfisht: "\u297D",
          rfloor: "\u230B",
          rfr: "\u{1D52F}",
          rhard: "\u21C1",
          rharu: "\u21C0",
          rharul: "\u296C",
          rho: "\u03C1",
          rhov: "\u03F1",
          rightarrow: "\u2192",
          rightarrowtail: "\u21A3",
          rightharpoondown: "\u21C1",
          rightharpoonup: "\u21C0",
          rightleftarrows: "\u21C4",
          rightleftharpoons: "\u21CC",
          rightrightarrows: "\u21C9",
          rightsquigarrow: "\u219D",
          rightthreetimes: "\u22CC",
          ring: "\u02DA",
          risingdotseq: "\u2253",
          rlarr: "\u21C4",
          rlhar: "\u21CC",
          rlm: "\u200F",
          rmoust: "\u23B1",
          rmoustache: "\u23B1",
          rnmid: "\u2AEE",
          roang: "\u27ED",
          roarr: "\u21FE",
          robrk: "\u27E7",
          ropar: "\u2986",
          ropf: "\u{1D563}",
          roplus: "\u2A2E",
          rotimes: "\u2A35",
          rpar: ")",
          rpargt: "\u2994",
          rppolint: "\u2A12",
          rrarr: "\u21C9",
          rsaquo: "\u203A",
          rscr: "\u{1D4C7}",
          rsh: "\u21B1",
          rsqb: "]",
          rsquo: "\u2019",
          rsquor: "\u2019",
          rthree: "\u22CC",
          rtimes: "\u22CA",
          rtri: "\u25B9",
          rtrie: "\u22B5",
          rtrif: "\u25B8",
          rtriltri: "\u29CE",
          ruluhar: "\u2968",
          rx: "\u211E",
          sacute: "\u015B",
          sbquo: "\u201A",
          sc: "\u227B",
          scE: "\u2AB4",
          scap: "\u2AB8",
          scaron: "\u0161",
          sccue: "\u227D",
          sce: "\u2AB0",
          scedil: "\u015F",
          scirc: "\u015D",
          scnE: "\u2AB6",
          scnap: "\u2ABA",
          scnsim: "\u22E9",
          scpolint: "\u2A13",
          scsim: "\u227F",
          scy: "\u0441",
          sdot: "\u22C5",
          sdotb: "\u22A1",
          sdote: "\u2A66",
          seArr: "\u21D8",
          searhk: "\u2925",
          searr: "\u2198",
          searrow: "\u2198",
          sect: "\xA7",
          semi: ";",
          seswar: "\u2929",
          setminus: "\u2216",
          setmn: "\u2216",
          sext: "\u2736",
          sfr: "\u{1D530}",
          sfrown: "\u2322",
          sharp: "\u266F",
          shchcy: "\u0449",
          shcy: "\u0448",
          shortmid: "\u2223",
          shortparallel: "\u2225",
          shy: "\xAD",
          sigma: "\u03C3",
          sigmaf: "\u03C2",
          sigmav: "\u03C2",
          sim: "\u223C",
          simdot: "\u2A6A",
          sime: "\u2243",
          simeq: "\u2243",
          simg: "\u2A9E",
          simgE: "\u2AA0",
          siml: "\u2A9D",
          simlE: "\u2A9F",
          simne: "\u2246",
          simplus: "\u2A24",
          simrarr: "\u2972",
          slarr: "\u2190",
          smallsetminus: "\u2216",
          smashp: "\u2A33",
          smeparsl: "\u29E4",
          smid: "\u2223",
          smile: "\u2323",
          smt: "\u2AAA",
          smte: "\u2AAC",
          smtes: "\u2AAC\uFE00",
          softcy: "\u044C",
          sol: "/",
          solb: "\u29C4",
          solbar: "\u233F",
          sopf: "\u{1D564}",
          spades: "\u2660",
          spadesuit: "\u2660",
          spar: "\u2225",
          sqcap: "\u2293",
          sqcaps: "\u2293\uFE00",
          sqcup: "\u2294",
          sqcups: "\u2294\uFE00",
          sqsub: "\u228F",
          sqsube: "\u2291",
          sqsubset: "\u228F",
          sqsubseteq: "\u2291",
          sqsup: "\u2290",
          sqsupe: "\u2292",
          sqsupset: "\u2290",
          sqsupseteq: "\u2292",
          squ: "\u25A1",
          square: "\u25A1",
          squarf: "\u25AA",
          squf: "\u25AA",
          srarr: "\u2192",
          sscr: "\u{1D4C8}",
          ssetmn: "\u2216",
          ssmile: "\u2323",
          sstarf: "\u22C6",
          star: "\u2606",
          starf: "\u2605",
          straightepsilon: "\u03F5",
          straightphi: "\u03D5",
          strns: "\xAF",
          sub: "\u2282",
          subE: "\u2AC5",
          subdot: "\u2ABD",
          sube: "\u2286",
          subedot: "\u2AC3",
          submult: "\u2AC1",
          subnE: "\u2ACB",
          subne: "\u228A",
          subplus: "\u2ABF",
          subrarr: "\u2979",
          subset: "\u2282",
          subseteq: "\u2286",
          subseteqq: "\u2AC5",
          subsetneq: "\u228A",
          subsetneqq: "\u2ACB",
          subsim: "\u2AC7",
          subsub: "\u2AD5",
          subsup: "\u2AD3",
          succ: "\u227B",
          succapprox: "\u2AB8",
          succcurlyeq: "\u227D",
          succeq: "\u2AB0",
          succnapprox: "\u2ABA",
          succneqq: "\u2AB6",
          succnsim: "\u22E9",
          succsim: "\u227F",
          sum: "\u2211",
          sung: "\u266A",
          sup1: "\xB9",
          sup2: "\xB2",
          sup3: "\xB3",
          sup: "\u2283",
          supE: "\u2AC6",
          supdot: "\u2ABE",
          supdsub: "\u2AD8",
          supe: "\u2287",
          supedot: "\u2AC4",
          suphsol: "\u27C9",
          suphsub: "\u2AD7",
          suplarr: "\u297B",
          supmult: "\u2AC2",
          supnE: "\u2ACC",
          supne: "\u228B",
          supplus: "\u2AC0",
          supset: "\u2283",
          supseteq: "\u2287",
          supseteqq: "\u2AC6",
          supsetneq: "\u228B",
          supsetneqq: "\u2ACC",
          supsim: "\u2AC8",
          supsub: "\u2AD4",
          supsup: "\u2AD6",
          swArr: "\u21D9",
          swarhk: "\u2926",
          swarr: "\u2199",
          swarrow: "\u2199",
          swnwar: "\u292A",
          szlig: "\xDF",
          target: "\u2316",
          tau: "\u03C4",
          tbrk: "\u23B4",
          tcaron: "\u0165",
          tcedil: "\u0163",
          tcy: "\u0442",
          tdot: "\u20DB",
          telrec: "\u2315",
          tfr: "\u{1D531}",
          there4: "\u2234",
          therefore: "\u2234",
          theta: "\u03B8",
          thetasym: "\u03D1",
          thetav: "\u03D1",
          thickapprox: "\u2248",
          thicksim: "\u223C",
          thinsp: "\u2009",
          thkap: "\u2248",
          thksim: "\u223C",
          thorn: "\xFE",
          tilde: "\u02DC",
          times: "\xD7",
          timesb: "\u22A0",
          timesbar: "\u2A31",
          timesd: "\u2A30",
          tint: "\u222D",
          toea: "\u2928",
          top: "\u22A4",
          topbot: "\u2336",
          topcir: "\u2AF1",
          topf: "\u{1D565}",
          topfork: "\u2ADA",
          tosa: "\u2929",
          tprime: "\u2034",
          trade: "\u2122",
          triangle: "\u25B5",
          triangledown: "\u25BF",
          triangleleft: "\u25C3",
          trianglelefteq: "\u22B4",
          triangleq: "\u225C",
          triangleright: "\u25B9",
          trianglerighteq: "\u22B5",
          tridot: "\u25EC",
          trie: "\u225C",
          triminus: "\u2A3A",
          triplus: "\u2A39",
          trisb: "\u29CD",
          tritime: "\u2A3B",
          trpezium: "\u23E2",
          tscr: "\u{1D4C9}",
          tscy: "\u0446",
          tshcy: "\u045B",
          tstrok: "\u0167",
          twixt: "\u226C",
          twoheadleftarrow: "\u219E",
          twoheadrightarrow: "\u21A0",
          uArr: "\u21D1",
          uHar: "\u2963",
          uacute: "\xFA",
          uarr: "\u2191",
          ubrcy: "\u045E",
          ubreve: "\u016D",
          ucirc: "\xFB",
          ucy: "\u0443",
          udarr: "\u21C5",
          udblac: "\u0171",
          udhar: "\u296E",
          ufisht: "\u297E",
          ufr: "\u{1D532}",
          ugrave: "\xF9",
          uharl: "\u21BF",
          uharr: "\u21BE",
          uhblk: "\u2580",
          ulcorn: "\u231C",
          ulcorner: "\u231C",
          ulcrop: "\u230F",
          ultri: "\u25F8",
          umacr: "\u016B",
          uml: "\xA8",
          uogon: "\u0173",
          uopf: "\u{1D566}",
          uparrow: "\u2191",
          updownarrow: "\u2195",
          upharpoonleft: "\u21BF",
          upharpoonright: "\u21BE",
          uplus: "\u228E",
          upsi: "\u03C5",
          upsih: "\u03D2",
          upsilon: "\u03C5",
          upuparrows: "\u21C8",
          urcorn: "\u231D",
          urcorner: "\u231D",
          urcrop: "\u230E",
          uring: "\u016F",
          urtri: "\u25F9",
          uscr: "\u{1D4CA}",
          utdot: "\u22F0",
          utilde: "\u0169",
          utri: "\u25B5",
          utrif: "\u25B4",
          uuarr: "\u21C8",
          uuml: "\xFC",
          uwangle: "\u29A7",
          vArr: "\u21D5",
          vBar: "\u2AE8",
          vBarv: "\u2AE9",
          vDash: "\u22A8",
          vangrt: "\u299C",
          varepsilon: "\u03F5",
          varkappa: "\u03F0",
          varnothing: "\u2205",
          varphi: "\u03D5",
          varpi: "\u03D6",
          varpropto: "\u221D",
          varr: "\u2195",
          varrho: "\u03F1",
          varsigma: "\u03C2",
          varsubsetneq: "\u228A\uFE00",
          varsubsetneqq: "\u2ACB\uFE00",
          varsupsetneq: "\u228B\uFE00",
          varsupsetneqq: "\u2ACC\uFE00",
          vartheta: "\u03D1",
          vartriangleleft: "\u22B2",
          vartriangleright: "\u22B3",
          vcy: "\u0432",
          vdash: "\u22A2",
          vee: "\u2228",
          veebar: "\u22BB",
          veeeq: "\u225A",
          vellip: "\u22EE",
          verbar: "|",
          vert: "|",
          vfr: "\u{1D533}",
          vltri: "\u22B2",
          vnsub: "\u2282\u20D2",
          vnsup: "\u2283\u20D2",
          vopf: "\u{1D567}",
          vprop: "\u221D",
          vrtri: "\u22B3",
          vscr: "\u{1D4CB}",
          vsubnE: "\u2ACB\uFE00",
          vsubne: "\u228A\uFE00",
          vsupnE: "\u2ACC\uFE00",
          vsupne: "\u228B\uFE00",
          vzigzag: "\u299A",
          wcirc: "\u0175",
          wedbar: "\u2A5F",
          wedge: "\u2227",
          wedgeq: "\u2259",
          weierp: "\u2118",
          wfr: "\u{1D534}",
          wopf: "\u{1D568}",
          wp: "\u2118",
          wr: "\u2240",
          wreath: "\u2240",
          wscr: "\u{1D4CC}",
          xcap: "\u22C2",
          xcirc: "\u25EF",
          xcup: "\u22C3",
          xdtri: "\u25BD",
          xfr: "\u{1D535}",
          xhArr: "\u27FA",
          xharr: "\u27F7",
          xi: "\u03BE",
          xlArr: "\u27F8",
          xlarr: "\u27F5",
          xmap: "\u27FC",
          xnis: "\u22FB",
          xodot: "\u2A00",
          xopf: "\u{1D569}",
          xoplus: "\u2A01",
          xotime: "\u2A02",
          xrArr: "\u27F9",
          xrarr: "\u27F6",
          xscr: "\u{1D4CD}",
          xsqcup: "\u2A06",
          xuplus: "\u2A04",
          xutri: "\u25B3",
          xvee: "\u22C1",
          xwedge: "\u22C0",
          yacute: "\xFD",
          yacy: "\u044F",
          ycirc: "\u0177",
          ycy: "\u044B",
          yen: "\xA5",
          yfr: "\u{1D536}",
          yicy: "\u0457",
          yopf: "\u{1D56A}",
          yscr: "\u{1D4CE}",
          yucy: "\u044E",
          yuml: "\xFF",
          zacute: "\u017A",
          zcaron: "\u017E",
          zcy: "\u0437",
          zdot: "\u017C",
          zeetrf: "\u2128",
          zeta: "\u03B6",
          zfr: "\u{1D537}",
          zhcy: "\u0436",
          zigrarr: "\u21DD",
          zopf: "\u{1D56B}",
          zscr: "\u{1D4CF}",
          zwj: "\u200D",
          zwnj: "\u200C"
        };
      }
    });
    function decodeNamedCharacterReference(value) {
      return own.call(characterEntities, value) ? characterEntities[value] : false;
    }
    var own;
    var init_decode_named_character_reference = __esm({
      "../../node_modules/.pnpm/decode-named-character-reference@1.0.2/node_modules/decode-named-character-reference/index.js"() {
        init_character_entities();
        own = {}.hasOwnProperty;
      }
    });
    function splice(list22, start, remove, items) {
      const end = list22.length;
      let chunkStart = 0;
      let parameters;
      if (start < 0) {
        start = -start > end ? 0 : end + start;
      } else {
        start = start > end ? end : start;
      }
      remove = remove > 0 ? remove : 0;
      if (items.length < 1e4) {
        parameters = Array.from(items);
        parameters.unshift(start, remove);
        [].splice.apply(list22, parameters);
      } else {
        if (remove)
          [].splice.apply(list22, [start, remove]);
        while (chunkStart < items.length) {
          parameters = items.slice(chunkStart, chunkStart + 1e4);
          parameters.unshift(start, 0);
          [].splice.apply(list22, parameters);
          chunkStart += 1e4;
          start += 1e4;
        }
      }
    }
    function push(list22, items) {
      if (list22.length > 0) {
        splice(list22, list22.length, 0, items);
        return list22;
      }
      return items;
    }
    var init_micromark_util_chunked = __esm({
      "../../node_modules/.pnpm/micromark-util-chunked@1.0.0/node_modules/micromark-util-chunked/index.js"() {
      }
    });
    function combineExtensions(extensions) {
      const all = {};
      let index = -1;
      while (++index < extensions.length) {
        syntaxExtension(all, extensions[index]);
      }
      return all;
    }
    function syntaxExtension(all, extension) {
      let hook;
      for (hook in extension) {
        const maybe = hasOwnProperty.call(all, hook) ? all[hook] : void 0;
        const left = maybe || (all[hook] = {});
        const right = extension[hook];
        let code;
        for (code in right) {
          if (!hasOwnProperty.call(left, code))
            left[code] = [];
          const value = right[code];
          constructs(left[code], Array.isArray(value) ? value : value ? [value] : []);
        }
      }
    }
    function constructs(existing, list22) {
      let index = -1;
      const before = [];
      while (++index < list22.length) {
        ;
        (list22[index].add === "after" ? existing : before).push(list22[index]);
      }
      splice(existing, 0, 0, before);
    }
    function combineHtmlExtensions(htmlExtensions) {
      const handlers = {};
      let index = -1;
      while (++index < htmlExtensions.length) {
        htmlExtension(handlers, htmlExtensions[index]);
      }
      return handlers;
    }
    function htmlExtension(all, extension) {
      let hook;
      for (hook in extension) {
        const maybe = hasOwnProperty.call(all, hook) ? all[hook] : void 0;
        const left = maybe || (all[hook] = {});
        const right = extension[hook];
        let type;
        if (right) {
          for (type in right) {
            left[type] = right[type];
          }
        }
      }
    }
    var hasOwnProperty;
    var init_micromark_util_combine_extensions = __esm({
      "../../node_modules/.pnpm/micromark-util-combine-extensions@1.0.0/node_modules/micromark-util-combine-extensions/index.js"() {
        init_micromark_util_chunked();
        hasOwnProperty = {}.hasOwnProperty;
      }
    });
    function decodeNumericCharacterReference(value, base) {
      const code = Number.parseInt(value, base);
      if (code < 9 || code === 11 || code > 13 && code < 32 || code > 126 && code < 160 || code > 55295 && code < 57344 || code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || code > 1114111) {
        return "\uFFFD";
      }
      return String.fromCharCode(code);
    }
    var init_micromark_util_decode_numeric_character_reference = __esm({
      "../../node_modules/.pnpm/micromark-util-decode-numeric-character-reference@1.0.0/node_modules/micromark-util-decode-numeric-character-reference/index.js"() {
      }
    });
    function encode(value) {
      return value.replace(/["&<>]/g, replace);
      function replace(value2) {
        return "&" + characterReferences[value2] + ";";
      }
    }
    var characterReferences;
    var init_micromark_util_encode = __esm({
      "../../node_modules/.pnpm/micromark-util-encode@1.0.1/node_modules/micromark-util-encode/index.js"() {
        characterReferences = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
      }
    });
    function normalizeIdentifier(value) {
      return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
    }
    var init_micromark_util_normalize_identifier = __esm({
      "../../node_modules/.pnpm/micromark-util-normalize-identifier@1.0.0/node_modules/micromark-util-normalize-identifier/index.js"() {
      }
    });
    var unicodePunctuationRegex;
    var init_unicode_punctuation_regex = __esm({
      "../../node_modules/.pnpm/micromark-util-character@1.1.0/node_modules/micromark-util-character/lib/unicode-punctuation-regex.js"() {
        unicodePunctuationRegex = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
      }
    });
    function asciiControl(code) {
      return code !== null && (code < 32 || code === 127);
    }
    function markdownLineEndingOrSpace(code) {
      return code !== null && (code < 0 || code === 32);
    }
    function markdownLineEnding(code) {
      return code !== null && code < -2;
    }
    function markdownSpace(code) {
      return code === -2 || code === -1 || code === 32;
    }
    function regexCheck(regex) {
      return check;
      function check(code) {
        return code !== null && regex.test(String.fromCharCode(code));
      }
    }
    var asciiAlpha;
    var asciiDigit;
    var asciiHexDigit;
    var asciiAlphanumeric;
    var asciiPunctuation;
    var asciiAtext;
    var unicodeWhitespace;
    var unicodePunctuation;
    var init_micromark_util_character = __esm({
      "../../node_modules/.pnpm/micromark-util-character@1.1.0/node_modules/micromark-util-character/index.js"() {
        init_unicode_punctuation_regex();
        asciiAlpha = regexCheck(/[A-Za-z]/);
        asciiDigit = regexCheck(/\d/);
        asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
        asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
        asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
        asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
        unicodeWhitespace = regexCheck(/\s/);
        unicodePunctuation = regexCheck(unicodePunctuationRegex);
      }
    });
    function sanitizeUri(url2, protocol) {
      const value = encode(normalizeUri(url2 || ""));
      if (!protocol) {
        return value;
      }
      const colon = value.indexOf(":");
      const questionMark = value.indexOf("?");
      const numberSign = value.indexOf("#");
      const slash = value.indexOf("/");
      if (colon < 0 || slash > -1 && colon > slash || questionMark > -1 && colon > questionMark || numberSign > -1 && colon > numberSign || protocol.test(value.slice(0, colon))) {
        return value;
      }
      return "";
    }
    function normalizeUri(value) {
      const result = [];
      let index = -1;
      let start = 0;
      let skip = 0;
      while (++index < value.length) {
        const code = value.charCodeAt(index);
        let replace = "";
        if (code === 37 && asciiAlphanumeric(value.charCodeAt(index + 1)) && asciiAlphanumeric(value.charCodeAt(index + 2))) {
          skip = 2;
        } else if (code < 128) {
          if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) {
            replace = String.fromCharCode(code);
          }
        } else if (code > 55295 && code < 57344) {
          const next = value.charCodeAt(index + 1);
          if (code < 56320 && next > 56319 && next < 57344) {
            replace = String.fromCharCode(code, next);
            skip = 1;
          } else {
            replace = "\uFFFD";
          }
        } else {
          replace = String.fromCharCode(code);
        }
        if (replace) {
          result.push(value.slice(start, index), encodeURIComponent(replace));
          start = index + skip + 1;
          replace = "";
        }
        if (skip) {
          index += skip;
          skip = 0;
        }
      }
      return result.join("") + value.slice(start);
    }
    var init_micromark_util_sanitize_uri = __esm({
      "../../node_modules/.pnpm/micromark-util-sanitize-uri@1.0.0/node_modules/micromark-util-sanitize-uri/index.js"() {
        init_micromark_util_character();
        init_micromark_util_encode();
      }
    });
    function compile(options = {}) {
      let tags = true;
      const definitions = {};
      const buffers = [[]];
      const mediaStack = [];
      const tightStack = [];
      const defaultHandlers = {
        enter: {
          blockQuote: onenterblockquote,
          codeFenced: onentercodefenced,
          codeFencedFenceInfo: buffer,
          codeFencedFenceMeta: buffer,
          codeIndented: onentercodeindented,
          codeText: onentercodetext,
          content: onentercontent,
          definition: onenterdefinition,
          definitionDestinationString: onenterdefinitiondestinationstring,
          definitionLabelString: buffer,
          definitionTitleString: buffer,
          emphasis: onenteremphasis,
          htmlFlow: onenterhtmlflow,
          htmlText: onenterhtml,
          image: onenterimage,
          label: buffer,
          link: onenterlink,
          listItemMarker: onenterlistitemmarker,
          listItemValue: onenterlistitemvalue,
          listOrdered: onenterlistordered,
          listUnordered: onenterlistunordered,
          paragraph: onenterparagraph,
          reference: buffer,
          resource: onenterresource,
          resourceDestinationString: onenterresourcedestinationstring,
          resourceTitleString: buffer,
          setextHeading: onentersetextheading,
          strong: onenterstrong
        },
        exit: {
          atxHeading: onexitatxheading,
          atxHeadingSequence: onexitatxheadingsequence,
          autolinkEmail: onexitautolinkemail,
          autolinkProtocol: onexitautolinkprotocol,
          blockQuote: onexitblockquote,
          characterEscapeValue: onexitdata,
          characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
          characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
          characterReferenceValue: onexitcharacterreferencevalue,
          codeFenced: onexitflowcode,
          codeFencedFence: onexitcodefencedfence,
          codeFencedFenceInfo: onexitcodefencedfenceinfo,
          codeFencedFenceMeta: resume,
          codeFlowValue: onexitcodeflowvalue,
          codeIndented: onexitflowcode,
          codeText: onexitcodetext,
          codeTextData: onexitdata,
          data: onexitdata,
          definition: onexitdefinition,
          definitionDestinationString: onexitdefinitiondestinationstring,
          definitionLabelString: onexitdefinitionlabelstring,
          definitionTitleString: onexitdefinitiontitlestring,
          emphasis: onexitemphasis,
          hardBreakEscape: onexithardbreak,
          hardBreakTrailing: onexithardbreak,
          htmlFlow: onexithtml,
          htmlFlowData: onexitdata,
          htmlText: onexithtml,
          htmlTextData: onexitdata,
          image: onexitmedia,
          label: onexitlabel,
          labelText: onexitlabeltext,
          lineEnding: onexitlineending,
          link: onexitmedia,
          listOrdered: onexitlistordered,
          listUnordered: onexitlistunordered,
          paragraph: onexitparagraph,
          reference: resume,
          referenceString: onexitreferencestring,
          resource: resume,
          resourceDestinationString: onexitresourcedestinationstring,
          resourceTitleString: onexitresourcetitlestring,
          setextHeading: onexitsetextheading,
          setextHeadingLineSequence: onexitsetextheadinglinesequence,
          setextHeadingText: onexitsetextheadingtext,
          strong: onexitstrong,
          thematicBreak: onexitthematicbreak
        }
      };
      const handlers = combineHtmlExtensions([defaultHandlers].concat(options.htmlExtensions || []));
      const data = {
        tightStack
      };
      const context = {
        lineEndingIfNeeded,
        options,
        encode: encode2,
        raw,
        tag,
        buffer,
        resume,
        setData,
        getData
      };
      let lineEndingStyle = options.defaultLineEnding;
      return compile2;
      function compile2(events) {
        let index = -1;
        let start = 0;
        const listStack = [];
        let head = [];
        let body = [];
        while (++index < events.length) {
          if (!lineEndingStyle && (events[index][1].type === "lineEnding" || events[index][1].type === "lineEndingBlank")) {
            lineEndingStyle = events[index][2].sliceSerialize(events[index][1]);
          }
          if (events[index][1].type === "listOrdered" || events[index][1].type === "listUnordered") {
            if (events[index][0] === "enter") {
              listStack.push(index);
            } else {
              prepareList(events.slice(listStack.pop(), index));
            }
          }
          if (events[index][1].type === "definition") {
            if (events[index][0] === "enter") {
              body = push(body, events.slice(start, index));
              start = index;
            } else {
              head = push(head, events.slice(start, index + 1));
              start = index + 1;
            }
          }
        }
        head = push(head, body);
        head = push(head, events.slice(start));
        index = -1;
        const result = head;
        if (handlers.enter.null) {
          handlers.enter.null.call(context);
        }
        while (++index < events.length) {
          const handler = handlers[result[index][0]];
          if (hasOwnProperty2.call(handler, result[index][1].type)) {
            handler[result[index][1].type].call(Object.assign({
              sliceSerialize: result[index][2].sliceSerialize
            }, context), result[index][1]);
          }
        }
        if (handlers.exit.null) {
          handlers.exit.null.call(context);
        }
        return buffers[0].join("");
      }
      function prepareList(slice) {
        const length = slice.length;
        let index = 0;
        let containerBalance = 0;
        let loose = false;
        let atMarker;
        while (++index < length) {
          const event = slice[index];
          if (event[1]._container) {
            atMarker = void 0;
            if (event[0] === "enter") {
              containerBalance++;
            } else {
              containerBalance--;
            }
          } else
            switch (event[1].type) {
              case "listItemPrefix": {
                if (event[0] === "exit") {
                  atMarker = true;
                }
                break;
              }
              case "linePrefix": {
                break;
              }
              case "lineEndingBlank": {
                if (event[0] === "enter" && !containerBalance) {
                  if (atMarker) {
                    atMarker = void 0;
                  } else {
                    loose = true;
                  }
                }
                break;
              }
              default: {
                atMarker = void 0;
              }
            }
        }
        slice[0][1]._loose = loose;
      }
      function setData(key2, value) {
        data[key2] = value;
      }
      function getData(key2) {
        return data[key2];
      }
      function buffer() {
        buffers.push([]);
      }
      function resume() {
        const buf = buffers.pop();
        return buf.join("");
      }
      function tag(value) {
        if (!tags)
          return;
        setData("lastWasTag", true);
        buffers[buffers.length - 1].push(value);
      }
      function raw(value) {
        setData("lastWasTag");
        buffers[buffers.length - 1].push(value);
      }
      function lineEnding2() {
        raw(lineEndingStyle || "\n");
      }
      function lineEndingIfNeeded() {
        const buffer2 = buffers[buffers.length - 1];
        const slice = buffer2[buffer2.length - 1];
        const previous2 = slice ? slice.charCodeAt(slice.length - 1) : null;
        if (previous2 === 10 || previous2 === 13 || previous2 === null) {
          return;
        }
        lineEnding2();
      }
      function encode2(value) {
        return getData("ignoreEncode") ? value : encode(value);
      }
      function onenterlistordered(token) {
        tightStack.push(!token._loose);
        lineEndingIfNeeded();
        tag("<ol");
        setData("expectFirstItem", true);
      }
      function onenterlistunordered(token) {
        tightStack.push(!token._loose);
        lineEndingIfNeeded();
        tag("<ul");
        setData("expectFirstItem", true);
      }
      function onenterlistitemvalue(token) {
        if (getData("expectFirstItem")) {
          const value = Number.parseInt(this.sliceSerialize(token), 10);
          if (value !== 1) {
            tag(' start="' + encode2(String(value)) + '"');
          }
        }
      }
      function onenterlistitemmarker() {
        if (getData("expectFirstItem")) {
          tag(">");
        } else {
          onexitlistitem();
        }
        lineEndingIfNeeded();
        tag("<li>");
        setData("expectFirstItem");
        setData("lastWasTag");
      }
      function onexitlistordered() {
        onexitlistitem();
        tightStack.pop();
        lineEnding2();
        tag("</ol>");
      }
      function onexitlistunordered() {
        onexitlistitem();
        tightStack.pop();
        lineEnding2();
        tag("</ul>");
      }
      function onexitlistitem() {
        if (getData("lastWasTag") && !getData("slurpAllLineEndings")) {
          lineEndingIfNeeded();
        }
        tag("</li>");
        setData("slurpAllLineEndings");
      }
      function onenterblockquote() {
        tightStack.push(false);
        lineEndingIfNeeded();
        tag("<blockquote>");
      }
      function onexitblockquote() {
        tightStack.pop();
        lineEndingIfNeeded();
        tag("</blockquote>");
        setData("slurpAllLineEndings");
      }
      function onenterparagraph() {
        if (!tightStack[tightStack.length - 1]) {
          lineEndingIfNeeded();
          tag("<p>");
        }
        setData("slurpAllLineEndings");
      }
      function onexitparagraph() {
        if (tightStack[tightStack.length - 1]) {
          setData("slurpAllLineEndings", true);
        } else {
          tag("</p>");
        }
      }
      function onentercodefenced() {
        lineEndingIfNeeded();
        tag("<pre><code");
        setData("fencesCount", 0);
      }
      function onexitcodefencedfenceinfo() {
        const value = resume();
        tag(' class="language-' + value + '"');
      }
      function onexitcodefencedfence() {
        const count = getData("fencesCount") || 0;
        if (!count) {
          tag(">");
          setData("slurpOneLineEnding", true);
        }
        setData("fencesCount", count + 1);
      }
      function onentercodeindented() {
        lineEndingIfNeeded();
        tag("<pre><code>");
      }
      function onexitflowcode() {
        const count = getData("fencesCount");
        if (count !== void 0 && count < 2 && data.tightStack.length > 0 && !getData("lastWasTag")) {
          lineEnding2();
        }
        if (getData("flowCodeSeenData")) {
          lineEndingIfNeeded();
        }
        tag("</code></pre>");
        if (count !== void 0 && count < 2)
          lineEndingIfNeeded();
        setData("flowCodeSeenData");
        setData("fencesCount");
        setData("slurpOneLineEnding");
      }
      function onenterimage() {
        mediaStack.push({
          image: true
        });
        tags = void 0;
      }
      function onenterlink() {
        mediaStack.push({});
      }
      function onexitlabeltext(token) {
        mediaStack[mediaStack.length - 1].labelId = this.sliceSerialize(token);
      }
      function onexitlabel() {
        mediaStack[mediaStack.length - 1].label = resume();
      }
      function onexitreferencestring(token) {
        mediaStack[mediaStack.length - 1].referenceId = this.sliceSerialize(token);
      }
      function onenterresource() {
        buffer();
        mediaStack[mediaStack.length - 1].destination = "";
      }
      function onenterresourcedestinationstring() {
        buffer();
        setData("ignoreEncode", true);
      }
      function onexitresourcedestinationstring() {
        mediaStack[mediaStack.length - 1].destination = resume();
        setData("ignoreEncode");
      }
      function onexitresourcetitlestring() {
        mediaStack[mediaStack.length - 1].title = resume();
      }
      function onexitmedia() {
        let index = mediaStack.length - 1;
        const media = mediaStack[index];
        const id = media.referenceId || media.labelId;
        const context2 = media.destination === void 0 ? definitions[normalizeIdentifier(id)] : media;
        tags = true;
        while (index--) {
          if (mediaStack[index].image) {
            tags = void 0;
            break;
          }
        }
        if (media.image) {
          tag('<img src="' + sanitizeUri(context2.destination, options.allowDangerousProtocol ? void 0 : protocolSrc) + '" alt="');
          raw(media.label);
          tag('"');
        } else {
          tag('<a href="' + sanitizeUri(context2.destination, options.allowDangerousProtocol ? void 0 : protocolHref) + '"');
        }
        tag(context2.title ? ' title="' + context2.title + '"' : "");
        if (media.image) {
          tag(" />");
        } else {
          tag(">");
          raw(media.label);
          tag("</a>");
        }
        mediaStack.pop();
      }
      function onenterdefinition() {
        buffer();
        mediaStack.push({});
      }
      function onexitdefinitionlabelstring(token) {
        resume();
        mediaStack[mediaStack.length - 1].labelId = this.sliceSerialize(token);
      }
      function onenterdefinitiondestinationstring() {
        buffer();
        setData("ignoreEncode", true);
      }
      function onexitdefinitiondestinationstring() {
        mediaStack[mediaStack.length - 1].destination = resume();
        setData("ignoreEncode");
      }
      function onexitdefinitiontitlestring() {
        mediaStack[mediaStack.length - 1].title = resume();
      }
      function onexitdefinition() {
        const media = mediaStack[mediaStack.length - 1];
        const id = normalizeIdentifier(media.labelId);
        resume();
        if (!hasOwnProperty2.call(definitions, id)) {
          definitions[id] = mediaStack[mediaStack.length - 1];
        }
        mediaStack.pop();
      }
      function onentercontent() {
        setData("slurpAllLineEndings", true);
      }
      function onexitatxheadingsequence(token) {
        if (getData("headingRank"))
          return;
        setData("headingRank", this.sliceSerialize(token).length);
        lineEndingIfNeeded();
        tag("<h" + getData("headingRank") + ">");
      }
      function onentersetextheading() {
        buffer();
        setData("slurpAllLineEndings");
      }
      function onexitsetextheadingtext() {
        setData("slurpAllLineEndings", true);
      }
      function onexitatxheading() {
        tag("</h" + getData("headingRank") + ">");
        setData("headingRank");
      }
      function onexitsetextheadinglinesequence(token) {
        setData("headingRank", this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2);
      }
      function onexitsetextheading() {
        const value = resume();
        lineEndingIfNeeded();
        tag("<h" + getData("headingRank") + ">");
        raw(value);
        tag("</h" + getData("headingRank") + ">");
        setData("slurpAllLineEndings");
        setData("headingRank");
      }
      function onexitdata(token) {
        raw(encode2(this.sliceSerialize(token)));
      }
      function onexitlineending(token) {
        if (getData("slurpAllLineEndings")) {
          return;
        }
        if (getData("slurpOneLineEnding")) {
          setData("slurpOneLineEnding");
          return;
        }
        if (getData("inCodeText")) {
          raw(" ");
          return;
        }
        raw(encode2(this.sliceSerialize(token)));
      }
      function onexitcodeflowvalue(token) {
        raw(encode2(this.sliceSerialize(token)));
        setData("flowCodeSeenData", true);
      }
      function onexithardbreak() {
        tag("<br />");
      }
      function onenterhtmlflow() {
        lineEndingIfNeeded();
        onenterhtml();
      }
      function onexithtml() {
        setData("ignoreEncode");
      }
      function onenterhtml() {
        if (options.allowDangerousHtml) {
          setData("ignoreEncode", true);
        }
      }
      function onenteremphasis() {
        tag("<em>");
      }
      function onenterstrong() {
        tag("<strong>");
      }
      function onentercodetext() {
        setData("inCodeText", true);
        tag("<code>");
      }
      function onexitcodetext() {
        setData("inCodeText");
        tag("</code>");
      }
      function onexitemphasis() {
        tag("</em>");
      }
      function onexitstrong() {
        tag("</strong>");
      }
      function onexitthematicbreak() {
        lineEndingIfNeeded();
        tag("<hr />");
      }
      function onexitcharacterreferencemarker(token) {
        setData("characterReferenceType", token.type);
      }
      function onexitcharacterreferencevalue(token) {
        let value = this.sliceSerialize(token);
        value = getData("characterReferenceType") ? decodeNumericCharacterReference(value, getData("characterReferenceType") === "characterReferenceMarkerNumeric" ? 10 : 16) : decodeNamedCharacterReference(value);
        raw(encode2(value));
        setData("characterReferenceType");
      }
      function onexitautolinkprotocol(token) {
        const uri = this.sliceSerialize(token);
        tag('<a href="' + sanitizeUri(uri, options.allowDangerousProtocol ? void 0 : protocolHref) + '">');
        raw(encode2(uri));
        tag("</a>");
      }
      function onexitautolinkemail(token) {
        const uri = this.sliceSerialize(token);
        tag('<a href="' + sanitizeUri("mailto:" + uri) + '">');
        raw(encode2(uri));
        tag("</a>");
      }
    }
    var hasOwnProperty2;
    var protocolHref;
    var protocolSrc;
    var init_compile = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/compile.js"() {
        init_decode_named_character_reference();
        init_micromark_util_combine_extensions();
        init_micromark_util_chunked();
        init_micromark_util_decode_numeric_character_reference();
        init_micromark_util_encode();
        init_micromark_util_normalize_identifier();
        init_micromark_util_sanitize_uri();
        hasOwnProperty2 = {}.hasOwnProperty;
        protocolHref = /^(https?|ircs?|mailto|xmpp)$/i;
        protocolSrc = /^https?$/i;
      }
    });
    function factorySpace(effects, ok, type, max) {
      const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
      let size = 0;
      return start;
      function start(code) {
        if (markdownSpace(code)) {
          effects.enter(type);
          return prefix(code);
        }
        return ok(code);
      }
      function prefix(code) {
        if (markdownSpace(code) && size++ < limit) {
          effects.consume(code);
          return prefix;
        }
        effects.exit(type);
        return ok(code);
      }
    }
    var init_micromark_factory_space = __esm({
      "../../node_modules/.pnpm/micromark-factory-space@1.0.0/node_modules/micromark-factory-space/index.js"() {
        init_micromark_util_character();
      }
    });
    function initializeContent(effects) {
      const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
      let previous2;
      return contentStart;
      function afterContentStartConstruct(code) {
        if (code === null) {
          effects.consume(code);
          return;
        }
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, contentStart, "linePrefix");
      }
      function paragraphInitial(code) {
        effects.enter("paragraph");
        return lineStart(code);
      }
      function lineStart(code) {
        const token = effects.enter("chunkText", {
          contentType: "text",
          previous: previous2
        });
        if (previous2) {
          previous2.next = token;
        }
        previous2 = token;
        return data(code);
      }
      function data(code) {
        if (code === null) {
          effects.exit("chunkText");
          effects.exit("paragraph");
          effects.consume(code);
          return;
        }
        if (markdownLineEnding(code)) {
          effects.consume(code);
          effects.exit("chunkText");
          return lineStart;
        }
        effects.consume(code);
        return data;
      }
    }
    var content;
    var init_content = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/initialize/content.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        content = {
          tokenize: initializeContent
        };
      }
    });
    function initializeDocument(effects) {
      const self2 = this;
      const stack = [];
      let continued = 0;
      let childFlow;
      let childToken;
      let lineStartOffset;
      return start;
      function start(code) {
        if (continued < stack.length) {
          const item = stack[continued];
          self2.containerState = item[1];
          return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
        }
        return checkNewContainers(code);
      }
      function documentContinue(code) {
        continued++;
        if (self2.containerState._closeFlow) {
          self2.containerState._closeFlow = void 0;
          if (childFlow) {
            closeFlow();
          }
          const indexBeforeExits = self2.events.length;
          let indexBeforeFlow = indexBeforeExits;
          let point;
          while (indexBeforeFlow--) {
            if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
              point = self2.events[indexBeforeFlow][1].end;
              break;
            }
          }
          exitContainers(continued);
          let index = indexBeforeExits;
          while (index < self2.events.length) {
            self2.events[index][1].end = Object.assign({}, point);
            index++;
          }
          splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
          self2.events.length = index;
          return checkNewContainers(code);
        }
        return start(code);
      }
      function checkNewContainers(code) {
        if (continued === stack.length) {
          if (!childFlow) {
            return documentContinued(code);
          }
          if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
            return flowStart(code);
          }
          self2.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
        }
        self2.containerState = {};
        return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
      }
      function thereIsANewContainer(code) {
        if (childFlow)
          closeFlow();
        exitContainers(continued);
        return documentContinued(code);
      }
      function thereIsNoNewContainer(code) {
        self2.parser.lazy[self2.now().line] = continued !== stack.length;
        lineStartOffset = self2.now().offset;
        return flowStart(code);
      }
      function documentContinued(code) {
        self2.containerState = {};
        return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
      }
      function containerContinue(code) {
        continued++;
        stack.push([self2.currentConstruct, self2.containerState]);
        return documentContinued(code);
      }
      function flowStart(code) {
        if (code === null) {
          if (childFlow)
            closeFlow();
          exitContainers(0);
          effects.consume(code);
          return;
        }
        childFlow = childFlow || self2.parser.flow(self2.now());
        effects.enter("chunkFlow", {
          contentType: "flow",
          previous: childToken,
          _tokenizer: childFlow
        });
        return flowContinue(code);
      }
      function flowContinue(code) {
        if (code === null) {
          writeToChild(effects.exit("chunkFlow"), true);
          exitContainers(0);
          effects.consume(code);
          return;
        }
        if (markdownLineEnding(code)) {
          effects.consume(code);
          writeToChild(effects.exit("chunkFlow"));
          continued = 0;
          self2.interrupt = void 0;
          return start;
        }
        effects.consume(code);
        return flowContinue;
      }
      function writeToChild(token, eof) {
        const stream = self2.sliceStream(token);
        if (eof)
          stream.push(null);
        token.previous = childToken;
        if (childToken)
          childToken.next = token;
        childToken = token;
        childFlow.defineSkip(token.start);
        childFlow.write(stream);
        if (self2.parser.lazy[token.start.line]) {
          let index = childFlow.events.length;
          while (index--) {
            if (childFlow.events[index][1].start.offset < lineStartOffset && (!childFlow.events[index][1].end || childFlow.events[index][1].end.offset > lineStartOffset)) {
              return;
            }
          }
          const indexBeforeExits = self2.events.length;
          let indexBeforeFlow = indexBeforeExits;
          let seen;
          let point;
          while (indexBeforeFlow--) {
            if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
              if (seen) {
                point = self2.events[indexBeforeFlow][1].end;
                break;
              }
              seen = true;
            }
          }
          exitContainers(continued);
          index = indexBeforeExits;
          while (index < self2.events.length) {
            self2.events[index][1].end = Object.assign({}, point);
            index++;
          }
          splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
          self2.events.length = index;
        }
      }
      function exitContainers(size) {
        let index = stack.length;
        while (index-- > size) {
          const entry = stack[index];
          self2.containerState = entry[1];
          entry[0].exit.call(self2, effects);
        }
        stack.length = size;
      }
      function closeFlow() {
        childFlow.write([null]);
        childToken = void 0;
        childFlow = void 0;
        self2.containerState._closeFlow = void 0;
      }
    }
    function tokenizeContainer(effects, ok, nok) {
      return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
    }
    var document;
    var containerConstruct;
    var init_document = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/initialize/document.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        init_micromark_util_chunked();
        document = {
          tokenize: initializeDocument
        };
        containerConstruct = {
          tokenize: tokenizeContainer
        };
      }
    });
    function classifyCharacter(code) {
      if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
        return 1;
      }
      if (unicodePunctuation(code)) {
        return 2;
      }
    }
    var init_micromark_util_classify_character = __esm({
      "../../node_modules/.pnpm/micromark-util-classify-character@1.0.0/node_modules/micromark-util-classify-character/index.js"() {
        init_micromark_util_character();
      }
    });
    function resolveAll(constructs2, events, context) {
      const called = [];
      let index = -1;
      while (++index < constructs2.length) {
        const resolve = constructs2[index].resolveAll;
        if (resolve && !called.includes(resolve)) {
          events = resolve(events, context);
          called.push(resolve);
        }
      }
      return events;
    }
    var init_micromark_util_resolve_all = __esm({
      "../../node_modules/.pnpm/micromark-util-resolve-all@1.0.0/node_modules/micromark-util-resolve-all/index.js"() {
      }
    });
    function resolveAllAttention(events, context) {
      let index = -1;
      let open;
      let group;
      let text3;
      let openingSequence;
      let closingSequence;
      let use;
      let nextEvents;
      let offset;
      while (++index < events.length) {
        if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
          open = index;
          while (open--) {
            if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
              if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) {
                continue;
              }
              use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
              const start = Object.assign({}, events[open][1].end);
              const end = Object.assign({}, events[index][1].start);
              movePoint(start, -use);
              movePoint(end, use);
              openingSequence = {
                type: use > 1 ? "strongSequence" : "emphasisSequence",
                start,
                end: Object.assign({}, events[open][1].end)
              };
              closingSequence = {
                type: use > 1 ? "strongSequence" : "emphasisSequence",
                start: Object.assign({}, events[index][1].start),
                end
              };
              text3 = {
                type: use > 1 ? "strongText" : "emphasisText",
                start: Object.assign({}, events[open][1].end),
                end: Object.assign({}, events[index][1].start)
              };
              group = {
                type: use > 1 ? "strong" : "emphasis",
                start: Object.assign({}, openingSequence.start),
                end: Object.assign({}, closingSequence.end)
              };
              events[open][1].end = Object.assign({}, openingSequence.start);
              events[index][1].start = Object.assign({}, closingSequence.end);
              nextEvents = [];
              if (events[open][1].end.offset - events[open][1].start.offset) {
                nextEvents = push(nextEvents, [
                  ["enter", events[open][1], context],
                  ["exit", events[open][1], context]
                ]);
              }
              nextEvents = push(nextEvents, [
                ["enter", group, context],
                ["enter", openingSequence, context],
                ["exit", openingSequence, context],
                ["enter", text3, context]
              ]);
              nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
              nextEvents = push(nextEvents, [
                ["exit", text3, context],
                ["enter", closingSequence, context],
                ["exit", closingSequence, context],
                ["exit", group, context]
              ]);
              if (events[index][1].end.offset - events[index][1].start.offset) {
                offset = 2;
                nextEvents = push(nextEvents, [
                  ["enter", events[index][1], context],
                  ["exit", events[index][1], context]
                ]);
              } else {
                offset = 0;
              }
              splice(events, open - 1, index - open + 3, nextEvents);
              index = open + nextEvents.length - offset - 2;
              break;
            }
          }
        }
      }
      index = -1;
      while (++index < events.length) {
        if (events[index][1].type === "attentionSequence") {
          events[index][1].type = "data";
        }
      }
      return events;
    }
    function tokenizeAttention(effects, ok) {
      const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
      const previous2 = this.previous;
      const before = classifyCharacter(previous2);
      let marker;
      return start;
      function start(code) {
        effects.enter("attentionSequence");
        marker = code;
        return sequence(code);
      }
      function sequence(code) {
        if (code === marker) {
          effects.consume(code);
          return sequence;
        }
        const token = effects.exit("attentionSequence");
        const after = classifyCharacter(code);
        const open = !after || after === 2 && before || attentionMarkers2.includes(code);
        const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
        token._open = Boolean(marker === 42 ? open : open && (before || !close));
        token._close = Boolean(marker === 42 ? close : close && (after || !open));
        return ok(code);
      }
    }
    function movePoint(point, offset) {
      point.column += offset;
      point.offset += offset;
      point._bufferIndex += offset;
    }
    var attention;
    var init_attention = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/attention.js"() {
        init_micromark_util_chunked();
        init_micromark_util_classify_character();
        init_micromark_util_resolve_all();
        attention = {
          name: "attention",
          tokenize: tokenizeAttention,
          resolveAll: resolveAllAttention
        };
      }
    });
    function tokenizeAutolink(effects, ok, nok) {
      let size = 1;
      return start;
      function start(code) {
        effects.enter("autolink");
        effects.enter("autolinkMarker");
        effects.consume(code);
        effects.exit("autolinkMarker");
        effects.enter("autolinkProtocol");
        return open;
      }
      function open(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          return schemeOrEmailAtext;
        }
        return asciiAtext(code) ? emailAtext(code) : nok(code);
      }
      function schemeOrEmailAtext(code) {
        return code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code) ? schemeInsideOrEmailAtext(code) : emailAtext(code);
      }
      function schemeInsideOrEmailAtext(code) {
        if (code === 58) {
          effects.consume(code);
          return urlInside;
        }
        if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
          effects.consume(code);
          return schemeInsideOrEmailAtext;
        }
        return emailAtext(code);
      }
      function urlInside(code) {
        if (code === 62) {
          effects.exit("autolinkProtocol");
          return end(code);
        }
        if (code === null || code === 32 || code === 60 || asciiControl(code)) {
          return nok(code);
        }
        effects.consume(code);
        return urlInside;
      }
      function emailAtext(code) {
        if (code === 64) {
          effects.consume(code);
          size = 0;
          return emailAtSignOrDot;
        }
        if (asciiAtext(code)) {
          effects.consume(code);
          return emailAtext;
        }
        return nok(code);
      }
      function emailAtSignOrDot(code) {
        return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
      }
      function emailLabel(code) {
        if (code === 46) {
          effects.consume(code);
          size = 0;
          return emailAtSignOrDot;
        }
        if (code === 62) {
          effects.exit("autolinkProtocol").type = "autolinkEmail";
          return end(code);
        }
        return emailValue(code);
      }
      function emailValue(code) {
        if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
          effects.consume(code);
          return code === 45 ? emailValue : emailLabel;
        }
        return nok(code);
      }
      function end(code) {
        effects.enter("autolinkMarker");
        effects.consume(code);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok;
      }
    }
    var autolink;
    var init_autolink = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/autolink.js"() {
        init_micromark_util_character();
        autolink = {
          name: "autolink",
          tokenize: tokenizeAutolink
        };
      }
    });
    function tokenizeBlankLine(effects, ok, nok) {
      return factorySpace(effects, afterWhitespace, "linePrefix");
      function afterWhitespace(code) {
        return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
      }
    }
    var blankLine;
    var init_blank_line = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/blank-line.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        blankLine = {
          tokenize: tokenizeBlankLine,
          partial: true
        };
      }
    });
    function tokenizeBlockQuoteStart(effects, ok, nok) {
      const self2 = this;
      return start;
      function start(code) {
        if (code === 62) {
          const state = self2.containerState;
          if (!state.open) {
            effects.enter("blockQuote", {
              _container: true
            });
            state.open = true;
          }
          effects.enter("blockQuotePrefix");
          effects.enter("blockQuoteMarker");
          effects.consume(code);
          effects.exit("blockQuoteMarker");
          return after;
        }
        return nok(code);
      }
      function after(code) {
        if (markdownSpace(code)) {
          effects.enter("blockQuotePrefixWhitespace");
          effects.consume(code);
          effects.exit("blockQuotePrefixWhitespace");
          effects.exit("blockQuotePrefix");
          return ok;
        }
        effects.exit("blockQuotePrefix");
        return ok(code);
      }
    }
    function tokenizeBlockQuoteContinuation(effects, ok, nok) {
      return factorySpace(effects, effects.attempt(blockQuote, ok, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
    }
    function exit(effects) {
      effects.exit("blockQuote");
    }
    var blockQuote;
    var init_block_quote = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/block-quote.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        blockQuote = {
          name: "blockQuote",
          tokenize: tokenizeBlockQuoteStart,
          continuation: {
            tokenize: tokenizeBlockQuoteContinuation
          },
          exit
        };
      }
    });
    function tokenizeCharacterEscape(effects, ok, nok) {
      return start;
      function start(code) {
        effects.enter("characterEscape");
        effects.enter("escapeMarker");
        effects.consume(code);
        effects.exit("escapeMarker");
        return open;
      }
      function open(code) {
        if (asciiPunctuation(code)) {
          effects.enter("characterEscapeValue");
          effects.consume(code);
          effects.exit("characterEscapeValue");
          effects.exit("characterEscape");
          return ok;
        }
        return nok(code);
      }
    }
    var characterEscape;
    var init_character_escape = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/character-escape.js"() {
        init_micromark_util_character();
        characterEscape = {
          name: "characterEscape",
          tokenize: tokenizeCharacterEscape
        };
      }
    });
    function tokenizeCharacterReference(effects, ok, nok) {
      const self2 = this;
      let size = 0;
      let max;
      let test;
      return start;
      function start(code) {
        effects.enter("characterReference");
        effects.enter("characterReferenceMarker");
        effects.consume(code);
        effects.exit("characterReferenceMarker");
        return open;
      }
      function open(code) {
        if (code === 35) {
          effects.enter("characterReferenceMarkerNumeric");
          effects.consume(code);
          effects.exit("characterReferenceMarkerNumeric");
          return numeric;
        }
        effects.enter("characterReferenceValue");
        max = 31;
        test = asciiAlphanumeric;
        return value(code);
      }
      function numeric(code) {
        if (code === 88 || code === 120) {
          effects.enter("characterReferenceMarkerHexadecimal");
          effects.consume(code);
          effects.exit("characterReferenceMarkerHexadecimal");
          effects.enter("characterReferenceValue");
          max = 6;
          test = asciiHexDigit;
          return value;
        }
        effects.enter("characterReferenceValue");
        max = 7;
        test = asciiDigit;
        return value(code);
      }
      function value(code) {
        let token;
        if (code === 59 && size) {
          token = effects.exit("characterReferenceValue");
          if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self2.sliceSerialize(token))) {
            return nok(code);
          }
          effects.enter("characterReferenceMarker");
          effects.consume(code);
          effects.exit("characterReferenceMarker");
          effects.exit("characterReference");
          return ok;
        }
        if (test(code) && size++ < max) {
          effects.consume(code);
          return value;
        }
        return nok(code);
      }
    }
    var characterReference;
    var init_character_reference = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/character-reference.js"() {
        init_decode_named_character_reference();
        init_micromark_util_character();
        characterReference = {
          name: "characterReference",
          tokenize: tokenizeCharacterReference
        };
      }
    });
    function tokenizeCodeFenced(effects, ok, nok) {
      const self2 = this;
      const closingFenceConstruct = {
        tokenize: tokenizeClosingFence,
        partial: true
      };
      const nonLazyLine = {
        tokenize: tokenizeNonLazyLine,
        partial: true
      };
      const tail = this.events[this.events.length - 1];
      const initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
      let sizeOpen = 0;
      let marker;
      return start;
      function start(code) {
        effects.enter("codeFenced");
        effects.enter("codeFencedFence");
        effects.enter("codeFencedFenceSequence");
        marker = code;
        return sequenceOpen(code);
      }
      function sequenceOpen(code) {
        if (code === marker) {
          effects.consume(code);
          sizeOpen++;
          return sequenceOpen;
        }
        effects.exit("codeFencedFenceSequence");
        return sizeOpen < 3 ? nok(code) : factorySpace(effects, infoOpen, "whitespace")(code);
      }
      function infoOpen(code) {
        if (code === null || markdownLineEnding(code)) {
          return openAfter(code);
        }
        effects.enter("codeFencedFenceInfo");
        effects.enter("chunkString", {
          contentType: "string"
        });
        return info(code);
      }
      function info(code) {
        if (code === null || markdownLineEndingOrSpace(code)) {
          effects.exit("chunkString");
          effects.exit("codeFencedFenceInfo");
          return factorySpace(effects, infoAfter, "whitespace")(code);
        }
        if (code === 96 && code === marker)
          return nok(code);
        effects.consume(code);
        return info;
      }
      function infoAfter(code) {
        if (code === null || markdownLineEnding(code)) {
          return openAfter(code);
        }
        effects.enter("codeFencedFenceMeta");
        effects.enter("chunkString", {
          contentType: "string"
        });
        return meta(code);
      }
      function meta(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("chunkString");
          effects.exit("codeFencedFenceMeta");
          return openAfter(code);
        }
        if (code === 96 && code === marker)
          return nok(code);
        effects.consume(code);
        return meta;
      }
      function openAfter(code) {
        effects.exit("codeFencedFence");
        return self2.interrupt ? ok(code) : contentStart(code);
      }
      function contentStart(code) {
        if (code === null) {
          return after(code);
        }
        if (markdownLineEnding(code)) {
          return effects.attempt(nonLazyLine, effects.attempt(closingFenceConstruct, after, initialPrefix ? factorySpace(effects, contentStart, "linePrefix", initialPrefix + 1) : contentStart), after)(code);
        }
        effects.enter("codeFlowValue");
        return contentContinue(code);
      }
      function contentContinue(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("codeFlowValue");
          return contentStart(code);
        }
        effects.consume(code);
        return contentContinue;
      }
      function after(code) {
        effects.exit("codeFenced");
        return ok(code);
      }
      function tokenizeNonLazyLine(effects2, ok2, nok2) {
        const self3 = this;
        return start2;
        function start2(code) {
          effects2.enter("lineEnding");
          effects2.consume(code);
          effects2.exit("lineEnding");
          return lineStart;
        }
        function lineStart(code) {
          return self3.parser.lazy[self3.now().line] ? nok2(code) : ok2(code);
        }
      }
      function tokenizeClosingFence(effects2, ok2, nok2) {
        let size = 0;
        return factorySpace(effects2, closingSequenceStart, "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
        function closingSequenceStart(code) {
          effects2.enter("codeFencedFence");
          effects2.enter("codeFencedFenceSequence");
          return closingSequence(code);
        }
        function closingSequence(code) {
          if (code === marker) {
            effects2.consume(code);
            size++;
            return closingSequence;
          }
          if (size < sizeOpen)
            return nok2(code);
          effects2.exit("codeFencedFenceSequence");
          return factorySpace(effects2, closingSequenceEnd, "whitespace")(code);
        }
        function closingSequenceEnd(code) {
          if (code === null || markdownLineEnding(code)) {
            effects2.exit("codeFencedFence");
            return ok2(code);
          }
          return nok2(code);
        }
      }
    }
    var codeFenced;
    var init_code_fenced = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/code-fenced.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        codeFenced = {
          name: "codeFenced",
          tokenize: tokenizeCodeFenced,
          concrete: true
        };
      }
    });
    function tokenizeCodeIndented(effects, ok, nok) {
      const self2 = this;
      return start;
      function start(code) {
        effects.enter("codeIndented");
        return factorySpace(effects, afterStartPrefix, "linePrefix", 4 + 1)(code);
      }
      function afterStartPrefix(code) {
        const tail = self2.events[self2.events.length - 1];
        return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? afterPrefix(code) : nok(code);
      }
      function afterPrefix(code) {
        if (code === null) {
          return after(code);
        }
        if (markdownLineEnding(code)) {
          return effects.attempt(indentedContent, afterPrefix, after)(code);
        }
        effects.enter("codeFlowValue");
        return content3(code);
      }
      function content3(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("codeFlowValue");
          return afterPrefix(code);
        }
        effects.consume(code);
        return content3;
      }
      function after(code) {
        effects.exit("codeIndented");
        return ok(code);
      }
    }
    function tokenizeIndentedContent(effects, ok, nok) {
      const self2 = this;
      return start;
      function start(code) {
        if (self2.parser.lazy[self2.now().line]) {
          return nok(code);
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return start;
        }
        return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code);
      }
      function afterPrefix(code) {
        const tail = self2.events[self2.events.length - 1];
        return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok(code) : markdownLineEnding(code) ? start(code) : nok(code);
      }
    }
    var codeIndented;
    var indentedContent;
    var init_code_indented = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/code-indented.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        codeIndented = {
          name: "codeIndented",
          tokenize: tokenizeCodeIndented
        };
        indentedContent = {
          tokenize: tokenizeIndentedContent,
          partial: true
        };
      }
    });
    function resolveCodeText(events) {
      let tailExitIndex = events.length - 4;
      let headEnterIndex = 3;
      let index;
      let enter;
      if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
        index = headEnterIndex;
        while (++index < tailExitIndex) {
          if (events[index][1].type === "codeTextData") {
            events[headEnterIndex][1].type = "codeTextPadding";
            events[tailExitIndex][1].type = "codeTextPadding";
            headEnterIndex += 2;
            tailExitIndex -= 2;
            break;
          }
        }
      }
      index = headEnterIndex - 1;
      tailExitIndex++;
      while (++index <= tailExitIndex) {
        if (enter === void 0) {
          if (index !== tailExitIndex && events[index][1].type !== "lineEnding") {
            enter = index;
          }
        } else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
          events[enter][1].type = "codeTextData";
          if (index !== enter + 2) {
            events[enter][1].end = events[index - 1][1].end;
            events.splice(enter + 2, index - enter - 2);
            tailExitIndex -= index - enter - 2;
            index = enter + 2;
          }
          enter = void 0;
        }
      }
      return events;
    }
    function previous(code) {
      return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
    }
    function tokenizeCodeText(effects, ok, nok) {
      const self2 = this;
      let sizeOpen = 0;
      let size;
      let token;
      return start;
      function start(code) {
        effects.enter("codeText");
        effects.enter("codeTextSequence");
        return openingSequence(code);
      }
      function openingSequence(code) {
        if (code === 96) {
          effects.consume(code);
          sizeOpen++;
          return openingSequence;
        }
        effects.exit("codeTextSequence");
        return gap(code);
      }
      function gap(code) {
        if (code === null) {
          return nok(code);
        }
        if (code === 96) {
          token = effects.enter("codeTextSequence");
          size = 0;
          return closingSequence(code);
        }
        if (code === 32) {
          effects.enter("space");
          effects.consume(code);
          effects.exit("space");
          return gap;
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return gap;
        }
        effects.enter("codeTextData");
        return data(code);
      }
      function data(code) {
        if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
          effects.exit("codeTextData");
          return gap(code);
        }
        effects.consume(code);
        return data;
      }
      function closingSequence(code) {
        if (code === 96) {
          effects.consume(code);
          size++;
          return closingSequence;
        }
        if (size === sizeOpen) {
          effects.exit("codeTextSequence");
          effects.exit("codeText");
          return ok(code);
        }
        token.type = "codeTextData";
        return data(code);
      }
    }
    var codeText;
    var init_code_text = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/code-text.js"() {
        init_micromark_util_character();
        codeText = {
          name: "codeText",
          tokenize: tokenizeCodeText,
          resolve: resolveCodeText,
          previous
        };
      }
    });
    function subtokenize(events) {
      const jumps = {};
      let index = -1;
      let event;
      let lineIndex;
      let otherIndex;
      let otherEvent;
      let parameters;
      let subevents;
      let more;
      while (++index < events.length) {
        while (index in jumps) {
          index = jumps[index];
        }
        event = events[index];
        if (index && event[1].type === "chunkFlow" && events[index - 1][1].type === "listItemPrefix") {
          subevents = event[1]._tokenizer.events;
          otherIndex = 0;
          if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
            otherIndex += 2;
          }
          if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
            while (++otherIndex < subevents.length) {
              if (subevents[otherIndex][1].type === "content") {
                break;
              }
              if (subevents[otherIndex][1].type === "chunkText") {
                subevents[otherIndex][1]._isInFirstContentOfListItem = true;
                otherIndex++;
              }
            }
          }
        }
        if (event[0] === "enter") {
          if (event[1].contentType) {
            Object.assign(jumps, subcontent(events, index));
            index = jumps[index];
            more = true;
          }
        } else if (event[1]._container) {
          otherIndex = index;
          lineIndex = void 0;
          while (otherIndex--) {
            otherEvent = events[otherIndex];
            if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
              if (otherEvent[0] === "enter") {
                if (lineIndex) {
                  events[lineIndex][1].type = "lineEndingBlank";
                }
                otherEvent[1].type = "lineEnding";
                lineIndex = otherIndex;
              }
            } else {
              break;
            }
          }
          if (lineIndex) {
            event[1].end = Object.assign({}, events[lineIndex][1].start);
            parameters = events.slice(lineIndex, index);
            parameters.unshift(event);
            splice(events, lineIndex, index - lineIndex + 1, parameters);
          }
        }
      }
      return !more;
    }
    function subcontent(events, eventIndex) {
      const token = events[eventIndex][1];
      const context = events[eventIndex][2];
      let startPosition = eventIndex - 1;
      const startPositions = [];
      const tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
      const childEvents = tokenizer.events;
      const jumps = [];
      const gaps = {};
      let stream;
      let previous2;
      let index = -1;
      let current = token;
      let adjust = 0;
      let start = 0;
      const breaks = [start];
      while (current) {
        while (events[++startPosition][1] !== current) {
        }
        startPositions.push(startPosition);
        if (!current._tokenizer) {
          stream = context.sliceStream(current);
          if (!current.next) {
            stream.push(null);
          }
          if (previous2) {
            tokenizer.defineSkip(current.start);
          }
          if (current._isInFirstContentOfListItem) {
            tokenizer._gfmTasklistFirstContentOfListItem = true;
          }
          tokenizer.write(stream);
          if (current._isInFirstContentOfListItem) {
            tokenizer._gfmTasklistFirstContentOfListItem = void 0;
          }
        }
        previous2 = current;
        current = current.next;
      }
      current = token;
      while (++index < childEvents.length) {
        if (childEvents[index][0] === "exit" && childEvents[index - 1][0] === "enter" && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
          start = index + 1;
          breaks.push(start);
          current._tokenizer = void 0;
          current.previous = void 0;
          current = current.next;
        }
      }
      tokenizer.events = [];
      if (current) {
        current._tokenizer = void 0;
        current.previous = void 0;
      } else {
        breaks.pop();
      }
      index = breaks.length;
      while (index--) {
        const slice = childEvents.slice(breaks[index], breaks[index + 1]);
        const start2 = startPositions.pop();
        jumps.unshift([start2, start2 + slice.length - 1]);
        splice(events, start2, 2, slice);
      }
      index = -1;
      while (++index < jumps.length) {
        gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
        adjust += jumps[index][1] - jumps[index][0] - 1;
      }
      return gaps;
    }
    var init_micromark_util_subtokenize = __esm({
      "../../node_modules/.pnpm/micromark-util-subtokenize@1.0.2/node_modules/micromark-util-subtokenize/index.js"() {
        init_micromark_util_chunked();
      }
    });
    function resolveContent(events) {
      subtokenize(events);
      return events;
    }
    function tokenizeContent(effects, ok) {
      let previous2;
      return start;
      function start(code) {
        effects.enter("content");
        previous2 = effects.enter("chunkContent", {
          contentType: "content"
        });
        return data(code);
      }
      function data(code) {
        if (code === null) {
          return contentEnd(code);
        }
        if (markdownLineEnding(code)) {
          return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
        }
        effects.consume(code);
        return data;
      }
      function contentEnd(code) {
        effects.exit("chunkContent");
        effects.exit("content");
        return ok(code);
      }
      function contentContinue(code) {
        effects.consume(code);
        effects.exit("chunkContent");
        previous2.next = effects.enter("chunkContent", {
          contentType: "content",
          previous: previous2
        });
        previous2 = previous2.next;
        return data;
      }
    }
    function tokenizeContinuation(effects, ok, nok) {
      const self2 = this;
      return startLookahead;
      function startLookahead(code) {
        effects.exit("chunkContent");
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, prefixed, "linePrefix");
      }
      function prefixed(code) {
        if (code === null || markdownLineEnding(code)) {
          return nok(code);
        }
        const tail = self2.events[self2.events.length - 1];
        if (!self2.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
          return ok(code);
        }
        return effects.interrupt(self2.parser.constructs.flow, nok, ok)(code);
      }
    }
    var content2;
    var continuationConstruct;
    var init_content2 = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/content.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        init_micromark_util_subtokenize();
        content2 = {
          tokenize: tokenizeContent,
          resolve: resolveContent
        };
        continuationConstruct = {
          tokenize: tokenizeContinuation,
          partial: true
        };
      }
    });
    function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
      const limit = max || Number.POSITIVE_INFINITY;
      let balance = 0;
      return start;
      function start(code) {
        if (code === 60) {
          effects.enter(type);
          effects.enter(literalType);
          effects.enter(literalMarkerType);
          effects.consume(code);
          effects.exit(literalMarkerType);
          return destinationEnclosedBefore;
        }
        if (code === null || code === 41 || asciiControl(code)) {
          return nok(code);
        }
        effects.enter(type);
        effects.enter(rawType);
        effects.enter(stringType);
        effects.enter("chunkString", {
          contentType: "string"
        });
        return destinationRaw(code);
      }
      function destinationEnclosedBefore(code) {
        if (code === 62) {
          effects.enter(literalMarkerType);
          effects.consume(code);
          effects.exit(literalMarkerType);
          effects.exit(literalType);
          effects.exit(type);
          return ok;
        }
        effects.enter(stringType);
        effects.enter("chunkString", {
          contentType: "string"
        });
        return destinationEnclosed(code);
      }
      function destinationEnclosed(code) {
        if (code === 62) {
          effects.exit("chunkString");
          effects.exit(stringType);
          return destinationEnclosedBefore(code);
        }
        if (code === null || code === 60 || markdownLineEnding(code)) {
          return nok(code);
        }
        effects.consume(code);
        return code === 92 ? destinationEnclosedEscape : destinationEnclosed;
      }
      function destinationEnclosedEscape(code) {
        if (code === 60 || code === 62 || code === 92) {
          effects.consume(code);
          return destinationEnclosed;
        }
        return destinationEnclosed(code);
      }
      function destinationRaw(code) {
        if (code === 40) {
          if (++balance > limit)
            return nok(code);
          effects.consume(code);
          return destinationRaw;
        }
        if (code === 41) {
          if (!balance--) {
            effects.exit("chunkString");
            effects.exit(stringType);
            effects.exit(rawType);
            effects.exit(type);
            return ok(code);
          }
          effects.consume(code);
          return destinationRaw;
        }
        if (code === null || markdownLineEndingOrSpace(code)) {
          if (balance)
            return nok(code);
          effects.exit("chunkString");
          effects.exit(stringType);
          effects.exit(rawType);
          effects.exit(type);
          return ok(code);
        }
        if (asciiControl(code))
          return nok(code);
        effects.consume(code);
        return code === 92 ? destinationRawEscape : destinationRaw;
      }
      function destinationRawEscape(code) {
        if (code === 40 || code === 41 || code === 92) {
          effects.consume(code);
          return destinationRaw;
        }
        return destinationRaw(code);
      }
    }
    var init_micromark_factory_destination = __esm({
      "../../node_modules/.pnpm/micromark-factory-destination@1.0.0/node_modules/micromark-factory-destination/index.js"() {
        init_micromark_util_character();
      }
    });
    function factoryLabel(effects, ok, nok, type, markerType, stringType) {
      const self2 = this;
      let size = 0;
      let data;
      return start;
      function start(code) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.enter(stringType);
        return atBreak;
      }
      function atBreak(code) {
        if (code === null || code === 91 || code === 93 && !data || code === 94 && !size && "_hiddenFootnoteSupport" in self2.parser.constructs || size > 999) {
          return nok(code);
        }
        if (code === 93) {
          effects.exit(stringType);
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          effects.exit(type);
          return ok;
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return atBreak;
        }
        effects.enter("chunkString", {
          contentType: "string"
        });
        return label(code);
      }
      function label(code) {
        if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
          effects.exit("chunkString");
          return atBreak(code);
        }
        effects.consume(code);
        data = data || !markdownSpace(code);
        return code === 92 ? labelEscape : label;
      }
      function labelEscape(code) {
        if (code === 91 || code === 92 || code === 93) {
          effects.consume(code);
          size++;
          return label;
        }
        return label(code);
      }
    }
    var init_micromark_factory_label = __esm({
      "../../node_modules/.pnpm/micromark-factory-label@1.0.2/node_modules/micromark-factory-label/index.js"() {
        init_micromark_util_character();
      }
    });
    function factoryTitle(effects, ok, nok, type, markerType, stringType) {
      let marker;
      return start;
      function start(code) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        marker = code === 40 ? 41 : code;
        return atFirstTitleBreak;
      }
      function atFirstTitleBreak(code) {
        if (code === marker) {
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          effects.exit(type);
          return ok;
        }
        effects.enter(stringType);
        return atTitleBreak(code);
      }
      function atTitleBreak(code) {
        if (code === marker) {
          effects.exit(stringType);
          return atFirstTitleBreak(marker);
        }
        if (code === null) {
          return nok(code);
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return factorySpace(effects, atTitleBreak, "linePrefix");
        }
        effects.enter("chunkString", {
          contentType: "string"
        });
        return title(code);
      }
      function title(code) {
        if (code === marker || code === null || markdownLineEnding(code)) {
          effects.exit("chunkString");
          return atTitleBreak(code);
        }
        effects.consume(code);
        return code === 92 ? titleEscape : title;
      }
      function titleEscape(code) {
        if (code === marker || code === 92) {
          effects.consume(code);
          return title;
        }
        return title(code);
      }
    }
    var init_micromark_factory_title = __esm({
      "../../node_modules/.pnpm/micromark-factory-title@1.0.2/node_modules/micromark-factory-title/index.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
      }
    });
    function factoryWhitespace(effects, ok) {
      let seen;
      return start;
      function start(code) {
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          seen = true;
          return start;
        }
        if (markdownSpace(code)) {
          return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
        }
        return ok(code);
      }
    }
    var init_micromark_factory_whitespace = __esm({
      "../../node_modules/.pnpm/micromark-factory-whitespace@1.0.0/node_modules/micromark-factory-whitespace/index.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
      }
    });
    function tokenizeDefinition(effects, ok, nok) {
      const self2 = this;
      let identifier;
      return start;
      function start(code) {
        effects.enter("definition");
        return factoryLabel.call(self2, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code);
      }
      function labelAfter(code) {
        identifier = normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1));
        if (code === 58) {
          effects.enter("definitionMarker");
          effects.consume(code);
          effects.exit("definitionMarker");
          return factoryWhitespace(effects, factoryDestination(effects, effects.attempt(titleConstruct, factorySpace(effects, after, "whitespace"), factorySpace(effects, after, "whitespace")), nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString"));
        }
        return nok(code);
      }
      function after(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("definition");
          if (!self2.parser.defined.includes(identifier)) {
            self2.parser.defined.push(identifier);
          }
          return ok(code);
        }
        return nok(code);
      }
    }
    function tokenizeTitle(effects, ok, nok) {
      return start;
      function start(code) {
        return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, before)(code) : nok(code);
      }
      function before(code) {
        if (code === 34 || code === 39 || code === 40) {
          return factoryTitle(effects, factorySpace(effects, after, "whitespace"), nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
        }
        return nok(code);
      }
      function after(code) {
        return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
      }
    }
    var definition;
    var titleConstruct;
    var init_definition = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/definition.js"() {
        init_micromark_factory_destination();
        init_micromark_factory_label();
        init_micromark_factory_space();
        init_micromark_factory_title();
        init_micromark_factory_whitespace();
        init_micromark_util_normalize_identifier();
        init_micromark_util_character();
        definition = {
          name: "definition",
          tokenize: tokenizeDefinition
        };
        titleConstruct = {
          tokenize: tokenizeTitle,
          partial: true
        };
      }
    });
    function tokenizeHardBreakEscape(effects, ok, nok) {
      return start;
      function start(code) {
        effects.enter("hardBreakEscape");
        effects.enter("escapeMarker");
        effects.consume(code);
        return open;
      }
      function open(code) {
        if (markdownLineEnding(code)) {
          effects.exit("escapeMarker");
          effects.exit("hardBreakEscape");
          return ok(code);
        }
        return nok(code);
      }
    }
    var hardBreakEscape;
    var init_hard_break_escape = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/hard-break-escape.js"() {
        init_micromark_util_character();
        hardBreakEscape = {
          name: "hardBreakEscape",
          tokenize: tokenizeHardBreakEscape
        };
      }
    });
    function resolveHeadingAtx(events, context) {
      let contentEnd = events.length - 2;
      let contentStart = 3;
      let content3;
      let text3;
      if (events[contentStart][1].type === "whitespace") {
        contentStart += 2;
      }
      if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
        contentEnd -= 2;
      }
      if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
        contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
      }
      if (contentEnd > contentStart) {
        content3 = {
          type: "atxHeadingText",
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end
        };
        text3 = {
          type: "chunkText",
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end,
          contentType: "text"
        };
        splice(events, contentStart, contentEnd - contentStart + 1, [
          ["enter", content3, context],
          ["enter", text3, context],
          ["exit", text3, context],
          ["exit", content3, context]
        ]);
      }
      return events;
    }
    function tokenizeHeadingAtx(effects, ok, nok) {
      const self2 = this;
      let size = 0;
      return start;
      function start(code) {
        effects.enter("atxHeading");
        effects.enter("atxHeadingSequence");
        return fenceOpenInside(code);
      }
      function fenceOpenInside(code) {
        if (code === 35 && size++ < 6) {
          effects.consume(code);
          return fenceOpenInside;
        }
        if (code === null || markdownLineEndingOrSpace(code)) {
          effects.exit("atxHeadingSequence");
          return self2.interrupt ? ok(code) : headingBreak(code);
        }
        return nok(code);
      }
      function headingBreak(code) {
        if (code === 35) {
          effects.enter("atxHeadingSequence");
          return sequence(code);
        }
        if (code === null || markdownLineEnding(code)) {
          effects.exit("atxHeading");
          return ok(code);
        }
        if (markdownSpace(code)) {
          return factorySpace(effects, headingBreak, "whitespace")(code);
        }
        effects.enter("atxHeadingText");
        return data(code);
      }
      function sequence(code) {
        if (code === 35) {
          effects.consume(code);
          return sequence;
        }
        effects.exit("atxHeadingSequence");
        return headingBreak(code);
      }
      function data(code) {
        if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
          effects.exit("atxHeadingText");
          return headingBreak(code);
        }
        effects.consume(code);
        return data;
      }
    }
    var headingAtx;
    var init_heading_atx = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/heading-atx.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        init_micromark_util_chunked();
        headingAtx = {
          name: "headingAtx",
          tokenize: tokenizeHeadingAtx,
          resolve: resolveHeadingAtx
        };
      }
    });
    var htmlBlockNames;
    var htmlRawNames;
    var init_micromark_util_html_tag_name = __esm({
      "../../node_modules/.pnpm/micromark-util-html-tag-name@1.1.0/node_modules/micromark-util-html-tag-name/index.js"() {
        htmlBlockNames = [
          "address",
          "article",
          "aside",
          "base",
          "basefont",
          "blockquote",
          "body",
          "caption",
          "center",
          "col",
          "colgroup",
          "dd",
          "details",
          "dialog",
          "dir",
          "div",
          "dl",
          "dt",
          "fieldset",
          "figcaption",
          "figure",
          "footer",
          "form",
          "frame",
          "frameset",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "head",
          "header",
          "hr",
          "html",
          "iframe",
          "legend",
          "li",
          "link",
          "main",
          "menu",
          "menuitem",
          "nav",
          "noframes",
          "ol",
          "optgroup",
          "option",
          "p",
          "param",
          "section",
          "summary",
          "table",
          "tbody",
          "td",
          "tfoot",
          "th",
          "thead",
          "title",
          "tr",
          "track",
          "ul"
        ];
        htmlRawNames = ["pre", "script", "style", "textarea"];
      }
    });
    function resolveToHtmlFlow(events) {
      let index = events.length;
      while (index--) {
        if (events[index][0] === "enter" && events[index][1].type === "htmlFlow") {
          break;
        }
      }
      if (index > 1 && events[index - 2][1].type === "linePrefix") {
        events[index][1].start = events[index - 2][1].start;
        events[index + 1][1].start = events[index - 2][1].start;
        events.splice(index - 2, 2);
      }
      return events;
    }
    function tokenizeHtmlFlow(effects, ok, nok) {
      const self2 = this;
      let kind;
      let startTag;
      let buffer;
      let index;
      let marker;
      return start;
      function start(code) {
        effects.enter("htmlFlow");
        effects.enter("htmlFlowData");
        effects.consume(code);
        return open;
      }
      function open(code) {
        if (code === 33) {
          effects.consume(code);
          return declarationStart;
        }
        if (code === 47) {
          effects.consume(code);
          return tagCloseStart;
        }
        if (code === 63) {
          effects.consume(code);
          kind = 3;
          return self2.interrupt ? ok : continuationDeclarationInside;
        }
        if (asciiAlpha(code)) {
          effects.consume(code);
          buffer = String.fromCharCode(code);
          startTag = true;
          return tagName;
        }
        return nok(code);
      }
      function declarationStart(code) {
        if (code === 45) {
          effects.consume(code);
          kind = 2;
          return commentOpenInside;
        }
        if (code === 91) {
          effects.consume(code);
          kind = 5;
          buffer = "CDATA[";
          index = 0;
          return cdataOpenInside;
        }
        if (asciiAlpha(code)) {
          effects.consume(code);
          kind = 4;
          return self2.interrupt ? ok : continuationDeclarationInside;
        }
        return nok(code);
      }
      function commentOpenInside(code) {
        if (code === 45) {
          effects.consume(code);
          return self2.interrupt ? ok : continuationDeclarationInside;
        }
        return nok(code);
      }
      function cdataOpenInside(code) {
        if (code === buffer.charCodeAt(index++)) {
          effects.consume(code);
          return index === buffer.length ? self2.interrupt ? ok : continuation : cdataOpenInside;
        }
        return nok(code);
      }
      function tagCloseStart(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          buffer = String.fromCharCode(code);
          return tagName;
        }
        return nok(code);
      }
      function tagName(code) {
        if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
          if (code !== 47 && startTag && htmlRawNames.includes(buffer.toLowerCase())) {
            kind = 1;
            return self2.interrupt ? ok(code) : continuation(code);
          }
          if (htmlBlockNames.includes(buffer.toLowerCase())) {
            kind = 6;
            if (code === 47) {
              effects.consume(code);
              return basicSelfClosing;
            }
            return self2.interrupt ? ok(code) : continuation(code);
          }
          kind = 7;
          return self2.interrupt && !self2.parser.lazy[self2.now().line] ? nok(code) : startTag ? completeAttributeNameBefore(code) : completeClosingTagAfter(code);
        }
        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          buffer += String.fromCharCode(code);
          return tagName;
        }
        return nok(code);
      }
      function basicSelfClosing(code) {
        if (code === 62) {
          effects.consume(code);
          return self2.interrupt ? ok : continuation;
        }
        return nok(code);
      }
      function completeClosingTagAfter(code) {
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeClosingTagAfter;
        }
        return completeEnd(code);
      }
      function completeAttributeNameBefore(code) {
        if (code === 47) {
          effects.consume(code);
          return completeEnd;
        }
        if (code === 58 || code === 95 || asciiAlpha(code)) {
          effects.consume(code);
          return completeAttributeName;
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeNameBefore;
        }
        return completeEnd(code);
      }
      function completeAttributeName(code) {
        if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return completeAttributeName;
        }
        return completeAttributeNameAfter(code);
      }
      function completeAttributeNameAfter(code) {
        if (code === 61) {
          effects.consume(code);
          return completeAttributeValueBefore;
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeNameAfter;
        }
        return completeAttributeNameBefore(code);
      }
      function completeAttributeValueBefore(code) {
        if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
          return nok(code);
        }
        if (code === 34 || code === 39) {
          effects.consume(code);
          marker = code;
          return completeAttributeValueQuoted;
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeValueBefore;
        }
        marker = null;
        return completeAttributeValueUnquoted(code);
      }
      function completeAttributeValueQuoted(code) {
        if (code === null || markdownLineEnding(code)) {
          return nok(code);
        }
        if (code === marker) {
          effects.consume(code);
          return completeAttributeValueQuotedAfter;
        }
        effects.consume(code);
        return completeAttributeValueQuoted;
      }
      function completeAttributeValueUnquoted(code) {
        if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) {
          return completeAttributeNameAfter(code);
        }
        effects.consume(code);
        return completeAttributeValueUnquoted;
      }
      function completeAttributeValueQuotedAfter(code) {
        if (code === 47 || code === 62 || markdownSpace(code)) {
          return completeAttributeNameBefore(code);
        }
        return nok(code);
      }
      function completeEnd(code) {
        if (code === 62) {
          effects.consume(code);
          return completeAfter;
        }
        return nok(code);
      }
      function completeAfter(code) {
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAfter;
        }
        return code === null || markdownLineEnding(code) ? continuation(code) : nok(code);
      }
      function continuation(code) {
        if (code === 45 && kind === 2) {
          effects.consume(code);
          return continuationCommentInside;
        }
        if (code === 60 && kind === 1) {
          effects.consume(code);
          return continuationRawTagOpen;
        }
        if (code === 62 && kind === 4) {
          effects.consume(code);
          return continuationClose;
        }
        if (code === 63 && kind === 3) {
          effects.consume(code);
          return continuationDeclarationInside;
        }
        if (code === 93 && kind === 5) {
          effects.consume(code);
          return continuationCharacterDataInside;
        }
        if (markdownLineEnding(code) && (kind === 6 || kind === 7)) {
          return effects.check(nextBlankConstruct, continuationClose, continuationAtLineEnding)(code);
        }
        if (code === null || markdownLineEnding(code)) {
          return continuationAtLineEnding(code);
        }
        effects.consume(code);
        return continuation;
      }
      function continuationAtLineEnding(code) {
        effects.exit("htmlFlowData");
        return htmlContinueStart(code);
      }
      function htmlContinueStart(code) {
        if (code === null) {
          return done(code);
        }
        if (markdownLineEnding(code)) {
          return effects.attempt({
            tokenize: htmlLineEnd,
            partial: true
          }, htmlContinueStart, done)(code);
        }
        effects.enter("htmlFlowData");
        return continuation(code);
      }
      function htmlLineEnd(effects2, ok2, nok2) {
        return start2;
        function start2(code) {
          effects2.enter("lineEnding");
          effects2.consume(code);
          effects2.exit("lineEnding");
          return lineStart;
        }
        function lineStart(code) {
          return self2.parser.lazy[self2.now().line] ? nok2(code) : ok2(code);
        }
      }
      function continuationCommentInside(code) {
        if (code === 45) {
          effects.consume(code);
          return continuationDeclarationInside;
        }
        return continuation(code);
      }
      function continuationRawTagOpen(code) {
        if (code === 47) {
          effects.consume(code);
          buffer = "";
          return continuationRawEndTag;
        }
        return continuation(code);
      }
      function continuationRawEndTag(code) {
        if (code === 62 && htmlRawNames.includes(buffer.toLowerCase())) {
          effects.consume(code);
          return continuationClose;
        }
        if (asciiAlpha(code) && buffer.length < 8) {
          effects.consume(code);
          buffer += String.fromCharCode(code);
          return continuationRawEndTag;
        }
        return continuation(code);
      }
      function continuationCharacterDataInside(code) {
        if (code === 93) {
          effects.consume(code);
          return continuationDeclarationInside;
        }
        return continuation(code);
      }
      function continuationDeclarationInside(code) {
        if (code === 62) {
          effects.consume(code);
          return continuationClose;
        }
        if (code === 45 && kind === 2) {
          effects.consume(code);
          return continuationDeclarationInside;
        }
        return continuation(code);
      }
      function continuationClose(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("htmlFlowData");
          return done(code);
        }
        effects.consume(code);
        return continuationClose;
      }
      function done(code) {
        effects.exit("htmlFlow");
        return ok(code);
      }
    }
    function tokenizeNextBlank(effects, ok, nok) {
      return start;
      function start(code) {
        effects.exit("htmlFlowData");
        effects.enter("lineEndingBlank");
        effects.consume(code);
        effects.exit("lineEndingBlank");
        return effects.attempt(blankLine, ok, nok);
      }
    }
    var htmlFlow;
    var nextBlankConstruct;
    var init_html_flow = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/html-flow.js"() {
        init_micromark_util_character();
        init_micromark_util_html_tag_name();
        init_blank_line();
        htmlFlow = {
          name: "htmlFlow",
          tokenize: tokenizeHtmlFlow,
          resolveTo: resolveToHtmlFlow,
          concrete: true
        };
        nextBlankConstruct = {
          tokenize: tokenizeNextBlank,
          partial: true
        };
      }
    });
    function tokenizeHtmlText(effects, ok, nok) {
      const self2 = this;
      let marker;
      let buffer;
      let index;
      let returnState;
      return start;
      function start(code) {
        effects.enter("htmlText");
        effects.enter("htmlTextData");
        effects.consume(code);
        return open;
      }
      function open(code) {
        if (code === 33) {
          effects.consume(code);
          return declarationOpen;
        }
        if (code === 47) {
          effects.consume(code);
          return tagCloseStart;
        }
        if (code === 63) {
          effects.consume(code);
          return instruction;
        }
        if (asciiAlpha(code)) {
          effects.consume(code);
          return tagOpen;
        }
        return nok(code);
      }
      function declarationOpen(code) {
        if (code === 45) {
          effects.consume(code);
          return commentOpen;
        }
        if (code === 91) {
          effects.consume(code);
          buffer = "CDATA[";
          index = 0;
          return cdataOpen;
        }
        if (asciiAlpha(code)) {
          effects.consume(code);
          return declaration;
        }
        return nok(code);
      }
      function commentOpen(code) {
        if (code === 45) {
          effects.consume(code);
          return commentStart;
        }
        return nok(code);
      }
      function commentStart(code) {
        if (code === null || code === 62) {
          return nok(code);
        }
        if (code === 45) {
          effects.consume(code);
          return commentStartDash;
        }
        return comment(code);
      }
      function commentStartDash(code) {
        if (code === null || code === 62) {
          return nok(code);
        }
        return comment(code);
      }
      function comment(code) {
        if (code === null) {
          return nok(code);
        }
        if (code === 45) {
          effects.consume(code);
          return commentClose;
        }
        if (markdownLineEnding(code)) {
          returnState = comment;
          return atLineEnding(code);
        }
        effects.consume(code);
        return comment;
      }
      function commentClose(code) {
        if (code === 45) {
          effects.consume(code);
          return end;
        }
        return comment(code);
      }
      function cdataOpen(code) {
        if (code === buffer.charCodeAt(index++)) {
          effects.consume(code);
          return index === buffer.length ? cdata : cdataOpen;
        }
        return nok(code);
      }
      function cdata(code) {
        if (code === null) {
          return nok(code);
        }
        if (code === 93) {
          effects.consume(code);
          return cdataClose;
        }
        if (markdownLineEnding(code)) {
          returnState = cdata;
          return atLineEnding(code);
        }
        effects.consume(code);
        return cdata;
      }
      function cdataClose(code) {
        if (code === 93) {
          effects.consume(code);
          return cdataEnd;
        }
        return cdata(code);
      }
      function cdataEnd(code) {
        if (code === 62) {
          return end(code);
        }
        if (code === 93) {
          effects.consume(code);
          return cdataEnd;
        }
        return cdata(code);
      }
      function declaration(code) {
        if (code === null || code === 62) {
          return end(code);
        }
        if (markdownLineEnding(code)) {
          returnState = declaration;
          return atLineEnding(code);
        }
        effects.consume(code);
        return declaration;
      }
      function instruction(code) {
        if (code === null) {
          return nok(code);
        }
        if (code === 63) {
          effects.consume(code);
          return instructionClose;
        }
        if (markdownLineEnding(code)) {
          returnState = instruction;
          return atLineEnding(code);
        }
        effects.consume(code);
        return instruction;
      }
      function instructionClose(code) {
        return code === 62 ? end(code) : instruction(code);
      }
      function tagCloseStart(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          return tagClose;
        }
        return nok(code);
      }
      function tagClose(code) {
        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return tagClose;
        }
        return tagCloseBetween(code);
      }
      function tagCloseBetween(code) {
        if (markdownLineEnding(code)) {
          returnState = tagCloseBetween;
          return atLineEnding(code);
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return tagCloseBetween;
        }
        return end(code);
      }
      function tagOpen(code) {
        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return tagOpen;
        }
        if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code);
        }
        return nok(code);
      }
      function tagOpenBetween(code) {
        if (code === 47) {
          effects.consume(code);
          return end;
        }
        if (code === 58 || code === 95 || asciiAlpha(code)) {
          effects.consume(code);
          return tagOpenAttributeName;
        }
        if (markdownLineEnding(code)) {
          returnState = tagOpenBetween;
          return atLineEnding(code);
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenBetween;
        }
        return end(code);
      }
      function tagOpenAttributeName(code) {
        if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return tagOpenAttributeName;
        }
        return tagOpenAttributeNameAfter(code);
      }
      function tagOpenAttributeNameAfter(code) {
        if (code === 61) {
          effects.consume(code);
          return tagOpenAttributeValueBefore;
        }
        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeNameAfter;
          return atLineEnding(code);
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenAttributeNameAfter;
        }
        return tagOpenBetween(code);
      }
      function tagOpenAttributeValueBefore(code) {
        if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
          return nok(code);
        }
        if (code === 34 || code === 39) {
          effects.consume(code);
          marker = code;
          return tagOpenAttributeValueQuoted;
        }
        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeValueBefore;
          return atLineEnding(code);
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenAttributeValueBefore;
        }
        effects.consume(code);
        marker = void 0;
        return tagOpenAttributeValueUnquoted;
      }
      function tagOpenAttributeValueQuoted(code) {
        if (code === marker) {
          effects.consume(code);
          return tagOpenAttributeValueQuotedAfter;
        }
        if (code === null) {
          return nok(code);
        }
        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeValueQuoted;
          return atLineEnding(code);
        }
        effects.consume(code);
        return tagOpenAttributeValueQuoted;
      }
      function tagOpenAttributeValueQuotedAfter(code) {
        if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code);
        }
        return nok(code);
      }
      function tagOpenAttributeValueUnquoted(code) {
        if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) {
          return nok(code);
        }
        if (code === 62 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code);
        }
        effects.consume(code);
        return tagOpenAttributeValueUnquoted;
      }
      function atLineEnding(code) {
        effects.exit("htmlTextData");
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, afterPrefix, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
      }
      function afterPrefix(code) {
        effects.enter("htmlTextData");
        return returnState(code);
      }
      function end(code) {
        if (code === 62) {
          effects.consume(code);
          effects.exit("htmlTextData");
          effects.exit("htmlText");
          return ok;
        }
        return nok(code);
      }
    }
    var htmlText;
    var init_html_text = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/html-text.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        htmlText = {
          name: "htmlText",
          tokenize: tokenizeHtmlText
        };
      }
    });
    function resolveAllLabelEnd(events) {
      let index = -1;
      let token;
      while (++index < events.length) {
        token = events[index][1];
        if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
          events.splice(index + 1, token.type === "labelImage" ? 4 : 2);
          token.type = "data";
          index++;
        }
      }
      return events;
    }
    function resolveToLabelEnd(events, context) {
      let index = events.length;
      let offset = 0;
      let token;
      let open;
      let close;
      let media;
      while (index--) {
        token = events[index][1];
        if (open) {
          if (token.type === "link" || token.type === "labelLink" && token._inactive) {
            break;
          }
          if (events[index][0] === "enter" && token.type === "labelLink") {
            token._inactive = true;
          }
        } else if (close) {
          if (events[index][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
            open = index;
            if (token.type !== "labelLink") {
              offset = 2;
              break;
            }
          }
        } else if (token.type === "labelEnd") {
          close = index;
        }
      }
      const group = {
        type: events[open][1].type === "labelLink" ? "link" : "image",
        start: Object.assign({}, events[open][1].start),
        end: Object.assign({}, events[events.length - 1][1].end)
      };
      const label = {
        type: "label",
        start: Object.assign({}, events[open][1].start),
        end: Object.assign({}, events[close][1].end)
      };
      const text3 = {
        type: "labelText",
        start: Object.assign({}, events[open + offset + 2][1].end),
        end: Object.assign({}, events[close - 2][1].start)
      };
      media = [
        ["enter", group, context],
        ["enter", label, context]
      ];
      media = push(media, events.slice(open + 1, open + offset + 3));
      media = push(media, [["enter", text3, context]]);
      media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
      media = push(media, [
        ["exit", text3, context],
        events[close - 2],
        events[close - 1],
        ["exit", label, context]
      ]);
      media = push(media, events.slice(close + 1));
      media = push(media, [["exit", group, context]]);
      splice(events, open, events.length, media);
      return events;
    }
    function tokenizeLabelEnd(effects, ok, nok) {
      const self2 = this;
      let index = self2.events.length;
      let labelStart;
      let defined;
      while (index--) {
        if ((self2.events[index][1].type === "labelImage" || self2.events[index][1].type === "labelLink") && !self2.events[index][1]._balanced) {
          labelStart = self2.events[index][1];
          break;
        }
      }
      return start;
      function start(code) {
        if (!labelStart) {
          return nok(code);
        }
        if (labelStart._inactive)
          return balanced(code);
        defined = self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize({
          start: labelStart.end,
          end: self2.now()
        })));
        effects.enter("labelEnd");
        effects.enter("labelMarker");
        effects.consume(code);
        effects.exit("labelMarker");
        effects.exit("labelEnd");
        return afterLabelEnd;
      }
      function afterLabelEnd(code) {
        if (code === 40) {
          return effects.attempt(resourceConstruct, ok, defined ? ok : balanced)(code);
        }
        if (code === 91) {
          return effects.attempt(fullReferenceConstruct, ok, defined ? effects.attempt(collapsedReferenceConstruct, ok, balanced) : balanced)(code);
        }
        return defined ? ok(code) : balanced(code);
      }
      function balanced(code) {
        labelStart._balanced = true;
        return nok(code);
      }
    }
    function tokenizeResource(effects, ok, nok) {
      return start;
      function start(code) {
        effects.enter("resource");
        effects.enter("resourceMarker");
        effects.consume(code);
        effects.exit("resourceMarker");
        return factoryWhitespace(effects, open);
      }
      function open(code) {
        if (code === 41) {
          return end(code);
        }
        return factoryDestination(effects, destinationAfter, nok, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code);
      }
      function destinationAfter(code) {
        return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, between)(code) : end(code);
      }
      function between(code) {
        if (code === 34 || code === 39 || code === 40) {
          return factoryTitle(effects, factoryWhitespace(effects, end), nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
        }
        return end(code);
      }
      function end(code) {
        if (code === 41) {
          effects.enter("resourceMarker");
          effects.consume(code);
          effects.exit("resourceMarker");
          effects.exit("resource");
          return ok;
        }
        return nok(code);
      }
    }
    function tokenizeFullReference(effects, ok, nok) {
      const self2 = this;
      return start;
      function start(code) {
        return factoryLabel.call(self2, effects, afterLabel, nok, "reference", "referenceMarker", "referenceString")(code);
      }
      function afterLabel(code) {
        return self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1))) ? ok(code) : nok(code);
      }
    }
    function tokenizeCollapsedReference(effects, ok, nok) {
      return start;
      function start(code) {
        effects.enter("reference");
        effects.enter("referenceMarker");
        effects.consume(code);
        effects.exit("referenceMarker");
        return open;
      }
      function open(code) {
        if (code === 93) {
          effects.enter("referenceMarker");
          effects.consume(code);
          effects.exit("referenceMarker");
          effects.exit("reference");
          return ok;
        }
        return nok(code);
      }
    }
    var labelEnd;
    var resourceConstruct;
    var fullReferenceConstruct;
    var collapsedReferenceConstruct;
    var init_label_end = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/label-end.js"() {
        init_micromark_factory_destination();
        init_micromark_factory_label();
        init_micromark_factory_title();
        init_micromark_factory_whitespace();
        init_micromark_util_character();
        init_micromark_util_chunked();
        init_micromark_util_normalize_identifier();
        init_micromark_util_resolve_all();
        labelEnd = {
          name: "labelEnd",
          tokenize: tokenizeLabelEnd,
          resolveTo: resolveToLabelEnd,
          resolveAll: resolveAllLabelEnd
        };
        resourceConstruct = {
          tokenize: tokenizeResource
        };
        fullReferenceConstruct = {
          tokenize: tokenizeFullReference
        };
        collapsedReferenceConstruct = {
          tokenize: tokenizeCollapsedReference
        };
      }
    });
    function tokenizeLabelStartImage(effects, ok, nok) {
      const self2 = this;
      return start;
      function start(code) {
        effects.enter("labelImage");
        effects.enter("labelImageMarker");
        effects.consume(code);
        effects.exit("labelImageMarker");
        return open;
      }
      function open(code) {
        if (code === 91) {
          effects.enter("labelMarker");
          effects.consume(code);
          effects.exit("labelMarker");
          effects.exit("labelImage");
          return after;
        }
        return nok(code);
      }
      function after(code) {
        return code === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code) : ok(code);
      }
    }
    var labelStartImage;
    var init_label_start_image = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/label-start-image.js"() {
        init_label_end();
        labelStartImage = {
          name: "labelStartImage",
          tokenize: tokenizeLabelStartImage,
          resolveAll: labelEnd.resolveAll
        };
      }
    });
    function tokenizeLabelStartLink(effects, ok, nok) {
      const self2 = this;
      return start;
      function start(code) {
        effects.enter("labelLink");
        effects.enter("labelMarker");
        effects.consume(code);
        effects.exit("labelMarker");
        effects.exit("labelLink");
        return after;
      }
      function after(code) {
        return code === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code) : ok(code);
      }
    }
    var labelStartLink;
    var init_label_start_link = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/label-start-link.js"() {
        init_label_end();
        labelStartLink = {
          name: "labelStartLink",
          tokenize: tokenizeLabelStartLink,
          resolveAll: labelEnd.resolveAll
        };
      }
    });
    function tokenizeLineEnding(effects, ok) {
      return start;
      function start(code) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, ok, "linePrefix");
      }
    }
    var lineEnding;
    var init_line_ending = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/line-ending.js"() {
        init_micromark_factory_space();
        lineEnding = {
          name: "lineEnding",
          tokenize: tokenizeLineEnding
        };
      }
    });
    function tokenizeThematicBreak(effects, ok, nok) {
      let size = 0;
      let marker;
      return start;
      function start(code) {
        effects.enter("thematicBreak");
        marker = code;
        return atBreak(code);
      }
      function atBreak(code) {
        if (code === marker) {
          effects.enter("thematicBreakSequence");
          return sequence(code);
        }
        if (markdownSpace(code)) {
          return factorySpace(effects, atBreak, "whitespace")(code);
        }
        if (size < 3 || code !== null && !markdownLineEnding(code)) {
          return nok(code);
        }
        effects.exit("thematicBreak");
        return ok(code);
      }
      function sequence(code) {
        if (code === marker) {
          effects.consume(code);
          size++;
          return sequence;
        }
        effects.exit("thematicBreakSequence");
        return atBreak(code);
      }
    }
    var thematicBreak;
    var init_thematic_break = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/thematic-break.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        thematicBreak = {
          name: "thematicBreak",
          tokenize: tokenizeThematicBreak
        };
      }
    });
    function tokenizeListStart(effects, ok, nok) {
      const self2 = this;
      const tail = self2.events[self2.events.length - 1];
      let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
      let size = 0;
      return start;
      function start(code) {
        const kind = self2.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
        if (kind === "listUnordered" ? !self2.containerState.marker || code === self2.containerState.marker : asciiDigit(code)) {
          if (!self2.containerState.type) {
            self2.containerState.type = kind;
            effects.enter(kind, {
              _container: true
            });
          }
          if (kind === "listUnordered") {
            effects.enter("listItemPrefix");
            return code === 42 || code === 45 ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
          }
          if (!self2.interrupt || code === 49) {
            effects.enter("listItemPrefix");
            effects.enter("listItemValue");
            return inside(code);
          }
        }
        return nok(code);
      }
      function inside(code) {
        if (asciiDigit(code) && ++size < 10) {
          effects.consume(code);
          return inside;
        }
        if ((!self2.interrupt || size < 2) && (self2.containerState.marker ? code === self2.containerState.marker : code === 41 || code === 46)) {
          effects.exit("listItemValue");
          return atMarker(code);
        }
        return nok(code);
      }
      function atMarker(code) {
        effects.enter("listItemMarker");
        effects.consume(code);
        effects.exit("listItemMarker");
        self2.containerState.marker = self2.containerState.marker || code;
        return effects.check(blankLine, self2.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
      }
      function onBlank(code) {
        self2.containerState.initialBlankLine = true;
        initialSize++;
        return endOfPrefix(code);
      }
      function otherPrefix(code) {
        if (markdownSpace(code)) {
          effects.enter("listItemPrefixWhitespace");
          effects.consume(code);
          effects.exit("listItemPrefixWhitespace");
          return endOfPrefix;
        }
        return nok(code);
      }
      function endOfPrefix(code) {
        self2.containerState.size = initialSize + self2.sliceSerialize(effects.exit("listItemPrefix"), true).length;
        return ok(code);
      }
    }
    function tokenizeListContinuation(effects, ok, nok) {
      const self2 = this;
      self2.containerState._closeFlow = void 0;
      return effects.check(blankLine, onBlank, notBlank);
      function onBlank(code) {
        self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine;
        return factorySpace(effects, ok, "listItemIndent", self2.containerState.size + 1)(code);
      }
      function notBlank(code) {
        if (self2.containerState.furtherBlankLines || !markdownSpace(code)) {
          self2.containerState.furtherBlankLines = void 0;
          self2.containerState.initialBlankLine = void 0;
          return notInCurrentItem(code);
        }
        self2.containerState.furtherBlankLines = void 0;
        self2.containerState.initialBlankLine = void 0;
        return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
      }
      function notInCurrentItem(code) {
        self2.containerState._closeFlow = true;
        self2.interrupt = void 0;
        return factorySpace(effects, effects.attempt(list, ok, nok), "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
      }
    }
    function tokenizeIndent(effects, ok, nok) {
      const self2 = this;
      return factorySpace(effects, afterPrefix, "listItemIndent", self2.containerState.size + 1);
      function afterPrefix(code) {
        const tail = self2.events[self2.events.length - 1];
        return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self2.containerState.size ? ok(code) : nok(code);
      }
    }
    function tokenizeListEnd(effects) {
      effects.exit(this.containerState.type);
    }
    function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
      const self2 = this;
      return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
      function afterPrefix(code) {
        const tail = self2.events[self2.events.length - 1];
        return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok(code) : nok(code);
      }
    }
    var list;
    var listItemPrefixWhitespaceConstruct;
    var indentConstruct;
    var init_list = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/list.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        init_blank_line();
        init_thematic_break();
        list = {
          name: "list",
          tokenize: tokenizeListStart,
          continuation: {
            tokenize: tokenizeListContinuation
          },
          exit: tokenizeListEnd
        };
        listItemPrefixWhitespaceConstruct = {
          tokenize: tokenizeListItemPrefixWhitespace,
          partial: true
        };
        indentConstruct = {
          tokenize: tokenizeIndent,
          partial: true
        };
      }
    });
    function resolveToSetextUnderline(events, context) {
      let index = events.length;
      let content3;
      let text3;
      let definition2;
      while (index--) {
        if (events[index][0] === "enter") {
          if (events[index][1].type === "content") {
            content3 = index;
            break;
          }
          if (events[index][1].type === "paragraph") {
            text3 = index;
          }
        } else {
          if (events[index][1].type === "content") {
            events.splice(index, 1);
          }
          if (!definition2 && events[index][1].type === "definition") {
            definition2 = index;
          }
        }
      }
      const heading = {
        type: "setextHeading",
        start: Object.assign({}, events[text3][1].start),
        end: Object.assign({}, events[events.length - 1][1].end)
      };
      events[text3][1].type = "setextHeadingText";
      if (definition2) {
        events.splice(text3, 0, ["enter", heading, context]);
        events.splice(definition2 + 1, 0, ["exit", events[content3][1], context]);
        events[content3][1].end = Object.assign({}, events[definition2][1].end);
      } else {
        events[content3][1] = heading;
      }
      events.push(["exit", heading, context]);
      return events;
    }
    function tokenizeSetextUnderline(effects, ok, nok) {
      const self2 = this;
      let index = self2.events.length;
      let marker;
      let paragraph;
      while (index--) {
        if (self2.events[index][1].type !== "lineEnding" && self2.events[index][1].type !== "linePrefix" && self2.events[index][1].type !== "content") {
          paragraph = self2.events[index][1].type === "paragraph";
          break;
        }
      }
      return start;
      function start(code) {
        if (!self2.parser.lazy[self2.now().line] && (self2.interrupt || paragraph)) {
          effects.enter("setextHeadingLine");
          effects.enter("setextHeadingLineSequence");
          marker = code;
          return closingSequence(code);
        }
        return nok(code);
      }
      function closingSequence(code) {
        if (code === marker) {
          effects.consume(code);
          return closingSequence;
        }
        effects.exit("setextHeadingLineSequence");
        return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code);
      }
      function closingSequenceEnd(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("setextHeadingLine");
          return ok(code);
        }
        return nok(code);
      }
    }
    var setextUnderline;
    var init_setext_underline = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/lib/setext-underline.js"() {
        init_micromark_factory_space();
        init_micromark_util_character();
        setextUnderline = {
          name: "setextUnderline",
          tokenize: tokenizeSetextUnderline,
          resolveTo: resolveToSetextUnderline
        };
      }
    });
    var init_micromark_core_commonmark = __esm({
      "../../node_modules/.pnpm/micromark-core-commonmark@1.0.6/node_modules/micromark-core-commonmark/index.js"() {
        init_attention();
        init_autolink();
        init_blank_line();
        init_block_quote();
        init_character_escape();
        init_character_reference();
        init_code_fenced();
        init_code_indented();
        init_code_text();
        init_content2();
        init_definition();
        init_hard_break_escape();
        init_heading_atx();
        init_html_flow();
        init_html_text();
        init_label_end();
        init_label_start_image();
        init_label_start_link();
        init_line_ending();
        init_list();
        init_setext_underline();
        init_thematic_break();
      }
    });
    function initializeFlow(effects) {
      const self2 = this;
      const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content2, afterConstruct)), "linePrefix")));
      return initial;
      function atBlankEnding(code) {
        if (code === null) {
          effects.consume(code);
          return;
        }
        effects.enter("lineEndingBlank");
        effects.consume(code);
        effects.exit("lineEndingBlank");
        self2.currentConstruct = void 0;
        return initial;
      }
      function afterConstruct(code) {
        if (code === null) {
          effects.consume(code);
          return;
        }
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        self2.currentConstruct = void 0;
        return initial;
      }
    }
    var flow;
    var init_flow = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/initialize/flow.js"() {
        init_micromark_core_commonmark();
        init_micromark_factory_space();
        flow = {
          tokenize: initializeFlow
        };
      }
    });
    function initializeFactory(field) {
      return {
        tokenize: initializeText,
        resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0)
      };
      function initializeText(effects) {
        const self2 = this;
        const constructs2 = this.parser.constructs[field];
        const text3 = effects.attempt(constructs2, start, notText);
        return start;
        function start(code) {
          return atBreak(code) ? text3(code) : notText(code);
        }
        function notText(code) {
          if (code === null) {
            effects.consume(code);
            return;
          }
          effects.enter("data");
          effects.consume(code);
          return data;
        }
        function data(code) {
          if (atBreak(code)) {
            effects.exit("data");
            return text3(code);
          }
          effects.consume(code);
          return data;
        }
        function atBreak(code) {
          if (code === null) {
            return true;
          }
          const list22 = constructs2[code];
          let index = -1;
          if (list22) {
            while (++index < list22.length) {
              const item = list22[index];
              if (!item.previous || item.previous.call(self2, self2.previous)) {
                return true;
              }
            }
          }
          return false;
        }
      }
    }
    function createResolver(extraResolver) {
      return resolveAllText;
      function resolveAllText(events, context) {
        let index = -1;
        let enter;
        while (++index <= events.length) {
          if (enter === void 0) {
            if (events[index] && events[index][1].type === "data") {
              enter = index;
              index++;
            }
          } else if (!events[index] || events[index][1].type !== "data") {
            if (index !== enter + 2) {
              events[enter][1].end = events[index - 1][1].end;
              events.splice(enter + 2, index - enter - 2);
              index = enter + 2;
            }
            enter = void 0;
          }
        }
        return extraResolver ? extraResolver(events, context) : events;
      }
    }
    function resolveAllLineSuffixes(events, context) {
      let eventIndex = 0;
      while (++eventIndex <= events.length) {
        if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
          const data = events[eventIndex - 1][1];
          const chunks = context.sliceStream(data);
          let index = chunks.length;
          let bufferIndex = -1;
          let size = 0;
          let tabs;
          while (index--) {
            const chunk = chunks[index];
            if (typeof chunk === "string") {
              bufferIndex = chunk.length;
              while (chunk.charCodeAt(bufferIndex - 1) === 32) {
                size++;
                bufferIndex--;
              }
              if (bufferIndex)
                break;
              bufferIndex = -1;
            } else if (chunk === -2) {
              tabs = true;
              size++;
            } else if (chunk === -1) {
            } else {
              index++;
              break;
            }
          }
          if (size) {
            const token = {
              type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
              start: {
                line: data.end.line,
                column: data.end.column - size,
                offset: data.end.offset - size,
                _index: data.start._index + index,
                _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex
              },
              end: Object.assign({}, data.end)
            };
            data.end = Object.assign({}, token.start);
            if (data.start.offset === data.end.offset) {
              Object.assign(data, token);
            } else {
              events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
              eventIndex += 2;
            }
          }
          eventIndex++;
        }
      }
      return events;
    }
    var resolver;
    var string;
    var text;
    var init_text = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/initialize/text.js"() {
        resolver = {
          resolveAll: createResolver()
        };
        string = initializeFactory("string");
        text = initializeFactory("text");
      }
    });
    function createTokenizer(parser, initialize, from) {
      let point = Object.assign(from ? Object.assign({}, from) : {
        line: 1,
        column: 1,
        offset: 0
      }, {
        _index: 0,
        _bufferIndex: -1
      });
      const columnStart = {};
      const resolveAllConstructs = [];
      let chunks = [];
      let stack = [];
      let consumed = true;
      const effects = {
        consume,
        enter,
        exit: exit2,
        attempt: constructFactory(onsuccessfulconstruct),
        check: constructFactory(onsuccessfulcheck),
        interrupt: constructFactory(onsuccessfulcheck, {
          interrupt: true
        })
      };
      const context = {
        previous: null,
        code: null,
        containerState: {},
        events: [],
        parser,
        sliceStream,
        sliceSerialize,
        now,
        defineSkip,
        write
      };
      let state = initialize.tokenize.call(context, effects);
      let expectedCode;
      if (initialize.resolveAll) {
        resolveAllConstructs.push(initialize);
      }
      return context;
      function write(slice) {
        chunks = push(chunks, slice);
        main();
        if (chunks[chunks.length - 1] !== null) {
          return [];
        }
        addResult(initialize, 0);
        context.events = resolveAll(resolveAllConstructs, context.events, context);
        return context.events;
      }
      function sliceSerialize(token, expandTabs) {
        return serializeChunks(sliceStream(token), expandTabs);
      }
      function sliceStream(token) {
        return sliceChunks(chunks, token);
      }
      function now() {
        return Object.assign({}, point);
      }
      function defineSkip(value) {
        columnStart[value.line] = value.column;
        accountForPotentialSkip();
      }
      function main() {
        let chunkIndex;
        while (point._index < chunks.length) {
          const chunk = chunks[point._index];
          if (typeof chunk === "string") {
            chunkIndex = point._index;
            if (point._bufferIndex < 0) {
              point._bufferIndex = 0;
            }
            while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
              go(chunk.charCodeAt(point._bufferIndex));
            }
          } else {
            go(chunk);
          }
        }
      }
      function go(code) {
        consumed = void 0;
        expectedCode = code;
        state = state(code);
      }
      function consume(code) {
        if (markdownLineEnding(code)) {
          point.line++;
          point.column = 1;
          point.offset += code === -3 ? 2 : 1;
          accountForPotentialSkip();
        } else if (code !== -1) {
          point.column++;
          point.offset++;
        }
        if (point._bufferIndex < 0) {
          point._index++;
        } else {
          point._bufferIndex++;
          if (point._bufferIndex === chunks[point._index].length) {
            point._bufferIndex = -1;
            point._index++;
          }
        }
        context.previous = code;
        consumed = true;
      }
      function enter(type, fields) {
        const token = fields || {};
        token.type = type;
        token.start = now();
        context.events.push(["enter", token, context]);
        stack.push(token);
        return token;
      }
      function exit2(type) {
        const token = stack.pop();
        token.end = now();
        context.events.push(["exit", token, context]);
        return token;
      }
      function onsuccessfulconstruct(construct, info) {
        addResult(construct, info.from);
      }
      function onsuccessfulcheck(_, info) {
        info.restore();
      }
      function constructFactory(onreturn, fields) {
        return hook;
        function hook(constructs2, returnState, bogusState) {
          let listOfConstructs;
          let constructIndex;
          let currentConstruct;
          let info;
          return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : "tokenize" in constructs2 ? handleListOfConstructs([constructs2]) : handleMapOfConstructs(constructs2);
          function handleMapOfConstructs(map) {
            return start;
            function start(code) {
              const def = code !== null && map[code];
              const all = code !== null && map.null;
              const list22 = [
                ...Array.isArray(def) ? def : def ? [def] : [],
                ...Array.isArray(all) ? all : all ? [all] : []
              ];
              return handleListOfConstructs(list22)(code);
            }
          }
          function handleListOfConstructs(list22) {
            listOfConstructs = list22;
            constructIndex = 0;
            if (list22.length === 0) {
              return bogusState;
            }
            return handleConstruct(list22[constructIndex]);
          }
          function handleConstruct(construct) {
            return start;
            function start(code) {
              info = store();
              currentConstruct = construct;
              if (!construct.partial) {
                context.currentConstruct = construct;
              }
              if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
                return nok(code);
              }
              return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
            }
          }
          function ok(code) {
            consumed = true;
            onreturn(currentConstruct, info);
            return returnState;
          }
          function nok(code) {
            consumed = true;
            info.restore();
            if (++constructIndex < listOfConstructs.length) {
              return handleConstruct(listOfConstructs[constructIndex]);
            }
            return bogusState;
          }
        }
      }
      function addResult(construct, from2) {
        if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
          resolveAllConstructs.push(construct);
        }
        if (construct.resolve) {
          splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
        }
        if (construct.resolveTo) {
          context.events = construct.resolveTo(context.events, context);
        }
      }
      function store() {
        const startPoint = now();
        const startPrevious = context.previous;
        const startCurrentConstruct = context.currentConstruct;
        const startEventsIndex = context.events.length;
        const startStack = Array.from(stack);
        return {
          restore,
          from: startEventsIndex
        };
        function restore() {
          point = startPoint;
          context.previous = startPrevious;
          context.currentConstruct = startCurrentConstruct;
          context.events.length = startEventsIndex;
          stack = startStack;
          accountForPotentialSkip();
        }
      }
      function accountForPotentialSkip() {
        if (point.line in columnStart && point.column < 2) {
          point.column = columnStart[point.line];
          point.offset += columnStart[point.line] - 1;
        }
      }
    }
    function sliceChunks(chunks, token) {
      const startIndex = token.start._index;
      const startBufferIndex = token.start._bufferIndex;
      const endIndex = token.end._index;
      const endBufferIndex = token.end._bufferIndex;
      let view;
      if (startIndex === endIndex) {
        view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
      } else {
        view = chunks.slice(startIndex, endIndex);
        if (startBufferIndex > -1) {
          view[0] = view[0].slice(startBufferIndex);
        }
        if (endBufferIndex > 0) {
          view.push(chunks[endIndex].slice(0, endBufferIndex));
        }
      }
      return view;
    }
    function serializeChunks(chunks, expandTabs) {
      let index = -1;
      const result = [];
      let atTab;
      while (++index < chunks.length) {
        const chunk = chunks[index];
        let value;
        if (typeof chunk === "string") {
          value = chunk;
        } else
          switch (chunk) {
            case -5: {
              value = "\r";
              break;
            }
            case -4: {
              value = "\n";
              break;
            }
            case -3: {
              value = "\r\n";
              break;
            }
            case -2: {
              value = expandTabs ? " " : "	";
              break;
            }
            case -1: {
              if (!expandTabs && atTab)
                continue;
              value = " ";
              break;
            }
            default: {
              value = String.fromCharCode(chunk);
            }
          }
        atTab = chunk === -2;
        result.push(value);
      }
      return result.join("");
    }
    var init_create_tokenizer = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/create-tokenizer.js"() {
        init_micromark_util_character();
        init_micromark_util_chunked();
        init_micromark_util_resolve_all();
      }
    });
    var constructs_exports = {};
    __export(constructs_exports, {
      attentionMarkers: () => attentionMarkers,
      contentInitial: () => contentInitial,
      disable: () => disable,
      document: () => document2,
      flow: () => flow2,
      flowInitial: () => flowInitial,
      insideSpan: () => insideSpan,
      string: () => string2,
      text: () => text2
    });
    var document2;
    var contentInitial;
    var flowInitial;
    var flow2;
    var string2;
    var text2;
    var insideSpan;
    var attentionMarkers;
    var disable;
    var init_constructs = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/constructs.js"() {
        init_micromark_core_commonmark();
        init_text();
        document2 = {
          [42]: list,
          [43]: list,
          [45]: list,
          [48]: list,
          [49]: list,
          [50]: list,
          [51]: list,
          [52]: list,
          [53]: list,
          [54]: list,
          [55]: list,
          [56]: list,
          [57]: list,
          [62]: blockQuote
        };
        contentInitial = {
          [91]: definition
        };
        flowInitial = {
          [-2]: codeIndented,
          [-1]: codeIndented,
          [32]: codeIndented
        };
        flow2 = {
          [35]: headingAtx,
          [42]: thematicBreak,
          [45]: [setextUnderline, thematicBreak],
          [60]: htmlFlow,
          [61]: setextUnderline,
          [95]: thematicBreak,
          [96]: codeFenced,
          [126]: codeFenced
        };
        string2 = {
          [38]: characterReference,
          [92]: characterEscape
        };
        text2 = {
          [-5]: lineEnding,
          [-4]: lineEnding,
          [-3]: lineEnding,
          [33]: labelStartImage,
          [38]: characterReference,
          [42]: attention,
          [60]: [autolink, htmlText],
          [91]: labelStartLink,
          [92]: [hardBreakEscape, characterEscape],
          [93]: labelEnd,
          [95]: attention,
          [96]: codeText
        };
        insideSpan = {
          null: [attention, resolver]
        };
        attentionMarkers = {
          null: [42, 95]
        };
        disable = {
          null: []
        };
      }
    });
    function parse(options = {}) {
      const constructs2 = combineExtensions([constructs_exports].concat(options.extensions || []));
      const parser = {
        defined: [],
        lazy: {},
        constructs: constructs2,
        content: create(content),
        document: create(document),
        flow: create(flow),
        string: create(string),
        text: create(text)
      };
      return parser;
      function create(initial) {
        return creator;
        function creator(from) {
          return createTokenizer(parser, initial, from);
        }
      }
    }
    var init_parse = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/parse.js"() {
        init_micromark_util_combine_extensions();
        init_content();
        init_document();
        init_flow();
        init_text();
        init_create_tokenizer();
        init_constructs();
      }
    });
    function postprocess(events) {
      while (!subtokenize(events)) {
      }
      return events;
    }
    var init_postprocess = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/postprocess.js"() {
        init_micromark_util_subtokenize();
      }
    });
    function preprocess() {
      let column = 1;
      let buffer = "";
      let start = true;
      let atCarriageReturn;
      return preprocessor;
      function preprocessor(value, encoding, end) {
        const chunks = [];
        let match;
        let next;
        let startPosition;
        let endPosition;
        let code;
        value = buffer + value.toString(encoding);
        startPosition = 0;
        buffer = "";
        if (start) {
          if (value.charCodeAt(0) === 65279) {
            startPosition++;
          }
          start = void 0;
        }
        while (startPosition < value.length) {
          search.lastIndex = startPosition;
          match = search.exec(value);
          endPosition = match && match.index !== void 0 ? match.index : value.length;
          code = value.charCodeAt(endPosition);
          if (!match) {
            buffer = value.slice(startPosition);
            break;
          }
          if (code === 10 && startPosition === endPosition && atCarriageReturn) {
            chunks.push(-3);
            atCarriageReturn = void 0;
          } else {
            if (atCarriageReturn) {
              chunks.push(-5);
              atCarriageReturn = void 0;
            }
            if (startPosition < endPosition) {
              chunks.push(value.slice(startPosition, endPosition));
              column += endPosition - startPosition;
            }
            switch (code) {
              case 0: {
                chunks.push(65533);
                column++;
                break;
              }
              case 9: {
                next = Math.ceil(column / 4) * 4;
                chunks.push(-2);
                while (column++ < next)
                  chunks.push(-1);
                break;
              }
              case 10: {
                chunks.push(-4);
                column = 1;
                break;
              }
              default: {
                atCarriageReturn = true;
                column = 1;
              }
            }
          }
          startPosition = endPosition + 1;
        }
        if (end) {
          if (atCarriageReturn)
            chunks.push(-5);
          if (buffer)
            chunks.push(buffer);
          chunks.push(null);
        }
        return chunks;
      }
    }
    var search;
    var init_preprocess = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/lib/preprocess.js"() {
        search = /[\0\t\n\r]/g;
      }
    });
    var micromark_exports = {};
    __export(micromark_exports, {
      micromark: () => micromark2
    });
    var micromark2;
    var init_micromark = __esm({
      "../../node_modules/.pnpm/micromark@3.0.10/node_modules/micromark/index.js"() {
        init_compile();
        init_parse();
        init_postprocess();
        init_preprocess();
        micromark2 = function(value, encoding, options) {
          if (typeof encoding !== "string") {
            options = encoding;
            encoding = void 0;
          }
          return compile(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
        };
      }
    });
    var require_template = __commonJS({
      "../../packages/template/index.js"(exports, module) {
        var fs = __require("fs");
        var path = require_upath();
        var dayjs = require_dayjs_min();
        var { micromark } = (init_micromark(), __toCommonJS(micromark_exports));
        var render = (template, config, layer) => {
          layer = layer || 0;
          if (layer > 10) {
            throw new Error("More than 10 nested imports discovered. Either you have a very deep import tree (please don't), or there's a circular import, which is not supported.");
          }
          const baseDir = config._baseDir || process.cwd();
          const escapedTemplate = template;
          const o = { ...config };
          const premadePartials = { ...config._partials };
          for (key of Object.keys(premadePartials)) {
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
              const key2 = tokens[1];
              const value = tokens[tokens.length - 1];
              let partialPath = value;
              if (partialPath.startsWith('"') || partialPath.startsWith("'")) {
                partialPath = partialPath.slice(1);
              }
              if (partialPath.endsWith('"') || partialPath.endsWith("'")) {
                partialPath = partialPath.slice(0, partialPath.length - 1);
              }
              importedPartials[key2] = fs.readFileSync(path.resolve(baseDir, partialPath), "utf-8");
              continue;
            }
            processedTemplate += line + "\n";
            finishedImports = true;
          }
          const unparsedPartials = { ...premadePartials, ...importedPartials };
          o._partials = unparsedPartials;
          const partials = {};
          for (let key2 of Object.keys(unparsedPartials)) {
            const p = unparsedPartials[key2];
            if (template.indexOf("partials." + key2) > -1 || template.indexOf('macro("' + key2) > -1 || template.indexOf("macro('" + key2) > -1) {
              partials[key2] = render(p, o, layer + 1);
            }
          }
          const macro = (partialName, vars) => {
            const macroConfig = {
              ...vars,
              _partials: unparsedPartials
            };
            if (typeof partialName !== "string") {
              throw new Error("The macro first argument should be a string that is either the name of the partial, or a link to the partial value");
            }
            const partialValue = unparsedPartials[partialName] || partialName;
            return render(partialValue, macroConfig, layer + 1);
          };
          const md = (text3) => {
            return micromark(text3);
          };
          const date = (rawDate) => {
            return dayjs(rawDate).format("MMM D, YYYY");
          };
          const moreTemplateStrings = /^(?!.*\\\${).*\${/gm;
          let currentString = processedTemplate;
          let renderLayers = 0;
          while (moreTemplateStrings.test(currentString) === true && currentString.indexOf("}") > -1) {
            renderLayers += 1;
            if (renderLayers > 10) {
              throw new Error("More than 10 nested imports discovered. Either you have a very deep import tree (please don't), or there's a circular import, which is not supported.");
            }
            currentString = eval("`" + currentString + "`");
          }
          return currentString.replace(/\\\$/gm, "$");
        };
        module.exports = render;
      }
    });
    var src_exports = {};
    __export(src_exports, {
      MarkdownPlugin: () => MarkdownPlugin
    });
    module.exports = __toCommonJS(src_exports);
    var import_upath2 = __toESM(require_upath());
    var import_fs2 = __toESM(__require("fs"));
    var import_path = __toESM(__require("path"));
    var import_fs = __toESM(__require("fs"));
    var genLayout = (siteInfo, file) => {
      const layout = file.configuration?.layout || "default";
      const layoutPath = import_path.default.resolve(siteInfo.frameDirectory, "layouts", layout + ".html");
      let layoutText = "${o.content}";
      if (import_fs.default.existsSync(layoutPath)) {
        layoutText = import_fs.default.readFileSync(import_path.default.resolve(siteInfo.frameDirectory, "layouts", layout + ".html")).toString();
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
      const feeds = {};
      const referenceFeeds = {};
      if (file.configuration?.feeds) {
        for (let feedName of Object.keys(file.configuration.feeds)) {
          const feed = file.configuration.feeds[feedName];
          const rawQuery = feed.query;
          let query = {};
          query.sortBy = feed.sortBy;
          query.isAscending = feed.isAscending;
          query.limit = feed.limit;
          if (typeof rawQuery === "string") {
            if (rawQuery.startsWith(".")) {
              const directory = import_path.default.resolve(file.sourceDir, rawQuery);
              feeds[feedName] = filePool.queryDirectory(directory, query, false);
              continue;
            }
            if (rawQuery.toLocaleLowerCase().startsWith("dir:")) {
              const directory = import_path.default.resolve(file.sourceDir, rawQuery.slice(4));
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
      const pageReference = {
        id: file.id,
        title: file.title ?? file.name,
        url: "/" + allURLs[file.id],
        sourceName: import_path.default.basename(file.sourcePath),
        created: file.created,
        updated: file.updated,
        date: file.date,
        configuration: file.configuration
      };
      if (existingFeed) {
        const currentIndex = existingFeed.indexOf(file);
        if (currentIndex > 0) {
          pageReference.previousPage = genPageReference(existingFeed[currentIndex - 1], filePool, allURLs);
        }
        if (currentIndex >= 0 && currentIndex < existingFeed.length - 1) {
          pageReference.nextPage = genPageReference(existingFeed[currentIndex + 1], filePool, allURLs);
        }
      }
      return pageReference;
    };
    var import_wanderer_template = __toESM(require_template());
    init_micromark();
    var escapeHTML = (text3) => {
      return text3.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/\$/g, "\\$");
    };
    var parse2 = (input) => {
      let preparseTextPieces = [];
      const codeParts = input.split("\n```");
      let isInCode = false;
      for (let part of codeParts) {
        if (!isInCode) {
          preparseTextPieces.push(part);
        } else {
          preparseTextPieces.push(escapeHTML(part));
        }
        isInCode = !isInCode;
      }
      const parts = preparseTextPieces.join("\n```").split("\n!!!");
      let finalString = "";
      let isInEscapeBlockPointer = false;
      for (let part of parts) {
        if (isInEscapeBlockPointer) {
          finalString += `
${part}`;
        } else {
          finalString += micromark2(part, "utf-8", {
            allowDangerousHtml: true
          });
        }
        isInEscapeBlockPointer = !isInEscapeBlockPointer;
      }
      return finalString;
    };
    var extractLinks = (markdownText) => {
      const regexLinks = /\[(?<text>[^\[]*)\](\((?<link>.*)\))/gm;
      const matches = markdownText.matchAll(regexLinks);
      const links = [];
      if (!matches) {
        return [];
      }
      for (let match of matches) {
        if (match.groups?.link) {
          links.push(match.groups.link);
        }
      }
      return links;
    };
    var isURL = (str) => {
      return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str);
    };
    var import_upath = __toESM(require_upath());
    var getRelativeURL = (site, sourceFileURL, targetURL) => {
      const newLink = import_upath.default.relative(import_upath.default.resolve(site.contentDirectory, import_upath.default.dirname(sourceFileURL)), import_upath.default.resolve(site.contentDirectory, targetURL));
      return newLink;
    };
    var MarkdownPlugin = class {
      constructor() {
        this.extensions = [".md", ".markdown"];
      }
      url(file, site) {
        let relativeDir;
        if (file.configuration?.dir) {
          const resolvedDir = import_upath2.default.resolve(site.contentDirectory, file.configuration.dir);
          relativeDir = import_upath2.default.relative(site.contentDirectory, resolvedDir);
        } else {
          relativeDir = import_upath2.default.relative(site.contentDirectory, file.sourceDir);
        }
        let urlPiece = relativeDir + import_upath2.default.sep + file.name;
        if (file.name === "index") {
          const pathSplit = file.id.split(import_upath2.default.sep);
          if (pathSplit.length > 1) {
            urlPiece = relativeDir + import_upath2.default.sep + pathSplit[pathSplit.length - 2] + import_upath2.default.sep + "index";
          }
        }
        if (["404", "index"].includes(file.name)) {
          return urlPiece + ".html";
        }
        return urlPiece + import_upath2.default.sep + "index.html";
      }
      title(file, site) {
        const page = file;
        const title = page.text.trim().split(/\r\n|\r|\n/g)[0].slice(2).trim();
        return file.configuration?.title || title || file.name;
      }
      build(opts, dryRun = false) {
        const file = opts.file;
        const layoutText = genLayout(opts.site, file);
        const pageStatics = genPageStatics(file, opts.allFiles);
        const feeds = genFeeds(file, opts.database, opts.allURLs);
        const links = extractLinks(file.text);
        let text3 = file.text;
        for (let link of links) {
          if (isURL(link)) {
            continue;
          }
          let linkSourcePath = import_upath2.default.resolve(opts.file.sourceDir, link);
          if (link.startsWith("/")) {
            linkSourcePath = import_upath2.default.resolve(opts.site.contentDirectory, link.slice(1));
          }
          const file2 = opts.allFiles.getFileFromPath(linkSourcePath)[0];
          if (!file2) {
            continue;
          }
          const newURL = opts.allURLs[file2.id];
          const newLink = getRelativeURL(opts.site, opts.url, newURL);
          if (link !== newLink) {
            text3 = text3.replace(link, newLink);
          }
        }
        const html = parse2(text3);
        const pageStaticsURL = {};
        if (pageStatics.css) {
          pageStaticsURL.css = getRelativeURL(opts.site, opts.url, opts.allURLs[pageStatics.css.id] ?? pageStatics.css.id);
        }
        if (pageStatics.js) {
          pageStaticsURL.js = getRelativeURL(opts.site, opts.url, opts.allURLs[pageStatics.js.id] ?? pageStatics.js.id);
        }
        const pageReference = genPageReference(opts.file, opts.database, opts.allURLs, opts.database.queryDirectory(opts.file.sourceDir, {
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
        }));
        const templateVars = {
          ...pageStaticsURL,
          ...file,
          ...file.configuration,
          feeds,
          content: html,
          _baseDir: opts.site.frameDirectory,
          next: pageReference.nextPage,
          previous: pageReference.previousPage
        };
        const templatedHTML = (0, import_wanderer_template.default)(layoutText, templateVars);
        const targetPath = import_upath2.default.resolve(opts.site.buildDirectory, opts.url);
        if (dryRun) {
          console.log(opts);
          console.log(`Markdown plugin running, to save ${targetPath}`);
          return true;
        }
        if (!import_fs2.default.existsSync(targetPath)) {
          import_fs2.default.mkdirSync(import_upath2.default.dirname(targetPath), { recursive: true });
        }
        import_fs2.default.writeFileSync(targetPath, templatedHTML);
        return true;
      }
    };
  }
});

// ../plugins/image/dist/wanderer-image.js
var require_wanderer_image = __commonJS2({
  "../plugins/image/dist/wanderer-image.js"(exports2, module2) {
    var __create3 = Object.create;
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __getProtoOf3 = Object.getPrototypeOf;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __commonJS3 = (cb, mod) => function __require2() {
      return mod || (0, cb[__getOwnPropNames3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps3 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames3(from))
          if (!__hasOwnProp3.call(to, key2) && key2 !== except)
            __defProp3(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc3(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toESM3 = (mod, isNodeMode, target) => (target = mod != null ? __create3(__getProtoOf3(mod)) : {}, __copyProps3(isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target, mod));
    var __toCommonJS2 = (mod) => __copyProps3(__defProp3({}, "__esModule", { value: true }), mod);
    var require_upath3 = __commonJS3({
      "../../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js"(exports3) {
        var VERSION = "1.2.0";
        var extraFn;
        var extraFunctions;
        var isFunction;
        var isString;
        var isValidExt;
        var name;
        var path32;
        var propName;
        var propValue;
        var toUnix;
        var upath;
        var slice = [].slice;
        var indexOf = [].indexOf || function(item) {
          for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
              return i;
          }
          return -1;
        };
        var hasProp = {}.hasOwnProperty;
        path32 = __require("path");
        isFunction = function(val) {
          return val instanceof Function;
        };
        isString = function(val) {
          return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
        };
        upath = exports3;
        upath.VERSION = typeof VERSION !== "undefined" && VERSION !== null ? VERSION : "NO-VERSION";
        toUnix = function(p) {
          var double;
          p = p.replace(/\\/g, "/");
          double = /\/\//;
          while (p.match(double)) {
            p = p.replace(double, "/");
          }
          return p;
        };
        for (propName in path32) {
          propValue = path32[propName];
          if (isFunction(propValue)) {
            upath[propName] = function(propName2) {
              return function() {
                var args, result;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                args = args.map(function(p) {
                  if (isString(p)) {
                    return toUnix(p);
                  } else {
                    return p;
                  }
                });
                result = path32[propName2].apply(path32, args);
                if (isString(result)) {
                  return toUnix(result);
                } else {
                  return result;
                }
              };
            }(propName);
          } else {
            upath[propName] = propValue;
          }
        }
        upath.sep = "/";
        extraFunctions = {
          toUnix,
          normalizeSafe: function(p) {
            p = toUnix(p);
            if (p.startsWith("./")) {
              if (p.startsWith("./..") || p === "./") {
                return upath.normalize(p);
              } else {
                return "./" + upath.normalize(p);
              }
            } else {
              return upath.normalize(p);
            }
          },
          normalizeTrim: function(p) {
            p = upath.normalizeSafe(p);
            if (p.endsWith("/")) {
              return p.slice(0, +(p.length - 2) + 1 || 9e9);
            } else {
              return p;
            }
          },
          joinSafe: function() {
            var p, result;
            p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            result = upath.join.apply(null, p);
            if (p[0].startsWith("./") && !result.startsWith("./")) {
              result = "./" + result;
            }
            return result;
          },
          addExt: function(file, ext) {
            if (!ext) {
              return file;
            } else {
              if (ext[0] !== ".") {
                ext = "." + ext;
              }
              return file + (file.endsWith(ext) ? "" : ext);
            }
          },
          trimExt: function(filename, ignoreExts, maxSize) {
            var oldExt;
            if (maxSize == null) {
              maxSize = 7;
            }
            oldExt = upath.extname(filename);
            if (isValidExt(oldExt, ignoreExts, maxSize)) {
              return filename.slice(0, +(filename.length - oldExt.length - 1) + 1 || 9e9);
            } else {
              return filename;
            }
          },
          removeExt: function(filename, ext) {
            if (!ext) {
              return filename;
            } else {
              ext = ext[0] === "." ? ext : "." + ext;
              if (upath.extname(filename) === ext) {
                return upath.trimExt(filename);
              } else {
                return filename;
              }
            }
          },
          changeExt: function(filename, ext, ignoreExts, maxSize) {
            if (maxSize == null) {
              maxSize = 7;
            }
            return upath.trimExt(filename, ignoreExts, maxSize) + (!ext ? "" : ext[0] === "." ? ext : "." + ext);
          },
          defaultExt: function(filename, ext, ignoreExts, maxSize) {
            var oldExt;
            if (maxSize == null) {
              maxSize = 7;
            }
            oldExt = upath.extname(filename);
            if (isValidExt(oldExt, ignoreExts, maxSize)) {
              return filename;
            } else {
              return upath.addExt(filename, ext);
            }
          }
        };
        isValidExt = function(ext, ignoreExts, maxSize) {
          if (ignoreExts == null) {
            ignoreExts = [];
          }
          return ext && ext.length <= maxSize && indexOf.call(ignoreExts.map(function(e) {
            return (e && e[0] !== "." ? "." : "") + e;
          }), ext) < 0;
        };
        for (name in extraFunctions) {
          if (!hasProp.call(extraFunctions, name))
            continue;
          extraFn = extraFunctions[name];
          if (upath[name] !== void 0) {
            throw new Error("path." + name + " already exists.");
          } else {
            upath[name] = extraFn;
          }
        }
      }
    });
    var require_dayjs_min2 = __commonJS3({
      "../../node_modules/.pnpm/dayjs@1.11.4/node_modules/dayjs/dayjs.min.js"(exports3, module22) {
        !function(t, e) {
          "object" == typeof exports3 && "undefined" != typeof module22 ? module22.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
        }(exports3, function() {
          "use strict";
          var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o2 = "week", f = "month", h = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
            var r2 = String(t2);
            return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
          }, g = { s: m, z: function(t2) {
            var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
            return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
          }, m: function t2(e2, n2) {
            if (e2.date() < n2.date())
              return -t2(n2, e2);
            var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
            return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
          }, a: function(t2) {
            return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
          }, p: function(t2) {
            return { M: f, y: c, w: o2, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
          }, u: function(t2) {
            return void 0 === t2;
          } }, v = "en", D = {};
          D[v] = M;
          var p = function(t2) {
            return t2 instanceof _;
          }, S = function t2(e2, n2, r2) {
            var i2;
            if (!e2)
              return v;
            if ("string" == typeof e2) {
              var s2 = e2.toLowerCase();
              D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
              var u2 = e2.split("-");
              if (!i2 && u2.length > 1)
                return t2(u2[0]);
            } else {
              var a2 = e2.name;
              D[a2] = e2, i2 = a2;
            }
            return !r2 && i2 && (v = i2), i2 || !r2 && v;
          }, w = function(t2, e2) {
            if (p(t2))
              return t2.clone();
            var n2 = "object" == typeof e2 ? e2 : {};
            return n2.date = t2, n2.args = arguments, new _(n2);
          }, O = g;
          O.l = S, O.i = p, O.w = function(t2, e2) {
            return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
          };
          var _ = function() {
            function M2(t2) {
              this.$L = S(t2.locale, null, true), this.parse(t2);
            }
            var m2 = M2.prototype;
            return m2.parse = function(t2) {
              this.$d = function(t3) {
                var e2 = t3.date, n2 = t3.utc;
                if (null === e2)
                  return new Date(NaN);
                if (O.u(e2))
                  return new Date();
                if (e2 instanceof Date)
                  return new Date(e2);
                if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                  var r2 = e2.match(l);
                  if (r2) {
                    var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                    return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                  }
                }
                return new Date(e2);
              }(t2), this.$x = t2.x || {}, this.init();
            }, m2.init = function() {
              var t2 = this.$d;
              this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
            }, m2.$utils = function() {
              return O;
            }, m2.isValid = function() {
              return !(this.$d.toString() === $);
            }, m2.isSame = function(t2, e2) {
              var n2 = w(t2);
              return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
            }, m2.isAfter = function(t2, e2) {
              return w(t2) < this.startOf(e2);
            }, m2.isBefore = function(t2, e2) {
              return this.endOf(e2) < w(t2);
            }, m2.$g = function(t2, e2, n2) {
              return O.u(t2) ? this[e2] : this.set(n2, t2);
            }, m2.unix = function() {
              return Math.floor(this.valueOf() / 1e3);
            }, m2.valueOf = function() {
              return this.$d.getTime();
            }, m2.startOf = function(t2, e2) {
              var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), $2 = function(t3, e3) {
                var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
                return r2 ? i2 : i2.endOf(a);
              }, l2 = function(t3, e3) {
                return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
              }, y2 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
              switch (h2) {
                case c:
                  return r2 ? $2(1, 0) : $2(31, 11);
                case f:
                  return r2 ? $2(1, M3) : $2(0, M3 + 1);
                case o2:
                  var v2 = this.$locale().weekStart || 0, D2 = (y2 < v2 ? y2 + 7 : y2) - v2;
                  return $2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
                case a:
                case d:
                  return l2(g2 + "Hours", 0);
                case u:
                  return l2(g2 + "Minutes", 1);
                case s:
                  return l2(g2 + "Seconds", 2);
                case i:
                  return l2(g2 + "Milliseconds", 3);
                default:
                  return this.clone();
              }
            }, m2.endOf = function(t2) {
              return this.startOf(t2, false);
            }, m2.$set = function(t2, e2) {
              var n2, o22 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), $2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o22], l2 = o22 === a ? this.$D + (e2 - this.$W) : e2;
              if (o22 === f || o22 === c) {
                var y2 = this.clone().set(d, 1);
                y2.$d[$2](l2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
              } else
                $2 && this.$d[$2](l2);
              return this.init(), this;
            }, m2.set = function(t2, e2) {
              return this.clone().$set(t2, e2);
            }, m2.get = function(t2) {
              return this[O.p(t2)]();
            }, m2.add = function(r2, h2) {
              var d2, $2 = this;
              r2 = Number(r2);
              var l2 = O.p(h2), y2 = function(t2) {
                var e2 = w($2);
                return O.w(e2.date(e2.date() + Math.round(t2 * r2)), $2);
              };
              if (l2 === f)
                return this.set(f, this.$M + r2);
              if (l2 === c)
                return this.set(c, this.$y + r2);
              if (l2 === a)
                return y2(1);
              if (l2 === o2)
                return y2(7);
              var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r2 * M3;
              return O.w(m3, this);
            }, m2.subtract = function(t2, e2) {
              return this.add(-1 * t2, e2);
            }, m2.format = function(t2) {
              var e2 = this, n2 = this.$locale();
              if (!this.isValid())
                return n2.invalidDate || $;
              var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o22 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
                return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
              }, c2 = function(t3) {
                return O.s(s2 % 12 || 12, t3, "0");
              }, d2 = n2.meridiem || function(t3, e3, n3) {
                var r3 = t3 < 12 ? "AM" : "PM";
                return n3 ? r3.toLowerCase() : r3;
              }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o22, 2), ddd: h2(n2.weekdaysShort, this.$W, o22, 3), dddd: o22[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
              return r2.replace(y, function(t3, e3) {
                return e3 || l2[t3] || i2.replace(":", "");
              });
            }, m2.utcOffset = function() {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }, m2.diff = function(r2, d2, $2) {
              var l2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, v2 = O.m(this, M3);
              return v2 = (l2 = {}, l2[c] = v2 / 12, l2[f] = v2, l2[h] = v2 / 3, l2[o2] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y2] || g2, $2 ? v2 : O.a(v2);
            }, m2.daysInMonth = function() {
              return this.endOf(f).$D;
            }, m2.$locale = function() {
              return D[this.$L];
            }, m2.locale = function(t2, e2) {
              if (!t2)
                return this.$L;
              var n2 = this.clone(), r2 = S(t2, e2, true);
              return r2 && (n2.$L = r2), n2;
            }, m2.clone = function() {
              return O.w(this.$d, this);
            }, m2.toDate = function() {
              return new Date(this.valueOf());
            }, m2.toJSON = function() {
              return this.isValid() ? this.toISOString() : null;
            }, m2.toISOString = function() {
              return this.$d.toISOString();
            }, m2.toString = function() {
              return this.$d.toUTCString();
            }, M2;
          }(), T = _.prototype;
          return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
            T[t2[1]] = function(e2) {
              return this.$g(e2, t2[0], t2[1]);
            };
          }), w.extend = function(t2, e2) {
            return t2.$i || (t2(e2, _, w), t2.$i = true), w;
          }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
            return w(1e3 * t2);
          }, w.en = D[v], w.Ls = D, w.p = {}, w;
        });
      }
    });
    var src_exports2 = {};
    __export2(src_exports2, {
      ImagePlugin: () => ImagePlugin2
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_upath8 = __toESM3(require_upath3());
    var import_fs22 = __toESM3(__require("fs"));
    var import_dayjs = __toESM3(require_dayjs_min2());
    var import_fs7 = __toESM3(__require("fs"));
    var import_path3 = __toESM3(__require("path"));
    var import_child_process = __require("child_process");
    var processImageGM = (inputFilePath, targetFilePath, config2, callback) => {
      config2 = config2 || {};
      const targetFileDir = import_path3.default.dirname(targetFilePath);
      const ext = import_path3.default.extname(inputFilePath).toLocaleLowerCase();
      if (!import_fs7.default.existsSync(targetFileDir)) {
        import_fs7.default.mkdirSync(targetFileDir, { recursive: true });
      }
      try {
        const gm = (0, import_child_process.spawn)("gm", [
          "convert",
          "-size",
          "1200x1200>",
          inputFilePath,
          "-resize",
          "1200x1200>",
          "-quality",
          "75",
          "-strip",
          targetFilePath
        ]);
        gm.on("close", () => {
          if (ext !== ".png") {
            if (callback) {
              callback();
            }
            return;
          }
          try {
            if (config2.noPNGCompress) {
              throw new Error("skipping pngquant step");
            }
            const pngQuant = (0, import_child_process.spawn)("pngquant", ["--ext", ".png", "-f", "-s10", targetFilePath]);
            pngQuant.on("close", () => {
              if (callback) {
                callback();
              }
            });
            pngQuant.on("error", (e) => {
              console.log("pngquant not found in path or was deliberately not used. You need to install pngquant yourself to compress PNGs");
              if (callback) {
                callback();
              }
            });
          } catch (e) {
            console.log("pngquant not found in path or was deliberately not used. You need to install pngquant yourself to compress PNGs");
            if (callback) {
              callback();
            }
          }
        });
        gm.on("error", (e) => {
          throw e;
        });
      } catch (e) {
        console.log("Graphicsmagick (as gm) needs to be installed and on the path for image processing to work");
        throw e;
      }
    };
    var processImage = (inputFilePath, targetFilePath, config2 = {}) => {
      const inputFile = import_path3.default.basename(inputFilePath);
      const imageTrackingString = "write image " + inputFile;
      console.time(imageTrackingString);
      return new Promise((resolve, reject) => {
        try {
          processImageGM(inputFilePath, targetFilePath, config2, () => {
            console.timeEnd(imageTrackingString);
            resolve();
          });
        } catch (e) {
          reject(e);
        }
      });
    };
    var ImagePlugin2 = class {
      constructor() {
        this.extensions = [".png", ".jpg", ".jpeg"];
      }
      url(file, site) {
        let relativeDir;
        if (file.configuration?.dir) {
          const resolvedDir = import_upath8.default.resolve(site.contentDirectory, file.configuration.dir);
          relativeDir = import_upath8.default.relative(site.contentDirectory, resolvedDir);
        } else {
          relativeDir = import_upath8.default.relative(site.contentDirectory, file.sourceDir);
        }
        const urlPiece = relativeDir + import_upath8.default.sep + file.name;
        return urlPiece + file.ext;
      }
      build(opts, dryRun) {
        const cache = opts.site.cacheDirectory;
        const cacheFilePath = import_upath8.default.resolve(cache, opts.url);
        const targetPath = import_upath8.default.resolve(opts.site.buildDirectory, opts.url);
        if (import_fs22.default.existsSync(cacheFilePath)) {
          const cacheUpdatedTime = import_fs22.default.statSync(cacheFilePath).mtime;
          if ((0, import_dayjs.default)(opts.file.updated).isBefore(cacheUpdatedTime)) {
            if (dryRun) {
              console.log(`retrieving ${opts.file.name} from the cache at ${cacheFilePath}`);
              return true;
            }
            if (import_upath8.default.resolve(cacheFilePath) !== import_upath8.default.resolve(targetPath)) {
              if (!import_fs22.default.existsSync(import_upath8.default.dirname(targetPath))) {
                import_fs22.default.mkdirSync(import_upath8.default.dirname(targetPath), { recursive: true });
              }
              import_fs22.default.copyFileSync(cacheFilePath, targetPath);
            }
            return true;
          }
        }
        processImage(opts.file.sourcePath, cacheFilePath).then(() => {
          if (dryRun) {
            console.log(`building ${opts.file.name} at ${targetPath}`);
            return true;
          }
          if (import_upath8.default.resolve(cacheFilePath) !== import_upath8.default.resolve(targetPath)) {
            if (!import_fs22.default.existsSync(import_upath8.default.dirname(targetPath))) {
              import_fs22.default.mkdirSync(import_upath8.default.dirname(targetPath), { recursive: true });
            }
            import_fs22.default.copyFileSync(cacheFilePath, targetPath);
          }
        });
        return true;
      }
    };
  }
});

// ../plugins/copy/dist/wanderer-copy.js
var require_wanderer_copy = __commonJS2({
  "../plugins/copy/dist/wanderer-copy.js"(exports2, module2) {
    var __create3 = Object.create;
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __getProtoOf3 = Object.getPrototypeOf;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __commonJS3 = (cb, mod) => function __require2() {
      return mod || (0, cb[__getOwnPropNames3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps3 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames3(from))
          if (!__hasOwnProp3.call(to, key2) && key2 !== except)
            __defProp3(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc3(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toESM3 = (mod, isNodeMode, target) => (target = mod != null ? __create3(__getProtoOf3(mod)) : {}, __copyProps3(isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target, mod));
    var __toCommonJS2 = (mod) => __copyProps3(__defProp3({}, "__esModule", { value: true }), mod);
    var require_upath3 = __commonJS3({
      "../../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js"(exports3) {
        var VERSION = "1.2.0";
        var extraFn;
        var extraFunctions;
        var isFunction;
        var isString;
        var isValidExt;
        var name;
        var path22;
        var propName;
        var propValue;
        var toUnix;
        var upath;
        var slice = [].slice;
        var indexOf = [].indexOf || function(item) {
          for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
              return i;
          }
          return -1;
        };
        var hasProp = {}.hasOwnProperty;
        path22 = __require("path");
        isFunction = function(val) {
          return val instanceof Function;
        };
        isString = function(val) {
          return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
        };
        upath = exports3;
        upath.VERSION = typeof VERSION !== "undefined" && VERSION !== null ? VERSION : "NO-VERSION";
        toUnix = function(p) {
          var double;
          p = p.replace(/\\/g, "/");
          double = /\/\//;
          while (p.match(double)) {
            p = p.replace(double, "/");
          }
          return p;
        };
        for (propName in path22) {
          propValue = path22[propName];
          if (isFunction(propValue)) {
            upath[propName] = function(propName2) {
              return function() {
                var args, result;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                args = args.map(function(p) {
                  if (isString(p)) {
                    return toUnix(p);
                  } else {
                    return p;
                  }
                });
                result = path22[propName2].apply(path22, args);
                if (isString(result)) {
                  return toUnix(result);
                } else {
                  return result;
                }
              };
            }(propName);
          } else {
            upath[propName] = propValue;
          }
        }
        upath.sep = "/";
        extraFunctions = {
          toUnix,
          normalizeSafe: function(p) {
            p = toUnix(p);
            if (p.startsWith("./")) {
              if (p.startsWith("./..") || p === "./") {
                return upath.normalize(p);
              } else {
                return "./" + upath.normalize(p);
              }
            } else {
              return upath.normalize(p);
            }
          },
          normalizeTrim: function(p) {
            p = upath.normalizeSafe(p);
            if (p.endsWith("/")) {
              return p.slice(0, +(p.length - 2) + 1 || 9e9);
            } else {
              return p;
            }
          },
          joinSafe: function() {
            var p, result;
            p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            result = upath.join.apply(null, p);
            if (p[0].startsWith("./") && !result.startsWith("./")) {
              result = "./" + result;
            }
            return result;
          },
          addExt: function(file, ext) {
            if (!ext) {
              return file;
            } else {
              if (ext[0] !== ".") {
                ext = "." + ext;
              }
              return file + (file.endsWith(ext) ? "" : ext);
            }
          },
          trimExt: function(filename, ignoreExts, maxSize) {
            var oldExt;
            if (maxSize == null) {
              maxSize = 7;
            }
            oldExt = upath.extname(filename);
            if (isValidExt(oldExt, ignoreExts, maxSize)) {
              return filename.slice(0, +(filename.length - oldExt.length - 1) + 1 || 9e9);
            } else {
              return filename;
            }
          },
          removeExt: function(filename, ext) {
            if (!ext) {
              return filename;
            } else {
              ext = ext[0] === "." ? ext : "." + ext;
              if (upath.extname(filename) === ext) {
                return upath.trimExt(filename);
              } else {
                return filename;
              }
            }
          },
          changeExt: function(filename, ext, ignoreExts, maxSize) {
            if (maxSize == null) {
              maxSize = 7;
            }
            return upath.trimExt(filename, ignoreExts, maxSize) + (!ext ? "" : ext[0] === "." ? ext : "." + ext);
          },
          defaultExt: function(filename, ext, ignoreExts, maxSize) {
            var oldExt;
            if (maxSize == null) {
              maxSize = 7;
            }
            oldExt = upath.extname(filename);
            if (isValidExt(oldExt, ignoreExts, maxSize)) {
              return filename;
            } else {
              return upath.addExt(filename, ext);
            }
          }
        };
        isValidExt = function(ext, ignoreExts, maxSize) {
          if (ignoreExts == null) {
            ignoreExts = [];
          }
          return ext && ext.length <= maxSize && indexOf.call(ignoreExts.map(function(e) {
            return (e && e[0] !== "." ? "." : "") + e;
          }), ext) < 0;
        };
        for (name in extraFunctions) {
          if (!hasProp.call(extraFunctions, name))
            continue;
          extraFn = extraFunctions[name];
          if (upath[name] !== void 0) {
            throw new Error("path." + name + " already exists.");
          } else {
            upath[name] = extraFn;
          }
        }
      }
    });
    var src_exports2 = {};
    __export2(src_exports2, {
      CopyPlugin: () => CopyPlugin2
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_fs7 = __toESM3(__require("fs"));
    var import_upath8 = __toESM3(require_upath3());
    var CopyPlugin2 = class {
      constructor() {
        this.extensions = "UNUSED";
      }
      url(fileInfo, site) {
        return fileInfo.id;
      }
      build(opts) {
        const targetFilePath = import_upath8.default.resolve(opts.site.buildDirectory, opts.url);
        const sourceFilePath = import_upath8.default.resolve(opts.file.sourcePath);
        if (!import_fs7.default.existsSync(import_upath8.default.dirname(targetFilePath))) {
          import_fs7.default.mkdirSync(import_upath8.default.dirname(targetFilePath), { recursive: true });
        }
        import_fs7.default.copyFileSync(sourceFilePath, targetFilePath);
        return true;
      }
    };
  }
});

// src/index.ts
import * as url from "url";

// src/objects/site.ts
var import_upath6 = __toESM2(require_upath2());
import fs5 from "fs";

// src/objects/pages.ts
var import_upath5 = __toESM2(require_upath2());
import fs4 from "fs";

// src/lib/recursive-readdir.ts
import fs2 from "fs";
import path2 from "path";
var _readdirSyncRecursive = function(dirPath, _originalDirPath, arrayOfFiles = []) {
  const files = fs2.readdirSync(dirPath);
  const originalDirPath = _originalDirPath || dirPath;
  files.forEach(function(file) {
    if (fs2.statSync(path2.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = _readdirSyncRecursive(path2.join(dirPath, file), originalDirPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(path2.normalize(path2.relative(originalDirPath, path2.join(dirPath, file))));
    }
  });
  return arrayOfFiles;
};
var readdirSyncRecursive = function(sourceDirectory) {
  return _readdirSyncRecursive(sourceDirectory);
};

// ../node_modules/.pnpm/istextorbinary@6.0.0/node_modules/istextorbinary/edition-es2019-esm/index.js
import * as pathUtil from "path";

// ../node_modules/.pnpm/textextensions@5.15.0/node_modules/textextensions/edition-es5-esm/index.js
var list2 = [
  "Makefile",
  "Rakefile",
  "ada",
  "adb",
  "ads",
  "applescript",
  "as",
  "ascx",
  "asm",
  "asmx",
  "asp",
  "aspx",
  "atom",
  "bas",
  "bash",
  "bashrc",
  "bat",
  "bbcolors",
  "bdsgroup",
  "bdsproj",
  "bib",
  "bowerrc",
  "c",
  "cbl",
  "cc",
  "cfc",
  "cfg",
  "cfm",
  "cfml",
  "cgi",
  "clj",
  "cls",
  "cmake",
  "cmd",
  "cnf",
  "cob",
  "coffee",
  "coffeekup",
  "conf",
  "cpp",
  "cpt",
  "cpy",
  "crt",
  "cs",
  "csh",
  "cson",
  "csr",
  "css",
  "csslintrc",
  "csv",
  "ctl",
  "curlrc",
  "cxx",
  "dart",
  "dfm",
  "diff",
  "dof",
  "dpk",
  "dproj",
  "dtd",
  "eco",
  "editorconfig",
  "ejs",
  "el",
  "emacs",
  "eml",
  "ent",
  "erb",
  "erl",
  "eslintignore",
  "eslintrc",
  "ex",
  "exs",
  "f",
  "f03",
  "f77",
  "f90",
  "f95",
  "fish",
  "for",
  "fpp",
  "frm",
  "ftn",
  "gemrc",
  "gitattributes",
  "gitconfig",
  "gitignore",
  "gitkeep",
  "gitmodules",
  "go",
  "gpp",
  "gradle",
  "groovy",
  "groupproj",
  "grunit",
  "gtmpl",
  "gvimrc",
  "h",
  "haml",
  "hbs",
  "hgignore",
  "hh",
  "hpp",
  "hrl",
  "hs",
  "hta",
  "htaccess",
  "htc",
  "htm",
  "html",
  "htpasswd",
  "hxx",
  "iced",
  "inc",
  "ini",
  "ino",
  "int",
  "irbrc",
  "itcl",
  "itermcolors",
  "itk",
  "jade",
  "java",
  "jhtm",
  "jhtml",
  "js",
  "jscsrc",
  "jshintignore",
  "jshintrc",
  "json",
  "json5",
  "jsonld",
  "jsp",
  "jspx",
  "jsx",
  "ksh",
  "less",
  "lhs",
  "lisp",
  "log",
  "ls",
  "lsp",
  "lua",
  "m",
  "mak",
  "map",
  "markdown",
  "master",
  "md",
  "mdown",
  "mdwn",
  "mdx",
  "metadata",
  "mht",
  "mhtml",
  "mjs",
  "mk",
  "mkd",
  "mkdn",
  "mkdown",
  "ml",
  "mli",
  "mm",
  "mxml",
  "nfm",
  "nfo",
  "njk",
  "noon",
  "npmignore",
  "npmrc",
  "nvmrc",
  "ops",
  "pas",
  "pasm",
  "patch",
  "pbxproj",
  "pch",
  "pem",
  "pg",
  "php",
  "php3",
  "php4",
  "php5",
  "phpt",
  "phtml",
  "pir",
  "pl",
  "pm",
  "pmc",
  "pod",
  "pot",
  "properties",
  "props",
  "pt",
  "pug",
  "py",
  "r",
  "rake",
  "rb",
  "rdoc",
  "rdoc_options",
  "resx",
  "rhtml",
  "rjs",
  "rlib",
  "rmd",
  "ron",
  "rs",
  "rss",
  "rst",
  "rtf",
  "rvmrc",
  "rxml",
  "s",
  "sass",
  "scala",
  "scm",
  "scss",
  "seestyle",
  "sh",
  "shtml",
  "sls",
  "spec",
  "sql",
  "sqlite",
  "ss",
  "sss",
  "st",
  "strings",
  "sty",
  "styl",
  "stylus",
  "sub",
  "sublime-build",
  "sublime-commands",
  "sublime-completions",
  "sublime-keymap",
  "sublime-macro",
  "sublime-menu",
  "sublime-project",
  "sublime-settings",
  "sublime-workspace",
  "sv",
  "svc",
  "svg",
  "t",
  "tcl",
  "tcsh",
  "terminal",
  "tex",
  "text",
  "textile",
  "tg",
  "tmLanguage",
  "tmTheme",
  "tmpl",
  "tpl",
  "ts",
  "tsv",
  "tsx",
  "tt",
  "tt2",
  "ttml",
  "txt",
  "v",
  "vb",
  "vbs",
  "vh",
  "vhd",
  "vhdl",
  "vim",
  "viminfo",
  "vimrc",
  "vue",
  "webapp",
  "wxml",
  "wxss",
  "x-php",
  "xaml",
  "xht",
  "xhtml",
  "xml",
  "xs",
  "xsd",
  "xsl",
  "xslt",
  "yaml",
  "yml",
  "zsh",
  "zshrc"
];
var edition_es5_esm_default = list2;

// ../node_modules/.pnpm/binaryextensions@4.18.0/node_modules/binaryextensions/edition-es5-esm/index.js
var list3 = [
  "dds",
  "eot",
  "gif",
  "ico",
  "jar",
  "jpeg",
  "jpg",
  "pdf",
  "png",
  "swf",
  "tga",
  "ttf",
  "zip"
];
var edition_es5_esm_default2 = list3;

// ../node_modules/.pnpm/istextorbinary@6.0.0/node_modules/istextorbinary/edition-es2019-esm/index.js
function isText(filename, buffer) {
  if (filename) {
    const parts = pathUtil.basename(filename).split(".").reverse();
    for (const extension of parts) {
      if (edition_es5_esm_default.indexOf(extension) !== -1) {
        return true;
      }
      if (edition_es5_esm_default2.indexOf(extension) !== -1) {
        return false;
      }
    }
  }
  if (buffer) {
    return getEncoding(buffer) === "utf8";
  }
  return null;
}
function getEncoding(buffer, opts) {
  var _a, _b;
  if (!buffer)
    return null;
  const textEncoding = "utf8";
  const binaryEncoding = "binary";
  const chunkLength = (_a = opts === null || opts === void 0 ? void 0 : opts.chunkLength) !== null && _a !== void 0 ? _a : 24;
  let chunkBegin = (_b = opts === null || opts === void 0 ? void 0 : opts.chunkBegin) !== null && _b !== void 0 ? _b : 0;
  if ((opts === null || opts === void 0 ? void 0 : opts.chunkBegin) == null) {
    let encoding = getEncoding(buffer, { chunkLength, chunkBegin });
    if (encoding === textEncoding) {
      chunkBegin = Math.max(0, Math.floor(buffer.length / 2) - chunkLength);
      encoding = getEncoding(buffer, {
        chunkLength,
        chunkBegin
      });
      if (encoding === textEncoding) {
        chunkBegin = Math.max(0, buffer.length - chunkLength);
        encoding = getEncoding(buffer, {
          chunkLength,
          chunkBegin
        });
      }
    }
    return encoding;
  } else {
    chunkBegin = getChunkBegin(buffer, chunkBegin);
    if (chunkBegin === -1) {
      return binaryEncoding;
    }
    const chunkEnd = getChunkEnd(buffer, Math.min(buffer.length, chunkBegin + chunkLength));
    if (chunkEnd > buffer.length) {
      return binaryEncoding;
    }
    const contentChunkUTF8 = buffer.toString(textEncoding, chunkBegin, chunkEnd);
    for (let i = 0; i < contentChunkUTF8.length; ++i) {
      const charCode = contentChunkUTF8.charCodeAt(i);
      if (charCode === 65533 || charCode <= 8) {
        return binaryEncoding;
      }
    }
    return textEncoding;
  }
}
function getChunkBegin(buf, chunkBegin) {
  if (chunkBegin === 0) {
    return 0;
  }
  if (!isLaterByteOfUtf8(buf[chunkBegin])) {
    return chunkBegin;
  }
  let begin = chunkBegin - 3;
  if (begin >= 0) {
    if (isFirstByteOf4ByteChar(buf[begin])) {
      return begin;
    }
  }
  begin = chunkBegin - 2;
  if (begin >= 0) {
    if (isFirstByteOf4ByteChar(buf[begin]) || isFirstByteOf3ByteChar(buf[begin])) {
      return begin;
    }
  }
  begin = chunkBegin - 1;
  if (begin >= 0) {
    if (isFirstByteOf4ByteChar(buf[begin]) || isFirstByteOf3ByteChar(buf[begin]) || isFirstByteOf2ByteChar(buf[begin])) {
      return begin;
    }
  }
  return -1;
}
function getChunkEnd(buf, chunkEnd) {
  if (chunkEnd === buf.length) {
    return chunkEnd;
  }
  let index = chunkEnd - 3;
  if (index >= 0) {
    if (isFirstByteOf4ByteChar(buf[index])) {
      return chunkEnd + 1;
    }
  }
  index = chunkEnd - 2;
  if (index >= 0) {
    if (isFirstByteOf4ByteChar(buf[index])) {
      return chunkEnd + 2;
    }
    if (isFirstByteOf3ByteChar(buf[index])) {
      return chunkEnd + 1;
    }
  }
  index = chunkEnd - 1;
  if (index >= 0) {
    if (isFirstByteOf4ByteChar(buf[index])) {
      return chunkEnd + 3;
    }
    if (isFirstByteOf3ByteChar(buf[index])) {
      return chunkEnd + 2;
    }
    if (isFirstByteOf2ByteChar(buf[index])) {
      return chunkEnd + 1;
    }
  }
  return chunkEnd;
}
function isFirstByteOf4ByteChar(byte) {
  return byte >> 3 === 30;
}
function isFirstByteOf3ByteChar(byte) {
  return byte >> 4 === 14;
}
function isFirstByteOf2ByteChar(byte) {
  return byte >> 5 === 6;
}
function isLaterByteOfUtf8(byte) {
  return byte >> 6 === 2;
}

// src/objects/pages.ts
var toml2 = __toESM2(require_toml());

// src/lib/frontmatter/index.ts
var import_toml = __toESM2(require_toml());
var import_upath3 = __toESM2(require_upath2());
import fs3 from "fs";
import readline from "readline";
var streamFrontmatter = async (filename) => {
  let startToken = "";
  const fileStream = fs3.createReadStream(import_upath3.default.resolve(filename));
  const rl = readline.createInterface({
    input: fileStream,
    terminal: false
  });
  let frontmatterString = "";
  for await (const line of rl) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") {
      continue;
    }
    if (startToken === "") {
      if (trimmedLine === "---") {
        startToken = "---";
        continue;
      } else if (trimmedLine === "+++") {
        startToken = "+++";
        continue;
      } else {
        return {};
      }
    }
    if (trimmedLine === startToken) {
      try {
        const frontmatter = import_toml.default.parse(frontmatterString);
        return frontmatter;
      } catch (e) {
        console.log(e);
        return {};
      }
    }
    frontmatterString += line + "\n";
  }
  try {
    const frontmatter = import_toml.default.parse(frontmatterString);
    return frontmatter;
  } catch (e) {
    console.log(e);
    return {};
  }
};
var getTextAfterFrontmatter = (filename) => {
  const text3 = fs3.readFileSync(import_upath3.default.resolve(filename), "utf-8");
  let startToken = "";
  if (text3.startsWith("---")) {
    startToken = "---";
  } else if (text3.startsWith("+++")) {
    startToken = "+++";
  }
  if (!startToken) {
    return text3.trim();
  }
  const splits2 = text3.split(startToken);
  if (splits2.length <= 2) {
    return text3.trim();
  }
  splits2.shift();
  splits2.shift();
  return splits2.join(startToken).trim();
};

// src/lib/tempo/index.ts
var getMonthNumber = (s) => s.toLowerCase().charCodeAt(0) - 97;
var isTempoString = (string3) => {
  return /^[0-9][0-9][a-l][0-9]?[0-9]$/.test(string3);
};
var parseDate = (tempoString) => {
  if (!isTempoString(tempoString)) {
    throw new Error("invalid tempo string format.");
  }
  const year = parseInt(tempoString.slice(0, 2), 10);
  const month = getMonthNumber(tempoString[2]);
  const day = parseInt(tempoString.slice(3), 10);
  return new Date(2e3 + year, month, day);
};
var tempo = (filename) => {
  let tempoString = void 0;
  let processedFilename = filename;
  let date2;
  const possibleDateTokens = filename.split("-");
  const possibleDateString = possibleDateTokens.shift();
  if (isTempoString(possibleDateString)) {
    tempoString = possibleDateString;
    date2 = parseDate(tempoString);
    processedFilename = possibleDateTokens.join("-");
  } else if (/^[0-9]+$/g.test(possibleDateString) && possibleDateTokens.length > 0) {
    processedFilename = possibleDateTokens.join("-");
  }
  return { tempo: tempoString, date: date2, name: processedFilename };
};

// src/objects/db.ts
var import_jsonata = __toESM2(require_jsonata());
var import_upath4 = __toESM2(require_upath2());

// src/lib/log.ts
var LOG_LABELS = ["DEBUG", "INFO", "WARN", "ERROR"];
var LoggerClass = class {
  constructor() {
    this.currentLogLevel = 2 /* WARN */;
  }
  set(logLevel) {
    this.currentLogLevel = logLevel;
  }
  log(logLevel, ...message) {
    if (this.currentLogLevel <= logLevel) {
      console.log(`${LOG_LABELS[logLevel]}: `, ...message);
    }
  }
};
var Logger = new LoggerClass();

// src/objects/db.ts
var QUERY_BOOLEAN_OPERATORS = /* @__PURE__ */ ((QUERY_BOOLEAN_OPERATORS2) => {
  QUERY_BOOLEAN_OPERATORS2["AND"] = "AND";
  QUERY_BOOLEAN_OPERATORS2["OR"] = "OR";
  QUERY_BOOLEAN_OPERATORS2["NOT"] = "NOT";
  return QUERY_BOOLEAN_OPERATORS2;
})(QUERY_BOOLEAN_OPERATORS || {});
var QUERY_MODIFIER_OPERATIONS = /* @__PURE__ */ ((QUERY_MODIFIER_OPERATIONS2) => {
  QUERY_MODIFIER_OPERATIONS2["EQUALS"] = "=";
  QUERY_MODIFIER_OPERATIONS2["NOT"] = "!=";
  QUERY_MODIFIER_OPERATIONS2["GREATERTHAN"] = ">";
  QUERY_MODIFIER_OPERATIONS2["GE"] = ">=";
  QUERY_MODIFIER_OPERATIONS2["LESSTHAN"] = "<";
  QUERY_MODIFIER_OPERATIONS2["LE"] = "<=";
  QUERY_MODIFIER_OPERATIONS2["IN"] = "IN";
  QUERY_MODIFIER_OPERATIONS2["EXISTS"] = "EXISTS";
  QUERY_MODIFIER_OPERATIONS2["CONTAINS"] = "CONTAINS";
  return QUERY_MODIFIER_OPERATIONS2;
})(QUERY_MODIFIER_OPERATIONS || {});
var FileDB = class {
  constructor(files) {
    this.files = files;
  }
  query(queryOpts) {
    let queryResult = [];
    if (queryOpts.rawQuery) {
      const expression = (0, import_jsonata.default)(queryOpts.rawQuery);
      queryResult = expression.evaluate(this.files);
    } else if (queryOpts.predicates) {
      let rawQuery = "";
      let pointer = 0;
      for (let predicate of queryOpts.predicates) {
        let queryPiece = "";
        switch (predicate.modifier) {
          case "=" /* EQUALS */:
            queryPiece = `${predicate.key} = ${JSON.stringify(predicate.value)}`;
            break;
          case ">" /* GREATERTHAN */:
            queryPiece = `${predicate.key} > ${JSON.stringify(predicate.value)}`;
            break;
          case ">=" /* GE */:
            queryPiece = `${predicate.key} >= ${JSON.stringify(predicate.value)}`;
            break;
          case "<" /* LESSTHAN */:
            queryPiece = `${predicate.key} < ${JSON.stringify(predicate.value)}`;
            break;
          case "<=" /* LE */:
            queryPiece = `${predicate.key} <= ${JSON.stringify(predicate.value)}`;
            break;
          case "!=" /* NOT */:
            queryPiece = `${predicate.key} != ${JSON.stringify(predicate.value)}`;
            break;
          case "EXISTS" /* EXISTS */:
            queryPiece = `${predicate.key}`;
            break;
          case "IN" /* IN */:
            queryPiece = `${JSON.stringify(predicate.value)} in ${predicate.key}`;
            break;
          case "CONTAINS" /* CONTAINS */:
            queryPiece = `${predicate.key}.$contains(${JSON.stringify(predicate.value)})`;
            break;
        }
        if (pointer > 0) {
          switch (predicate.operator) {
            case "AND" /* AND */:
              rawQuery += ` and ${queryPiece}`;
              break;
            case "OR" /* OR */:
              rawQuery += ` or ${queryPiece}`;
              break;
            case "NOT" /* NOT */:
              rawQuery += ` and $not(${queryPiece})`;
              break;
            default:
              rawQuery += ` and ${queryPiece}`;
          }
        } else {
          if (predicate.operator === "NOT" /* NOT */) {
            rawQuery += `$not(${queryPiece})`;
          } else {
            rawQuery += queryPiece;
          }
        }
        pointer += 1;
      }
      Logger.log(0 /* DEBUG */, "performing query: ", `$[${rawQuery}]`);
      const expression = (0, import_jsonata.default)(`$[${rawQuery}]`);
      queryResult = expression.evaluate(this.files);
    } else {
      return [];
    }
    queryResult = queryResult ?? [];
    if (!Array.isArray(queryResult)) {
      queryResult = [queryResult];
    }
    if (queryOpts.sortBy) {
      queryResult.sort((a, b) => {
        if (a[queryOpts.sortBy || "id"] == b[queryOpts.sortBy || "id"]) {
          return 0;
        }
        if (a[queryOpts.sortBy || "id"] > b[queryOpts.sortBy || "id"]) {
          return queryOpts.isAscending ? -1 : 1;
        }
        return queryOpts.isAscending ? 1 : -1;
      });
    }
    if (queryOpts.limit) {
      queryResult = queryResult.slice(0, queryOpts.limit);
    }
    return queryResult;
  }
  queryTags(query) {
    const regularQuery = {
      predicates: [],
      sortBy: query.sortBy,
      limit: query.limit,
      isAscending: query.isAscending
    };
    for (let tagQuery of query.tags) {
      const predicate = {
        key: "configuration.tags",
        value: tagQuery.tag,
        operator: tagQuery.operator,
        modifier: "IN" /* IN */
      };
      regularQuery.predicates?.push(predicate);
    }
    return this.query(regularQuery);
  }
  queryDirectory(directory, opts = {}, alsoMatchSubdirectories) {
    const predicate = {
      key: "sourceDir",
      value: import_upath4.default.resolve(directory),
      modifier: alsoMatchSubdirectories ? "CONTAINS" /* CONTAINS */ : "=" /* EQUALS */
    };
    return this.query({
      predicates: [predicate, ...opts.predicates ?? []],
      limit: opts.limit,
      isAscending: opts.isAscending,
      sortBy: opts.sortBy
    });
  }
  get all() {
    return this.files;
  }
};

// src/objects/pages.ts
var CONFIG_RECURSION_LEVEL = /* @__PURE__ */ ((CONFIG_RECURSION_LEVEL2) => {
  CONFIG_RECURSION_LEVEL2[CONFIG_RECURSION_LEVEL2["NONE"] = 0] = "NONE";
  CONFIG_RECURSION_LEVEL2[CONFIG_RECURSION_LEVEL2["IMMEDIATE_PARENT"] = 1] = "IMMEDIATE_PARENT";
  CONFIG_RECURSION_LEVEL2[CONFIG_RECURSION_LEVEL2["ALL"] = 2] = "ALL";
  return CONFIG_RECURSION_LEVEL2;
})(CONFIG_RECURSION_LEVEL || {});
var FileCache = class {
  constructor(siteInfo) {
    this.files = {};
    this.nestedConfiguration = {};
    this.siteInfo = siteInfo;
  }
  async generate() {
    await this.generateConfig();
    await this.generateFiles();
    this._db = new FileDB(this.allFiles);
  }
  async generateConfig() {
    this.nestedConfiguration = {};
    const allFiles = readdirSyncRecursive(this.siteInfo.contentDirectory);
    for (let file of allFiles) {
      const fullPath = import_upath5.default.resolve(this.siteInfo.contentDirectory, file);
      const dir = import_upath5.default.dirname(file);
      const ext = import_upath5.default.extname(file).toLocaleLowerCase();
      const name = import_upath5.default.basename(file, import_upath5.default.extname(file));
      let isFrontmatter = false;
      let config2;
      if (ext.toLocaleLowerCase() !== ".toml") {
        config2 = await streamFrontmatter(fullPath);
        isFrontmatter = true;
      } else {
        const contents = fs4.readFileSync(import_upath5.default.resolve(this.siteInfo.contentDirectory, file), "utf-8");
        if (name === `_`) {
          this.nestedConfiguration[dir] = toml2.parse(contents);
          continue;
        }
        config2 = toml2.parse(contents);
      }
      if (!this.nestedConfiguration[file]) {
        this.nestedConfiguration[file] = config2;
        continue;
      }
      if (isFrontmatter) {
        this.nestedConfiguration[file] = {
          ...this.nestedConfiguration[file],
          ...config2
        };
      } else {
        this.nestedConfiguration[file] = {
          ...config2,
          ...this.nestedConfiguration[file]
        };
      }
    }
    Logger.log(0 /* DEBUG */, this.nestedConfiguration);
    return this.nestedConfiguration;
  }
  async generateFiles() {
    const allFiles = readdirSyncRecursive(this.siteInfo.contentDirectory);
    this.files = {};
    for (let file of allFiles) {
      const dir = import_upath5.default.dirname(file);
      const ext = import_upath5.default.extname(file).toLocaleLowerCase();
      const rawname = import_upath5.default.basename(file, import_upath5.default.extname(file));
      const tempoString = tempo(rawname);
      const name = tempoString.name;
      if (ext.toLocaleLowerCase() === ".toml") {
        continue;
      }
      const sourcePath = import_upath5.default.resolve(this.siteInfo.contentDirectory, file);
      const stats = fs4.statSync(sourcePath);
      if (stats.size === 0) {
        continue;
      }
      const config2 = this.getConfigForFile(file, 2 /* ALL */);
      if (config2.private) {
        continue;
      }
      const pathDir = dir || import_upath5.default.dirname(file);
      const pathEnd = config2.rename || name;
      let url2 = [pathDir === "." ? "" : pathDir, pathEnd === "index" ? "" : pathEnd].join("/");
      if (!url2.startsWith("/")) {
        url2 = "/" + url2;
      }
      const info = {
        configuration: config2,
        id: file,
        name,
        ext,
        sourcePath,
        sourceDir: import_upath5.default.dirname(sourcePath),
        created: stats.birthtime,
        updated: stats.mtime,
        date: tempoString.date ?? stats.mtime
      };
      if (isText(sourcePath, fs4.readFileSync(sourcePath))) {
        const pageInfo = info;
        pageInfo.text = getTextAfterFrontmatter(sourcePath);
        pageInfo.title = config2.title ?? config2.name ?? name;
      }
      this.files[file] = info;
    }
    return this.files;
  }
  getConfigForFile(fileId, recursive = 2 /* ALL */) {
    const parts = fileId.split(import_upath5.default.sep);
    if (recursive === 0 /* NONE */) {
      return this.nestedConfiguration[fileId] ?? {};
    }
    if (recursive === 1 /* IMMEDIATE_PARENT */) {
      parts.pop();
      if (!parts.length) {
        if (this.nestedConfiguration["."]) {
          Logger.log(0 /* DEBUG */, "Has a main config!", this.nestedConfiguration["."]);
          return {
            ...this.nestedConfiguration["."],
            ...this.nestedConfiguration[fileId] ?? {}
          };
        }
        return this.nestedConfiguration[fileId] ?? {};
      }
      Logger.log(0 /* DEBUG */, "Does this have a main config!", this.nestedConfiguration["."]);
      return {
        ...this.nestedConfiguration[parts[parts.length - 1]] ?? {},
        ...this.nestedConfiguration[fileId] ?? {}
      };
    }
    if (recursive === 2 /* ALL */) {
      const config2 = {};
      let currentPath = "";
      if (this.nestedConfiguration["."]) {
        Object.assign(config2, this.nestedConfiguration["."]);
      }
      for (let part of parts) {
        currentPath = import_upath5.default.join(currentPath, part);
        Object.assign(config2, this.nestedConfiguration[currentPath] ?? {});
      }
      Logger.log(0 /* DEBUG */, "full config", config2);
      return config2;
    }
    return {};
  }
  get allFiles() {
    const f = [];
    for (let id in this.files) {
      f.push(this.files[id]);
    }
    return f;
  }
  get db() {
    return this._db;
  }
  getFileFromPath(sourcePath) {
    const query = {
      predicates: [
        {
          key: "sourcePath",
          value: import_upath5.default.resolve(sourcePath),
          modifier: "=" /* EQUALS */
        }
      ]
    };
    return this._db.query(query);
  }
  getAllFilesWithExts(exts, not) {
    const query = {
      predicates: []
    };
    for (let ext of exts) {
      if (!query.predicates) {
        query.predicates = [];
      }
      query.predicates.push({
        key: "ext",
        value: ext,
        modifier: "=" /* EQUALS */,
        operator: not ? "NOT" /* NOT */ : "OR" /* OR */
      });
    }
    return this._db.query(query);
  }
  getFilesWithSimilarNames(file) {
    const name = file.name;
    const sourceDir = import_upath5.default.dirname(file.sourcePath);
    const files = this._db.query({
      predicates: [
        {
          key: "name",
          value: name,
          modifier: "=" /* EQUALS */
        },
        {
          key: "sourcePath",
          value: sourceDir,
          modifier: "CONTAINS" /* CONTAINS */,
          operator: "AND" /* AND */
        },
        {
          key: "ext",
          value: file.ext,
          modifier: "=" /* EQUALS */,
          operator: "NOT" /* NOT */
        }
      ]
    });
    return files ?? [];
  }
};

// src/objects/site.ts
var Site = class {
  constructor(config2) {
    this.plugins = [];
    this.siteInfo = {
      ...config2,
      contentDirectory: import_upath6.default.resolve(config2.contentDirectory),
      frameDirectory: import_upath6.default.resolve(config2.frameDirectory),
      cacheDirectory: import_upath6.default.resolve(config2.cacheDirectory),
      buildDirectory: import_upath6.default.resolve(config2.buildDirectory)
    };
    this.fileCache = new FileCache(this.siteInfo);
    this.usedExtensions = /* @__PURE__ */ new Set();
  }
  get contentDir() {
    return this.siteInfo.contentDirectory;
  }
  get frameDir() {
    return this.siteInfo.frameDirectory;
  }
  get cacheDir() {
    return this.siteInfo.cacheDirectory;
  }
  get staticDir() {
    return import_upath6.default.resolve(this.siteInfo.frameDirectory, "static");
  }
  get buildDir() {
    return this.siteInfo.buildDirectory;
  }
  get files() {
    return this.fileCache;
  }
  addPlugin(plugin) {
    this.plugins.push(plugin);
  }
  async make() {
    const staticFiles = readdirSyncRecursive(this.staticDir);
    for (let file of staticFiles) {
      const targetFile = import_upath6.default.resolve(this.buildDir, "static", file);
      if (!fs5.existsSync(import_upath6.default.dirname(targetFile))) {
        fs5.mkdirSync(import_upath6.default.dirname(targetFile), { recursive: true });
      }
      fs5.copyFileSync(import_upath6.default.resolve(this.staticDir, file), targetFile);
    }
    await this.fileCache.generate();
    this.usedExtensions.clear();
    for (let plugin of this.plugins) {
      if (plugin.extensions === "UNUSED") {
        continue;
      }
      for (let extension of plugin.extensions) {
        this.usedExtensions.add(extension);
      }
    }
    const pluginFiles = [];
    const allURLs = {};
    for (let i = 0; i < this.plugins.length; i++) {
      const plugin = this.plugins[i];
      if (plugin.extensions === "UNUSED") {
        pluginFiles[i] = this.fileCache.getAllFilesWithExts(Array.from(this.usedExtensions), true);
      } else {
        pluginFiles[i] = this.fileCache.getAllFilesWithExts(plugin.extensions);
      }
      for (let j = 0; j < pluginFiles[i].length; j++) {
        const file = pluginFiles[i][j];
        let partialUrl = plugin.url(file, this.siteInfo);
        if (partialUrl.startsWith("/")) {
          partialUrl = partialUrl.slice(1);
        }
        allURLs[file.id] = partialUrl;
        file.url = partialUrl;
        if (plugin.title) {
          file.title = file.configuration?.title ?? plugin.title(file, this.siteInfo);
        }
      }
    }
    for (let i = 0; i < this.plugins.length; i++) {
      const plugin = this.plugins[i];
      const pluginOpts = {
        site: this.siteInfo,
        database: new FileDB(pluginFiles[i]),
        allFiles: this.fileCache,
        allURLs
      };
      if (plugin.beforeBuild) {
        plugin.beforeBuild(pluginOpts);
      }
      for (let j = 0; j < pluginFiles[i].length; j++) {
        const file = pluginFiles[i][j];
        const buildOpts = {
          ...pluginOpts,
          file,
          url: allURLs[file.id]
        };
        plugin.build(buildOpts);
      }
      if (plugin.afterBuild) {
        plugin.afterBuild(pluginOpts);
      }
    }
  }
};

// src/wanderer.ts
var import_wanderer_plugin_markdown = __toESM2(require_wanderer_markdown());
var import_wanderer_plugin_image = __toESM2(require_wanderer_image());

// src/objects/plugins/loader.ts
var import_upath7 = __toESM2(require_upath2());
var loadPluginFromString = async (pluginPath, baseDir2) => {
  try {
    if (pluginPath.startsWith(".")) {
      pluginPath = import_upath7.default.resolve(baseDir2 || process.cwd(), pluginPath);
    }
    const PluginClass = await import(pluginPath);
    const plugin = new PluginClass();
    if (!plugin.build || !plugin.extensions) {
      console.warn("wanderer plugin in path " + pluginPath + " was invalid");
      return void 0;
    }
    return plugin;
  } catch (e) {
    console.log("Error trying to load plugin at path " + pluginPath);
    console.log(e);
  }
};

// src/wanderer.ts
var import_wanderer_plugin_copy = __toESM2(require_wanderer_copy());
var wanderer = async (siteInfo, plugins) => {
  const site = new Site(siteInfo);
  let addedPlugins = false;
  if (plugins) {
    for (let plugin of plugins) {
      site.addPlugin(plugin);
      addedPlugins = true;
    }
  } else if (siteInfo.siteConfiguration.plugins) {
    for (let pluginPath of siteInfo.siteConfiguration.plugins) {
      const plugin = await loadPluginFromString(pluginPath);
      if (plugin) {
        site.addPlugin(plugin);
        addedPlugins = true;
      }
    }
  }
  if (!addedPlugins) {
    site.addPlugin(new import_wanderer_plugin_image.ImagePlugin());
    site.addPlugin(new import_wanderer_plugin_markdown.MarkdownPlugin());
    site.addPlugin(new import_wanderer_plugin_copy.CopyPlugin());
  }
  await site.make();
};

// src/index.ts
var __filename = __filename || url.fileURLToPath(import.meta.url);
var __dirname = __dirname || url.fileURLToPath(new URL(".", import.meta.url));
export {
  CONFIG_RECURSION_LEVEL,
  FileCache,
  FileDB,
  QUERY_BOOLEAN_OPERATORS,
  QUERY_MODIFIER_OPERATIONS,
  Site,
  wanderer
};
