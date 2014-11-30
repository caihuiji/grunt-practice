CKEDITOR.dialog.add("textfield", function(a) {
    function b(a) {
        var a = a.element, b = this.getValue();
        b ? a.setAttribute(this.id, b) : a.removeAttribute(this.id);
    }
    function c(a) {
        this.setValue(a.hasAttribute(this.id) && a.getAttribute(this.id) || "");
    }
    var d = {
        email: 1,
        password: 1,
        search: 1,
        tel: 1,
        text: 1,
        url: 1
    };
    return {
        title: a.lang.forms.textfield.title,
        minWidth: 350,
        minHeight: 150,
        onShow: function() {
            delete this.textField;
            var a = this.getParentEditor().getSelection().getSelectedElement();
            !a || "input" != a.getName() || !d[a.getAttribute("type")] && a.getAttribute("type") || (this.textField = a, 
            this.setupContent(a));
        },
        onOk: function() {
            var a = this.getParentEditor(), b = this.textField, c = !b;
            c && (b = a.document.createElement("input"), b.setAttribute("type", "text")), b = {
                element: b
            }, c && a.insertElement(b.element), this.commitContent(b), c || a.getSelection().selectElement(b.element);
        },
        onLoad: function() {
            this.foreach(function(a) {
                a.getValue && (a.setup || (a.setup = c), !a.commit) && (a.commit = b);
            });
        },
        contents: [ {
            id: "info",
            label: a.lang.forms.textfield.title,
            title: a.lang.forms.textfield.title,
            elements: [ {
                type: "hbox",
                widths: [ "50%", "50%" ],
                children: [ {
                    id: "_cke_saved_name",
                    type: "text",
                    label: a.lang.forms.textfield.name,
                    "default": "",
                    accessKey: "N",
                    setup: function(a) {
                        this.setValue(a.data("cke-saved-name") || a.getAttribute("name") || "");
                    },
                    commit: function(a) {
                        a = a.element, this.getValue() ? a.data("cke-saved-name", this.getValue()) : (a.data("cke-saved-name", !1), 
                        a.removeAttribute("name"));
                    }
                }, {
                    id: "value",
                    type: "text",
                    label: a.lang.forms.textfield.value,
                    "default": "",
                    accessKey: "V",
                    commit: function(c) {
                        if (CKEDITOR.env.ie && !this.getValue()) {
                            var d = c.element, e = new CKEDITOR.dom.element("input", a.document);
                            d.copyAttributes(e, {
                                value: 1
                            }), e.replace(d), c.element = e;
                        } else b.call(this, c);
                    }
                } ]
            }, {
                type: "hbox",
                widths: [ "50%", "50%" ],
                children: [ {
                    id: "size",
                    type: "text",
                    label: a.lang.forms.textfield.charWidth,
                    "default": "",
                    accessKey: "C",
                    style: "width:50px",
                    validate: CKEDITOR.dialog.validate.integer(a.lang.common.validateNumberFailed)
                }, {
                    id: "maxLength",
                    type: "text",
                    label: a.lang.forms.textfield.maxChars,
                    "default": "",
                    accessKey: "M",
                    style: "width:50px",
                    validate: CKEDITOR.dialog.validate.integer(a.lang.common.validateNumberFailed)
                } ],
                onLoad: function() {
                    CKEDITOR.env.ie7Compat && this.getElement().setStyle("zoom", "100%");
                }
            }, {
                id: "type",
                type: "select",
                label: a.lang.forms.textfield.type,
                "default": "text",
                accessKey: "M",
                items: [ [ a.lang.forms.textfield.typeEmail, "email" ], [ a.lang.forms.textfield.typePass, "password" ], [ a.lang.forms.textfield.typeSearch, "search" ], [ a.lang.forms.textfield.typeTel, "tel" ], [ a.lang.forms.textfield.typeText, "text" ], [ a.lang.forms.textfield.typeUrl, "url" ] ],
                setup: function(a) {
                    this.setValue(a.getAttribute("type"));
                },
                commit: function(b) {
                    var c = b.element;
                    if (CKEDITOR.env.ie) {
                        var d = c.getAttribute("type"), e = this.getValue();
                        d != e && (d = CKEDITOR.dom.element.createFromHtml('<input type="' + e + '"></input>', a.document), 
                        c.copyAttributes(d, {
                            type: 1
                        }), d.replace(c), b.element = d);
                    } else c.setAttribute("type", this.getValue());
                }
            } ]
        } ]
    };
});