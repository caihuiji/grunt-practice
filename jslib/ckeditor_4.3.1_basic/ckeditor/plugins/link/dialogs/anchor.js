CKEDITOR.dialog.add("anchor", function(a) {
    var b = function(a) {
        this._.selectedElement = a, this.setValueOf("info", "txtName", a.data("cke-saved-name") || "");
    };
    return {
        title: a.lang.link.anchor.title,
        minWidth: 300,
        minHeight: 60,
        onOk: function() {
            var b = CKEDITOR.tools.trim(this.getValueOf("info", "txtName")), b = {
                id: b,
                name: b,
                "data-cke-saved-name": b
            };
            if (this._.selectedElement) this._.selectedElement.data("cke-realelement") ? (b = a.document.createElement("a", {
                attributes: b
            }), a.createFakeElement(b, "cke_anchor", "anchor").replace(this._.selectedElement)) : this._.selectedElement.setAttributes(b); else {
                var c = a.getSelection(), c = c && c.getRanges()[0];
                c.collapsed ? (CKEDITOR.plugins.link.synAnchorSelector && (b["class"] = "cke_anchor_empty"), 
                CKEDITOR.plugins.link.emptyAnchorFix && (b.contenteditable = "false", b["data-cke-editable"] = 1), 
                b = a.document.createElement("a", {
                    attributes: b
                }), CKEDITOR.plugins.link.fakeAnchor && (b = a.createFakeElement(b, "cke_anchor", "anchor")), 
                c.insertNode(b)) : (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (b["class"] = "cke_anchor"), 
                b = new CKEDITOR.style({
                    element: "a",
                    attributes: b
                }), b.type = CKEDITOR.STYLE_INLINE, a.applyStyle(b));
            }
        },
        onHide: function() {
            delete this._.selectedElement;
        },
        onShow: function() {
            var c = a.getSelection(), d = c.getSelectedElement();
            d ? CKEDITOR.plugins.link.fakeAnchor ? ((c = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, d)) && b.call(this, c), 
            this._.selectedElement = d) : d.is("a") && d.hasAttribute("name") && b.call(this, d) : (d = CKEDITOR.plugins.link.getSelectedLink(a)) && (b.call(this, d), 
            c.selectElement(d)), this.getContentElement("info", "txtName").focus();
        },
        contents: [ {
            id: "info",
            label: a.lang.link.anchor.title,
            accessKey: "I",
            elements: [ {
                type: "text",
                id: "txtName",
                label: a.lang.link.anchor.name,
                required: !0,
                validate: function() {
                    return this.getValue() ? !0 : (alert(a.lang.link.anchor.errorName), !1);
                }
            } ]
        } ]
    };
});