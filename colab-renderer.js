(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a3, b2) => (typeof require !== "undefined" ? require : a3)[b2]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/marked/lib/marked.cjs
  var require_marked = __commonJS({
    "node_modules/marked/lib/marked.cjs"(exports) {
      "use strict";
      function _defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _extends() {
        _extends = Object.assign ? Object.assign.bind() : function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _unsupportedIterableToArray(o5, minLen) {
        if (!o5)
          return;
        if (typeof o5 === "string")
          return _arrayLikeToArray(o5, minLen);
        var n5 = Object.prototype.toString.call(o5).slice(8, -1);
        if (n5 === "Object" && o5.constructor)
          n5 = o5.constructor.name;
        if (n5 === "Map" || n5 === "Set")
          return Array.from(o5);
        if (n5 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n5))
          return _arrayLikeToArray(o5, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++)
          arr2[i3] = arr[i3];
        return arr2;
      }
      function _createForOfIteratorHelperLoose(o5, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o5[Symbol.iterator] || o5["@@iterator"];
        if (it)
          return (it = it.call(o5)).next.bind(it);
        if (Array.isArray(o5) || (it = _unsupportedIterableToArray(o5)) || allowArrayLike && o5 && typeof o5.length === "number") {
          if (it)
            o5 = it;
          var i3 = 0;
          return function() {
            if (i3 >= o5.length)
              return {
                done: true
              };
            return {
              done: false,
              value: o5[i3++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null)
          return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object")
            return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function getDefaults() {
        return {
          async: false,
          baseUrl: null,
          breaks: false,
          extensions: null,
          gfm: true,
          headerIds: true,
          headerPrefix: "",
          highlight: null,
          hooks: null,
          langPrefix: "language-",
          mangle: true,
          pedantic: false,
          renderer: null,
          sanitize: false,
          sanitizer: null,
          silent: false,
          smartypants: false,
          tokenizer: null,
          walkTokens: null,
          xhtml: false
        };
      }
      exports.defaults = getDefaults();
      function changeDefaults(newDefaults) {
        exports.defaults = newDefaults;
      }
      var escapeTest = /[&<>"']/;
      var escapeReplace = new RegExp(escapeTest.source, "g");
      var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
      var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
      var escapeReplacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var getEscapeReplacement = function getEscapeReplacement2(ch) {
        return escapeReplacements[ch];
      };
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
        return html.replace(unescapeTest, function(_2, n5) {
          n5 = n5.toLowerCase();
          if (n5 === "colon")
            return ":";
          if (n5.charAt(0) === "#") {
            return n5.charAt(1) === "x" ? String.fromCharCode(parseInt(n5.substring(2), 16)) : String.fromCharCode(+n5.substring(1));
          }
          return "";
        });
      }
      var caret = /(^|[^\[])\^/g;
      function edit(regex, opt) {
        regex = typeof regex === "string" ? regex : regex.source;
        opt = opt || "";
        var obj = {
          replace: function replace(name, val) {
            val = val.source || val;
            val = val.replace(caret, "$1");
            regex = regex.replace(name, val);
            return obj;
          },
          getRegex: function getRegex() {
            return new RegExp(regex, opt);
          }
        };
        return obj;
      }
      var nonWordAndColonTest = /[^\w:]/g;
      var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
      function cleanUrl(sanitize, base, href) {
        if (sanitize) {
          var prot;
          try {
            prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
          } catch (e4) {
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
        } catch (e4) {
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
        var relativeBase = base.indexOf(":") === -1;
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
      var noopTest = {
        exec: function noopTest2() {
        }
      };
      function splitCells(tableRow, count) {
        var row = tableRow.replace(/\|/g, function(match, offset, str) {
          var escaped = false, curr = offset;
          while (--curr >= 0 && str[curr] === "\\") {
            escaped = !escaped;
          }
          if (escaped) {
            return "|";
          } else {
            return " |";
          }
        }), cells = row.split(/ \|/);
        var i3 = 0;
        if (!cells[0].trim()) {
          cells.shift();
        }
        if (cells.length > 0 && !cells[cells.length - 1].trim()) {
          cells.pop();
        }
        if (cells.length > count) {
          cells.splice(count);
        } else {
          while (cells.length < count) {
            cells.push("");
          }
        }
        for (; i3 < cells.length; i3++) {
          cells[i3] = cells[i3].trim().replace(/\\\|/g, "|");
        }
        return cells;
      }
      function rtrim(str, c3, invert) {
        var l4 = str.length;
        if (l4 === 0) {
          return "";
        }
        var suffLen = 0;
        while (suffLen < l4) {
          var currChar = str.charAt(l4 - suffLen - 1);
          if (currChar === c3 && !invert) {
            suffLen++;
          } else if (currChar !== c3 && invert) {
            suffLen++;
          } else {
            break;
          }
        }
        return str.slice(0, l4 - suffLen);
      }
      function findClosingBracket(str, b2) {
        if (str.indexOf(b2[1]) === -1) {
          return -1;
        }
        var l4 = str.length;
        var level = 0, i3 = 0;
        for (; i3 < l4; i3++) {
          if (str[i3] === "\\") {
            i3++;
          } else if (str[i3] === b2[0]) {
            level++;
          } else if (str[i3] === b2[1]) {
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
        var result = "";
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
        var href = link.href;
        var title = link.title ? escape(link.title) : null;
        var text = cap[1].replace(/\\([\[\]])/g, "$1");
        if (cap[0].charAt(0) !== "!") {
          lexer2.state.inLink = true;
          var token = {
            type: "link",
            raw,
            href,
            title,
            text,
            tokens: lexer2.inlineTokens(text)
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
        var matchIndentToCode = raw.match(/^(\s+)(?:```)/);
        if (matchIndentToCode === null) {
          return text;
        }
        var indentToCode = matchIndentToCode[1];
        return text.split("\n").map(function(node) {
          var matchIndentInNode = node.match(/^\s+/);
          if (matchIndentInNode === null) {
            return node;
          }
          var indentInNode = matchIndentInNode[0];
          if (indentInNode.length >= indentToCode.length) {
            return node.slice(indentToCode.length);
          }
          return node;
        }).join("\n");
      }
      var Tokenizer = /* @__PURE__ */ function() {
        function Tokenizer2(options2) {
          this.options = options2 || exports.defaults;
        }
        var _proto = Tokenizer2.prototype;
        _proto.space = function space(src) {
          var cap = this.rules.block.newline.exec(src);
          if (cap && cap[0].length > 0) {
            return {
              type: "space",
              raw: cap[0]
            };
          }
        };
        _proto.code = function code(src) {
          var cap = this.rules.block.code.exec(src);
          if (cap) {
            var text = cap[0].replace(/^ {1,4}/gm, "");
            return {
              type: "code",
              raw: cap[0],
              codeBlockStyle: "indented",
              text: !this.options.pedantic ? rtrim(text, "\n") : text
            };
          }
        };
        _proto.fences = function fences(src) {
          var cap = this.rules.block.fences.exec(src);
          if (cap) {
            var raw = cap[0];
            var text = indentCodeCompensation(raw, cap[3] || "");
            return {
              type: "code",
              raw,
              lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
              text
            };
          }
        };
        _proto.heading = function heading(src) {
          var cap = this.rules.block.heading.exec(src);
          if (cap) {
            var text = cap[2].trim();
            if (/#$/.test(text)) {
              var trimmed = rtrim(text, "#");
              if (this.options.pedantic) {
                text = trimmed.trim();
              } else if (!trimmed || / $/.test(trimmed)) {
                text = trimmed.trim();
              }
            }
            return {
              type: "heading",
              raw: cap[0],
              depth: cap[1].length,
              text,
              tokens: this.lexer.inline(text)
            };
          }
        };
        _proto.hr = function hr(src) {
          var cap = this.rules.block.hr.exec(src);
          if (cap) {
            return {
              type: "hr",
              raw: cap[0]
            };
          }
        };
        _proto.blockquote = function blockquote(src) {
          var cap = this.rules.block.blockquote.exec(src);
          if (cap) {
            var text = cap[0].replace(/^ *>[ \t]?/gm, "");
            var top = this.lexer.state.top;
            this.lexer.state.top = true;
            var tokens = this.lexer.blockTokens(text);
            this.lexer.state.top = top;
            return {
              type: "blockquote",
              raw: cap[0],
              tokens,
              text
            };
          }
        };
        _proto.list = function list(src) {
          var cap = this.rules.block.list.exec(src);
          if (cap) {
            var raw, istask, ischecked, indent, i3, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
            var bull = cap[1].trim();
            var isordered = bull.length > 1;
            var list2 = {
              type: "list",
              raw: "",
              ordered: isordered,
              start: isordered ? +bull.slice(0, -1) : "",
              loose: false,
              items: []
            };
            bull = isordered ? "\\d{1,9}\\" + bull.slice(-1) : "\\" + bull;
            if (this.options.pedantic) {
              bull = isordered ? bull : "[*+-]";
            }
            var itemRegex = new RegExp("^( {0,3}" + bull + ")((?:[	 ][^\\n]*)?(?:\\n|$))");
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
              line = cap[2].split("\n", 1)[0].replace(/^\t+/, function(t3) {
                return " ".repeat(3 * t3.length);
              });
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
                var nextBulletRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))");
                var hrRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)");
                var fencesBeginRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}(?:```|~~~)");
                var headingBeginRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}#");
                while (src) {
                  rawLine = src.split("\n", 1)[0];
                  nextLine = rawLine;
                  if (this.options.pedantic) {
                    nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
                  }
                  if (fencesBeginRegex.test(nextLine)) {
                    break;
                  }
                  if (headingBeginRegex.test(nextLine)) {
                    break;
                  }
                  if (nextBulletRegex.test(nextLine)) {
                    break;
                  }
                  if (hrRegex.test(src)) {
                    break;
                  }
                  if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                    itemContents += "\n" + nextLine.slice(indent);
                  } else {
                    if (blankLine) {
                      break;
                    }
                    if (line.search(/[^ ]/) >= 4) {
                      break;
                    }
                    if (fencesBeginRegex.test(line)) {
                      break;
                    }
                    if (headingBeginRegex.test(line)) {
                      break;
                    }
                    if (hrRegex.test(line)) {
                      break;
                    }
                    itemContents += "\n" + nextLine;
                  }
                  if (!blankLine && !nextLine.trim()) {
                    blankLine = true;
                  }
                  raw += rawLine + "\n";
                  src = src.substring(rawLine.length + 1);
                  line = nextLine.slice(indent);
                }
              }
              if (!list2.loose) {
                if (endsWithBlankLine) {
                  list2.loose = true;
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
              list2.items.push({
                type: "list_item",
                raw,
                task: !!istask,
                checked: ischecked,
                loose: false,
                text: itemContents
              });
              list2.raw += raw;
            }
            list2.items[list2.items.length - 1].raw = raw.trimRight();
            list2.items[list2.items.length - 1].text = itemContents.trimRight();
            list2.raw = list2.raw.trimRight();
            var l4 = list2.items.length;
            for (i3 = 0; i3 < l4; i3++) {
              this.lexer.state.top = false;
              list2.items[i3].tokens = this.lexer.blockTokens(list2.items[i3].text, []);
              if (!list2.loose) {
                var spacers = list2.items[i3].tokens.filter(function(t3) {
                  return t3.type === "space";
                });
                var hasMultipleLineBreaks = spacers.length > 0 && spacers.some(function(t3) {
                  return /\n.*\n/.test(t3.raw);
                });
                list2.loose = hasMultipleLineBreaks;
              }
            }
            if (list2.loose) {
              for (i3 = 0; i3 < l4; i3++) {
                list2.items[i3].loose = true;
              }
            }
            return list2;
          }
        };
        _proto.html = function html(src) {
          var cap = this.rules.block.html.exec(src);
          if (cap) {
            var token = {
              type: "html",
              raw: cap[0],
              pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
              text: cap[0]
            };
            if (this.options.sanitize) {
              var text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
              token.type = "paragraph";
              token.text = text;
              token.tokens = this.lexer.inline(text);
            }
            return token;
          }
        };
        _proto.def = function def(src) {
          var cap = this.rules.block.def.exec(src);
          if (cap) {
            var tag = cap[1].toLowerCase().replace(/\s+/g, " ");
            var href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
            var title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
            return {
              type: "def",
              tag,
              raw: cap[0],
              href,
              title
            };
          }
        };
        _proto.table = function table(src) {
          var cap = this.rules.block.table.exec(src);
          if (cap) {
            var item = {
              type: "table",
              header: splitCells(cap[1]).map(function(c3) {
                return {
                  text: c3
                };
              }),
              align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
              rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
            };
            if (item.header.length === item.align.length) {
              item.raw = cap[0];
              var l4 = item.align.length;
              var i3, j2, k2, row;
              for (i3 = 0; i3 < l4; i3++) {
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
              l4 = item.rows.length;
              for (i3 = 0; i3 < l4; i3++) {
                item.rows[i3] = splitCells(item.rows[i3], item.header.length).map(function(c3) {
                  return {
                    text: c3
                  };
                });
              }
              l4 = item.header.length;
              for (j2 = 0; j2 < l4; j2++) {
                item.header[j2].tokens = this.lexer.inline(item.header[j2].text);
              }
              l4 = item.rows.length;
              for (j2 = 0; j2 < l4; j2++) {
                row = item.rows[j2];
                for (k2 = 0; k2 < row.length; k2++) {
                  row[k2].tokens = this.lexer.inline(row[k2].text);
                }
              }
              return item;
            }
          }
        };
        _proto.lheading = function lheading(src) {
          var cap = this.rules.block.lheading.exec(src);
          if (cap) {
            return {
              type: "heading",
              raw: cap[0],
              depth: cap[2].charAt(0) === "=" ? 1 : 2,
              text: cap[1],
              tokens: this.lexer.inline(cap[1])
            };
          }
        };
        _proto.paragraph = function paragraph(src) {
          var cap = this.rules.block.paragraph.exec(src);
          if (cap) {
            var text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
            return {
              type: "paragraph",
              raw: cap[0],
              text,
              tokens: this.lexer.inline(text)
            };
          }
        };
        _proto.text = function text(src) {
          var cap = this.rules.block.text.exec(src);
          if (cap) {
            return {
              type: "text",
              raw: cap[0],
              text: cap[0],
              tokens: this.lexer.inline(cap[0])
            };
          }
        };
        _proto.escape = function escape$1(src) {
          var cap = this.rules.inline.escape.exec(src);
          if (cap) {
            return {
              type: "escape",
              raw: cap[0],
              text: escape(cap[1])
            };
          }
        };
        _proto.tag = function tag(src) {
          var cap = this.rules.inline.tag.exec(src);
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
        };
        _proto.link = function link(src) {
          var cap = this.rules.inline.link.exec(src);
          if (cap) {
            var trimmedUrl = cap[2].trim();
            if (!this.options.pedantic && /^</.test(trimmedUrl)) {
              if (!/>$/.test(trimmedUrl)) {
                return;
              }
              var rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
              if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
                return;
              }
            } else {
              var lastParenIndex = findClosingBracket(cap[2], "()");
              if (lastParenIndex > -1) {
                var start = cap[0].indexOf("!") === 0 ? 5 : 4;
                var linkLen = start + cap[1].length + lastParenIndex;
                cap[2] = cap[2].substring(0, lastParenIndex);
                cap[0] = cap[0].substring(0, linkLen).trim();
                cap[3] = "";
              }
            }
            var href = cap[2];
            var title = "";
            if (this.options.pedantic) {
              var link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
              if (link2) {
                href = link2[1];
                title = link2[3];
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
        };
        _proto.reflink = function reflink(src, links) {
          var cap;
          if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
            var link = (cap[2] || cap[1]).replace(/\s+/g, " ");
            link = links[link.toLowerCase()];
            if (!link) {
              var text = cap[0].charAt(0);
              return {
                type: "text",
                raw: text,
                text
              };
            }
            return outputLink(cap, link, cap[0], this.lexer);
          }
        };
        _proto.emStrong = function emStrong(src, maskedSrc, prevChar) {
          if (prevChar === void 0) {
            prevChar = "";
          }
          var match = this.rules.inline.emStrong.lDelim.exec(src);
          if (!match)
            return;
          if (match[3] && prevChar.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))
            return;
          var nextChar = match[1] || match[2] || "";
          if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
            var lLength = match[0].length - 1;
            var rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
            var endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
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
              var raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);
              if (Math.min(lLength, rLength) % 2) {
                var _text = raw.slice(1, -1);
                return {
                  type: "em",
                  raw,
                  text: _text,
                  tokens: this.lexer.inlineTokens(_text)
                };
              }
              var text = raw.slice(2, -2);
              return {
                type: "strong",
                raw,
                text,
                tokens: this.lexer.inlineTokens(text)
              };
            }
          }
        };
        _proto.codespan = function codespan(src) {
          var cap = this.rules.inline.code.exec(src);
          if (cap) {
            var text = cap[2].replace(/\n/g, " ");
            var hasNonSpaceChars = /[^ ]/.test(text);
            var hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
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
        };
        _proto.br = function br(src) {
          var cap = this.rules.inline.br.exec(src);
          if (cap) {
            return {
              type: "br",
              raw: cap[0]
            };
          }
        };
        _proto.del = function del(src) {
          var cap = this.rules.inline.del.exec(src);
          if (cap) {
            return {
              type: "del",
              raw: cap[0],
              text: cap[2],
              tokens: this.lexer.inlineTokens(cap[2])
            };
          }
        };
        _proto.autolink = function autolink(src, mangle2) {
          var cap = this.rules.inline.autolink.exec(src);
          if (cap) {
            var text, href;
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
              tokens: [{
                type: "text",
                raw: text,
                text
              }]
            };
          }
        };
        _proto.url = function url(src, mangle2) {
          var cap;
          if (cap = this.rules.inline.url.exec(src)) {
            var text, href;
            if (cap[2] === "@") {
              text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
              href = "mailto:" + text;
            } else {
              var prevCapZero;
              do {
                prevCapZero = cap[0];
                cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
              } while (prevCapZero !== cap[0]);
              text = escape(cap[0]);
              if (cap[1] === "www.") {
                href = "http://" + cap[0];
              } else {
                href = cap[0];
              }
            }
            return {
              type: "link",
              raw: cap[0],
              text,
              href,
              tokens: [{
                type: "text",
                raw: text,
                text
              }]
            };
          }
        };
        _proto.inlineText = function inlineText(src, smartypants2) {
          var cap = this.rules.inline.text.exec(src);
          if (cap) {
            var text;
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
        };
        return Tokenizer2;
      }();
      var block = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
        hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
        html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
        def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
        table: noopTest,
        lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
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
      block.normal = _extends({}, block);
      block.gfm = _extends({}, block.normal, {
        table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
      });
      block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
      block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
      block.pedantic = _extends({}, block.normal, {
        html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: noopTest,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
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
          rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
          rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
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
      inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
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
      inline.normal = _extends({}, inline);
      inline.pedantic = _extends({}, inline.normal, {
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
      inline.gfm = _extends({}, inline.normal, {
        escape: edit(inline.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
      });
      inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
      inline.breaks = _extends({}, inline.gfm, {
        br: edit(inline.br).replace("{2,}", "*").getRegex(),
        text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
      });
      function smartypants(text) {
        return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
      }
      function mangle(text) {
        var out = "", i3, ch;
        var l4 = text.length;
        for (i3 = 0; i3 < l4; i3++) {
          ch = text.charCodeAt(i3);
          if (Math.random() > 0.5) {
            ch = "x" + ch.toString(16);
          }
          out += "&#" + ch + ";";
        }
        return out;
      }
      var Lexer = /* @__PURE__ */ function() {
        function Lexer2(options2) {
          this.tokens = [];
          this.tokens.links = Object.create(null);
          this.options = options2 || exports.defaults;
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
          var rules = {
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
        Lexer2.lex = function lex(src, options2) {
          var lexer2 = new Lexer2(options2);
          return lexer2.lex(src);
        };
        Lexer2.lexInline = function lexInline(src, options2) {
          var lexer2 = new Lexer2(options2);
          return lexer2.inlineTokens(src);
        };
        var _proto = Lexer2.prototype;
        _proto.lex = function lex(src) {
          src = src.replace(/\r\n|\r/g, "\n");
          this.blockTokens(src, this.tokens);
          var next;
          while (next = this.inlineQueue.shift()) {
            this.inlineTokens(next.src, next.tokens);
          }
          return this.tokens;
        };
        _proto.blockTokens = function blockTokens(src, tokens) {
          var _this = this;
          if (tokens === void 0) {
            tokens = [];
          }
          if (this.options.pedantic) {
            src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
          } else {
            src = src.replace(/^( *)(\t+)/gm, function(_2, leading, tabs) {
              return leading + "    ".repeat(tabs.length);
            });
          }
          var token, lastToken, cutSrc, lastParagraphClipped;
          while (src) {
            if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(function(extTokenizer) {
              if (token = extTokenizer.call({
                lexer: _this
              }, src, tokens)) {
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
              (function() {
                var startIndex = Infinity;
                var tempSrc = src.slice(1);
                var tempStart = void 0;
                _this.options.extensions.startBlock.forEach(function(getStartIndex) {
                  tempStart = getStartIndex.call({
                    lexer: this
                  }, tempSrc);
                  if (typeof tempStart === "number" && tempStart >= 0) {
                    startIndex = Math.min(startIndex, tempStart);
                  }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                  cutSrc = src.substring(0, startIndex + 1);
                }
              })();
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
              var errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
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
        };
        _proto.inline = function inline2(src, tokens) {
          if (tokens === void 0) {
            tokens = [];
          }
          this.inlineQueue.push({
            src,
            tokens
          });
          return tokens;
        };
        _proto.inlineTokens = function inlineTokens(src, tokens) {
          var _this2 = this;
          if (tokens === void 0) {
            tokens = [];
          }
          var token, lastToken, cutSrc;
          var maskedSrc = src;
          var match;
          var keepPrevChar, prevChar;
          if (this.tokens.links) {
            var links = Object.keys(this.tokens.links);
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
            maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
            this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
          }
          while (src) {
            if (!keepPrevChar) {
              prevChar = "";
            }
            keepPrevChar = false;
            if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(function(extTokenizer) {
              if (token = extTokenizer.call({
                lexer: _this2
              }, src, tokens)) {
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
              (function() {
                var startIndex = Infinity;
                var tempSrc = src.slice(1);
                var tempStart = void 0;
                _this2.options.extensions.startInline.forEach(function(getStartIndex) {
                  tempStart = getStartIndex.call({
                    lexer: this
                  }, tempSrc);
                  if (typeof tempStart === "number" && tempStart >= 0) {
                    startIndex = Math.min(startIndex, tempStart);
                  }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                  cutSrc = src.substring(0, startIndex + 1);
                }
              })();
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
              var errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
              if (this.options.silent) {
                console.error(errMsg);
                break;
              } else {
                throw new Error(errMsg);
              }
            }
          }
          return tokens;
        };
        _createClass(Lexer2, null, [{
          key: "rules",
          get: function get() {
            return {
              block,
              inline
            };
          }
        }]);
        return Lexer2;
      }();
      var Renderer = /* @__PURE__ */ function() {
        function Renderer2(options2) {
          this.options = options2 || exports.defaults;
        }
        var _proto = Renderer2.prototype;
        _proto.code = function code(_code, infostring, escaped) {
          var lang = (infostring || "").match(/\S*/)[0];
          if (this.options.highlight) {
            var out = this.options.highlight(_code, lang);
            if (out != null && out !== _code) {
              escaped = true;
              _code = out;
            }
          }
          _code = _code.replace(/\n$/, "") + "\n";
          if (!lang) {
            return "<pre><code>" + (escaped ? _code : escape(_code, true)) + "</code></pre>\n";
          }
          return '<pre><code class="' + this.options.langPrefix + escape(lang) + '">' + (escaped ? _code : escape(_code, true)) + "</code></pre>\n";
        };
        _proto.blockquote = function blockquote(quote) {
          return "<blockquote>\n" + quote + "</blockquote>\n";
        };
        _proto.html = function html(_html) {
          return _html;
        };
        _proto.heading = function heading(text, level, raw, slugger) {
          if (this.options.headerIds) {
            var id = this.options.headerPrefix + slugger.slug(raw);
            return "<h" + level + ' id="' + id + '">' + text + "</h" + level + ">\n";
          }
          return "<h" + level + ">" + text + "</h" + level + ">\n";
        };
        _proto.hr = function hr() {
          return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
        };
        _proto.list = function list(body, ordered, start) {
          var type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
          return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
        };
        _proto.listitem = function listitem(text) {
          return "<li>" + text + "</li>\n";
        };
        _proto.checkbox = function checkbox(checked) {
          return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
        };
        _proto.paragraph = function paragraph(text) {
          return "<p>" + text + "</p>\n";
        };
        _proto.table = function table(header, body) {
          if (body)
            body = "<tbody>" + body + "</tbody>";
          return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
        };
        _proto.tablerow = function tablerow(content) {
          return "<tr>\n" + content + "</tr>\n";
        };
        _proto.tablecell = function tablecell(content, flags) {
          var type = flags.header ? "th" : "td";
          var tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
          return tag + content + ("</" + type + ">\n");
        };
        _proto.strong = function strong(text) {
          return "<strong>" + text + "</strong>";
        };
        _proto.em = function em(text) {
          return "<em>" + text + "</em>";
        };
        _proto.codespan = function codespan(text) {
          return "<code>" + text + "</code>";
        };
        _proto.br = function br() {
          return this.options.xhtml ? "<br/>" : "<br>";
        };
        _proto.del = function del(text) {
          return "<del>" + text + "</del>";
        };
        _proto.link = function link(href, title, text) {
          href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
          if (href === null) {
            return text;
          }
          var out = '<a href="' + href + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += ">" + text + "</a>";
          return out;
        };
        _proto.image = function image(href, title, text) {
          href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
          if (href === null) {
            return text;
          }
          var out = '<img src="' + href + '" alt="' + text + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += this.options.xhtml ? "/>" : ">";
          return out;
        };
        _proto.text = function text(_text) {
          return _text;
        };
        return Renderer2;
      }();
      var TextRenderer = /* @__PURE__ */ function() {
        function TextRenderer2() {
        }
        var _proto = TextRenderer2.prototype;
        _proto.strong = function strong(text) {
          return text;
        };
        _proto.em = function em(text) {
          return text;
        };
        _proto.codespan = function codespan(text) {
          return text;
        };
        _proto.del = function del(text) {
          return text;
        };
        _proto.html = function html(text) {
          return text;
        };
        _proto.text = function text(_text) {
          return _text;
        };
        _proto.link = function link(href, title, text) {
          return "" + text;
        };
        _proto.image = function image(href, title, text) {
          return "" + text;
        };
        _proto.br = function br() {
          return "";
        };
        return TextRenderer2;
      }();
      var Slugger = /* @__PURE__ */ function() {
        function Slugger2() {
          this.seen = {};
        }
        var _proto = Slugger2.prototype;
        _proto.serialize = function serialize(value) {
          return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
        };
        _proto.getNextSafeSlug = function getNextSafeSlug(originalSlug, isDryRun) {
          var slug = originalSlug;
          var occurenceAccumulator = 0;
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
        };
        _proto.slug = function slug(value, options2) {
          if (options2 === void 0) {
            options2 = {};
          }
          var slug2 = this.serialize(value);
          return this.getNextSafeSlug(slug2, options2.dryrun);
        };
        return Slugger2;
      }();
      var Parser = /* @__PURE__ */ function() {
        function Parser2(options2) {
          this.options = options2 || exports.defaults;
          this.options.renderer = this.options.renderer || new Renderer();
          this.renderer = this.options.renderer;
          this.renderer.options = this.options;
          this.textRenderer = new TextRenderer();
          this.slugger = new Slugger();
        }
        Parser2.parse = function parse2(tokens, options2) {
          var parser2 = new Parser2(options2);
          return parser2.parse(tokens);
        };
        Parser2.parseInline = function parseInline2(tokens, options2) {
          var parser2 = new Parser2(options2);
          return parser2.parseInline(tokens);
        };
        var _proto = Parser2.prototype;
        _proto.parse = function parse2(tokens, top) {
          if (top === void 0) {
            top = true;
          }
          var out = "", i3, j2, k2, l22, l32, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
          var l4 = tokens.length;
          for (i3 = 0; i3 < l4; i3++) {
            token = tokens[i3];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
              ret = this.options.extensions.renderers[token.type].call({
                parser: this
              }, token);
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
                l22 = token.header.length;
                for (j2 = 0; j2 < l22; j2++) {
                  cell += this.renderer.tablecell(this.parseInline(token.header[j2].tokens), {
                    header: true,
                    align: token.align[j2]
                  });
                }
                header += this.renderer.tablerow(cell);
                body = "";
                l22 = token.rows.length;
                for (j2 = 0; j2 < l22; j2++) {
                  row = token.rows[j2];
                  cell = "";
                  l32 = row.length;
                  for (k2 = 0; k2 < l32; k2++) {
                    cell += this.renderer.tablecell(this.parseInline(row[k2].tokens), {
                      header: false,
                      align: token.align[k2]
                    });
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
                for (j2 = 0; j2 < l22; j2++) {
                  item = token.items[j2];
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
                var errMsg = 'Token with "' + token.type + '" type was not found.';
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
        };
        _proto.parseInline = function parseInline2(tokens, renderer) {
          renderer = renderer || this.renderer;
          var out = "", i3, token, ret;
          var l4 = tokens.length;
          for (i3 = 0; i3 < l4; i3++) {
            token = tokens[i3];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
              ret = this.options.extensions.renderers[token.type].call({
                parser: this
              }, token);
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
                var errMsg = 'Token with "' + token.type + '" type was not found.';
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
        };
        return Parser2;
      }();
      var Hooks = /* @__PURE__ */ function() {
        function Hooks2(options2) {
          this.options = options2 || exports.defaults;
        }
        var _proto = Hooks2.prototype;
        _proto.preprocess = function preprocess(markdown) {
          return markdown;
        };
        _proto.postprocess = function postprocess(html) {
          return html;
        };
        return Hooks2;
      }();
      Hooks.passThroughHooks = new Set(["preprocess", "postprocess"]);
      function onError(silent, async, callback) {
        return function(e4) {
          e4.message += "\nPlease report this to https://github.com/markedjs/marked.";
          if (silent) {
            var msg = "<p>An error occurred:</p><pre>" + escape(e4.message + "", true) + "</pre>";
            if (async) {
              return Promise.resolve(msg);
            }
            if (callback) {
              callback(null, msg);
              return;
            }
            return msg;
          }
          if (async) {
            return Promise.reject(e4);
          }
          if (callback) {
            callback(e4);
            return;
          }
          throw e4;
        };
      }
      function parseMarkdown(lexer2, parser2) {
        return function(src, opt, callback) {
          if (typeof opt === "function") {
            callback = opt;
            opt = null;
          }
          var origOpt = _extends({}, opt);
          opt = _extends({}, marked.defaults, origOpt);
          var throwError = onError(opt.silent, opt.async, callback);
          if (typeof src === "undefined" || src === null) {
            return throwError(new Error("marked(): input parameter is undefined or null"));
          }
          if (typeof src !== "string") {
            return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
          }
          checkSanitizeDeprecation(opt);
          if (opt.hooks) {
            opt.hooks.options = opt;
          }
          if (callback) {
            var highlight = opt.highlight;
            var tokens;
            try {
              if (opt.hooks) {
                src = opt.hooks.preprocess(src);
              }
              tokens = lexer2(src, opt);
            } catch (e4) {
              return throwError(e4);
            }
            var done = function done2(err) {
              var out;
              if (!err) {
                try {
                  if (opt.walkTokens) {
                    marked.walkTokens(tokens, opt.walkTokens);
                  }
                  out = parser2(tokens, opt);
                  if (opt.hooks) {
                    out = opt.hooks.postprocess(out);
                  }
                } catch (e4) {
                  err = e4;
                }
              }
              opt.highlight = highlight;
              return err ? throwError(err) : callback(null, out);
            };
            if (!highlight || highlight.length < 3) {
              return done();
            }
            delete opt.highlight;
            if (!tokens.length)
              return done();
            var pending = 0;
            marked.walkTokens(tokens, function(token) {
              if (token.type === "code") {
                pending++;
                setTimeout(function() {
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
          if (opt.async) {
            return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then(function(src2) {
              return lexer2(src2, opt);
            }).then(function(tokens2) {
              return opt.walkTokens ? Promise.all(marked.walkTokens(tokens2, opt.walkTokens)).then(function() {
                return tokens2;
              }) : tokens2;
            }).then(function(tokens2) {
              return parser2(tokens2, opt);
            }).then(function(html2) {
              return opt.hooks ? opt.hooks.postprocess(html2) : html2;
            })["catch"](throwError);
          }
          try {
            if (opt.hooks) {
              src = opt.hooks.preprocess(src);
            }
            var _tokens = lexer2(src, opt);
            if (opt.walkTokens) {
              marked.walkTokens(_tokens, opt.walkTokens);
            }
            var html = parser2(_tokens, opt);
            if (opt.hooks) {
              html = opt.hooks.postprocess(html);
            }
            return html;
          } catch (e4) {
            return throwError(e4);
          }
        };
      }
      function marked(src, opt, callback) {
        return parseMarkdown(Lexer.lex, Parser.parse)(src, opt, callback);
      }
      marked.options = marked.setOptions = function(opt) {
        marked.defaults = _extends({}, marked.defaults, opt);
        changeDefaults(marked.defaults);
        return marked;
      };
      marked.getDefaults = getDefaults;
      marked.defaults = exports.defaults;
      marked.use = function() {
        var extensions = marked.defaults.extensions || {
          renderers: {},
          childTokens: {}
        };
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        args.forEach(function(pack) {
          var opts = _extends({}, pack);
          opts.async = marked.defaults.async || opts.async || false;
          if (pack.extensions) {
            pack.extensions.forEach(function(ext) {
              if (!ext.name) {
                throw new Error("extension name required");
              }
              if (ext.renderer) {
                var prevRenderer = extensions.renderers[ext.name];
                if (prevRenderer) {
                  extensions.renderers[ext.name] = function() {
                    for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                      args2[_key2] = arguments[_key2];
                    }
                    var ret = ext.renderer.apply(this, args2);
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
            opts.extensions = extensions;
          }
          if (pack.renderer) {
            (function() {
              var renderer = marked.defaults.renderer || new Renderer();
              var _loop = function _loop2(prop2) {
                var prevRenderer = renderer[prop2];
                renderer[prop2] = function() {
                  for (var _len3 = arguments.length, args2 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args2[_key3] = arguments[_key3];
                  }
                  var ret = pack.renderer[prop2].apply(renderer, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(renderer, args2);
                  }
                  return ret;
                };
              };
              for (var prop in pack.renderer) {
                _loop(prop);
              }
              opts.renderer = renderer;
            })();
          }
          if (pack.tokenizer) {
            (function() {
              var tokenizer = marked.defaults.tokenizer || new Tokenizer();
              var _loop2 = function _loop22(prop2) {
                var prevTokenizer = tokenizer[prop2];
                tokenizer[prop2] = function() {
                  for (var _len4 = arguments.length, args2 = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args2[_key4] = arguments[_key4];
                  }
                  var ret = pack.tokenizer[prop2].apply(tokenizer, args2);
                  if (ret === false) {
                    ret = prevTokenizer.apply(tokenizer, args2);
                  }
                  return ret;
                };
              };
              for (var prop in pack.tokenizer) {
                _loop2(prop);
              }
              opts.tokenizer = tokenizer;
            })();
          }
          if (pack.hooks) {
            (function() {
              var hooks = marked.defaults.hooks || new Hooks();
              var _loop3 = function _loop32(prop2) {
                var prevHook = hooks[prop2];
                if (Hooks.passThroughHooks.has(prop2)) {
                  hooks[prop2] = function(arg) {
                    if (marked.defaults.async) {
                      return Promise.resolve(pack.hooks[prop2].call(hooks, arg)).then(function(ret2) {
                        return prevHook.call(hooks, ret2);
                      });
                    }
                    var ret = pack.hooks[prop2].call(hooks, arg);
                    return prevHook.call(hooks, ret);
                  };
                } else {
                  hooks[prop2] = function() {
                    for (var _len5 = arguments.length, args2 = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                      args2[_key5] = arguments[_key5];
                    }
                    var ret = pack.hooks[prop2].apply(hooks, args2);
                    if (ret === false) {
                      ret = prevHook.apply(hooks, args2);
                    }
                    return ret;
                  };
                }
              };
              for (var prop in pack.hooks) {
                _loop3(prop);
              }
              opts.hooks = hooks;
            })();
          }
          if (pack.walkTokens) {
            var _walkTokens = marked.defaults.walkTokens;
            opts.walkTokens = function(token) {
              var values = [];
              values.push(pack.walkTokens.call(this, token));
              if (_walkTokens) {
                values = values.concat(_walkTokens.call(this, token));
              }
              return values;
            };
          }
          marked.setOptions(opts);
        });
      };
      marked.walkTokens = function(tokens, callback) {
        var values = [];
        var _loop4 = function _loop42() {
          var token = _step.value;
          values = values.concat(callback.call(marked, token));
          switch (token.type) {
            case "table": {
              for (var _iterator2 = _createForOfIteratorHelperLoose(token.header), _step2; !(_step2 = _iterator2()).done; ) {
                var cell = _step2.value;
                values = values.concat(marked.walkTokens(cell.tokens, callback));
              }
              for (var _iterator3 = _createForOfIteratorHelperLoose(token.rows), _step3; !(_step3 = _iterator3()).done; ) {
                var row = _step3.value;
                for (var _iterator4 = _createForOfIteratorHelperLoose(row), _step4; !(_step4 = _iterator4()).done; ) {
                  var _cell = _step4.value;
                  values = values.concat(marked.walkTokens(_cell.tokens, callback));
                }
              }
              break;
            }
            case "list": {
              values = values.concat(marked.walkTokens(token.items, callback));
              break;
            }
            default: {
              if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
                marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
                  values = values.concat(marked.walkTokens(token[childTokens], callback));
                });
              } else if (token.tokens) {
                values = values.concat(marked.walkTokens(token.tokens, callback));
              }
            }
          }
        };
        for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done; ) {
          _loop4();
        }
        return values;
      };
      marked.parseInline = parseMarkdown(Lexer.lexInline, Parser.parseInline);
      marked.Parser = Parser;
      marked.parser = Parser.parse;
      marked.Renderer = Renderer;
      marked.TextRenderer = TextRenderer;
      marked.Lexer = Lexer;
      marked.lexer = Lexer.lex;
      marked.Tokenizer = Tokenizer;
      marked.Slugger = Slugger;
      marked.Hooks = Hooks;
      marked.parse = marked;
      var options = marked.options;
      var setOptions = marked.setOptions;
      var use = marked.use;
      var walkTokens = marked.walkTokens;
      var parseInline = marked.parseInline;
      var parse = marked;
      var parser = Parser.parse;
      var lexer = Lexer.lex;
      exports.Hooks = Hooks;
      exports.Lexer = Lexer;
      exports.Parser = Parser;
      exports.Renderer = Renderer;
      exports.Slugger = Slugger;
      exports.TextRenderer = TextRenderer;
      exports.Tokenizer = Tokenizer;
      exports.getDefaults = getDefaults;
      exports.lexer = lexer;
      exports.marked = marked;
      exports.options = options;
      exports.parse = parse;
      exports.parseInline = parseInline;
      exports.parser = parser;
      exports.setOptions = setOptions;
      exports.use = use;
      exports.walkTokens = walkTokens;
    }
  });

  // node_modules/ansi_up/ansi_up.js
  var require_ansi_up = __commonJS({
    "node_modules/ansi_up/ansi_up.js"(exports) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define(["exports"], factory);
        } else if (typeof exports === "object" && typeof exports.nodeName !== "string") {
          factory(exports);
        } else {
          var exp = {};
          factory(exp);
          root.AnsiUp = exp.default;
        }
      })(exports, function(exports2) {
        "use strict";
        var __makeTemplateObject = this && this.__makeTemplateObject || function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        var PacketKind;
        (function(PacketKind2) {
          PacketKind2[PacketKind2["EOS"] = 0] = "EOS";
          PacketKind2[PacketKind2["Text"] = 1] = "Text";
          PacketKind2[PacketKind2["Incomplete"] = 2] = "Incomplete";
          PacketKind2[PacketKind2["ESC"] = 3] = "ESC";
          PacketKind2[PacketKind2["Unknown"] = 4] = "Unknown";
          PacketKind2[PacketKind2["SGR"] = 5] = "SGR";
          PacketKind2[PacketKind2["OSCURL"] = 6] = "OSCURL";
        })(PacketKind || (PacketKind = {}));
        var AnsiUp = function() {
          function AnsiUp2() {
            this.VERSION = "5.2.1";
            this.setup_palettes();
            this._use_classes = false;
            this.bold = false;
            this.italic = false;
            this.underline = false;
            this.fg = this.bg = null;
            this._buffer = "";
            this._url_whitelist = { "http": 1, "https": 1 };
            this._escape_html = true;
          }
          Object.defineProperty(AnsiUp2.prototype, "use_classes", {
            get: function() {
              return this._use_classes;
            },
            set: function(arg) {
              this._use_classes = arg;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(AnsiUp2.prototype, "url_whitelist", {
            get: function() {
              return this._url_whitelist;
            },
            set: function(arg) {
              this._url_whitelist = arg;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(AnsiUp2.prototype, "escape_html", {
            get: function() {
              return this._escape_html;
            },
            set: function(arg) {
              this._escape_html = arg;
            },
            enumerable: false,
            configurable: true
          });
          AnsiUp2.prototype.setup_palettes = function() {
            var _this = this;
            this.ansi_colors = [
              [
                { rgb: [0, 0, 0], class_name: "ansi-black" },
                { rgb: [187, 0, 0], class_name: "ansi-red" },
                { rgb: [0, 187, 0], class_name: "ansi-green" },
                { rgb: [187, 187, 0], class_name: "ansi-yellow" },
                { rgb: [0, 0, 187], class_name: "ansi-blue" },
                { rgb: [187, 0, 187], class_name: "ansi-magenta" },
                { rgb: [0, 187, 187], class_name: "ansi-cyan" },
                { rgb: [255, 255, 255], class_name: "ansi-white" }
              ],
              [
                { rgb: [85, 85, 85], class_name: "ansi-bright-black" },
                { rgb: [255, 85, 85], class_name: "ansi-bright-red" },
                { rgb: [0, 255, 0], class_name: "ansi-bright-green" },
                { rgb: [255, 255, 85], class_name: "ansi-bright-yellow" },
                { rgb: [85, 85, 255], class_name: "ansi-bright-blue" },
                { rgb: [255, 85, 255], class_name: "ansi-bright-magenta" },
                { rgb: [85, 255, 255], class_name: "ansi-bright-cyan" },
                { rgb: [255, 255, 255], class_name: "ansi-bright-white" }
              ]
            ];
            this.palette_256 = [];
            this.ansi_colors.forEach(function(palette) {
              palette.forEach(function(rec) {
                _this.palette_256.push(rec);
              });
            });
            var levels = [0, 95, 135, 175, 215, 255];
            for (var r4 = 0; r4 < 6; ++r4) {
              for (var g2 = 0; g2 < 6; ++g2) {
                for (var b2 = 0; b2 < 6; ++b2) {
                  var col = { rgb: [levels[r4], levels[g2], levels[b2]], class_name: "truecolor" };
                  this.palette_256.push(col);
                }
              }
            }
            var grey_level = 8;
            for (var i3 = 0; i3 < 24; ++i3, grey_level += 10) {
              var gry = { rgb: [grey_level, grey_level, grey_level], class_name: "truecolor" };
              this.palette_256.push(gry);
            }
          };
          AnsiUp2.prototype.escape_txt_for_html = function(txt) {
            if (!this._escape_html)
              return txt;
            return txt.replace(/[&<>"']/gm, function(str) {
              if (str === "&")
                return "&amp;";
              if (str === "<")
                return "&lt;";
              if (str === ">")
                return "&gt;";
              if (str === '"')
                return "&quot;";
              if (str === "'")
                return "&#x27;";
            });
          };
          AnsiUp2.prototype.append_buffer = function(txt) {
            var str = this._buffer + txt;
            this._buffer = str;
          };
          AnsiUp2.prototype.get_next_packet = function() {
            var pkt = {
              kind: PacketKind.EOS,
              text: "",
              url: ""
            };
            var len = this._buffer.length;
            if (len == 0)
              return pkt;
            var pos = this._buffer.indexOf("");
            if (pos == -1) {
              pkt.kind = PacketKind.Text;
              pkt.text = this._buffer;
              this._buffer = "";
              return pkt;
            }
            if (pos > 0) {
              pkt.kind = PacketKind.Text;
              pkt.text = this._buffer.slice(0, pos);
              this._buffer = this._buffer.slice(pos);
              return pkt;
            }
            if (pos == 0) {
              if (len < 3) {
                pkt.kind = PacketKind.Incomplete;
                return pkt;
              }
              var next_char = this._buffer.charAt(1);
              if (next_char != "[" && next_char != "]" && next_char != "(") {
                pkt.kind = PacketKind.ESC;
                pkt.text = this._buffer.slice(0, 1);
                this._buffer = this._buffer.slice(1);
                return pkt;
              }
              if (next_char == "[") {
                if (!this._csi_regex) {
                  this._csi_regex = rgx(__makeTemplateObject(["\n                        ^                           # beginning of line\n                                                    #\n                                                    # First attempt\n                        (?:                         # legal sequence\n                          [                      # CSI\n                          ([<-?]?)              # private-mode char\n                          ([d;]*)                    # any digits or semicolons\n                          ([ -/]?               # an intermediate modifier\n                          [@-~])                # the command\n                        )\n                        |                           # alternate (second attempt)\n                        (?:                         # illegal sequence\n                          [                      # CSI\n                          [ -~]*                # anything legal\n                          ([\0-:])              # anything illegal\n                        )\n                    "], ["\n                        ^                           # beginning of line\n                                                    #\n                                                    # First attempt\n                        (?:                         # legal sequence\n                          \\x1b\\[                      # CSI\n                          ([\\x3c-\\x3f]?)              # private-mode char\n                          ([\\d;]*)                    # any digits or semicolons\n                          ([\\x20-\\x2f]?               # an intermediate modifier\n                          [\\x40-\\x7e])                # the command\n                        )\n                        |                           # alternate (second attempt)\n                        (?:                         # illegal sequence\n                          \\x1b\\[                      # CSI\n                          [\\x20-\\x7e]*                # anything legal\n                          ([\\x00-\\x1f:])              # anything illegal\n                        )\n                    "]));
                }
                var match = this._buffer.match(this._csi_regex);
                if (match === null) {
                  pkt.kind = PacketKind.Incomplete;
                  return pkt;
                }
                if (match[4]) {
                  pkt.kind = PacketKind.ESC;
                  pkt.text = this._buffer.slice(0, 1);
                  this._buffer = this._buffer.slice(1);
                  return pkt;
                }
                if (match[1] != "" || match[3] != "m")
                  pkt.kind = PacketKind.Unknown;
                else
                  pkt.kind = PacketKind.SGR;
                pkt.text = match[2];
                var rpos = match[0].length;
                this._buffer = this._buffer.slice(rpos);
                return pkt;
              } else if (next_char == "]") {
                if (len < 4) {
                  pkt.kind = PacketKind.Incomplete;
                  return pkt;
                }
                if (this._buffer.charAt(2) != "8" || this._buffer.charAt(3) != ";") {
                  pkt.kind = PacketKind.ESC;
                  pkt.text = this._buffer.slice(0, 1);
                  this._buffer = this._buffer.slice(1);
                  return pkt;
                }
                if (!this._osc_st) {
                  this._osc_st = rgxG(__makeTemplateObject(["\n                        (?:                         # legal sequence\n                          (\\)                    # ESC                           |                           # alternate\n                          (\x07)                      # BEL (what xterm did)\n                        )\n                        |                           # alternate (second attempt)\n                        (                           # illegal sequence\n                          [\0-]                 # anything illegal\n                          |                           # alternate\n                          [\b-]                 # anything illegal\n                          |                           # alternate\n                          [-]                 # anything illegal\n                        )\n                    "], ["\n                        (?:                         # legal sequence\n                          (\\x1b\\\\)                    # ESC \\\n                          |                           # alternate\n                          (\\x07)                      # BEL (what xterm did)\n                        )\n                        |                           # alternate (second attempt)\n                        (                           # illegal sequence\n                          [\\x00-\\x06]                 # anything illegal\n                          |                           # alternate\n                          [\\x08-\\x1a]                 # anything illegal\n                          |                           # alternate\n                          [\\x1c-\\x1f]                 # anything illegal\n                        )\n                    "]));
                }
                this._osc_st.lastIndex = 0;
                {
                  var match_1 = this._osc_st.exec(this._buffer);
                  if (match_1 === null) {
                    pkt.kind = PacketKind.Incomplete;
                    return pkt;
                  }
                  if (match_1[3]) {
                    pkt.kind = PacketKind.ESC;
                    pkt.text = this._buffer.slice(0, 1);
                    this._buffer = this._buffer.slice(1);
                    return pkt;
                  }
                }
                {
                  var match_2 = this._osc_st.exec(this._buffer);
                  if (match_2 === null) {
                    pkt.kind = PacketKind.Incomplete;
                    return pkt;
                  }
                  if (match_2[3]) {
                    pkt.kind = PacketKind.ESC;
                    pkt.text = this._buffer.slice(0, 1);
                    this._buffer = this._buffer.slice(1);
                    return pkt;
                  }
                }
                if (!this._osc_regex) {
                  this._osc_regex = rgx(__makeTemplateObject(["\n                        ^                           # beginning of line\n                                                    #\n                        ]8;                    # OSC Hyperlink\n                        [ -:<-~]*       # params (excluding ;)\n                        ;                           # end of params\n                        ([!-~]{0,512})        # URL capture\n                        (?:                         # ST\n                          (?:\\)                  # ESC                           |                           # alternate\n                          (?:\x07)                    # BEL (what xterm did)\n                        )\n                        ([ -~]+)              # TEXT capture\n                        ]8;;                   # OSC Hyperlink End\n                        (?:                         # ST\n                          (?:\\)                  # ESC                           |                           # alternate\n                          (?:\x07)                    # BEL (what xterm did)\n                        )\n                    "], ["\n                        ^                           # beginning of line\n                                                    #\n                        \\x1b\\]8;                    # OSC Hyperlink\n                        [\\x20-\\x3a\\x3c-\\x7e]*       # params (excluding ;)\n                        ;                           # end of params\n                        ([\\x21-\\x7e]{0,512})        # URL capture\n                        (?:                         # ST\n                          (?:\\x1b\\\\)                  # ESC \\\n                          |                           # alternate\n                          (?:\\x07)                    # BEL (what xterm did)\n                        )\n                        ([\\x20-\\x7e]+)              # TEXT capture\n                        \\x1b\\]8;;                   # OSC Hyperlink End\n                        (?:                         # ST\n                          (?:\\x1b\\\\)                  # ESC \\\n                          |                           # alternate\n                          (?:\\x07)                    # BEL (what xterm did)\n                        )\n                    "]));
                }
                var match = this._buffer.match(this._osc_regex);
                if (match === null) {
                  pkt.kind = PacketKind.ESC;
                  pkt.text = this._buffer.slice(0, 1);
                  this._buffer = this._buffer.slice(1);
                  return pkt;
                }
                pkt.kind = PacketKind.OSCURL;
                pkt.url = match[1];
                pkt.text = match[2];
                var rpos = match[0].length;
                this._buffer = this._buffer.slice(rpos);
                return pkt;
              } else if (next_char == "(") {
                pkt.kind = PacketKind.Unknown;
                this._buffer = this._buffer.slice(3);
                return pkt;
              }
            }
          };
          AnsiUp2.prototype.ansi_to_html = function(txt) {
            this.append_buffer(txt);
            var blocks = [];
            while (true) {
              var packet = this.get_next_packet();
              if (packet.kind == PacketKind.EOS || packet.kind == PacketKind.Incomplete)
                break;
              if (packet.kind == PacketKind.ESC || packet.kind == PacketKind.Unknown)
                continue;
              if (packet.kind == PacketKind.Text)
                blocks.push(this.transform_to_html(this.with_state(packet)));
              else if (packet.kind == PacketKind.SGR)
                this.process_ansi(packet);
              else if (packet.kind == PacketKind.OSCURL)
                blocks.push(this.process_hyperlink(packet));
            }
            return blocks.join("");
          };
          AnsiUp2.prototype.with_state = function(pkt) {
            return { bold: this.bold, italic: this.italic, underline: this.underline, fg: this.fg, bg: this.bg, text: pkt.text };
          };
          AnsiUp2.prototype.process_ansi = function(pkt) {
            var sgr_cmds = pkt.text.split(";");
            while (sgr_cmds.length > 0) {
              var sgr_cmd_str = sgr_cmds.shift();
              var num = parseInt(sgr_cmd_str, 10);
              if (isNaN(num) || num === 0) {
                this.fg = this.bg = null;
                this.bold = false;
                this.italic = false;
                this.underline = false;
              } else if (num === 1) {
                this.bold = true;
              } else if (num === 3) {
                this.italic = true;
              } else if (num === 4) {
                this.underline = true;
              } else if (num === 22) {
                this.bold = false;
              } else if (num === 23) {
                this.italic = false;
              } else if (num === 24) {
                this.underline = false;
              } else if (num === 39) {
                this.fg = null;
              } else if (num === 49) {
                this.bg = null;
              } else if (num >= 30 && num < 38) {
                this.fg = this.ansi_colors[0][num - 30];
              } else if (num >= 40 && num < 48) {
                this.bg = this.ansi_colors[0][num - 40];
              } else if (num >= 90 && num < 98) {
                this.fg = this.ansi_colors[1][num - 90];
              } else if (num >= 100 && num < 108) {
                this.bg = this.ansi_colors[1][num - 100];
              } else if (num === 38 || num === 48) {
                if (sgr_cmds.length > 0) {
                  var is_foreground = num === 38;
                  var mode_cmd = sgr_cmds.shift();
                  if (mode_cmd === "5" && sgr_cmds.length > 0) {
                    var palette_index = parseInt(sgr_cmds.shift(), 10);
                    if (palette_index >= 0 && palette_index <= 255) {
                      if (is_foreground)
                        this.fg = this.palette_256[palette_index];
                      else
                        this.bg = this.palette_256[palette_index];
                    }
                  }
                  if (mode_cmd === "2" && sgr_cmds.length > 2) {
                    var r4 = parseInt(sgr_cmds.shift(), 10);
                    var g2 = parseInt(sgr_cmds.shift(), 10);
                    var b2 = parseInt(sgr_cmds.shift(), 10);
                    if (r4 >= 0 && r4 <= 255 && (g2 >= 0 && g2 <= 255) && (b2 >= 0 && b2 <= 255)) {
                      var c3 = { rgb: [r4, g2, b2], class_name: "truecolor" };
                      if (is_foreground)
                        this.fg = c3;
                      else
                        this.bg = c3;
                    }
                  }
                }
              }
            }
          };
          AnsiUp2.prototype.transform_to_html = function(fragment) {
            var txt = fragment.text;
            if (txt.length === 0)
              return txt;
            txt = this.escape_txt_for_html(txt);
            if (!fragment.bold && !fragment.italic && !fragment.underline && fragment.fg === null && fragment.bg === null)
              return txt;
            var styles = [];
            var classes = [];
            var fg = fragment.fg;
            var bg = fragment.bg;
            if (fragment.bold)
              styles.push("font-weight:bold");
            if (fragment.italic)
              styles.push("font-style:italic");
            if (fragment.underline)
              styles.push("text-decoration:underline");
            if (!this._use_classes) {
              if (fg)
                styles.push("color:rgb(" + fg.rgb.join(",") + ")");
              if (bg)
                styles.push("background-color:rgb(" + bg.rgb + ")");
            } else {
              if (fg) {
                if (fg.class_name !== "truecolor") {
                  classes.push(fg.class_name + "-fg");
                } else {
                  styles.push("color:rgb(" + fg.rgb.join(",") + ")");
                }
              }
              if (bg) {
                if (bg.class_name !== "truecolor") {
                  classes.push(bg.class_name + "-bg");
                } else {
                  styles.push("background-color:rgb(" + bg.rgb.join(",") + ")");
                }
              }
            }
            var class_string = "";
            var style_string = "";
            if (classes.length)
              class_string = ' class="' + classes.join(" ") + '"';
            if (styles.length)
              style_string = ' style="' + styles.join(";") + '"';
            return "<span" + style_string + class_string + ">" + txt + "</span>";
          };
          ;
          AnsiUp2.prototype.process_hyperlink = function(pkt) {
            var parts = pkt.url.split(":");
            if (parts.length < 1)
              return "";
            if (!this._url_whitelist[parts[0]])
              return "";
            var result = '<a href="' + this.escape_txt_for_html(pkt.url) + '">' + this.escape_txt_for_html(pkt.text) + "</a>";
            return result;
          };
          return AnsiUp2;
        }();
        function rgx(tmplObj) {
          var subst = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
          }
          var regexText = tmplObj.raw[0];
          var wsrgx = /^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm;
          var txt2 = regexText.replace(wsrgx, "");
          return new RegExp(txt2);
        }
        function rgxG(tmplObj) {
          var subst = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
          }
          var regexText = tmplObj.raw[0];
          var wsrgx = /^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm;
          var txt2 = regexText.replace(wsrgx, "");
          return new RegExp(txt2, "g");
        }
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.default = AnsiUp;
      });
    }
  });

  // node_modules/dompurify/dist/purify.js
  var require_purify = __commonJS({
    "node_modules/dompurify/dist/purify.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.DOMPurify = factory());
      })(exports, function() {
        "use strict";
        function _typeof(obj) {
          "@babel/helpers - typeof";
          return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
            return typeof obj2;
          } : function(obj2) {
            return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          }, _typeof(obj);
        }
        function _setPrototypeOf(o5, p2) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o6, p3) {
            o6.__proto__ = p3;
            return o6;
          };
          return _setPrototypeOf(o5, p2);
        }
        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct)
            return false;
          if (Reflect.construct.sham)
            return false;
          if (typeof Proxy === "function")
            return true;
          try {
            Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
            return true;
          } catch (e4) {
            return false;
          }
        }
        function _construct(Parent, args, Class) {
          if (_isNativeReflectConstruct()) {
            _construct = Reflect.construct;
          } else {
            _construct = function _construct2(Parent2, args2, Class2) {
              var a3 = [null];
              a3.push.apply(a3, args2);
              var Constructor = Function.bind.apply(Parent2, a3);
              var instance = new Constructor();
              if (Class2)
                _setPrototypeOf(instance, Class2.prototype);
              return instance;
            };
          }
          return _construct.apply(null, arguments);
        }
        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }
        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr))
            return _arrayLikeToArray(arr);
        }
        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
            return Array.from(iter);
        }
        function _unsupportedIterableToArray(o5, minLen) {
          if (!o5)
            return;
          if (typeof o5 === "string")
            return _arrayLikeToArray(o5, minLen);
          var n5 = Object.prototype.toString.call(o5).slice(8, -1);
          if (n5 === "Object" && o5.constructor)
            n5 = o5.constructor.name;
          if (n5 === "Map" || n5 === "Set")
            return Array.from(o5);
          if (n5 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n5))
            return _arrayLikeToArray(o5, minLen);
        }
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length)
            len = arr.length;
          for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++)
            arr2[i3] = arr[i3];
          return arr2;
        }
        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var hasOwnProperty = Object.hasOwnProperty, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var freeze = Object.freeze, seal = Object.seal, create = Object.create;
        var _ref = typeof Reflect !== "undefined" && Reflect, apply = _ref.apply, construct = _ref.construct;
        if (!apply) {
          apply = function apply2(fun, thisValue, args) {
            return fun.apply(thisValue, args);
          };
        }
        if (!freeze) {
          freeze = function freeze2(x2) {
            return x2;
          };
        }
        if (!seal) {
          seal = function seal2(x2) {
            return x2;
          };
        }
        if (!construct) {
          construct = function construct2(Func, args) {
            return _construct(Func, _toConsumableArray(args));
          };
        }
        var arrayForEach = unapply(Array.prototype.forEach);
        var arrayPop = unapply(Array.prototype.pop);
        var arrayPush = unapply(Array.prototype.push);
        var stringToLowerCase = unapply(String.prototype.toLowerCase);
        var stringToString = unapply(String.prototype.toString);
        var stringMatch = unapply(String.prototype.match);
        var stringReplace = unapply(String.prototype.replace);
        var stringIndexOf = unapply(String.prototype.indexOf);
        var stringTrim = unapply(String.prototype.trim);
        var regExpTest = unapply(RegExp.prototype.test);
        var typeErrorCreate = unconstruct(TypeError);
        function unapply(func) {
          return function(thisArg) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            return apply(func, thisArg, args);
          };
        }
        function unconstruct(func) {
          return function() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            return construct(func, args);
          };
        }
        function addToSet(set, array, transformCaseFunc) {
          var _transformCaseFunc;
          transformCaseFunc = (_transformCaseFunc = transformCaseFunc) !== null && _transformCaseFunc !== void 0 ? _transformCaseFunc : stringToLowerCase;
          if (setPrototypeOf) {
            setPrototypeOf(set, null);
          }
          var l4 = array.length;
          while (l4--) {
            var element = array[l4];
            if (typeof element === "string") {
              var lcElement = transformCaseFunc(element);
              if (lcElement !== element) {
                if (!isFrozen(array)) {
                  array[l4] = lcElement;
                }
                element = lcElement;
              }
            }
            set[element] = true;
          }
          return set;
        }
        function clone(object) {
          var newObject = create(null);
          var property;
          for (property in object) {
            if (apply(hasOwnProperty, object, [property]) === true) {
              newObject[property] = object[property];
            }
          }
          return newObject;
        }
        function lookupGetter(object, prop) {
          while (object !== null) {
            var desc = getOwnPropertyDescriptor(object, prop);
            if (desc) {
              if (desc.get) {
                return unapply(desc.get);
              }
              if (typeof desc.value === "function") {
                return unapply(desc.value);
              }
            }
            object = getPrototypeOf(object);
          }
          function fallbackValue(element) {
            console.warn("fallback value for", element);
            return null;
          }
          return fallbackValue;
        }
        var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
        var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
        var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
        var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
        var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]);
        var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
        var text = freeze(["#text"]);
        var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]);
        var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
        var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
        var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
        var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
        var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
        var TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
        var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
        var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
        var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
        var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
        var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
        var DOCTYPE_NAME = seal(/^html$/i);
        var getGlobal = function getGlobal2() {
          return typeof window === "undefined" ? null : window;
        };
        var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, document2) {
          if (_typeof(trustedTypes) !== "object" || typeof trustedTypes.createPolicy !== "function") {
            return null;
          }
          var suffix = null;
          var ATTR_NAME = "data-tt-policy-suffix";
          if (document2.currentScript && document2.currentScript.hasAttribute(ATTR_NAME)) {
            suffix = document2.currentScript.getAttribute(ATTR_NAME);
          }
          var policyName = "dompurify" + (suffix ? "#" + suffix : "");
          try {
            return trustedTypes.createPolicy(policyName, {
              createHTML: function createHTML(html2) {
                return html2;
              },
              createScriptURL: function createScriptURL(scriptUrl) {
                return scriptUrl;
              }
            });
          } catch (_2) {
            console.warn("TrustedTypes policy " + policyName + " could not be created.");
            return null;
          }
        };
        function createDOMPurify() {
          var window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
          var DOMPurify = function DOMPurify2(root) {
            return createDOMPurify(root);
          };
          DOMPurify.version = "2.4.7";
          DOMPurify.removed = [];
          if (!window2 || !window2.document || window2.document.nodeType !== 9) {
            DOMPurify.isSupported = false;
            return DOMPurify;
          }
          var originalDocument = window2.document;
          var document2 = window2.document;
          var DocumentFragment = window2.DocumentFragment, HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element = window2.Element, NodeFilter = window2.NodeFilter, _window$NamedNodeMap = window2.NamedNodeMap, NamedNodeMap = _window$NamedNodeMap === void 0 ? window2.NamedNodeMap || window2.MozNamedAttrMap : _window$NamedNodeMap, HTMLFormElement = window2.HTMLFormElement, DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
          var ElementPrototype = Element.prototype;
          var cloneNode = lookupGetter(ElementPrototype, "cloneNode");
          var getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
          var getChildNodes = lookupGetter(ElementPrototype, "childNodes");
          var getParentNode = lookupGetter(ElementPrototype, "parentNode");
          if (typeof HTMLTemplateElement === "function") {
            var template = document2.createElement("template");
            if (template.content && template.content.ownerDocument) {
              document2 = template.content.ownerDocument;
            }
          }
          var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
          var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML("") : "";
          var _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
          var importNode = originalDocument.importNode;
          var documentMode = {};
          try {
            documentMode = clone(document2).documentMode ? document2.documentMode : {};
          } catch (_2) {
          }
          var hooks = {};
          DOMPurify.isSupported = typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0 && documentMode !== 9;
          var MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
          var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
          var ALLOWED_TAGS = null;
          var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
          var ALLOWED_ATTR = null;
          var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
          var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
            tagNameCheck: {
              writable: true,
              configurable: false,
              enumerable: true,
              value: null
            },
            attributeNameCheck: {
              writable: true,
              configurable: false,
              enumerable: true,
              value: null
            },
            allowCustomizedBuiltInElements: {
              writable: true,
              configurable: false,
              enumerable: true,
              value: false
            }
          }));
          var FORBID_TAGS = null;
          var FORBID_ATTR = null;
          var ALLOW_ARIA_ATTR = true;
          var ALLOW_DATA_ATTR = true;
          var ALLOW_UNKNOWN_PROTOCOLS = false;
          var ALLOW_SELF_CLOSE_IN_ATTR = true;
          var SAFE_FOR_TEMPLATES = false;
          var WHOLE_DOCUMENT = false;
          var SET_CONFIG = false;
          var FORCE_BODY = false;
          var RETURN_DOM = false;
          var RETURN_DOM_FRAGMENT = false;
          var RETURN_TRUSTED_TYPE = false;
          var SANITIZE_DOM = true;
          var SANITIZE_NAMED_PROPS = false;
          var SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
          var KEEP_CONTENT = true;
          var IN_PLACE = false;
          var USE_PROFILES = {};
          var FORBID_CONTENTS = null;
          var DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
          var DATA_URI_TAGS = null;
          var DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
          var URI_SAFE_ATTRIBUTES = null;
          var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
          var MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
          var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
          var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
          var NAMESPACE = HTML_NAMESPACE;
          var IS_EMPTY_INPUT = false;
          var ALLOWED_NAMESPACES = null;
          var DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
          var PARSER_MEDIA_TYPE;
          var SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
          var DEFAULT_PARSER_MEDIA_TYPE = "text/html";
          var transformCaseFunc;
          var CONFIG = null;
          var formElement = document2.createElement("form");
          var isRegexOrFunction = function isRegexOrFunction2(testValue) {
            return testValue instanceof RegExp || testValue instanceof Function;
          };
          var _parseConfig = function _parseConfig2(cfg) {
            if (CONFIG && CONFIG === cfg) {
              return;
            }
            if (!cfg || _typeof(cfg) !== "object") {
              cfg = {};
            }
            cfg = clone(cfg);
            PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
            transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
            ALLOWED_TAGS = "ALLOWED_TAGS" in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
            ALLOWED_ATTR = "ALLOWED_ATTR" in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
            ALLOWED_NAMESPACES = "ALLOWED_NAMESPACES" in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
            URI_SAFE_ATTRIBUTES = "ADD_URI_SAFE_ATTR" in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
            DATA_URI_TAGS = "ADD_DATA_URI_TAGS" in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
            FORBID_CONTENTS = "FORBID_CONTENTS" in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
            FORBID_TAGS = "FORBID_TAGS" in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
            FORBID_ATTR = "FORBID_ATTR" in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
            USE_PROFILES = "USE_PROFILES" in cfg ? cfg.USE_PROFILES : false;
            ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
            ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
            ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
            ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
            SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
            WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
            RETURN_DOM = cfg.RETURN_DOM || false;
            RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
            RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
            FORCE_BODY = cfg.FORCE_BODY || false;
            SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
            SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
            KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
            IN_PLACE = cfg.IN_PLACE || false;
            IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
            NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
            CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
            if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
              CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
            }
            if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
              CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
            }
            if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
              CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
            }
            if (SAFE_FOR_TEMPLATES) {
              ALLOW_DATA_ATTR = false;
            }
            if (RETURN_DOM_FRAGMENT) {
              RETURN_DOM = true;
            }
            if (USE_PROFILES) {
              ALLOWED_TAGS = addToSet({}, _toConsumableArray(text));
              ALLOWED_ATTR = [];
              if (USE_PROFILES.html === true) {
                addToSet(ALLOWED_TAGS, html$1);
                addToSet(ALLOWED_ATTR, html);
              }
              if (USE_PROFILES.svg === true) {
                addToSet(ALLOWED_TAGS, svg$1);
                addToSet(ALLOWED_ATTR, svg);
                addToSet(ALLOWED_ATTR, xml);
              }
              if (USE_PROFILES.svgFilters === true) {
                addToSet(ALLOWED_TAGS, svgFilters);
                addToSet(ALLOWED_ATTR, svg);
                addToSet(ALLOWED_ATTR, xml);
              }
              if (USE_PROFILES.mathMl === true) {
                addToSet(ALLOWED_TAGS, mathMl$1);
                addToSet(ALLOWED_ATTR, mathMl);
                addToSet(ALLOWED_ATTR, xml);
              }
            }
            if (cfg.ADD_TAGS) {
              if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
                ALLOWED_TAGS = clone(ALLOWED_TAGS);
              }
              addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
            }
            if (cfg.ADD_ATTR) {
              if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
                ALLOWED_ATTR = clone(ALLOWED_ATTR);
              }
              addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
            }
            if (cfg.ADD_URI_SAFE_ATTR) {
              addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
            }
            if (cfg.FORBID_CONTENTS) {
              if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
                FORBID_CONTENTS = clone(FORBID_CONTENTS);
              }
              addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
            }
            if (KEEP_CONTENT) {
              ALLOWED_TAGS["#text"] = true;
            }
            if (WHOLE_DOCUMENT) {
              addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
            }
            if (ALLOWED_TAGS.table) {
              addToSet(ALLOWED_TAGS, ["tbody"]);
              delete FORBID_TAGS.tbody;
            }
            if (freeze) {
              freeze(cfg);
            }
            CONFIG = cfg;
          };
          var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
          var HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "desc", "title", "annotation-xml"]);
          var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
          var ALL_SVG_TAGS = addToSet({}, svg$1);
          addToSet(ALL_SVG_TAGS, svgFilters);
          addToSet(ALL_SVG_TAGS, svgDisallowed);
          var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
          addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
          var _checkValidNamespace = function _checkValidNamespace2(element) {
            var parent = getParentNode(element);
            if (!parent || !parent.tagName) {
              parent = {
                namespaceURI: NAMESPACE,
                tagName: "template"
              };
            }
            var tagName = stringToLowerCase(element.tagName);
            var parentTagName = stringToLowerCase(parent.tagName);
            if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
              return false;
            }
            if (element.namespaceURI === SVG_NAMESPACE) {
              if (parent.namespaceURI === HTML_NAMESPACE) {
                return tagName === "svg";
              }
              if (parent.namespaceURI === MATHML_NAMESPACE) {
                return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
              }
              return Boolean(ALL_SVG_TAGS[tagName]);
            }
            if (element.namespaceURI === MATHML_NAMESPACE) {
              if (parent.namespaceURI === HTML_NAMESPACE) {
                return tagName === "math";
              }
              if (parent.namespaceURI === SVG_NAMESPACE) {
                return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
              }
              return Boolean(ALL_MATHML_TAGS[tagName]);
            }
            if (element.namespaceURI === HTML_NAMESPACE) {
              if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
                return false;
              }
              if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
                return false;
              }
              return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
            }
            if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
              return true;
            }
            return false;
          };
          var _forceRemove = function _forceRemove2(node) {
            arrayPush(DOMPurify.removed, {
              element: node
            });
            try {
              node.parentNode.removeChild(node);
            } catch (_2) {
              try {
                node.outerHTML = emptyHTML;
              } catch (_3) {
                node.remove();
              }
            }
          };
          var _removeAttribute = function _removeAttribute2(name, node) {
            try {
              arrayPush(DOMPurify.removed, {
                attribute: node.getAttributeNode(name),
                from: node
              });
            } catch (_2) {
              arrayPush(DOMPurify.removed, {
                attribute: null,
                from: node
              });
            }
            node.removeAttribute(name);
            if (name === "is" && !ALLOWED_ATTR[name]) {
              if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
                try {
                  _forceRemove(node);
                } catch (_2) {
                }
              } else {
                try {
                  node.setAttribute(name, "");
                } catch (_2) {
                }
              }
            }
          };
          var _initDocument = function _initDocument2(dirty) {
            var doc;
            var leadingWhitespace;
            if (FORCE_BODY) {
              dirty = "<remove></remove>" + dirty;
            } else {
              var matches = stringMatch(dirty, /^[\r\n\t ]+/);
              leadingWhitespace = matches && matches[0];
            }
            if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
              dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
            }
            var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
            if (NAMESPACE === HTML_NAMESPACE) {
              try {
                doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
              } catch (_2) {
              }
            }
            if (!doc || !doc.documentElement) {
              doc = implementation.createDocument(NAMESPACE, "template", null);
              try {
                doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
              } catch (_2) {
              }
            }
            var body = doc.body || doc.documentElement;
            if (dirty && leadingWhitespace) {
              body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
            }
            if (NAMESPACE === HTML_NAMESPACE) {
              return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
            }
            return WHOLE_DOCUMENT ? doc.documentElement : body;
          };
          var _createIterator = function _createIterator2(root) {
            return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
          };
          var _isClobbered = function _isClobbered2(elm) {
            return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
          };
          var _isNode = function _isNode2(object) {
            return _typeof(Node) === "object" ? object instanceof Node : object && _typeof(object) === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
          };
          var _executeHook = function _executeHook2(entryPoint, currentNode, data) {
            if (!hooks[entryPoint]) {
              return;
            }
            arrayForEach(hooks[entryPoint], function(hook) {
              hook.call(DOMPurify, currentNode, data, CONFIG);
            });
          };
          var _sanitizeElements = function _sanitizeElements2(currentNode) {
            var content;
            _executeHook("beforeSanitizeElements", currentNode, null);
            if (_isClobbered(currentNode)) {
              _forceRemove(currentNode);
              return true;
            }
            if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
              _forceRemove(currentNode);
              return true;
            }
            var tagName = transformCaseFunc(currentNode.nodeName);
            _executeHook("uponSanitizeElement", currentNode, {
              tagName,
              allowedTags: ALLOWED_TAGS
            });
            if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
              _forceRemove(currentNode);
              return true;
            }
            if (tagName === "select" && regExpTest(/<template/i, currentNode.innerHTML)) {
              _forceRemove(currentNode);
              return true;
            }
            if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
              if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
                if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName))
                  return false;
                if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName))
                  return false;
              }
              if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
                var parentNode = getParentNode(currentNode) || currentNode.parentNode;
                var childNodes = getChildNodes(currentNode) || currentNode.childNodes;
                if (childNodes && parentNode) {
                  var childCount = childNodes.length;
                  for (var i3 = childCount - 1; i3 >= 0; --i3) {
                    parentNode.insertBefore(cloneNode(childNodes[i3], true), getNextSibling(currentNode));
                  }
                }
              }
              _forceRemove(currentNode);
              return true;
            }
            if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
              _forceRemove(currentNode);
              return true;
            }
            if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
              _forceRemove(currentNode);
              return true;
            }
            if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
              content = currentNode.textContent;
              content = stringReplace(content, MUSTACHE_EXPR$1, " ");
              content = stringReplace(content, ERB_EXPR$1, " ");
              content = stringReplace(content, TMPLIT_EXPR$1, " ");
              if (currentNode.textContent !== content) {
                arrayPush(DOMPurify.removed, {
                  element: currentNode.cloneNode()
                });
                currentNode.textContent = content;
              }
            }
            _executeHook("afterSanitizeElements", currentNode, null);
            return false;
          };
          var _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
            if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
              return false;
            }
            if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName))
              ;
            else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName))
              ;
            else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
              if (_basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)))
                ;
              else {
                return false;
              }
            } else if (URI_SAFE_ATTRIBUTES[lcName])
              ;
            else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
              ;
            else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
              ;
            else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
              ;
            else if (value) {
              return false;
            } else
              ;
            return true;
          };
          var _basicCustomElementTest = function _basicCustomElementTest2(tagName) {
            return tagName.indexOf("-") > 0;
          };
          var _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
            var attr;
            var value;
            var lcName;
            var l4;
            _executeHook("beforeSanitizeAttributes", currentNode, null);
            var attributes = currentNode.attributes;
            if (!attributes) {
              return;
            }
            var hookEvent = {
              attrName: "",
              attrValue: "",
              keepAttr: true,
              allowedAttributes: ALLOWED_ATTR
            };
            l4 = attributes.length;
            while (l4--) {
              attr = attributes[l4];
              var _attr = attr, name = _attr.name, namespaceURI = _attr.namespaceURI;
              value = name === "value" ? attr.value : stringTrim(attr.value);
              lcName = transformCaseFunc(name);
              hookEvent.attrName = lcName;
              hookEvent.attrValue = value;
              hookEvent.keepAttr = true;
              hookEvent.forceKeepAttr = void 0;
              _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
              value = hookEvent.attrValue;
              if (hookEvent.forceKeepAttr) {
                continue;
              }
              _removeAttribute(name, currentNode);
              if (!hookEvent.keepAttr) {
                continue;
              }
              if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
                _removeAttribute(name, currentNode);
                continue;
              }
              if (SAFE_FOR_TEMPLATES) {
                value = stringReplace(value, MUSTACHE_EXPR$1, " ");
                value = stringReplace(value, ERB_EXPR$1, " ");
                value = stringReplace(value, TMPLIT_EXPR$1, " ");
              }
              var lcTag = transformCaseFunc(currentNode.nodeName);
              if (!_isValidAttribute(lcTag, lcName, value)) {
                continue;
              }
              if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
                _removeAttribute(name, currentNode);
                value = SANITIZE_NAMED_PROPS_PREFIX + value;
              }
              if (trustedTypesPolicy && _typeof(trustedTypes) === "object" && typeof trustedTypes.getAttributeType === "function") {
                if (namespaceURI)
                  ;
                else {
                  switch (trustedTypes.getAttributeType(lcTag, lcName)) {
                    case "TrustedHTML": {
                      value = trustedTypesPolicy.createHTML(value);
                      break;
                    }
                    case "TrustedScriptURL": {
                      value = trustedTypesPolicy.createScriptURL(value);
                      break;
                    }
                  }
                }
              }
              try {
                if (namespaceURI) {
                  currentNode.setAttributeNS(namespaceURI, name, value);
                } else {
                  currentNode.setAttribute(name, value);
                }
                arrayPop(DOMPurify.removed);
              } catch (_2) {
              }
            }
            _executeHook("afterSanitizeAttributes", currentNode, null);
          };
          var _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
            var shadowNode;
            var shadowIterator = _createIterator(fragment);
            _executeHook("beforeSanitizeShadowDOM", fragment, null);
            while (shadowNode = shadowIterator.nextNode()) {
              _executeHook("uponSanitizeShadowNode", shadowNode, null);
              if (_sanitizeElements(shadowNode)) {
                continue;
              }
              if (shadowNode.content instanceof DocumentFragment) {
                _sanitizeShadowDOM2(shadowNode.content);
              }
              _sanitizeAttributes(shadowNode);
            }
            _executeHook("afterSanitizeShadowDOM", fragment, null);
          };
          DOMPurify.sanitize = function(dirty) {
            var cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var body;
            var importedNode;
            var currentNode;
            var oldNode;
            var returnNode;
            IS_EMPTY_INPUT = !dirty;
            if (IS_EMPTY_INPUT) {
              dirty = "<!-->";
            }
            if (typeof dirty !== "string" && !_isNode(dirty)) {
              if (typeof dirty.toString === "function") {
                dirty = dirty.toString();
                if (typeof dirty !== "string") {
                  throw typeErrorCreate("dirty is not a string, aborting");
                }
              } else {
                throw typeErrorCreate("toString is not a function");
              }
            }
            if (!DOMPurify.isSupported) {
              if (_typeof(window2.toStaticHTML) === "object" || typeof window2.toStaticHTML === "function") {
                if (typeof dirty === "string") {
                  return window2.toStaticHTML(dirty);
                }
                if (_isNode(dirty)) {
                  return window2.toStaticHTML(dirty.outerHTML);
                }
              }
              return dirty;
            }
            if (!SET_CONFIG) {
              _parseConfig(cfg);
            }
            DOMPurify.removed = [];
            if (typeof dirty === "string") {
              IN_PLACE = false;
            }
            if (IN_PLACE) {
              if (dirty.nodeName) {
                var tagName = transformCaseFunc(dirty.nodeName);
                if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                  throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
                }
              }
            } else if (dirty instanceof Node) {
              body = _initDocument("<!---->");
              importedNode = body.ownerDocument.importNode(dirty, true);
              if (importedNode.nodeType === 1 && importedNode.nodeName === "BODY") {
                body = importedNode;
              } else if (importedNode.nodeName === "HTML") {
                body = importedNode;
              } else {
                body.appendChild(importedNode);
              }
            } else {
              if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) {
                return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
              }
              body = _initDocument(dirty);
              if (!body) {
                return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
              }
            }
            if (body && FORCE_BODY) {
              _forceRemove(body.firstChild);
            }
            var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
            while (currentNode = nodeIterator.nextNode()) {
              if (currentNode.nodeType === 3 && currentNode === oldNode) {
                continue;
              }
              if (_sanitizeElements(currentNode)) {
                continue;
              }
              if (currentNode.content instanceof DocumentFragment) {
                _sanitizeShadowDOM(currentNode.content);
              }
              _sanitizeAttributes(currentNode);
              oldNode = currentNode;
            }
            oldNode = null;
            if (IN_PLACE) {
              return dirty;
            }
            if (RETURN_DOM) {
              if (RETURN_DOM_FRAGMENT) {
                returnNode = createDocumentFragment.call(body.ownerDocument);
                while (body.firstChild) {
                  returnNode.appendChild(body.firstChild);
                }
              } else {
                returnNode = body;
              }
              if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmod) {
                returnNode = importNode.call(originalDocument, returnNode, true);
              }
              return returnNode;
            }
            var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
            if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
              serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
            }
            if (SAFE_FOR_TEMPLATES) {
              serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, " ");
              serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, " ");
              serializedHTML = stringReplace(serializedHTML, TMPLIT_EXPR$1, " ");
            }
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
          };
          DOMPurify.setConfig = function(cfg) {
            _parseConfig(cfg);
            SET_CONFIG = true;
          };
          DOMPurify.clearConfig = function() {
            CONFIG = null;
            SET_CONFIG = false;
          };
          DOMPurify.isValidAttribute = function(tag, attr, value) {
            if (!CONFIG) {
              _parseConfig({});
            }
            var lcTag = transformCaseFunc(tag);
            var lcName = transformCaseFunc(attr);
            return _isValidAttribute(lcTag, lcName, value);
          };
          DOMPurify.addHook = function(entryPoint, hookFunction) {
            if (typeof hookFunction !== "function") {
              return;
            }
            hooks[entryPoint] = hooks[entryPoint] || [];
            arrayPush(hooks[entryPoint], hookFunction);
          };
          DOMPurify.removeHook = function(entryPoint) {
            if (hooks[entryPoint]) {
              return arrayPop(hooks[entryPoint]);
            }
          };
          DOMPurify.removeHooks = function(entryPoint) {
            if (hooks[entryPoint]) {
              hooks[entryPoint] = [];
            }
          };
          DOMPurify.removeAllHooks = function() {
            hooks = {};
          };
          return DOMPurify;
        }
        var purify = createDOMPurify();
        return purify;
      });
    }
  });

  // libs/notebook.js
  var require_notebook = __commonJS({
    "libs/notebook.js"(exports) {
      (function() {
        var VERSION = "0.6.7";
        var root = window;
        var isBrowser = true;
        var doc;
        if (isBrowser) {
          doc = root.document;
        }
        var ident = function(x2) {
          return x2;
        };
        var makeElement = function(tag, classNames) {
          var el = doc.createElement(tag);
          el.className = (classNames || []).map(function(cn) {
            return nb2.prefix + cn;
          }).join(" ");
          return el;
        };
        var escapeHTML = function(raw) {
          var replaced = raw.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return replaced;
        };
        var joinText = function(text) {
          if (text.join) {
            return text.map(joinText).join("");
          } else {
            return text;
          }
        };
        var getMarkdown = function() {
          console.log(root, typeof __require === "function");
          return root.marked || typeof __require === "function" && require_marked();
        };
        var getAnsi = function() {
          var lib = root.ansi_up || typeof __require === "function" && require_ansi_up();
          return lib && lib.ansi_to_html;
        };
        var getSanitizer = function() {
          var lib = root.DOMPurify || typeof __require === "function" && require_purify();
          if (isBrowser) {
            return lib && lib.sanitize;
          } else {
            return lib(dom.window).sanitize;
          }
        };
        var nb2 = {
          prefix: "nb-",
          markdown: getMarkdown() || ident,
          ansi: getAnsi() || ident,
          sanitizer: getSanitizer() || ident,
          highlighter: ident,
          VERSION
        };
        nb2.Input = function(raw, cell) {
          this.raw = raw;
          this.cell = cell;
        };
        nb2.Input.prototype.render = function() {
          if (!this.raw.length) {
            return makeElement("div");
          }
          var holder = makeElement("div", ["input"]);
          var cell = this.cell;
          if (typeof cell.number === "number") {
            holder.setAttribute("data-prompt-number", this.cell.number);
          }
          var pre_el = makeElement("pre");
          var code_el = makeElement("code");
          var notebook = cell.worksheet.notebook;
          var m2 = notebook.metadata;
          var lang = this.cell.raw.language || m2.language || m2.kernelspec && m2.kernelspec.language || m2.language_info && m2.language_info.name;
          code_el.setAttribute("data-language", lang);
          code_el.className = "lang-" + lang;
          code_el.innerHTML = nb2.highlighter(escapeHTML(joinText(this.raw)), pre_el, code_el, lang);
          pre_el.appendChild(code_el);
          holder.appendChild(pre_el);
          this.el = holder;
          return holder;
        };
        var imageCreator = function(format) {
          return function(data) {
            var el = makeElement("img", ["image-output"]);
            el.src = "data:image/" + format + ";base64," + joinText(data).replace(/\n/g, "");
            return el;
          };
        };
        nb2.display = {};
        nb2.display.text = function(text) {
          var el = makeElement("pre", ["text-output"]);
          el.innerHTML = nb2.highlighter(nb2.ansi(joinText(text)), el);
          return el;
        };
        nb2.display["text/plain"] = nb2.display.text;
        nb2.display.html = function(html) {
          var el = makeElement("div", ["html-output"]);
          el.innerHTML = nb2.sanitizer(joinText(html));
          return el;
        };
        nb2.display["text/html"] = nb2.display.html;
        nb2.display.marked = function(md) {
          return nb2.display.html(nb2.markdown(joinText(md)));
        };
        nb2.display["text/markdown"] = nb2.display.marked;
        nb2.display.svg = function(svg) {
          var el = makeElement("div", ["svg-output"]);
          el.innerHTML = joinText(svg);
          return el;
        };
        nb2.display["text/svg+xml"] = nb2.display.svg;
        nb2.display["image/svg+xml"] = nb2.display.svg;
        nb2.display.latex = function(latex) {
          var el = makeElement("div", ["latex-output"]);
          el.innerHTML = joinText(latex);
          return el;
        };
        nb2.display["text/latex"] = nb2.display.latex;
        nb2.display.javascript = function(js) {
          var el = makeElement("script");
          el.innerHTML = joinText(js);
          return el;
        };
        nb2.display["application/javascript"] = nb2.display.javascript;
        nb2.display.png = imageCreator("png");
        nb2.display["image/png"] = nb2.display.png;
        nb2.display.jpeg = imageCreator("jpeg");
        nb2.display["image/jpeg"] = nb2.display.jpeg;
        nb2.display_priority = [
          "png",
          "image/png",
          "jpeg",
          "image/jpeg",
          "svg",
          "image/svg+xml",
          "text/svg+xml",
          "html",
          "text/html",
          "text/markdown",
          "latex",
          "text/latex",
          "javascript",
          "application/javascript",
          "text",
          "text/plain"
        ];
        var render_display_data = function() {
          var o5 = this;
          var formats = nb2.display_priority.filter(function(d3) {
            return o5.raw.data ? o5.raw.data[d3] : o5.raw[d3];
          });
          var format = formats[0];
          if (format) {
            if (nb2.display[format]) {
              return nb2.display[format](o5.raw[format] || o5.raw.data[format]);
            }
          }
          return makeElement("div", ["empty-output"]);
        };
        var render_error = function() {
          var el = makeElement("pre", ["pyerr"]);
          var raw = this.raw.traceback.join("\n");
          el.innerHTML = nb2.highlighter(nb2.ansi(escapeHTML(raw)), el);
          return el;
        };
        nb2.Output = function(raw, cell) {
          this.raw = raw;
          this.cell = cell;
          this.type = raw.output_type;
        };
        nb2.Output.prototype.renderers = {
          "display_data": render_display_data,
          "execute_result": render_display_data,
          "pyout": render_display_data,
          "pyerr": render_error,
          "error": render_error,
          "stream": function() {
            var el = makeElement("pre", [this.raw.stream || this.raw.name]);
            var raw = joinText(this.raw.text);
            el.innerHTML = nb2.highlighter(nb2.ansi(escapeHTML(raw)), el);
            return el;
          }
        };
        nb2.Output.prototype.render = function() {
          var outer = makeElement("div", ["output"]);
          if (typeof this.cell.number === "number") {
            outer.setAttribute("data-prompt-number", this.cell.number);
          }
          var inner = this.renderers[this.type].call(this);
          outer.appendChild(inner);
          this.el = outer;
          return outer;
        };
        nb2.coalesceStreams = function(outputs) {
          if (!outputs.length) {
            return outputs;
          }
          var last = outputs[0];
          var new_outputs = [last];
          outputs.slice(1).forEach(function(o5) {
            if (o5.raw.output_type === "stream" && last.raw.output_type === "stream" && o5.raw.stream === last.raw.stream && o5.raw.name === last.raw.name) {
              last.raw.text = last.raw.text.concat(o5.raw.text);
            } else {
              new_outputs.push(o5);
              last = o5;
            }
          });
          return new_outputs;
        };
        nb2.Cell = function(raw, worksheet) {
          var cell = this;
          cell.raw = raw;
          cell.worksheet = worksheet;
          cell.type = raw.cell_type;
          if (cell.type === "code") {
            cell.number = raw.prompt_number > -1 ? raw.prompt_number : raw.execution_count;
            var source = raw.input || [raw.source];
            cell.input = new nb2.Input(source, cell);
            var raw_outputs = (cell.raw.outputs || []).map(function(o5) {
              return new nb2.Output(o5, cell);
            });
            cell.outputs = nb2.coalesceStreams(raw_outputs);
          }
        };
        var math_delimiters = [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false }
        ];
        nb2.Cell.prototype.renderers = {
          markdown: function() {
            var el = makeElement("div", ["cell", "markdown-cell"]);
            var joined = joinText(this.raw.source);
            if (root.renderMathInElement != null) {
              el.innerHTML = nb2.sanitizer(joined);
              root.renderMathInElement(el, { delimiters: math_delimiters });
              el.innerHTML = nb2.sanitizer(nb2.markdown(el.innerHTML.replace(/&gt;/g, ">")));
            } else {
              el.innerHTML = nb2.sanitizer(nb2.markdown(joined));
            }
            return el;
          },
          heading: function() {
            var el = makeElement("h" + this.raw.level, ["cell", "heading-cell"]);
            el.innerHTML = nb2.sanitizer(joinText(this.raw.source));
            return el;
          },
          raw: function() {
            var el = makeElement("div", ["cell", "raw-cell"]);
            el.innerHTML = escapeHTML(joinText(this.raw.source));
            return el;
          },
          code: function() {
            var cell_el = makeElement("div", ["cell", "code-cell"]);
            cell_el.appendChild(this.input.render());
            var output_els = this.outputs.forEach(function(o5) {
              cell_el.appendChild(o5.render());
            });
            return cell_el;
          }
        };
        nb2.Cell.prototype.render = function() {
          var el = this.renderers[this.type].call(this);
          this.el = el;
          return el;
        };
        nb2.Worksheet = function(raw, notebook) {
          var worksheet = this;
          this.raw = raw;
          this.notebook = notebook;
          this.cells = raw.cells.map(function(c3) {
            return new nb2.Cell(c3, worksheet);
          });
          this.render = function() {
            var worksheet_el = makeElement("div", ["worksheet"]);
            worksheet.cells.forEach(function(c3) {
              worksheet_el.appendChild(c3.render());
            });
            this.el = worksheet_el;
            return worksheet_el;
          };
        };
        nb2.Notebook = function(raw, config) {
          var notebook = this;
          this.raw = raw;
          this.config = config;
          var meta = this.metadata = raw.metadata || {};
          this.title = meta.title || meta.name;
          var _worksheets = raw.worksheets || [{ cells: raw.cells }];
          this.worksheets = _worksheets.map(function(ws) {
            return new nb2.Worksheet(ws, notebook);
          });
          this.sheet = this.worksheets[0];
        };
        nb2.Notebook.prototype.render = function() {
          var notebook_el = makeElement("div", ["notebook"]);
          this.worksheets.forEach(function(w2) {
            notebook_el.appendChild(w2.render());
          });
          this.el = notebook_el;
          return notebook_el;
        };
        nb2.parse = function(nbjson, config) {
          return new nb2.Notebook(nbjson, config);
        };
        window.nb = nb2;
      }).call(exports);
    }
  });

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (t.ShadyCSS === void 0 || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = new WeakMap();
  var o = class {
    constructor(t3, e4, n5) {
      if (this._$cssResult$ = true, n5 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e4;
    }
    get styleSheet() {
      let t3 = this.o;
      const s5 = this.t;
      if (e && t3 === void 0) {
        const e4 = s5 !== void 0 && s5.length === 1;
        e4 && (t3 = n.get(s5)), t3 === void 0 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n.set(s5, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new o(typeof t3 == "string" ? t3 : t3 + "", void 0, s);
  var S = (s5, n5) => {
    e ? s5.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((e4) => {
      const n6 = document.createElement("style"), o5 = t.litNonce;
      o5 !== void 0 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s5.appendChild(n6);
    });
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e4 = "";
    for (const s5 of t4.cssRules)
      e4 += s5.cssText;
    return r(e4);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t3, i3) {
    switch (i3) {
      case Boolean:
        t3 = t3 ? h : null;
        break;
      case Object:
      case Array:
        t3 = t3 == null ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, i3) {
    let s5 = t3;
    switch (i3) {
      case Boolean:
        s5 = t3 !== null;
        break;
      case Number:
        s5 = t3 === null ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t3);
        } catch (t4) {
          s5 = null;
        }
    }
    return s5;
  } };
  var a = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = "finalized";
  var u = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t3) {
      var i3;
      this.finalize(), ((i3 = this.h) !== null && i3 !== void 0 ? i3 : this.h = []).push(t3);
    }
    static get observedAttributes() {
      this.finalize();
      const t3 = [];
      return this.elementProperties.forEach((i3, s5) => {
        const e4 = this._$Ep(s5, i3);
        e4 !== void 0 && (this._$Ev.set(e4, s5), t3.push(e4));
      }), t3;
    }
    static createProperty(t3, i3 = l) {
      if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
        const s5 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
        e4 !== void 0 && Object.defineProperty(this.prototype, t3, e4);
      }
    }
    static getPropertyDescriptor(t3, i3, s5) {
      return { get() {
        return this[i3];
      }, set(e4) {
        const r4 = this[t3];
        this[i3] = e4, this.requestUpdate(t3, r4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) || l;
    }
    static finalize() {
      if (this.hasOwnProperty(d))
        return false;
      this[d] = true;
      const t3 = Object.getPrototypeOf(this);
      if (t3.finalize(), t3.h !== void 0 && (this.h = [...t3.h]), this.elementProperties = new Map(t3.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
        const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
        for (const s5 of i3)
          this.createProperty(s5, t4[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i3) {
      const s5 = [];
      if (Array.isArray(i3)) {
        const e4 = new Set(i3.flat(1 / 0).reverse());
        for (const i4 of e4)
          s5.unshift(c(i4));
      } else
        i3 !== void 0 && s5.push(c(i3));
      return s5;
    }
    static _$Ep(t3, i3) {
      const s5 = i3.attribute;
      return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
    }
    u() {
      var t3;
      this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), (t3 = this.constructor.h) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
    }
    addController(t3) {
      var i3, s5;
      ((i3 = this._$ES) !== null && i3 !== void 0 ? i3 : this._$ES = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s5 = t3.hostConnected) === null || s5 === void 0 || s5.call(t3));
    }
    removeController(t3) {
      var i3;
      (i3 = this._$ES) === null || i3 === void 0 || i3.splice(this._$ES.indexOf(t3) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t3, i3) => {
        this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
      });
    }
    createRenderRoot() {
      var t3;
      const s5 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t3;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$ES) === null || t3 === void 0 || t3.forEach((t4) => {
        var i3;
        return (i3 = t4.hostConnected) === null || i3 === void 0 ? void 0 : i3.call(t4);
      });
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var t3;
      (t3 = this._$ES) === null || t3 === void 0 || t3.forEach((t4) => {
        var i3;
        return (i3 = t4.hostDisconnected) === null || i3 === void 0 ? void 0 : i3.call(t4);
      });
    }
    attributeChangedCallback(t3, i3, s5) {
      this._$AK(t3, s5);
    }
    _$EO(t3, i3, s5 = l) {
      var e4;
      const r4 = this.constructor._$Ep(t3, s5);
      if (r4 !== void 0 && s5.reflect === true) {
        const h3 = (((e4 = s5.converter) === null || e4 === void 0 ? void 0 : e4.toAttribute) !== void 0 ? s5.converter : n2).toAttribute(i3, s5.type);
        this._$El = t3, h3 == null ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
      }
    }
    _$AK(t3, i3) {
      var s5;
      const e4 = this.constructor, r4 = e4._$Ev.get(t3);
      if (r4 !== void 0 && this._$El !== r4) {
        const t4 = e4.getPropertyOptions(r4), h3 = typeof t4.converter == "function" ? { fromAttribute: t4.converter } : ((s5 = t4.converter) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== void 0 ? t4.converter : n2;
        this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
      }
    }
    requestUpdate(t3, i3, s5) {
      let e4 = true;
      t3 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), s5.reflect === true && this._$El !== t3 && (this._$EC === void 0 && (this._$EC = new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return t3 != null && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t3;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i4) => this[i4] = t4), this._$Ei = void 0);
      let i3 = false;
      const s5 = this._$AL;
      try {
        i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), (t3 = this._$ES) === null || t3 === void 0 || t3.forEach((t4) => {
          var i4;
          return (i4 = t4.hostUpdate) === null || i4 === void 0 ? void 0 : i4.call(t4);
        }), this.update(s5)) : this._$Ek();
      } catch (t4) {
        throw i3 = false, this._$Ek(), t4;
      }
      i3 && this._$AE(s5);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      var i3;
      (i3 = this._$ES) === null || i3 === void 0 || i3.forEach((t4) => {
        var i4;
        return (i4 = t4.hostUpdated) === null || i4 === void 0 ? void 0 : i4.call(t4);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$Ek() {
      this._$AL = new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      this._$EC !== void 0 && (this._$EC.forEach((t4, i3) => this._$EO(i3, this[i3], t4)), this._$EC = void 0), this._$Ek();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  u[d] = true, u.elementProperties = new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, o2 == null || o2({ ReactiveElement: u }), ((s2 = e2.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : e2.reactiveElementVersions = []).push("1.6.2");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var o3 = "$lit$";
  var n3 = `lit$${(Math.random() + "").slice(9)}$`;
  var l2 = "?" + n3;
  var h2 = `<${l2}>`;
  var r3 = document;
  var d2 = () => r3.createComment("");
  var u2 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
  var c2 = Array.isArray;
  var v = (t3) => c2(t3) || typeof (t3 == null ? void 0 : t3[Symbol.iterator]) == "function";
  var a2 = "[ 	\n\f\r]";
  var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y = /^(?:script|style|textarea|title)$/i;
  var w = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
  var x = w(1);
  var b = w(2);
  var T = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var E = new WeakMap();
  var C = r3.createTreeWalker(r3, 129, null, false);
  var P = (t3, i3) => {
    const s5 = t3.length - 1, l4 = [];
    let r4, d3 = i3 === 2 ? "<svg>" : "", u3 = f;
    for (let i4 = 0; i4 < s5; i4++) {
      const s6 = t3[i4];
      let e4, c4, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u3.lastIndex = a3, c4 = u3.exec(s6), c4 !== null); )
        a3 = u3.lastIndex, u3 === f ? c4[1] === "!--" ? u3 = _ : c4[1] !== void 0 ? u3 = m : c4[2] !== void 0 ? (y.test(c4[2]) && (r4 = RegExp("</" + c4[2], "g")), u3 = p) : c4[3] !== void 0 && (u3 = p) : u3 === p ? c4[0] === ">" ? (u3 = r4 != null ? r4 : f, v2 = -1) : c4[1] === void 0 ? v2 = -2 : (v2 = u3.lastIndex - c4[2].length, e4 = c4[1], u3 = c4[3] === void 0 ? p : c4[3] === '"' ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, r4 = void 0);
      const w2 = u3 === p && t3[i4 + 1].startsWith("/>") ? " " : "";
      d3 += u3 === f ? s6 + h2 : v2 >= 0 ? (l4.push(e4), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (v2 === -2 ? (l4.push(void 0), i4) : w2);
    }
    const c3 = d3 + (t3[s5] || "<?>") + (i3 === 2 ? "</svg>" : "");
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [e3 !== void 0 ? e3.createHTML(c3) : c3, l4];
  };
  var V = class {
    constructor({ strings: t3, _$litType$: i3 }, e4) {
      let h3;
      this.parts = [];
      let r4 = 0, u3 = 0;
      const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = P(t3, i3);
      if (this.el = V.createElement(a3, e4), C.currentNode = this.el.content, i3 === 2) {
        const t4 = this.el.content, i4 = t4.firstChild;
        i4.remove(), t4.append(...i4.childNodes);
      }
      for (; (h3 = C.nextNode()) !== null && v2.length < c3; ) {
        if (h3.nodeType === 1) {
          if (h3.hasAttributes()) {
            const t4 = [];
            for (const i4 of h3.getAttributeNames())
              if (i4.endsWith(o3) || i4.startsWith(n3)) {
                const s5 = f2[u3++];
                if (t4.push(i4), s5 !== void 0) {
                  const t5 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i5 = /([.?@])?(.*)/.exec(s5);
                  v2.push({ type: 1, index: r4, name: i5[2], strings: t5, ctor: i5[1] === "." ? k : i5[1] === "?" ? I : i5[1] === "@" ? L : R });
                } else
                  v2.push({ type: 6, index: r4 });
              }
            for (const i4 of t4)
              h3.removeAttribute(i4);
          }
          if (y.test(h3.tagName)) {
            const t4 = h3.textContent.split(n3), i4 = t4.length - 1;
            if (i4 > 0) {
              h3.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i4; s5++)
                h3.append(t4[s5], d2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
              h3.append(t4[i4], d2());
            }
          }
        } else if (h3.nodeType === 8)
          if (h3.data === l2)
            v2.push({ type: 2, index: r4 });
          else {
            let t4 = -1;
            for (; (t4 = h3.data.indexOf(n3, t4 + 1)) !== -1; )
              v2.push({ type: 7, index: r4 }), t4 += n3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t3, i3) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t3, s5;
    }
  };
  function N(t3, i3, s5 = t3, e4) {
    var o5, n5, l4, h3;
    if (i3 === T)
      return i3;
    let r4 = e4 !== void 0 ? (o5 = s5._$Co) === null || o5 === void 0 ? void 0 : o5[e4] : s5._$Cl;
    const d3 = u2(i3) ? void 0 : i3._$litDirective$;
    return (r4 == null ? void 0 : r4.constructor) !== d3 && ((n5 = r4 == null ? void 0 : r4._$AO) === null || n5 === void 0 || n5.call(r4, false), d3 === void 0 ? r4 = void 0 : (r4 = new d3(t3), r4._$AT(t3, s5, e4)), e4 !== void 0 ? ((l4 = (h3 = s5)._$Co) !== null && l4 !== void 0 ? l4 : h3._$Co = [])[e4] = r4 : s5._$Cl = r4), r4 !== void 0 && (i3 = N(t3, r4._$AS(t3, i3.values), r4, e4)), i3;
  }
  var S2 = class {
    constructor(t3, i3) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      var i3;
      const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = ((i3 = t3 == null ? void 0 : t3.creationScope) !== null && i3 !== void 0 ? i3 : r3).importNode(s5, true);
      C.currentNode = o5;
      let n5 = C.nextNode(), l4 = 0, h3 = 0, d3 = e4[0];
      for (; d3 !== void 0; ) {
        if (l4 === d3.index) {
          let i4;
          d3.type === 2 ? i4 = new M(n5, n5.nextSibling, this, t3) : d3.type === 1 ? i4 = new d3.ctor(n5, d3.name, d3.strings, this, t3) : d3.type === 6 && (i4 = new z(n5, this, t3)), this._$AV.push(i4), d3 = e4[++h3];
        }
        l4 !== (d3 == null ? void 0 : d3.index) && (n5 = C.nextNode(), l4++);
      }
      return C.currentNode = r3, o5;
    }
    v(t3) {
      let i3 = 0;
      for (const s5 of this._$AV)
        s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
    }
  };
  var M = class {
    constructor(t3, i3, s5, e4) {
      var o5;
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cp = (o5 = e4 == null ? void 0 : e4.isConnected) === null || o5 === void 0 || o5;
    }
    get _$AU() {
      var t3, i3;
      return (i3 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i3 !== void 0 ? i3 : this._$Cp;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i3 = this._$AM;
      return i3 !== void 0 && (t3 == null ? void 0 : t3.nodeType) === 11 && (t3 = i3.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i3 = this) {
      t3 = N(this, t3, i3), u2(t3) ? t3 === A || t3 == null || t3 === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : t3._$litType$ !== void 0 ? this.g(t3) : t3.nodeType !== void 0 ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
    }
    k(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    $(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
    }
    _(t3) {
      this._$AH !== A && u2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
    }
    g(t3) {
      var i3;
      const { values: s5, _$litType$: e4 } = t3, o5 = typeof e4 == "number" ? this._$AC(t3) : (e4.el === void 0 && (e4.el = V.createElement(e4.h, this.options)), e4);
      if (((i3 = this._$AH) === null || i3 === void 0 ? void 0 : i3._$AD) === o5)
        this._$AH.v(s5);
      else {
        const t4 = new S2(o5, this), i4 = t4.u(this.options);
        t4.v(s5), this.$(i4), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i3 = E.get(t3.strings);
      return i3 === void 0 && E.set(t3.strings, i3 = new V(t3)), i3;
    }
    T(t3) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i3 = this._$AH;
      let s5, e4 = 0;
      for (const o5 of t3)
        e4 === i3.length ? i3.push(s5 = new M(this.k(d2()), this.k(d2()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
      e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
    }
    _$AR(t3 = this._$AA.nextSibling, i3) {
      var s5;
      for ((s5 = this._$AP) === null || s5 === void 0 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
        const i4 = t3.nextSibling;
        t3.remove(), t3 = i4;
      }
    }
    setConnected(t3) {
      var i3;
      this._$AM === void 0 && (this._$Cp = t3, (i3 = this._$AP) === null || i3 === void 0 || i3.call(this, t3));
    }
  };
  var R = class {
    constructor(t3, i3, s5, e4, o5) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3, i3 = this, s5, e4) {
      const o5 = this.strings;
      let n5 = false;
      if (o5 === void 0)
        t3 = N(this, t3, i3, 0), n5 = !u2(t3) || t3 !== this._$AH && t3 !== T, n5 && (this._$AH = t3);
      else {
        const e5 = t3;
        let l4, h3;
        for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
          h3 = N(this, e5[s5 + l4], i3, l4), h3 === T && (h3 = this._$AH[l4]), n5 || (n5 = !u2(h3) || h3 !== this._$AH[l4]), h3 === A ? t3 = A : t3 !== A && (t3 += (h3 != null ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
      }
      n5 && !e4 && this.j(t3);
    }
    j(t3) {
      t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === A ? void 0 : t3;
    }
  };
  var H = s3 ? s3.emptyScript : "";
  var I = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      t3 && t3 !== A ? this.element.setAttribute(this.name, H) : this.element.removeAttribute(this.name);
    }
  };
  var L = class extends R {
    constructor(t3, i3, s5, e4, o5) {
      super(t3, i3, s5, e4, o5), this.type = 5;
    }
    _$AI(t3, i3 = this) {
      var s5;
      if ((t3 = (s5 = N(this, t3, i3, 0)) !== null && s5 !== void 0 ? s5 : A) === T)
        return;
      const e4 = this._$AH, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== A && (e4 === A || o5);
      o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var i3, s5;
      typeof this._$AH == "function" ? this._$AH.call((s5 = (i3 = this.options) === null || i3 === void 0 ? void 0 : i3.host) !== null && s5 !== void 0 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var z = class {
    constructor(t3, i3, s5) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      N(this, t3);
    }
  };
  var j = i2.litHtmlPolyfillSupport;
  j == null || j(V, M), ((t2 = i2.litHtmlVersions) !== null && t2 !== void 0 ? t2 : i2.litHtmlVersions = []).push("2.7.4");
  var B = (t3, i3, s5) => {
    var e4, o5;
    const n5 = (e4 = s5 == null ? void 0 : s5.renderBefore) !== null && e4 !== void 0 ? e4 : i3;
    let l4 = n5._$litPart$;
    if (l4 === void 0) {
      const t4 = (o5 = s5 == null ? void 0 : s5.renderBefore) !== null && o5 !== void 0 ? o5 : null;
      n5._$litPart$ = l4 = new M(i3.insertBefore(d2(), t4), t4, void 0, s5 != null ? s5 : {});
    }
    return l4._$AI(t3), l4;
  };

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends u {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t3, e4;
      const i3 = super.createRenderRoot();
      return (t3 = (e4 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e4.renderBefore = i3.firstChild), i3;
    }
    update(t3) {
      const i3 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = B(i3, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t3;
      super.connectedCallback(), (t3 = this._$Do) === null || t3 === void 0 || t3.setConnected(true);
    }
    disconnectedCallback() {
      var t3;
      super.disconnectedCallback(), (t3 = this._$Do) === null || t3 === void 0 || t3.setConnected(false);
    }
    render() {
      return T;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  n4 == null || n4({ LitElement: s4 });
  ((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.3.2");

  // colab-renderer.js
  var import_notebook = __toModule(require_notebook());
  var ColabRenderer = class extends s4 {
    constructor() {
      super();
    }
    render() {
      return "";
    }
    runWithInputs(input) {
      let { notebookCode } = input;
      const ipynb = JSON.parse(notebookCode);
      const notebook = nb.parse(ipynb);
      const outerHTML = notebook.render().outerHTML;
      this.dispatchEvent(new CustomEvent("outputs", { detail: { html: outerHTML } }));
    }
  };
  customElements.define("colab-renderer", ColabRenderer);
  window.visualblocks.registerNodeSpec({
    "id": "colab-renderer",
    "runnerId": "colab-renderer",
    "name": "Colab Renderer",
    "description": "Renders Jupyter Notebooks",
    "category": "model",
    "propertySpecs": [],
    "inputSpecs": [
      {
        "name": "notebookCode",
        "type": "string"
      }
    ],
    "outputSpecs": [
      {
        "name": "html",
        "type": "string"
      }
    ]
  });
})();
/*! @license DOMPurify 2.4.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.7/LICENSE */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
