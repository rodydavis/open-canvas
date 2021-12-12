var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
const p$1 = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p$1();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$3 = Symbol(), n$4 = new Map();
class s$3 {
  constructor(t2, n2) {
    if (this._$cssResult$ = true, n2 !== e$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2;
  }
  get styleSheet() {
    let e2 = n$4.get(this.cssText);
    return t$2 && e2 === void 0 && (n$4.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$4 = (t2) => new s$3(typeof t2 == "string" ? t2 : t2 + "", e$3), r$2 = (t2, ...n2) => {
  const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
    if (t3._$cssResult$ === true)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t2[s2 + 1], t2[0]);
  return new s$3(o2, e$3);
}, i$3 = (e2, n2) => {
  t$2 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$1 = t$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$2 = window.trustedTypes, r$1 = e$2 ? e$2.emptyScript : "", h$1 = window.reactiveElementPolyfillSupport, o$3 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$1 : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, n$3 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: o$3, reflect: false, hasChanged: n$3 };
class a$1 extends HTMLElement {
  constructor() {
    super(), this._$Et = new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Eu = new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static _$Eh(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  o() {
    var t2;
    this._$Ep = new Promise((t3) => this.enableUpdating = t3), this._$AL = new Map(), this._$Em(), this.requestUpdate(), (t2 = this.constructor.l) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t2) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$3(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$ES(t2, i2, s2 = l$2) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t2, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$3.toAttribute)(i2, s2.type);
      this._$Ei = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t2);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t3 = h2.getPropertyOptions(n2), l2 = t3.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$3.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t3.type), this._$Ei = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$3)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$Ei !== t2 && (this._$E_ === void 0 && (this._$E_ = new Map()), this._$E_.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t3, i3) => this[i3] = t3), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (t3) {
      throw i2 = false, this._$EU(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$E_ !== void 0 && (this._$E_.forEach((t3, i2) => this._$ES(i2, this[i2], t3)), this._$E_ = void 0), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$1.finalized = true, a$1.elementProperties = new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = { mode: "open" }, h$1 == null || h$1({ ReactiveElement: a$1 }), ((s$2 = globalThis.reactiveElementVersions) !== null && s$2 !== void 0 ? s$2 : globalThis.reactiveElementVersions = []).push("1.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$2 = globalThis.trustedTypes, s$1 = i$2 ? i$2.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$1 = `lit$${(Math.random() + "").slice(9)}$`, o$2 = "?" + e$1, n$2 = `<${o$2}>`, l$1 = document, h = (t2 = "") => l$1.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea)$/i, $ = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), p = $(1), b = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), x = new WeakMap(), w = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$1.createTreeWalker(l$1, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, $2 = -1, p2 = 0;
    for (; p2 < s2.length && (d2.lastIndex = p2, u3 = d2.exec(s2), u3 !== null); )
      p2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, $2 = -1) : u3[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
    const y = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$2 : $2 >= 0 ? (l2.push(o3), s2.slice(0, $2) + "$lit$" + s2.slice($2) + e$1 + y) : s2 + e$1 + ($2 === -2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  return [s$1 !== void 0 ? s$1.createHTML(u2) : u2, l2];
};
class P {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = P.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$1)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$1), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$1), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$2 ? i$2.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$2)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$1, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$1.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function V(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = V(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class E {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = V(this, t2, i2), r(t2) ? t2 === T || t2 == null || t2 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.S(t2) : u(t2) ? this.M(t2) : this.$(t2);
  }
  A(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  S(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.A(t2));
  }
  $(t2) {
    this._$AH !== T && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.S(l$1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = P.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new E(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.S(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = x.get(t2.strings);
    return i2 === void 0 && x.set(t2.strings, i2 = new P(t2)), i2;
  }
  M(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.A(h()), this.A(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = V(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = V(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === T ? t2 = T : t2 !== T && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.k(t2);
  }
  k(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
const k = i$2 ? i$2.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t2) {
    t2 && t2 !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = V(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : T) === b)
      return;
    const e2 = this._$AH, o2 = t2 === T && e2 !== T || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== T && (e2 === T || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    V(this, t2);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(P, N), ((t$1 = globalThis.litHtmlVersions) !== null && t$1 !== void 0 ? t$1 : globalThis.litHtmlVersions = []).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o$1;
class s extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Dt = w(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, { LitElement: s });
const n$1 = globalThis.litElementPolyfillSupport;
n$1 == null || n$1({ LitElement: s });
((o$1 = globalThis.litElementVersions) !== null && o$1 !== void 0 ? o$1 : globalThis.litElementVersions = []).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t2, elements: i2 } = e3;
  return { kind: t2, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1 = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e(e2) {
  return (n2, t2) => t2 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i$1(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t(t2) {
  return e(__spreadProps(__spreadValues({}, t2), { state: true }));
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = ({ finisher: e2, descriptor: t2 }) => (o2, n2) => {
  var r2;
  if (n2 === void 0) {
    const n3 = (r2 = o2.originalKey) !== null && r2 !== void 0 ? r2 : o2.key, i2 = t2 != null ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n3 });
    return e2 != null && (i2.finisher = function(t3) {
      e2(t3, n3);
    }), i2;
  }
  {
    const r3 = o2.constructor;
    t2 !== void 0 && Object.defineProperty(o2, n2, t2(n2)), e2 == null || e2(r3, n2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i(i2, n2) {
  return o({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n3;
      return (n3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && n3 !== void 0 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = typeof o2 == "symbol" ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return this[n3] === void 0 && (this[n3] = (t3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && t3 !== void 0 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}
function colorNameToHex(color) {
  const d2 = document.createElement("div");
  d2.style.color = color;
  document.body.appendChild(d2);
  const rgb = window.getComputedStyle(d2).color;
  const [r2, g2, b2] = rgb.match(/\d+/g).map((v2) => parseInt(v2, 10));
  const componentToHex = (c2) => {
    const hex2 = c2.toString(16);
    return hex2.length == 1 ? "0" + hex2 : hex2;
  };
  const hex = `#${componentToHex(r2)}${componentToHex(g2)}${componentToHex(b2)}`;
  document.body.removeChild(d2);
  return hex;
}
function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i2 = 0; i2 < 6; i2++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getSizeFromElement(elem) {
  const xAttr = elem.getAttribute("x");
  const yAttr = elem.getAttribute("y");
  const widthAttr = elem.getAttribute("width");
  const heightAttr = elem.getAttribute("height");
  if (elem instanceof HTMLElement || elem instanceof SVGElement) {
    const style = getComputedStyle(elem);
    return {
      x: xAttr ? pxToNumber(xAttr) : pxToNumber(style.left),
      y: yAttr ? pxToNumber(yAttr) : pxToNumber(style.top),
      width: widthAttr ? pxToNumber(widthAttr) : pxToNumber(style.width),
      height: heightAttr ? pxToNumber(heightAttr) : pxToNumber(style.height)
    };
  }
  const bounds = elem.getBoundingClientRect();
  return {
    x: xAttr ? pxToNumber(xAttr) : bounds.left,
    y: yAttr ? pxToNumber(yAttr) : bounds.top,
    width: widthAttr ? pxToNumber(widthAttr) : bounds.width,
    height: heightAttr ? pxToNumber(heightAttr) : bounds.height
  };
}
function pxToNumber(value) {
  return Number(value.replace("px", ""));
}
function drawGridBackground(ctx, size, offset, scale) {
  ctx.save();
  const { width, height } = size;
  const r2 = 2;
  const gridSize = 25 * scale;
  const gridOffsetDx = offset.x % gridSize;
  const gridOffsetDy = offset.y % gridSize;
  for (let x2 = gridOffsetDx; x2 < width; x2 += gridSize) {
    for (let y = gridOffsetDy; y < height; y += gridSize) {
      ctx.fillStyle = "#000";
      ctx.fillRect(x2 - r2 / 2, y - r2 / 2, r2, r2);
    }
  }
  ctx.restore();
}
const DEFAULT_MATRIX = [1, 0, 0, 1, 0, 0];
const DEFAULT_INVERSE_MATRIX = [1, 0, 0, 1];
const defaultMatrix = createMatrix({ x: 0, y: 0 }, 1, 0);
function createMatrix(offset, scale, rotation) {
  const m2 = [...DEFAULT_MATRIX];
  const im = [...DEFAULT_INVERSE_MATRIX];
  m2[3] = m2[0] = Math.cos(rotation) * scale;
  m2[2] = -(m2[1] = Math.sin(rotation) * scale);
  m2[4] = offset.x;
  m2[5] = offset.y;
  const cross = m2[0] * m2[3] - m2[1] * m2[2];
  im[0] = m2[3] / cross;
  im[1] = -m2[1] / cross;
  im[2] = -m2[2] / cross;
  im[3] = m2[0] / cross;
  return {
    matrix: m2,
    inverseMatrix: im
  };
}
function toWorld(context, offset) {
  let xx, yy, m2;
  m2 = context.inverseMatrix;
  xx = offset.x - context.matrix[4];
  yy = offset.y - context.matrix[5];
  const localX = xx * m2[0] + yy * m2[2];
  const localY = xx * m2[1] + yy * m2[3];
  return {
    x: localX,
    y: localY
  };
}
function matrixInfo(context) {
  const rotation = rotationFromMatrix(context);
  const { scale } = scaleFromMatrix(context);
  const offset = offsetFromMatrix(context);
  return {
    rotation,
    scale,
    offset
  };
}
function rotationFromMatrix(context) {
  const matrix = context.matrix;
  const rad = Math.atan2(matrix[1], matrix[0]);
  return rad;
}
function scaleFromMatrix(context) {
  const matrix = context.matrix;
  const scaleX = Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
  const scaleY = Math.sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]);
  return {
    scaleX,
    scaleY,
    scale: Math.max(scaleX, scaleY)
  };
}
function offsetFromMatrix(context) {
  const matrix = context.matrix;
  return {
    x: matrix[4],
    y: matrix[5]
  };
}
function applyMatrix(ctx, context) {
  const m2 = context.matrix;
  ctx.setTransform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
}
function paintCircle(ctx, node) {
  const { x: x2, y, width, height } = getSizeFromElement(node);
  const fillColor = node.getAttribute("fill");
  const strokeColor = node.getAttribute("stroke");
  const strokeWidth = node.getAttribute("stroke-width");
  const cx = node.getAttribute("cx") || "50";
  const cy = node.getAttribute("cy") || "50";
  const r2 = node.getAttribute("r") || "50";
  ctx.save();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x2 + width * parseFloat(cx) / 100, y + height * parseFloat(cy) / 100, width * parseFloat(r2) / 100, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth ? parseFloat(strokeWidth) : 1;
    ctx.beginPath();
    ctx.arc(x2 + width * parseFloat(cx) / 100, y + height * parseFloat(cy) / 100, width * parseFloat(r2) / 100, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}
function paintG(ctx, node) {
  const { x: x2, y, width, height } = getSizeFromElement(node);
  const fillColor = node.getAttribute("fill");
  const strokeColor = node.getAttribute("stroke");
  const strokeWidth = node.getAttribute("stroke-width");
  ctx.save();
  const children = Array.from(node.children);
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x2, y, width, height);
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth ? parseFloat(strokeWidth) : 1;
    ctx.strokeRect(x2, y, width, height);
  }
  ctx.translate(x2, y);
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.clip();
  for (const child of children) {
    paintNode(ctx, child);
  }
  ctx.restore();
}
function paintRect(ctx, node) {
  const { x: x2, y, width, height } = getSizeFromElement(node);
  const fillColor = node.getAttribute("fill");
  const strokeColor = node.getAttribute("stroke");
  const strokeWidth = node.getAttribute("stroke-width");
  ctx.save();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x2, y, width, height);
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth ? parseFloat(strokeWidth) : 1;
    ctx.strokeRect(x2, y, width, height);
  }
  ctx.restore();
}
const svgShapes = [
  "rect",
  "circle",
  "ellipse",
  "line",
  "polygon",
  "svg",
  "g"
];
function paintSvg(ctx, node) {
  const svg = node;
  paintG(ctx, svg);
}
class CanvasNode {
  constructor(child) {
    this.child = child;
  }
  get tag() {
    return this.child.nodeName.toLowerCase();
  }
  get rect() {
    return getSizeFromElement(this.child);
  }
  paint(ctx) {
    paintNode(ctx, this.child);
    this.paintBackground(ctx);
  }
  paintBackground(ctx) {
    ctx.save();
    const { x: x2, y, width, height } = this.rect;
    if (this.child.hasAttribute("selected")) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(x2, y, width, height);
    }
    ctx.restore();
  }
}
function paintNode(ctx, child) {
  const tag = child.nodeName.toLowerCase();
  switch (tag) {
    case "rect":
      return paintRect(ctx, child);
    case "g":
      return paintG(ctx, child);
    case "circle":
      return paintCircle(ctx, child);
    case "svg":
      return paintSvg(ctx, child);
  }
}
function randomNode() {
  const node = document.createElement("rect");
  node.setAttribute("x", "0");
  node.setAttribute("y", "0");
  node.setAttribute("width", "100");
  node.setAttribute("height", "100");
  node.setAttribute("fill", randomColor());
  return node;
}
function getNodes(elements) {
  return elements.map((child) => new CanvasNode(child));
}
class BaseCommand {
  constructor(name) {
    this.name = name;
  }
  toEvent() {
    return new CustomEvent("command", {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        execute: this.execute.bind(this)
      }
    });
  }
  dispatch(target) {
    target.dispatchEvent(this.toEvent());
  }
}
class UpdateSelection extends BaseCommand {
  constructor(indices) {
    super("update-selection");
    this.indices = indices;
  }
  execute(app) {
    app.selection = this.indices;
    for (const item of app.items) {
      selectAll(item, this.indices);
    }
    app.canvas.paint();
  }
}
function selectAll(element, selection) {
  if (selection.includes(element)) {
    element.setAttribute("selected", "");
  } else {
    element.removeAttribute("selected");
  }
  const children = Array.from(element.children);
  for (const child of children) {
    selectAll(child, selection);
  }
}
class AddNode extends BaseCommand {
  constructor() {
    super("add-node");
  }
  execute(app) {
    const node = randomNode();
    app.appendChild(node);
    app.items.push(node);
    app.canvas.paint();
    app.layers.requestUpdate();
    const lastIdx = app.items.length - 1;
    app.addCommand(new UpdateSelection([app.items[lastIdx]]));
  }
}
class PanCanvas extends BaseCommand {
  constructor(delta) {
    super("pan-canvas");
    this.delta = delta;
  }
  execute(app) {
    const { offset, scale, rotation } = matrixInfo(app.canvas.context);
    let localOffset = offset;
    localOffset.x += this.delta.x / scale;
    localOffset.y += this.delta.y / scale;
    app.canvas.context = createMatrix(localOffset, scale, rotation);
  }
}
class UpdateNode extends BaseCommand {
  constructor(node, index) {
    super("update-node");
    this.node = node;
    this.index = index;
  }
  execute(app) {
    const node = this.node;
    const index = this.index;
    app.items[index] = node;
    app.canvas.paint();
    app.layers.requestUpdate();
    app.properties.requestUpdate();
  }
}
class ZoomCanvas extends BaseCommand {
  constructor(delta) {
    super("zoom-canvas");
    this.delta = delta;
  }
  execute(app) {
    const { scale, offset, rotation } = matrixInfo(app.canvas.context);
    let localScale = scale;
    localScale += this.delta;
    app.canvas.context = createMatrix(offset, localScale, rotation);
  }
}
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
let CanvasToolbar = class extends s {
  constructor() {
    super(...arguments);
    this.label = document.title;
  }
  render() {
    return p`<header>
      <span class="title">${this.label}</span>
      <button class="action" @click=${() => new AddNode().dispatch(this)}>
        +
      </button>
    </header>`;
  }
};
CanvasToolbar.styles = r$2`
    header {
      width: var(--canvas-toolbar-width);
      height: var(--canvas-toolbar-height);
      background-color: var(--canvas-toolbar-background-color, black);
      color: var(--canvas-toolbar-color, white);
      border-bottom: var(--canvas-toolbar-border-bottom, 1px solid white);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    span.title {
      margin-left: var(--canvas-toolbar-margin-left, 10px);
      font-family: var(--canvas-toolbar-font-family, sans-serif);
      font-size: var(--canvas-toolbar-font-size, 20px);
      font-weight: var(--canvas-toolbar-font-weight, bold);
    }
    button.action {
      margin-right: var(--canvas-toolbar-margin-right, 10px);
    }
  `;
__decorateClass$4([
  e({ type: String })
], CanvasToolbar.prototype, "label", 2);
CanvasToolbar = __decorateClass$4([
  n("canvas-toolbar")
], CanvasToolbar);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
let CanvasLayers = class extends s {
  constructor() {
    super(...arguments);
    this.items = [];
    this.selection = [];
  }
  render() {
    const items = getNodes(this.items);
    return p`<section>
      <ul>
        ${items.map((e2) => this.renderGroup(e2.child))}
      </ul>
    </section>`;
  }
  renderGroup(element) {
    const children = Array.from(element.children);
    return p`<li
        ?selected=${element.hasAttribute("selected")}
        @click=${() => this.onSelectNodes([element])}
      >
        ${this.getTitle(element)}
      </li>
      ${children.length === 0 ? "" : p`<ul>
            ${children.map((e2) => {
      return p`<li
                ?selected=${e2.hasAttribute("selected")}
                @click=${() => this.onSelectNodes([e2])}
              >
                ${this.getTitle(e2)}
              </li>`;
    })}
          </ul>`} `;
  }
  getTitle(element) {
    var _a;
    return (_a = element.getAttribute("title")) != null ? _a : element.tagName.toLowerCase();
  }
  onSelectNodes(indices) {
    this.selection = indices;
    new UpdateSelection(indices).dispatch(this);
  }
};
CanvasLayers.styles = r$2`
    section {
      width: var(--canvas-layers-width);
      height: var(--canvas-layers-height);
      background-color: var(--canvas-layers-background-color, #fff);
      color: var(--canvas-layers-color, #000);
      border-right: var(--canvas-layers-border-right, 1px solid #000);
      overflow-y: auto;
    }
    li {
      cursor: pointer;
    }
    li[selected] {
      color: var(--canvas-layers-selected-background-color, red);
    }
  `;
__decorateClass$3([
  e({ type: Array })
], CanvasLayers.prototype, "items", 2);
__decorateClass$3([
  e({ type: Array })
], CanvasLayers.prototype, "selection", 2);
CanvasLayers = __decorateClass$3([
  n("canvas-layers")
], CanvasLayers);
class OnPointerMove extends BaseCommand {
  constructor(event) {
    super("on-pointer-move");
    this.event = event;
  }
  execute(app) {
    const e2 = this.event;
    e2.preventDefault();
    if (app.canvas.pointers.get(e2.pointerId)) {
      app.canvas.pointers.set(e2.pointerId, { x: e2.offsetX, y: e2.offsetY });
      const { scale } = matrixInfo(app.canvas.context);
      const md = { x: e2.movementX / scale, y: e2.movementY / scale };
      for (const item of app.canvas.selection) {
        const realIdx = app.canvas.items.indexOf(item);
        const rect = getSizeFromElement(item);
        const newX = rect.x + md.x;
        const newY = rect.y + md.y;
        item.setAttribute("x", newX.toString());
        item.setAttribute("y", newY.toString());
        new UpdateNode(item, realIdx).dispatch(app);
      }
    }
  }
}
class OnPointerDown extends BaseCommand {
  constructor(event) {
    super("on-pointer-down");
    this.event = event;
  }
  execute(app) {
    const e2 = this.event;
    e2.preventDefault();
    app.canvas.canvas.setPointerCapture(e2.pointerId);
    app.canvas.pointers.set(e2.pointerId, { x: e2.offsetX, y: e2.offsetY });
    const items = getNodes(app.canvas.items);
    app.canvas.selection = [];
    for (let i2 = 0; i2 < items.length; i2++) {
      const item = items[i2];
      const { x: x2, y, width, height } = item.rect;
      const mo = toWorld(app.canvas.context, { x: e2.offsetX, y: e2.offsetY });
      if (mo.x >= x2 && mo.x <= x2 + width && mo.y >= y && mo.y <= y + height) {
        app.canvas.selection.push(item.child);
      }
    }
    app.canvas.selection = app.canvas.selection.reverse();
    app.canvas.selection = app.canvas.selection.slice(0, 1);
    new UpdateSelection(app.canvas.selection).dispatch(app);
  }
}
class OnPointerUp extends BaseCommand {
  constructor(event) {
    super("on-pointer-up");
    this.event = event;
  }
  execute(app) {
    const e2 = this.event;
    e2.preventDefault();
    app.canvas.canvas.releasePointerCapture(e2.pointerId);
    app.canvas.pointers.delete(e2.pointerId);
  }
}
class OnWheel extends BaseCommand {
  constructor(event) {
    super("on-wheel");
    this.event = event;
  }
  execute(app) {
    const e2 = this.event;
    e2.preventDefault();
    const { scale } = matrixInfo(app.canvas.context);
    if (e2.ctrlKey) {
      const scaleDelta = -e2.deltaY * 0.01;
      if (scale + scaleDelta > app.canvas.minScale && scale + scaleDelta < app.canvas.maxScale) {
        new ZoomCanvas(scaleDelta).dispatch(app);
      }
    } else {
      const offset = { x: -e2.deltaX * 2 * scale, y: -e2.deltaY * 2 * scale };
      new PanCanvas(offset).dispatch(app);
    }
    app.canvas.paint();
  }
}
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let CanvasView = class extends s {
  constructor() {
    super(...arguments);
    this.minScale = 0.25;
    this.maxScale = 4;
    this.items = [];
    this.selection = [];
    this.context = defaultMatrix;
    this.pointers = new Map();
  }
  render() {
    return p`<canvas
      @pointerup=${(e2) => new OnPointerUp(e2).dispatch(this)}
      @pointerdown=${(e2) => new OnPointerDown(e2).dispatch(this)}
      @pointermove=${(e2) => new OnPointerMove(e2).dispatch(this)}
      @wheel=${(e2) => new OnWheel(e2).dispatch(this)}
    ></canvas>`;
  }
  get ctx() {
    return this.canvas.getContext("2d");
  }
  firstUpdated() {
    this.paint();
  }
  paint() {
    const style = getComputedStyle(this);
    const width = this.canvas.width = pxToNumber(style.width);
    const height = this.canvas.height = pxToNumber(style.height);
    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height);
    const { scale, offset } = matrixInfo(this.context);
    const size = { width, height };
    drawGridBackground(this.ctx, size, offset, scale);
    applyMatrix(this.ctx, this.context);
    const items = getNodes(this.items);
    for (const node of items) {
      node.paint(this.ctx);
    }
    this.ctx.restore();
  }
};
CanvasView.styles = r$2``;
__decorateClass$2([
  e({ type: Number, attribute: "min-scale" })
], CanvasView.prototype, "minScale", 2);
__decorateClass$2([
  e({ type: Number, attribute: "max-scale" })
], CanvasView.prototype, "maxScale", 2);
__decorateClass$2([
  e({ type: Array })
], CanvasView.prototype, "items", 2);
__decorateClass$2([
  e({ type: Array })
], CanvasView.prototype, "selection", 2);
__decorateClass$2([
  i("canvas")
], CanvasView.prototype, "canvas", 2);
__decorateClass$2([
  t()
], CanvasView.prototype, "context", 2);
CanvasView = __decorateClass$2([
  n("canvas-view")
], CanvasView);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let CanvasProperties = class extends s {
  constructor() {
    super(...arguments);
    this.items = [];
    this.selection = [];
  }
  render() {
    return p`<section>
      ${this.selection.length === 0 ? this.renderEmptySelection() : this.selection.length === 1 ? this.renderSingleSelection() : this.renderMultipleSelection()}
    </section>`;
  }
  renderEmptySelection() {
    return p` <h1>Properties</h1>
      <p>No selection</p>`;
  }
  renderSingleSelection() {
    const item = this.selection[this.selection.length - 1];
    const isShape = svgShapes.includes(item.tagName.toLowerCase());
    return p`<h2>${item.tagName}</h2>
      ${this.renderProperty("Description", "title", item, {
      type: "text"
    })}
      ${isShape ? this.renderShapeProperties(item) : ""} `;
  }
  renderMultipleSelection() {
    const items = this.selection;
    return p`
      <h1>Properties</h1>
      <ul>
        ${items.map((item) => p`<li>${item.tagName}</li>`)}
      </ul>
    `;
  }
  renderShapeProperties(element) {
    return p`
      <h4>Position</h4>
      <form>
        ${this.renderProperty("X", "x", element, {
      type: "number"
    })}
        ${this.renderProperty("Y", "y", element, {
      type: "number"
    })}
        ${this.renderProperty("WIdth", "width", element, {
      type: "number"
    })}
        ${this.renderProperty("Height", "height", element, {
      type: "number"
    })}
      </form>
      <h4>Style</h4>
      <form>
        ${this.renderProperty("Background Color", "fill", element, {
      type: "color"
    })}
        ${this.renderProperty("Stroke Color", "stroke", element, {
      type: "color"
    })}
        ${this.renderProperty("Stroke Width", "stroke-width", element, {
      type: "number"
    })}
      </form>
    `;
  }
  renderProperty(label, key, element, options) {
    var _a, _b, _c;
    let value = (_b = (_a = element.getAttribute(key)) != null ? _a : options == null ? void 0 : options.fallback) != null ? _b : "";
    if ((options == null ? void 0 : options.type) === "color" && !value.startsWith("#")) {
      value = colorNameToHex(value);
    }
    return p`<div class="property">
      <label for="${key}">${label}:</label>
      <input
        id="key"
        type="${(_c = options == null ? void 0 : options.type) != null ? _c : "text"}"
        .value="${value}"
        @input=${(e2) => {
      const input = e2.target;
      element.setAttribute(key, input.value);
      new UpdateNode(element, this.items.indexOf(element)).dispatch(this);
    }}
      />
    </div> `;
  }
};
CanvasProperties.styles = r$2`
    section {
      width: var(--canvas-properties-width);
      height: var(--canvas-properties-height);
      background-color: var(--canvas-properties-background-color, #fff);
      color: var(--canvas-properties-color, #000);
      border-left: var(--canvas-properties-border-left, 1px solid #000);
      overflow-y: auto;
      padding: var(--canvas-properties-padding, 10px);
    }
    .property {
      margin-bottom: var(--canvas-properties-margin-bottom, 10px);
    }
  `;
__decorateClass$1([
  e({ type: Array })
], CanvasProperties.prototype, "items", 2);
__decorateClass$1([
  e({ type: Array })
], CanvasProperties.prototype, "selection", 2);
CanvasProperties = __decorateClass$1([
  n("canvas-properties")
], CanvasProperties);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let CanvasApp = class extends s {
  constructor() {
    super(...arguments);
    this.items = Array.from(this.children);
    this.selection = [];
    this.debug = false;
  }
  render() {
    return p`<main>
      <canvas-toolbar></canvas-toolbar>
      <canvas-layers
        .items=${this.items}
        .selection=${this.selection}
      ></canvas-layers>
      <canvas-view
        .items=${this.items}
        .selection=${this.selection}
      ></canvas-view>
      <canvas-properties
        .items=${this.items}
        .selection=${this.selection}
      ></canvas-properties>
    </main> `;
  }
  firstUpdated() {
    window.addEventListener("resize", () => this.resize());
    this.addEventListener("command", (e2) => {
      const event = e2;
      const command = event.detail;
      if (this.debug)
        console.debug("command", command.name);
      command.execute(this);
    });
  }
  resize() {
    this.canvas.paint();
  }
  addCommand(command) {
    command.execute(this);
  }
};
CanvasApp.styles = r$2`
    main {
      --canvas-toolbar-width: 100%;
      --canvas-toolbar-height: 50px;
      --canvas-properties-width: 280px;
      --canvas-properties-height: calc(100vh - var(--canvas-toolbar-height));
      --canvas-layers-width: 230px;
      --canvas-layers-height: calc(100vh - var(--canvas-toolbar-height));
      --canvas-view-width: calc(
        100% - var(--canvas-layers-width) - var(--canvas-properties-width)
      );
      --canvas-view-height: calc(100vh - var(--canvas-toolbar-height));
      display: grid;
      grid-template-columns:
        var(--canvas-layers-width)
        var(--canvas-view-width)
        var(--canvas-properties-width);
      grid-template-rows: var(--canvas-toolbar-height) var(--canvas-view-height);
      grid-template-areas:
        "toolbar toolbar toolbar"
        "layers view properties";
    }

    canvas-toolbar {
      grid-area: toolbar;
    }

    canvas-layers {
      grid-area: layers;
    }

    canvas-view {
      grid-area: view;
    }

    canvas-properties {
      grid-area: properties;
    }
  `;
__decorateClass([
  i("main")
], CanvasApp.prototype, "main", 2);
__decorateClass([
  i("canvas-view")
], CanvasApp.prototype, "canvas", 2);
__decorateClass([
  i("canvas-layers")
], CanvasApp.prototype, "layers", 2);
__decorateClass([
  i("canvas-properties")
], CanvasApp.prototype, "properties", 2);
__decorateClass([
  t()
], CanvasApp.prototype, "items", 2);
__decorateClass([
  t()
], CanvasApp.prototype, "selection", 2);
__decorateClass([
  e({ type: Boolean, attribute: "debug" })
], CanvasApp.prototype, "debug", 2);
CanvasApp = __decorateClass([
  n("canvas-app")
], CanvasApp);
