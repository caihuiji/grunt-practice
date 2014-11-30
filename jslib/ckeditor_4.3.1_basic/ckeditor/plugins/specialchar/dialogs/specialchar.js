CKEDITOR.dialog.add("specialchar", function(a) {
    var b, c, d = a.lang.specialchar, e = function(c) {
        var d, c = c.data ? c.data.getTarget() : new CKEDITOR.dom.element(c);
        "a" == c.getName() && (d = c.getChild(0).getHtml()) && (c.removeClass("cke_light_background"), 
        b.hide(), c = a.document.createElement("span"), c.setHtml(d), a.insertText(c.getText()));
    }, f = CKEDITOR.tools.addFunction(e), g = function(a, d) {
        var e, d = d || a.data.getTarget();
        if ("span" == d.getName() && (d = d.getParent()), "a" == d.getName() && (e = d.getChild(0).getHtml())) {
            c && h(null, c);
            var f = b.getContentElement("info", "htmlPreview").getElement();
            b.getContentElement("info", "charPreview").getElement().setHtml(e), f.setHtml(CKEDITOR.tools.htmlEncode(e)), 
            d.getParent().addClass("cke_light_background"), c = d;
        }
    }, h = function(a, d) {
        d = d || a.data.getTarget(), "span" == d.getName() && (d = d.getParent()), "a" == d.getName() && (b.getContentElement("info", "charPreview").getElement().setHtml("&nbsp;"), 
        b.getContentElement("info", "htmlPreview").getElement().setHtml("&nbsp;"), d.getParent().removeClass("cke_light_background"), 
        c = void 0);
    }, i = CKEDITOR.tools.addFunction(function(b) {
        var c, b = new CKEDITOR.dom.event(b), d = b.getTarget();
        c = b.getKeystroke();
        var f = "rtl" == a.lang.dir;
        switch (c) {
          case 38:
            (c = d.getParent().getParent().getPrevious()) && (c = c.getChild([ d.getParent().getIndex(), 0 ]), 
            c.focus(), h(null, d), g(null, c)), b.preventDefault();
            break;

          case 40:
            (c = d.getParent().getParent().getNext()) && (c = c.getChild([ d.getParent().getIndex(), 0 ])) && 1 == c.type && (c.focus(), 
            h(null, d), g(null, c)), b.preventDefault();
            break;

          case 32:
            e({
                data: b
            }), b.preventDefault();
            break;

          case f ? 37 : 39:
            (c = d.getParent().getNext()) ? (c = c.getChild(0), 1 == c.type ? (c.focus(), h(null, d), 
            g(null, c), b.preventDefault(!0)) : h(null, d)) : (c = d.getParent().getParent().getNext()) && ((c = c.getChild([ 0, 0 ])) && 1 == c.type ? (c.focus(), 
            h(null, d), g(null, c), b.preventDefault(!0)) : h(null, d));
            break;

          case f ? 39 : 37:
            (c = d.getParent().getPrevious()) ? (c = c.getChild(0), c.focus(), h(null, d), g(null, c), 
            b.preventDefault(!0)) : (c = d.getParent().getParent().getPrevious()) ? (c = c.getLast().getChild(0), 
            c.focus(), h(null, d), g(null, c), b.preventDefault(!0)) : h(null, d);
        }
    });
    return {
        title: d.title,
        minWidth: 430,
        minHeight: 280,
        buttons: [ CKEDITOR.dialog.cancelButton ],
        charColumns: 17,
        onLoad: function() {
            for (var b, c, e = this.definition.charColumns, g = a.config.specialChars, h = CKEDITOR.tools.getNextId() + "_specialchar_table_label", j = [ '<table role="listbox" aria-labelledby="' + h + '" style="width: 320px; height: 100%; border-collapse: separate;" align="center" cellspacing="2" cellpadding="2" border="0">' ], k = 0, l = g.length; l > k; ) {
                j.push('<tr role="presentation">');
                for (var m = 0; e > m; m++, k++) {
                    if (b = g[k]) {
                        b instanceof Array ? (c = b[1], b = b[0]) : (c = b.replace("&", "").replace(";", "").replace("#", ""), 
                        c = d[c] || b);
                        var n = "cke_specialchar_label_" + k + "_" + CKEDITOR.tools.getNextNumber();
                        j.push('<td class="cke_dark_background" style="cursor: default" role="presentation"><a href="javascript: void(0);" role="option" aria-posinset="' + (k + 1) + '"', ' aria-setsize="' + l + '"', ' aria-labelledby="' + n + '"', ' class="cke_specialchar" title="', CKEDITOR.tools.htmlEncode(c), '" onkeydown="CKEDITOR.tools.callFunction( ' + i + ', event, this )" onclick="CKEDITOR.tools.callFunction(' + f + ', this); return false;" tabindex="-1"><span style="margin: 0 auto;cursor: inherit">' + b + '</span><span class="cke_voice_label" id="' + n + '">' + c + "</span></a>");
                    } else j.push('<td class="cke_dark_background">&nbsp;');
                    j.push("</td>");
                }
                j.push("</tr>");
            }
            j.push("</tbody></table>", '<span id="' + h + '" class="cke_voice_label">' + d.options + "</span>"), 
            this.getContentElement("info", "charContainer").getElement().setHtml(j.join(""));
        },
        contents: [ {
            id: "info",
            label: a.lang.common.generalTab,
            title: a.lang.common.generalTab,
            padding: 0,
            align: "top",
            elements: [ {
                type: "hbox",
                align: "top",
                widths: [ "320px", "90px" ],
                children: [ {
                    type: "html",
                    id: "charContainer",
                    html: "",
                    onMouseover: g,
                    onMouseout: h,
                    focus: function() {
                        var a = this.getElement().getElementsByTag("a").getItem(0);
                        setTimeout(function() {
                            a.focus(), g(null, a);
                        }, 0);
                    },
                    onShow: function() {
                        var a = this.getElement().getChild([ 0, 0, 0, 0, 0 ]);
                        setTimeout(function() {
                            a.focus(), g(null, a);
                        }, 0);
                    },
                    onLoad: function(a) {
                        b = a.sender;
                    }
                }, {
                    type: "hbox",
                    align: "top",
                    widths: [ "100%" ],
                    children: [ {
                        type: "vbox",
                        align: "top",
                        children: [ {
                            type: "html",
                            html: "<div></div>"
                        }, {
                            type: "html",
                            id: "charPreview",
                            className: "cke_dark_background",
                            style: "border:1px solid #eeeeee;font-size:28px;height:40px;width:70px;padding-top:9px;font-family:'Microsoft Sans Serif',Arial,Helvetica,Verdana;text-align:center;",
                            html: "<div>&nbsp;</div>"
                        }, {
                            type: "html",
                            id: "htmlPreview",
                            className: "cke_dark_background",
                            style: "border:1px solid #eeeeee;font-size:14px;height:20px;width:70px;padding-top:2px;font-family:'Microsoft Sans Serif',Arial,Helvetica,Verdana;text-align:center;",
                            html: "<div>&nbsp;</div>"
                        } ]
                    } ]
                } ]
            } ]
        } ]
    };
});