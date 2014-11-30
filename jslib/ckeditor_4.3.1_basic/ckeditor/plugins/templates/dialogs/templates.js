!function() {
    CKEDITOR.dialog.add("templates", function(a) {
        function b(a, b) {
            var d = CKEDITOR.dom.element.createFromHtml('<a href="javascript:void(0)" tabIndex="-1" role="option" ><div class="cke_tpl_item"></div></a>'), e = '<table style="width:350px;" class="cke_tpl_preview" role="presentation"><tr>';
            return a.image && b && (e += '<td class="cke_tpl_preview_img"><img src="' + CKEDITOR.getUrl(b + a.image) + '"' + (CKEDITOR.env.ie6Compat ? ' onload="this.width=this.width"' : "") + ' alt="" title=""></td>'), 
            e += '<td style="white-space:normal;"><span class="cke_tpl_title">' + a.title + "</span><br/>", 
            a.description && (e += "<span>" + a.description + "</span>"), d.getFirst().setHtml(e + "</td></tr></table>"), 
            d.on("click", function() {
                c(a.html);
            }), d;
        }
        function c(b) {
            var c = CKEDITOR.dialog.getCurrent();
            c.getValueOf("selectTpl", "chkInsertOpt") ? (a.fire("saveSnapshot"), a.setData(b, function() {
                c.hide();
                var b = a.createRange();
                b.moveToElementEditStart(a.editable()), b.select(), setTimeout(function() {
                    a.fire("saveSnapshot");
                }, 0);
            })) : (a.insertHtml(b), c.hide());
        }
        function d(a) {
            var b = a.data.getTarget(), c = f.equals(b);
            if (c || f.contains(b)) {
                var d, e = a.data.getKeystroke(), g = f.getElementsByTag("a");
                if (g) {
                    if (c) d = g.getItem(0); else switch (e) {
                      case 40:
                        d = b.getNext();
                        break;

                      case 38:
                        d = b.getPrevious();
                        break;

                      case 13:
                      case 32:
                        b.fire("click");
                    }
                    d && (d.focus(), a.data.preventDefault());
                }
            }
        }
        var e = CKEDITOR.plugins.get("templates");
        CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(e.path + "dialogs/templates.css"));
        var f, e = "cke_tpl_list_label_" + CKEDITOR.tools.getNextNumber(), g = a.lang.templates, h = a.config;
        return {
            title: a.lang.templates.title,
            minWidth: CKEDITOR.env.ie ? 440 : 400,
            minHeight: 340,
            contents: [ {
                id: "selectTpl",
                label: g.title,
                elements: [ {
                    type: "vbox",
                    padding: 5,
                    children: [ {
                        id: "selectTplText",
                        type: "html",
                        html: "<span>" + g.selectPromptMsg + "</span>"
                    }, {
                        id: "templatesList",
                        type: "html",
                        focus: !0,
                        html: '<div class="cke_tpl_list" tabIndex="-1" role="listbox" aria-labelledby="' + e + '"><div class="cke_tpl_loading"><span></span></div></div><span class="cke_voice_label" id="' + e + '">' + g.options + "</span>"
                    }, {
                        id: "chkInsertOpt",
                        type: "checkbox",
                        label: g.insertOption,
                        "default": h.templates_replaceContent
                    } ]
                } ]
            } ],
            buttons: [ CKEDITOR.dialog.cancelButton ],
            onShow: function() {
                var a = this.getContentElement("selectTpl", "templatesList");
                f = a.getElement(), CKEDITOR.loadTemplates(h.templates_files, function() {
                    var c = (h.templates || "default").split(",");
                    if (c.length) {
                        var d = f;
                        d.setHtml("");
                        for (var e = 0, i = c.length; i > e; e++) for (var j = CKEDITOR.getTemplates(c[e]), k = j.imagesPath, j = j.templates, l = j.length, m = 0; l > m; m++) {
                            var n = b(j[m], k);
                            n.setAttribute("aria-posinset", m + 1), n.setAttribute("aria-setsize", l), d.append(n);
                        }
                        a.focus();
                    } else f.setHtml('<div class="cke_tpl_empty"><span>' + g.emptyListMsg + "</span></div>");
                }), this._.element.on("keydown", d);
            },
            onHide: function() {
                this._.element.removeListener("keydown", d);
            }
        };
    });
}();