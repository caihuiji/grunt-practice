CKEDITOR.dialog.add("button", function(a) {
    function b(a) {
        var b = this.getValue();
        b ? (a.attributes[this.id] = b, "name" == this.id && (a.attributes["data-cke-saved-name"] = b)) : (delete a.attributes[this.id], 
        "name" == this.id && delete a.attributes["data-cke-saved-name"]);
    }
    return {
        title: a.lang.forms.button.title,
        minWidth: 350,
        minHeight: 150,
        onShow: function() {
            delete this.button;
            var a = this.getParentEditor().getSelection().getSelectedElement();
            a && a.is("input") && a.getAttribute("type") in {
                button: 1,
                reset: 1,
                submit: 1
            } && (this.button = a, this.setupContent(a));
        },
        onOk: function() {
            var a = this.getParentEditor(), b = this.button, c = !b, d = b ? CKEDITOR.htmlParser.fragment.fromHtml(b.getOuterHtml()).children[0] : new CKEDITOR.htmlParser.element("input");
            this.commitContent(d);
            var e = new CKEDITOR.htmlParser.basicWriter();
            d.writeHtml(e), d = CKEDITOR.dom.element.createFromHtml(e.getHtml(), a.document), 
            c ? a.insertElement(d) : (d.replace(b), a.getSelection().selectElement(d));
        },
        contents: [ {
            id: "info",
            label: a.lang.forms.button.title,
            title: a.lang.forms.button.title,
            elements: [ {
                id: "name",
                type: "text",
                label: a.lang.common.name,
                "default": "",
                setup: function(a) {
                    this.setValue(a.data("cke-saved-name") || a.getAttribute("name") || "");
                },
                commit: b
            }, {
                id: "value",
                type: "text",
                label: a.lang.forms.button.text,
                accessKey: "V",
                "default": "",
                setup: function(a) {
                    this.setValue(a.getAttribute("value") || "");
                },
                commit: b
            }, {
                id: "type",
                type: "select",
                label: a.lang.forms.button.type,
                "default": "button",
                accessKey: "T",
                items: [ [ a.lang.forms.button.typeBtn, "button" ], [ a.lang.forms.button.typeSbm, "submit" ], [ a.lang.forms.button.typeRst, "reset" ] ],
                setup: function(a) {
                    this.setValue(a.getAttribute("type") || "");
                },
                commit: b
            } ]
        } ]
    };
});