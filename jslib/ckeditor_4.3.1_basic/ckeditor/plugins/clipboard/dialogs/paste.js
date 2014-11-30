CKEDITOR.dialog.add("paste", function(a) {
    function b(b) {
        var c = new CKEDITOR.dom.document(b.document), d = c.getBody(), e = c.getById("cke_actscrpt");
        e && e.remove(), d.setAttribute("contenteditable", !0), CKEDITOR.env.ie && 8 > CKEDITOR.env.version && c.getWindow().on("blur", function() {
            c.$.selection.empty();
        }), c.on("keydown", function(a) {
            var b, a = a.data;
            switch (a.getKeystroke()) {
              case 27:
                this.hide(), b = 1;
                break;

              case 9:
              case CKEDITOR.SHIFT + 9:
                this.changeFocus(1), b = 1;
            }
            b && a.preventDefault();
        }, this), a.fire("ariaWidget", new CKEDITOR.dom.element(b.frameElement)), c.getWindow().getFrame().removeCustomData("pendingFocus") && d.focus();
    }
    var c = a.lang.clipboard;
    return a.on("pasteDialogCommit", function(b) {
        b.data && a.fire("paste", {
            type: "auto",
            dataValue: b.data
        });
    }, null, null, 1e3), {
        title: c.title,
        minWidth: CKEDITOR.env.ie && CKEDITOR.env.quirks ? 370 : 350,
        minHeight: CKEDITOR.env.quirks ? 250 : 245,
        onShow: function() {
            this.parts.dialog.$.offsetHeight, this.setupContent(), this.parts.title.setHtml(this.customTitle || c.title), 
            this.customTitle = null;
        },
        onLoad: function() {
            (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && "rtl" == a.lang.dir && this.parts.contents.setStyle("overflow", "hidden");
        },
        onOk: function() {
            this.commitContent();
        },
        contents: [ {
            id: "general",
            label: a.lang.common.generalTab,
            elements: [ {
                type: "html",
                id: "securityMsg",
                html: '<div style="white-space:normal;width:340px">' + c.securityMsg + "</div>"
            }, {
                type: "html",
                id: "pasteMsg",
                html: '<div style="white-space:normal;width:340px">' + c.pasteMsg + "</div>"
            }, {
                type: "html",
                id: "editing_area",
                style: "width:100%;height:100%",
                html: "",
                focus: function() {
                    var a = this.getInputElement(), b = a.getFrameDocument().getBody();
                    !b || b.isReadOnly() ? a.setCustomData("pendingFocus", 1) : b.focus();
                },
                setup: function() {
                    var d = this.getDialog(), e = '<html dir="' + a.config.contentsLangDirection + '" lang="' + (a.config.contentsLanguage || a.langCode) + '"><head><style>body{margin:3px;height:95%}</style></head><body><script id="cke_actscrpt" type="text/javascript">window.parent.CKEDITOR.tools.callFunction(' + CKEDITOR.tools.addFunction(b, d) + ",this);</script></body></html>", f = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + '})())"' : "", g = CKEDITOR.dom.element.createFromHtml('<iframe class="cke_pasteframe" frameborder="0"  allowTransparency="true" src="' + f + '" role="region" aria-label="' + c.pasteArea + '" aria-describedby="' + d.getContentElement("general", "pasteMsg").domId + '" aria-multiple="true"></iframe>');
                    if (g.on("load", function(c) {
                        c.removeListener(), c = g.getFrameDocument(), c.write(e), a.focusManager.add(c.getBody()), 
                        CKEDITOR.env.air && b.call(this, c.getWindow().$);
                    }, d), g.setCustomData("dialog", d), d = this.getElement(), d.setHtml(""), d.append(g), 
                    CKEDITOR.env.ie) {
                        var h = CKEDITOR.dom.element.createFromHtml('<span tabindex="-1" style="position:absolute" role="presentation"></span>');
                        h.on("focus", function() {
                            setTimeout(function() {
                                g.$.contentWindow.focus();
                            });
                        }), d.append(h), this.focus = function() {
                            h.focus(), this.fire("focus");
                        };
                    }
                    this.getInputElement = function() {
                        return g;
                    }, CKEDITOR.env.ie && (d.setStyle("display", "block"), d.setStyle("height", g.$.offsetHeight + 2 + "px"));
                },
                commit: function() {
                    var a, b = this.getDialog().getParentEditor(), c = this.getInputElement().getFrameDocument().getBody(), d = c.getBogus();
                    d && d.remove(), a = c.getHtml(), setTimeout(function() {
                        b.fire("pasteDialogCommit", a);
                    }, 0);
                }
            } ]
        } ]
    };
});