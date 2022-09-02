var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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

// ../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js
var require_upath = __commonJS({
  "../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js"(exports2) {
    var VERSION = "1.2.0";
    var extraFn;
    var extraFunctions;
    var isFunction;
    var isString;
    var isValidExt;
    var name;
    var path7;
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
    path7 = require("path");
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
    for (propName in path7) {
      propValue = path7[propName];
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
            result = path7[propName2].apply(path7, args);
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
var require_parser = __commonJS({
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
var require_create_datetime = __commonJS({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-datetime.js"(exports2, module2) {
    "use strict";
    module2.exports = (value) => {
      const date = new Date(value);
      if (isNaN(date)) {
        throw new TypeError("Invalid Datetime");
      } else {
        return date;
      }
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/format-num.js
var require_format_num = __commonJS({
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
var require_create_datetime_float = __commonJS({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-datetime-float.js"(exports2, module2) {
    "use strict";
    var f = require_format_num();
    var FloatingDateTime = class extends Date {
      constructor(value) {
        super(value + "Z");
        this.isFloating = true;
      }
      toISOString() {
        const date = `${this.getUTCFullYear()}-${f(2, this.getUTCMonth() + 1)}-${f(2, this.getUTCDate())}`;
        const time = `${f(2, this.getUTCHours())}:${f(2, this.getUTCMinutes())}:${f(2, this.getUTCSeconds())}.${f(3, this.getUTCMilliseconds())}`;
        return `${date}T${time}`;
      }
    };
    module2.exports = (value) => {
      const date = new FloatingDateTime(value);
      if (isNaN(date)) {
        throw new TypeError("Invalid Datetime");
      } else {
        return date;
      }
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-date.js
var require_create_date = __commonJS({
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
      const date = new Date2(value);
      if (isNaN(date)) {
        throw new TypeError("Invalid Datetime");
      } else {
        return date;
      }
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/create-time.js
var require_create_time = __commonJS({
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
      const date = new Time(value);
      if (isNaN(date)) {
        throw new TypeError("Invalid Datetime");
      } else {
        return date;
      }
    };
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/lib/toml-parser.js
var require_toml_parser = __commonJS({
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
var require_parse_pretty_error = __commonJS({
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
var require_parse_string = __commonJS({
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
var require_parse_async = __commonJS({
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
var require_parse_stream = __commonJS({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse-stream.js"(exports2, module2) {
    "use strict";
    module2.exports = parseStream;
    var stream = require("stream");
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
var require_parse = __commonJS({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/parse.js"(exports2, module2) {
    "use strict";
    module2.exports = require_parse_string();
    module2.exports.async = require_parse_async();
    module2.exports.stream = require_parse_stream();
    module2.exports.prettyError = require_parse_pretty_error();
  }
});

// ../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/stringify.js
var require_stringify = __commonJS({
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
var require_toml = __commonJS({
  "../node_modules/.pnpm/@iarna+toml@2.2.5/node_modules/@iarna/toml/toml.js"(exports2) {
    "use strict";
    exports2.parse = require_parse();
    exports2.stringify = require_stringify();
  }
});

// ../node_modules/.pnpm/jsonata@1.8.6/node_modules/jsonata/jsonata.js
var require_jsonata = __commonJS({
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
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof require && require;
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
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
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
          function wordsToNumber(text) {
            const parts = text.split(/,\s|\sand\s|[\s\\-]/);
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
          const getDateTimeFragment = (date, component) => {
            let componentValue;
            switch (component) {
              case "Y":
                componentValue = date.getUTCFullYear();
                break;
              case "M":
                componentValue = date.getUTCMonth() + 1;
                break;
              case "D":
                componentValue = date.getUTCDate();
                break;
              case "d": {
                const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                const firstJan = Date.UTC(date.getUTCFullYear(), 0);
                componentValue = (today - firstJan) / millisInADay + 1;
                break;
              }
              case "F":
                componentValue = date.getUTCDay();
                if (componentValue === 0) {
                  componentValue = 7;
                }
                break;
              case "W": {
                const thisYear = yearMonth(date.getUTCFullYear(), 0);
                const startOfWeek1 = startOfFirstWeek(thisYear);
                const today = Date.UTC(thisYear.year, date.getUTCMonth(), date.getUTCDate());
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
                const thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
                const startOfWeek1 = startOfFirstWeek(thisMonth);
                const today = Date.UTC(thisMonth.year, thisMonth.month, date.getUTCDate());
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
                const thisYear = yearMonth(date.getUTCFullYear(), 0);
                const startOfISOYear = startOfFirstWeek(thisYear);
                const endOfISOYear = startOfFirstWeek(thisYear.nextYear());
                const now = date.getTime();
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
                const thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
                const startOfISOMonth = startOfFirstWeek(thisMonth);
                const nextMonth = thisMonth.nextMonth();
                const endOfISOMonth = startOfFirstWeek(nextMonth);
                const now = date.getTime();
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
                componentValue = date.getUTCHours();
                break;
              case "h":
                componentValue = date.getUTCHours();
                componentValue = componentValue % 12;
                if (componentValue === 0) {
                  componentValue = 12;
                }
                break;
              case "P":
                componentValue = date.getUTCHours() >= 12 ? "pm" : "am";
                break;
              case "m":
                componentValue = date.getUTCMinutes();
                break;
              case "s":
                componentValue = date.getUTCSeconds();
                break;
              case "f":
                componentValue = date.getUTCMilliseconds();
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
            var formatComponent = function(date, markerSpec) {
              var componentValue = getDateTimeFragment(date, markerSpec.component);
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
              function string(arg, prettify = false) {
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
                string,
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
            var definition = {
              _jsonata_function: true,
              implementation: func
            };
            if (typeof signature !== "undefined") {
              definition.signature = parseSignature(signature);
            }
            return definition;
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
            var template = errorCodes[err.code];
            if (typeof template !== "undefined") {
              var message = template.replace(/\{\{\{([^}]+)}}}/g, function() {
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
          var tokenizer = function(path7) {
            var position = 0;
            var length = path7.length;
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
                var currentChar = path7.charAt(position);
                if (currentChar === "/" && path7.charAt(position - 1) !== "\\" && depth === 0) {
                  pattern = path7.substring(start, position);
                  if (pattern === "") {
                    throw {
                      code: "S0301",
                      stack: new Error().stack,
                      position
                    };
                  }
                  position++;
                  currentChar = path7.charAt(position);
                  start = position;
                  while (currentChar === "i" || currentChar === "m") {
                    position++;
                    currentChar = path7.charAt(position);
                  }
                  flags = path7.substring(start, position) + "g";
                  return new RegExp(pattern, flags);
                }
                if ((currentChar === "(" || currentChar === "[" || currentChar === "{") && path7.charAt(position - 1) !== "\\") {
                  depth++;
                }
                if ((currentChar === ")" || currentChar === "]" || currentChar === "}") && path7.charAt(position - 1) !== "\\") {
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
              var currentChar = path7.charAt(position);
              while (position < length && " 	\n\r\v".indexOf(currentChar) > -1) {
                position++;
                currentChar = path7.charAt(position);
              }
              if (currentChar === "/" && path7.charAt(position + 1) === "*") {
                var commentStart = position;
                position += 2;
                currentChar = path7.charAt(position);
                while (!(currentChar === "*" && path7.charAt(position + 1) === "/")) {
                  currentChar = path7.charAt(++position);
                  if (position >= length) {
                    throw {
                      code: "S0106",
                      stack: new Error().stack,
                      position: commentStart
                    };
                  }
                }
                position += 2;
                currentChar = path7.charAt(position);
                return next(prefix);
              }
              if (prefix !== true && currentChar === "/") {
                position++;
                return create("regex", scanRegex());
              }
              if (currentChar === "." && path7.charAt(position + 1) === ".") {
                position += 2;
                return create("operator", "..");
              }
              if (currentChar === ":" && path7.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", ":=");
              }
              if (currentChar === "!" && path7.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", "!=");
              }
              if (currentChar === ">" && path7.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", ">=");
              }
              if (currentChar === "<" && path7.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", "<=");
              }
              if (currentChar === "*" && path7.charAt(position + 1) === "*") {
                position += 2;
                return create("operator", "**");
              }
              if (currentChar === "~" && path7.charAt(position + 1) === ">") {
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
                  currentChar = path7.charAt(position);
                  if (currentChar === "\\") {
                    position++;
                    currentChar = path7.charAt(position);
                    if (Object.prototype.hasOwnProperty.call(escapes2, currentChar)) {
                      qstr += escapes2[currentChar];
                    } else if (currentChar === "u") {
                      var octets = path7.substr(position + 1, 4);
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
              var match = numregex.exec(path7.substring(position));
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
                var end = path7.indexOf("`", position);
                if (end !== -1) {
                  name = path7.substring(position, end);
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
                ch = path7.charAt(i);
                if (i === length || " 	\n\r\v".indexOf(ch) > -1 || Object.prototype.hasOwnProperty.call(operators, ch)) {
                  if (path7.charAt(position) === "$") {
                    name = path7.substring(position + 1, i);
                    position = i;
                    return create("variable", name);
                  } else {
                    name = path7.substring(position, i);
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
            var resolveAncestry = function(path7) {
              var index = path7.steps.length - 1;
              var laststep = path7.steps[index];
              var slots = typeof laststep.seekingParent !== "undefined" ? laststep.seekingParent : [];
              if (laststep.type === "parent") {
                slots.push(laststep.slot);
              }
              for (var is = 0; is < slots.length; is++) {
                var slot = slots[is];
                index = path7.steps.length - 2;
                while (slot.level > 0) {
                  if (index < 0) {
                    if (typeof path7.seekingParent === "undefined") {
                      path7.seekingParent = [slot];
                    } else {
                      path7.seekingParent.push(slot);
                    }
                    break;
                  }
                  var step = path7.steps[index--];
                  while (index >= 0 && step.focus && path7.steps[index].focus) {
                    step = path7.steps[index--];
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
var require_wanderer_markdown = __commonJS({
  "../plugins/markdown/dist/wanderer-markdown.js"(exports2, module2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
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
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var require_upath2 = __commonJS2({
      "../../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js"(exports3) {
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
        path52 = require("path");
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
    var require_dayjs_min = __commonJS2({
      "../../node_modules/.pnpm/dayjs@1.11.4/node_modules/dayjs/dayjs.min.js"(exports3, module22) {
        !function(t, e) {
          "object" == typeof exports3 && "undefined" != typeof module22 ? module22.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
        }(exports3, function() {
          "use strict";
          var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
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
            return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
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
                case o:
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
              var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), $2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], l2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
              if (o2 === f || o2 === c) {
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
              if (l2 === o)
                return y2(7);
              var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r2 * M3;
              return O.w(m3, this);
            }, m2.subtract = function(t2, e2) {
              return this.add(-1 * t2, e2);
            }, m2.format = function(t2) {
              var e2 = this, n2 = this.$locale();
              if (!this.isValid())
                return n2.invalidDate || $;
              var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
                return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
              }, c2 = function(t3) {
                return O.s(s2 % 12 || 12, t3, "0");
              }, d2 = n2.meridiem || function(t3, e3, n3) {
                var r3 = t3 < 12 ? "AM" : "PM";
                return n3 ? r3.toLowerCase() : r3;
              }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
              return r2.replace(y, function(t3, e3) {
                return e3 || l2[t3] || i2.replace(":", "");
              });
            }, m2.utcOffset = function() {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }, m2.diff = function(r2, d2, $2) {
              var l2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, v2 = O.m(this, M3);
              return v2 = (l2 = {}, l2[c] = v2 / 12, l2[f] = v2, l2[h] = v2 / 3, l2[o] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y2] || g2, $2 ? v2 : O.a(v2);
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
      default: () => MarkdownPlugin2
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_upath42 = __toESM2(require_upath2());
    var import_fs32 = __toESM2(require("fs"));
    var import_upath6 = __toESM2(require_upath2());
    var import_fs5 = __toESM2(require("fs"));
    var genLayout = (siteInfo, file) => {
      const layout = file.configuration?.layout || "default";
      const layoutPath = import_upath6.default.resolve(siteInfo.frameDirectory, "layouts", layout + ".html");
      let layoutText = "${o.content}";
      if (import_fs5.default.existsSync(layoutPath)) {
        layoutText = import_fs5.default.readFileSync(import_upath6.default.resolve(siteInfo.frameDirectory, "layouts", layout + ".html")).toString();
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
              const directory = import_upath6.default.resolve(file.sourceDir, rawQuery);
              feeds[feedName] = filePool.queryDirectory(directory, query, false);
              continue;
            }
            if (rawQuery.toLocaleLowerCase().startsWith("dir:")) {
              const directory = import_upath6.default.resolve(file.sourceDir, rawQuery.slice(4));
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
        sourceName: import_upath6.default.basename(file.sourcePath),
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
    var import_fs22 = __toESM2(require("fs"), 1);
    var import_upath22 = __toESM2(require_upath2(), 1);
    var import_dayjs = __toESM2(require_dayjs_min(), 1);
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
      return html.replace(unescapeTest, (_, n) => {
        n = n.toLowerCase();
        if (n === "colon")
          return ":";
        if (n.charAt(0) === "#") {
          return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
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
        } catch (e) {
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
      } catch (e) {
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
      let i = 1, target, key2;
      for (; i < arguments.length; i++) {
        target = arguments[i];
        for (key2 in target) {
          if (Object.prototype.hasOwnProperty.call(target, key2)) {
            obj[key2] = target[key2];
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
      let i = 0;
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
      for (; i < cells.length; i++) {
        cells[i] = cells[i].trim().replace(/\\\|/g, "|");
      }
      return cells;
    }
    function rtrim(str, c, invert) {
      const l = str.length;
      if (l === 0) {
        return "";
      }
      let suffLen = 0;
      while (suffLen < l) {
        const currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
          suffLen++;
        } else if (currChar !== c && invert) {
          suffLen++;
        } else {
          break;
        }
      }
      return str.slice(0, l - suffLen);
    }
    function findClosingBracket(str, b) {
      if (str.indexOf(b[1]) === -1) {
        return -1;
      }
      const l = str.length;
      let level = 0, i = 0;
      for (; i < l; i++) {
        if (str[i] === "\\") {
          i++;
        } else if (str[i] === b[0]) {
          level++;
        } else if (str[i] === b[1]) {
          level--;
          if (level < 0) {
            return i;
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
          let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
          let bull = cap[1].trim();
          const isordered = bull.length > 1;
          const list3 = {
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
            if (!list3.loose) {
              if (endsWithBlankLine) {
                list3.loose = true;
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
            list3.items.push({
              type: "list_item",
              raw,
              task: !!istask,
              checked: ischecked,
              loose: false,
              text: itemContents
            });
            list3.raw += raw;
          }
          list3.items[list3.items.length - 1].raw = raw.trimRight();
          list3.items[list3.items.length - 1].text = itemContents.trimRight();
          list3.raw = list3.raw.trimRight();
          const l = list3.items.length;
          for (i = 0; i < l; i++) {
            this.lexer.state.top = false;
            list3.items[i].tokens = this.lexer.blockTokens(list3.items[i].text, []);
            const spacers = list3.items[i].tokens.filter((t) => t.type === "space");
            const hasMultipleLineBreaks = spacers.every((t) => {
              const chars = t.raw.split("");
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
            if (!list3.loose && spacers.length && hasMultipleLineBreaks) {
              list3.loose = true;
              list3.items[i].loose = true;
            }
          }
          return list3;
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
            header: splitCells(cap[1]).map((c) => {
              return { text: c };
            }),
            align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
          };
          if (item.header.length === item.align.length) {
            item.raw = cap[0];
            let l = item.align.length;
            let i, j, k, row;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = "right";
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = "center";
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = "left";
              } else {
                item.align[i] = null;
              }
            }
            l = item.rows.length;
            for (i = 0; i < l; i++) {
              item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
                return { text: c };
              });
            }
            l = item.header.length;
            for (j = 0; j < l; j++) {
              item.header[j].tokens = [];
              this.lexer.inline(item.header[j].text, item.header[j].tokens);
            }
            l = item.rows.length;
            for (j = 0; j < l; j++) {
              row = item.rows[j];
              for (k = 0; k < row.length; k++) {
                row[k].tokens = [];
                this.lexer.inline(row[k].text, row[k].tokens);
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
    });
    block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
    block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
    block.pedantic = merge({}, block.normal, {
      html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: noopTest,
      paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    });
    var inline = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: noopTest,
      tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(ref)\]/,
      nolink: /^!?\[(ref)\](?:\[\])?/,
      reflinkSearch: "reflink|nolink(?!\\()",
      emStrong: {
        lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
        rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
        rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
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
      let out = "", i, ch;
      const l = text.length;
      for (i = 0; i < l; i++) {
        ch = text.charCodeAt(i);
        if (Math.random() > 0.5) {
          ch = "x" + ch.toString(16);
        }
        out += "&#" + ch + ";";
      }
      return out;
    }
    var Lexer = class {
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
      static get rules() {
        return {
          block,
          inline
        };
      }
      static lex(src, options2) {
        const lexer2 = new Lexer(options2);
        return lexer2.lex(src);
      }
      static lexInline(src, options2) {
        const lexer2 = new Lexer(options2);
        return lexer2.inlineTokens(src);
      }
      lex(src) {
        src = src.replace(/\r\n|\r/g, "\n");
        this.blockTokens(src, this.tokens);
        let next;
        while (next = this.inlineQueue.shift()) {
          this.inlineTokens(next.src, next.tokens);
        }
        return this.tokens;
      }
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
      blockquote(quote) {
        return `<blockquote>
${quote}</blockquote>
`;
      }
      html(html) {
        return html;
      }
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
      listitem(text) {
        return `<li>${text}</li>
`;
      }
      checkbox(checked) {
        return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
      }
      paragraph(text) {
        return `<p>${text}</p>
`;
      }
      table(header, body) {
        if (body)
          body = `<tbody>${body}</tbody>`;
        return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
      }
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
      strong(text) {
        return `<strong>${text}</strong>`;
      }
      em(text) {
        return `<em>${text}</em>`;
      }
      codespan(text) {
        return `<code>${text}</code>`;
      }
      br() {
        return this.options.xhtml ? "<br/>" : "<br>";
      }
      del(text) {
        return `<del>${text}</del>`;
      }
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
      serialize(value) {
        return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
      }
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
      slug(value, options2 = {}) {
        const slug = this.serialize(value);
        return this.getNextSafeSlug(slug, options2.dryrun);
      }
    };
    var Parser = class {
      constructor(options2) {
        this.options = options2 || defaults;
        this.options.renderer = this.options.renderer || new Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new TextRenderer();
        this.slugger = new Slugger();
      }
      static parse(tokens, options2) {
        const parser2 = new Parser(options2);
        return parser2.parse(tokens);
      }
      static parseInline(tokens, options2) {
        const parser2 = new Parser(options2);
        return parser2.parseInline(tokens);
      }
      parse(tokens, top = true) {
        let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
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
              out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
              continue;
            }
            case "code": {
              out += this.renderer.code(token.text, token.lang, token.escaped);
              continue;
            }
            case "table": {
              header = "";
              cell = "";
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), { header: true, align: token.align[j] });
              }
              header += this.renderer.tablerow(cell);
              body = "";
              l2 = token.rows.length;
              for (j = 0; j < l2; j++) {
                row = token.rows[j];
                cell = "";
                l3 = row.length;
                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: token.align[k] });
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
              l2 = token.items.length;
              body = "";
              for (j = 0; j < l2; j++) {
                item = token.items[j];
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
              while (i + 1 < l && tokens[i + 1].type === "text") {
                token = tokens[++i];
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
      parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = "", i, token, ret;
        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
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
        } catch (e) {
          return callback(e);
        }
        const done = function(err) {
          let out;
          if (!err) {
            try {
              if (opt.walkTokens) {
                marked.walkTokens(tokens, opt.walkTokens);
              }
              out = Parser.parse(tokens, opt);
            } catch (e) {
              err = e;
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
      } catch (e) {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (opt.silent) {
          return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
        }
        throw e;
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
      } catch (e) {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (opt.silent) {
          return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
        }
        throw e;
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
          const partialPath = import_upath22.default.resolve(baseDir, possiblePath);
          if (!import_fs22.default.existsSync(partialPath)) {
            console.warn(`Partial at path ${partialPath} was not found. Your site may look incorrect.`);
            continue;
          }
          premadePartials[key] = import_fs22.default.readFileSync(partialPath, "utf-8");
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
          importedPartials[key2] = import_fs22.default.readFileSync(import_upath22.default.resolve(baseDir, partialPath), "utf-8");
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
          throw new Error("More than 10 nested imports discovered. Either you have a very deep import tree (please don't), or there's a circular import, which is not supported.");
        }
        const evaluationFunction = new Function("o", "macro", "md", "date", "partials", `
			return \`${currentString}\`
		`);
        currentString = evaluationFunction(o, macro, md, date, partials);
      }
      return currentString.replace(/\\\$/gm, "$");
    };
    var escapeHTML = (text) => {
      return text.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/\$/g, "\\$");
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
          finalString += marked.parse(part, {
            smartLists: true,
            smartypants: true
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
    var import_upath32 = __toESM2(require_upath2());
    var getRelativeURL = (site, sourceFileURL, targetURL) => {
      const newLink = import_upath32.default.relative(import_upath32.default.resolve(site.contentDirectory, import_upath32.default.dirname(sourceFileURL)), import_upath32.default.resolve(site.contentDirectory, targetURL));
      return newLink;
    };
    var parseWikiLink = (wikiLink) => {
      let label = wikiLink;
      let target = wikiLink;
      const barIndex = wikiLink.indexOf("|");
      if (barIndex !== -1) {
        label = wikiLink.substring(0, barIndex);
        target = wikiLink.substring(barIndex + 1);
      } else {
        const rightArrIndex = wikiLink.indexOf("->");
        if (rightArrIndex !== -1) {
          label = wikiLink.substring(0, rightArrIndex);
          target = wikiLink.substring(rightArrIndex + 2);
        } else {
          const leftArrIndex = wikiLink.indexOf("<-");
          if (leftArrIndex !== -1) {
            label = wikiLink.substring(leftArrIndex + 2);
            target = wikiLink.substring(0, leftArrIndex);
          }
        }
      }
      return {
        label,
        target
      };
    };
    var processAllWikilinks = (text, allFiles) => {
      return text.replace(/\[\[(.*?)\]\]/g, (wikilink) => {
        const linkParams = parseWikiLink(wikilink);
        const possibleTargets = allFiles.getFilesWithTitle(linkParams.target);
        if (possibleTargets.length > 1) {
          console.warn(`Multiple files found with title ${linkParams.target}: ${possibleTargets}
            
            Using the first one.`);
        }
        if (!possibleTargets.length) {
          console.warn(`Wikilink didn't return a valid page with title ${linkParams.target}`);
          return `[${linkParams.label}](${linkParams.target})`;
        }
        const page = possibleTargets[0];
        return `[${linkParams.label}](/${page.url})`;
      });
    };
    var MarkdownPlugin2 = class {
      constructor() {
        this.extensions = [".md", ".markdown"];
      }
      url(file, site) {
        let relativeDir;
        if (file.configuration?.dir) {
          const resolvedDir = import_upath42.default.resolve(site.contentDirectory, file.configuration.dir);
          relativeDir = import_upath42.default.relative(site.contentDirectory, resolvedDir);
        } else {
          relativeDir = import_upath42.default.relative(site.contentDirectory, file.sourceDir);
        }
        let urlPiece = relativeDir + import_upath42.default.sep + file.name;
        if (file.name === "index") {
          const pathSplit = file.id.split(import_upath42.default.sep);
          if (pathSplit.length > 1) {
            const targetDir = pathSplit[pathSplit.length - 2];
            const relativeSplit = relativeDir.split(import_upath42.default.sep);
            if (targetDir !== relativeSplit[relativeSplit.length - 1]) {
              urlPiece = relativeDir + import_upath42.default.sep + targetDir + import_upath42.default.sep + "index";
            }
          }
        }
        if (["404", "index"].includes(file.name)) {
          return urlPiece + ".html";
        }
        return urlPiece + import_upath42.default.sep + "index.html";
      }
      title(file, site) {
        const page = file;
        let title = "";
        if (page.text.trimStart().startsWith("#")) {
          title = page.text.trim().split(/\r\n|\r|\n/g)[0].slice(2).trim();
        }
        return file.configuration?.title || title || file.name;
      }
      build(opts, dryRun = false) {
        const file = opts.file;
        const layoutText = genLayout(opts.site, file);
        const pageStatics = genPageStatics(file, opts.allFiles);
        const feeds = genFeeds(file, opts.database, opts.allURLs);
        const links = extractLinks(file.text);
        let text = file.text;
        for (let link of links) {
          if (isURL(link)) {
            continue;
          }
          let linkSourcePath = import_upath42.default.resolve(opts.file.sourceDir, link);
          if (link.startsWith("/")) {
            linkSourcePath = import_upath42.default.resolve(opts.site.contentDirectory, link.slice(1));
          }
          const file2 = opts.allFiles.getFileFromPath(linkSourcePath)[0];
          if (!file2) {
            continue;
          }
          const newURL = opts.allURLs[file2.id];
          const newLink = "/" + newURL;
          if (link !== newLink) {
            text = text.replace(link, newLink);
          }
        }
        text = processAllWikilinks(text, opts.allFiles);
        const html = parse2(text);
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
        const templatedHTML = render(layoutText, templateVars);
        const targetPath = import_upath42.default.resolve(opts.site.buildDirectory, opts.url);
        if (dryRun) {
          console.log(opts);
          console.log(`Markdown plugin running, to save ${targetPath}`);
          return true;
        }
        if (!import_fs32.default.existsSync(targetPath)) {
          import_fs32.default.mkdirSync(import_upath42.default.dirname(targetPath), { recursive: true });
        }
        import_fs32.default.writeFileSync(targetPath, templatedHTML);
        file.html = html;
        return true;
      }
    };
  }
});

// ../plugins/image/dist/wanderer-image.js
var require_wanderer_image = __commonJS({
  "../plugins/image/dist/wanderer-image.js"(exports2, module2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
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
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var require_upath2 = __commonJS2({
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
        path32 = require("path");
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
    var require_dayjs_min = __commonJS2({
      "../../node_modules/.pnpm/dayjs@1.11.4/node_modules/dayjs/dayjs.min.js"(exports3, module22) {
        !function(t, e) {
          "object" == typeof exports3 && "undefined" != typeof module22 ? module22.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
        }(exports3, function() {
          "use strict";
          var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
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
            return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
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
                case o:
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
              var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), $2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], l2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
              if (o2 === f || o2 === c) {
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
              if (l2 === o)
                return y2(7);
              var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r2 * M3;
              return O.w(m3, this);
            }, m2.subtract = function(t2, e2) {
              return this.add(-1 * t2, e2);
            }, m2.format = function(t2) {
              var e2 = this, n2 = this.$locale();
              if (!this.isValid())
                return n2.invalidDate || $;
              var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
                return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
              }, c2 = function(t3) {
                return O.s(s2 % 12 || 12, t3, "0");
              }, d2 = n2.meridiem || function(t3, e3, n3) {
                var r3 = t3 < 12 ? "AM" : "PM";
                return n3 ? r3.toLowerCase() : r3;
              }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
              return r2.replace(y, function(t3, e3) {
                return e3 || l2[t3] || i2.replace(":", "");
              });
            }, m2.utcOffset = function() {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }, m2.diff = function(r2, d2, $2) {
              var l2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, v2 = O.m(this, M3);
              return v2 = (l2 = {}, l2[c] = v2 / 12, l2[f] = v2, l2[h] = v2 / 3, l2[o] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y2] || g2, $2 ? v2 : O.a(v2);
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
      default: () => ImagePlugin2
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_upath6 = __toESM2(require_upath2());
    var import_fs22 = __toESM2(require("fs"));
    var import_dayjs = __toESM2(require_dayjs_min());
    var import_fs5 = __toESM2(require("fs"));
    var import_path2 = __toESM2(require("path"));
    var import_child_process = require("child_process");
    var processImageGM = (inputFilePath, targetFilePath, config, callback) => {
      config = config || {};
      const targetFileDir = import_path2.default.dirname(targetFilePath);
      const ext = import_path2.default.extname(inputFilePath).toLocaleLowerCase();
      if (!import_fs5.default.existsSync(targetFileDir)) {
        import_fs5.default.mkdirSync(targetFileDir, { recursive: true });
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
            if (config.noPNGCompress) {
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
    var processImage = (inputFilePath, targetFilePath, config = {}) => {
      const inputFile = import_path2.default.basename(inputFilePath);
      const imageTrackingString = "write image " + inputFile;
      console.time(imageTrackingString);
      return new Promise((resolve, reject) => {
        try {
          processImageGM(inputFilePath, targetFilePath, config, () => {
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
          const resolvedDir = import_upath6.default.resolve(site.contentDirectory, file.configuration.dir);
          relativeDir = import_upath6.default.relative(site.contentDirectory, resolvedDir);
        } else {
          relativeDir = import_upath6.default.relative(site.contentDirectory, file.sourceDir);
        }
        const urlPiece = relativeDir + import_upath6.default.sep + file.name;
        return urlPiece + file.ext;
      }
      build(opts, dryRun) {
        const cache = opts.site.cacheDirectory;
        const cacheFilePath = import_upath6.default.resolve(cache, opts.url);
        const targetPath = import_upath6.default.resolve(opts.site.buildDirectory, opts.url);
        if (import_fs22.default.existsSync(cacheFilePath)) {
          const cacheUpdatedTime = import_fs22.default.statSync(cacheFilePath).mtime;
          if ((0, import_dayjs.default)(opts.file.updated).isBefore(cacheUpdatedTime)) {
            if (dryRun) {
              console.log(`retrieving ${opts.file.name} from the cache at ${cacheFilePath}`);
              return true;
            }
            if (import_upath6.default.resolve(cacheFilePath) !== import_upath6.default.resolve(targetPath)) {
              if (!import_fs22.default.existsSync(import_upath6.default.dirname(targetPath))) {
                import_fs22.default.mkdirSync(import_upath6.default.dirname(targetPath), { recursive: true });
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
          if (import_upath6.default.resolve(cacheFilePath) !== import_upath6.default.resolve(targetPath)) {
            if (!import_fs22.default.existsSync(import_upath6.default.dirname(targetPath))) {
              import_fs22.default.mkdirSync(import_upath6.default.dirname(targetPath), { recursive: true });
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
var require_wanderer_copy = __commonJS({
  "../plugins/copy/dist/wanderer-copy.js"(exports2, module2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
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
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var require_upath2 = __commonJS2({
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
        path22 = require("path");
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
      default: () => CopyPlugin2
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_fs5 = __toESM2(require("fs"));
    var import_upath6 = __toESM2(require_upath2());
    var CopyPlugin2 = class {
      constructor() {
        this.extensions = "UNUSED";
      }
      url(fileInfo, site) {
        return fileInfo.id;
      }
      build(opts) {
        const targetFilePath = import_upath6.default.resolve(opts.site.buildDirectory, opts.url);
        const sourceFilePath = import_upath6.default.resolve(opts.file.sourcePath);
        if (!import_fs5.default.existsSync(import_upath6.default.dirname(targetFilePath))) {
          import_fs5.default.mkdirSync(import_upath6.default.dirname(targetFilePath), { recursive: true });
        }
        import_fs5.default.copyFileSync(sourceFilePath, targetFilePath);
        return true;
      }
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CONFIG_RECURSION_LEVEL: () => CONFIG_RECURSION_LEVEL,
  FileCache: () => FileCache,
  FileDB: () => FileDB,
  QUERY_BOOLEAN_OPERATORS: () => QUERY_BOOLEAN_OPERATORS,
  QUERY_MODIFIER_OPERATIONS: () => QUERY_MODIFIER_OPERATIONS,
  Site: () => Site,
  wanderer: () => wanderer
});
module.exports = __toCommonJS(src_exports);
var url = __toESM(require("url"));

// src/objects/site.ts
var import_upath4 = __toESM(require_upath());
var import_fs4 = __toESM(require("fs"));

// src/objects/pages.ts
var import_upath3 = __toESM(require_upath());
var import_fs3 = __toESM(require("fs"));

// src/lib/recursive-readdir.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var _readdirSyncRecursive = function(dirPath, _originalDirPath, arrayOfFiles = []) {
  const files = import_fs.default.readdirSync(dirPath);
  const originalDirPath = _originalDirPath || dirPath;
  files.forEach(function(file) {
    if (import_fs.default.statSync(import_path.default.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = _readdirSyncRecursive(import_path.default.join(dirPath, file), originalDirPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(import_path.default.normalize(import_path.default.relative(originalDirPath, import_path.default.join(dirPath, file))));
    }
  });
  return arrayOfFiles;
};
var readdirSyncRecursive = function(sourceDirectory) {
  return _readdirSyncRecursive(sourceDirectory);
};

// ../node_modules/.pnpm/istextorbinary@6.0.0/node_modules/istextorbinary/edition-es2019-esm/index.js
var pathUtil = __toESM(require("path"), 1);

// ../node_modules/.pnpm/textextensions@5.15.0/node_modules/textextensions/edition-es5-esm/index.js
var list = [
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
var edition_es5_esm_default = list;

// ../node_modules/.pnpm/binaryextensions@4.18.0/node_modules/binaryextensions/edition-es5-esm/index.js
var list2 = [
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
var edition_es5_esm_default2 = list2;

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
var toml2 = __toESM(require_toml());

// src/lib/frontmatter/index.ts
var import_toml = __toESM(require_toml());
var import_fs2 = __toESM(require("fs"));
var import_upath = __toESM(require_upath());
var import_readline = __toESM(require("readline"));
var streamFrontmatter = async (filename) => {
  let startToken = "";
  const fileStream = import_fs2.default.createReadStream(import_upath.default.resolve(filename));
  const rl = import_readline.default.createInterface({
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
  const text = import_fs2.default.readFileSync(import_upath.default.resolve(filename), "utf-8");
  let startToken = "";
  if (text.startsWith("---")) {
    startToken = "---";
  } else if (text.startsWith("+++")) {
    startToken = "+++";
  }
  if (!startToken) {
    return text.trim();
  }
  const splits = text.split(startToken);
  if (splits.length <= 2) {
    return text.trim();
  }
  splits.shift();
  splits.shift();
  return splits.join(startToken).trim();
};

// src/lib/tempo/index.ts
var getMonthNumber = (s) => s.toLowerCase().charCodeAt(0) - 97;
var isTempoString = (string) => {
  return /^[0-9][0-9][a-l][0-9]?[0-9]$/.test(string);
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
  let date;
  const possibleDateTokens = filename.split("-");
  const possibleDateString = possibleDateTokens.shift();
  if (isTempoString(possibleDateString)) {
    tempoString = possibleDateString;
    date = parseDate(tempoString);
    processedFilename = possibleDateTokens.join("-");
  } else if (/^[0-9]+$/g.test(possibleDateString) && possibleDateTokens.length > 0) {
    processedFilename = possibleDateTokens.join("-");
  }
  return { tempo: tempoString, date, name: processedFilename };
};

// src/objects/db.ts
var import_jsonata = __toESM(require_jsonata());
var import_upath2 = __toESM(require_upath());

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
      value: import_upath2.default.resolve(directory),
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
      const fullPath = import_upath3.default.resolve(this.siteInfo.contentDirectory, file);
      const dir = import_upath3.default.dirname(file);
      const ext = import_upath3.default.extname(file).toLocaleLowerCase();
      const name = import_upath3.default.basename(file, import_upath3.default.extname(file));
      let isFrontmatter = false;
      let config;
      if (ext.toLocaleLowerCase() !== ".toml") {
        config = await streamFrontmatter(fullPath);
        isFrontmatter = true;
      } else {
        const contents = import_fs3.default.readFileSync(import_upath3.default.resolve(this.siteInfo.contentDirectory, file), "utf-8");
        if (name === `_`) {
          this.nestedConfiguration[dir] = toml2.parse(contents);
          continue;
        }
        config = toml2.parse(contents);
      }
      if (!this.nestedConfiguration[file]) {
        this.nestedConfiguration[file] = config;
        continue;
      }
      if (isFrontmatter) {
        this.nestedConfiguration[file] = {
          ...this.nestedConfiguration[file],
          ...config
        };
      } else {
        this.nestedConfiguration[file] = {
          ...config,
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
      const ext = import_upath3.default.extname(file).toLocaleLowerCase();
      const rawname = import_upath3.default.basename(file, import_upath3.default.extname(file));
      if (rawname.startsWith(".")) {
        continue;
      }
      const tempoString = tempo(rawname);
      const name = tempoString.name;
      if (ext.toLocaleLowerCase() === ".toml") {
        continue;
      }
      const sourcePath = import_upath3.default.resolve(this.siteInfo.contentDirectory, file);
      const stats = import_fs3.default.statSync(sourcePath);
      if (stats.size === 0) {
        continue;
      }
      const config = this.getConfigForFile(file, 2 /* ALL */);
      if (config.private) {
        continue;
      }
      const info = {
        configuration: config,
        id: file,
        name,
        ext,
        sourcePath,
        sourceDir: import_upath3.default.dirname(sourcePath),
        created: stats.birthtime,
        updated: stats.mtime,
        date: tempoString.date ?? stats.mtime
      };
      if (isText(sourcePath, import_fs3.default.readFileSync(sourcePath))) {
        const pageInfo = info;
        pageInfo.text = getTextAfterFrontmatter(sourcePath);
        pageInfo.title = config.title ?? config.name ?? name;
        pageInfo.isPage = true;
      }
      this.files[file] = info;
    }
    return this.files;
  }
  getConfigForFile(fileId, recursive = 2 /* ALL */) {
    const parts = fileId.split(import_upath3.default.sep);
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
      const config = {};
      let currentPath = "";
      if (this.nestedConfiguration["."]) {
        Object.assign(config, this.nestedConfiguration["."]);
      }
      for (let part of parts) {
        currentPath = import_upath3.default.join(currentPath, part);
        Object.assign(config, this.nestedConfiguration[currentPath] ?? {});
      }
      Logger.log(0 /* DEBUG */, "full config", config);
      return config;
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
          value: import_upath3.default.resolve(sourcePath),
          modifier: "=" /* EQUALS */
        }
      ]
    };
    return this._db.query(query);
  }
  getFilesWithTitle(title) {
    const query = {
      predicates: [
        {
          key: "title",
          value: title,
          modifier: "=" /* EQUALS */
        },
        {
          key: "name",
          value: title,
          modifier: "=" /* EQUALS */,
          operator: "OR" /* OR */
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
    const sourceDir = import_upath3.default.dirname(file.sourcePath);
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

// src/lib/slugify.ts
var slugify = (str) => {
  return str.toLowerCase().trim().replace(/[^\.\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
};

// src/objects/site.ts
var Site = class {
  constructor(config) {
    this.plugins = [];
    this.siteInfo = {
      ...config,
      contentDirectory: import_upath4.default.resolve(config.contentDirectory),
      frameDirectory: import_upath4.default.resolve(config.frameDirectory),
      cacheDirectory: import_upath4.default.resolve(config.cacheDirectory),
      buildDirectory: import_upath4.default.resolve(config.buildDirectory)
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
    return import_upath4.default.resolve(this.siteInfo.frameDirectory, "static");
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
      const targetFile = import_upath4.default.resolve(this.buildDir, "static", file);
      if (!import_fs4.default.existsSync(import_upath4.default.dirname(targetFile))) {
        import_fs4.default.mkdirSync(import_upath4.default.dirname(targetFile), { recursive: true });
      }
      import_fs4.default.copyFileSync(import_upath4.default.resolve(this.staticDir, file), targetFile);
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
      } else if (plugin.extensions.length === 0) {
        pluginFiles[i] = [];
      } else {
        pluginFiles[i] = this.fileCache.getAllFilesWithExts(plugin.extensions);
      }
      for (let j = 0; j < pluginFiles[i].length; j++) {
        const file = pluginFiles[i][j];
        let partialUrl = plugin.url(file, this.siteInfo);
        if (partialUrl) {
          if (partialUrl.startsWith("/")) {
            partialUrl = partialUrl.slice(1);
          }
          const urlSplits = partialUrl.split("/");
          const slugifiedSplits = urlSplits.map((value) => {
            return slugify(value);
          });
          allURLs[file.id] = slugifiedSplits.join("/");
          file.url = partialUrl;
        }
        if (plugin.title) {
          file.title = file.configuration?.title ?? plugin.title(file, this.siteInfo);
        }
      }
    }
    const allPluginOpts = [];
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
      allPluginOpts[i] = pluginOpts;
    }
    for (let i = 0; i < this.plugins.length; i++) {
      const plugin = this.plugins[i];
      for (let j = 0; j < pluginFiles[i].length; j++) {
        const file = pluginFiles[i][j];
        const buildOpts = {
          ...allPluginOpts[i],
          file,
          url: allURLs[file.id]
        };
        plugin.build(buildOpts);
      }
    }
    for (let i = 0; i < this.plugins.length; i++) {
      const plugin = this.plugins[i];
      if (plugin.afterBuild) {
        plugin.afterBuild(allPluginOpts[i]);
      }
    }
  }
};

// src/wanderer.ts
var import_wanderer_plugin_markdown = __toESM(require_wanderer_markdown());
var import_wanderer_plugin_image = __toESM(require_wanderer_image());

// src/objects/plugins/loader.ts
var import_upath5 = __toESM(require_upath());
var loadPluginFromString = async (pluginPath, nameOfExport = "default", baseDir) => {
  try {
    if (pluginPath.startsWith(".")) {
      pluginPath = import_upath5.default.resolve(baseDir || process.cwd(), pluginPath);
    }
    const pluginModule = await import(pluginPath);
    const PluginClass = pluginModule[nameOfExport];
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
var import_wanderer_plugin_copy = __toESM(require_wanderer_copy());
var wanderer = async (siteInfo, useDefaultPlugins = true, plugins) => {
  const site = new Site(siteInfo);
  if (useDefaultPlugins) {
    site.addPlugin(new import_wanderer_plugin_image.default());
    site.addPlugin(new import_wanderer_plugin_markdown.default());
  }
  if (plugins) {
    for (let plugin of plugins) {
      site.addPlugin(plugin);
    }
  } else if (siteInfo.siteConfiguration.plugins) {
    for (let pluginPath of siteInfo.siteConfiguration.plugins) {
      const plugin = await loadPluginFromString(pluginPath);
      if (plugin) {
        site.addPlugin(plugin);
      }
    }
  }
  if (useDefaultPlugins) {
    site.addPlugin(new import_wanderer_plugin_copy.default());
  }
  await site.make();
};

// src/index.ts
var import_meta = {};
var __filename = __filename || url.fileURLToPath(import_meta.url);
var __dirname = __dirname || url.fileURLToPath(new URL(".", import_meta.url));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CONFIG_RECURSION_LEVEL,
  FileCache,
  FileDB,
  QUERY_BOOLEAN_OPERATORS,
  QUERY_MODIFIER_OPERATIONS,
  Site,
  wanderer
});
