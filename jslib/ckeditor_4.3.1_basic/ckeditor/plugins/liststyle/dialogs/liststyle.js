!function() {
    function a(a, b) {
        var c;
        try {
            c = a.getSelection().getRanges()[0];
        } catch (d) {
            return null;
        }
        return c.shrink(CKEDITOR.SHRINK_TEXT), a.elementPath(c.getCommonAncestor()).contains(b, 1);
    }
    function b(b, e) {
        var f = b.lang.liststyle;
        if ("bulletedListStyle" == e) return {
            title: f.bulletedTitle,
            minWidth: 300,
            minHeight: 50,
            contents: [ {
                id: "info",
                accessKey: "I",
                elements: [ {
                    type: "select",
                    label: f.type,
                    id: "type",
                    align: "center",
                    style: "width:150px",
                    items: [ [ f.notset, "" ], [ f.circle, "circle" ], [ f.disc, "disc" ], [ f.square, "square" ] ],
                    setup: function(a) {
                        this.setValue(a.getStyle("list-style-type") || d[a.getAttribute("type")] || a.getAttribute("type") || "");
                    },
                    commit: function(a) {
                        var b = this.getValue();
                        b ? a.setStyle("list-style-type", b) : a.removeStyle("list-style-type");
                    }
                } ]
            } ],
            onShow: function() {
                var b = this.getParentEditor();
                (b = a(b, "ul")) && this.setupContent(b);
            },
            onOk: function() {
                var b = this.getParentEditor();
                (b = a(b, "ul")) && this.commitContent(b);
            }
        };
        if ("numberedListStyle" == e) {
            var g = [ [ f.notset, "" ], [ f.lowerRoman, "lower-roman" ], [ f.upperRoman, "upper-roman" ], [ f.lowerAlpha, "lower-alpha" ], [ f.upperAlpha, "upper-alpha" ], [ f.decimal, "decimal" ] ];
            return (!CKEDITOR.env.ie || 7 < CKEDITOR.env.version) && g.concat([ [ f.armenian, "armenian" ], [ f.decimalLeadingZero, "decimal-leading-zero" ], [ f.georgian, "georgian" ], [ f.lowerGreek, "lower-greek" ] ]), 
            {
                title: f.numberedTitle,
                minWidth: 300,
                minHeight: 50,
                contents: [ {
                    id: "info",
                    accessKey: "I",
                    elements: [ {
                        type: "hbox",
                        widths: [ "25%", "75%" ],
                        children: [ {
                            label: f.start,
                            type: "text",
                            id: "start",
                            validate: CKEDITOR.dialog.validate.integer(f.validateStartNumber),
                            setup: function(a) {
                                this.setValue(a.getFirst(c).getAttribute("value") || a.getAttribute("start") || 1);
                            },
                            commit: function(a) {
                                var b = a.getFirst(c), d = b.getAttribute("value") || a.getAttribute("start") || 1;
                                a.getFirst(c).removeAttribute("value");
                                var e = parseInt(this.getValue(), 10);
                                for (isNaN(e) ? a.removeAttribute("start") : a.setAttribute("start", e), a = b, 
                                b = d, e = isNaN(e) ? 1 : e; (a = a.getNext(c)) && b++; ) a.getAttribute("value") == b && a.setAttribute("value", e + b - d);
                            }
                        }, {
                            type: "select",
                            label: f.type,
                            id: "type",
                            style: "width: 100%;",
                            items: g,
                            setup: function(a) {
                                this.setValue(a.getStyle("list-style-type") || d[a.getAttribute("type")] || a.getAttribute("type") || "");
                            },
                            commit: function(a) {
                                var b = this.getValue();
                                b ? a.setStyle("list-style-type", b) : a.removeStyle("list-style-type");
                            }
                        } ]
                    } ]
                } ],
                onShow: function() {
                    var b = this.getParentEditor();
                    (b = a(b, "ol")) && this.setupContent(b);
                },
                onOk: function() {
                    var b = this.getParentEditor();
                    (b = a(b, "ol")) && this.commitContent(b);
                }
            };
        }
    }
    var c = function(a) {
        return a.type == CKEDITOR.NODE_ELEMENT && a.is("li");
    }, d = {
        a: "lower-alpha",
        A: "upper-alpha",
        i: "lower-roman",
        I: "upper-roman",
        1: "decimal",
        disc: "disc",
        circle: "circle",
        square: "square"
    };
    CKEDITOR.dialog.add("numberedListStyle", function(a) {
        return b(a, "numberedListStyle");
    }), CKEDITOR.dialog.add("bulletedListStyle", function(a) {
        return b(a, "bulletedListStyle");
    });
}();