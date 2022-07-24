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
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js
var require_upath = __commonJS({
  "../../node_modules/.pnpm/upath@1.2.0/node_modules/upath/build/code/upath.js"(exports) {
    var VERSION = "1.2.0";
    var extraFn;
    var extraFunctions;
    var isFunction;
    var isString;
    var isValidExt;
    var name;
    var path2;
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
    path2 = require("path");
    isFunction = function(val) {
      return val instanceof Function;
    };
    isString = function(val) {
      return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
    };
    upath = exports;
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
    for (propName in path2) {
      propValue = path2[propName];
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
            result = path2[propName2].apply(path2, args);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CopyPlugin: () => CopyPlugin
});
module.exports = __toCommonJS(src_exports);
var import_fs = __toESM(require("fs"));
var import_upath = __toESM(require_upath());
var CopyPlugin = class {
  constructor() {
    this.extensions = "UNUSED";
  }
  url(fileInfo, site) {
    return fileInfo.id;
  }
  build(opts) {
    const targetFilePath = import_upath.default.resolve(opts.site.buildDirectory, opts.url);
    const sourceFilePath = import_upath.default.resolve(opts.file.sourcePath);
    if (!import_fs.default.existsSync(import_upath.default.dirname(targetFilePath))) {
      import_fs.default.mkdirSync(import_upath.default.dirname(targetFilePath), { recursive: true });
    }
    import_fs.default.copyFileSync(sourceFilePath, targetFilePath);
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CopyPlugin
});
