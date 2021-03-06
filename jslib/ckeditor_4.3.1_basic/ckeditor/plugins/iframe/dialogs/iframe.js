!function() {
    function a(a) {
        var b = this instanceof CKEDITOR.ui.dialog.checkbox;
        a.hasAttribute(this.id) && (a = a.getAttribute(this.id), this.setValue(b ? c[this.id]["true"] == a.toLowerCase() : a));
    }
    function b(a) {
        var b = "" === this.getValue(), d = this instanceof CKEDITOR.ui.dialog.checkbox, e = this.getValue();
        b ? a.removeAttribute(this.att || this.id) : d ? a.setAttribute(this.id, c[this.id][e]) : a.setAttribute(this.att || this.id, e);
    }
    var c = {
        scrolling: {
            "true": "yes",
            "false": "no"
        },
        frameborder: {
            "true": "1",
            "false": "0"
        }
    };
    CKEDITOR.dialog.add("iframe", function(c) {
        var d = c.lang.iframe, e = c.lang.common, f = c.plugins.dialogadvtab;
        return {
            title: d.title,
            minWidth: 350,
            minHeight: 260,
            onShow: function() {
                this.fakeImage = this.iframeNode = null;
                var a = this.getSelectedElement();
                a && a.data("cke-real-element-type") && "iframe" == a.data("cke-real-element-type") && (this.fakeImage = a, 
                this.iframeNode = a = c.restoreRealElement(a), this.setupContent(a));
            },
            onOk: function() {
                var a;
                a = this.fakeImage ? this.iframeNode : new CKEDITOR.dom.element("iframe");
                var b = {}, d = {};
                this.commitContent(a, b, d), a = c.createFakeElement(a, "cke_iframe", "iframe", !0), 
                a.setAttributes(d), a.setStyles(b), this.fakeImage ? (a.replace(this.fakeImage), 
                c.getSelection().selectElement(a)) : c.insertElement(a);
            },
            contents: [ {
                id: "info",
                label: e.generalTab,
                accessKey: "I",
                elements: [ {
                    type: "vbox",
                    padding: 0,
                    children: [ {
                        id: "src",
                        type: "text",
                        label: e.url,
                        required: !0,
                        validate: CKEDITOR.dialog.validate.notEmpty(d.noUrl),
                        setup: a,
                        commit: b
                    } ]
                }, {
                    type: "hbox",
                    children: [ {
                        id: "width",
                        type: "text",
                        requiredContent: "iframe[width]",
                        style: "width:100%",
                        labelLayout: "vertical",
                        label: e.width,
                        validate: CKEDITOR.dialog.validate.htmlLength(e.invalidHtmlLength.replace("%1", e.width)),
                        setup: a,
                        commit: b
                    }, {
                        id: "height",
                        type: "text",
                        requiredContent: "iframe[height]",
                        style: "width:100%",
                        labelLayout: "vertical",
                        label: e.height,
                        validate: CKEDITOR.dialog.validate.htmlLength(e.invalidHtmlLength.replace("%1", e.height)),
                        setup: a,
                        commit: b
                    }, {
                        id: "align",
                        type: "select",
                        requiredContent: "iframe[align]",
                        "default": "",
                        items: [ [ e.notSet, "" ], [ e.alignLeft, "left" ], [ e.alignRight, "right" ], [ e.alignTop, "top" ], [ e.alignMiddle, "middle" ], [ e.alignBottom, "bottom" ] ],
                        style: "width:100%",
                        labelLayout: "vertical",
                        label: e.align,
                        setup: function(b, c) {
                            if (a.apply(this, arguments), c) {
                                var d = c.getAttribute("align");
                                this.setValue(d && d.toLowerCase() || "");
                            }
                        },
                        commit: function(a, c, d) {
                            b.apply(this, arguments), this.getValue() && (d.align = this.getValue());
                        }
                    } ]
                }, {
                    type: "hbox",
                    widths: [ "50%", "50%" ],
                    children: [ {
                        id: "scrolling",
                        type: "checkbox",
                        requiredContent: "iframe[scrolling]",
                        label: d.scrolling,
                        setup: a,
                        commit: b
                    }, {
                        id: "frameborder",
                        type: "checkbox",
                        requiredContent: "iframe[frameborder]",
                        label: d.border,
                        setup: a,
                        commit: b
                    } ]
                }, {
                    type: "hbox",
                    widths: [ "50%", "50%" ],
                    children: [ {
                        id: "name",
                        type: "text",
                        requiredContent: "iframe[name]",
                        label: e.name,
                        setup: a,
                        commit: b
                    }, {
                        id: "title",
                        type: "text",
                        requiredContent: "iframe[title]",
                        label: e.advisoryTitle,
                        setup: a,
                        commit: b
                    } ]
                }, {
                    id: "longdesc",
                    type: "text",
                    requiredContent: "iframe[longdesc]",
                    label: e.longDescr,
                    setup: a,
                    commit: b
                } ]
            }, f && f.createAdvancedTab(c, {
                id: 1,
                classes: 1,
                styles: 1
            }, "iframe") ]
        };
    });
}();