/*! For license information please see dd.min.js.LICENSE.txt */
(() => {
  "use strict";
  let e = null;
  class t {
    constructor(e, t) {
      (this.ele = e),
        (this._settings = {
          byJson: {
            data: null,
            selectedIndex: 0,
            name: null,
            size: 0,
            multiple: !1,
            width: 250,
          },
          mainCss: "ms-dd",
          rowHeight: null,
          visibleRows: null,
          showIcon: !0,
          zIndex: 9999,
          event: "click",
          style: "",
          childWidth: null,
          childHeight: null,
          enableCheckbox: !1,
          checkboxNameSuffix: "_mscheck",
          showPlusItemCounter: !0,
          enableAutoFilter: !0,
          showFilterAlways: !1,
          showListCounter: !1,
          imagePosition: "left",
          errorMessage: "Please select an item from this list",
          on: {
            create: null,
            open: null,
            close: null,
            add: null,
            remove: null,
            change: null,
            blur: null,
            click: null,
            dblclick: null,
            mousemove: null,
            mouseover: null,
            mouseout: null,
            focus: null,
            mousedown: null,
            mouseup: null,
          },
          ...t,
        }),
        (this._css = {}),
        (this._onDocumentClick = null),
        (this._onDocumentKeyDown = null),
        (this._onDocumentKeyUp = null),
        (this._isOpen = !1),
        (this._DOWN_ARROW = 40),
        (this._UP_ARROW = 38),
        (this._LEFT_ARROW = 37),
        (this._RIGHT_ARROW = 39),
        (this._ESCAPE = 27),
        (this._ENTER = 13),
        (this._ALPHABETS_START = 47),
        (this._SHIFT = 16),
        (this._CONTROL = 17),
        (this._MAC_CONTROL = 91),
        (this._BACKSPACE = 8),
        (this._DELETE = 46),
        (this._SPACE = 32),
        (this._shiftHolded = !1),
        (this._controlHolded = !1),
        (this._isFirstTime = !0),
        (this._cacheEle = {}),
        (this._isMouseDown = !1),
        (this._itemsArr = []),
        (this._css = {
          dd: this._settings.mainCss + " ms-pr",
          wrapperDisabled: "disabled",
          headerA: "ms-list-option option-selected",
          header: "ms-dd-header",
          headerMiddleContent: "ms-header-middle-content",
          arrow: "ms-dd-arrow",
          arrowDown: "ms-dd-pointer-down",
          arrowUp: "ms-dd-pointer-up",
          headerCounter: "ms-header-counter",
          listOfItems: "ms-options",
          itemContent: "ms-dd-option-content",
          item: "ms-list-option",
          itemSpan: "ms-middle",
          itemSpanOpt: "ms-optgroup-padding",
          itemLabel: "ms-dd-label",
          itemImage: "ms-dd-option-image",
          itemDesc: "ms-dd-desc",
          itemSelected: "option-selected",
          itemDisabled: "disabled",
          itemEnabled: "enabled",
          optgroup: "ms-optgroup",
          listCounter: "ms-list-counter",
          valueInput: "ms-value-input",
          checkbox: "ms-checkbox",
          imageRight: "ico-align-right",
        }),
        (this._wrapper = {}),
        this._createByJson(),
        this._checkDataSettings(),
        (this._isList = this.ele.size > 1),
        (this._isMultiple = this.ele.multiple),
        (this._enableCheckbox = this._settings.enableCheckbox),
        (this._isList || "true" === this._enableCheckbox.toString()) &&
          (this._isMultiple = this.ele.multiple = !0),
        (this._isFilterApplied = !1),
        (this._nexPrevCounter = 0),
        this._init();
    }
    _init() {
      this._makeLayout(),
        this._updateUiAndValueByIndex(this.selectedIndex),
        this.ele.size > 1 &&
          (this._makeUiAsList(!0, this.ele.size), this._scrollToItem()),
        null !== this._settings.childWidth &&
          (this._wrapper.listOfItems.style.width = this._settings.childWidth),
        this._showHideOriginal(!1),
        "true" === this._settings.showFilterAlways.toString() &&
          ((this._settings.enableAutoFilter = !0), this._showHideFilterBox(!0)),
        this.ele.autofocus
          ? (this._wrapper.holder.focus(), this._wrapper.filterInput.focus())
          : this._wrapper.filterInput.blur(),
        this.updateUiAndValue(),
        this._fireLocalEventIfExist("create"),
        this._fireEventIfExist("onCreate");
    }
    _showHideOriginal(e = !0) {
      e ? this._show(this.ele) : this._hide(this.ele);
    }
    _checkDataSettings() {
      let e = this._getDataSet(this.ele),
        t = this._settings;
      (t.mainCss = e?.mainCss || t.mainCss),
        (t.showIcon = e?.showIcon || t.showIcon),
        (t.event = e?.event || t.event),
        (t.childWidth = e?.childWidth || t.childWidth),
        (t.childHeight = e?.childHeight || t.childHeight),
        (t.enableCheckbox = e?.enableCheckbox || t.enableCheckbox),
        (t.checkboxNameSuffix = e?.checkboxNameSuffix || t.checkboxNameSuffix),
        (t.enableAutoFilter = e?.enableAutoFilter || t.enableAutoFilter),
        (t.visibleRows = e?.visibleRows || t.visibleRows),
        (t.showPlusItemCounter =
          e?.showPlusItemCounter || t.showPlusItemCounter),
        (t.errorMessage = e?.errorMessage || t.errorMessage),
        (t.showFilterAlways = e?.showFilterAlways || t.showFilterAlways),
        (t.showListCounter = e?.showListCounter || t.showListCounter),
        (t.imagePosition = e?.imagePosition || t.imagePosition),
        (this._settings = { ...this._settings, ...t });
    }
    setSettingAttribute(e, t) {
      this._settings[e] = t;
    }
    _createByJson() {
      if (this._settings.byJson.data)
        try {
          let e = this._settings.byJson,
            t = {};
          (t.name = e.name || this.ele.id || ""),
            e.size > 0 && (t.size = e.size),
            e.multiple && (t.multiple = e.multiple);
          let s = this._createEle("select", t),
            i = e.data.length;
          for (let t = 0; t < i; t++) {
            let i = e.data[t],
              l = new Option(i.text, i.value);
            i.disabled && (l.disabled = !0);
            for (let e in i)
              if (i.hasOwnProperty(e) && "text" !== e.toLowerCase()) {
                let t = `data-${e}`;
                (t = t.replace(/([A-Z])/g, "-$1").toLowerCase()),
                  l.setAttribute(t, i[e]);
              }
            s.options[t] = l;
          }
          this.ele.appendChild(s),
            (s.selectedIndex = e.selectedIndex),
            e.width && (this.ele.style.width = e.width + "px"),
            (this.ele = s);
        } catch (e) {
          throw "There is an error in json data.";
        }
    }
    _scrollToItem(e, t = "smooth") {
      (e = e || this.uiData.ui) &&
        ((e = e.length > 1 ? e[0] : e), this._scrollToIfNeeded(e));
    }
    _showHideFilterBox(e = !0) {
      e
        ? (this._show(this._wrapper.filterHolder),
          this._wrapper.filterInput.focus(),
          "false" === this._settings.showFilterAlways.toString() &&
            this._hide(this._wrapper.headerA))
        : ((this._wrapper.filterInput.value = ""),
          this._hide(this._wrapper.filterHolder),
          this._show(this._wrapper.headerA));
    }
    _applyFilters(e) {
      let t = this._wrapper.filterInput.value;
      if (0 === t.length)
        this._show(this._wrapper.headerA),
          this._makeChildren(),
          (this._isFilterApplied = !1);
      else {
        "false" === this._settings.showFilterAlways.toString() &&
          this._hide(this._wrapper.headerA),
          this._isOpen || this.open(null);
        let e = [...this.options].filter(function (e) {
          return (
            "OPTGROUP" !== e.nodeName &&
            !1 === e.disabled &&
            e.text.toLowerCase().indexOf(t.toLowerCase()) >= 0
          );
        });
        this._makeChildren(e),
          (this._isFilterApplied = !0),
          (this._nexPrevCounter = -1),
          this._scrollToIfNeeded(null, 0);
      }
    }
    _makeFilterBox() {
      let e = this._createEle("div", { className: "ms-filter-box" }),
        t = this._createEle("input", { type: "text" });
      return (
        e.appendChild(t),
        (this._wrapper.filterInput = t),
        (this._wrapper.filterHolder = e),
        this._bindEvents(t, "input", (e) => {
          this._applyFilters(e);
        }),
        e
      );
    }
    _makeHeader() {
      let e = this._css,
        t = this._createEle("div", { className: e.header }),
        s = this._createEle("a", { className: e.headerA }),
        i = this._createEle("span", { className: e.headerMiddleContent }),
        l = this._createEle("span", { className: e.arrow + " " + e.arrowDown });
      return (
        s.appendChild(l),
        s.appendChild(i),
        t.appendChild(s),
        (this._wrapper.header = t),
        (this._wrapper.headerA = s),
        (this._wrapper.headerContent = i),
        (this._wrapper.arrow = l),
        "left" !== this._settings.imagePosition &&
          s.classList.add(e.imageRight),
        this._bindEvents(t, this._settings.event, (e) => {
          this.open(e);
        }),
        t
      );
    }
    _makeChildren(e = null) {
      let t,
        s = this._css,
        i = "true" === this._enableCheckbox.toString(),
        l = this,
        n = function (e, t) {
          let n = {};
          return (
            (n = l._parseOption(e)),
            {
              opt: n,
              itemObj: {
                label: { text: n.text, css: s.itemLabel },
                img: { src: n.image, css: s.itemImage },
                desc: { text: n.description, css: s.itemDesc },
                isDisabled: e.disabled || !1,
                isSelected: e.selected || !1,
                isCheckbox: i,
                value: n.value,
                title: n.title,
                imageCss: `${n.imageCss} ${n.className}`,
                counter: t + 1,
                isOptGroup: "OPTGROUP" === e.nodeName,
                innerSpanCss: s.itemContent,
              },
            }
          );
        },
        r = function (e, t) {
          t.isDisabled ||
            (l._bindEvents(e, "mouseup", (e) => {
              (l._isMouseDown = !1),
                (i && "INPUT" === e.target.nodeName) || l._isList || l.close(e);
            }),
            l._bindEvents(e, "mousedown", (t) => {
              if (((l._isMouseDown = !0), i && "INPUT" === t.target.nodeName))
                l._setSelectedByItemToggle(e._refCheckbox, e);
              else if (l._shiftHolded && l._isMultiple) {
                let t = l.selectedIndex,
                  s = e.index;
                l._setSelectedByIndexFromTo(t, s);
              } else
                l._controlHolded && l._isMultiple
                  ? l._setSelectedByItem(e, !1, !1)
                  : l._setSelectedByItem(e);
            }),
            l._bindEvents(e, "mouseover", (t) => {
              l._isMouseDown &&
                l._isMultiple &&
                l._setSelectedByItem(e, !1, !1);
            }));
        };
      this._wrapper.listOfItems
        ? (t = this._wrapper.listOfItems)
        : ((t = this._createEle("ul", {
            className: s.listOfItems,
            zIndex: this._settings.zIndex,
          })),
          (this._wrapper.listOfItems = t)),
        (t.innerHTML = "");
      let a = null === e ? this.ele.children : e,
        h = a.length;
      for (let e = 0; e < h; e++) {
        let i = a[e],
          l = n(i, e),
          h = l.opt,
          d = l.itemObj,
          o = this._createRow(d);
        if (
          ("" !== h.className &&
            (o.className = o.className + " " + h.className),
          "" !== h.internalStyle && (o.style = h.internalStyle),
          (o.index = h.index),
          o.setAttribute("data-ms-index", h.index),
          d.isOptGroup)
        ) {
          let e = i.children,
            t = e.length,
            l = this._createEle("ul");
          for (let i = 0; i < t; i++) {
            let t = n(e[i], i),
              a = t.opt,
              h = t.itemObj,
              d = this._createRow(h);
            "" !== a.className &&
              (d.className = d.className + " " + a.className),
              "" !== a.internalStyle && (d.style = a.internalStyle),
              (d.index = a.index),
              d.setAttribute("data-ms-index", a.index),
              h.isSelected && this._setSelectedByItem(d, !0),
              r(d, h),
              "left" !== this._settings.imagePosition &&
                d.classList.add(s.imageRight),
              l.appendChild(d);
          }
          o.appendChild(l);
        }
        d.isOptGroup || r(o, d),
          "left" !== this._settings.imagePosition &&
            o.classList.add(s.imageRight),
          t.appendChild(o),
          d.isSelected && this._setSelectedByItem(o, !0);
      }
      return (
        null !== this._settings.childHeight &&
          (t.style.maxHeight = this._settings.childHeight + "px"),
        t
      );
    }
    _makeLayout() {
      this.ele.tabIndex = -1;
      let t = this._css,
        s = this._createEle("div", { tabIndex: 0, className: t.dd }),
        i = this.ele.name,
        l = this.ele.required,
        n = this._createEle("input", {
          tabIndex: -1,
          name: i,
          type: "text",
          className: this._css.valueInput,
          required: l,
        });
      s.appendChild(n), (this.ele.required = !1), (this.ele.name = "");
      let r = this._createEle("div", {
        className: "more",
        style: "display:none",
      });
      s.appendChild(r),
        (this._wrapper.valueBox = n),
        (this._wrapper.moreValueBox = r);
      let a = this._makeHeader(),
        h = this._makeFilterBox();
      a.appendChild(h), this._showHideFilterBox(!1);
      let d = this._makeChildren();
      s.appendChild(a),
        s.appendChild(d),
        (this._wrapper.holder = s),
        this._insertAfter(s, this.ele),
        this._hide(d),
        this.disabled && s.classList.add(t.wrapperDisabled);
      let o = this._getInternalStyle(this.ele);
      s.setAttribute("style", o),
        null !== this._settings.byJson.data &&
          s.setAttribute("style", `width:${this._settings.byJson.width}px`);
      let u = this._createEle("div", { style: "clear:both" });
      s.appendChild(u),
        this._bindEvents(this._wrapper.holder, "focus", (t) => {
          this._isList
            ? this._bindDocumentEvents(null, !1, !0)
            : (e && (e.close(null), (e = null)),
              this._bindDocumentEvents(null, !0, !0),
              (e = this)),
            this._fireLocalEventIfExist("focus"),
            this._fireEventIfExist("focus");
        }),
        this._bindEvents(this._wrapper.holder, "blur", (e) => {
          this._isList && this._unbindDocumentEvents(),
            this._fireLocalEventIfExist("blur"),
            this._fireEventIfExist("blur");
        }),
        this._bindEvents(this._wrapper.holder, "dblclick", (e) => {
          this._fireLocalEventIfExist("blur"), this._fireEventIfExist("blur");
        }),
        this._bindEvents(n, "invalid", (e) => {
          e.target.setCustomValidity(""),
            e.target.validity.valid ||
              e.target.setCustomValidity(this._settings.errorMessage);
        }),
        this._bindEvents(n, "input", (e) => {
          e.target.setCustomValidity("");
        });
      let _ = [
        "click",
        "dblclick",
        "mousemove",
        "mouseover",
        "mouseout",
        "mousedown",
        "mouseup",
      ];
      for (let e = 0, t = _.length; e < t; e++) {
        let t = _[e];
        this._bindEvents(this._wrapper.holder, t, (e) => {
          this._fireLocalEventIfExist(t), this._fireEventIfExist(t);
        });
      }
      return s;
    }
    _createRow(e) {
      let t = e.isOptGroup ? this._css.optgroup : this._css.item,
        s = this._createEle("li", { className: t });
      if (e.isCheckbox && !e.isOptGroup) {
        let t = this._createEle("input", {
          tabIndex: -1,
          className: this._css.checkbox,
          type: "checkbox",
          disabled: e.isDisabled,
          checked: !1,
          value: e.value,
          name:
            this._wrapper.valueBox.name +
            this._settings.checkboxNameSuffix +
            "[]",
        });
        s.appendChild(t), (s._refCheckbox = t);
      }
      let i = e.isOptGroup ? " " + this._css.itemSpanOpt : "",
        l = this._createEle("span", { className: this._css.itemSpan + i }),
        n =
          "true" === this._settings.showListCounter.toString()
            ? `<span class='${this._css.listCounter}'>${e.counter}</span> ${e.label.text}`
            : e.label.text,
        r = this._createEle("span", { className: e.label.css }, n),
        a = this._createEle("span", { className: e.innerSpanCss });
      if ((a.appendChild(r), null !== e.img.src)) {
        let t = this._createEle("img", {
          className: e.img.css,
          src: e.img.src,
        });
        l.appendChild(t);
      }
      if (null === e.img.src && "" !== e.imageCss.replace(/\s/g, "")) {
        let t = this._createEle(
          "span",
          { className: e.img.css + " " + e.imageCss },
          "&nbsp;"
        );
        l.appendChild(t);
      }
      if (null !== e.desc.text) {
        let t = this._createEle("span", { className: e.desc.css }, e.desc.text);
        a.appendChild(t);
      }
      return (
        l.appendChild(a),
        s.appendChild(l),
        e.isDisabled
          ? s.classList.add(this._css.itemDisabled)
          : e.isOptGroup || s.classList.add(this._css.itemEnabled),
        "" !== e.title && (s.title = e.title),
        s
      );
    }
    _parseOption(e) {
      let t,
        s,
        i,
        l = null,
        n = "",
        r = "",
        a = "",
        h = "",
        d = "",
        o = "",
        u = -1;
      if (void 0 !== e) {
        let _ = e.nodeName,
          p = e.dataset;
        "OPTGROUP" === _ ? (h = e.label) : ((h = e.text), (a = e.value || h)),
          (u = e.index),
          (t = e.selected),
          (s = e.disabled),
          (d = e.className || ""),
          (n = p.title || ""),
          (r = p.description || ""),
          (l = p.image || l),
          (o = p.imageCss || ""),
          (i = this._getInternalStyle(e));
      }
      return {
        image: l,
        title: n,
        description: r,
        value: a,
        text: h,
        className: d,
        imageCss: o,
        index: u,
        selected: t,
        disabled: s,
        internalStyle: i,
      };
    }
    _removeOldSelected() {
      let e = this._getAllEle(
        "ul li." + this._css.itemSelected,
        this._wrapper.holder
      );
      for (let t = 0; t < e.length; t++)
        e[t].classList.remove(this._css.itemSelected),
          this._isMultiple &&
            "true" === this._enableCheckbox.toString() &&
            (e[t]._refCheckbox.checked = !1);
    }
    _setSelectedByIndexFromTo(e, t) {
      let s = Math.min(e, t),
        i = Math.max(e, t),
        l = this.optionsUI;
      for (let e = s; e <= i; e++) this._setSelectedByItem(l[e], !1, !1);
    }
    _setSelectedByItemToggle(e, t) {
      let s = !e.checked,
        i = t.index;
      s
        ? (t.classList.add(this._css.itemSelected),
          (this.ele.options[i].selected = !0))
        : (t.classList.remove(this._css.itemSelected),
          (this.ele.options[i].selected = !1)),
        this.updateUiAndValue();
    }
    _setSelectedByItem(e, t = !1, s = !0) {
      if (t && e) e.classList.add(this._css.itemSelected);
      else {
        let t = e.index;
        !0 === s
          ? (this._removeOldSelected(), (this.ele.selectedIndex = t))
          : (this.ele.options[t].selected = !0),
          e?.classList?.add(this._css.itemSelected),
          this.updateUiAndValue();
      }
      "true" === this._enableCheckbox.toString() &&
        e?._refCheckbox &&
        (e._refCheckbox.checked = !0),
        !1 === this._isFirstTime &&
          (this._fireLocalEventIfExist("change"),
          this._fireEventIfExist("change")),
        (this._isFirstTime = !1);
    }
    _setSelectedByOptionItem(e, t = !1) {
      let s = e.index,
        i = this._getDataAndUI(s);
      this._setSelectedByItem(i.ui, t);
    }
    _updateHeaderUI(e = null, t = null) {
      let s = null === e ? this.uiData : e,
        i = this._isArray(s.index) ? s.ui[0].innerHTML : null;
      this._wrapper.headerContent.innerHTML =
        null !== t ? t : i || s?.ui?.innerHTML || "&nbsp;";
      let l = this._getEle(
        "." + this._css.itemLabel,
        this._wrapper.headerContent
      );
      if (
        ("true" === this._settings.showPlusItemCounter.toString() &&
          null !== s.ui &&
          s.ui.length > 1 &&
          (l.innerHTML =
            l.innerHTML +
            `<span class="${this._css.headerCounter}">&nbsp; (+${
              s.ui.length - 1
            })</span>`),
        "false" === this._settings.showIcon.toString())
      ) {
        let e = this._getEle("img", this._wrapper.headerContent);
        e && this._hide(e);
      }
      this._setTitleMinHeight(!1);
    }
    _findElementByIndexProp(e) {
      let t = this._getAllEle(`ul li.${this._css.item}`, this._wrapper.holder),
        s = t.length;
      for (let i = 0; i < s; i++) if (t[i].index === e) return t[i];
      return null;
    }
    _getDataAndUI(e = null) {
      let t,
        s,
        i,
        l = this.ele,
        n = null,
        r = -1,
        a = this,
        h = !1,
        d = function (e) {
          let t = l.options[e],
            s = e;
          return {
            option: t,
            data: a._parseOption(t),
            index: s,
            ui: a._findElementByIndexProp(s),
          };
        };
      if (null !== e)
        (i = d(e)), (n = i.option), (t = i.data), (r = i.index), (s = i.ui);
      else if (
        ((s = this._getAllEle(
          "ul li." + this._css.itemSelected,
          this._wrapper.holder
        )),
        s.length > 1)
      ) {
        let e = [],
          l = [],
          a = [],
          o = [];
        for (let t = 0; t < s.length; t++)
          (i = d(s[t].index)),
            e.push(i.data),
            l.push(i.option),
            a.push(i.index),
            o.push(i.ui);
        (t = e), (n = l), (r = a), (s = o), (h = !0);
      } else
        (i = d(s[0]?.index || this.selectedIndex)),
          (n = i.option || null),
          (t = i.data || null),
          (r = i.index || -1),
          (s = i.ui || null);
      return { data: t, ui: s, index: r, option: n, isArray: h };
    }
    _isArray = function (e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    };
    updateUiAndValue(e = null) {
      let t = null === e ? this.uiData : e;
      this._updateHeaderUI(t);
      let s = this._wrapper.valueBox;
      if (
        ((s.value = this.ele.value),
        this._isMultiple &&
          "[]" === s.name.substr(s.name.length - 2, s.name.length))
      ) {
        this._wrapper.moreValueBox.innerHTML = "";
        for (let e = 1; e < t.data.length; e++) {
          let i = this._createEle("input", {
            type: "hidden",
            name: s.name,
            value: t.data[e].value,
          });
          this._wrapper.moreValueBox.appendChild(i);
        }
      }
    }
    _updateUiAndValueByIndex(e) {
      let t = this._getDataAndUI(e);
      this.updateUiAndValue(t);
    }
    _createEle(e, t, s) {
      let i = document.createElement(e);
      if (t)
        for (let e in t)
          "style" === e ? (i.style.cssText = t[e]) : (i[e] = t[e]);
      return s && (i.innerHTML = s), i;
    }
    _getEle(e, t = null) {
      return null === t ? document.querySelector(e) : t.querySelector(e);
    }
    _getAllEle(e, t = null) {
      return null === t ? document.querySelectorAll(e) : t.querySelectorAll(e);
    }
    _getInternalStyle(e) {
      return void 0 === e.style ? "" : e.style.cssText;
    }
    _toggleShow(e) {
      e.style.display =
        "none" === e.style.display || "" === e.style.display
          ? "inherit"
          : "none";
    }
    _show(e, t = "block") {
      e.style.display = t;
    }
    _hide(e) {
      e.style.display = "none";
    }
    _insertAfter(e, t) {
      return t.parentNode.insertBefore(e, t.nextSibling);
    }
    _insertBefore(e, t) {
      return t.insertBefore(e, t);
    }
    _getIndex(e) {
      return [...this._getAllEle("ul li", this._wrapper.holder)].indexOf(e);
    }
    _getProp(e, t) {
      let s = {};
      for (let i = 0; i < e.attributes.length; i++) {
        let l = e.attributes[i].nodeName,
          n = e.attributes[i].nodeValue;
        if (t === l) return n;
        s[l] = n;
      }
      return void 0 === t ? s : null;
    }
    _getDataSet(e, t = null) {
      return null === t ? e.dataset : e.dataset[t] || null;
    }
    _bindEvents(e, t, s) {
      e.addEventListener(t, s);
    }
    _unbindEvents(e, t, s) {
      e.removeEventListener(t, s);
    }
    _adjustChildHeight(e = null) {
      if (
        null !== (e = null === e ? parseInt(this._settings.visibleRows) : e)
      ) {
        let t = this._getEle(
            "li[data-ms-index='0']",
            this._wrapper.listOfItems
          ),
          s =
            null !== this._settings.rowHeight
              ? this._settings.rowHeight
              : t.clientHeight;
        this._wrapper.listOfItems.style.height = e * s + "px";
      }
    }
    _setTitleMinHeight(e = !0) {
      let t = 0;
      if (!0 === e) {
        let e = this._getAllEle("li", this._wrapper.listOfItems),
          s = e.length;
        for (let i = 0; i < s; i++) {
          let s = e[i];
          t = s.clientHeight > t ? s.clientHeight : t;
        }
      } else t = this._wrapper.headerA.clientHeight;
      this._wrapper.header.style.minHeight = t + "px";
    }
    _makeUiAsList(e, t) {
      !0 === e
        ? (this._hide(this._wrapper.header),
          this.open(null, !0),
          this._adjustChildHeight(t),
          (this._wrapper.listOfItems.style.position = "relative"),
          (this._wrapper.listOfItems.style.display = "inline-block"),
          (this._wrapper.listOfItems.style.zIndex = 0),
          (this._wrapper.holder.style.zIndex = 0),
          (this._isList = !0))
        : (this._show(this._wrapper.header),
          (this._wrapper.listOfItems.style.height = null),
          (this._wrapper.listOfItems.style.position = "absolute"),
          (this._wrapper.listOfItems.style.zIndex = this._settings.zIndex),
          (this._wrapper.holder.style.zIndex = 0),
          (this._isList = !1),
          this.close(null));
    }
    _bindDocumentEvents(e, t = !0, s = !0) {
      this._unbindDocumentEvents(),
        (this._onDocumentClick = (e) => {
          let t = this._wrapper.listOfItems.getBoundingClientRect(),
            s = this._wrapper.header.getBoundingClientRect(),
            i = t.left + t.width,
            l = s.top + t.height + s.height;
          (e.clientX < t.left ||
            e.clientX > i ||
            e.clientY < s.y ||
            e.clientY > l) &&
            this.close(e);
        }),
        (this._onDocumentKeyDown = (e) => {
          switch (e.keyCode) {
            case this._DOWN_ARROW:
            case this._RIGHT_ARROW:
              e.preventDefault(),
                e.stopPropagation(),
                this._show(this._wrapper.listOfItems),
                (this._isOpen = !0),
                this.next();
              break;
            case this._UP_ARROW:
            case this._LEFT_ARROW:
              e.preventDefault(), e.stopPropagation(), this.previous();
              break;
            case this._ESCAPE:
            case this._ENTER:
              e.preventDefault(), e.stopPropagation(), this.close(null);
              break;
            case this._SHIFT:
              this._shiftHolded = !0;
              break;
            case this._CONTROL:
            case this._MAC_CONTROL:
              this._controlHolded = !0;
              break;
            case this._SPACE:
              this._show(this._wrapper.listOfItems), (this._isOpen = !0);
              break;
            default:
              e.keyCode >= this._ALPHABETS_START &&
                !1 === this._isList &&
                "true" === this._settings.enableAutoFilter.toString() &&
                this._showHideFilterBox(!0),
                (this._shiftHolded = !1),
                (this._controlHolded = !1);
          }
        }),
        (this._onDocumentKeyUp = (e) => {
          (this._shiftHolded = !1), (this._controlHolded = !1);
        }),
        !0 === t &&
          this._bindEvents(document, "mouseup", this._onDocumentClick),
        !0 === s &&
          (this._bindEvents(document, "keydown", this._onDocumentKeyDown),
          this._bindEvents(document, "keyup", this._onDocumentKeyUp));
    }
    _unbindDocumentEvents() {
      null !== this._onDocumentClick &&
        this._unbindEvents(document, "mouseup", this._onDocumentClick),
        null !== this._onDocumentKeyDown &&
          this._unbindEvents(document, "keydown", this._onDocumentKeyDown),
        null !== this._onDocumentKeyUp &&
          this._unbindEvents(document, "keyup", this._onDocumentKeyUp),
        (this._onDocumentClick = null),
        (this._onDocumentKeyDown = null),
        (this._onDocumentKeyUp = null);
    }
    _scrollToIfNeeded(e = null, t = null, s = "next") {
      let i = this._wrapper.listOfItems;
      if (
        (i.getBoundingClientRect(),
        null === e && null !== t && (i.scrollTop = t),
        (e = void 0 !== e ? e : this._getEle("li." + this._css.itemSelected)))
      ) {
        let t = e.offsetTop,
          l = i.clientHeight,
          n = e.clientHeight;
        t + n - i.scrollTop > l && "next" === s
          ? (i.scrollTop = t + n - l)
          : t - i.scrollTop < 0 && "previous" === s && (i.scrollTop = t);
      }
    }
    _fireLocalEventIfExist(e, t = null) {
      if ("function" == typeof this._settings.on[e]) {
        let s = null === t ? this._getDataAndUI() : t,
          i = this._settings.on[e];
        try {
          i(s);
        } catch (e) {
          console.error(e.message);
        }
      }
    }
    _fireEventIfExist(e) {
      if (this.ele.dataset[e]) {
        let t = new Function(this.ele.dataset[e]);
        try {
          t();
        } catch (e) {
          console.error(e.message);
        }
      }
      if (this._has_handler(e).hasEvent) {
        if (this._has_handler(e).byElement)
          try {
            this.ele[e]();
          } catch (t) {
            try {
              this.ele["on" + e]();
            } catch (e) {}
          }
        else if (this._has_handler(e).byJQuery)
          switch (e) {
            case "keydown":
            case "keyup":
              break;
            default:
              try {
                "undefined" != typeof jQuery &&
                  jQuery(this.ele).triggerHandler(e);
              } catch (e) {}
          }
        return !1;
      }
    }
    _has_handler(e) {
      let t = { byElement: !1, local: !1, byJQuery: !1, hasEvent: !1 };
      null !== this._settings.on[e] && ((t.hasEvent = !0), (t.local = !0));
      try {
        null !== this._getProp(this.ele, "on" + e) &&
          ((t.hasEvent = !0), (t.byElement = !0));
      } catch (e) {}
      if ("undefined" != typeof jQuery) {
        let s,
          i = jQuery(this.ele);
        (s =
          "function" == typeof jQuery?._data
            ? jQuery?._data(this.ele, "events")
            : i.data("events")),
          s && s[e] && ((t.hasEvent = !0), (t.byJQuery = !0));
      }
      return t;
    }
    add(e, t = null) {
      let s, i, l, n, r, a, h;
      e instanceof HTMLOptionElement
        ? (h = e)
        : "string" == typeof e
        ? ((s = i = e), (h = new Option(s, i)))
        : e instanceof Object &&
          ((s = e.text || ""),
          (i = e.value || s),
          (l = e.title || ""),
          (n = e.image || ""),
          (a = e.imageCss || ""),
          (r = e.description || ""),
          (h = new Option(s, i)),
          h.setAttribute("data-description", r),
          h.setAttribute("data-image", n),
          h.setAttribute("data-title", l),
          h.setAttribute("data-image-css", a)),
        this.ele.add(h, t),
        this._makeChildren(),
        this._fireLocalEventIfExist("add");
    }
    remove(e) {
      let t = this._getDataAndUI(e);
      return (
        this.ele.remove(e),
        this._makeChildren(),
        this._fireLocalEventIfExist("remove", t),
        t
      );
    }
    next() {
      let e,
        t = this,
        s = this.optionsUI,
        i = s.length;
      if (
        ((e = this._isFilterApplied
          ? this._nexPrevCounter
          : this.selectedIndex),
        i > 0)
      ) {
        let l = (function () {
          let l = e;
          for (; l < i; l++) {
            let e = l + 1;
            if (
              ((e = e >= i ? i - 1 : e),
              t._nexPrevCounter++,
              !s[e].classList.contains(t._css.itemDisabled))
            )
              return s[e];
          }
          return null;
        })();
        l && (this._setSelectedByItem(l, !1, !0), this._scrollToIfNeeded(l));
      }
    }
    previous() {
      let e,
        t = this,
        s = this.optionsUI;
      if (
        (s.length,
        (e = this._isFilterApplied ? this._nexPrevCounter : this.selectedIndex),
        s.length > 0)
      ) {
        let i = (function (i) {
          let l = e;
          for (; l > 0; l--) {
            let e = l - 1;
            if (
              ((e = e >= 0 ? e : 0),
              t._nexPrevCounter--,
              !s[e].classList.contains(t._css.itemDisabled))
            )
              return s[e];
          }
          return null;
        })();
        i &&
          (this._setSelectedByItem(i, !1, !0),
          this._scrollToIfNeeded(i, null, "previous"));
      }
    }
    open(e, t = !1) {
      this.disabled ||
        (this._isOpen
          ? this.close(null)
          : ((this._isOpen = !0),
            this._show(this._wrapper.listOfItems),
            !1 === t && this._bindDocumentEvents(e),
            this._wrapper.arrow.classList.remove(this._css.arrowDown),
            this._wrapper.arrow.classList.add(this._css.arrowUp),
            this._adjustChildHeight(),
            this._scrollToItem(),
            this._fireLocalEventIfExist("open")));
    }
    close(e) {
      let t = this._isList,
        s = !1;
      if (null !== e) {
        e.stopImmediatePropagation();
        let t = e.target.closest("li");
        s = null !== t && t.classList.contains("disabled");
      }
      this.disabled ||
        t ||
        s ||
        (this._scrollToIfNeeded(null, 0),
        this._hide(this._wrapper.listOfItems),
        this._wrapper.arrow.classList.add(this._css.arrowDown),
        this._wrapper.arrow.classList.remove(this._css.arrowUp),
        (this._isOpen = !1),
        (this._isMouseDown = !1),
        (this._shiftHolded = !1),
        (this._controlHolded = !1),
        (this._isFilterApplied = !1),
        (this._wrapper.filterInput.value = ""),
        this._wrapper.filterInput.blur(),
        "false" === this._settings.showFilterAlways.toString() &&
          this._showHideFilterBox(!1),
        this._applyFilters(),
        this._unbindDocumentEvents(),
        this._updateHeaderUI(),
        this.ele.length !==
          this._getAllEle(`li.${this._css.item}`, this._wrapper.listOfItems)
            .length && (this._makeChildren(), this.updateUiAndValue()),
        this._fireLocalEventIfExist("close"));
    }
    namedItem(e, t = !1) {
      let s = null,
        i = this.ele.querySelector(`option[name='${e}']`);
      if (i && t) {
        s = {};
        let e = this._parseOption(i);
        (s.option = i), (s.data = e);
      } else s = i;
      return s;
    }
    item(e, t = !1) {
      let s = null,
        i = this.ele.options[e];
      if (i && t) {
        s = {};
        let e = this._parseOption(i);
        (s.option = i), (s.data = e);
      } else s = i;
      return s;
    }
    visible(e = null) {
      if (
        (!0 === e
          ? this._show(this._wrapper.holder, "inline-block")
          : !1 === e && this._hide(this._wrapper.holder),
        null === e)
      )
        return "none" !== this._wrapper.holder.style.display;
    }
    showRows(e) {
      (this._settings.visibleRows = e > this.length ? this.length : e),
        this._adjustChildHeight();
    }
    visibleRows(e) {
      this.showRows(e);
    }
    on(e, t) {
      this._settings.on[e] = t;
    }
    off(e, t) {
      this._settings.on[e] = null;
    }
    refresh() {
      this._makeChildren(), this.updateUiAndValue();
    }
    destroy() {
      this._show(this.ele),
        (this.ele.required = this._wrapper.valueBox.required),
        (this.ele.name = this._wrapper.valueBox.name),
        this._wrapper.holder.parentNode.removeChild(this._wrapper.holder);
    }
    get selectedIndex() {
      return this.ele.selectedIndex;
    }
    set selectedIndex(e) {
      let t = this,
        s = function (e) {
          (t.ele.selectedIndex = e),
            -1 === e
              ? (t._updateHeaderUI(null, ""), t._removeOldSelected())
              : t._setSelectedByOptionItem(t.ele.options[e]);
        };
      if (e < this.length && !this._isArray(e)) s(e);
      else if (this._isMultiple && this._isArray(e)) {
        for (let t = 0, s = e.length; t < s; t++)
          e[t] < this.length &&
            -1 !== e[t] &&
            this._setSelectedByOptionItem(this.ele.options[e[t]], t > 0);
        this._updateHeaderUI(null);
      } else s(e);
    }
    get options() {
      return this.ele.options;
    }
    set options(e) {
      e instanceof HTMLOptionElement
        ? (this.ele.add(e), this._makeChildren(), this.updateUiAndValue())
        : "number" == typeof e &&
          ((this.ele.length = e),
          this._makeChildren(),
          this.updateUiAndValue());
    }
    get optionsUI() {
      return (
        this._cacheEle.allItems,
        (this._cacheEle.allItems = this._getAllEle(
          `li.${this._css.item}`,
          this._wrapper.listOfItems
        ))
      );
    }
    get length() {
      return this.ele.length;
    }
    set length(e) {
      (this.ele.options.length = e),
        this._makeChildren(),
        this.updateUiAndValue();
    }
    get value() {
      return this.ele.value;
    }
    set value(e) {
      (this.ele.value = e), (this.selectedIndex = this.ele.selectedIndex);
    }
    get selectedText() {
      return this.selectedIndex >= 0
        ? this.ele.options[this.selectedIndex].text
        : "";
    }
    get disabled() {
      return this.ele.hasAttribute("disabled");
    }
    set disabled(e) {
      e
        ? (this.ele.setAttribute("disabled", ""),
          this._wrapper.holder.classList.add(this._css.wrapperDisabled))
        : (this.ele.removeAttribute("disabled"),
          this._wrapper.holder.classList.remove(this._css.wrapperDisabled));
    }
    get form() {
      return this.ele.form;
    }
    get multiple() {
      return this.ele.multiple;
    }
    set multiple(e) {
      e
        ? (this.ele.setAttribute("multiple", ""),
          (this._enableCheckbox = this._settings.enableCheckbox))
        : this.ele.removeAttribute("multiple"),
        (this._isMultiple = e),
        e ||
          ((this.selectedIndex = this.ele.selectedIndex),
          (this._enableCheckbox = !1)),
        this._makeChildren();
    }
    get name() {
      return this._wrapper?.valueBox
        ? this._wrapper.valueBox.name || ""
        : this.ele.name;
    }
    set name(e) {
      this._wrapper?.valueBox
        ? (this._wrapper.valueBox.name = e)
        : (this.ele.name = e);
    }
    get required() {
      return this._wrapper.valueBox.required;
    }
    set required(e) {
      e
        ? this._wrapper.valueBox.setAttribute("required", !0)
        : this._wrapper.valueBox.removeAttribute("required");
    }
    get size() {
      return this.ele.size;
    }
    set size(e) {
      (this.ele.size = e), this._makeUiAsList(e > 1, e);
    }
    get selectedOptions() {
      let e = null;
      if (
        this.selectedIndex >= 0 &&
        ((e = this.ele.options[this.selectedIndex]), this.multiple)
      ) {
        e = [];
        let t = this.options,
          s = t.length;
        for (let i = 0; i < s; i++) t[i].selected && e.push(t[i]);
        e = 1 === e.length ? e[0] : e;
      }
      return e;
    }
    get children() {
      return this.ele.children;
    }
    get uiData() {
      return this._getDataAndUI();
    }
    get version() {
      return "4.0.3";
    }
  }
  class s {
    constructor(e, i) {
      "string" == typeof e
        ? document.querySelectorAll(e).forEach((e) => {
            new s(e, i);
          })
        : ((e.msDropdown = this), (this._ddMaker = new t(e, i)));
    }
    setSettingAttribute(e, t, s = !1) {
      this._ddMaker.setSettingAttribute(e, t), s && this._ddMaker.refresh();
    }
    add(e, t) {
      this._ddMaker.add(e, t);
    }
    remove(e) {
      return this._ddMaker.remove(e);
    }
    next() {
      this._ddMaker.next();
    }
    previous() {
      this._ddMaker.previous();
    }
    open() {
      this._ddMaker.open(null, !1);
    }
    close() {
      this._ddMaker.close(null);
    }
    namedItem(e, t = !1) {
      return this._ddMaker.namedItem(e, t);
    }
    item(e, t = !1) {
      return this._ddMaker.item(e, t);
    }
    visible(e = null) {
      return this._ddMaker.visible(e);
    }
    showRows(e) {
      this._ddMaker.showRows(e);
    }
    visibleRows(e) {
      this._ddMaker.showRows(e);
    }
    on(e, t) {
      this._ddMaker.on(e, t);
    }
    off(e, t) {
      this._ddMaker.off(e, t);
    }
    updateUiAndValue() {
      this._ddMaker.updateUiAndValue();
    }
    refresh() {
      this._ddMaker.refresh();
    }
    destroy() {
      this._ddMaker.destroy();
    }
    get selectedIndex() {
      return this._ddMaker.selectedIndex;
    }
    set selectedIndex(e) {
      this._ddMaker.selectedIndex = e;
    }
    get options() {
      return this._ddMaker.options;
    }
    set options(e) {
      this._ddMaker.options = e;
    }
    get optionsUI() {
      return this._ddMaker.optionsUI;
    }
    get length() {
      return this._ddMaker.length;
    }
    set length(e) {
      this._ddMaker.length = e;
    }
    get value() {
      return this._ddMaker.value;
    }
    set value(e) {
      this._ddMaker.value = e;
    }
    get selectedText() {
      return this._ddMaker.selectedText;
    }
    get disabled() {
      return this._ddMaker.disabled;
    }
    set disabled(e) {
      this._ddMaker.disabled = e;
    }
    get form() {
      return this._ddMaker.form;
    }
    get multiple() {
      return this._ddMaker.multiple;
    }
    set multiple(e) {
      this._ddMaker.multiple = e;
    }
    get name() {
      return this._ddMaker.name;
    }
    set name(e) {
      this._ddMaker.name = e;
    }
    get required() {
      return this._ddMaker.required;
    }
    set required(e) {
      this._ddMaker.required = e;
    }
    get size() {
      return this._ddMaker.size;
    }
    set size(e) {
      this._ddMaker.size = e;
    }
    get selectedOptions() {
      return this._ddMaker.selectedOptions;
    }
    get children() {
      return this._ddMaker.children;
    }
    get uiData() {
      return this._ddMaker.uiData;
    }
    static make(e, t) {
      if (!e.msDropdown)
        try {
          let i = new s(e, t);
          return (
            e.addEventListener("change", () => {
              e.multiple
                ? e.msDropdown.refresh()
                : (e.msDropdown.selectedIndex = current.selectedIndex);
            }),
            i
          );
        } catch (e) {
          console.log(e.message);
        }
    }
    static get version() {
      return "4.0.3";
    }
    static get author() {
      return "Marghoob Suleman";
    }
  }
  class i extends HTMLSelectElement {
    constructor(e, t) {
      super();
    }
    connectedCallback() {
      setTimeout(() => {
        this.msDropdown || (this.msDropdown = new s(this));
        try {
          this.addEventListener("change", (e) => {
            this.multiple
              ? this.msDropdown.refresh()
              : (this.msDropdown.selectedIndex = this.selectedIndex);
          });
        } catch (e) {
          console.log(e.message);
        }
      }, 1);
    }
    disconnectedCallback() {}
    adoptedCallback() {}
    attributeChangedCallback(e, t, s) {
      if (this.msDropdown && -1 !== e.indexOf("data-")) {
        let t = (e = e.replace("data-", "")).toLowerCase().split("-");
        for (let e = 1; e < t.length; e++)
          t[e] = t[e].charAt(0).toUpperCase() + t[e].substring(1);
        this.msDropdown.setSettingAttribute(t.join(""), s, !0);
      }
      console.log("attributeChangedCallback");
    }
    static get observedAttributes() {
      return [
        "data-main-css",
        "data-show-icon",
        "data-event",
        "data-child-width",
        "data-child-height",
        "data-enable-checkbox",
        "data-checkbox-name-suffix",
        "data-enable-auto-filter",
        "data-visible-rows",
        "data-show-plus-item-counter",
        "data-error-message",
        "data-show-filter-always",
        "data-show-list-counter",
        "data-image-position",
      ];
    }
  }
  customElements.define("ms-dropdown", i, { extends: "select" }),
    (window.MsDropdown = s),
    navigator.vendor &&
      navigator.vendor.indexOf("Apple") > -1 &&
      navigator.userAgent &&
      -1 == navigator.userAgent.indexOf("CriOS") &&
      -1 == navigator.userAgent.indexOf("FxiOS") &&
      s.make("select[is='ms-dropdown']");
})();
