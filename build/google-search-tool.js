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

  // node_modules/langchain/dist/util/env.js
  async function getRuntimeEnvironment() {
    if (runtimeEnvironment === void 0) {
      const env = getEnv();
      runtimeEnvironment = {
        library: "langchain-js",
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
    "node_modules/langchain/dist/util/env.js"() {
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
        async handleChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata) {
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
            inputs: { messages },
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
        var self = this;
        this._timer = setTimeout(function() {
          self._attempts++;
          if (self._operationTimeoutCb) {
            self._timeout = setTimeout(function() {
              self._operationTimeoutCb(self._attempts);
            }, self._operationTimeout);
            if (self._options.unref) {
              self._timeout.unref();
            }
          }
          self._fn(self._attempts);
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
        var self = this;
        if (this._operationTimeoutCb) {
          this._timeout = setTimeout(function() {
            self._operationTimeoutCb();
          }, self._operationTimeout);
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
  async function getRuntimeEnvironment2() {
    if (runtimeEnvironment2 === void 0) {
      const env = getEnv2();
      runtimeEnvironment2 = {
        library: "langsmith",
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
    "node_modules/langsmith/dist/utils/env.js"() {
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
      init_env2();
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
          const apiKey = getEnvironmentVariable2("LANGCHAIN_API_KEY");
          const apiUrl = getEnvironmentVariable2("LANGCHAIN_ENDPOINT") ?? (apiKey ? "https://api.smith.langchain.com" : "http://localhost:1984");
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
          const runtimeEnv = await getRuntimeEnvironment2();
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
        async *listRuns({ projectId, projectName, parentRunId, referenceExampleId, datasetId, startTime, endTime, executionOrder, runType, error, id, limit, offset, query, filter, orderBy }) {
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
          if (filter !== void 0) {
            queryParams.append("filter", filter);
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
      init_env2();
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

  // node_modules/langchain/dist/callbacks/handlers/tracer_langchain.js
  var LangChainTracer;
  var init_tracer_langchain = __esm({
    "node_modules/langchain/dist/callbacks/handlers/tracer_langchain.js"() {
      init_langsmith();
      init_env();
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
          this.projectName = projectName ?? getEnvironmentVariable("LANGCHAIN_PROJECT") ?? getEnvironmentVariable("LANGCHAIN_SESSION");
          this.exampleId = exampleId;
          this.client = client ?? new Client({});
        }
        async _convertToCreate(run, example_id = void 0) {
          return {
            ...run,
            extra: {
              ...run.extra,
              runtime: await getRuntimeEnvironment()
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
  function getBufferString(messages, humanPrefix = "Human", aiPrefix = "AI") {
    const string_messages = [];
    for (const m2 of messages) {
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
  var init_base2 = __esm({
    "node_modules/langchain/dist/memory/base.js"() {
    }
  });

  // node_modules/langchain/dist/callbacks/handlers/tracer_langchain_v1.js
  var LangChainTracerV1;
  var init_tracer_langchain_v1 = __esm({
    "node_modules/langchain/dist/callbacks/handlers/tracer_langchain_v1.js"() {
      init_base2();
      init_env();
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
            value: getEnvironmentVariable("LANGCHAIN_ENDPOINT") || "http://localhost:1984"
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
          const apiKey = getEnvironmentVariable("LANGCHAIN_API_KEY");
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
      init_env();
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
        async handleChatModelStart(llm, messages, _runId = void 0, _parentRunId = void 0, extraParams = void 0) {
          return Promise.all(messages.map(async (messageGroup) => {
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
          const verboseEnabled = getEnvironmentVariable("LANGCHAIN_VERBOSE") || options?.verbose;
          const tracingV2Enabled = getEnvironmentVariable("LANGCHAIN_TRACING_V2") ?? false;
          const tracingEnabled = tracingV2Enabled || (getEnvironmentVariable("LANGCHAIN_TRACING") ?? false);
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
                const session = getEnvironmentVariable("LANGCHAIN_PROJECT") && getEnvironmentVariable("LANGCHAIN_SESSION");
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
  var import_p_retry2, import_p_queue3;
  var init_async_caller2 = __esm({
    "node_modules/langchain/dist/util/async_caller.js"() {
      import_p_retry2 = __toModule(require_p_retry());
      import_p_queue3 = __toModule(require_dist());
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
  var init_tiktoken = __esm({
    "node_modules/langchain/dist/util/tiktoken.js"() {
      init_lite();
      init_async_caller2();
    }
  });

  // node_modules/langchain/dist/base_language/count_tokens.js
  var init_count_tokens = __esm({
    "node_modules/langchain/dist/base_language/count_tokens.js"() {
      init_tiktoken();
    }
  });

  // node_modules/langchain/dist/base_language/index.js
  var getVerbosity, BaseLangChain;
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

  // node_modules/langchain/dist/schema/index.js
  var init_schema = __esm({
    "node_modules/langchain/dist/schema/index.js"() {
      init_serializable();
    }
  });

  // node_modules/langchain/dist/chains/base.js
  var init_base3 = __esm({
    "node_modules/langchain/dist/chains/base.js"() {
      init_schema();
      init_manager();
      init_base_language();
    }
  });

  // node_modules/langchain/dist/prompts/base.js
  var init_base4 = __esm({
    "node_modules/langchain/dist/prompts/base.js"() {
      init_schema();
      init_serializable();
    }
  });

  // node_modules/langchain/dist/schema/output_parser.js
  var init_output_parser = __esm({
    "node_modules/langchain/dist/schema/output_parser.js"() {
      init_serializable();
    }
  });

  // node_modules/langchain/dist/output_parsers/noop.js
  var init_noop = __esm({
    "node_modules/langchain/dist/output_parsers/noop.js"() {
      init_output_parser();
    }
  });

  // node_modules/langchain/dist/chains/llm_chain.js
  var init_llm_chain = __esm({
    "node_modules/langchain/dist/chains/llm_chain.js"() {
      init_base3();
      init_base4();
      init_base_language();
      init_noop();
    }
  });

  // node_modules/langchain/dist/prompts/template.js
  var init_template = __esm({
    "node_modules/langchain/dist/prompts/template.js"() {
    }
  });

  // node_modules/langchain/dist/prompts/prompt.js
  var init_prompt = __esm({
    "node_modules/langchain/dist/prompts/prompt.js"() {
      init_base4();
      init_template();
    }
  });

  // node_modules/langchain/dist/chains/combine_docs_chain.js
  var init_combine_docs_chain = __esm({
    "node_modules/langchain/dist/chains/combine_docs_chain.js"() {
      init_base3();
      init_llm_chain();
      init_prompt();
    }
  });

  // node_modules/langchain/dist/prompts/chat.js
  var init_chat = __esm({
    "node_modules/langchain/dist/prompts/chat.js"() {
      init_schema();
      init_serializable();
      init_base4();
      init_prompt();
    }
  });

  // node_modules/langchain/dist/prompts/selectors/conditional.js
  var init_conditional = __esm({
    "node_modules/langchain/dist/prompts/selectors/conditional.js"() {
    }
  });

  // node_modules/langchain/dist/chains/question_answering/stuff_prompts.js
  var init_stuff_prompts = __esm({
    "node_modules/langchain/dist/chains/question_answering/stuff_prompts.js"() {
      init_prompt();
      init_chat();
      init_conditional();
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

  // node_modules/langchain/dist/prompts/few_shot.js
  var init_few_shot = __esm({
    "node_modules/langchain/dist/prompts/few_shot.js"() {
      init_base4();
      init_template();
      init_prompt();
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
  var init_vector_db_qa = __esm({
    "node_modules/langchain/dist/chains/vector_db_qa.js"() {
      init_base3();
      init_load();
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

  // node_modules/langchain/dist/tools/serpapi.js
  init_env();

  // node_modules/zod/lib/index.mjs
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
  })(util || (util = {}));
  var objectUtil;
  (function(objectUtil2) {
    objectUtil2.mergeShapes = (first, second) => {
      return {
        ...first,
        ...second
      };
    };
  })(objectUtil || (objectUtil = {}));
  var ZodParsedType = util.arrayToEnum([
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
        return ZodParsedType.undefined;
      case "string":
        return ZodParsedType.string;
      case "number":
        return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
      case "boolean":
        return ZodParsedType.boolean;
      case "function":
        return ZodParsedType.function;
      case "bigint":
        return ZodParsedType.bigint;
      case "symbol":
        return ZodParsedType.symbol;
      case "object":
        if (Array.isArray(data)) {
          return ZodParsedType.array;
        }
        if (data === null) {
          return ZodParsedType.null;
        }
        if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
          return ZodParsedType.promise;
        }
        if (typeof Map !== "undefined" && data instanceof Map) {
          return ZodParsedType.map;
        }
        if (typeof Set !== "undefined" && data instanceof Set) {
          return ZodParsedType.set;
        }
        if (typeof Date !== "undefined" && data instanceof Date) {
          return ZodParsedType.date;
        }
        return ZodParsedType.object;
      default:
        return ZodParsedType.unknown;
    }
  };
  var ZodIssueCode = util.arrayToEnum([
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
      return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
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
  ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
  };
  var errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = "Required";
        } else {
          message = `Expected ${issue.expected}, received ${issue.received}`;
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
        break;
      case ZodIssueCode.unrecognized_keys:
        message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
        break;
      case ZodIssueCode.invalid_union:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
        break;
      case ZodIssueCode.invalid_enum_value:
        message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
        break;
      case ZodIssueCode.invalid_arguments:
        message = `Invalid function arguments`;
        break;
      case ZodIssueCode.invalid_return_type:
        message = `Invalid function return type`;
        break;
      case ZodIssueCode.invalid_date:
        message = `Invalid date`;
        break;
      case ZodIssueCode.invalid_string:
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
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== "regex") {
          message = `Invalid ${issue.validation}`;
        } else {
          message = "Invalid";
        }
        break;
      case ZodIssueCode.too_small:
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
      case ZodIssueCode.too_big:
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
      case ZodIssueCode.custom:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = `Intersection results could not be merged`;
        break;
      case ZodIssueCode.not_multiple_of:
        message = `Number must be a multiple of ${issue.multipleOf}`;
        break;
      case ZodIssueCode.not_finite:
        message = "Number must be finite";
        break;
      default:
        message = _ctx.defaultError;
        util.assertNever(issue);
    }
    return { message };
  };
  var overrideErrorMap = errorMap;
  function setErrorMap(map) {
    overrideErrorMap = map;
  }
  function getErrorMap() {
    return overrideErrorMap;
  }
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
  var EMPTY_PATH = [];
  function addIssueToContext(ctx, issueData) {
    const issue = makeIssue({
      issueData,
      data: ctx.data,
      path: ctx.path,
      errorMaps: [
        ctx.common.contextualErrorMap,
        ctx.schemaErrorMap,
        getErrorMap(),
        errorMap
      ].filter((x2) => !!x2)
    });
    ctx.common.issues.push(issue);
  }
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
          return INVALID;
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
          return INVALID;
        if (value.status === "aborted")
          return INVALID;
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
  var INVALID = Object.freeze({
    status: "aborted"
  });
  var DIRTY = (value) => ({ status: "dirty", value });
  var OK = (value) => ({ status: "valid", value });
  var isAborted = (x2) => x2.status === "aborted";
  var isDirty = (x2) => x2.status === "dirty";
  var isValid = (x2) => x2.status === "valid";
  var isAsync = (x2) => typeof Promise !== "undefined" && x2 instanceof Promise;
  var errorUtil;
  (function(errorUtil2) {
    errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
  })(errorUtil || (errorUtil = {}));
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
    if (isValid(result)) {
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
          const error = new ZodError(ctx.common.issues);
          this._error = error;
          return this._error;
        }
      };
    }
  };
  function processCreateParams(params) {
    if (!params)
      return {};
    const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
    if (errorMap2 && (invalid_type_error || required_error)) {
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap2)
      return { errorMap: errorMap2, description };
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
      return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
      return ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      };
    }
    _processInputParams(input) {
      return {
        status: new ParseStatus(),
        ctx: {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        }
      };
    }
    _parseSync(input) {
      const result = this._parse(input);
      if (isAsync(result)) {
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
        parsedType: getParsedType(data)
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
        parsedType: getParsedType(data)
      };
      const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
      const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
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
          code: ZodIssueCode.custom,
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
        code: ZodIssueCode.invalid_string,
        ...errorUtil.errToObj(message)
      });
      this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
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
      if (parsedType !== ZodParsedType.string) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.length < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
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
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            } else if (tooSmall) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
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
            addIssueToContext(ctx, {
              validation: "email",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "emoji") {
          if (!emojiRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "emoji",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "uuid") {
          if (!uuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "uuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid") {
          if (!cuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid2") {
          if (!cuid2Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid2",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ulid") {
          if (!ulidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ulid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "url") {
          try {
            new URL(input.data);
          } catch (_a) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "regex") {
          check.regex.lastIndex = 0;
          const testResult = check.regex.test(input.data);
          if (!testResult) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "regex",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "trim") {
          input.data = input.data.trim();
        } else if (check.kind === "includes") {
          if (!input.data.includes(check.value, check.position)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { startsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "endsWith") {
          if (!input.data.endsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { endsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "datetime") {
          const regex = datetimeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "datetime",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ip") {
          if (!isValidIP(input.data, check.version)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ip",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
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
      return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
      return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
      return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
      return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
      return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
      return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
      return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    ip(options) {
      return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
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
        ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
      });
    }
    regex(regex, message) {
      return this._addCheck({
        kind: "regex",
        regex,
        ...errorUtil.errToObj(message)
      });
    }
    includes(value, options) {
      return this._addCheck({
        kind: "includes",
        value,
        position: options === null || options === void 0 ? void 0 : options.position,
        ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
      });
    }
    startsWith(value, message) {
      return this._addCheck({
        kind: "startsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    endsWith(value, message) {
      return this._addCheck({
        kind: "endsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    min(minLength, message) {
      return this._addCheck({
        kind: "min",
        value: minLength,
        ...errorUtil.errToObj(message)
      });
    }
    max(maxLength, message) {
      return this._addCheck({
        kind: "max",
        value: maxLength,
        ...errorUtil.errToObj(message)
      });
    }
    length(len, message) {
      return this._addCheck({
        kind: "length",
        value: len,
        ...errorUtil.errToObj(message)
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
      if (parsedType !== ZodParsedType.number) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.number,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "int") {
          if (!util.isInteger(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_type,
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "finite") {
          if (!Number.isFinite(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_finite,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
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
            message: errorUtil.toString(message)
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
        message: errorUtil.toString(message)
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    finite(message) {
      return this._addCheck({
        kind: "finite",
        message: errorUtil.toString(message)
      });
    }
    safe(message) {
      return this._addCheck({
        kind: "min",
        inclusive: true,
        value: Number.MIN_SAFE_INTEGER,
        message: errorUtil.toString(message)
      })._addCheck({
        kind: "max",
        inclusive: true,
        value: Number.MAX_SAFE_INTEGER,
        message: errorUtil.toString(message)
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
      return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
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
      if (parsedType !== ZodParsedType.bigint) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
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
            message: errorUtil.toString(message)
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
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
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
      if (parsedType !== ZodParsedType.boolean) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.boolean,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
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
      if (parsedType !== ZodParsedType.date) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.date,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      if (isNaN(input.data.getTime())) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_date
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.getTime() < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              message: check.message,
              inclusive: true,
              exact: false,
              maximum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
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
        message: errorUtil.toString(message)
      });
    }
    max(maxDate, message) {
      return this._addCheck({
        kind: "max",
        value: maxDate.getTime(),
        message: errorUtil.toString(message)
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
      if (parsedType !== ZodParsedType.symbol) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.symbol,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodSymbol.create = (params) => {
    return new ZodSymbol({
      typeName: ZodFirstPartyTypeKind.ZodSymbol,
      ...processCreateParams(params)
    });
  };
  var ZodUndefined = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.undefined,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodUndefined.create = (params) => {
    return new ZodUndefined({
      typeName: ZodFirstPartyTypeKind.ZodUndefined,
      ...processCreateParams(params)
    });
  };
  var ZodNull = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.null) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.null,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
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
      return OK(input.data);
    }
  };
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
      return OK(input.data);
    }
  };
  ZodUnknown.create = (params) => {
    return new ZodUnknown({
      typeName: ZodFirstPartyTypeKind.ZodUnknown,
      ...processCreateParams(params)
    });
  };
  var ZodNever = class extends ZodType {
    _parse(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.never,
        received: ctx.parsedType
      });
      return INVALID;
    }
  };
  ZodNever.create = (params) => {
    return new ZodNever({
      typeName: ZodFirstPartyTypeKind.ZodNever,
      ...processCreateParams(params)
    });
  };
  var ZodVoid = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.void,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
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
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (def.exactLength !== null) {
        const tooBig = ctx.data.length > def.exactLength.value;
        const tooSmall = ctx.data.length < def.exactLength.value;
        if (tooBig || tooSmall) {
          addIssueToContext(ctx, {
            code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
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
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
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
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
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
          return ParseStatus.mergeArray(status, result2);
        });
      }
      const result = [...ctx.data].map((item, i3) => {
        return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i3));
      });
      return ParseStatus.mergeArray(status, result);
    }
    get element() {
      return this._def.type;
    }
    min(minLength, message) {
      return new ZodArray({
        ...this._def,
        minLength: { value: minLength, message: errorUtil.toString(message) }
      });
    }
    max(maxLength, message) {
      return new ZodArray({
        ...this._def,
        maxLength: { value: maxLength, message: errorUtil.toString(message) }
      });
    }
    length(len, message) {
      return new ZodArray({
        ...this._def,
        exactLength: { value: len, message: errorUtil.toString(message) }
      });
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
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
      const keys = util.objectKeys(shape);
      return this._cached = { shape, keys };
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.object) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx2.parsedType
        });
        return INVALID;
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
            addIssueToContext(ctx, {
              code: ZodIssueCode.unrecognized_keys,
              keys: extraKeys
            });
            status.dirty();
          }
        } else if (unknownKeys === "strip")
          ;
        else {
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
          return ParseStatus.mergeObjectSync(status, syncPairs);
        });
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get shape() {
      return this._def.shape();
    }
    strict(message) {
      errorUtil.errToObj;
      return new ZodObject({
        ...this._def,
        unknownKeys: "strict",
        ...message !== void 0 ? {
          errorMap: (issue, ctx) => {
            var _a, _b, _c, _d;
            const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
            if (issue.code === "unrecognized_keys")
              return {
                message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
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
      util.objectKeys(mask).forEach((key) => {
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
      util.objectKeys(this.shape).forEach((key) => {
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
      util.objectKeys(this.shape).forEach((key) => {
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
      util.objectKeys(this.shape).forEach((key) => {
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
      return createZodEnum(util.objectKeys(this.shape));
    }
  };
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
        const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
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
        const unionErrors = issues.map((issues2) => new ZodError(issues2));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  };
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
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const discriminator = this.discriminator;
      const discriminatorValue = ctx.data[discriminator];
      const option = this.optionsMap.get(discriminatorValue);
      if (!option) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [discriminator]
        });
        return INVALID;
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
  function mergeValues(a3, b2) {
    const aType = getParsedType(a3);
    const bType = getParsedType(b2);
    if (a3 === b2) {
      return { valid: true, data: a3 };
    } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
      const bKeys = util.objectKeys(b2);
      const sharedKeys = util.objectKeys(a3).filter((key) => bKeys.indexOf(key) !== -1);
      const newObj = { ...a3, ...b2 };
      for (const key of sharedKeys) {
        const sharedValue = mergeValues(a3[key], b2[key]);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newObj[key] = sharedValue.data;
      }
      return { valid: true, data: newObj };
    } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
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
    } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a3 === +b2) {
      return { valid: true, data: a3 };
    } else {
      return { valid: false };
    }
  }
  var ZodIntersection = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const handleParsed = (parsedLeft, parsedRight) => {
        if (isAborted(parsedLeft) || isAborted(parsedRight)) {
          return INVALID;
        }
        const merged = mergeValues(parsedLeft.value, parsedRight.value);
        if (!merged.valid) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_intersection_types
          });
          return INVALID;
        }
        if (isDirty(parsedLeft) || isDirty(parsedRight)) {
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
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (ctx.data.length < this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        return INVALID;
      }
      const rest = this._def.rest;
      if (!rest && ctx.data.length > this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
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
          return ParseStatus.mergeArray(status, results);
        });
      } else {
        return ParseStatus.mergeArray(status, items);
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
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
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
        return ParseStatus.mergeObjectAsync(status, pairs);
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
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
  var ZodMap = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.map) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.map,
          received: ctx.parsedType
        });
        return INVALID;
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
              return INVALID;
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
            return INVALID;
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
      if (ctx.parsedType !== ZodParsedType.set) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.set,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const def = this._def;
      if (def.minSize !== null) {
        if (ctx.data.size < def.minSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
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
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
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
            return INVALID;
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
        minSize: { value: minSize, message: errorUtil.toString(message) }
      });
    }
    max(maxSize, message) {
      return new ZodSet({
        ...this._def,
        maxSize: { value: maxSize, message: errorUtil.toString(message) }
      });
    }
    size(size, message) {
      return this.min(size, message).max(size, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
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
      if (ctx.parsedType !== ZodParsedType.function) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.function,
          received: ctx.parsedType
        });
        return INVALID;
      }
      function makeArgsIssue(args, error) {
        return makeIssue({
          data: args,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            getErrorMap(),
            errorMap
          ].filter((x2) => !!x2),
          issueData: {
            code: ZodIssueCode.invalid_arguments,
            argumentsError: error
          }
        });
      }
      function makeReturnsIssue(returns, error) {
        return makeIssue({
          data: returns,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            getErrorMap(),
            errorMap
          ].filter((x2) => !!x2),
          issueData: {
            code: ZodIssueCode.invalid_return_type,
            returnTypeError: error
          }
        });
      }
      const params = { errorMap: ctx.common.contextualErrorMap };
      const fn = ctx.data;
      if (this._def.returns instanceof ZodPromise) {
        return OK(async (...args) => {
          const error = new ZodError([]);
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
        return OK((...args) => {
          const parsedArgs = this._def.args.safeParse(args, params);
          if (!parsedArgs.success) {
            throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
          }
          const result = fn(...parsedArgs.data);
          const parsedReturns = this._def.returns.safeParse(result, params);
          if (!parsedReturns.success) {
            throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
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
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_literal,
          expected: this._def.value
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
    get value() {
      return this._def.value;
    }
  };
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
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (this._def.values.indexOf(input.data) === -1) {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
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
  ZodEnum.create = createZodEnum;
  var ZodNativeEnum = class extends ZodType {
    _parse(input) {
      const nativeEnumValues = util.getValidEnumValues(this._def.values);
      const ctx = this._getOrReturnCtx(input);
      if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (nativeEnumValues.indexOf(input.data) === -1) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get enum() {
      return this._def.values;
    }
  };
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
      if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.promise,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
      return OK(promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap
        });
      }));
    }
  };
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
          addIssueToContext(ctx, arg);
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
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          executeRefinement(inner.value);
          return { status: status.value, value: inner.value };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
            if (inner.status === "aborted")
              return INVALID;
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
          if (!isValid(base))
            return base;
          const result = effect.transform(base.value, checkCtx);
          if (result instanceof Promise) {
            throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
          }
          return { status: status.value, value: result };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
            if (!isValid(base))
              return base;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
          });
        }
      }
      util.assertNever(effect);
    }
  };
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
      if (parsedType === ZodParsedType.undefined) {
        return OK(void 0);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
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
      if (parsedType === ZodParsedType.null) {
        return OK(null);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
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
      if (ctx.parsedType === ZodParsedType.undefined) {
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
      if (isAsync(result)) {
        return result.then((result2) => {
          return {
            status: "valid",
            value: result2.status === "valid" ? result2.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
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
              return new ZodError(newCtx.common.issues);
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
      if (parsedType !== ZodParsedType.nan) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.nan,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
  };
  ZodNaN.create = (params) => {
    return new ZodNaN({
      typeName: ZodFirstPartyTypeKind.ZodNaN,
      ...processCreateParams(params)
    });
  };
  var BRAND = Symbol("zod_brand");
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
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return DIRTY(inResult.value);
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
          return INVALID;
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
  var late = {
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
  })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
  var instanceOfType = (cls, params = {
    message: `Input not instance of ${cls.name}`
  }) => custom((data) => data instanceof cls, params);
  var stringType = ZodString.create;
  var numberType = ZodNumber.create;
  var nanType = ZodNaN.create;
  var bigIntType = ZodBigInt.create;
  var booleanType = ZodBoolean.create;
  var dateType = ZodDate.create;
  var symbolType = ZodSymbol.create;
  var undefinedType = ZodUndefined.create;
  var nullType = ZodNull.create;
  var anyType = ZodAny.create;
  var unknownType = ZodUnknown.create;
  var neverType = ZodNever.create;
  var voidType = ZodVoid.create;
  var arrayType = ZodArray.create;
  var objectType = ZodObject.create;
  var strictObjectType = ZodObject.strictCreate;
  var unionType = ZodUnion.create;
  var discriminatedUnionType = ZodDiscriminatedUnion.create;
  var intersectionType = ZodIntersection.create;
  var tupleType = ZodTuple.create;
  var recordType = ZodRecord.create;
  var mapType = ZodMap.create;
  var setType = ZodSet.create;
  var functionType = ZodFunction.create;
  var lazyType = ZodLazy.create;
  var literalType = ZodLiteral.create;
  var enumType = ZodEnum.create;
  var nativeEnumType = ZodNativeEnum.create;
  var promiseType = ZodPromise.create;
  var effectsType = ZodEffects.create;
  var optionalType = ZodOptional.create;
  var nullableType = ZodNullable.create;
  var preprocessType = ZodEffects.createWithPreprocess;
  var pipelineType = ZodPipeline.create;
  var ostring = () => stringType().optional();
  var onumber = () => numberType().optional();
  var oboolean = () => booleanType().optional();
  var coerce = {
    string: (arg) => ZodString.create({ ...arg, coerce: true }),
    number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
    boolean: (arg) => ZodBoolean.create({
      ...arg,
      coerce: true
    }),
    bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
    date: (arg) => ZodDate.create({ ...arg, coerce: true })
  };
  var NEVER = INVALID;
  var z2 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    defaultErrorMap: errorMap,
    setErrorMap,
    getErrorMap,
    makeIssue,
    EMPTY_PATH,
    addIssueToContext,
    ParseStatus,
    INVALID,
    DIRTY,
    OK,
    isAborted,
    isDirty,
    isValid,
    isAsync,
    get util() {
      return util;
    },
    get objectUtil() {
      return objectUtil;
    },
    ZodParsedType,
    getParsedType,
    ZodType,
    ZodString,
    ZodNumber,
    ZodBigInt,
    ZodBoolean,
    ZodDate,
    ZodSymbol,
    ZodUndefined,
    ZodNull,
    ZodAny,
    ZodUnknown,
    ZodNever,
    ZodVoid,
    ZodArray,
    ZodObject,
    ZodUnion,
    ZodDiscriminatedUnion,
    ZodIntersection,
    ZodTuple,
    ZodRecord,
    ZodMap,
    ZodSet,
    ZodFunction,
    ZodLazy,
    ZodLiteral,
    ZodEnum,
    ZodNativeEnum,
    ZodPromise,
    ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional,
    ZodNullable,
    ZodDefault,
    ZodCatch,
    ZodNaN,
    BRAND,
    ZodBranded,
    ZodPipeline,
    custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late,
    get ZodFirstPartyTypeKind() {
      return ZodFirstPartyTypeKind;
    },
    coerce,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    "enum": enumType,
    "function": functionType,
    "instanceof": instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    "null": nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean,
    onumber,
    optional: optionalType,
    ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    "undefined": undefinedType,
    union: unionType,
    unknown: unknownType,
    "void": voidType,
    NEVER,
    ZodIssueCode,
    quotelessJson,
    ZodError
  });

  // node_modules/langchain/dist/tools/base.js
  init_manager();
  init_base_language();
  var StructuredTool = class extends BaseLangChain {
    get lc_namespace() {
      return ["langchain", "tools"];
    }
    constructor(fields) {
      super(fields ?? {});
      Object.defineProperty(this, "returnDirect", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
    }
    async call(arg, configArg, tags) {
      const parsed = await this.schema.parseAsync(arg);
      const config = parseCallbackConfigArg(configArg);
      const callbackManager_ = await CallbackManager.configure(config.callbacks, this.callbacks, config.tags || tags, this.tags, config.metadata, this.metadata, { verbose: this.verbose });
      const runManager = await callbackManager_?.handleToolStart(this.toJSON(), typeof parsed === "string" ? parsed : JSON.stringify(parsed));
      let result;
      try {
        result = await this._call(parsed, runManager);
      } catch (e4) {
        await runManager?.handleToolError(e4);
        throw e4;
      }
      await runManager?.handleToolEnd(result);
      return result;
    }
  };
  var Tool = class extends StructuredTool {
    constructor(fields) {
      super(fields);
      Object.defineProperty(this, "schema", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: z2.object({ input: z2.string().optional() }).transform((obj) => obj.input)
      });
    }
    call(arg, callbacks) {
      return super.call(typeof arg === "string" || !arg ? { input: arg } : arg, callbacks);
    }
  };

  // node_modules/langchain/dist/tools/bingserpapi.js
  init_env();

  // node_modules/langchain/dist/tools/dynamic.js
  var DynamicTool = class extends Tool {
    constructor(fields) {
      super(fields);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "description", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "func", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.name = fields.name;
      this.description = fields.description;
      this.func = fields.func;
      this.returnDirect = fields.returnDirect ?? this.returnDirect;
    }
    async _call(input, runManager) {
      return this.func(input, runManager);
    }
  };

  // node_modules/langchain/dist/tools/json.js
  var import_jsonpointer = __toModule(require_jsonpointer());
  init_serializable();

  // node_modules/langchain/dist/tools/vectorstore.js
  init_vector_db_qa();

  // node_modules/langchain/dist/tools/zapier.js
  init_template();
  init_async_caller2();
  init_env();
  init_serializable();

  // node_modules/langchain/dist/tools/serper.js
  init_env();

  // node_modules/langchain/dist/tools/google_custom_search.js
  init_env();

  // node_modules/langchain/dist/tools/brave_search.js
  init_env();

  // node_modules/langchain/dist/tools/dataforseo_api_search.js
  init_env();

  // node_modules/langchain/dist/tools/searxng_search.js
  init_env();

  // google-search-tool.js
  var GoogleSearchTool = class extends s4 {
    constructor() {
      super();
    }
    render() {
      return x``;
    }
    async runWithInputs(input) {
      const { cx, apiKey } = input;
      let tool = new DynamicTool({
        name: "Google Search",
        description: "a search engine. useful for when you need to answer questions about current events. input should be a search query.",
        func: async (keywords) => {
          let snippets = "";
          if (keywords && cx && apiKey) {
            try {
              let res = await fetch(`https://www.googleapis.com/customsearch/v1?q=${keywords}&cx=${cx}&key=${apiKey}`);
              let json = await res.json();
              snippets = json.items.map((item) => item.snippet).join("\n");
            } catch (e4) {
              console.log("Unable to fetch URLs", e4);
            }
          }
          return snippets;
        }
      });
      this.dispatchEvent(new CustomEvent("outputs", { detail: { tool } }));
    }
  };
  customElements.define("google-search-tool", GoogleSearchTool);
  window.visualblocks.registerNodeSpec({
    "id": "google_search_tool",
    "runnerId": "google-search-tool",
    "name": "Google Search Tool",
    "description": "A custom tool that gives LangChain ability to access the newest information from a real-time web search!",
    "category": "model",
    "propertySpecs": [],
    "inputSpecs": [
      {
        "name": "cx",
        "displayLabel": "Search Engine ID",
        "type": "string"
      },
      {
        "name": "apiKey",
        "displayLabel": "API Key",
        "type": "string"
      }
    ],
    "outputSpecs": [
      {
        "name": "tool",
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
