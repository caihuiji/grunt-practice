CKEDITOR.dialog.add("checkbox", function(a) {
    return {
        title: a.lang.forms.checkboxAndRadio.checkboxTitle,
        minWidth: 350,
        minHeight: 140,
        onShow: function() {
            delete this.checkbox;
            var a = this.getParentEditor().getSelection().getSelectedElement();
            a && "checkbox" == a.getAttribute("type") && (this.checkbox = a, this.setupContent(a));
        },
        onOk: function() {
            var a, b = this.checkbox;
            b || (a = this.getParentEditor(), b = a.document.createElement("input"), b.setAttribute("type", "checkbox"), 
            a.insertElement(b)), this.commitContent({
                element: b
            });
        },
        contents: [ {
            id: "info",
            label: a.lang.forms.checkboxAndRadio.checkboxTitle,
            title: a.lang.forms.checkboxAndRadio.checkboxTitle,
            startupFocus: "txtName",
            elements: [ {
                id: "txtName",
                type: "text",
                label: a.lang.common.name,
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
                id: "txtValue",
                type: "text",
                label: a.lang.forms.checkboxAndRadio.value,
                "default": "",
                accessKey: "V",
                setup: function(a) {
                    a = a.getAttribute("value"), this.setValue(CKEDITOR.env.ie && "on" == a ? "" : a);
                },
                commit: function(b) {
                    var c = b.element, d = this.getValue();
                    !d || CKEDITOR.env.ie && "on" == d ? CKEDITOR.env.ie ? (d = new CKEDITOR.dom.element("input", c.getDocument()), 
                    c.copyAttributes(d, {
                        value: 1
                    }), d.replace(c), a.getSelection().selectElement(d), b.element = d) : c.removeAttribute("value") : c.setAttribute("value", d);
                }
            }, {
                id: "cmbSelected",
                type: "checkbox",
                label: a.lang.forms.checkboxAndRadio.selected,
                "default": "",
                accessKey: "S",
                value: "checked",
                setup: function(a) {
                    this.setValue(a.getAttribute("checked"));
                },
                commit: function(b) {
                    var c = b.element;
                    if (CKEDITOR.env.ie) {
                        var d = !!c.getAttribute("checked"), e = !!this.getValue();
                        d != e && (d = CKEDITOR.dom.element.createFromHtml('<input type="checkbox"' + (e ? ' checked="checked"' : "") + "/>", a.document), 
                        c.copyAttributes(d, {
                            type: 1,
                            checked: 1
                        }), d.replace(c), a.getSelection().selectElement(d), b.element = d);
                    } else this.getValue() ? c.setAttribute("checked", "checked") : c.removeAttribute("checked");
                }
            } ]
        } ]
    };
});