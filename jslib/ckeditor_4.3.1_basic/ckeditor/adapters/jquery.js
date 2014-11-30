!function(a) {
    CKEDITOR.config.jqueryOverrideVal = "undefined" == typeof CKEDITOR.config.jqueryOverrideVal ? !0 : CKEDITOR.config.jqueryOverrideVal, 
    "undefined" != typeof a && (a.extend(a.fn, {
        ckeditorGet: function() {
            var a = this.eq(0).data("ckeditorInstance");
            if (!a) throw "CKEditor is not initialized yet, use ckeditor() with a callback.";
            return a;
        },
        ckeditor: function(b, c) {
            if (!CKEDITOR.env.isCompatible) throw Error("The environment is incompatible.");
            if (!a.isFunction(b)) var d = c, c = b, b = d;
            var e = [], c = c || {};
            this.each(function() {
                var d = a(this), f = d.data("ckeditorInstance"), g = d.data("_ckeditorInstanceLock"), h = this, i = new a.Deferred();
                e.push(i.promise()), f && !g ? (b && b.apply(f, [ this ]), i.resolve()) : g ? f.once("instanceReady", function() {
                    setTimeout(function() {
                        f.element ? (f.element.$ == h && b && b.apply(f, [ h ]), i.resolve()) : setTimeout(arguments.callee, 100);
                    }, 0);
                }, null, null, 9999) : ((c.autoUpdateElement || "undefined" == typeof c.autoUpdateElement && CKEDITOR.config.autoUpdateElement) && (c.autoUpdateElementJquery = !0), 
                c.autoUpdateElement = !1, d.data("_ckeditorInstanceLock", !0), f = a(this).is("textarea") ? CKEDITOR.replace(h, c) : CKEDITOR.inline(h, c), 
                d.data("ckeditorInstance", f), f.on("instanceReady", function(c) {
                    var e = c.editor;
                    setTimeout(function() {
                        if (e.element) {
                            if (c.removeListener(), e.on("dataReady", function() {
                                d.trigger("dataReady.ckeditor", [ e ]);
                            }), e.on("setData", function(a) {
                                d.trigger("setData.ckeditor", [ e, a.data ]);
                            }), e.on("getData", function(a) {
                                d.trigger("getData.ckeditor", [ e, a.data ]);
                            }, 999), e.on("destroy", function() {
                                d.trigger("destroy.ckeditor", [ e ]);
                            }), e.on("save", function() {
                                return a(h.form).submit(), !1;
                            }, null, null, 20), e.config.autoUpdateElementJquery && d.is("textarea") && a(h.form).length) {
                                var f = function() {
                                    d.ckeditor(function() {
                                        e.updateElement();
                                    });
                                };
                                a(h.form).submit(f), a(h.form).bind("form-pre-serialize", f), d.bind("destroy.ckeditor", function() {
                                    a(h.form).unbind("submit", f), a(h.form).unbind("form-pre-serialize", f);
                                });
                            }
                            e.on("destroy", function() {
                                d.removeData("ckeditorInstance");
                            }), d.removeData("_ckeditorInstanceLock"), d.trigger("instanceReady.ckeditor", [ e ]), 
                            b && b.apply(e, [ h ]), i.resolve();
                        } else setTimeout(arguments.callee, 100);
                    }, 0);
                }, null, null, 9999));
            });
            var f = new a.Deferred();
            return this.promise = f.promise(), a.when.apply(this, e).then(function() {
                f.resolve();
            }), this.editor = this.eq(0).data("ckeditorInstance"), this;
        }
    }), CKEDITOR.config.jqueryOverrideVal && (a.fn.val = CKEDITOR.tools.override(a.fn.val, function(b) {
        return function(c) {
            if (arguments.length) {
                var d = this, e = [], f = this.each(function() {
                    var d = a(this), f = d.data("ckeditorInstance");
                    if (d.is("textarea") && f) {
                        var g = new a.Deferred();
                        return f.setData(c, function() {
                            g.resolve();
                        }), e.push(g.promise()), !0;
                    }
                    return b.call(d, c);
                });
                if (e.length) {
                    var g = new a.Deferred();
                    return a.when.apply(this, e).done(function() {
                        g.resolveWith(d);
                    }), g.promise();
                }
                return f;
            }
            var f = a(this).eq(0), h = f.data("ckeditorInstance");
            return f.is("textarea") && h ? h.getData() : b.call(f);
        };
    })));
}(window.jQuery);