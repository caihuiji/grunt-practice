CKEDITOR.dialog.add("select", function(a) {
    function b(a, b, c, d, e) {
        return a = j(a), d = d ? d.createElement("OPTION") : document.createElement("OPTION"), 
        a && d && "option" == d.getName() ? (CKEDITOR.env.ie ? (isNaN(parseInt(e, 10)) ? a.$.options.add(d.$) : a.$.options.add(d.$, e), 
        d.$.innerHTML = 0 < b.length ? b : "", d.$.value = c) : (null !== e && e < a.getChildCount() ? a.getChild(0 > e ? 0 : e).insertBeforeMe(d) : a.append(d), 
        d.setText(0 < b.length ? b : ""), d.setValue(c)), d) : !1;
    }
    function c(a) {
        for (var a = j(a), b = g(a), c = a.getChildren().count() - 1; c >= 0; c--) a.getChild(c).$.selected && a.getChild(c).remove();
        h(a, b);
    }
    function d(a, b, c, d) {
        return a = j(a), 0 > b ? !1 : (a = a.getChild(b), a.setText(c), a.setValue(d), a);
    }
    function e(a) {
        for (a = j(a); a.getChild(0) && a.getChild(0).remove(); ) ;
    }
    function f(a, c, d) {
        var a = j(a), e = g(a);
        if (0 > e) return !1;
        if (c = e + c, c = 0 > c ? 0 : c, c = c >= a.getChildCount() ? a.getChildCount() - 1 : c, 
        e == c) return !1;
        var e = a.getChild(e), f = e.getText(), i = e.getValue();
        return e.remove(), e = b(a, f, i, d ? d : null, c), h(a, c), e;
    }
    function g(a) {
        return (a = j(a)) ? a.$.selectedIndex : -1;
    }
    function h(a, b) {
        if (a = j(a), 0 > b) return null;
        var c = a.getChildren().count();
        return a.$.selectedIndex = b >= c ? c - 1 : b, a;
    }
    function i(a) {
        return (a = j(a)) ? a.getChildren() : !1;
    }
    function j(a) {
        return a && a.domId && a.getInputElement().$ ? a.getInputElement() : a && a.$ ? a : !1;
    }
    return {
        title: a.lang.forms.select.title,
        minWidth: CKEDITOR.env.ie ? 460 : 395,
        minHeight: CKEDITOR.env.ie ? 320 : 300,
        onShow: function() {
            delete this.selectBox, this.setupContent("clear");
            var a = this.getParentEditor().getSelection().getSelectedElement();
            if (a && "select" == a.getName()) {
                this.selectBox = a, this.setupContent(a.getName(), a);
                for (var a = i(a), b = 0; b < a.count(); b++) this.setupContent("option", a.getItem(b));
            }
        },
        onOk: function() {
            var a = this.getParentEditor(), b = this.selectBox, c = !b;
            if (c && (b = a.document.createElement("select")), this.commitContent(b), c && (a.insertElement(b), 
            CKEDITOR.env.ie)) {
                var d = a.getSelection(), e = d.createBookmarks();
                setTimeout(function() {
                    d.selectBookmarks(e);
                }, 0);
            }
        },
        contents: [ {
            id: "info",
            label: a.lang.forms.select.selectInfo,
            title: a.lang.forms.select.selectInfo,
            accessKey: "",
            elements: [ {
                id: "txtName",
                type: "text",
                widths: [ "25%", "75%" ],
                labelLayout: "horizontal",
                label: a.lang.common.name,
                "default": "",
                accessKey: "N",
                style: "width:350px",
                setup: function(a, b) {
                    "clear" == a ? this.setValue(this["default"] || "") : "select" == a && this.setValue(b.data("cke-saved-name") || b.getAttribute("name") || "");
                },
                commit: function(a) {
                    this.getValue() ? a.data("cke-saved-name", this.getValue()) : (a.data("cke-saved-name", !1), 
                    a.removeAttribute("name"));
                }
            }, {
                id: "txtValue",
                type: "text",
                widths: [ "25%", "75%" ],
                labelLayout: "horizontal",
                label: a.lang.forms.select.value,
                style: "width:350px",
                "default": "",
                className: "cke_disabled",
                onLoad: function() {
                    this.getInputElement().setAttribute("readOnly", !0);
                },
                setup: function(a, b) {
                    "clear" == a ? this.setValue("") : "option" == a && b.getAttribute("selected") && this.setValue(b.$.value);
                }
            }, {
                type: "hbox",
                widths: [ "175px", "170px" ],
                children: [ {
                    id: "txtSize",
                    type: "text",
                    labelLayout: "horizontal",
                    label: a.lang.forms.select.size,
                    "default": "",
                    accessKey: "S",
                    style: "width:175px",
                    validate: function() {
                        var b = CKEDITOR.dialog.validate.integer(a.lang.common.validateNumberFailed);
                        return "" === this.getValue() || b.apply(this);
                    },
                    setup: function(a, b) {
                        "select" == a && this.setValue(b.getAttribute("size") || ""), CKEDITOR.env.webkit && this.getInputElement().setStyle("width", "86px");
                    },
                    commit: function(a) {
                        this.getValue() ? a.setAttribute("size", this.getValue()) : a.removeAttribute("size");
                    }
                }, {
                    type: "html",
                    html: "<span>" + CKEDITOR.tools.htmlEncode(a.lang.forms.select.lines) + "</span>"
                } ]
            }, {
                type: "html",
                html: "<span>" + CKEDITOR.tools.htmlEncode(a.lang.forms.select.opAvail) + "</span>"
            }, {
                type: "hbox",
                widths: [ "115px", "115px", "100px" ],
                children: [ {
                    type: "vbox",
                    children: [ {
                        id: "txtOptName",
                        type: "text",
                        label: a.lang.forms.select.opText,
                        style: "width:115px",
                        setup: function(a) {
                            "clear" == a && this.setValue("");
                        }
                    }, {
                        type: "select",
                        id: "cmbName",
                        label: "",
                        title: "",
                        size: 5,
                        style: "width:115px;height:75px",
                        items: [],
                        onChange: function() {
                            var a = this.getDialog(), b = a.getContentElement("info", "cmbValue"), c = a.getContentElement("info", "txtOptName"), a = a.getContentElement("info", "txtOptValue"), d = g(this);
                            h(b, d), c.setValue(this.getValue()), a.setValue(b.getValue());
                        },
                        setup: function(a, c) {
                            "clear" == a ? e(this) : "option" == a && b(this, c.getText(), c.getText(), this.getDialog().getParentEditor().document);
                        },
                        commit: function(a) {
                            var c = this.getDialog(), d = i(this), f = i(c.getContentElement("info", "cmbValue")), g = c.getContentElement("info", "txtValue").getValue();
                            e(a);
                            for (var h = 0; h < d.count(); h++) {
                                var j = b(a, d.getItem(h).getValue(), f.getItem(h).getValue(), c.getParentEditor().document);
                                f.getItem(h).getValue() == g && (j.setAttribute("selected", "selected"), j.selected = !0);
                            }
                        }
                    } ]
                }, {
                    type: "vbox",
                    children: [ {
                        id: "txtOptValue",
                        type: "text",
                        label: a.lang.forms.select.opValue,
                        style: "width:115px",
                        setup: function(a) {
                            "clear" == a && this.setValue("");
                        }
                    }, {
                        type: "select",
                        id: "cmbValue",
                        label: "",
                        size: 5,
                        style: "width:115px;height:75px",
                        items: [],
                        onChange: function() {
                            var a = this.getDialog(), b = a.getContentElement("info", "cmbName"), c = a.getContentElement("info", "txtOptName"), a = a.getContentElement("info", "txtOptValue"), d = g(this);
                            h(b, d), c.setValue(b.getValue()), a.setValue(this.getValue());
                        },
                        setup: function(a, c) {
                            if ("clear" == a) e(this); else if ("option" == a) {
                                var d = c.getValue();
                                b(this, d, d, this.getDialog().getParentEditor().document), "selected" == c.getAttribute("selected") && this.getDialog().getContentElement("info", "txtValue").setValue(d);
                            }
                        }
                    } ]
                }, {
                    type: "vbox",
                    padding: 5,
                    children: [ {
                        type: "button",
                        id: "btnAdd",
                        style: "",
                        label: a.lang.forms.select.btnAdd,
                        title: a.lang.forms.select.btnAdd,
                        style: "width:100%;",
                        onClick: function() {
                            var a = this.getDialog();
                            a.getParentEditor();
                            var c = a.getContentElement("info", "txtOptName"), d = a.getContentElement("info", "txtOptValue"), e = a.getContentElement("info", "cmbName"), f = a.getContentElement("info", "cmbValue");
                            b(e, c.getValue(), c.getValue(), a.getParentEditor().document), b(f, d.getValue(), d.getValue(), a.getParentEditor().document), 
                            c.setValue(""), d.setValue("");
                        }
                    }, {
                        type: "button",
                        id: "btnModify",
                        label: a.lang.forms.select.btnModify,
                        title: a.lang.forms.select.btnModify,
                        style: "width:100%;",
                        onClick: function() {
                            var a = this.getDialog(), b = a.getContentElement("info", "txtOptName"), c = a.getContentElement("info", "txtOptValue"), e = a.getContentElement("info", "cmbName"), a = a.getContentElement("info", "cmbValue"), f = g(e);
                            f >= 0 && (d(e, f, b.getValue(), b.getValue()), d(a, f, c.getValue(), c.getValue()));
                        }
                    }, {
                        type: "button",
                        id: "btnUp",
                        style: "width:100%;",
                        label: a.lang.forms.select.btnUp,
                        title: a.lang.forms.select.btnUp,
                        onClick: function() {
                            var a = this.getDialog(), b = a.getContentElement("info", "cmbName"), c = a.getContentElement("info", "cmbValue");
                            f(b, -1, a.getParentEditor().document), f(c, -1, a.getParentEditor().document);
                        }
                    }, {
                        type: "button",
                        id: "btnDown",
                        style: "width:100%;",
                        label: a.lang.forms.select.btnDown,
                        title: a.lang.forms.select.btnDown,
                        onClick: function() {
                            var a = this.getDialog(), b = a.getContentElement("info", "cmbName"), c = a.getContentElement("info", "cmbValue");
                            f(b, 1, a.getParentEditor().document), f(c, 1, a.getParentEditor().document);
                        }
                    } ]
                } ]
            }, {
                type: "hbox",
                widths: [ "40%", "20%", "40%" ],
                children: [ {
                    type: "button",
                    id: "btnSetValue",
                    label: a.lang.forms.select.btnSetValue,
                    title: a.lang.forms.select.btnSetValue,
                    onClick: function() {
                        var a = this.getDialog(), b = a.getContentElement("info", "cmbValue");
                        a.getContentElement("info", "txtValue").setValue(b.getValue());
                    }
                }, {
                    type: "button",
                    id: "btnDelete",
                    label: a.lang.forms.select.btnDelete,
                    title: a.lang.forms.select.btnDelete,
                    onClick: function() {
                        var a = this.getDialog(), b = a.getContentElement("info", "cmbName"), d = a.getContentElement("info", "cmbValue"), e = a.getContentElement("info", "txtOptName"), a = a.getContentElement("info", "txtOptValue");
                        c(b), c(d), e.setValue(""), a.setValue("");
                    }
                }, {
                    id: "chkMulti",
                    type: "checkbox",
                    label: a.lang.forms.select.chkMulti,
                    "default": "",
                    accessKey: "M",
                    value: "checked",
                    setup: function(a, b) {
                        "select" == a && this.setValue(b.getAttribute("multiple")), CKEDITOR.env.webkit && this.getElement().getParent().setStyle("vertical-align", "middle");
                    },
                    commit: function(a) {
                        this.getValue() ? a.setAttribute("multiple", this.getValue()) : a.removeAttribute("multiple");
                    }
                } ]
            } ]
        } ]
    };
});