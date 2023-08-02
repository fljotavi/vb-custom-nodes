(() => {
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

  // google-search.js
  var GoogleSearch = class extends s4 {
    constructor() {
      super();
    }
    render() {
      return x``;
    }
    async runWithInputs(input) {
      const { keywords, cx, apiKey } = input;
      let webpageUrls = [];
      if (keywords && cx && apiKey) {
        try {
          let res = await fetch(`https://www.googleapis.com/customsearch/v1?q=${keywords}&cx=${cx}&key=${apiKey}`);
          let json = await res.json();
          webpageUrls = json.items.map((item) => item.link);
        } catch (e4) {
          console.log("Unable to fetch URLs", e4);
        }
      }
      this.dispatchEvent(new CustomEvent("outputs", { detail: { webpageUrls } }));
    }
  };
  customElements.define("google-search", GoogleSearch);
  window.visualblocks.registerNodeSpec({
    "id": "google_search",
    "runnerId": "google-search",
    "name": "Google Search",
    "description": "Search webpages!",
    "category": "model",
    "propertySpecs": [],
    "inputSpecs": [
      {
        "name": "keywords",
        "type": "string"
      },
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
        "name": "webpageUrls",
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
