!function() {
    function a(a, b, c) {
        b.is && b.getCustomData("block_processed") || (b.is && CKEDITOR.dom.element.setMarker(c, b, "block_processed", !0), 
        a.push(b));
    }
    function b(b, c) {
        function d() {
            this.foreach(function(a) {
                /^(?!vbox|hbox)/.test(a.type) && (a.setup || (a.setup = function(b) {
                    a.setValue(b.getAttribute(a.id) || "", 1);
                }), !a.commit) && (a.commit = function(b) {
                    var c = this.getValue();
                    "dir" == a.id && b.getComputedStyle("direction") == c || (c ? b.setAttribute(a.id, c) : b.removeAttribute(a.id));
                });
            });
        }
        var e = function() {
            var a = CKEDITOR.tools.extend({}, CKEDITOR.dtd.$blockLimit);
            return b.config.div_wrapTable && (delete a.td, delete a.th), a;
        }(), f = CKEDITOR.dtd.div, g = {}, h = [];
        return {
            title: b.lang.div.title,
            minWidth: 400,
            minHeight: 165,
            contents: [ {
                id: "info",
                label: b.lang.common.generalTab,
                title: b.lang.common.generalTab,
                elements: [ {
                    type: "hbox",
                    widths: [ "50%", "50%" ],
                    children: [ {
                        id: "elementStyle",
                        type: "select",
                        style: "width: 100%;",
                        label: b.lang.div.styleSelectLabel,
                        "default": "",
                        items: [ [ b.lang.common.notSet, "" ] ],
                        onChange: function() {
                            var a = [ "info:elementStyle", "info:class", "advanced:dir", "advanced:style" ], c = this.getDialog(), d = c._element && c._element.clone() || new CKEDITOR.dom.element("div", b.document);
                            this.commit(d, !0);
                            for (var e, a = [].concat(a), f = a.length, g = 0; f > g; g++) (e = c.getContentElement.apply(c, a[g].split(":"))) && e.setup && e.setup(d, !0);
                        },
                        setup: function(a) {
                            for (var b in g) g[b].checkElementRemovable(a, !0) && this.setValue(b, 1);
                        },
                        commit: function(a) {
                            var b;
                            (b = this.getValue()) ? g[b].applyToObject(a) : a.removeAttribute("style");
                        }
                    }, {
                        id: "class",
                        type: "text",
                        requiredContent: "div(cke-xyz)",
                        label: b.lang.common.cssClass,
                        "default": ""
                    } ]
                } ]
            }, {
                id: "advanced",
                label: b.lang.common.advancedTab,
                title: b.lang.common.advancedTab,
                elements: [ {
                    type: "vbox",
                    padding: 1,
                    children: [ {
                        type: "hbox",
                        widths: [ "50%", "50%" ],
                        children: [ {
                            type: "text",
                            id: "id",
                            requiredContent: "div[id]",
                            label: b.lang.common.id,
                            "default": ""
                        }, {
                            type: "text",
                            id: "lang",
                            requiredContent: "div[lang]",
                            label: b.lang.common.langCode,
                            "default": ""
                        } ]
                    }, {
                        type: "hbox",
                        children: [ {
                            type: "text",
                            id: "style",
                            requiredContent: "div{cke-xyz}",
                            style: "width: 100%;",
                            label: b.lang.common.cssStyle,
                            "default": "",
                            commit: function(a) {
                                a.setAttribute("style", this.getValue());
                            }
                        } ]
                    }, {
                        type: "hbox",
                        children: [ {
                            type: "text",
                            id: "title",
                            requiredContent: "div[title]",
                            style: "width: 100%;",
                            label: b.lang.common.advisoryTitle,
                            "default": ""
                        } ]
                    }, {
                        type: "select",
                        id: "dir",
                        requiredContent: "div[dir]",
                        style: "width: 100%;",
                        label: b.lang.common.langDir,
                        "default": "",
                        items: [ [ b.lang.common.notSet, "" ], [ b.lang.common.langDirLtr, "ltr" ], [ b.lang.common.langDirRtl, "rtl" ] ]
                    } ]
                } ]
            } ],
            onLoad: function() {
                d.call(this);
                var a = this, c = this.getContentElement("info", "elementStyle");
                b.getStylesSet(function(d) {
                    var e, f;
                    if (d) for (var h = 0; h < d.length; h++) f = d[h], f.element && "div" == f.element && (e = f.name, 
                    g[e] = f = new CKEDITOR.style(f), b.filter.check(f) && (c.items.push([ e, e ]), 
                    c.add(e, e)));
                    c[1 < c.items.length ? "enable" : "disable"](), setTimeout(function() {
                        a._element && c.setup(a._element);
                    }, 0);
                });
            },
            onShow: function() {
                "editdiv" == c && this.setupContent(this._element = CKEDITOR.plugins.div.getSurroundDiv(b));
            },
            onOk: function() {
                if ("editdiv" == c) h = [ this._element ]; else {
                    var d, g, i, j = [], k = {}, l = [], m = b.getSelection(), n = m.getRanges(), o = m.createBookmarks();
                    for (g = 0; g < n.length; g++) for (i = n[g].createIterator(); d = i.getNextParagraph(); ) if (d.getName() in e && !d.isReadOnly()) {
                        var p = d.getChildren();
                        for (d = 0; d < p.count(); d++) a(l, p.getItem(d), k);
                    } else {
                        for (;!f[d.getName()] && !d.equals(n[g].root); ) d = d.getParent();
                        a(l, d, k);
                    }
                    for (CKEDITOR.dom.element.clearAllMarkers(k), n = [], g = null, i = 0; i < l.length; i++) d = l[i], 
                    p = b.elementPath(d).blockLimit, p.isReadOnly() && (p = p.getParent()), b.config.div_wrapTable && p.is([ "td", "th" ]) && (p = b.elementPath(p.getParent()).blockLimit), 
                    p.equals(g) || (g = p, n.push([])), n[n.length - 1].push(d);
                    for (g = 0; g < n.length; g++) {
                        for (p = n[g][0], l = p.getParent(), d = 1; d < n[g].length; d++) l = l.getCommonAncestor(n[g][d]);
                        for (i = new CKEDITOR.dom.element("div", b.document), d = 0; d < n[g].length; d++) {
                            for (p = n[g][d]; !p.getParent().equals(l); ) p = p.getParent();
                            n[g][d] = p;
                        }
                        for (d = 0; d < n[g].length; d++) p = n[g][d], p.getCustomData && p.getCustomData("block_processed") || (p.is && CKEDITOR.dom.element.setMarker(k, p, "block_processed", !0), 
                        d || i.insertBefore(p), i.append(p));
                        CKEDITOR.dom.element.clearAllMarkers(k), j.push(i);
                    }
                    m.selectBookmarks(o), h = j;
                }
                for (j = h.length, k = 0; j > k; k++) this.commitContent(h[k]), !h[k].getAttribute("style") && h[k].removeAttribute("style");
                this.hide();
            },
            onHide: function() {
                "editdiv" == c && this._element.removeCustomData("elementStyle"), delete this._element;
            }
        };
    }
    CKEDITOR.dialog.add("creatediv", function(a) {
        return b(a, "creatediv");
    }), CKEDITOR.dialog.add("editdiv", function(a) {
        return b(a, "editdiv");
    });
}();