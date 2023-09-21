(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all2) => {
    __markAsModule(target);
    for (var name in all2)
      __defProp(target, name, { get: all2[name], enumerable: true });
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

  // node_modules/decamelize/index.js
  var require_decamelize = __commonJS({
    "node_modules/decamelize/index.js"(exports, module) {
      "use strict";
      module.exports = function(str, sep) {
        if (typeof str !== "string") {
          throw new TypeError("Expected a string");
        }
        sep = typeof sep === "undefined" ? "_" : sep;
        return str.replace(/([a-z\d])([A-Z])/g, "$1" + sep + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + sep + "$2").toLowerCase();
      };
    }
  });

  // node_modules/camelcase/index.js
  var require_camelcase = __commonJS({
    "node_modules/camelcase/index.js"(exports, module) {
      "use strict";
      var UPPERCASE = /[\p{Lu}]/u;
      var LOWERCASE = /[\p{Ll}]/u;
      var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
      var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
      var SEPARATORS = /[_.\- ]+/;
      var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
      var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
      var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
      var preserveCamelCase = (string, toLowerCase, toUpperCase) => {
        let isLastCharLower = false;
        let isLastCharUpper = false;
        let isLastLastCharUpper = false;
        for (let i3 = 0; i3 < string.length; i3++) {
          const character = string[i3];
          if (isLastCharLower && UPPERCASE.test(character)) {
            string = string.slice(0, i3) + "-" + string.slice(i3);
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i3++;
          } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
            string = string.slice(0, i3 - 1) + "-" + string.slice(i3 - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
          } else {
            isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
          }
        }
        return string;
      };
      var preserveConsecutiveUppercase = (input, toLowerCase) => {
        LEADING_CAPITAL.lastIndex = 0;
        return input.replace(LEADING_CAPITAL, (m1) => toLowerCase(m1));
      };
      var postProcess = (input, toUpperCase) => {
        SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
        NUMBERS_AND_IDENTIFIER.lastIndex = 0;
        return input.replace(SEPARATORS_AND_IDENTIFIER, (_2, identifier) => toUpperCase(identifier)).replace(NUMBERS_AND_IDENTIFIER, (m2) => toUpperCase(m2));
      };
      var camelCase2 = (input, options) => {
        if (!(typeof input === "string" || Array.isArray(input))) {
          throw new TypeError("Expected the input to be `string | string[]`");
        }
        options = {
          pascalCase: false,
          preserveConsecutiveUppercase: false,
          ...options
        };
        if (Array.isArray(input)) {
          input = input.map((x2) => x2.trim()).filter((x2) => x2.length).join("-");
        } else {
          input = input.trim();
        }
        if (input.length === 0) {
          return "";
        }
        const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
        const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
        if (input.length === 1) {
          return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
        }
        const hasUpperCase = input !== toLowerCase(input);
        if (hasUpperCase) {
          input = preserveCamelCase(input, toLowerCase, toUpperCase);
        }
        input = input.replace(LEADING_SEPARATORS, "");
        if (options.preserveConsecutiveUppercase) {
          input = preserveConsecutiveUppercase(input, toLowerCase);
        } else {
          input = toLowerCase(input);
        }
        if (options.pascalCase) {
          input = toUpperCase(input.charAt(0)) + input.slice(1);
        }
        return postProcess(input, toUpperCase);
      };
      module.exports = camelCase2;
      module.exports.default = camelCase2;
    }
  });

  // node_modules/langchain/dist/load/map_keys.js
  function keyToJson(key, map) {
    return map?.[key] || (0, import_decamelize.default)(key);
  }
  function mapKeys(fields, mapper, map) {
    const mapped = {};
    for (const key in fields) {
      if (Object.hasOwn(fields, key)) {
        mapped[mapper(key, map)] = fields[key];
      }
    }
    return mapped;
  }
  var import_decamelize, import_camelcase;
  var init_map_keys = __esm({
    "node_modules/langchain/dist/load/map_keys.js"() {
      import_decamelize = __toModule(require_decamelize());
      import_camelcase = __toModule(require_camelcase());
    }
  });

  // node_modules/langchain/dist/load/serializable.js
  function shallowCopy(obj) {
    return Array.isArray(obj) ? [...obj] : { ...obj };
  }
  function replaceSecrets(root, secretsMap) {
    const result = shallowCopy(root);
    for (const [path, secretId] of Object.entries(secretsMap)) {
      const [last, ...partsReverse] = path.split(".").reverse();
      let current = result;
      for (const part of partsReverse.reverse()) {
        if (current[part] === void 0) {
          break;
        }
        current[part] = shallowCopy(current[part]);
        current = current[part];
      }
      if (current[last] !== void 0) {
        current[last] = {
          lc: 1,
          type: "secret",
          id: [secretId]
        };
      }
    }
    return result;
  }
  var Serializable;
  var init_serializable = __esm({
    "node_modules/langchain/dist/load/serializable.js"() {
      init_map_keys();
      Serializable = class {
        get lc_secrets() {
          return void 0;
        }
        get lc_attributes() {
          return void 0;
        }
        get lc_aliases() {
          return void 0;
        }
        constructor(kwargs, ..._args) {
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "lc_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.lc_kwargs = kwargs || {};
        }
        toJSON() {
          if (!this.lc_serializable) {
            return this.toJSONNotImplemented();
          }
          if (this.lc_kwargs instanceof Serializable || typeof this.lc_kwargs !== "object" || Array.isArray(this.lc_kwargs)) {
            return this.toJSONNotImplemented();
          }
          const aliases = {};
          const secrets = {};
          const kwargs = Object.keys(this.lc_kwargs).reduce((acc, key) => {
            acc[key] = key in this ? this[key] : this.lc_kwargs[key];
            return acc;
          }, {});
          for (let current = Object.getPrototypeOf(this); current; current = Object.getPrototypeOf(current)) {
            Object.assign(aliases, Reflect.get(current, "lc_aliases", this));
            Object.assign(secrets, Reflect.get(current, "lc_secrets", this));
            Object.assign(kwargs, Reflect.get(current, "lc_attributes", this));
          }
          for (const key in secrets) {
            if (key in this && this[key] !== void 0) {
              kwargs[key] = this[key] || kwargs[key];
            }
          }
          return {
            lc: 1,
            type: "constructor",
            id: [...this.lc_namespace, this.constructor.name],
            kwargs: mapKeys(Object.keys(secrets).length ? replaceSecrets(kwargs, secrets) : kwargs, keyToJson, aliases)
          };
        }
        toJSONNotImplemented() {
          return {
            lc: 1,
            type: "not_implemented",
            id: [...this.lc_namespace, this.constructor.name]
          };
        }
      };
    }
  });

  // node_modules/langchain/dist/schema/index.js
  var RUN_KEY, BaseMessage, HumanMessage, AIMessage, SystemMessage, FunctionMessage, ChatMessage, BasePromptValue, BaseListChatMessageHistory;
  var init_schema = __esm({
    "node_modules/langchain/dist/schema/index.js"() {
      init_serializable();
      RUN_KEY = "__run";
      BaseMessage = class extends Serializable {
        get text() {
          return this.content;
        }
        constructor(fields, kwargs) {
          if (typeof fields === "string") {
            fields = { content: fields, additional_kwargs: kwargs };
          }
          if (!fields.additional_kwargs) {
            fields.additional_kwargs = {};
          }
          super(fields);
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema"]
          });
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
          Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "additional_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.name = fields.name;
          this.content = fields.content;
          this.additional_kwargs = fields.additional_kwargs;
        }
        toDict() {
          return {
            type: this._getType(),
            data: this.toJSON().kwargs
          };
        }
      };
      HumanMessage = class extends BaseMessage {
        _getType() {
          return "human";
        }
      };
      AIMessage = class extends BaseMessage {
        _getType() {
          return "ai";
        }
      };
      SystemMessage = class extends BaseMessage {
        _getType() {
          return "system";
        }
      };
      FunctionMessage = class extends BaseMessage {
        constructor(fields, name) {
          if (typeof fields === "string") {
            fields = { content: fields, name };
          }
          super(fields);
        }
        _getType() {
          return "function";
        }
      };
      ChatMessage = class extends BaseMessage {
        constructor(fields, role) {
          if (typeof fields === "string") {
            fields = { content: fields, role };
          }
          super(fields);
          Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.role = fields.role;
        }
        _getType() {
          return "generic";
        }
      };
      BasePromptValue = class extends Serializable {
      };
      BaseListChatMessageHistory = class extends Serializable {
        addUserMessage(message) {
          return this.addMessage(new HumanMessage(message));
        }
        addAIChatMessage(message) {
          return this.addMessage(new AIMessage(message));
        }
      };
    }
  });

  // node_modules/uuid/dist/esm-browser/rng.js
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  var getRandomValues, rnds8;
  var init_rng = __esm({
    "node_modules/uuid/dist/esm-browser/rng.js"() {
      rnds8 = new Uint8Array(16);
    }
  });

  // node_modules/uuid/dist/esm-browser/stringify.js
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }
  var byteToHex;
  var init_stringify = __esm({
    "node_modules/uuid/dist/esm-browser/stringify.js"() {
      byteToHex = [];
      for (let i3 = 0; i3 < 256; ++i3) {
        byteToHex.push((i3 + 256).toString(16).slice(1));
      }
    }
  });

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID, native_default;
  var init_native = __esm({
    "node_modules/uuid/dist/esm-browser/native.js"() {
      randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
      native_default = {
        randomUUID
      };
    }
  });

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i3 = 0; i3 < 16; ++i3) {
        buf[offset + i3] = rnds[i3];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default;
  var init_v4 = __esm({
    "node_modules/uuid/dist/esm-browser/v4.js"() {
      init_native();
      init_rng();
      init_stringify();
      v4_default = v4;
    }
  });

  // node_modules/uuid/dist/esm-browser/index.js
  var init_esm_browser = __esm({
    "node_modules/uuid/dist/esm-browser/index.js"() {
      init_v4();
    }
  });

  // node_modules/langchain/dist/callbacks/base.js
  var BaseCallbackHandlerMethodsClass, BaseCallbackHandler;
  var init_base = __esm({
    "node_modules/langchain/dist/callbacks/base.js"() {
      init_esm_browser();
      init_serializable();
      BaseCallbackHandlerMethodsClass = class {
      };
      BaseCallbackHandler = class extends BaseCallbackHandlerMethodsClass {
        get lc_namespace() {
          return ["langchain", "callbacks", this.name];
        }
        get lc_secrets() {
          return void 0;
        }
        get lc_attributes() {
          return void 0;
        }
        get lc_aliases() {
          return void 0;
        }
        constructor(input) {
          super();
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "lc_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "ignoreLLM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "ignoreChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "ignoreAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "ignoreRetriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "awaitHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: typeof process !== "undefined" ? process.env?.LANGCHAIN_CALLBACKS_BACKGROUND !== "true" : true
          });
          this.lc_kwargs = input || {};
          if (input) {
            this.ignoreLLM = input.ignoreLLM ?? this.ignoreLLM;
            this.ignoreChain = input.ignoreChain ?? this.ignoreChain;
            this.ignoreAgent = input.ignoreAgent ?? this.ignoreAgent;
            this.ignoreRetriever = input.ignoreRetriever ?? this.ignoreRetriever;
          }
        }
        copy() {
          return new this.constructor(this);
        }
        toJSON() {
          return Serializable.prototype.toJSON.call(this);
        }
        toJSONNotImplemented() {
          return Serializable.prototype.toJSONNotImplemented.call(this);
        }
        static fromMethods(methods) {
          class Handler extends BaseCallbackHandler {
            constructor() {
              super();
              Object.defineProperty(this, "name", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: v4_default()
              });
              Object.assign(this, methods);
            }
          }
          return new Handler();
        }
      };
    }
  });

  // node_modules/langchain/node_modules/ansi-styles/index.js
  var require_ansi_styles = __commonJS({
    "node_modules/langchain/node_modules/ansi-styles/index.js"(exports, module) {
      "use strict";
      var ANSI_BACKGROUND_OFFSET = 10;
      var wrapAnsi256 = (offset = 0) => (code) => `[${38 + offset};5;${code}m`;
      var wrapAnsi16m = (offset = 0) => (red, green, blue) => `[${38 + offset};2;${red};${green};${blue}m`;
      function assembleStyles() {
        const codes = new Map();
        const styles2 = {
          modifier: {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            overline: [53, 55],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29]
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39]
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49]
          }
        };
        styles2.color.gray = styles2.color.blackBright;
        styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
        styles2.color.grey = styles2.color.blackBright;
        styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
        for (const [groupName, group] of Object.entries(styles2)) {
          for (const [styleName, style] of Object.entries(group)) {
            styles2[styleName] = {
              open: `[${style[0]}m`,
              close: `[${style[1]}m`
            };
            group[styleName] = styles2[styleName];
            codes.set(style[0], style[1]);
          }
          Object.defineProperty(styles2, groupName, {
            value: group,
            enumerable: false
          });
        }
        Object.defineProperty(styles2, "codes", {
          value: codes,
          enumerable: false
        });
        styles2.color.close = "[39m";
        styles2.bgColor.close = "[49m";
        styles2.color.ansi256 = wrapAnsi256();
        styles2.color.ansi16m = wrapAnsi16m();
        styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
        styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
        Object.defineProperties(styles2, {
          rgbToAnsi256: {
            value: (red, green, blue) => {
              if (red === green && green === blue) {
                if (red < 8) {
                  return 16;
                }
                if (red > 248) {
                  return 231;
                }
                return Math.round((red - 8) / 247 * 24) + 232;
              }
              return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
            },
            enumerable: false
          },
          hexToRgb: {
            value: (hex) => {
              const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
              if (!matches) {
                return [0, 0, 0];
              }
              let { colorString } = matches.groups;
              if (colorString.length === 3) {
                colorString = colorString.split("").map((character) => character + character).join("");
              }
              const integer = Number.parseInt(colorString, 16);
              return [
                integer >> 16 & 255,
                integer >> 8 & 255,
                integer & 255
              ];
            },
            enumerable: false
          },
          hexToAnsi256: {
            value: (hex) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex)),
            enumerable: false
          }
        });
        return styles2;
      }
      Object.defineProperty(module, "exports", {
        enumerable: true,
        get: assembleStyles
      });
    }
  });

  // node_modules/langchain/dist/callbacks/handlers/tracer.js
  var BaseTracer;
  var init_tracer = __esm({
    "node_modules/langchain/dist/callbacks/handlers/tracer.js"() {
      init_base();
      BaseTracer = class extends BaseCallbackHandler {
        constructor(_fields) {
          super(...arguments);
          Object.defineProperty(this, "runMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
          });
        }
        copy() {
          return this;
        }
        _addChildRun(parentRun, childRun) {
          parentRun.child_runs.push(childRun);
        }
        _startTrace(run) {
          if (run.parent_run_id !== void 0) {
            const parentRun = this.runMap.get(run.parent_run_id);
            if (parentRun) {
              this._addChildRun(parentRun, run);
            }
          }
          this.runMap.set(run.id, run);
        }
        async _endTrace(run) {
          const parentRun = run.parent_run_id !== void 0 && this.runMap.get(run.parent_run_id);
          if (parentRun) {
            parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
          } else {
            await this.persistRun(run);
          }
          this.runMap.delete(run.id);
        }
        _getExecutionOrder(parentRunId) {
          const parentRun = parentRunId !== void 0 && this.runMap.get(parentRunId);
          if (!parentRun) {
            return 1;
          }
          return parentRun.child_execution_order + 1;
        }
        async handleLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata) {
          const execution_order = this._getExecutionOrder(parentRunId);
          const start_time = Date.now();
          const finalExtraParams = metadata ? { ...extraParams, metadata } : extraParams;
          const run = {
            id: runId,
            name: llm.id[llm.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: llm,
            events: [
              {
                name: "start",
                time: start_time
              }
            ],
            inputs: { prompts },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: finalExtraParams ?? {},
            tags: tags || []
          };
          this._startTrace(run);
          await this.onLLMStart?.(run);
        }
        async handleChatModelStart(llm, messages2, runId, parentRunId, extraParams, tags, metadata) {
          const execution_order = this._getExecutionOrder(parentRunId);
          const start_time = Date.now();
          const finalExtraParams = metadata ? { ...extraParams, metadata } : extraParams;
          const run = {
            id: runId,
            name: llm.id[llm.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: llm,
            events: [
              {
                name: "start",
                time: start_time
              }
            ],
            inputs: { messages: messages2 },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: finalExtraParams ?? {},
            tags: tags || []
          };
          this._startTrace(run);
          await this.onLLMStart?.(run);
        }
        async handleLLMEnd(output, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "llm") {
            throw new Error("No LLM run to end.");
          }
          run.end_time = Date.now();
          run.outputs = output;
          run.events.push({
            name: "end",
            time: run.end_time
          });
          await this.onLLMEnd?.(run);
          await this._endTrace(run);
        }
        async handleLLMError(error, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "llm") {
            throw new Error("No LLM run to end.");
          }
          run.end_time = Date.now();
          run.error = error.message;
          run.events.push({
            name: "error",
            time: run.end_time
          });
          await this.onLLMError?.(run);
          await this._endTrace(run);
        }
        async handleChainStart(chain, inputs, runId, parentRunId, tags, metadata) {
          const execution_order = this._getExecutionOrder(parentRunId);
          const start_time = Date.now();
          const run = {
            id: runId,
            name: chain.id[chain.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: chain,
            events: [
              {
                name: "start",
                time: start_time
              }
            ],
            inputs,
            execution_order,
            child_execution_order: execution_order,
            run_type: "chain",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || []
          };
          this._startTrace(run);
          await this.onChainStart?.(run);
        }
        async handleChainEnd(outputs, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "chain") {
            throw new Error("No chain run to end.");
          }
          run.end_time = Date.now();
          run.outputs = outputs;
          run.events.push({
            name: "end",
            time: run.end_time
          });
          await this.onChainEnd?.(run);
          await this._endTrace(run);
        }
        async handleChainError(error, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "chain") {
            throw new Error("No chain run to end.");
          }
          run.end_time = Date.now();
          run.error = error.message;
          run.events.push({
            name: "error",
            time: run.end_time
          });
          await this.onChainError?.(run);
          await this._endTrace(run);
        }
        async handleToolStart(tool, input, runId, parentRunId, tags, metadata) {
          const execution_order = this._getExecutionOrder(parentRunId);
          const start_time = Date.now();
          const run = {
            id: runId,
            name: tool.id[tool.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: tool,
            events: [
              {
                name: "start",
                time: start_time
              }
            ],
            inputs: { input },
            execution_order,
            child_execution_order: execution_order,
            run_type: "tool",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || []
          };
          this._startTrace(run);
          await this.onToolStart?.(run);
        }
        async handleToolEnd(output, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "tool") {
            throw new Error("No tool run to end");
          }
          run.end_time = Date.now();
          run.outputs = { output };
          run.events.push({
            name: "end",
            time: run.end_time
          });
          await this.onToolEnd?.(run);
          await this._endTrace(run);
        }
        async handleToolError(error, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "tool") {
            throw new Error("No tool run to end");
          }
          run.end_time = Date.now();
          run.error = error.message;
          run.events.push({
            name: "error",
            time: run.end_time
          });
          await this.onToolError?.(run);
          await this._endTrace(run);
        }
        async handleAgentAction(action, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "chain") {
            return;
          }
          const agentRun = run;
          agentRun.actions = agentRun.actions || [];
          agentRun.actions.push(action);
          agentRun.events.push({
            name: "agent_action",
            time: Date.now(),
            kwargs: { action }
          });
          await this.onAgentAction?.(run);
        }
        async handleAgentEnd(action, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "chain") {
            return;
          }
          run.events.push({
            name: "agent_end",
            time: Date.now(),
            kwargs: { action }
          });
          await this.onAgentEnd?.(run);
        }
        async handleRetrieverStart(retriever, query, runId, parentRunId, tags, metadata) {
          const execution_order = this._getExecutionOrder(parentRunId);
          const start_time = Date.now();
          const run = {
            id: runId,
            name: retriever.id[retriever.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: retriever,
            events: [
              {
                name: "start",
                time: start_time
              }
            ],
            inputs: { query },
            execution_order,
            child_execution_order: execution_order,
            run_type: "retriever",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || []
          };
          this._startTrace(run);
          await this.onRetrieverStart?.(run);
        }
        async handleRetrieverEnd(documents, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "retriever") {
            throw new Error("No retriever run to end");
          }
          run.end_time = Date.now();
          run.outputs = { documents };
          run.events.push({
            name: "end",
            time: run.end_time
          });
          await this.onRetrieverEnd?.(run);
          await this._endTrace(run);
        }
        async handleRetrieverError(error, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "retriever") {
            throw new Error("No retriever run to end");
          }
          run.end_time = Date.now();
          run.error = error.message;
          run.events.push({
            name: "error",
            time: run.end_time
          });
          await this.onRetrieverError?.(run);
          await this._endTrace(run);
        }
        async handleText(text, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "chain") {
            return;
          }
          run.events.push({
            name: "text",
            time: Date.now(),
            kwargs: { text }
          });
          await this.onText?.(run);
        }
        async handleLLMNewToken(token, idx, runId) {
          const run = this.runMap.get(runId);
          if (!run || run?.run_type !== "llm") {
            return;
          }
          run.events.push({
            name: "new_token",
            time: Date.now(),
            kwargs: { token, idx }
          });
          await this.onLLMNewToken?.(run);
        }
      };
    }
  });

  // node_modules/langchain/dist/callbacks/handlers/console.js
  function wrap(style, text) {
    return `${style.open}${text}${style.close}`;
  }
  function tryJsonStringify(obj, fallback) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (err) {
      return fallback;
    }
  }
  function elapsed(run) {
    if (!run.end_time)
      return "";
    const elapsed2 = run.end_time - run.start_time;
    if (elapsed2 < 1e3) {
      return `${elapsed2}ms`;
    }
    return `${(elapsed2 / 1e3).toFixed(2)}s`;
  }
  var import_ansi_styles, color, ConsoleCallbackHandler;
  var init_console = __esm({
    "node_modules/langchain/dist/callbacks/handlers/console.js"() {
      import_ansi_styles = __toModule(require_ansi_styles());
      init_tracer();
      ({ color } = import_ansi_styles.default);
      ConsoleCallbackHandler = class extends BaseTracer {
        constructor() {
          super(...arguments);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "console_callback_handler"
          });
        }
        persistRun(_run) {
          return Promise.resolve();
        }
        getParents(run) {
          const parents = [];
          let currentRun = run;
          while (currentRun.parent_run_id) {
            const parent = this.runMap.get(currentRun.parent_run_id);
            if (parent) {
              parents.push(parent);
              currentRun = parent;
            } else {
              break;
            }
          }
          return parents;
        }
        getBreadcrumbs(run) {
          const parents = this.getParents(run).reverse();
          const string = [...parents, run].map((parent, i3, arr) => {
            const name = `${parent.execution_order}:${parent.run_type}:${parent.name}`;
            return i3 === arr.length - 1 ? wrap(import_ansi_styles.default.bold, name) : name;
          }).join(" > ");
          return wrap(color.grey, string);
        }
        onChainStart(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.green, "[chain/start]")} [${crumbs}] Entering Chain run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
        }
        onChainEnd(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.cyan, "[chain/end]")} [${crumbs}] [${elapsed(run)}] Exiting Chain run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
        }
        onChainError(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.red, "[chain/error]")} [${crumbs}] [${elapsed(run)}] Chain run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
        }
        onLLMStart(run) {
          const crumbs = this.getBreadcrumbs(run);
          const inputs = "prompts" in run.inputs ? { prompts: run.inputs.prompts.map((p2) => p2.trim()) } : run.inputs;
          console.log(`${wrap(color.green, "[llm/start]")} [${crumbs}] Entering LLM run with input: ${tryJsonStringify(inputs, "[inputs]")}`);
        }
        onLLMEnd(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.cyan, "[llm/end]")} [${crumbs}] [${elapsed(run)}] Exiting LLM run with output: ${tryJsonStringify(run.outputs, "[response]")}`);
        }
        onLLMError(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.red, "[llm/error]")} [${crumbs}] [${elapsed(run)}] LLM run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
        }
        onToolStart(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.green, "[tool/start]")} [${crumbs}] Entering Tool run with input: "${run.inputs.input?.trim()}"`);
        }
        onToolEnd(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.cyan, "[tool/end]")} [${crumbs}] [${elapsed(run)}] Exiting Tool run with output: "${run.outputs?.output?.trim()}"`);
        }
        onToolError(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.red, "[tool/error]")} [${crumbs}] [${elapsed(run)}] Tool run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
        }
        onRetrieverStart(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.green, "[retriever/start]")} [${crumbs}] Entering Retriever run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
        }
        onRetrieverEnd(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.cyan, "[retriever/end]")} [${crumbs}] [${elapsed(run)}] Exiting Retriever run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
        }
        onRetrieverError(run) {
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.red, "[retriever/error]")} [${crumbs}] [${elapsed(run)}] Retriever run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
        }
        onAgentAction(run) {
          const agentRun = run;
          const crumbs = this.getBreadcrumbs(run);
          console.log(`${wrap(color.blue, "[agent/action]")} [${crumbs}] Agent selected action: ${tryJsonStringify(agentRun.actions[agentRun.actions.length - 1], "[action]")}`);
        }
      };
    }
  });

  // node_modules/retry/lib/retry_operation.js
  var require_retry_operation = __commonJS({
    "node_modules/retry/lib/retry_operation.js"(exports, module) {
      function RetryOperation(timeouts, options) {
        if (typeof options === "boolean") {
          options = { forever: options };
        }
        this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
        this._timeouts = timeouts;
        this._options = options || {};
        this._maxRetryTime = options && options.maxRetryTime || Infinity;
        this._fn = null;
        this._errors = [];
        this._attempts = 1;
        this._operationTimeout = null;
        this._operationTimeoutCb = null;
        this._timeout = null;
        this._operationStart = null;
        this._timer = null;
        if (this._options.forever) {
          this._cachedTimeouts = this._timeouts.slice(0);
        }
      }
      module.exports = RetryOperation;
      RetryOperation.prototype.reset = function() {
        this._attempts = 1;
        this._timeouts = this._originalTimeouts.slice(0);
      };
      RetryOperation.prototype.stop = function() {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }
        if (this._timer) {
          clearTimeout(this._timer);
        }
        this._timeouts = [];
        this._cachedTimeouts = null;
      };
      RetryOperation.prototype.retry = function(err) {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }
        if (!err) {
          return false;
        }
        var currentTime = new Date().getTime();
        if (err && currentTime - this._operationStart >= this._maxRetryTime) {
          this._errors.push(err);
          this._errors.unshift(new Error("RetryOperation timeout occurred"));
          return false;
        }
        this._errors.push(err);
        var timeout = this._timeouts.shift();
        if (timeout === void 0) {
          if (this._cachedTimeouts) {
            this._errors.splice(0, this._errors.length - 1);
            timeout = this._cachedTimeouts.slice(-1);
          } else {
            return false;
          }
        }
        var self2 = this;
        this._timer = setTimeout(function() {
          self2._attempts++;
          if (self2._operationTimeoutCb) {
            self2._timeout = setTimeout(function() {
              self2._operationTimeoutCb(self2._attempts);
            }, self2._operationTimeout);
            if (self2._options.unref) {
              self2._timeout.unref();
            }
          }
          self2._fn(self2._attempts);
        }, timeout);
        if (this._options.unref) {
          this._timer.unref();
        }
        return true;
      };
      RetryOperation.prototype.attempt = function(fn, timeoutOps) {
        this._fn = fn;
        if (timeoutOps) {
          if (timeoutOps.timeout) {
            this._operationTimeout = timeoutOps.timeout;
          }
          if (timeoutOps.cb) {
            this._operationTimeoutCb = timeoutOps.cb;
          }
        }
        var self2 = this;
        if (this._operationTimeoutCb) {
          this._timeout = setTimeout(function() {
            self2._operationTimeoutCb();
          }, self2._operationTimeout);
        }
        this._operationStart = new Date().getTime();
        this._fn(this._attempts);
      };
      RetryOperation.prototype.try = function(fn) {
        console.log("Using RetryOperation.try() is deprecated");
        this.attempt(fn);
      };
      RetryOperation.prototype.start = function(fn) {
        console.log("Using RetryOperation.start() is deprecated");
        this.attempt(fn);
      };
      RetryOperation.prototype.start = RetryOperation.prototype.try;
      RetryOperation.prototype.errors = function() {
        return this._errors;
      };
      RetryOperation.prototype.attempts = function() {
        return this._attempts;
      };
      RetryOperation.prototype.mainError = function() {
        if (this._errors.length === 0) {
          return null;
        }
        var counts = {};
        var mainError = null;
        var mainErrorCount = 0;
        for (var i3 = 0; i3 < this._errors.length; i3++) {
          var error = this._errors[i3];
          var message = error.message;
          var count = (counts[message] || 0) + 1;
          counts[message] = count;
          if (count >= mainErrorCount) {
            mainError = error;
            mainErrorCount = count;
          }
        }
        return mainError;
      };
    }
  });

  // node_modules/retry/lib/retry.js
  var require_retry = __commonJS({
    "node_modules/retry/lib/retry.js"(exports) {
      var RetryOperation = require_retry_operation();
      exports.operation = function(options) {
        var timeouts = exports.timeouts(options);
        return new RetryOperation(timeouts, {
          forever: options && (options.forever || options.retries === Infinity),
          unref: options && options.unref,
          maxRetryTime: options && options.maxRetryTime
        });
      };
      exports.timeouts = function(options) {
        if (options instanceof Array) {
          return [].concat(options);
        }
        var opts = {
          retries: 10,
          factor: 2,
          minTimeout: 1 * 1e3,
          maxTimeout: Infinity,
          randomize: false
        };
        for (var key in options) {
          opts[key] = options[key];
        }
        if (opts.minTimeout > opts.maxTimeout) {
          throw new Error("minTimeout is greater than maxTimeout");
        }
        var timeouts = [];
        for (var i3 = 0; i3 < opts.retries; i3++) {
          timeouts.push(this.createTimeout(i3, opts));
        }
        if (options && options.forever && !timeouts.length) {
          timeouts.push(this.createTimeout(i3, opts));
        }
        timeouts.sort(function(a3, b2) {
          return a3 - b2;
        });
        return timeouts;
      };
      exports.createTimeout = function(attempt, opts) {
        var random = opts.randomize ? Math.random() + 1 : 1;
        var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
        timeout = Math.min(timeout, opts.maxTimeout);
        return timeout;
      };
      exports.wrap = function(obj, options, methods) {
        if (options instanceof Array) {
          methods = options;
          options = null;
        }
        if (!methods) {
          methods = [];
          for (var key in obj) {
            if (typeof obj[key] === "function") {
              methods.push(key);
            }
          }
        }
        for (var i3 = 0; i3 < methods.length; i3++) {
          var method = methods[i3];
          var original = obj[method];
          obj[method] = function retryWrapper(original2) {
            var op = exports.operation(options);
            var args = Array.prototype.slice.call(arguments, 1);
            var callback = args.pop();
            args.push(function(err) {
              if (op.retry(err)) {
                return;
              }
              if (err) {
                arguments[0] = op.mainError();
              }
              callback.apply(this, arguments);
            });
            op.attempt(function() {
              original2.apply(obj, args);
            });
          }.bind(obj, original);
          obj[method].options = options;
        }
      };
    }
  });

  // node_modules/retry/index.js
  var require_retry2 = __commonJS({
    "node_modules/retry/index.js"(exports, module) {
      module.exports = require_retry();
    }
  });

  // node_modules/p-retry/index.js
  var require_p_retry = __commonJS({
    "node_modules/p-retry/index.js"(exports, module) {
      "use strict";
      var retry = require_retry2();
      var networkErrorMsgs = [
        "Failed to fetch",
        "NetworkError when attempting to fetch resource.",
        "The Internet connection appears to be offline.",
        "Network request failed"
      ];
      var AbortError = class extends Error {
        constructor(message) {
          super();
          if (message instanceof Error) {
            this.originalError = message;
            ({ message } = message);
          } else {
            this.originalError = new Error(message);
            this.originalError.stack = this.stack;
          }
          this.name = "AbortError";
          this.message = message;
        }
      };
      var decorateErrorWithCounts = (error, attemptNumber, options) => {
        const retriesLeft = options.retries - (attemptNumber - 1);
        error.attemptNumber = attemptNumber;
        error.retriesLeft = retriesLeft;
        return error;
      };
      var isNetworkError = (errorMessage) => networkErrorMsgs.includes(errorMessage);
      var pRetry3 = (input, options) => new Promise((resolve, reject) => {
        options = {
          onFailedAttempt: () => {
          },
          retries: 10,
          ...options
        };
        const operation = retry.operation(options);
        operation.attempt(async (attemptNumber) => {
          try {
            resolve(await input(attemptNumber));
          } catch (error) {
            if (!(error instanceof Error)) {
              reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
              return;
            }
            if (error instanceof AbortError) {
              operation.stop();
              reject(error.originalError);
            } else if (error instanceof TypeError && !isNetworkError(error.message)) {
              operation.stop();
              reject(error);
            } else {
              decorateErrorWithCounts(error, attemptNumber, options);
              try {
                await options.onFailedAttempt(error);
              } catch (error2) {
                reject(error2);
                return;
              }
              if (!operation.retry(error)) {
                reject(operation.mainError());
              }
            }
          }
        });
      });
      module.exports = pRetry3;
      module.exports.default = pRetry3;
      module.exports.AbortError = AbortError;
    }
  });

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = Object.create(null);
        if (!new Events().__proto__)
          prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt])
          emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn)
          emitter._events[evt].push(listener);
        else
          emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0)
          emitter._events = new Events();
        else
          delete emitter._events[evt];
      }
      function EventEmitter() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0)
          return names;
        for (name in events = this._events) {
          if (has.call(events, name))
            names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers)
          return [];
        if (handlers.fn)
          return [handlers.fn];
        for (var i3 = 0, l4 = handlers.length, ee = new Array(l4); i3 < l4; i3++) {
          ee[i3] = handlers[i3].fn;
        }
        return ee;
      };
      EventEmitter.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners)
          return 0;
        if (listeners.fn)
          return 1;
        return listeners.length;
      };
      EventEmitter.prototype.emit = function emit(event, a1, a22, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return false;
        var listeners = this._events[evt], len = arguments.length, args, i3;
        if (listeners.fn) {
          if (listeners.once)
            this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a22), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a22, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a22, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a22, a3, a4, a5), true;
          }
          for (i3 = 1, args = new Array(len - 1); i3 < len; i3++) {
            args[i3 - 1] = arguments[i3];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i3 = 0; i3 < length; i3++) {
            if (listeners[i3].once)
              this.removeListener(event, listeners[i3].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i3].fn.call(listeners[i3].context);
                break;
              case 2:
                listeners[i3].fn.call(listeners[i3].context, a1);
                break;
              case 3:
                listeners[i3].fn.call(listeners[i3].context, a1, a22);
                break;
              case 4:
                listeners[i3].fn.call(listeners[i3].context, a1, a22, a3);
                break;
              default:
                if (!args)
                  for (j = 1, args = new Array(len - 1); j < len; j++) {
                    args[j - 1] = arguments[j];
                  }
                listeners[i3].fn.apply(listeners[i3].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i3 = 0, events = [], length = listeners.length; i3 < length; i3++) {
            if (listeners[i3].fn !== fn || once && !listeners[i3].once || context && listeners[i3].context !== context) {
              events.push(listeners[i3]);
            }
          }
          if (events.length)
            this._events[evt] = events.length === 1 ? events[0] : events;
          else
            clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt])
            clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.addListener = EventEmitter.prototype.on;
      EventEmitter.prefixed = prefix;
      EventEmitter.EventEmitter = EventEmitter;
      if (typeof module !== "undefined") {
        module.exports = EventEmitter;
      }
    }
  });

  // node_modules/p-finally/index.js
  var require_p_finally = __commonJS({
    "node_modules/p-finally/index.js"(exports, module) {
      "use strict";
      module.exports = (promise, onFinally) => {
        onFinally = onFinally || (() => {
        });
        return promise.then((val) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => val), (err) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => {
          throw err;
        }));
      };
    }
  });

  // node_modules/p-timeout/index.js
  var require_p_timeout = __commonJS({
    "node_modules/p-timeout/index.js"(exports, module) {
      "use strict";
      var pFinally = require_p_finally();
      var TimeoutError = class extends Error {
        constructor(message) {
          super(message);
          this.name = "TimeoutError";
        }
      };
      var pTimeout = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
        if (typeof milliseconds !== "number" || milliseconds < 0) {
          throw new TypeError("Expected `milliseconds` to be a positive number");
        }
        if (milliseconds === Infinity) {
          resolve(promise);
          return;
        }
        const timer = setTimeout(() => {
          if (typeof fallback === "function") {
            try {
              resolve(fallback());
            } catch (error) {
              reject(error);
            }
            return;
          }
          const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
          const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
          if (typeof promise.cancel === "function") {
            promise.cancel();
          }
          reject(timeoutError);
        }, milliseconds);
        pFinally(promise.then(resolve, reject), () => {
          clearTimeout(timer);
        });
      });
      module.exports = pTimeout;
      module.exports.default = pTimeout;
      module.exports.TimeoutError = TimeoutError;
    }
  });

  // node_modules/p-queue/dist/lower-bound.js
  var require_lower_bound = __commonJS({
    "node_modules/p-queue/dist/lower-bound.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function lowerBound(array, value, comparator) {
        let first = 0;
        let count = array.length;
        while (count > 0) {
          const step = count / 2 | 0;
          let it = first + step;
          if (comparator(array[it], value) <= 0) {
            first = ++it;
            count -= step + 1;
          } else {
            count = step;
          }
        }
        return first;
      }
      exports.default = lowerBound;
    }
  });

  // node_modules/p-queue/dist/priority-queue.js
  var require_priority_queue = __commonJS({
    "node_modules/p-queue/dist/priority-queue.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var lower_bound_1 = require_lower_bound();
      var PriorityQueue = class {
        constructor() {
          this._queue = [];
        }
        enqueue(run, options) {
          options = Object.assign({ priority: 0 }, options);
          const element = {
            priority: options.priority,
            run
          };
          if (this.size && this._queue[this.size - 1].priority >= options.priority) {
            this._queue.push(element);
            return;
          }
          const index = lower_bound_1.default(this._queue, element, (a3, b2) => b2.priority - a3.priority);
          this._queue.splice(index, 0, element);
        }
        dequeue() {
          const item = this._queue.shift();
          return item === null || item === void 0 ? void 0 : item.run;
        }
        filter(options) {
          return this._queue.filter((element) => element.priority === options.priority).map((element) => element.run);
        }
        get size() {
          return this._queue.length;
        }
      };
      exports.default = PriorityQueue;
    }
  });

  // node_modules/p-queue/dist/index.js
  var require_dist = __commonJS({
    "node_modules/p-queue/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var EventEmitter = require_eventemitter3();
      var p_timeout_1 = require_p_timeout();
      var priority_queue_1 = require_priority_queue();
      var empty = () => {
      };
      var timeoutError = new p_timeout_1.TimeoutError();
      var PQueue = class extends EventEmitter {
        constructor(options) {
          var _a, _b, _c, _d;
          super();
          this._intervalCount = 0;
          this._intervalEnd = 0;
          this._pendingCount = 0;
          this._resolveEmpty = empty;
          this._resolveIdle = empty;
          options = Object.assign({ carryoverConcurrencyCount: false, intervalCap: Infinity, interval: 0, concurrency: Infinity, autoStart: true, queueClass: priority_queue_1.default }, options);
          if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
            throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
          }
          if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
            throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
          }
          this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
          this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
          this._intervalCap = options.intervalCap;
          this._interval = options.interval;
          this._queue = new options.queueClass();
          this._queueClass = options.queueClass;
          this.concurrency = options.concurrency;
          this._timeout = options.timeout;
          this._throwOnTimeout = options.throwOnTimeout === true;
          this._isPaused = options.autoStart === false;
        }
        get _doesIntervalAllowAnother() {
          return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
        }
        get _doesConcurrentAllowAnother() {
          return this._pendingCount < this._concurrency;
        }
        _next() {
          this._pendingCount--;
          this._tryToStartAnother();
          this.emit("next");
        }
        _resolvePromises() {
          this._resolveEmpty();
          this._resolveEmpty = empty;
          if (this._pendingCount === 0) {
            this._resolveIdle();
            this._resolveIdle = empty;
            this.emit("idle");
          }
        }
        _onResumeInterval() {
          this._onInterval();
          this._initializeIntervalIfNeeded();
          this._timeoutId = void 0;
        }
        _isIntervalPaused() {
          const now = Date.now();
          if (this._intervalId === void 0) {
            const delay = this._intervalEnd - now;
            if (delay < 0) {
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            } else {
              if (this._timeoutId === void 0) {
                this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, delay);
              }
              return true;
            }
          }
          return false;
        }
        _tryToStartAnother() {
          if (this._queue.size === 0) {
            if (this._intervalId) {
              clearInterval(this._intervalId);
            }
            this._intervalId = void 0;
            this._resolvePromises();
            return false;
          }
          if (!this._isPaused) {
            const canInitializeInterval = !this._isIntervalPaused();
            if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
              const job = this._queue.dequeue();
              if (!job) {
                return false;
              }
              this.emit("active");
              job();
              if (canInitializeInterval) {
                this._initializeIntervalIfNeeded();
              }
              return true;
            }
          }
          return false;
        }
        _initializeIntervalIfNeeded() {
          if (this._isIntervalIgnored || this._intervalId !== void 0) {
            return;
          }
          this._intervalId = setInterval(() => {
            this._onInterval();
          }, this._interval);
          this._intervalEnd = Date.now() + this._interval;
        }
        _onInterval() {
          if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = void 0;
          }
          this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
          this._processQueue();
        }
        _processQueue() {
          while (this._tryToStartAnother()) {
          }
        }
        get concurrency() {
          return this._concurrency;
        }
        set concurrency(newConcurrency) {
          if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
            throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
          }
          this._concurrency = newConcurrency;
          this._processQueue();
        }
        async add(fn, options = {}) {
          return new Promise((resolve, reject) => {
            const run = async () => {
              this._pendingCount++;
              this._intervalCount++;
              try {
                const operation = this._timeout === void 0 && options.timeout === void 0 ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === void 0 ? this._timeout : options.timeout, () => {
                  if (options.throwOnTimeout === void 0 ? this._throwOnTimeout : options.throwOnTimeout) {
                    reject(timeoutError);
                  }
                  return void 0;
                });
                resolve(await operation);
              } catch (error) {
                reject(error);
              }
              this._next();
            };
            this._queue.enqueue(run, options);
            this._tryToStartAnother();
            this.emit("add");
          });
        }
        async addAll(functions, options) {
          return Promise.all(functions.map(async (function_) => this.add(function_, options)));
        }
        start() {
          if (!this._isPaused) {
            return this;
          }
          this._isPaused = false;
          this._processQueue();
          return this;
        }
        pause() {
          this._isPaused = true;
        }
        clear() {
          this._queue = new this._queueClass();
        }
        async onEmpty() {
          if (this._queue.size === 0) {
            return;
          }
          return new Promise((resolve) => {
            const existingResolve = this._resolveEmpty;
            this._resolveEmpty = () => {
              existingResolve();
              resolve();
            };
          });
        }
        async onIdle() {
          if (this._pendingCount === 0 && this._queue.size === 0) {
            return;
          }
          return new Promise((resolve) => {
            const existingResolve = this._resolveIdle;
            this._resolveIdle = () => {
              existingResolve();
              resolve();
            };
          });
        }
        get size() {
          return this._queue.size;
        }
        sizeBy(options) {
          return this._queue.filter(options).length;
        }
        get pending() {
          return this._pendingCount;
        }
        get isPaused() {
          return this._isPaused;
        }
        get timeout() {
          return this._timeout;
        }
        set timeout(milliseconds) {
          this._timeout = milliseconds;
        }
      };
      exports.default = PQueue;
    }
  });

  // node_modules/langsmith/dist/utils/async_caller.js
  var import_p_retry, import_p_queue, STATUS_NO_RETRY, AsyncCaller;
  var init_async_caller = __esm({
    "node_modules/langsmith/dist/utils/async_caller.js"() {
      import_p_retry = __toModule(require_p_retry());
      import_p_queue = __toModule(require_dist());
      STATUS_NO_RETRY = [
        400,
        401,
        403,
        404,
        405,
        406,
        407,
        408,
        409
      ];
      AsyncCaller = class {
        constructor(params) {
          Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.maxConcurrency = params.maxConcurrency ?? Infinity;
          this.maxRetries = params.maxRetries ?? 6;
          const PQueue = "default" in import_p_queue.default ? import_p_queue.default.default : import_p_queue.default;
          this.queue = new PQueue({ concurrency: this.maxConcurrency });
        }
        call(callable, ...args) {
          return this.queue.add(() => (0, import_p_retry.default)(() => callable(...args).catch((error) => {
            if (error instanceof Error) {
              throw error;
            } else {
              throw new Error(error);
            }
          }), {
            onFailedAttempt(error) {
              if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.message.startsWith("AbortError")) {
                throw error;
              }
              if (error?.code === "ECONNABORTED") {
                throw error;
              }
              const status = error?.response?.status;
              if (status && STATUS_NO_RETRY.includes(+status)) {
                throw error;
              }
            },
            retries: this.maxRetries,
            randomize: true
          }), { throwOnTimeout: true });
        }
        callWithOptions(options, callable, ...args) {
          if (options.signal) {
            return Promise.race([
              this.call(callable, ...args),
              new Promise((_2, reject) => {
                options.signal?.addEventListener("abort", () => {
                  reject(new Error("AbortError"));
                });
              })
            ]);
          }
          return this.call(callable, ...args);
        }
        fetch(...args) {
          return this.call(() => fetch(...args).then((res) => res.ok ? res : Promise.reject(res)));
        }
      };
    }
  });

  // node_modules/langsmith/dist/utils/env.js
  async function getRuntimeEnvironment() {
    if (runtimeEnvironment === void 0) {
      const env = getEnv();
      runtimeEnvironment = {
        library: "langsmith",
        runtime: env
      };
    }
    return runtimeEnvironment;
  }
  function getEnvironmentVariable(name) {
    try {
      return typeof process !== "undefined" ? process.env?.[name] : void 0;
    } catch (e4) {
      return void 0;
    }
  }
  var isBrowser, isWebWorker, isJsDom, isDeno, isNode, getEnv, runtimeEnvironment;
  var init_env = __esm({
    "node_modules/langsmith/dist/utils/env.js"() {
      isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
      isWebWorker = () => typeof globalThis === "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope";
      isJsDom = () => typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
      isDeno = () => typeof Deno !== "undefined";
      isNode = () => typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined" && !isDeno();
      getEnv = () => {
        let env;
        if (isBrowser()) {
          env = "browser";
        } else if (isNode()) {
          env = "node";
        } else if (isWebWorker()) {
          env = "webworker";
        } else if (isJsDom()) {
          env = "jsdom";
        } else if (isDeno()) {
          env = "deno";
        } else {
          env = "other";
        }
        return env;
      };
    }
  });

  // node_modules/langsmith/dist/client.js
  async function toArray(iterable) {
    const result = [];
    for await (const item of iterable) {
      result.push(item);
    }
    return result;
  }
  function trimQuotes(str) {
    if (str === void 0) {
      return void 0;
    }
    return str.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
  }
  var isLocalhost, raiseForStatus, Client;
  var init_client = __esm({
    "node_modules/langsmith/dist/client.js"() {
      init_esm_browser();
      init_async_caller();
      init_env();
      isLocalhost = (url) => {
        const strippedUrl = url.replace("http://", "").replace("https://", "");
        const hostname = strippedUrl.split("/")[0].split(":")[0];
        return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
      };
      raiseForStatus = async (response, operation) => {
        const body = await response.text();
        if (!response.ok) {
          throw new Error(`Failed to ${operation}: ${response.status} ${response.statusText} ${body}`);
        }
      };
      Client = class {
        constructor(config = {}) {
          Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "timeout_ms", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          const defaultConfig = Client.getDefaultClientConfig();
          this.apiUrl = trimQuotes(config.apiUrl ?? defaultConfig.apiUrl) ?? "";
          this.apiKey = trimQuotes(config.apiKey ?? defaultConfig.apiKey);
          this.validateApiKeyIfHosted();
          this.timeout_ms = config.timeout_ms ?? 4e3;
          this.caller = new AsyncCaller(config.callerOptions ?? {});
        }
        static getDefaultClientConfig() {
          const apiKey = getEnvironmentVariable("LANGCHAIN_API_KEY");
          const apiUrl = getEnvironmentVariable("LANGCHAIN_ENDPOINT") ?? (apiKey ? "https://api.smith.langchain.com" : "http://localhost:1984");
          return {
            apiUrl,
            apiKey
          };
        }
        validateApiKeyIfHosted() {
          const isLocal = isLocalhost(this.apiUrl);
          if (!isLocal && !this.apiKey) {
            throw new Error("API key must be provided when using hosted LangSmith API");
          }
        }
        getHostUrl() {
          if (isLocalhost(this.apiUrl)) {
            return "http://localhost";
          } else if (this.apiUrl.split(".", 1)[0].includes("dev")) {
            return "https://dev.smith.langchain.com";
          } else {
            return "https://smith.langchain.com";
          }
        }
        get headers() {
          const headers = {};
          if (this.apiKey) {
            headers["x-api-key"] = `${this.apiKey}`;
          }
          return headers;
        }
        async _get(path, queryParams) {
          const paramsString = queryParams?.toString() ?? "";
          const url = `${this.apiUrl}${path}?${paramsString}`;
          const response = await this.caller.call(fetch, url, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
          }
          return response.json();
        }
        async *_getPaginated(path, queryParams = new URLSearchParams()) {
          let offset = Number(queryParams.get("offset")) || 0;
          const limit = Number(queryParams.get("limit")) || 100;
          while (true) {
            queryParams.set("offset", String(offset));
            queryParams.set("limit", String(limit));
            const url = `${this.apiUrl}${path}?${queryParams}`;
            const response = await this.caller.call(fetch, url, {
              method: "GET",
              headers: this.headers,
              signal: AbortSignal.timeout(this.timeout_ms)
            });
            if (!response.ok) {
              throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
            }
            const items = await response.json();
            if (items.length === 0) {
              break;
            }
            yield items;
            if (items.length < limit) {
              break;
            }
            offset += items.length;
          }
        }
        async createRun(run) {
          const headers = { ...this.headers, "Content-Type": "application/json" };
          const extra = run.extra ?? {};
          const runtimeEnv = await getRuntimeEnvironment();
          const session_name = run.project_name;
          delete run.project_name;
          const runCreate = {
            session_name,
            ...run,
            extra: {
              ...run.extra,
              runtime: {
                ...runtimeEnv,
                ...extra.runtime
              }
            }
          };
          const response = await this.caller.call(fetch, `${this.apiUrl}/runs`, {
            method: "POST",
            headers,
            body: JSON.stringify(runCreate),
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          await raiseForStatus(response, "create run");
        }
        async updateRun(runId, run) {
          const headers = { ...this.headers, "Content-Type": "application/json" };
          const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(run),
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          await raiseForStatus(response, "update run");
        }
        async readRun(runId, { loadChildRuns } = { loadChildRuns: false }) {
          let run = await this._get(`/runs/${runId}`);
          if (loadChildRuns && run.child_run_ids) {
            run = await this._loadChildRuns(run);
          }
          return run;
        }
        async getRunUrl({ runId }) {
          const run = await this.readRun(runId);
          if (!run.app_path) {
            return void 0;
          }
          const baseUrl = this.getHostUrl();
          return `${baseUrl}${run.app_path}`;
        }
        async _loadChildRuns(run) {
          const childRuns = await toArray(this.listRuns({ id: run.child_run_ids }));
          const treemap = {};
          const runs = {};
          childRuns.sort((a3, b2) => a3.execution_order - b2.execution_order);
          for (const childRun of childRuns) {
            if (childRun.parent_run_id === null || childRun.parent_run_id === void 0) {
              throw new Error(`Child run ${childRun.id} has no parent`);
            }
            if (!(childRun.parent_run_id in treemap)) {
              treemap[childRun.parent_run_id] = [];
            }
            treemap[childRun.parent_run_id].push(childRun);
            runs[childRun.id] = childRun;
          }
          run.child_runs = treemap[run.id] || [];
          for (const runId in treemap) {
            if (runId !== run.id) {
              runs[runId].child_runs = treemap[runId];
            }
          }
          return run;
        }
        async *listRuns({ projectId, projectName, parentRunId, referenceExampleId, datasetId, startTime, endTime, executionOrder, runType, error, id, limit, offset, query, filter: filter2, orderBy }) {
          const queryParams = new URLSearchParams();
          let projectId_ = projectId;
          if (projectName) {
            if (projectId) {
              throw new Error("Only one of projectId or projectName may be given");
            }
            projectId_ = (await this.readProject({ projectName })).id;
          }
          if (projectId_) {
            queryParams.append("session", projectId_);
          }
          if (parentRunId) {
            queryParams.append("parent_run", parentRunId);
          }
          if (referenceExampleId) {
            queryParams.append("reference_example", referenceExampleId);
          }
          if (datasetId) {
            queryParams.append("dataset", datasetId);
          }
          if (startTime) {
            queryParams.append("start_time", startTime.toISOString());
          }
          if (endTime) {
            queryParams.append("end_time", endTime.toISOString());
          }
          if (executionOrder) {
            queryParams.append("execution_order", executionOrder.toString());
          }
          if (runType) {
            queryParams.append("run_type", runType);
          }
          if (error !== void 0) {
            queryParams.append("error", error.toString());
          }
          if (id !== void 0) {
            for (const id_ of id) {
              queryParams.append("id", id_);
            }
          }
          if (limit !== void 0) {
            queryParams.append("limit", limit.toString());
          }
          if (offset !== void 0) {
            queryParams.append("offset", offset.toString());
          }
          if (query !== void 0) {
            queryParams.append("query", query);
          }
          if (filter2 !== void 0) {
            queryParams.append("filter", filter2);
          }
          if (orderBy !== void 0) {
            orderBy.map((order) => queryParams.append("order_by", order));
          }
          for await (const runs of this._getPaginated("/runs", queryParams)) {
            yield* runs;
          }
        }
        async deleteRun(runId) {
          const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          await raiseForStatus(response, "delete run");
        }
        async shareRun(runId, { shareId } = {}) {
          const data = {
            run_id: runId,
            share_token: shareId || v4_default()
          };
          const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          const result = await response.json();
          if (result === null || !("share_token" in result)) {
            throw new Error("Invalid response from server");
          }
          return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
        }
        async unshareRun(runId) {
          const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          await raiseForStatus(response, "unshare run");
        }
        async readRunSharedLink(runId) {
          const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          const result = await response.json();
          if (result === null || !("share_token" in result)) {
            return void 0;
          }
          return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
        }
        async createProject({ projectName, projectExtra, upsert }) {
          const upsert_ = upsert ? `?upsert=true` : "";
          const endpoint = `${this.apiUrl}/sessions${upsert_}`;
          const body = {
            name: projectName
          };
          if (projectExtra !== void 0) {
            body["extra"] = projectExtra;
          }
          const response = await this.caller.call(fetch, endpoint, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(`Failed to create session ${projectName}: ${response.status} ${response.statusText}`);
          }
          return result;
        }
        async readProject({ projectId, projectName }) {
          let path = "/sessions";
          const params = new URLSearchParams();
          if (projectId !== void 0 && projectName !== void 0) {
            throw new Error("Must provide either projectName or projectId, not both");
          } else if (projectId !== void 0) {
            path += `/${projectId}`;
          } else if (projectName !== void 0) {
            params.append("name", projectName);
          } else {
            throw new Error("Must provide projectName or projectId");
          }
          const response = await this._get(path, params);
          let result;
          if (Array.isArray(response)) {
            if (response.length === 0) {
              throw new Error(`Project[id=${projectId}, name=${projectName}] not found`);
            }
            result = response[0];
          } else {
            result = response;
          }
          return result;
        }
        async *listProjects() {
          for await (const projects of this._getPaginated("/sessions")) {
            yield* projects;
          }
        }
        async deleteProject({ projectId, projectName }) {
          let projectId_;
          if (projectId === void 0 && projectName === void 0) {
            throw new Error("Must provide projectName or projectId");
          } else if (projectId !== void 0 && projectName !== void 0) {
            throw new Error("Must provide either projectName or projectId, not both");
          } else if (projectId === void 0) {
            projectId_ = (await this.readProject({ projectName })).id;
          } else {
            projectId_ = projectId;
          }
          const response = await this.caller.call(fetch, `${this.apiUrl}/sessions/${projectId_}`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          await raiseForStatus(response, `delete session ${projectId_} (${projectName})`);
        }
        async uploadCsv({ csvFile, fileName, inputKeys, outputKeys, description, dataType, name }) {
          const url = `${this.apiUrl}/datasets/upload`;
          const formData = new FormData();
          formData.append("file", csvFile, fileName);
          inputKeys.forEach((key) => {
            formData.append("input_keys", key);
          });
          outputKeys.forEach((key) => {
            formData.append("output_keys", key);
          });
          if (description) {
            formData.append("description", description);
          }
          if (dataType) {
            formData.append("data_type", dataType);
          }
          if (name) {
            formData.append("name", name);
          }
          const response = await this.caller.call(fetch, url, {
            method: "POST",
            headers: this.headers,
            body: formData,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            const result2 = await response.json();
            if (result2.detail && result2.detail.includes("already exists")) {
              throw new Error(`Dataset ${fileName} already exists`);
            }
            throw new Error(`Failed to upload CSV: ${response.status} ${response.statusText}`);
          }
          const result = await response.json();
          return result;
        }
        async createDataset(name, { description, dataType } = {}) {
          const body = {
            name,
            description
          };
          if (dataType) {
            body.data_type = dataType;
          }
          const response = await this.caller.call(fetch, `${this.apiUrl}/datasets`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            const result2 = await response.json();
            if (result2.detail && result2.detail.includes("already exists")) {
              throw new Error(`Dataset ${name} already exists`);
            }
            throw new Error(`Failed to create dataset ${response.status} ${response.statusText}`);
          }
          const result = await response.json();
          return result;
        }
        async readDataset({ datasetId, datasetName }) {
          let path = "/datasets";
          const params = new URLSearchParams({ limit: "1" });
          if (datasetId !== void 0 && datasetName !== void 0) {
            throw new Error("Must provide either datasetName or datasetId, not both");
          } else if (datasetId !== void 0) {
            path += `/${datasetId}`;
          } else if (datasetName !== void 0) {
            params.append("name", datasetName);
          } else {
            throw new Error("Must provide datasetName or datasetId");
          }
          const response = await this._get(path, params);
          let result;
          if (Array.isArray(response)) {
            if (response.length === 0) {
              throw new Error(`Dataset[id=${datasetId}, name=${datasetName}] not found`);
            }
            result = response[0];
          } else {
            result = response;
          }
          return result;
        }
        async *listDatasets({ limit = 100, offset = 0 } = {}) {
          const path = "/datasets";
          const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
          });
          for await (const datasets of this._getPaginated(path, params)) {
            yield* datasets;
          }
        }
        async deleteDataset({ datasetId, datasetName }) {
          let path = "/datasets";
          let datasetId_ = datasetId;
          if (datasetId !== void 0 && datasetName !== void 0) {
            throw new Error("Must provide either datasetName or datasetId, not both");
          } else if (datasetName !== void 0) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
          }
          if (datasetId_ !== void 0) {
            path += `/${datasetId_}`;
          } else {
            throw new Error("Must provide datasetName or datasetId");
          }
          const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
          }
          await response.json();
        }
        async createExample(inputs, outputs, { datasetId, datasetName, createdAt }) {
          let datasetId_ = datasetId;
          if (datasetId_ === void 0 && datasetName === void 0) {
            throw new Error("Must provide either datasetName or datasetId");
          } else if (datasetId_ !== void 0 && datasetName !== void 0) {
            throw new Error("Must provide either datasetName or datasetId, not both");
          } else if (datasetId_ === void 0) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
          }
          const createdAt_ = createdAt || new Date();
          const data = {
            dataset_id: datasetId_,
            inputs,
            outputs,
            created_at: createdAt_.toISOString()
          };
          const response = await this.caller.call(fetch, `${this.apiUrl}/examples`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            throw new Error(`Failed to create example: ${response.status} ${response.statusText}`);
          }
          const result = await response.json();
          return result;
        }
        async readExample(exampleId) {
          const path = `/examples/${exampleId}`;
          return await this._get(path);
        }
        async *listExamples({ datasetId, datasetName } = {}) {
          let datasetId_;
          if (datasetId !== void 0 && datasetName !== void 0) {
            throw new Error("Must provide either datasetName or datasetId, not both");
          } else if (datasetId !== void 0) {
            datasetId_ = datasetId;
          } else if (datasetName !== void 0) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
          } else {
            throw new Error("Must provide a datasetName or datasetId");
          }
          const params = new URLSearchParams({ dataset: datasetId_ });
          for await (const examples of this._getPaginated("/examples", params)) {
            yield* examples;
          }
        }
        async deleteExample(exampleId) {
          const path = `/examples/${exampleId}`;
          const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
          }
          await response.json();
        }
        async updateExample(exampleId, update) {
          const response = await this.caller.call(fetch, `${this.apiUrl}/examples/${exampleId}`, {
            method: "PATCH",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(update),
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            throw new Error(`Failed to update example ${exampleId}: ${response.status} ${response.statusText}`);
          }
          const result = await response.json();
          return result;
        }
        async evaluateRun(run, evaluator, { sourceInfo, loadChildRuns } = { loadChildRuns: false }) {
          let run_;
          if (typeof run === "string") {
            run_ = await this.readRun(run, { loadChildRuns });
          } else if (typeof run === "object" && "id" in run) {
            run_ = run;
          } else {
            throw new Error(`Invalid run type: ${typeof run}`);
          }
          let referenceExample = void 0;
          if (run_.reference_example_id !== null && run_.reference_example_id !== void 0) {
            referenceExample = await this.readExample(run_.reference_example_id);
          }
          const feedbackResult = await evaluator.evaluateRun(run_, referenceExample);
          let sourceInfo_ = sourceInfo ?? {};
          if (feedbackResult.evaluatorInfo) {
            sourceInfo_ = { ...sourceInfo_, ...feedbackResult.evaluatorInfo };
          }
          return await this.createFeedback(run_.id, feedbackResult.key, {
            score: feedbackResult.score,
            value: feedbackResult.value,
            comment: feedbackResult.comment,
            correction: feedbackResult.correction,
            sourceInfo: sourceInfo_,
            feedbackSourceType: "MODEL"
          });
        }
        async createFeedback(runId, key, { score, value, correction, comment, sourceInfo, feedbackSourceType = "API" }) {
          let feedback_source;
          if (feedbackSourceType === "API") {
            feedback_source = { type: "api", metadata: sourceInfo ?? {} };
          } else if (feedbackSourceType === "MODEL") {
            feedback_source = { type: "model", metadata: sourceInfo ?? {} };
          } else {
            throw new Error(`Unknown feedback source type ${feedbackSourceType}`);
          }
          const feedback = {
            id: v4_default(),
            run_id: runId,
            key,
            score,
            value,
            correction,
            comment,
            feedback_source
          };
          const response = await this.caller.call(fetch, `${this.apiUrl}/feedback`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(feedback),
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            throw new Error(`Failed to create feedback for run ${runId}: ${response.status} ${response.statusText}`);
          }
          const result = await response.json();
          return result;
        }
        async readFeedback(feedbackId) {
          const path = `/feedback/${feedbackId}`;
          const response = await this._get(path);
          return response;
        }
        async deleteFeedback(feedbackId) {
          const path = `/feedback/${feedbackId}`;
          const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
          });
          if (!response.ok) {
            throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
          }
          await response.json();
        }
        async *listFeedback({ runIds } = {}) {
          const queryParams = new URLSearchParams();
          if (runIds) {
            queryParams.append("run", runIds.join(","));
          }
          for await (const feedbacks of this._getPaginated("/feedback", queryParams)) {
            yield* feedbacks;
          }
        }
      };
    }
  });

  // node_modules/langsmith/dist/run_trees.js
  var init_run_trees = __esm({
    "node_modules/langsmith/dist/run_trees.js"() {
      init_env();
      init_client();
    }
  });

  // node_modules/langsmith/dist/index.js
  var init_dist = __esm({
    "node_modules/langsmith/dist/index.js"() {
      init_client();
      init_run_trees();
    }
  });

  // node_modules/langsmith/index.js
  var init_langsmith = __esm({
    "node_modules/langsmith/index.js"() {
      init_dist();
    }
  });

  // node_modules/langchain/dist/util/env.js
  async function getRuntimeEnvironment2() {
    if (runtimeEnvironment2 === void 0) {
      const env = getEnv2();
      runtimeEnvironment2 = {
        library: "langchain-js",
        runtime: env
      };
    }
    return runtimeEnvironment2;
  }
  function getEnvironmentVariable2(name) {
    try {
      return typeof process !== "undefined" ? process.env?.[name] : void 0;
    } catch (e4) {
      return void 0;
    }
  }
  var isBrowser2, isWebWorker2, isJsDom2, isDeno2, isNode2, getEnv2, runtimeEnvironment2;
  var init_env2 = __esm({
    "node_modules/langchain/dist/util/env.js"() {
      isBrowser2 = () => typeof window !== "undefined" && typeof window.document !== "undefined";
      isWebWorker2 = () => typeof globalThis === "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope";
      isJsDom2 = () => typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
      isDeno2 = () => typeof Deno !== "undefined";
      isNode2 = () => typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined" && !isDeno2();
      getEnv2 = () => {
        let env;
        if (isBrowser2()) {
          env = "browser";
        } else if (isNode2()) {
          env = "node";
        } else if (isWebWorker2()) {
          env = "webworker";
        } else if (isJsDom2()) {
          env = "jsdom";
        } else if (isDeno2()) {
          env = "deno";
        } else {
          env = "other";
        }
        return env;
      };
    }
  });

  // node_modules/langchain/dist/callbacks/handlers/tracer_langchain.js
  var LangChainTracer;
  var init_tracer_langchain = __esm({
    "node_modules/langchain/dist/callbacks/handlers/tracer_langchain.js"() {
      init_langsmith();
      init_env2();
      init_tracer();
      LangChainTracer = class extends BaseTracer {
        constructor(fields = {}) {
          super(fields);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "langchain_tracer"
          });
          Object.defineProperty(this, "projectName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "exampleId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          const { exampleId, projectName, client } = fields;
          this.projectName = projectName ?? getEnvironmentVariable2("LANGCHAIN_PROJECT") ?? getEnvironmentVariable2("LANGCHAIN_SESSION");
          this.exampleId = exampleId;
          this.client = client ?? new Client({});
        }
        async _convertToCreate(run, example_id = void 0) {
          return {
            ...run,
            extra: {
              ...run.extra,
              runtime: await getRuntimeEnvironment2()
            },
            child_runs: void 0,
            session_name: this.projectName,
            reference_example_id: run.parent_run_id ? void 0 : example_id
          };
        }
        async persistRun(_run) {
        }
        async _persistRunSingle(run) {
          const persistedRun = await this._convertToCreate(run, this.exampleId);
          await this.client.createRun(persistedRun);
        }
        async _updateRunSingle(run) {
          const runUpdate = {
            end_time: run.end_time,
            error: run.error,
            outputs: run.outputs,
            events: run.events
          };
          await this.client.updateRun(run.id, runUpdate);
        }
        async onRetrieverStart(run) {
          await this._persistRunSingle(run);
        }
        async onRetrieverEnd(run) {
          await this._updateRunSingle(run);
        }
        async onRetrieverError(run) {
          await this._updateRunSingle(run);
        }
        async onLLMStart(run) {
          await this._persistRunSingle(run);
        }
        async onLLMEnd(run) {
          await this._updateRunSingle(run);
        }
        async onLLMError(run) {
          await this._updateRunSingle(run);
        }
        async onChainStart(run) {
          await this._persistRunSingle(run);
        }
        async onChainEnd(run) {
          await this._updateRunSingle(run);
        }
        async onChainError(run) {
          await this._updateRunSingle(run);
        }
        async onToolStart(run) {
          await this._persistRunSingle(run);
        }
        async onToolEnd(run) {
          await this._updateRunSingle(run);
        }
        async onToolError(run) {
          await this._updateRunSingle(run);
        }
      };
    }
  });

  // node_modules/langchain/dist/memory/base.js
  function getBufferString(messages2, humanPrefix = "Human", aiPrefix = "AI") {
    const string_messages = [];
    for (const m2 of messages2) {
      let role;
      if (m2._getType() === "human") {
        role = humanPrefix;
      } else if (m2._getType() === "ai") {
        role = aiPrefix;
      } else if (m2._getType() === "system") {
        role = "System";
      } else if (m2._getType() === "function") {
        role = "Function";
      } else if (m2._getType() === "generic") {
        role = m2.role;
      } else {
        throw new Error(`Got unsupported message type: ${m2}`);
      }
      const nameStr = m2.name ? `${m2.name}, ` : "";
      string_messages.push(`${role}: ${nameStr}${m2.content}`);
    }
    return string_messages.join("\n");
  }
  var BaseMemory, getValue, getInputValue, getOutputValue;
  var init_base2 = __esm({
    "node_modules/langchain/dist/memory/base.js"() {
      BaseMemory = class {
      };
      getValue = (values, key) => {
        if (key !== void 0) {
          return values[key];
        }
        const keys = Object.keys(values);
        if (keys.length === 1) {
          return values[keys[0]];
        }
      };
      getInputValue = (inputValues, inputKey) => {
        const value = getValue(inputValues, inputKey);
        if (!value) {
          const keys = Object.keys(inputValues);
          throw new Error(`input values have ${keys.length} keys, you must specify an input key or pass only 1 key as input`);
        }
        return value;
      };
      getOutputValue = (outputValues, outputKey) => {
        const value = getValue(outputValues, outputKey);
        if (!value) {
          const keys = Object.keys(outputValues);
          throw new Error(`output values have ${keys.length} keys, you must specify an output key or pass only 1 key as output`);
        }
        return value;
      };
    }
  });

  // node_modules/langchain/dist/callbacks/handlers/tracer_langchain_v1.js
  var LangChainTracerV1;
  var init_tracer_langchain_v1 = __esm({
    "node_modules/langchain/dist/callbacks/handlers/tracer_langchain_v1.js"() {
      init_base2();
      init_env2();
      init_tracer();
      LangChainTracerV1 = class extends BaseTracer {
        constructor() {
          super();
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "langchain_tracer"
          });
          Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: getEnvironmentVariable2("LANGCHAIN_ENDPOINT") || "http://localhost:1984"
          });
          Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
              "Content-Type": "application/json"
            }
          });
          Object.defineProperty(this, "session", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          const apiKey = getEnvironmentVariable2("LANGCHAIN_API_KEY");
          if (apiKey) {
            this.headers["x-api-key"] = apiKey;
          }
        }
        async newSession(sessionName) {
          const sessionCreate = {
            start_time: Date.now(),
            name: sessionName
          };
          const session = await this.persistSession(sessionCreate);
          this.session = session;
          return session;
        }
        async loadSession(sessionName) {
          const endpoint = `${this.endpoint}/sessions?name=${sessionName}`;
          return this._handleSessionResponse(endpoint);
        }
        async loadDefaultSession() {
          const endpoint = `${this.endpoint}/sessions?name=default`;
          return this._handleSessionResponse(endpoint);
        }
        async convertV2RunToRun(run) {
          const session = this.session ?? await this.loadDefaultSession();
          const serialized = run.serialized;
          let runResult;
          if (run.run_type === "llm") {
            const prompts = run.inputs.prompts ? run.inputs.prompts : run.inputs.messages.map((x2) => getBufferString(x2));
            const llmRun = {
              uuid: run.id,
              start_time: run.start_time,
              end_time: run.end_time,
              execution_order: run.execution_order,
              child_execution_order: run.child_execution_order,
              serialized,
              type: run.run_type,
              session_id: session.id,
              prompts,
              response: run.outputs
            };
            runResult = llmRun;
          } else if (run.run_type === "chain") {
            const child_runs = await Promise.all(run.child_runs.map((child_run) => this.convertV2RunToRun(child_run)));
            const chainRun = {
              uuid: run.id,
              start_time: run.start_time,
              end_time: run.end_time,
              execution_order: run.execution_order,
              child_execution_order: run.child_execution_order,
              serialized,
              type: run.run_type,
              session_id: session.id,
              inputs: run.inputs,
              outputs: run.outputs,
              child_llm_runs: child_runs.filter((child_run) => child_run.type === "llm"),
              child_chain_runs: child_runs.filter((child_run) => child_run.type === "chain"),
              child_tool_runs: child_runs.filter((child_run) => child_run.type === "tool")
            };
            runResult = chainRun;
          } else if (run.run_type === "tool") {
            const child_runs = await Promise.all(run.child_runs.map((child_run) => this.convertV2RunToRun(child_run)));
            const toolRun = {
              uuid: run.id,
              start_time: run.start_time,
              end_time: run.end_time,
              execution_order: run.execution_order,
              child_execution_order: run.child_execution_order,
              serialized,
              type: run.run_type,
              session_id: session.id,
              tool_input: run.inputs.input,
              output: run.outputs?.output,
              action: JSON.stringify(serialized),
              child_llm_runs: child_runs.filter((child_run) => child_run.type === "llm"),
              child_chain_runs: child_runs.filter((child_run) => child_run.type === "chain"),
              child_tool_runs: child_runs.filter((child_run) => child_run.type === "tool")
            };
            runResult = toolRun;
          } else {
            throw new Error(`Unknown run type: ${run.run_type}`);
          }
          return runResult;
        }
        async persistRun(run) {
          let endpoint;
          let v1Run;
          if (run.run_type !== void 0) {
            v1Run = await this.convertV2RunToRun(run);
          } else {
            v1Run = run;
          }
          if (v1Run.type === "llm") {
            endpoint = `${this.endpoint}/llm-runs`;
          } else if (v1Run.type === "chain") {
            endpoint = `${this.endpoint}/chain-runs`;
          } else {
            endpoint = `${this.endpoint}/tool-runs`;
          }
          const response = await fetch(endpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(v1Run)
          });
          if (!response.ok) {
            console.error(`Failed to persist run: ${response.status} ${response.statusText}`);
          }
        }
        async persistSession(sessionCreate) {
          const endpoint = `${this.endpoint}/sessions`;
          const response = await fetch(endpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(sessionCreate)
          });
          if (!response.ok) {
            console.error(`Failed to persist session: ${response.status} ${response.statusText}, using default session.`);
            return {
              id: 1,
              ...sessionCreate
            };
          }
          return {
            id: (await response.json()).id,
            ...sessionCreate
          };
        }
        async _handleSessionResponse(endpoint) {
          const response = await fetch(endpoint, {
            method: "GET",
            headers: this.headers
          });
          let tracerSession;
          if (!response.ok) {
            console.error(`Failed to load session: ${response.status} ${response.statusText}`);
            tracerSession = {
              id: 1,
              start_time: Date.now()
            };
            this.session = tracerSession;
            return tracerSession;
          }
          const resp = await response.json();
          if (resp.length === 0) {
            tracerSession = {
              id: 1,
              start_time: Date.now()
            };
            this.session = tracerSession;
            return tracerSession;
          }
          [tracerSession] = resp;
          this.session = tracerSession;
          return tracerSession;
        }
      };
    }
  });

  // node_modules/langchain/dist/callbacks/handlers/initialize.js
  async function getTracingCallbackHandler(session) {
    const tracer = new LangChainTracerV1();
    if (session) {
      await tracer.loadSession(session);
    } else {
      await tracer.loadDefaultSession();
    }
    return tracer;
  }
  async function getTracingV2CallbackHandler() {
    return new LangChainTracer();
  }
  var init_initialize = __esm({
    "node_modules/langchain/dist/callbacks/handlers/initialize.js"() {
      init_tracer_langchain();
      init_tracer_langchain_v1();
    }
  });

  // node_modules/langchain/dist/callbacks/promises.js
  function createQueue() {
    const PQueue = "default" in import_p_queue2.default ? import_p_queue2.default.default : import_p_queue2.default;
    return new PQueue({
      autoStart: true,
      concurrency: 1
    });
  }
  async function consumeCallback(promiseFn, wait) {
    if (wait === true) {
      await promiseFn();
    } else {
      if (typeof queue === "undefined") {
        queue = createQueue();
      }
      void queue.add(promiseFn);
    }
  }
  var import_p_queue2, queue;
  var init_promises = __esm({
    "node_modules/langchain/dist/callbacks/promises.js"() {
      import_p_queue2 = __toModule(require_dist());
    }
  });

  // node_modules/langchain/dist/callbacks/manager.js
  function parseCallbackConfigArg(arg) {
    if (!arg) {
      return {};
    } else if (Array.isArray(arg) || "name" in arg) {
      return { callbacks: arg };
    } else {
      return arg;
    }
  }
  function ensureHandler(handler) {
    if ("name" in handler) {
      return handler;
    }
    return BaseCallbackHandler.fromMethods(handler);
  }
  var BaseCallbackManager, BaseRunManager, CallbackManagerForRetrieverRun, CallbackManagerForLLMRun, CallbackManagerForChainRun, CallbackManagerForToolRun, CallbackManager;
  var init_manager = __esm({
    "node_modules/langchain/dist/callbacks/manager.js"() {
      init_esm_browser();
      init_base();
      init_console();
      init_initialize();
      init_base2();
      init_env2();
      init_tracer_langchain();
      init_promises();
      BaseCallbackManager = class {
        setHandler(handler) {
          return this.setHandlers([handler]);
        }
      };
      BaseRunManager = class {
        constructor(runId, handlers, inheritableHandlers, tags, inheritableTags, metadata, inheritableMetadata, _parentRunId) {
          Object.defineProperty(this, "runId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: runId
          });
          Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: handlers
          });
          Object.defineProperty(this, "inheritableHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableHandlers
          });
          Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tags
          });
          Object.defineProperty(this, "inheritableTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableTags
          });
          Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: metadata
          });
          Object.defineProperty(this, "inheritableMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableMetadata
          });
          Object.defineProperty(this, "_parentRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _parentRunId
          });
        }
        async handleText(text) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            try {
              await handler.handleText?.(text, this.runId, this._parentRunId, this.tags);
            } catch (err) {
              console.error(`Error in handler ${handler.constructor.name}, handleText: ${err}`);
            }
          }, handler.awaitHandlers)));
        }
      };
      CallbackManagerForRetrieverRun = class extends BaseRunManager {
        getChild(tag) {
          const manager = new CallbackManager(this.runId);
          manager.setHandlers(this.inheritableHandlers);
          manager.addTags(this.inheritableTags);
          manager.addMetadata(this.inheritableMetadata);
          if (tag) {
            manager.addTags([tag], false);
          }
          return manager;
        }
        async handleRetrieverEnd(documents) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreRetriever) {
              try {
                await handler.handleRetrieverEnd?.(documents, this.runId, this._parentRunId, this.tags);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleRetriever`);
              }
            }
          }, handler.awaitHandlers)));
        }
        async handleRetrieverError(err) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreRetriever) {
              try {
                await handler.handleRetrieverError?.(err, this.runId, this._parentRunId, this.tags);
              } catch (error) {
                console.error(`Error in handler ${handler.constructor.name}, handleRetrieverError: ${error}`);
              }
            }
          }, handler.awaitHandlers)));
        }
      };
      CallbackManagerForLLMRun = class extends BaseRunManager {
        async handleLLMNewToken(token, idx = { prompt: 0, completion: 0 }) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
              try {
                await handler.handleLLMNewToken?.(token, idx, this.runId, this._parentRunId, this.tags);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleLLMNewToken: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
        }
        async handleLLMError(err) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
              try {
                await handler.handleLLMError?.(err, this.runId, this._parentRunId, this.tags);
              } catch (err2) {
                console.error(`Error in handler ${handler.constructor.name}, handleLLMError: ${err2}`);
              }
            }
          }, handler.awaitHandlers)));
        }
        async handleLLMEnd(output) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
              try {
                await handler.handleLLMEnd?.(output, this.runId, this._parentRunId, this.tags);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleLLMEnd: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
        }
      };
      CallbackManagerForChainRun = class extends BaseRunManager {
        getChild(tag) {
          const manager = new CallbackManager(this.runId);
          manager.setHandlers(this.inheritableHandlers);
          manager.addTags(this.inheritableTags);
          manager.addMetadata(this.inheritableMetadata);
          if (tag) {
            manager.addTags([tag], false);
          }
          return manager;
        }
        async handleChainError(err) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreChain) {
              try {
                await handler.handleChainError?.(err, this.runId, this._parentRunId, this.tags);
              } catch (err2) {
                console.error(`Error in handler ${handler.constructor.name}, handleChainError: ${err2}`);
              }
            }
          }, handler.awaitHandlers)));
        }
        async handleChainEnd(output) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreChain) {
              try {
                await handler.handleChainEnd?.(output, this.runId, this._parentRunId, this.tags);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleChainEnd: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
        }
        async handleAgentAction(action) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
              try {
                await handler.handleAgentAction?.(action, this.runId, this._parentRunId, this.tags);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleAgentAction: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
        }
        async handleAgentEnd(action) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
              try {
                await handler.handleAgentEnd?.(action, this.runId, this._parentRunId, this.tags);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleAgentEnd: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
        }
      };
      CallbackManagerForToolRun = class extends BaseRunManager {
        getChild(tag) {
          const manager = new CallbackManager(this.runId);
          manager.setHandlers(this.inheritableHandlers);
          manager.addTags(this.inheritableTags);
          manager.addMetadata(this.inheritableMetadata);
          if (tag) {
            manager.addTags([tag], false);
          }
          return manager;
        }
        async handleToolError(err) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
              try {
                await handler.handleToolError?.(err, this.runId, this._parentRunId, this.tags);
              } catch (err2) {
                console.error(`Error in handler ${handler.constructor.name}, handleToolError: ${err2}`);
              }
            }
          }, handler.awaitHandlers)));
        }
        async handleToolEnd(output) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
              try {
                await handler.handleToolEnd?.(output, this.runId, this._parentRunId, this.tags);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleToolEnd: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
        }
      };
      CallbackManager = class extends BaseCallbackManager {
        constructor(parentRunId) {
          super();
          Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "inheritableHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
          });
          Object.defineProperty(this, "inheritableTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
          });
          Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
          });
          Object.defineProperty(this, "inheritableMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "callback_manager"
          });
          Object.defineProperty(this, "_parentRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.handlers = [];
          this.inheritableHandlers = [];
          this._parentRunId = parentRunId;
        }
        async handleLLMStart(llm, prompts, _runId = void 0, _parentRunId = void 0, extraParams = void 0) {
          return Promise.all(prompts.map(async (prompt) => {
            const runId = v4_default();
            await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
              if (!handler.ignoreLLM) {
                try {
                  await handler.handleLLMStart?.(llm, [prompt], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                } catch (err) {
                  console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                }
              }
            }, handler.awaitHandlers)));
            return new CallbackManagerForLLMRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
          }));
        }
        async handleChatModelStart(llm, messages2, _runId = void 0, _parentRunId = void 0, extraParams = void 0) {
          return Promise.all(messages2.map(async (messageGroup) => {
            const runId = v4_default();
            await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
              if (!handler.ignoreLLM) {
                try {
                  if (handler.handleChatModelStart)
                    await handler.handleChatModelStart?.(llm, [messageGroup], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                  else if (handler.handleLLMStart) {
                    const messageString = getBufferString(messageGroup);
                    await handler.handleLLMStart?.(llm, [messageString], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                  }
                } catch (err) {
                  console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                }
              }
            }, handler.awaitHandlers)));
            return new CallbackManagerForLLMRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
          }));
        }
        async handleChainStart(chain, inputs, runId = v4_default()) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreChain) {
              try {
                await handler.handleChainStart?.(chain, inputs, runId, this._parentRunId, this.tags, this.metadata);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleChainStart: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
          return new CallbackManagerForChainRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }
        async handleToolStart(tool, input, runId = v4_default()) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
              try {
                await handler.handleToolStart?.(tool, input, runId, this._parentRunId, this.tags, this.metadata);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleToolStart: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
          return new CallbackManagerForToolRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }
        async handleRetrieverStart(retriever, query, runId = v4_default(), _parentRunId = void 0) {
          await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreRetriever) {
              try {
                await handler.handleRetrieverStart?.(retriever, query, runId, this._parentRunId, this.tags, this.metadata);
              } catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleRetrieverStart: ${err}`);
              }
            }
          }, handler.awaitHandlers)));
          return new CallbackManagerForRetrieverRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }
        addHandler(handler, inherit = true) {
          this.handlers.push(handler);
          if (inherit) {
            this.inheritableHandlers.push(handler);
          }
        }
        removeHandler(handler) {
          this.handlers = this.handlers.filter((_handler) => _handler !== handler);
          this.inheritableHandlers = this.inheritableHandlers.filter((_handler) => _handler !== handler);
        }
        setHandlers(handlers, inherit = true) {
          this.handlers = [];
          this.inheritableHandlers = [];
          for (const handler of handlers) {
            this.addHandler(handler, inherit);
          }
        }
        addTags(tags, inherit = true) {
          this.removeTags(tags);
          this.tags.push(...tags);
          if (inherit) {
            this.inheritableTags.push(...tags);
          }
        }
        removeTags(tags) {
          this.tags = this.tags.filter((tag) => !tags.includes(tag));
          this.inheritableTags = this.inheritableTags.filter((tag) => !tags.includes(tag));
        }
        addMetadata(metadata, inherit = true) {
          this.metadata = { ...this.metadata, ...metadata };
          if (inherit) {
            this.inheritableMetadata = { ...this.inheritableMetadata, ...metadata };
          }
        }
        removeMetadata(metadata) {
          for (const key of Object.keys(metadata)) {
            delete this.metadata[key];
            delete this.inheritableMetadata[key];
          }
        }
        copy(additionalHandlers = [], inherit = true) {
          const manager = new CallbackManager(this._parentRunId);
          for (const handler of this.handlers) {
            const inheritable = this.inheritableHandlers.includes(handler);
            manager.addHandler(handler, inheritable);
          }
          for (const tag of this.tags) {
            const inheritable = this.inheritableTags.includes(tag);
            manager.addTags([tag], inheritable);
          }
          for (const key of Object.keys(this.metadata)) {
            const inheritable = Object.keys(this.inheritableMetadata).includes(key);
            manager.addMetadata({ [key]: this.metadata[key] }, inheritable);
          }
          for (const handler of additionalHandlers) {
            if (manager.handlers.filter((h3) => h3.name === "console_callback_handler").some((h3) => h3.name === handler.name)) {
              continue;
            }
            manager.addHandler(handler, inherit);
          }
          return manager;
        }
        static fromHandlers(handlers) {
          class Handler extends BaseCallbackHandler {
            constructor() {
              super();
              Object.defineProperty(this, "name", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: v4_default()
              });
              Object.assign(this, handlers);
            }
          }
          const manager = new this();
          manager.addHandler(new Handler());
          return manager;
        }
        static async configure(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options) {
          let callbackManager;
          if (inheritableHandlers || localHandlers) {
            if (Array.isArray(inheritableHandlers) || !inheritableHandlers) {
              callbackManager = new CallbackManager();
              callbackManager.setHandlers(inheritableHandlers?.map(ensureHandler) ?? [], true);
            } else {
              callbackManager = inheritableHandlers;
            }
            callbackManager = callbackManager.copy(Array.isArray(localHandlers) ? localHandlers.map(ensureHandler) : localHandlers?.handlers, false);
          }
          const verboseEnabled = getEnvironmentVariable2("LANGCHAIN_VERBOSE") || options?.verbose;
          const tracingV2Enabled = getEnvironmentVariable2("LANGCHAIN_TRACING_V2") ?? false;
          const tracingEnabled = tracingV2Enabled || (getEnvironmentVariable2("LANGCHAIN_TRACING") ?? false);
          if (verboseEnabled || tracingEnabled) {
            if (!callbackManager) {
              callbackManager = new CallbackManager();
            }
            if (verboseEnabled && !callbackManager.handlers.some((handler) => handler.name === ConsoleCallbackHandler.prototype.name)) {
              const consoleHandler = new ConsoleCallbackHandler();
              callbackManager.addHandler(consoleHandler, true);
            }
            if (tracingEnabled && !callbackManager.handlers.some((handler) => handler.name === "langchain_tracer")) {
              if (tracingV2Enabled) {
                callbackManager.addHandler(await getTracingV2CallbackHandler(), true);
              } else {
                const session = getEnvironmentVariable2("LANGCHAIN_PROJECT") && getEnvironmentVariable2("LANGCHAIN_SESSION");
                callbackManager.addHandler(await getTracingCallbackHandler(session), true);
              }
            }
          }
          if (inheritableTags || localTags) {
            if (callbackManager) {
              callbackManager.addTags(inheritableTags ?? []);
              callbackManager.addTags(localTags ?? [], false);
            }
          }
          if (inheritableMetadata || localMetadata) {
            if (callbackManager) {
              callbackManager.addMetadata(inheritableMetadata ?? {});
              callbackManager.addMetadata(localMetadata ?? {}, false);
            }
          }
          return callbackManager;
        }
      };
    }
  });

  // node_modules/langchain/dist/util/async_caller.js
  var import_p_retry2, import_p_queue3, STATUS_NO_RETRY2, AsyncCaller2;
  var init_async_caller2 = __esm({
    "node_modules/langchain/dist/util/async_caller.js"() {
      import_p_retry2 = __toModule(require_p_retry());
      import_p_queue3 = __toModule(require_dist());
      STATUS_NO_RETRY2 = [
        400,
        401,
        403,
        404,
        405,
        406,
        407,
        408,
        409
      ];
      AsyncCaller2 = class {
        constructor(params) {
          Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.maxConcurrency = params.maxConcurrency ?? Infinity;
          this.maxRetries = params.maxRetries ?? 6;
          const PQueue = "default" in import_p_queue3.default ? import_p_queue3.default.default : import_p_queue3.default;
          this.queue = new PQueue({ concurrency: this.maxConcurrency });
        }
        call(callable, ...args) {
          return this.queue.add(() => (0, import_p_retry2.default)(() => callable(...args).catch((error) => {
            if (error instanceof Error) {
              throw error;
            } else {
              throw new Error(error);
            }
          }), {
            onFailedAttempt(error) {
              if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.message.startsWith("AbortError")) {
                throw error;
              }
              if (error?.code === "ECONNABORTED") {
                throw error;
              }
              const status = error?.response?.status;
              if (status && STATUS_NO_RETRY2.includes(+status)) {
                throw error;
              }
              const data = error?.response?.data;
              if (data?.error?.code === "insufficient_quota") {
                const error2 = new Error(data?.error?.message);
                error2.name = "InsufficientQuotaError";
                throw error2;
              }
            },
            retries: this.maxRetries,
            randomize: true
          }), { throwOnTimeout: true });
        }
        callWithOptions(options, callable, ...args) {
          if (options.signal) {
            return Promise.race([
              this.call(callable, ...args),
              new Promise((_2, reject) => {
                options.signal?.addEventListener("abort", () => {
                  reject(new Error("AbortError"));
                });
              })
            ]);
          }
          return this.call(callable, ...args);
        }
        fetch(...args) {
          return this.call(() => fetch(...args).then((res) => res.ok ? res : Promise.reject(res)));
        }
      };
    }
  });

  // node_modules/js-tiktoken/dist/chunk-XXPGZHWZ.js
  var __defProp2, __defNormalProp, __publicField;
  var init_chunk_XXPGZHWZ = __esm({
    "node_modules/js-tiktoken/dist/chunk-XXPGZHWZ.js"() {
      __defProp2 = Object.defineProperty;
      __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      __publicField = (obj, key, value) => {
        __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
        return value;
      };
    }
  });

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i3 = 0, len = code.length; i3 < len; ++i3) {
        lookup[i3] = code[i3];
        revLookup[code.charCodeAt(i3)] = i3;
      }
      var i3;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i4;
        for (i4 = 0; i4 < len2; i4 += 4) {
          tmp = revLookup[b64.charCodeAt(i4)] << 18 | revLookup[b64.charCodeAt(i4 + 1)] << 12 | revLookup[b64.charCodeAt(i4 + 2)] << 6 | revLookup[b64.charCodeAt(i4 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i4)] << 2 | revLookup[b64.charCodeAt(i4 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i4)] << 10 | revLookup[b64.charCodeAt(i4 + 1)] << 4 | revLookup[b64.charCodeAt(i4 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i4 = start; i4 < end; i4 += 3) {
          tmp = (uint8[i4] << 16 & 16711680) + (uint8[i4 + 1] << 8 & 65280) + (uint8[i4 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i4 = 0, len22 = len2 - extraBytes; i4 < len22; i4 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i4, i4 + maxChunkLength > len22 ? len22 : i4 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
        }
        return parts.join("");
      }
    }
  });

  // node_modules/js-tiktoken/dist/chunk-THGZSONF.js
  function bytePairMerge(piece, ranks) {
    let parts = Array.from({ length: piece.length }, (_2, i3) => ({ start: i3, end: i3 + 1 }));
    while (parts.length > 1) {
      let minRank = null;
      for (let i3 = 0; i3 < parts.length - 1; i3++) {
        const slice = piece.slice(parts[i3].start, parts[i3 + 1].end);
        const rank = ranks.get(slice.join(","));
        if (rank == null)
          continue;
        if (minRank == null || rank < minRank[0]) {
          minRank = [rank, i3];
        }
      }
      if (minRank != null) {
        const i3 = minRank[1];
        parts[i3] = { start: parts[i3].start, end: parts[i3 + 1].end };
        parts.splice(i3 + 1, 1);
      } else {
        break;
      }
    }
    return parts;
  }
  function bytePairEncode(piece, ranks) {
    if (piece.length === 1)
      return [ranks.get(piece.join(","))];
    return bytePairMerge(piece, ranks).map((p2) => ranks.get(piece.slice(p2.start, p2.end).join(","))).filter((x2) => x2 != null);
  }
  function escapeRegex(str) {
    return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  function getEncodingNameForModel(model) {
    switch (model) {
      case "gpt2": {
        return "gpt2";
      }
      case "code-cushman-001":
      case "code-cushman-002":
      case "code-davinci-001":
      case "code-davinci-002":
      case "cushman-codex":
      case "davinci-codex":
      case "text-davinci-002":
      case "text-davinci-003": {
        return "p50k_base";
      }
      case "code-davinci-edit-001":
      case "text-davinci-edit-001": {
        return "p50k_edit";
      }
      case "ada":
      case "babbage":
      case "code-search-ada-code-001":
      case "code-search-babbage-code-001":
      case "curie":
      case "davinci":
      case "text-ada-001":
      case "text-babbage-001":
      case "text-curie-001":
      case "text-davinci-001":
      case "text-search-ada-doc-001":
      case "text-search-babbage-doc-001":
      case "text-search-curie-doc-001":
      case "text-search-davinci-doc-001":
      case "text-similarity-ada-001":
      case "text-similarity-babbage-001":
      case "text-similarity-curie-001":
      case "text-similarity-davinci-001": {
        return "r50k_base";
      }
      case "gpt-3.5-turbo-16k-0613":
      case "gpt-3.5-turbo-16k":
      case "gpt-3.5-turbo-0613":
      case "gpt-3.5-turbo-0301":
      case "gpt-3.5-turbo":
      case "gpt-4-32k-0613":
      case "gpt-4-32k-0314":
      case "gpt-4-32k":
      case "gpt-4-0613":
      case "gpt-4-0314":
      case "gpt-4":
      case "text-embedding-ada-002": {
        return "cl100k_base";
      }
      default:
        throw new Error("Unknown model");
    }
  }
  var import_base64_js, _Tiktoken, Tiktoken;
  var init_chunk_THGZSONF = __esm({
    "node_modules/js-tiktoken/dist/chunk-THGZSONF.js"() {
      init_chunk_XXPGZHWZ();
      import_base64_js = __toModule(require_base64_js());
      _Tiktoken = class {
        specialTokens;
        inverseSpecialTokens;
        patStr;
        textEncoder = new TextEncoder();
        textDecoder = new TextDecoder("utf-8");
        rankMap = /* @__PURE__ */ new Map();
        textMap = /* @__PURE__ */ new Map();
        constructor(ranks, extendedSpecialTokens) {
          this.patStr = ranks.pat_str;
          const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x2) => {
            const [_2, offsetStr, ...tokens] = x2.split(" ");
            const offset = Number.parseInt(offsetStr, 10);
            tokens.forEach((token, i3) => memo[token] = offset + i3);
            return memo;
          }, {});
          for (const [token, rank] of Object.entries(uncompressed)) {
            const bytes = import_base64_js.default.toByteArray(token);
            this.rankMap.set(bytes.join(","), rank);
            this.textMap.set(rank, bytes);
          }
          this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
          this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {
            memo[rank] = this.textEncoder.encode(text);
            return memo;
          }, {});
        }
        encode(text, allowedSpecial = [], disallowedSpecial = "all") {
          const regexes = new RegExp(this.patStr, "ug");
          const specialRegex = _Tiktoken.specialTokenRegex(Object.keys(this.specialTokens));
          const ret = [];
          const allowedSpecialSet = new Set(allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial);
          const disallowedSpecialSet = new Set(disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter((x2) => !allowedSpecialSet.has(x2)) : disallowedSpecial);
          if (disallowedSpecialSet.size > 0) {
            const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
              ...disallowedSpecialSet
            ]);
            const specialMatch = text.match(disallowedSpecialRegex);
            if (specialMatch != null) {
              throw new Error(`The text contains a special token that is not allowed: ${specialMatch[0]}`);
            }
          }
          let start = 0;
          while (true) {
            let nextSpecial = null;
            let startFind = start;
            while (true) {
              specialRegex.lastIndex = startFind;
              nextSpecial = specialRegex.exec(text);
              if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
                break;
              startFind = nextSpecial.index + 1;
            }
            const end = nextSpecial?.index ?? text.length;
            for (const match of text.substring(start, end).matchAll(regexes)) {
              const piece = this.textEncoder.encode(match[0]);
              const token2 = this.rankMap.get(piece.join(","));
              if (token2 != null) {
                ret.push(token2);
                continue;
              }
              ret.push(...bytePairEncode(piece, this.rankMap));
            }
            if (nextSpecial == null)
              break;
            let token = this.specialTokens[nextSpecial[0]];
            ret.push(token);
            start = nextSpecial.index + nextSpecial[0].length;
          }
          return ret;
        }
        decode(tokens) {
          const res = [];
          let length = 0;
          for (let i22 = 0; i22 < tokens.length; ++i22) {
            const token = tokens[i22];
            const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
            if (bytes != null) {
              res.push(bytes);
              length += bytes.length;
            }
          }
          const mergedArray = new Uint8Array(length);
          let i3 = 0;
          for (const bytes of res) {
            mergedArray.set(bytes, i3);
            i3 += bytes.length;
          }
          return this.textDecoder.decode(mergedArray);
        }
      };
      Tiktoken = _Tiktoken;
      __publicField(Tiktoken, "specialTokenRegex", (tokens) => {
        return new RegExp(tokens.map((i3) => escapeRegex(i3)).join("|"), "g");
      });
    }
  });

  // node_modules/js-tiktoken/dist/lite.js
  var init_lite = __esm({
    "node_modules/js-tiktoken/dist/lite.js"() {
      init_chunk_THGZSONF();
      init_chunk_XXPGZHWZ();
    }
  });

  // node_modules/langchain/dist/util/tiktoken.js
  async function getEncoding(encoding, options) {
    if (!(encoding in cache)) {
      cache[encoding] = caller.fetch(`https://tiktoken.pages.dev/js/${encoding}.json`, {
        signal: options?.signal
      }).then((res) => res.json()).catch((e4) => {
        delete cache[encoding];
        throw e4;
      });
    }
    return new Tiktoken(await cache[encoding], options?.extendedSpecialTokens);
  }
  async function encodingForModel(model, options) {
    return getEncoding(getEncodingNameForModel(model), options);
  }
  var cache, caller;
  var init_tiktoken = __esm({
    "node_modules/langchain/dist/util/tiktoken.js"() {
      init_lite();
      init_async_caller2();
      cache = {};
      caller = /* @__PURE__ */ new AsyncCaller2({});
    }
  });

  // node_modules/langchain/dist/base_language/count_tokens.js
  var getModelNameForTiktoken;
  var init_count_tokens = __esm({
    "node_modules/langchain/dist/base_language/count_tokens.js"() {
      init_tiktoken();
      getModelNameForTiktoken = (modelName) => {
        if (modelName.startsWith("gpt-3.5-turbo-16k")) {
          return "gpt-3.5-turbo-16k";
        }
        if (modelName.startsWith("gpt-3.5-turbo-")) {
          return "gpt-3.5-turbo";
        }
        if (modelName.startsWith("gpt-4-32k")) {
          return "gpt-4-32k";
        }
        if (modelName.startsWith("gpt-4-")) {
          return "gpt-4";
        }
        return modelName;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/bind.js
  var require_bind = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/bind.js"(exports, module) {
      "use strict";
      module.exports = function bind2(fn, thisArg) {
        return function wrap2() {
          var args = new Array(arguments.length);
          for (var i3 = 0; i3 < args.length; i3++) {
            args[i3] = arguments[i3];
          }
          return fn.apply(thisArg, args);
        };
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/openai/node_modules/axios/lib/utils.js"(exports, module) {
      "use strict";
      var bind2 = require_bind();
      var toString4 = Object.prototype.toString;
      function isArray3(val) {
        return Array.isArray(val);
      }
      function isUndefined3(val) {
        return typeof val === "undefined";
      }
      function isBuffer2(val) {
        return val !== null && !isUndefined3(val) && val.constructor !== null && !isUndefined3(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
      }
      function isArrayBuffer2(val) {
        return toString4.call(val) === "[object ArrayBuffer]";
      }
      function isFormData3(val) {
        return toString4.call(val) === "[object FormData]";
      }
      function isArrayBufferView2(val) {
        var result;
        if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
          result = ArrayBuffer.isView(val);
        } else {
          result = val && val.buffer && isArrayBuffer2(val.buffer);
        }
        return result;
      }
      function isString2(val) {
        return typeof val === "string";
      }
      function isNumber2(val) {
        return typeof val === "number";
      }
      function isObject3(val) {
        return val !== null && typeof val === "object";
      }
      function isPlainObject2(val) {
        if (toString4.call(val) !== "[object Object]") {
          return false;
        }
        var prototype3 = Object.getPrototypeOf(val);
        return prototype3 === null || prototype3 === Object.prototype;
      }
      function isDate3(val) {
        return toString4.call(val) === "[object Date]";
      }
      function isFile2(val) {
        return toString4.call(val) === "[object File]";
      }
      function isBlob2(val) {
        return toString4.call(val) === "[object Blob]";
      }
      function isFunction2(val) {
        return toString4.call(val) === "[object Function]";
      }
      function isStream2(val) {
        return isObject3(val) && isFunction2(val.pipe);
      }
      function isURLSearchParams3(val) {
        return toString4.call(val) === "[object URLSearchParams]";
      }
      function trim2(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
      }
      function isStandardBrowserEnv3() {
        if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
          return false;
        }
        return typeof window !== "undefined" && typeof document !== "undefined";
      }
      function forEach3(obj, fn) {
        if (obj === null || typeof obj === "undefined") {
          return;
        }
        if (typeof obj !== "object") {
          obj = [obj];
        }
        if (isArray3(obj)) {
          for (var i3 = 0, l4 = obj.length; i3 < l4; i3++) {
            fn.call(null, obj[i3], i3, obj);
          }
        } else {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              fn.call(null, obj[key], key, obj);
            }
          }
        }
      }
      function merge2() {
        var result = {};
        function assignValue(val, key) {
          if (isPlainObject2(result[key]) && isPlainObject2(val)) {
            result[key] = merge2(result[key], val);
          } else if (isPlainObject2(val)) {
            result[key] = merge2({}, val);
          } else if (isArray3(val)) {
            result[key] = val.slice();
          } else {
            result[key] = val;
          }
        }
        for (var i3 = 0, l4 = arguments.length; i3 < l4; i3++) {
          forEach3(arguments[i3], assignValue);
        }
        return result;
      }
      function extend2(a3, b2, thisArg) {
        forEach3(b2, function assignValue(val, key) {
          if (thisArg && typeof val === "function") {
            a3[key] = bind2(val, thisArg);
          } else {
            a3[key] = val;
          }
        });
        return a3;
      }
      function stripBOM2(content) {
        if (content.charCodeAt(0) === 65279) {
          content = content.slice(1);
        }
        return content;
      }
      module.exports = {
        isArray: isArray3,
        isArrayBuffer: isArrayBuffer2,
        isBuffer: isBuffer2,
        isFormData: isFormData3,
        isArrayBufferView: isArrayBufferView2,
        isString: isString2,
        isNumber: isNumber2,
        isObject: isObject3,
        isPlainObject: isPlainObject2,
        isUndefined: isUndefined3,
        isDate: isDate3,
        isFile: isFile2,
        isBlob: isBlob2,
        isFunction: isFunction2,
        isStream: isStream2,
        isURLSearchParams: isURLSearchParams3,
        isStandardBrowserEnv: isStandardBrowserEnv3,
        forEach: forEach3,
        merge: merge2,
        extend: extend2,
        trim: trim2,
        stripBOM: stripBOM2
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/buildURL.js
  var require_buildURL = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      function encode4(val) {
        return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      }
      module.exports = function buildURL3(url, params, paramsSerializer) {
        if (!params) {
          return url;
        }
        var serializedParams;
        if (paramsSerializer) {
          serializedParams = paramsSerializer(params);
        } else if (utils.isURLSearchParams(params)) {
          serializedParams = params.toString();
        } else {
          var parts = [];
          utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === "undefined") {
              return;
            }
            if (utils.isArray(val)) {
              key = key + "[]";
            } else {
              val = [val];
            }
            utils.forEach(val, function parseValue(v2) {
              if (utils.isDate(v2)) {
                v2 = v2.toISOString();
              } else if (utils.isObject(v2)) {
                v2 = JSON.stringify(v2);
              }
              parts.push(encode4(key) + "=" + encode4(v2));
            });
          });
          serializedParams = parts.join("&");
        }
        if (serializedParams) {
          var hashmarkIndex = url.indexOf("#");
          if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
          }
          url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
        }
        return url;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/InterceptorManager.js
  var require_InterceptorManager = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      function InterceptorManager2() {
        this.handlers = [];
      }
      InterceptorManager2.prototype.use = function use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      };
      InterceptorManager2.prototype.eject = function eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      };
      InterceptorManager2.prototype.forEach = function forEach3(fn) {
        utils.forEach(this.handlers, function forEachHandler(h3) {
          if (h3 !== null) {
            fn(h3);
          }
        });
      };
      module.exports = InterceptorManager2;
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/normalizeHeaderName.js
  var require_normalizeHeaderName = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      module.exports = function normalizeHeaderName(headers, normalizedName) {
        utils.forEach(headers, function processHeader(value, name) {
          if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
          }
        });
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/enhanceError.js
  var require_enhanceError = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/enhanceError.js"(exports, module) {
      "use strict";
      module.exports = function enhanceError2(error, config, code, request, response) {
        error.config = config;
        if (code) {
          error.code = code;
        }
        error.request = request;
        error.response = response;
        error.isAxiosError = true;
        error.toJSON = function toJSON2() {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
          };
        };
        return error;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/defaults/transitional.js
  var require_transitional = __commonJS({
    "node_modules/openai/node_modules/axios/lib/defaults/transitional.js"(exports, module) {
      "use strict";
      module.exports = {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/createError.js
  var require_createError = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/createError.js"(exports, module) {
      "use strict";
      var enhanceError2 = require_enhanceError();
      module.exports = function createError2(message, config, code, request, response) {
        var error = new Error(message);
        return enhanceError2(error, config, code, request, response);
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/settle.js
  var require_settle = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/settle.js"(exports, module) {
      "use strict";
      var createError2 = require_createError();
      module.exports = function settle3(resolve, reject, response) {
        var validateStatus2 = response.config.validateStatus;
        if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
          resolve(response);
        } else {
          reject(createError2("Request failed with status code " + response.status, response.config, null, response.request, response));
        }
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/cookies.js
  var require_cookies = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/cookies.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv3() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
              cookie.push("expires=" + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
              cookie.push("path=" + path);
            }
            if (utils.isString(domain)) {
              cookie.push("domain=" + domain);
            }
            if (secure === true) {
              cookie.push("secure");
            }
            document.cookie = cookie.join("; ");
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
          },
          remove: function remove(name) {
            this.write(name, "", Date.now() - 864e5);
          }
        };
      }() : function nonStandardBrowserEnv3() {
        return {
          write: function write() {
          },
          read: function read() {
            return null;
          },
          remove: function remove() {
          }
        };
      }();
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/isAbsoluteURL.js
  var require_isAbsoluteURL = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
      "use strict";
      module.exports = function isAbsoluteURL3(url) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/combineURLs.js
  var require_combineURLs = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
      "use strict";
      module.exports = function combineURLs3(baseURL, relativeURL) {
        return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/buildFullPath.js
  var require_buildFullPath = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
      "use strict";
      var isAbsoluteURL3 = require_isAbsoluteURL();
      var combineURLs3 = require_combineURLs();
      module.exports = function buildFullPath3(baseURL, requestedURL) {
        if (baseURL && !isAbsoluteURL3(requestedURL)) {
          return combineURLs3(baseURL, requestedURL);
        }
        return requestedURL;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/parseHeaders.js
  var require_parseHeaders = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var ignoreDuplicateOf2 = [
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent"
      ];
      module.exports = function parseHeaders(headers) {
        var parsed = {};
        var key;
        var val;
        var i3;
        if (!headers) {
          return parsed;
        }
        utils.forEach(headers.split("\n"), function parser(line) {
          i3 = line.indexOf(":");
          key = utils.trim(line.substr(0, i3)).toLowerCase();
          val = utils.trim(line.substr(i3 + 1));
          if (key) {
            if (parsed[key] && ignoreDuplicateOf2.indexOf(key) >= 0) {
              return;
            }
            if (key === "set-cookie") {
              parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
            } else {
              parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }
          }
        });
        return parsed;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/isURLSameOrigin.js
  var require_isURLSameOrigin = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv3() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement("a");
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute("href", href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }() : function nonStandardBrowserEnv3() {
        return function isURLSameOrigin() {
          return true;
        };
      }();
    }
  });

  // node_modules/openai/node_modules/axios/lib/cancel/Cancel.js
  var require_Cancel = __commonJS({
    "node_modules/openai/node_modules/axios/lib/cancel/Cancel.js"(exports, module) {
      "use strict";
      function Cancel(message) {
        this.message = message;
      }
      Cancel.prototype.toString = function toString4() {
        return "Cancel" + (this.message ? ": " + this.message : "");
      };
      Cancel.prototype.__CANCEL__ = true;
      module.exports = Cancel;
    }
  });

  // node_modules/openai/node_modules/axios/lib/adapters/xhr.js
  var require_xhr = __commonJS({
    "node_modules/openai/node_modules/axios/lib/adapters/xhr.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var settle3 = require_settle();
      var cookies = require_cookies();
      var buildURL3 = require_buildURL();
      var buildFullPath3 = require_buildFullPath();
      var parseHeaders = require_parseHeaders();
      var isURLSameOrigin = require_isURLSameOrigin();
      var createError2 = require_createError();
      var transitionalDefaults = require_transitional();
      var Cancel = require_Cancel();
      module.exports = function xhrAdapter(config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
          var requestData = config.data;
          var requestHeaders = config.headers;
          var responseType = config.responseType;
          var onCanceled;
          function done() {
            if (config.cancelToken) {
              config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
              config.signal.removeEventListener("abort", onCanceled);
            }
          }
          if (utils.isFormData(requestData)) {
            delete requestHeaders["Content-Type"];
          }
          var request = new XMLHttpRequest();
          if (config.auth) {
            var username = config.auth.username || "";
            var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
            requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
          }
          var fullPath = buildFullPath3(config.baseURL, config.url);
          request.open(config.method.toUpperCase(), buildURL3(fullPath, config.params, config.paramsSerializer), true);
          request.timeout = config.timeout;
          function onloadend() {
            if (!request) {
              return;
            }
            var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
            var response = {
              data: responseData,
              status: request.status,
              statusText: request.statusText,
              headers: responseHeaders,
              config,
              request
            };
            settle3(function _resolve(value) {
              resolve(value);
              done();
            }, function _reject(err) {
              reject(err);
              done();
            }, response);
            request = null;
          }
          if ("onloadend" in request) {
            request.onloadend = onloadend;
          } else {
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }
              if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
                return;
              }
              setTimeout(onloadend);
            };
          }
          request.onabort = function handleAbort() {
            if (!request) {
              return;
            }
            reject(createError2("Request aborted", config, "ECONNABORTED", request));
            request = null;
          };
          request.onerror = function handleError() {
            reject(createError2("Network Error", config, null, request));
            request = null;
          };
          request.ontimeout = function handleTimeout() {
            var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
            var transitional2 = config.transitional || transitionalDefaults;
            if (config.timeoutErrorMessage) {
              timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(createError2(timeoutErrorMessage, config, transitional2.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
            request = null;
          };
          if (utils.isStandardBrowserEnv()) {
            var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
            if (xsrfValue) {
              requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
          }
          if ("setRequestHeader" in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
              if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
                delete requestHeaders[key];
              } else {
                request.setRequestHeader(key, val);
              }
            });
          }
          if (!utils.isUndefined(config.withCredentials)) {
            request.withCredentials = !!config.withCredentials;
          }
          if (responseType && responseType !== "json") {
            request.responseType = config.responseType;
          }
          if (typeof config.onDownloadProgress === "function") {
            request.addEventListener("progress", config.onDownloadProgress);
          }
          if (typeof config.onUploadProgress === "function" && request.upload) {
            request.upload.addEventListener("progress", config.onUploadProgress);
          }
          if (config.cancelToken || config.signal) {
            onCanceled = function(cancel) {
              if (!request) {
                return;
              }
              reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
              request.abort();
              request = null;
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
              config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
            }
          }
          if (!requestData) {
            requestData = null;
          }
          request.send(requestData);
        });
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/defaults/index.js
  var require_defaults = __commonJS({
    "node_modules/openai/node_modules/axios/lib/defaults/index.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var normalizeHeaderName = require_normalizeHeaderName();
      var enhanceError2 = require_enhanceError();
      var transitionalDefaults = require_transitional();
      var DEFAULT_CONTENT_TYPE2 = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      function setContentTypeIfUnset(headers, value) {
        if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
          headers["Content-Type"] = value;
        }
      }
      function getDefaultAdapter() {
        var adapter;
        if (typeof XMLHttpRequest !== "undefined") {
          adapter = require_xhr();
        } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
          adapter = require_xhr();
        }
        return adapter;
      }
      function stringifySafely2(rawValue, parser, encoder) {
        if (utils.isString(rawValue)) {
          try {
            (parser || JSON.parse)(rawValue);
            return utils.trim(rawValue);
          } catch (e4) {
            if (e4.name !== "SyntaxError") {
              throw e4;
            }
          }
        }
        return (encoder || JSON.stringify)(rawValue);
      }
      var defaults2 = {
        transitional: transitionalDefaults,
        adapter: getDefaultAdapter(),
        transformRequest: [function transformRequest2(data, headers) {
          normalizeHeaderName(headers, "Accept");
          normalizeHeaderName(headers, "Content-Type");
          if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
            return data;
          }
          if (utils.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
            return data.toString();
          }
          if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
            setContentTypeIfUnset(headers, "application/json");
            return stringifySafely2(data);
          }
          return data;
        }],
        transformResponse: [function transformResponse2(data) {
          var transitional2 = this.transitional || defaults2.transitional;
          var silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
          var forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
          var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
          if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
            try {
              return JSON.parse(data);
            } catch (e4) {
              if (strictJSONParsing) {
                if (e4.name === "SyntaxError") {
                  throw enhanceError2(e4, this, "E_JSON_PARSE");
                }
                throw e4;
              }
            }
          }
          return data;
        }],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        validateStatus: function validateStatus2(status) {
          return status >= 200 && status < 300;
        },
        headers: {
          common: {
            "Accept": "application/json, text/plain, */*"
          }
        }
      };
      utils.forEach(["delete", "get", "head"], function forEachMethodNoData3(method) {
        defaults2.headers[method] = {};
      });
      utils.forEach(["post", "put", "patch"], function forEachMethodWithData3(method) {
        defaults2.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE2);
      });
      module.exports = defaults2;
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/transformData.js
  var require_transformData = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/transformData.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var defaults2 = require_defaults();
      module.exports = function transformData2(data, headers, fns) {
        var context = this || defaults2;
        utils.forEach(fns, function transform(fn) {
          data = fn.call(context, data, headers);
        });
        return data;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/cancel/isCancel.js
  var require_isCancel = __commonJS({
    "node_modules/openai/node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
      "use strict";
      module.exports = function isCancel2(value) {
        return !!(value && value.__CANCEL__);
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/dispatchRequest.js
  var require_dispatchRequest = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var transformData2 = require_transformData();
      var isCancel2 = require_isCancel();
      var defaults2 = require_defaults();
      var Cancel = require_Cancel();
      function throwIfCancellationRequested2(config) {
        if (config.cancelToken) {
          config.cancelToken.throwIfRequested();
        }
        if (config.signal && config.signal.aborted) {
          throw new Cancel("canceled");
        }
      }
      module.exports = function dispatchRequest2(config) {
        throwIfCancellationRequested2(config);
        config.headers = config.headers || {};
        config.data = transformData2.call(config, config.data, config.headers, config.transformRequest);
        config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
        utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
          delete config.headers[method];
        });
        var adapter = config.adapter || defaults2.adapter;
        return adapter(config).then(function onAdapterResolution(response) {
          throwIfCancellationRequested2(config);
          response.data = transformData2.call(config, response.data, response.headers, config.transformResponse);
          return response;
        }, function onAdapterRejection(reason) {
          if (!isCancel2(reason)) {
            throwIfCancellationRequested2(config);
            if (reason && reason.response) {
              reason.response.data = transformData2.call(config, reason.response.data, reason.response.headers, config.transformResponse);
            }
          }
          return Promise.reject(reason);
        });
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/mergeConfig.js
  var require_mergeConfig = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      module.exports = function mergeConfig2(config1, config2) {
        config2 = config2 || {};
        var config = {};
        function getMergedValue(target, source) {
          if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
            return utils.merge(target, source);
          } else if (utils.isPlainObject(source)) {
            return utils.merge({}, source);
          } else if (utils.isArray(source)) {
            return source.slice();
          }
          return source;
        }
        function mergeDeepProperties(prop) {
          if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(config1[prop], config2[prop]);
          } else if (!utils.isUndefined(config1[prop])) {
            return getMergedValue(void 0, config1[prop]);
          }
        }
        function valueFromConfig2(prop) {
          if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(void 0, config2[prop]);
          }
        }
        function defaultToConfig2(prop) {
          if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(void 0, config2[prop]);
          } else if (!utils.isUndefined(config1[prop])) {
            return getMergedValue(void 0, config1[prop]);
          }
        }
        function mergeDirectKeys(prop) {
          if (prop in config2) {
            return getMergedValue(config1[prop], config2[prop]);
          } else if (prop in config1) {
            return getMergedValue(void 0, config1[prop]);
          }
        }
        var mergeMap = {
          "url": valueFromConfig2,
          "method": valueFromConfig2,
          "data": valueFromConfig2,
          "baseURL": defaultToConfig2,
          "transformRequest": defaultToConfig2,
          "transformResponse": defaultToConfig2,
          "paramsSerializer": defaultToConfig2,
          "timeout": defaultToConfig2,
          "timeoutMessage": defaultToConfig2,
          "withCredentials": defaultToConfig2,
          "adapter": defaultToConfig2,
          "responseType": defaultToConfig2,
          "xsrfCookieName": defaultToConfig2,
          "xsrfHeaderName": defaultToConfig2,
          "onUploadProgress": defaultToConfig2,
          "onDownloadProgress": defaultToConfig2,
          "decompress": defaultToConfig2,
          "maxContentLength": defaultToConfig2,
          "maxBodyLength": defaultToConfig2,
          "transport": defaultToConfig2,
          "httpAgent": defaultToConfig2,
          "httpsAgent": defaultToConfig2,
          "cancelToken": defaultToConfig2,
          "socketPath": defaultToConfig2,
          "responseEncoding": defaultToConfig2,
          "validateStatus": mergeDirectKeys
        };
        utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
          var merge2 = mergeMap[prop] || mergeDeepProperties;
          var configValue = merge2(prop);
          utils.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
        });
        return config;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/env/data.js
  var require_data = __commonJS({
    "node_modules/openai/node_modules/axios/lib/env/data.js"(exports, module) {
      module.exports = {
        "version": "0.26.1"
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/validator.js
  var require_validator = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/validator.js"(exports, module) {
      "use strict";
      var VERSION2 = require_data().version;
      var validators3 = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i3) {
        validators3[type] = function validator(thing) {
          return typeof thing === type || "a" + (i3 < 1 ? "n " : " ") + type;
        };
      });
      var deprecatedWarnings2 = {};
      validators3.transitional = function transitional2(validator, version, message) {
        function formatMessage(opt, desc) {
          return "[Axios v" + VERSION2 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
        }
        return function(value, opt, opts) {
          if (validator === false) {
            throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
          }
          if (version && !deprecatedWarnings2[opt]) {
            deprecatedWarnings2[opt] = true;
            console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
          }
          return validator ? validator(value, opt, opts) : true;
        };
      };
      function assertOptions2(options, schema, allowUnknown) {
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        var keys = Object.keys(options);
        var i3 = keys.length;
        while (i3-- > 0) {
          var opt = keys[i3];
          var validator = schema[opt];
          if (validator) {
            var value = options[opt];
            var result = value === void 0 || validator(value, opt, options);
            if (result !== true) {
              throw new TypeError("option " + opt + " must be " + result);
            }
            continue;
          }
          if (allowUnknown !== true) {
            throw Error("Unknown option " + opt);
          }
        }
      }
      module.exports = {
        assertOptions: assertOptions2,
        validators: validators3
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/core/Axios.js
  var require_Axios = __commonJS({
    "node_modules/openai/node_modules/axios/lib/core/Axios.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var buildURL3 = require_buildURL();
      var InterceptorManager2 = require_InterceptorManager();
      var dispatchRequest2 = require_dispatchRequest();
      var mergeConfig2 = require_mergeConfig();
      var validator = require_validator();
      var validators3 = validator.validators;
      function Axios2(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager2(),
          response: new InterceptorManager2()
        };
      }
      Axios2.prototype.request = function request(configOrUrl, config) {
        if (typeof configOrUrl === "string") {
          config = config || {};
          config.url = configOrUrl;
        } else {
          config = configOrUrl || {};
        }
        config = mergeConfig2(this.defaults, config);
        if (config.method) {
          config.method = config.method.toLowerCase();
        } else if (this.defaults.method) {
          config.method = this.defaults.method.toLowerCase();
        } else {
          config.method = "get";
        }
        var transitional2 = config.transitional;
        if (transitional2 !== void 0) {
          validator.assertOptions(transitional2, {
            silentJSONParsing: validators3.transitional(validators3.boolean),
            forcedJSONParsing: validators3.transitional(validators3.boolean),
            clarifyTimeoutError: validators3.transitional(validators3.boolean)
          }, false);
        }
        var requestInterceptorChain = [];
        var synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
            return;
          }
          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        var responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        var promise;
        if (!synchronousRequestInterceptors) {
          var chain = [dispatchRequest2, void 0];
          Array.prototype.unshift.apply(chain, requestInterceptorChain);
          chain = chain.concat(responseInterceptorChain);
          promise = Promise.resolve(config);
          while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
          }
          return promise;
        }
        var newConfig = config;
        while (requestInterceptorChain.length) {
          var onFulfilled = requestInterceptorChain.shift();
          var onRejected = requestInterceptorChain.shift();
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected(error);
            break;
          }
        }
        try {
          promise = dispatchRequest2(newConfig);
        } catch (error) {
          return Promise.reject(error);
        }
        while (responseInterceptorChain.length) {
          promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
        }
        return promise;
      };
      Axios2.prototype.getUri = function getUri(config) {
        config = mergeConfig2(this.defaults, config);
        return buildURL3(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
      };
      utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData3(method) {
        Axios2.prototype[method] = function(url, config) {
          return this.request(mergeConfig2(config || {}, {
            method,
            url,
            data: (config || {}).data
          }));
        };
      });
      utils.forEach(["post", "put", "patch"], function forEachMethodWithData3(method) {
        Axios2.prototype[method] = function(url, data, config) {
          return this.request(mergeConfig2(config || {}, {
            method,
            url,
            data
          }));
        };
      });
      module.exports = Axios2;
    }
  });

  // node_modules/openai/node_modules/axios/lib/cancel/CancelToken.js
  var require_CancelToken = __commonJS({
    "node_modules/openai/node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
      "use strict";
      var Cancel = require_Cancel();
      function CancelToken2(executor) {
        if (typeof executor !== "function") {
          throw new TypeError("executor must be a function.");
        }
        var resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });
        var token = this;
        this.promise.then(function(cancel) {
          if (!token._listeners)
            return;
          var i3;
          var l4 = token._listeners.length;
          for (i3 = 0; i3 < l4; i3++) {
            token._listeners[i3](cancel);
          }
          token._listeners = null;
        });
        this.promise.then = function(onfulfilled) {
          var _resolve;
          var promise = new Promise(function(resolve) {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);
          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };
          return promise;
        };
        executor(function cancel(message) {
          if (token.reason) {
            return;
          }
          token.reason = new Cancel(message);
          resolvePromise(token.reason);
        });
      }
      CancelToken2.prototype.throwIfRequested = function throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      };
      CancelToken2.prototype.subscribe = function subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }
        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      };
      CancelToken2.prototype.unsubscribe = function unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        var index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      };
      CancelToken2.source = function source() {
        var cancel;
        var token = new CancelToken2(function executor(c3) {
          cancel = c3;
        });
        return {
          token,
          cancel
        };
      };
      module.exports = CancelToken2;
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/spread.js
  var require_spread = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/spread.js"(exports, module) {
      "use strict";
      module.exports = function spread2(callback) {
        return function wrap2(arr) {
          return callback.apply(null, arr);
        };
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/helpers/isAxiosError.js
  var require_isAxiosError = __commonJS({
    "node_modules/openai/node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      module.exports = function isAxiosError2(payload) {
        return utils.isObject(payload) && payload.isAxiosError === true;
      };
    }
  });

  // node_modules/openai/node_modules/axios/lib/axios.js
  var require_axios = __commonJS({
    "node_modules/openai/node_modules/axios/lib/axios.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var bind2 = require_bind();
      var Axios2 = require_Axios();
      var mergeConfig2 = require_mergeConfig();
      var defaults2 = require_defaults();
      function createInstance2(defaultConfig) {
        var context = new Axios2(defaultConfig);
        var instance = bind2(Axios2.prototype.request, context);
        utils.extend(instance, Axios2.prototype, context);
        utils.extend(instance, context);
        instance.create = function create(instanceConfig) {
          return createInstance2(mergeConfig2(defaultConfig, instanceConfig));
        };
        return instance;
      }
      var axios2 = createInstance2(defaults2);
      axios2.Axios = Axios2;
      axios2.Cancel = require_Cancel();
      axios2.CancelToken = require_CancelToken();
      axios2.isCancel = require_isCancel();
      axios2.VERSION = require_data().version;
      axios2.all = function all2(promises) {
        return Promise.all(promises);
      };
      axios2.spread = require_spread();
      axios2.isAxiosError = require_isAxiosError();
      module.exports = axios2;
      module.exports.default = axios2;
    }
  });

  // node_modules/openai/node_modules/axios/index.js
  var require_axios2 = __commonJS({
    "node_modules/openai/node_modules/axios/index.js"(exports, module) {
      module.exports = require_axios();
    }
  });

  // node_modules/openai/dist/base.js
  var require_base = __commonJS({
    "node_modules/openai/dist/base.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = exports.BASE_PATH = void 0;
      var axios_1 = require_axios2();
      exports.BASE_PATH = "https://api.openai.com/v1".replace(/\/+$/, "");
      exports.COLLECTION_FORMATS = {
        csv: ",",
        ssv: " ",
        tsv: "	",
        pipes: "|"
      };
      var BaseAPI = class {
        constructor(configuration, basePath = exports.BASE_PATH, axios2 = axios_1.default) {
          this.basePath = basePath;
          this.axios = axios2;
          if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
          }
        }
      };
      exports.BaseAPI = BaseAPI;
      var RequiredError = class extends Error {
        constructor(field, msg) {
          super(msg);
          this.field = field;
          this.name = "RequiredError";
        }
      };
      exports.RequiredError = RequiredError;
    }
  });

  // node_modules/openai/dist/common.js
  var require_common = __commonJS({
    "node_modules/openai/dist/common.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P2, generator) {
        function adopt(value) {
          return value instanceof P2 ? value : new P2(function(resolve) {
            resolve(value);
          });
        }
        return new (P2 || (P2 = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e4) {
              reject(e4);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e4) {
              reject(e4);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createRequestFunction = exports.toPathString = exports.serializeDataIfNeeded = exports.setSearchParams = exports.setOAuthToObject = exports.setBearerAuthToObject = exports.setBasicAuthToObject = exports.setApiKeyToObject = exports.assertParamExists = exports.DUMMY_BASE_URL = void 0;
      var base_1 = require_base();
      exports.DUMMY_BASE_URL = "https://example.com";
      exports.assertParamExists = function(functionName, paramName, paramValue) {
        if (paramValue === null || paramValue === void 0) {
          throw new base_1.RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
        }
      };
      exports.setApiKeyToObject = function(object, keyParamName, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
          if (configuration && configuration.apiKey) {
            const localVarApiKeyValue = typeof configuration.apiKey === "function" ? yield configuration.apiKey(keyParamName) : yield configuration.apiKey;
            object[keyParamName] = localVarApiKeyValue;
          }
        });
      };
      exports.setBasicAuthToObject = function(object, configuration) {
        if (configuration && (configuration.username || configuration.password)) {
          object["auth"] = { username: configuration.username, password: configuration.password };
        }
      };
      exports.setBearerAuthToObject = function(object, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
          if (configuration && configuration.accessToken) {
            const accessToken = typeof configuration.accessToken === "function" ? yield configuration.accessToken() : yield configuration.accessToken;
            object["Authorization"] = "Bearer " + accessToken;
          }
        });
      };
      exports.setOAuthToObject = function(object, name, scopes, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
          if (configuration && configuration.accessToken) {
            const localVarAccessTokenValue = typeof configuration.accessToken === "function" ? yield configuration.accessToken(name, scopes) : yield configuration.accessToken;
            object["Authorization"] = "Bearer " + localVarAccessTokenValue;
          }
        });
      };
      function setFlattenedQueryParams(urlSearchParams, parameter, key = "") {
        if (parameter == null)
          return;
        if (typeof parameter === "object") {
          if (Array.isArray(parameter)) {
            parameter.forEach((item) => setFlattenedQueryParams(urlSearchParams, item, key));
          } else {
            Object.keys(parameter).forEach((currentKey) => setFlattenedQueryParams(urlSearchParams, parameter[currentKey], `${key}${key !== "" ? "." : ""}${currentKey}`));
          }
        } else {
          if (urlSearchParams.has(key)) {
            urlSearchParams.append(key, parameter);
          } else {
            urlSearchParams.set(key, parameter);
          }
        }
      }
      exports.setSearchParams = function(url, ...objects) {
        const searchParams = new URLSearchParams(url.search);
        setFlattenedQueryParams(searchParams, objects);
        url.search = searchParams.toString();
      };
      exports.serializeDataIfNeeded = function(value, requestOptions, configuration) {
        const nonString = typeof value !== "string";
        const needsSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers["Content-Type"]) : nonString;
        return needsSerialization ? JSON.stringify(value !== void 0 ? value : {}) : value || "";
      };
      exports.toPathString = function(url) {
        return url.pathname + url.search + url.hash;
      };
      exports.createRequestFunction = function(axiosArgs, globalAxios, BASE_PATH, configuration) {
        return (axios2 = globalAxios, basePath = BASE_PATH) => {
          const axiosRequestArgs = Object.assign(Object.assign({}, axiosArgs.options), { url: ((configuration === null || configuration === void 0 ? void 0 : configuration.basePath) || basePath) + axiosArgs.url });
          return axios2.request(axiosRequestArgs);
        };
      };
    }
  });

  // node_modules/openai/dist/api.js
  var require_api = __commonJS({
    "node_modules/openai/dist/api.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P2, generator) {
        function adopt(value) {
          return value instanceof P2 ? value : new P2(function(resolve) {
            resolve(value);
          });
        }
        return new (P2 || (P2 = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e4) {
              reject(e4);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e4) {
              reject(e4);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OpenAIApi = exports.OpenAIApiFactory = exports.OpenAIApiFp = exports.OpenAIApiAxiosParamCreator = exports.CreateImageRequestResponseFormatEnum = exports.CreateImageRequestSizeEnum = exports.ChatCompletionResponseMessageRoleEnum = exports.ChatCompletionRequestMessageRoleEnum = void 0;
      var axios_1 = require_axios2();
      var common_1 = require_common();
      var base_1 = require_base();
      exports.ChatCompletionRequestMessageRoleEnum = {
        System: "system",
        User: "user",
        Assistant: "assistant",
        Function: "function"
      };
      exports.ChatCompletionResponseMessageRoleEnum = {
        System: "system",
        User: "user",
        Assistant: "assistant",
        Function: "function"
      };
      exports.CreateImageRequestSizeEnum = {
        _256x256: "256x256",
        _512x512: "512x512",
        _1024x1024: "1024x1024"
      };
      exports.CreateImageRequestResponseFormatEnum = {
        Url: "url",
        B64Json: "b64_json"
      };
      exports.OpenAIApiAxiosParamCreator = function(configuration) {
        return {
          cancelFineTune: (fineTuneId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("cancelFineTune", "fineTuneId", fineTuneId);
            const localVarPath = `/fine-tunes/{fine_tune_id}/cancel`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createAnswer: (createAnswerRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createAnswer", "createAnswerRequest", createAnswerRequest);
            const localVarPath = `/answers`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createAnswerRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createChatCompletion: (createChatCompletionRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createChatCompletion", "createChatCompletionRequest", createChatCompletionRequest);
            const localVarPath = `/chat/completions`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createChatCompletionRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createClassification: (createClassificationRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createClassification", "createClassificationRequest", createClassificationRequest);
            const localVarPath = `/classifications`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createClassificationRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createCompletion: (createCompletionRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createCompletion", "createCompletionRequest", createCompletionRequest);
            const localVarPath = `/completions`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createCompletionRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createEdit: (createEditRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createEdit", "createEditRequest", createEditRequest);
            const localVarPath = `/edits`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEditRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createEmbedding: (createEmbeddingRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createEmbedding", "createEmbeddingRequest", createEmbeddingRequest);
            const localVarPath = `/embeddings`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEmbeddingRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createFile: (file, purpose, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createFile", "file", file);
            common_1.assertParamExists("createFile", "purpose", purpose);
            const localVarPath = `/files`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
            if (file !== void 0) {
              localVarFormParams.append("file", file);
            }
            if (purpose !== void 0) {
              localVarFormParams.append("purpose", purpose);
            }
            localVarHeaderParameter["Content-Type"] = "multipart/form-data";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createFineTune: (createFineTuneRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createFineTune", "createFineTuneRequest", createFineTuneRequest);
            const localVarPath = `/fine-tunes`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createFineTuneRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createImage: (createImageRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createImage", "createImageRequest", createImageRequest);
            const localVarPath = `/images/generations`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createImageRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createImageEdit: (image, prompt, mask, n5, size, responseFormat, user, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createImageEdit", "image", image);
            common_1.assertParamExists("createImageEdit", "prompt", prompt);
            const localVarPath = `/images/edits`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
            if (image !== void 0) {
              localVarFormParams.append("image", image);
            }
            if (mask !== void 0) {
              localVarFormParams.append("mask", mask);
            }
            if (prompt !== void 0) {
              localVarFormParams.append("prompt", prompt);
            }
            if (n5 !== void 0) {
              localVarFormParams.append("n", n5);
            }
            if (size !== void 0) {
              localVarFormParams.append("size", size);
            }
            if (responseFormat !== void 0) {
              localVarFormParams.append("response_format", responseFormat);
            }
            if (user !== void 0) {
              localVarFormParams.append("user", user);
            }
            localVarHeaderParameter["Content-Type"] = "multipart/form-data";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createImageVariation: (image, n5, size, responseFormat, user, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createImageVariation", "image", image);
            const localVarPath = `/images/variations`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
            if (image !== void 0) {
              localVarFormParams.append("image", image);
            }
            if (n5 !== void 0) {
              localVarFormParams.append("n", n5);
            }
            if (size !== void 0) {
              localVarFormParams.append("size", size);
            }
            if (responseFormat !== void 0) {
              localVarFormParams.append("response_format", responseFormat);
            }
            if (user !== void 0) {
              localVarFormParams.append("user", user);
            }
            localVarHeaderParameter["Content-Type"] = "multipart/form-data";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createModeration: (createModerationRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createModeration", "createModerationRequest", createModerationRequest);
            const localVarPath = `/moderations`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createModerationRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createSearch: (engineId, createSearchRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createSearch", "engineId", engineId);
            common_1.assertParamExists("createSearch", "createSearchRequest", createSearchRequest);
            const localVarPath = `/engines/{engine_id}/search`.replace(`{${"engine_id"}}`, encodeURIComponent(String(engineId)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter["Content-Type"] = "application/json";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createSearchRequest, localVarRequestOptions, configuration);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createTranscription: (file, model, prompt, responseFormat, temperature, language, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createTranscription", "file", file);
            common_1.assertParamExists("createTranscription", "model", model);
            const localVarPath = `/audio/transcriptions`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
            if (file !== void 0) {
              localVarFormParams.append("file", file);
            }
            if (model !== void 0) {
              localVarFormParams.append("model", model);
            }
            if (prompt !== void 0) {
              localVarFormParams.append("prompt", prompt);
            }
            if (responseFormat !== void 0) {
              localVarFormParams.append("response_format", responseFormat);
            }
            if (temperature !== void 0) {
              localVarFormParams.append("temperature", temperature);
            }
            if (language !== void 0) {
              localVarFormParams.append("language", language);
            }
            localVarHeaderParameter["Content-Type"] = "multipart/form-data";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          createTranslation: (file, model, prompt, responseFormat, temperature, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("createTranslation", "file", file);
            common_1.assertParamExists("createTranslation", "model", model);
            const localVarPath = `/audio/translations`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
            if (file !== void 0) {
              localVarFormParams.append("file", file);
            }
            if (model !== void 0) {
              localVarFormParams.append("model", model);
            }
            if (prompt !== void 0) {
              localVarFormParams.append("prompt", prompt);
            }
            if (responseFormat !== void 0) {
              localVarFormParams.append("response_format", responseFormat);
            }
            if (temperature !== void 0) {
              localVarFormParams.append("temperature", temperature);
            }
            localVarHeaderParameter["Content-Type"] = "multipart/form-data";
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          deleteFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("deleteFile", "fileId", fileId);
            const localVarPath = `/files/{file_id}`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          deleteModel: (model, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("deleteModel", "model", model);
            const localVarPath = `/models/{model}`.replace(`{${"model"}}`, encodeURIComponent(String(model)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          downloadFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("downloadFile", "fileId", fileId);
            const localVarPath = `/files/{file_id}/content`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          listEngines: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const localVarPath = `/engines`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          listFiles: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const localVarPath = `/files`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          listFineTuneEvents: (fineTuneId, stream, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("listFineTuneEvents", "fineTuneId", fineTuneId);
            const localVarPath = `/fine-tunes/{fine_tune_id}/events`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (stream !== void 0) {
              localVarQueryParameter["stream"] = stream;
            }
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          listFineTunes: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const localVarPath = `/fine-tunes`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          listModels: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const localVarPath = `/models`;
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          retrieveEngine: (engineId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("retrieveEngine", "engineId", engineId);
            const localVarPath = `/engines/{engine_id}`.replace(`{${"engine_id"}}`, encodeURIComponent(String(engineId)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          retrieveFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("retrieveFile", "fileId", fileId);
            const localVarPath = `/files/{file_id}`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          retrieveFineTune: (fineTuneId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("retrieveFineTune", "fineTuneId", fineTuneId);
            const localVarPath = `/fine-tunes/{fine_tune_id}`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          }),
          retrieveModel: (model, options = {}) => __awaiter(this, void 0, void 0, function* () {
            common_1.assertParamExists("retrieveModel", "model", model);
            const localVarPath = `/models/{model}`.replace(`{${"model"}}`, encodeURIComponent(String(model)));
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
              baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
              url: common_1.toPathString(localVarUrlObj),
              options: localVarRequestOptions
            };
          })
        };
      };
      exports.OpenAIApiFp = function(configuration) {
        const localVarAxiosParamCreator = exports.OpenAIApiAxiosParamCreator(configuration);
        return {
          cancelFineTune(fineTuneId, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.cancelFineTune(fineTuneId, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createAnswer(createAnswerRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createAnswer(createAnswerRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createChatCompletion(createChatCompletionRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createChatCompletion(createChatCompletionRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createClassification(createClassificationRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createClassification(createClassificationRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createCompletion(createCompletionRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createCompletion(createCompletionRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createEdit(createEditRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createEdit(createEditRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createEmbedding(createEmbeddingRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createEmbedding(createEmbeddingRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createFile(file, purpose, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createFile(file, purpose, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createFineTune(createFineTuneRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createFineTune(createFineTuneRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createImage(createImageRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createImage(createImageRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createImageEdit(image, prompt, mask, n5, size, responseFormat, user, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createImageEdit(image, prompt, mask, n5, size, responseFormat, user, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createImageVariation(image, n5, size, responseFormat, user, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createImageVariation(image, n5, size, responseFormat, user, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createModeration(createModerationRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createModeration(createModerationRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createSearch(engineId, createSearchRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createSearch(engineId, createSearchRequest, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createTranscription(file, model, prompt, responseFormat, temperature, language, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          createTranslation(file, model, prompt, responseFormat, temperature, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.createTranslation(file, model, prompt, responseFormat, temperature, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          deleteFile(fileId, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteFile(fileId, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          deleteModel(model, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteModel(model, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          downloadFile(fileId, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.downloadFile(fileId, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          listEngines(options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.listEngines(options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          listFiles(options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.listFiles(options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          listFineTuneEvents(fineTuneId, stream, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.listFineTuneEvents(fineTuneId, stream, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          listFineTunes(options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.listFineTunes(options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          listModels(options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.listModels(options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          retrieveEngine(engineId, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveEngine(engineId, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          retrieveFile(fileId, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveFile(fileId, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          retrieveFineTune(fineTuneId, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveFineTune(fineTuneId, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          },
          retrieveModel(model, options) {
            return __awaiter(this, void 0, void 0, function* () {
              const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveModel(model, options);
              return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
          }
        };
      };
      exports.OpenAIApiFactory = function(configuration, basePath, axios2) {
        const localVarFp = exports.OpenAIApiFp(configuration);
        return {
          cancelFineTune(fineTuneId, options) {
            return localVarFp.cancelFineTune(fineTuneId, options).then((request) => request(axios2, basePath));
          },
          createAnswer(createAnswerRequest, options) {
            return localVarFp.createAnswer(createAnswerRequest, options).then((request) => request(axios2, basePath));
          },
          createChatCompletion(createChatCompletionRequest, options) {
            return localVarFp.createChatCompletion(createChatCompletionRequest, options).then((request) => request(axios2, basePath));
          },
          createClassification(createClassificationRequest, options) {
            return localVarFp.createClassification(createClassificationRequest, options).then((request) => request(axios2, basePath));
          },
          createCompletion(createCompletionRequest, options) {
            return localVarFp.createCompletion(createCompletionRequest, options).then((request) => request(axios2, basePath));
          },
          createEdit(createEditRequest, options) {
            return localVarFp.createEdit(createEditRequest, options).then((request) => request(axios2, basePath));
          },
          createEmbedding(createEmbeddingRequest, options) {
            return localVarFp.createEmbedding(createEmbeddingRequest, options).then((request) => request(axios2, basePath));
          },
          createFile(file, purpose, options) {
            return localVarFp.createFile(file, purpose, options).then((request) => request(axios2, basePath));
          },
          createFineTune(createFineTuneRequest, options) {
            return localVarFp.createFineTune(createFineTuneRequest, options).then((request) => request(axios2, basePath));
          },
          createImage(createImageRequest, options) {
            return localVarFp.createImage(createImageRequest, options).then((request) => request(axios2, basePath));
          },
          createImageEdit(image, prompt, mask, n5, size, responseFormat, user, options) {
            return localVarFp.createImageEdit(image, prompt, mask, n5, size, responseFormat, user, options).then((request) => request(axios2, basePath));
          },
          createImageVariation(image, n5, size, responseFormat, user, options) {
            return localVarFp.createImageVariation(image, n5, size, responseFormat, user, options).then((request) => request(axios2, basePath));
          },
          createModeration(createModerationRequest, options) {
            return localVarFp.createModeration(createModerationRequest, options).then((request) => request(axios2, basePath));
          },
          createSearch(engineId, createSearchRequest, options) {
            return localVarFp.createSearch(engineId, createSearchRequest, options).then((request) => request(axios2, basePath));
          },
          createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
            return localVarFp.createTranscription(file, model, prompt, responseFormat, temperature, language, options).then((request) => request(axios2, basePath));
          },
          createTranslation(file, model, prompt, responseFormat, temperature, options) {
            return localVarFp.createTranslation(file, model, prompt, responseFormat, temperature, options).then((request) => request(axios2, basePath));
          },
          deleteFile(fileId, options) {
            return localVarFp.deleteFile(fileId, options).then((request) => request(axios2, basePath));
          },
          deleteModel(model, options) {
            return localVarFp.deleteModel(model, options).then((request) => request(axios2, basePath));
          },
          downloadFile(fileId, options) {
            return localVarFp.downloadFile(fileId, options).then((request) => request(axios2, basePath));
          },
          listEngines(options) {
            return localVarFp.listEngines(options).then((request) => request(axios2, basePath));
          },
          listFiles(options) {
            return localVarFp.listFiles(options).then((request) => request(axios2, basePath));
          },
          listFineTuneEvents(fineTuneId, stream, options) {
            return localVarFp.listFineTuneEvents(fineTuneId, stream, options).then((request) => request(axios2, basePath));
          },
          listFineTunes(options) {
            return localVarFp.listFineTunes(options).then((request) => request(axios2, basePath));
          },
          listModels(options) {
            return localVarFp.listModels(options).then((request) => request(axios2, basePath));
          },
          retrieveEngine(engineId, options) {
            return localVarFp.retrieveEngine(engineId, options).then((request) => request(axios2, basePath));
          },
          retrieveFile(fileId, options) {
            return localVarFp.retrieveFile(fileId, options).then((request) => request(axios2, basePath));
          },
          retrieveFineTune(fineTuneId, options) {
            return localVarFp.retrieveFineTune(fineTuneId, options).then((request) => request(axios2, basePath));
          },
          retrieveModel(model, options) {
            return localVarFp.retrieveModel(model, options).then((request) => request(axios2, basePath));
          }
        };
      };
      var OpenAIApi2 = class extends base_1.BaseAPI {
        cancelFineTune(fineTuneId, options) {
          return exports.OpenAIApiFp(this.configuration).cancelFineTune(fineTuneId, options).then((request) => request(this.axios, this.basePath));
        }
        createAnswer(createAnswerRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createAnswer(createAnswerRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createChatCompletion(createChatCompletionRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createChatCompletion(createChatCompletionRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createClassification(createClassificationRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createClassification(createClassificationRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createCompletion(createCompletionRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createCompletion(createCompletionRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createEdit(createEditRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createEdit(createEditRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createEmbedding(createEmbeddingRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createEmbedding(createEmbeddingRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createFile(file, purpose, options) {
          return exports.OpenAIApiFp(this.configuration).createFile(file, purpose, options).then((request) => request(this.axios, this.basePath));
        }
        createFineTune(createFineTuneRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createFineTune(createFineTuneRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createImage(createImageRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createImage(createImageRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createImageEdit(image, prompt, mask, n5, size, responseFormat, user, options) {
          return exports.OpenAIApiFp(this.configuration).createImageEdit(image, prompt, mask, n5, size, responseFormat, user, options).then((request) => request(this.axios, this.basePath));
        }
        createImageVariation(image, n5, size, responseFormat, user, options) {
          return exports.OpenAIApiFp(this.configuration).createImageVariation(image, n5, size, responseFormat, user, options).then((request) => request(this.axios, this.basePath));
        }
        createModeration(createModerationRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createModeration(createModerationRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createSearch(engineId, createSearchRequest, options) {
          return exports.OpenAIApiFp(this.configuration).createSearch(engineId, createSearchRequest, options).then((request) => request(this.axios, this.basePath));
        }
        createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
          return exports.OpenAIApiFp(this.configuration).createTranscription(file, model, prompt, responseFormat, temperature, language, options).then((request) => request(this.axios, this.basePath));
        }
        createTranslation(file, model, prompt, responseFormat, temperature, options) {
          return exports.OpenAIApiFp(this.configuration).createTranslation(file, model, prompt, responseFormat, temperature, options).then((request) => request(this.axios, this.basePath));
        }
        deleteFile(fileId, options) {
          return exports.OpenAIApiFp(this.configuration).deleteFile(fileId, options).then((request) => request(this.axios, this.basePath));
        }
        deleteModel(model, options) {
          return exports.OpenAIApiFp(this.configuration).deleteModel(model, options).then((request) => request(this.axios, this.basePath));
        }
        downloadFile(fileId, options) {
          return exports.OpenAIApiFp(this.configuration).downloadFile(fileId, options).then((request) => request(this.axios, this.basePath));
        }
        listEngines(options) {
          return exports.OpenAIApiFp(this.configuration).listEngines(options).then((request) => request(this.axios, this.basePath));
        }
        listFiles(options) {
          return exports.OpenAIApiFp(this.configuration).listFiles(options).then((request) => request(this.axios, this.basePath));
        }
        listFineTuneEvents(fineTuneId, stream, options) {
          return exports.OpenAIApiFp(this.configuration).listFineTuneEvents(fineTuneId, stream, options).then((request) => request(this.axios, this.basePath));
        }
        listFineTunes(options) {
          return exports.OpenAIApiFp(this.configuration).listFineTunes(options).then((request) => request(this.axios, this.basePath));
        }
        listModels(options) {
          return exports.OpenAIApiFp(this.configuration).listModels(options).then((request) => request(this.axios, this.basePath));
        }
        retrieveEngine(engineId, options) {
          return exports.OpenAIApiFp(this.configuration).retrieveEngine(engineId, options).then((request) => request(this.axios, this.basePath));
        }
        retrieveFile(fileId, options) {
          return exports.OpenAIApiFp(this.configuration).retrieveFile(fileId, options).then((request) => request(this.axios, this.basePath));
        }
        retrieveFineTune(fineTuneId, options) {
          return exports.OpenAIApiFp(this.configuration).retrieveFineTune(fineTuneId, options).then((request) => request(this.axios, this.basePath));
        }
        retrieveModel(model, options) {
          return exports.OpenAIApiFp(this.configuration).retrieveModel(model, options).then((request) => request(this.axios, this.basePath));
        }
      };
      exports.OpenAIApi = OpenAIApi2;
    }
  });

  // node_modules/openai/package.json
  var require_package = __commonJS({
    "node_modules/openai/package.json"(exports, module) {
      module.exports = {
        name: "openai",
        version: "3.3.0",
        description: "Node.js library for the OpenAI API",
        repository: {
          type: "git",
          url: "git@github.com:openai/openai-node.git"
        },
        keywords: [
          "openai",
          "open",
          "ai",
          "gpt-3",
          "gpt3"
        ],
        author: "OpenAI",
        license: "MIT",
        main: "./dist/index.js",
        types: "./dist/index.d.ts",
        scripts: {
          build: "tsc --outDir dist/"
        },
        dependencies: {
          axios: "^0.26.0",
          "form-data": "^4.0.0"
        },
        devDependencies: {
          "@types/node": "^12.11.5",
          typescript: "^3.6.4"
        }
      };
    }
  });

  // node_modules/form-data/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/form-data/lib/browser.js"(exports, module) {
      module.exports = typeof self == "object" ? self.FormData : window.FormData;
    }
  });

  // node_modules/openai/dist/configuration.js
  var require_configuration = __commonJS({
    "node_modules/openai/dist/configuration.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Configuration = void 0;
      var packageJson = require_package();
      var Configuration2 = class {
        constructor(param = {}) {
          this.apiKey = param.apiKey;
          this.organization = param.organization;
          this.username = param.username;
          this.password = param.password;
          this.accessToken = param.accessToken;
          this.basePath = param.basePath;
          this.baseOptions = param.baseOptions;
          this.formDataCtor = param.formDataCtor;
          if (!this.baseOptions) {
            this.baseOptions = {};
          }
          this.baseOptions.headers = Object.assign({ "User-Agent": `OpenAI/NodeJS/${packageJson.version}`, "Authorization": `Bearer ${this.apiKey}` }, this.baseOptions.headers);
          if (this.organization) {
            this.baseOptions.headers["OpenAI-Organization"] = this.organization;
          }
          if (!this.formDataCtor) {
            this.formDataCtor = require_browser();
          }
        }
        isJsonMime(mime) {
          const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
          return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
        }
      };
      exports.Configuration = Configuration2;
    }
  });

  // node_modules/openai/dist/index.js
  var require_dist2 = __commonJS({
    "node_modules/openai/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o5, m2, k2, k22) {
        if (k22 === void 0)
          k22 = k2;
        Object.defineProperty(o5, k22, { enumerable: true, get: function() {
          return m2[k2];
        } });
      } : function(o5, m2, k2, k22) {
        if (k22 === void 0)
          k22 = k2;
        o5[k22] = m2[k2];
      });
      var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
        for (var p2 in m2)
          if (p2 !== "default" && !exports2.hasOwnProperty(p2))
            __createBinding(exports2, m2, p2);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_api(), exports);
      __exportStar(require_configuration(), exports);
    }
  });

  // node_modules/axios/lib/helpers/bind.js
  function bind(fn, thisArg) {
    return function wrap2() {
      return fn.apply(thisArg, arguments);
    };
  }
  var init_bind = __esm({
    "node_modules/axios/lib/helpers/bind.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/utils.js
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i3;
    let l4;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i3 = 0, l4 = obj.length; i3 < l4; i3++) {
        fn.call(null, obj[i3], i3, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i3 = 0; i3 < len; i3++) {
        key = keys[i3];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i3 = keys.length;
    let _key;
    while (i3-- > 0) {
      _key = keys[i3];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i3 = 0, l4 = arguments.length; i3 < l4; i3++) {
      arguments[i3] && forEach(arguments[i3], assignValue);
    }
    return result;
  }
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  var toString2, getPrototypeOf, kindOf, kindOfTest, typeOfTest, isArray, isUndefined, isArrayBuffer, isString, isFunction, isNumber, isObject, isBoolean, isPlainObject, isDate, isFile, isBlob, isFileList, isStream, isFormData, isURLSearchParams, trim, _global, isContextDefined, extend, stripBOM, inherits, toFlatObject, endsWith, toArray2, isTypedArray, forEachEntry, matchAll, isHTMLForm, toCamelCase, hasOwnProperty, isRegExp, reduceDescriptors, freezeMethods, toObjectSet, noop, toFiniteNumber, ALPHA, DIGIT, ALPHABET, generateString, toJSONObject, isAsyncFn, isThenable, utils_default;
  var init_utils = __esm({
    "node_modules/axios/lib/utils.js"() {
      init_bind();
      "use strict";
      ({ toString: toString2 } = Object.prototype);
      ({ getPrototypeOf } = Object);
      kindOf = ((cache2) => (thing) => {
        const str = toString2.call(thing);
        return cache2[str] || (cache2[str] = str.slice(8, -1).toLowerCase());
      })(Object.create(null));
      kindOfTest = (type) => {
        type = type.toLowerCase();
        return (thing) => kindOf(thing) === type;
      };
      typeOfTest = (type) => (thing) => typeof thing === type;
      ({ isArray } = Array);
      isUndefined = typeOfTest("undefined");
      isArrayBuffer = kindOfTest("ArrayBuffer");
      isString = typeOfTest("string");
      isFunction = typeOfTest("function");
      isNumber = typeOfTest("number");
      isObject = (thing) => thing !== null && typeof thing === "object";
      isBoolean = (thing) => thing === true || thing === false;
      isPlainObject = (val) => {
        if (kindOf(val) !== "object") {
          return false;
        }
        const prototype3 = getPrototypeOf(val);
        return (prototype3 === null || prototype3 === Object.prototype || Object.getPrototypeOf(prototype3) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
      };
      isDate = kindOfTest("Date");
      isFile = kindOfTest("File");
      isBlob = kindOfTest("Blob");
      isFileList = kindOfTest("FileList");
      isStream = (val) => isObject(val) && isFunction(val.pipe);
      isFormData = (thing) => {
        let kind;
        return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
      };
      isURLSearchParams = kindOfTest("URLSearchParams");
      trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      _global = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
      })();
      isContextDefined = (context) => !isUndefined(context) && context !== _global;
      extend = (a3, b2, thisArg, { allOwnKeys } = {}) => {
        forEach(b2, (val, key) => {
          if (thisArg && isFunction(val)) {
            a3[key] = bind(val, thisArg);
          } else {
            a3[key] = val;
          }
        }, { allOwnKeys });
        return a3;
      };
      stripBOM = (content) => {
        if (content.charCodeAt(0) === 65279) {
          content = content.slice(1);
        }
        return content;
      };
      inherits = (constructor, superConstructor, props, descriptors2) => {
        constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
        constructor.prototype.constructor = constructor;
        Object.defineProperty(constructor, "super", {
          value: superConstructor.prototype
        });
        props && Object.assign(constructor.prototype, props);
      };
      toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
        let props;
        let i3;
        let prop;
        const merged = {};
        destObj = destObj || {};
        if (sourceObj == null)
          return destObj;
        do {
          props = Object.getOwnPropertyNames(sourceObj);
          i3 = props.length;
          while (i3-- > 0) {
            prop = props[i3];
            if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
              destObj[prop] = sourceObj[prop];
              merged[prop] = true;
            }
          }
          sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
        } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
        return destObj;
      };
      endsWith = (str, searchString, position) => {
        str = String(str);
        if (position === void 0 || position > str.length) {
          position = str.length;
        }
        position -= searchString.length;
        const lastIndex = str.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
      };
      toArray2 = (thing) => {
        if (!thing)
          return null;
        if (isArray(thing))
          return thing;
        let i3 = thing.length;
        if (!isNumber(i3))
          return null;
        const arr = new Array(i3);
        while (i3-- > 0) {
          arr[i3] = thing[i3];
        }
        return arr;
      };
      isTypedArray = ((TypedArray) => {
        return (thing) => {
          return TypedArray && thing instanceof TypedArray;
        };
      })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
      forEachEntry = (obj, fn) => {
        const generator = obj && obj[Symbol.iterator];
        const iterator = generator.call(obj);
        let result;
        while ((result = iterator.next()) && !result.done) {
          const pair = result.value;
          fn.call(obj, pair[0], pair[1]);
        }
      };
      matchAll = (regExp, str) => {
        let matches;
        const arr = [];
        while ((matches = regExp.exec(str)) !== null) {
          arr.push(matches);
        }
        return arr;
      };
      isHTMLForm = kindOfTest("HTMLFormElement");
      toCamelCase = (str) => {
        return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m2, p1, p2) {
          return p1.toUpperCase() + p2;
        });
      };
      hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
      isRegExp = kindOfTest("RegExp");
      reduceDescriptors = (obj, reducer) => {
        const descriptors2 = Object.getOwnPropertyDescriptors(obj);
        const reducedDescriptors = {};
        forEach(descriptors2, (descriptor, name) => {
          if (reducer(descriptor, name, obj) !== false) {
            reducedDescriptors[name] = descriptor;
          }
        });
        Object.defineProperties(obj, reducedDescriptors);
      };
      freezeMethods = (obj) => {
        reduceDescriptors(obj, (descriptor, name) => {
          if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
            return false;
          }
          const value = obj[name];
          if (!isFunction(value))
            return;
          descriptor.enumerable = false;
          if ("writable" in descriptor) {
            descriptor.writable = false;
            return;
          }
          if (!descriptor.set) {
            descriptor.set = () => {
              throw Error("Can not rewrite read-only method '" + name + "'");
            };
          }
        });
      };
      toObjectSet = (arrayOrString, delimiter) => {
        const obj = {};
        const define = (arr) => {
          arr.forEach((value) => {
            obj[value] = true;
          });
        };
        isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
        return obj;
      };
      noop = () => {
      };
      toFiniteNumber = (value, defaultValue) => {
        value = +value;
        return Number.isFinite(value) ? value : defaultValue;
      };
      ALPHA = "abcdefghijklmnopqrstuvwxyz";
      DIGIT = "0123456789";
      ALPHABET = {
        DIGIT,
        ALPHA,
        ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
      };
      generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
        let str = "";
        const { length } = alphabet;
        while (size--) {
          str += alphabet[Math.random() * length | 0];
        }
        return str;
      };
      toJSONObject = (obj) => {
        const stack = new Array(10);
        const visit = (source, i3) => {
          if (isObject(source)) {
            if (stack.indexOf(source) >= 0) {
              return;
            }
            if (!("toJSON" in source)) {
              stack[i3] = source;
              const target = isArray(source) ? [] : {};
              forEach(source, (value, key) => {
                const reducedValue = visit(value, i3 + 1);
                !isUndefined(reducedValue) && (target[key] = reducedValue);
              });
              stack[i3] = void 0;
              return target;
            }
          }
          return source;
        };
        return visit(obj, 0);
      };
      isAsyncFn = kindOfTest("AsyncFunction");
      isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
      utils_default = {
        isArray,
        isArrayBuffer,
        isBuffer,
        isFormData,
        isArrayBufferView,
        isString,
        isNumber,
        isBoolean,
        isObject,
        isPlainObject,
        isUndefined,
        isDate,
        isFile,
        isBlob,
        isRegExp,
        isFunction,
        isStream,
        isURLSearchParams,
        isTypedArray,
        isFileList,
        forEach,
        merge,
        extend,
        trim,
        stripBOM,
        inherits,
        toFlatObject,
        kindOf,
        kindOfTest,
        endsWith,
        toArray: toArray2,
        forEachEntry,
        matchAll,
        isHTMLForm,
        hasOwnProperty,
        hasOwnProp: hasOwnProperty,
        reduceDescriptors,
        freezeMethods,
        toObjectSet,
        toCamelCase,
        noop,
        toFiniteNumber,
        findKey,
        global: _global,
        isContextDefined,
        ALPHABET,
        generateString,
        isSpecCompliantForm,
        toJSONObject,
        isAsyncFn,
        isThenable
      };
    }
  });

  // node_modules/axios/lib/core/AxiosError.js
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
  var prototype, descriptors, AxiosError_default;
  var init_AxiosError = __esm({
    "node_modules/axios/lib/core/AxiosError.js"() {
      init_utils();
      "use strict";
      utils_default.inherits(AxiosError, Error, {
        toJSON: function toJSON() {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: utils_default.toJSONObject(this.config),
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
          };
        }
      });
      prototype = AxiosError.prototype;
      descriptors = {};
      [
        "ERR_BAD_OPTION_VALUE",
        "ERR_BAD_OPTION",
        "ECONNABORTED",
        "ETIMEDOUT",
        "ERR_NETWORK",
        "ERR_FR_TOO_MANY_REDIRECTS",
        "ERR_DEPRECATED",
        "ERR_BAD_RESPONSE",
        "ERR_BAD_REQUEST",
        "ERR_CANCELED",
        "ERR_NOT_SUPPORT",
        "ERR_INVALID_URL"
      ].forEach((code) => {
        descriptors[code] = { value: code };
      });
      Object.defineProperties(AxiosError, descriptors);
      Object.defineProperty(prototype, "isAxiosError", { value: true });
      AxiosError.from = (error, code, config, request, response, customProps) => {
        const axiosError = Object.create(prototype);
        utils_default.toFlatObject(error, axiosError, function filter2(obj) {
          return obj !== Error.prototype;
        }, (prop) => {
          return prop !== "isAxiosError";
        });
        AxiosError.call(axiosError, error.message, code, config, request, response);
        axiosError.cause = error;
        axiosError.name = error.name;
        customProps && Object.assign(axiosError, customProps);
        return axiosError;
      };
      AxiosError_default = AxiosError;
    }
  });

  // node_modules/axios/lib/helpers/null.js
  var null_default;
  var init_null = __esm({
    "node_modules/axios/lib/helpers/null.js"() {
      null_default = null;
    }
  });

  // node_modules/axios/lib/helpers/toFormData.js
  function isVisitable(thing) {
    return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
  }
  function removeBrackets(key) {
    return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path)
      return key;
    return path.concat(key).map(function each(token, i3) {
      token = removeBrackets(token);
      return !dots && i3 ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils_default.isArray(arr) && !arr.some(isVisitable);
  }
  function toFormData(obj, formData, options) {
    if (!utils_default.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new (null_default || FormData)();
    options = utils_default.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils_default.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
    if (!utils_default.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null)
        return "";
      if (utils_default.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils_default.isBlob(value)) {
        throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
      }
      if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils_default.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils_default.isUndefined(value))
        return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils_default.forEach(value, function each(el, key) {
        const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers);
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils_default.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  var predicates, toFormData_default;
  var init_toFormData = __esm({
    "node_modules/axios/lib/helpers/toFormData.js"() {
      init_utils();
      init_AxiosError();
      init_null();
      "use strict";
      predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
        return /^is[A-Z]/.test(prop);
      });
      toFormData_default = toFormData;
    }
  });

  // node_modules/axios/lib/helpers/AxiosURLSearchParams.js
  function encode(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData_default(params, this, options);
  }
  var prototype2, AxiosURLSearchParams_default;
  var init_AxiosURLSearchParams = __esm({
    "node_modules/axios/lib/helpers/AxiosURLSearchParams.js"() {
      init_toFormData();
      "use strict";
      prototype2 = AxiosURLSearchParams.prototype;
      prototype2.append = function append(name, value) {
        this._pairs.push([name, value]);
      };
      prototype2.toString = function toString3(encoder) {
        const _encode = encoder ? function(value) {
          return encoder.call(this, value, encode);
        } : encode;
        return this._pairs.map(function each(pair) {
          return _encode(pair[0]) + "=" + _encode(pair[1]);
        }, "").join("&");
      };
      AxiosURLSearchParams_default = AxiosURLSearchParams;
    }
  });

  // node_modules/axios/lib/helpers/buildURL.js
  function encode2(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode2;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  var init_buildURL = __esm({
    "node_modules/axios/lib/helpers/buildURL.js"() {
      init_utils();
      init_AxiosURLSearchParams();
      "use strict";
    }
  });

  // node_modules/axios/lib/core/InterceptorManager.js
  var InterceptorManager, InterceptorManager_default;
  var init_InterceptorManager = __esm({
    "node_modules/axios/lib/core/InterceptorManager.js"() {
      init_utils();
      "use strict";
      InterceptorManager = class {
        constructor() {
          this.handlers = [];
        }
        use(fulfilled, rejected, options) {
          this.handlers.push({
            fulfilled,
            rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
          });
          return this.handlers.length - 1;
        }
        eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null;
          }
        }
        clear() {
          if (this.handlers) {
            this.handlers = [];
          }
        }
        forEach(fn) {
          utils_default.forEach(this.handlers, function forEachHandler(h3) {
            if (h3 !== null) {
              fn(h3);
            }
          });
        }
      };
      InterceptorManager_default = InterceptorManager;
    }
  });

  // node_modules/axios/lib/defaults/transitional.js
  var transitional_default;
  var init_transitional = __esm({
    "node_modules/axios/lib/defaults/transitional.js"() {
      "use strict";
      transitional_default = {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      };
    }
  });

  // node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
  var URLSearchParams_default;
  var init_URLSearchParams = __esm({
    "node_modules/axios/lib/platform/browser/classes/URLSearchParams.js"() {
      init_AxiosURLSearchParams();
      "use strict";
      URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;
    }
  });

  // node_modules/axios/lib/platform/browser/classes/FormData.js
  var FormData_default;
  var init_FormData = __esm({
    "node_modules/axios/lib/platform/browser/classes/FormData.js"() {
      "use strict";
      FormData_default = typeof FormData !== "undefined" ? FormData : null;
    }
  });

  // node_modules/axios/lib/platform/browser/classes/Blob.js
  var Blob_default;
  var init_Blob = __esm({
    "node_modules/axios/lib/platform/browser/classes/Blob.js"() {
      "use strict";
      Blob_default = typeof Blob !== "undefined" ? Blob : null;
    }
  });

  // node_modules/axios/lib/platform/browser/index.js
  var isStandardBrowserEnv, isStandardBrowserWebWorkerEnv, browser_default;
  var init_browser = __esm({
    "node_modules/axios/lib/platform/browser/index.js"() {
      init_URLSearchParams();
      init_FormData();
      init_Blob();
      isStandardBrowserEnv = (() => {
        let product;
        if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
          return false;
        }
        return typeof window !== "undefined" && typeof document !== "undefined";
      })();
      isStandardBrowserWebWorkerEnv = (() => {
        return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
      })();
      browser_default = {
        isBrowser: true,
        classes: {
          URLSearchParams: URLSearchParams_default,
          FormData: FormData_default,
          Blob: Blob_default
        },
        isStandardBrowserEnv,
        isStandardBrowserWebWorkerEnv,
        protocols: ["http", "https", "file", "blob", "url", "data"]
      };
    }
  });

  // node_modules/axios/lib/platform/index.js
  var init_platform = __esm({
    "node_modules/axios/lib/platform/index.js"() {
      init_browser();
    }
  });

  // node_modules/axios/lib/helpers/toURLEncodedForm.js
  function toURLEncodedForm(data, options) {
    return toFormData_default(data, new browser_default.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (browser_default.isNode && utils_default.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }
  var init_toURLEncodedForm = __esm({
    "node_modules/axios/lib/helpers/toURLEncodedForm.js"() {
      init_utils();
      init_toFormData();
      init_platform();
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/formDataToJSON.js
  function parsePropPath(name) {
    return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i3;
    const len = keys.length;
    let key;
    for (i3 = 0; i3 < len; i3++) {
      key = keys[i3];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils_default.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils_default.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils_default.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils_default.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
      const obj = {};
      utils_default.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  var formDataToJSON_default;
  var init_formDataToJSON = __esm({
    "node_modules/axios/lib/helpers/formDataToJSON.js"() {
      init_utils();
      "use strict";
      formDataToJSON_default = formDataToJSON;
    }
  });

  // node_modules/axios/lib/defaults/index.js
  function stringifySafely(rawValue, parser, encoder) {
    if (utils_default.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils_default.trim(rawValue);
      } catch (e4) {
        if (e4.name !== "SyntaxError") {
          throw e4;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var DEFAULT_CONTENT_TYPE, defaults, defaults_default;
  var init_defaults = __esm({
    "node_modules/axios/lib/defaults/index.js"() {
      init_utils();
      init_AxiosError();
      init_transitional();
      init_toFormData();
      init_toURLEncodedForm();
      init_platform();
      init_formDataToJSON();
      "use strict";
      DEFAULT_CONTENT_TYPE = {
        "Content-Type": void 0
      };
      defaults = {
        transitional: transitional_default,
        adapter: ["xhr", "http"],
        transformRequest: [function transformRequest(data, headers) {
          const contentType = headers.getContentType() || "";
          const hasJSONContentType = contentType.indexOf("application/json") > -1;
          const isObjectPayload = utils_default.isObject(data);
          if (isObjectPayload && utils_default.isHTMLForm(data)) {
            data = new FormData(data);
          }
          const isFormData3 = utils_default.isFormData(data);
          if (isFormData3) {
            if (!hasJSONContentType) {
              return data;
            }
            return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
          }
          if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data)) {
            return data;
          }
          if (utils_default.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils_default.isURLSearchParams(data)) {
            headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
            return data.toString();
          }
          let isFileList2;
          if (isObjectPayload) {
            if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
              return toURLEncodedForm(data, this.formSerializer).toString();
            }
            if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
              const _FormData = this.env && this.env.FormData;
              return toFormData_default(isFileList2 ? { "files[]": data } : data, _FormData && new _FormData(), this.formSerializer);
            }
          }
          if (isObjectPayload || hasJSONContentType) {
            headers.setContentType("application/json", false);
            return stringifySafely(data);
          }
          return data;
        }],
        transformResponse: [function transformResponse(data) {
          const transitional2 = this.transitional || defaults.transitional;
          const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
          const JSONRequested = this.responseType === "json";
          if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
            const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
            const strictJSONParsing = !silentJSONParsing && JSONRequested;
            try {
              return JSON.parse(data);
            } catch (e4) {
              if (strictJSONParsing) {
                if (e4.name === "SyntaxError") {
                  throw AxiosError_default.from(e4, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
                }
                throw e4;
              }
            }
          }
          return data;
        }],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: browser_default.classes.FormData,
          Blob: browser_default.classes.Blob
        },
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 300;
        },
        headers: {
          common: {
            "Accept": "application/json, text/plain, */*"
          }
        }
      };
      utils_default.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
        defaults.headers[method] = {};
      });
      utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
        defaults.headers[method] = utils_default.merge(DEFAULT_CONTENT_TYPE);
      });
      defaults_default = defaults;
    }
  });

  // node_modules/axios/lib/helpers/parseHeaders.js
  var ignoreDuplicateOf, parseHeaders_default;
  var init_parseHeaders = __esm({
    "node_modules/axios/lib/helpers/parseHeaders.js"() {
      init_utils();
      "use strict";
      ignoreDuplicateOf = utils_default.toObjectSet([
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent"
      ]);
      parseHeaders_default = (rawHeaders) => {
        const parsed = {};
        let key;
        let val;
        let i3;
        rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
          i3 = line.indexOf(":");
          key = line.substring(0, i3).trim().toLowerCase();
          val = line.substring(i3 + 1).trim();
          if (!key || parsed[key] && ignoreDuplicateOf[key]) {
            return;
          }
          if (key === "set-cookie") {
            if (parsed[key]) {
              parsed[key].push(val);
            } else {
              parsed[key] = [val];
            }
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        });
        return parsed;
      };
    }
  });

  // node_modules/axios/lib/core/AxiosHeaders.js
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
    if (utils_default.isFunction(filter2)) {
      return filter2.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils_default.isString(value))
      return;
    if (utils_default.isString(filter2)) {
      return value.indexOf(filter2) !== -1;
    }
    if (utils_default.isRegExp(filter2)) {
      return filter2.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils_default.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  var $internals, isValidHeaderName, AxiosHeaders, AxiosHeaders_default;
  var init_AxiosHeaders = __esm({
    "node_modules/axios/lib/core/AxiosHeaders.js"() {
      init_utils();
      init_parseHeaders();
      "use strict";
      $internals = Symbol("internals");
      isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
      AxiosHeaders = class {
        constructor(headers) {
          headers && this.set(headers);
        }
        set(header, valueOrRewrite, rewrite) {
          const self2 = this;
          function setHeader(_value, _header, _rewrite) {
            const lHeader = normalizeHeader(_header);
            if (!lHeader) {
              throw new Error("header name must be a non-empty string");
            }
            const key = utils_default.findKey(self2, lHeader);
            if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
              self2[key || _header] = normalizeValue(_value);
            }
          }
          const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
          if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
            setHeaders(header, valueOrRewrite);
          } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
            setHeaders(parseHeaders_default(header), valueOrRewrite);
          } else {
            header != null && setHeader(valueOrRewrite, header, rewrite);
          }
          return this;
        }
        get(header, parser) {
          header = normalizeHeader(header);
          if (header) {
            const key = utils_default.findKey(this, header);
            if (key) {
              const value = this[key];
              if (!parser) {
                return value;
              }
              if (parser === true) {
                return parseTokens(value);
              }
              if (utils_default.isFunction(parser)) {
                return parser.call(this, value, key);
              }
              if (utils_default.isRegExp(parser)) {
                return parser.exec(value);
              }
              throw new TypeError("parser must be boolean|regexp|function");
            }
          }
        }
        has(header, matcher) {
          header = normalizeHeader(header);
          if (header) {
            const key = utils_default.findKey(this, header);
            return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
          }
          return false;
        }
        delete(header, matcher) {
          const self2 = this;
          let deleted = false;
          function deleteHeader(_header) {
            _header = normalizeHeader(_header);
            if (_header) {
              const key = utils_default.findKey(self2, _header);
              if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
                delete self2[key];
                deleted = true;
              }
            }
          }
          if (utils_default.isArray(header)) {
            header.forEach(deleteHeader);
          } else {
            deleteHeader(header);
          }
          return deleted;
        }
        clear(matcher) {
          const keys = Object.keys(this);
          let i3 = keys.length;
          let deleted = false;
          while (i3--) {
            const key = keys[i3];
            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
              delete this[key];
              deleted = true;
            }
          }
          return deleted;
        }
        normalize(format) {
          const self2 = this;
          const headers = {};
          utils_default.forEach(this, (value, header) => {
            const key = utils_default.findKey(headers, header);
            if (key) {
              self2[key] = normalizeValue(value);
              delete self2[header];
              return;
            }
            const normalized = format ? formatHeader(header) : String(header).trim();
            if (normalized !== header) {
              delete self2[header];
            }
            self2[normalized] = normalizeValue(value);
            headers[normalized] = true;
          });
          return this;
        }
        concat(...targets) {
          return this.constructor.concat(this, ...targets);
        }
        toJSON(asStrings) {
          const obj = Object.create(null);
          utils_default.forEach(this, (value, header) => {
            value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
          });
          return obj;
        }
        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
        toString() {
          return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
        }
        get [Symbol.toStringTag]() {
          return "AxiosHeaders";
        }
        static from(thing) {
          return thing instanceof this ? thing : new this(thing);
        }
        static concat(first, ...targets) {
          const computed = new this(first);
          targets.forEach((target) => computed.set(target));
          return computed;
        }
        static accessor(header) {
          const internals = this[$internals] = this[$internals] = {
            accessors: {}
          };
          const accessors = internals.accessors;
          const prototype3 = this.prototype;
          function defineAccessor(_header) {
            const lHeader = normalizeHeader(_header);
            if (!accessors[lHeader]) {
              buildAccessors(prototype3, _header);
              accessors[lHeader] = true;
            }
          }
          utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
          return this;
        }
      };
      AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
      utils_default.freezeMethods(AxiosHeaders.prototype);
      utils_default.freezeMethods(AxiosHeaders);
      AxiosHeaders_default = AxiosHeaders;
    }
  });

  // node_modules/axios/lib/core/transformData.js
  function transformData(fns, response) {
    const config = this || defaults_default;
    const context = response || config;
    const headers = AxiosHeaders_default.from(context.headers);
    let data = context.data;
    utils_default.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  var init_transformData = __esm({
    "node_modules/axios/lib/core/transformData.js"() {
      init_utils();
      init_defaults();
      init_AxiosHeaders();
      "use strict";
    }
  });

  // node_modules/axios/lib/cancel/isCancel.js
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }
  var init_isCancel = __esm({
    "node_modules/axios/lib/cancel/isCancel.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/cancel/CanceledError.js
  function CanceledError(message, config, request) {
    AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  var CanceledError_default;
  var init_CanceledError = __esm({
    "node_modules/axios/lib/cancel/CanceledError.js"() {
      init_AxiosError();
      init_utils();
      "use strict";
      utils_default.inherits(CanceledError, AxiosError_default, {
        __CANCEL__: true
      });
      CanceledError_default = CanceledError;
    }
  });

  // node_modules/axios/lib/core/settle.js
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError_default("Request failed with status code " + response.status, [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
    }
  }
  var init_settle = __esm({
    "node_modules/axios/lib/core/settle.js"() {
      init_AxiosError();
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/cookies.js
  var cookies_default;
  var init_cookies = __esm({
    "node_modules/axios/lib/helpers/cookies.js"() {
      init_utils();
      init_platform();
      "use strict";
      cookies_default = browser_default.isStandardBrowserEnv ? function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            const cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if (utils_default.isNumber(expires)) {
              cookie.push("expires=" + new Date(expires).toGMTString());
            }
            if (utils_default.isString(path)) {
              cookie.push("path=" + path);
            }
            if (utils_default.isString(domain)) {
              cookie.push("domain=" + domain);
            }
            if (secure === true) {
              cookie.push("secure");
            }
            document.cookie = cookie.join("; ");
          },
          read: function read(name) {
            const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
          },
          remove: function remove(name) {
            this.write(name, "", Date.now() - 864e5);
          }
        };
      }() : function nonStandardBrowserEnv() {
        return {
          write: function write() {
          },
          read: function read() {
            return null;
          },
          remove: function remove() {
          }
        };
      }();
    }
  });

  // node_modules/axios/lib/helpers/isAbsoluteURL.js
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  var init_isAbsoluteURL = __esm({
    "node_modules/axios/lib/helpers/isAbsoluteURL.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/combineURLs.js
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  var init_combineURLs = __esm({
    "node_modules/axios/lib/helpers/combineURLs.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/core/buildFullPath.js
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  var init_buildFullPath = __esm({
    "node_modules/axios/lib/core/buildFullPath.js"() {
      init_isAbsoluteURL();
      init_combineURLs();
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/isURLSameOrigin.js
  var isURLSameOrigin_default;
  var init_isURLSameOrigin = __esm({
    "node_modules/axios/lib/helpers/isURLSameOrigin.js"() {
      init_utils();
      init_platform();
      "use strict";
      isURLSameOrigin_default = browser_default.isStandardBrowserEnv ? function standardBrowserEnv2() {
        const msie = /(msie|trident)/i.test(navigator.userAgent);
        const urlParsingNode = document.createElement("a");
        let originURL;
        function resolveURL(url) {
          let href = url;
          if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute("href", href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          const parsed = utils_default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }() : function nonStandardBrowserEnv2() {
        return function isURLSameOrigin() {
          return true;
        };
      }();
    }
  });

  // node_modules/axios/lib/helpers/parseProtocol.js
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }
  var init_parseProtocol = __esm({
    "node_modules/axios/lib/helpers/parseProtocol.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/speedometer.js
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i3 = tail;
      let bytesCount = 0;
      while (i3 !== head) {
        bytesCount += bytes[i3++];
        i3 = i3 % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  var speedometer_default;
  var init_speedometer = __esm({
    "node_modules/axios/lib/helpers/speedometer.js"() {
      "use strict";
      speedometer_default = speedometer;
    }
  });

  // node_modules/axios/lib/adapters/xhr.js
  function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = speedometer_default(50, 250);
    return (e4) => {
      const loaded = e4.loaded;
      const total = e4.lengthComputable ? e4.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e4
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    };
  }
  var isXHRAdapterSupported, xhr_default;
  var init_xhr = __esm({
    "node_modules/axios/lib/adapters/xhr.js"() {
      init_utils();
      init_settle();
      init_cookies();
      init_buildURL();
      init_buildFullPath();
      init_isURLSameOrigin();
      init_transitional();
      init_AxiosError();
      init_CanceledError();
      init_parseProtocol();
      init_platform();
      init_AxiosHeaders();
      init_speedometer();
      "use strict";
      isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
      xhr_default = isXHRAdapterSupported && function(config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
          let requestData = config.data;
          const requestHeaders = AxiosHeaders_default.from(config.headers).normalize();
          const responseType = config.responseType;
          let onCanceled;
          function done() {
            if (config.cancelToken) {
              config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
              config.signal.removeEventListener("abort", onCanceled);
            }
          }
          if (utils_default.isFormData(requestData)) {
            if (browser_default.isStandardBrowserEnv || browser_default.isStandardBrowserWebWorkerEnv) {
              requestHeaders.setContentType(false);
            } else {
              requestHeaders.setContentType("multipart/form-data;", false);
            }
          }
          let request = new XMLHttpRequest();
          if (config.auth) {
            const username = config.auth.username || "";
            const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
            requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
          }
          const fullPath = buildFullPath(config.baseURL, config.url);
          request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
          request.timeout = config.timeout;
          function onloadend() {
            if (!request) {
              return;
            }
            const responseHeaders = AxiosHeaders_default.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
            const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
            const response = {
              data: responseData,
              status: request.status,
              statusText: request.statusText,
              headers: responseHeaders,
              config,
              request
            };
            settle(function _resolve(value) {
              resolve(value);
              done();
            }, function _reject(err) {
              reject(err);
              done();
            }, response);
            request = null;
          }
          if ("onloadend" in request) {
            request.onloadend = onloadend;
          } else {
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }
              if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
                return;
              }
              setTimeout(onloadend);
            };
          }
          request.onabort = function handleAbort() {
            if (!request) {
              return;
            }
            reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
            request = null;
          };
          request.onerror = function handleError() {
            reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
            request = null;
          };
          request.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
            const transitional2 = config.transitional || transitional_default;
            if (config.timeoutErrorMessage) {
              timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(new AxiosError_default(timeoutErrorMessage, transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED, config, request));
            request = null;
          };
          if (browser_default.isStandardBrowserEnv) {
            const xsrfValue = (config.withCredentials || isURLSameOrigin_default(fullPath)) && config.xsrfCookieName && cookies_default.read(config.xsrfCookieName);
            if (xsrfValue) {
              requestHeaders.set(config.xsrfHeaderName, xsrfValue);
            }
          }
          requestData === void 0 && requestHeaders.setContentType(null);
          if ("setRequestHeader" in request) {
            utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
              request.setRequestHeader(key, val);
            });
          }
          if (!utils_default.isUndefined(config.withCredentials)) {
            request.withCredentials = !!config.withCredentials;
          }
          if (responseType && responseType !== "json") {
            request.responseType = config.responseType;
          }
          if (typeof config.onDownloadProgress === "function") {
            request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
          }
          if (typeof config.onUploadProgress === "function" && request.upload) {
            request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
          }
          if (config.cancelToken || config.signal) {
            onCanceled = (cancel) => {
              if (!request) {
                return;
              }
              reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
              request.abort();
              request = null;
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
              config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
            }
          }
          const protocol = parseProtocol(fullPath);
          if (protocol && browser_default.protocols.indexOf(protocol) === -1) {
            reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
            return;
          }
          request.send(requestData || null);
        });
      };
    }
  });

  // node_modules/axios/lib/adapters/adapters.js
  var knownAdapters, adapters_default;
  var init_adapters = __esm({
    "node_modules/axios/lib/adapters/adapters.js"() {
      init_utils();
      init_null();
      init_xhr();
      init_AxiosError();
      knownAdapters = {
        http: null_default,
        xhr: xhr_default
      };
      utils_default.forEach(knownAdapters, (fn, value) => {
        if (fn) {
          try {
            Object.defineProperty(fn, "name", { value });
          } catch (e4) {
          }
          Object.defineProperty(fn, "adapterName", { value });
        }
      });
      adapters_default = {
        getAdapter: (adapters) => {
          adapters = utils_default.isArray(adapters) ? adapters : [adapters];
          const { length } = adapters;
          let nameOrAdapter;
          let adapter;
          for (let i3 = 0; i3 < length; i3++) {
            nameOrAdapter = adapters[i3];
            if (adapter = utils_default.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
              break;
            }
          }
          if (!adapter) {
            if (adapter === false) {
              throw new AxiosError_default(`Adapter ${nameOrAdapter} is not supported by the environment`, "ERR_NOT_SUPPORT");
            }
            throw new Error(utils_default.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`);
          }
          if (!utils_default.isFunction(adapter)) {
            throw new TypeError("adapter is not a function");
          }
          return adapter;
        },
        adapters: knownAdapters
      };
    }
  });

  // node_modules/axios/lib/core/dispatchRequest.js
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError_default(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders_default.from(config.headers);
    config.data = transformData.call(config, config.transformRequest);
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(config, config.transformResponse, response);
      response.headers = AxiosHeaders_default.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(config, config.transformResponse, reason.response);
          reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }
  var init_dispatchRequest = __esm({
    "node_modules/axios/lib/core/dispatchRequest.js"() {
      init_transformData();
      init_isCancel();
      init_defaults();
      init_CanceledError();
      init_AxiosHeaders();
      init_adapters();
      "use strict";
    }
  });

  // node_modules/axios/lib/core/mergeConfig.js
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
        return utils_default.merge.call({ caseless }, target, source);
      } else if (utils_default.isPlainObject(source)) {
        return utils_default.merge({}, source);
      } else if (utils_default.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a3, b2, caseless) {
      if (!utils_default.isUndefined(b2)) {
        return getMergedValue(a3, b2, caseless);
      } else if (!utils_default.isUndefined(a3)) {
        return getMergedValue(void 0, a3, caseless);
      }
    }
    function valueFromConfig2(a3, b2) {
      if (!utils_default.isUndefined(b2)) {
        return getMergedValue(void 0, b2);
      }
    }
    function defaultToConfig2(a3, b2) {
      if (!utils_default.isUndefined(b2)) {
        return getMergedValue(void 0, b2);
      } else if (!utils_default.isUndefined(a3)) {
        return getMergedValue(void 0, a3);
      }
    }
    function mergeDirectKeys(a3, b2, prop) {
      if (prop in config2) {
        return getMergedValue(a3, b2);
      } else if (prop in config1) {
        return getMergedValue(void 0, a3);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a3, b2) => mergeDeepProperties(headersToObject(a3), headersToObject(b2), true)
    };
    utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }
  var headersToObject;
  var init_mergeConfig = __esm({
    "node_modules/axios/lib/core/mergeConfig.js"() {
      init_utils();
      init_AxiosHeaders();
      "use strict";
      headersToObject = (thing) => thing instanceof AxiosHeaders_default ? thing.toJSON() : thing;
    }
  });

  // node_modules/axios/lib/env/data.js
  var VERSION;
  var init_data = __esm({
    "node_modules/axios/lib/env/data.js"() {
      VERSION = "1.4.0";
    }
  });

  // node_modules/axios/lib/helpers/validator.js
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i3 = keys.length;
    while (i3-- > 0) {
      const opt = keys[i3];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === void 0 || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
      }
    }
  }
  var validators, deprecatedWarnings, validator_default;
  var init_validator = __esm({
    "node_modules/axios/lib/helpers/validator.js"() {
      init_data();
      init_AxiosError();
      "use strict";
      validators = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i3) => {
        validators[type] = function validator(thing) {
          return typeof thing === type || "a" + (i3 < 1 ? "n " : " ") + type;
        };
      });
      deprecatedWarnings = {};
      validators.transitional = function transitional(validator, version, message) {
        function formatMessage(opt, desc) {
          return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
        }
        return (value, opt, opts) => {
          if (validator === false) {
            throw new AxiosError_default(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError_default.ERR_DEPRECATED);
          }
          if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
          }
          return validator ? validator(value, opt, opts) : true;
        };
      };
      validator_default = {
        assertOptions,
        validators
      };
    }
  });

  // node_modules/axios/lib/core/Axios.js
  var validators2, Axios, Axios_default;
  var init_Axios = __esm({
    "node_modules/axios/lib/core/Axios.js"() {
      init_utils();
      init_buildURL();
      init_InterceptorManager();
      init_dispatchRequest();
      init_mergeConfig();
      init_buildFullPath();
      init_validator();
      init_AxiosHeaders();
      "use strict";
      validators2 = validator_default.validators;
      Axios = class {
        constructor(instanceConfig) {
          this.defaults = instanceConfig;
          this.interceptors = {
            request: new InterceptorManager_default(),
            response: new InterceptorManager_default()
          };
        }
        request(configOrUrl, config) {
          if (typeof configOrUrl === "string") {
            config = config || {};
            config.url = configOrUrl;
          } else {
            config = configOrUrl || {};
          }
          config = mergeConfig(this.defaults, config);
          const { transitional: transitional2, paramsSerializer, headers } = config;
          if (transitional2 !== void 0) {
            validator_default.assertOptions(transitional2, {
              silentJSONParsing: validators2.transitional(validators2.boolean),
              forcedJSONParsing: validators2.transitional(validators2.boolean),
              clarifyTimeoutError: validators2.transitional(validators2.boolean)
            }, false);
          }
          if (paramsSerializer != null) {
            if (utils_default.isFunction(paramsSerializer)) {
              config.paramsSerializer = {
                serialize: paramsSerializer
              };
            } else {
              validator_default.assertOptions(paramsSerializer, {
                encode: validators2.function,
                serialize: validators2.function
              }, true);
            }
          }
          config.method = (config.method || this.defaults.method || "get").toLowerCase();
          let contextHeaders;
          contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
          contextHeaders && utils_default.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
            delete headers[method];
          });
          config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
          const requestInterceptorChain = [];
          let synchronousRequestInterceptors = true;
          this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
              return;
            }
            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
          });
          const responseInterceptorChain = [];
          this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
          });
          let promise;
          let i3 = 0;
          let len;
          if (!synchronousRequestInterceptors) {
            const chain = [dispatchRequest.bind(this), void 0];
            chain.unshift.apply(chain, requestInterceptorChain);
            chain.push.apply(chain, responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);
            while (i3 < len) {
              promise = promise.then(chain[i3++], chain[i3++]);
            }
            return promise;
          }
          len = requestInterceptorChain.length;
          let newConfig = config;
          i3 = 0;
          while (i3 < len) {
            const onFulfilled = requestInterceptorChain[i3++];
            const onRejected = requestInterceptorChain[i3++];
            try {
              newConfig = onFulfilled(newConfig);
            } catch (error) {
              onRejected.call(this, error);
              break;
            }
          }
          try {
            promise = dispatchRequest.call(this, newConfig);
          } catch (error) {
            return Promise.reject(error);
          }
          i3 = 0;
          len = responseInterceptorChain.length;
          while (i3 < len) {
            promise = promise.then(responseInterceptorChain[i3++], responseInterceptorChain[i3++]);
          }
          return promise;
        }
        getUri(config) {
          config = mergeConfig(this.defaults, config);
          const fullPath = buildFullPath(config.baseURL, config.url);
          return buildURL(fullPath, config.params, config.paramsSerializer);
        }
      };
      utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
        Axios.prototype[method] = function(url, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            url,
            data: (config || {}).data
          }));
        };
      });
      utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
        function generateHTTPMethod(isForm) {
          return function httpMethod(url, data, config) {
            return this.request(mergeConfig(config || {}, {
              method,
              headers: isForm ? {
                "Content-Type": "multipart/form-data"
              } : {},
              url,
              data
            }));
          };
        }
        Axios.prototype[method] = generateHTTPMethod();
        Axios.prototype[method + "Form"] = generateHTTPMethod(true);
      });
      Axios_default = Axios;
    }
  });

  // node_modules/axios/lib/cancel/CancelToken.js
  var CancelToken, CancelToken_default;
  var init_CancelToken = __esm({
    "node_modules/axios/lib/cancel/CancelToken.js"() {
      init_CanceledError();
      "use strict";
      CancelToken = class {
        constructor(executor) {
          if (typeof executor !== "function") {
            throw new TypeError("executor must be a function.");
          }
          let resolvePromise;
          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
          });
          const token = this;
          this.promise.then((cancel) => {
            if (!token._listeners)
              return;
            let i3 = token._listeners.length;
            while (i3-- > 0) {
              token._listeners[i3](cancel);
            }
            token._listeners = null;
          });
          this.promise.then = (onfulfilled) => {
            let _resolve;
            const promise = new Promise((resolve) => {
              token.subscribe(resolve);
              _resolve = resolve;
            }).then(onfulfilled);
            promise.cancel = function reject() {
              token.unsubscribe(_resolve);
            };
            return promise;
          };
          executor(function cancel(message, config, request) {
            if (token.reason) {
              return;
            }
            token.reason = new CanceledError_default(message, config, request);
            resolvePromise(token.reason);
          });
        }
        throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        }
        subscribe(listener) {
          if (this.reason) {
            listener(this.reason);
            return;
          }
          if (this._listeners) {
            this._listeners.push(listener);
          } else {
            this._listeners = [listener];
          }
        }
        unsubscribe(listener) {
          if (!this._listeners) {
            return;
          }
          const index = this._listeners.indexOf(listener);
          if (index !== -1) {
            this._listeners.splice(index, 1);
          }
        }
        static source() {
          let cancel;
          const token = new CancelToken(function executor(c3) {
            cancel = c3;
          });
          return {
            token,
            cancel
          };
        }
      };
      CancelToken_default = CancelToken;
    }
  });

  // node_modules/axios/lib/helpers/spread.js
  function spread(callback) {
    return function wrap2(arr) {
      return callback.apply(null, arr);
    };
  }
  var init_spread = __esm({
    "node_modules/axios/lib/helpers/spread.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/isAxiosError.js
  function isAxiosError(payload) {
    return utils_default.isObject(payload) && payload.isAxiosError === true;
  }
  var init_isAxiosError = __esm({
    "node_modules/axios/lib/helpers/isAxiosError.js"() {
      init_utils();
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/HttpStatusCode.js
  var HttpStatusCode, HttpStatusCode_default;
  var init_HttpStatusCode = __esm({
    "node_modules/axios/lib/helpers/HttpStatusCode.js"() {
      HttpStatusCode = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        PayloadTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        UnprocessableEntity: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511
      };
      Object.entries(HttpStatusCode).forEach(([key, value]) => {
        HttpStatusCode[value] = key;
      });
      HttpStatusCode_default = HttpStatusCode;
    }
  });

  // node_modules/axios/lib/axios.js
  function createInstance(defaultConfig) {
    const context = new Axios_default(defaultConfig);
    const instance = bind(Axios_default.prototype.request, context);
    utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
    utils_default.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  var axios, axios_default;
  var init_axios = __esm({
    "node_modules/axios/lib/axios.js"() {
      init_utils();
      init_bind();
      init_Axios();
      init_mergeConfig();
      init_defaults();
      init_formDataToJSON();
      init_CanceledError();
      init_CancelToken();
      init_isCancel();
      init_data();
      init_toFormData();
      init_AxiosError();
      init_spread();
      init_isAxiosError();
      init_AxiosHeaders();
      init_HttpStatusCode();
      "use strict";
      axios = createInstance(defaults_default);
      axios.Axios = Axios_default;
      axios.CanceledError = CanceledError_default;
      axios.CancelToken = CancelToken_default;
      axios.isCancel = isCancel;
      axios.VERSION = VERSION;
      axios.toFormData = toFormData_default;
      axios.AxiosError = AxiosError_default;
      axios.Cancel = axios.CanceledError;
      axios.all = function all(promises) {
        return Promise.all(promises);
      };
      axios.spread = spread;
      axios.isAxiosError = isAxiosError;
      axios.mergeConfig = mergeConfig;
      axios.AxiosHeaders = AxiosHeaders_default;
      axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
      axios.HttpStatusCode = HttpStatusCode_default;
      axios.default = axios;
      axios_default = axios;
    }
  });

  // node_modules/axios/index.js
  var init_axios2 = __esm({
    "node_modules/axios/index.js"() {
      init_axios();
    }
  });

  // node_modules/langchain/dist/util/event-source-parse.js
  async function getBytes(stream, onChunk) {
    const reader = stream.getReader();
    while (true) {
      const result = await reader.read();
      if (result.done) {
        onChunk(new Uint8Array(), true);
        break;
      }
      onChunk(result.value);
    }
  }
  function getLines(onLine) {
    let buffer;
    let position;
    let fieldLength;
    let discardTrailingNewline = false;
    return function onChunk(arr, flush) {
      if (flush) {
        onLine(arr, 0, true);
        return;
      }
      if (buffer === void 0) {
        buffer = arr;
        position = 0;
        fieldLength = -1;
      } else {
        buffer = concat(buffer, arr);
      }
      const bufLength = buffer.length;
      let lineStart = 0;
      while (position < bufLength) {
        if (discardTrailingNewline) {
          if (buffer[position] === 10) {
            lineStart = ++position;
          }
          discardTrailingNewline = false;
        }
        let lineEnd = -1;
        for (; position < bufLength && lineEnd === -1; ++position) {
          switch (buffer[position]) {
            case 58:
              if (fieldLength === -1) {
                fieldLength = position - lineStart;
              }
              break;
            case 13:
              discardTrailingNewline = true;
            case 10:
              lineEnd = position;
              break;
          }
        }
        if (lineEnd === -1) {
          break;
        }
        onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
        lineStart = position;
        fieldLength = -1;
      }
      if (lineStart === bufLength) {
        buffer = void 0;
      } else if (lineStart !== 0) {
        buffer = buffer.subarray(lineStart);
        position -= lineStart;
      }
    };
  }
  function getMessages(onMessage, onId, onRetry) {
    let message = newMessage();
    const decoder = new TextDecoder();
    return function onLine(line, fieldLength, flush) {
      if (flush) {
        if (!isEmpty(message)) {
          onMessage?.(message);
          message = newMessage();
        }
        return;
      }
      if (line.length === 0) {
        onMessage?.(message);
        message = newMessage();
      } else if (fieldLength > 0) {
        const field = decoder.decode(line.subarray(0, fieldLength));
        const valueOffset = fieldLength + (line[fieldLength + 1] === 32 ? 2 : 1);
        const value = decoder.decode(line.subarray(valueOffset));
        switch (field) {
          case "data":
            message.data = message.data ? message.data + "\n" + value : value;
            break;
          case "event":
            message.event = value;
            break;
          case "id":
            onId?.(message.id = value);
            break;
          case "retry": {
            const retry = parseInt(value, 10);
            if (!Number.isNaN(retry)) {
              onRetry?.(message.retry = retry);
            }
            break;
          }
        }
      }
    };
  }
  function concat(a3, b2) {
    const res = new Uint8Array(a3.length + b2.length);
    res.set(a3);
    res.set(b2, a3.length);
    return res;
  }
  function newMessage() {
    return {
      data: "",
      event: "",
      id: "",
      retry: void 0
    };
  }
  function isEmpty(message) {
    return message.data === "" && message.event === "" && message.id === "" && message.retry === void 0;
  }
  var EventStreamContentType;
  var init_event_source_parse = __esm({
    "node_modules/langchain/dist/util/event-source-parse.js"() {
      EventStreamContentType = "text/event-stream";
    }
  });

  // node_modules/langchain/dist/util/axios-fetch-adapter.js
  function tryJsonStringify2(data) {
    try {
      return JSON.stringify(data);
    } catch (e4) {
      return data;
    }
  }
  function settle2(resolve, reject, response) {
    const { validateStatus: validateStatus2 } = response.config;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(createError(`Request failed with status code ${response.status} and body ${typeof response.data === "string" ? response.data : tryJsonStringify2(response.data)}`, response.config, null, response.request, response));
    }
  }
  function isAbsoluteURL2(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  function combineURLs2(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  function encode3(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL2(url, params, paramsSerializer) {
    if (!params) {
      return url;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (isURLSearchParams2(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      forEach2(params, function serialize(val, key) {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (isArray2(val)) {
          key = `${key}[]`;
        } else {
          val = [val];
        }
        forEach2(val, function parseValue(v2) {
          if (isDate2(v2)) {
            v2 = v2.toISOString();
          } else if (isObject2(v2)) {
            v2 = JSON.stringify(v2);
          }
          parts.push(`${encode3(key)}=${encode3(v2)}`);
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL2(requestedURL)) {
      return combineURLs2(baseURL, requestedURL);
    }
    return requestedURL;
  }
  function isUndefined2(val) {
    return typeof val === "undefined";
  }
  function isObject2(val) {
    return val !== null && typeof val === "object";
  }
  function isDate2(val) {
    return toString.call(val) === "[object Date]";
  }
  function isURLSearchParams2(val) {
    return toString.call(val) === "[object URLSearchParams]";
  }
  function isArray2(val) {
    return Array.isArray(val);
  }
  function forEach2(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray2(obj)) {
      for (var i3 = 0, l4 = obj.length; i3 < l4; i3++) {
        fn.call(null, obj[i3], i3, obj);
      }
    } else {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function isFormData2(val) {
    return toString.call(val) === "[object FormData]";
  }
  function isStandardBrowserEnv2() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  async function fetchAdapter(config) {
    const request = createRequest(config);
    const data = await getResponse(request, config);
    return new Promise((resolve, reject) => {
      if (data instanceof Error) {
        reject(data);
      } else {
        Object.prototype.toString.call(config.settle) === "[object Function]" ? config.settle(resolve, reject, data) : settle2(resolve, reject, data);
      }
    });
  }
  async function getResponse(request, config) {
    let stageOne;
    try {
      stageOne = await fetch(request);
    } catch (e4) {
      if (e4 && e4.name === "AbortError") {
        return createError("Request aborted", config, "ECONNABORTED", request);
      }
      if (e4 && e4.name === "TimeoutError") {
        return createError("Request timeout", config, "ECONNABORTED", request);
      }
      return createError("Network Error", config, "ERR_NETWORK", request);
    }
    const headers = {};
    stageOne.headers.forEach((value, key) => {
      headers[key] = value;
    });
    const response = {
      ok: stageOne.ok,
      status: stageOne.status,
      statusText: stageOne.statusText,
      headers,
      config,
      request
    };
    if (stageOne.status >= 200 && stageOne.status !== 204) {
      if (config.responseType === "stream") {
        const contentType = stageOne.headers.get("content-type");
        if (!contentType?.startsWith(EventStreamContentType)) {
          if (stageOne.status >= 400) {
            if (contentType?.startsWith("application/json")) {
              response.data = await stageOne.json();
              return response;
            } else {
              response.data = await stageOne.text();
              return response;
            }
          }
          throw new Error(`Expected content-type to be ${EventStreamContentType}, Actual: ${contentType}`);
        }
        await getBytes(stageOne.body, getLines(getMessages(config.onmessage)));
      } else {
        switch (config.responseType) {
          case "arraybuffer":
            response.data = await stageOne.arrayBuffer();
            break;
          case "blob":
            response.data = await stageOne.blob();
            break;
          case "json":
            response.data = await stageOne.json();
            break;
          case "formData":
            response.data = await stageOne.formData();
            break;
          default:
            response.data = await stageOne.text();
            break;
        }
      }
    }
    return response;
  }
  function createRequest(config) {
    const headers = new Headers(config.headers);
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password ? decodeURI(encodeURIComponent(config.auth.password)) : "";
      headers.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
    }
    const method = config.method.toUpperCase();
    const options = {
      headers,
      method
    };
    if (method !== "GET" && method !== "HEAD") {
      options.body = config.data;
      if (isFormData2(options.body) && isStandardBrowserEnv2()) {
        headers.delete("Content-Type");
      }
    }
    if (typeof options.body === "string") {
      options.body = new TextEncoder().encode(options.body);
    }
    if (config.mode) {
      options.mode = config.mode;
    }
    if (config.cache) {
      options.cache = config.cache;
    }
    if (config.integrity) {
      options.integrity = config.integrity;
    }
    if (config.redirect) {
      options.redirect = config.redirect;
    }
    if (config.referrer) {
      options.referrer = config.referrer;
    }
    if (config.timeout && config.timeout > 0) {
      options.signal = AbortSignal.timeout(config.timeout);
    }
    if (config.signal) {
      options.signal = config.signal;
    }
    if (!isUndefined2(config.withCredentials)) {
      options.credentials = config.withCredentials ? "include" : "omit";
    }
    if (config.responseType === "stream") {
      options.headers.set("Accept", EventStreamContentType);
    }
    const fullPath = buildFullPath2(config.baseURL, config.url);
    const url = buildURL2(fullPath, config.params, config.paramsSerializer);
    return new Request(url, options);
  }
  function createError(message, config, code, request, response) {
    if (axios_default.AxiosError && typeof axios_default.AxiosError === "function") {
      return new axios_default.AxiosError(message, axios_default.AxiosError[code], config, request, response);
    }
    const error = new Error(message);
    return enhanceError(error, config, code, request, response);
  }
  function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON2() {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: this.config,
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    };
    return error;
  }
  var init_axios_fetch_adapter = __esm({
    "node_modules/langchain/dist/util/axios-fetch-adapter.js"() {
      init_axios2();
      init_event_source_parse();
    }
  });

  // node_modules/langchain/dist/chat_models/base.js
  var BaseChatModel;
  var init_base3 = __esm({
    "node_modules/langchain/dist/chat_models/base.js"() {
      init_schema();
      init_base_language();
      init_manager();
      BaseChatModel = class extends BaseLanguageModel {
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "chat_models", this._llmType()]
          });
        }
        async generate(messages2, options, callbacks) {
          let parsedOptions;
          if (Array.isArray(options)) {
            parsedOptions = { stop: options };
          } else if (options?.timeout && !options.signal) {
            parsedOptions = {
              ...options,
              signal: AbortSignal.timeout(options.timeout)
            };
          } else {
            parsedOptions = options ?? {};
          }
          const handledOptions = {
            tags: parsedOptions.tags,
            metadata: parsedOptions.metadata,
            callbacks: parsedOptions.callbacks ?? callbacks
          };
          delete parsedOptions.tags;
          delete parsedOptions.metadata;
          delete parsedOptions.callbacks;
          const callbackManager_ = await CallbackManager.configure(handledOptions.callbacks, this.callbacks, handledOptions.tags, this.tags, handledOptions.metadata, this.metadata, { verbose: this.verbose });
          const extra = {
            options: parsedOptions,
            invocation_params: this?.invocationParams(parsedOptions)
          };
          const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), messages2, void 0, void 0, extra);
          const results = await Promise.allSettled(messages2.map((messageList, i3) => this._generate(messageList, { ...parsedOptions, promptIndex: i3 }, runManagers?.[i3])));
          const generations = [];
          const llmOutputs = [];
          await Promise.all(results.map(async (pResult, i3) => {
            if (pResult.status === "fulfilled") {
              const result = pResult.value;
              generations[i3] = result.generations;
              llmOutputs[i3] = result.llmOutput;
              return runManagers?.[i3]?.handleLLMEnd({
                generations: [result.generations],
                llmOutput: result.llmOutput
              });
            } else {
              await runManagers?.[i3]?.handleLLMError(pResult.reason);
              return Promise.reject(pResult.reason);
            }
          }));
          const output = {
            generations,
            llmOutput: llmOutputs.length ? this._combineLLMOutput?.(...llmOutputs) : void 0
          };
          Object.defineProperty(output, RUN_KEY, {
            value: runManagers ? { runIds: runManagers?.map((manager) => manager.runId) } : void 0,
            configurable: true
          });
          return output;
        }
        invocationParams(_options) {
          return {};
        }
        _modelType() {
          return "base_chat_model";
        }
        async generatePrompt(promptValues, options, callbacks) {
          const promptMessages = promptValues.map((promptValue) => promptValue.toChatMessages());
          return this.generate(promptMessages, options, callbacks);
        }
        async call(messages2, options, callbacks) {
          const result = await this.generate([messages2], options, callbacks);
          const generations = result.generations;
          return generations[0][0].message;
        }
        async callPrompt(promptValue, options, callbacks) {
          const promptMessages = promptValue.toChatMessages();
          return this.call(promptMessages, options, callbacks);
        }
        async predictMessages(messages2, options, callbacks) {
          return this.call(messages2, options, callbacks);
        }
        async predict(text, options, callbacks) {
          const message = new HumanMessage(text);
          const result = await this.call([message], options, callbacks);
          return result.content;
        }
      };
    }
  });

  // node_modules/langchain/dist/util/prompt-layer.js
  var promptLayerTrackRequest;
  var init_prompt_layer = __esm({
    "node_modules/langchain/dist/util/prompt-layer.js"() {
      promptLayerTrackRequest = async (callerFunc, functionName, prompt, kwargs, plTags, requestResponse, startTime, endTime, apiKey) => {
        const promptLayerResp = await callerFunc.call(fetch, "https://api.promptlayer.com/track-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            function_name: functionName,
            provider: "langchain",
            args: prompt,
            kwargs,
            tags: plTags,
            request_response: requestResponse,
            request_start_time: Math.floor(startTime / 1e3),
            request_end_time: Math.floor(endTime / 1e3),
            api_key: apiKey
          })
        });
        return promptLayerResp.json();
      };
    }
  });

  // node_modules/zod/lib/helpers/util.js
  var require_util = __commonJS({
    "node_modules/zod/lib/helpers/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getParsedType = exports.ZodParsedType = exports.objectUtil = exports.util = void 0;
      var util;
      (function(util2) {
        util2.assertEqual = (val) => val;
        function assertIs(_arg) {
        }
        util2.assertIs = assertIs;
        function assertNever(_x) {
          throw new Error();
        }
        util2.assertNever = assertNever;
        util2.arrayToEnum = (items) => {
          const obj = {};
          for (const item of items) {
            obj[item] = item;
          }
          return obj;
        };
        util2.getValidEnumValues = (obj) => {
          const validKeys = util2.objectKeys(obj).filter((k2) => typeof obj[obj[k2]] !== "number");
          const filtered = {};
          for (const k2 of validKeys) {
            filtered[k2] = obj[k2];
          }
          return util2.objectValues(filtered);
        };
        util2.objectValues = (obj) => {
          return util2.objectKeys(obj).map(function(e4) {
            return obj[e4];
          });
        };
        util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
          const keys = [];
          for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
              keys.push(key);
            }
          }
          return keys;
        };
        util2.find = (arr, checker) => {
          for (const item of arr) {
            if (checker(item))
              return item;
          }
          return void 0;
        };
        util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
        function joinValues(array, separator = " | ") {
          return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
        }
        util2.joinValues = joinValues;
        util2.jsonStringifyReplacer = (_2, value) => {
          if (typeof value === "bigint") {
            return value.toString();
          }
          return value;
        };
      })(util = exports.util || (exports.util = {}));
      var objectUtil;
      (function(objectUtil2) {
        objectUtil2.mergeShapes = (first, second) => {
          return {
            ...first,
            ...second
          };
        };
      })(objectUtil = exports.objectUtil || (exports.objectUtil = {}));
      exports.ZodParsedType = util.arrayToEnum([
        "string",
        "nan",
        "number",
        "integer",
        "float",
        "boolean",
        "date",
        "bigint",
        "symbol",
        "function",
        "undefined",
        "null",
        "array",
        "object",
        "unknown",
        "promise",
        "void",
        "never",
        "map",
        "set"
      ]);
      var getParsedType = (data) => {
        const t3 = typeof data;
        switch (t3) {
          case "undefined":
            return exports.ZodParsedType.undefined;
          case "string":
            return exports.ZodParsedType.string;
          case "number":
            return isNaN(data) ? exports.ZodParsedType.nan : exports.ZodParsedType.number;
          case "boolean":
            return exports.ZodParsedType.boolean;
          case "function":
            return exports.ZodParsedType.function;
          case "bigint":
            return exports.ZodParsedType.bigint;
          case "symbol":
            return exports.ZodParsedType.symbol;
          case "object":
            if (Array.isArray(data)) {
              return exports.ZodParsedType.array;
            }
            if (data === null) {
              return exports.ZodParsedType.null;
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
              return exports.ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
              return exports.ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
              return exports.ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
              return exports.ZodParsedType.date;
            }
            return exports.ZodParsedType.object;
          default:
            return exports.ZodParsedType.unknown;
        }
      };
      exports.getParsedType = getParsedType;
    }
  });

  // node_modules/zod/lib/ZodError.js
  var require_ZodError = __commonJS({
    "node_modules/zod/lib/ZodError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ZodError = exports.quotelessJson = exports.ZodIssueCode = void 0;
      var util_1 = require_util();
      exports.ZodIssueCode = util_1.util.arrayToEnum([
        "invalid_type",
        "invalid_literal",
        "custom",
        "invalid_union",
        "invalid_union_discriminator",
        "invalid_enum_value",
        "unrecognized_keys",
        "invalid_arguments",
        "invalid_return_type",
        "invalid_date",
        "invalid_string",
        "too_small",
        "too_big",
        "invalid_intersection_types",
        "not_multiple_of",
        "not_finite"
      ]);
      var quotelessJson = (obj) => {
        const json = JSON.stringify(obj, null, 2);
        return json.replace(/"([^"]+)":/g, "$1:");
      };
      exports.quotelessJson = quotelessJson;
      var ZodError = class extends Error {
        constructor(issues) {
          super();
          this.issues = [];
          this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
          };
          this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
          };
          const actualProto = new.target.prototype;
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
          } else {
            this.__proto__ = actualProto;
          }
          this.name = "ZodError";
          this.issues = issues;
        }
        get errors() {
          return this.issues;
        }
        format(_mapper) {
          const mapper = _mapper || function(issue) {
            return issue.message;
          };
          const fieldErrors = { _errors: [] };
          const processError = (error) => {
            for (const issue of error.issues) {
              if (issue.code === "invalid_union") {
                issue.unionErrors.map(processError);
              } else if (issue.code === "invalid_return_type") {
                processError(issue.returnTypeError);
              } else if (issue.code === "invalid_arguments") {
                processError(issue.argumentsError);
              } else if (issue.path.length === 0) {
                fieldErrors._errors.push(mapper(issue));
              } else {
                let curr = fieldErrors;
                let i3 = 0;
                while (i3 < issue.path.length) {
                  const el = issue.path[i3];
                  const terminal = i3 === issue.path.length - 1;
                  if (!terminal) {
                    curr[el] = curr[el] || { _errors: [] };
                  } else {
                    curr[el] = curr[el] || { _errors: [] };
                    curr[el]._errors.push(mapper(issue));
                  }
                  curr = curr[el];
                  i3++;
                }
              }
            }
          };
          processError(this);
          return fieldErrors;
        }
        toString() {
          return this.message;
        }
        get message() {
          return JSON.stringify(this.issues, util_1.util.jsonStringifyReplacer, 2);
        }
        get isEmpty() {
          return this.issues.length === 0;
        }
        flatten(mapper = (issue) => issue.message) {
          const fieldErrors = {};
          const formErrors = [];
          for (const sub of this.issues) {
            if (sub.path.length > 0) {
              fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
              fieldErrors[sub.path[0]].push(mapper(sub));
            } else {
              formErrors.push(mapper(sub));
            }
          }
          return { formErrors, fieldErrors };
        }
        get formErrors() {
          return this.flatten();
        }
      };
      exports.ZodError = ZodError;
      ZodError.create = (issues) => {
        const error = new ZodError(issues);
        return error;
      };
    }
  });

  // node_modules/zod/lib/locales/en.js
  var require_en = __commonJS({
    "node_modules/zod/lib/locales/en.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = require_util();
      var ZodError_1 = require_ZodError();
      var errorMap = (issue, _ctx) => {
        let message;
        switch (issue.code) {
          case ZodError_1.ZodIssueCode.invalid_type:
            if (issue.received === util_1.ZodParsedType.undefined) {
              message = "Required";
            } else {
              message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
          case ZodError_1.ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_1.util.jsonStringifyReplacer)}`;
            break;
          case ZodError_1.ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util_1.util.joinValues(issue.keys, ", ")}`;
            break;
          case ZodError_1.ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
          case ZodError_1.ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util_1.util.joinValues(issue.options)}`;
            break;
          case ZodError_1.ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util_1.util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
          case ZodError_1.ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
          case ZodError_1.ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
          case ZodError_1.ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
          case ZodError_1.ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
              if ("includes" in issue.validation) {
                message = `Invalid input: must include "${issue.validation.includes}"`;
                if (typeof issue.validation.position === "number") {
                  message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                }
              } else if ("startsWith" in issue.validation) {
                message = `Invalid input: must start with "${issue.validation.startsWith}"`;
              } else if ("endsWith" in issue.validation) {
                message = `Invalid input: must end with "${issue.validation.endsWith}"`;
              } else {
                util_1.util.assertNever(issue.validation);
              }
            } else if (issue.validation !== "regex") {
              message = `Invalid ${issue.validation}`;
            } else {
              message = "Invalid";
            }
            break;
          case ZodError_1.ZodIssueCode.too_small:
            if (issue.type === "array")
              message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
              message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
              message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
              message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
            else
              message = "Invalid input";
            break;
          case ZodError_1.ZodIssueCode.too_big:
            if (issue.type === "array")
              message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
              message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
              message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
              message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
              message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
              message = "Invalid input";
            break;
          case ZodError_1.ZodIssueCode.custom:
            message = `Invalid input`;
            break;
          case ZodError_1.ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
          case ZodError_1.ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
          case ZodError_1.ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
          default:
            message = _ctx.defaultError;
            util_1.util.assertNever(issue);
        }
        return { message };
      };
      exports.default = errorMap;
    }
  });

  // node_modules/zod/lib/errors.js
  var require_errors = __commonJS({
    "node_modules/zod/lib/errors.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getErrorMap = exports.setErrorMap = exports.defaultErrorMap = void 0;
      var en_1 = __importDefault(require_en());
      exports.defaultErrorMap = en_1.default;
      var overrideErrorMap = en_1.default;
      function setErrorMap(map) {
        overrideErrorMap = map;
      }
      exports.setErrorMap = setErrorMap;
      function getErrorMap() {
        return overrideErrorMap;
      }
      exports.getErrorMap = getErrorMap;
    }
  });

  // node_modules/zod/lib/helpers/parseUtil.js
  var require_parseUtil = __commonJS({
    "node_modules/zod/lib/helpers/parseUtil.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isAsync = exports.isValid = exports.isDirty = exports.isAborted = exports.OK = exports.DIRTY = exports.INVALID = exports.ParseStatus = exports.addIssueToContext = exports.EMPTY_PATH = exports.makeIssue = void 0;
      var errors_1 = require_errors();
      var en_1 = __importDefault(require_en());
      var makeIssue = (params) => {
        const { data, path, errorMaps, issueData } = params;
        const fullPath = [...path, ...issueData.path || []];
        const fullIssue = {
          ...issueData,
          path: fullPath
        };
        let errorMessage = "";
        const maps = errorMaps.filter((m2) => !!m2).slice().reverse();
        for (const map of maps) {
          errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
        }
        return {
          ...issueData,
          path: fullPath,
          message: issueData.message || errorMessage
        };
      };
      exports.makeIssue = makeIssue;
      exports.EMPTY_PATH = [];
      function addIssueToContext(ctx, issueData) {
        const issue = (0, exports.makeIssue)({
          issueData,
          data: ctx.data,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            (0, errors_1.getErrorMap)(),
            en_1.default
          ].filter((x2) => !!x2)
        });
        ctx.common.issues.push(issue);
      }
      exports.addIssueToContext = addIssueToContext;
      var ParseStatus = class {
        constructor() {
          this.value = "valid";
        }
        dirty() {
          if (this.value === "valid")
            this.value = "dirty";
        }
        abort() {
          if (this.value !== "aborted")
            this.value = "aborted";
        }
        static mergeArray(status, results) {
          const arrayValue = [];
          for (const s5 of results) {
            if (s5.status === "aborted")
              return exports.INVALID;
            if (s5.status === "dirty")
              status.dirty();
            arrayValue.push(s5.value);
          }
          return { status: status.value, value: arrayValue };
        }
        static async mergeObjectAsync(status, pairs) {
          const syncPairs = [];
          for (const pair of pairs) {
            syncPairs.push({
              key: await pair.key,
              value: await pair.value
            });
          }
          return ParseStatus.mergeObjectSync(status, syncPairs);
        }
        static mergeObjectSync(status, pairs) {
          const finalObject = {};
          for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
              return exports.INVALID;
            if (value.status === "aborted")
              return exports.INVALID;
            if (key.status === "dirty")
              status.dirty();
            if (value.status === "dirty")
              status.dirty();
            if (typeof value.value !== "undefined" || pair.alwaysSet) {
              finalObject[key.value] = value.value;
            }
          }
          return { status: status.value, value: finalObject };
        }
      };
      exports.ParseStatus = ParseStatus;
      exports.INVALID = Object.freeze({
        status: "aborted"
      });
      var DIRTY = (value) => ({ status: "dirty", value });
      exports.DIRTY = DIRTY;
      var OK = (value) => ({ status: "valid", value });
      exports.OK = OK;
      var isAborted = (x2) => x2.status === "aborted";
      exports.isAborted = isAborted;
      var isDirty = (x2) => x2.status === "dirty";
      exports.isDirty = isDirty;
      var isValid = (x2) => x2.status === "valid";
      exports.isValid = isValid;
      var isAsync = (x2) => typeof Promise !== "undefined" && x2 instanceof Promise;
      exports.isAsync = isAsync;
    }
  });

  // node_modules/zod/lib/helpers/typeAliases.js
  var require_typeAliases = __commonJS({
    "node_modules/zod/lib/helpers/typeAliases.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/zod/lib/helpers/errorUtil.js
  var require_errorUtil = __commonJS({
    "node_modules/zod/lib/helpers/errorUtil.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.errorUtil = void 0;
      var errorUtil;
      (function(errorUtil2) {
        errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
        errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
      })(errorUtil = exports.errorUtil || (exports.errorUtil = {}));
    }
  });

  // node_modules/zod/lib/types.js
  var require_types = __commonJS({
    "node_modules/zod/lib/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.discriminatedUnion = exports.date = exports.boolean = exports.bigint = exports.array = exports.any = exports.coerce = exports.ZodFirstPartyTypeKind = exports.late = exports.ZodSchema = exports.Schema = exports.custom = exports.ZodPipeline = exports.ZodBranded = exports.BRAND = exports.ZodNaN = exports.ZodCatch = exports.ZodDefault = exports.ZodNullable = exports.ZodOptional = exports.ZodTransformer = exports.ZodEffects = exports.ZodPromise = exports.ZodNativeEnum = exports.ZodEnum = exports.ZodLiteral = exports.ZodLazy = exports.ZodFunction = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodUnion = exports.ZodObject = exports.ZodArray = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodSymbol = exports.ZodDate = exports.ZodBoolean = exports.ZodBigInt = exports.ZodNumber = exports.ZodString = exports.ZodType = void 0;
      exports.NEVER = exports.void = exports.unknown = exports.union = exports.undefined = exports.tuple = exports.transformer = exports.symbol = exports.string = exports.strictObject = exports.set = exports.record = exports.promise = exports.preprocess = exports.pipeline = exports.ostring = exports.optional = exports.onumber = exports.oboolean = exports.object = exports.number = exports.nullable = exports.null = exports.never = exports.nativeEnum = exports.nan = exports.map = exports.literal = exports.lazy = exports.intersection = exports.instanceof = exports.function = exports.enum = exports.effect = void 0;
      var errors_1 = require_errors();
      var errorUtil_1 = require_errorUtil();
      var parseUtil_1 = require_parseUtil();
      var util_1 = require_util();
      var ZodError_1 = require_ZodError();
      var ParseInputLazyPath = class {
        constructor(parent, value, path, key) {
          this._cachedPath = [];
          this.parent = parent;
          this.data = value;
          this._path = path;
          this._key = key;
        }
        get path() {
          if (!this._cachedPath.length) {
            if (this._key instanceof Array) {
              this._cachedPath.push(...this._path, ...this._key);
            } else {
              this._cachedPath.push(...this._path, this._key);
            }
          }
          return this._cachedPath;
        }
      };
      var handleResult = (ctx, result) => {
        if ((0, parseUtil_1.isValid)(result)) {
          return { success: true, data: result.value };
        } else {
          if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
          }
          return {
            success: false,
            get error() {
              if (this._error)
                return this._error;
              const error = new ZodError_1.ZodError(ctx.common.issues);
              this._error = error;
              return this._error;
            }
          };
        }
      };
      function processCreateParams(params) {
        if (!params)
          return {};
        const { errorMap, invalid_type_error, required_error, description } = params;
        if (errorMap && (invalid_type_error || required_error)) {
          throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
        }
        if (errorMap)
          return { errorMap, description };
        const customMap = (iss, ctx) => {
          if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
          if (typeof ctx.data === "undefined") {
            return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
          }
          return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
        };
        return { errorMap: customMap, description };
      }
      var ZodType = class {
        constructor(def) {
          this.spa = this.safeParseAsync;
          this._def = def;
          this.parse = this.parse.bind(this);
          this.safeParse = this.safeParse.bind(this);
          this.parseAsync = this.parseAsync.bind(this);
          this.safeParseAsync = this.safeParseAsync.bind(this);
          this.spa = this.spa.bind(this);
          this.refine = this.refine.bind(this);
          this.refinement = this.refinement.bind(this);
          this.superRefine = this.superRefine.bind(this);
          this.optional = this.optional.bind(this);
          this.nullable = this.nullable.bind(this);
          this.nullish = this.nullish.bind(this);
          this.array = this.array.bind(this);
          this.promise = this.promise.bind(this);
          this.or = this.or.bind(this);
          this.and = this.and.bind(this);
          this.transform = this.transform.bind(this);
          this.brand = this.brand.bind(this);
          this.default = this.default.bind(this);
          this.catch = this.catch.bind(this);
          this.describe = this.describe.bind(this);
          this.pipe = this.pipe.bind(this);
          this.isNullable = this.isNullable.bind(this);
          this.isOptional = this.isOptional.bind(this);
        }
        get description() {
          return this._def.description;
        }
        _getType(input) {
          return (0, util_1.getParsedType)(input.data);
        }
        _getOrReturnCtx(input, ctx) {
          return ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: (0, util_1.getParsedType)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          };
        }
        _processInputParams(input) {
          return {
            status: new parseUtil_1.ParseStatus(),
            ctx: {
              common: input.parent.common,
              data: input.data,
              parsedType: (0, util_1.getParsedType)(input.data),
              schemaErrorMap: this._def.errorMap,
              path: input.path,
              parent: input.parent
            }
          };
        }
        _parseSync(input) {
          const result = this._parse(input);
          if ((0, parseUtil_1.isAsync)(result)) {
            throw new Error("Synchronous parse encountered promise.");
          }
          return result;
        }
        _parseAsync(input) {
          const result = this._parse(input);
          return Promise.resolve(result);
        }
        parse(data, params) {
          const result = this.safeParse(data, params);
          if (result.success)
            return result.data;
          throw result.error;
        }
        safeParse(data, params) {
          var _a;
          const ctx = {
            common: {
              issues: [],
              async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
              contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0, util_1.getParsedType)(data)
          };
          const result = this._parseSync({ data, path: ctx.path, parent: ctx });
          return handleResult(ctx, result);
        }
        async parseAsync(data, params) {
          const result = await this.safeParseAsync(data, params);
          if (result.success)
            return result.data;
          throw result.error;
        }
        async safeParseAsync(data, params) {
          const ctx = {
            common: {
              issues: [],
              contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
              async: true
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0, util_1.getParsedType)(data)
          };
          const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
          const result = await ((0, parseUtil_1.isAsync)(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
          return handleResult(ctx, result);
        }
        refine(check, message) {
          const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
              return { message };
            } else if (typeof message === "function") {
              return message(val);
            } else {
              return message;
            }
          };
          return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
              code: ZodError_1.ZodIssueCode.custom,
              ...getIssueProperties(val)
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
              return result.then((data) => {
                if (!data) {
                  setError();
                  return false;
                } else {
                  return true;
                }
              });
            }
            if (!result) {
              setError();
              return false;
            } else {
              return true;
            }
          });
        }
        refinement(check, refinementData) {
          return this._refinement((val, ctx) => {
            if (!check(val)) {
              ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
              return false;
            } else {
              return true;
            }
          });
        }
        _refinement(refinement) {
          return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement }
          });
        }
        superRefine(refinement) {
          return this._refinement(refinement);
        }
        optional() {
          return ZodOptional.create(this, this._def);
        }
        nullable() {
          return ZodNullable.create(this, this._def);
        }
        nullish() {
          return this.nullable().optional();
        }
        array() {
          return ZodArray.create(this, this._def);
        }
        promise() {
          return ZodPromise.create(this, this._def);
        }
        or(option) {
          return ZodUnion.create([this, option], this._def);
        }
        and(incoming) {
          return ZodIntersection.create(this, incoming, this._def);
        }
        transform(transform) {
          return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform }
          });
        }
        default(def) {
          const defaultValueFunc = typeof def === "function" ? def : () => def;
          return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault
          });
        }
        brand() {
          return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def)
          });
        }
        catch(def) {
          const catchValueFunc = typeof def === "function" ? def : () => def;
          return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch
          });
        }
        describe(description) {
          const This = this.constructor;
          return new This({
            ...this._def,
            description
          });
        }
        pipe(target) {
          return ZodPipeline.create(this, target);
        }
        isOptional() {
          return this.safeParse(void 0).success;
        }
        isNullable() {
          return this.safeParse(null).success;
        }
      };
      exports.ZodType = ZodType;
      exports.Schema = ZodType;
      exports.ZodSchema = ZodType;
      var cuidRegex = /^c[^\s-]{8,}$/i;
      var cuid2Regex = /^[a-z][a-z0-9]*$/;
      var ulidRegex = /[0-9A-HJKMNP-TV-Z]{26}/;
      var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
      var emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;
      var ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
      var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
      var datetimeRegex = (args) => {
        if (args.precision) {
          if (args.offset) {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
          } else {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
          }
        } else if (args.precision === 0) {
          if (args.offset) {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
          } else {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
          }
        } else {
          if (args.offset) {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
          } else {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
          }
        }
      };
      function isValidIP(ip, version) {
        if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
          return true;
        }
        if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
          return true;
        }
        return false;
      }
      var ZodString = class extends ZodType {
        constructor() {
          super(...arguments);
          this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
            validation,
            code: ZodError_1.ZodIssueCode.invalid_string,
            ...errorUtil_1.errorUtil.errToObj(message)
          });
          this.nonempty = (message) => this.min(1, errorUtil_1.errorUtil.errToObj(message));
          this.trim = () => new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }]
          });
          this.toLowerCase = () => new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }]
          });
          this.toUpperCase = () => new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }]
          });
        }
        _parse(input) {
          if (this._def.coerce) {
            input.data = String(input.data);
          }
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.string) {
            const ctx2 = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx2, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.string,
              received: ctx2.parsedType
            });
            return parseUtil_1.INVALID;
          }
          const status = new parseUtil_1.ParseStatus();
          let ctx = void 0;
          for (const check of this._def.checks) {
            if (check.kind === "min") {
              if (input.data.length < check.value) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: false,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "max") {
              if (input.data.length > check.value) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: false,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "length") {
              const tooBig = input.data.length > check.value;
              const tooSmall = input.data.length < check.value;
              if (tooBig || tooSmall) {
                ctx = this._getOrReturnCtx(input, ctx);
                if (tooBig) {
                  (0, parseUtil_1.addIssueToContext)(ctx, {
                    code: ZodError_1.ZodIssueCode.too_big,
                    maximum: check.value,
                    type: "string",
                    inclusive: true,
                    exact: true,
                    message: check.message
                  });
                } else if (tooSmall) {
                  (0, parseUtil_1.addIssueToContext)(ctx, {
                    code: ZodError_1.ZodIssueCode.too_small,
                    minimum: check.value,
                    type: "string",
                    inclusive: true,
                    exact: true,
                    message: check.message
                  });
                }
                status.dirty();
              }
            } else if (check.kind === "email") {
              if (!emailRegex.test(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "email",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "emoji") {
              if (!emojiRegex.test(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "emoji",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "uuid") {
              if (!uuidRegex.test(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "uuid",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "cuid") {
              if (!cuidRegex.test(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "cuid",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "cuid2") {
              if (!cuid2Regex.test(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "cuid2",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "ulid") {
              if (!ulidRegex.test(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "ulid",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "url") {
              try {
                new URL(input.data);
              } catch (_a) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "url",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "regex") {
              check.regex.lastIndex = 0;
              const testResult = check.regex.test(input.data);
              if (!testResult) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "regex",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "trim") {
              input.data = input.data.trim();
            } else if (check.kind === "includes") {
              if (!input.data.includes(check.value, check.position)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  validation: { includes: check.value, position: check.position },
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "toLowerCase") {
              input.data = input.data.toLowerCase();
            } else if (check.kind === "toUpperCase") {
              input.data = input.data.toUpperCase();
            } else if (check.kind === "startsWith") {
              if (!input.data.startsWith(check.value)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  validation: { startsWith: check.value },
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "endsWith") {
              if (!input.data.endsWith(check.value)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  validation: { endsWith: check.value },
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "datetime") {
              const regex = datetimeRegex(check);
              if (!regex.test(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  validation: "datetime",
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "ip") {
              if (!isValidIP(input.data, check.version)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  validation: "ip",
                  code: ZodError_1.ZodIssueCode.invalid_string,
                  message: check.message
                });
                status.dirty();
              }
            } else {
              util_1.util.assertNever(check);
            }
          }
          return { status: status.value, value: input.data };
        }
        _addCheck(check) {
          return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check]
          });
        }
        email(message) {
          return this._addCheck({ kind: "email", ...errorUtil_1.errorUtil.errToObj(message) });
        }
        url(message) {
          return this._addCheck({ kind: "url", ...errorUtil_1.errorUtil.errToObj(message) });
        }
        emoji(message) {
          return this._addCheck({ kind: "emoji", ...errorUtil_1.errorUtil.errToObj(message) });
        }
        uuid(message) {
          return this._addCheck({ kind: "uuid", ...errorUtil_1.errorUtil.errToObj(message) });
        }
        cuid(message) {
          return this._addCheck({ kind: "cuid", ...errorUtil_1.errorUtil.errToObj(message) });
        }
        cuid2(message) {
          return this._addCheck({ kind: "cuid2", ...errorUtil_1.errorUtil.errToObj(message) });
        }
        ulid(message) {
          return this._addCheck({ kind: "ulid", ...errorUtil_1.errorUtil.errToObj(message) });
        }
        ip(options) {
          return this._addCheck({ kind: "ip", ...errorUtil_1.errorUtil.errToObj(options) });
        }
        datetime(options) {
          var _a;
          if (typeof options === "string") {
            return this._addCheck({
              kind: "datetime",
              precision: null,
              offset: false,
              message: options
            });
          }
          return this._addCheck({
            kind: "datetime",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
            ...errorUtil_1.errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
          });
        }
        regex(regex, message) {
          return this._addCheck({
            kind: "regex",
            regex,
            ...errorUtil_1.errorUtil.errToObj(message)
          });
        }
        includes(value, options) {
          return this._addCheck({
            kind: "includes",
            value,
            position: options === null || options === void 0 ? void 0 : options.position,
            ...errorUtil_1.errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
          });
        }
        startsWith(value, message) {
          return this._addCheck({
            kind: "startsWith",
            value,
            ...errorUtil_1.errorUtil.errToObj(message)
          });
        }
        endsWith(value, message) {
          return this._addCheck({
            kind: "endsWith",
            value,
            ...errorUtil_1.errorUtil.errToObj(message)
          });
        }
        min(minLength, message) {
          return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil_1.errorUtil.errToObj(message)
          });
        }
        max(maxLength, message) {
          return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil_1.errorUtil.errToObj(message)
          });
        }
        length(len, message) {
          return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil_1.errorUtil.errToObj(message)
          });
        }
        get isDatetime() {
          return !!this._def.checks.find((ch) => ch.kind === "datetime");
        }
        get isEmail() {
          return !!this._def.checks.find((ch) => ch.kind === "email");
        }
        get isURL() {
          return !!this._def.checks.find((ch) => ch.kind === "url");
        }
        get isEmoji() {
          return !!this._def.checks.find((ch) => ch.kind === "emoji");
        }
        get isUUID() {
          return !!this._def.checks.find((ch) => ch.kind === "uuid");
        }
        get isCUID() {
          return !!this._def.checks.find((ch) => ch.kind === "cuid");
        }
        get isCUID2() {
          return !!this._def.checks.find((ch) => ch.kind === "cuid2");
        }
        get isULID() {
          return !!this._def.checks.find((ch) => ch.kind === "ulid");
        }
        get isIP() {
          return !!this._def.checks.find((ch) => ch.kind === "ip");
        }
        get minLength() {
          let min = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "min") {
              if (min === null || ch.value > min)
                min = ch.value;
            }
          }
          return min;
        }
        get maxLength() {
          let max = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "max") {
              if (max === null || ch.value < max)
                max = ch.value;
            }
          }
          return max;
        }
      };
      exports.ZodString = ZodString;
      ZodString.create = (params) => {
        var _a;
        return new ZodString({
          checks: [],
          typeName: ZodFirstPartyTypeKind.ZodString,
          coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
          ...processCreateParams(params)
        });
      };
      function floatSafeRemainder(val, step) {
        const valDecCount = (val.toString().split(".")[1] || "").length;
        const stepDecCount = (step.toString().split(".")[1] || "").length;
        const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
        const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
        const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
        return valInt % stepInt / Math.pow(10, decCount);
      }
      var ZodNumber = class extends ZodType {
        constructor() {
          super(...arguments);
          this.min = this.gte;
          this.max = this.lte;
          this.step = this.multipleOf;
        }
        _parse(input) {
          if (this._def.coerce) {
            input.data = Number(input.data);
          }
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.number) {
            const ctx2 = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx2, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.number,
              received: ctx2.parsedType
            });
            return parseUtil_1.INVALID;
          }
          let ctx = void 0;
          const status = new parseUtil_1.ParseStatus();
          for (const check of this._def.checks) {
            if (check.kind === "int") {
              if (!util_1.util.isInteger(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.invalid_type,
                  expected: "integer",
                  received: "float",
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "min") {
              const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
              if (tooSmall) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "number",
                  inclusive: check.inclusive,
                  exact: false,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "max") {
              const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
              if (tooBig) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "number",
                  inclusive: check.inclusive,
                  exact: false,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "multipleOf") {
              if (floatSafeRemainder(input.data, check.value) !== 0) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.not_multiple_of,
                  multipleOf: check.value,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "finite") {
              if (!Number.isFinite(input.data)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.not_finite,
                  message: check.message
                });
                status.dirty();
              }
            } else {
              util_1.util.assertNever(check);
            }
          }
          return { status: status.value, value: input.data };
        }
        gte(value, message) {
          return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
        }
        gt(value, message) {
          return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
        }
        lte(value, message) {
          return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
        }
        lt(value, message) {
          return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
        }
        setLimit(kind, value, inclusive, message) {
          return new ZodNumber({
            ...this._def,
            checks: [
              ...this._def.checks,
              {
                kind,
                value,
                inclusive,
                message: errorUtil_1.errorUtil.toString(message)
              }
            ]
          });
        }
        _addCheck(check) {
          return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check]
          });
        }
        int(message) {
          return this._addCheck({
            kind: "int",
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        positive(message) {
          return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        negative(message) {
          return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        nonpositive(message) {
          return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        nonnegative(message) {
          return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        multipleOf(value, message) {
          return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        finite(message) {
          return this._addCheck({
            kind: "finite",
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        safe(message) {
          return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil_1.errorUtil.toString(message)
          })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        get minValue() {
          let min = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "min") {
              if (min === null || ch.value > min)
                min = ch.value;
            }
          }
          return min;
        }
        get maxValue() {
          let max = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "max") {
              if (max === null || ch.value < max)
                max = ch.value;
            }
          }
          return max;
        }
        get isInt() {
          return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util_1.util.isInteger(ch.value));
        }
        get isFinite() {
          let max = null, min = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
              return true;
            } else if (ch.kind === "min") {
              if (min === null || ch.value > min)
                min = ch.value;
            } else if (ch.kind === "max") {
              if (max === null || ch.value < max)
                max = ch.value;
            }
          }
          return Number.isFinite(min) && Number.isFinite(max);
        }
      };
      exports.ZodNumber = ZodNumber;
      ZodNumber.create = (params) => {
        return new ZodNumber({
          checks: [],
          typeName: ZodFirstPartyTypeKind.ZodNumber,
          coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
          ...processCreateParams(params)
        });
      };
      var ZodBigInt = class extends ZodType {
        constructor() {
          super(...arguments);
          this.min = this.gte;
          this.max = this.lte;
        }
        _parse(input) {
          if (this._def.coerce) {
            input.data = BigInt(input.data);
          }
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.bigint) {
            const ctx2 = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx2, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.bigint,
              received: ctx2.parsedType
            });
            return parseUtil_1.INVALID;
          }
          let ctx = void 0;
          const status = new parseUtil_1.ParseStatus();
          for (const check of this._def.checks) {
            if (check.kind === "min") {
              const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
              if (tooSmall) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_small,
                  type: "bigint",
                  minimum: check.value,
                  inclusive: check.inclusive,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "max") {
              const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
              if (tooBig) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_big,
                  type: "bigint",
                  maximum: check.value,
                  inclusive: check.inclusive,
                  message: check.message
                });
                status.dirty();
              }
            } else if (check.kind === "multipleOf") {
              if (input.data % check.value !== BigInt(0)) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.not_multiple_of,
                  multipleOf: check.value,
                  message: check.message
                });
                status.dirty();
              }
            } else {
              util_1.util.assertNever(check);
            }
          }
          return { status: status.value, value: input.data };
        }
        gte(value, message) {
          return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
        }
        gt(value, message) {
          return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
        }
        lte(value, message) {
          return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
        }
        lt(value, message) {
          return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
        }
        setLimit(kind, value, inclusive, message) {
          return new ZodBigInt({
            ...this._def,
            checks: [
              ...this._def.checks,
              {
                kind,
                value,
                inclusive,
                message: errorUtil_1.errorUtil.toString(message)
              }
            ]
          });
        }
        _addCheck(check) {
          return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check]
          });
        }
        positive(message) {
          return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        negative(message) {
          return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        nonpositive(message) {
          return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        nonnegative(message) {
          return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        multipleOf(value, message) {
          return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        get minValue() {
          let min = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "min") {
              if (min === null || ch.value > min)
                min = ch.value;
            }
          }
          return min;
        }
        get maxValue() {
          let max = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "max") {
              if (max === null || ch.value < max)
                max = ch.value;
            }
          }
          return max;
        }
      };
      exports.ZodBigInt = ZodBigInt;
      ZodBigInt.create = (params) => {
        var _a;
        return new ZodBigInt({
          checks: [],
          typeName: ZodFirstPartyTypeKind.ZodBigInt,
          coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
          ...processCreateParams(params)
        });
      };
      var ZodBoolean = class extends ZodType {
        _parse(input) {
          if (this._def.coerce) {
            input.data = Boolean(input.data);
          }
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.boolean,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          return (0, parseUtil_1.OK)(input.data);
        }
      };
      exports.ZodBoolean = ZodBoolean;
      ZodBoolean.create = (params) => {
        return new ZodBoolean({
          typeName: ZodFirstPartyTypeKind.ZodBoolean,
          coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
          ...processCreateParams(params)
        });
      };
      var ZodDate = class extends ZodType {
        _parse(input) {
          if (this._def.coerce) {
            input.data = new Date(input.data);
          }
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.date) {
            const ctx2 = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx2, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.date,
              received: ctx2.parsedType
            });
            return parseUtil_1.INVALID;
          }
          if (isNaN(input.data.getTime())) {
            const ctx2 = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx2, {
              code: ZodError_1.ZodIssueCode.invalid_date
            });
            return parseUtil_1.INVALID;
          }
          const status = new parseUtil_1.ParseStatus();
          let ctx = void 0;
          for (const check of this._def.checks) {
            if (check.kind === "min") {
              if (input.data.getTime() < check.value) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_small,
                  message: check.message,
                  inclusive: true,
                  exact: false,
                  minimum: check.value,
                  type: "date"
                });
                status.dirty();
              }
            } else if (check.kind === "max") {
              if (input.data.getTime() > check.value) {
                ctx = this._getOrReturnCtx(input, ctx);
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_big,
                  message: check.message,
                  inclusive: true,
                  exact: false,
                  maximum: check.value,
                  type: "date"
                });
                status.dirty();
              }
            } else {
              util_1.util.assertNever(check);
            }
          }
          return {
            status: status.value,
            value: new Date(input.data.getTime())
          };
        }
        _addCheck(check) {
          return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check]
          });
        }
        min(minDate, message) {
          return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        max(maxDate, message) {
          return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil_1.errorUtil.toString(message)
          });
        }
        get minDate() {
          let min = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "min") {
              if (min === null || ch.value > min)
                min = ch.value;
            }
          }
          return min != null ? new Date(min) : null;
        }
        get maxDate() {
          let max = null;
          for (const ch of this._def.checks) {
            if (ch.kind === "max") {
              if (max === null || ch.value < max)
                max = ch.value;
            }
          }
          return max != null ? new Date(max) : null;
        }
      };
      exports.ZodDate = ZodDate;
      ZodDate.create = (params) => {
        return new ZodDate({
          checks: [],
          coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
          typeName: ZodFirstPartyTypeKind.ZodDate,
          ...processCreateParams(params)
        });
      };
      var ZodSymbol = class extends ZodType {
        _parse(input) {
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.symbol,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          return (0, parseUtil_1.OK)(input.data);
        }
      };
      exports.ZodSymbol = ZodSymbol;
      ZodSymbol.create = (params) => {
        return new ZodSymbol({
          typeName: ZodFirstPartyTypeKind.ZodSymbol,
          ...processCreateParams(params)
        });
      };
      var ZodUndefined = class extends ZodType {
        _parse(input) {
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.undefined,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          return (0, parseUtil_1.OK)(input.data);
        }
      };
      exports.ZodUndefined = ZodUndefined;
      ZodUndefined.create = (params) => {
        return new ZodUndefined({
          typeName: ZodFirstPartyTypeKind.ZodUndefined,
          ...processCreateParams(params)
        });
      };
      var ZodNull = class extends ZodType {
        _parse(input) {
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.null,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          return (0, parseUtil_1.OK)(input.data);
        }
      };
      exports.ZodNull = ZodNull;
      ZodNull.create = (params) => {
        return new ZodNull({
          typeName: ZodFirstPartyTypeKind.ZodNull,
          ...processCreateParams(params)
        });
      };
      var ZodAny = class extends ZodType {
        constructor() {
          super(...arguments);
          this._any = true;
        }
        _parse(input) {
          return (0, parseUtil_1.OK)(input.data);
        }
      };
      exports.ZodAny = ZodAny;
      ZodAny.create = (params) => {
        return new ZodAny({
          typeName: ZodFirstPartyTypeKind.ZodAny,
          ...processCreateParams(params)
        });
      };
      var ZodUnknown = class extends ZodType {
        constructor() {
          super(...arguments);
          this._unknown = true;
        }
        _parse(input) {
          return (0, parseUtil_1.OK)(input.data);
        }
      };
      exports.ZodUnknown = ZodUnknown;
      ZodUnknown.create = (params) => {
        return new ZodUnknown({
          typeName: ZodFirstPartyTypeKind.ZodUnknown,
          ...processCreateParams(params)
        });
      };
      var ZodNever = class extends ZodType {
        _parse(input) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.never,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
      };
      exports.ZodNever = ZodNever;
      ZodNever.create = (params) => {
        return new ZodNever({
          typeName: ZodFirstPartyTypeKind.ZodNever,
          ...processCreateParams(params)
        });
      };
      var ZodVoid = class extends ZodType {
        _parse(input) {
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.void,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          return (0, parseUtil_1.OK)(input.data);
        }
      };
      exports.ZodVoid = ZodVoid;
      ZodVoid.create = (params) => {
        return new ZodVoid({
          typeName: ZodFirstPartyTypeKind.ZodVoid,
          ...processCreateParams(params)
        });
      };
      var ZodArray = class extends ZodType {
        _parse(input) {
          const { ctx, status } = this._processInputParams(input);
          const def = this._def;
          if (ctx.parsedType !== util_1.ZodParsedType.array) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.array,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: tooBig ? ZodError_1.ZodIssueCode.too_big : ZodError_1.ZodIssueCode.too_small,
                minimum: tooSmall ? def.exactLength.value : void 0,
                maximum: tooBig ? def.exactLength.value : void 0,
                type: "array",
                inclusive: true,
                exact: true,
                message: def.exactLength.message
              });
              status.dirty();
            }
          }
          if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                minimum: def.minLength.value,
                type: "array",
                inclusive: true,
                exact: false,
                message: def.minLength.message
              });
              status.dirty();
            }
          }
          if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                maximum: def.maxLength.value,
                type: "array",
                inclusive: true,
                exact: false,
                message: def.maxLength.message
              });
              status.dirty();
            }
          }
          if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i3) => {
              return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i3));
            })).then((result2) => {
              return parseUtil_1.ParseStatus.mergeArray(status, result2);
            });
          }
          const result = [...ctx.data].map((item, i3) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i3));
          });
          return parseUtil_1.ParseStatus.mergeArray(status, result);
        }
        get element() {
          return this._def.type;
        }
        min(minLength, message) {
          return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil_1.errorUtil.toString(message) }
          });
        }
        max(maxLength, message) {
          return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil_1.errorUtil.toString(message) }
          });
        }
        length(len, message) {
          return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: errorUtil_1.errorUtil.toString(message) }
          });
        }
        nonempty(message) {
          return this.min(1, message);
        }
      };
      exports.ZodArray = ZodArray;
      ZodArray.create = (schema, params) => {
        return new ZodArray({
          type: schema,
          minLength: null,
          maxLength: null,
          exactLength: null,
          typeName: ZodFirstPartyTypeKind.ZodArray,
          ...processCreateParams(params)
        });
      };
      function deepPartialify(schema) {
        if (schema instanceof ZodObject) {
          const newShape = {};
          for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
          }
          return new ZodObject({
            ...schema._def,
            shape: () => newShape
          });
        } else if (schema instanceof ZodArray) {
          return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element)
          });
        } else if (schema instanceof ZodOptional) {
          return ZodOptional.create(deepPartialify(schema.unwrap()));
        } else if (schema instanceof ZodNullable) {
          return ZodNullable.create(deepPartialify(schema.unwrap()));
        } else if (schema instanceof ZodTuple) {
          return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
        } else {
          return schema;
        }
      }
      var ZodObject = class extends ZodType {
        constructor() {
          super(...arguments);
          this._cached = null;
          this.nonstrict = this.passthrough;
          this.augment = this.extend;
        }
        _getCached() {
          if (this._cached !== null)
            return this._cached;
          const shape = this._def.shape();
          const keys = util_1.util.objectKeys(shape);
          return this._cached = { shape, keys };
        }
        _parse(input) {
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.object) {
            const ctx2 = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx2, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.object,
              received: ctx2.parsedType
            });
            return parseUtil_1.INVALID;
          }
          const { status, ctx } = this._processInputParams(input);
          const { shape, keys: shapeKeys } = this._getCached();
          const extraKeys = [];
          if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
              if (!shapeKeys.includes(key)) {
                extraKeys.push(key);
              }
            }
          }
          const pairs = [];
          for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
              alwaysSet: key in ctx.data
            });
          }
          if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
              for (const key of extraKeys) {
                pairs.push({
                  key: { status: "valid", value: key },
                  value: { status: "valid", value: ctx.data[key] }
                });
              }
            } else if (unknownKeys === "strict") {
              if (extraKeys.length > 0) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.unrecognized_keys,
                  keys: extraKeys
                });
                status.dirty();
              }
            } else if (unknownKeys === "strip") {
            } else {
              throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
          } else {
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
              const value = ctx.data[key];
              pairs.push({
                key: { status: "valid", value: key },
                value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data
              });
            }
          }
          if (ctx.common.async) {
            return Promise.resolve().then(async () => {
              const syncPairs = [];
              for (const pair of pairs) {
                const key = await pair.key;
                syncPairs.push({
                  key,
                  value: await pair.value,
                  alwaysSet: pair.alwaysSet
                });
              }
              return syncPairs;
            }).then((syncPairs) => {
              return parseUtil_1.ParseStatus.mergeObjectSync(status, syncPairs);
            });
          } else {
            return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
          }
        }
        get shape() {
          return this._def.shape();
        }
        strict(message) {
          errorUtil_1.errorUtil.errToObj;
          return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...message !== void 0 ? {
              errorMap: (issue, ctx) => {
                var _a, _b, _c, _d;
                const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
                if (issue.code === "unrecognized_keys")
                  return {
                    message: (_d = errorUtil_1.errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                  };
                return {
                  message: defaultError
                };
              }
            } : {}
          });
        }
        strip() {
          return new ZodObject({
            ...this._def,
            unknownKeys: "strip"
          });
        }
        passthrough() {
          return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough"
          });
        }
        extend(augmentation) {
          return new ZodObject({
            ...this._def,
            shape: () => ({
              ...this._def.shape(),
              ...augmentation
            })
          });
        }
        merge(merging) {
          const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
              ...this._def.shape(),
              ...merging._def.shape()
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject
          });
          return merged;
        }
        setKey(key, schema) {
          return this.augment({ [key]: schema });
        }
        catchall(index) {
          return new ZodObject({
            ...this._def,
            catchall: index
          });
        }
        pick(mask) {
          const shape = {};
          util_1.util.objectKeys(mask).forEach((key) => {
            if (mask[key] && this.shape[key]) {
              shape[key] = this.shape[key];
            }
          });
          return new ZodObject({
            ...this._def,
            shape: () => shape
          });
        }
        omit(mask) {
          const shape = {};
          util_1.util.objectKeys(this.shape).forEach((key) => {
            if (!mask[key]) {
              shape[key] = this.shape[key];
            }
          });
          return new ZodObject({
            ...this._def,
            shape: () => shape
          });
        }
        deepPartial() {
          return deepPartialify(this);
        }
        partial(mask) {
          const newShape = {};
          util_1.util.objectKeys(this.shape).forEach((key) => {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
              newShape[key] = fieldSchema;
            } else {
              newShape[key] = fieldSchema.optional();
            }
          });
          return new ZodObject({
            ...this._def,
            shape: () => newShape
          });
        }
        required(mask) {
          const newShape = {};
          util_1.util.objectKeys(this.shape).forEach((key) => {
            if (mask && !mask[key]) {
              newShape[key] = this.shape[key];
            } else {
              const fieldSchema = this.shape[key];
              let newField = fieldSchema;
              while (newField instanceof ZodOptional) {
                newField = newField._def.innerType;
              }
              newShape[key] = newField;
            }
          });
          return new ZodObject({
            ...this._def,
            shape: () => newShape
          });
        }
        keyof() {
          return createZodEnum(util_1.util.objectKeys(this.shape));
        }
      };
      exports.ZodObject = ZodObject;
      ZodObject.create = (shape, params) => {
        return new ZodObject({
          shape: () => shape,
          unknownKeys: "strip",
          catchall: ZodNever.create(),
          typeName: ZodFirstPartyTypeKind.ZodObject,
          ...processCreateParams(params)
        });
      };
      ZodObject.strictCreate = (shape, params) => {
        return new ZodObject({
          shape: () => shape,
          unknownKeys: "strict",
          catchall: ZodNever.create(),
          typeName: ZodFirstPartyTypeKind.ZodObject,
          ...processCreateParams(params)
        });
      };
      ZodObject.lazycreate = (shape, params) => {
        return new ZodObject({
          shape,
          unknownKeys: "strip",
          catchall: ZodNever.create(),
          typeName: ZodFirstPartyTypeKind.ZodObject,
          ...processCreateParams(params)
        });
      };
      var ZodUnion = class extends ZodType {
        _parse(input) {
          const { ctx } = this._processInputParams(input);
          const options = this._def.options;
          function handleResults(results) {
            for (const result of results) {
              if (result.result.status === "valid") {
                return result.result;
              }
            }
            for (const result of results) {
              if (result.result.status === "dirty") {
                ctx.common.issues.push(...result.ctx.common.issues);
                return result.result;
              }
            }
            const unionErrors = results.map((result) => new ZodError_1.ZodError(result.ctx.common.issues));
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_union,
              unionErrors
            });
            return parseUtil_1.INVALID;
          }
          if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
              const childCtx = {
                ...ctx,
                common: {
                  ...ctx.common,
                  issues: []
                },
                parent: null
              };
              return {
                result: await option._parseAsync({
                  data: ctx.data,
                  path: ctx.path,
                  parent: childCtx
                }),
                ctx: childCtx
              };
            })).then(handleResults);
          } else {
            let dirty = void 0;
            const issues = [];
            for (const option of options) {
              const childCtx = {
                ...ctx,
                common: {
                  ...ctx.common,
                  issues: []
                },
                parent: null
              };
              const result = option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              });
              if (result.status === "valid") {
                return result;
              } else if (result.status === "dirty" && !dirty) {
                dirty = { result, ctx: childCtx };
              }
              if (childCtx.common.issues.length) {
                issues.push(childCtx.common.issues);
              }
            }
            if (dirty) {
              ctx.common.issues.push(...dirty.ctx.common.issues);
              return dirty.result;
            }
            const unionErrors = issues.map((issues2) => new ZodError_1.ZodError(issues2));
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_union,
              unionErrors
            });
            return parseUtil_1.INVALID;
          }
        }
        get options() {
          return this._def.options;
        }
      };
      exports.ZodUnion = ZodUnion;
      ZodUnion.create = (types, params) => {
        return new ZodUnion({
          options: types,
          typeName: ZodFirstPartyTypeKind.ZodUnion,
          ...processCreateParams(params)
        });
      };
      var getDiscriminator = (type) => {
        if (type instanceof ZodLazy) {
          return getDiscriminator(type.schema);
        } else if (type instanceof ZodEffects) {
          return getDiscriminator(type.innerType());
        } else if (type instanceof ZodLiteral) {
          return [type.value];
        } else if (type instanceof ZodEnum) {
          return type.options;
        } else if (type instanceof ZodNativeEnum) {
          return Object.keys(type.enum);
        } else if (type instanceof ZodDefault) {
          return getDiscriminator(type._def.innerType);
        } else if (type instanceof ZodUndefined) {
          return [void 0];
        } else if (type instanceof ZodNull) {
          return [null];
        } else {
          return null;
        }
      };
      var ZodDiscriminatedUnion = class extends ZodType {
        _parse(input) {
          const { ctx } = this._processInputParams(input);
          if (ctx.parsedType !== util_1.ZodParsedType.object) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.object,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          const discriminator = this.discriminator;
          const discriminatorValue = ctx.data[discriminator];
          const option = this.optionsMap.get(discriminatorValue);
          if (!option) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_union_discriminator,
              options: Array.from(this.optionsMap.keys()),
              path: [discriminator]
            });
            return parseUtil_1.INVALID;
          }
          if (ctx.common.async) {
            return option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
          } else {
            return option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
          }
        }
        get discriminator() {
          return this._def.discriminator;
        }
        get options() {
          return this._def.options;
        }
        get optionsMap() {
          return this._def.optionsMap;
        }
        static create(discriminator, options, params) {
          const optionsMap = new Map();
          for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues) {
              throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
              if (optionsMap.has(value)) {
                throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
              }
              optionsMap.set(value, type);
            }
          }
          return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params)
          });
        }
      };
      exports.ZodDiscriminatedUnion = ZodDiscriminatedUnion;
      function mergeValues(a3, b2) {
        const aType = (0, util_1.getParsedType)(a3);
        const bType = (0, util_1.getParsedType)(b2);
        if (a3 === b2) {
          return { valid: true, data: a3 };
        } else if (aType === util_1.ZodParsedType.object && bType === util_1.ZodParsedType.object) {
          const bKeys = util_1.util.objectKeys(b2);
          const sharedKeys = util_1.util.objectKeys(a3).filter((key) => bKeys.indexOf(key) !== -1);
          const newObj = { ...a3, ...b2 };
          for (const key of sharedKeys) {
            const sharedValue = mergeValues(a3[key], b2[key]);
            if (!sharedValue.valid) {
              return { valid: false };
            }
            newObj[key] = sharedValue.data;
          }
          return { valid: true, data: newObj };
        } else if (aType === util_1.ZodParsedType.array && bType === util_1.ZodParsedType.array) {
          if (a3.length !== b2.length) {
            return { valid: false };
          }
          const newArray = [];
          for (let index = 0; index < a3.length; index++) {
            const itemA = a3[index];
            const itemB = b2[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
              return { valid: false };
            }
            newArray.push(sharedValue.data);
          }
          return { valid: true, data: newArray };
        } else if (aType === util_1.ZodParsedType.date && bType === util_1.ZodParsedType.date && +a3 === +b2) {
          return { valid: true, data: a3 };
        } else {
          return { valid: false };
        }
      }
      var ZodIntersection = class extends ZodType {
        _parse(input) {
          const { status, ctx } = this._processInputParams(input);
          const handleParsed = (parsedLeft, parsedRight) => {
            if ((0, parseUtil_1.isAborted)(parsedLeft) || (0, parseUtil_1.isAborted)(parsedRight)) {
              return parseUtil_1.INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_intersection_types
              });
              return parseUtil_1.INVALID;
            }
            if ((0, parseUtil_1.isDirty)(parsedLeft) || (0, parseUtil_1.isDirty)(parsedRight)) {
              status.dirty();
            }
            return { status: status.value, value: merged.data };
          };
          if (ctx.common.async) {
            return Promise.all([
              this._def.left._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
              }),
              this._def.right._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
              })
            ]).then(([left, right]) => handleParsed(left, right));
          } else {
            return handleParsed(this._def.left._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }), this._def.right._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }));
          }
        }
      };
      exports.ZodIntersection = ZodIntersection;
      ZodIntersection.create = (left, right, params) => {
        return new ZodIntersection({
          left,
          right,
          typeName: ZodFirstPartyTypeKind.ZodIntersection,
          ...processCreateParams(params)
        });
      };
      var ZodTuple = class extends ZodType {
        _parse(input) {
          const { status, ctx } = this._processInputParams(input);
          if (ctx.parsedType !== util_1.ZodParsedType.array) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.array,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          if (ctx.data.length < this._def.items.length) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_small,
              minimum: this._def.items.length,
              inclusive: true,
              exact: false,
              type: "array"
            });
            return parseUtil_1.INVALID;
          }
          const rest = this._def.rest;
          if (!rest && ctx.data.length > this._def.items.length) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_big,
              maximum: this._def.items.length,
              inclusive: true,
              exact: false,
              type: "array"
            });
            status.dirty();
          }
          const items = [...ctx.data].map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
              return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
          }).filter((x2) => !!x2);
          if (ctx.common.async) {
            return Promise.all(items).then((results) => {
              return parseUtil_1.ParseStatus.mergeArray(status, results);
            });
          } else {
            return parseUtil_1.ParseStatus.mergeArray(status, items);
          }
        }
        get items() {
          return this._def.items;
        }
        rest(rest) {
          return new ZodTuple({
            ...this._def,
            rest
          });
        }
      };
      exports.ZodTuple = ZodTuple;
      ZodTuple.create = (schemas, params) => {
        if (!Array.isArray(schemas)) {
          throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
        }
        return new ZodTuple({
          items: schemas,
          typeName: ZodFirstPartyTypeKind.ZodTuple,
          rest: null,
          ...processCreateParams(params)
        });
      };
      var ZodRecord = class extends ZodType {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(input) {
          const { status, ctx } = this._processInputParams(input);
          if (ctx.parsedType !== util_1.ZodParsedType.object) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.object,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          const pairs = [];
          const keyType = this._def.keyType;
          const valueType = this._def.valueType;
          for (const key in ctx.data) {
            pairs.push({
              key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
              value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
            });
          }
          if (ctx.common.async) {
            return parseUtil_1.ParseStatus.mergeObjectAsync(status, pairs);
          } else {
            return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
          }
        }
        get element() {
          return this._def.valueType;
        }
        static create(first, second, third) {
          if (second instanceof ZodType) {
            return new ZodRecord({
              keyType: first,
              valueType: second,
              typeName: ZodFirstPartyTypeKind.ZodRecord,
              ...processCreateParams(third)
            });
          }
          return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second)
          });
        }
      };
      exports.ZodRecord = ZodRecord;
      var ZodMap = class extends ZodType {
        _parse(input) {
          const { status, ctx } = this._processInputParams(input);
          if (ctx.parsedType !== util_1.ZodParsedType.map) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.map,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          const keyType = this._def.keyType;
          const valueType = this._def.valueType;
          const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
              key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
              value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
            };
          });
          if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
              for (const pair of pairs) {
                const key = await pair.key;
                const value = await pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                  return parseUtil_1.INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                  status.dirty();
                }
                finalMap.set(key.value, value.value);
              }
              return { status: status.value, value: finalMap };
            });
          } else {
            const finalMap = new Map();
            for (const pair of pairs) {
              const key = pair.key;
              const value = pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return parseUtil_1.INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          }
        }
      };
      exports.ZodMap = ZodMap;
      ZodMap.create = (keyType, valueType, params) => {
        return new ZodMap({
          valueType,
          keyType,
          typeName: ZodFirstPartyTypeKind.ZodMap,
          ...processCreateParams(params)
        });
      };
      var ZodSet = class extends ZodType {
        _parse(input) {
          const { status, ctx } = this._processInputParams(input);
          if (ctx.parsedType !== util_1.ZodParsedType.set) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.set,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          const def = this._def;
          if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                minimum: def.minSize.value,
                type: "set",
                inclusive: true,
                exact: false,
                message: def.minSize.message
              });
              status.dirty();
            }
          }
          if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                maximum: def.maxSize.value,
                type: "set",
                inclusive: true,
                exact: false,
                message: def.maxSize.message
              });
              status.dirty();
            }
          }
          const valueType = this._def.valueType;
          function finalizeSet(elements2) {
            const parsedSet = new Set();
            for (const element of elements2) {
              if (element.status === "aborted")
                return parseUtil_1.INVALID;
              if (element.status === "dirty")
                status.dirty();
              parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
          }
          const elements = [...ctx.data.values()].map((item, i3) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i3)));
          if (ctx.common.async) {
            return Promise.all(elements).then((elements2) => finalizeSet(elements2));
          } else {
            return finalizeSet(elements);
          }
        }
        min(minSize, message) {
          return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil_1.errorUtil.toString(message) }
          });
        }
        max(maxSize, message) {
          return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil_1.errorUtil.toString(message) }
          });
        }
        size(size, message) {
          return this.min(size, message).max(size, message);
        }
        nonempty(message) {
          return this.min(1, message);
        }
      };
      exports.ZodSet = ZodSet;
      ZodSet.create = (valueType, params) => {
        return new ZodSet({
          valueType,
          minSize: null,
          maxSize: null,
          typeName: ZodFirstPartyTypeKind.ZodSet,
          ...processCreateParams(params)
        });
      };
      var ZodFunction = class extends ZodType {
        constructor() {
          super(...arguments);
          this.validate = this.implement;
        }
        _parse(input) {
          const { ctx } = this._processInputParams(input);
          if (ctx.parsedType !== util_1.ZodParsedType.function) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.function,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          function makeArgsIssue(args, error) {
            return (0, parseUtil_1.makeIssue)({
              data: args,
              path: ctx.path,
              errorMaps: [
                ctx.common.contextualErrorMap,
                ctx.schemaErrorMap,
                (0, errors_1.getErrorMap)(),
                errors_1.defaultErrorMap
              ].filter((x2) => !!x2),
              issueData: {
                code: ZodError_1.ZodIssueCode.invalid_arguments,
                argumentsError: error
              }
            });
          }
          function makeReturnsIssue(returns, error) {
            return (0, parseUtil_1.makeIssue)({
              data: returns,
              path: ctx.path,
              errorMaps: [
                ctx.common.contextualErrorMap,
                ctx.schemaErrorMap,
                (0, errors_1.getErrorMap)(),
                errors_1.defaultErrorMap
              ].filter((x2) => !!x2),
              issueData: {
                code: ZodError_1.ZodIssueCode.invalid_return_type,
                returnTypeError: error
              }
            });
          }
          const params = { errorMap: ctx.common.contextualErrorMap };
          const fn = ctx.data;
          if (this._def.returns instanceof ZodPromise) {
            return (0, parseUtil_1.OK)(async (...args) => {
              const error = new ZodError_1.ZodError([]);
              const parsedArgs = await this._def.args.parseAsync(args, params).catch((e4) => {
                error.addIssue(makeArgsIssue(args, e4));
                throw error;
              });
              const result = await fn(...parsedArgs);
              const parsedReturns = await this._def.returns._def.type.parseAsync(result, params).catch((e4) => {
                error.addIssue(makeReturnsIssue(result, e4));
                throw error;
              });
              return parsedReturns;
            });
          } else {
            return (0, parseUtil_1.OK)((...args) => {
              const parsedArgs = this._def.args.safeParse(args, params);
              if (!parsedArgs.success) {
                throw new ZodError_1.ZodError([makeArgsIssue(args, parsedArgs.error)]);
              }
              const result = fn(...parsedArgs.data);
              const parsedReturns = this._def.returns.safeParse(result, params);
              if (!parsedReturns.success) {
                throw new ZodError_1.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
              }
              return parsedReturns.data;
            });
          }
        }
        parameters() {
          return this._def.args;
        }
        returnType() {
          return this._def.returns;
        }
        args(...items) {
          return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create())
          });
        }
        returns(returnType) {
          return new ZodFunction({
            ...this._def,
            returns: returnType
          });
        }
        implement(func) {
          const validatedFunc = this.parse(func);
          return validatedFunc;
        }
        strictImplement(func) {
          const validatedFunc = this.parse(func);
          return validatedFunc;
        }
        static create(args, returns, params) {
          return new ZodFunction({
            args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params)
          });
        }
      };
      exports.ZodFunction = ZodFunction;
      var ZodLazy = class extends ZodType {
        get schema() {
          return this._def.getter();
        }
        _parse(input) {
          const { ctx } = this._processInputParams(input);
          const lazySchema = this._def.getter();
          return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
        }
      };
      exports.ZodLazy = ZodLazy;
      ZodLazy.create = (getter, params) => {
        return new ZodLazy({
          getter,
          typeName: ZodFirstPartyTypeKind.ZodLazy,
          ...processCreateParams(params)
        });
      };
      var ZodLiteral = class extends ZodType {
        _parse(input) {
          if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              received: ctx.data,
              code: ZodError_1.ZodIssueCode.invalid_literal,
              expected: this._def.value
            });
            return parseUtil_1.INVALID;
          }
          return { status: "valid", value: input.data };
        }
        get value() {
          return this._def.value;
        }
      };
      exports.ZodLiteral = ZodLiteral;
      ZodLiteral.create = (value, params) => {
        return new ZodLiteral({
          value,
          typeName: ZodFirstPartyTypeKind.ZodLiteral,
          ...processCreateParams(params)
        });
      };
      function createZodEnum(values, params) {
        return new ZodEnum({
          values,
          typeName: ZodFirstPartyTypeKind.ZodEnum,
          ...processCreateParams(params)
        });
      }
      var ZodEnum = class extends ZodType {
        _parse(input) {
          if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            (0, parseUtil_1.addIssueToContext)(ctx, {
              expected: util_1.util.joinValues(expectedValues),
              received: ctx.parsedType,
              code: ZodError_1.ZodIssueCode.invalid_type
            });
            return parseUtil_1.INVALID;
          }
          if (this._def.values.indexOf(input.data) === -1) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            (0, parseUtil_1.addIssueToContext)(ctx, {
              received: ctx.data,
              code: ZodError_1.ZodIssueCode.invalid_enum_value,
              options: expectedValues
            });
            return parseUtil_1.INVALID;
          }
          return (0, parseUtil_1.OK)(input.data);
        }
        get options() {
          return this._def.values;
        }
        get enum() {
          const enumValues = {};
          for (const val of this._def.values) {
            enumValues[val] = val;
          }
          return enumValues;
        }
        get Values() {
          const enumValues = {};
          for (const val of this._def.values) {
            enumValues[val] = val;
          }
          return enumValues;
        }
        get Enum() {
          const enumValues = {};
          for (const val of this._def.values) {
            enumValues[val] = val;
          }
          return enumValues;
        }
        extract(values) {
          return ZodEnum.create(values);
        }
        exclude(values) {
          return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
        }
      };
      exports.ZodEnum = ZodEnum;
      ZodEnum.create = createZodEnum;
      var ZodNativeEnum = class extends ZodType {
        _parse(input) {
          const nativeEnumValues = util_1.util.getValidEnumValues(this._def.values);
          const ctx = this._getOrReturnCtx(input);
          if (ctx.parsedType !== util_1.ZodParsedType.string && ctx.parsedType !== util_1.ZodParsedType.number) {
            const expectedValues = util_1.util.objectValues(nativeEnumValues);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              expected: util_1.util.joinValues(expectedValues),
              received: ctx.parsedType,
              code: ZodError_1.ZodIssueCode.invalid_type
            });
            return parseUtil_1.INVALID;
          }
          if (nativeEnumValues.indexOf(input.data) === -1) {
            const expectedValues = util_1.util.objectValues(nativeEnumValues);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              received: ctx.data,
              code: ZodError_1.ZodIssueCode.invalid_enum_value,
              options: expectedValues
            });
            return parseUtil_1.INVALID;
          }
          return (0, parseUtil_1.OK)(input.data);
        }
        get enum() {
          return this._def.values;
        }
      };
      exports.ZodNativeEnum = ZodNativeEnum;
      ZodNativeEnum.create = (values, params) => {
        return new ZodNativeEnum({
          values,
          typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
          ...processCreateParams(params)
        });
      };
      var ZodPromise = class extends ZodType {
        unwrap() {
          return this._def.type;
        }
        _parse(input) {
          const { ctx } = this._processInputParams(input);
          if (ctx.parsedType !== util_1.ZodParsedType.promise && ctx.common.async === false) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.promise,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          const promisified = ctx.parsedType === util_1.ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
          return (0, parseUtil_1.OK)(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
              path: ctx.path,
              errorMap: ctx.common.contextualErrorMap
            });
          }));
        }
      };
      exports.ZodPromise = ZodPromise;
      ZodPromise.create = (schema, params) => {
        return new ZodPromise({
          type: schema,
          typeName: ZodFirstPartyTypeKind.ZodPromise,
          ...processCreateParams(params)
        });
      };
      var ZodEffects = class extends ZodType {
        innerType() {
          return this._def.schema;
        }
        sourceType() {
          return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
        }
        _parse(input) {
          const { status, ctx } = this._processInputParams(input);
          const effect = this._def.effect || null;
          if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data);
            if (ctx.common.async) {
              return Promise.resolve(processed).then((processed2) => {
                return this._def.schema._parseAsync({
                  data: processed2,
                  path: ctx.path,
                  parent: ctx
                });
              });
            } else {
              return this._def.schema._parseSync({
                data: processed,
                path: ctx.path,
                parent: ctx
              });
            }
          }
          const checkCtx = {
            addIssue: (arg) => {
              (0, parseUtil_1.addIssueToContext)(ctx, arg);
              if (arg.fatal) {
                status.abort();
              } else {
                status.dirty();
              }
            },
            get path() {
              return ctx.path;
            }
          };
          checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
          if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
              const result = effect.refinement(acc, checkCtx);
              if (ctx.common.async) {
                return Promise.resolve(result);
              }
              if (result instanceof Promise) {
                throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
              }
              return acc;
            };
            if (ctx.common.async === false) {
              const inner = this._def.schema._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
              });
              if (inner.status === "aborted")
                return parseUtil_1.INVALID;
              if (inner.status === "dirty")
                status.dirty();
              executeRefinement(inner.value);
              return { status: status.value, value: inner.value };
            } else {
              return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
                if (inner.status === "aborted")
                  return parseUtil_1.INVALID;
                if (inner.status === "dirty")
                  status.dirty();
                return executeRefinement(inner.value).then(() => {
                  return { status: status.value, value: inner.value };
                });
              });
            }
          }
          if (effect.type === "transform") {
            if (ctx.common.async === false) {
              const base = this._def.schema._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
              });
              if (!(0, parseUtil_1.isValid)(base))
                return base;
              const result = effect.transform(base.value, checkCtx);
              if (result instanceof Promise) {
                throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
              }
              return { status: status.value, value: result };
            } else {
              return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
                if (!(0, parseUtil_1.isValid)(base))
                  return base;
                return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
              });
            }
          }
          util_1.util.assertNever(effect);
        }
      };
      exports.ZodEffects = ZodEffects;
      exports.ZodTransformer = ZodEffects;
      ZodEffects.create = (schema, effect, params) => {
        return new ZodEffects({
          schema,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect,
          ...processCreateParams(params)
        });
      };
      ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
        return new ZodEffects({
          schema,
          effect: { type: "preprocess", transform: preprocess },
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          ...processCreateParams(params)
        });
      };
      var ZodOptional = class extends ZodType {
        _parse(input) {
          const parsedType = this._getType(input);
          if (parsedType === util_1.ZodParsedType.undefined) {
            return (0, parseUtil_1.OK)(void 0);
          }
          return this._def.innerType._parse(input);
        }
        unwrap() {
          return this._def.innerType;
        }
      };
      exports.ZodOptional = ZodOptional;
      ZodOptional.create = (type, params) => {
        return new ZodOptional({
          innerType: type,
          typeName: ZodFirstPartyTypeKind.ZodOptional,
          ...processCreateParams(params)
        });
      };
      var ZodNullable = class extends ZodType {
        _parse(input) {
          const parsedType = this._getType(input);
          if (parsedType === util_1.ZodParsedType.null) {
            return (0, parseUtil_1.OK)(null);
          }
          return this._def.innerType._parse(input);
        }
        unwrap() {
          return this._def.innerType;
        }
      };
      exports.ZodNullable = ZodNullable;
      ZodNullable.create = (type, params) => {
        return new ZodNullable({
          innerType: type,
          typeName: ZodFirstPartyTypeKind.ZodNullable,
          ...processCreateParams(params)
        });
      };
      var ZodDefault = class extends ZodType {
        _parse(input) {
          const { ctx } = this._processInputParams(input);
          let data = ctx.data;
          if (ctx.parsedType === util_1.ZodParsedType.undefined) {
            data = this._def.defaultValue();
          }
          return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx
          });
        }
        removeDefault() {
          return this._def.innerType;
        }
      };
      exports.ZodDefault = ZodDefault;
      ZodDefault.create = (type, params) => {
        return new ZodDefault({
          innerType: type,
          typeName: ZodFirstPartyTypeKind.ZodDefault,
          defaultValue: typeof params.default === "function" ? params.default : () => params.default,
          ...processCreateParams(params)
        });
      };
      var ZodCatch = class extends ZodType {
        _parse(input) {
          const { ctx } = this._processInputParams(input);
          const newCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            }
          };
          const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
              ...newCtx
            }
          });
          if ((0, parseUtil_1.isAsync)(result)) {
            return result.then((result2) => {
              return {
                status: "valid",
                value: result2.status === "valid" ? result2.value : this._def.catchValue({
                  get error() {
                    return new ZodError_1.ZodError(newCtx.common.issues);
                  },
                  input: newCtx.data
                })
              };
            });
          } else {
            return {
              status: "valid",
              value: result.status === "valid" ? result.value : this._def.catchValue({
                get error() {
                  return new ZodError_1.ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          }
        }
        removeCatch() {
          return this._def.innerType;
        }
      };
      exports.ZodCatch = ZodCatch;
      ZodCatch.create = (type, params) => {
        return new ZodCatch({
          innerType: type,
          typeName: ZodFirstPartyTypeKind.ZodCatch,
          catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
          ...processCreateParams(params)
        });
      };
      var ZodNaN = class extends ZodType {
        _parse(input) {
          const parsedType = this._getType(input);
          if (parsedType !== util_1.ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.nan,
              received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
          }
          return { status: "valid", value: input.data };
        }
      };
      exports.ZodNaN = ZodNaN;
      ZodNaN.create = (params) => {
        return new ZodNaN({
          typeName: ZodFirstPartyTypeKind.ZodNaN,
          ...processCreateParams(params)
        });
      };
      exports.BRAND = Symbol("zod_brand");
      var ZodBranded = class extends ZodType {
        _parse(input) {
          const { ctx } = this._processInputParams(input);
          const data = ctx.data;
          return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx
          });
        }
        unwrap() {
          return this._def.type;
        }
      };
      exports.ZodBranded = ZodBranded;
      var ZodPipeline = class extends ZodType {
        _parse(input) {
          const { status, ctx } = this._processInputParams(input);
          if (ctx.common.async) {
            const handleAsync = async () => {
              const inResult = await this._def.in._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
              });
              if (inResult.status === "aborted")
                return parseUtil_1.INVALID;
              if (inResult.status === "dirty") {
                status.dirty();
                return (0, parseUtil_1.DIRTY)(inResult.value);
              } else {
                return this._def.out._parseAsync({
                  data: inResult.value,
                  path: ctx.path,
                  parent: ctx
                });
              }
            };
            return handleAsync();
          } else {
            const inResult = this._def.in._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return parseUtil_1.INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return {
                status: "dirty",
                value: inResult.value
              };
            } else {
              return this._def.out._parseSync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          }
        }
        static create(a3, b2) {
          return new ZodPipeline({
            in: a3,
            out: b2,
            typeName: ZodFirstPartyTypeKind.ZodPipeline
          });
        }
      };
      exports.ZodPipeline = ZodPipeline;
      var custom = (check, params = {}, fatal) => {
        if (check)
          return ZodAny.create().superRefine((data, ctx) => {
            var _a, _b;
            if (!check(data)) {
              const p2 = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
              const _fatal = (_b = (_a = p2.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
              const p22 = typeof p2 === "string" ? { message: p2 } : p2;
              ctx.addIssue({ code: "custom", ...p22, fatal: _fatal });
            }
          });
        return ZodAny.create();
      };
      exports.custom = custom;
      exports.late = {
        object: ZodObject.lazycreate
      };
      var ZodFirstPartyTypeKind;
      (function(ZodFirstPartyTypeKind2) {
        ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
        ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
        ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
        ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
        ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
        ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
        ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
        ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
        ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
        ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
        ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
        ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
        ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
        ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
        ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
        ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
        ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
        ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
        ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
        ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
        ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
        ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
        ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
        ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
        ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
        ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
        ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
        ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
        ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
        ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
        ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
        ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
        ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
        ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
        ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      })(ZodFirstPartyTypeKind = exports.ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = {}));
      var instanceOfType = (cls, params = {
        message: `Input not instance of ${cls.name}`
      }) => (0, exports.custom)((data) => data instanceof cls, params);
      exports.instanceof = instanceOfType;
      var stringType = ZodString.create;
      exports.string = stringType;
      var numberType = ZodNumber.create;
      exports.number = numberType;
      var nanType = ZodNaN.create;
      exports.nan = nanType;
      var bigIntType = ZodBigInt.create;
      exports.bigint = bigIntType;
      var booleanType = ZodBoolean.create;
      exports.boolean = booleanType;
      var dateType = ZodDate.create;
      exports.date = dateType;
      var symbolType = ZodSymbol.create;
      exports.symbol = symbolType;
      var undefinedType = ZodUndefined.create;
      exports.undefined = undefinedType;
      var nullType = ZodNull.create;
      exports.null = nullType;
      var anyType = ZodAny.create;
      exports.any = anyType;
      var unknownType = ZodUnknown.create;
      exports.unknown = unknownType;
      var neverType = ZodNever.create;
      exports.never = neverType;
      var voidType = ZodVoid.create;
      exports.void = voidType;
      var arrayType = ZodArray.create;
      exports.array = arrayType;
      var objectType = ZodObject.create;
      exports.object = objectType;
      var strictObjectType = ZodObject.strictCreate;
      exports.strictObject = strictObjectType;
      var unionType = ZodUnion.create;
      exports.union = unionType;
      var discriminatedUnionType = ZodDiscriminatedUnion.create;
      exports.discriminatedUnion = discriminatedUnionType;
      var intersectionType = ZodIntersection.create;
      exports.intersection = intersectionType;
      var tupleType = ZodTuple.create;
      exports.tuple = tupleType;
      var recordType = ZodRecord.create;
      exports.record = recordType;
      var mapType = ZodMap.create;
      exports.map = mapType;
      var setType = ZodSet.create;
      exports.set = setType;
      var functionType = ZodFunction.create;
      exports.function = functionType;
      var lazyType = ZodLazy.create;
      exports.lazy = lazyType;
      var literalType = ZodLiteral.create;
      exports.literal = literalType;
      var enumType = ZodEnum.create;
      exports.enum = enumType;
      var nativeEnumType = ZodNativeEnum.create;
      exports.nativeEnum = nativeEnumType;
      var promiseType = ZodPromise.create;
      exports.promise = promiseType;
      var effectsType = ZodEffects.create;
      exports.effect = effectsType;
      exports.transformer = effectsType;
      var optionalType = ZodOptional.create;
      exports.optional = optionalType;
      var nullableType = ZodNullable.create;
      exports.nullable = nullableType;
      var preprocessType = ZodEffects.createWithPreprocess;
      exports.preprocess = preprocessType;
      var pipelineType = ZodPipeline.create;
      exports.pipeline = pipelineType;
      var ostring = () => stringType().optional();
      exports.ostring = ostring;
      var onumber = () => numberType().optional();
      exports.onumber = onumber;
      var oboolean = () => booleanType().optional();
      exports.oboolean = oboolean;
      exports.coerce = {
        string: (arg) => ZodString.create({ ...arg, coerce: true }),
        number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
        boolean: (arg) => ZodBoolean.create({
          ...arg,
          coerce: true
        }),
        bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
        date: (arg) => ZodDate.create({ ...arg, coerce: true })
      };
      exports.NEVER = parseUtil_1.INVALID;
    }
  });

  // node_modules/zod/lib/external.js
  var require_external = __commonJS({
    "node_modules/zod/lib/external.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o5, m2, k2, k22) {
        if (k22 === void 0)
          k22 = k2;
        Object.defineProperty(o5, k22, { enumerable: true, get: function() {
          return m2[k2];
        } });
      } : function(o5, m2, k2, k22) {
        if (k22 === void 0)
          k22 = k2;
        o5[k22] = m2[k2];
      });
      var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
        for (var p2 in m2)
          if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
            __createBinding(exports2, m2, p2);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_errors(), exports);
      __exportStar(require_parseUtil(), exports);
      __exportStar(require_typeAliases(), exports);
      __exportStar(require_util(), exports);
      __exportStar(require_types(), exports);
      __exportStar(require_ZodError(), exports);
    }
  });

  // node_modules/zod/lib/index.js
  var require_lib = __commonJS({
    "node_modules/zod/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o5, m2, k2, k22) {
        if (k22 === void 0)
          k22 = k2;
        Object.defineProperty(o5, k22, { enumerable: true, get: function() {
          return m2[k2];
        } });
      } : function(o5, m2, k2, k22) {
        if (k22 === void 0)
          k22 = k2;
        o5[k22] = m2[k2];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o5, v2) {
        Object.defineProperty(o5, "default", { enumerable: true, value: v2 });
      } : function(o5, v2) {
        o5["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k2 in mod)
            if (k2 !== "default" && Object.prototype.hasOwnProperty.call(mod, k2))
              __createBinding(result, mod, k2);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
        for (var p2 in m2)
          if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
            __createBinding(exports2, m2, p2);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.z = void 0;
      var z2 = __importStar(require_external());
      exports.z = z2;
      __exportStar(require_external(), exports);
      exports.default = z2;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/any.js
  var require_any = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/any.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseAnyDef = void 0;
      function parseAnyDef() {
        return {};
      }
      exports.parseAnyDef = parseAnyDef;
    }
  });

  // node_modules/zod-to-json-schema/src/errorMessages.js
  var require_errorMessages = __commonJS({
    "node_modules/zod-to-json-schema/src/errorMessages.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.setResponseValueAndErrors = exports.addErrorMessage = void 0;
      function addErrorMessage(res, key, errorMessage, refs) {
        if (!(refs === null || refs === void 0 ? void 0 : refs.errorMessages))
          return;
        if (errorMessage) {
          res.errorMessage = Object.assign(Object.assign({}, res.errorMessage), { [key]: errorMessage });
        }
      }
      exports.addErrorMessage = addErrorMessage;
      function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
        res[key] = value;
        addErrorMessage(res, key, errorMessage, refs);
      }
      exports.setResponseValueAndErrors = setResponseValueAndErrors;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/array.js
  var require_array = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/array.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseArrayDef = void 0;
      var zod_1 = require_lib();
      var errorMessages_1 = require_errorMessages();
      var parseDef_1 = require_parseDef();
      function parseArrayDef(def, refs) {
        var _a, _b;
        const res = {
          type: "array"
        };
        if (((_b = (_a = def.type) === null || _a === void 0 ? void 0 : _a._def) === null || _b === void 0 ? void 0 : _b.typeName) !== zod_1.ZodFirstPartyTypeKind.ZodAny) {
          res.items = (0, parseDef_1.parseDef)(def.type._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "items"] }));
        }
        if (def.minLength) {
          (0, errorMessages_1.setResponseValueAndErrors)(res, "minItems", def.minLength.value, def.minLength.message, refs);
        }
        if (def.maxLength) {
          (0, errorMessages_1.setResponseValueAndErrors)(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
        }
        if (def.exactLength) {
          (0, errorMessages_1.setResponseValueAndErrors)(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
          (0, errorMessages_1.setResponseValueAndErrors)(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
        }
        return res;
      }
      exports.parseArrayDef = parseArrayDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/bigint.js
  var require_bigint = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/bigint.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseBigintDef = void 0;
      var errorMessages_1 = require_errorMessages();
      function parseBigintDef(def, refs) {
        const res = {
          type: "integer",
          format: "int64"
        };
        if (!def.checks)
          return res;
        for (const check of def.checks) {
          switch (check.kind) {
            case "min":
              if (refs.target === "jsonSchema7") {
                if (check.inclusive) {
                  (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
                } else {
                  (0, errorMessages_1.setResponseValueAndErrors)(res, "exclusiveMinimum", check.value, check.message, refs);
                }
              } else {
                if (!check.inclusive) {
                  res.exclusiveMinimum = true;
                }
                (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
              }
              break;
            case "max":
              if (refs.target === "jsonSchema7") {
                if (check.inclusive) {
                  (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
                } else {
                  (0, errorMessages_1.setResponseValueAndErrors)(res, "exclusiveMaximum", check.value, check.message, refs);
                }
              } else {
                if (!check.inclusive) {
                  res.exclusiveMaximum = true;
                }
                (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
              }
              break;
            case "multipleOf":
              (0, errorMessages_1.setResponseValueAndErrors)(res, "multipleOf", check.value, check.message, refs);
              break;
          }
        }
        return res;
      }
      exports.parseBigintDef = parseBigintDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/boolean.js
  var require_boolean = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/boolean.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseBooleanDef = void 0;
      function parseBooleanDef() {
        return {
          type: "boolean"
        };
      }
      exports.parseBooleanDef = parseBooleanDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/branded.js
  var require_branded = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/branded.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseBrandedDef = void 0;
      var parseDef_1 = require_parseDef();
      function parseBrandedDef(_def, refs) {
        return (0, parseDef_1.parseDef)(_def.type._def, refs);
      }
      exports.parseBrandedDef = parseBrandedDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/catch.js
  var require_catch = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/catch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseCatchDef = void 0;
      var parseDef_1 = require_parseDef();
      var parseCatchDef = (def, refs) => {
        return (0, parseDef_1.parseDef)(def.innerType._def, refs);
      };
      exports.parseCatchDef = parseCatchDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/date.js
  var require_date = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/date.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseDateDef = void 0;
      var errorMessages_1 = require_errorMessages();
      function parseDateDef(def, refs) {
        if (refs.dateStrategy == "integer") {
          return integerDateParser(def, refs);
        } else {
          return {
            type: "string",
            format: "date-time"
          };
        }
      }
      exports.parseDateDef = parseDateDef;
      var integerDateParser = (def, refs) => {
        const res = {
          type: "integer",
          format: "unix-time"
        };
        for (const check of def.checks) {
          switch (check.kind) {
            case "min":
              if (refs.target === "jsonSchema7") {
                (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
              }
              break;
            case "max":
              if (refs.target === "jsonSchema7") {
                (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
              }
              break;
          }
        }
        return res;
      };
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/default.js
  var require_default = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/default.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseDefaultDef = void 0;
      var parseDef_1 = require_parseDef();
      function parseDefaultDef(_def, refs) {
        return Object.assign(Object.assign({}, (0, parseDef_1.parseDef)(_def.innerType._def, refs)), { default: _def.defaultValue() });
      }
      exports.parseDefaultDef = parseDefaultDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/effects.js
  var require_effects = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/effects.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseEffectsDef = void 0;
      var parseDef_1 = require_parseDef();
      function parseEffectsDef(_def, refs) {
        return refs.effectStrategy === "input" ? (0, parseDef_1.parseDef)(_def.schema._def, refs) : {};
      }
      exports.parseEffectsDef = parseEffectsDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/enum.js
  var require_enum = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/enum.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseEnumDef = void 0;
      function parseEnumDef(def) {
        return {
          type: "string",
          enum: def.values
        };
      }
      exports.parseEnumDef = parseEnumDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/intersection.js
  var require_intersection = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/intersection.js"(exports) {
      "use strict";
      var __rest = exports && exports.__rest || function(s5, e4) {
        var t3 = {};
        for (var p2 in s5)
          if (Object.prototype.hasOwnProperty.call(s5, p2) && e4.indexOf(p2) < 0)
            t3[p2] = s5[p2];
        if (s5 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i3 = 0, p2 = Object.getOwnPropertySymbols(s5); i3 < p2.length; i3++) {
            if (e4.indexOf(p2[i3]) < 0 && Object.prototype.propertyIsEnumerable.call(s5, p2[i3]))
              t3[p2[i3]] = s5[p2[i3]];
          }
        return t3;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseIntersectionDef = void 0;
      var parseDef_1 = require_parseDef();
      var isJsonSchema7AllOfType = (type) => {
        if ("type" in type && type.type === "string")
          return false;
        return "allOf" in type;
      };
      function parseIntersectionDef(def, refs) {
        const allOf = [
          (0, parseDef_1.parseDef)(def.left._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "allOf", "0"] })),
          (0, parseDef_1.parseDef)(def.right._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "allOf", "1"] }))
        ].filter((x2) => !!x2);
        let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
        const mergedAllOf = [];
        allOf.forEach((schema) => {
          if (isJsonSchema7AllOfType(schema)) {
            mergedAllOf.push(...schema.allOf);
            if (schema.unevaluatedProperties === void 0) {
              unevaluatedProperties = void 0;
            }
          } else {
            let nestedSchema = schema;
            if ("additionalProperties" in schema && schema.additionalProperties === false) {
              const { additionalProperties } = schema, rest = __rest(schema, ["additionalProperties"]);
              nestedSchema = rest;
            } else {
              unevaluatedProperties = void 0;
            }
            mergedAllOf.push(nestedSchema);
          }
        });
        return mergedAllOf.length ? Object.assign({ allOf: mergedAllOf }, unevaluatedProperties) : void 0;
      }
      exports.parseIntersectionDef = parseIntersectionDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/literal.js
  var require_literal = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/literal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseLiteralDef = void 0;
      function parseLiteralDef(def, refs) {
        const parsedType = typeof def.value;
        if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
          return {
            type: Array.isArray(def.value) ? "array" : "object"
          };
        }
        if (refs.target === "openApi3") {
          return {
            type: parsedType === "bigint" ? "integer" : parsedType,
            enum: [def.value]
          };
        }
        return {
          type: parsedType === "bigint" ? "integer" : parsedType,
          const: def.value
        };
      }
      exports.parseLiteralDef = parseLiteralDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/map.js
  var require_map = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/map.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseMapDef = void 0;
      var parseDef_1 = require_parseDef();
      function parseMapDef(def, refs) {
        const keys = (0, parseDef_1.parseDef)(def.keyType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "items", "items", "0"] })) || {};
        const values = (0, parseDef_1.parseDef)(def.valueType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "items", "items", "1"] })) || {};
        return {
          type: "array",
          maxItems: 125,
          items: {
            type: "array",
            items: [keys, values],
            minItems: 2,
            maxItems: 2
          }
        };
      }
      exports.parseMapDef = parseMapDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/nativeEnum.js
  var require_nativeEnum = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/nativeEnum.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseNativeEnumDef = void 0;
      function parseNativeEnumDef(def) {
        const object = def.values;
        const actualKeys = Object.keys(def.values).filter((key) => {
          return typeof object[object[key]] !== "number";
        });
        const actualValues = actualKeys.map((key) => object[key]);
        const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
        return {
          type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
          enum: actualValues
        };
      }
      exports.parseNativeEnumDef = parseNativeEnumDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/never.js
  var require_never = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/never.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseNeverDef = void 0;
      function parseNeverDef() {
        return {
          not: {}
        };
      }
      exports.parseNeverDef = parseNeverDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/null.js
  var require_null = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/null.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseNullDef = void 0;
      function parseNullDef(refs) {
        return refs.target === "openApi3" ? {
          enum: ["null"],
          nullable: true
        } : {
          type: "null"
        };
      }
      exports.parseNullDef = parseNullDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/union.js
  var require_union = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/union.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseUnionDef = exports.primitiveMappings = void 0;
      var parseDef_1 = require_parseDef();
      exports.primitiveMappings = {
        ZodString: "string",
        ZodNumber: "number",
        ZodBigInt: "integer",
        ZodBoolean: "boolean",
        ZodNull: "null"
      };
      function parseUnionDef(def, refs) {
        if (refs.target === "openApi3")
          return asAnyOf(def, refs);
        const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
        if (options.every((x2) => x2._def.typeName in exports.primitiveMappings && (!x2._def.checks || !x2._def.checks.length))) {
          const types = options.reduce((types2, x2) => {
            const type = exports.primitiveMappings[x2._def.typeName];
            return type && !types2.includes(type) ? [...types2, type] : types2;
          }, []);
          return {
            type: types.length > 1 ? types : types[0]
          };
        } else if (options.every((x2) => x2._def.typeName === "ZodLiteral" && !x2.description)) {
          const types = options.reduce((acc, x2) => {
            const type = typeof x2._def.value;
            switch (type) {
              case "string":
              case "number":
              case "boolean":
                return [...acc, type];
              case "bigint":
                return [...acc, "integer"];
              case "object":
                if (x2._def.value === null)
                  return [...acc, "null"];
              case "symbol":
              case "undefined":
              case "function":
              default:
                return acc;
            }
          }, []);
          if (types.length === options.length) {
            const uniqueTypes = types.filter((x2, i3, a3) => a3.indexOf(x2) === i3);
            return {
              type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
              enum: options.reduce((acc, x2) => {
                return acc.includes(x2._def.value) ? acc : [...acc, x2._def.value];
              }, [])
            };
          }
        } else if (options.every((x2) => x2._def.typeName === "ZodEnum")) {
          return {
            type: "string",
            enum: options.reduce((acc, x2) => [
              ...acc,
              ...x2._def.values.filter((x3) => !acc.includes(x3))
            ], [])
          };
        }
        return asAnyOf(def, refs);
      }
      exports.parseUnionDef = parseUnionDef;
      var asAnyOf = (def, refs) => {
        const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x2, i3) => (0, parseDef_1.parseDef)(x2._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "anyOf", `${i3}`] }))).filter((x2) => !!x2 && (!refs.strictUnions || typeof x2 === "object" && Object.keys(x2).length > 0));
        return anyOf.length ? { anyOf } : void 0;
      };
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/nullable.js
  var require_nullable = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/nullable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseNullableDef = void 0;
      var parseDef_1 = require_parseDef();
      var union_1 = require_union();
      function parseNullableDef(def, refs) {
        if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
          if (refs.target === "openApi3") {
            return {
              type: union_1.primitiveMappings[def.innerType._def.typeName],
              nullable: true
            };
          }
          return {
            type: [
              union_1.primitiveMappings[def.innerType._def.typeName],
              "null"
            ]
          };
        }
        if (refs.target === "openApi3") {
          const base2 = (0, parseDef_1.parseDef)(def.innerType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath] }));
          return base2 && Object.assign(Object.assign({}, base2), { nullable: true });
        }
        const base = (0, parseDef_1.parseDef)(def.innerType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "anyOf", "0"] }));
        return base && { anyOf: [base, { type: "null" }] };
      }
      exports.parseNullableDef = parseNullableDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/number.js
  var require_number = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/number.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseNumberDef = void 0;
      var errorMessages_1 = require_errorMessages();
      function parseNumberDef(def, refs) {
        const res = {
          type: "number"
        };
        if (!def.checks)
          return res;
        for (const check of def.checks) {
          switch (check.kind) {
            case "int":
              res.type = "integer";
              (0, errorMessages_1.addErrorMessage)(res, "type", check.message, refs);
              break;
            case "min":
              if (refs.target === "jsonSchema7") {
                if (check.inclusive) {
                  (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
                } else {
                  (0, errorMessages_1.setResponseValueAndErrors)(res, "exclusiveMinimum", check.value, check.message, refs);
                }
              } else {
                if (!check.inclusive) {
                  res.exclusiveMinimum = true;
                }
                (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
              }
              break;
            case "max":
              if (refs.target === "jsonSchema7") {
                if (check.inclusive) {
                  (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
                } else {
                  (0, errorMessages_1.setResponseValueAndErrors)(res, "exclusiveMaximum", check.value, check.message, refs);
                }
              } else {
                if (!check.inclusive) {
                  res.exclusiveMaximum = true;
                }
                (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
              }
              break;
            case "multipleOf":
              (0, errorMessages_1.setResponseValueAndErrors)(res, "multipleOf", check.value, check.message, refs);
              break;
          }
        }
        return res;
      }
      exports.parseNumberDef = parseNumberDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/object.js
  var require_object = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/object.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseObjectDef = exports.parseObjectDefX = void 0;
      var parseDef_1 = require_parseDef();
      function parseObjectDefX(def, refs) {
        var _a, _b;
        Object.keys(def.shape()).reduce((schema, key) => {
          let prop = def.shape()[key];
          const isOptional = prop.isOptional();
          if (!isOptional) {
            prop = Object.assign({}, prop._def.innerSchema);
          }
          const propSchema = (0, parseDef_1.parseDef)(prop._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "properties", key], propertyPath: [...refs.currentPath, "properties", key] }));
          if (propSchema !== void 0) {
            schema.properties[key] = propSchema;
            if (!isOptional) {
              if (!schema.required) {
                schema.required = [];
              }
              schema.required.push(key);
            }
          }
          return schema;
        }, {
          type: "object",
          properties: {},
          additionalProperties: def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : (_a = (0, parseDef_1.parseDef)(def.catchall._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "additionalProperties"] }))) !== null && _a !== void 0 ? _a : true
        });
        const result = Object.assign(Object.assign({ type: "object" }, Object.entries(def.shape()).reduce((acc, [propName, propDef]) => {
          if (propDef === void 0 || propDef._def === void 0)
            return acc;
          const parsedDef = (0, parseDef_1.parseDef)(propDef._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "properties", propName], propertyPath: [...refs.currentPath, "properties", propName] }));
          if (parsedDef === void 0)
            return acc;
          return {
            properties: Object.assign(Object.assign({}, acc.properties), { [propName]: parsedDef }),
            required: propDef.isOptional() ? acc.required : [...acc.required, propName]
          };
        }, { properties: {}, required: [] })), { additionalProperties: def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : (_b = (0, parseDef_1.parseDef)(def.catchall._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "additionalProperties"] }))) !== null && _b !== void 0 ? _b : true });
        if (!result.required.length)
          delete result.required;
        return result;
      }
      exports.parseObjectDefX = parseObjectDefX;
      function parseObjectDef(def, refs) {
        var _a;
        const result = Object.assign(Object.assign({ type: "object" }, Object.entries(def.shape()).reduce((acc, [propName, propDef]) => {
          if (propDef === void 0 || propDef._def === void 0)
            return acc;
          const parsedDef = (0, parseDef_1.parseDef)(propDef._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "properties", propName], propertyPath: [...refs.currentPath, "properties", propName] }));
          if (parsedDef === void 0)
            return acc;
          return {
            properties: Object.assign(Object.assign({}, acc.properties), { [propName]: parsedDef }),
            required: propDef.isOptional() ? acc.required : [...acc.required, propName]
          };
        }, { properties: {}, required: [] })), { additionalProperties: def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : (_a = (0, parseDef_1.parseDef)(def.catchall._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "additionalProperties"] }))) !== null && _a !== void 0 ? _a : true });
        if (!result.required.length)
          delete result.required;
        return result;
      }
      exports.parseObjectDef = parseObjectDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/optional.js
  var require_optional = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/optional.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseOptionalDef = void 0;
      var parseDef_1 = require_parseDef();
      var parseOptionalDef = (def, refs) => {
        var _a;
        if (refs.currentPath.toString() === ((_a = refs.propertyPath) === null || _a === void 0 ? void 0 : _a.toString())) {
          return (0, parseDef_1.parseDef)(def.innerType._def, refs);
        }
        const innerSchema = (0, parseDef_1.parseDef)(def.innerType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "anyOf", "1"] }));
        return innerSchema ? {
          anyOf: [
            {
              not: {}
            },
            innerSchema
          ]
        } : {};
      };
      exports.parseOptionalDef = parseOptionalDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/pipeline.js
  var require_pipeline = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/pipeline.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parsePipelineDef = void 0;
      var parseDef_1 = require_parseDef();
      var parsePipelineDef = (def, refs) => {
        if (refs.pipeStrategy === "input") {
          return (0, parseDef_1.parseDef)(def.in._def, refs);
        }
        const a3 = (0, parseDef_1.parseDef)(def.in._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "allOf", "0"] }));
        const b2 = (0, parseDef_1.parseDef)(def.out._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "allOf", a3 ? "1" : "0"] }));
        return {
          allOf: [a3, b2].filter((x2) => x2 !== void 0)
        };
      };
      exports.parsePipelineDef = parsePipelineDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/promise.js
  var require_promise = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/promise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parsePromiseDef = void 0;
      var parseDef_1 = require_parseDef();
      function parsePromiseDef(def, refs) {
        return (0, parseDef_1.parseDef)(def.type._def, refs);
      }
      exports.parsePromiseDef = parsePromiseDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/string.js
  var require_string = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/string.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseStringDef = exports.emojiPattern = exports.ulidPattern = exports.cuid2Pattern = exports.cuidPattern = exports.emailPattern = void 0;
      var errorMessages_1 = require_errorMessages();
      exports.emailPattern = '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\])|(\\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\\.[A-Za-z]{2,})+))$';
      exports.cuidPattern = "^c[^\\s-]{8,}$";
      exports.cuid2Pattern = "^[a-z][a-z0-9]*$";
      exports.ulidPattern = "/[0-9A-HJKMNP-TV-Z]{26}/";
      exports.emojiPattern = "/^(p{Extended_Pictographic}|p{Emoji_Component})+$/u";
      function parseStringDef(def, refs) {
        const res = {
          type: "string"
        };
        if (def.checks) {
          for (const check of def.checks) {
            switch (check.kind) {
              case "min":
                (0, errorMessages_1.setResponseValueAndErrors)(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
                break;
              case "max":
                (0, errorMessages_1.setResponseValueAndErrors)(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
                break;
              case "email":
                switch (refs.emailStrategy) {
                  case "format:email":
                    addFormat(res, "email", check.message, refs);
                    break;
                  case "format:idn-email":
                    addFormat(res, "idn-email", check.message, refs);
                    break;
                  case "pattern:zod":
                    addPattern(res, exports.emailPattern, check.message, refs);
                    break;
                }
                break;
              case "url":
                addFormat(res, "uri", check.message, refs);
                break;
              case "uuid":
                addFormat(res, "uuid", check.message, refs);
                break;
              case "regex":
                addPattern(res, check.regex.source, check.message, refs);
                break;
              case "cuid":
                addPattern(res, exports.cuidPattern, check.message, refs);
                break;
              case "cuid2":
                addPattern(res, exports.cuid2Pattern, check.message, refs);
                break;
              case "startsWith":
                addPattern(res, "^" + escapeNonAlphaNumeric(check.value), check.message, refs);
                break;
              case "endsWith":
                addPattern(res, escapeNonAlphaNumeric(check.value) + "$", check.message, refs);
                break;
              case "datetime":
                addFormat(res, "date-time", check.message, refs);
                break;
              case "length":
                (0, errorMessages_1.setResponseValueAndErrors)(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
                (0, errorMessages_1.setResponseValueAndErrors)(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
                break;
              case "includes": {
                addPattern(res, escapeNonAlphaNumeric(check.value), check.message, refs);
                break;
              }
              case "ip": {
                if (check.version !== "v6") {
                  addFormat(res, "ipv4", check.message, refs);
                }
                if (check.version !== "v4") {
                  addFormat(res, "ipv6", check.message, refs);
                }
                break;
              }
              case "emoji":
                addPattern(res, exports.emojiPattern, check.message, refs);
                break;
              case "ulid": {
                addPattern(res, exports.ulidPattern, check.message, refs);
                break;
              }
              case "toLowerCase":
              case "toUpperCase":
              case "trim":
                break;
              default:
                ((_2) => {
                })(check);
            }
          }
        }
        return res;
      }
      exports.parseStringDef = parseStringDef;
      var escapeNonAlphaNumeric = (value) => Array.from(value).map((c3) => /[a-zA-Z0-9]/.test(c3) ? c3 : `\\${c3}`).join("");
      var addFormat = (schema, value, message, refs) => {
        var _a;
        if (schema.format || ((_a = schema.anyOf) === null || _a === void 0 ? void 0 : _a.some((x2) => x2.format))) {
          if (!schema.anyOf) {
            schema.anyOf = [];
          }
          if (schema.format) {
            schema.anyOf.push(Object.assign({ format: schema.format }, schema.errorMessage && refs.errorMessages && {
              errorMessage: { format: schema.errorMessage.format }
            }));
            delete schema.format;
            if (schema.errorMessage) {
              delete schema.errorMessage.format;
              if (Object.keys(schema.errorMessage).length === 0) {
                delete schema.errorMessage;
              }
            }
          }
          schema.anyOf.push(Object.assign({ format: value }, message && refs.errorMessages && { errorMessage: { format: message } }));
        } else {
          (0, errorMessages_1.setResponseValueAndErrors)(schema, "format", value, message, refs);
        }
      };
      var addPattern = (schema, value, message, refs) => {
        var _a;
        if (schema.pattern || ((_a = schema.allOf) === null || _a === void 0 ? void 0 : _a.some((x2) => x2.pattern))) {
          if (!schema.allOf) {
            schema.allOf = [];
          }
          if (schema.pattern) {
            schema.allOf.push(Object.assign({ pattern: schema.pattern }, schema.errorMessage && refs.errorMessages && {
              errorMessage: { pattern: schema.errorMessage.pattern }
            }));
            delete schema.pattern;
            if (schema.errorMessage) {
              delete schema.errorMessage.pattern;
              if (Object.keys(schema.errorMessage).length === 0) {
                delete schema.errorMessage;
              }
            }
          }
          schema.allOf.push(Object.assign({ pattern: value }, message && refs.errorMessages && { errorMessage: { pattern: message } }));
        } else {
          (0, errorMessages_1.setResponseValueAndErrors)(schema, "pattern", value, message, refs);
        }
      };
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/record.js
  var require_record = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/record.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseRecordDef = void 0;
      var zod_1 = require_lib();
      var parseDef_1 = require_parseDef();
      var string_1 = require_string();
      function parseRecordDef(def, refs) {
        var _a, _b, _c, _d, _e;
        if (refs.target === "openApi3" && ((_a = def.keyType) === null || _a === void 0 ? void 0 : _a._def.typeName) === zod_1.ZodFirstPartyTypeKind.ZodEnum) {
          return {
            type: "object",
            required: def.keyType._def.values,
            properties: def.keyType._def.values.reduce((acc, key) => {
              var _a2;
              return Object.assign(Object.assign({}, acc), { [key]: (_a2 = (0, parseDef_1.parseDef)(def.valueType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "properties", key] }))) !== null && _a2 !== void 0 ? _a2 : {} });
            }, {}),
            additionalProperties: false
          };
        }
        const schema = {
          type: "object",
          additionalProperties: (_b = (0, parseDef_1.parseDef)(def.valueType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "additionalProperties"] }))) !== null && _b !== void 0 ? _b : {}
        };
        if (refs.target === "openApi3") {
          return schema;
        }
        if (((_c = def.keyType) === null || _c === void 0 ? void 0 : _c._def.typeName) === zod_1.ZodFirstPartyTypeKind.ZodString && ((_d = def.keyType._def.checks) === null || _d === void 0 ? void 0 : _d.length)) {
          const keyType = Object.entries((0, string_1.parseStringDef)(def.keyType._def, refs)).reduce((acc, [key, value]) => key === "type" ? acc : Object.assign(Object.assign({}, acc), { [key]: value }), {});
          return Object.assign(Object.assign({}, schema), { propertyNames: keyType });
        } else if (((_e = def.keyType) === null || _e === void 0 ? void 0 : _e._def.typeName) === zod_1.ZodFirstPartyTypeKind.ZodEnum) {
          return Object.assign(Object.assign({}, schema), { propertyNames: {
            enum: def.keyType._def.values
          } });
        }
        return schema;
      }
      exports.parseRecordDef = parseRecordDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/set.js
  var require_set = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/set.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseSetDef = void 0;
      var errorMessages_1 = require_errorMessages();
      var parseDef_1 = require_parseDef();
      function parseSetDef(def, refs) {
        const items = (0, parseDef_1.parseDef)(def.valueType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "items"] }));
        const schema = {
          type: "array",
          uniqueItems: true,
          items
        };
        if (def.minSize) {
          (0, errorMessages_1.setResponseValueAndErrors)(schema, "minItems", def.minSize.value, def.minSize.message, refs);
        }
        if (def.maxSize) {
          (0, errorMessages_1.setResponseValueAndErrors)(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
        }
        return schema;
      }
      exports.parseSetDef = parseSetDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/tuple.js
  var require_tuple = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/tuple.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseTupleDef = void 0;
      var parseDef_1 = require_parseDef();
      function parseTupleDef(def, refs) {
        if (def.rest) {
          return {
            type: "array",
            minItems: def.items.length,
            items: def.items.map((x2, i3) => (0, parseDef_1.parseDef)(x2._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "items", `${i3}`] }))).reduce((acc, x2) => x2 === void 0 ? acc : [...acc, x2], []),
            additionalItems: (0, parseDef_1.parseDef)(def.rest._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "additionalItems"] }))
          };
        } else {
          return {
            type: "array",
            minItems: def.items.length,
            maxItems: def.items.length,
            items: def.items.map((x2, i3) => (0, parseDef_1.parseDef)(x2._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "items", `${i3}`] }))).reduce((acc, x2) => x2 === void 0 ? acc : [...acc, x2], [])
          };
        }
      }
      exports.parseTupleDef = parseTupleDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/undefined.js
  var require_undefined = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/undefined.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseUndefinedDef = void 0;
      function parseUndefinedDef() {
        return {
          not: {}
        };
      }
      exports.parseUndefinedDef = parseUndefinedDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parsers/unknown.js
  var require_unknown = __commonJS({
    "node_modules/zod-to-json-schema/src/parsers/unknown.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseUnknownDef = void 0;
      function parseUnknownDef() {
        return {};
      }
      exports.parseUnknownDef = parseUnknownDef;
    }
  });

  // node_modules/zod-to-json-schema/src/parseDef.js
  var require_parseDef = __commonJS({
    "node_modules/zod-to-json-schema/src/parseDef.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseDef = void 0;
      var zod_1 = require_lib();
      var any_1 = require_any();
      var array_1 = require_array();
      var bigint_1 = require_bigint();
      var boolean_1 = require_boolean();
      var branded_1 = require_branded();
      var catch_1 = require_catch();
      var date_1 = require_date();
      var default_1 = require_default();
      var effects_1 = require_effects();
      var enum_1 = require_enum();
      var intersection_1 = require_intersection();
      var literal_1 = require_literal();
      var map_1 = require_map();
      var nativeEnum_1 = require_nativeEnum();
      var never_1 = require_never();
      var null_1 = require_null();
      var nullable_1 = require_nullable();
      var number_1 = require_number();
      var object_1 = require_object();
      var optional_1 = require_optional();
      var pipeline_1 = require_pipeline();
      var promise_1 = require_promise();
      var record_1 = require_record();
      var set_1 = require_set();
      var string_1 = require_string();
      var tuple_1 = require_tuple();
      var undefined_1 = require_undefined();
      var union_1 = require_union();
      var unknown_1 = require_unknown();
      function parseDef(def, refs, forceResolution = false) {
        const seenItem = refs.seen.get(def);
        if (seenItem && !forceResolution) {
          const seenSchema = get$ref(seenItem, refs);
          if (seenSchema !== void 0) {
            return seenSchema;
          }
        }
        const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
        refs.seen.set(def, newItem);
        const jsonSchema = selectParser(def, def.typeName, refs);
        if (jsonSchema) {
          addMeta(def, refs, jsonSchema);
        }
        newItem.jsonSchema = jsonSchema;
        return jsonSchema;
      }
      exports.parseDef = parseDef;
      var get$ref = (item, refs) => {
        switch (refs.$refStrategy) {
          case "root":
            return {
              $ref: item.path.length === 0 ? "" : item.path.length === 1 ? `${item.path[0]}/` : item.path.join("/")
            };
          case "relative":
            return { $ref: getRelativePath(refs.currentPath, item.path) };
          case "none": {
            if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
              console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
              return {};
            }
            return void 0;
          }
          case "seen": {
            if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
              console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
              return {};
            } else {
              return item.jsonSchema;
            }
          }
        }
      };
      var getRelativePath = (pathA, pathB) => {
        let i3 = 0;
        for (; i3 < pathA.length && i3 < pathB.length; i3++) {
          if (pathA[i3] !== pathB[i3])
            break;
        }
        return [(pathA.length - i3).toString(), ...pathB.slice(i3)].join("/");
      };
      var selectParser = (def, typeName, refs) => {
        switch (typeName) {
          case zod_1.ZodFirstPartyTypeKind.ZodString:
            return (0, string_1.parseStringDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodNumber:
            return (0, number_1.parseNumberDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodObject:
            return (0, object_1.parseObjectDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodBigInt:
            return (0, bigint_1.parseBigintDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodBoolean:
            return (0, boolean_1.parseBooleanDef)();
          case zod_1.ZodFirstPartyTypeKind.ZodDate:
            return (0, date_1.parseDateDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodUndefined:
            return (0, undefined_1.parseUndefinedDef)();
          case zod_1.ZodFirstPartyTypeKind.ZodNull:
            return (0, null_1.parseNullDef)(refs);
          case zod_1.ZodFirstPartyTypeKind.ZodArray:
            return (0, array_1.parseArrayDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodUnion:
          case zod_1.ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
            return (0, union_1.parseUnionDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodIntersection:
            return (0, intersection_1.parseIntersectionDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodTuple:
            return (0, tuple_1.parseTupleDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodRecord:
            return (0, record_1.parseRecordDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodLiteral:
            return (0, literal_1.parseLiteralDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodEnum:
            return (0, enum_1.parseEnumDef)(def);
          case zod_1.ZodFirstPartyTypeKind.ZodNativeEnum:
            return (0, nativeEnum_1.parseNativeEnumDef)(def);
          case zod_1.ZodFirstPartyTypeKind.ZodNullable:
            return (0, nullable_1.parseNullableDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodOptional:
            return (0, optional_1.parseOptionalDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodMap:
            return (0, map_1.parseMapDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodSet:
            return (0, set_1.parseSetDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodLazy:
            return parseDef(def.getter()._def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodPromise:
            return (0, promise_1.parsePromiseDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodNaN:
          case zod_1.ZodFirstPartyTypeKind.ZodNever:
            return (0, never_1.parseNeverDef)();
          case zod_1.ZodFirstPartyTypeKind.ZodEffects:
            return (0, effects_1.parseEffectsDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodAny:
            return (0, any_1.parseAnyDef)();
          case zod_1.ZodFirstPartyTypeKind.ZodUnknown:
            return (0, unknown_1.parseUnknownDef)();
          case zod_1.ZodFirstPartyTypeKind.ZodDefault:
            return (0, default_1.parseDefaultDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodBranded:
            return (0, branded_1.parseBrandedDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodCatch:
            return (0, catch_1.parseCatchDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodPipeline:
            return (0, pipeline_1.parsePipelineDef)(def, refs);
          case zod_1.ZodFirstPartyTypeKind.ZodFunction:
          case zod_1.ZodFirstPartyTypeKind.ZodVoid:
          case zod_1.ZodFirstPartyTypeKind.ZodSymbol:
            return void 0;
          default:
            return ((_2) => void 0)(typeName);
        }
      };
      var addMeta = (def, refs, jsonSchema) => {
        if (def.description) {
          jsonSchema.description = def.description;
          if (refs.markdownDescription) {
            jsonSchema.markdownDescription = def.description;
          }
        }
        return jsonSchema;
      };
    }
  });

  // node_modules/zod-to-json-schema/src/Options.js
  var require_Options = __commonJS({
    "node_modules/zod-to-json-schema/src/Options.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getDefaultOptions = exports.defaultOptions = void 0;
      exports.defaultOptions = {
        name: void 0,
        $refStrategy: "root",
        basePath: ["#"],
        effectStrategy: "input",
        pipeStrategy: "all",
        dateStrategy: "string",
        definitionPath: "definitions",
        target: "jsonSchema7",
        strictUnions: false,
        definitions: {},
        errorMessages: false,
        markdownDescription: false,
        emailStrategy: "format:email"
      };
      var getDefaultOptions = (options) => typeof options === "string" ? Object.assign(Object.assign({}, exports.defaultOptions), { name: options }) : Object.assign(Object.assign({}, exports.defaultOptions), options);
      exports.getDefaultOptions = getDefaultOptions;
    }
  });

  // node_modules/zod-to-json-schema/src/Refs.js
  var require_Refs = __commonJS({
    "node_modules/zod-to-json-schema/src/Refs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getRefs = void 0;
      var Options_1 = require_Options();
      var getRefs = (options) => {
        const _options = (0, Options_1.getDefaultOptions)(options);
        const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
        return Object.assign(Object.assign({}, _options), { currentPath, propertyPath: void 0, seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
          def._def,
          {
            def: def._def,
            path: [..._options.basePath, _options.definitionPath, name],
            jsonSchema: void 0
          }
        ])) });
      };
      exports.getRefs = getRefs;
    }
  });

  // node_modules/zod-to-json-schema/src/zodToJsonSchema.js
  var require_zodToJsonSchema = __commonJS({
    "node_modules/zod-to-json-schema/src/zodToJsonSchema.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.zodToJsonSchema = void 0;
      var parseDef_1 = require_parseDef();
      var Refs_1 = require_Refs();
      var zodToJsonSchema3 = (schema, options) => {
        var _a;
        const refs = (0, Refs_1.getRefs)(options);
        const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => {
          var _a2;
          return Object.assign(Object.assign({}, acc), { [name2]: (_a2 = (0, parseDef_1.parseDef)(schema2._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.basePath, refs.definitionPath, name2] }), true)) !== null && _a2 !== void 0 ? _a2 : {} });
        }, {}) : void 0;
        const name = typeof options === "string" ? options : options === null || options === void 0 ? void 0 : options.name;
        const main = (_a = (0, parseDef_1.parseDef)(schema._def, name === void 0 ? refs : Object.assign(Object.assign({}, refs), { currentPath: [...refs.basePath, refs.definitionPath, name] }), false)) !== null && _a !== void 0 ? _a : {};
        const combined = name === void 0 ? definitions ? Object.assign(Object.assign({}, main), { [refs.definitionPath]: definitions }) : main : {
          $ref: [
            ...refs.$refStrategy === "relative" ? [] : refs.basePath,
            refs.definitionPath,
            name
          ].join("/"),
          [refs.definitionPath]: Object.assign(Object.assign({}, definitions), { [name]: main })
        };
        if (refs.target === "jsonSchema7") {
          combined.$schema = "http://json-schema.org/draft-07/schema#";
        } else if (refs.target === "jsonSchema2019-09") {
          combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
        }
        return combined;
      };
      exports.zodToJsonSchema = zodToJsonSchema3;
    }
  });

  // node_modules/zod-to-json-schema/index.js
  var require_zod_to_json_schema = __commonJS({
    "node_modules/zod-to-json-schema/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.zodToJsonSchema = void 0;
      var zodToJsonSchema_1 = require_zodToJsonSchema();
      Object.defineProperty(exports, "zodToJsonSchema", { enumerable: true, get: function() {
        return zodToJsonSchema_1.zodToJsonSchema;
      } });
      exports.default = zodToJsonSchema_1.zodToJsonSchema;
    }
  });

  // node_modules/langchain/dist/tools/convert_to_openai.js
  function formatToOpenAIFunction(tool) {
    return {
      name: tool.name,
      description: tool.description,
      parameters: (0, import_zod_to_json_schema.zodToJsonSchema)(tool.schema)
    };
  }
  var import_zod_to_json_schema;
  var init_convert_to_openai = __esm({
    "node_modules/langchain/dist/tools/convert_to_openai.js"() {
      import_zod_to_json_schema = __toModule(require_zod_to_json_schema());
    }
  });

  // node_modules/langchain/dist/util/azure.js
  function getEndpoint(config) {
    const { azureOpenAIApiDeploymentName, azureOpenAIApiInstanceName, azureOpenAIApiKey, azureOpenAIBasePath, basePath } = config;
    if (azureOpenAIApiKey && azureOpenAIBasePath && azureOpenAIApiDeploymentName) {
      return `${azureOpenAIBasePath}/${azureOpenAIApiDeploymentName}`;
    }
    if (azureOpenAIApiKey) {
      if (!azureOpenAIApiInstanceName) {
        throw new Error("azureOpenAIApiInstanceName is required when using azureOpenAIApiKey");
      }
      if (!azureOpenAIApiDeploymentName) {
        throw new Error("azureOpenAIApiDeploymentName is a required parameter when using azureOpenAIApiKey");
      }
      return `https://${azureOpenAIApiInstanceName}.openai.azure.com/openai/deployments/${azureOpenAIApiDeploymentName}`;
    }
    return basePath;
  }
  var init_azure = __esm({
    "node_modules/langchain/dist/util/azure.js"() {
    }
  });

  // node_modules/langchain/dist/chat_models/openai.js
  var openai_exports = {};
  __export(openai_exports, {
    ChatOpenAI: () => ChatOpenAI,
    PromptLayerChatOpenAI: () => PromptLayerChatOpenAI
  });
  function messageTypeToOpenAIRole(type) {
    switch (type) {
      case "system":
        return "system";
      case "ai":
        return "assistant";
      case "human":
        return "user";
      case "function":
        return "function";
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  }
  function openAIResponseToChatMessage(message) {
    switch (message.role) {
      case "user":
        return new HumanMessage(message.content || "");
      case "assistant":
        return new AIMessage(message.content || "", {
          function_call: message.function_call
        });
      case "system":
        return new SystemMessage(message.content || "");
      default:
        return new ChatMessage(message.content || "", message.role ?? "unknown");
    }
  }
  var import_openai, ChatOpenAI, PromptLayerChatOpenAI;
  var init_openai = __esm({
    "node_modules/langchain/dist/chat_models/openai.js"() {
      import_openai = __toModule(require_dist2());
      init_env2();
      init_axios_fetch_adapter();
      init_base3();
      init_schema();
      init_count_tokens();
      init_prompt_layer();
      init_convert_to_openai();
      init_azure();
      ChatOpenAI = class extends BaseChatModel {
        get callKeys() {
          return [
            ...super.callKeys,
            "options",
            "function_call",
            "functions",
            "tools",
            "promptIndex"
          ];
        }
        get lc_secrets() {
          return {
            openAIApiKey: "OPENAI_API_KEY",
            azureOpenAIApiKey: "AZURE_OPENAI_API_KEY"
          };
        }
        get lc_aliases() {
          return {
            modelName: "model",
            openAIApiKey: "openai_api_key",
            azureOpenAIApiVersion: "azure_openai_api_version",
            azureOpenAIApiKey: "azure_openai_api_key",
            azureOpenAIApiInstanceName: "azure_openai_api_instance_name",
            azureOpenAIApiDeploymentName: "azure_openai_api_deployment_name"
          };
        }
        constructor(fields, configuration) {
          super(fields ?? {});
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
          Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
          });
          Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
          });
          Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
          });
          Object.defineProperty(this, "presencePenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
          });
          Object.defineProperty(this, "n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
          });
          Object.defineProperty(this, "logitBias", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt-3.5-turbo"
          });
          Object.defineProperty(this, "modelKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "openAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "azureOpenAIApiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "azureOpenAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "azureOpenAIApiInstanceName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "azureOpenAIBasePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.openAIApiKey = fields?.openAIApiKey ?? getEnvironmentVariable2("OPENAI_API_KEY");
          this.azureOpenAIApiKey = fields?.azureOpenAIApiKey ?? getEnvironmentVariable2("AZURE_OPENAI_API_KEY");
          if (!this.azureOpenAIApiKey && !this.openAIApiKey) {
            throw new Error("OpenAI or Azure OpenAI API key not found");
          }
          this.azureOpenAIApiInstanceName = fields?.azureOpenAIApiInstanceName ?? getEnvironmentVariable2("AZURE_OPENAI_API_INSTANCE_NAME");
          this.azureOpenAIApiDeploymentName = fields?.azureOpenAIApiDeploymentName ?? getEnvironmentVariable2("AZURE_OPENAI_API_DEPLOYMENT_NAME");
          this.azureOpenAIApiVersion = fields?.azureOpenAIApiVersion ?? getEnvironmentVariable2("AZURE_OPENAI_API_VERSION");
          this.azureOpenAIBasePath = fields?.azureOpenAIBasePath ?? getEnvironmentVariable2("AZURE_OPENAI_BASE_PATH");
          this.modelName = fields?.modelName ?? this.modelName;
          this.modelKwargs = fields?.modelKwargs ?? {};
          this.timeout = fields?.timeout;
          this.temperature = fields?.temperature ?? this.temperature;
          this.topP = fields?.topP ?? this.topP;
          this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
          this.presencePenalty = fields?.presencePenalty ?? this.presencePenalty;
          this.maxTokens = fields?.maxTokens;
          this.n = fields?.n ?? this.n;
          this.logitBias = fields?.logitBias;
          this.stop = fields?.stop;
          this.streaming = fields?.streaming ?? false;
          if (this.azureOpenAIApiKey) {
            if (!this.azureOpenAIApiInstanceName) {
              throw new Error("Azure OpenAI API instance name not found");
            }
            if (!this.azureOpenAIApiDeploymentName) {
              throw new Error("Azure OpenAI API deployment name not found");
            }
            if (!this.azureOpenAIApiVersion) {
              throw new Error("Azure OpenAI API version not found");
            }
          }
          this.clientConfig = {
            apiKey: this.openAIApiKey,
            ...configuration,
            ...fields?.configuration
          };
        }
        invocationParams(options) {
          return {
            model: this.modelName,
            temperature: this.temperature,
            top_p: this.topP,
            frequency_penalty: this.frequencyPenalty,
            presence_penalty: this.presencePenalty,
            max_tokens: this.maxTokens === -1 ? void 0 : this.maxTokens,
            n: this.n,
            logit_bias: this.logitBias,
            stop: options?.stop ?? this.stop,
            stream: this.streaming,
            functions: options?.functions ?? (options?.tools ? options?.tools.map(formatToOpenAIFunction) : void 0),
            function_call: options?.function_call,
            ...this.modelKwargs
          };
        }
        _identifyingParams() {
          return {
            model_name: this.modelName,
            ...this.invocationParams(),
            ...this.clientConfig
          };
        }
        identifyingParams() {
          return this._identifyingParams();
        }
        async _generate(messages2, options, runManager) {
          const tokenUsage = {};
          const params = this.invocationParams(options);
          const messagesMapped = messages2.map((message) => ({
            role: messageTypeToOpenAIRole(message._getType()),
            content: message.content,
            name: message.name,
            function_call: message.additional_kwargs.function_call
          }));
          const data = params.stream ? await new Promise((resolve, reject) => {
            let response;
            let rejected = false;
            let resolved = false;
            this.completionWithRetry({
              ...params,
              messages: messagesMapped
            }, {
              signal: options?.signal,
              ...options?.options,
              adapter: fetchAdapter,
              responseType: "stream",
              onmessage: (event) => {
                if (event.data?.trim?.() === "[DONE]") {
                  if (resolved || rejected) {
                    return;
                  }
                  resolved = true;
                  resolve(response);
                } else {
                  const data2 = JSON.parse(event.data);
                  if (data2?.error) {
                    if (rejected) {
                      return;
                    }
                    rejected = true;
                    reject(data2.error);
                    return;
                  }
                  const message = data2;
                  if (!response) {
                    response = {
                      id: message.id,
                      object: message.object,
                      created: message.created,
                      model: message.model,
                      choices: []
                    };
                  }
                  for (const part of message.choices ?? []) {
                    if (part != null) {
                      let choice = response.choices.find((c3) => c3.index === part.index);
                      if (!choice) {
                        choice = {
                          index: part.index,
                          finish_reason: part.finish_reason ?? void 0
                        };
                        response.choices[part.index] = choice;
                      }
                      if (!choice.message) {
                        choice.message = {
                          role: part.delta?.role,
                          content: ""
                        };
                      }
                      if (part.delta.function_call && !choice.message.function_call) {
                        choice.message.function_call = {
                          name: "",
                          arguments: ""
                        };
                      }
                      choice.message.content += part.delta?.content ?? "";
                      if (choice.message.function_call) {
                        choice.message.function_call.name += part.delta?.function_call?.name ?? "";
                        choice.message.function_call.arguments += part.delta?.function_call?.arguments ?? "";
                      }
                      void runManager?.handleLLMNewToken(part.delta?.content ?? "", {
                        prompt: options.promptIndex ?? 0,
                        completion: part.index
                      });
                    }
                  }
                  if (!resolved && !rejected && message.choices?.every((c3) => c3.finish_reason != null)) {
                    resolved = true;
                    resolve(response);
                  }
                }
              }
            }).catch((error) => {
              if (!rejected) {
                rejected = true;
                reject(error);
              }
            });
          }) : await this.completionWithRetry({
            ...params,
            messages: messagesMapped
          }, {
            signal: options?.signal,
            ...options?.options
          });
          const { completion_tokens: completionTokens, prompt_tokens: promptTokens, total_tokens: totalTokens } = data.usage ?? {};
          if (completionTokens) {
            tokenUsage.completionTokens = (tokenUsage.completionTokens ?? 0) + completionTokens;
          }
          if (promptTokens) {
            tokenUsage.promptTokens = (tokenUsage.promptTokens ?? 0) + promptTokens;
          }
          if (totalTokens) {
            tokenUsage.totalTokens = (tokenUsage.totalTokens ?? 0) + totalTokens;
          }
          const generations = [];
          for (const part of data.choices) {
            const text = part.message?.content ?? "";
            generations.push({
              text,
              message: openAIResponseToChatMessage(part.message ?? { role: "assistant" })
            });
          }
          return {
            generations,
            llmOutput: { tokenUsage }
          };
        }
        async getNumTokensFromMessages(messages2) {
          let totalCount = 0;
          let tokensPerMessage = 0;
          let tokensPerName = 0;
          if (getModelNameForTiktoken(this.modelName) === "gpt-3.5-turbo") {
            tokensPerMessage = 4;
            tokensPerName = -1;
          } else if (getModelNameForTiktoken(this.modelName).startsWith("gpt-4")) {
            tokensPerMessage = 3;
            tokensPerName = 1;
          }
          const countPerMessage = await Promise.all(messages2.map(async (message) => {
            const textCount = await this.getNumTokens(message.content);
            const roleCount = await this.getNumTokens(messageTypeToOpenAIRole(message._getType()));
            const nameCount = message.name !== void 0 ? tokensPerName + await this.getNumTokens(message.name) : 0;
            const count = textCount + tokensPerMessage + roleCount + nameCount;
            totalCount += count;
            return count;
          }));
          totalCount += 3;
          return { totalCount, countPerMessage };
        }
        async completionWithRetry(request, options) {
          if (!this.client) {
            const openAIEndpointConfig = {
              azureOpenAIApiDeploymentName: this.azureOpenAIApiDeploymentName,
              azureOpenAIApiInstanceName: this.azureOpenAIApiInstanceName,
              azureOpenAIApiKey: this.azureOpenAIApiKey,
              azureOpenAIBasePath: this.azureOpenAIBasePath,
              basePath: this.clientConfig.basePath
            };
            const endpoint = getEndpoint(openAIEndpointConfig);
            const clientConfig = new import_openai.Configuration({
              ...this.clientConfig,
              basePath: endpoint,
              baseOptions: {
                timeout: this.timeout,
                ...this.clientConfig.baseOptions
              }
            });
            this.client = new import_openai.OpenAIApi(clientConfig);
          }
          const axiosOptions = {
            adapter: isNode2() ? void 0 : fetchAdapter,
            ...this.clientConfig.baseOptions,
            ...options
          };
          if (this.azureOpenAIApiKey) {
            axiosOptions.headers = {
              "api-key": this.azureOpenAIApiKey,
              ...axiosOptions.headers
            };
            axiosOptions.params = {
              "api-version": this.azureOpenAIApiVersion,
              ...axiosOptions.params
            };
          }
          return this.caller.call(this.client.createChatCompletion.bind(this.client), request, axiosOptions).then((res) => res.data);
        }
        _llmType() {
          return "openai";
        }
        _combineLLMOutput(...llmOutputs) {
          return llmOutputs.reduce((acc, llmOutput) => {
            if (llmOutput && llmOutput.tokenUsage) {
              acc.tokenUsage.completionTokens += llmOutput.tokenUsage.completionTokens ?? 0;
              acc.tokenUsage.promptTokens += llmOutput.tokenUsage.promptTokens ?? 0;
              acc.tokenUsage.totalTokens += llmOutput.tokenUsage.totalTokens ?? 0;
            }
            return acc;
          }, {
            tokenUsage: {
              completionTokens: 0,
              promptTokens: 0,
              totalTokens: 0
            }
          });
        }
      };
      PromptLayerChatOpenAI = class extends ChatOpenAI {
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "promptLayerApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "plTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "returnPromptLayerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.promptLayerApiKey = fields?.promptLayerApiKey ?? (typeof process !== "undefined" ? process.env?.PROMPTLAYER_API_KEY : void 0);
          this.plTags = fields?.plTags ?? [];
          this.returnPromptLayerId = fields?.returnPromptLayerId ?? false;
        }
        async _generate(messages2, options, runManager) {
          const requestStartTime = Date.now();
          let parsedOptions;
          if (Array.isArray(options)) {
            parsedOptions = { stop: options };
          } else if (options?.timeout && !options.signal) {
            parsedOptions = {
              ...options,
              signal: AbortSignal.timeout(options.timeout)
            };
          } else {
            parsedOptions = options ?? {};
          }
          const generatedResponses = await super._generate(messages2, parsedOptions, runManager);
          const requestEndTime = Date.now();
          const _convertMessageToDict = (message) => {
            let messageDict;
            if (message._getType() === "human") {
              messageDict = { role: "user", content: message.content };
            } else if (message._getType() === "ai") {
              messageDict = { role: "assistant", content: message.content };
            } else if (message._getType() === "function") {
              messageDict = { role: "assistant", content: message.content };
            } else if (message._getType() === "system") {
              messageDict = { role: "system", content: message.content };
            } else if (message._getType() === "generic") {
              messageDict = {
                role: message.role,
                content: message.content
              };
            } else {
              throw new Error(`Got unknown type ${message}`);
            }
            return messageDict;
          };
          const _createMessageDicts = (messages3, callOptions) => {
            const params = {
              ...this.invocationParams(),
              model: this.modelName
            };
            if (callOptions?.stop) {
              if (Object.keys(params).includes("stop")) {
                throw new Error("`stop` found in both the input and default params.");
              }
            }
            const messageDicts = messages3.map((message) => _convertMessageToDict(message));
            return messageDicts;
          };
          for (let i3 = 0; i3 < generatedResponses.generations.length; i3 += 1) {
            const generation = generatedResponses.generations[i3];
            const messageDicts = _createMessageDicts(messages2, parsedOptions);
            let promptLayerRequestId;
            const parsedResp = [
              {
                content: generation.text,
                role: messageTypeToOpenAIRole(generation.message._getType())
              }
            ];
            const promptLayerRespBody = await promptLayerTrackRequest(this.caller, "langchain.PromptLayerChatOpenAI", messageDicts, this._identifyingParams(), this.plTags, parsedResp, requestStartTime, requestEndTime, this.promptLayerApiKey);
            if (this.returnPromptLayerId === true) {
              if (promptLayerRespBody.success === true) {
                promptLayerRequestId = promptLayerRespBody.request_id;
              }
              if (!generation.generationInfo || typeof generation.generationInfo !== "object") {
                generation.generationInfo = {};
              }
              generation.generationInfo.promptLayerRequestId = promptLayerRequestId;
            }
          }
          return generatedResponses;
        }
      };
    }
  });

  // node_modules/langchain/dist/base_language/index.js
  var getVerbosity, BaseLangChain, BaseLanguageModel;
  var init_base_language = __esm({
    "node_modules/langchain/dist/base_language/index.js"() {
      init_async_caller2();
      init_count_tokens();
      init_tiktoken();
      init_serializable();
      init_count_tokens();
      getVerbosity = () => false;
      BaseLangChain = class extends Serializable {
        get lc_attributes() {
          return {
            callbacks: void 0,
            verbose: void 0
          };
        }
        constructor(params) {
          super(params);
          Object.defineProperty(this, "verbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "callbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.verbose = params.verbose ?? getVerbosity();
          this.callbacks = params.callbacks;
          this.tags = params.tags ?? [];
          this.metadata = params.metadata ?? {};
        }
      };
      BaseLanguageModel = class extends BaseLangChain {
        get callKeys() {
          return ["stop", "timeout", "signal", "tags", "metadata", "callbacks"];
        }
        constructor({ callbacks, callbackManager, ...params }) {
          super({
            callbacks: callbacks ?? callbackManager,
            ...params
          });
          Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "_encoding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.caller = new AsyncCaller2(params ?? {});
        }
        async getNumTokens(text) {
          let numTokens = Math.ceil(text.length / 4);
          if (!this._encoding) {
            try {
              this._encoding = await encodingForModel("modelName" in this ? getModelNameForTiktoken(this.modelName) : "gpt2");
            } catch (error) {
              console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
            }
          }
          if (this._encoding) {
            numTokens = this._encoding.encode(text).length;
          }
          return numTokens;
        }
        _identifyingParams() {
          return {};
        }
        serialize() {
          return {
            ...this._identifyingParams(),
            _type: this._llmType(),
            _model: this._modelType()
          };
        }
        static async deserialize(data) {
          const { _type, _model, ...rest } = data;
          if (_model && _model !== "base_chat_model") {
            throw new Error(`Cannot load LLM with model ${_model}`);
          }
          const Cls = {
            openai: (await Promise.resolve().then(() => (init_openai(), openai_exports))).ChatOpenAI
          }[_type];
          if (Cls === void 0) {
            throw new Error(`Cannot load  LLM with type ${_type}`);
          }
          return new Cls(rest);
        }
      };
    }
  });

  // node_modules/langchain/dist/util/set.js
  function intersection(setA, setB) {
    const _intersection = new Set();
    for (const elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }
  function union(setA, setB) {
    const _union = new Set(setA);
    for (const elem of setB) {
      _union.add(elem);
    }
    return _union;
  }
  function difference(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
      _difference.delete(elem);
    }
    return _difference;
  }
  var init_set = __esm({
    "node_modules/langchain/dist/util/set.js"() {
    }
  });

  // node_modules/langchain/dist/chains/sequential_chain.js
  var sequential_chain_exports = {};
  __export(sequential_chain_exports, {
    SequentialChain: () => SequentialChain,
    SimpleSequentialChain: () => SimpleSequentialChain
  });
  function formatSet(input) {
    return Array.from(input).map((i3) => `"${i3}"`).join(", ");
  }
  var SequentialChain, SimpleSequentialChain;
  var init_sequential_chain = __esm({
    "node_modules/langchain/dist/chains/sequential_chain.js"() {
      init_base5();
      init_set();
      SequentialChain = class extends BaseChain {
        get inputKeys() {
          return this.inputVariables;
        }
        get outputKeys() {
          return this.outputVariables;
        }
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "chains", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "outputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "returnAll", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.chains = fields.chains;
          this.inputVariables = fields.inputVariables;
          this.outputVariables = fields.outputVariables ?? [];
          if (this.outputVariables.length > 0 && fields.returnAll) {
            throw new Error("Either specify variables to return using `outputVariables` or use `returnAll` param. Cannot apply both conditions at the same time.");
          }
          this.returnAll = fields.returnAll ?? false;
          this._validateChains();
        }
        _validateChains() {
          if (this.chains.length === 0) {
            throw new Error("Sequential chain must have at least one chain.");
          }
          const memoryKeys = this.memory?.memoryKeys ?? [];
          const inputKeysSet = new Set(this.inputKeys);
          const memoryKeysSet = new Set(memoryKeys);
          const keysIntersection = intersection(inputKeysSet, memoryKeysSet);
          if (keysIntersection.size > 0) {
            throw new Error(`The following keys: ${formatSet(keysIntersection)} are overlapping between memory and input keys of the chain variables. This can lead to unexpected behaviour. Please use input and memory keys that don't overlap.`);
          }
          const availableKeys = union(inputKeysSet, memoryKeysSet);
          for (const chain of this.chains) {
            const missingKeys = difference(new Set(chain.inputKeys), availableKeys);
            if (missingKeys.size > 0) {
              throw new Error(`Missing variables for chain "${chain._chainType()}": ${formatSet(missingKeys)}. Only got the following variables: ${formatSet(availableKeys)}.`);
            }
            const outputKeysSet = new Set(chain.outputKeys);
            const overlappingOutputKeys = intersection(availableKeys, outputKeysSet);
            if (overlappingOutputKeys.size > 0) {
              throw new Error(`The following output variables for chain "${chain._chainType()}" are overlapping: ${formatSet(overlappingOutputKeys)}. This can lead to unexpected behaviour.`);
            }
            for (const outputKey of outputKeysSet) {
              availableKeys.add(outputKey);
            }
          }
          if (this.outputVariables.length === 0) {
            if (this.returnAll) {
              const outputKeys = difference(availableKeys, inputKeysSet);
              this.outputVariables = Array.from(outputKeys);
            } else {
              this.outputVariables = this.chains[this.chains.length - 1].outputKeys;
            }
          } else {
            const missingKeys = difference(new Set(this.outputVariables), new Set(availableKeys));
            if (missingKeys.size > 0) {
              throw new Error(`The following output variables were expected to be in the final chain output but were not found: ${formatSet(missingKeys)}.`);
            }
          }
        }
        async _call(values, runManager) {
          let input = {};
          const allChainValues = values;
          let i3 = 0;
          for (const chain of this.chains) {
            i3 += 1;
            input = await chain.call(allChainValues, runManager?.getChild(`step_${i3}`));
            for (const key of Object.keys(input)) {
              allChainValues[key] = input[key];
            }
          }
          const output = {};
          for (const key of this.outputVariables) {
            output[key] = allChainValues[key];
          }
          return output;
        }
        _chainType() {
          return "sequential_chain";
        }
        static async deserialize(data) {
          const chains = [];
          const inputVariables = data.input_variables;
          const outputVariables = data.output_variables;
          const serializedChains = data.chains;
          for (const serializedChain of serializedChains) {
            const deserializedChain = await BaseChain.deserialize(serializedChain);
            chains.push(deserializedChain);
          }
          return new SequentialChain({ chains, inputVariables, outputVariables });
        }
        serialize() {
          const chains = [];
          for (const chain of this.chains) {
            chains.push(chain.serialize());
          }
          return {
            _type: this._chainType(),
            input_variables: this.inputVariables,
            output_variables: this.outputVariables,
            chains
          };
        }
      };
      SimpleSequentialChain = class extends BaseChain {
        get inputKeys() {
          return [this.inputKey];
        }
        get outputKeys() {
          return [this.outputKey];
        }
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "chains", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input"
          });
          Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
          });
          Object.defineProperty(this, "trimOutputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.chains = fields.chains;
          this.trimOutputs = fields.trimOutputs ?? false;
          this._validateChains();
        }
        _validateChains() {
          for (const chain of this.chains) {
            if (chain.inputKeys.filter((k2) => !chain.memory?.memoryKeys.includes(k2)).length !== 1) {
              throw new Error(`Chains used in SimpleSequentialChain should all have one input, got ${chain.inputKeys.length} for ${chain._chainType()}.`);
            }
            if (chain.outputKeys.length !== 1) {
              throw new Error(`Chains used in SimpleSequentialChain should all have one output, got ${chain.outputKeys.length} for ${chain._chainType()}.`);
            }
          }
        }
        async _call(values, runManager) {
          let input = values[this.inputKey];
          let i3 = 0;
          for (const chain of this.chains) {
            i3 += 1;
            input = (await chain.call({ [chain.inputKeys[0]]: input, signal: values.signal }, runManager?.getChild(`step_${i3}`)))[chain.outputKeys[0]];
            if (this.trimOutputs) {
              input = input.trim();
            }
            await runManager?.handleText(input);
          }
          return { [this.outputKey]: input };
        }
        _chainType() {
          return "simple_sequential_chain";
        }
        static async deserialize(data) {
          const chains = [];
          const serializedChains = data.chains;
          for (const serializedChain of serializedChains) {
            const deserializedChain = await BaseChain.deserialize(serializedChain);
            chains.push(deserializedChain);
          }
          return new SimpleSequentialChain({ chains });
        }
        serialize() {
          const chains = [];
          for (const chain of this.chains) {
            chains.push(chain.serialize());
          }
          return {
            _type: this._chainType(),
            chains
          };
        }
      };
    }
  });

  // node_modules/langchain/dist/prompts/template.js
  var parseFString, interpolateFString, DEFAULT_FORMATTER_MAPPING, DEFAULT_PARSER_MAPPING, renderTemplate, parseTemplate, checkValidTemplate;
  var init_template = __esm({
    "node_modules/langchain/dist/prompts/template.js"() {
      parseFString = (template) => {
        const chars = template.split("");
        const nodes = [];
        const nextBracket = (bracket, start) => {
          for (let i4 = start; i4 < chars.length; i4 += 1) {
            if (bracket.includes(chars[i4])) {
              return i4;
            }
          }
          return -1;
        };
        let i3 = 0;
        while (i3 < chars.length) {
          if (chars[i3] === "{" && i3 + 1 < chars.length && chars[i3 + 1] === "{") {
            nodes.push({ type: "literal", text: "{" });
            i3 += 2;
          } else if (chars[i3] === "}" && i3 + 1 < chars.length && chars[i3 + 1] === "}") {
            nodes.push({ type: "literal", text: "}" });
            i3 += 2;
          } else if (chars[i3] === "{") {
            const j = nextBracket("}", i3);
            if (j < 0) {
              throw new Error("Unclosed '{' in template.");
            }
            nodes.push({
              type: "variable",
              name: chars.slice(i3 + 1, j).join("")
            });
            i3 = j + 1;
          } else if (chars[i3] === "}") {
            throw new Error("Single '}' in template.");
          } else {
            const next = nextBracket("{}", i3);
            const text = (next < 0 ? chars.slice(i3) : chars.slice(i3, next)).join("");
            nodes.push({ type: "literal", text });
            i3 = next < 0 ? chars.length : next;
          }
        }
        return nodes;
      };
      interpolateFString = (template, values) => parseFString(template).reduce((res, node) => {
        if (node.type === "variable") {
          if (node.name in values) {
            return res + values[node.name];
          }
          throw new Error(`Missing value for input ${node.name}`);
        }
        return res + node.text;
      }, "");
      DEFAULT_FORMATTER_MAPPING = {
        "f-string": interpolateFString,
        jinja2: (_2, __) => ""
      };
      DEFAULT_PARSER_MAPPING = {
        "f-string": parseFString,
        jinja2: (_2) => []
      };
      renderTemplate = (template, templateFormat, inputValues) => DEFAULT_FORMATTER_MAPPING[templateFormat](template, inputValues);
      parseTemplate = (template, templateFormat) => DEFAULT_PARSER_MAPPING[templateFormat](template);
      checkValidTemplate = (template, templateFormat, inputVariables) => {
        if (!(templateFormat in DEFAULT_FORMATTER_MAPPING)) {
          const validFormats = Object.keys(DEFAULT_FORMATTER_MAPPING);
          throw new Error(`Invalid template format. Got \`${templateFormat}\`;
                         should be one of ${validFormats}`);
        }
        try {
          const dummyInputs = inputVariables.reduce((acc, v2) => {
            acc[v2] = "foo";
            return acc;
          }, {});
          renderTemplate(template, templateFormat, dummyInputs);
        } catch (e4) {
          throw new Error(`Invalid prompt schema: ${e4.message}`);
        }
      };
    }
  });

  // node_modules/langchain/dist/prompts/few_shot.js
  var few_shot_exports = {};
  __export(few_shot_exports, {
    FewShotPromptTemplate: () => FewShotPromptTemplate
  });
  var FewShotPromptTemplate;
  var init_few_shot = __esm({
    "node_modules/langchain/dist/prompts/few_shot.js"() {
      init_base4();
      init_template();
      init_prompt();
      FewShotPromptTemplate = class extends BaseStringPromptTemplate {
        constructor(input) {
          super(input);
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "exampleSelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "examplePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "suffix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
          });
          Object.defineProperty(this, "exampleSeparator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "\n\n"
          });
          Object.defineProperty(this, "prefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
          });
          Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
          });
          Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
          Object.assign(this, input);
          if (this.examples !== void 0 && this.exampleSelector !== void 0) {
            throw new Error("Only one of 'examples' and 'example_selector' should be provided");
          }
          if (this.examples === void 0 && this.exampleSelector === void 0) {
            throw new Error("One of 'examples' and 'example_selector' should be provided");
          }
          if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
              totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            checkValidTemplate(this.prefix + this.suffix, this.templateFormat, totalInputVariables);
          }
        }
        _getPromptType() {
          return "few_shot";
        }
        async getExamples(inputVariables) {
          if (this.examples !== void 0) {
            return this.examples;
          }
          if (this.exampleSelector !== void 0) {
            return this.exampleSelector.selectExamples(inputVariables);
          }
          throw new Error("One of 'examples' and 'example_selector' should be provided");
        }
        async partial(values) {
          const promptDict = { ...this };
          promptDict.inputVariables = this.inputVariables.filter((iv) => !(iv in values));
          promptDict.partialVariables = {
            ...this.partialVariables ?? {},
            ...values
          };
          return new FewShotPromptTemplate(promptDict);
        }
        async format(values) {
          const allValues = await this.mergePartialAndUserVariables(values);
          const examples = await this.getExamples(allValues);
          const exampleStrings = await Promise.all(examples.map((example) => this.examplePrompt.format(example)));
          const template = [this.prefix, ...exampleStrings, this.suffix].join(this.exampleSeparator);
          return renderTemplate(template, this.templateFormat, allValues);
        }
        serialize() {
          if (this.exampleSelector || !this.examples) {
            throw new Error("Serializing an example selector is not currently supported");
          }
          if (this.outputParser !== void 0) {
            throw new Error("Serializing an output parser is not currently supported");
          }
          return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            example_prompt: this.examplePrompt.serialize(),
            example_separator: this.exampleSeparator,
            suffix: this.suffix,
            prefix: this.prefix,
            template_format: this.templateFormat,
            examples: this.examples
          };
        }
        static async deserialize(data) {
          const { example_prompt } = data;
          if (!example_prompt) {
            throw new Error("Missing example prompt");
          }
          const examplePrompt = await PromptTemplate.deserialize(example_prompt);
          let examples;
          if (Array.isArray(data.examples)) {
            examples = data.examples;
          } else {
            throw new Error("Invalid examples format. Only list or string are supported.");
          }
          return new FewShotPromptTemplate({
            inputVariables: data.input_variables,
            examplePrompt,
            examples,
            exampleSeparator: data.example_separator,
            prefix: data.prefix,
            suffix: data.suffix,
            templateFormat: data.template_format
          });
        }
      };
    }
  });

  // node_modules/langchain/dist/prompts/base.js
  var StringPromptValue, BasePromptTemplate, BaseStringPromptTemplate;
  var init_base4 = __esm({
    "node_modules/langchain/dist/prompts/base.js"() {
      init_schema();
      init_serializable();
      StringPromptValue = class extends BasePromptValue {
        constructor(value) {
          super(...arguments);
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "prompts", "base"]
          });
          Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.value = value;
        }
        toString() {
          return this.value;
        }
        toChatMessages() {
          return [new HumanMessage(this.value)];
        }
      };
      BasePromptTemplate = class extends Serializable {
        get lc_attributes() {
          return {
            partialVariables: void 0
          };
        }
        constructor(input) {
          super(input);
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "prompts", this._getPromptType()]
          });
          Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "partialVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
          });
          const { inputVariables } = input;
          if (inputVariables.includes("stop")) {
            throw new Error("Cannot have an input variable named 'stop', as it is used internally, please rename.");
          }
          Object.assign(this, input);
        }
        async mergePartialAndUserVariables(userVariables) {
          const partialVariables = this.partialVariables ?? {};
          const partialValues = {};
          for (const [key, value] of Object.entries(partialVariables)) {
            if (typeof value === "string") {
              partialValues[key] = value;
            } else {
              partialValues[key] = await value();
            }
          }
          const allKwargs = { ...partialValues, ...userVariables };
          return allKwargs;
        }
        serialize() {
          throw new Error("Use .toJSON() instead");
        }
        static async deserialize(data) {
          switch (data._type) {
            case "prompt": {
              const { PromptTemplate: PromptTemplate2 } = await Promise.resolve().then(() => (init_prompt(), prompt_exports));
              return PromptTemplate2.deserialize(data);
            }
            case void 0: {
              const { PromptTemplate: PromptTemplate2 } = await Promise.resolve().then(() => (init_prompt(), prompt_exports));
              return PromptTemplate2.deserialize({ ...data, _type: "prompt" });
            }
            case "few_shot": {
              const { FewShotPromptTemplate: FewShotPromptTemplate2 } = await Promise.resolve().then(() => (init_few_shot(), few_shot_exports));
              return FewShotPromptTemplate2.deserialize(data);
            }
            default:
              throw new Error(`Invalid prompt type in config: ${data._type}`);
          }
        }
      };
      BaseStringPromptTemplate = class extends BasePromptTemplate {
        async formatPromptValue(values) {
          const formattedPrompt = await this.format(values);
          return new StringPromptValue(formattedPrompt);
        }
      };
    }
  });

  // node_modules/langchain/dist/prompts/prompt.js
  var prompt_exports = {};
  __export(prompt_exports, {
    PromptTemplate: () => PromptTemplate
  });
  var PromptTemplate;
  var init_prompt = __esm({
    "node_modules/langchain/dist/prompts/prompt.js"() {
      init_base4();
      init_template();
      PromptTemplate = class extends BaseStringPromptTemplate {
        constructor(input) {
          super(input);
          Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
          });
          Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
          Object.assign(this, input);
          if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
              totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            checkValidTemplate(this.template, this.templateFormat, totalInputVariables);
          }
        }
        _getPromptType() {
          return "prompt";
        }
        async format(values) {
          const allValues = await this.mergePartialAndUserVariables(values);
          return renderTemplate(this.template, this.templateFormat, allValues);
        }
        static fromExamples(examples, suffix, inputVariables, exampleSeparator = "\n\n", prefix = "") {
          const template = [prefix, ...examples, suffix].join(exampleSeparator);
          return new PromptTemplate({
            inputVariables,
            template
          });
        }
        static fromTemplate(template, { templateFormat = "f-string", ...rest } = {}) {
          const names = new Set();
          parseTemplate(template, templateFormat).forEach((node) => {
            if (node.type === "variable") {
              names.add(node.name);
            }
          });
          return new PromptTemplate({
            inputVariables: [...names],
            templateFormat,
            template,
            ...rest
          });
        }
        async partial(values) {
          const promptDict = { ...this };
          promptDict.inputVariables = this.inputVariables.filter((iv) => !(iv in values));
          promptDict.partialVariables = {
            ...this.partialVariables ?? {},
            ...values
          };
          return new PromptTemplate(promptDict);
        }
        serialize() {
          if (this.outputParser !== void 0) {
            throw new Error("Cannot serialize a prompt template with an output parser");
          }
          return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            template: this.template,
            template_format: this.templateFormat
          };
        }
        static async deserialize(data) {
          if (!data.template) {
            throw new Error("Prompt template must have a template");
          }
          const res = new PromptTemplate({
            inputVariables: data.input_variables,
            template: data.template,
            templateFormat: data.template_format
          });
          return res;
        }
      };
    }
  });

  // node_modules/langchain/dist/chains/combine_docs_chain.js
  var combine_docs_chain_exports = {};
  __export(combine_docs_chain_exports, {
    MapReduceDocumentsChain: () => MapReduceDocumentsChain,
    RefineDocumentsChain: () => RefineDocumentsChain,
    StuffDocumentsChain: () => StuffDocumentsChain
  });
  var StuffDocumentsChain, MapReduceDocumentsChain, RefineDocumentsChain;
  var init_combine_docs_chain = __esm({
    "node_modules/langchain/dist/chains/combine_docs_chain.js"() {
      init_base5();
      init_llm_chain();
      init_prompt();
      StuffDocumentsChain = class extends BaseChain {
        get inputKeys() {
          return [this.inputKey, ...this.llmChain.inputKeys].filter((key) => key !== this.documentVariableName);
        }
        get outputKeys() {
          return this.llmChain.outputKeys;
        }
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_documents"
          });
          Object.defineProperty(this, "documentVariableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "context"
          });
          this.llmChain = fields.llmChain;
          this.documentVariableName = fields.documentVariableName ?? this.documentVariableName;
          this.inputKey = fields.inputKey ?? this.inputKey;
        }
        _prepInputs(values) {
          if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
          }
          const { [this.inputKey]: docs, ...rest } = values;
          const texts = docs.map(({ pageContent }) => pageContent);
          const text = texts.join("\n\n");
          return {
            ...rest,
            [this.documentVariableName]: text
          };
        }
        async _call(values, runManager) {
          const result = await this.llmChain.call(this._prepInputs(values), runManager?.getChild("combine_documents"));
          return result;
        }
        _chainType() {
          return "stuff_documents_chain";
        }
        static async deserialize(data) {
          if (!data.llm_chain) {
            throw new Error("Missing llm_chain");
          }
          return new StuffDocumentsChain({
            llmChain: await LLMChain.deserialize(data.llm_chain)
          });
        }
        serialize() {
          return {
            _type: this._chainType(),
            llm_chain: this.llmChain.serialize()
          };
        }
      };
      MapReduceDocumentsChain = class extends BaseChain {
        get inputKeys() {
          return [this.inputKey, ...this.combineDocumentChain.inputKeys];
        }
        get outputKeys() {
          return this.combineDocumentChain.outputKeys;
        }
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_documents"
          });
          Object.defineProperty(this, "documentVariableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "context"
          });
          Object.defineProperty(this, "returnIntermediateSteps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3e3
          });
          Object.defineProperty(this, "maxIterations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
          });
          Object.defineProperty(this, "ensureMapStep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          Object.defineProperty(this, "combineDocumentChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.llmChain = fields.llmChain;
          this.combineDocumentChain = fields.combineDocumentChain;
          this.documentVariableName = fields.documentVariableName ?? this.documentVariableName;
          this.ensureMapStep = fields.ensureMapStep ?? this.ensureMapStep;
          this.inputKey = fields.inputKey ?? this.inputKey;
          this.maxTokens = fields.maxTokens ?? this.maxTokens;
          this.maxIterations = fields.maxIterations ?? this.maxIterations;
          this.returnIntermediateSteps = fields.returnIntermediateSteps ?? false;
        }
        async _call(values, runManager) {
          if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
          }
          const { [this.inputKey]: docs, ...rest } = values;
          let currentDocs = docs;
          let intermediateSteps = [];
          for (let i3 = 0; i3 < this.maxIterations; i3 += 1) {
            const inputs = currentDocs.map((d3) => ({
              [this.documentVariableName]: d3.pageContent,
              ...rest
            }));
            const canSkipMapStep = i3 !== 0 || !this.ensureMapStep;
            if (canSkipMapStep) {
              const formatted = await this.combineDocumentChain.llmChain.prompt.format(this.combineDocumentChain._prepInputs({
                [this.combineDocumentChain.inputKey]: currentDocs,
                ...rest
              }));
              const length = await this.combineDocumentChain.llmChain.llm.getNumTokens(formatted);
              const withinTokenLimit = length < this.maxTokens;
              if (withinTokenLimit) {
                break;
              }
            }
            const results = await this.llmChain.apply(inputs, runManager ? Array.from({ length: inputs.length }, (_2, i4) => runManager.getChild(`map_${i4 + 1}`)) : void 0);
            const { outputKey } = this.llmChain;
            if (this.returnIntermediateSteps) {
              intermediateSteps = intermediateSteps.concat(results.map((r4) => r4[outputKey]));
            }
            currentDocs = results.map((r4) => ({
              pageContent: r4[outputKey],
              metadata: {}
            }));
          }
          const newInputs = {
            [this.combineDocumentChain.inputKey]: currentDocs,
            ...rest
          };
          const result = await this.combineDocumentChain.call(newInputs, runManager?.getChild("combine_documents"));
          if (this.returnIntermediateSteps) {
            return { ...result, intermediateSteps };
          }
          return result;
        }
        _chainType() {
          return "map_reduce_documents_chain";
        }
        static async deserialize(data) {
          if (!data.llm_chain) {
            throw new Error("Missing llm_chain");
          }
          if (!data.combine_document_chain) {
            throw new Error("Missing combine_document_chain");
          }
          return new MapReduceDocumentsChain({
            llmChain: await LLMChain.deserialize(data.llm_chain),
            combineDocumentChain: await StuffDocumentsChain.deserialize(data.combine_document_chain)
          });
        }
        serialize() {
          return {
            _type: this._chainType(),
            llm_chain: this.llmChain.serialize(),
            combine_document_chain: this.combineDocumentChain.serialize()
          };
        }
      };
      RefineDocumentsChain = class extends BaseChain {
        get defaultDocumentPrompt() {
          return new PromptTemplate({
            inputVariables: ["page_content"],
            template: "{page_content}"
          });
        }
        get inputKeys() {
          return [
            ...new Set([
              this.inputKey,
              ...this.llmChain.inputKeys,
              ...this.refineLLMChain.inputKeys
            ])
          ].filter((key) => key !== this.documentVariableName && key !== this.initialResponseName);
        }
        get outputKeys() {
          return [this.outputKey];
        }
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_documents"
          });
          Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output_text"
          });
          Object.defineProperty(this, "documentVariableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "context"
          });
          Object.defineProperty(this, "initialResponseName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "existing_answer"
          });
          Object.defineProperty(this, "refineLLMChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "documentPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.defaultDocumentPrompt
          });
          this.llmChain = fields.llmChain;
          this.refineLLMChain = fields.refineLLMChain;
          this.documentVariableName = fields.documentVariableName ?? this.documentVariableName;
          this.inputKey = fields.inputKey ?? this.inputKey;
          this.outputKey = fields.outputKey ?? this.outputKey;
          this.documentPrompt = fields.documentPrompt ?? this.documentPrompt;
          this.initialResponseName = fields.initialResponseName ?? this.initialResponseName;
        }
        async _constructInitialInputs(doc, rest) {
          const baseInfo = {
            page_content: doc.pageContent,
            ...doc.metadata
          };
          const documentInfo = {};
          this.documentPrompt.inputVariables.forEach((value) => {
            documentInfo[value] = baseInfo[value];
          });
          const baseInputs = {
            [this.documentVariableName]: await this.documentPrompt.format({
              ...documentInfo
            })
          };
          const inputs = { ...baseInputs, ...rest };
          return inputs;
        }
        async _constructRefineInputs(doc, res) {
          const baseInfo = {
            page_content: doc.pageContent,
            ...doc.metadata
          };
          const documentInfo = {};
          this.documentPrompt.inputVariables.forEach((value) => {
            documentInfo[value] = baseInfo[value];
          });
          const baseInputs = {
            [this.documentVariableName]: await this.documentPrompt.format({
              ...documentInfo
            })
          };
          const inputs = { [this.initialResponseName]: res, ...baseInputs };
          return inputs;
        }
        async _call(values, runManager) {
          if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
          }
          const { [this.inputKey]: docs, ...rest } = values;
          const currentDocs = docs;
          const initialInputs = await this._constructInitialInputs(currentDocs[0], rest);
          let res = await this.llmChain.predict({ ...initialInputs }, runManager?.getChild("answer"));
          const refineSteps = [res];
          for (let i3 = 1; i3 < currentDocs.length; i3 += 1) {
            const refineInputs = await this._constructRefineInputs(currentDocs[i3], res);
            const inputs = { ...refineInputs, ...rest };
            res = await this.refineLLMChain.predict({ ...inputs }, runManager?.getChild("refine"));
            refineSteps.push(res);
          }
          return { [this.outputKey]: res };
        }
        _chainType() {
          return "refine_documents_chain";
        }
        static async deserialize(data) {
          const SerializedLLMChain = data.llm_chain;
          if (!SerializedLLMChain) {
            throw new Error("Missing llm_chain");
          }
          const SerializedRefineDocumentChain = data.refine_llm_chain;
          if (!SerializedRefineDocumentChain) {
            throw new Error("Missing refine_llm_chain");
          }
          return new RefineDocumentsChain({
            llmChain: await LLMChain.deserialize(SerializedLLMChain),
            refineLLMChain: await LLMChain.deserialize(SerializedRefineDocumentChain)
          });
        }
        serialize() {
          return {
            _type: this._chainType(),
            llm_chain: this.llmChain.serialize(),
            refine_llm_chain: this.refineLLMChain.serialize()
          };
        }
      };
    }
  });

  // node_modules/langchain/dist/prompts/chat.js
  var BaseMessagePromptTemplate, ChatPromptValue, MessagesPlaceholder, BaseMessageStringPromptTemplate, BaseChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, ChatPromptTemplate;
  var init_chat = __esm({
    "node_modules/langchain/dist/prompts/chat.js"() {
      init_schema();
      init_serializable();
      init_base4();
      init_prompt();
      BaseMessagePromptTemplate = class extends Serializable {
        constructor() {
          super(...arguments);
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "prompts", "chat"]
          });
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
        }
      };
      ChatPromptValue = class extends BasePromptValue {
        constructor(fields) {
          if (Array.isArray(fields)) {
            fields = { messages: fields };
          }
          super(...arguments);
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "prompts", "chat"]
          });
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
          Object.defineProperty(this, "messages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.messages = fields.messages;
        }
        toString() {
          return JSON.stringify(this.messages);
        }
        toChatMessages() {
          return this.messages;
        }
      };
      MessagesPlaceholder = class extends BaseMessagePromptTemplate {
        constructor(fields) {
          if (typeof fields === "string") {
            fields = { variableName: fields };
          }
          super(fields);
          Object.defineProperty(this, "variableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.variableName = fields.variableName;
        }
        get inputVariables() {
          return [this.variableName];
        }
        formatMessages(values) {
          return Promise.resolve(values[this.variableName]);
        }
      };
      BaseMessageStringPromptTemplate = class extends BaseMessagePromptTemplate {
        constructor(fields) {
          if (!("prompt" in fields)) {
            fields = { prompt: fields };
          }
          super(fields);
          Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.prompt = fields.prompt;
        }
        get inputVariables() {
          return this.prompt.inputVariables;
        }
        async formatMessages(values) {
          return [await this.format(values)];
        }
      };
      BaseChatPromptTemplate = class extends BasePromptTemplate {
        constructor(input) {
          super(input);
        }
        async format(values) {
          return (await this.formatPromptValue(values)).toString();
        }
        async formatPromptValue(values) {
          const resultMessages = await this.formatMessages(values);
          return new ChatPromptValue(resultMessages);
        }
      };
      HumanMessagePromptTemplate = class extends BaseMessageStringPromptTemplate {
        async format(values) {
          return new HumanMessage(await this.prompt.format(values));
        }
        static fromTemplate(template) {
          return new this(PromptTemplate.fromTemplate(template));
        }
      };
      SystemMessagePromptTemplate = class extends BaseMessageStringPromptTemplate {
        async format(values) {
          return new SystemMessage(await this.prompt.format(values));
        }
        static fromTemplate(template) {
          return new this(PromptTemplate.fromTemplate(template));
        }
      };
      ChatPromptTemplate = class extends BaseChatPromptTemplate {
        get lc_aliases() {
          return {
            promptMessages: "messages"
          };
        }
        constructor(input) {
          super(input);
          Object.defineProperty(this, "promptMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
          Object.assign(this, input);
          if (this.validateTemplate) {
            const inputVariablesMessages = new Set();
            for (const promptMessage of this.promptMessages) {
              for (const inputVariable of promptMessage.inputVariables) {
                inputVariablesMessages.add(inputVariable);
              }
            }
            const inputVariablesInstance = new Set(this.partialVariables ? this.inputVariables.concat(Object.keys(this.partialVariables)) : this.inputVariables);
            const difference2 = new Set([...inputVariablesInstance].filter((x2) => !inputVariablesMessages.has(x2)));
            if (difference2.size > 0) {
              throw new Error(`Input variables \`${[
                ...difference2
              ]}\` are not used in any of the prompt messages.`);
            }
            const otherDifference = new Set([...inputVariablesMessages].filter((x2) => !inputVariablesInstance.has(x2)));
            if (otherDifference.size > 0) {
              throw new Error(`Input variables \`${[
                ...otherDifference
              ]}\` are used in prompt messages but not in the prompt template.`);
            }
          }
        }
        _getPromptType() {
          return "chat";
        }
        async formatMessages(values) {
          const allValues = await this.mergePartialAndUserVariables(values);
          let resultMessages = [];
          for (const promptMessage of this.promptMessages) {
            const inputValues = promptMessage.inputVariables.reduce((acc, inputVariable) => {
              if (!(inputVariable in allValues)) {
                throw new Error(`Missing value for input variable \`${inputVariable}\``);
              }
              acc[inputVariable] = allValues[inputVariable];
              return acc;
            }, {});
            const message = await promptMessage.formatMessages(inputValues);
            resultMessages = resultMessages.concat(message);
          }
          return resultMessages;
        }
        async partial(values) {
          const promptDict = { ...this };
          promptDict.inputVariables = this.inputVariables.filter((iv) => !(iv in values));
          promptDict.partialVariables = {
            ...this.partialVariables ?? {},
            ...values
          };
          return new ChatPromptTemplate(promptDict);
        }
        static fromPromptMessages(promptMessages) {
          const flattenedMessages = promptMessages.reduce((acc, promptMessage) => acc.concat(promptMessage instanceof ChatPromptTemplate ? promptMessage.promptMessages : [promptMessage]), []);
          const flattenedPartialVariables = promptMessages.reduce((acc, promptMessage) => promptMessage instanceof ChatPromptTemplate ? Object.assign(acc, promptMessage.partialVariables) : acc, Object.create(null));
          const inputVariables = new Set();
          for (const promptMessage of flattenedMessages) {
            for (const inputVariable of promptMessage.inputVariables) {
              if (inputVariable in flattenedPartialVariables) {
                continue;
              }
              inputVariables.add(inputVariable);
            }
          }
          return new ChatPromptTemplate({
            inputVariables: [...inputVariables],
            promptMessages: flattenedMessages,
            partialVariables: flattenedPartialVariables
          });
        }
      };
    }
  });

  // node_modules/langchain/dist/prompts/selectors/conditional.js
  function isChatModel(llm) {
    return llm._modelType() === "base_chat_model";
  }
  var BasePromptSelector, ConditionalPromptSelector;
  var init_conditional = __esm({
    "node_modules/langchain/dist/prompts/selectors/conditional.js"() {
      BasePromptSelector = class {
        async getPromptAsync(llm, options) {
          const prompt = this.getPrompt(llm);
          return prompt.partial(options?.partialVariables ?? {});
        }
      };
      ConditionalPromptSelector = class extends BasePromptSelector {
        constructor(default_prompt, conditionals = []) {
          super();
          Object.defineProperty(this, "defaultPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "conditionals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.defaultPrompt = default_prompt;
          this.conditionals = conditionals;
        }
        getPrompt(llm) {
          for (const [condition, prompt] of this.conditionals) {
            if (condition(llm)) {
              return prompt;
            }
          }
          return this.defaultPrompt;
        }
      };
    }
  });

  // node_modules/langchain/dist/chains/question_answering/stuff_prompts.js
  var DEFAULT_QA_PROMPT, system_template, messages, CHAT_PROMPT, QA_PROMPT_SELECTOR;
  var init_stuff_prompts = __esm({
    "node_modules/langchain/dist/chains/question_answering/stuff_prompts.js"() {
      init_prompt();
      init_chat();
      init_conditional();
      DEFAULT_QA_PROMPT = /* @__PURE__ */ new PromptTemplate({
        template: "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:",
        inputVariables: ["context", "question"]
      });
      system_template = `Use the following pieces of context to answer the users question. 
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}`;
      messages = [
        /* @__PURE__ */ SystemMessagePromptTemplate.fromTemplate(system_template),
        /* @__PURE__ */ HumanMessagePromptTemplate.fromTemplate("{question}")
      ];
      CHAT_PROMPT = /* @__PURE__ */ ChatPromptTemplate.fromPromptMessages(messages);
      QA_PROMPT_SELECTOR = /* @__PURE__ */ new ConditionalPromptSelector(DEFAULT_QA_PROMPT, [[isChatModel, CHAT_PROMPT]]);
    }
  });

  // node_modules/langchain/dist/chains/question_answering/map_reduce_prompts.js
  var init_map_reduce_prompts = __esm({
    "node_modules/langchain/dist/chains/question_answering/map_reduce_prompts.js"() {
      init_prompt();
      init_chat();
      init_conditional();
    }
  });

  // node_modules/langchain/dist/prompts/selectors/LengthBasedExampleSelector.js
  var init_LengthBasedExampleSelector = __esm({
    "node_modules/langchain/dist/prompts/selectors/LengthBasedExampleSelector.js"() {
      init_base4();
    }
  });

  // node_modules/langchain/dist/document.js
  var init_document = __esm({
    "node_modules/langchain/dist/document.js"() {
    }
  });

  // node_modules/langchain/dist/prompts/selectors/SemanticSimilarityExampleSelector.js
  var init_SemanticSimilarityExampleSelector = __esm({
    "node_modules/langchain/dist/prompts/selectors/SemanticSimilarityExampleSelector.js"() {
      init_document();
      init_base4();
    }
  });

  // node_modules/langchain/dist/prompts/pipeline.js
  var init_pipeline = __esm({
    "node_modules/langchain/dist/prompts/pipeline.js"() {
      init_base4();
      init_chat();
    }
  });

  // node_modules/langchain/dist/prompts/index.js
  var init_prompts = __esm({
    "node_modules/langchain/dist/prompts/index.js"() {
      init_base4();
      init_prompt();
      init_conditional();
      init_LengthBasedExampleSelector();
      init_SemanticSimilarityExampleSelector();
      init_few_shot();
      init_chat();
      init_template();
      init_pipeline();
    }
  });

  // node_modules/langchain/dist/chains/question_answering/refine_prompts.js
  var init_refine_prompts = __esm({
    "node_modules/langchain/dist/chains/question_answering/refine_prompts.js"() {
      init_prompts();
      init_conditional();
    }
  });

  // node_modules/langchain/dist/chains/question_answering/load.js
  function loadQAStuffChain(llm, params = {}) {
    const { prompt = QA_PROMPT_SELECTOR.getPrompt(llm), verbose } = params;
    const llmChain = new LLMChain({ prompt, llm, verbose });
    const chain = new StuffDocumentsChain({ llmChain, verbose });
    return chain;
  }
  var init_load = __esm({
    "node_modules/langchain/dist/chains/question_answering/load.js"() {
      init_llm_chain();
      init_combine_docs_chain();
      init_stuff_prompts();
      init_map_reduce_prompts();
      init_refine_prompts();
    }
  });

  // node_modules/langchain/dist/chains/vector_db_qa.js
  var vector_db_qa_exports = {};
  __export(vector_db_qa_exports, {
    VectorDBQAChain: () => VectorDBQAChain
  });
  var VectorDBQAChain;
  var init_vector_db_qa = __esm({
    "node_modules/langchain/dist/chains/vector_db_qa.js"() {
      init_base5();
      init_load();
      VectorDBQAChain = class extends BaseChain {
        get inputKeys() {
          return [this.inputKey];
        }
        get outputKeys() {
          return this.combineDocumentsChain.outputKeys.concat(this.returnSourceDocuments ? ["sourceDocuments"] : []);
        }
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
          });
          Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query"
          });
          Object.defineProperty(this, "vectorstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "returnSourceDocuments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
          });
          this.vectorstore = fields.vectorstore;
          this.combineDocumentsChain = fields.combineDocumentsChain;
          this.inputKey = fields.inputKey ?? this.inputKey;
          this.k = fields.k ?? this.k;
          this.returnSourceDocuments = fields.returnSourceDocuments ?? this.returnSourceDocuments;
        }
        async _call(values, runManager) {
          if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
          }
          const question = values[this.inputKey];
          const docs = await this.vectorstore.similaritySearch(question, this.k, values.filter, runManager?.getChild("vectorstore"));
          const inputs = { question, input_documents: docs };
          const result = await this.combineDocumentsChain.call(inputs, runManager?.getChild("combine_documents"));
          if (this.returnSourceDocuments) {
            return {
              ...result,
              sourceDocuments: docs
            };
          }
          return result;
        }
        _chainType() {
          return "vector_db_qa";
        }
        static async deserialize(data, values) {
          if (!("vectorstore" in values)) {
            throw new Error(`Need to pass in a vectorstore to deserialize VectorDBQAChain`);
          }
          const { vectorstore } = values;
          if (!data.combine_documents_chain) {
            throw new Error(`VectorDBQAChain must have combine_documents_chain in serialized data`);
          }
          return new VectorDBQAChain({
            combineDocumentsChain: await BaseChain.deserialize(data.combine_documents_chain),
            k: data.k,
            vectorstore
          });
        }
        serialize() {
          return {
            _type: this._chainType(),
            combine_documents_chain: this.combineDocumentsChain.serialize(),
            k: this.k
          };
        }
        static fromLLM(llm, vectorstore, options) {
          const qaChain = loadQAStuffChain(llm);
          return new this({
            vectorstore,
            combineDocumentsChain: qaChain,
            ...options
          });
        }
      };
    }
  });

  // node_modules/langchain/dist/chains/api/prompts.js
  var API_URL_RAW_PROMPT_TEMPLATE, API_URL_PROMPT_TEMPLATE, API_RESPONSE_RAW_PROMPT_TEMPLATE, API_RESPONSE_PROMPT_TEMPLATE;
  var init_prompts2 = __esm({
    "node_modules/langchain/dist/chains/api/prompts.js"() {
      init_prompt();
      API_URL_RAW_PROMPT_TEMPLATE = `You are given the below API Documentation:
{api_docs}
Using this documentation, generate the full API url to call for answering the user question.
You should build the API url in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.

Question:{question}
API url:`;
      API_URL_PROMPT_TEMPLATE = /* @__PURE__ */ new PromptTemplate({
        inputVariables: ["api_docs", "question"],
        template: API_URL_RAW_PROMPT_TEMPLATE
      });
      API_RESPONSE_RAW_PROMPT_TEMPLATE = `${API_URL_RAW_PROMPT_TEMPLATE} {api_url}

Here is the response from the API:

{api_response}

Summarize this response to answer the original question.

Summary:`;
      API_RESPONSE_PROMPT_TEMPLATE = /* @__PURE__ */ new PromptTemplate({
        inputVariables: ["api_docs", "question", "api_url", "api_response"],
        template: API_RESPONSE_RAW_PROMPT_TEMPLATE
      });
    }
  });

  // node_modules/langchain/dist/chains/api/api_chain.js
  var api_chain_exports = {};
  __export(api_chain_exports, {
    APIChain: () => APIChain
  });
  var APIChain;
  var init_api_chain = __esm({
    "node_modules/langchain/dist/chains/api/api_chain.js"() {
      init_base5();
      init_llm_chain();
      init_prompts2();
      APIChain = class extends BaseChain {
        get inputKeys() {
          return [this.inputKey];
        }
        get outputKeys() {
          return [this.outputKey];
        }
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "apiAnswerChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "apiRequestChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "apiDocs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
          });
          Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "question"
          });
          Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
          });
          this.apiRequestChain = fields.apiRequestChain;
          this.apiAnswerChain = fields.apiAnswerChain;
          this.apiDocs = fields.apiDocs;
          this.inputKey = fields.inputKey ?? this.inputKey;
          this.outputKey = fields.outputKey ?? this.outputKey;
          this.headers = fields.headers ?? this.headers;
        }
        async _call(values, runManager) {
          const question = values[this.inputKey];
          const api_url = await this.apiRequestChain.predict({ question, api_docs: this.apiDocs }, runManager?.getChild("request"));
          const res = await fetch(api_url, { headers: this.headers });
          const api_response = await res.text();
          const answer = await this.apiAnswerChain.predict({ question, api_docs: this.apiDocs, api_url, api_response }, runManager?.getChild("response"));
          return { [this.outputKey]: answer };
        }
        _chainType() {
          return "api_chain";
        }
        static async deserialize(data) {
          const { api_request_chain, api_answer_chain, api_docs } = data;
          if (!api_request_chain) {
            throw new Error("LLMChain must have api_request_chain");
          }
          if (!api_answer_chain) {
            throw new Error("LLMChain must have api_answer_chain");
          }
          if (!api_docs) {
            throw new Error("LLMChain must have api_docs");
          }
          return new APIChain({
            apiAnswerChain: await LLMChain.deserialize(api_answer_chain),
            apiRequestChain: await LLMChain.deserialize(api_request_chain),
            apiDocs: api_docs
          });
        }
        serialize() {
          return {
            _type: this._chainType(),
            api_answer_chain: this.apiAnswerChain.serialize(),
            api_request_chain: this.apiRequestChain.serialize(),
            api_docs: this.apiDocs
          };
        }
        static fromLLMAndAPIDocs(llm, apiDocs, options = {}) {
          const { apiUrlPrompt = API_URL_PROMPT_TEMPLATE, apiResponsePrompt = API_RESPONSE_PROMPT_TEMPLATE } = options;
          const apiRequestChain = new LLMChain({ prompt: apiUrlPrompt, llm });
          const apiAnswerChain = new LLMChain({ prompt: apiResponsePrompt, llm });
          return new this({
            apiAnswerChain,
            apiRequestChain,
            apiDocs,
            ...options
          });
        }
      };
    }
  });

  // node_modules/langchain/dist/chains/base.js
  var BaseChain;
  var init_base5 = __esm({
    "node_modules/langchain/dist/chains/base.js"() {
      init_schema();
      init_manager();
      init_base_language();
      BaseChain = class extends BaseLangChain {
        get lc_namespace() {
          return ["langchain", "chains", this._chainType()];
        }
        constructor(fields, verbose, callbacks) {
          if (arguments.length === 1 && typeof fields === "object" && !("saveContext" in fields)) {
            const { memory, callbackManager, ...rest } = fields;
            super({ ...rest, callbacks: callbackManager ?? rest.callbacks });
            this.memory = memory;
          } else {
            super({ verbose, callbacks });
            this.memory = fields;
          }
        }
        _selectMemoryInputs(values) {
          const valuesForMemory = { ...values };
          if ("signal" in valuesForMemory) {
            delete valuesForMemory.signal;
          }
          if ("timeout" in valuesForMemory) {
            delete valuesForMemory.timeout;
          }
          return valuesForMemory;
        }
        serialize() {
          throw new Error("Method not implemented.");
        }
        async run(input, config) {
          const inputKeys = this.inputKeys.filter((k2) => !this.memory?.memoryKeys.includes(k2));
          const isKeylessInput = inputKeys.length <= 1;
          if (!isKeylessInput) {
            throw new Error(`Chain ${this._chainType()} expects multiple inputs, cannot use 'run' `);
          }
          const values = inputKeys.length ? { [inputKeys[0]]: input } : {};
          const returnValues = await this.call(values, config);
          const keys = Object.keys(returnValues);
          if (keys.length === 1) {
            return returnValues[keys[0]];
          }
          throw new Error("return values have multiple keys, `run` only supported when one key currently");
        }
        async call(values, config, tags) {
          const fullValues = { ...values };
          if (fullValues.timeout && !fullValues.signal) {
            fullValues.signal = AbortSignal.timeout(fullValues.timeout);
            delete fullValues.timeout;
          }
          if (!(this.memory == null)) {
            const newValues = await this.memory.loadMemoryVariables(this._selectMemoryInputs(values));
            for (const [key, value] of Object.entries(newValues)) {
              fullValues[key] = value;
            }
          }
          const parsedConfig = parseCallbackConfigArg(config);
          const callbackManager_ = await CallbackManager.configure(parsedConfig.callbacks, this.callbacks, parsedConfig.tags || tags, this.tags, parsedConfig.metadata, this.metadata, { verbose: this.verbose });
          const runManager = await callbackManager_?.handleChainStart(this.toJSON(), fullValues);
          let outputValues;
          try {
            outputValues = await (values.signal ? Promise.race([
              this._call(fullValues, runManager),
              new Promise((_2, reject) => {
                values.signal?.addEventListener("abort", () => {
                  reject(new Error("AbortError"));
                });
              })
            ]) : this._call(fullValues, runManager));
          } catch (e4) {
            await runManager?.handleChainError(e4);
            throw e4;
          }
          if (!(this.memory == null)) {
            await this.memory.saveContext(this._selectMemoryInputs(values), outputValues);
          }
          await runManager?.handleChainEnd(outputValues);
          Object.defineProperty(outputValues, RUN_KEY, {
            value: runManager ? { runId: runManager?.runId } : void 0,
            configurable: true
          });
          return outputValues;
        }
        async apply(inputs, config) {
          return Promise.all(inputs.map(async (i3, idx) => this.call(i3, config?.[idx])));
        }
        static async deserialize(data, values = {}) {
          switch (data._type) {
            case "llm_chain": {
              const { LLMChain: LLMChain2 } = await Promise.resolve().then(() => (init_llm_chain(), llm_chain_exports));
              return LLMChain2.deserialize(data);
            }
            case "sequential_chain": {
              const { SequentialChain: SequentialChain2 } = await Promise.resolve().then(() => (init_sequential_chain(), sequential_chain_exports));
              return SequentialChain2.deserialize(data);
            }
            case "simple_sequential_chain": {
              const { SimpleSequentialChain: SimpleSequentialChain2 } = await Promise.resolve().then(() => (init_sequential_chain(), sequential_chain_exports));
              return SimpleSequentialChain2.deserialize(data);
            }
            case "stuff_documents_chain": {
              const { StuffDocumentsChain: StuffDocumentsChain2 } = await Promise.resolve().then(() => (init_combine_docs_chain(), combine_docs_chain_exports));
              return StuffDocumentsChain2.deserialize(data);
            }
            case "map_reduce_documents_chain": {
              const { MapReduceDocumentsChain: MapReduceDocumentsChain2 } = await Promise.resolve().then(() => (init_combine_docs_chain(), combine_docs_chain_exports));
              return MapReduceDocumentsChain2.deserialize(data);
            }
            case "refine_documents_chain": {
              const { RefineDocumentsChain: RefineDocumentsChain2 } = await Promise.resolve().then(() => (init_combine_docs_chain(), combine_docs_chain_exports));
              return RefineDocumentsChain2.deserialize(data);
            }
            case "vector_db_qa": {
              const { VectorDBQAChain: VectorDBQAChain2 } = await Promise.resolve().then(() => (init_vector_db_qa(), vector_db_qa_exports));
              return VectorDBQAChain2.deserialize(data, values);
            }
            case "api_chain": {
              const { APIChain: APIChain2 } = await Promise.resolve().then(() => (init_api_chain(), api_chain_exports));
              return APIChain2.deserialize(data);
            }
            default:
              throw new Error(`Invalid prompt type in config: ${data._type}`);
          }
        }
      };
    }
  });

  // node_modules/langchain/dist/schema/output_parser.js
  var BaseLLMOutputParser, BaseOutputParser, OutputParserException;
  var init_output_parser = __esm({
    "node_modules/langchain/dist/schema/output_parser.js"() {
      init_serializable();
      BaseLLMOutputParser = class extends Serializable {
        parseResultWithPrompt(generations, _prompt, callbacks) {
          return this.parseResult(generations, callbacks);
        }
      };
      BaseOutputParser = class extends BaseLLMOutputParser {
        parseResult(generations, callbacks) {
          return this.parse(generations[0].text, callbacks);
        }
        async parseWithPrompt(text, _prompt, callbacks) {
          return this.parse(text, callbacks);
        }
        _type() {
          throw new Error("_type not implemented");
        }
      };
      OutputParserException = class extends Error {
        constructor(message, output) {
          super(message);
          Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.output = output;
        }
      };
    }
  });

  // node_modules/langchain/dist/output_parsers/noop.js
  var NoOpOutputParser;
  var init_noop = __esm({
    "node_modules/langchain/dist/output_parsers/noop.js"() {
      init_output_parser();
      NoOpOutputParser = class extends BaseOutputParser {
        constructor() {
          super(...arguments);
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "output_parsers", "default"]
          });
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
        }
        parse(text) {
          return Promise.resolve(text);
        }
        getFormatInstructions() {
          return "";
        }
      };
    }
  });

  // node_modules/langchain/dist/chains/llm_chain.js
  var llm_chain_exports = {};
  __export(llm_chain_exports, {
    LLMChain: () => LLMChain
  });
  var LLMChain;
  var init_llm_chain = __esm({
    "node_modules/langchain/dist/chains/llm_chain.js"() {
      init_base5();
      init_base4();
      init_base_language();
      init_noop();
      LLMChain = class extends BaseChain {
        get inputKeys() {
          return this.prompt.inputVariables;
        }
        get outputKeys() {
          return [this.outputKey];
        }
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
          });
          Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "llmKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text"
          });
          Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.prompt = fields.prompt;
          this.llm = fields.llm;
          this.llmKwargs = fields.llmKwargs;
          this.outputKey = fields.outputKey ?? this.outputKey;
          this.outputParser = fields.outputParser ?? new NoOpOutputParser();
          if (this.prompt.outputParser) {
            if (fields.outputParser) {
              throw new Error("Cannot set both outputParser and prompt.outputParser");
            }
            this.outputParser = this.prompt.outputParser;
          }
        }
        _selectMemoryInputs(values) {
          const valuesForMemory = super._selectMemoryInputs(values);
          for (const key of this.llm.callKeys) {
            if (key in values) {
              delete valuesForMemory[key];
            }
          }
          return valuesForMemory;
        }
        async _getFinalOutput(generations, promptValue, runManager) {
          let finalCompletion;
          if (this.outputParser) {
            finalCompletion = await this.outputParser.parseResultWithPrompt(generations, promptValue, runManager?.getChild());
          } else {
            finalCompletion = generations[0].text;
          }
          return finalCompletion;
        }
        call(values, callbacks) {
          return super.call(values, callbacks);
        }
        async _call(values, runManager) {
          const valuesForPrompt = { ...values };
          const valuesForLLM = {
            ...this.llmKwargs
          };
          for (const key of this.llm.callKeys) {
            if (key in values) {
              valuesForLLM[key] = values[key];
              delete valuesForPrompt[key];
            }
          }
          const promptValue = await this.prompt.formatPromptValue(valuesForPrompt);
          const { generations } = await this.llm.generatePrompt([promptValue], valuesForLLM, runManager?.getChild());
          return {
            [this.outputKey]: await this._getFinalOutput(generations[0], promptValue, runManager)
          };
        }
        async predict(values, callbackManager) {
          const output = await this.call(values, callbackManager);
          return output[this.outputKey];
        }
        _chainType() {
          return "llm";
        }
        static async deserialize(data) {
          const { llm, prompt } = data;
          if (!llm) {
            throw new Error("LLMChain must have llm");
          }
          if (!prompt) {
            throw new Error("LLMChain must have prompt");
          }
          return new LLMChain({
            llm: await BaseLanguageModel.deserialize(llm),
            prompt: await BasePromptTemplate.deserialize(prompt)
          });
        }
        serialize() {
          return {
            _type: `${this._chainType()}_chain`,
            llm: this.llm.serialize(),
            prompt: this.prompt.serialize()
          };
        }
      };
    }
  });

  // node_modules/langchain/dist/agents/helpers.js
  var deserializeHelper;
  var init_helpers = __esm({
    "node_modules/langchain/dist/agents/helpers.js"() {
      init_llm_chain();
      deserializeHelper = async (llm, tools, data, fromLLMAndTools, fromConstructor) => {
        if (data.load_from_llm_and_tools) {
          if (!llm) {
            throw new Error("Loading from llm and tools, llm must be provided.");
          }
          if (!tools) {
            throw new Error("Loading from llm and tools, tools must be provided.");
          }
          return fromLLMAndTools(llm, tools, data);
        }
        if (!data.llm_chain) {
          throw new Error("Loading from constructor, llm_chain must be provided.");
        }
        const llmChain = await LLMChain.deserialize(data.llm_chain);
        return fromConstructor({ ...data, llmChain });
      };
    }
  });

  // node_modules/langchain/dist/agents/types.js
  var AgentActionOutputParser;
  var init_types = __esm({
    "node_modules/langchain/dist/agents/types.js"() {
      init_output_parser();
      AgentActionOutputParser = class extends BaseOutputParser {
      };
    }
  });

  // node_modules/langchain/dist/agents/mrkl/prompt.js
  var PREFIX, FORMAT_INSTRUCTIONS, SUFFIX;
  var init_prompt2 = __esm({
    "node_modules/langchain/dist/agents/mrkl/prompt.js"() {
      PREFIX = `Answer the following questions as best you can. You have access to the following tools:`;
      FORMAT_INSTRUCTIONS = `Use the following format in your response:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question`;
      SUFFIX = `Begin!

Question: {input}
Thought:{agent_scratchpad}`;
    }
  });

  // node_modules/langchain/dist/agents/mrkl/outputParser.js
  var FINAL_ANSWER_ACTION, ZeroShotAgentOutputParser;
  var init_outputParser = __esm({
    "node_modules/langchain/dist/agents/mrkl/outputParser.js"() {
      init_types();
      init_prompt2();
      FINAL_ANSWER_ACTION = "Final Answer:";
      ZeroShotAgentOutputParser = class extends AgentActionOutputParser {
        constructor(fields) {
          super(fields);
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "mrkl"]
          });
          Object.defineProperty(this, "finishToolName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.finishToolName = fields?.finishToolName || FINAL_ANSWER_ACTION;
        }
        async parse(text) {
          if (text.includes(this.finishToolName)) {
            const parts = text.split(this.finishToolName);
            const output = parts[parts.length - 1].trim();
            return {
              returnValues: { output },
              log: text
            };
          }
          const match = /Action: ([\s\S]*?)(?:\nAction Input: ([\s\S]*?))?$/.exec(text);
          if (!match) {
            throw new Error(`Could not parse LLM output: ${text}`);
          }
          return {
            tool: match[1].trim(),
            toolInput: match[2] ? match[2].trim().replace(/^("+)(.*?)(\1)$/, "$2") : "",
            log: text
          };
        }
        getFormatInstructions() {
          return FORMAT_INSTRUCTIONS;
        }
      };
    }
  });

  // node_modules/langchain/dist/agents/mrkl/index.js
  var mrkl_exports = {};
  __export(mrkl_exports, {
    ZeroShotAgent: () => ZeroShotAgent
  });
  var ZeroShotAgent;
  var init_mrkl = __esm({
    "node_modules/langchain/dist/agents/mrkl/index.js"() {
      init_llm_chain();
      init_prompt();
      init_template();
      init_agent();
      init_helpers();
      init_outputParser();
      init_prompt2();
      ZeroShotAgent = class extends Agent {
        constructor(input) {
          const outputParser = input?.outputParser ?? ZeroShotAgent.getDefaultOutputParser();
          super({ ...input, outputParser });
          Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "mrkl"]
          });
        }
        _agentType() {
          return "zero-shot-react-description";
        }
        observationPrefix() {
          return "Observation: ";
        }
        llmPrefix() {
          return "Thought:";
        }
        static getDefaultOutputParser(fields) {
          return new ZeroShotAgentOutputParser(fields);
        }
        static validateTools(tools) {
          const descriptionlessTool = tools.find((tool) => !tool.description);
          if (descriptionlessTool) {
            const msg = `Got a tool ${descriptionlessTool.name} without a description. This agent requires descriptions for all tools.`;
            throw new Error(msg);
          }
        }
        static createPrompt(tools, args) {
          const { prefix = PREFIX, suffix = SUFFIX, inputVariables = ["input", "agent_scratchpad"] } = args ?? {};
          const toolStrings = tools.map((tool) => `${tool.name}: ${tool.description}`).join("\n");
          const toolNames = tools.map((tool) => tool.name);
          const formatInstructions = renderTemplate(FORMAT_INSTRUCTIONS, "f-string", {
            tool_names: toolNames
          });
          const template = [prefix, toolStrings, formatInstructions, suffix].join("\n\n");
          return new PromptTemplate({
            template,
            inputVariables
          });
        }
        static fromLLMAndTools(llm, tools, args) {
          ZeroShotAgent.validateTools(tools);
          const prompt = ZeroShotAgent.createPrompt(tools, args);
          const outputParser = args?.outputParser ?? ZeroShotAgent.getDefaultOutputParser();
          const chain = new LLMChain({
            prompt,
            llm,
            callbacks: args?.callbacks ?? args?.callbackManager
          });
          return new ZeroShotAgent({
            llmChain: chain,
            allowedTools: tools.map((t3) => t3.name),
            outputParser
          });
        }
        static async deserialize(data) {
          const { llm, tools, ...rest } = data;
          return deserializeHelper(llm, tools, rest, (llm2, tools2, args) => ZeroShotAgent.fromLLMAndTools(llm2, tools2, {
            prefix: args.prefix,
            suffix: args.suffix,
            inputVariables: args.input_variables
          }), (args) => new ZeroShotAgent(args));
        }
      };
    }
  });

  // node_modules/langchain/dist/agents/agent.js
  var ParseError, BaseAgent, BaseSingleActionAgent, Agent;
  var init_agent = __esm({
    "node_modules/langchain/dist/agents/agent.js"() {
      init_serializable();
      ParseError = class extends Error {
        constructor(msg, output) {
          super(msg);
          Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.output = output;
        }
      };
      BaseAgent = class extends Serializable {
        get returnValues() {
          return ["output"];
        }
        get allowedTools() {
          return void 0;
        }
        _agentType() {
          throw new Error("Not implemented");
        }
        returnStoppedResponse(earlyStoppingMethod, _steps, _inputs, _callbackManager) {
          if (earlyStoppingMethod === "force") {
            return Promise.resolve({
              returnValues: { output: "Agent stopped due to max iterations." },
              log: ""
            });
          }
          throw new Error(`Invalid stopping method: ${earlyStoppingMethod}`);
        }
        async prepareForOutput(_returnValues, _steps) {
          return {};
        }
      };
      BaseSingleActionAgent = class extends BaseAgent {
        _agentActionType() {
          return "single";
        }
      };
      Agent = class extends BaseSingleActionAgent {
        get allowedTools() {
          return this._allowedTools;
        }
        get inputKeys() {
          return this.llmChain.inputKeys.filter((k2) => k2 !== "agent_scratchpad");
        }
        constructor(input) {
          super(input);
          Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "_allowedTools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.llmChain = input.llmChain;
          this._allowedTools = input.allowedTools;
          this.outputParser = input.outputParser;
        }
        static getDefaultOutputParser(_fields) {
          throw new Error("Not implemented");
        }
        static createPrompt(_tools, _fields) {
          throw new Error("Not implemented");
        }
        static fromLLMAndTools(_llm, _tools, _args) {
          throw new Error("Not implemented");
        }
        static validateTools(_tools) {
        }
        _stop() {
          return [`
${this.observationPrefix()}`];
        }
        finishToolName() {
          return "Final Answer";
        }
        async constructScratchPad(steps) {
          return steps.reduce((thoughts, { action, observation }) => thoughts + [
            action.log,
            `${this.observationPrefix()}${observation}`,
            this.llmPrefix()
          ].join("\n"), "");
        }
        async _plan(steps, inputs, suffix, callbackManager) {
          const thoughts = await this.constructScratchPad(steps);
          const newInputs = {
            ...inputs,
            agent_scratchpad: suffix ? `${thoughts}${suffix}` : thoughts
          };
          if (this._stop().length !== 0) {
            newInputs.stop = this._stop();
          }
          const output = await this.llmChain.predict(newInputs, callbackManager);
          if (!this.outputParser) {
            throw new Error("Output parser not set");
          }
          return this.outputParser.parse(output, callbackManager);
        }
        plan(steps, inputs, callbackManager) {
          return this._plan(steps, inputs, void 0, callbackManager);
        }
        async returnStoppedResponse(earlyStoppingMethod, steps, inputs, callbackManager) {
          if (earlyStoppingMethod === "force") {
            return {
              returnValues: { output: "Agent stopped due to max iterations." },
              log: ""
            };
          }
          if (earlyStoppingMethod === "generate") {
            try {
              const action = await this._plan(steps, inputs, "\n\nI now need to return a final answer based on the previous steps:", callbackManager);
              if ("returnValues" in action) {
                return action;
              }
              return { returnValues: { output: action.log }, log: action.log };
            } catch (err) {
              if (!(err instanceof ParseError)) {
                throw err;
              }
              return { returnValues: { output: err.output }, log: err.output };
            }
          }
          throw new Error(`Invalid stopping method: ${earlyStoppingMethod}`);
        }
        static async deserialize(data) {
          switch (data._type) {
            case "zero-shot-react-description": {
              const { ZeroShotAgent: ZeroShotAgent3 } = await Promise.resolve().then(() => (init_mrkl(), mrkl_exports));
              return ZeroShotAgent3.deserialize(data);
            }
            default:
              throw new Error("Unknown agent type");
          }
        }
      };
    }
  });

  // node_modules/jsonpointer/jsonpointer.js
  var require_jsonpointer = __commonJS({
    "node_modules/jsonpointer/jsonpointer.js"(exports) {
      var hasExcape = /~/;
      var escapeMatcher = /~[01]/g;
      function escapeReplacer(m2) {
        switch (m2) {
          case "~1":
            return "/";
          case "~0":
            return "~";
        }
        throw new Error("Invalid tilde escape: " + m2);
      }
      function untilde(str) {
        if (!hasExcape.test(str))
          return str;
        return str.replace(escapeMatcher, escapeReplacer);
      }
      function setter(obj, pointer, value) {
        var part;
        var hasNextPart;
        for (var p2 = 1, len = pointer.length; p2 < len; ) {
          if (pointer[p2] === "constructor" || pointer[p2] === "prototype" || pointer[p2] === "__proto__")
            return obj;
          part = untilde(pointer[p2++]);
          hasNextPart = len > p2;
          if (typeof obj[part] === "undefined") {
            if (Array.isArray(obj) && part === "-") {
              part = obj.length;
            }
            if (hasNextPart) {
              if (pointer[p2] !== "" && pointer[p2] < Infinity || pointer[p2] === "-")
                obj[part] = [];
              else
                obj[part] = {};
            }
          }
          if (!hasNextPart)
            break;
          obj = obj[part];
        }
        var oldValue = obj[part];
        if (value === void 0)
          delete obj[part];
        else
          obj[part] = value;
        return oldValue;
      }
      function compilePointer(pointer) {
        if (typeof pointer === "string") {
          pointer = pointer.split("/");
          if (pointer[0] === "")
            return pointer;
          throw new Error("Invalid JSON pointer.");
        } else if (Array.isArray(pointer)) {
          for (const part of pointer) {
            if (typeof part !== "string" && typeof part !== "number") {
              throw new Error("Invalid JSON pointer. Must be of type string or number.");
            }
          }
          return pointer;
        }
        throw new Error("Invalid JSON pointer.");
      }
      function get(obj, pointer) {
        if (typeof obj !== "object")
          throw new Error("Invalid input object.");
        pointer = compilePointer(pointer);
        var len = pointer.length;
        if (len === 1)
          return obj;
        for (var p2 = 1; p2 < len; ) {
          obj = obj[untilde(pointer[p2++])];
          if (len === p2)
            return obj;
          if (typeof obj !== "object" || obj === null)
            return void 0;
        }
      }
      function set(obj, pointer, value) {
        if (typeof obj !== "object")
          throw new Error("Invalid input object.");
        pointer = compilePointer(pointer);
        if (pointer.length === 0)
          throw new Error("Invalid JSON pointer for set.");
        return setter(obj, pointer, value);
      }
      function compile(pointer) {
        var compiled = compilePointer(pointer);
        return {
          get: function(object) {
            return get(object, compiled);
          },
          set: function(object, value) {
            return set(object, compiled, value);
          }
        };
      }
      exports.get = get;
      exports.set = set;
      exports.compile = compile;
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
      super(), this._$Ei = new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
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
    _$Eu() {
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
  u[d] = true, u.elementProperties = new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, o2 == null || o2({ ReactiveElement: u }), ((s2 = e2.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : e2.reactiveElementVersions = []).push("1.6.3");

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
  var u2 = () => r3.createComment("");
  var d2 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
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
  function P(t3, i3) {
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return e3 !== void 0 ? e3.createHTML(i3) : i3;
  }
  var V = (t3, i3) => {
    const s5 = t3.length - 1, e4 = [];
    let l4, r4 = i3 === 2 ? "<svg>" : "", u3 = f;
    for (let i4 = 0; i4 < s5; i4++) {
      const s6 = t3[i4];
      let d3, c3, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u3.lastIndex = a3, c3 = u3.exec(s6), c3 !== null); )
        a3 = u3.lastIndex, u3 === f ? c3[1] === "!--" ? u3 = _ : c3[1] !== void 0 ? u3 = m : c3[2] !== void 0 ? (y.test(c3[2]) && (l4 = RegExp("</" + c3[2], "g")), u3 = p) : c3[3] !== void 0 && (u3 = p) : u3 === p ? c3[0] === ">" ? (u3 = l4 != null ? l4 : f, v2 = -1) : c3[1] === void 0 ? v2 = -2 : (v2 = u3.lastIndex - c3[2].length, d3 = c3[1], u3 = c3[3] === void 0 ? p : c3[3] === '"' ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l4 = void 0);
      const w2 = u3 === p && t3[i4 + 1].startsWith("/>") ? " " : "";
      r4 += u3 === f ? s6 + h2 : v2 >= 0 ? (e4.push(d3), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (v2 === -2 ? (e4.push(void 0), i4) : w2);
    }
    return [P(t3, r4 + (t3[s5] || "<?>") + (i3 === 2 ? "</svg>" : "")), e4];
  };
  var N = class {
    constructor({ strings: t3, _$litType$: i3 }, e4) {
      let h3;
      this.parts = [];
      let r4 = 0, d3 = 0;
      const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = V(t3, i3);
      if (this.el = N.createElement(a3, e4), C.currentNode = this.el.content, i3 === 2) {
        const t4 = this.el.content, i4 = t4.firstChild;
        i4.remove(), t4.append(...i4.childNodes);
      }
      for (; (h3 = C.nextNode()) !== null && v2.length < c3; ) {
        if (h3.nodeType === 1) {
          if (h3.hasAttributes()) {
            const t4 = [];
            for (const i4 of h3.getAttributeNames())
              if (i4.endsWith(o3) || i4.startsWith(n3)) {
                const s5 = f2[d3++];
                if (t4.push(i4), s5 !== void 0) {
                  const t5 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i5 = /([.?@])?(.*)/.exec(s5);
                  v2.push({ type: 1, index: r4, name: i5[2], strings: t5, ctor: i5[1] === "." ? H : i5[1] === "?" ? L : i5[1] === "@" ? z : k });
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
                h3.append(t4[s5], u2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
              h3.append(t4[i4], u2());
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
  function S2(t3, i3, s5 = t3, e4) {
    var o5, n5, l4, h3;
    if (i3 === T)
      return i3;
    let r4 = e4 !== void 0 ? (o5 = s5._$Co) === null || o5 === void 0 ? void 0 : o5[e4] : s5._$Cl;
    const u3 = d2(i3) ? void 0 : i3._$litDirective$;
    return (r4 == null ? void 0 : r4.constructor) !== u3 && ((n5 = r4 == null ? void 0 : r4._$AO) === null || n5 === void 0 || n5.call(r4, false), u3 === void 0 ? r4 = void 0 : (r4 = new u3(t3), r4._$AT(t3, s5, e4)), e4 !== void 0 ? ((l4 = (h3 = s5)._$Co) !== null && l4 !== void 0 ? l4 : h3._$Co = [])[e4] = r4 : s5._$Cl = r4), r4 !== void 0 && (i3 = S2(t3, r4._$AS(t3, i3.values), r4, e4)), i3;
  }
  var M = class {
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
      let n5 = C.nextNode(), l4 = 0, h3 = 0, u3 = e4[0];
      for (; u3 !== void 0; ) {
        if (l4 === u3.index) {
          let i4;
          u3.type === 2 ? i4 = new R(n5, n5.nextSibling, this, t3) : u3.type === 1 ? i4 = new u3.ctor(n5, u3.name, u3.strings, this, t3) : u3.type === 6 && (i4 = new Z(n5, this, t3)), this._$AV.push(i4), u3 = e4[++h3];
        }
        l4 !== (u3 == null ? void 0 : u3.index) && (n5 = C.nextNode(), l4++);
      }
      return C.currentNode = r3, o5;
    }
    v(t3) {
      let i3 = 0;
      for (const s5 of this._$AV)
        s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
    }
  };
  var R = class {
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
      t3 = S2(this, t3, i3), d2(t3) ? t3 === A || t3 == null || t3 === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : t3._$litType$ !== void 0 ? this.g(t3) : t3.nodeType !== void 0 ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
    }
    k(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    $(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
    }
    _(t3) {
      this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
    }
    g(t3) {
      var i3;
      const { values: s5, _$litType$: e4 } = t3, o5 = typeof e4 == "number" ? this._$AC(t3) : (e4.el === void 0 && (e4.el = N.createElement(P(e4.h, e4.h[0]), this.options)), e4);
      if (((i3 = this._$AH) === null || i3 === void 0 ? void 0 : i3._$AD) === o5)
        this._$AH.v(s5);
      else {
        const t4 = new M(o5, this), i4 = t4.u(this.options);
        t4.v(s5), this.$(i4), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i3 = E.get(t3.strings);
      return i3 === void 0 && E.set(t3.strings, i3 = new N(t3)), i3;
    }
    T(t3) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i3 = this._$AH;
      let s5, e4 = 0;
      for (const o5 of t3)
        e4 === i3.length ? i3.push(s5 = new R(this.k(u2()), this.k(u2()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
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
  var k = class {
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
        t3 = S2(this, t3, i3, 0), n5 = !d2(t3) || t3 !== this._$AH && t3 !== T, n5 && (this._$AH = t3);
      else {
        const e5 = t3;
        let l4, h3;
        for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
          h3 = S2(this, e5[s5 + l4], i3, l4), h3 === T && (h3 = this._$AH[l4]), n5 || (n5 = !d2(h3) || h3 !== this._$AH[l4]), h3 === A ? t3 = A : t3 !== A && (t3 += (h3 != null ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
      }
      n5 && !e4 && this.j(t3);
    }
    j(t3) {
      t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === A ? void 0 : t3;
    }
  };
  var I = s3 ? s3.emptyScript : "";
  var L = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      t3 && t3 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
    }
  };
  var z = class extends k {
    constructor(t3, i3, s5, e4, o5) {
      super(t3, i3, s5, e4, o5), this.type = 5;
    }
    _$AI(t3, i3 = this) {
      var s5;
      if ((t3 = (s5 = S2(this, t3, i3, 0)) !== null && s5 !== void 0 ? s5 : A) === T)
        return;
      const e4 = this._$AH, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== A && (e4 === A || o5);
      o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var i3, s5;
      typeof this._$AH == "function" ? this._$AH.call((s5 = (i3 = this.options) === null || i3 === void 0 ? void 0 : i3.host) !== null && s5 !== void 0 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var Z = class {
    constructor(t3, i3, s5) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      S2(this, t3);
    }
  };
  var B = i2.litHtmlPolyfillSupport;
  B == null || B(N, R), ((t2 = i2.litHtmlVersions) !== null && t2 !== void 0 ? t2 : i2.litHtmlVersions = []).push("2.8.0");
  var D = (t3, i3, s5) => {
    var e4, o5;
    const n5 = (e4 = s5 == null ? void 0 : s5.renderBefore) !== null && e4 !== void 0 ? e4 : i3;
    let l4 = n5._$litPart$;
    if (l4 === void 0) {
      const t4 = (o5 = s5 == null ? void 0 : s5.renderBefore) !== null && o5 !== void 0 ? o5 : null;
      n5._$litPart$ = l4 = new R(i3.insertBefore(u2(), t4), t4, void 0, s5 != null ? s5 : {});
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
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(i3, this.renderRoot, this.renderOptions);
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
  ((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.3.3");

  // node_modules/langchain/dist/agents/index.js
  init_agent();

  // node_modules/langchain/dist/tools/json.js
  var import_jsonpointer = __toModule(require_jsonpointer());

  // node_modules/langchain/dist/tools/base.js
  init_manager();
  init_base_language();

  // node_modules/langchain/dist/tools/json.js
  init_serializable();

  // node_modules/langchain/dist/agents/toolkits/json/json.js
  init_llm_chain();
  init_mrkl();

  // node_modules/langchain/dist/agents/executor.js
  init_base5();
  var AgentExecutor = class extends BaseChain {
    get lc_namespace() {
      return ["langchain", "agents", "executor"];
    }
    get inputKeys() {
      return this.agent.inputKeys;
    }
    get outputKeys() {
      return this.agent.returnValues;
    }
    constructor(input) {
      super(input);
      Object.defineProperty(this, "agent", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "tools", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "returnIntermediateSteps", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "maxIterations", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 15
      });
      Object.defineProperty(this, "earlyStoppingMethod", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "force"
      });
      this.agent = input.agent;
      this.tools = input.tools;
      if (this.agent._agentActionType() === "multi") {
        for (const tool of this.tools) {
          if (tool.returnDirect) {
            throw new Error(`Tool with return direct ${tool.name} not supported for multi-action agent.`);
          }
        }
      }
      this.returnIntermediateSteps = input.returnIntermediateSteps ?? this.returnIntermediateSteps;
      this.maxIterations = input.maxIterations ?? this.maxIterations;
      this.earlyStoppingMethod = input.earlyStoppingMethod ?? this.earlyStoppingMethod;
    }
    static fromAgentAndTools(fields) {
      return new AgentExecutor(fields);
    }
    shouldContinue(iterations) {
      return this.maxIterations === void 0 || iterations < this.maxIterations;
    }
    async _call(inputs, runManager) {
      const toolsByName = Object.fromEntries(this.tools.map((t3) => [t3.name.toLowerCase(), t3]));
      const steps = [];
      let iterations = 0;
      const getOutput = async (finishStep) => {
        const { returnValues } = finishStep;
        const additional = await this.agent.prepareForOutput(returnValues, steps);
        if (this.returnIntermediateSteps) {
          return { ...returnValues, intermediateSteps: steps, ...additional };
        }
        await runManager?.handleAgentEnd(finishStep);
        return { ...returnValues, ...additional };
      };
      while (this.shouldContinue(iterations)) {
        const output = await this.agent.plan(steps, inputs, runManager?.getChild());
        if ("returnValues" in output) {
          return getOutput(output);
        }
        let actions;
        if (Array.isArray(output)) {
          actions = output;
        } else {
          actions = [output];
        }
        const newSteps = await Promise.all(actions.map(async (action) => {
          await runManager?.handleAgentAction(action);
          const tool = toolsByName[action.tool?.toLowerCase()];
          const observation = tool ? await tool.call(action.toolInput, runManager?.getChild()) : `${action.tool} is not a valid tool, try another one.`;
          return { action, observation };
        }));
        steps.push(...newSteps);
        const lastStep = steps[steps.length - 1];
        const lastTool = toolsByName[lastStep.action.tool?.toLowerCase()];
        if (lastTool?.returnDirect) {
          return getOutput({
            returnValues: { [this.agent.returnValues[0]]: lastStep.observation },
            log: ""
          });
        }
        iterations += 1;
      }
      const finish = await this.agent.returnStoppedResponse(this.earlyStoppingMethod, steps, inputs);
      return getOutput(finish);
    }
    _chainType() {
      return "agent_executor";
    }
    serialize() {
      throw new Error("Cannot serialize an AgentExecutor");
    }
  };

  // node_modules/langchain/dist/agents/toolkits/openapi/openapi.js
  init_llm_chain();
  init_mrkl();

  // node_modules/langchain/dist/tools/vectorstore.js
  init_vector_db_qa();

  // node_modules/langchain/dist/agents/toolkits/vectorstore/vectorstore.js
  init_mrkl();
  init_prompt2();
  init_llm_chain();

  // node_modules/langchain/dist/tools/zapier.js
  init_template();
  init_async_caller2();
  init_env2();
  init_serializable();

  // node_modules/langchain/dist/agents/chat/index.js
  init_llm_chain();
  init_chat();
  init_agent();

  // node_modules/langchain/dist/agents/chat/outputParser.js
  init_types();

  // node_modules/langchain/dist/agents/chat/prompt.js
  var PREFIX2 = `Answer the following questions as best you can. You have access to the following tools:`;
  var FORMAT_INSTRUCTIONS2 = `The way you use the tools is by specifying a json blob, denoted below by $JSON_BLOB
Specifically, this $JSON_BLOB should have a "action" key (with the name of the tool to use) and a "action_input" key (with the input to the tool going here). 
The $JSON_BLOB should only contain a SINGLE action, do NOT return a list of multiple actions. Here is an example of a valid $JSON_BLOB:

\`\`\`
{{
  "action": "calculator",
  "action_input": "1 + 2"
}}
\`\`\`

ALWAYS use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: 
\`\`\`
$JSON_BLOB
\`\`\`
Observation: the result of the action
... (this Thought/Action/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question`;
  var SUFFIX2 = `Begin! Reminder to always use the exact characters \`Final Answer\` when responding.`;

  // node_modules/langchain/dist/agents/chat/outputParser.js
  var FINAL_ANSWER_ACTION2 = "Final Answer:";
  var ChatAgentOutputParser = class extends AgentActionOutputParser {
    constructor() {
      super(...arguments);
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "chat"]
      });
    }
    async parse(text) {
      if (text.includes(FINAL_ANSWER_ACTION2) || !text.includes(`"action":`)) {
        const parts = text.split(FINAL_ANSWER_ACTION2);
        const output = parts[parts.length - 1].trim();
        return { returnValues: { output }, log: text };
      }
      const action = text.includes("```") ? text.trim().split(/```(?:json)?/)[1] : text.trim();
      try {
        const response = JSON.parse(action.trim());
        return {
          tool: response.action,
          toolInput: response.action_input,
          log: text
        };
      } catch {
        throw new Error(`Unable to parse JSON response from chat agent.

${text}`);
      }
    }
    getFormatInstructions() {
      return FORMAT_INSTRUCTIONS2;
    }
  };

  // node_modules/langchain/dist/agents/chat/index.js
  var DEFAULT_HUMAN_MESSAGE_TEMPLATE = "{input}\n\n{agent_scratchpad}";
  var ChatAgent = class extends Agent {
    constructor(input) {
      const outputParser = input?.outputParser ?? ChatAgent.getDefaultOutputParser();
      super({ ...input, outputParser });
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "chat"]
      });
    }
    _agentType() {
      return "chat-zero-shot-react-description";
    }
    observationPrefix() {
      return "Observation: ";
    }
    llmPrefix() {
      return "Thought:";
    }
    _stop() {
      return ["Observation:"];
    }
    static validateTools(tools) {
      const descriptionlessTool = tools.find((tool) => !tool.description);
      if (descriptionlessTool) {
        const msg = `Got a tool ${descriptionlessTool.name} without a description. This agent requires descriptions for all tools.`;
        throw new Error(msg);
      }
    }
    static getDefaultOutputParser(_fields) {
      return new ChatAgentOutputParser();
    }
    async constructScratchPad(steps) {
      const agentScratchpad = await super.constructScratchPad(steps);
      if (agentScratchpad) {
        return `This was your previous work (but I haven't seen any of it! I only see what you return as final answer):
${agentScratchpad}`;
      }
      return agentScratchpad;
    }
    static createPrompt(tools, args) {
      const { prefix = PREFIX2, suffix = SUFFIX2, humanMessageTemplate = DEFAULT_HUMAN_MESSAGE_TEMPLATE } = args ?? {};
      const toolStrings = tools.map((tool) => `${tool.name}: ${tool.description}`).join("\n");
      const template = [prefix, toolStrings, FORMAT_INSTRUCTIONS2, suffix].join("\n\n");
      const messages2 = [
        SystemMessagePromptTemplate.fromTemplate(template),
        HumanMessagePromptTemplate.fromTemplate(humanMessageTemplate)
      ];
      return ChatPromptTemplate.fromPromptMessages(messages2);
    }
    static fromLLMAndTools(llm, tools, args) {
      ChatAgent.validateTools(tools);
      const prompt = ChatAgent.createPrompt(tools, args);
      const chain = new LLMChain({
        prompt,
        llm,
        callbacks: args?.callbacks ?? args?.callbackManager
      });
      const outputParser = args?.outputParser ?? ChatAgent.getDefaultOutputParser();
      return new ChatAgent({
        llmChain: chain,
        outputParser,
        allowedTools: tools.map((t3) => t3.name)
      });
    }
  };

  // node_modules/langchain/dist/agents/chat_convo/index.js
  init_llm_chain();
  init_chat();
  init_template();
  init_schema();
  init_agent();

  // node_modules/langchain/dist/agents/chat_convo/outputParser.js
  init_output_parser();
  init_template();
  init_types();

  // node_modules/langchain/dist/agents/chat_convo/prompt.js
  var DEFAULT_PREFIX = `Assistant is a large language model trained by OpenAI.

Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.

Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.

Overall, Assistant is a powerful system that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.`;
  var PREFIX_END = ` However, above all else, all responses must adhere to the format of RESPONSE FORMAT INSTRUCTIONS.`;
  var FORMAT_INSTRUCTIONS3 = `RESPONSE FORMAT INSTRUCTIONS
----------------------------

Output a JSON markdown code snippet containing a valid JSON object in one of two formats:

**Option 1:**
Use this if you want the human to use a tool.
Markdown code snippet formatted in the following schema:

\`\`\`json
{{{{
    "action": string, // The action to take. Must be one of [{tool_names}]
    "action_input": string // The input to the action. May be a stringified object.
}}}}
\`\`\`

**Option #2:**
Use this if you want to respond directly and conversationally to the human. Markdown code snippet formatted in the following schema:

\`\`\`json
{{{{
    "action": "Final Answer",
    "action_input": string // You should put what you want to return to use here and make sure to use valid json newline characters.
}}}}
\`\`\`

For both options, remember to always include the surrounding markdown code snippet delimiters (begin with "\`\`\`json" and end with "\`\`\`")!
`;
  var DEFAULT_SUFFIX = `TOOLS
------
Assistant can ask the user to use tools to look up information that may be helpful in answering the users original question. The tools the human can use are:

{tools}

{format_instructions}

USER'S INPUT
--------------------
Here is the user's input (remember to respond with a markdown code snippet of a json blob with a single action, and NOTHING else):

{{input}}`;
  var TEMPLATE_TOOL_RESPONSE = `TOOL RESPONSE:
---------------------
{observation}

USER'S INPUT
--------------------

Okay, so what is the response to my last comment? If using information obtained from the tools you must mention it explicitly without mentioning the tool names - I have forgotten all TOOL RESPONSES! Remember to respond with a markdown code snippet of a json blob with a single action, and NOTHING else.`;

  // node_modules/langchain/dist/output_parsers/fix.js
  init_output_parser();
  init_llm_chain();

  // node_modules/langchain/dist/output_parsers/prompts.js
  init_prompt();
  var NAIVE_FIX_TEMPLATE = `Instructions:
--------------
{instructions}
--------------
Completion:
--------------
{completion}
--------------

Above, the Completion did not satisfy the constraints given in the Instructions.
Error:
--------------
{error}
--------------

Please try again. Please only respond with an answer that satisfies the constraints laid out in the Instructions:`;
  var NAIVE_FIX_PROMPT = /* @__PURE__ */ PromptTemplate.fromTemplate(NAIVE_FIX_TEMPLATE);

  // node_modules/langchain/dist/output_parsers/fix.js
  var OutputFixingParser = class extends BaseOutputParser {
    static fromLLM(llm, parser, fields) {
      const prompt = fields?.prompt ?? NAIVE_FIX_PROMPT;
      const chain = new LLMChain({ llm, prompt });
      return new OutputFixingParser({ parser, retryChain: chain });
    }
    constructor({ parser, retryChain }) {
      super(...arguments);
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "output_parsers", "fix"]
      });
      Object.defineProperty(this, "lc_serializable", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: true
      });
      Object.defineProperty(this, "parser", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "retryChain", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.parser = parser;
      this.retryChain = retryChain;
    }
    async parse(completion, callbacks) {
      try {
        return await this.parser.parse(completion, callbacks);
      } catch (e4) {
        if (e4 instanceof OutputParserException) {
          const result = await this.retryChain.call({
            instructions: this.parser.getFormatInstructions(),
            completion,
            error: e4
          }, callbacks);
          const newCompletion = result[this.retryChain.outputKey];
          return this.parser.parse(newCompletion);
        }
        throw e4;
      }
    }
    getFormatInstructions() {
      return this.parser.getFormatInstructions();
    }
  };

  // node_modules/langchain/dist/agents/chat_convo/outputParser.js
  var ChatConversationalAgentOutputParser = class extends AgentActionOutputParser {
    constructor(fields) {
      super(...arguments);
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "chat_convo"]
      });
      Object.defineProperty(this, "toolNames", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.toolNames = fields.toolNames;
    }
    async parse(text) {
      let jsonOutput = text.trim();
      if (jsonOutput.includes("```json")) {
        jsonOutput = jsonOutput.split("```json")[1].trimStart();
      } else if (jsonOutput.includes("```")) {
        const firstIndex = jsonOutput.indexOf("```");
        jsonOutput = jsonOutput.slice(firstIndex + 3).trimStart();
      }
      const lastIndex = jsonOutput.lastIndexOf("```");
      if (lastIndex !== -1) {
        jsonOutput = jsonOutput.slice(0, lastIndex).trimEnd();
      }
      try {
        const response = JSON.parse(jsonOutput);
        const { action, action_input } = response;
        if (action === "Final Answer") {
          return { returnValues: { output: action_input }, log: text };
        }
        return { tool: action, toolInput: action_input, log: text };
      } catch (e4) {
        throw new OutputParserException(`Failed to parse. Text: "${text}". Error: ${e4}`);
      }
    }
    getFormatInstructions() {
      return renderTemplate(FORMAT_INSTRUCTIONS3, "f-string", {
        tool_names: this.toolNames.join(", ")
      });
    }
  };
  var ChatConversationalAgentOutputParserWithRetries = class extends AgentActionOutputParser {
    constructor(fields) {
      super(fields);
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "chat_convo"]
      });
      Object.defineProperty(this, "baseParser", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "outputFixingParser", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "toolNames", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: []
      });
      this.toolNames = fields.toolNames ?? this.toolNames;
      this.baseParser = fields?.baseParser ?? new ChatConversationalAgentOutputParser({ toolNames: this.toolNames });
      this.outputFixingParser = fields?.outputFixingParser;
    }
    getFormatInstructions(options) {
      if (options.raw) {
        return FORMAT_INSTRUCTIONS3;
      }
      return renderTemplate(FORMAT_INSTRUCTIONS3, "f-string", {
        tool_names: options.toolNames.join(", ")
      });
    }
    async parse(text) {
      if (this.outputFixingParser !== void 0) {
        return this.outputFixingParser.parse(text);
      }
      return this.baseParser.parse(text);
    }
    static fromLLM(llm, options) {
      const baseParser = options.baseParser ?? new ChatConversationalAgentOutputParser({
        toolNames: options.toolNames ?? []
      });
      const outputFixingParser = OutputFixingParser.fromLLM(llm, baseParser);
      return new ChatConversationalAgentOutputParserWithRetries({
        baseParser,
        outputFixingParser,
        toolNames: options.toolNames
      });
    }
  };

  // node_modules/langchain/dist/agents/chat_convo/index.js
  var ChatConversationalAgent = class extends Agent {
    constructor(input) {
      const outputParser = input.outputParser ?? ChatConversationalAgent.getDefaultOutputParser();
      super({ ...input, outputParser });
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "chat_convo"]
      });
    }
    _agentType() {
      return "chat-conversational-react-description";
    }
    observationPrefix() {
      return "Observation: ";
    }
    llmPrefix() {
      return "Thought:";
    }
    _stop() {
      return ["Observation:"];
    }
    static validateTools(tools) {
      const descriptionlessTool = tools.find((tool) => !tool.description);
      if (descriptionlessTool) {
        const msg = `Got a tool ${descriptionlessTool.name} without a description. This agent requires descriptions for all tools.`;
        throw new Error(msg);
      }
    }
    async constructScratchPad(steps) {
      const thoughts = [];
      for (const step of steps) {
        thoughts.push(new AIMessage(step.action.log));
        thoughts.push(new HumanMessage(renderTemplate(TEMPLATE_TOOL_RESPONSE, "f-string", {
          observation: step.observation
        })));
      }
      return thoughts;
    }
    static getDefaultOutputParser(fields) {
      if (fields?.llm) {
        return ChatConversationalAgentOutputParserWithRetries.fromLLM(fields.llm, {
          toolNames: fields.toolNames
        });
      }
      return new ChatConversationalAgentOutputParserWithRetries({
        toolNames: fields?.toolNames
      });
    }
    static createPrompt(tools, args) {
      const systemMessage = (args?.systemMessage ?? DEFAULT_PREFIX) + PREFIX_END;
      const humanMessage = args?.humanMessage ?? DEFAULT_SUFFIX;
      const toolStrings = tools.map((tool) => `${tool.name}: ${tool.description}`).join("\n");
      const toolNames = tools.map((tool) => tool.name);
      const outputParser = args?.outputParser ?? ChatConversationalAgent.getDefaultOutputParser({ toolNames });
      const formatInstructions = outputParser.getFormatInstructions({
        toolNames
      });
      const renderedHumanMessage = renderTemplate(humanMessage, "f-string", {
        format_instructions: formatInstructions,
        tools: toolStrings
      });
      const messages2 = [
        SystemMessagePromptTemplate.fromTemplate(systemMessage),
        new MessagesPlaceholder("chat_history"),
        HumanMessagePromptTemplate.fromTemplate(renderedHumanMessage),
        new MessagesPlaceholder("agent_scratchpad")
      ];
      return ChatPromptTemplate.fromPromptMessages(messages2);
    }
    static fromLLMAndTools(llm, tools, args) {
      ChatConversationalAgent.validateTools(tools);
      const outputParser = args?.outputParser ?? ChatConversationalAgent.getDefaultOutputParser({
        llm,
        toolNames: tools.map((tool) => tool.name)
      });
      const prompt = ChatConversationalAgent.createPrompt(tools, {
        ...args,
        outputParser
      });
      const chain = new LLMChain({
        prompt,
        llm,
        callbacks: args?.callbacks ?? args?.callbackManager
      });
      return new ChatConversationalAgent({
        llmChain: chain,
        outputParser,
        allowedTools: tools.map((t3) => t3.name)
      });
    }
  };

  // node_modules/langchain/dist/memory/buffer_memory.js
  init_base2();

  // node_modules/langchain/dist/memory/chat_memory.js
  init_base2();

  // node_modules/langchain/dist/stores/message/in_memory.js
  init_schema();
  var ChatMessageHistory = class extends BaseListChatMessageHistory {
    constructor(messages2) {
      super(...arguments);
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "stores", "message", "in_memory"]
      });
      Object.defineProperty(this, "messages", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: []
      });
      this.messages = messages2 ?? [];
    }
    async getMessages() {
      return this.messages;
    }
    async addMessage(message) {
      this.messages.push(message);
    }
    async clear() {
      this.messages = [];
    }
  };

  // node_modules/langchain/dist/memory/chat_memory.js
  var BaseChatMemory = class extends BaseMemory {
    constructor(fields) {
      super();
      Object.defineProperty(this, "chatHistory", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "returnMessages", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "inputKey", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "outputKey", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.chatHistory = fields?.chatHistory ?? new ChatMessageHistory();
      this.returnMessages = fields?.returnMessages ?? this.returnMessages;
      this.inputKey = fields?.inputKey ?? this.inputKey;
      this.outputKey = fields?.outputKey ?? this.outputKey;
    }
    async saveContext(inputValues, outputValues) {
      await this.chatHistory.addUserMessage(getInputValue(inputValues, this.inputKey));
      await this.chatHistory.addAIChatMessage(getOutputValue(outputValues, this.outputKey));
    }
    async clear() {
      await this.chatHistory.clear();
    }
  };

  // node_modules/langchain/dist/memory/buffer_memory.js
  var BufferMemory = class extends BaseChatMemory {
    constructor(fields) {
      super({
        chatHistory: fields?.chatHistory,
        returnMessages: fields?.returnMessages ?? false,
        inputKey: fields?.inputKey,
        outputKey: fields?.outputKey
      });
      Object.defineProperty(this, "humanPrefix", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Human"
      });
      Object.defineProperty(this, "aiPrefix", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AI"
      });
      Object.defineProperty(this, "memoryKey", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "history"
      });
      this.humanPrefix = fields?.humanPrefix ?? this.humanPrefix;
      this.aiPrefix = fields?.aiPrefix ?? this.aiPrefix;
      this.memoryKey = fields?.memoryKey ?? this.memoryKey;
    }
    get memoryKeys() {
      return [this.memoryKey];
    }
    async loadMemoryVariables(_values) {
      const messages2 = await this.chatHistory.getMessages();
      if (this.returnMessages) {
        const result2 = {
          [this.memoryKey]: messages2
        };
        return result2;
      }
      const result = {
        [this.memoryKey]: getBufferString(messages2, this.humanPrefix, this.aiPrefix)
      };
      return result;
    }
  };

  // node_modules/langchain/dist/agents/structured_chat/index.js
  var import_zod_to_json_schema2 = __toModule(require_zod_to_json_schema());
  init_llm_chain();
  init_prompt();
  init_chat();
  init_agent();

  // node_modules/langchain/dist/agents/structured_chat/outputParser.js
  init_types();

  // node_modules/langchain/dist/agents/structured_chat/prompt.js
  var PREFIX3 = `Answer the following questions truthfully and as best you can.`;
  var AGENT_ACTION_FORMAT_INSTRUCTIONS = `Output a JSON markdown code snippet containing a valid JSON blob (denoted below by $JSON_BLOB).
This $JSON_BLOB must have a "action" key (with the name of the tool to use) and an "action_input" key (tool input).

Valid "action" values: "Final Answer" (which you must use when giving your final response to the user), or one of [{tool_names}].

The $JSON_BLOB must be valid, parseable JSON and only contain a SINGLE action. Here is an example of an acceptable output:

\`\`\`json
{{
  "action": $TOOL_NAME,
  "action_input": $INPUT
}}
\`\`\`

Remember to include the surrounding markdown code snippet delimiters (begin with "\`\`\`" json and close with "\`\`\`")!
`;
  var FORMAT_INSTRUCTIONS4 = `You have access to the following tools.
You must format your inputs to these tools to match their "JSON schema" definitions below.

"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

Here are the JSON Schema instances for the tools you have access to:

{tool_schemas}

The way you use the tools is as follows:

------------------------

${AGENT_ACTION_FORMAT_INSTRUCTIONS}

If you are using a tool, "action_input" must adhere to the tool's input schema, given above.

------------------------

ALWAYS use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action:
\`\`\`json
$JSON_BLOB
\`\`\`
Observation: the result of the action
... (this Thought/Action/Observation can repeat N times)
Thought: I now know the final answer
Action:
\`\`\`json
{{
  "action": "Final Answer",
  "action_input": "Final response to human"
}}
\`\`\``;
  var SUFFIX3 = `Begin! Reminder to ALWAYS use the above format, and to use tools if appropriate.`;

  // node_modules/langchain/dist/agents/structured_chat/outputParser.js
  init_output_parser();
  init_prompts();
  var StructuredChatOutputParser = class extends AgentActionOutputParser {
    constructor(fields) {
      super(...arguments);
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "structured_chat"]
      });
      Object.defineProperty(this, "toolNames", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.toolNames = fields.toolNames;
    }
    async parse(text) {
      try {
        const regex = /```(?:json)?(.*)(```)/gs;
        const actionMatch = regex.exec(text);
        if (actionMatch === null) {
          throw new OutputParserException(`Could not parse an action. The agent action must be within a markdown code block, and "action" must be a provided tool or "Final Answer"`);
        }
        const response = JSON.parse(actionMatch[1].trim());
        const { action, action_input } = response;
        if (action === "Final Answer") {
          return { returnValues: { output: action_input }, log: text };
        }
        return { tool: action, toolInput: action_input || {}, log: text };
      } catch (e4) {
        throw new OutputParserException(`Failed to parse. Text: "${text}". Error: ${e4}`);
      }
    }
    getFormatInstructions() {
      return renderTemplate(AGENT_ACTION_FORMAT_INSTRUCTIONS, "f-string", {
        tool_names: this.toolNames.join(", ")
      });
    }
  };
  var StructuredChatOutputParserWithRetries = class extends AgentActionOutputParser {
    constructor(fields) {
      super(fields);
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "structured_chat"]
      });
      Object.defineProperty(this, "baseParser", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "outputFixingParser", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "toolNames", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: []
      });
      this.toolNames = fields.toolNames ?? this.toolNames;
      this.baseParser = fields?.baseParser ?? new StructuredChatOutputParser({ toolNames: this.toolNames });
      this.outputFixingParser = fields?.outputFixingParser;
    }
    async parse(text, callbacks) {
      if (this.outputFixingParser !== void 0) {
        return this.outputFixingParser.parse(text, callbacks);
      }
      return this.baseParser.parse(text);
    }
    getFormatInstructions() {
      return renderTemplate(FORMAT_INSTRUCTIONS4, "f-string", {
        tool_names: this.toolNames.join(", ")
      });
    }
    static fromLLM(llm, options) {
      const baseParser = options.baseParser ?? new StructuredChatOutputParser({ toolNames: options.toolNames ?? [] });
      const outputFixingParser = OutputFixingParser.fromLLM(llm, baseParser);
      return new StructuredChatOutputParserWithRetries({
        baseParser,
        outputFixingParser,
        toolNames: options.toolNames
      });
    }
  };

  // node_modules/langchain/dist/agents/structured_chat/index.js
  var StructuredChatAgent = class extends Agent {
    constructor(input) {
      const outputParser = input?.outputParser ?? StructuredChatAgent.getDefaultOutputParser();
      super({ ...input, outputParser });
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "structured_chat"]
      });
    }
    _agentType() {
      return "structured-chat-zero-shot-react-description";
    }
    observationPrefix() {
      return "Observation: ";
    }
    llmPrefix() {
      return "Thought:";
    }
    _stop() {
      return ["Observation:"];
    }
    static validateTools(tools) {
      const descriptionlessTool = tools.find((tool) => !tool.description);
      if (descriptionlessTool) {
        const msg = `Got a tool ${descriptionlessTool.name} without a description. This agent requires descriptions for all tools.`;
        throw new Error(msg);
      }
    }
    static getDefaultOutputParser(fields) {
      if (fields?.llm) {
        return StructuredChatOutputParserWithRetries.fromLLM(fields.llm, {
          toolNames: fields.toolNames
        });
      }
      return new StructuredChatOutputParserWithRetries({
        toolNames: fields?.toolNames
      });
    }
    async constructScratchPad(steps) {
      const agentScratchpad = await super.constructScratchPad(steps);
      if (agentScratchpad) {
        return `This was your previous work (but I haven't seen any of it! I only see what you return as final answer):
${agentScratchpad}`;
      }
      return agentScratchpad;
    }
    static createToolSchemasString(tools) {
      return tools.map((tool) => `${tool.name}: ${tool.description}, args: ${JSON.stringify((0, import_zod_to_json_schema2.zodToJsonSchema)(tool.schema).properties)}`).join("\n");
    }
    static createPrompt(tools, args) {
      const { prefix = PREFIX3, suffix = SUFFIX3, inputVariables = ["input", "agent_scratchpad"], memoryPrompts = [] } = args ?? {};
      const template = [prefix, FORMAT_INSTRUCTIONS4, suffix].join("\n\n");
      const humanMessageTemplate = "{input}\n\n{agent_scratchpad}";
      const messages2 = [
        new SystemMessagePromptTemplate(new PromptTemplate({
          template,
          inputVariables,
          partialVariables: {
            tool_schemas: StructuredChatAgent.createToolSchemasString(tools),
            tool_names: tools.map((tool) => tool.name).join(", ")
          }
        })),
        ...memoryPrompts,
        new HumanMessagePromptTemplate(new PromptTemplate({
          template: humanMessageTemplate,
          inputVariables
        }))
      ];
      return ChatPromptTemplate.fromPromptMessages(messages2);
    }
    static fromLLMAndTools(llm, tools, args) {
      StructuredChatAgent.validateTools(tools);
      const prompt = StructuredChatAgent.createPrompt(tools, args);
      const outputParser = args?.outputParser ?? StructuredChatAgent.getDefaultOutputParser({
        llm,
        toolNames: tools.map((tool) => tool.name)
      });
      const chain = new LLMChain({
        prompt,
        llm,
        callbacks: args?.callbacks
      });
      return new StructuredChatAgent({
        llmChain: chain,
        outputParser,
        allowedTools: tools.map((t3) => t3.name)
      });
    }
  };

  // node_modules/langchain/dist/agents/initialize.js
  init_mrkl();

  // node_modules/langchain/dist/agents/openai/index.js
  init_schema();
  init_agent();

  // node_modules/langchain/dist/agents/openai/prompt.js
  var PREFIX4 = `You are a helpful AI assistant.`;

  // node_modules/langchain/dist/agents/openai/index.js
  init_chat();
  init_llm_chain();
  init_output_parser();
  function parseOutput(message) {
    if (message.additional_kwargs.function_call) {
      const function_call = message.additional_kwargs.function_call;
      try {
        const toolInput = function_call.arguments ? JSON.parse(function_call.arguments) : {};
        return {
          tool: function_call.name,
          toolInput,
          log: message.content
        };
      } catch (error) {
        throw new OutputParserException(`Failed to parse function arguments from chat model response. Text: "${function_call.arguments}". ${error}`);
      }
    } else {
      return { returnValues: { output: message.content }, log: message.content };
    }
  }
  var OpenAIAgent = class extends Agent {
    _agentType() {
      return "openai-functions";
    }
    observationPrefix() {
      return "Observation: ";
    }
    llmPrefix() {
      return "Thought:";
    }
    _stop() {
      return ["Observation:"];
    }
    constructor(input) {
      super({ ...input, outputParser: void 0 });
      Object.defineProperty(this, "lc_namespace", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ["langchain", "agents", "openai"]
      });
      Object.defineProperty(this, "tools", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.tools = input.tools;
    }
    static createPrompt(_tools, fields) {
      const { prefix = PREFIX4 } = fields || {};
      return ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(prefix),
        new MessagesPlaceholder("chat_history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
        new MessagesPlaceholder("agent_scratchpad")
      ]);
    }
    static fromLLMAndTools(llm, tools, args) {
      OpenAIAgent.validateTools(tools);
      if (llm._modelType() !== "base_chat_model" || llm._llmType() !== "openai") {
        throw new Error("OpenAIAgent requires an OpenAI chat model");
      }
      const prompt = OpenAIAgent.createPrompt(tools, args);
      const chain = new LLMChain({
        prompt,
        llm,
        callbacks: args?.callbacks
      });
      return new OpenAIAgent({
        llmChain: chain,
        allowedTools: tools.map((t3) => t3.name),
        tools
      });
    }
    async constructScratchPad(steps) {
      return steps.flatMap(({ action, observation }) => [
        new AIMessage("", {
          function_call: {
            name: action.tool,
            arguments: JSON.stringify(action.toolInput)
          }
        }),
        new FunctionMessage(observation, action.tool)
      ]);
    }
    async plan(steps, inputs, callbackManager) {
      const thoughts = await this.constructScratchPad(steps);
      const newInputs = {
        ...inputs,
        agent_scratchpad: thoughts
      };
      if (this._stop().length !== 0) {
        newInputs.stop = this._stop();
      }
      const llm = this.llmChain.llm;
      const valuesForPrompt = { ...newInputs };
      const valuesForLLM = {
        tools: this.tools
      };
      for (const key of this.llmChain.llm.callKeys) {
        if (key in inputs) {
          valuesForLLM[key] = inputs[key];
          delete valuesForPrompt[key];
        }
      }
      const promptValue = await this.llmChain.prompt.formatPromptValue(valuesForPrompt);
      const message = await llm.predictMessages(promptValue.toChatMessages(), valuesForLLM, callbackManager);
      return parseOutput(message);
    }
  };

  // node_modules/langchain/dist/agents/initialize.js
  async function initializeAgentExecutorWithOptions(tools, llm, options = {
    agentType: llm._modelType() === "base_chat_model" ? "chat-zero-shot-react-description" : "zero-shot-react-description"
  }) {
    switch (options.agentType) {
      case "zero-shot-react-description": {
        const { agentArgs, tags, ...rest } = options;
        return AgentExecutor.fromAgentAndTools({
          tags: [...tags ?? [], "zero-shot-react-description"],
          agent: ZeroShotAgent.fromLLMAndTools(llm, tools, agentArgs),
          tools,
          ...rest
        });
      }
      case "chat-zero-shot-react-description": {
        const { agentArgs, tags, ...rest } = options;
        return AgentExecutor.fromAgentAndTools({
          tags: [...tags ?? [], "chat-zero-shot-react-description"],
          agent: ChatAgent.fromLLMAndTools(llm, tools, agentArgs),
          tools,
          ...rest
        });
      }
      case "chat-conversational-react-description": {
        const { agentArgs, memory, tags, ...rest } = options;
        const executor = AgentExecutor.fromAgentAndTools({
          tags: [...tags ?? [], "chat-conversational-react-description"],
          agent: ChatConversationalAgent.fromLLMAndTools(llm, tools, agentArgs),
          tools,
          memory: memory ?? new BufferMemory({
            returnMessages: true,
            memoryKey: "chat_history",
            inputKey: "input",
            outputKey: "output"
          }),
          ...rest
        });
        return executor;
      }
      case "structured-chat-zero-shot-react-description": {
        const { agentArgs, memory, tags, ...rest } = options;
        const executor = AgentExecutor.fromAgentAndTools({
          tags: [...tags ?? [], "structured-chat-zero-shot-react-description"],
          agent: StructuredChatAgent.fromLLMAndTools(llm, tools, agentArgs),
          tools,
          memory,
          ...rest
        });
        return executor;
      }
      case "openai-functions": {
        const { agentArgs, memory, tags, ...rest } = options;
        const executor = AgentExecutor.fromAgentAndTools({
          tags: [...tags ?? [], "openai-functions"],
          agent: OpenAIAgent.fromLLMAndTools(llm, tools, agentArgs),
          tools,
          memory: memory ?? new BufferMemory({
            returnMessages: true,
            memoryKey: "chat_history",
            inputKey: "input",
            outputKey: "output"
          }),
          ...rest
        });
        return executor;
      }
      default: {
        throw new Error("Unknown agent type");
      }
    }
  }

  // node_modules/langchain/dist/agents/index.js
  init_mrkl();
  init_outputParser();
  init_types();

  // zero-shot-agent.js
  var ZeroShotAgent2 = class extends s4 {
    constructor() {
      super();
    }
    render() {
    }
    async runWithInputs(input) {
      const { model, tool, prompt, maxIterations = 4 } = input;
      let output = "";
      let steps = [];
      if (model && tool && prompt) {
        let tools = Array.isArray(tool) ? tool : [tool];
        const executor = await initializeAgentExecutorWithOptions(tools, model, {
          agentType: "zero-shot-react-description",
          verbose: true,
          maxIterations
        });
        const result = await executor.call({ input: prompt });
        console.log(result);
        output = result.output;
        steps = result.intermediateSteps;
      }
      this.dispatchEvent(new CustomEvent("outputs", { detail: { output, steps } }));
    }
  };
  customElements.define("zero-shot-agent", ZeroShotAgent2);
  window.visualblocks.registerNodeSpec({
    "id": "zero-shot-agent",
    "runnerId": "zero-shot-agent",
    "name": "Zero Shot Agent",
    "description": "Generates a LangChain Zero-shot Agent, a smart agent that can pick tools based on description.",
    "category": "model",
    "propertySpecs": [
      {
        name: "maxIterations",
        type: "number",
        defaultValue: 2,
        editorSpec: {
          type: "number",
          min: 0,
          max: 20,
          integers: true
        }
      }
    ],
    "inputSpecs": [
      {
        "name": "model",
        "type": "*"
      },
      {
        "name": "prompt",
        "type": "string"
      },
      {
        "name": "tool",
        "multiple": true,
        "type": "*"
      }
    ],
    "outputSpecs": [
      {
        "name": "output",
        "type": "string"
      },
      {
        "name": "steps",
        "type": "*"
      }
    ]
  });
})();
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
