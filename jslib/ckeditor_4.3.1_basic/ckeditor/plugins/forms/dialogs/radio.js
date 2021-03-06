CKEDITOR.dialog.add("radio", function(a) {
    return {
        title: a.lang.forms.checkboxAndRadio.radioTitle,
        minWidth: 350,
        minHeight: 140,
        onShow: function() {
            delete this.radioButton;
            var a = this.getParentEditor().getSelection().getSelectedElement();
            a && "input" == a.getName() && "radio" == a.getAttribute("type") && (this.radioButton = a, 
            this.setupContent(a));
        },
        onOk: function() {
            var a, b = this.radioButton, c = !b;
            c && (a = this.getParentEditor(), b = a.document.createElement("input"), b.setAttribute("type", "radio")), 
            c && a.insertElement(b), this.commitContent({
                element: b
            });
        },
        contents: [ {
            id: "info",
            label: a.lang.forms.checkboxAndRadio.radioTitle,
            title: a.lang.forms.checkboxAndRadio.radioTitle,
            elements: [ {
                id: "name",
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
                id: "value",
                type: "text",
                label: a.lang.forms.checkboxAndRadio.value,
                "default": "",
                accessKey: "V",
                setup: function(a) {
                    this.setValue(a.getAttribute("value") || "");
                },
                commit: function(a) {
                    a = a.element, this.getValue() ? a.setAttribute("value", this.getValue()) : a.removeAttribute("value");
                }
            }, {
                id: "checked",
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
                    if (CKEDITOR.env.ie || CKEDITOR.env.opera) {
                        var d = c.getAttribute("checked"), e = !!this.getValue();
                        d != e && (d = CKEDITOR.dom.element.createFromHtml('<input type="radio"' + (e ? ' checked="checked"' : "") + "></input>", a.document), 
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