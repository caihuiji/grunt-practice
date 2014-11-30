!function() {
    function a(a) {
        for (var b, c = 0, d = 0, e = 0, f = a.$.rows.length; f > e; e++) {
            b = a.$.rows[e];
            for (var g, h = c = 0, i = b.cells.length; i > h; h++) g = b.cells[h], c += g.colSpan;
            c > d && (d = c);
        }
        return d;
    }
    function b(a) {
        return function() {
            var b = this.getValue(), b = !!(CKEDITOR.dialog.validate.integer()(b) && b > 0);
            return b || (alert(a), this.select()), b;
        };
    }
    function c(c, f) {
        var g = function(a) {
            return new CKEDITOR.dom.element(a, c.document);
        }, h = c.editable(), i = c.plugins.dialogadvtab;
        return {
            title: c.lang.table.title,
            minWidth: 310,
            minHeight: CKEDITOR.env.ie ? 310 : 280,
            onLoad: function() {
                var a = this, b = a.getContentElement("advanced", "advStyles");
                b && b.on("change", function() {
                    var b = this.getStyle("width", ""), c = a.getContentElement("info", "txtWidth");
                    c && c.setValue(b, !0), b = this.getStyle("height", ""), (c = a.getContentElement("info", "txtHeight")) && c.setValue(b, !0);
                });
            },
            onShow: function() {
                var a, b = c.getSelection(), d = b.getRanges(), e = this.getContentElement("info", "txtRows"), g = this.getContentElement("info", "txtCols"), h = this.getContentElement("info", "txtWidth"), i = this.getContentElement("info", "txtHeight");
                "tableProperties" == f && ((b = b.getSelectedElement()) && b.is("table") ? a = b : 0 < d.length && (CKEDITOR.env.webkit && d[0].shrink(CKEDITOR.NODE_ELEMENT), 
                a = c.elementPath(d[0].getCommonAncestor(!0)).contains("table", 1)), this._.selectedElement = a), 
                a ? (this.setupContent(a), e && e.disable(), g && g.disable()) : (e && e.enable(), 
                g && g.enable()), h && h.onChange(), i && i.onChange();
            },
            onOk: function() {
                var a = c.getSelection(), b = this._.selectedElement && a.createBookmarks(), d = this._.selectedElement || g("table"), e = {};
                if (this.commitContent(e, d), e.info) {
                    if (e = e.info, !this._.selectedElement) for (var f = d.append(g("tbody")), h = parseInt(e.txtRows, 10) || 0, i = parseInt(e.txtCols, 10) || 0, j = 0; h > j; j++) for (var k = f.append(g("tr")), l = 0; i > l; l++) k.append(g("td")).appendBogus();
                    if (h = e.selHeaders, !d.$.tHead && ("row" == h || "both" == h)) {
                        for (k = new CKEDITOR.dom.element(d.$.createTHead()), f = d.getElementsByTag("tbody").getItem(0), 
                        f = f.getElementsByTag("tr").getItem(0), j = 0; j < f.getChildCount(); j++) i = f.getChild(j), 
                        i.type == CKEDITOR.NODE_ELEMENT && !i.data("cke-bookmark") && (i.renameNode("th"), 
                        i.setAttribute("scope", "col"));
                        k.append(f.remove());
                    }
                    if (null !== d.$.tHead && "row" != h && "both" != h) {
                        for (k = new CKEDITOR.dom.element(d.$.tHead), f = d.getElementsByTag("tbody").getItem(0), 
                        l = f.getFirst(); 0 < k.getChildCount(); ) {
                            for (f = k.getFirst(), j = 0; j < f.getChildCount(); j++) i = f.getChild(j), i.type == CKEDITOR.NODE_ELEMENT && (i.renameNode("td"), 
                            i.removeAttribute("scope"));
                            f.insertBefore(l);
                        }
                        k.remove();
                    }
                    if (!this.hasColumnHeaders && ("col" == h || "both" == h)) for (k = 0; k < d.$.rows.length; k++) i = new CKEDITOR.dom.element(d.$.rows[k].cells[0]), 
                    i.renameNode("th"), i.setAttribute("scope", "row");
                    if (this.hasColumnHeaders && "col" != h && "both" != h) for (j = 0; j < d.$.rows.length; j++) k = new CKEDITOR.dom.element(d.$.rows[j]), 
                    "tbody" == k.getParent().getName() && (i = new CKEDITOR.dom.element(k.$.cells[0]), 
                    i.renameNode("td"), i.removeAttribute("scope"));
                    e.txtHeight ? d.setStyle("height", e.txtHeight) : d.removeStyle("height"), e.txtWidth ? d.setStyle("width", e.txtWidth) : d.removeStyle("width"), 
                    d.getAttribute("style") || d.removeAttribute("style");
                }
                if (this._.selectedElement) try {
                    a.selectBookmarks(b);
                } catch (m) {} else c.insertElement(d), setTimeout(function() {
                    var a = new CKEDITOR.dom.element(d.$.rows[0].cells[0]), b = c.createRange();
                    b.moveToPosition(a, CKEDITOR.POSITION_AFTER_START), b.select();
                }, 0);
            },
            contents: [ {
                id: "info",
                label: c.lang.table.title,
                elements: [ {
                    type: "hbox",
                    widths: [ null, null ],
                    styles: [ "vertical-align:top" ],
                    children: [ {
                        type: "vbox",
                        padding: 0,
                        children: [ {
                            type: "text",
                            id: "txtRows",
                            "default": 3,
                            label: c.lang.table.rows,
                            required: !0,
                            controlStyle: "width:5em",
                            validate: b(c.lang.table.invalidRows),
                            setup: function(a) {
                                this.setValue(a.$.rows.length);
                            },
                            commit: e
                        }, {
                            type: "text",
                            id: "txtCols",
                            "default": 2,
                            label: c.lang.table.columns,
                            required: !0,
                            controlStyle: "width:5em",
                            validate: b(c.lang.table.invalidCols),
                            setup: function(b) {
                                this.setValue(a(b));
                            },
                            commit: e
                        }, {
                            type: "html",
                            html: "&nbsp;"
                        }, {
                            type: "select",
                            id: "selHeaders",
                            requiredContent: "th",
                            "default": "",
                            label: c.lang.table.headers,
                            items: [ [ c.lang.table.headersNone, "" ], [ c.lang.table.headersRow, "row" ], [ c.lang.table.headersColumn, "col" ], [ c.lang.table.headersBoth, "both" ] ],
                            setup: function(a) {
                                var b = this.getDialog();
                                b.hasColumnHeaders = !0;
                                for (var c = 0; c < a.$.rows.length; c++) {
                                    var d = a.$.rows[c].cells[0];
                                    if (d && "th" != d.nodeName.toLowerCase()) {
                                        b.hasColumnHeaders = !1;
                                        break;
                                    }
                                }
                                this.setValue(null !== a.$.tHead ? b.hasColumnHeaders ? "both" : "row" : b.hasColumnHeaders ? "col" : "");
                            },
                            commit: e
                        }, {
                            type: "text",
                            id: "txtBorder",
                            requiredContent: "table[border]",
                            "default": c.filter.check("table[border]") ? 1 : 0,
                            label: c.lang.table.border,
                            controlStyle: "width:3em",
                            validate: CKEDITOR.dialog.validate.number(c.lang.table.invalidBorder),
                            setup: function(a) {
                                this.setValue(a.getAttribute("border") || "");
                            },
                            commit: function(a, b) {
                                this.getValue() ? b.setAttribute("border", this.getValue()) : b.removeAttribute("border");
                            }
                        }, {
                            id: "cmbAlign",
                            type: "select",
                            requiredContent: "table[align]",
                            "default": "",
                            label: c.lang.common.align,
                            items: [ [ c.lang.common.notSet, "" ], [ c.lang.common.alignLeft, "left" ], [ c.lang.common.alignCenter, "center" ], [ c.lang.common.alignRight, "right" ] ],
                            setup: function(a) {
                                this.setValue(a.getAttribute("align") || "");
                            },
                            commit: function(a, b) {
                                this.getValue() ? b.setAttribute("align", this.getValue()) : b.removeAttribute("align");
                            }
                        } ]
                    }, {
                        type: "vbox",
                        padding: 0,
                        children: [ {
                            type: "hbox",
                            widths: [ "5em" ],
                            children: [ {
                                type: "text",
                                id: "txtWidth",
                                requiredContent: "table{width}",
                                controlStyle: "width:5em",
                                label: c.lang.common.width,
                                title: c.lang.common.cssLengthTooltip,
                                "default": c.filter.check("table{width}") ? 500 > h.getSize("width") ? "100%" : 500 : 0,
                                getValue: d,
                                validate: CKEDITOR.dialog.validate.cssLength(c.lang.common.invalidCssLength.replace("%1", c.lang.common.width)),
                                onChange: function() {
                                    var a = this.getDialog().getContentElement("advanced", "advStyles");
                                    a && a.updateStyle("width", this.getValue());
                                },
                                setup: function(a) {
                                    this.setValue(a.getStyle("width"));
                                },
                                commit: e
                            } ]
                        }, {
                            type: "hbox",
                            widths: [ "5em" ],
                            children: [ {
                                type: "text",
                                id: "txtHeight",
                                requiredContent: "table{height}",
                                controlStyle: "width:5em",
                                label: c.lang.common.height,
                                title: c.lang.common.cssLengthTooltip,
                                "default": "",
                                getValue: d,
                                validate: CKEDITOR.dialog.validate.cssLength(c.lang.common.invalidCssLength.replace("%1", c.lang.common.height)),
                                onChange: function() {
                                    var a = this.getDialog().getContentElement("advanced", "advStyles");
                                    a && a.updateStyle("height", this.getValue());
                                },
                                setup: function(a) {
                                    (a = a.getStyle("height")) && this.setValue(a);
                                },
                                commit: e
                            } ]
                        }, {
                            type: "html",
                            html: "&nbsp;"
                        }, {
                            type: "text",
                            id: "txtCellSpace",
                            requiredContent: "table[cellspacing]",
                            controlStyle: "width:3em",
                            label: c.lang.table.cellSpace,
                            "default": c.filter.check("table[cellspacing]") ? 1 : 0,
                            validate: CKEDITOR.dialog.validate.number(c.lang.table.invalidCellSpacing),
                            setup: function(a) {
                                this.setValue(a.getAttribute("cellSpacing") || "");
                            },
                            commit: function(a, b) {
                                this.getValue() ? b.setAttribute("cellSpacing", this.getValue()) : b.removeAttribute("cellSpacing");
                            }
                        }, {
                            type: "text",
                            id: "txtCellPad",
                            requiredContent: "table[cellpadding]",
                            controlStyle: "width:3em",
                            label: c.lang.table.cellPad,
                            "default": c.filter.check("table[cellpadding]") ? 1 : 0,
                            validate: CKEDITOR.dialog.validate.number(c.lang.table.invalidCellPadding),
                            setup: function(a) {
                                this.setValue(a.getAttribute("cellPadding") || "");
                            },
                            commit: function(a, b) {
                                this.getValue() ? b.setAttribute("cellPadding", this.getValue()) : b.removeAttribute("cellPadding");
                            }
                        } ]
                    } ]
                }, {
                    type: "html",
                    align: "right",
                    html: ""
                }, {
                    type: "vbox",
                    padding: 0,
                    children: [ {
                        type: "text",
                        id: "txtCaption",
                        requiredContent: "caption",
                        label: c.lang.table.caption,
                        setup: function(a) {
                            if (this.enable(), a = a.getElementsByTag("caption"), 0 < a.count()) {
                                var a = a.getItem(0), b = a.getFirst(CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT));
                                b && !b.equals(a.getBogus()) ? (this.disable(), this.setValue(a.getText())) : (a = CKEDITOR.tools.trim(a.getText()), 
                                this.setValue(a));
                            }
                        },
                        commit: function(a, b) {
                            if (this.isEnabled()) {
                                var d = this.getValue(), e = b.getElementsByTag("caption");
                                if (d) 0 < e.count() ? (e = e.getItem(0), e.setHtml("")) : (e = new CKEDITOR.dom.element("caption", c.document), 
                                b.getChildCount() ? e.insertBefore(b.getFirst()) : e.appendTo(b)), e.append(new CKEDITOR.dom.text(d, c.document)); else if (0 < e.count()) for (d = e.count() - 1; d >= 0; d--) e.getItem(d).remove();
                            }
                        }
                    }, {
                        type: "text",
                        id: "txtSummary",
                        requiredContent: "table[summary]",
                        label: c.lang.table.summary,
                        setup: function(a) {
                            this.setValue(a.getAttribute("summary") || "");
                        },
                        commit: function(a, b) {
                            this.getValue() ? b.setAttribute("summary", this.getValue()) : b.removeAttribute("summary");
                        }
                    } ]
                } ]
            }, i && i.createAdvancedTab(c, null, "table") ]
        };
    }
    var d = CKEDITOR.tools.cssLength, e = function(a) {
        var b = this.id;
        a.info || (a.info = {}), a.info[b] = this.getValue();
    };
    CKEDITOR.dialog.add("table", function(a) {
        return c(a, "table");
    }), CKEDITOR.dialog.add("tableProperties", function(a) {
        return c(a, "tableProperties");
    });
}();