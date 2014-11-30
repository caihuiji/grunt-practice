CKEDITOR.dialog.add("form", function(a) {
    var b = {
        action: 1,
        id: 1,
        method: 1,
        enctype: 1,
        target: 1
    };
    return {
        title: a.lang.forms.form.title,
        minWidth: 350,
        minHeight: 200,
        onShow: function() {
            delete this.form;
            var a = this.getParentEditor().elementPath().contains("form", 1);
            a && (this.form = a, this.setupContent(a));
        },
        onOk: function() {
            var a, b = this.form, c = !b;
            c && (a = this.getParentEditor(), b = a.document.createElement("form"), b.appendBogus()), 
            c && a.insertElement(b), this.commitContent(b);
        },
        onLoad: function() {
            function a(a) {
                this.setValue(a.getAttribute(this.id) || "");
            }
            function c(a) {
                this.getValue() ? a.setAttribute(this.id, this.getValue()) : a.removeAttribute(this.id);
            }
            this.foreach(function(d) {
                b[d.id] && (d.setup = a, d.commit = c);
            });
        },
        contents: [ {
            id: "info",
            label: a.lang.forms.form.title,
            title: a.lang.forms.form.title,
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
                    this.getValue() ? a.data("cke-saved-name", this.getValue()) : (a.data("cke-saved-name", !1), 
                    a.removeAttribute("name"));
                }
            }, {
                id: "action",
                type: "text",
                label: a.lang.forms.form.action,
                "default": "",
                accessKey: "T"
            }, {
                type: "hbox",
                widths: [ "45%", "55%" ],
                children: [ {
                    id: "id",
                    type: "text",
                    label: a.lang.common.id,
                    "default": "",
                    accessKey: "I"
                }, {
                    id: "enctype",
                    type: "select",
                    label: a.lang.forms.form.encoding,
                    style: "width:100%",
                    accessKey: "E",
                    "default": "",
                    items: [ [ "" ], [ "text/plain" ], [ "multipart/form-data" ], [ "application/x-www-form-urlencoded" ] ]
                } ]
            }, {
                type: "hbox",
                widths: [ "45%", "55%" ],
                children: [ {
                    id: "target",
                    type: "select",
                    label: a.lang.common.target,
                    style: "width:100%",
                    accessKey: "M",
                    "default": "",
                    items: [ [ a.lang.common.notSet, "" ], [ a.lang.common.targetNew, "_blank" ], [ a.lang.common.targetTop, "_top" ], [ a.lang.common.targetSelf, "_self" ], [ a.lang.common.targetParent, "_parent" ] ]
                }, {
                    id: "method",
                    type: "select",
                    label: a.lang.forms.form.method,
                    accessKey: "M",
                    "default": "GET",
                    items: [ [ "GET", "get" ], [ "POST", "post" ] ]
                } ]
            } ]
        } ]
    };
});