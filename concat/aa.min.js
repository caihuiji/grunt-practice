!function() {
    window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function() {
        var a = {
            timestamp: "DBAA",
            version: "4.3.1",
            revision: "3ecd0b8",
            rnd: Math.floor(900 * Math.random()) + 100,
            _: {
                pending: []
            },
            status: "unloaded",
            basePath: function() {
                var a = window.CKEDITOR_BASEPATH || "";
                if (!a) for (var b = document.getElementsByTagName("script"), c = 0; c < b.length; c++) {
                    var d = b[c].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                    if (d) {
                        a = d[1];
                        break;
                    }
                }
                if (-1 == a.indexOf(":/") && (a = 0 === a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] + a), 
                !a) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return a;
            }(),
            getUrl: function(a) {
                return -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a), 
                this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp), 
                a;
            },
            domReady: function() {
                function a() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), 
                        b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), 
                        b());
                    } catch (c) {}
                }
                function b() {
                    for (var a; a = c.shift(); ) a();
                }
                var c = [];
                return function(b) {
                    if (c.push(b), "complete" === document.readyState && setTimeout(a, 1), 1 == c.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), 
                    window.addEventListener("load", a, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", a), window.attachEvent("onload", a), 
                        b = !1;
                        try {
                            b = !window.frameElement;
                        } catch (d) {}
                        if (document.documentElement.doScroll && b) {
                            var e = function() {
                                try {
                                    document.documentElement.doScroll("left");
                                } catch (b) {
                                    return void setTimeout(e, 1);
                                }
                                a();
                            };
                            e();
                        }
                    }
                };
            }()
        }, b = window.CKEDITOR_GETURL;
        if (b) {
            var c = a.getUrl;
            a.getUrl = function(d) {
                return b.call(a, d) || c.call(a, d);
            };
        }
        return a;
    }()), CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(a) {
        var b, c = CKEDITOR.event.prototype;
        for (b in c) void 0 == a[b] && (a[b] = c[b]);
    }, CKEDITOR.event.prototype = function() {
        function a(a) {
            var d = b(this);
            return d[a] || (d[a] = new c(a));
        }
        var b = function(a) {
            return a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}), a.events || (a.events = {});
        }, c = function(a) {
            this.name = a, this.listeners = [];
        };
        return c.prototype = {
            getListenerIndex: function(a) {
                for (var b = 0, c = this.listeners; b < c.length; b++) if (c[b].fn == a) return b;
                return -1;
            }
        }, {
            define: function(b, c) {
                var d = a.call(this, b);
                CKEDITOR.tools.extend(d, c, !0);
            },
            on: function(b, c, d, e, f) {
                function g(a, f, g, i) {
                    return a = {
                        name: b,
                        sender: this,
                        editor: a,
                        data: f,
                        listenerData: e,
                        stop: g,
                        cancel: i,
                        removeListener: h
                    }, c.call(d, a) === !1 ? !1 : a.data;
                }
                function h() {
                    j.removeListener(b, c);
                }
                var i = a.call(this, b);
                if (i.getListenerIndex(c) < 0) {
                    i = i.listeners, d || (d = this), isNaN(f) && (f = 10);
                    var j = this;
                    g.fn = c, g.priority = f;
                    for (var k = i.length - 1; k >= 0; k--) if (i[k].priority <= f) return i.splice(k + 1, 0, g), 
                    {
                        removeListener: h
                    };
                    i.unshift(g);
                }
                return {
                    removeListener: h
                };
            },
            once: function() {
                var a = arguments[1];
                return arguments[1] = function(b) {
                    return b.removeListener(), a.apply(this, arguments);
                }, this.on.apply(this, arguments);
            },
            capture: function() {
                CKEDITOR.event.useCapture = 1;
                var a = this.on.apply(this, arguments);
                return CKEDITOR.event.useCapture = 0, a;
            },
            fire: function() {
                var a = 0, c = function() {
                    a = 1;
                }, d = 0, e = function() {
                    d = 1;
                };
                return function(f, g, h) {
                    var i = b(this)[f], f = a, j = d;
                    if (a = d = 0, i) {
                        var k = i.listeners;
                        if (k.length) for (var l, k = k.slice(0), m = 0; m < k.length; m++) {
                            if (i.errorProof) try {
                                l = k[m].call(this, h, g, c, e);
                            } catch (n) {} else l = k[m].call(this, h, g, c, e);
                            if (l === !1 ? d = 1 : "undefined" != typeof l && (g = l), a || d) break;
                        }
                    }
                    return g = d ? !1 : "undefined" == typeof g ? !0 : g, a = f, d = j, g;
                };
            }(),
            fireOnce: function(a, c, d) {
                return c = this.fire(a, c, d), delete b(this)[a], c;
            },
            removeListener: function(a, c) {
                var d = b(this)[a];
                if (d) {
                    var e = d.getListenerIndex(c);
                    e >= 0 && d.listeners.splice(e, 1);
                }
            },
            removeAllListeners: function() {
                var a, c = b(this);
                for (a in c) delete c[a];
            },
            hasListeners: function(a) {
                return (a = b(this)[a]) && a.listeners.length > 0;
            }
        };
    }()), CKEDITOR.editor || (CKEDITOR.editor = function() {
        CKEDITOR._.pending.push([ this, arguments ]), CKEDITOR.event.call(this);
    }, CKEDITOR.editor.prototype.fire = function(a, b) {
        return a in {
            instanceReady: 1,
            loaded: 1
        } && (this[a] = !0), CKEDITOR.event.prototype.fire.call(this, a, b, this);
    }, CKEDITOR.editor.prototype.fireOnce = function(a, b) {
        return a in {
            instanceReady: 1,
            loaded: 1
        } && (this[a] = !0), CKEDITOR.event.prototype.fireOnce.call(this, a, b, this);
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
        var a = navigator.userAgent.toLowerCase(), b = window.opera, c = {
            ie: a.indexOf("trident/") > -1,
            opera: !!b && b.version,
            webkit: a.indexOf(" applewebkit/") > -1,
            air: a.indexOf(" adobeair/") > -1,
            mac: a.indexOf("macintosh") > -1,
            quirks: "BackCompat" == document.compatMode && (!document.documentMode || document.documentMode < 10),
            mobile: a.indexOf("mobile") > -1,
            iOS: /(ipad|iphone|ipod)/.test(a),
            isCustomDomain: function() {
                if (!this.ie) return !1;
                var a = document.domain, b = window.location.hostname;
                return a != b && a != "[" + b + "]";
            },
            secure: "https:" == location.protocol
        };
        c.gecko = "Gecko" == navigator.product && !c.webkit && !c.opera && !c.ie, c.webkit && (a.indexOf("chrome") > -1 ? c.chrome = !0 : c.safari = !0);
        var d = 0;
        if (c.ie && (d = c.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, 
        c.ie9Compat = 9 == d, c.ie8Compat = 8 == d, c.ie7Compat = 7 == d, c.ie6Compat = 7 > d || c.quirks), 
        c.gecko) {
            var e = a.match(/rv:([\d\.]+)/);
            e && (e = e[1].split("."), d = 1e4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0));
        }
        return c.opera && (d = parseFloat(b.version())), c.air && (d = parseFloat(a.match(/ adobeair\/(\d+)/)[1])), 
        c.webkit && (d = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])), c.version = d, 
        c.isCompatible = c.iOS && d >= 534 || !c.mobile && (c.ie && d > 6 || c.gecko && d >= 10801 || c.opera && d >= 9.5 || c.air && d >= 1 || c.webkit && d >= 522 || !1), 
        c.hidpi = window.devicePixelRatio >= 2, c.needsBrFiller = c.gecko || c.webkit || c.ie && d > 10, 
        c.needsNbspFiller = c.ie && 11 > d, c.cssClass = "cke_browser_" + (c.ie ? "ie" : c.gecko ? "gecko" : c.opera ? "opera" : c.webkit ? "webkit" : "unknown"), 
        c.quirks && (c.cssClass = c.cssClass + " cke_browser_quirks"), c.ie && (c.cssClass = c.cssClass + (" cke_browser_ie" + (c.quirks || c.version < 7 ? "6" : c.version)), 
        c.quirks && (c.cssClass = c.cssClass + " cke_browser_iequirks")), c.gecko && (10900 > d ? c.cssClass = c.cssClass + " cke_browser_gecko18" : 11e3 >= d && (c.cssClass = c.cssClass + " cke_browser_gecko19")), 
        c.air && (c.cssClass = c.cssClass + " cke_browser_air"), c.iOS && (c.cssClass = c.cssClass + " cke_browser_ios"), 
        c.hidpi && (c.cssClass = c.cssClass + " cke_hidpi"), c;
    }()), "unloaded" == CKEDITOR.status && function() {
        CKEDITOR.event.implementOn(CKEDITOR), CKEDITOR.loadFullCore = function() {
            if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else {
                delete CKEDITOR.loadFullCore;
                var a = document.createElement("script");
                a.type = "text/javascript", a.src = CKEDITOR.basePath + "ckeditor.js", document.getElementsByTagName("head")[0].appendChild(a);
            }
        }, CKEDITOR.loadFullCoreTimeout = 0, CKEDITOR.add = function(a) {
            (this._.pending || (this._.pending = [])).push(a);
        }, function() {
            CKEDITOR.domReady(function() {
                var a = CKEDITOR.loadFullCore, b = CKEDITOR.loadFullCoreTimeout;
                a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : b && setTimeout(function() {
                    CKEDITOR.loadFullCore && CKEDITOR.loadFullCore();
                }, 1e3 * b));
            });
        }(), CKEDITOR.status = "basic_loaded";
    }(), CKEDITOR.dom = {}, function() {
        var a = [], b = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.opera ? "-o-" : CKEDITOR.env.ie ? "-ms-" : "";
        CKEDITOR.on("reset", function() {
            a = [];
        }), CKEDITOR.tools = {
            arrayCompare: function(a, b) {
                if (!a && !b) return !0;
                if (!a || !b || a.length != b.length) return !1;
                for (var c = 0; c < a.length; c++) if (a[c] != b[c]) return !1;
                return !0;
            },
            clone: function(a) {
                var b;
                if (a && a instanceof Array) {
                    b = [];
                    for (var c = 0; c < a.length; c++) b[c] = CKEDITOR.tools.clone(a[c]);
                    return b;
                }
                if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp) return a;
                b = new a.constructor();
                for (c in a) b[c] = CKEDITOR.tools.clone(a[c]);
                return b;
            },
            capitalize: function(a, b) {
                return a.charAt(0).toUpperCase() + (b ? a.slice(1) : a.slice(1).toLowerCase());
            },
            extend: function(a) {
                var b, c, d = arguments.length;
                "boolean" == typeof (b = arguments[d - 1]) ? d-- : "boolean" == typeof (b = arguments[d - 2]) && (c = arguments[d - 1], 
                d -= 2);
                for (var e = 1; d > e; e++) {
                    var f, g = arguments[e];
                    for (f in g) (b === !0 || void 0 == a[f]) && (!c || f in c) && (a[f] = g[f]);
                }
                return a;
            },
            prototypedCopy: function(a) {
                var b = function() {};
                return b.prototype = a, new b();
            },
            copy: function(a) {
                var b, c = {};
                for (b in a) c[b] = a[b];
                return c;
            },
            isArray: function(a) {
                return "[object Array]" == Object.prototype.toString.call(a);
            },
            isEmpty: function(a) {
                for (var b in a) if (a.hasOwnProperty(b)) return !1;
                return !0;
            },
            cssVendorPrefix: function(a, c, d) {
                return d ? b + a + ":" + c + ";" + a + ":" + c : (d = {}, d[a] = c, d[b + a] = c, 
                d);
            },
            cssStyleToDomStyle: function() {
                var a = document.createElement("div").style, b = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float";
                return function(a) {
                    return "float" == a ? b : a.replace(/-./g, function(a) {
                        return a.substr(1).toUpperCase();
                    });
                };
            }(),
            buildStyleHtml: function(a) {
                for (var b, a = [].concat(a), c = [], d = 0; d < a.length; d++) (b = a[d]) && c.push(/@import|[{}]/.test(b) ? "<style>" + b + "</style>" : '<link type="text/css" rel=stylesheet href="' + b + '">');
                return c.join("");
            },
            htmlEncode: function(a) {
                return ("" + a).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
            },
            htmlEncodeAttr: function(a) {
                return a.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            },
            htmlDecodeAttr: function(a) {
                return a.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            },
            getNextNumber: function() {
                var a = 0;
                return function() {
                    return ++a;
                };
            }(),
            getNextId: function() {
                return "cke_" + this.getNextNumber();
            },
            override: function(a, b) {
                var c = b(a);
                return c.prototype = a.prototype, c;
            },
            setTimeout: function(a, b, c, d, e) {
                return e || (e = window), c || (c = e), e.setTimeout(function() {
                    d ? a.apply(c, [].concat(d)) : a.apply(c);
                }, b || 0);
            },
            trim: function() {
                var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function(b) {
                    return b.replace(a, "");
                };
            }(),
            ltrim: function() {
                var a = /^[ \t\n\r]+/g;
                return function(b) {
                    return b.replace(a, "");
                };
            }(),
            rtrim: function() {
                var a = /[ \t\n\r]+$/g;
                return function(b) {
                    return b.replace(a, "");
                };
            }(),
            indexOf: function(a, b) {
                if ("function" == typeof b) {
                    for (var c = 0, d = a.length; d > c; c++) if (b(a[c])) return c;
                } else {
                    if (a.indexOf) return a.indexOf(b);
                    for (c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
                }
                return -1;
            },
            search: function(a, b) {
                var c = CKEDITOR.tools.indexOf(a, b);
                return c >= 0 ? a[c] : null;
            },
            bind: function(a, b) {
                return function() {
                    return a.apply(b, arguments);
                };
            },
            createClass: function(a) {
                var b = a.$, c = a.base, d = a.privates || a._, e = a.proto, a = a.statics;
                if (!b && (b = function() {
                    c && this.base.apply(this, arguments);
                }), d) var f = b, b = function() {
                    var a, b = this._ || (this._ = {});
                    for (a in d) {
                        var c = d[a];
                        b[a] = "function" == typeof c ? CKEDITOR.tools.bind(c, this) : c;
                    }
                    f.apply(this, arguments);
                };
                return c && (b.prototype = this.prototypedCopy(c.prototype), b.prototype.constructor = b, 
                b.base = c, b.baseProto = c.prototype, b.prototype.base = function() {
                    this.base = c.prototype.base, c.apply(this, arguments), this.base = arguments.callee;
                }), e && this.extend(b.prototype, e, !0), a && this.extend(b, a, !0), b;
            },
            addFunction: function(b, c) {
                return a.push(function() {
                    return b.apply(c || this, arguments);
                }) - 1;
            },
            removeFunction: function(b) {
                a[b] = null;
            },
            callFunction: function(b) {
                var c = a[b];
                return c && c.apply(window, Array.prototype.slice.call(arguments, 1));
            },
            cssLength: function() {
                var a, b = /^-?\d+\.?\d*px$/;
                return function(c) {
                    return a = CKEDITOR.tools.trim(c + "") + "px", b.test(a) ? a : c || "";
                };
            }(),
            convertToPx: function() {
                var a;
                return function(b) {
                    return a || (a = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document), 
                    CKEDITOR.document.getBody().append(a)), /%$/.test(b) ? b : (a.setStyle("width", b), 
                    a.$.clientWidth);
                };
            }(),
            repeat: function(a, b) {
                return Array(b + 1).join(a);
            },
            tryThese: function() {
                for (var a, b = 0, c = arguments.length; c > b; b++) {
                    var d = arguments[b];
                    try {
                        a = d();
                        break;
                    } catch (e) {}
                }
                return a;
            },
            genKey: function() {
                return Array.prototype.slice.call(arguments).join("-");
            },
            defer: function(a) {
                return function() {
                    var b = arguments, c = this;
                    window.setTimeout(function() {
                        a.apply(c, b);
                    }, 0);
                };
            },
            normalizeCssText: function(a, b) {
                var c, d = [], e = CKEDITOR.tools.parseCssText(a, !0, b);
                for (c in e) d.push(c + ":" + e[c]);
                return d.sort(), d.length ? d.join(";") + ";" : "";
            },
            convertRgbToHex: function(a) {
                return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, c, d) {
                    for (a = [ b, c, d ], b = 0; 3 > b; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                    return "#" + a.join("");
                });
            },
            parseCssText: function(a, b, c) {
                var d = {};
                return c && (c = new CKEDITOR.dom.element("span"), c.setAttribute("style", a), a = CKEDITOR.tools.convertRgbToHex(c.getAttribute("style") || "")), 
                a && ";" != a ? (a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, e) {
                    b && (c = c.toLowerCase(), "font-family" == c && (e = e.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ",")), 
                    e = CKEDITOR.tools.trim(e)), d[c] = e;
                }), d) : d;
            },
            writeCssText: function(a, b) {
                var c, d = [];
                for (c in a) d.push(c + ":" + a[c]);
                return b && d.sort(), d.join("; ");
            },
            objectCompare: function(a, b, c) {
                var d;
                if (!a && !b) return !0;
                if (!a || !b) return !1;
                for (d in a) if (a[d] != b[d]) return !1;
                if (!c) for (d in b) if (a[d] != b[d]) return !1;
                return !0;
            },
            objectKeys: function(a) {
                var b, c = [];
                for (b in a) c.push(b);
                return c;
            },
            convertArrayToObject: function(a, b) {
                var c = {};
                1 == arguments.length && (b = !0);
                for (var d = 0, e = a.length; e > d; ++d) c[a[d]] = b;
                return c;
            },
            fixDomain: function() {
                for (var a; ;) try {
                    a = window.parent.document.domain;
                    break;
                } catch (b) {
                    if (a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain, !a) break;
                    document.domain = a;
                }
                return !!a;
            },
            eventsBuffer: function(a, b) {
                function c() {
                    e = new Date().getTime(), d = !1, b();
                }
                var d, e = 0;
                return {
                    input: function() {
                        if (!d) {
                            var b = new Date().getTime() - e;
                            a > b ? d = setTimeout(c, a - b) : c();
                        }
                    },
                    reset: function() {
                        d && clearTimeout(d), d = e = 0;
                    }
                };
            },
            enableHtml5Elements: function(a, b) {
                for (var c, d = [ "abbr", "article", "aside", "audio", "bdi", "canvas", "data", "datalist", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "meter", "nav", "output", "progress", "section", "summary", "time", "video" ], e = d.length; e--; ) c = a.createElement(d[e]), 
                b && a.appendChild(c);
            }
        };
    }(), CKEDITOR.dtd = function() {
        var a = CKEDITOR.tools.extend, b = function(a, b) {
            for (var c = CKEDITOR.tools.clone(a), d = 1; d < arguments.length; d++) {
                var e, b = arguments[d];
                for (e in b) delete c[e];
            }
            return c;
        }, c = {}, d = {}, e = {
            address: 1,
            article: 1,
            aside: 1,
            blockquote: 1,
            details: 1,
            div: 1,
            dl: 1,
            fieldset: 1,
            figure: 1,
            footer: 1,
            form: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            header: 1,
            hgroup: 1,
            hr: 1,
            menu: 1,
            nav: 1,
            ol: 1,
            p: 1,
            pre: 1,
            section: 1,
            table: 1,
            ul: 1
        }, f = {
            command: 1,
            link: 1,
            meta: 1,
            noscript: 1,
            script: 1,
            style: 1
        }, g = {}, h = {
            "#": 1
        }, i = {
            center: 1,
            dir: 1,
            noframes: 1
        };
        return a(c, {
            a: 1,
            abbr: 1,
            area: 1,
            audio: 1,
            b: 1,
            bdi: 1,
            bdo: 1,
            br: 1,
            button: 1,
            canvas: 1,
            cite: 1,
            code: 1,
            command: 1,
            datalist: 1,
            del: 1,
            dfn: 1,
            em: 1,
            embed: 1,
            i: 1,
            iframe: 1,
            img: 1,
            input: 1,
            ins: 1,
            kbd: 1,
            keygen: 1,
            label: 1,
            map: 1,
            mark: 1,
            meter: 1,
            noscript: 1,
            object: 1,
            output: 1,
            progress: 1,
            q: 1,
            ruby: 1,
            s: 1,
            samp: 1,
            script: 1,
            select: 1,
            small: 1,
            span: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            textarea: 1,
            time: 1,
            u: 1,
            "var": 1,
            video: 1,
            wbr: 1
        }, h, {
            acronym: 1,
            applet: 1,
            basefont: 1,
            big: 1,
            font: 1,
            isindex: 1,
            strike: 1,
            style: 1,
            tt: 1
        }), a(d, e, c, i), b = {
            a: b(c, {
                a: 1,
                button: 1
            }),
            abbr: c,
            address: d,
            area: g,
            article: a({
                style: 1
            }, d),
            aside: a({
                style: 1
            }, d),
            audio: a({
                source: 1,
                track: 1
            }, d),
            b: c,
            base: g,
            bdi: c,
            bdo: c,
            blockquote: d,
            body: d,
            br: g,
            button: b(c, {
                a: 1,
                button: 1
            }),
            canvas: c,
            caption: d,
            cite: c,
            code: c,
            col: g,
            colgroup: {
                col: 1
            },
            command: g,
            datalist: a({
                option: 1
            }, c),
            dd: d,
            del: c,
            details: a({
                summary: 1
            }, d),
            dfn: c,
            div: a({
                style: 1
            }, d),
            dl: {
                dt: 1,
                dd: 1
            },
            dt: d,
            em: c,
            embed: g,
            fieldset: a({
                legend: 1
            }, d),
            figcaption: d,
            figure: a({
                figcaption: 1
            }, d),
            footer: d,
            form: d,
            h1: c,
            h2: c,
            h3: c,
            h4: c,
            h5: c,
            h6: c,
            head: a({
                title: 1,
                base: 1
            }, f),
            header: d,
            hgroup: {
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1
            },
            hr: g,
            html: a({
                head: 1,
                body: 1
            }, d, f),
            i: c,
            iframe: h,
            img: g,
            input: g,
            ins: c,
            kbd: c,
            keygen: g,
            label: c,
            legend: c,
            li: d,
            link: g,
            map: d,
            mark: c,
            menu: a({
                li: 1
            }, d),
            meta: g,
            meter: b(c, {
                meter: 1
            }),
            nav: d,
            noscript: a({
                link: 1,
                meta: 1,
                style: 1
            }, c),
            object: a({
                param: 1
            }, c),
            ol: {
                li: 1
            },
            optgroup: {
                option: 1
            },
            option: h,
            output: c,
            p: c,
            param: g,
            pre: c,
            progress: b(c, {
                progress: 1
            }),
            q: c,
            rp: c,
            rt: c,
            ruby: a({
                rp: 1,
                rt: 1
            }, c),
            s: c,
            samp: c,
            script: h,
            section: a({
                style: 1
            }, d),
            select: {
                optgroup: 1,
                option: 1
            },
            small: c,
            source: g,
            span: c,
            strong: c,
            style: h,
            sub: c,
            summary: c,
            sup: c,
            table: {
                caption: 1,
                colgroup: 1,
                thead: 1,
                tfoot: 1,
                tbody: 1,
                tr: 1
            },
            tbody: {
                tr: 1
            },
            td: d,
            textarea: h,
            tfoot: {
                tr: 1
            },
            th: d,
            thead: {
                tr: 1
            },
            time: b(c, {
                time: 1
            }),
            title: h,
            tr: {
                th: 1,
                td: 1
            },
            track: g,
            u: c,
            ul: {
                li: 1
            },
            "var": c,
            video: a({
                source: 1,
                track: 1
            }, d),
            wbr: g,
            acronym: c,
            applet: a({
                param: 1
            }, d),
            basefont: g,
            big: c,
            center: d,
            dialog: g,
            dir: {
                li: 1
            },
            font: c,
            isindex: g,
            noframes: d,
            strike: c,
            tt: c
        }, a(b, {
            $block: a({
                audio: 1,
                dd: 1,
                dt: 1,
                figcaption: 1,
                li: 1,
                video: 1
            }, e, i),
            $blockLimit: {
                article: 1,
                aside: 1,
                audio: 1,
                body: 1,
                caption: 1,
                details: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figcaption: 1,
                figure: 1,
                footer: 1,
                form: 1,
                header: 1,
                hgroup: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                section: 1,
                table: 1,
                td: 1,
                th: 1,
                tr: 1,
                ul: 1,
                video: 1
            },
            $cdata: {
                script: 1,
                style: 1
            },
            $editable: {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                body: 1,
                details: 1,
                div: 1,
                fieldset: 1,
                figcaption: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                nav: 1,
                p: 1,
                pre: 1,
                section: 1
            },
            $empty: {
                area: 1,
                base: 1,
                basefont: 1,
                br: 1,
                col: 1,
                command: 1,
                dialog: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                isindex: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                track: 1,
                wbr: 1
            },
            $inline: c,
            $list: {
                dl: 1,
                ol: 1,
                ul: 1
            },
            $listItem: {
                dd: 1,
                dt: 1,
                li: 1
            },
            $nonBodyContent: a({
                body: 1,
                head: 1,
                html: 1
            }, b.head),
            $nonEditable: {
                applet: 1,
                audio: 1,
                button: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                option: 1,
                param: 1,
                script: 1,
                textarea: 1,
                video: 1
            },
            $object: {
                applet: 1,
                audio: 1,
                button: 1,
                hr: 1,
                iframe: 1,
                img: 1,
                input: 1,
                object: 1,
                select: 1,
                table: 1,
                textarea: 1,
                video: 1
            },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                mark: 1,
                meter: 1,
                output: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                time: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            $tabIndex: {
                a: 1,
                area: 1,
                button: 1,
                input: 1,
                object: 1,
                select: 1,
                textarea: 1
            },
            $tableContent: {
                caption: 1,
                col: 1,
                colgroup: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            },
            $transparent: {
                a: 1,
                audio: 1,
                canvas: 1,
                del: 1,
                ins: 1,
                map: 1,
                noscript: 1,
                object: 1,
                video: 1
            },
            $intermediate: {
                caption: 1,
                colgroup: 1,
                dd: 1,
                dt: 1,
                figcaption: 1,
                legend: 1,
                li: 1,
                optgroup: 1,
                option: 1,
                rp: 1,
                rt: 1,
                summary: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            }
        }), b;
    }(), CKEDITOR.dom.event = function(a) {
        this.$ = a;
    }, CKEDITOR.dom.event.prototype = {
        getKey: function() {
            return this.$.keyCode || this.$.which;
        },
        getKeystroke: function() {
            var a = this.getKey();
            return (this.$.ctrlKey || this.$.metaKey) && (a += CKEDITOR.CTRL), this.$.shiftKey && (a += CKEDITOR.SHIFT), 
            this.$.altKey && (a += CKEDITOR.ALT), a;
        },
        preventDefault: function(a) {
            var b = this.$;
            b.preventDefault ? b.preventDefault() : b.returnValue = !1, a && this.stopPropagation();
        },
        stopPropagation: function() {
            var a = this.$;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
        },
        getTarget: function() {
            var a = this.$.target || this.$.srcElement;
            return a ? new CKEDITOR.dom.node(a) : null;
        },
        getPhase: function() {
            return this.$.eventPhase || 2;
        },
        getPageOffset: function() {
            var a = this.getTarget().getDocument().$;
            return {
                x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft),
                y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop)
            };
        }
    }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, 
    CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function(a) {
        a && (this.$ = a);
    }, CKEDITOR.dom.domObject.prototype = function() {
        var a = function(a, b) {
            return function(c) {
                "undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c));
            };
        };
        return {
            getPrivate: function() {
                var a;
                return (a = this.getCustomData("_")) || this.setCustomData("_", a = {}), a;
            },
            on: function(b) {
                var c = this.getCustomData("_cke_nativeListeners");
                return c || (c = {}, this.setCustomData("_cke_nativeListeners", c)), c[b] || (c = c[b] = a(this, b), 
                this.$.addEventListener ? this.$.addEventListener(b, c, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + b, c)), 
                CKEDITOR.event.prototype.on.apply(this, arguments);
            },
            removeListener: function(a) {
                if (CKEDITOR.event.prototype.removeListener.apply(this, arguments), !this.hasListeners(a)) {
                    var b = this.getCustomData("_cke_nativeListeners"), c = b && b[a];
                    c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), 
                    delete b[a]);
                }
            },
            removeAllListeners: function() {
                var a, b = this.getCustomData("_cke_nativeListeners");
                for (a in b) {
                    var c = b[a];
                    this.$.detachEvent ? this.$.detachEvent("on" + a, c) : this.$.removeEventListener && this.$.removeEventListener(a, c, !1), 
                    delete b[a];
                }
            }
        };
    }(), function(a) {
        var b = {};
        CKEDITOR.on("reset", function() {
            b = {};
        }), a.equals = function(a) {
            try {
                return a && a.$ === this.$;
            } catch (b) {
                return !1;
            }
        }, a.setCustomData = function(a, c) {
            var d = this.getUniqueId();
            return (b[d] || (b[d] = {}))[a] = c, this;
        }, a.getCustomData = function(a) {
            var c = this.$["data-cke-expando"];
            return (c = c && b[c]) && a in c ? c[a] : null;
        }, a.removeCustomData = function(a) {
            var c, d, e = this.$["data-cke-expando"], e = e && b[e];
            return e && (c = e[a], d = a in e, delete e[a]), d ? c : null;
        }, a.clearCustomData = function() {
            this.removeAllListeners();
            var a = this.$["data-cke-expando"];
            a && delete b[a];
        }, a.getUniqueId = function() {
            return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber());
        }, CKEDITOR.event.implementOn(a);
    }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function(a) {
        return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this;
    }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.NODE_ELEMENT = 1, 
    CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, 
    CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, 
    CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, 
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function(a, b) {
            return a.append(this, b), a;
        },
        clone: function(a, b) {
            var c = this.$.cloneNode(a), d = function(c) {
                if (c["data-cke-expando"] && (c["data-cke-expando"] = !1), c.nodeType == CKEDITOR.NODE_ELEMENT && (b || c.removeAttribute("id", !1), 
                a)) for (var c = c.childNodes, e = 0; e < c.length; e++) d(c[e]);
            };
            return d(c), new CKEDITOR.dom.node(c);
        },
        hasPrevious: function() {
            return !!this.$.previousSibling;
        },
        hasNext: function() {
            return !!this.$.nextSibling;
        },
        insertAfter: function(a) {
            return a.$.parentNode.insertBefore(this.$, a.$.nextSibling), a;
        },
        insertBefore: function(a) {
            return a.$.parentNode.insertBefore(this.$, a.$), a;
        },
        insertBeforeMe: function(a) {
            return this.$.parentNode.insertBefore(a.$, this.$), a;
        },
        getAddress: function(a) {
            for (var b = [], c = this.getDocument().$.documentElement, d = this.$; d && d != c; ) {
                var e = d.parentNode;
                e && b.unshift(this.getIndex.call({
                    $: d
                }, a)), d = e;
            }
            return b;
        },
        getDocument: function() {
            return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument);
        },
        getIndex: function(a) {
            var b, c = this.$, d = -1;
            if (!this.$.parentNode) return d;
            do (!a || c == this.$ || c.nodeType != CKEDITOR.NODE_TEXT || !b && c.nodeValue) && (d++, 
            b = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling);
            return d;
        },
        getNextSourceNode: function(a, b, c) {
            if (c && !c.call) var d = c, c = function(a) {
                return !a.equals(d);
            };
            var e, a = !a && this.getFirst && this.getFirst();
            if (!a) {
                if (this.type == CKEDITOR.NODE_ELEMENT && c && c(this, !0) === !1) return null;
                a = this.getNext();
            }
            for (;!a && (e = (e || this).getParent()); ) {
                if (c && c(e, !0) === !1) return null;
                a = e.getNext();
            }
            return !a || c && c(a) === !1 ? null : b && b != a.type ? a.getNextSourceNode(!1, b, c) : a;
        },
        getPreviousSourceNode: function(a, b, c) {
            if (c && !c.call) var d = c, c = function(a) {
                return !a.equals(d);
            };
            var e, a = !a && this.getLast && this.getLast();
            if (!a) {
                if (this.type == CKEDITOR.NODE_ELEMENT && c && c(this, !0) === !1) return null;
                a = this.getPrevious();
            }
            for (;!a && (e = (e || this).getParent()); ) {
                if (c && c(e, !0) === !1) return null;
                a = e.getPrevious();
            }
            return !a || c && c(a) === !1 ? null : b && a.type != b ? a.getPreviousSourceNode(!1, b, c) : a;
        },
        getPrevious: function(a) {
            var b, c = this.$;
            do b = (c = c.previousSibling) && 10 != c.nodeType && new CKEDITOR.dom.node(c); while (b && a && !a(b));
            return b;
        },
        getNext: function(a) {
            var b, c = this.$;
            do b = (c = c.nextSibling) && new CKEDITOR.dom.node(c); while (b && a && !a(b));
            return b;
        },
        getParent: function(a) {
            var b = this.$.parentNode;
            return b && (b.nodeType == CKEDITOR.NODE_ELEMENT || a && b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(b) : null;
        },
        getParents: function(a) {
            var b = this, c = [];
            do c[a ? "push" : "unshift"](b); while (b = b.getParent());
            return c;
        },
        getCommonAncestor: function(a) {
            if (a.equals(this)) return this;
            if (a.contains && a.contains(this)) return a;
            var b = this.contains ? this : this.getParent();
            do if (b.contains(a)) return b; while (b = b.getParent());
            return null;
        },
        getPosition: function(a) {
            var b = this.$, c = a.$;
            if (b.compareDocumentPosition) return b.compareDocumentPosition(c);
            if (b == c) return CKEDITOR.POSITION_IDENTICAL;
            if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                if (b.contains) {
                    if (b.contains(c)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                    if (c.contains(b)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING;
                }
                if ("sourceIndex" in b) return b.sourceIndex < 0 || c.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : b.sourceIndex < c.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
            }
            for (var b = this.getAddress(), a = a.getAddress(), c = Math.min(b.length, a.length), d = 0; c - 1 >= d; d++) if (b[d] != a[d]) {
                if (c > d) return b[d] < a[d] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                break;
            }
            return b.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING;
        },
        getAscendant: function(a, b) {
            var c, d = this.$;
            for (b || (d = d.parentNode); d; ) {
                if (d.nodeName && (c = d.nodeName.toLowerCase(), "string" == typeof a ? c == a : c in a)) return new CKEDITOR.dom.node(d);
                try {
                    d = d.parentNode;
                } catch (e) {
                    d = null;
                }
            }
            return null;
        },
        hasAscendant: function(a, b) {
            var c = this.$;
            for (b || (c = c.parentNode); c; ) {
                if (c.nodeName && c.nodeName.toLowerCase() == a) return !0;
                c = c.parentNode;
            }
            return !1;
        },
        move: function(a, b) {
            a.append(this.remove(), b);
        },
        remove: function(a) {
            var b = this.$, c = b.parentNode;
            if (c) {
                if (a) for (;a = b.firstChild; ) c.insertBefore(b.removeChild(a), b);
                c.removeChild(b);
            }
            return this;
        },
        replace: function(a) {
            this.insertBefore(a), a.remove();
        },
        trim: function() {
            this.ltrim(), this.rtrim();
        },
        ltrim: function() {
            for (var a; this.getFirst && (a = this.getFirst()); ) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var b = CKEDITOR.tools.ltrim(a.getText()), c = a.getLength();
                    if (!b) {
                        a.remove();
                        continue;
                    }
                    b.length < c && (a.split(c - b.length), this.$.removeChild(this.$.firstChild));
                }
                break;
            }
        },
        rtrim: function() {
            for (var a; this.getLast && (a = this.getLast()); ) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var b = CKEDITOR.tools.rtrim(a.getText()), c = a.getLength();
                    if (!b) {
                        a.remove();
                        continue;
                    }
                    b.length < c && (a.split(b.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
                }
                break;
            }
            CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a);
        },
        isReadOnly: function() {
            var a = this;
            if (this.type != CKEDITOR.NODE_ELEMENT && (a = this.getParent()), a && "undefined" != typeof a.$.isContentEditable) return !(a.$.isContentEditable || a.data("cke-editable"));
            for (;a && !a.data("cke-editable"); ) {
                if ("false" == a.getAttribute("contentEditable")) return !0;
                if ("true" == a.getAttribute("contentEditable")) break;
                a = a.getParent();
            }
            return !a;
        }
    }), CKEDITOR.dom.window = function(a) {
        CKEDITOR.dom.domObject.call(this, a);
    }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function() {
            this.$.focus();
        },
        getViewPaneSize: function() {
            var a = this.$.document, b = "CSS1Compat" == a.compatMode;
            return {
                width: (b ? a.documentElement.clientWidth : a.body.clientWidth) || 0,
                height: (b ? a.documentElement.clientHeight : a.body.clientHeight) || 0
            };
        },
        getScrollPosition: function() {
            var a = this.$;
            return "pageXOffset" in a ? {
                x: a.pageXOffset || 0,
                y: a.pageYOffset || 0
            } : (a = a.document, {
                x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
                y: a.documentElement.scrollTop || a.body.scrollTop || 0
            });
        },
        getFrame: function() {
            var a = this.$.frameElement;
            return a ? new CKEDITOR.dom.element.get(a) : null;
        }
    }), CKEDITOR.dom.document = function(a) {
        CKEDITOR.dom.domObject.call(this, a);
    }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT,
        appendStyleSheet: function(a) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(a); else {
                var b = new CKEDITOR.dom.element("link");
                b.setAttributes({
                    rel: "stylesheet",
                    type: "text/css",
                    href: a
                }), this.getHead().append(b);
            }
        },
        appendStyleText: function(a) {
            if (this.$.createStyleSheet) {
                var b = this.$.createStyleSheet("");
                b.cssText = a;
            } else {
                var c = new CKEDITOR.dom.element("style", this);
                c.append(new CKEDITOR.dom.text(a, this)), this.getHead().append(c);
            }
            return b || c.$.sheet;
        },
        createElement: function(a, b) {
            var c = new CKEDITOR.dom.element(a, this);
            return b && (b.attributes && c.setAttributes(b.attributes), b.styles && c.setStyles(b.styles)), 
            c;
        },
        createText: function(a) {
            return new CKEDITOR.dom.text(a, this);
        },
        focus: function() {
            this.getWindow().focus();
        },
        getActive: function() {
            return new CKEDITOR.dom.element(this.$.activeElement);
        },
        getById: function(a) {
            return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null;
        },
        getByAddress: function(a, b) {
            for (var c = this.$.documentElement, d = 0; c && d < a.length; d++) {
                var e = a[d];
                if (b) for (var f = -1, g = 0; g < c.childNodes.length; g++) {
                    var h = c.childNodes[g];
                    if ((b !== !0 || 3 != h.nodeType || !h.previousSibling || 3 != h.previousSibling.nodeType) && (f++, 
                    f == e)) {
                        c = h;
                        break;
                    }
                } else c = c.childNodes[e];
            }
            return c ? new CKEDITOR.dom.node(c) : null;
        },
        getElementsByTag: function(a, b) {
            return (!CKEDITOR.env.ie || document.documentMode > 8) && b && (a = b + ":" + a), 
            new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a));
        },
        getHead: function() {
            var a = this.$.getElementsByTagName("head")[0];
            return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0);
        },
        getBody: function() {
            return new CKEDITOR.dom.element(this.$.body);
        },
        getDocumentElement: function() {
            return new CKEDITOR.dom.element(this.$.documentElement);
        },
        getWindow: function() {
            return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView);
        },
        write: function(a) {
            this.$.open("text/html", "replace"), CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();</script>")), 
            this.$.write(a), this.$.close();
        },
        find: function(a) {
            return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a));
        },
        findOne: function(a) {
            return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null;
        },
        _getHtml5ShivFrag: function() {
            var a = this.getCustomData("html5ShivFrag");
            return a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), 
            this.setCustomData("html5ShivFrag", a)), a;
        }
    }), CKEDITOR.dom.nodeList = function(a) {
        this.$ = a;
    }, CKEDITOR.dom.nodeList.prototype = {
        count: function() {
            return this.$.length;
        },
        getItem: function(a) {
            return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null;
        }
    }, CKEDITOR.dom.element = function(a, b) {
        "string" == typeof a && (a = (b ? b.$ : document).createElement(a)), CKEDITOR.dom.domObject.call(this, a);
    }, CKEDITOR.dom.element.get = function(a) {
        return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a));
    }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node(), CKEDITOR.dom.element.createFromHtml = function(a, b) {
        var c = new CKEDITOR.dom.element("div", b);
        return c.setHtml(a), c.getFirst().remove();
    }, CKEDITOR.dom.element.setMarker = function(a, b, c, d) {
        var e = b.getCustomData("list_marker_id") || b.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), f = b.getCustomData("list_marker_names") || b.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        return a[e] = b, f[c] = 1, b.setCustomData(c, d);
    }, CKEDITOR.dom.element.clearAllMarkers = function(a) {
        for (var b in a) CKEDITOR.dom.element.clearMarkers(a, a[b], 1);
    }, CKEDITOR.dom.element.clearMarkers = function(a, b, c) {
        var d, e = b.getCustomData("list_marker_names"), f = b.getCustomData("list_marker_id");
        for (d in e) b.removeCustomData(d);
        b.removeCustomData("list_marker_names"), c && (b.removeCustomData("list_marker_id"), 
        delete a[f]);
    }, function() {
        function a(a) {
            var b = !0;
            return a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1), 
            function() {
                b || a.removeAttribute("id");
            };
        }
        function b(a, b) {
            return "#" + a.$.id + " " + b.split(/,\s*/).join(", #" + a.$.id + " ");
        }
        function c(a) {
            for (var b = 0, c = 0, e = d[a].length; e > c; c++) b += parseInt(this.getComputedStyle(d[a][c]) || 0, 10) || 0;
            return b;
        }
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT,
            addClass: function(a) {
                var b = this.$.className;
                b && (RegExp("(?:^|\\s)" + a + "(?:\\s|$)", "").test(b) || (b += " " + a)), this.$.className = b || a;
            },
            removeClass: function(a) {
                var b = this.getAttribute("class");
                return b && (a = RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "i"), a.test(b) && ((b = b.replace(a, "").replace(/^\s+/, "")) ? this.setAttribute("class", b) : this.removeAttribute("class"))), 
                this;
            },
            hasClass: function(a) {
                return RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "").test(this.getAttribute("class"));
            },
            append: function(a, b) {
                return "string" == typeof a && (a = this.getDocument().createElement(a)), b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$), 
                a;
            },
            appendHtml: function(a) {
                if (this.$.childNodes.length) {
                    var b = new CKEDITOR.dom.element("div", this.getDocument());
                    b.setHtml(a), b.moveChildren(this);
                } else this.setHtml(a);
            },
            appendText: function(a) {
                void 0 != this.$.text ? this.$.text = this.$.text + a : this.append(new CKEDITOR.dom.text(a));
            },
            appendBogus: function(a) {
                if (a || CKEDITOR.env.needsBrFiller || CKEDITOR.env.opera) {
                    for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText()); ) a = a.getPrevious();
                    a && a.is && a.is("br") || (a = CKEDITOR.env.opera ? this.getDocument().createText("") : this.getDocument().createElement("br"), 
                    CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a));
                }
            },
            breakParent: function(a) {
                var b = new CKEDITOR.dom.range(this.getDocument());
                b.setStartAfter(this), b.setEndAfter(a), a = b.extractContents(), b.insertNode(this.remove()), 
                a.insertAfterNode(this);
            },
            contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ? function(a) {
                var b = this.$;
                return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$);
            } : function(a) {
                return !!(16 & this.$.compareDocumentPosition(a.$));
            },
            focus: function() {
                function a() {
                    try {
                        this.$.focus();
                    } catch (a) {}
                }
                return function(b) {
                    b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this);
                };
            }(),
            getHtml: function() {
                var a = this.$.innerHTML;
                return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a;
            },
            getOuterHtml: function() {
                if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var a = this.$.ownerDocument.createElement("div");
                return a.appendChild(this.$.cloneNode(!0)), a.innerHTML;
            },
            getClientRect: function() {
                var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                return !a.width && (a.width = a.right - a.left), !a.height && (a.height = a.bottom - a.top), 
                a;
            },
            setHtml: CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function(a) {
                try {
                    var b = this.$;
                    if (this.getParent()) return b.innerHTML = a;
                    var c = this.getDocument()._getHtml5ShivFrag();
                    return c.appendChild(b), b.innerHTML = a, c.removeChild(b), a;
                } catch (d) {
                    for (this.$.innerHTML = "", b = new CKEDITOR.dom.element("body", this.getDocument()), 
                    b.$.innerHTML = a, b = b.getChildren(); b.count(); ) this.append(b.getItem(0));
                    return a;
                }
            } : function(a) {
                return this.$.innerHTML = a;
            },
            setText: function(a) {
                return CKEDITOR.dom.element.prototype.setText = void 0 != this.$.innerText ? function(a) {
                    return this.$.innerText = a;
                } : function(a) {
                    return this.$.textContent = a;
                }, this.setText(a);
            },
            getAttribute: function() {
                var a = function(a) {
                    return this.$.getAttribute(a, 2);
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(a) {
                    switch (a) {
                      case "class":
                        a = "className";
                        break;

                      case "http-equiv":
                        a = "httpEquiv";
                        break;

                      case "name":
                        return this.$.name;

                      case "tabindex":
                        return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null), 
                        a;

                      case "checked":
                        return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;

                      case "hspace":
                      case "value":
                        return this.$[a];

                      case "style":
                        return this.$.style.cssText;

                      case "contenteditable":
                      case "contentEditable":
                        return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null;
                    }
                    return this.$.getAttribute(a, 2);
                } : a;
            }(),
            getChildren: function() {
                return new CKEDITOR.dom.nodeList(this.$.childNodes);
            },
            getComputedStyle: CKEDITOR.env.ie ? function(a) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)];
            } : function(a) {
                var b = this.getWindow().$.getComputedStyle(this.$, null);
                return b ? b.getPropertyValue(a) : "";
            },
            getDtd: function() {
                var a = CKEDITOR.dtd[this.getName()];
                return this.getDtd = function() {
                    return a;
                }, a;
            },
            getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: CKEDITOR.env.ie ? function() {
                var a = this.$.tabIndex;
                return 0 === a && !CKEDITOR.dtd.$tabIndex[this.getName()] && 0 !== parseInt(this.getAttribute("tabindex"), 10) && (a = -1), 
                a;
            } : CKEDITOR.env.webkit ? function() {
                var a = this.$.tabIndex;
                return void 0 == a && (a = parseInt(this.getAttribute("tabindex"), 10), isNaN(a) && (a = -1)), 
                a;
            } : function() {
                return this.$.tabIndex;
            },
            getText: function() {
                return this.$.textContent || this.$.innerText || "";
            },
            getWindow: function() {
                return this.getDocument().getWindow();
            },
            getId: function() {
                return this.$.id || null;
            },
            getNameAtt: function() {
                return this.$.name || null;
            },
            getName: function() {
                var a = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && !(document.documentMode > 8)) {
                    var b = this.$.scopeName;
                    "HTML" != b && (a = b.toLowerCase() + ":" + a);
                }
                return (this.getName = function() {
                    return a;
                })();
            },
            getValue: function() {
                return this.$.value;
            },
            getFirst: function(a) {
                var b = this.$.firstChild;
                return (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a)), 
                b;
            },
            getLast: function(a) {
                var b = this.$.lastChild;
                return (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a)), 
                b;
            },
            getStyle: function(a) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)];
            },
            is: function() {
                var a = this.getName();
                if ("object" == typeof arguments[0]) return !!arguments[0][a];
                for (var b = 0; b < arguments.length; b++) if (arguments[b] == a) return !0;
                return !1;
            },
            isEditable: function(a) {
                var b = this.getName();
                return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : a !== !1 ? (a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span, 
                !(!a || !a["#"])) : !0;
            },
            isIdentical: function(a) {
                var b = this.clone(0, 1), a = a.clone(0, 1);
                if (b.removeAttributes([ "_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name" ]), 
                a.removeAttributes([ "_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name" ]), 
                b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), 
                a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$);
                if (b = b.getOuterHtml(), a = a.getOuterHtml(), CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                    var c = this.getParent();
                    c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), 
                    c.setHtml(a), a = c.getHtml());
                }
                return b == a;
            },
            isVisible: function() {
                var a, b, c = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility");
                return c && (CKEDITOR.env.webkit || CKEDITOR.env.opera) && (a = this.getWindow(), 
                !a.equals(CKEDITOR.document.getWindow()) && (b = a.$.frameElement) && (c = new CKEDITOR.dom.element(b).isVisible())), 
                !!c;
            },
            isEmptyInlineRemoveable: function() {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                for (var a = this.getChildren(), b = 0, c = a.count(); c > b; b++) {
                    var d = a.getItem(b);
                    if ((d.type != CKEDITOR.NODE_ELEMENT || !d.data("cke-bookmark")) && (d.type == CKEDITOR.NODE_ELEMENT && !d.isEmptyInlineRemoveable() || d.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(d.getText()))) return !1;
                }
                return !0;
            },
            hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function() {
                for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                    var c = a[b];
                    switch (c.nodeName) {
                      case "class":
                        if (this.getAttribute("class")) return !0;

                      case "data-cke-expando":
                        continue;

                      default:
                        if (c.specified) return !0;
                    }
                }
                return !1;
            } : function() {
                var a = this.$.attributes, b = a.length, c = {
                    "data-cke-expando": 1,
                    _moz_dirty: 1
                };
                return b > 0 && (b > 2 || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName]);
            },
            hasAttribute: function() {
                function a(a) {
                    return a = this.$.attributes.getNamedItem(a), !(!a || !a.specified);
                }
                return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? function(b) {
                    return "name" == b ? !!this.$.name : a.call(this, b);
                } : a;
            }(),
            hide: function() {
                this.setStyle("display", "none");
            },
            moveChildren: function(a, b) {
                var c = this.$, a = a.$;
                if (c != a) {
                    var d;
                    if (b) for (;d = c.lastChild; ) a.insertBefore(c.removeChild(d), a.firstChild); else for (;d = c.firstChild; ) a.appendChild(c.removeChild(d));
                }
            },
            mergeSiblings: function() {
                function a(a, b, c) {
                    if (b && b.type == CKEDITOR.NODE_ELEMENT) {
                        for (var d = []; b.data("cke-bookmark") || b.isEmptyInlineRemoveable(); ) if (d.push(b), 
                        b = c ? b.getNext() : b.getPrevious(), !b || b.type != CKEDITOR.NODE_ELEMENT) return;
                        if (a.isIdentical(b)) {
                            for (var e = c ? a.getLast() : a.getFirst(); d.length; ) d.shift().move(a, !c);
                            b.moveChildren(a, !c), b.remove(), e && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings();
                        }
                    }
                }
                return function(b) {
                    (b === !1 || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) && (a(this, this.getNext(), !0), 
                    a(this, this.getPrevious()));
                };
            }(),
            show: function() {
                this.setStyles({
                    display: "",
                    visibility: ""
                });
            },
            setAttribute: function() {
                var a = function(a, b) {
                    return this.$.setAttribute(a, b), this;
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(b, c) {
                    return "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments), 
                    this;
                } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, c) {
                    if ("src" == b && c.match(/^http:\/\//)) try {
                        a.apply(this, arguments);
                    } catch (d) {} else a.apply(this, arguments);
                    return this;
                } : a;
            }(),
            setAttributes: function(a) {
                for (var b in a) this.setAttribute(b, a[b]);
                return this;
            },
            setValue: function(a) {
                return this.$.value = a, this;
            },
            removeAttribute: function() {
                var a = function(a) {
                    this.$.removeAttribute(a);
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(a) {
                    "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable"), 
                    this.$.removeAttribute(a);
                } : a;
            }(),
            removeAttributes: function(a) {
                if (CKEDITOR.tools.isArray(a)) for (var b = 0; b < a.length; b++) this.removeAttribute(a[b]); else for (b in a) a.hasOwnProperty(b) && this.removeAttribute(b);
            },
            removeStyle: function(a) {
                var b = this.$.style;
                if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), 
                this.$.style.cssText || this.removeAttribute("style"); else {
                    var c, d = [ "top", "left", "right", "bottom" ];
                    "border" == a && (c = [ "color", "style", "width" ]);
                    for (var b = [], e = 0; e < d.length; e++) if (c) for (var f = 0; f < c.length; f++) b.push([ a, d[e], c[f] ].join("-")); else b.push([ a, d[e] ].join("-"));
                    for (a = 0; a < b.length; a++) this.removeStyle(b[a]);
                }
            },
            setStyle: function(a, b) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b, this;
            },
            setStyles: function(a) {
                for (var b in a) this.setStyle(b, a[b]);
                return this;
            },
            setOpacity: function(a) {
                CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? (a = Math.round(100 * a), this.setStyle("filter", a >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + a + ")")) : this.setStyle("opacity", a);
            },
            unselectable: function() {
                if (this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")), CKEDITOR.env.ie || CKEDITOR.env.opera) {
                    this.setAttribute("unselectable", "on");
                    for (var a, b = this.getElementsByTag("*"), c = 0, d = b.count(); d > c; c++) a = b.getItem(c), 
                    a.setAttribute("unselectable", "on");
                }
            },
            getPositionedAncestor: function() {
                for (var a = this; "html" != a.getName(); ) {
                    if ("static" != a.getComputedStyle("position")) return a;
                    a = a.getParent();
                }
                return null;
            },
            getDocumentPosition: function(a) {
                var b = 0, c = 0, d = this.getDocument(), e = d.getBody(), f = "BackCompat" == d.$.compatMode;
                if (document.documentElement.getBoundingClientRect) {
                    var g = this.$.getBoundingClientRect(), h = d.$.documentElement, i = h.clientTop || e.$.clientTop || 0, j = h.clientLeft || e.$.clientLeft || 0, k = !0;
                    CKEDITOR.env.ie && (k = d.getDocumentElement().contains(this), d = d.getBody().contains(this), 
                    k = f && d || !f && k), k && (b = g.left + (!f && h.scrollLeft || e.$.scrollLeft), 
                    b -= j, c = g.top + (!f && h.scrollTop || e.$.scrollTop), c -= i);
                } else for (e = this, d = null; e && "body" != e.getName() && "html" != e.getName(); ) {
                    for (b += e.$.offsetLeft - e.$.scrollLeft, c += e.$.offsetTop - e.$.scrollTop, e.equals(this) || (b += e.$.clientLeft || 0, 
                    c += e.$.clientTop || 0); d && !d.equals(e); ) b -= d.$.scrollLeft, c -= d.$.scrollTop, 
                    d = d.getParent();
                    d = e, e = (g = e.$.offsetParent) ? new CKEDITOR.dom.element(g) : null;
                }
                return a && (e = this.getWindow(), d = a.getWindow(), !e.equals(d) && e.$.frameElement && (a = new CKEDITOR.dom.element(e.$.frameElement).getDocumentPosition(a), 
                b += a.x, c += a.y)), document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || f || (b += this.$.clientLeft ? 1 : 0, 
                c += this.$.clientTop ? 1 : 0), {
                    x: b,
                    y: c
                };
            },
            scrollIntoView: function(a) {
                var b = this.getParent();
                if (b) do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), 
                b.is("html")) {
                    var c = b.getWindow();
                    try {
                        var d = c.$.frameElement;
                        d && (b = new CKEDITOR.dom.element(d));
                    } catch (e) {}
                } while (b = b.getParent());
            },
            scrollIntoParent: function(a, b, c) {
                function d(b, c) {
                    /body|html/.test(a.getName()) ? a.getWindow().$.scrollBy(b, c) : (a.$.scrollLeft = a.$.scrollLeft + b, 
                    a.$.scrollTop = a.$.scrollTop + c);
                }
                function e(a, b) {
                    var c = {
                        x: 0,
                        y: 0
                    };
                    if (!a.is(k ? "body" : "html")) {
                        var d = a.$.getBoundingClientRect();
                        c.x = d.left, c.y = d.top;
                    }
                    return d = a.getWindow(), d.equals(b) || (d = e(CKEDITOR.dom.element.get(d.$.frameElement), b), 
                    c.x = c.x + d.x, c.y = c.y + d.y), c;
                }
                function f(a, b) {
                    return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0;
                }
                var g, h, i, j;
                !a && (a = this.getWindow()), i = a.getDocument();
                var k = "BackCompat" == i.$.compatMode;
                a instanceof CKEDITOR.dom.window && (a = k ? i.getBody() : i.getDocumentElement()), 
                i = a.getWindow(), h = e(this, i);
                var l = e(a, i), m = this.$.offsetHeight;
                g = this.$.offsetWidth;
                var n = a.$.clientHeight, o = a.$.clientWidth;
                i = h.x - f(this, "left") - l.x || 0, j = h.y - f(this, "top") - l.y || 0, g = h.x + g + f(this, "right") - (l.x + o) || 0, 
                h = h.y + m + f(this, "bottom") - (l.y + n) || 0, (0 > j || h > 0) && d(0, b === !0 ? j : b === !1 ? h : 0 > j ? j : h), 
                c && (0 > i || g > 0) && d(0 > i ? i : g, 0);
            },
            setState: function(a, b, c) {
                switch (b = b || "cke", a) {
                  case CKEDITOR.TRISTATE_ON:
                    this.addClass(b + "_on"), this.removeClass(b + "_off"), this.removeClass(b + "_disabled"), 
                    c && this.setAttribute("aria-pressed", !0), c && this.removeAttribute("aria-disabled");
                    break;

                  case CKEDITOR.TRISTATE_DISABLED:
                    this.addClass(b + "_disabled"), this.removeClass(b + "_off"), this.removeClass(b + "_on"), 
                    c && this.setAttribute("aria-disabled", !0), c && this.removeAttribute("aria-pressed");
                    break;

                  default:
                    this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), 
                    c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled");
                }
            },
            getFrameDocument: function() {
                var a = this.$;
                try {
                    a.contentWindow.document;
                } catch (b) {
                    a.src = a.src;
                }
                return a && new CKEDITOR.dom.document(a.contentWindow.document);
            },
            copyAttributes: function(a, b) {
                for (var c = this.$.attributes, b = b || {}, d = 0; d < c.length; d++) {
                    var e, f = c[d], g = f.nodeName.toLowerCase();
                    g in b || ("checked" == g && (e = this.getAttribute(g)) ? a.setAttribute(g, e) : (f.specified || CKEDITOR.env.ie && f.nodeValue && "value" == g) && (e = this.getAttribute(g), 
                    null === e && (e = f.nodeValue), a.setAttribute(g, e)));
                }
                "" !== this.$.style.cssText && (a.$.style.cssText = this.$.style.cssText);
            },
            renameNode: function(a) {
                if (this.getName() != a) {
                    var b = this.getDocument(), a = new CKEDITOR.dom.element(a, b);
                    this.copyAttributes(a), this.moveChildren(a), this.getParent() && this.$.parentNode.replaceChild(a.$, this.$), 
                    a.$["data-cke-expando"] = this.$["data-cke-expando"], this.$ = a.$;
                }
            },
            getChild: function() {
                function a(a, b) {
                    var c = a.childNodes;
                    return b >= 0 && b < c.length ? c[b] : void 0;
                }
                return function(b) {
                    var c = this.$;
                    if (b.slice) for (;b.length > 0 && c; ) c = a(c, b.shift()); else c = a(c, b);
                    return c ? new CKEDITOR.dom.node(c) : null;
                };
            }(),
            getChildCount: function() {
                return this.$.childNodes.length;
            },
            disableContextMenu: function() {
                this.on("contextmenu", function(a) {
                    a.data.getTarget().hasClass("cke_enable_context_menu") || a.data.preventDefault();
                });
            },
            getDirection: function(a) {
                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir");
            },
            data: function(a, b) {
                return a = "data-" + a, void 0 === b ? this.getAttribute(a) : (b === !1 ? this.removeAttribute(a) : this.setAttribute(a, b), 
                null);
            },
            getEditor: function() {
                var a, b, c = CKEDITOR.instances;
                for (a in c) if (b = c[a], b.element.equals(this) && b.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return b;
                return null;
            },
            find: function(c) {
                var d = a(this), c = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this, c)));
                return d(), c;
            },
            findOne: function(c) {
                var d = a(this), c = this.$.querySelector(b(this, c));
                return d(), c ? new CKEDITOR.dom.element(c) : null;
            },
            forEach: function(a, b, c) {
                if (!(c || b && this.type != b)) var d = a(this);
                if (d !== !1) for (var c = this.getChildren(), e = 0; e < c.count(); e++) d = c.getItem(e), 
                d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : (!b || d.type == b) && a(d);
            }
        });
        var d = {
            width: [ "border-left-width", "border-right-width", "padding-left", "padding-right" ],
            height: [ "border-top-width", "border-bottom-width", "padding-top", "padding-bottom" ]
        };
        CKEDITOR.dom.element.prototype.setSize = function(a, b, d) {
            "number" == typeof b && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), 
            this.setStyle(a, b + "px"));
        }, CKEDITOR.dom.element.prototype.getSize = function(a, b) {
            var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
            return b && (d -= c.call(this, a)), d;
        };
    }(), CKEDITOR.dom.documentFragment = function(a) {
        a = a || CKEDITOR.document, this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a;
    }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function(a) {
            a = a.$, a.parentNode.insertBefore(this.$, a.nextSibling);
        }
    }, !0, {
        append: 1,
        appendBogus: 1,
        getFirst: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    }), function() {
        function a(a, b) {
            var c = this.range;
            if (this._.end) return null;
            if (!this._.start) {
                if (this._.start = 1, c.collapsed) return this.end(), null;
                c.optimize();
            }
            var d, e = c.startContainer;
            d = c.endContainer;
            var f, g = c.startOffset, h = c.endOffset, i = this.guard, j = this.type, k = a ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!a && !this._.guardLTR) {
                var l = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(), m = d.type == CKEDITOR.NODE_ELEMENT ? d.getChild(h) : d.getNext();
                this._.guardLTR = function(a, b) {
                    return !(b && l.equals(a) || m && a.equals(m) || a.type == CKEDITOR.NODE_ELEMENT && b && a.equals(c.root));
                };
            }
            if (a && !this._.guardRTL) {
                var n = e.type == CKEDITOR.NODE_ELEMENT ? e : e.getParent(), o = e.type == CKEDITOR.NODE_ELEMENT ? g ? e.getChild(g - 1) : null : e.getPrevious();
                this._.guardRTL = function(a, b) {
                    return !(b && n.equals(a) || o && a.equals(o) || a.type == CKEDITOR.NODE_ELEMENT && b && a.equals(c.root));
                };
            }
            var p = a ? this._.guardRTL : this._.guardLTR;
            for (f = i ? function(a, b) {
                return p(a, b) === !1 ? !1 : i(a, b);
            } : p, this.current ? d = this.current[k](!1, j, f) : (a ? d.type == CKEDITOR.NODE_ELEMENT && (d = h > 0 ? d.getChild(h - 1) : f(d, !0) === !1 ? null : d.getPreviousSourceNode(!0, j, f)) : (d = e, 
            d.type != CKEDITOR.NODE_ELEMENT || (d = d.getChild(g)) || (d = f(e, !0) === !1 ? null : e.getNextSourceNode(!0, j, f))), 
            d && f(d) === !1 && (d = null)); d && !this._.end; ) {
                if (this.current = d, this.evaluator && this.evaluator(d) === !1) {
                    if (b && this.evaluator) return !1;
                } else if (!b) return d;
                d = d[k](!1, j, f);
            }
            return this.end(), this.current = null;
        }
        function b(b) {
            for (var c, d = null; c = a.call(this, b); ) d = c;
            return d;
        }
        function c(a) {
            if (j(a)) return !1;
            if (a.type == CKEDITOR.NODE_TEXT) return !0;
            if (a.type == CKEDITOR.NODE_ELEMENT) {
                if (a.is(CKEDITOR.dtd.$inline) || "false" == a.getAttribute("contenteditable")) return !0;
                var b;
                if ((b = !CKEDITOR.env.needsBrFiller) && (b = a.is(k))) a: {
                    b = 0;
                    for (var c = a.getChildCount(); c > b; ++b) if (!j(a.getChild(b))) {
                        b = !1;
                        break a;
                    }
                    b = !0;
                }
                if (b) return !0;
            }
            return !1;
        }
        CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function(a) {
                this.range = a, this._ = {};
            },
            proto: {
                end: function() {
                    this._.end = 1;
                },
                next: function() {
                    return a.call(this);
                },
                previous: function() {
                    return a.call(this, 1);
                },
                checkForward: function() {
                    return a.call(this, 0, 1) !== !1;
                },
                checkBackward: function() {
                    return a.call(this, 1, 1) !== !1;
                },
                lastForward: function() {
                    return b.call(this);
                },
                lastBackward: function() {
                    return b.call(this, 1);
                },
                reset: function() {
                    delete this.current, this._ = {};
                }
            }
        });
        var d = {
            block: 1,
            "list-item": 1,
            table: 1,
            "table-row-group": 1,
            "table-header-group": 1,
            "table-footer-group": 1,
            "table-row": 1,
            "table-column-group": 1,
            "table-column": 1,
            "table-cell": 1,
            "table-caption": 1
        }, e = {
            absolute: 1,
            fixed: 1
        };
        CKEDITOR.dom.element.prototype.isBlockBoundary = function(a) {
            return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in e || !d[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0;
        }, CKEDITOR.dom.walker.blockBoundary = function(a) {
            return function(b) {
                return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a));
            };
        }, CKEDITOR.dom.walker.listItemBoundary = function() {
            return this.blockBoundary({
                br: 1
            });
        }, CKEDITOR.dom.walker.bookmark = function(a, b) {
            function c(a) {
                return a && a.getName && "span" == a.getName() && a.data("cke-bookmark");
            }
            return function(d) {
                var e, f;
                return e = d && d.type != CKEDITOR.NODE_ELEMENT && (f = d.getParent()) && c(f), 
                e = a ? e : e || c(d), !!(b ^ e);
            };
        }, CKEDITOR.dom.walker.whitespaces = function(a) {
            return function(b) {
                var c;
                return b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && "​" == b.getText()), 
                !!(a ^ c);
            };
        }, CKEDITOR.dom.walker.invisible = function(a) {
            var b = CKEDITOR.dom.walker.whitespaces();
            return function(c) {
                return b(c) ? c = 1 : (c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()), c = !c.$.offsetHeight), 
                !!(a ^ c);
            };
        }, CKEDITOR.dom.walker.nodeType = function(a, b) {
            return function(c) {
                return !!(b ^ c.type == a);
            };
        }, CKEDITOR.dom.walker.bogus = function(a) {
            function b(a) {
                return !g(a) && !h(a);
            }
            return function(c) {
                var d = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && f.test(c.getText());
                return d && (d = c.getParent(), c = c.getNext(b), d = d.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())), 
                !!(a ^ d);
            };
        }, CKEDITOR.dom.walker.temp = function(a) {
            return function(b) {
                return b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()), b = b && b.hasAttribute("data-cke-temp"), 
                !!(a ^ b);
            };
        };
        var f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, g = CKEDITOR.dom.walker.whitespaces(), h = CKEDITOR.dom.walker.bookmark(), i = CKEDITOR.dom.walker.temp();
        CKEDITOR.dom.walker.ignored = function(a) {
            return function(b) {
                return b = g(b) || h(b) || i(b), !!(a ^ b);
            };
        };
        var j = CKEDITOR.dom.walker.ignored(), k = function(a) {
            var b, c = {};
            for (b in a) CKEDITOR.dtd[b]["#"] && (c[b] = 1);
            return c;
        }(CKEDITOR.dtd.$block);
        CKEDITOR.dom.walker.editable = function(a) {
            return function(b) {
                return !!(a ^ c(b));
            };
        }, CKEDITOR.dom.element.prototype.getBogus = function() {
            var a = this;
            do a = a.getPreviousSourceNode(); while (h(a) || g(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty));
            return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && f.test(a.getText())) ? a : !1;
        };
    }(), CKEDITOR.dom.range = function(a) {
        this.endOffset = this.endContainer = this.startOffset = this.startContainer = null, 
        this.collapsed = !0;
        var b = a instanceof CKEDITOR.dom.document;
        this.document = b ? a : a.getDocument(), this.root = b ? a.getBody() : a;
    }, function() {
        function a() {
            var a = !1, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!0), d = CKEDITOR.dom.walker.bogus();
            return function(e) {
                return c(e) || b(e) ? !0 : d(e) && !a ? a = !0 : e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant("pre") || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(f) ? !1 : !0;
            };
        }
        function b(a) {
            var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(1);
            return function(d) {
                return c(d) || b(d) ? !0 : !a && g(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty);
            };
        }
        function c(a) {
            return function() {
                var b;
                return this[a ? "getPreviousNode" : "getNextNode"](function(a) {
                    return !b && j(a) && (b = a), i(a) && !(g(a) && a.equals(b));
                });
            };
        }
        var d = function(a) {
            a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset;
        }, e = function(a, b, c, d) {
            a.optimizeBookmark();
            var e, f, g = a.startContainer, h = a.endContainer, i = a.startOffset, j = a.endOffset;
            h.type == CKEDITOR.NODE_TEXT ? h = h.split(j) : h.getChildCount() > 0 && (j >= h.getChildCount() ? (h = h.append(a.document.createText("")), 
            f = !0) : h = h.getChild(j)), g.type == CKEDITOR.NODE_TEXT ? (g.split(i), g.equals(h) && (h = g.getNext())) : i ? i >= g.getChildCount() ? (g = g.append(a.document.createText("")), 
            e = !0) : g = g.getChild(i).getPrevious() : (g = g.append(a.document.createText(""), 1), 
            e = !0);
            var k, l, m, i = g.getParents(), j = h.getParents();
            for (k = 0; k < i.length && (l = i[k], m = j[k], l.equals(m)); k++) ;
            for (var n, o, p, q = c, r = k; r < i.length; r++) {
                for (n = i[r], q && !n.equals(g) && (o = q.append(n.clone())), n = n.getNext(); n && (!n.equals(j[r]) && !n.equals(h)); ) p = n.getNext(), 
                2 == b ? q.append(n.clone(!0)) : (n.remove(), 1 == b && q.append(n)), n = p;
                q && (q = o);
            }
            for (q = c, c = k; c < j.length; c++) {
                if (n = j[c], b > 0 && !n.equals(h) && (o = q.append(n.clone())), !i[c] || n.$.parentNode != i[c].$.parentNode) for (n = n.getPrevious(); n && (!n.equals(i[c]) && !n.equals(g)); ) p = n.getPrevious(), 
                2 == b ? q.$.insertBefore(n.$.cloneNode(!0), q.$.firstChild) : (n.remove(), 1 == b && q.$.insertBefore(n.$, q.$.firstChild)), 
                n = p;
                q && (q = o);
            }
            2 == b ? (l = a.startContainer, l.type == CKEDITOR.NODE_TEXT && (l.$.data = l.$.data + l.$.nextSibling.data, 
            l.$.parentNode.removeChild(l.$.nextSibling)), a = a.endContainer, a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling && (a.$.data = a.$.data + a.$.nextSibling.data, 
            a.$.parentNode.removeChild(a.$.nextSibling))) : (l && m && (g.$.parentNode != l.$.parentNode || h.$.parentNode != m.$.parentNode) && (b = m.getIndex(), 
            e && m.$.parentNode == g.$.parentNode && b--, d && l.type == CKEDITOR.NODE_ELEMENT ? (d = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document), 
            d.insertAfter(l), l.mergeSiblings(!1), a.moveToBookmark({
                startNode: d
            })) : a.setStart(m.getParent(), b)), a.collapse(!0)), e && g.remove(), f && h.$.parentNode && h.remove();
        }, f = {
            abbr: 1,
            acronym: 1,
            b: 1,
            bdo: 1,
            big: 1,
            cite: 1,
            code: 1,
            del: 1,
            dfn: 1,
            em: 1,
            font: 1,
            i: 1,
            ins: 1,
            label: 1,
            kbd: 1,
            q: 1,
            samp: 1,
            small: 1,
            span: 1,
            strike: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            tt: 1,
            u: 1,
            "var": 1
        }, g = CKEDITOR.dom.walker.bogus(), h = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, i = CKEDITOR.dom.walker.editable(), j = CKEDITOR.dom.walker.ignored(!0);
        CKEDITOR.dom.range.prototype = {
            clone: function() {
                var a = new CKEDITOR.dom.range(this.root);
                return a.startContainer = this.startContainer, a.startOffset = this.startOffset, 
                a.endContainer = this.endContainer, a.endOffset = this.endOffset, a.collapsed = this.collapsed, 
                a;
            },
            collapse: function(a) {
                a ? (this.endContainer = this.startContainer, this.endOffset = this.startOffset) : (this.startContainer = this.endContainer, 
                this.startOffset = this.endOffset), this.collapsed = !0;
            },
            cloneContents: function() {
                var a = new CKEDITOR.dom.documentFragment(this.document);
                return this.collapsed || e(this, 2, a), a;
            },
            deleteContents: function(a) {
                this.collapsed || e(this, 0, null, a);
            },
            extractContents: function(a) {
                var b = new CKEDITOR.dom.documentFragment(this.document);
                return this.collapsed || e(this, 1, b, a), b;
            },
            createBookmark: function(a) {
                var b, c, d, e, f = this.collapsed;
                return b = this.document.createElement("span"), b.data("cke-bookmark", 1), b.setStyle("display", "none"), 
                b.setHtml("&nbsp;"), a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (f ? "C" : "S"))), 
                f || (c = b.clone(), c.setHtml("&nbsp;"), a && c.setAttribute("id", d + "E"), e = this.clone(), 
                e.collapse(), e.insertNode(c)), e = this.clone(), e.collapse(!0), e.insertNode(b), 
                c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END), 
                {
                    startNode: a ? d + (f ? "C" : "S") : b,
                    endNode: a ? d + "E" : c,
                    serializable: a,
                    collapsed: f
                };
            },
            createBookmark2: function() {
                function a(a) {
                    var b, c = a.container, d = a.offset;
                    b = c;
                    var e = d;
                    if (b = b.type != CKEDITOR.NODE_ELEMENT || 0 === e || e == b.getChildCount() ? 0 : b.getChild(e - 1).type == CKEDITOR.NODE_TEXT && b.getChild(e).type == CKEDITOR.NODE_TEXT, 
                    b && (c = c.getChild(d - 1), d = c.getLength()), c.type == CKEDITOR.NODE_ELEMENT && d > 1 && (d = c.getChild(d - 1).getIndex(!0) + 1), 
                    c.type == CKEDITOR.NODE_TEXT) {
                        for (b = c, e = 0; (b = b.getPrevious()) && b.type == CKEDITOR.NODE_TEXT; ) e += b.getLength();
                        d += e;
                    }
                    a.container = c, a.offset = d;
                }
                return function(b) {
                    var c = this.collapsed, d = {
                        container: this.startContainer,
                        offset: this.startOffset
                    }, e = {
                        container: this.endContainer,
                        offset: this.endOffset
                    };
                    return b && (a(d), c || a(e)), {
                        start: d.container.getAddress(b),
                        end: c ? null : e.container.getAddress(b),
                        startOffset: d.offset,
                        endOffset: e.offset,
                        normalized: b,
                        collapsed: c,
                        is2: !0
                    };
                };
            }(),
            moveToBookmark: function(a) {
                if (a.is2) {
                    var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, d = a.end && this.document.getByAddress(a.end, a.normalized), a = a.endOffset;
                    this.setStart(b, c), d ? this.setEnd(d, a) : this.collapse(!0);
                } else b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, 
                a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), 
                a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0);
            },
            getBoundaryNodes: function() {
                var a, b = this.startContainer, c = this.endContainer, d = this.startOffset, e = this.endOffset;
                if (b.type == CKEDITOR.NODE_ELEMENT) if (a = b.getChildCount(), a > d) b = b.getChild(d); else if (1 > a) b = b.getPreviousSourceNode(); else {
                    for (b = b.$; b.lastChild; ) b = b.lastChild;
                    b = new CKEDITOR.dom.node(b), b = b.getNextSourceNode() || b;
                }
                if (c.type == CKEDITOR.NODE_ELEMENT) if (a = c.getChildCount(), a > e) c = c.getChild(e).getPreviousSourceNode(!0); else if (1 > a) c = c.getPreviousSourceNode(); else {
                    for (c = c.$; c.lastChild; ) c = c.lastChild;
                    c = new CKEDITOR.dom.node(c);
                }
                return b.getPosition(c) & CKEDITOR.POSITION_FOLLOWING && (b = c), {
                    startNode: b,
                    endNode: c
                };
            },
            getCommonAncestor: function(a, b) {
                var c = this.startContainer, d = this.endContainer, c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d);
                return b && !c.is ? c.getParent() : c;
            },
            optimize: function() {
                var a = this.startContainer, b = this.startOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)), 
                a = this.endContainer, b = this.endOffset, a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a));
            },
            optimizeBookmark: function() {
                var a = this.startContainer, b = this.endContainer;
                a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START), 
                b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END);
            },
            trim: function(a, b) {
                var c = this.startContainer, d = this.startOffset, e = this.collapsed;
                if ((!a || e) && c && c.type == CKEDITOR.NODE_TEXT) {
                    if (d) if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent(); else {
                        var f = c.split(d), d = c.getIndex() + 1, c = c.getParent();
                        this.startContainer.equals(this.endContainer) ? this.setEnd(f, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset = this.endOffset + 1);
                    } else d = c.getIndex(), c = c.getParent();
                    if (this.setStart(c, d), e) return void this.collapse(!0);
                }
                c = this.endContainer, d = this.endOffset, b || e || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), 
                d = c.getIndex() + 1) : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d));
            },
            enlarge: function(a, b) {
                function c(a) {
                    return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a;
                }
                switch (a) {
                  case CKEDITOR.ENLARGE_INLINE:
                    var d = 1;

                  case CKEDITOR.ENLARGE_ELEMENT:
                    if (this.collapsed) break;
                    var e, f, g, h, i, j, k, l = this.getCommonAncestor(), m = this.root, n = !1;
                    for (j = this.startContainer, k = this.startOffset, j.type == CKEDITOR.NODE_TEXT ? (k && (j = !CKEDITOR.tools.trim(j.substring(0, k)).length && j, 
                    n = !!j), j && !(h = j.getPrevious()) && (g = j.getParent())) : (k && (h = j.getChild(k - 1) || j.getLast()), 
                    h || (g = j)), g = c(g); g || h; ) {
                        if (g && !h) {
                            if (!i && g.equals(l) && (i = !0), d ? g.isBlockBoundary() : !m.contains(g)) break;
                            n && "inline" == g.getComputedStyle("display") || (n = !1, i ? e = g : this.setStartBefore(g)), 
                            h = g.getPrevious();
                        }
                        for (;h; ) if (j = !1, h.type == CKEDITOR.NODE_COMMENT) h = h.getPrevious(); else {
                            if (h.type == CKEDITOR.NODE_TEXT) k = h.getText(), /[^\s\ufeff]/.test(k) && (h = null), 
                            j = /[\s\ufeff]$/.test(k); else if ((h.$.offsetWidth > 0 || b && h.is("br")) && !h.data("cke-bookmark")) if (n && CKEDITOR.dtd.$removeEmpty[h.getName()]) {
                                if (k = h.getText(), /[^\s\ufeff]/.test(k)) h = null; else for (var o, p = h.$.getElementsByTagName("*"), q = 0; o = p[q++]; ) if (!CKEDITOR.dtd.$removeEmpty[o.nodeName.toLowerCase()]) {
                                    h = null;
                                    break;
                                }
                                h && (j = !!k.length);
                            } else h = null;
                            if (j && (n ? i ? e = g : g && this.setStartBefore(g) : n = !0), h) {
                                if (j = h.getPrevious(), !g && !j) {
                                    g = h, h = null;
                                    break;
                                }
                                h = j;
                            } else g = null;
                        }
                        g && (g = c(g.getParent()));
                    }
                    for (j = this.endContainer, k = this.endOffset, g = h = null, i = n = !1, j.type == CKEDITOR.NODE_TEXT ? (j = !CKEDITOR.tools.trim(j.substring(k)).length && j, 
                    n = !(j && j.getLength()), j && !(h = j.getNext()) && (g = j.getParent())) : (h = j.getChild(k)) || (g = j); g || h; ) {
                        if (g && !h) {
                            if (!i && g.equals(l) && (i = !0), d ? g.isBlockBoundary() : !m.contains(g)) break;
                            n && "inline" == g.getComputedStyle("display") || (n = !1, i ? f = g : g && this.setEndAfter(g)), 
                            h = g.getNext();
                        }
                        for (;h; ) {
                            if (j = !1, h.type == CKEDITOR.NODE_TEXT) k = h.getText(), /[^\s\ufeff]/.test(k) && (h = null), 
                            j = /^[\s\ufeff]/.test(k); else if (h.type == CKEDITOR.NODE_ELEMENT) {
                                if ((h.$.offsetWidth > 0 || b && h.is("br")) && !h.data("cke-bookmark")) if (n && CKEDITOR.dtd.$removeEmpty[h.getName()]) {
                                    if (k = h.getText(), /[^\s\ufeff]/.test(k)) h = null; else for (p = h.$.getElementsByTagName("*"), 
                                    q = 0; o = p[q++]; ) if (!CKEDITOR.dtd.$removeEmpty[o.nodeName.toLowerCase()]) {
                                        h = null;
                                        break;
                                    }
                                    h && (j = !!k.length);
                                } else h = null;
                            } else j = 1;
                            if (j && n && (i ? f = g : this.setEndAfter(g)), h) {
                                if (j = h.getNext(), !g && !j) {
                                    g = h, h = null;
                                    break;
                                }
                                h = j;
                            } else g = null;
                        }
                        g && (g = c(g.getParent()));
                    }
                    e && f && (l = e.contains(f) ? f : e, this.setStartBefore(l), this.setEndAfter(l));
                    break;

                  case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                  case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                    g = new CKEDITOR.dom.range(this.root), m = this.root, g.setStartAt(m, CKEDITOR.POSITION_AFTER_START), 
                    g.setEnd(this.startContainer, this.startOffset), g = new CKEDITOR.dom.walker(g);
                    var r, s, t = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
                        br: 1
                    } : null), u = null, v = function(a) {
                        if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (u) {
                            if (u.equals(a)) return void (u = null);
                        } else u = a; else if (u) return;
                        var b = t(a);
                        return b || (r = a), b;
                    }, d = function(a) {
                        var b = v(a);
                        return !b && a.is && a.is("br") && (s = a), b;
                    };
                    if (g.guard = v, g = g.lastBackward(), r = r || m, this.setStartAt(r, !r.is("br") && (!g && this.checkStartOfBlock() || g && r.contains(g)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END), 
                    a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                        g = this.clone(), g = new CKEDITOR.dom.walker(g);
                        var w = CKEDITOR.dom.walker.whitespaces(), x = CKEDITOR.dom.walker.bookmark();
                        if (g.evaluator = function(a) {
                            return !w(a) && !x(a);
                        }, (g = g.previous()) && g.type == CKEDITOR.NODE_ELEMENT && g.is("br")) break;
                    }
                    g = this.clone(), g.collapse(), g.setEndAt(m, CKEDITOR.POSITION_BEFORE_END), g = new CKEDITOR.dom.walker(g), 
                    g.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? d : v, r = null, g = g.lastForward(), 
                    r = r || m, this.setEndAt(r, !g && this.checkEndOfBlock() || g && r.contains(g) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START), 
                    s && this.setEndAfter(s);
                }
            },
            shrink: function(a, b, c) {
                if (!this.collapsed) {
                    var a = a || CKEDITOR.SHRINK_TEXT, d = this.clone(), e = this.startContainer, f = this.endContainer, g = this.startOffset, h = this.endOffset, i = 1, j = 1;
                    e && e.type == CKEDITOR.NODE_TEXT && (g ? g >= e.getLength() ? d.setStartAfter(e) : (d.setStartBefore(e), 
                    i = 0) : d.setStartBefore(e)), f && f.type == CKEDITOR.NODE_TEXT && (h ? h >= f.getLength() ? d.setEndAfter(f) : (d.setEndAfter(f), 
                    j = 0) : d.setEndBefore(f));
                    var d = new CKEDITOR.dom.walker(d), k = CKEDITOR.dom.walker.bookmark();
                    d.evaluator = function(b) {
                        return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT);
                    };
                    var l;
                    return d.guard = function(b, d) {
                        return k(b) ? !0 : a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(l) || c === !1 && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable") ? !1 : (!d && b.type == CKEDITOR.NODE_ELEMENT && (l = b), 
                        !0);
                    }, i && (e = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(e, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START), 
                    j && (d.reset(), (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)), 
                    !(!i && !j);
                }
            },
            insertNode: function(a) {
                this.optimizeBookmark(), this.trim(!1, !0);
                var b = this.startContainer, c = b.getChild(this.startOffset);
                c ? a.insertBefore(c) : b.append(a), a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++, 
                this.setStartBefore(a);
            },
            moveToPosition: function(a, b) {
                this.setStartAt(a, b), this.collapse(!0);
            },
            moveToRange: function(a) {
                this.setStart(a.startContainer, a.startOffset), this.setEnd(a.endContainer, a.endOffset);
            },
            selectNodeContents: function(a) {
                this.setStart(a, 0), this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount());
            },
            setStart: function(a, b) {
                a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()] && (b = a.getIndex(), 
                a = a.getParent()), this.startContainer = a, this.startOffset = b, this.endContainer || (this.endContainer = a, 
                this.endOffset = b), d(this);
            },
            setEnd: function(a, b) {
                a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()] && (b = a.getIndex() + 1, 
                a = a.getParent()), this.endContainer = a, this.endOffset = b, this.startContainer || (this.startContainer = a, 
                this.startOffset = b), d(this);
            },
            setStartAfter: function(a) {
                this.setStart(a.getParent(), a.getIndex() + 1);
            },
            setStartBefore: function(a) {
                this.setStart(a.getParent(), a.getIndex());
            },
            setEndAfter: function(a) {
                this.setEnd(a.getParent(), a.getIndex() + 1);
            },
            setEndBefore: function(a) {
                this.setEnd(a.getParent(), a.getIndex());
            },
            setStartAt: function(a, b) {
                switch (b) {
                  case CKEDITOR.POSITION_AFTER_START:
                    this.setStart(a, 0);
                    break;

                  case CKEDITOR.POSITION_BEFORE_END:
                    a.type == CKEDITOR.NODE_TEXT ? this.setStart(a, a.getLength()) : this.setStart(a, a.getChildCount());
                    break;

                  case CKEDITOR.POSITION_BEFORE_START:
                    this.setStartBefore(a);
                    break;

                  case CKEDITOR.POSITION_AFTER_END:
                    this.setStartAfter(a);
                }
                d(this);
            },
            setEndAt: function(a, b) {
                switch (b) {
                  case CKEDITOR.POSITION_AFTER_START:
                    this.setEnd(a, 0);
                    break;

                  case CKEDITOR.POSITION_BEFORE_END:
                    a.type == CKEDITOR.NODE_TEXT ? this.setEnd(a, a.getLength()) : this.setEnd(a, a.getChildCount());
                    break;

                  case CKEDITOR.POSITION_BEFORE_START:
                    this.setEndBefore(a);
                    break;

                  case CKEDITOR.POSITION_AFTER_END:
                    this.setEndAfter(a);
                }
                d(this);
            },
            fixBlock: function(a, b) {
                var c = this.createBookmark(), d = this.document.createElement(b);
                return this.collapse(a), this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), this.extractContents().appendTo(d), 
                d.trim(), d.appendBogus(), this.insertNode(d), this.moveToBookmark(c), d;
            },
            splitBlock: function(a) {
                var b = new CKEDITOR.dom.elementPath(this.startContainer, this.root), c = new CKEDITOR.dom.elementPath(this.endContainer, this.root), d = b.block, e = c.block, f = null;
                return b.blockLimit.equals(c.blockLimit) ? ("br" != a && (d || (d = this.fixBlock(!0, a), 
                e = new CKEDITOR.dom.elementPath(this.endContainer, this.root).block), e || (e = this.fixBlock(!1, a))), 
                a = d && this.checkStartOfBlock(), b = e && this.checkEndOfBlock(), this.deleteContents(), 
                d && d.equals(e) && (b ? (f = new CKEDITOR.dom.elementPath(this.startContainer, this.root), 
                this.moveToPosition(e, CKEDITOR.POSITION_AFTER_END), e = null) : a ? (f = new CKEDITOR.dom.elementPath(this.startContainer, this.root), 
                this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START), d = null) : (e = this.splitElement(d), 
                d.is("ul", "ol") || d.appendBogus())), {
                    previousBlock: d,
                    nextBlock: e,
                    wasStartOfBlock: a,
                    wasEndOfBlock: b,
                    elementPath: f
                }) : null;
            },
            splitElement: function(a) {
                if (!this.collapsed) return null;
                this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                var b = this.extractContents(), c = a.clone(!1);
                return b.appendTo(c), c.insertAfter(a), this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), 
                c;
            },
            removeEmptyBlocksAtEnd: function() {
                function a(a) {
                    return function(d) {
                        return b(d) || c(d) || d.type == CKEDITOR.NODE_ELEMENT && d.isEmptyInlineRemoveable() || a.is("table") && d.is("caption") ? !1 : !0;
                    };
                }
                var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!1);
                return function(b) {
                    for (var c, d = this.createBookmark(), e = this[b ? "endPath" : "startPath"](), f = e.block || e.blockLimit; f && !f.equals(e.root) && !f.getFirst(a(f)); ) c = f.getParent(), 
                    this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END), f.remove(1), 
                    f = c;
                    this.moveToBookmark(d);
                };
            }(),
            startPath: function() {
                return new CKEDITOR.dom.elementPath(this.startContainer, this.root);
            },
            endPath: function() {
                return new CKEDITOR.dom.elementPath(this.endContainer, this.root);
            },
            checkBoundaryOfElement: function(a, c) {
                var d = c == CKEDITOR.START, e = this.clone();
                return e.collapse(d), e[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), 
                e = new CKEDITOR.dom.walker(e), e.evaluator = b(d), e[d ? "checkBackward" : "checkForward"]();
            },
            checkStartOfBlock: function() {
                var b = this.startContainer, c = this.startOffset;
                return CKEDITOR.env.ie && c && b.type == CKEDITOR.NODE_TEXT && (b = CKEDITOR.tools.ltrim(b.substring(0, c)), 
                h.test(b) && this.trim(0, 1)), this.trim(), b = new CKEDITOR.dom.elementPath(this.startContainer, this.root), 
                c = this.clone(), c.collapse(!0), c.setStartAt(b.block || b.blockLimit, CKEDITOR.POSITION_AFTER_START), 
                b = new CKEDITOR.dom.walker(c), b.evaluator = a(), b.checkBackward();
            },
            checkEndOfBlock: function() {
                var b = this.endContainer, c = this.endOffset;
                return CKEDITOR.env.ie && b.type == CKEDITOR.NODE_TEXT && (b = CKEDITOR.tools.rtrim(b.substring(c)), 
                h.test(b) && this.trim(1, 0)), this.trim(), b = new CKEDITOR.dom.elementPath(this.endContainer, this.root), 
                c = this.clone(), c.collapse(!1), c.setEndAt(b.block || b.blockLimit, CKEDITOR.POSITION_BEFORE_END), 
                b = new CKEDITOR.dom.walker(c), b.evaluator = a(), b.checkForward();
            },
            getPreviousNode: function(a, b, c) {
                var d = this.clone();
                return d.collapse(1), d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START), 
                c = new CKEDITOR.dom.walker(d), c.evaluator = a, c.guard = b, c.previous();
            },
            getNextNode: function(a, b, c) {
                var d = this.clone();
                return d.collapse(), d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END), c = new CKEDITOR.dom.walker(d), 
                c.evaluator = a, c.guard = b, c.next();
            },
            checkReadOnly: function() {
                function a(a, b) {
                    for (;a; ) {
                        if (a.type == CKEDITOR.NODE_ELEMENT) {
                            if ("false" == a.getAttribute("contentEditable") && !a.data("cke-editable")) return 0;
                            if (a.is("html") || "true" == a.getAttribute("contentEditable") && (a.contains(b) || a.equals(b))) break;
                        }
                        a = a.getParent();
                    }
                    return 1;
                }
                return function() {
                    var b = this.startContainer, c = this.endContainer;
                    return !(a(b, c) && a(c, b));
                };
            }(),
            moveToElementEditablePosition: function(a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), 
                !0;
                for (var c = 0; a; ) {
                    if (a.type == CKEDITOR.NODE_TEXT) {
                        b && this.endContainer && this.checkEndOfBlock() && h.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), 
                        c = 1;
                        break;
                    }
                    if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), 
                    c = 1; else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START); else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), 
                    this.setEndAfter(a), !0;
                    var d = a, e = c, f = void 0;
                    d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (f = d[b ? "getLast" : "getFirst"](j)), 
                    !e && !f && (f = d[b ? "getPrevious" : "getNext"](j)), a = f;
                }
                return !!c;
            },
            moveToClosestEditablePosition: function(a, b) {
                var c, d = new CKEDITOR.dom.range(this.root), e = 0, f = [ CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START ];
                return d.moveToPosition(a, f[b ? 0 : 1]), a.is(CKEDITOR.dtd.$block) ? (c = d[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) && (e = 1, 
                c.type == CKEDITOR.NODE_ELEMENT && c.is(CKEDITOR.dtd.$block) && "false" == c.getAttribute("contenteditable") ? (d.setStartAt(c, CKEDITOR.POSITION_BEFORE_START), 
                d.setEndAt(c, CKEDITOR.POSITION_AFTER_END)) : d.moveToPosition(c, f[b ? 1 : 0])) : e = 1, 
                e && this.moveToRange(d), !!e;
            },
            moveToElementEditStart: function(a) {
                return this.moveToElementEditablePosition(a);
            },
            moveToElementEditEnd: function(a) {
                return this.moveToElementEditablePosition(a, !0);
            },
            getEnclosedNode: function() {
                var a = this.clone();
                if (a.optimize(), a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
                var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), c = CKEDITOR.dom.walker.whitespaces(!0);
                a.evaluator = function(a) {
                    return c(a) && b(a);
                };
                var d = a.next();
                return a.reset(), d && d.equals(a.previous()) ? d : null;
            },
            getTouchedStartNode: function() {
                var a = this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a;
            },
            getTouchedEndNode: function() {
                var a = this.endContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a;
            },
            getNextEditableNode: c(),
            getPreviousEditableNode: c(1),
            scrollIntoView: function() {
                var a, b, c, d = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document), e = this.clone();
                e.optimize(), (c = e.startContainer.type == CKEDITOR.NODE_TEXT) ? (b = e.startContainer.getText(), 
                a = e.startContainer.split(e.startOffset), d.insertAfter(e.startContainer)) : e.insertNode(d), 
                d.scrollIntoView(), c && (e.startContainer.setText(b), a.remove()), d.remove();
            }
        };
    }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, 
    CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, 
    CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, 
    CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, function() {
        function a(a) {
            arguments.length < 1 || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, 
            this.enforceRealBlocks = 0, this._ || (this._ = {}));
        }
        function b(a, b, c) {
            for (a = a.getNextSourceNode(b, null, c); !f(a); ) a = a.getNextSourceNode(b, null, c);
            return a;
        }
        function c(a) {
            var b = [];
            return a.forEach(function(a) {
                return "true" == a.getAttribute("contenteditable") ? (b.push(a), !1) : void 0;
            }, CKEDITOR.NODE_ELEMENT, !0), b;
        }
        function d(a, b, e, f) {
            a: {
                void 0 == f && (f = c(e));
                for (var g; g = f.shift(); ) if (g.getDtd().p) {
                    f = {
                        element: g,
                        remaining: f
                    };
                    break a;
                }
                f = null;
            }
            return f ? (g = CKEDITOR.filter.instances[f.element.data("cke-filter")]) && !g.check(b) ? d(a, b, e, f.remaining) : (b = new CKEDITOR.dom.range(f.element), 
            b.selectNodeContents(f.element), b = b.createIterator(), b.enlargeBr = a.enlargeBr, 
            b.enforceRealBlocks = a.enforceRealBlocks, b.activeFilter = b.filter = g, a._.nestedEditable = {
                element: f.element,
                container: e,
                remaining: f.remaining,
                iterator: b
            }, 1) : 0;
        }
        var e = /^[\r\n\t ]+$/, f = CKEDITOR.dom.walker.bookmark(!1, !0), g = CKEDITOR.dom.walker.whitespaces(!0), h = function(a) {
            return f(a) && g(a);
        };
        a.prototype = {
            getNextParagraph: function(a) {
                var c, g, i, j, k, a = a || "p";
                if (this._.nestedEditable) {
                    if (c = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, 
                    c;
                    if (this.activeFilter = this.filter, d(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, 
                    this._.nestedEditable.iterator.getNextParagraph(a);
                    this._.nestedEditable = null;
                }
                if (!this.range.root.getDtd()[a]) return null;
                if (!this._.started) {
                    var l = this.range.clone();
                    if (l.shrink(CKEDITOR.SHRINK_ELEMENT, !0), g = l.endContainer.hasAscendant("pre", !0) || l.startContainer.hasAscendant("pre", !0), 
                    l.enlarge(this.forceBrBreak && !g || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS), 
                    !l.collapsed) {
                        g = new CKEDITOR.dom.walker(l.clone());
                        var m = CKEDITOR.dom.walker.bookmark(!0, !0);
                        g.evaluator = m, this._.nextNode = g.next(), g = new CKEDITOR.dom.walker(l.clone()), 
                        g.evaluator = m, g = g.previous(), this._.lastNode = g.getNextSourceNode(!0), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (m = this.range.clone(), 
                        m.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), m.checkEndOfBlock() && (m = new CKEDITOR.dom.elementPath(m.endContainer, m.root), 
                        this._.lastNode = (m.block || m.blockLimit).getNextSourceNode(!0))), this._.lastNode && l.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = l.document.createText(""), 
                        this._.lastNode.insertAfter(g)), l = null;
                    }
                    this._.started = 1, g = l;
                }
                for (m = this._.nextNode, l = this._.lastNode, this._.nextNode = null; m; ) {
                    var n = 0, o = m.hasAscendant("pre"), p = m.type != CKEDITOR.NODE_ELEMENT, q = 0;
                    if (p) m.type == CKEDITOR.NODE_TEXT && e.test(m.getText()) && (p = 0); else {
                        var r = m.getName();
                        if (CKEDITOR.dtd.$block[r] && "false" == m.getAttribute("contenteditable")) {
                            c = m, d(this, a, c);
                            break;
                        }
                        if (m.isBlockBoundary(this.forceBrBreak && !o && {
                            br: 1
                        })) {
                            if ("br" == r) p = 1; else if (!g && !m.getChildCount() && "hr" != r) {
                                c = m, i = m.equals(l);
                                break;
                            }
                            g && (g.setEndAt(m, CKEDITOR.POSITION_BEFORE_START), "br" != r && (this._.nextNode = m)), 
                            n = 1;
                        } else {
                            if (m.getFirst()) {
                                g || (g = this.range.clone(), g.setStartAt(m, CKEDITOR.POSITION_BEFORE_START)), 
                                m = m.getFirst();
                                continue;
                            }
                            p = 1;
                        }
                    }
                    if (p && !g && (g = this.range.clone(), g.setStartAt(m, CKEDITOR.POSITION_BEFORE_START)), 
                    i = (!n || p) && m.equals(l), g && !n) for (;!m.getNext(h) && !i; ) {
                        if (r = m.getParent(), r.isBlockBoundary(this.forceBrBreak && !o && {
                            br: 1
                        })) {
                            n = 1, p = 0, i || r.equals(l), g.setEndAt(r, CKEDITOR.POSITION_BEFORE_END);
                            break;
                        }
                        m = r, p = 1, i = m.equals(l), q = 1;
                    }
                    if (p && g.setEndAt(m, CKEDITOR.POSITION_AFTER_END), m = b(m, q, l), (i = !m) || n && g) break;
                }
                if (!c) {
                    if (!g) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
                    c = new CKEDITOR.dom.elementPath(g.startContainer, g.root), m = c.blockLimit, n = {
                        div: 1,
                        th: 1,
                        td: 1
                    }, c = c.block, !c && m && !this.enforceRealBlocks && n[m.getName()] && g.checkStartOfBlock() && g.checkEndOfBlock() && !m.equals(g.root) ? c = m : !c || this.enforceRealBlocks && "li" == c.getName() ? (c = this.range.document.createElement(a), 
                    g.extractContents().appendTo(c), c.trim(), g.insertNode(c), j = k = !0) : "li" != c.getName() ? g.checkStartOfBlock() && g.checkEndOfBlock() || (c = c.clone(!1), 
                    g.extractContents().appendTo(c), c.trim(), k = g.splitBlock(), j = !k.wasStartOfBlock, 
                    k = !k.wasEndOfBlock, g.insertNode(c)) : i || (this._.nextNode = c.equals(l) ? null : b(g.getBoundaryNodes().endNode, 1, l));
                }
                return j && (j = c.getPrevious()) && j.type == CKEDITOR.NODE_ELEMENT && ("br" == j.getName() ? j.remove() : j.getLast() && "br" == j.getLast().$.nodeName.toLowerCase() && j.getLast().remove()), 
                k && (j = c.getLast()) && j.type == CKEDITOR.NODE_ELEMENT && "br" == j.getName() && (!CKEDITOR.env.needsBrFiller || j.getPrevious(f) || j.getNext(f)) && j.remove(), 
                this._.nextNode || (this._.nextNode = i || c.equals(l) || !l ? null : b(c, 1, l)), 
                c;
            }
        }, CKEDITOR.dom.range.prototype.createIterator = function() {
            return new a(this);
        };
    }(), CKEDITOR.command = function(a, b) {
        this.uiItems = [], this.exec = function(c) {
            return this.state != CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() ? (this.editorFocus && a.focus(), 
            this.fire("exec") === !1 ? !0 : b.exec.call(this, a, c) !== !1) : !1;
        }, this.refresh = function(a, c) {
            return !this.readOnly && a.readOnly ? !0 : this.context && !c.isContextFor(this.context) ? (this.disable(), 
            !0) : this.checkAllowed(!0) ? (this.startDisabled || this.enable(), this.modes && !this.modes[a.mode] && this.disable(), 
            this.fire("refresh", {
                editor: a,
                path: c
            }) === !1 ? !0 : b.refresh && b.refresh.apply(this, arguments) !== !1) : (this.disable(), 
            !0);
        };
        var c;
        this.checkAllowed = function(b) {
            return b || "boolean" != typeof c ? c = a.activeFilter.checkFeature(this) : c;
        }, CKEDITOR.tools.extend(this, b, {
            modes: {
                wysiwyg: 1
            },
            editorFocus: 1,
            contextSensitive: !!b.context,
            state: CKEDITOR.TRISTATE_DISABLED
        }), CKEDITOR.event.call(this);
    }, CKEDITOR.command.prototype = {
        enable: function() {
            this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF);
        },
        disable: function() {
            this.setState(CKEDITOR.TRISTATE_DISABLED);
        },
        setState: function(a) {
            return this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed() ? !1 : (this.previousState = this.state, 
            this.state = a, this.fire("state"), !0);
        },
        toggleState: function() {
            this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF);
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, 
    CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
        customConfig: "config.js",
        autoUpdateElement: !0,
        language: "",
        defaultLanguage: "en",
        contentsLangDirection: "",
        enterMode: CKEDITOR.ENTER_P,
        forceEnterMode: !1,
        shiftEnterMode: CKEDITOR.ENTER_BR,
        docType: "<!DOCTYPE html>",
        bodyId: "",
        bodyClass: "",
        fullPage: !1,
        height: 200,
        extraPlugins: "",
        removePlugins: "",
        protectedSource: [],
        tabIndex: 0,
        width: "",
        baseFloatZIndex: 1e4,
        blockedKeystrokes: [ CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85 ]
    }, function() {
        function a(a, c, d, f, g) {
            var h = c.name;
            if ((f || "function" != typeof a.elements || a.elements(h)) && (!a.match || a.match(c))) {
                if (f = !g) {
                    a: if (a.nothingRequired) f = !0; else {
                        if (g = a.requiredClasses) for (h = c.classes, f = 0; f < g.length; ++f) if (-1 == CKEDITOR.tools.indexOf(h, g[f])) {
                            f = !1;
                            break a;
                        }
                        f = e(c.styles, a.requiredStyles) && e(c.attributes, a.requiredAttributes);
                    }
                    f = !f;
                }
                if (!f && (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = b(a.attributes, c.attributes, d.validAttributes)), 
                d.allStyles || (d.allStyles = b(a.styles, c.styles, d.validStyles)), !d.allClasses)) {
                    if (a = a.classes, c = c.classes, f = d.validClasses, a) if (a === !0) c = !0; else {
                        for (var i, g = 0, h = c.length; h > g; ++g) i = c[g], f[i] || (f[i] = a(i));
                        c = !1;
                    } else c = !1;
                    d.allClasses = c;
                }
            }
        }
        function b(a, b, c) {
            if (!a) return !1;
            if (a === !0) return !0;
            for (var d in b) c[d] || (c[d] = a(d, b[d]));
            return !1;
        }
        function c(a, b) {
            if (!a) return !1;
            if (a === !0) return a;
            if ("string" == typeof a) return a = w(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b));
            if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1;
            var c, d = {}, e = 0;
            for (c in a) d[c] = a[c], e++;
            return e ? d : !1;
        }
        function d(b) {
            if (b._.filterFunction) return b._.filterFunction;
            var c = /^cke:(object|embed|param)$/, d = /^(object|embed|param)$/;
            return b._.filterFunction = function(e, f, g, h, l, m, n) {
                var o, q = e.name, r = !1;
                if (l && (e.name = q = q.replace(c, "$1")), g = g && g[q]) {
                    for (i(e), q = 0; q < g.length; ++q) p(b, e, g[q]);
                    j(e);
                }
                if (f) {
                    var q = e.name, g = f.elements[q], s = f.generic, f = {
                        valid: !1,
                        validAttributes: {},
                        validClasses: {},
                        validStyles: {},
                        allAttributes: !1,
                        allClasses: !1,
                        allStyles: !1
                    };
                    if (!g && !s) return h.push(e), !0;
                    if (i(e), g) for (q = 0, o = g.length; o > q; ++q) a(g[q], e, f, !0, m);
                    if (s) for (q = 0, o = s.length; o > q; ++q) a(s[q], e, f, !1, m);
                    if (!f.valid) return h.push(e), !0;
                    m = f.validAttributes, q = f.validStyles, g = f.validClasses, o = e.attributes;
                    var t, u, s = e.styles, v = o["class"], w = o.style, x = [], y = [], z = /^data-cke-/, A = !1;
                    if (delete o.style, delete o["class"], !f.allAttributes) for (t in o) m[t] || (z.test(t) ? t == (u = t.replace(/^data-cke-saved-/, "")) || m[u] || (delete o[t], 
                    A = !0) : (delete o[t], A = !0));
                    if (f.allStyles) w && (o.style = w); else {
                        for (t in s) q[t] ? x.push(t + ":" + s[t]) : A = !0;
                        x.length && (o.style = x.sort().join("; "));
                    }
                    if (f.allClasses) v && (o["class"] = v); else {
                        for (t in g) g[t] && y.push(t);
                        y.length && (o["class"] = y.sort().join(" ")), v && y.length < v.split(/\s+/).length && (A = !0);
                    }
                    if (A && (r = !0), !n && !k(e)) return h.push(e), !0;
                }
                return l && (e.name = e.name.replace(d, "cke:$1")), r;
            };
        }
        function e(a, b) {
            if (!b) return !0;
            for (var c = 0; c < b.length; ++c) if (!(b[c] in a)) return !1;
            return !0;
        }
        function f(a) {
            if (!a) return {};
            for (var a = a.split(/\s*,\s*/).sort(), b = {}; a.length; ) b[a.shift()] = x;
            return b;
        }
        function g(a) {
            for (var b, c, d, e, f = {}, g = 1, a = w(a); b = a.match(B); ) (c = b[2]) ? (d = h(c, "styles"), 
            e = h(c, "attrs"), c = h(c, "classes")) : d = e = c = null, f["$" + g++] = {
                elements: b[1],
                classes: c,
                styles: d,
                attributes: e
            }, a = a.slice(b[0].length);
            return f;
        }
        function h(a, b) {
            var c = a.match(C[b]);
            return c ? w(c[1]) : null;
        }
        function i(a) {
            a.styles || (a.styles = CKEDITOR.tools.parseCssText(a.attributes.style || "", 1)), 
            a.classes || (a.classes = a.attributes["class"] ? a.attributes["class"].split(/\s+/) : []);
        }
        function j(a) {
            var b, c = a.attributes;
            delete c.style, delete c["class"], (b = CKEDITOR.tools.writeCssText(a.styles, !0)) && (c.style = b), 
            a.classes.length && (c["class"] = a.classes.sort().join(" "));
        }
        function k(a) {
            switch (a.name) {
              case "a":
                if (!a.children.length && !a.attributes.name) return !1;
                break;

              case "img":
                if (!a.attributes.src) return !1;
            }
            return !0;
        }
        function l(a) {
            return a ? a === !0 ? !0 : function(b) {
                return b in a;
            } : !1;
        }
        function m() {
            return new CKEDITOR.htmlParser.element("br");
        }
        function n(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || u.$block[a.name]);
        }
        function o(a, b, c) {
            var d = a.name;
            if (u.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(m()) : (a.parent && c.push({
                check: "it",
                el: a.parent
            }), a.remove()); else if (u.$block[d] || "tr" == d) if ("br" == b) a.previous && !n(a.previous) && (b = m(), 
            b.insertBefore(a)), a.next && !n(a.next) && (b = m(), b.insertAfter(a)), a.replaceWithChildren(); else {
                var e, d = a.children;
                a: {
                    e = u[b];
                    for (var f, g = 0, h = d.length; h > g; ++g) if (f = d[g], f.type == CKEDITOR.NODE_ELEMENT && !e[f.name]) {
                        e = !1;
                        break a;
                    }
                    e = !0;
                }
                if (e) a.name = b, a.attributes = {}, c.push({
                    check: "parent-down",
                    el: a
                }); else {
                    e = a.parent;
                    for (var i, g = e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == e.name, h = d.length; h > 0; ) f = d[--h], 
                    g && (f.type == CKEDITOR.NODE_TEXT || f.type == CKEDITOR.NODE_ELEMENT && u.$inline[f.name]) ? (i || (i = new CKEDITOR.htmlParser.element(b), 
                    i.insertAfter(a), c.push({
                        check: "parent-down",
                        el: i
                    })), i.add(f, 0)) : (i = null, f.insertAfter(a), e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && f.type == CKEDITOR.NODE_ELEMENT && !u[e.name][f.name] && c.push({
                        check: "el-up",
                        el: f
                    }));
                    a.remove();
                }
            } else "style" == d ? a.remove() : (a.parent && c.push({
                check: "it",
                el: a.parent
            }), a.replaceWithChildren());
        }
        function p(a, b, c) {
            var d, e;
            for (d = 0; d < c.length; ++d) if (e = c[d], !(e.check && !a.check(e.check, !1) || e.left && !e.left(b))) {
                e.right(b, D);
                break;
            }
        }
        function q(a, b) {
            var c, d, e, f, g = b.getDefinition(), h = g.attributes, i = g.styles;
            if (a.name != g.element) return !1;
            for (c in h) if ("class" == c) {
                for (g = h[c].split(/\s+/), e = a.classes.join("|"); f = g.pop(); ) if (-1 == e.indexOf(f)) return !1;
            } else if (a.attributes[c] != h[c]) return !1;
            for (d in i) if (a.styles[d] != i[d]) return !1;
            return !0;
        }
        function r(a, b) {
            var c, d;
            return "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], 
            d = a[1]), [ {
                element: c,
                left: d,
                right: function(a, c) {
                    c.transform(a, b);
                }
            } ];
        }
        function s(a) {
            return function(b) {
                return q(b, a);
            };
        }
        function t(a) {
            return function(b, c) {
                c[a](b);
            };
        }
        var u = CKEDITOR.dtd, v = CKEDITOR.tools.copy, w = CKEDITOR.tools.trim, x = "cke-test", y = [ "", "p", "br", "div" ];
        CKEDITOR.filter = function(a) {
            if (this.allowedContent = [], this.disabled = !1, this.editor = null, this.id = CKEDITOR.tools.getNextNumber(), 
            this._ = {
                rules: {},
                transformations: {},
                cachedTests: {}
            }, CKEDITOR.filter.instances[this.id] = this, a instanceof CKEDITOR.editor) {
                a = this.editor = a, this.customConfig = !0;
                var b = a.config.allowedContent;
                b === !0 ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), 
                this.allow(a.config.extraAllowedContent, "extra", 1), this.allow(y[a.enterMode] + " " + y[a.shiftEnterMode], "default", 1));
            } else this.customConfig = !1, this.allow(a, "default", 1);
        }, CKEDITOR.filter.instances = {}, CKEDITOR.filter.prototype = {
            allow: function(a, b, d) {
                if (this.disabled || this.customConfig && !d || !a) return !1;
                this._.cachedChecks = {};
                var e, f;
                if ("string" == typeof a) a = g(a); else if (a instanceof CKEDITOR.style) f = a.getDefinition(), 
                d = {}, a = f.attributes, d[f.element] = f = {
                    styles: f.styles,
                    requiredStyles: f.styles && CKEDITOR.tools.objectKeys(f.styles)
                }, a && (a = v(a), f.classes = a["class"] ? a["class"].split(/\s+/) : null, f.requiredClasses = f.classes, 
                delete a["class"], f.attributes = a, f.requiredAttributes = a && CKEDITOR.tools.objectKeys(a)), 
                a = d; else if (CKEDITOR.tools.isArray(a)) {
                    for (e = 0; e < a.length; ++e) f = this.allow(a[e], b, d);
                    return f;
                }
                var h, d = [];
                for (h in a) {
                    f = a[h], f = "boolean" == typeof f ? {} : "function" == typeof f ? {
                        match: f
                    } : v(f), "$" != h.charAt(0) && (f.elements = h), b && (f.featureName = b.toLowerCase());
                    var i = f;
                    i.elements = c(i.elements, /\s+/) || null, i.propertiesOnly = i.propertiesOnly || i.elements === !0;
                    var j = /\s*,\s*/, k = void 0;
                    for (k in z) {
                        i[k] = c(i[k], j) || null;
                        var m = i, n = A[k], o = c(i[A[k]], j), p = i[k], q = [], r = !0, s = void 0;
                        o ? r = !1 : o = {};
                        for (s in p) "!" == s.charAt(0) && (s = s.slice(1), q.push(s), o[s] = !0, r = !1);
                        for (;s = q.pop(); ) p[s] = p["!" + s], delete p["!" + s];
                        m[n] = (r ? !1 : o) || null;
                    }
                    i.match = i.match || null, this.allowedContent.push(f), d.push(f);
                }
                for (b = this._.rules, h = b.elements || {}, a = b.generic || [], f = 0, i = d.length; i > f; ++f) {
                    j = v(d[f]), k = j.classes === !0 || j.styles === !0 || j.attributes === !0, m = j, 
                    n = void 0;
                    for (n in z) m[n] = l(m[n]);
                    o = !0;
                    for (n in A) n = A[n], m[n] = CKEDITOR.tools.objectKeys(m[n]), m[n] && (o = !1);
                    if (m.nothingRequired = o, j.elements === !0 || null === j.elements) j.elements = l(j.elements), 
                    a[k ? "unshift" : "push"](j); else {
                        m = j.elements, delete j.elements;
                        for (e in m) h[e] ? h[e][k ? "unshift" : "push"](j) : h[e] = [ j ];
                    }
                }
                return b.elements = h, b.generic = a.length ? a : null, !0;
            },
            applyTo: function(a, b, c, e) {
                if (this.disabled) return !1;
                var f = [], g = !c && this._.rules, h = this._.transformations, i = d(this), j = this.editor && this.editor.config.protectedSource, l = !1;
                a.forEach(function(a) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        if ("off" == a.attributes["data-cke-filter"]) return !1;
                        b && "span" == a.name && ~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-") || i(a, g, h, f, b) && (l = !0);
                    } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var c;
                        a: {
                            var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));
                            c = [];
                            var e, k, m;
                            if (j) for (k = 0; k < j.length; ++k) if ((m = d.match(j[k])) && m[0].length == d.length) {
                                c = !0;
                                break a;
                            }
                            d = CKEDITOR.htmlParser.fragment.fromHtml(d), 1 == d.children.length && (e = d.children[0]).type == CKEDITOR.NODE_ELEMENT && i(e, g, h, c, b), 
                            c = !c.length;
                        }
                        c || f.push(a);
                    }
                }, null, !0), f.length && (l = !0);
                for (var m, a = [], e = y[e || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; c = f.pop(); ) c.type == CKEDITOR.NODE_ELEMENT ? o(c, e, a) : c.remove();
                for (;m = a.pop(); ) if (c = m.el, c.parent) switch (m.check) {
                  case "it":
                    u.$removeEmpty[c.name] && !c.children.length ? o(c, e, a) : k(c) || o(c, e, a);
                    break;

                  case "el-up":
                    c.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !u[c.parent.name][c.name] && o(c, e, a);
                    break;

                  case "parent-down":
                    c.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !u[c.parent.name][c.name] && o(c.parent, e, a);
                }
                return l;
            },
            checkFeature: function(a) {
                return this.disabled || !a ? !0 : (a.toFeature && (a = a.toFeature(this.editor)), 
                !a.requiredContent || this.check(a.requiredContent));
            },
            disable: function() {
                this.disabled = !0;
            },
            addContentForms: function(a) {
                if (!this.disabled && a) {
                    var b, c, d, e = [];
                    for (b = 0; b < a.length && !d; ++b) c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (d = c);
                    if (d) {
                        for (b = 0; b < a.length; ++b) e.push(r(a[b], d));
                        this.addTransformations(e);
                    }
                }
            },
            addFeature: function(a) {
                return this.disabled || !a ? !0 : (a.toFeature && (a = a.toFeature(this.editor)), 
                this.allow(a.allowedContent, a.name), this.addTransformations(a.contentTransformations), 
                this.addContentForms(a.contentForms), this.customConfig && a.requiredContent ? this.check(a.requiredContent) : !0);
            },
            addTransformations: function(a) {
                var b, c;
                if (!this.disabled && a) {
                    var d, e = this._.transformations;
                    for (d = 0; d < a.length; ++d) {
                        b = a[d];
                        var f = void 0, g = void 0, h = void 0, i = void 0, j = void 0, k = void 0;
                        for (c = [], g = 0; g < b.length; ++g) h = b[g], "string" == typeof h ? (h = h.split(/\s*:\s*/), 
                        i = h[0], j = null, k = h[1]) : (i = h.check, j = h.left, k = h.right), f || (f = h, 
                        f = f.element ? f.element : i ? i.match(/^([a-z0-9]+)/i)[0] : f.left.getDefinition().element), 
                        j instanceof CKEDITOR.style && (j = s(j)), c.push({
                            check: i == f ? null : i,
                            left: j,
                            right: "string" == typeof k ? t(k) : k
                        });
                        b = f, e[b] || (e[b] = []), e[b].push(c);
                    }
                }
            },
            check: function(a, b, c) {
                if (this.disabled) return !0;
                if (CKEDITOR.tools.isArray(a)) {
                    for (var e = a.length; e--; ) if (this.check(a[e], b, c)) return !0;
                    return !1;
                }
                var h, i;
                if ("string" == typeof a) {
                    if (i = a + "<" + (b === !1 ? "0" : "1") + (c ? "1" : "0") + ">", i in this._.cachedChecks) return this._.cachedChecks[i];
                    e = g(a).$1, h = e.styles;
                    var k = e.classes;
                    e.name = e.elements, e.classes = k = k ? k.split(/\s*,\s*/) : [], e.styles = f(h), 
                    e.attributes = f(e.attributes), e.children = [], k.length && (e.attributes["class"] = k.join(" ")), 
                    h && (e.attributes.style = CKEDITOR.tools.writeCssText(e.styles)), h = e;
                } else e = a.getDefinition(), h = e.styles, k = e.attributes || {}, h ? (h = v(h), 
                k.style = CKEDITOR.tools.writeCssText(h, !0)) : h = {}, h = {
                    name: e.element,
                    attributes: k,
                    classes: k["class"] ? k["class"].split(/\s+/) : [],
                    styles: h,
                    children: []
                };
                var l, k = CKEDITOR.tools.clone(h), m = [];
                if (b !== !1 && (l = this._.transformations[h.name])) {
                    for (e = 0; e < l.length; ++e) p(this, h, l[e]);
                    j(h);
                }
                return d(this)(k, this._.rules, b === !1 ? !1 : this._.transformations, m, !1, !c, !c), 
                b = m.length > 0 ? !1 : CKEDITOR.tools.objectCompare(h.attributes, k.attributes, !0) ? !0 : !1, 
                "string" == typeof a && (this._.cachedChecks[i] = b), b;
            },
            getAllowedEnterMode: function() {
                var a = [ "p", "div", "br" ], b = {
                    p: CKEDITOR.ENTER_P,
                    div: CKEDITOR.ENTER_DIV,
                    br: CKEDITOR.ENTER_BR
                };
                return function(c, d) {
                    var e, f = a.slice();
                    if (this.check(y[c])) return c;
                    for (d || (f = f.reverse()); e = f.pop(); ) if (this.check(e)) return b[e];
                    return CKEDITOR.ENTER_BR;
                };
            }()
        };
        var z = {
            styles: 1,
            attributes: 1,
            classes: 1
        }, A = {
            styles: "requiredStyles",
            attributes: "requiredAttributes",
            classes: "requiredClasses"
        }, B = /^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, C = {
            styles: /{([^}]+)}/,
            attrs: /\[([^\]]+)\]/,
            classes: /\(([^\)]+)\)/
        }, D = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function(a) {
                this.lengthToStyle(a, "width"), this.lengthToStyle(a, "height");
            },
            sizeToAttribute: function(a) {
                this.lengthToAttribute(a, "width"), this.lengthToAttribute(a, "height");
            },
            lengthToStyle: function(a, b, c) {
                if (c = c || b, !(c in a.styles)) {
                    var d = a.attributes[b];
                    d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d);
                }
                delete a.attributes[b];
            },
            lengthToAttribute: function(a, b, c) {
                if (c = c || b, !(c in a.attributes)) {
                    var d = a.styles[b], e = d && d.match(/^(\d+)(?:\.\d*)?px$/);
                    e ? a.attributes[c] = e[1] : d == x && (a.attributes[c] = x);
                }
                delete a.styles[b];
            },
            alignmentToStyle: function(a) {
                if (!("float" in a.styles)) {
                    var b = a.attributes.align;
                    ("left" == b || "right" == b) && (a.styles["float"] = b);
                }
                delete a.attributes.align;
            },
            alignmentToAttribute: function(a) {
                if (!("align" in a.attributes)) {
                    var b = a.styles["float"];
                    ("left" == b || "right" == b) && (a.attributes.align = b);
                }
                delete a.styles["float"];
            },
            matchesStyle: q,
            transform: function(a, b) {
                if ("string" == typeof b) a.name = b; else {
                    var c, d, e, f, g = b.getDefinition(), h = g.styles, i = g.attributes;
                    a.name = g.element;
                    for (c in i) if ("class" == c) for (g = a.classes.join("|"), e = i[c].split(/\s+/); f = e.pop(); ) -1 == g.indexOf(f) && a.classes.push(f); else a.attributes[c] = i[c];
                    for (d in h) a.styles[d] = h[d];
                }
            }
        };
    }(), function() {
        CKEDITOR.focusManager = function(a) {
            return a.focusManager ? a.focusManager : (this.hasFocus = !1, this.currentActive = null, 
            this._ = {
                editor: a
            }, this);
        }, CKEDITOR.focusManager._ = {
            blurDelay: 200
        }, CKEDITOR.focusManager.prototype = {
            focus: function(a) {
                this._.timer && clearTimeout(this._.timer), a && (this.currentActive = a), this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), 
                this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus"));
            },
            lock: function() {
                this._.locked = 1;
            },
            unlock: function() {
                delete this._.locked;
            },
            blur: function(a) {
                function b() {
                    if (this.hasFocus) {
                        this.hasFocus = !1;
                        var a = this._.editor.container;
                        a && a.removeClass("cke_focus"), this._.editor.fire("blur");
                    }
                }
                if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer);
                    var c = CKEDITOR.focusManager._.blurDelay;
                    a || !c ? b.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
                        delete this._.timer, b.call(this);
                    }, c, this);
                }
            },
            add: function(a, b) {
                var c = a.getCustomData("focusmanager");
                if (!c || c != this) {
                    c && c.remove(a);
                    var c = "focus", d = "blur";
                    b && (CKEDITOR.env.ie ? (c = "focusin", d = "focusout") : CKEDITOR.event.useCapture = 1);
                    var e = {
                        blur: function() {
                            a.equals(this.currentActive) && this.blur();
                        },
                        focus: function() {
                            this.focus(a);
                        }
                    };
                    a.on(c, e.focus, this), a.on(d, e.blur, this), b && (CKEDITOR.event.useCapture = 0), 
                    a.setCustomData("focusmanager", this), a.setCustomData("focusmanager_handlers", e);
                }
            },
            remove: function(a) {
                a.removeCustomData("focusmanager");
                var b = a.removeCustomData("focusmanager_handlers");
                a.removeListener("blur", b.blur), a.removeListener("focus", b.focus);
            }
        };
    }(), CKEDITOR.keystrokeHandler = function(a) {
        return a.keystrokeHandler ? a.keystrokeHandler : (this.keystrokes = {}, this.blockedKeystrokes = {}, 
        this._ = {
            editor: a
        }, this);
    }, function() {
        var a, b = function(b) {
            var b = b.data, c = b.getKeystroke(), d = this.keystrokes[c], e = this._.editor;
            return a = e.fire("key", {
                keyCode: c
            }) === !1, a || (d && (a = e.execCommand(d, {
                from: "keystrokeHandler"
            }) !== !1), a || (a = !!this.blockedKeystrokes[c])), a && b.preventDefault(!0), 
            !a;
        }, c = function(b) {
            a && (a = !1, b.data.preventDefault(!0));
        };
        CKEDITOR.keystrokeHandler.prototype = {
            attach: function(a) {
                a.on("keydown", b, this), (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) && a.on("keypress", c, this);
            }
        };
    }(), function() {
        CKEDITOR.lang = {
            languages: {
                af: 1,
                ar: 1,
                bg: 1,
                bn: 1,
                bs: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                "en-au": 1,
                "en-ca": 1,
                "en-gb": 1,
                en: 1,
                eo: 1,
                es: 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                "fr-ca": 1,
                fr: 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                id: 1,
                is: 1,
                it: 1,
                ja: 1,
                ka: 1,
                km: 1,
                ko: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                ms: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                "pt-br": 1,
                pt: 1,
                ro: 1,
                ru: 1,
                si: 1,
                sk: 1,
                sl: 1,
                sq: 1,
                "sr-latn": 1,
                sr: 1,
                sv: 1,
                th: 1,
                tr: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1,
                zh: 1
            },
            rtl: {
                ar: 1,
                fa: 1,
                he: 1,
                ku: 1,
                ug: 1
            },
            load: function(a, b, c) {
                a && CKEDITOR.lang.languages[a] || (a = this.detect(b, a)), this[a] ? c(a, this[a]) : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), function() {
                    this[a].dir = this.rtl[a] ? "rtl" : "ltr", c(a, this[a]);
                }, this);
            },
            detect: function(a, b) {
                var c = this.languages, b = b || navigator.userLanguage || navigator.language || a, d = b.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), e = d[1], d = d[2];
                return c[e + "-" + d] ? e = e + "-" + d : c[e] || (e = null), CKEDITOR.lang.detect = e ? function() {
                    return e;
                } : function(a) {
                    return a;
                }, e || a;
            }
        };
    }(), CKEDITOR.scriptLoader = function() {
        var a = {}, b = {};
        return {
            load: function(c, d, e, f) {
                var g = "string" == typeof c;
                g && (c = [ c ]), e || (e = CKEDITOR);
                var h = c.length, i = [], j = [], k = function(a) {
                    d && (g ? d.call(e, a) : d.call(e, i, j));
                };
                if (0 === h) k(!0); else {
                    var l = function(a, b) {
                        (b ? i : j).push(a), --h <= 0 && (f && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), 
                        k(b));
                    }, m = function(c, d) {
                        a[c] = 1;
                        var e = b[c];
                        delete b[c];
                        for (var f = 0; f < e.length; f++) e[f](c, d);
                    }, n = function(c) {
                        if (a[c]) l(c, !0); else {
                            var e = b[c] || (b[c] = []);
                            if (e.push(l), !(e.length > 1)) {
                                var f = new CKEDITOR.dom.element("script");
                                f.setAttributes({
                                    type: "text/javascript",
                                    src: c
                                }), d && (CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? f.$.onreadystatechange = function() {
                                    ("loaded" == f.$.readyState || "complete" == f.$.readyState) && (f.$.onreadystatechange = null, 
                                    m(c, !0));
                                } : (f.$.onload = function() {
                                    setTimeout(function() {
                                        m(c, !0);
                                    }, 0);
                                }, f.$.onerror = function() {
                                    m(c, !1);
                                })), f.appendTo(CKEDITOR.document.getHead());
                            }
                        }
                    };
                    f && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                    for (var o = 0; h > o; o++) n(c[o]);
                }
            },
            queue: function() {
                function a() {
                    var a;
                    (a = b[0]) && this.load(a.scriptUrl, a.callback, CKEDITOR, 0);
                }
                var b = [];
                return function(c, d) {
                    var e = this;
                    b.push({
                        scriptUrl: c,
                        callback: function() {
                            d && d.apply(this, arguments), b.shift(), a.call(e);
                        }
                    }), 1 == b.length && a.call(this);
                };
            }()
        };
    }(), CKEDITOR.resourceManager = function(a, b) {
        this.basePath = a, this.fileName = b, this.registered = {}, this.loaded = {}, this.externals = {}, 
        this._ = {
            waitingList: {}
        };
    }, CKEDITOR.resourceManager.prototype = {
        add: function(a, b) {
            if (this.registered[a]) throw '[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.';
            var c = this.registered[a] = b || {};
            return c.name = a, c.path = this.getPath(a), CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", c), 
            this.get(a);
        },
        get: function(a) {
            return this.registered[a] || null;
        },
        getPath: function(a) {
            var b = this.externals[a];
            return CKEDITOR.getUrl(b && b.dir || this.basePath + a + "/");
        },
        getFilePath: function(a) {
            var b = this.externals[a];
            return CKEDITOR.getUrl(this.getPath(a) + (b ? b.file : this.fileName + ".js"));
        },
        addExternal: function(a, b, c) {
            for (var a = a.split(","), d = 0; d < a.length; d++) {
                var e = a[d];
                c || (b = b.replace(/[^\/]+$/, function(a) {
                    return c = a, "";
                })), this.externals[e] = {
                    dir: b,
                    file: c || this.fileName + ".js"
                };
            }
        },
        load: function(a, b, c) {
            CKEDITOR.tools.isArray(a) || (a = a ? [ a ] : []);
            for (var d = this.loaded, e = this.registered, f = [], g = {}, h = {}, i = 0; i < a.length; i++) {
                var j = a[i];
                if (j) if (d[j] || e[j]) h[j] = this.get(j); else {
                    var k = this.getFilePath(j);
                    f.push(k), k in g || (g[k] = []), g[k].push(j);
                }
            }
            CKEDITOR.scriptLoader.load(f, function(a, e) {
                if (e.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + g[e[0]].join(",") + '" was not found at "' + e[0] + '".';
                for (var f = 0; f < a.length; f++) for (var i = g[a[f]], j = 0; j < i.length; j++) {
                    var k = i[j];
                    h[k] = this.get(k), d[k] = 1;
                }
                b.call(c, h);
            }, this);
        }
    }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(a) {
        var b = {};
        return function(c, d, e) {
            var f = {}, g = function(c) {
                a.call(this, c, function(a) {
                    CKEDITOR.tools.extend(f, a);
                    var c, h = [];
                    for (c in a) {
                        var i = a[c], j = i && i.requires;
                        if (!b[c]) {
                            if (i.icons) for (var k = i.icons.split(","), l = k.length; l--; ) CKEDITOR.skin.addIcon(k[l], i.path + "icons/" + (CKEDITOR.env.hidpi && i.hidpi ? "hidpi/" : "") + k[l] + ".png");
                            b[c] = 1;
                        }
                        if (j) for (j.split && (j = j.split(",")), i = 0; i < j.length; i++) f[j[i]] || h.push(j[i]);
                    }
                    if (h.length) g.call(this, h); else {
                        for (c in f) i = f[c], i.onLoad && !i.onLoad._called && (i.onLoad() === !1 && delete f[c], 
                        i.onLoad._called = 1);
                        d && d.call(e || window, f);
                    }
                }, this);
            };
            g.call(this, c);
        };
    }), CKEDITOR.plugins.setLang = function(a, b, c) {
        var d = this.get(a), a = d.langEntries || (d.langEntries = {}), d = d.lang || (d.lang = []);
        d.split && (d = d.split(",")), -1 == CKEDITOR.tools.indexOf(d, b) && d.push(b), 
        a[b] = c;
    }, CKEDITOR.ui = function(a) {
        return a.ui ? a.ui : (this.items = {}, this.instances = {}, this.editor = a, this._ = {
            handlers: {}
        }, this);
    }, CKEDITOR.ui.prototype = {
        add: function(a, b, c) {
            c.name = a.toLowerCase();
            var d = this.items[a] = {
                type: b,
                command: c.command || null,
                args: Array.prototype.slice.call(arguments, 2)
            };
            CKEDITOR.tools.extend(d, c);
        },
        get: function(a) {
            return this.instances[a];
        },
        create: function(a) {
            var b = this.items[a], c = b && this._.handlers[b.type], d = b && b.command && this.editor.getCommand(b.command), c = c && c.create.apply(this, b.args);
            return this.instances[a] = c, d && d.uiItems.push(c), c && !c.type && (c.type = b.type), 
            c;
        },
        addHandler: function(a, b) {
            this._.handlers[a] = b;
        },
        space: function(a) {
            return CKEDITOR.document.getById(this.spaceId(a));
        },
        spaceId: function(a) {
            return this.editor.id + "_" + a;
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.ui), function() {
        function a(a, d, f) {
            if (CKEDITOR.event.call(this), a = a && CKEDITOR.tools.clone(a), void 0 !== d) {
                if (!(d instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
                if (!f) throw Error("One of the element modes must be specified.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                if (!(f == CKEDITOR.ELEMENT_MODE_INLINE ? d.is(CKEDITOR.dtd.$editable) || d.is("textarea") : f == CKEDITOR.ELEMENT_MODE_REPLACE ? !d.is(CKEDITOR.dtd.$nonBodyContent) : 1)) throw Error('The specified element mode is not supported on element: "' + d.getName() + '".');
                this.element = d, this.elementMode = f, this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (d.getId() || d.getNameAtt());
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {}, this.commands = {}, this.templates = {}, this.name = this.name || b(), 
            this.id = CKEDITOR.tools.getNextId(), this.status = "unloaded", this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config), 
            this.ui = new CKEDITOR.ui(this), this.focusManager = new CKEDITOR.focusManager(this), 
            this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this), this.on("readOnly", c), 
            this.on("selectionChange", function(a) {
                e(this, a.data.path);
            }), this.on("activeFilterChange", function() {
                e(this, this.elementPath(), !0);
            }), this.on("mode", c), this.on("instanceReady", function() {
                this.config.startupFocus && this.focus();
            }), CKEDITOR.fire("instanceCreated", null, this), CKEDITOR.add(this), CKEDITOR.tools.setTimeout(function() {
                g(this, a);
            }, 0, this);
        }
        function b() {
            do var a = "editor" + ++m; while (CKEDITOR.instances[a]);
            return a;
        }
        function c() {
            var a, b = this.commands;
            for (a in b) d(this, b[a]);
        }
        function d(a, b) {
            b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]();
        }
        function e(a, b, c) {
            if (b) {
                var d, e, f = a.commands;
                for (e in f) d = f[e], (c || d.contextSensitive) && d.refresh(a, b);
            }
        }
        function f(a) {
            var b = a.config.customConfig;
            if (!b) return !1;
            var b = CKEDITOR.getUrl(b), c = n[b] || (n[b] = {});
            return c.fn ? (c.fn.call(a, a.config), (CKEDITOR.getUrl(a.config.customConfig) == b || !f(a)) && a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function() {
                c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {}, f(a);
            }), !0;
        }
        function g(a, b) {
            a.on("customConfigLoaded", function() {
                if (b) {
                    if (b.on) for (var c in b.on) a.on(c, b.on[c]);
                    CKEDITOR.tools.extend(a.config, b, !0), delete a.config.on;
                }
                c = a.config, a.readOnly = !(!c.readOnly && !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && a.element.hasAttribute("disabled"))), 
                a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1, 
                a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0, 
                a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode, 
                a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode, 
                c.skin && (CKEDITOR.skinName = c.skin), a.fireOnce("configLoaded"), a.dataProcessor = new CKEDITOR.htmlDataProcessor(a), 
                a.filter = a.activeFilter = new CKEDITOR.filter(a), h(a);
            }), b && void 0 != b.customConfig && (a.config.customConfig = b.customConfig), f(a) || a.fireOnce("customConfigLoaded");
        }
        function h(a) {
            CKEDITOR.skin.loadPart("editor", function() {
                i(a);
            });
        }
        function i(a) {
            CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, c) {
                var d = a.config.title;
                a.langCode = b, a.lang = CKEDITOR.tools.prototypedCopy(c), a.title = "string" == typeof d || d === !1 ? d : [ a.lang.editor, a.name ].join(", "), 
                CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && "rtl" == a.lang.dir && (a.lang.dir = "ltr"), 
                a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir), 
                a.fire("langLoaded"), j(a);
            });
        }
        function j(a) {
            a.getStylesSet(function(b) {
                a.once("loaded", function() {
                    a.fire("stylesSet", {
                        styles: b
                    });
                }, null, null, 1), k(a);
            });
        }
        function k(a) {
            var b = a.config, c = b.plugins, d = b.extraPlugins, e = b.removePlugins;
            if (d) var f = RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(f, ""), c = c + ("," + d);
            if (e) var g = RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(g, "");
            CKEDITOR.env.air && (c += ",adobeair"), CKEDITOR.plugins.load(c.split(","), function(c) {
                var d = [], e = [], f = [];
                a.plugins = c;
                for (var h in c) {
                    var i, j = c[h], k = j.lang, l = null, m = j.requires;
                    if (CKEDITOR.tools.isArray(m) && (m = m.join(",")), m && (i = m.match(g))) for (;m = i.pop(); ) CKEDITOR.tools.setTimeout(function(a, b) {
                        throw Error('Plugin "' + a.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' + b + '" plugin.');
                    }, 0, null, [ m, h ]);
                    k && !a.lang[h] && (k.split && (k = k.split(",")), CKEDITOR.tools.indexOf(k, a.langCode) >= 0 ? l = a.langCode : (l = a.langCode.replace(/-.*/, ""), 
                    l = l != a.langCode && CKEDITOR.tools.indexOf(k, l) >= 0 ? l : CKEDITOR.tools.indexOf(k, "en") >= 0 ? "en" : k[0]), 
                    j.langEntries && j.langEntries[l] ? (a.lang[h] = j.langEntries[l], l = null) : f.push(CKEDITOR.getUrl(j.path + "lang/" + l + ".js"))), 
                    e.push(l), d.push(j);
                }
                CKEDITOR.scriptLoader.load(f, function() {
                    for (var c = [ "beforeInit", "init", "afterInit" ], f = 0; f < c.length; f++) for (var g = 0; g < d.length; g++) {
                        var h = d[g];
                        0 === f && e[g] && h.lang && h.langEntries && (a.lang[h.name] = h.langEntries[e[g]]), 
                        h[c[f]] && h[c[f]](a);
                    }
                    for (a.fireOnce("pluginsLoaded"), b.keystrokes && a.setKeystroke(a.config.keystrokes), 
                    g = 0; g < a.config.blockedKeystrokes.length; g++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[g]] = 1;
                    a.status = "loaded", a.fireOnce("loaded"), CKEDITOR.fire("instanceLoaded", null, a);
                });
            });
        }
        function l() {
            var a = this.element;
            if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var b = this.getData();
                return this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)), a.is("textarea") ? a.setValue(b) : a.setHtml(b), 
                !0;
            }
            return !1;
        }
        a.prototype = CKEDITOR.editor.prototype, CKEDITOR.editor = a;
        var m = 0, n = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function(a, b) {
                b.name = a.toLowerCase();
                var c = new CKEDITOR.command(this, b);
                return this.mode && d(this, c), this.commands[a] = c;
            },
            _attachToForm: function() {
                var a = this, b = a.element, c = new CKEDITOR.dom.element(b.$.form);
                if (b.is("textarea") && c) {
                    var d = function(c) {
                        a.updateElement(), a._.required && !b.getValue() && a.fire("required") === !1 && c.data.preventDefault();
                    };
                    c.on("submit", d), c.$.submit && c.$.submit.call && c.$.submit.apply && (c.$.submit = CKEDITOR.tools.override(c.$.submit, function(a) {
                        return function() {
                            d(), a.apply ? a.apply(this) : a();
                        };
                    })), a.on("destroy", function() {
                        c.removeListener("submit", d);
                    });
                }
            },
            destroy: function(a) {
                this.fire("beforeDestroy"), !a && l.call(this), this.editable(null), this.status = "destroyed", 
                this.fire("destroy"), this.removeAllListeners(), CKEDITOR.remove(this), CKEDITOR.fire("instanceDestroyed", null, this);
            },
            elementPath: function(a) {
                return (a = a || this.getSelection().getStartElement()) ? new CKEDITOR.dom.elementPath(a, this.editable()) : null;
            },
            createRange: function() {
                var a = this.editable();
                return a ? new CKEDITOR.dom.range(a) : null;
            },
            execCommand: function(a, b) {
                var c = this.getCommand(a), d = {
                    name: a,
                    commandData: b,
                    command: c
                };
                return c && c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", d) !== !0 && (d.returnValue = c.exec(d.commandData), 
                !c.async && this.fire("afterCommandExec", d) !== !0) ? d.returnValue : !1;
            },
            getCommand: function(a) {
                return this.commands[a];
            },
            getData: function(a) {
                !a && this.fire("beforeGetData");
                var b = this._.data;
                return "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : ""), 
                b = {
                    dataValue: b
                }, !a && this.fire("getData", b), b.dataValue;
            },
            getSnapshot: function() {
                var a = this.fire("getSnapshot");
                if ("string" != typeof a) {
                    var b = this.element;
                    b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a = b.is("textarea") ? b.getValue() : b.getHtml());
                }
                return a;
            },
            loadSnapshot: function(a) {
                this.fire("loadSnapshot", a);
            },
            setData: function(a, b, c) {
                b && this.on("dataReady", function(a) {
                    a.removeListener(), b.call(a.editor);
                }), a = {
                    dataValue: a
                }, !c && this.fire("setData", a), this._.data = a.dataValue, !c && this.fire("afterSetData", a);
            },
            setReadOnly: function(a) {
                a = void 0 == a || a, this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, 
                this.editable().setReadOnly(a), this.fire("readOnly"));
            },
            insertHtml: function(a, b) {
                this.fire("insertHtml", {
                    dataValue: a,
                    mode: b
                });
            },
            insertText: function(a) {
                this.fire("insertText", a);
            },
            insertElement: function(a) {
                this.fire("insertElement", a);
            },
            focus: function() {
                this.fire("beforeFocus");
            },
            checkDirty: function() {
                return "ready" == this.status && this._.previousValue !== this.getSnapshot();
            },
            resetDirty: function() {
                this._.previousValue = this.getSnapshot();
            },
            updateElement: function() {
                return l.call(this);
            },
            setKeystroke: function() {
                for (var a, b, c = this.keystrokeHandler.keystrokes, d = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [ [].slice.call(arguments, 0) ], e = d.length; e--; ) a = d[e], 
                b = 0, CKEDITOR.tools.isArray(a) && (b = a[1], a = a[0]), b ? c[a] = b : delete c[a];
            },
            addFeature: function(a) {
                return this.filter.addFeature(a);
            },
            setActiveFilter: function(a) {
                a || (a = this.filter), this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), 
                a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)));
            },
            setActiveEnterMode: function(a, b) {
                a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode, b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode, 
                (this.activeEnterMode != a || this.activeShiftEnterMode != b) && (this.activeEnterMode = a, 
                this.activeShiftEnterMode = b, this.fire("activeEnterModeChange"));
            }
        });
    }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, 
    CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() {
        this._ = {
            htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)-->)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))", "g")
        };
    }, function() {
        var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, b = {
            checked: 1,
            compact: 1,
            declare: 1,
            defer: 1,
            disabled: 1,
            ismap: 1,
            multiple: 1,
            nohref: 1,
            noresize: 1,
            noshade: 1,
            nowrap: 1,
            readonly: 1,
            selected: 1
        };
        CKEDITOR.htmlParser.prototype = {
            onTagOpen: function() {},
            onTagClose: function() {},
            onText: function() {},
            onCDATA: function() {},
            onComment: function() {},
            parse: function(c) {
                for (var d, e, f, g = 0; d = this._.htmlPartsRegex.exec(c); ) if (e = d.index, e > g && (g = c.substring(g, e), 
                f ? f.push(g) : this.onText(g)), g = this._.htmlPartsRegex.lastIndex, !(e = d[1]) || (e = e.toLowerCase(), 
                f && CKEDITOR.dtd.$cdata[e] && (this.onCDATA(f.join("")), f = null), f)) if (f) f.push(d[0]); else if (e = d[3]) {
                    if (e = e.toLowerCase(), !/="/.test(e)) {
                        var h, i = {};
                        d = d[4];
                        var j = !(!d || "/" != d.charAt(d.length - 1));
                        if (d) for (;h = a.exec(d); ) {
                            var k = h[1].toLowerCase();
                            h = h[2] || h[3] || h[4] || "", i[k] = !h && b[k] ? k : CKEDITOR.tools.htmlDecodeAttr(h);
                        }
                        this.onTagOpen(e, i, j), !f && CKEDITOR.dtd.$cdata[e] && (f = []);
                    }
                } else (e = d[2]) && this.onComment(e); else this.onTagClose(e);
                c.length > g && this.onText(c.substring(g, c.length));
            }
        };
    }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function() {
            this._ = {
                output: []
            };
        },
        proto: {
            openTag: function(a) {
                this._.output.push("<", a);
            },
            openTagClose: function(a, b) {
                this._.output.push(b ? " />" : ">");
            },
            attribute: function(a, b) {
                "string" == typeof b && (b = CKEDITOR.tools.htmlEncodeAttr(b)), this._.output.push(" ", a, '="', b, '"');
            },
            closeTag: function(a) {
                this._.output.push("</", a, ">");
            },
            text: function(a) {
                this._.output.push(a);
            },
            comment: function(a) {
                this._.output.push("<!--", a, "-->");
            },
            write: function(a) {
                this._.output.push(a);
            },
            reset: function() {
                this._.output = [], this._.indent = !1;
            },
            getHtml: function(a) {
                var b = this._.output.join("");
                return a && this.reset(), b;
            }
        }
    }), function() {
        CKEDITOR.htmlParser.node = function() {}, CKEDITOR.htmlParser.node.prototype = {
            remove: function() {
                var a = this.parent.children, b = CKEDITOR.tools.indexOf(a, this), c = this.previous, d = this.next;
                c && (c.next = d), d && (d.previous = c), a.splice(b, 1), this.parent = null;
            },
            replaceWith: function(a) {
                var b = this.parent.children, c = CKEDITOR.tools.indexOf(b, this), d = a.previous = this.previous, e = a.next = this.next;
                d && (d.next = a), e && (e.previous = a), b[c] = a, a.parent = this.parent, this.parent = null;
            },
            insertAfter: function(a) {
                var b = a.parent.children, c = CKEDITOR.tools.indexOf(b, a), d = a.next;
                b.splice(c + 1, 0, this), this.next = a.next, this.previous = a, a.next = this, 
                d && (d.previous = this), this.parent = a.parent;
            },
            insertBefore: function(a) {
                var b = a.parent.children, c = CKEDITOR.tools.indexOf(b, a);
                b.splice(c, 0, this), this.next = a, (this.previous = a.previous) && (a.previous.next = this), 
                a.previous = this, this.parent = a.parent;
            },
            getAscendant: function(a) {
                for (var b = ("function" == typeof a ? a : "string" == typeof a ? function(b) {
                    return b.name == a;
                } : function(b) {
                    return b.name in a;
                }), c = this.parent; c && c.type == CKEDITOR.NODE_ELEMENT; ) {
                    if (b(c)) return c;
                    c = c.parent;
                }
                return null;
            },
            wrapWith: function(a) {
                return this.replaceWith(a), a.add(this), a;
            },
            getIndex: function() {
                return CKEDITOR.tools.indexOf(this.parent.children, this);
            },
            getFilterContext: function(a) {
                return a || {};
            }
        };
    }(), CKEDITOR.htmlParser.comment = function(a) {
        this.value = a, this._ = {
            isBlockLike: !1
        };
    }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
        type: CKEDITOR.NODE_COMMENT,
        filter: function(a, b) {
            var c = this.value;
            return (c = a.onComment(b, c, this)) ? "string" != typeof c ? (this.replaceWith(c), 
            !1) : (this.value = c, !0) : (this.remove(), !1);
        },
        writeHtml: function(a, b) {
            b && this.filter(b), a.comment(this.value);
        }
    }), function() {
        CKEDITOR.htmlParser.text = function(a) {
            this.value = a, this._ = {
                isBlockLike: !1
            };
        }, CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
            type: CKEDITOR.NODE_TEXT,
            filter: function(a, b) {
                return (this.value = a.onText(b, this.value, this)) ? void 0 : (this.remove(), !1);
            },
            writeHtml: function(a, b) {
                b && this.filter(b), a.text(this.value);
            }
        });
    }(), function() {
        CKEDITOR.htmlParser.cdata = function(a) {
            this.value = a;
        }, CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
            type: CKEDITOR.NODE_TEXT,
            filter: function() {},
            writeHtml: function(a) {
                a.write(this.value);
            }
        });
    }(), CKEDITOR.htmlParser.fragment = function() {
        this.children = [], this.parent = null, this._ = {
            isBlockLike: !0,
            hasInlineStarted: !1
        };
    }, function() {
        function a(a) {
            return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name];
        }
        var b = CKEDITOR.tools.extend({
            table: 1,
            ul: 1,
            ol: 1,
            dl: 1
        }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), c = {
            ol: 1,
            ul: 1
        }, d = CKEDITOR.tools.extend({}, {
            html: 1
        }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
            style: 1,
            script: 1
        });
        CKEDITOR.htmlParser.fragment.fromHtml = function(e, f, g) {
            function h(a) {
                var b;
                if (p.length > 0) for (var c = 0; c < p.length; c++) {
                    var d = p[c], e = d.name, f = CKEDITOR.dtd[e], g = r.name && CKEDITOR.dtd[r.name];
                    g && !g[e] || a && f && !f[a] && CKEDITOR.dtd[a] ? e == r.name && (k(r, r.parent, 1), 
                    c--) : (b || (i(), b = 1), d = d.clone(), d.parent = r, r = d, p.splice(c, 1), c--);
                }
            }
            function i() {
                for (;q.length; ) k(q.shift(), r);
            }
            function j(a) {
                if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                    var b, c = a.children.length, d = a.children[c - 1];
                    d && d.type == CKEDITOR.NODE_TEXT && ((b = CKEDITOR.tools.rtrim(d.value)) ? d.value = b : a.children.length = c - 1);
                }
            }
            function k(b, c, d) {
                var c = c || r || o, e = r;
                void 0 === b.previous && (l(c, b) && (r = c, n.onTagOpen(g, {}), b.returnPoint = c = r), 
                j(b), (!a(b) || b.children.length) && c.add(b), "pre" == b.name && (t = !1), "textarea" == b.name && (s = !1)), 
                b.returnPoint ? (r = b.returnPoint, delete b.returnPoint) : r = d ? c : e;
            }
            function l(a, b) {
                if ((a == o || "body" == a.name) && g && (!a.name || CKEDITOR.dtd[a.name][g])) {
                    var c, d;
                    return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT;
                }
            }
            function m(a, b) {
                return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1;
            }
            var n = new CKEDITOR.htmlParser(), o = f instanceof CKEDITOR.htmlParser.element ? f : "string" == typeof f ? new CKEDITOR.htmlParser.element(f) : new CKEDITOR.htmlParser.fragment(), p = [], q = [], r = o, s = "textarea" == o.name, t = "pre" == o.name;
            n.onTagOpen = function(e, f, g, j) {
                if (f = new CKEDITOR.htmlParser.element(e, f), f.isUnknown && g && (f.isEmpty = !0), 
                f.isOptionalClose = j, a(f)) p.push(f); else {
                    if ("pre" == e) t = !0; else {
                        if ("br" == e && t) return void r.add(new CKEDITOR.htmlParser.text("\n"));
                        "textarea" == e && (s = !0);
                    }
                    if ("br" == e) q.push(f); else {
                        for (;j = (g = r.name) ? CKEDITOR.dtd[g] || (r._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : d, 
                        !(f.isUnknown || r.isUnknown || j[e]); ) if (r.isOptionalClose) n.onTagClose(g); else if (e in c && g in c) g = r.children, 
                        (g = g[g.length - 1]) && "li" == g.name || k(g = new CKEDITOR.htmlParser.element("li"), r), 
                        !f.returnPoint && (f.returnPoint = r), r = g; else if (e in CKEDITOR.dtd.$listItem && !m(e, g)) n.onTagOpen("li" == e ? "ul" : "dl", {}, 0, 1); else if (g in b && !m(e, g)) !f.returnPoint && (f.returnPoint = r), 
                        r = r.parent; else {
                            if (g in CKEDITOR.dtd.$inline && p.unshift(r), !r.parent) {
                                f.isOrphan = 1;
                                break;
                            }
                            k(r, r.parent, 1);
                        }
                        h(e), i(), f.parent = r, f.isEmpty ? k(f) : r = f;
                    }
                }
            }, n.onTagClose = function(a) {
                for (var b = p.length - 1; b >= 0; b--) if (a == p[b].name) return void p.splice(b, 1);
                for (var c = [], d = [], e = r; e != o && e.name != a; ) e._.isBlockLike || d.unshift(e), 
                c.push(e), e = e.returnPoint || e.parent;
                if (e != o) {
                    for (b = 0; b < c.length; b++) {
                        var f = c[b];
                        k(f, f.parent);
                    }
                    r = e, e._.isBlockLike && i(), k(e, e.parent), e == r && (r = r.parent), p = p.concat(d);
                }
                "body" == a && (g = !1);
            }, n.onText = function(a) {
                if (r._.hasInlineStarted && !q.length || t || s || (a = CKEDITOR.tools.ltrim(a), 
                0 !== a.length)) {
                    var e = r.name, f = e ? CKEDITOR.dtd[e] || (r._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : d;
                    !s && !f["#"] && e in b ? (n.onTagOpen(e in c ? "li" : "dl" == e ? "dd" : "table" == e ? "tr" : "tr" == e ? "td" : ""), 
                    n.onText(a)) : (i(), h(), !t && !s && (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")), 
                    a = new CKEDITOR.htmlParser.text(a), l(r, a) && this.onTagOpen(g, {}, 0, 1), r.add(a));
                }
            }, n.onCDATA = function(a) {
                r.add(new CKEDITOR.htmlParser.cdata(a));
            }, n.onComment = function(a) {
                i(), h(), r.add(new CKEDITOR.htmlParser.comment(a));
            }, n.parse(e);
            for (i(); r != o; ) k(r, r.parent, 1);
            return j(o), o;
        }, CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
            add: function(a, b) {
                isNaN(b) && (b = this.children.length);
                var c = b > 0 ? this.children[b - 1] : null;
                if (c) {
                    if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 
                    0 === c.value.length)) return this.children.pop(), void this.add(a);
                    c.next = a;
                }
                a.previous = c, a.parent = this, this.children.splice(b, 0, a), this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike);
            },
            filter: function(a, b) {
                b = this.getFilterContext(b), a.onRoot(b, this), this.filterChildren(a, !1, b);
            },
            filterChildren: function(a, b, c) {
                if (this.childrenFilteredBy != a.id) for (c = this.getFilterContext(c), b && !this.parent && a.onRoot(c, this), 
                this.childrenFilteredBy = a.id, b = 0; b < this.children.length; b++) this.children[b].filter(a, c) === !1 && b--;
            },
            writeHtml: function(a, b) {
                b && this.filter(b), this.writeChildrenHtml(a);
            },
            writeChildrenHtml: function(a, b, c) {
                var d = this.getFilterContext();
                for (c && !this.parent && b && b.onRoot(d, this), b && this.filterChildren(b, !1, d), 
                b = 0, c = this.children, d = c.length; d > b; b++) c[b].writeHtml(a);
            },
            forEach: function(a, b, c) {
                if (!(c || b && this.type != b)) var d = a(this);
                if (d !== !1) for (var c = this.children, e = 0; e < c.length; e++) d = c[e], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : (!b || d.type == b) && a(d);
            },
            getFilterContext: function(a) {
                return a || {};
            }
        };
    }(), function() {
        function a() {
            this.rules = [];
        }
        function b(b, c, d, e) {
            var f, g;
            for (f in c) (g = b[f]) || (g = b[f] = new a()), g.add(c[f], d, e);
        }
        CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function(b) {
                this.id = CKEDITOR.tools.getNextNumber(), this.elementNameRules = new a(), this.attributeNameRules = new a(), 
                this.elementsRules = {}, this.attributesRules = {}, this.textRules = new a(), this.commentRules = new a(), 
                this.rootRules = new a(), b && this.addRules(b, 10);
            },
            proto: {
                addRules: function(a, c) {
                    var d;
                    "number" == typeof c ? d = c : c && "priority" in c && (d = c.priority), "number" != typeof d && (d = 10), 
                    "object" != typeof c && (c = {}), a.elementNames && this.elementNameRules.addMany(a.elementNames, d, c), 
                    a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, d, c), a.elements && b(this.elementsRules, a.elements, d, c), 
                    a.attributes && b(this.attributesRules, a.attributes, d, c), a.text && this.textRules.add(a.text, d, c), 
                    a.comment && this.commentRules.add(a.comment, d, c), a.root && this.rootRules.add(a.root, d, c);
                },
                applyTo: function(a) {
                    a.filter(this);
                },
                onElementName: function(a, b) {
                    return this.elementNameRules.execOnName(a, b);
                },
                onAttributeName: function(a, b) {
                    return this.attributeNameRules.execOnName(a, b);
                },
                onText: function(a, b) {
                    return this.textRules.exec(a, b);
                },
                onComment: function(a, b, c) {
                    return this.commentRules.exec(a, b, c);
                },
                onRoot: function(a, b) {
                    return this.rootRules.exec(a, b);
                },
                onElement: function(a, b) {
                    for (var c, d = [ this.elementsRules["^"], this.elementsRules[b.name], this.elementsRules.$ ], e = 0; 3 > e; e++) if (c = d[e]) {
                        if (c = c.exec(a, b, this), c === !1) return null;
                        if (c && c != b) return this.onNode(a, c);
                        if (b.parent && !b.name) break;
                    }
                    return b;
                },
                onNode: function(a, b) {
                    var c = b.type;
                    return c == CKEDITOR.NODE_ELEMENT ? this.onElement(a, b) : c == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, b.value)) : c == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, b.value)) : null;
                },
                onAttribute: function(a, b, c, d) {
                    return (c = this.attributesRules[c]) ? c.exec(a, d, b, this) : d;
                }
            }
        }), CKEDITOR.htmlParser.filterRulesGroup = a, a.prototype = {
            add: function(a, b, c) {
                this.rules.splice(this.findIndex(b), 0, {
                    value: a,
                    priority: b,
                    options: c
                });
            },
            addMany: function(a, b, c) {
                for (var d = [ this.findIndex(b), 0 ], e = 0, f = a.length; f > e; e++) d.push({
                    value: a[e],
                    priority: b,
                    options: c
                });
                this.rules.splice.apply(this.rules, d);
            },
            findIndex: function(a) {
                for (var b = this.rules, c = b.length - 1; c >= 0 && a < b[c].priority; ) c--;
                return c + 1;
            },
            exec: function(a, b) {
                var c, d, e, f, g = b instanceof CKEDITOR.htmlParser.node || b instanceof CKEDITOR.htmlParser.fragment, h = Array.prototype.slice.call(arguments, 1), i = this.rules, j = i.length;
                for (f = 0; j > f; f++) if (g && (c = b.type, d = b.name), e = i[f], !a.nonEditable || e.options.applyToAll) {
                    if (e = e.value.apply(null, h), e === !1 || g && e && (e.name != d || e.type != c)) return e;
                    void 0 != e && (h[0] = b = e);
                }
                return b;
            },
            execOnName: function(a, b) {
                for (var c, d = 0, e = this.rules, f = e.length; b && f > d; d++) c = e[d], (!a.nonEditable || c.options.applyToAll) && (b = b.replace(c.value[0], c.value[1]));
                return b;
            }
        };
    }(), function() {
        function a(a, b) {
            function h(a) {
                return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
                    "data-cke-bogus": 1
                });
            }
            function i(a, b) {
                return function(e) {
                    if (e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var g, i, k = [], l = c(e);
                        if (l) for (j(l, 1) && k.push(l); l; ) f(l) && (g = d(l)) && j(g) && ((i = d(g)) && !f(i) ? k.push(g) : (h(m).insertAfter(g), 
                        g.remove())), l = l.previous;
                        for (l = 0; l < k.length; l++) k[l].remove();
                        (k = CKEDITOR.env.opera && !a || ("function" == typeof b ? b(e) !== !1 : b)) && ((m || CKEDITOR.env.needsBrFiller || e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) && (m || CKEDITOR.env.needsBrFiller || !(document.documentMode > 7 || e.name in CKEDITOR.dtd.tr || e.name in CKEDITOR.dtd.$listItem)) ? (k = c(e), 
                        k = !k || "form" == e.name && "input" == k.name) : k = !1), k && e.add(h(a));
                    }
                };
            }
            function j(a, b) {
                if ((!m || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0;
                var c;
                if (a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(q))) {
                    if (c.index && (new CKEDITOR.htmlParser.text(a.value.substring(0, c.index)).insertBefore(a), 
                    a.value = c[0]), !CKEDITOR.env.needsBrFiller && m && (!b || a.parent.name in n)) return !0;
                    if (!m && ((c = a.previous) && "br" == c.name || !c || f(c))) return !0;
                }
                return !1;
            }
            var k, l = {
                elements: {}
            }, m = "html" == b, n = CKEDITOR.tools.extend({}, u);
            for (k in n) "#" in s[k] || delete n[k];
            for (k in n) l.elements[k] = i(m, a.config.fillEmptyBlocks !== !1);
            return l.root = i(m), l.elements.br = function(a) {
                return function(b) {
                    if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var c = b.attributes;
                        if ("data-cke-bogus" in c || "data-cke-eol" in c) delete c["data-cke-bogus"]; else {
                            for (c = b.next; c && e(c); ) c = c.next;
                            var i = d(b);
                            !c && f(b.parent) ? g(b.parent, h(a)) : f(c) && i && !f(i) && h(a).insertBefore(c);
                        }
                    }
                };
            }(m), l;
        }
        function b(a, b) {
            return a != CKEDITOR.ENTER_BR && b !== !1 ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1;
        }
        function c(a) {
            for (a = a.children[a.children.length - 1]; a && e(a); ) a = a.previous;
            return a;
        }
        function d(a) {
            for (a = a.previous; a && e(a); ) a = a.previous;
            return a;
        }
        function e(a) {
            return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"];
        }
        function f(a) {
            return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in u || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT);
        }
        function g(a, b) {
            var c = a.children[a.children.length - 1];
            a.children.push(b), b.parent = a, c && (c.next = b, b.previous = c);
        }
        function h(a) {
            a = a.attributes, "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1), 
            a.contenteditable = "false";
        }
        function i(a) {
            switch (a = a.attributes, a["data-cke-editable"]) {
              case "true":
                a.contenteditable = "true";
                break;

              case "1":
                delete a.contenteditable;
            }
        }
        function j(a) {
            return a.replace(z, function(a, b, c) {
                return "<" + b + c.replace(A, function(a, b) {
                    return /^on/.test(b) || -1 != c.indexOf("data-cke-saved-" + b) ? a : (a = a.slice(1), 
                    " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a);
                }) + ">";
            });
        }
        function k(a, b) {
            return a.replace(b, function(a, b, c) {
                return 0 === a.indexOf("<textarea") && (a = b + n(c).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>"), 
                "<cke:encoded>" + encodeURIComponent(a) + "</cke:encoded>";
            });
        }
        function l(a) {
            return a.replace(D, function(a, b) {
                return decodeURIComponent(b);
            });
        }
        function m(a) {
            return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(a) {
                return "<!--" + r + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "-->";
            });
        }
        function n(a) {
            return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(a, b) {
                return decodeURIComponent(b);
            });
        }
        function o(a, b) {
            var c = b._.dataStore;
            return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
                return decodeURIComponent(b);
            }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) {
                return c && c[b] || "";
            });
        }
        function p(a, b) {
            for (var c = [], d = b.config.protectedSource, e = b._.dataStore || (b._.dataStore = {
                id: 1
            }), f = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, d = [ /<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi ].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function(a) {
                return "<!--{cke_tempcomment}" + (c.push(a) - 1) + "-->";
            }), g = 0; g < d.length; g++) a = a.replace(d[g], function(a) {
                return a = a.replace(f, function(a, b, d) {
                    return c[d];
                }), /cke_temp(comment)?/.test(a) ? a : "<!--{cke_temp}" + (c.push(a) - 1) + "-->";
            });
            return a = a.replace(f, function(a, b, d) {
                return "<!--" + r + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "-->";
            }), a.replace(/(['"]).*?\1/g, function(a) {
                return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
                    return e[e.id] = decodeURIComponent(b), "{cke_protected_" + e.id++ + "}";
                });
            });
        }
        CKEDITOR.htmlDataProcessor = function(c) {
            var d, e, f = this;
            this.editor = c, this.dataFilter = d = new CKEDITOR.htmlParser.filter(), this.htmlFilter = e = new CKEDITOR.htmlParser.filter(), 
            this.writer = new CKEDITOR.htmlParser.basicWriter(), d.addRules(v), d.addRules(w, {
                applyToAll: !0
            }), d.addRules(a(c, "data"), {
                applyToAll: !0
            }), e.addRules(x), e.addRules(y, {
                applyToAll: !0
            }), e.addRules(a(c, "html"), {
                applyToAll: !0
            }), c.on("toHtml", function(a) {
                var d, a = a.data, e = a.dataValue, e = p(e, c), e = k(e, C), e = j(e), e = k(e, B), e = e.replace(E, "$1cke:$2"), e = e.replace(G, "<cke:$1$2></cke:$1>"), e = CKEDITOR.env.opera ? e : e.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), f = a.context || c.editable().getName();
                CKEDITOR.env.ie && CKEDITOR.env.version < 9 && "pre" == f && (f = "div", e = "<pre>" + e + "</pre>", 
                d = 1), f = c.document.createElement(f), f.setHtml("a" + e), e = f.getHtml().substr(1), 
                e = e.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " "), d && (e = e.replace(/^<pre>|<\/pre>$/gi, "")), 
                e = e.replace(F, "$1$2"), e = l(e), e = n(e), a.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(e, a.context, a.fixForBody === !1 ? !1 : b(a.enterMode, c.config.autoParagraph));
            }, null, null, 5), c.on("toHtml", function(a) {
                a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && c.fire("dataFiltered");
            }, null, null, 6), c.on("toHtml", function(a) {
                a.data.dataValue.filterChildren(f.dataFilter, !0);
            }, null, null, 10), c.on("toHtml", function(a) {
                var a = a.data, b = a.dataValue, c = new CKEDITOR.htmlParser.basicWriter();
                b.writeChildrenHtml(c), b = c.getHtml(!0), a.dataValue = m(b);
            }, null, null, 15), c.on("toDataFormat", function(a) {
                var d = a.data.dataValue;
                a.data.enterMode != CKEDITOR.ENTER_BR && (d = d.replace(/^<br *\/?>/i, "")), a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(d, a.data.context, b(a.data.enterMode, c.config.autoParagraph));
            }, null, null, 5), c.on("toDataFormat", function(a) {
                a.data.dataValue.filterChildren(f.htmlFilter, !0);
            }, null, null, 10), c.on("toDataFormat", function(a) {
                a.data.filter.applyTo(a.data.dataValue, !1, !0);
            }, null, null, 11), c.on("toDataFormat", function(a) {
                var b = a.data.dataValue, d = f.writer;
                d.reset(), b.writeChildrenHtml(d), b = d.getHtml(!0), b = n(b), b = o(b, c), a.data.dataValue = b;
            }, null, null, 15);
        }, CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function(a, b, c, d) {
                var e, f, g, h = this.editor;
                return b && "object" == typeof b ? (e = b.context, c = b.fixForBody, d = b.dontFilter, 
                f = b.filter, g = b.enterMode) : e = b, !e && null !== e && (e = h.editable().getName()), 
                h.fire("toHtml", {
                    dataValue: a,
                    context: e,
                    fixForBody: c,
                    dontFilter: d,
                    filter: f || h.filter,
                    enterMode: g || h.enterMode
                }).dataValue;
            },
            toDataFormat: function(a, b) {
                var c, d, e;
                return b && (c = b.context, d = b.filter, e = b.enterMode), !c && null !== c && (c = this.editor.editable().getName()), 
                this.editor.fire("toDataFormat", {
                    dataValue: a,
                    filter: d || this.editor.filter,
                    context: c,
                    enterMode: e || this.editor.enterMode
                }).dataValue;
            }
        };
        var q = /(?:&nbsp;|\xa0)$/, r = "{cke_protected}", s = CKEDITOR.dtd, t = [ "caption", "colgroup", "col", "thead", "tfoot", "tbody" ], u = CKEDITOR.tools.extend({}, s.$blockLimit, s.$block), v = {
            elements: {
                input: h,
                textarea: h
            }
        }, w = {
            attributeNames: [ [ /^on/, "data-cke-pa-on" ], [ /^data-cke-expando$/, "" ] ]
        }, x = {
            elements: {
                embed: function(a) {
                    var b = a.parent;
                    if (b && "object" == b.name) {
                        var c = b.attributes.width, b = b.attributes.height;
                        c && (a.attributes.width = c), b && (a.attributes.height = b);
                    }
                },
                a: function(a) {
                    return a.children.length || a.attributes.name || a.attributes["data-cke-saved-name"] ? void 0 : !1;
                }
            }
        }, y = {
            elementNames: [ [ /^cke:/, "" ], [ /^\?xml:namespace$/, "" ] ],
            attributeNames: [ [ /^data-cke-(saved|pa)-/, "" ], [ /^data-cke-.*/, "" ], [ "hidefocus", "" ] ],
            elements: {
                $: function(a) {
                    var b = a.attributes;
                    if (b) {
                        if (b["data-cke-temp"]) return !1;
                        for (var c, d = [ "name", "href", "src" ], e = 0; e < d.length; e++) c = "data-cke-saved-" + d[e], 
                        c in b && delete b[d[e]];
                    }
                    return a;
                },
                table: function(a) {
                    a.children.slice(0).sort(function(a, b) {
                        var c, d;
                        return a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(t, a.name), 
                        d = CKEDITOR.tools.indexOf(t, b.name)), c > -1 && d > -1 && c != d || (c = a.parent ? a.getIndex() : -1, 
                        d = b.parent ? b.getIndex() : -1), c > d ? 1 : -1;
                    });
                },
                param: function(a) {
                    return a.children = [], a.isEmpty = !0, a;
                },
                span: function(a) {
                    "Apple-style-span" == a.attributes["class"] && delete a.name;
                },
                html: function(a) {
                    delete a.attributes.contenteditable, delete a.attributes["class"];
                },
                body: function(a) {
                    delete a.attributes.spellcheck, delete a.attributes.contenteditable;
                },
                style: function(a) {
                    var b = a.children[0];
                    b && b.value && (b.value = CKEDITOR.tools.trim(b.value)), a.attributes.type || (a.attributes.type = "text/css");
                },
                title: function(a) {
                    var b = a.children[0];
                    !b && g(a, b = new CKEDITOR.htmlParser.text()), b.value = a.attributes["data-cke-title"] || "";
                },
                input: i,
                textarea: i
            },
            attributes: {
                "class": function(a) {
                    return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1;
                }
            }
        };
        CKEDITOR.env.ie && (y.attributes.style = function(a) {
            return a.replace(/(^|;)([^\:]+)/g, function(a) {
                return a.toLowerCase();
            });
        });
        var z = /<(a|area|img|input|source)\b([^>]*)>/gi, A = /\s(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, B = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, C = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, D = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, E = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, F = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, G = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;
    }(), CKEDITOR.htmlParser.element = function(a, b) {
        this.name = a, this.attributes = b || {}, this.children = [];
        var c = a || "", d = c.match(/^cke:(.*)/);
        d && (c = d[1]), c = !!(CKEDITOR.dtd.$nonBodyContent[c] || CKEDITOR.dtd.$block[c] || CKEDITOR.dtd.$listItem[c] || CKEDITOR.dtd.$tableContent[c] || CKEDITOR.dtd.$nonEditable[c] || "br" == c), 
        this.isEmpty = !!CKEDITOR.dtd.$empty[a], this.isUnknown = !CKEDITOR.dtd[a], this._ = {
            isBlockLike: c,
            hasInlineStarted: this.isEmpty || !c
        };
    }, CKEDITOR.htmlParser.cssStyle = function(a) {
        var b = {};
        return ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, d) {
            "font-family" == c && (d = d.replace(/["']/g, "")), b[c.toLowerCase()] = d;
        }), {
            rules: b,
            populate: function(a) {
                var b = this.toString();
                b && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", b) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = b : a.style = b);
            },
            toString: function() {
                var a, c = [];
                for (a in b) b[a] && c.push(a, ":", b[a], ";");
                return c.join("");
            }
        };
    }, function() {
        function a(a) {
            return function(b) {
                return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a);
            };
        }
        var b = function(a, b) {
            return a = a[0], b = b[0], b > a ? -1 : a > b ? 1 : 0;
        }, c = CKEDITOR.htmlParser.fragment.prototype;
        CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
            type: CKEDITOR.NODE_ELEMENT,
            add: c.add,
            clone: function() {
                return new CKEDITOR.htmlParser.element(this.name, this.attributes);
            },
            filter: function(a, b) {
                var c, d, e = this, b = e.getFilterContext(b);
                if (b.off) return !0;
                for (e.parent || a.onRoot(b, e); ;) {
                    if (c = e.name, !(d = a.onElementName(b, c))) return this.remove(), !1;
                    if (e.name = d, !(e = a.onElement(b, e))) return this.remove(), !1;
                    if (e !== this) return this.replaceWith(e), !1;
                    if (e.name == c) break;
                    if (e.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(e), !1;
                    if (!e.name) return this.replaceWithChildren(), !1;
                }
                c = e.attributes;
                var f, g;
                for (f in c) {
                    for (g = f, d = c[f]; ;) {
                        if (!(g = a.onAttributeName(b, f))) {
                            delete c[f];
                            break;
                        }
                        if (g == f) break;
                        delete c[f], f = g;
                    }
                    g && ((d = a.onAttribute(b, e, g, d)) === !1 ? delete c[g] : c[g] = d);
                }
                return e.isEmpty || this.filterChildren(a, !1, b), !0;
            },
            filterChildren: c.filterChildren,
            writeHtml: function(a, c) {
                c && this.filter(c);
                var d, e, f = this.name, g = [], h = this.attributes;
                a.openTag(f, h);
                for (d in h) g.push([ d, h[d] ]);
                for (a.sortAttributes && g.sort(b), d = 0, e = g.length; e > d; d++) h = g[d], a.attribute(h[0], h[1]);
                a.openTagClose(f, this.isEmpty), this.writeChildrenHtml(a), this.isEmpty || a.closeTag(f);
            },
            writeChildrenHtml: c.writeChildrenHtml,
            replaceWithChildren: function() {
                for (var a = this.children, b = a.length; b; ) a[--b].insertAfter(this);
                this.remove();
            },
            forEach: c.forEach,
            getFirst: function(b) {
                if (!b) return this.children.length ? this.children[0] : null;
                "function" != typeof b && (b = a(b));
                for (var c = 0, d = this.children.length; d > c; ++c) if (b(this.children[c])) return this.children[c];
                return null;
            },
            getHtml: function() {
                var a = new CKEDITOR.htmlParser.basicWriter();
                return this.writeChildrenHtml(a), a.getHtml();
            },
            setHtml: function(a) {
                for (var a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children, b = 0, c = a.length; c > b; ++b) a[b].parent = this;
            },
            getOuterHtml: function() {
                var a = new CKEDITOR.htmlParser.basicWriter();
                return this.writeHtml(a), a.getHtml();
            },
            split: function(a) {
                for (var b = this.children.splice(a, this.children.length - a), c = this.clone(), d = 0; d < b.length; ++d) b[d].parent = c;
                return c.children = b, b[0] && (b[0].previous = null), a > 0 && (this.children[a - 1].next = null), 
                this.parent.add(c, this.getIndex() + 1), c;
            },
            removeClass: function(a) {
                var b = this.attributes["class"];
                b && ((b = CKEDITOR.tools.trim(b.replace(RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"]);
            },
            hasClass: function(a) {
                var b = this.attributes["class"];
                return b ? RegExp("(?:^|\\s)" + a + "(?=\\s|$)").test(b) : !1;
            },
            getFilterContext: function(a) {
                var b = [];
                if (a || (a = {
                    off: !1,
                    nonEditable: !1
                }), !a.off && "off" == this.attributes["data-cke-processor"] && b.push("off", !0), 
                !a.nonEditable && "false" == this.attributes.contenteditable && b.push("nonEditable", !0), 
                b.length) for (var a = CKEDITOR.tools.copy(a), c = 0; c < b.length; c += 2) a[b[c]] = b[c + 1];
                return a;
            }
        }, !0);
    }(), function() {
        var a = {};
        CKEDITOR.template = function(b) {
            if (a[b]) this.output = a[b]; else {
                var c = b.replace(/'/g, "\\'").replace(/{([^}]+)}/g, function(a, b) {
                    return "',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'";
                });
                this.output = a[b] = Function("data", "buffer", "return buffer?buffer.push('" + c + "'):['" + c + "'].join('');");
            }
        };
    }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), 
    CKEDITOR.add = function(a) {
        CKEDITOR.instances[a.name] = a, a.on("focus", function() {
            CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance"));
        }), a.on("blur", function() {
            CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"));
        }), CKEDITOR.fire("instance", null, a);
    }, CKEDITOR.remove = function(a) {
        delete CKEDITOR.instances[a.name];
    }, function() {
        var a = {};
        CKEDITOR.addTemplate = function(b, c) {
            var d = a[b];
            return d ? d : (d = {
                name: b,
                source: c
            }, CKEDITOR.fire("template", d), a[b] = new CKEDITOR.template(d.source));
        }, CKEDITOR.getTemplate = function(b) {
            return a[b];
        };
    }(), function() {
        var a = [];
        CKEDITOR.addCss = function(b) {
            a.push(b);
        }, CKEDITOR.getCss = function() {
            return a.join("\n");
        };
    }(), CKEDITOR.on("instanceDestroyed", function() {
        CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset");
    }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, 
    function() {
        CKEDITOR.inline = function(a, b) {
            if (!CKEDITOR.env.isCompatible) return null;
            if (a = CKEDITOR.dom.element.get(a), a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var c = new CKEDITOR.editor(b, a, CKEDITOR.ELEMENT_MODE_INLINE), d = a.is("textarea") ? a : null;
            return d ? (c.setData(d.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' + !!c.readOnly + '" class="cke_textarea_inline">' + d.getValue() + "</div>", CKEDITOR.document), 
            a.insertAfter(d), d.hide(), d.$.form && c._attachToForm()) : c.setData(a.getHtml(), null, !0), 
            c.on("loaded", function() {
                c.fire("uiReady"), c.editable(a), c.container = a, c.setData(c.getData(1)), c.resetDirty(), 
                c.fire("contentDom"), c.mode = "wysiwyg", c.fire("mode"), c.status = "ready", c.fireOnce("instanceReady"), 
                CKEDITOR.fire("instanceReady", null, c);
            }, null, null, 1e4), c.on("destroy", function() {
                d && (c.container.clearCustomData(), c.container.remove(), d.show()), c.element.clearCustomData(), 
                delete c.element;
            }), c;
        }, CKEDITOR.inlineAll = function() {
            var a, b, c;
            for (c in CKEDITOR.dtd.$editable) for (var d = CKEDITOR.document.getElementsByTag(c), e = 0, f = d.count(); f > e; e++) a = d.getItem(e), 
            "true" == a.getAttribute("contenteditable") && (b = {
                element: a,
                config: {}
            }, CKEDITOR.fire("inline", b) !== !1 && CKEDITOR.inline(a, b.config));
        }, CKEDITOR.domReady(function() {
            !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll();
        });
    }(), CKEDITOR.replaceClass = "ckeditor", function() {
        function a(a, d, e, f) {
            if (!CKEDITOR.env.isCompatible) return null;
            if (a = CKEDITOR.dom.element.get(a), a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var g = new CKEDITOR.editor(d, a, f);
            return f == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), 
            g._.required = a.hasAttribute("required"), a.removeAttribute("required")), e && g.setData(e, null, !0), 
            g.on("loaded", function() {
                c(g), f == CKEDITOR.ELEMENT_MODE_REPLACE && g.config.autoUpdateElement && a.$.form && g._attachToForm(), 
                g.setMode(g.config.startupMode, function() {
                    g.resetDirty(), g.status = "ready", g.fireOnce("instanceReady"), CKEDITOR.fire("instanceReady", null, g);
                });
            }), g.on("destroy", b), g;
        }
        function b() {
            var a = this.container, b = this.element;
            a && (a.clearCustomData(), a.remove()), b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), 
            this._.required && b.setAttribute("required", "required")), delete this.element);
        }
        function c(a) {
            var b = a.name, c = a.element, e = a.elementMode, f = a.fire("uiSpace", {
                space: "top",
                html: ""
            }).html, g = a.fire("uiSpace", {
                space: "bottom",
                html: ""
            }).html;
            d || (d = CKEDITOR.addTemplate("maincontainer", '<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>')), 
            b = CKEDITOR.dom.element.createFromHtml(d.output({
                id: a.id,
                name: b,
                langDir: a.lang.dir,
                langCode: a.langCode,
                voiceLabel: [ a.lang.editor, a.name ].join(", "),
                topHtml: f ? '<span id="' + a.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + f + "</span>" : "",
                contentId: a.ui.spaceId("contents"),
                bottomHtml: g ? '<span id="' + a.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + g + "</span>" : "",
                outerEl: CKEDITOR.env.ie ? "span" : "div"
            })), e == CKEDITOR.ELEMENT_MODE_REPLACE ? (c.hide(), b.insertAfter(c)) : c.append(b), 
            a.container = b, f && a.ui.space("top").unselectable(), g && a.ui.space("bottom").unselectable(), 
            c = a.config.width, e = a.config.height, c && b.setStyle("width", CKEDITOR.tools.cssLength(c)), 
            e && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(e)), b.disableContextMenu(), 
            CKEDITOR.env.webkit && b.on("focus", function() {
                a.focus();
            }), a.fireOnce("uiReady");
        }
        CKEDITOR.replace = function(b, c) {
            return a(b, c, null, CKEDITOR.ELEMENT_MODE_REPLACE);
        }, CKEDITOR.appendTo = function(b, c, d) {
            return a(b, c, d, CKEDITOR.ELEMENT_MODE_APPENDTO);
        }, CKEDITOR.replaceAll = function() {
            for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
                var c = null, d = a[b];
                if (d.name || d.id) {
                    if ("string" == typeof arguments[0]) {
                        if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(d.className)) continue;
                    } else if ("function" == typeof arguments[0] && (c = {}, arguments[0](d, c) === !1)) continue;
                    this.replace(d, c);
                }
            }
        }, CKEDITOR.editor.prototype.addMode = function(a, b) {
            (this._.modes || (this._.modes = {}))[a] = b;
        }, CKEDITOR.editor.prototype.setMode = function(a, b) {
            var c = this, d = this._.modes;
            if (a != c.mode && d && d[a]) {
                if (c.fire("beforeSetMode", a), c.mode) {
                    var e = c.checkDirty();
                    c._.previousMode = c.mode, c.fire("beforeModeUnload"), c.editable(0), c.ui.space("contents").setHtml(""), 
                    c.mode = "";
                }
                this._.modes[a](function() {
                    c.mode = a, void 0 !== e && !e && c.resetDirty(), setTimeout(function() {
                        c.fire("mode"), b && b.call(c);
                    }, 0);
                });
            }
        }, CKEDITOR.editor.prototype.resize = function(a, b, c, d) {
            var e = this.container, f = this.ui.space("contents"), g = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement, d = d ? e.getChild(1) : e;
            d.setSize("width", a, !0), g && (g.style.width = "1%"), f.setStyle("height", Math.max(b - (c ? 0 : (d.$.offsetHeight || 0) - (f.$.clientHeight || 0)), 0) + "px"), 
            g && (g.style.width = "100%"), this.fire("resize");
        }, CKEDITOR.editor.prototype.getResizable = function(a) {
            return a ? this.ui.space("contents") : this.container;
        };
        var d;
        CKEDITOR.domReady(function() {
            CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass);
        });
    }(), CKEDITOR.config.startupMode = "wysiwyg", function() {
        function a(a) {
            var c, e = a.editor, f = a.data.path, g = f.blockLimit, h = a.data.selection, i = h.getRanges()[0];
            (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) && (h = b(h, f)) && (h.appendBogus(), 
            c = CKEDITOR.env.ie), e.config.autoParagraph !== !1 && e.activeEnterMode != CKEDITOR.ENTER_BR && e.editable().equals(g) && !f.block && i.collapsed && !i.getCommonAncestor().isReadOnly() && (f = i.clone(), 
            f.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), g = new CKEDITOR.dom.walker(f), g.guard = function(a) {
                return !d(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly();
            }, (!g.checkForward() || f.checkStartOfBlock() && f.checkEndOfBlock()) && (e = i.fixBlock(!0, e.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), 
            CKEDITOR.env.needsBrFiller || (e = e.getFirst(d)) && e.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(e.getText()).match(/^(?:&nbsp;|\xa0)$/) && e.remove(), 
            c = 1, a.cancel())), c && i.select();
        }
        function b(a, b) {
            if (a.isFake) return 0;
            var c = b.block || b.blockLimit, e = c && c.getLast(d);
            return !c || !c.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || c.is("pre") || c.getBogus() ? void 0 : c;
        }
        function c(a) {
            var b = a.data.getTarget();
            b.is("input") && (b = b.getAttribute("type"), ("submit" == b || "reset" == b) && a.data.preventDefault());
        }
        function d(a) {
            return k(a) && l(a);
        }
        function e(a, b) {
            return function(c) {
                var d = CKEDITOR.dom.element.get(c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget);
                (!d || !b.equals(d) && !b.contains(d)) && a.call(this, c);
            };
        }
        function f(a) {
            var b, c = a.getRanges()[0], e = a.root, f = {
                table: 1,
                ul: 1,
                ol: 1,
                dl: 1
            };
            if (c.startPath().contains(f)) {
                var a = function(a) {
                    return function(c, e) {
                        return e && c.type == CKEDITOR.NODE_ELEMENT && c.is(f) && (b = c), e || !d(c) || a && i(c) ? void 0 : !1;
                    };
                }, g = c.clone();
                if (g.collapse(1), g.setStartAt(e, CKEDITOR.POSITION_AFTER_START), e = new CKEDITOR.dom.walker(g), 
                e.guard = a(), e.checkBackward(), b) return g = c.clone(), g.collapse(), g.setEndAt(b, CKEDITOR.POSITION_AFTER_END), 
                e = new CKEDITOR.dom.walker(g), e.guard = a(!0), b = !1, e.checkForward(), b;
            }
            return null;
        }
        function g(a) {
            a.editor.focus(), a.editor.fire("saveSnapshot");
        }
        function h(a, b) {
            var c = a.editor;
            !b && c.getSelection().scrollIntoView(), setTimeout(function() {
                c.fire("saveSnapshot");
            }, 0);
        }
        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element,
            $: function(a, b) {
                this.base(b.$ || b), this.editor = a, this.hasFocus = !1, this.setup();
            },
            proto: {
                focus: function() {
                    var a;
                    if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), 
                    this.contains(a))) return void a.focus();
                    try {
                        this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]();
                    } catch (b) {
                        if (!CKEDITOR.env.ie) throw b;
                    }
                    CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus());
                },
                on: function(a, b) {
                    var c = Array.prototype.slice.call(arguments, 0);
                    return CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", 
                    b = e(b, this), c[0] = a, c[1] = b), CKEDITOR.dom.element.prototype.on.apply(this, c);
                },
                attachListener: function(a) {
                    !this._.listeners && (this._.listeners = []);
                    var b = Array.prototype.slice.call(arguments, 1), b = a.on.apply(a, b);
                    return this._.listeners.push(b), b;
                },
                clearListeners: function() {
                    var a = this._.listeners;
                    try {
                        for (;a.length; ) a.pop().removeListener();
                    } catch (b) {}
                },
                restoreAttrs: function() {
                    var a, b, c = this._.attrChanges;
                    for (b in c) c.hasOwnProperty(b) && (a = c[b], null !== a ? this.setAttribute(b, a) : this.removeAttribute(b));
                },
                attachClass: function(a) {
                    var b = this.getCustomData("classes");
                    this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), 
                    this.addClass(a));
                },
                changeAttr: function(a, b) {
                    var c = this.getAttribute(a);
                    b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), 
                    this.setAttribute(a, b));
                },
                insertHtml: function(a, b) {
                    g(this), m(this, b || "html", a);
                },
                insertText: function(a) {
                    g(this);
                    var b = this.editor, c = b.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : b.activeEnterMode, b = c == CKEDITOR.ENTER_BR, d = CKEDITOR.tools, a = d.htmlEncode(a.replace(/\r\n/g, "\n")), a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"), c = c == CKEDITOR.ENTER_P ? "p" : "div";
                    if (!b) {
                        var e = /\n{2}/g;
                        if (e.test(a)) var f = "<" + c + ">", h = "</" + c + ">", a = f + a.replace(e, function() {
                            return h + f;
                        }) + h;
                    }
                    a = a.replace(/\n/g, "<br>"), b || (a = a.replace(RegExp("<br>(?=</" + c + ">)"), function(a) {
                        return d.repeat(a, 2);
                    })), a = a.replace(/^ | $/g, "&nbsp;"), a = a.replace(/(>|\s) /g, function(a, b) {
                        return b + "&nbsp;";
                    }).replace(/ (?=<)/g, "&nbsp;"), m(this, "text", a);
                },
                insertElement: function(a, b) {
                    b ? this.insertElementIntoRange(a, b) : this.insertElementIntoSelection(a);
                },
                insertElementIntoRange: function(a, b) {
                    var c = this.editor, d = c.config.enterMode, e = a.getName(), f = CKEDITOR.dtd.$block[e];
                    if (b.checkReadOnly()) return !1;
                    b.deleteContents(1), b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.is({
                        tr: 1,
                        table: 1,
                        tbody: 1,
                        thead: 1,
                        tfoot: 1
                    }) && n(b);
                    var g, h;
                    if (f) for (;(g = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[g.getName()]) && (!h || !h[e]); ) g.getName() in CKEDITOR.dtd.span ? b.splitElement(g) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(g), 
                    b.collapse(!0), g.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                    return b.insertNode(a), !0;
                },
                insertElementIntoSelection: function(a) {
                    var b = this.editor, c = b.activeEnterMode, b = b.getSelection(), e = b.getRanges()[0], f = a.getName(), f = CKEDITOR.dtd.$block[f];
                    g(this), this.insertElementIntoRange(a, e) && (e.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), 
                    f && ((f = a.getNext(function(a) {
                        return d(a) && !i(a);
                    })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()["#"] ? e.moveToElementEditStart(f) : e.moveToElementEditEnd(a) : f || c == CKEDITOR.ENTER_BR || (f = e.fixBlock(!0, c == CKEDITOR.ENTER_DIV ? "div" : "p"), 
                    e.moveToElementEditStart(f)))), b.selectRanges([ e ]), h(this, CKEDITOR.env.opera);
                },
                setData: function(a, b) {
                    b || (a = this.editor.dataProcessor.toHtml(a)), this.setHtml(a), this.editor.fire("dataReady");
                },
                getData: function(a) {
                    var b = this.getHtml();
                    return a || (b = this.editor.dataProcessor.toDataFormat(b)), b;
                },
                setReadOnly: function(a) {
                    this.setAttribute("contenteditable", !a);
                },
                detach: function() {
                    this.removeClass("cke_editable");
                    var a = this.editor;
                    this._.detach(), delete a.document, delete a.window;
                },
                isInline: function() {
                    return this.getDocument().equals(CKEDITOR.document);
                },
                setup: function() {
                    var a = this.editor;
                    if (this.attachListener(a, "beforeGetData", function() {
                        var b = this.getData();
                        this.is("textarea") || a.config.ignoreEmptyParagraph !== !1 && (b = b.replace(j, function(a, b) {
                            return b;
                        })), a.setData(b, null, 1);
                    }, this), this.attachListener(a, "getSnapshot", function(a) {
                        a.data = this.getData(1);
                    }, this), this.attachListener(a, "afterSetData", function() {
                        this.setData(a.getData(1));
                    }, this), this.attachListener(a, "loadSnapshot", function(a) {
                        this.setData(a.data, 1);
                    }, this), this.attachListener(a, "beforeFocus", function() {
                        var b = a.getSelection();
                        (b = b && b.getNative()) && "Control" == b.type || this.focus();
                    }, this), this.attachListener(a, "insertHtml", function(a) {
                        this.insertHtml(a.data.dataValue, a.data.mode);
                    }, this), this.attachListener(a, "insertElement", function(a) {
                        this.insertElement(a.data);
                    }, this), this.attachListener(a, "insertText", function(a) {
                        this.insertText(a.data);
                    }, this), this.setReadOnly(a.readOnly), this.attachClass("cke_editable"), this.attachClass(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || a.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" : ""), 
                    this.attachClass("cke_contents_" + a.config.contentsLangDirection), a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly, 
                    a.keystrokeHandler.attach(this), this.on("blur", function(a) {
                        CKEDITOR.env.opera && CKEDITOR.document.getActive().equals(this.isInline() ? this : this.getWindow().getFrame()) ? a.cancel() : this.hasFocus = !1;
                    }, null, null, -1), this.on("focus", function() {
                        this.hasFocus = !0;
                    }, null, null, -1), a.focusManager.add(this), this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, 
                    a.once("contentDom", function() {
                        a.focusManager.focus();
                    })), this.isInline() && this.changeAttr("tabindex", a.tabIndex), !this.is("textarea")) {
                        a.document = this.getDocument(), a.window = this.getWindow();
                        var b = a.document;
                        this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                        var e = a.config.contentsLangDirection;
                        this.getDirection(1) != e && this.changeAttr("dir", e);
                        var g = CKEDITOR.getCss();
                        g && (e = b.getHead(), e.getCustomData("stylesheet") || (g = b.appendStyleText(g), 
                        g = new CKEDITOR.dom.element(g.ownerNode || g.owningElement), e.setCustomData("stylesheet", g), 
                        g.data("cke-temp", 1))), e = b.getCustomData("stylesheet_ref") || 0, b.setCustomData("stylesheet_ref", e + 1), 
                        this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling), this.attachListener(this, "click", function(a) {
                            var a = a.data, b = new CKEDITOR.dom.elementPath(a.getTarget(), this).contains("a");
                            b && 2 != a.$.button && b.isReadOnly() && a.preventDefault();
                        });
                        var h = {
                            8: 1,
                            46: 1
                        };
                        this.attachListener(a, "key", function(b) {
                            if (a.readOnly) return !0;
                            var c, d = b.data.keyCode;
                            if (d in h) {
                                var e, g, i, j, b = a.getSelection(), l = b.getRanges()[0], m = l.startPath(), d = 8 == d;
                                CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (e = b.getSelectedElement()) || (e = f(b)) ? (a.fire("saveSnapshot"), 
                                l.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e.remove(), l.select(), a.fire("saveSnapshot"), 
                                c = 1) : l.collapsed && ((g = m.block) && (j = g[d ? "getPrevious" : "getNext"](k)) && j.type == CKEDITOR.NODE_ELEMENT && j.is("table") && l[d ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), 
                                l[d ? "checkEndOfBlock" : "checkStartOfBlock"]() && g.remove(), l["moveToElementEdit" + (d ? "End" : "Start")](j), 
                                l.select(), a.fire("saveSnapshot"), c = 1) : m.blockLimit && m.blockLimit.is("td") && (i = m.blockLimit.getAscendant("table")) && l.checkBoundaryOfElement(i, d ? CKEDITOR.START : CKEDITOR.END) && (j = i[d ? "getPrevious" : "getNext"](k)) ? (a.fire("saveSnapshot"), 
                                l["moveToElementEdit" + (d ? "End" : "Start")](j), l.checkStartOfBlock() && l.checkEndOfBlock() ? j.remove() : l.select(), 
                                a.fire("saveSnapshot"), c = 1) : (i = m.contains([ "td", "th", "caption" ])) && l.checkBoundaryOfElement(i, d ? CKEDITOR.START : CKEDITOR.END) && (c = 1));
                            }
                            return !c;
                        }), a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function(b) {
                            b.data.getKeystroke() in h && !this.getFirst(d) && (this.appendBogus(), b = a.createRange(), 
                            b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select());
                        }), this.attachListener(this, "dblclick", function(b) {
                            return a.readOnly ? !1 : (b = {
                                element: b.data.getTarget()
                            }, void a.fire("doubleclick", b));
                        }), CKEDITOR.env.ie && this.attachListener(this, "click", c), !CKEDITOR.env.ie && !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function(b) {
                            var c = b.data.getTarget();
                            c.is("img", "hr", "input", "textarea", "select") && (a.getSelection().selectElement(c), 
                            c.is("input", "textarea", "select") && b.data.preventDefault());
                        }), CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) {
                            if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(j, ""))) {
                                var c = a.createRange();
                                c.moveToElementEditStart(b), c.select(!0);
                            }
                        }), CKEDITOR.env.webkit && (this.attachListener(this, "click", function(a) {
                            a.data.getTarget().is("input", "select") && a.data.preventDefault();
                        }), this.attachListener(this, "mouseup", function(a) {
                            a.data.getTarget().is("input", "textarea") && a.data.preventDefault();
                        }));
                    }
                }
            },
            _: {
                detach: function() {
                    this.editor.setData(this.editor.getData(), 0, 1), this.clearListeners(), this.restoreAttrs();
                    var a;
                    if (a = this.removeCustomData("classes")) for (;a.length; ) this.removeClass(a.pop());
                    a = this.getDocument();
                    var b = a.getHead();
                    if (b.getCustomData("stylesheet")) {
                        var c = a.getCustomData("stylesheet_ref");
                        --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), 
                        b.removeCustomData("stylesheet").remove());
                    }
                    delete this.editor;
                }
            }
        }), CKEDITOR.editor.prototype.editable = function(a) {
            var b = this._.editable;
            return b && a ? 0 : (arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), 
            null)), b);
        };
        var i = CKEDITOR.dom.walker.bogus(), j = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi, k = CKEDITOR.dom.walker.whitespaces(!0), l = CKEDITOR.dom.walker.bookmark(!1, !0);
        CKEDITOR.on("instanceLoaded", function(b) {
            var c = b.editor;
            c.on("insertElement", function(a) {
                a = a.data, a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), 
                a.setAttribute("contentEditable", !1));
            }), c.on("selectionChange", function(b) {
                if (!c.readOnly) {
                    var d = c.getSelection();
                    d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), 
                    !d && c.resetDirty());
                }
            });
        }), CKEDITOR.on("instanceCreated", function(a) {
            var b = a.editor;
            b.on("mode", function() {
                var a = b.editable();
                if (a && a.isInline()) {
                    var c = b.title;
                    if (a.changeAttr("role", "textbox"), a.changeAttr("aria-label", c), c && a.changeAttr("title", c), 
                    c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents")) {
                        var d = CKEDITOR.tools.getNextId(), e = CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' + this.lang.common.editorHelp + "</span>");
                        c.append(e), a.changeAttr("aria-describedby", d);
                    }
                }
            });
        }), CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        var m = function() {
            function a(a) {
                return a.type == CKEDITOR.NODE_ELEMENT;
            }
            function b(c, d) {
                var e, f, g, h, j = [], k = d.range.startContainer;
                e = d.range.startPath();
                for (var k = i[k.getName()], l = 0, m = c.getChildren(), n = m.count(), o = -1, p = -1, q = 0, r = e.contains(i.$list); n > l; ++l) e = m.getItem(l), 
                a(e) ? (g = e.getName(), r && g in CKEDITOR.dtd.$list ? j = j.concat(b(e, d)) : (h = !!k[g], 
                "br" != g || !e.data("cke-eol") || l && l != n - 1 || (q = (f = l ? j[l - 1].node : m.getItem(l + 1)) && (!a(f) || !f.is("br")), 
                f = f && a(f) && i.$block[f.getName()]), -1 == o && !h && (o = l), h || (p = l), 
                j.push({
                    isElement: 1,
                    isLineBreak: q,
                    isBlock: e.isBlockBoundary(),
                    hasBlockSibling: f,
                    node: e,
                    name: g,
                    allowed: h
                }), f = q = 0)) : j.push({
                    isElement: 0,
                    node: e,
                    allowed: 1
                });
                return o > -1 && (j[o].firstNotAllowed = 1), p > -1 && (j[p].lastNotAllowed = 1), 
                j;
            }
            function c(b, d) {
                var e, f = [], g = b.getChildren(), h = g.count(), j = 0, k = i[d], l = !b.is(i.$inline) || b.is("br");
                for (l && f.push(" "); h > j; j++) e = g.getItem(j), a(e) && !e.is(k) ? f = f.concat(c(e, d)) : f.push(e);
                return l && f.push(" "), f;
            }
            function e(b) {
                return b && a(b) && (b.is(i.$removeEmpty) || b.is("a") && !b.isBlockBoundary());
            }
            function f(b, c, d, e) {
                var g, h, i = b.clone();
                i.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), (g = new CKEDITOR.dom.walker(i).next()) && a(g) && j[g.getName()] && (h = g.getPrevious()) && a(h) && !h.getParent().equals(b.startContainer) && d.contains(h) && e.contains(g) && g.isIdentical(h) && (g.moveChildren(h), 
                g.remove(), f(b, c, d, e));
            }
            function g(b, c) {
                function d(b, c) {
                    return c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br") ? (b.remove(), 
                    1) : void 0;
                }
                var e = c.endContainer.getChild(c.endOffset), f = c.endContainer.getChild(c.endOffset - 1);
                e && d(e, b[b.length - 1]), f && d(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), 
                c.collapse());
            }
            var i = CKEDITOR.dtd, j = {
                p: 1,
                div: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                ul: 1,
                ol: 1,
                li: 1,
                pre: 1,
                dl: 1,
                blockquote: 1
            }, k = {
                p: 1,
                div: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1
            }, l = CKEDITOR.tools.extend({}, i.$inline);
            return delete l.br, function(j, m, n) {
                var o = j.editor;
                j.getDocument();
                var p = o.getSelection().getRanges()[0], q = !1;
                if ("unfiltered_html" == m && (m = "html", q = !0), !p.checkReadOnly()) {
                    var r, s, t, u, v = new CKEDITOR.dom.elementPath(p.startContainer, p.root).blockLimit || p.root, m = {
                        type: m,
                        dontFilter: q,
                        editable: j,
                        editor: o,
                        range: p,
                        blockLimit: v,
                        mergeCandidates: [],
                        zombies: []
                    }, o = m.range, q = m.mergeCandidates;
                    if ("text" == m.type && o.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (r = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", o.document), 
                    o.insertNode(r), o.setStartAfter(r)), s = new CKEDITOR.dom.elementPath(o.startContainer), 
                    m.endPath = t = new CKEDITOR.dom.elementPath(o.endContainer), !o.collapsed) {
                        var v = t.block || t.blockLimit, w = o.getCommonAncestor();
                        v && !v.equals(w) && !v.contains(w) && o.checkEndOfBlock() && m.zombies.push(v), 
                        o.deleteContents();
                    }
                    for (;(u = a(o.startContainer) && o.startContainer.getChild(o.startOffset - 1)) && a(u) && u.isBlockBoundary() && s.contains(u); ) o.moveToPosition(u, CKEDITOR.POSITION_BEFORE_END);
                    for (f(o, m.blockLimit, s, t), r && (o.setEndBefore(r), o.collapse(), r.remove()), 
                    r = o.startPath(), (v = r.contains(e, !1, 1)) && (o.splitElement(v), m.inlineStylesRoot = v, 
                    m.inlineStylesPeak = r.lastElement), r = o.createBookmark(), (v = r.startNode.getPrevious(d)) && a(v) && e(v) && q.push(v), 
                    (v = r.startNode.getNext(d)) && a(v) && e(v) && q.push(v), v = r.startNode; (v = v.getParent()) && e(v); ) q.push(v);
                    if (o.moveToBookmark(r), r = n) {
                        if (r = m.range, "text" == m.type && m.inlineStylesRoot) {
                            for (u = m.inlineStylesPeak, o = u.getDocument().createText("{cke-peak}"), q = m.inlineStylesRoot.getParent(); !u.equals(q); ) o = o.appendTo(u.clone()), 
                            u = u.getParent();
                            n = o.getOuterHtml().split("{cke-peak}").join(n);
                        }
                        if (u = m.blockLimit.getName(), /^\s+|\s+$/.test(n) && "span" in CKEDITOR.dtd[u]) var x = '<span data-cke-marker="1">&nbsp;</span>', n = x + n + x;
                        if (n = m.editor.dataProcessor.toHtml(n, {
                            context: null,
                            fixForBody: !1,
                            dontFilter: m.dontFilter,
                            filter: m.editor.activeFilter,
                            enterMode: m.editor.activeEnterMode
                        }), u = r.document.createElement("body"), u.setHtml(n), x && (u.getFirst().remove(), 
                        u.getLast().remove()), (x = r.startPath().block) && (1 != x.getChildCount() || !x.getBogus())) a: {
                            var y;
                            if (1 == u.getChildCount() && a(y = u.getFirst()) && y.is(k)) {
                                for (x = y.getElementsByTag("*"), r = 0, q = x.count(); q > r; r++) if (o = x.getItem(r), 
                                !o.is(l)) break a;
                                y.moveChildren(y.getParent(1)), y.remove();
                            }
                        }
                        m.dataWrapper = u, r = n;
                    }
                    if (r) {
                        y = m.range;
                        var z, x = y.document, n = m.blockLimit;
                        r = 0;
                        var A;
                        u = [];
                        var B, C, D, E, q = o = 0;
                        s = y.startContainer;
                        var F, v = m.endPath.elements[0];
                        for (t = v.getPosition(s), w = !(!v.getCommonAncestor(s) || t == CKEDITOR.POSITION_IDENTICAL || t & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED), 
                        s = b(m.dataWrapper, m), g(s, y); r < s.length; r++) {
                            if (t = s[r], z = t.isLineBreak) {
                                z = y, D = n;
                                var G = void 0, H = void 0;
                                t.hasBlockSibling ? z = 1 : (G = z.startContainer.getAscendant(i.$block, 1), G && G.is({
                                    div: 1,
                                    p: 1
                                }) ? (H = G.getPosition(D), H == CKEDITOR.POSITION_IDENTICAL || H == CKEDITOR.POSITION_CONTAINS ? z = 0 : (D = z.splitElement(G), 
                                z.moveToPosition(D, CKEDITOR.POSITION_AFTER_START), z = 1)) : z = 0);
                            }
                            if (z) q = r > 0; else {
                                if (z = y.startPath(), !t.isBlock && m.editor.config.autoParagraph !== !1 && m.editor.activeEnterMode != CKEDITOR.ENTER_BR && m.editor.editable().equals(z.blockLimit) && !z.block && (C = m.editor.activeEnterMode != CKEDITOR.ENTER_BR && m.editor.config.autoParagraph !== !1 ? m.editor.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1) && (C = x.createElement(C), 
                                C.appendBogus(), y.insertNode(C), CKEDITOR.env.needsBrFiller && (A = C.getBogus()) && A.remove(), 
                                y.moveToPosition(C, CKEDITOR.POSITION_BEFORE_END)), (z = y.startPath().block) && !z.equals(B) && ((A = z.getBogus()) && (A.remove(), 
                                u.push(z)), B = z), t.firstNotAllowed && (o = 1), o && t.isElement) {
                                    for (z = y.startContainer, D = null; z && !i[z.getName()][t.name]; ) {
                                        if (z.equals(n)) {
                                            z = null;
                                            break;
                                        }
                                        D = z, z = z.getParent();
                                    }
                                    if (z) D && (E = y.splitElement(D), m.zombies.push(E), m.zombies.push(D)); else {
                                        D = n.getName(), F = !r, z = r == s.length - 1, D = c(t.node, D);
                                        for (var G = [], H = D.length, I = 0, J = void 0, K = 0, L = -1; H > I; I++) J = D[I], 
                                        " " == J ? (K || F && !I || (G.push(new CKEDITOR.dom.text(" ")), L = G.length), 
                                        K = 1) : (G.push(J), K = 0);
                                        z && L == G.length && G.pop(), F = G;
                                    }
                                }
                                if (F) {
                                    for (;z = F.pop(); ) y.insertNode(z);
                                    F = 0;
                                } else y.insertNode(t.node);
                                t.lastNotAllowed && r < s.length - 1 && ((E = w ? v : E) && y.setEndAt(E, CKEDITOR.POSITION_AFTER_START), 
                                o = 0), y.collapse();
                            }
                        }
                        m.dontMoveCaret = q, m.bogusNeededBlocks = u;
                    }
                    A = m.range;
                    var M;
                    for (E = m.bogusNeededBlocks, F = A.createBookmark(); B = m.zombies.pop(); ) B.getParent() && (C = A.clone(), 
                    C.moveToElementEditStart(B), C.removeEmptyBlocksAtEnd());
                    if (E) for (;B = E.pop(); ) CKEDITOR.env.needsBrFiller ? B.appendBogus() : B.append(A.document.createText(" "));
                    for (;B = m.mergeCandidates.pop(); ) B.mergeSiblings();
                    if (A.moveToBookmark(F), !m.dontMoveCaret) {
                        for (B = a(A.startContainer) && A.startContainer.getChild(A.startOffset - 1); B && a(B) && !B.is(i.$empty); ) {
                            if (B.isBlockBoundary()) A.moveToPosition(B, CKEDITOR.POSITION_BEFORE_END); else {
                                if (e(B) && B.getHtml().match(/(\s|&nbsp;)$/g)) {
                                    M = null;
                                    break;
                                }
                                M = A.clone(), M.moveToPosition(B, CKEDITOR.POSITION_BEFORE_END);
                            }
                            B = B.getLast(d);
                        }
                        M && A.moveToRange(M);
                    }
                    p.select(), h(j);
                }
            };
        }(), n = function() {
            function a(a) {
                return a = new CKEDITOR.dom.walker(a), a.guard = function(a, b) {
                    return b ? !1 : a.type == CKEDITOR.NODE_ELEMENT ? a.is(CKEDITOR.dtd.$tableContent) : void 0;
                }, a.evaluator = function(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT;
                }, a;
            }
            function b(a, b, c) {
                return b = a.getDocument().createElement(b), a.append(b, c), b;
            }
            function c(a) {
                var b, c = a.count();
                for (c; c-- > 0; ) b = a.getItem(c), CKEDITOR.tools.trim(b.getHtml()) || (b.appendBogus(), 
                CKEDITOR.env.ie && CKEDITOR.env.version < 9 && b.getChildCount() && b.getFirst().remove());
            }
            return function(d) {
                var e = d.startContainer, f = e.getAscendant("table", 1), g = !1;
                c(f.getElementsByTag("td")), c(f.getElementsByTag("th")), f = d.clone(), f.setStart(e, 0), 
                f = a(f).lastBackward(), f || (f = d.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), 
                f = a(f).lastForward(), g = !0), f || (f = e), f.is("table") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), 
                d.collapse(!0), f.remove()) : (f.is({
                    tbody: 1,
                    thead: 1,
                    tfoot: 1
                }) && (f = b(f, "tr", g)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", g)), 
                (e = f.getBogus()) && e.remove(), d.moveToPosition(f, g ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END));
            };
        }();
    }(), function() {
        function a() {
            var a, b = this._.fakeSelection;
            b && (a = this.getSelection(1), a && a.isHidden() || (b.reset(), b = 0)), (b || (b = a || this.getSelection(1), 
            b && b.getType() != CKEDITOR.SELECTION_NONE)) && (this.fire("selectionCheck", b), 
            a = this.elementPath(), a.compare(this._.selectionPreviousPath) || (CKEDITOR.env.webkit && (this._.previousActive = this.document.getActive()), 
            this._.selectionPreviousPath = a, this.fire("selectionChange", {
                selection: b,
                path: a
            })));
        }
        function b() {
            l = !0, k || (c.call(this), k = CKEDITOR.tools.setTimeout(c, 200, this));
        }
        function c() {
            k = null, l && (CKEDITOR.tools.setTimeout(a, 0, this), l = !1);
        }
        function d(a) {
            function b(b, c) {
                return b && b.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (c ? "End" : "Start")](b) : !1;
            }
            if (!(a.root instanceof CKEDITOR.editable)) return !1;
            var c = a.startContainer, d = a.getPreviousNode(m, null, c), e = a.getNextNode(m, null, c);
            return !b(d) && !b(e, 1) && (d || e || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !1 : !0;
        }
        function e(a) {
            return a.getCustomData("cke-fillingChar");
        }
        function f(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar");
            if (c) {
                if (b !== !1) {
                    var d, e = a.getDocument().getSelection().getNative(), f = e && "None" != e.type && e.getRangeAt(0);
                    if (c.getLength() > 1 && f && f.intersectsNode(c.$)) {
                        d = [ e.anchorOffset, e.focusOffset ], f = e.focusNode == c.$ && e.focusOffset > 0, 
                        e.anchorNode == c.$ && e.anchorOffset > 0 && d[0]--, f && d[1]--;
                        var h;
                        f = e, f.isCollapsed || (h = f.getRangeAt(0), h.setStart(f.anchorNode, f.anchorOffset), 
                        h.setEnd(f.focusNode, f.focusOffset), h = h.collapsed), h && d.unshift(d.pop());
                    }
                }
                c.setText(g(c.getText())), d && (c = e.getRangeAt(0), c.setStart(c.startContainer, d[0]), 
                c.setEnd(c.startContainer, d[1]), e.removeAllRanges(), e.addRange(c));
            }
        }
        function g(a) {
            return a.replace(/\u200B( )?/g, function(a) {
                return a[1] ? " " : "";
            });
        }
        function h(a, b, c) {
            var d = a.on("focus", function(a) {
                a.cancel();
            }, null, null, -100);
            if (CKEDITOR.env.ie) var e = a.getDocument().on("selectionchange", function(a) {
                a.cancel();
            }, null, null, -100); else {
                var f = new CKEDITOR.dom.range(a);
                f.moveToElementEditStart(a);
                var g = a.getDocument().$.createRange();
                g.setStart(f.startContainer.$, f.startOffset), g.collapse(1), b.removeAllRanges(), 
                b.addRange(g);
            }
            c && a.focus(), d.removeListener(), e && e.removeListener();
        }
        function i(a) {
            var b = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' + (CKEDITOR.env.ie ? "display:none" : "position:fixed;top:0;left:-1000px") + '">&nbsp;</div>', a.document);
            a.fire("lockSnapshot"), a.editable().append(b);
            var c = a.getSelection(), d = a.createRange(), e = c.root.on("selectionchange", function(a) {
                a.cancel();
            }, null, null, 0);
            d.setStartAt(b, CKEDITOR.POSITION_AFTER_START), d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END), 
            c.selectRanges([ d ]), e.removeListener(), a.fire("unlockSnapshot"), a._.hiddenSelectionContainer = b;
        }
        function j(a) {
            var b = {
                37: 1,
                39: 1,
                8: 1,
                46: 1
            };
            return function(c) {
                var d = c.data.getKeystroke();
                if (b[d]) {
                    var e = a.getSelection().getRanges(), f = e[0];
                    1 == e.length && f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), 
                    c.data.preventDefault(), c.cancel());
                }
            };
        }
        var k, l, m = CKEDITOR.dom.walker.invisible(1), n = function() {
            function a(a) {
                return function(b) {
                    var c = b.editor.createRange();
                    return c.moveToClosestEditablePosition(b.selected, a) && b.editor.getSelection().selectRanges([ c ]), 
                    !1;
                };
            }
            function b(a) {
                return function(b) {
                    var c, d = b.editor, e = d.createRange();
                    return (c = e.moveToClosestEditablePosition(b.selected, a)) || (c = e.moveToClosestEditablePosition(b.selected, !a)), 
                    c && d.getSelection().selectRanges([ e ]), d.fire("saveSnapshot"), b.selected.remove(), 
                    c || (e.moveToElementEditablePosition(d.editable()), d.getSelection().selectRanges([ e ])), 
                    d.fire("saveSnapshot"), !1;
                };
            }
            var c = a(), d = a(1);
            return {
                37: c,
                38: c,
                39: d,
                40: d,
                8: b(),
                46: b(1)
            };
        }();
        CKEDITOR.on("instanceCreated", function(c) {
            function d() {
                var a = e.getSelection();
                a && a.removeAllRanges();
            }
            var e = c.editor;
            e.on("contentDom", function() {
                var c, d, g = e.document, h = CKEDITOR.document, i = e.editable(), k = g.getBody(), l = g.getDocumentElement(), m = i.isInline();
                if (CKEDITOR.env.gecko && i.attachListener(i, "focus", function(a) {
                    a.removeListener(), 0 !== c && (a = e.getSelection().getNative()) && a.isCollapsed && a.anchorNode == i.$ && (a = e.createRange(), 
                    a.moveToElementEditStart(i), a.select());
                }, null, null, -2), i.attachListener(i, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                    c && CKEDITOR.env.webkit && (c = e._.previousActive && e._.previousActive.equals(g.getActive())), 
                    e.unlockSelection(c), c = 0;
                }, null, null, -1), i.attachListener(i, "mousedown", function() {
                    c = 0;
                }), CKEDITOR.env.ie || CKEDITOR.env.opera || m) {
                    var n = function() {
                        d = new CKEDITOR.dom.selection(e.getSelection()), d.lock();
                    };
                    o ? i.attachListener(i, "beforedeactivate", n, null, null, -1) : i.attachListener(e, "selectionCheck", n, null, null, -1), 
                    i.attachListener(i, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() {
                        e.lockSelection(d), c = 1;
                    }, null, null, -1), i.attachListener(i, "mousedown", function() {
                        c = 0;
                    });
                }
                if (CKEDITOR.env.ie && !m) {
                    var p;
                    if (i.attachListener(i, "mousedown", function(a) {
                        2 == a.data.$.button && (a = e.document.getSelection(), a && a.getType() != CKEDITOR.SELECTION_NONE || (p = e.window.getScrollPosition()));
                    }), i.attachListener(i, "mouseup", function(a) {
                        2 == a.data.$.button && p && (e.document.$.documentElement.scrollLeft = p.x, e.document.$.documentElement.scrollTop = p.y), 
                        p = null;
                    }), "BackCompat" != g.$.compatMode && ((CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && l.on("mousedown", function(a) {
                        function b(a) {
                            if (a = a.data.$, d) {
                                var b = k.$.createTextRange();
                                try {
                                    b.moveToPoint(a.x, a.y);
                                } catch (c) {}
                                d.setEndPoint(f.compareEndPoints("StartToStart", b) < 0 ? "EndToEnd" : "StartToStart", b), 
                                d.select();
                            }
                        }
                        function c() {
                            l.removeListener("mousemove", b), h.removeListener("mouseup", c), l.removeListener("mouseup", c), 
                            d.select();
                        }
                        if (a = a.data, a.getTarget().is("html") && a.$.y < l.$.clientHeight && a.$.x < l.$.clientWidth) {
                            var d = k.$.createTextRange();
                            try {
                                d.moveToPoint(a.$.x, a.$.y);
                            } catch (e) {}
                            var f = d.duplicate();
                            l.on("mousemove", b), h.on("mouseup", c), l.on("mouseup", c);
                        }
                    }), CKEDITOR.env.version > 7 && CKEDITOR.env.version < 11)) {
                        l.on("mousedown", function(a) {
                            a.data.getTarget().is("html") && (h.on("mouseup", q), l.on("mouseup", q));
                        });
                        var q = function() {
                            h.removeListener("mouseup", q), l.removeListener("mouseup", q);
                            var a = CKEDITOR.document.$.selection, b = a.createRange();
                            "None" != a.type && b.parentElement().ownerDocument == g.$ && b.select();
                        };
                    }
                }
                if (i.attachListener(i, "selectionchange", a, e), i.attachListener(i, "keyup", b, e), 
                i.attachListener(i, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                    e.forceNextSelectionCheck(), e.selectionChange(1);
                }), m ? CKEDITOR.env.webkit || CKEDITOR.env.gecko : CKEDITOR.env.opera) {
                    var r;
                    i.attachListener(i, "mousedown", function() {
                        r = 1;
                    }), i.attachListener(g.getDocumentElement(), "mouseup", function() {
                        r && b.call(e), r = 0;
                    });
                } else i.attachListener(CKEDITOR.env.ie ? i : g.getDocumentElement(), "mouseup", b, e);
                CKEDITOR.env.webkit && i.attachListener(g, "keydown", function(a) {
                    switch (a.data.getKey()) {
                      case 13:
                      case 33:
                      case 34:
                      case 35:
                      case 36:
                      case 37:
                      case 39:
                      case 8:
                      case 45:
                      case 46:
                        f(i);
                    }
                }, null, null, -1), i.attachListener(i, "keydown", j(e), null, null, -1);
            }), e.on("contentDomUnload", e.forceNextSelectionCheck, e), e.on("dataReady", function() {
                delete e._.fakeSelection, delete e._.hiddenSelectionContainer, e.selectionChange(1);
            }), e.on("loadSnapshot", function() {
                var a = e.editable().getLast(function(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT;
                });
                a && a.hasAttribute("data-cke-hidden-sel") && a.remove();
            }, null, null, 100), CKEDITOR.env.ie9Compat && e.on("beforeDestroy", d, null, null, 9), 
            CKEDITOR.env.webkit && e.on("setData", d), e.on("contentDomUnload", function() {
                e.unlockSelection();
            }), e.on("key", function(a) {
                if ("wysiwyg" == e.mode) {
                    var b = e.getSelection();
                    if (b.isFake) {
                        var c = n[a.data.keyCode];
                        if (c) return c({
                            editor: e,
                            selected: b.getSelectedElement(),
                            selection: b,
                            keyEvent: a
                        });
                    }
                }
            });
        }), CKEDITOR.on("instanceReady", function(a) {
            var b = a.editor;
            if (CKEDITOR.env.webkit) {
                b.on("selectionChange", function() {
                    var a = b.editable(), c = e(a);
                    c && (c.getCustomData("ready") ? f(a) : c.setCustomData("ready", 1));
                }, null, null, -1), b.on("beforeSetMode", function() {
                    f(b.editable());
                }, null, null, -1);
                var c, d, a = function() {
                    var a = b.editable();
                    if (a && (a = e(a))) {
                        var f = b.document.$.defaultView.getSelection();
                        "Caret" == f.type && f.anchorNode == a.$ && (d = 1), c = a.getText(), a.setText(g(c));
                    }
                }, h = function() {
                    var a = b.editable();
                    a && (a = e(a)) && (a.setText(c), d && (b.document.$.defaultView.getSelection().setPosition(a.$, a.getLength()), 
                    d = 0));
                };
                b.on("beforeUndoImage", a), b.on("afterUndoImage", h), b.on("beforeGetData", a, null, null, 0), 
                b.on("getData", h);
            }
        }), CKEDITOR.editor.prototype.selectionChange = function(c) {
            (c ? a : b).call(this);
        }, CKEDITOR.editor.prototype.getSelection = function(a) {
            return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection;
        }, CKEDITOR.editor.prototype.lockSelection = function(a) {
            return a = a || this.getSelection(1), a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), 
            this._.savedSelection = a, !0) : !1;
        }, CKEDITOR.editor.prototype.unlockSelection = function(a) {
            var b = this._.savedSelection;
            return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1;
        }, CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
            delete this._.selectionPreviousPath;
        }, CKEDITOR.dom.document.prototype.getSelection = function() {
            return new CKEDITOR.dom.selection(this);
        }, CKEDITOR.dom.range.prototype.select = function() {
            var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
            return a.selectRanges([ this ]), a;
        }, CKEDITOR.SELECTION_NONE = 1, CKEDITOR.SELECTION_TEXT = 2, CKEDITOR.SELECTION_ELEMENT = 3;
        var o = "function" != typeof window.getSelection, p = 1;
        CKEDITOR.dom.selection = function(a) {
            if (a instanceof CKEDITOR.dom.selection) var b = a, a = a.root;
            var c = a instanceof CKEDITOR.dom.element;
            if (this.rev = b ? b.rev : p++, this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(), 
            this.root = a = c ? a : this.document.getBody(), this.isLocked = 0, this._ = {
                cache: {}
            }, b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, 
            this.isLocked = b.isLocked, this;
            if (b = o ? this.document.$.selection : this.document.getWindow().$.getSelection(), 
            CKEDITOR.env.webkit) ("None" == b.type && this.document.getActive().equals(a) || "Caret" == b.type && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) && h(a, b); else if (CKEDITOR.env.gecko) b && this.document.getActive().equals(a) && b.anchorNode && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT && h(a, b, !0); else if (CKEDITOR.env.ie) {
                var d;
                try {
                    d = this.document.getActive();
                } catch (e) {}
                o ? "None" == b.type && d && d.equals(this.document.getDocumentElement()) && h(a, null, !0) : ((b = b && b.anchorNode) && (b = new CKEDITOR.dom.node(b)), 
                d && d.equals(this.document.getDocumentElement()) && b && (a.equals(b) || a.contains(b)) && h(a, null, !0));
            }
            d = this.getNative();
            var f, g;
            if (d) if (d.getRangeAt) f = (g = d.rangeCount && d.getRangeAt(0)) && new CKEDITOR.dom.node(g.commonAncestorContainer); else {
                try {
                    g = d.createRange();
                } catch (i) {}
                f = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement());
            }
            return (!f || f.type != CKEDITOR.NODE_ELEMENT && f.type != CKEDITOR.NODE_TEXT || !this.root.equals(f) && !this.root.contains(f)) && (this._.cache.type = CKEDITOR.SELECTION_NONE, 
            this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", 
            this._.cache.ranges = new CKEDITOR.dom.rangeList()), this;
        };
        var q = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            thead: 1,
            tfoot: 1
        };
        CKEDITOR.dom.selection.prototype = {
            getNative: function() {
                return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = o ? this.document.$.selection : this.document.getWindow().$.getSelection();
            },
            getType: o ? function() {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_NONE;
                try {
                    var c = this.getNative(), d = c.type;
                    "Text" == d && (b = CKEDITOR.SELECTION_TEXT), "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT), 
                    c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT);
                } catch (e) {}
                return a.type = b;
            } : function() {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_TEXT, c = this.getNative();
                if (c && c.rangeCount) {
                    if (1 == c.rangeCount) {
                        var c = c.getRangeAt(0), d = c.startContainer;
                        d == c.endContainer && 1 == d.nodeType && c.endOffset - c.startOffset == 1 && q[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT);
                    }
                } else b = CKEDITOR.SELECTION_NONE;
                return a.type = b;
            },
            getRanges: function() {
                var a = o ? function() {
                    function a(a) {
                        return new CKEDITOR.dom.node(a).getIndex();
                    }
                    var b = function(b, c) {
                        b = b.duplicate(), b.collapse(c);
                        var d = b.parentElement();
                        if (!d.hasChildNodes()) return {
                            container: d,
                            offset: 0
                        };
                        for (var e, f, g, h, i = d.children, j = b.duplicate(), k = 0, l = i.length - 1, m = -1; l >= k; ) if (m = Math.floor((k + l) / 2), 
                        e = i[m], j.moveToElementText(e), g = j.compareEndPoints("StartToStart", b), g > 0) l = m - 1; else {
                            if (!(0 > g)) return {
                                container: d,
                                offset: a(e)
                            };
                            k = m + 1;
                        }
                        if (-1 == m || m == i.length - 1 && 0 > g) {
                            if (j.moveToElementText(d), j.setEndPoint("StartToStart", b), j = j.text.replace(/(\r\n|\r)/g, "\n").length, 
                            i = d.childNodes, !j) return e = i[i.length - 1], e.nodeType != CKEDITOR.NODE_TEXT ? {
                                container: d,
                                offset: i.length
                            } : {
                                container: e,
                                offset: e.nodeValue.length
                            };
                            for (d = i.length; j > 0 && d > 0; ) f = i[--d], f.nodeType == CKEDITOR.NODE_TEXT && (h = f, 
                            j -= f.nodeValue.length);
                            return {
                                container: h,
                                offset: -j
                            };
                        }
                        if (j.collapse(g > 0 ? !0 : !1), j.setEndPoint(g > 0 ? "StartToStart" : "EndToStart", b), 
                        j = j.text.replace(/(\r\n|\r)/g, "\n").length, !j) return {
                            container: d,
                            offset: a(e) + (g > 0 ? 0 : 1)
                        };
                        for (;j > 0; ) try {
                            f = e[g > 0 ? "previousSibling" : "nextSibling"], f.nodeType == CKEDITOR.NODE_TEXT && (j -= f.nodeValue.length, 
                            h = f), e = f;
                        } catch (n) {
                            return {
                                container: d,
                                offset: a(e)
                            };
                        }
                        return {
                            container: h,
                            offset: g > 0 ? -j : h.nodeValue.length + j
                        };
                    };
                    return function() {
                        var a = this.getNative(), c = a && a.createRange(), d = this.getType();
                        if (!a) return [];
                        if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), 
                        d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), 
                        a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), 
                        [ a ];
                        if (d == CKEDITOR.SELECTION_ELEMENT) {
                            for (var d = [], e = 0; e < c.length; e++) {
                                for (var f = c.item(e), g = f.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < g.childNodes.length && g.childNodes[h] != f; h++) ;
                                a.setStart(new CKEDITOR.dom.node(g), h), a.setEnd(new CKEDITOR.dom.node(g), h + 1), 
                                d.push(a);
                            }
                            return d;
                        }
                        return [];
                    };
                }() : function() {
                    var a, b = [], c = this.getNative();
                    if (!c) return b;
                    for (var d = 0; d < c.rangeCount; d++) {
                        var e = c.getRangeAt(d);
                        a = new CKEDITOR.dom.range(this.root), a.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset), 
                        a.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset), b.push(a);
                    }
                    return b;
                };
                return function(b) {
                    var c = this._.cache;
                    if (c.ranges && !b) return c.ranges;
                    if (c.ranges || (c.ranges = new CKEDITOR.dom.rangeList(a.call(this))), b) for (var d = c.ranges, e = 0; e < d.length; e++) {
                        var f = d[e];
                        if (f.getCommonAncestor().isReadOnly() && d.splice(e, 1), !f.collapsed) {
                            if (f.startContainer.isReadOnly()) for (var g, b = f.startContainer; b && !((g = b.type == CKEDITOR.NODE_ELEMENT) && b.is("body") || !b.isReadOnly()); ) g && "false" == b.getAttribute("contentEditable") && f.setStartAfter(b), 
                            b = b.getParent();
                            b = f.startContainer, g = f.endContainer;
                            var h = f.startOffset, i = f.endOffset, j = f.clone();
                            b && b.type == CKEDITOR.NODE_TEXT && (h >= b.getLength() ? j.setStartAfter(b) : j.setStartBefore(b)), 
                            g && g.type == CKEDITOR.NODE_TEXT && (i ? j.setEndAfter(g) : j.setEndBefore(g)), 
                            b = new CKEDITOR.dom.walker(j), b.evaluator = function(a) {
                                if (a.type == CKEDITOR.NODE_ELEMENT && a.isReadOnly()) {
                                    var b = f.clone();
                                    return f.setEndBefore(a), f.collapsed && d.splice(e--, 1), a.getPosition(j.endContainer) & CKEDITOR.POSITION_CONTAINS || (b.setStartAfter(a), 
                                    b.collapsed || d.splice(e + 1, 0, b)), !0;
                                }
                                return !1;
                            }, b.next();
                        }
                    }
                    return c.ranges;
                };
            }(),
            getStartElement: function() {
                var a = this._.cache;
                if (void 0 !== a.startElement) return a.startElement;
                var b;
                switch (this.getType()) {
                  case CKEDITOR.SELECTION_ELEMENT:
                    return this.getSelectedElement();

                  case CKEDITOR.SELECTION_TEXT:
                    var c = this.getRanges()[0];
                    if (c) {
                        if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else {
                            for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary(); ) c.setStartAfter(b);
                            if (b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                            if (b = b.getChild(c.startOffset), b && b.type == CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT; ) b = c, 
                            c = c.getFirst(); else b = c.startContainer;
                        }
                        b = b.$;
                    }
                }
                return a.startElement = b ? new CKEDITOR.dom.element(b) : null;
            },
            getSelectedElement: function() {
                var a = this._.cache;
                if (void 0 !== a.selectedElement) return a.selectedElement;
                var b = this, c = CKEDITOR.tools.tryThese(function() {
                    return b.getNative().createRange().item(0);
                }, function() {
                    for (var a, c, d = b.getRanges()[0].clone(), e = 2; !(!e || (a = d.getEnclosedNode()) && a.type == CKEDITOR.NODE_ELEMENT && q[a.getName()] && (c = a)); e--) d.shrink(CKEDITOR.SHRINK_ELEMENT);
                    return c && c.$;
                });
                return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null;
            },
            getSelectedText: function() {
                var a = this._.cache;
                if (void 0 !== a.selectedText) return a.selectedText;
                var b = this.getNative(), b = o ? "Control" == b.type ? "" : b.createRange().text : b.toString();
                return a.selectedText = b;
            },
            lock: function() {
                this.getRanges(), this.getStartElement(), this.getSelectedElement(), this.getSelectedText(), 
                this._.cache.nativeSel = null, this.isLocked = 1;
            },
            unlock: function(a) {
                if (this.isLocked) {
                    if (a) var b = this.getSelectedElement(), c = !b && this.getRanges(), d = this.isFake;
                    this.isLocked = 0, this.reset(), a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c));
                }
            },
            reset: function() {
                this._.cache = {}, this.isFake = 0;
                var a = this.root.editor;
                if (a && a._.fakeSelection && this.rev == a._.fakeSelection.rev) {
                    delete a._.fakeSelection;
                    var b = a._.hiddenSelectionContainer;
                    b && (a.fire("lockSnapshot"), b.remove(), a.fire("unlockSnapshot")), delete a._.hiddenSelectionContainer;
                }
                this.rev = p++;
            },
            selectElement: function(a) {
                var b = new CKEDITOR.dom.range(this.root);
                b.setStartBefore(a), b.setEndAfter(a), this.selectRanges([ b ]);
            },
            selectRanges: function(a) {
                if (this.reset(), a.length) if (this.isLocked) {
                    var b = CKEDITOR.document.getActive();
                    this.unlock(), this.selectRanges(a), this.lock(), !b.equals(this.root) && b.focus();
                } else {
                    var c, e;
                    if ((1 != a.length || (e = a[0]).collapsed || !(b = e.getEnclosedNode()) || b.type != CKEDITOR.NODE_ELEMENT || (e = e.clone(), 
                    e.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (c = e.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && (b = c), 
                    "false" != b.getAttribute("contenteditable"))) && (b = void 0), b) this.fake(b); else {
                        if (o) {
                            e = CKEDITOR.dom.walker.whitespaces(!0), c = /\ufeff|\u00a0/;
                            var g = {
                                table: 1,
                                tbody: 1,
                                tr: 1
                            };
                            a.length > 1 && (b = a[a.length - 1], a[0].setEnd(b.endContainer, b.endOffset));
                            var h, i, j, b = a[0], a = b.collapsed, k = b.getEnclosedNode();
                            if (k && k.type == CKEDITOR.NODE_ELEMENT && k.getName() in q && (!k.is("a") || !k.getText())) try {
                                return j = k.$.createControlRange(), j.addElement(k.$), void j.select();
                            } catch (l) {}
                            (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in g || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in g) && b.shrink(CKEDITOR.NODE_ELEMENT, !0), 
                            j = b.createBookmark();
                            var m, g = j.startNode;
                            a || (m = j.endNode), j = b.document.$.body.createTextRange(), j.moveToElementText(g.$), 
                            j.moveStart("character", 1), m ? (c = b.document.$.body.createTextRange(), c.moveToElementText(m.$), 
                            j.setEndPoint("EndToEnd", c), j.moveEnd("character", -1)) : (h = g.getNext(e), i = g.hasAscendant("pre"), 
                            h = !(h && h.getText && h.getText().match(c)) && (i || !g.hasPrevious() || g.getPrevious().is && g.getPrevious().is("br")), 
                            i = b.document.createElement("span"), i.setHtml("&#65279;"), i.insertBefore(g), 
                            h && b.document.createText("").insertBefore(g)), b.setStartBefore(g), g.remove(), 
                            a ? (h ? (j.moveStart("character", -1), j.select(), b.document.$.selection.clear()) : j.select(), 
                            b.moveToPosition(i, CKEDITOR.POSITION_BEFORE_START), i.remove()) : (b.setEndBefore(m), 
                            m.remove(), j.select());
                        } else {
                            if (m = this.getNative(), !m) return;
                            for (CKEDITOR.env.opera && (b = this.document.$.createRange(), b.selectNodeContents(this.root.$), 
                            m.addRange(b)), this.removeAllRanges(), j = 0; j < a.length; j++) if (j < a.length - 1 && (b = a[j], 
                            h = a[j + 1], c = b.clone(), c.setStart(b.endContainer, b.endOffset), c.setEnd(h.startContainer, h.startOffset), 
                            !c.collapsed && (c.shrink(CKEDITOR.NODE_ELEMENT, !0), i = c.getCommonAncestor(), 
                            c = c.getEnclosedNode(), i.isReadOnly() || c && c.isReadOnly()))) h.setStart(b.startContainer, b.startOffset), 
                            a.splice(j--, 1); else {
                                b = a[j], i = this.document.$.createRange(), h = b.startContainer, CKEDITOR.env.opera && b.collapsed && h.type == CKEDITOR.NODE_ELEMENT && (c = h.getChild(b.startOffset - 1), 
                                e = h.getChild(b.startOffset), (!c && !e && h.is(CKEDITOR.dtd.$removeEmpty) || c && c.type == CKEDITOR.NODE_ELEMENT || e && e.type == CKEDITOR.NODE_ELEMENT) && (b.insertNode(this.document.createText("")), 
                                b.collapse(1))), b.collapsed && CKEDITOR.env.webkit && d(b) && (h = this.root, f(h, !1), 
                                c = h.getDocument().createText("​"), h.setCustomData("cke-fillingChar", c), b.insertNode(c), 
                                (h = c.getNext()) && !c.getPrevious() && h.type == CKEDITOR.NODE_ELEMENT && "br" == h.getName() ? (f(this.root), 
                                b.moveToPosition(h, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(c, CKEDITOR.POSITION_AFTER_END)), 
                                i.setStart(b.startContainer.$, b.startOffset);
                                try {
                                    i.setEnd(b.endContainer.$, b.endOffset);
                                } catch (n) {
                                    if (!(n.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0)) throw n;
                                    b.collapse(1), i.setEnd(b.endContainer.$, b.endOffset);
                                }
                                m.addRange(i);
                            }
                        }
                        this.reset(), this.root.fire("selectionchange");
                    }
                }
            },
            fake: function(a) {
                var b = this.root.editor;
                this.reset(), i(b);
                var c = this._.cache, d = new CKEDITOR.dom.range(this.root);
                d.setStartBefore(a), d.setEndAfter(a), c.ranges = new CKEDITOR.dom.rangeList(d), 
                c.selectedElement = c.startElement = a, c.type = CKEDITOR.SELECTION_ELEMENT, c.selectedText = c.nativeSel = null, 
                this.isFake = 1, this.rev = p++, b._.fakeSelection = this, this.root.fire("selectionchange");
            },
            isHidden: function() {
                var a = this.getCommonAncestor();
                return a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()), !(!a || !a.data("cke-hidden-sel"));
            },
            createBookmarks: function(a) {
                return a = this.getRanges().createBookmarks(a), this.isFake && (a.isFake = 1), a;
            },
            createBookmarks2: function(a) {
                return a = this.getRanges().createBookmarks2(a), this.isFake && (a.isFake = 1), 
                a;
            },
            selectBookmarks: function(a) {
                for (var b = [], c = 0; c < a.length; c++) {
                    var d = new CKEDITOR.dom.range(this.root);
                    d.moveToBookmark(a[c]), b.push(d);
                }
                return a.isFake ? this.fake(b[0].getEnclosedNode()) : this.selectRanges(b), this;
            },
            getCommonAncestor: function() {
                var a = this.getRanges();
                return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null;
            },
            scrollIntoView: function() {
                this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView();
            },
            removeAllRanges: function() {
                var a = this.getNative();
                try {
                    a && a[o ? "empty" : "removeAllRanges"]();
                } catch (b) {}
                this.reset();
            }
        };
    }(), CKEDITOR.editor.prototype.attachStyleStateChange = function(a, b) {
        var c = this._.styleStateChangeCallbacks;
        c || (c = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(a) {
            for (var b = 0; b < c.length; b++) {
                var d = c[b], e = d.style.checkActive(a.data.path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                d.fn.call(this, e);
            }
        })), c.push({
            style: a,
            fn: b
        });
    }, CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, 
    function() {
        function a(a, b) {
            for (var c, d; (a = a.getParent()) && !a.equals(b); ) if (a.getAttribute("data-nostyle")) c = a; else if (!d) {
                var e = a.getAttribute("contentEditable");
                "false" == e ? c = a : "true" == e && (d = 1);
            }
            return c;
        }
        function b(c) {
            var e = c.document;
            if (c.collapsed) e = q(this, e), c.insertNode(e), c.moveToPosition(e, CKEDITOR.POSITION_BEFORE_END); else {
                var f, g = this.element, h = this._.definition, i = h.ignoreReadonly, j = i || h.includeReadonly;
                void 0 == j && (j = c.root.getCustomData("cke_includeReadonly"));
                var k = CKEDITOR.dtd[g];
                k || (f = !0, k = CKEDITOR.dtd.span), c.enlarge(CKEDITOR.ENLARGE_INLINE, 1), c.trim();
                var l, m = c.createBookmark(), o = m.startNode, p = m.endNode, r = o;
                if (!i) {
                    var s = c.getCommonAncestor(), i = a(o, s), s = a(p, s);
                    i && (r = i.getNextSourceNode(!0)), s && (p = s);
                }
                for (r.getPosition(p) == CKEDITOR.POSITION_FOLLOWING && (r = 0); r; ) {
                    if (i = !1, r.equals(p)) r = null, i = !0; else {
                        var t = r.type == CKEDITOR.NODE_ELEMENT ? r.getName() : null, s = t && "false" == r.getAttribute("contentEditable"), u = t && r.getAttribute("data-nostyle");
                        if (t && r.data("cke-bookmark")) {
                            r = r.getNextSourceNode(!0);
                            continue;
                        }
                        if (s && j && CKEDITOR.dtd.$block[t]) for (var v = r, w = d(v), x = void 0, y = w.length, z = 0, v = y && new CKEDITOR.dom.range(v.getDocument()); y > z; ++z) {
                            var x = w[z], B = CKEDITOR.filter.instances[x.data("cke-filter")];
                            (B ? B.check(this) : 1) && (v.selectNodeContents(x), b.call(this, v));
                        }
                        if (w = t ? !k[t] || u ? 0 : s && !j ? 0 : (r.getPosition(p) | C) == C && (!h.childRule || h.childRule(r)) : 1) {
                            if (!(w = r.getParent()) || !(w.getDtd() || CKEDITOR.dtd.span)[g] && !f || h.parentRule && !h.parentRule(w)) i = !0; else if (l || t && CKEDITOR.dtd.$removeEmpty[t] && (r.getPosition(p) | C) != C || (l = c.clone(), 
                            l.setStartBefore(r)), t = r.type, t == CKEDITOR.NODE_TEXT || s || t == CKEDITOR.NODE_ELEMENT && !r.getChildCount()) {
                                for (var E, t = r; (i = !t.getNext(A)) && (E = t.getParent(), k[E.getName()]) && (E.getPosition(o) | D) == D && (!h.childRule || h.childRule(E)); ) t = E;
                                l.setEndAfter(t);
                            }
                        } else i = !0;
                        r = r.getNextSourceNode(u || s);
                    }
                    if (i && l && !l.collapsed) {
                        for (var F, G, H, i = q(this, e), s = i.hasAttributes(), u = l.getCommonAncestor(), t = {}, w = {}, x = {}, y = {}; i && u; ) {
                            if (u.getName() == g) {
                                for (F in h.attributes) !y[F] && (H = u.getAttribute(G)) && (i.getAttribute(F) == H ? w[F] = 1 : y[F] = 1);
                                for (G in h.styles) !x[G] && (H = u.getStyle(G)) && (i.getStyle(G) == H ? t[G] = 1 : x[G] = 1);
                            }
                            u = u.getParent();
                        }
                        for (F in w) i.removeAttribute(F);
                        for (G in t) i.removeStyle(G);
                        s && !i.hasAttributes() && (i = null), i ? (l.extractContents().appendTo(i), l.insertNode(i), 
                        n.call(this, i), i.mergeSiblings(), CKEDITOR.env.ie || i.$.normalize()) : (i = new CKEDITOR.dom.element("span"), 
                        l.extractContents().appendTo(i), l.insertNode(i), n.call(this, i), i.remove(!0)), 
                        l = null;
                    }
                }
                c.moveToBookmark(m), c.shrink(CKEDITOR.SHRINK_TEXT), c.shrink(CKEDITOR.NODE_ELEMENT, !0);
            }
        }
        function c(a) {
            function b() {
                for (var a = new CKEDITOR.dom.elementPath(d.getParent()), b = new CKEDITOR.dom.elementPath(j.getParent()), c = null, e = null, f = 0; f < a.elements.length; f++) {
                    var g = a.elements[f];
                    if (g == a.block || g == a.blockLimit) break;
                    k.checkElementRemovable(g) && (c = g);
                }
                for (f = 0; f < b.elements.length && (g = b.elements[f], g != b.block && g != b.blockLimit); f++) k.checkElementRemovable(g) && (e = g);
                e && j.breakParent(e), c && d.breakParent(c);
            }
            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var c = a.createBookmark(), d = c.startNode;
            if (a.collapsed) {
                for (var e, f, g = new CKEDITOR.dom.elementPath(d.getParent(), a.root), h = 0; h < g.elements.length && (f = g.elements[h]) && (f != g.block && f != g.blockLimit); h++) if (this.checkElementRemovable(f)) {
                    var i;
                    a.collapsed && (a.checkBoundaryOfElement(f, CKEDITOR.END) || (i = a.checkBoundaryOfElement(f, CKEDITOR.START))) ? (e = f, 
                    e.match = i ? "start" : "end") : (f.mergeSiblings(), f.is(this.element) ? m.call(this, f) : o(f, t(this)[f.getName()]));
                }
                if (e) {
                    for (f = d, h = 0; i = g.elements[h], !i.equals(e); h++) i.match || (i = i.clone(), 
                    i.append(f), f = i);
                    f["start" == e.match ? "insertBefore" : "insertAfter"](e);
                }
            } else {
                var j = c.endNode, k = this;
                for (b(), g = d; !g.equals(j); ) e = g.getNextSourceNode(), g.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(g) && (g.getName() == this.element ? m.call(this, g) : o(g, t(this)[g.getName()]), 
                e.type == CKEDITOR.NODE_ELEMENT && e.contains(d) && (b(), e = d.getNext())), g = e;
            }
            a.moveToBookmark(c), a.shrink(CKEDITOR.NODE_ELEMENT, !0);
        }
        function d(a) {
            var b = [];
            return a.forEach(function(a) {
                return "true" == a.getAttribute("contenteditable") ? (b.push(a), !1) : void 0;
            }, CKEDITOR.NODE_ELEMENT, !0), b;
        }
        function e(a) {
            var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0);
            (a = new CKEDITOR.dom.elementPath(b, a.root).contains(this.element, 1)) && !a.isReadOnly() && r(a, this);
        }
        function f(a) {
            var b = a.getCommonAncestor(!0, !0);
            if (a = new CKEDITOR.dom.elementPath(b, a.root).contains(this.element, 1)) {
                var b = this._.definition, c = b.attributes;
                if (c) for (var d in c) a.removeAttribute(d, c[d]);
                if (b.styles) for (var e in b.styles) b.styles.hasOwnProperty(e) && a.removeStyle(e);
            }
        }
        function g(a) {
            var b = a.createBookmark(!0), c = a.createIterator();
            c.enforceRealBlocks = !0, this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
            for (var d, e, f = a.document; d = c.getNextParagraph(); ) !d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (e = q(this, f, d), 
            i(d, e));
            a.moveToBookmark(b);
        }
        function h(a) {
            var b = a.createBookmark(1), c = a.createIterator();
            c.enforceRealBlocks = !0, c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d, e; d = c.getNextParagraph(); ) this.checkElementRemovable(d) && (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(e), 
            i(d, e)) : m.call(this, d));
            a.moveToBookmark(b);
        }
        function i(a, b) {
            var c = !b;
            c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
            var d = b && b.is("pre"), e = a.is("pre"), f = !d && e;
            if (d && !e) {
                if (e = b, (f = a.getBogus()) && f.remove(), f = a.getHtml(), f = k(f, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""), 
                f = f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"), f = f.replace(/([ \t\n\r]+|&nbsp;)/g, " "), 
                f = f.replace(/<br\b[^>]*>/gi, "\n"), CKEDITOR.env.ie) {
                    var g = a.getDocument().createElement("div");
                    g.append(e), e.$.outerHTML = "<pre>" + f + "</pre>", e.copyAttributes(g.getFirst()), 
                    e = g.getFirst().remove();
                } else e.setHtml(f);
                b = e;
            } else f ? b = l(c ? [ a.getHtml() ] : j(a), b) : a.moveChildren(b);
            if (b.replace(a), d) {
                var h, c = b;
                (h = c.getPrevious(B)) && h.type == CKEDITOR.NODE_ELEMENT && h.is("pre") && (d = k(h.getHtml(), /\n$/, "") + "\n\n" + k(c.getHtml(), /^\n/, ""), 
                CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + d + "</pre>" : c.setHtml(d), h.remove());
            } else c && p(b);
        }
        function j(a) {
            a.getName();
            var b = [];
            return k(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) {
                return b + "</pre>" + c + "<pre>";
            }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) {
                b.push(c);
            }), b;
        }
        function k(a, b, c) {
            var d = "", e = "", a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
                return b && (d = b), c && (e = c), "";
            });
            return d + a.replace(b, c) + e;
        }
        function l(a, b) {
            var c;
            a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
            for (var d = 0; d < a.length; d++) {
                var e = a[d], e = e.replace(/(\r\n|\r)/g, "\n"), e = k(e, /^[ \t]*\n/, ""), e = k(e, /\n$/, ""), e = k(e, /^[ \t]+|[ \t]+$/g, function(a, b) {
                    return 1 == a.length ? "&nbsp;" : b ? " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " ";
                }), e = e.replace(/\n/g, "<br>"), e = e.replace(/[ \t]{2,}/g, function(a) {
                    return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " ";
                });
                if (c) {
                    var f = b.clone();
                    f.setHtml(e), c.append(f);
                } else b.setHtml(e);
            }
            return c || b;
        }
        function m(a, b) {
            var c, d = this._.definition, e = d.attributes, d = d.styles, f = t(this)[a.getName()], g = CKEDITOR.tools.isEmpty(e) && CKEDITOR.tools.isEmpty(d);
            for (c in e) ("class" == c || this._.definition.fullMatch) && a.getAttribute(c) != u(c, e[c]) || b && "data-" == c.slice(0, 5) || (g = a.hasAttribute(c), 
            a.removeAttribute(c));
            for (var h in d) this._.definition.fullMatch && a.getStyle(h) != u(h, d[h], !0) || (g = g || !!a.getStyle(h), 
            a.removeStyle(h));
            o(a, f, w[a.getName()]), g && (this._.definition.alwaysRemoveElement ? p(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? p(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"));
        }
        function n(a) {
            for (var b, c = t(this), d = a.getElementsByTag(this.element), e = d.count(); --e >= 0; ) b = d.getItem(e), 
            b.isReadOnly() || m.call(this, b, !0);
            for (var f in c) if (f != this.element) for (d = a.getElementsByTag(f), e = d.count() - 1; e >= 0; e--) b = d.getItem(e), 
            b.isReadOnly() || o(b, c[f]);
        }
        function o(a, b, c) {
            if (b = b && b.attributes) for (var d = 0; d < b.length; d++) {
                var e, f = b[d][0];
                if (e = a.getAttribute(f)) {
                    var g = b[d][1];
                    (null === g || g.test && g.test(e) || "string" == typeof g && e == g) && a.removeAttribute(f);
                }
            }
            c || p(a);
        }
        function p(a, b) {
            if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) {
                var c = a.getPrevious(B), d = a.getNext(B);
                c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({
                    br: 1
                })) && a.append("br", 1), d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({
                    br: 1
                })) && a.append("br"), a.remove(!0);
            } else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(), 
            d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings());
        }
        function q(a, b, c) {
            var d;
            return d = a.element, "*" == d && (d = "span"), d = new CKEDITOR.dom.element(d, b), 
            c && c.copyAttributes(d), d = r(d, a), b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1), 
            d;
        }
        function r(a, b) {
            var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c);
            if (d) for (var e in d) a.setAttribute(e, d[e]);
            return c && a.setAttribute("style", c), a;
        }
        function s(a, b) {
            for (var c in a) a[c] = a[c].replace(z, function(a, c) {
                return b[c];
            });
        }
        function t(a) {
            if (a._.overrides) return a._.overrides;
            var b = a._.overrides = {}, c = a._.definition.overrides;
            if (c) {
                CKEDITOR.tools.isArray(c) || (c = [ c ]);
                for (var d = 0; d < c.length; d++) {
                    var e, f, g = c[d];
                    if ("string" == typeof g ? e = g.toLowerCase() : (e = g.element ? g.element.toLowerCase() : a.element, 
                    f = g.attributes), g = b[e] || (b[e] = {}), f) {
                        var h, g = g.attributes = g.attributes || [];
                        for (h in f) g.push([ h.toLowerCase(), f[h] ]);
                    }
                }
            }
            return b;
        }
        function u(a, b, c) {
            var d = new CKEDITOR.dom.element("span");
            return d[c ? "setStyle" : "setAttribute"](a, b), d[c ? "getStyle" : "getAttribute"](a);
        }
        function v(a, b) {
            for (var c, d = a.document, e = a.getRanges(), f = b ? this.removeFromRange : this.applyToRange, g = e.createIterator(); c = g.getNextRange(); ) f.call(this, c);
            a.selectRanges(e), d.removeCustomData("doc_processing_style");
        }
        var w = {
            address: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            section: 1,
            header: 1,
            footer: 1,
            nav: 1,
            article: 1,
            aside: 1,
            figure: 1,
            dialog: 1,
            hgroup: 1,
            time: 1,
            meter: 1,
            menu: 1,
            command: 1,
            keygen: 1,
            output: 1,
            progress: 1,
            details: 1,
            datagrid: 1,
            datalist: 1
        }, x = {
            a: 1,
            embed: 1,
            hr: 1,
            img: 1,
            li: 1,
            object: 1,
            ol: 1,
            table: 1,
            td: 1,
            tr: 1,
            th: 1,
            ul: 1,
            dl: 1,
            dt: 1,
            dd: 1,
            form: 1,
            audio: 1,
            video: 1
        }, y = /\s*(?:;\s*|$)/, z = /#\((.+?)\)/g, A = CKEDITOR.dom.walker.bookmark(0, 1), B = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function(a, b) {
            var c = a.attributes;
            c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), 
            delete c.style), b && (a = CKEDITOR.tools.clone(a), s(a.attributes, b), s(a.styles, b)), 
            c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*", 
            this.type = a.type || (w[c] ? CKEDITOR.STYLE_BLOCK : x[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE), 
            "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT), this._ = {
                definition: a
            };
        }, CKEDITOR.editor.prototype.applyStyle = function(a) {
            a.checkApplicable(this.elementPath()) && v.call(a, this.getSelection());
        }, CKEDITOR.editor.prototype.removeStyle = function(a) {
            a.checkApplicable(this.elementPath()) && v.call(a, this.getSelection(), 1);
        }, CKEDITOR.style.prototype = {
            apply: function(a) {
                v.call(this, a.getSelection());
            },
            remove: function(a) {
                v.call(this, a.getSelection(), 1);
            },
            applyToRange: function(a) {
                return (this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? g : this.type == CKEDITOR.STYLE_OBJECT ? e : null).call(this, a);
            },
            removeFromRange: function(a) {
                return (this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? h : this.type == CKEDITOR.STYLE_OBJECT ? f : null).call(this, a);
            },
            applyToObject: function(a) {
                r(a, this);
            },
            checkActive: function(a) {
                switch (this.type) {
                  case CKEDITOR.STYLE_BLOCK:
                    return this.checkElementRemovable(a.block || a.blockLimit, !0);

                  case CKEDITOR.STYLE_OBJECT:
                  case CKEDITOR.STYLE_INLINE:
                    for (var b, c = a.elements, d = 0; d < c.length; d++) if (b = c[d], this.type != CKEDITOR.STYLE_INLINE || b != a.block && b != a.blockLimit) {
                        if (this.type == CKEDITOR.STYLE_OBJECT) {
                            var e = b.getName();
                            if (!("string" == typeof this.element ? e == this.element : e in this.element)) continue;
                        }
                        if (this.checkElementRemovable(b, !0)) return !0;
                    }
                }
                return !1;
            },
            checkApplicable: function(a, b) {
                if (b && !b.check(this)) return !1;
                switch (this.type) {
                  case CKEDITOR.STYLE_OBJECT:
                    return !!a.contains(this.element);

                  case CKEDITOR.STYLE_BLOCK:
                    return !!a.blockLimit.getDtd()[this.element];
                }
                return !0;
            },
            checkElementMatch: function(a, b) {
                var c = this._.definition;
                if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
                var d = a.getName();
                if ("string" == typeof this.element ? d == this.element : d in this.element) {
                    if (!b && !a.hasAttributes()) return !0;
                    if (d = c._AC) c = d; else {
                        var d = {}, e = 0, f = c.attributes;
                        if (f) for (var g in f) e++, d[g] = f[g];
                        (g = CKEDITOR.style.getStyleText(c)) && (d.style || e++, d.style = g), d._length = e, 
                        c = c._AC = d;
                    }
                    if (!c._length) return !0;
                    for (var h in c) if ("_length" != h) {
                        if (e = a.getAttribute(h) || "", "style" == h) a: {
                            d = c[h], "string" == typeof d && (d = CKEDITOR.tools.parseCssText(d)), "string" == typeof e && (e = CKEDITOR.tools.parseCssText(e, !0)), 
                            g = void 0;
                            for (g in d) if (!(g in e) || e[g] != d[g] && "inherit" != d[g] && "inherit" != e[g]) {
                                d = !1;
                                break a;
                            }
                            d = !0;
                        } else d = c[h] == e;
                        if (d) {
                            if (!b) return !0;
                        } else if (b) return !1;
                    }
                    if (b) return !0;
                }
                return !1;
            },
            checkElementRemovable: function(a, b) {
                if (this.checkElementMatch(a, b)) return !0;
                var c = t(this)[a.getName()];
                if (c) {
                    var d;
                    if (!(c = c.attributes)) return !0;
                    for (var e = 0; e < c.length; e++) if (d = c[e][0], d = a.getAttribute(d)) {
                        var f = c[e][1];
                        if (null === f || "string" == typeof f && d == f || f.test(d)) return !0;
                    }
                }
                return !1;
            },
            buildPreview: function(a) {
                var b = this._.definition, c = [], d = b.element;
                "bdo" == d && (d = "span");
                var c = [ "<", d ], e = b.attributes;
                if (e) for (var f in e) c.push(" ", f, '="', e[f], '"');
                return (e = CKEDITOR.style.getStyleText(b)) && c.push(' style="', e, '"'), c.push(">", a || b.name, "</", d, ">"), 
                c.join("");
            },
            getDefinition: function() {
                return this._.definition;
            }
        }, CKEDITOR.style.getStyleText = function(a) {
            var b = a._ST;
            if (b) return b;
            var b = a.styles, c = a.attributes && a.attributes.style || "", d = "";
            c.length && (c = c.replace(y, ";"));
            for (var e in b) {
                var f = b[e], g = (e + ":" + f).replace(y, ";");
                "inherit" == f ? d += g : c += g;
            }
            return c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)), a._ST = c + d;
        };
        var C = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, D = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED;
    }(), CKEDITOR.styleCommand = function(a, b) {
        this.requiredContent = this.allowedContent = this.style = a, CKEDITOR.tools.extend(this, b, !0);
    }, CKEDITOR.styleCommand.prototype.exec = function(a) {
        a.focus(), this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style);
    }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), 
    CKEDITOR.loadStylesSet = function(a, b, c) {
        CKEDITOR.stylesSet.addExternal(a, b, ""), CKEDITOR.stylesSet.load(a, c);
    }, CKEDITOR.editor.prototype.getStylesSet = function(a) {
        if (this._.stylesDefinitions) a(this._.stylesDefinitions); else {
            var b = this, c = b.config.stylesCombo_stylesSet || b.config.stylesSet;
            if (c === !1) a(null); else if (c instanceof Array) b._.stylesDefinitions = c, a(c); else {
                c || (c = "default");
                var c = c.split(":"), d = c[0];
                CKEDITOR.stylesSet.addExternal(d, c[1] ? c.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""), 
                CKEDITOR.stylesSet.load(d, function(c) {
                    b._.stylesDefinitions = c[d], a(b._.stylesDefinitions);
                });
            }
        }
    }, CKEDITOR.dom.comment = function(a, b) {
        "string" == typeof a && (a = (b ? b.$ : document).createComment(a)), CKEDITOR.dom.domObject.call(this, a);
    }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node(), CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
        type: CKEDITOR.NODE_COMMENT,
        getOuterHtml: function() {
            return "<!--" + this.$.nodeValue + "-->";
        }
    }), function() {
        var a, b = {}, c = {};
        for (a in CKEDITOR.dtd.$blockLimit) a in CKEDITOR.dtd.$list || (b[a] = 1);
        for (a in CKEDITOR.dtd.$block) a in CKEDITOR.dtd.$blockLimit || a in CKEDITOR.dtd.$empty || (c[a] = 1);
        CKEDITOR.dom.elementPath = function(a, d) {
            var e, f = null, g = null, h = [], i = a, d = d || a.getDocument().getBody();
            do if (i.type == CKEDITOR.NODE_ELEMENT) {
                if (h.push(i), !this.lastElement && (this.lastElement = i, i.is(CKEDITOR.dtd.$object) || "false" == i.getAttribute("contenteditable"))) continue;
                if (i.equals(d)) break;
                if (!g && (e = i.getName(), "true" == i.getAttribute("contenteditable") ? g = i : !f && c[e] && (f = i), 
                b[e])) {
                    var j;
                    if (j = !f) {
                        if (e = "div" == e) {
                            a: {
                                e = i.getChildren(), j = 0;
                                for (var k = e.count(); k > j; j++) {
                                    var l = e.getItem(j);
                                    if (l.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[l.getName()]) {
                                        e = !0;
                                        break a;
                                    }
                                }
                                e = !1;
                            }
                            e = !e;
                        }
                        j = e;
                    }
                    j ? f = i : g = i;
                }
            } while (i = i.getParent());
            g || (g = d), this.block = f, this.blockLimit = g, this.root = d, this.elements = h;
        };
    }(), CKEDITOR.dom.elementPath.prototype = {
        compare: function(a) {
            var b = this.elements, a = a && a.elements;
            if (!a || b.length != a.length) return !1;
            for (var c = 0; c < b.length; c++) if (!b[c].equals(a[c])) return !1;
            return !0;
        },
        contains: function(a, b, c) {
            var d;
            "string" == typeof a && (d = function(b) {
                return b.getName() == a;
            }), a instanceof CKEDITOR.dom.element ? d = function(b) {
                return b.equals(a);
            } : CKEDITOR.tools.isArray(a) ? d = function(b) {
                return CKEDITOR.tools.indexOf(a, b.getName()) > -1;
            } : "function" == typeof a ? d = a : "object" == typeof a && (d = function(b) {
                return b.getName() in a;
            });
            var e = this.elements, f = e.length;
            for (b && f--, c && (e = Array.prototype.slice.call(e, 0), e.reverse()), b = 0; f > b; b++) if (d(e[b])) return e[b];
            return null;
        },
        isContextFor: function(a) {
            var b;
            return a in CKEDITOR.dtd.$block ? (b = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, 
            !!b.getDtd()[a]) : !0;
        },
        direction: function() {
            return (this.block || this.blockLimit || this.root).getDirection(1);
        }
    }, CKEDITOR.dom.text = function(a, b) {
        "string" == typeof a && (a = (b ? b.$ : document).createTextNode(a)), this.$ = a;
    }, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node(), CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT,
        getLength: function() {
            return this.$.nodeValue.length;
        },
        getText: function() {
            return this.$.nodeValue;
        },
        setText: function(a) {
            this.$.nodeValue = a;
        },
        split: function(a) {
            var b = this.$.parentNode, c = b.childNodes.length, d = this.getLength(), e = this.getDocument(), f = new CKEDITOR.dom.text(this.$.splitText(a), e);
            return b.childNodes.length == c && (a >= d ? (f = e.createText(""), f.insertAfter(this)) : (a = e.createText(""), 
            a.insertAfter(f), a.remove())), f;
        },
        substring: function(a, b) {
            return "number" != typeof b ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, b);
        }
    }), function() {
        function a(a, b, c) {
            var d = a.serializable, e = b[c ? "endContainer" : "startContainer"], f = c ? "endOffset" : "startOffset", g = d ? b.document.getById(a.startNode) : a.startNode, a = d ? b.document.getById(a.endNode) : a.endNode;
            return e.equals(g.getPrevious()) ? (b.startOffset = b.startOffset - e.getLength() - a.getPrevious().getLength(), 
            e = a.getNext()) : e.equals(a.getPrevious()) && (b.startOffset = b.startOffset - e.getLength(), 
            e = a.getNext()), e.equals(g.getParent()) && b[f]++, e.equals(a.getParent()) && b[f]++, 
            b[c ? "endContainer" : "startContainer"] = e, b;
        }
        CKEDITOR.dom.rangeList = function(a) {
            return a instanceof CKEDITOR.dom.rangeList ? a : (a ? a instanceof CKEDITOR.dom.range && (a = [ a ]) : a = [], 
            CKEDITOR.tools.extend(a, b));
        };
        var b = {
            createIterator: function() {
                var a, b = this, c = CKEDITOR.dom.walker.bookmark(), d = [];
                return {
                    getNextRange: function(e) {
                        a = void 0 == a ? 0 : a + 1;
                        var f = b[a];
                        if (f && b.length > 1) {
                            if (!a) for (var g = b.length - 1; g >= 0; g--) d.unshift(b[g].createBookmark(!0));
                            if (e) for (var h = 0; b[a + h + 1]; ) {
                                for (var i = f.document, e = 0, g = i.getById(d[h].endNode), i = i.getById(d[h + 1].startNode); ;) {
                                    if (g = g.getNextSourceNode(!1), i.equals(g)) e = 1; else if (c(g) || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) continue;
                                    break;
                                }
                                if (!e) break;
                                h++;
                            }
                            for (f.moveToBookmark(d.shift()); h--; ) g = b[++a], g.moveToBookmark(d.shift()), 
                            f.setEnd(g.endContainer, g.endOffset);
                        }
                        return f;
                    }
                };
            },
            createBookmarks: function(b) {
                for (var c, d = [], e = 0; e < this.length; e++) {
                    d.push(c = this[e].createBookmark(b, !0));
                    for (var f = e + 1; f < this.length; f++) this[f] = a(c, this[f]), this[f] = a(c, this[f], !0);
                }
                return d;
            },
            createBookmarks2: function(a) {
                for (var b = [], c = 0; c < this.length; c++) b.push(this[c].createBookmark2(a));
                return b;
            },
            moveToBookmarks: function(a) {
                for (var b = 0; b < this.length; b++) this[b].moveToBookmark(a[b]);
            }
        };
    }(), function() {
        function a() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/");
        }
        function b(b) {
            var c = CKEDITOR.skin["ua_" + b], d = CKEDITOR.env;
            if (c) for (var e, c = c.split(",").sort(function(a, b) {
                return a > b ? -1 : 1;
            }), f = 0; f < c.length; f++) if (e = c[f], d.ie && (e.replace(/^ie/, "") == d.version || d.quirks && "iequirks" == e) && (e = "ie"), 
            d[e]) {
                b += "_" + c[f];
                break;
            }
            return CKEDITOR.getUrl(a() + b + ".css");
        }
        function c(a, c) {
            f[a] || (CKEDITOR.document.appendStyleSheet(b(a)), f[a] = 1), c && c();
        }
        function d(a) {
            var b = a.getById(g);
            return b || (b = a.getHead().append("style"), b.setAttribute("id", g), b.setAttribute("type", "text/css")), 
            b;
        }
        function e(a, b, c) {
            var d, e, f;
            if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), e = 0; e < b.length; e++) b[e] = b[e].split("{");
            for (var g = 0; g < a.length; g++) if (CKEDITOR.env.webkit) for (e = 0; e < b.length; e++) {
                for (f = b[e][1], d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
                a[g].$.sheet.addRule(b[e][0], f);
            } else {
                for (f = b, d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
                CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? a[g].$.styleSheet.cssText = a[g].$.styleSheet.cssText + f : a[g].$.innerHTML = a[g].$.innerHTML + f;
            }
        }
        var f = {};
        CKEDITOR.skin = {
            path: a,
            loadPart: function(b, d) {
                CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() {
                    c(b, d);
                }) : c(b, d);
            },
            getPath: function(a) {
                return CKEDITOR.getUrl(b(a));
            },
            icons: {},
            addIcon: function(a, b, c, d) {
                a = a.toLowerCase(), this.icons[a] || (this.icons[a] = {
                    path: b,
                    offset: c || 0,
                    bgsize: d || "16px"
                });
            },
            getIconStyle: function(a, b, c, d, e) {
                var f;
                return a && (a = a.toLowerCase(), b && (f = this.icons[a + "-rtl"]), f || (f = this.icons[a])), 
                a = c || f && f.path || "", d = d || f && f.offset, e = e || f && f.bgsize || "16px", 
                a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;background-size:" + e + ";";
            }
        }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function() {
                return this.uiColor;
            },
            setUiColor: function(a) {
                var b = d(CKEDITOR.document);
                return (this.setUiColor = function(a) {
                    var c = CKEDITOR.skin.chameleon, d = [ [ i, a ] ];
                    this.uiColor = a, e([ b ], c(this, "editor"), d), e(h, c(this, "panel"), d);
                }).call(this, a);
            }
        });
        var g = "cke_ui_color", h = [], i = /\$color/g;
        CKEDITOR.on("instanceLoaded", function(a) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var b = a.editor, a = function(a) {
                    if (a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(), 
                    !a.getById("cke_ui_color")) {
                        a = d(a), h.push(a);
                        var c = b.getUiColor();
                        c && e([ a ], CKEDITOR.skin.chameleon(b, "panel"), [ [ i, c ] ]);
                    }
                };
                b.on("panelShow", a), b.on("menuShow", a), b.config.uiColor && b.setUiColor(b.config.uiColor);
            }
        });
    }(), function() {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1; else {
            var a = CKEDITOR.dom.element.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;border: 1px solid;border-color: red blue;"></div>', CKEDITOR.document);
            a.appendTo(CKEDITOR.document.getHead());
            try {
                CKEDITOR.env.hc = a.getComputedStyle("border-top-color") == a.getComputedStyle("border-right-color");
            } catch (b) {
                CKEDITOR.env.hc = !1;
            }
            a.remove();
        }
        if (CKEDITOR.env.hc && (CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc"), 
        CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"), CKEDITOR.status = "loaded", 
        CKEDITOR.fireOnce("loaded"), a = CKEDITOR._.pending) {
            delete CKEDITOR._.pending;
            for (var c = 0; c < a.length; c++) CKEDITOR.editor.prototype.constructor.apply(a[c][0], a[c][1]), 
            CKEDITOR.add(a[c][0]);
        }
    }(), CKEDITOR.skin.name = "moono", CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko", 
    CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera", CKEDITOR.skin.chameleon = function() {
        var a = function() {
            return function(a, b) {
                for (var c = a.match(/[^#]./g), d = 0; 3 > d; d++) {
                    var e, f = c, g = d;
                    e = parseInt(c[d], 16), e = ("0" + (0 > b ? 0 | e * (1 + b) : 0 | e + (255 - e) * b).toString(16)).slice(-2), 
                    f[g] = e;
                }
                return "#" + c.join("");
            };
        }(), b = function() {
            var a = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
            return function(b, c) {
                return a.output({
                    from: b,
                    to: c
                });
            };
        }(), c = {
            editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
            panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
        };
        return function(d, e) {
            var f = d.uiColor, f = {
                id: "." + d.id,
                defaultBorder: a(f, -.1),
                defaultGradient: b(a(f, .9), f),
                lightGradient: b(a(f, 1), a(f, .7)),
                mediumGradient: b(a(f, .8), a(f, .5)),
                ckeButtonOn: b(a(f, .6), a(f, .7)),
                ckeResizer: a(f, -.4),
                ckeToolbarSeparator: a(f, .5),
                ckeColorauto: a(f, .8),
                dialogBody: a(f, .7),
                dialogTabSelected: b("#FFFFFF", "#FFFFFF"),
                dialogTabSelectedBorder: "#FFF",
                elementsPathColor: a(f, -.6),
                elementsPathBg: f,
                menubuttonIcon: a(f, .5),
                menubuttonIconHover: a(f, .3)
            };
            return c[e].output(f).replace(/\[/g, "{").replace(/\]/g, "}");
        };
    }(), CKEDITOR.plugins.add("dialogui", {
        onLoad: function() {
            var a = function(a) {
                this._ || (this._ = {}), this._["default"] = this._.initValue = a["default"] || "", 
                this._.required = a.required || !1;
                for (var b = [ this._ ], c = 1; c < arguments.length; c++) b.push(arguments[c]);
                return b.push(!0), CKEDITOR.tools.extend.apply(CKEDITOR.tools, b), this._;
            }, b = {
                build: function(a, b, c) {
                    return new CKEDITOR.ui.dialog.textInput(a, b, c);
                }
            }, c = {
                build: function(a, b, c) {
                    return new CKEDITOR.ui.dialog[b.type](a, b, c);
                }
            }, d = {
                isChanged: function() {
                    return this.getValue() != this.getInitValue();
                },
                reset: function(a) {
                    this.setValue(this.getInitValue(), a);
                },
                setInitValue: function() {
                    this._.initValue = this.getValue();
                },
                resetInitValue: function() {
                    this._.initValue = this._["default"];
                },
                getInitValue: function() {
                    return this._.initValue;
                }
            }, e = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function(a, b) {
                    this._.domOnChangeRegistered || (a.on("load", function() {
                        this.getInputElement().on("change", function() {
                            a.parts.dialog.isVisible() && this.fire("change", {
                                value: this.getValue()
                            });
                        }, this);
                    }, this), this._.domOnChangeRegistered = !0), this.on("change", b);
                }
            }, !0), f = /^on([A-Z]\w+)/, g = function(a) {
                for (var b in a) (f.test(b) || "title" == b || "type" == b) && delete a[b];
                return a;
            };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function(b, c, d, e) {
                    if (!(4 > arguments.length)) {
                        var f = a.call(this, c);
                        f.labelId = CKEDITOR.tools.getNextId() + "_label", this._.children = [], CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "div", null, {
                            role: "presentation"
                        }, function() {
                            var a = [], d = c.required ? " cke_required" : "";
                            return "horizontal" != c.labelLayout ? a.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + f.labelId + '"', f.inputId ? ' for="' + f.inputId + '"' : "", (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">", c.label, "</label>", '<div class="cke_dialog_ui_labeled_content"', c.controlStyle ? ' style="' + c.controlStyle + '"' : "", ' role="radiogroup" aria-labelledby="' + f.labelId + '">', e.call(this, b, c), "</div>") : (d = {
                                type: "hbox",
                                widths: c.widths,
                                padding: 0,
                                children: [ {
                                    type: "html",
                                    html: '<label class="cke_dialog_ui_labeled_label' + d + '" id="' + f.labelId + '" for="' + f.inputId + '"' + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(c.label) + "</span>"
                                }, {
                                    type: "html",
                                    html: '<span class="cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style="' + c.controlStyle + '"' : "") + ">" + e.call(this, b, c) + "</span>"
                                } ]
                            }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, d, a)), a.join("");
                        });
                    }
                },
                textInput: function(b, c, d) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c);
                        var e = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", f = {
                            "class": "cke_dialog_ui_input_" + c.type,
                            id: e,
                            type: c.type
                        };
                        c.validate && (this.validate = c.validate), c.maxLength && (f.maxlength = c.maxLength), 
                        c.size && (f.size = c.size), c.inputStyle && (f.style = c.inputStyle);
                        var g = this, h = !1;
                        b.on("load", function() {
                            g.getInputElement().on("keydown", function(a) {
                                13 == a.data.getKeystroke() && (h = !0);
                            }), g.getInputElement().on("keyup", function(a) {
                                13 == a.data.getKeystroke() && h && (b.getButton("ok") && setTimeout(function() {
                                    b.getButton("ok").click();
                                }, 0), h = !1);
                            }, null, null, 1e3);
                        }), CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                            var a = [ '<div class="cke_dialog_ui_input_', c.type, '" role="presentation"' ];
                            c.width && a.push('style="width:' + c.width + '" '), a.push("><input "), f["aria-labelledby"] = this._.labelId, 
                            this._.required && (f["aria-required"] = this._.required);
                            for (var b in f) a.push(b + '="' + f[b] + '" ');
                            return a.push(" /></div>"), a.join("");
                        });
                    }
                },
                textarea: function(b, c, d) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c);
                        var e = this, f = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", g = {};
                        c.validate && (this.validate = c.validate), g.rows = c.rows || 5, g.cols = c.cols || 20, 
                        g["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || ""), "undefined" != typeof c.inputStyle && (g.style = c.inputStyle), 
                        c.dir && (g.dir = c.dir), CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                            g["aria-labelledby"] = this._.labelId, this._.required && (g["aria-required"] = this._.required);
                            var a, b = [ '<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', f, '" ' ];
                            for (a in g) b.push(a + '="' + CKEDITOR.tools.htmlEncode(g[a]) + '" ');
                            return b.push(">", CKEDITOR.tools.htmlEncode(e._["default"]), "</textarea></div>"), 
                            b.join("");
                        });
                    }
                },
                checkbox: function(b, c, d) {
                    if (!(3 > arguments.length)) {
                        var e = a.call(this, c, {
                            "default": !!c["default"]
                        });
                        c.validate && (this.validate = c.validate), CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "span", null, null, function() {
                            var a = CKEDITOR.tools.extend({}, c, {
                                id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
                            }, !0), d = [], f = CKEDITOR.tools.getNextId() + "_label", h = {
                                "class": "cke_dialog_ui_checkbox_input",
                                type: "checkbox",
                                "aria-labelledby": f
                            };
                            return g(a), c["default"] && (h.checked = "checked"), "undefined" != typeof a.inputStyle && (a.style = a.inputStyle), 
                            e.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, d, "input", null, h), d.push(' <label id="', f, '" for="', h.id, '"' + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(c.label), "</label>"), 
                            d.join("");
                        });
                    }
                },
                radio: function(b, c, d) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c), this._["default"] || (this._["default"] = this._.initValue = c.items[0][1]), 
                        c.validate && (this.validate = c.valdiate);
                        var e = [], f = this;
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                            for (var a = [], d = [], h = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", i = 0; i < c.items.length; i++) {
                                var j = c.items[i], k = void 0 !== j[2] ? j[2] : j[0], l = void 0 !== j[1] ? j[1] : j[0], m = CKEDITOR.tools.getNextId() + "_radio_input", n = m + "_label", m = CKEDITOR.tools.extend({}, c, {
                                    id: m,
                                    title: null,
                                    type: null
                                }, !0), k = CKEDITOR.tools.extend({}, m, {
                                    title: k
                                }, !0), o = {
                                    type: "radio",
                                    "class": "cke_dialog_ui_radio_input",
                                    name: h,
                                    value: l,
                                    "aria-labelledby": n
                                }, p = [];
                                f._["default"] == l && (o.checked = "checked"), g(m), g(k), "undefined" != typeof m.inputStyle && (m.style = m.inputStyle), 
                                m.keyboardFocusable = !0, e.push(new CKEDITOR.ui.dialog.uiElement(b, m, p, "input", null, o)), 
                                p.push(" "), new CKEDITOR.ui.dialog.uiElement(b, k, p, "label", null, {
                                    id: n,
                                    "for": o.id
                                }, j[0]), a.push(p.join(""));
                            }
                            return new CKEDITOR.ui.dialog.hbox(b, e, a, d), d.join("");
                        }), this._.children = e;
                    }
                },
                button: function(b, c, d) {
                    if (arguments.length) {
                        "function" == typeof c && (c = c(b.getParentEditor())), a.call(this, c, {
                            disabled: c.disabled || !1
                        }), CKEDITOR.event.implementOn(this);
                        var e = this;
                        b.on("load", function() {
                            var a = this.getElement();
                            !function() {
                                a.on("click", function(a) {
                                    e.click(), a.data.preventDefault();
                                }), a.on("keydown", function(a) {
                                    a.data.getKeystroke() in {
                                        32: 1
                                    } && (e.click(), a.data.preventDefault());
                                });
                            }(), a.unselectable();
                        }, this);
                        var f = CKEDITOR.tools.extend({}, c);
                        delete f.style;
                        var g = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, b, f, d, "a", null, {
                            style: c.style,
                            href: "javascript:void(0)",
                            title: c.label,
                            hidefocus: "true",
                            "class": c["class"],
                            role: "button",
                            "aria-labelledby": g
                        }, '<span id="' + g + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(c.label) + "</span>");
                    }
                },
                select: function(b, c, d) {
                    if (!(3 > arguments.length)) {
                        var e = a.call(this, c);
                        c.validate && (this.validate = c.validate), e.inputId = CKEDITOR.tools.getNextId() + "_select", 
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                            var a = CKEDITOR.tools.extend({}, c, {
                                id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
                            }, !0), d = [], f = [], h = {
                                id: e.inputId,
                                "class": "cke_dialog_ui_input_select",
                                "aria-labelledby": this._.labelId
                            };
                            d.push('<div class="cke_dialog_ui_input_', c.type, '" role="presentation"'), c.width && d.push('style="width:' + c.width + '" '), 
                            d.push(">"), void 0 != c.size && (h.size = c.size), void 0 != c.multiple && (h.multiple = c.multiple), 
                            g(a);
                            for (var i, j = 0; j < c.items.length && (i = c.items[j]); j++) f.push('<option value="', CKEDITOR.tools.htmlEncode(void 0 !== i[1] ? i[1] : i[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(i[0]));
                            return "undefined" != typeof a.inputStyle && (a.style = a.inputStyle), e.select = new CKEDITOR.ui.dialog.uiElement(b, a, d, "select", null, h, f.join("")), 
                            d.push("</div>"), d.join("");
                        });
                    }
                },
                file: function(b, c, d) {
                    if (!(3 > arguments.length)) {
                        void 0 === c["default"] && (c["default"] = "");
                        var e = CKEDITOR.tools.extend(a.call(this, c), {
                            definition: c,
                            buttons: []
                        });
                        c.validate && (this.validate = c.validate), b.on("load", function() {
                            CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file");
                        }), CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                            e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var a = [ '<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', e.frameId, '" title="', c.label, '" src="javascript:void(' ];
                            return a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"), 
                            a.push(')"></iframe>'), a.join("");
                        });
                    }
                },
                fileButton: function(b, c, d) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c);
                        var e = this;
                        c.validate && (this.validate = c.validate);
                        var f = CKEDITOR.tools.extend({}, c), g = f.onClick;
                        f.className = (f.className ? f.className + " " : "") + "cke_dialog_ui_button", f.onClick = function(a) {
                            var d = c["for"];
                            g && g.call(this, a) === !1 || (b.getContentElement(d[0], d[1]).submit(), this.disable());
                        }, b.on("load", function() {
                            b.getContentElement(c["for"][0], c["for"][1])._.buttons.push(e);
                        }), CKEDITOR.ui.dialog.button.call(this, b, f, d);
                    }
                },
                html: function() {
                    var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/;
                    return function(d, e, f) {
                        if (!(3 > arguments.length)) {
                            var g = [], h = e.html;
                            "<" != h.charAt(0) && (h = "<span>" + h + "</span>");
                            var i = e.focus;
                            if (i) {
                                var j = this.focus;
                                this.focus = function() {
                                    ("function" == typeof i ? i : j).call(this), this.fire("focus");
                                }, e.isFocusable && (this.isFocusable = this.isFocusable), this.keyboardFocusable = !0;
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, d, e, g, "span", null, null, ""), g = g.join("").match(a), 
                            h = h.match(b) || [ "", "", "" ], c.test(h[1]) && (h[1] = h[1].slice(0, -1), h[2] = "/" + h[2]), 
                            f.push([ h[1], " ", g[1] || "", h[2] ].join(""));
                        }
                    };
                }(),
                fieldset: function(a, b, c, d, e) {
                    var f = e.label;
                    this._ = {
                        children: b
                    }, CKEDITOR.ui.dialog.uiElement.call(this, a, e, d, "fieldset", null, null, function() {
                        var a = [];
                        f && a.push("<legend" + (e.labelStyle ? ' style="' + e.labelStyle + '"' : "") + ">" + f + "</legend>");
                        for (var b = 0; b < c.length; b++) a.push(c[b]);
                        return a.join("");
                    });
                }
            }, !0), CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement(), 
            CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
                setLabel: function(a) {
                    var b = CKEDITOR.document.getById(this._.labelId);
                    return 1 > b.getChildCount() ? new CKEDITOR.dom.text(a, CKEDITOR.document).appendTo(b) : b.getChild(0).$.nodeValue = a, 
                    this;
                },
                getLabel: function() {
                    var a = CKEDITOR.document.getById(this._.labelId);
                    return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText();
                },
                eventProcessors: e
            }, !0), CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
                click: function() {
                    return this._.disabled ? !1 : this.fire("click", {
                        dialog: this._.dialog
                    });
                },
                enable: function() {
                    this._.disabled = !1;
                    var a = this.getElement();
                    a && a.removeClass("cke_disabled");
                },
                disable: function() {
                    this._.disabled = !0, this.getElement().addClass("cke_disabled");
                },
                isVisible: function() {
                    return this.getElement().getFirst().isVisible();
                },
                isEnabled: function() {
                    return !this._.disabled;
                },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onClick: function(a, b) {
                        this.on("click", function() {
                            b.apply(this, arguments);
                        });
                    }
                }, !0),
                accessKeyUp: function() {
                    this.click();
                },
                accessKeyDown: function() {
                    this.focus();
                },
                keyboardFocusable: !0
            }, !0), CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), {
                getInputElement: function() {
                    return CKEDITOR.document.getById(this._.inputId);
                },
                focus: function() {
                    var a = this.selectParentTab();
                    setTimeout(function() {
                        var b = a.getInputElement();
                        b && b.$.focus();
                    }, 0);
                },
                select: function() {
                    var a = this.selectParentTab();
                    setTimeout(function() {
                        var b = a.getInputElement();
                        b && (b.$.focus(), b.$.select());
                    }, 0);
                },
                accessKeyUp: function() {
                    this.select();
                },
                setValue: function(a) {
                    return !a && (a = ""), CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments);
                },
                keyboardFocusable: !0
            }, d, !0), CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput(), 
            CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), {
                getInputElement: function() {
                    return this._.select.getElement();
                },
                add: function(a, b, c) {
                    var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), e = this.getInputElement().$;
                    return d.$.text = a, d.$.value = void 0 === b || null === b ? a : b, void 0 === c || null === c ? CKEDITOR.env.ie ? e.add(d.$) : e.add(d.$, null) : e.add(d.$, c), 
                    this;
                },
                remove: function(a) {
                    return this.getInputElement().$.remove(a), this;
                },
                clear: function() {
                    for (var a = this.getInputElement().$; 0 < a.length; ) a.remove(0);
                    return this;
                },
                keyboardFocusable: !0
            }, d, !0), CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
                getInputElement: function() {
                    return this._.checkbox.getElement();
                },
                setValue: function(a, b) {
                    this.getInputElement().$.checked = a, !b && this.fire("change", {
                        value: a
                    });
                },
                getValue: function() {
                    return this.getInputElement().$.checked;
                },
                accessKeyUp: function() {
                    this.setValue(!this.getValue());
                },
                eventProcessors: {
                    onChange: function(a, b) {
                        return !CKEDITOR.env.ie || 8 < CKEDITOR.env.version ? e.onChange.apply(this, arguments) : (a.on("load", function() {
                            var a = this._.checkbox.getElement();
                            a.on("propertychange", function(b) {
                                b = b.data.$, "checked" == b.propertyName && this.fire("change", {
                                    value: a.$.checked
                                });
                            }, this);
                        }, this), this.on("change", b), null);
                    }
                },
                keyboardFocusable: !0
            }, d, !0), CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
                setValue: function(a, b) {
                    for (var c, d = this._.children, e = 0; e < d.length && (c = d[e]); e++) c.getElement().$.checked = c.getValue() == a;
                    !b && this.fire("change", {
                        value: a
                    });
                },
                getValue: function() {
                    for (var a = this._.children, b = 0; b < a.length; b++) if (a[b].getElement().$.checked) return a[b].getValue();
                    return null;
                },
                accessKeyUp: function() {
                    var a, b = this._.children;
                    for (a = 0; a < b.length; a++) if (b[a].getElement().$.checked) return void b[a].getElement().focus();
                    b[0].getElement().focus();
                },
                eventProcessors: {
                    onChange: function(a, b) {
                        return CKEDITOR.env.ie ? (a.on("load", function() {
                            for (var a = this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) {
                                a = a.data.$, "checked" == a.propertyName && this.$.checked && b.fire("change", {
                                    value: this.getAttribute("value")
                                });
                            });
                        }, this), this.on("change", b), null) : e.onChange.apply(this, arguments);
                    }
                }
            }, d, !0), CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), d, {
                getInputElement: function() {
                    var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement();
                },
                submit: function() {
                    return this.getInputElement().getParent().$.submit(), this;
                },
                getAction: function() {
                    return this.getInputElement().getParent().$.action;
                },
                registerEvents: function(a) {
                    var b, c, d = /^on([A-Z]\w+)/, e = function(a, b, c, d) {
                        a.on("formLoaded", function() {
                            a.getInputElement().on(c, d, a);
                        });
                    };
                    for (c in a) (b = c.match(d)) && (this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, a[c]) : e(this, this._.dialog, b[1].toLowerCase(), a[c]));
                    return this;
                },
                reset: function() {
                    function a() {
                        c.$.open();
                        var a = "";
                        d.size && (a = d.size - (CKEDITOR.env.ie ? 7 : 0));
                        var j = b.frameId + "_input";
                        for (c.$.write([ '<html dir="' + h + '" lang="' + i + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + h + '" lang="' + i + '" action="', CKEDITOR.tools.htmlEncode(d.action), '"><label id="', b.labelId, '" for="', j, '" style="display:none">', CKEDITOR.tools.htmlEncode(d.label), '</label><input id="', j, '" aria-labelledby="', b.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(a > 0 ? a : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + g + ")}", "</script>" ].join("")), 
                        c.$.close(), a = 0; a < e.length; a++) e[a].enable();
                    }
                    var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, e = b.buttons, f = this.formLoadedNumber, g = this.formUnloadNumber, h = b.dialog._.editor.lang.dir, i = b.dialog._.editor.langCode;
                    f || (f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
                        this.fire("formLoaded");
                    }, this), g = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
                        this.getInputElement().clearCustomData();
                    }, this), this.getDialog()._.editor.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(f), CKEDITOR.tools.removeFunction(g);
                    })), CKEDITOR.env.gecko ? setTimeout(a, 500) : a();
                },
                getValue: function() {
                    return this.getInputElement().$.value || "";
                },
                setInitValue: function() {
                    this._.initValue = "";
                },
                eventProcessors: {
                    onChange: function(a, b) {
                        this._.domOnChangeRegistered || (this.on("formLoaded", function() {
                            this.getInputElement().on("change", function() {
                                this.fire("change", {
                                    value: this.getValue()
                                });
                            }, this);
                        }, this), this._.domOnChangeRegistered = !0), this.on("change", b);
                    }
                },
                keyboardFocusable: !0
            }, !0), CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button(), 
            CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype), 
            CKEDITOR.dialog.addUIElement("text", b), CKEDITOR.dialog.addUIElement("password", b), 
            CKEDITOR.dialog.addUIElement("textarea", c), CKEDITOR.dialog.addUIElement("checkbox", c), 
            CKEDITOR.dialog.addUIElement("radio", c), CKEDITOR.dialog.addUIElement("button", c), 
            CKEDITOR.dialog.addUIElement("select", c), CKEDITOR.dialog.addUIElement("file", c), 
            CKEDITOR.dialog.addUIElement("fileButton", c), CKEDITOR.dialog.addUIElement("html", c), 
            CKEDITOR.dialog.addUIElement("fieldset", {
                build: function(a, b, c) {
                    for (var d, e = b.children, f = [], g = [], h = 0; h < e.length && (d = e[h]); h++) {
                        var i = [];
                        f.push(i), g.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a, d, i));
                    }
                    return new CKEDITOR.ui.dialog[b.type](a, g, f, c, b);
                }
            });
        }
    }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, 
    CKEDITOR.DIALOG_RESIZE_BOTH = 3, function() {
        function a() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null;
        }
        function b() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; b + a > c; c++) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null;
        }
        function c(a, b) {
            for (var c = a.$.getElementsByTagName("input"), d = 0, e = c.length; e > d; d++) {
                var f = new CKEDITOR.dom.element(c[d]);
                "text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), 
                f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), 
                f.setAttribute("value", "")));
            }
        }
        function d(a, b) {
            var c = this.getInputElement();
            c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0)), 
            a || (this.select ? this.select() : this.focus()), b && alert(b), this.fire("validated", {
                valid: a,
                msg: b
            });
        }
        function e() {
            var a = this.getInputElement();
            a && a.removeAttribute("aria-invalid");
        }
        function f(a) {
            var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", p).output({
                id: CKEDITOR.tools.getNextNumber(),
                editorId: a.id,
                langDir: a.lang.dir,
                langCode: a.langCode,
                editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
                closeTitle: a.lang.common.close,
                hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
            })), b = a.getChild([ 0, 0, 0, 0, 0 ]), c = b.getChild(0), d = b.getChild(1);
            if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) {
                var e = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())";
                CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + e + '" tabIndex="-1"></iframe>').appendTo(b.getParent());
            }
            return c.unselectable(), d.unselectable(), {
                element: a,
                parts: {
                    dialog: a.getChild(0),
                    title: c,
                    close: d,
                    tabs: b.getChild(2),
                    contents: b.getChild([ 3, 0, 0, 0 ]),
                    footer: b.getChild([ 3, 0, 1, 0 ])
                }
            };
        }
        function g(a, b, c) {
            this.element = b, this.focusIndex = c, this.tabIndex = 0, this.isFocusable = function() {
                return !b.getAttribute("disabled") && b.isVisible();
            }, this.focus = function() {
                a._.currentFocusIndex = this.focusIndex, this.element.focus();
            }, b.on("keydown", function(a) {
                a.data.getKeystroke() in {
                    32: 1,
                    13: 1
                } && this.fire("click");
            }), b.on("focus", function() {
                this.fire("mouseover");
            }), b.on("blur", function() {
                this.fire("mouseout");
            });
        }
        function h(a) {
            function b() {
                a.layout();
            }
            var c = CKEDITOR.document.getWindow();
            c.on("resize", b), a.on("hide", function() {
                c.removeListener("resize", b);
            });
        }
        function i(a, b) {
            this._ = {
                dialog: a
            }, CKEDITOR.tools.extend(this, b);
        }
        function j(a) {
            function b(b) {
                var c = a.getSize(), i = CKEDITOR.document.getWindow().getViewPaneSize(), j = b.data.$.screenX, k = b.data.$.screenY, l = j - d.x, m = k - d.y;
                d = {
                    x: j,
                    y: k
                }, e.x += l, e.y += m, a.move(e.x + h[3] < g ? -h[3] : e.x - h[1] > i.width - c.width - g ? i.width - c.width + ("rtl" == f.lang.dir ? 0 : h[1]) : e.x, e.y + h[0] < g ? -h[0] : e.y - h[2] > i.height - c.height - g ? i.height - c.height + h[2] : e.y, 1), 
                b.data.preventDefault();
            }
            function c() {
                if (CKEDITOR.document.removeListener("mousemove", b), CKEDITOR.document.removeListener("mouseup", c), 
                CKEDITOR.env.ie6Compat) {
                    var a = w.getChild(0).getFrameDocument();
                    a.removeListener("mousemove", b), a.removeListener("mouseup", c);
                }
            }
            var d = null, e = null;
            a.getElement().getFirst();
            var f = a.getParentEditor(), g = f.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [ 0, 0, 0, 0 ];
            "undefined" == typeof g && (g = 20), a.parts.title.on("mousedown", function(f) {
                if (d = {
                    x: f.data.$.screenX,
                    y: f.data.$.screenY
                }, CKEDITOR.document.on("mousemove", b), CKEDITOR.document.on("mouseup", c), e = a.getPosition(), 
                CKEDITOR.env.ie6Compat) {
                    var g = w.getChild(0).getFrameDocument();
                    g.on("mousemove", b), g.on("mouseup", c);
                }
                f.data.preventDefault();
            }, a);
        }
        function k(a) {
            function b(b) {
                var c = "rtl" == m.lang.dir, l = k.width, n = k.height, o = l + (b.data.$.screenX - d) * (c ? -1 : 1) * (a._.moved ? 1 : 2), p = n + (b.data.$.screenY - e) * (a._.moved ? 1 : 2), q = a._.element.getFirst(), q = c && q.getComputedStyle("right"), r = a.getPosition();
                r.y + p > j.height && (p = j.height - r.y), (c ? q : r.x) + o > j.width && (o = j.width - (c ? q : r.x)), 
                (g == CKEDITOR.DIALOG_RESIZE_WIDTH || g == CKEDITOR.DIALOG_RESIZE_BOTH) && (l = Math.max(f.minWidth || 0, o - h)), 
                (g == CKEDITOR.DIALOG_RESIZE_HEIGHT || g == CKEDITOR.DIALOG_RESIZE_BOTH) && (n = Math.max(f.minHeight || 0, p - i)), 
                a.resize(l, n), a._.moved || a.layout(), b.data.preventDefault();
            }
            function c() {
                if (CKEDITOR.document.removeListener("mouseup", c), CKEDITOR.document.removeListener("mousemove", b), 
                l && (l.remove(), l = null), CKEDITOR.env.ie6Compat) {
                    var a = w.getChild(0).getFrameDocument();
                    a.removeListener("mouseup", c), a.removeListener("mousemove", b);
                }
            }
            var d, e, f = a.definition, g = f.resizable;
            if (g != CKEDITOR.DIALOG_RESIZE_NONE) {
                var h, i, j, k, l, m = a.getParentEditor(), n = CKEDITOR.tools.addFunction(function(f) {
                    k = a.getSize();
                    var g = a.parts.contents;
                    g.$.getElementsByTagName("iframe").length && (l = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'), 
                    g.append(l)), i = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks)), 
                    h = k.width - a.parts.contents.getSize("width", 1), d = f.screenX, e = f.screenY, 
                    j = CKEDITOR.document.getWindow().getViewPaneSize(), CKEDITOR.document.on("mousemove", b), 
                    CKEDITOR.document.on("mouseup", c), CKEDITOR.env.ie6Compat && (g = w.getChild(0).getFrameDocument(), 
                    g.on("mousemove", b), g.on("mouseup", c)), f.preventDefault && f.preventDefault();
                });
                a.on("load", function() {
                    var b = "";
                    g == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : g == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"), 
                    b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + b + " cke_resizer_" + m.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(m.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + n + ', event )">' + ("ltr" == m.lang.dir ? "◢" : "◣") + "</div>"), 
                    a.parts.footer.append(b, 1);
                }), m.on("destroy", function() {
                    CKEDITOR.tools.removeFunction(n);
                });
            }
        }
        function l(a) {
            a.data.preventDefault(1);
        }
        function m(a) {
            var b = CKEDITOR.document.getWindow(), c = a.config, d = c.dialog_backgroundCoverColor || "white", e = c.dialog_backgroundCoverOpacity, f = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(d, e, f), g = x[c];
            g ? g.show() : (f = [ '<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + d, '" class="cke_dialog_background_cover">' ], 
            CKEDITOR.env.ie6Compat && (d = "<html><body style=\\'background-color:" + d + ";\\'></body></html>", 
            f.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'), 
            f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"), 
            f.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')), 
            f.push("</div>"), g = CKEDITOR.dom.element.createFromHtml(f.join("")), g.setOpacity(void 0 != e ? e : .5), 
            g.on("keydown", l), g.on("keypress", l), g.on("keyup", l), g.appendTo(CKEDITOR.document.getBody()), 
            x[c] = g), a.focusManager.add(g), w = g;
            var a = function() {
                var a = b.getViewPaneSize();
                g.setStyles({
                    width: a.width + "px",
                    height: a.height + "px"
                });
            }, h = function() {
                var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop;
                if (g.setStyles({
                    left: a.x + "px",
                    top: a.y + "px"
                }), c) do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog);
            };
            if (v = a, b.on("resize", a), a(), (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && g.focus(), 
            CKEDITOR.env.ie6Compat) {
                var i = function() {
                    h(), arguments.callee.prevScrollHandler.apply(this, arguments);
                };
                b.$.setTimeout(function() {
                    i.prevScrollHandler = window.onscroll || function() {}, window.onscroll = i;
                }, 0), h();
            }
        }
        function n(a) {
            w && (a.focusManager.remove(w), a = CKEDITOR.document.getWindow(), w.hide(), a.removeListener("resize", v), 
            CKEDITOR.env.ie6Compat && a.$.setTimeout(function() {
                window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null;
            }, 0), v = null);
        }
        var o = CKEDITOR.tools.cssLength, p = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
        CKEDITOR.dialog = function(c, g) {
            function h() {
                var a = x._.focusList;
                a.sort(function(a, b) {
                    return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex;
                });
                for (var b = a.length, c = 0; b > c; c++) a[c].focusIndex = c;
            }
            function i(a) {
                var b = x._.focusList, a = a || 0;
                if (!(1 > b.length)) {
                    var c = x._.currentFocusIndex;
                    try {
                        b[c].getInputElement().$.blur();
                    } catch (d) {}
                    for (var e = c = (c + a + b.length) % b.length; a && !b[e].isFocusable() && (e = (e + a + b.length) % b.length, 
                    !(e == c)); ) ;
                    b[e].focus(), "text" == b[e].type && b[e].select();
                }
            }
            function l(d) {
                if (x == CKEDITOR.dialog._.currentTop) {
                    var e = d.data.getKeystroke(), f = "rtl" == c.lang.dir;
                    if (n = o = 0, 9 == e || e == CKEDITOR.SHIFT + 9) e = e == CKEDITOR.SHIFT + 9, x._.tabBarMode ? (e = e ? a.call(x) : b.call(x), 
                    x.selectPage(e), x._.tabs[e][0].focus()) : i(e ? -1 : 1), n = 1; else if (e == CKEDITOR.ALT + 121 && !x._.tabBarMode && 1 < x.getPageCount()) x._.tabBarMode = !0, 
                    x._.tabs[x._.currentTabId][0].focus(), n = 1; else if (37 != e && 39 != e || !x._.tabBarMode) if (13 != e && 32 != e || !x._.tabBarMode) if (13 == e) e = d.data.getTarget(), 
                    e.is("a", "button", "select", "textarea") || e.is("input") && "button" == e.$.type || ((e = this.getButton("ok")) && CKEDITOR.tools.setTimeout(e.click, 0, e), 
                    n = 1), o = 1; else {
                        if (27 != e) return;
                        (e = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(e.click, 0, e) : !1 !== this.fire("cancel", {
                            hide: !0
                        }).hide && this.hide(), o = 1;
                    } else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex = -1, 
                    i(1), n = 1; else e = e == (f ? 39 : 37) ? a.call(x) : b.call(x), x.selectPage(e), 
                    x._.tabs[e][0].focus(), n = 1;
                    m(d);
                }
            }
            function m(a) {
                n ? a.data.preventDefault(1) : o && a.data.stopPropagation();
            }
            var n, o, p = CKEDITOR.dialog._.dialogDefinitions[g], r = CKEDITOR.tools.clone(q), s = c.config.dialog_buttonsOrder || "OS", t = c.lang.dir, v = {};
            if (("OS" == s && CKEDITOR.env.mac || "rtl" == s && "ltr" == t || "ltr" == s && "rtl" == t) && r.buttons.reverse(), 
            p = CKEDITOR.tools.extend(p(c), r), p = CKEDITOR.tools.clone(p), p = new u(this, p), 
            r = f(c), this._ = {
                editor: c,
                element: r.element,
                name: g,
                contentSize: {
                    width: 0,
                    height: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: !1,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: !1
            }, this.parts = r.parts, CKEDITOR.tools.setTimeout(function() {
                c.fire("ariaWidget", this.parts.contents);
            }, 0, this), r = {
                position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
                top: 0,
                visibility: "hidden"
            }, r["rtl" == t ? "right" : "left"] = 0, this.parts.dialog.setStyles(r), CKEDITOR.event.call(this), 
            this.definition = p = CKEDITOR.fire("dialogDefinition", {
                name: g,
                definition: p
            }, c).definition, !("removeDialogTabs" in c._) && c.config.removeDialogTabs) {
                for (r = c.config.removeDialogTabs.split(";"), t = 0; t < r.length; t++) if (s = r[t].split(":"), 
                2 == s.length) {
                    var w = s[0];
                    v[w] || (v[w] = []), v[w].push(s[1]);
                }
                c._.removeDialogTabs = v;
            }
            if (c._.removeDialogTabs && (v = c._.removeDialogTabs[g])) for (t = 0; t < v.length; t++) p.removeContents(v[t]);
            p.onLoad && this.on("load", p.onLoad), p.onShow && this.on("show", p.onShow), p.onHide && this.on("hide", p.onHide), 
            p.onOk && this.on("ok", function(a) {
                c.fire("saveSnapshot"), setTimeout(function() {
                    c.fire("saveSnapshot");
                }, 0), !1 === p.onOk.call(this, a) && (a.data.hide = !1);
            }), p.onCancel && this.on("cancel", function(a) {
                !1 === p.onCancel.call(this, a) && (a.data.hide = !1);
            });
            var x = this, y = function(a) {
                var b, c = x._.contents, d = !1;
                for (b in c) for (var e in c[b]) if (d = a.call(this, c[b][e])) return;
            };
            this.on("ok", function(a) {
                y(function(b) {
                    if (b.validate) {
                        var c = b.validate(this), e = "string" == typeof c || !1 === c;
                        return e && (a.data.hide = !1, a.stop()), d.call(b, !e, "string" == typeof c ? c : void 0), 
                        e;
                    }
                });
            }, this, null, 0), this.on("cancel", function(a) {
                y(function(b) {
                    return b.isChanged() ? (!c.config.dialog_noConfirmCancel && !confirm(c.lang.common.confirmCancel) && (a.data.hide = !1), 
                    !0) : void 0;
                });
            }, this, null, 0), this.parts.close.on("click", function(a) {
                !1 !== this.fire("cancel", {
                    hide: !0
                }).hide && this.hide(), a.data.preventDefault();
            }, this), this.changeFocus = i;
            var z = this._.element;
            for (c.focusManager.add(z, 1), this.on("show", function() {
                z.on("keydown", l, this), (CKEDITOR.env.opera || CKEDITOR.env.gecko) && z.on("keypress", m, this);
            }), this.on("hide", function() {
                z.removeListener("keydown", l), (CKEDITOR.env.opera || CKEDITOR.env.gecko) && z.removeListener("keypress", m), 
                y(function(a) {
                    e.apply(a);
                });
            }), this.on("iframeAdded", function(a) {
                new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document).on("keydown", l, this, null, 0);
            }), this.on("show", function() {
                if (h(), c.config.dialog_startupFocusTab && 1 < x._.pageCount) x._.tabBarMode = !0, 
                x._.tabs[x._.currentTabId][0].focus(); else if (!this._.hasFocus) if (this._.currentFocusIndex = -1, 
                p.onFocus) {
                    var a = p.onFocus.call(this);
                    a && a.focus();
                } else i(1);
            }, this, null, 4294967295), CKEDITOR.env.ie6Compat && this.on("load", function() {
                var a = this.getElement(), b = a.getFirst();
                b.remove(), b.appendTo(a);
            }, this), j(this), k(this), new CKEDITOR.dom.text(p.title, CKEDITOR.document).appendTo(this.parts.title), 
            t = 0; t < p.contents.length; t++) (v = p.contents[t]) && this.addPage(v);
            for (this.parts.tabs.on("click", function(a) {
                var b = a.data.getTarget();
                b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))), 
                this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, i(1)), 
                a.data.preventDefault());
            }, this), t = [], v = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                type: "hbox",
                className: "cke_dialog_footer_buttons",
                widths: [],
                children: p.buttons
            }, t).getChild(), this.parts.footer.setHtml(t.join("")), t = 0; t < v.length; t++) this._.buttons[v[t].id] = v[t];
        }, CKEDITOR.dialog.prototype = {
            destroy: function() {
                this.hide(), this._.element.remove();
            },
            resize: function() {
                return function(a, b) {
                    this._.contentSize && this._.contentSize.width == a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", {
                        dialog: this,
                        width: a,
                        height: b
                    }, this._.editor), this.fire("resize", {
                        width: a,
                        height: b
                    }, this._.editor), this.parts.contents.setStyles({
                        width: a + "px",
                        height: b + "px"
                    }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), 
                    this._.contentSize = {
                        width: a,
                        height: b
                    });
                };
            }(),
            getSize: function() {
                var a = this._.element.getFirst();
                return {
                    width: a.$.offsetWidth || 0,
                    height: a.$.offsetHeight || 0
                };
            },
            move: function(a, b, c) {
                var d = this._.element.getFirst(), e = "rtl" == this._.editor.lang.dir, f = "fixed" == d.getComputedStyle("position");
                CKEDITOR.env.ie && d.setStyle("zoom", "100%"), f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = {
                    x: a,
                    y: b
                }, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), 
                e && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), 
                b = {
                    top: (b > 0 ? b : 0) + "px"
                }, b[e ? "right" : "left"] = (a > 0 ? a : 0) + "px", d.setStyles(b), c && (this._.moved = 1));
            },
            getPosition: function() {
                return CKEDITOR.tools.extend({}, this._.position);
            },
            show: function() {
                var a = this._.element, b = this.definition;
                if (a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody()), 
                CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version) {
                    var c = this.parts.dialog;
                    c.setStyle("position", "absolute"), setTimeout(function() {
                        c.setStyle("position", "fixed");
                    }, 0);
                }
                this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight), 
                this.reset(), this.selectPage(this.definition.contents[0].id), null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex), 
                this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10), 
                null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, 
                m(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), 
                CKEDITOR.dialog._.currentTop = this), a.on("keydown", z), a.on(CKEDITOR.env.opera ? "keypress" : "keyup", A), 
                this._.hasFocus = !1;
                for (var d in b.contents) if (b.contents[d]) {
                    var a = b.contents[d], e = this._.tabs[a.id], f = a.requiredContent, g = 0;
                    if (e) {
                        for (var i in this._.contents[a.id]) {
                            var j = this._.contents[a.id][i];
                            "hbox" == j.type || "vbox" == j.type || !j.getInputElement() || (j.requiredContent && !this._.editor.activeFilter.check(j.requiredContent) ? j.disable() : (j.enable(), 
                            g++));
                        }
                        !g || f && !this._.editor.activeFilter.check(f) ? e[0].addClass("cke_dialog_tab_disabled") : e[0].removeClass("cke_dialog_tab_disabled");
                    }
                }
                CKEDITOR.tools.setTimeout(function() {
                    this.layout(), h(this), this.parts.dialog.setStyle("visibility", ""), this.fireOnce("load", {}), 
                    CKEDITOR.ui.fire("ready", this), this.fire("show", {}), this._.editor.fire("dialogShow", this), 
                    this._.parentDialog || this._.editor.focusManager.lock(), this.foreach(function(a) {
                        a.setInitValue && a.setInitValue();
                    });
                }, 100, this);
            },
            layout: function() {
                var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), d = (c.width - b.width) / 2, e = (c.height - b.height) / 2;
                CKEDITOR.env.ie6Compat || (b.height + (e > 0 ? e : 0) > c.height || b.width + (d > 0 ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed")), 
                this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : e);
            },
            foreach: function(a) {
                for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
                return this;
            },
            reset: function() {
                var a = function(a) {
                    a.reset && a.reset(1);
                };
                return function() {
                    return this.foreach(a), this;
                };
            }(),
            setupContent: function() {
                var a = arguments;
                this.foreach(function(b) {
                    b.setup && b.setup.apply(b, a);
                });
            },
            commitContent: function() {
                var a = arguments;
                this.foreach(function(b) {
                    CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(), 
                    b.commit && b.commit.apply(b, a);
                });
            },
            hide: function() {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {}), this._.editor.fire("dialogHide", this), this.selectPage(this._.tabIdList[0]);
                    var a = this._.element;
                    for (a.setStyle("display", "none"), this.parts.dialog.setStyle("visibility", "hidden"), 
                    C(this); CKEDITOR.dialog._.currentTop != this; ) CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var b = this._.parentDialog.getElement().getFirst();
                        b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2));
                    } else n(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10; else {
                        CKEDITOR.dialog._.currentZIndex = null, a.removeListener("keydown", z), a.removeListener(CKEDITOR.env.opera ? "keypress" : "keyup", A);
                        var c = this._.editor;
                        c.focus(), setTimeout(function() {
                            c.focusManager.unlock();
                        }, 0);
                    }
                    delete this._.parentDialog, this.foreach(function(a) {
                        a.resetInitValue && a.resetInitValue();
                    });
                }
            },
            addPage: function(a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                        type: "vbox",
                        className: "cke_dialog_page_contents",
                        children: a.elements,
                        expand: !!a.expand,
                        padding: a.padding,
                        style: a.style || "width: 100%;"
                    }, b), e = this._.contents[a.id] = {}, f = d.getChild(), g = 0; d = f.shift(); ) !d.notAllowed && "hbox" != d.type && "vbox" != d.type && g++, 
                    e[d.id] = d, "function" == typeof d.getChild && f.push.apply(f, d.getChild());
                    g || (a.hidden = !0), b = CKEDITOR.dom.element.createFromHtml(b.join("")), b.setAttribute("role", "tabpanel"), 
                    d = CKEDITOR.env, e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(), c = CKEDITOR.dom.element.createFromHtml([ '<a class="cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', e, '"', d.gecko && 10900 <= d.version && !d.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', a.label, "</a>" ].join("")), 
                    b.setAttribute("aria-labelledby", e), this._.tabs[a.id] = [ c, b ], this._.tabIdList.push(a.id), 
                    !a.hidden && this._.pageCount++, this._.lastTab = c, this.updateStyle(), b.setAttribute("name", a.id), 
                    b.appendTo(this.parts.contents), c.unselectable(), this.parts.tabs.append(c), a.accessKey && (B(this, this, "CTRL+" + a.accessKey, E, D), 
                    this._.accessKeyMap["CTRL+" + a.accessKey] = a.id);
                }
            },
            selectPage: function(a) {
                if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !0 !== this.fire("selectPage", {
                    page: a,
                    currentPage: this._.currentTabId
                })) {
                    for (var b in this._.tabs) {
                        var d = this._.tabs[b][0], e = this._.tabs[b][1];
                        b != a && (d.removeClass("cke_dialog_tab_selected"), e.hide()), e.setAttribute("aria-hidden", b != a);
                    }
                    var f = this._.tabs[a];
                    f[0].addClass("cke_dialog_tab_selected"), CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (c(f[1]), 
                    f[1].show(), setTimeout(function() {
                        c(f[1], 1);
                    }, 0)) : f[1].show(), this._.currentTabId = a, this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a);
                }
            },
            updateStyle: function() {
                this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page");
            },
            hidePage: function(b) {
                var c = this._.tabs[b] && this._.tabs[b][0];
                c && 1 != this._.pageCount && c.isVisible() && (b == this._.currentTabId && this.selectPage(a.call(this)), 
                c.hide(), this._.pageCount--, this.updateStyle());
            },
            showPage: function(a) {
                (a = this._.tabs[a] && this._.tabs[a][0]) && (a.show(), this._.pageCount++, this.updateStyle());
            },
            getElement: function() {
                return this._.element;
            },
            getName: function() {
                return this._.name;
            },
            getContentElement: function(a, b) {
                var c = this._.contents[a];
                return c && c[b];
            },
            getValueOf: function(a, b) {
                return this.getContentElement(a, b).getValue();
            },
            setValueOf: function(a, b, c) {
                return this.getContentElement(a, b).setValue(c);
            },
            getButton: function(a) {
                return this._.buttons[a];
            },
            click: function(a) {
                return this._.buttons[a].click();
            },
            disableButton: function(a) {
                return this._.buttons[a].disable();
            },
            enableButton: function(a) {
                return this._.buttons[a].enable();
            },
            getPageCount: function() {
                return this._.pageCount;
            },
            getParentEditor: function() {
                return this._.editor;
            },
            getSelectedElement: function() {
                return this.getParentEditor().getSelection().getSelectedElement();
            },
            addFocusable: function(a, b) {
                if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new g(this, a, b)); else {
                    this._.focusList.splice(b, 0, new g(this, a, b));
                    for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++;
                }
            }
        }, CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function(a, b) {
                this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b);
            },
            exists: function(a) {
                return !!this._.dialogDefinitions[a];
            },
            getCurrent: function() {
                return CKEDITOR.dialog._.currentTop;
            },
            isTabEnabled: function(a, b, c) {
                return a = a.config.removeDialogTabs, !(a && a.match(RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")));
            },
            okButton: function() {
                var a = function(a, b) {
                    return b = b || {}, CKEDITOR.tools.extend({
                        id: "ok",
                        type: "button",
                        label: a.lang.common.ok,
                        "class": "cke_dialog_ui_button_ok",
                        onClick: function(a) {
                            a = a.data.dialog, !1 !== a.fire("ok", {
                                hide: !0
                            }).hide && a.hide();
                        }
                    }, b, !0);
                };
                return a.type = "button", a.override = function(b) {
                    return CKEDITOR.tools.extend(function(c) {
                        return a(c, b);
                    }, {
                        type: "button"
                    }, !0);
                }, a;
            }(),
            cancelButton: function() {
                var a = function(a, b) {
                    return b = b || {}, CKEDITOR.tools.extend({
                        id: "cancel",
                        type: "button",
                        label: a.lang.common.cancel,
                        "class": "cke_dialog_ui_button_cancel",
                        onClick: function(a) {
                            a = a.data.dialog, !1 !== a.fire("cancel", {
                                hide: !0
                            }).hide && a.hide();
                        }
                    }, b, !0);
                };
                return a.type = "button", a.override = function(b) {
                    return CKEDITOR.tools.extend(function(c) {
                        return a(c, b);
                    }, {
                        type: "button"
                    }, !0);
                }, a;
            }(),
            addUIElement: function(a, b) {
                this._.uiElementBuilders[a] = b;
            }
        }), CKEDITOR.dialog._ = {
            uiElementBuilders: {},
            dialogDefinitions: {},
            currentTop: null,
            currentZIndex: null
        }, CKEDITOR.event.implementOn(CKEDITOR.dialog), CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var q = {
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
            minWidth: 600,
            minHeight: 400,
            buttons: [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ]
        }, r = function(a, b, c) {
            for (var d, e = 0; d = a[e]; e++) if (d.id == b || c && d[c] && (d = r(d[c], b, c))) return d;
            return null;
        }, s = function(a, b, c, d, e) {
            if (c) {
                for (var f, g = 0; f = a[g]; g++) {
                    if (f.id == c) return a.splice(g, 0, b), b;
                    if (d && f[d] && (f = s(f[d], b, c, d, !0))) return f;
                }
                if (e) return null;
            }
            return a.push(b), b;
        }, t = function(a, b, c) {
            for (var d, e = 0; d = a[e]; e++) {
                if (d.id == b) return a.splice(e, 1);
                if (c && d[c] && (d = t(d[c], b, c))) return d;
            }
            return null;
        }, u = function(a, b) {
            this.dialog = a;
            for (var c, d = b.contents, e = 0; c = d[e]; e++) d[e] = c && new i(a, c);
            CKEDITOR.tools.extend(this, b);
        };
        u.prototype = {
            getContents: function(a) {
                return r(this.contents, a);
            },
            getButton: function(a) {
                return r(this.buttons, a);
            },
            addContents: function(a, b) {
                return s(this.contents, a, b);
            },
            addButton: function(a, b) {
                return s(this.buttons, a, b);
            },
            removeContents: function(a) {
                t(this.contents, a);
            },
            removeButton: function(a) {
                t(this.buttons, a);
            }
        }, i.prototype = {
            get: function(a) {
                return r(this.elements, a, "children");
            },
            add: function(a, b) {
                return s(this.elements, a, b, "children");
            },
            remove: function(a) {
                t(this.elements, a, "children");
            }
        };
        var v, w, x = {}, y = {}, z = function(a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
            (b = y[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], 
            b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault());
        }, A = function(a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
            (b = y[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], 
            b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()));
        }, B = function(a, b, c, d, e) {
            (y[c] || (y[c] = [])).push({
                uiElement: a,
                dialog: b,
                key: c,
                keyup: e || a.accessKeyUp,
                keydown: d || a.accessKeyDown
            });
        }, C = function(a) {
            for (var b in y) {
                for (var c = y[b], d = c.length - 1; d >= 0; d--) (c[d].dialog == a || c[d].uiElement == a) && c.splice(d, 1);
                0 === c.length && delete y[b];
            }
        }, D = function(a, b) {
            a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]);
        }, E = function() {};
        !function() {
            CKEDITOR.ui.dialog = {
                uiElement: function(a, b, c, d, e, f, g) {
                    if (!(4 > arguments.length)) {
                        var h = (d.call ? d(b) : d) || "div", i = [ "<", h, " " ], j = (e && e.call ? e(b) : e) || {}, k = (f && f.call ? f(b) : f) || {}, l = (g && g.call ? g.call(this, a, b) : g) || "", m = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement";
                        this.id = b.id, b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (j.display = "none", 
                        this.notAllowed = !0), k.id = m;
                        var n = {};
                        b.type && (n["cke_dialog_ui_" + b.type] = 1), b.className && (n[b.className] = 1), 
                        b.disabled && (n.cke_disabled = 1);
                        for (var o = k["class"] && k["class"].split ? k["class"].split(" ") : [], m = 0; m < o.length; m++) o[m] && (n[o[m]] = 1);
                        o = [];
                        for (m in n) o.push(m);
                        k["class"] = o.join(" "), b.title && (k.title = b.title), n = (b.style || "").split(";"), 
                        b.align && (o = b.align, j["margin-left"] = "left" == o ? 0 : "auto", j["margin-right"] = "right" == o ? 0 : "auto");
                        for (m in j) n.push(m + ":" + j[m]);
                        for (b.hidden && n.push("display:none"), m = n.length - 1; m >= 0; m--) "" === n[m] && n.splice(m, 1);
                        0 < n.length && (k.style = (k.style ? k.style + "; " : "") + n.join("; "));
                        for (m in k) i.push(m + '="' + CKEDITOR.tools.htmlEncode(k[m]) + '" ');
                        i.push(">", l, "</", h, ">"), c.push(i.join("")), (this._ || (this._ = {})).dialog = a, 
                        "boolean" == typeof b.isChanged && (this.isChanged = function() {
                            return b.isChanged;
                        }), "function" == typeof b.isChanged && (this.isChanged = b.isChanged), "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
                            return function(c) {
                                a.call(this, b.setValue.call(this, c));
                            };
                        })), "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(a) {
                            return function() {
                                return b.getValue.call(this, a.call(this));
                            };
                        })), CKEDITOR.event.implementOn(this), this.registerEvents(b), this.accessKeyUp && this.accessKeyDown && b.accessKey && B(this, a, "CTRL+" + b.accessKey);
                        var p = this;
                        a.on("load", function() {
                            var b = p.getInputElement();
                            if (b) {
                                var c = p.type in {
                                    checkbox: 1,
                                    ratio: 1
                                } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                b.on("focus", function() {
                                    a._.tabBarMode = !1, a._.hasFocus = !0, p.fire("focus"), c && this.addClass(c);
                                }), b.on("blur", function() {
                                    p.fire("blur"), c && this.removeClass(c);
                                });
                            }
                        }), CKEDITOR.tools.extend(this, b), this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, 
                        this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function() {
                            a._.currentFocusIndex = p.focusIndex;
                        }));
                    }
                },
                hbox: function(a, b, c, d, e) {
                    if (!(4 > arguments.length)) {
                        this._ || (this._ = {});
                        var f, g = this._.children = b, h = e && e.widths || null, i = e && e.height || null, j = {
                            role: "presentation"
                        };
                        e && e.align && (j.align = e.align), CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
                            type: "hbox"
                        }, d, "table", {}, j, function() {
                            var a = [ '<tbody><tr class="cke_dialog_ui_hbox">' ];
                            for (f = 0; f < c.length; f++) {
                                var b = "cke_dialog_ui_hbox_child", d = [];
                                0 === f && (b = "cke_dialog_ui_hbox_first"), f == c.length - 1 && (b = "cke_dialog_ui_hbox_last"), 
                                a.push('<td class="', b, '" role="presentation" '), h ? h[f] && d.push("width:" + o(h[f])) : d.push("width:" + Math.floor(100 / c.length) + "%"), 
                                i && d.push("height:" + o(i)), e && void 0 != e.padding && d.push("padding:" + o(e.padding)), 
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && g[f].align && d.push("text-align:" + g[f].align), 
                                0 < d.length && a.push('style="' + d.join("; ") + '" '), a.push(">", c[f], "</td>");
                            }
                            return a.push("</tr></tbody>"), a.join("");
                        });
                    }
                },
                vbox: function(a, b, c, d, e) {
                    if (!(3 > arguments.length)) {
                        this._ || (this._ = {});
                        var f = this._.children = b, g = e && e.width || null, h = e && e.heights || null;
                        CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
                            type: "vbox"
                        }, d, "div", null, {
                            role: "presentation"
                        }, function() {
                            var b = [ '<table role="presentation" cellspacing="0" border="0" ' ];
                            b.push('style="'), e && e.expand && b.push("height:100%;"), b.push("width:" + o(g || "100%"), ";"), 
                            CKEDITOR.env.webkit && b.push("float:none;"), b.push('"'), b.push('align="', CKEDITOR.tools.htmlEncode(e && e.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" '), 
                            b.push("><tbody>");
                            for (var d = 0; d < c.length; d++) {
                                var i = [];
                                b.push('<tr><td role="presentation" '), g && i.push("width:" + o(g || "100%")), 
                                h ? i.push("height:" + o(h[d])) : e && e.expand && i.push("height:" + Math.floor(100 / c.length) + "%"), 
                                e && void 0 != e.padding && i.push("padding:" + o(e.padding)), CKEDITOR.env.ie && CKEDITOR.env.quirks && f[d].align && i.push("text-align:" + f[d].align), 
                                0 < i.length && b.push('style="', i.join("; "), '" '), b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>");
                            }
                            return b.push("</tbody></table>"), b.join("");
                        });
                    }
                }
            };
        }(), CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function() {
                return CKEDITOR.document.getById(this.domId);
            },
            getInputElement: function() {
                return this.getElement();
            },
            getDialog: function() {
                return this._.dialog;
            },
            setValue: function(a, b) {
                return this.getInputElement().setValue(a), !b && this.fire("change", {
                    value: a
                }), this;
            },
            getValue: function() {
                return this.getInputElement().getValue();
            },
            isChanged: function() {
                return !1;
            },
            selectParentTab: function() {
                for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"); ) ;
                return a ? (a = a.getAttribute("name"), this._.dialog._.currentTabId != a && this._.dialog.selectPage(a), 
                this) : this;
            },
            focus: function() {
                return this.selectParentTab().getInputElement().focus(), this;
            },
            registerEvents: function(a) {
                var b, c, d = /^on([A-Z]\w+)/, e = function(a, b, c, d) {
                    b.on("load", function() {
                        a.getInputElement().on(c, d, a);
                    });
                };
                for (c in a) (b = c.match(d)) && (this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, a[c]) : e(this, this._.dialog, b[1].toLowerCase(), a[c]));
                return this;
            },
            eventProcessors: {
                onLoad: function(a, b) {
                    a.on("load", b, this);
                },
                onShow: function(a, b) {
                    a.on("show", b, this);
                },
                onHide: function(a, b) {
                    a.on("hide", b, this);
                }
            },
            accessKeyDown: function() {
                this.focus();
            },
            accessKeyUp: function() {},
            disable: function() {
                var a = this.getElement();
                this.getInputElement().setAttribute("disabled", "true"), a.addClass("cke_disabled");
            },
            enable: function() {
                var a = this.getElement();
                this.getInputElement().removeAttribute("disabled"), a.removeClass("cke_disabled");
            },
            isEnabled: function() {
                return !this.getElement().hasClass("cke_disabled");
            },
            isVisible: function() {
                return this.getInputElement().isVisible();
            },
            isFocusable: function() {
                return this.isEnabled() && this.isVisible() ? !0 : !1;
            }
        }, CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
            getChild: function(a) {
                return 1 > arguments.length ? this._.children.concat() : (a.splice || (a = [ a ]), 
                2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null);
            }
        }, !0), CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox(), function() {
            var a = {
                build: function(a, b, c) {
                    for (var d, e = b.children, f = [], g = [], h = 0; h < e.length && (d = e[h]); h++) {
                        var i = [];
                        f.push(i), g.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a, d, i));
                    }
                    return new CKEDITOR.ui.dialog[b.type](a, g, f, c, b);
                }
            };
            CKEDITOR.dialog.addUIElement("hbox", a), CKEDITOR.dialog.addUIElement("vbox", a);
        }(), CKEDITOR.dialogCommand = function(a, b) {
            this.dialogName = a, CKEDITOR.tools.extend(this, b, !0);
        }, CKEDITOR.dialogCommand.prototype = {
            exec: function(a) {
                CKEDITOR.env.opera ? CKEDITOR.tools.setTimeout(function() {
                    a.openDialog(this.dialogName);
                }, 0, this) : a.openDialog(this.dialogName);
            },
            canUndo: !1,
            editorFocus: 1
        }, function() {
            var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i, f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            CKEDITOR.VALIDATE_OR = 1, CKEDITOR.VALIDATE_AND = 2, CKEDITOR.dialog.validate = {
                functions: function() {
                    var a = arguments;
                    return function() {
                        var b, c = this && this.getValue ? this.getValue() : a[0], d = void 0, e = CKEDITOR.VALIDATE_AND, f = [];
                        for (b = 0; b < a.length && "function" == typeof a[b]; b++) f.push(a[b]);
                        b < a.length && "string" == typeof a[b] && (d = a[b], b++), b < a.length && "number" == typeof a[b] && (e = a[b]);
                        var g = e == CKEDITOR.VALIDATE_AND ? !0 : !1;
                        for (b = 0; b < f.length; b++) g = e == CKEDITOR.VALIDATE_AND ? g && f[b](c) : g || f[b](c);
                        return g ? !0 : d;
                    };
                },
                regex: function(a, b) {
                    return function(c) {
                        return c = this && this.getValue ? this.getValue() : c, a.test(c) ? !0 : b;
                    };
                },
                notEmpty: function(b) {
                    return this.regex(a, b);
                },
                integer: function(a) {
                    return this.regex(b, a);
                },
                number: function(a) {
                    return this.regex(c, a);
                },
                cssLength: function(a) {
                    return this.functions(function(a) {
                        return e.test(CKEDITOR.tools.trim(a));
                    }, a);
                },
                htmlLength: function(a) {
                    return this.functions(function(a) {
                        return d.test(CKEDITOR.tools.trim(a));
                    }, a);
                },
                inlineStyle: function(a) {
                    return this.functions(function(a) {
                        return f.test(CKEDITOR.tools.trim(a));
                    }, a);
                },
                equals: function(a, b) {
                    return this.functions(function(b) {
                        return b == a;
                    }, b);
                },
                notEqual: function(a, b) {
                    return this.functions(function(b) {
                        return b != a;
                    }, b);
                }
            }, CKEDITOR.on("instanceDestroyed", function(a) {
                if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                    for (var b; b = CKEDITOR.dialog._.currentTop; ) b.hide();
                    for (var c in x) x[c].remove();
                    x = {};
                }
                var d, a = a.editor._.storedDialogs;
                for (d in a) a[d].destroy();
            });
        }(), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function(a, b) {
                var c = null, d = CKEDITOR.dialog._.dialogDefinitions[a];
                if (null === CKEDITOR.dialog._.currentTop && m(this), "function" == typeof d) c = this._.storedDialogs || (this._.storedDialogs = {}), 
                c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show(); else {
                    if ("failed" == d) throw n(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                    "string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
                        "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed"), 
                        this.openDialog(a, b);
                    }, this, 0, 1);
                }
                return CKEDITOR.skin.loadPart("dialog"), c;
            }
        });
    }(), CKEDITOR.plugins.add("dialog", {
        requires: "dialogui",
        init: function(a) {
            a.on("doubleclick", function(b) {
                b.data.dialog && a.openDialog(b.data.dialog);
            }, null, null, 999);
        }
    }), CKEDITOR.plugins.add("about", {
        requires: "dialog",
        init: function(a) {
            var b = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
            b.modes = {
                wysiwyg: 1,
                source: 1
            }, b.canUndo = !1, b.readOnly = 1, a.ui.addButton && a.ui.addButton("About", {
                label: a.lang.about.title,
                command: "about",
                toolbar: "about"
            }), CKEDITOR.dialog.add("about", this.path + "dialogs/about.js");
        }
    }), CKEDITOR.plugins.add("basicstyles", {
        init: function(a) {
            var b = 0, c = function(c, e, f, g) {
                if (g) {
                    var g = new CKEDITOR.style(g), h = d[f];
                    h.unshift(g), a.attachStyleStateChange(g, function(b) {
                        !a.readOnly && a.getCommand(f).setState(b);
                    }), a.addCommand(f, new CKEDITOR.styleCommand(g, {
                        contentForms: h
                    })), a.ui.addButton && a.ui.addButton(c, {
                        label: e,
                        command: f,
                        toolbar: "basicstyles," + (b += 10)
                    });
                }
            }, d = {
                bold: [ "strong", "b", [ "span", function(a) {
                    return a = a.styles["font-weight"], "bold" == a || +a >= 700;
                } ] ],
                italic: [ "em", "i", [ "span", function(a) {
                    return "italic" == a.styles["font-style"];
                } ] ],
                underline: [ "u", [ "span", function(a) {
                    return "underline" == a.styles["text-decoration"];
                } ] ],
                strike: [ "s", "strike", [ "span", function(a) {
                    return "line-through" == a.styles["text-decoration"];
                } ] ],
                subscript: [ "sub" ],
                superscript: [ "sup" ]
            }, e = a.config, f = a.lang.basicstyles;
            c("Bold", f.bold, "bold", e.coreStyles_bold), c("Italic", f.italic, "italic", e.coreStyles_italic), 
            c("Underline", f.underline, "underline", e.coreStyles_underline), c("Strike", f.strike, "strike", e.coreStyles_strike), 
            c("Subscript", f.subscript, "subscript", e.coreStyles_subscript), c("Superscript", f.superscript, "superscript", e.coreStyles_superscript), 
            a.setKeystroke([ [ CKEDITOR.CTRL + 66, "bold" ], [ CKEDITOR.CTRL + 73, "italic" ], [ CKEDITOR.CTRL + 85, "underline" ] ]);
        }
    }), CKEDITOR.config.coreStyles_bold = {
        element: "strong",
        overrides: "b"
    }, CKEDITOR.config.coreStyles_italic = {
        element: "em",
        overrides: "i"
    }, CKEDITOR.config.coreStyles_underline = {
        element: "u"
    }, CKEDITOR.config.coreStyles_strike = {
        element: "s",
        overrides: "strike"
    }, CKEDITOR.config.coreStyles_subscript = {
        element: "sub"
    }, CKEDITOR.config.coreStyles_superscript = {
        element: "sup"
    }, function() {
        function a(a) {
            function b() {
                var b = a.editable();
                b.on(s, function(a) {
                    (!CKEDITOR.env.ie || !p) && m(a);
                }), CKEDITOR.env.ie && b.on("paste", function(b) {
                    q || (e(), b.data.preventDefault(), m(b), g("paste") || a.openDialog("paste"));
                }), CKEDITOR.env.ie && (b.on("contextmenu", f, null, null, 0), b.on("beforepaste", function(a) {
                    a.data && !a.data.$.ctrlKey && f();
                }, null, null, 0)), b.on("beforecut", function() {
                    !p && i(a);
                });
                var c;
                b.attachListener(CKEDITOR.env.ie ? b : a.document.getDocumentElement(), "mouseup", function() {
                    c = setTimeout(function() {
                        n();
                    }, 0);
                }), a.on("destroy", function() {
                    clearTimeout(c);
                }), b.on("keyup", n);
            }
            function c(b) {
                return {
                    type: b,
                    canUndo: "cut" == b,
                    startDisabled: !0,
                    exec: function() {
                        "cut" == this.type && i();
                        var b, c = this.type;
                        if (CKEDITOR.env.ie) b = g(c); else try {
                            b = a.document.$.execCommand(c, !1, null);
                        } catch (d) {
                            b = !1;
                        }
                        return b || alert(a.lang.clipboard[this.type + "Error"]), b;
                    }
                };
            }
            function d() {
                return {
                    canUndo: !1,
                    async: !0,
                    exec: function(a, b) {
                        var c = function(b, c) {
                            b && h(b.type, b.dataValue, !!c), a.fire("afterCommandExec", {
                                name: "paste",
                                command: d,
                                returnValue: !!b
                            });
                        }, d = this;
                        "string" == typeof b ? c({
                            type: "auto",
                            dataValue: b
                        }, 1) : a.getClipboardData(c);
                    }
                };
            }
            function e() {
                q = 1, setTimeout(function() {
                    q = 0;
                }, 100);
            }
            function f() {
                p = 1, setTimeout(function() {
                    p = 0;
                }, 10);
            }
            function g(b) {
                var c = a.document, d = c.getBody(), e = !1, f = function() {
                    e = !0;
                };
                return d.on(b, f), (7 < CKEDITOR.env.version ? c.$ : c.$.selection.createRange()).execCommand(b), 
                d.removeListener(b, f), e;
            }
            function h(b, c, d) {
                return b = {
                    type: b
                }, d && !a.fire("beforePaste", b) || !c ? !1 : (b.dataValue = c, a.fire("paste", b));
            }
            function i() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var b, c, d, e = a.getSelection();
                    e.getType() == CKEDITOR.SELECTION_ELEMENT && (b = e.getSelectedElement()) && (c = e.getRanges()[0], 
                    d = a.document.createText(""), d.insertBefore(b), c.setStartBefore(d), c.setEndAfter(b), 
                    e.selectRanges([ c ]), setTimeout(function() {
                        b.getParent() && (d.remove(), e.selectElement(b));
                    }, 0));
                }
            }
            function j(b, c) {
                var d, e = a.document, f = a.editable(), g = function(a) {
                    a.cancel();
                }, h = CKEDITOR.env.gecko && 10902 >= CKEDITOR.env.version;
                if (!e.getById("cke_pastebin")) {
                    var i = a.getSelection(), j = i.createBookmarks(), k = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !f.is("body") || CKEDITOR.env.ie || CKEDITOR.env.opera ? "div" : "body", e);
                    k.setAttributes({
                        id: "cke_pastebin",
                        "data-cke-temp": "1"
                    }), CKEDITOR.env.opera && k.appendBogus();
                    var l = 0, e = e.getWindow();
                    h ? (k.insertAfter(j[0].startNode), k.setStyle("display", "inline")) : (CKEDITOR.env.webkit ? (f.append(k), 
                    k.addClass("cke_editable"), f.is("body") || (h = "static" != f.getComputedStyle("position") ? f : CKEDITOR.dom.element.get(f.$.offsetParent), 
                    l = h.getDocumentPosition().y)) : f.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" : "html", 1).append(k), 
                    k.setStyles({
                        position: "absolute",
                        top: e.getScrollPosition().y - l + 10 + "px",
                        width: "1px",
                        height: Math.max(1, e.getViewPaneSize().height - 20) + "px",
                        overflow: "hidden",
                        margin: 0,
                        padding: 0
                    })), (h = k.getParent().isReadOnly()) ? (k.setOpacity(0), k.setAttribute("contenteditable", !0)) : k.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-1000px"), 
                    a.on("selectionChange", g, null, null, 0), CKEDITOR.env.webkit && (d = f.once("blur", g, null, null, -100)), 
                    h && k.focus(), h = new CKEDITOR.dom.range(k), h.selectNodeContents(k);
                    var m = h.select();
                    CKEDITOR.env.ie && (d = f.once("blur", function() {
                        a.lockSelection(m);
                    }));
                    var n = CKEDITOR.document.getWindow().getScrollPosition().y;
                    setTimeout(function() {
                        (CKEDITOR.env.webkit || CKEDITOR.env.opera) && (CKEDITOR.document[CKEDITOR.env.webkit ? "getBody" : "getDocumentElement"]().$.scrollTop = n), 
                        d && d.removeListener(), CKEDITOR.env.ie && f.focus(), i.selectBookmarks(j), k.remove();
                        var b;
                        CKEDITOR.env.webkit && (b = k.getFirst()) && b.is && b.hasClass("Apple-style-span") && (k = b), 
                        a.removeListener("selectionChange", g), c(k.getHtml());
                    }, 0);
                }
            }
            function k() {
                if (CKEDITOR.env.ie) {
                    a.focus(), e();
                    var b = a.focusManager;
                    if (b.lock(), a.editable().fire(s) && !g("paste")) return b.unlock(), !1;
                    b.unlock();
                } else try {
                    if (a.editable().fire(s) && !a.document.$.execCommand("Paste", !1, null)) throw 0;
                } catch (c) {
                    return !1;
                }
                return !0;
            }
            function l(b) {
                if ("wysiwyg" == a.mode) switch (b.data.keyCode) {
                  case CKEDITOR.CTRL + 86:
                  case CKEDITOR.SHIFT + 45:
                    b = a.editable(), e(), !CKEDITOR.env.ie && b.fire("beforepaste"), (CKEDITOR.env.opera || CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version) && b.fire("paste");
                    break;

                  case CKEDITOR.CTRL + 88:
                  case CKEDITOR.SHIFT + 46:
                    a.fire("saveSnapshot"), setTimeout(function() {
                        a.fire("saveSnapshot");
                    }, 0);
                }
            }
            function m(b) {
                var c = {
                    type: "auto"
                }, d = a.fire("beforePaste", c);
                j(b, function(a) {
                    a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/gi, ""), d && h(c.type, a, 0, 1);
                });
            }
            function n() {
                if ("wysiwyg" == a.mode) {
                    var b = o("paste");
                    a.getCommand("cut").setState(o("cut")), a.getCommand("copy").setState(o("copy")), 
                    a.getCommand("paste").setState(b), a.fire("pasteState", b);
                }
            }
            function o(b) {
                if (r && b in {
                    paste: 1,
                    cut: 1
                }) return CKEDITOR.TRISTATE_DISABLED;
                if ("paste" == b) return CKEDITOR.TRISTATE_OFF;
                var b = a.getSelection(), c = b.getRanges();
                return b.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF;
            }
            var p = 0, q = 0, r = 0, s = CKEDITOR.env.ie ? "beforepaste" : "paste";
            !function() {
                a.on("key", l), a.on("contentDom", b), a.on("selectionChange", function(a) {
                    r = a.data.selection.getRanges()[0].checkReadOnly(), n();
                }), a.contextMenu && a.contextMenu.addListener(function(a, b) {
                    return r = b.getRanges()[0].checkReadOnly(), {
                        cut: o("cut"),
                        copy: o("copy"),
                        paste: o("paste")
                    };
                });
            }(), function() {
                function b(b, c, d, e, f) {
                    var g = a.lang.clipboard[c];
                    a.addCommand(c, d), a.ui.addButton && a.ui.addButton(b, {
                        label: g,
                        command: c,
                        toolbar: "clipboard," + e
                    }), a.addMenuItems && a.addMenuItem(c, {
                        label: g,
                        command: c,
                        group: "clipboard",
                        order: f
                    });
                }
                b("Cut", "cut", c("cut"), 10, 1), b("Copy", "copy", c("copy"), 20, 4), b("Paste", "paste", d(), 30, 8);
            }(), a.getClipboardData = function(b, c) {
                function d(a) {
                    a.removeListener(), a.cancel(), c(a.data);
                }
                function e(a) {
                    a.removeListener(), a.cancel(), i = !0, c({
                        type: h,
                        dataValue: a.data
                    });
                }
                function f() {
                    this.customTitle = b && b.title;
                }
                var g = !1, h = "auto", i = !1;
                c || (c = b, b = null), a.on("paste", d, null, null, 0), a.on("beforePaste", function(a) {
                    a.removeListener(), g = !0, h = a.data.type;
                }, null, null, 1e3), !1 === k() && (a.removeListener("paste", d), g && a.fire("pasteDialog", f) ? (a.on("pasteDialogCommit", e), 
                a.on("dialogHide", function(a) {
                    a.removeListener(), a.data.removeListener("pasteDialogCommit", e), setTimeout(function() {
                        i || c(null);
                    }, 10);
                })) : c(null));
            };
        }
        function b(a) {
            if (CKEDITOR.env.webkit) {
                if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html";
            } else if (CKEDITOR.env.ie) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html";
            } else {
                if (!CKEDITOR.env.gecko && !CKEDITOR.env.opera) return "html";
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html";
            }
            return "htmlifiedtext";
        }
        function c(a, b) {
            function c(a) {
                return CKEDITOR.tools.repeat("</p><p>", ~~(a / 2)) + (1 == a % 2 ? "<br>" : "");
            }
            return b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>"), 
            b = b.replace(/<\/?[A-Z]+>/g, function(a) {
                return a.toLowerCase();
            }), b.match(/^[^<]$/) ? b : (CKEDITOR.env.webkit && -1 < b.indexOf("<div>") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>"), 
            b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
                return c(a.split("</div><div>").length + 1);
            }) + "</p>"), b = b.replace(/<\/div><div>/g, "<br>"), b = b.replace(/<\/?div>/g, "")), 
            (CKEDITOR.env.gecko || CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>")), 
            -1 < b.indexOf("<br><br>") && (b = "<p>" + b.replace(/(<br>){2,}/g, function(a) {
                return c(a.length / 4);
            }) + "</p>")), f(a, b));
        }
        function d() {
            var a = new CKEDITOR.htmlParser.filter(), b = {
                blockquote: 1,
                dl: 1,
                fieldset: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                ol: 1,
                p: 1,
                table: 1,
                ul: 1
            }, c = CKEDITOR.tools.extend({
                br: 0
            }, CKEDITOR.dtd.$inline), d = {
                p: 1,
                br: 1,
                "cke:br": 1
            }, e = CKEDITOR.dtd, f = CKEDITOR.tools.extend({
                area: 1,
                basefont: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                param: 1
            }, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata), g = function(a) {
                delete a.name, a.add(new CKEDITOR.htmlParser.text(" "));
            }, h = function(a) {
                for (var b, c = a; (c = c.next) && c.name && c.name.match(/^h\d$/); ) for (b = new CKEDITOR.htmlParser.element("cke:br"), 
                b.isEmpty = !0, a.add(b); b = c.children.shift(); ) a.add(b);
            };
            return a.addRules({
                elements: {
                    h1: h,
                    h2: h,
                    h3: h,
                    h4: h,
                    h5: h,
                    h6: h,
                    img: function(a) {
                        var a = CKEDITOR.tools.trim(a.attributes.alt || ""), b = " ";
                        return a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" + a + "] "), new CKEDITOR.htmlParser.text(b);
                    },
                    td: g,
                    th: g,
                    $: function(a) {
                        var g, h = a.name;
                        if (f[h]) return !1;
                        if (a.attributes = [], "br" == h) return a;
                        if (b[h]) a.name = "p"; else if (c[h]) delete a.name; else if (e[h]) {
                            if (g = new CKEDITOR.htmlParser.element("cke:br"), g.isEmpty = !0, CKEDITOR.dtd.$empty[h]) return g;
                            a.add(g, 0), g = g.clone(), g.isEmpty = !0, a.add(g), delete a.name;
                        }
                        return d[a.name] || delete a.name, a;
                    }
                }
            }, {
                applyToAll: !0
            }), a;
        }
        function e(a, b, c) {
            var b = new CKEDITOR.htmlParser.fragment.fromHtml(b), d = new CKEDITOR.htmlParser.basicWriter();
            b.writeHtml(d, c);
            var b = d.getHtml(), b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g, "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, ""), e = 0, b = b.replace(/<\/?p>/g, function(a) {
                if ("<p>" == a) {
                    if (1 < ++e) return "</p><p>";
                } else if (0 < --e) return "</p><p>";
                return a;
            }).replace(/<p><\/p>/g, "");
            return f(a, b);
        }
        function f(a, b) {
            return a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function(a) {
                return CKEDITOR.tools.repeat("<br>", 2 * (a.length / 7));
            }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>")), 
            b;
        }
        CKEDITOR.plugins.add("clipboard", {
            requires: "dialog",
            init: function(f) {
                var g;
                a(f), CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")), 
                f.on("paste", function(a) {
                    var b = a.data.dataValue, c = CKEDITOR.dtd.$block;
                    if (-1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), 
                    "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
                        return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;");
                    })), -1 < b.indexOf('<br class="Apple-interchange-newline">') && (a.data.startsWithEOL = 1, 
                    a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), 
                    b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")), b.match(/^<[^<]+cke_(editable|contents)/i)) {
                        var d, e, f = new CKEDITOR.dom.element("div");
                        for (f.setHtml(b); 1 == f.getChildCount() && (d = f.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents")); ) f = e = d;
                        e && (b = e.getHtml().replace(/<br>$/i, ""));
                    }
                    CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d) {
                        return d.toLowerCase() in c ? (a.data.preSniffing = "html", "<" + d) : b;
                    }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d) {
                        return d in c ? (a.data.endsWithEOL = 1, "</" + d + ">") : b;
                    }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")), a.data.dataValue = b;
                }, null, null, 3), f.on("paste", function(a) {
                    var h, a = a.data, i = a.type, j = a.dataValue, k = f.config.clipboard_defaultContentType || "html";
                    h = "html" == i || "html" == a.preSniffing ? "html" : b(j), "htmlifiedtext" == h ? j = c(f.config, j) : "text" == i && "html" == h && (j = e(f.config, j, g || (g = d(f)))), 
                    a.startsWithEOL && (j = '<br data-cke-eol="1">' + j), a.endsWithEOL && (j += '<br data-cke-eol="1">'), 
                    "auto" == i && (i = "html" == h || "html" == k ? "html" : "text"), a.type = i, a.dataValue = j, 
                    delete a.preSniffing, delete a.startsWithEOL, delete a.endsWithEOL;
                }, null, null, 6), f.on("paste", function(a) {
                    a = a.data, f.insertHtml(a.dataValue, a.type), setTimeout(function() {
                        f.fire("afterPaste");
                    }, 0);
                }, null, null, 1e3), f.on("pasteDialog", function(a) {
                    setTimeout(function() {
                        f.openDialog("paste", a.data);
                    }, 0);
                });
            }
        });
    }(), function() {
        var a = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && 10900 <= CKEDITOR.env.version && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"';
        (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) && (a += ' onkeypress="return false;"'), 
        CKEDITOR.env.gecko && (a += ' onblur="this.style.cssText = this.style.cssText;"');
        var a = a + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);"  onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'), a = a + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>', b = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"), c = CKEDITOR.addTemplate("button", a);
        CKEDITOR.plugins.add("button", {
            beforeInit: function(a) {
                a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler);
            }
        }), CKEDITOR.UI_BUTTON = "button", CKEDITOR.ui.button = function(a) {
            CKEDITOR.tools.extend(this, a, {
                title: a.label,
                click: a.click || function(b) {
                    b.execCommand(a.command);
                }
            }), this._ = {};
        }, CKEDITOR.ui.button.handler = {
            create: function(a) {
                return new CKEDITOR.ui.button(a);
            }
        }, CKEDITOR.ui.button.prototype = {
            render: function(a, d) {
                var e, f = CKEDITOR.env, g = this._.id = CKEDITOR.tools.getNextId(), h = "", i = this.command;
                this._.editor = a;
                var j = {
                    id: g,
                    button: this,
                    editor: a,
                    focus: function() {
                        CKEDITOR.document.getById(g).focus();
                    },
                    execute: function() {
                        this.button.click(a);
                    },
                    attach: function(a) {
                        this.button.attach(a);
                    }
                }, k = CKEDITOR.tools.addFunction(function(a) {
                    return j.onkey ? (a = new CKEDITOR.dom.event(a), !1 !== j.onkey(j, a.getKeystroke())) : void 0;
                }), l = CKEDITOR.tools.addFunction(function(a) {
                    var b;
                    return j.onfocus && (b = !1 !== j.onfocus(j, new CKEDITOR.dom.event(a))), CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version && a.preventBubble(), 
                    b;
                }), m = 0, n = CKEDITOR.tools.addFunction(function() {
                    if (CKEDITOR.env.opera) {
                        var b = a.editable();
                        b.isInline() && b.hasFocus && (a.lockSelection(), m = 1);
                    }
                });
                if (j.clickFn = e = CKEDITOR.tools.addFunction(function() {
                    m && (a.unlockSelection(1), m = 0), j.execute();
                }), this.modes) {
                    var o = {}, p = function() {
                        var b = a.mode;
                        b && (b = this.modes[b] ? void 0 != o[b] ? o[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, 
                        b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b, this.setState(b), 
                        this.refresh && this.refresh());
                    };
                    a.on("beforeModeUnload", function() {
                        a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (o[a.mode] = this._.state);
                    }, this), a.on("activeFilterChange", p, this), a.on("mode", p, this), !this.readOnly && a.on("readOnly", p, this);
                } else i && (i = a.getCommand(i)) && (i.on("state", function() {
                    this.setState(i.state);
                }, this), h += i.state == CKEDITOR.TRISTATE_ON ? "on" : i.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
                this.directional && a.on("contentDirChanged", function(b) {
                    var c = CKEDITOR.document.getById(this._.id), d = c.getFirst(), b = b.data;
                    b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl"), 
                    d.setAttribute("style", CKEDITOR.skin.getIconStyle(q, "rtl" == b, this.icon, this.iconOffset));
                }, this), i || (h += "off");
                var q = p = this.name || this.command;
                return this.icon && !/\./.test(this.icon) && (q = this.icon, this.icon = null), 
                f = {
                    id: g,
                    name: p,
                    iconName: q,
                    label: this.label,
                    cls: this.className || "",
                    state: h,
                    ariaDisabled: "disabled" == h ? "true" : "false",
                    title: this.title,
                    titleJs: f.gecko && 10900 <= f.version && !f.hc ? "" : (this.title || "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: k,
                    mousedownFn: n,
                    focusFn: l,
                    clickFn: e,
                    style: CKEDITOR.skin.getIconStyle(q, "rtl" == a.lang.dir, this.icon, this.iconOffset),
                    arrowHtml: this.hasArrow ? b.output() : ""
                }, c.output(f, d), this.onRender && this.onRender(), j;
            },
            setState: function(a) {
                if (this._.state == a) return !1;
                this._.state = a;
                var b = CKEDITOR.document.getById(this._.id);
                return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"), 
                a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), 
                !0) : !1;
            },
            getState: function() {
                return this._.state;
            },
            toFeature: function(a) {
                if (this._.feature) return this._.feature;
                var b = this;
                return !this.allowedContent && !this.requiredContent && this.command && (b = a.getCommand(this.command) || b), 
                this._.feature = b;
            }
        }, CKEDITOR.ui.prototype.addButton = function(a, b) {
            this.add(a, CKEDITOR.UI_BUTTON, b);
        };
    }(), function() {
        function a(a) {
            function c() {
                for (var c = d(), f = CKEDITOR.tools.clone(a.config.toolbarGroups) || b(a), g = 0; g < f.length; g++) {
                    var h = f[g];
                    if ("/" != h) {
                        "string" == typeof h && (h = f[g] = {
                            name: h
                        });
                        var i, j = h.groups;
                        if (j) for (var k = 0; k < j.length; k++) i = j[k], (i = c[i]) && e(h, i);
                        (i = c[h.name]) && e(h, i);
                    }
                }
                return f;
            }
            function d() {
                var b, c, d, e = {};
                for (b in a.ui.items) c = a.ui.items[b], d = c.toolbar || "others", d = d.split(","), 
                c = d[0], d = parseInt(d[1] || -1, 10), e[c] || (e[c] = []), e[c].push({
                    name: b,
                    order: d
                });
                for (c in e) e[c] = e[c].sort(function(a, b) {
                    return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1;
                });
                return e;
            }
            function e(b, c) {
                if (c.length) {
                    b.items ? b.items.push(a.ui.create("-")) : b.items = [];
                    for (var d; d = c.shift(); ) d = "string" == typeof d ? d : d.name, g && -1 != CKEDITOR.tools.indexOf(g, d) || (d = a.ui.create(d)) && a.addFeature(d) && b.items.push(d);
                }
            }
            function f(a) {
                var b, c, d, f = [];
                for (b = 0; b < a.length; ++b) c = a[b], d = {}, "/" == c ? f.push(c) : CKEDITOR.tools.isArray(c) ? (e(d, CKEDITOR.tools.clone(c)), 
                f.push(d)) : c.items && (e(d, CKEDITOR.tools.clone(c.items)), d.name = c.name, f.push(d));
                return f;
            }
            var g = a.config.removeButtons, g = g && g.split(","), h = a.config.toolbar;
            return "string" == typeof h && (h = a.config["toolbar_" + h]), a.toolbar = h ? f(h) : c();
        }
        function b(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [ {
                name: "document",
                groups: [ "mode", "document", "doctools" ]
            }, {
                name: "clipboard",
                groups: [ "clipboard", "undo" ]
            }, {
                name: "editing",
                groups: [ "find", "selection", "spellchecker" ]
            }, {
                name: "forms"
            }, "/", {
                name: "basicstyles",
                groups: [ "basicstyles", "cleanup" ]
            }, {
                name: "paragraph",
                groups: [ "list", "indent", "blocks", "align", "bidi" ]
            }, {
                name: "links"
            }, {
                name: "insert"
            }, "/", {
                name: "styles"
            }, {
                name: "colors"
            }, {
                name: "tools"
            }, {
                name: "others"
            }, {
                name: "about"
            } ]);
        }
        var c = function() {
            this.toolbars = [], this.focusCommandExecuted = !1;
        };
        c.prototype.focus = function() {
            for (var a, b = 0; a = this.toolbars[b++]; ) for (var c, d = 0; c = a.items[d++]; ) if (c.focus) return void c.focus();
        };
        var d = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            readOnly: 1,
            exec: function(a) {
                a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
                    a.toolbox.focus();
                }, 100) : a.toolbox.focus());
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button",
            init: function(b) {
                var e, f = function(a, c) {
                    var d, g = "rtl" == b.lang.dir, h = b.config.toolbarGroupCycling, i = g ? 37 : 39, g = g ? 39 : 37, h = void 0 === h || h;
                    switch (c) {
                      case 9:
                      case CKEDITOR.SHIFT + 9:
                        for (;!d || !d.items.length; ) if (d = 9 == c ? (d ? d.next : a.toolbar.next) || b.toolbox.toolbars[0] : (d ? d.previous : a.toolbar.previous) || b.toolbox.toolbars[b.toolbox.toolbars.length - 1], 
                        d.items.length) for (a = d.items[e ? d.items.length - 1 : 0]; a && !a.focus; ) (a = e ? a.previous : a.next) || (d = 0);
                        return a && a.focus(), !1;

                      case i:
                        d = a;
                        do d = d.next, !d && h && (d = a.toolbar.items[0]); while (d && !d.focus);
                        return d ? d.focus() : f(a, 9), !1;

                      case 40:
                        return a.button && a.button.hasArrow ? (b.once("panelShow", function(a) {
                            a.data._.panel._.currentBlock.onKeyDown(40);
                        }), a.execute()) : f(a, 40 == c ? i : g), !1;

                      case g:
                      case 38:
                        d = a;
                        do d = d.previous, !d && h && (d = a.toolbar.items[a.toolbar.items.length - 1]); while (d && !d.focus);
                        return d ? d.focus() : (e = 1, f(a, CKEDITOR.SHIFT + 9), e = 0), !1;

                      case 27:
                        return b.focus(), !1;

                      case 13:
                      case 32:
                        return a.execute(), !1;
                    }
                    return !0;
                };
                b.on("uiSpace", function(d) {
                    if (d.data.space == b.config.toolbarLocation) {
                        d.removeListener(), b.toolbox = new c();
                        var e, g, h = CKEDITOR.tools.getNextId(), i = [ '<span id="', h, '" class="cke_voice_label">', b.lang.toolbar.toolbars, "</span>", '<span id="' + b.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', h, '" onmousedown="return false;">' ], h = !1 !== b.config.toolbarStartupExpanded;
                        b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && i.push('<span class="cke_toolbox_main"' + (h ? ">" : ' style="display:none">'));
                        for (var j = b.toolbox.toolbars, k = a(b), l = 0; l < k.length; l++) {
                            var m, n, o, p = 0, q = k[l];
                            if (q) if (e && (i.push("</span>"), g = e = 0), "/" === q) i.push('<span class="cke_toolbar_break"></span>'); else {
                                o = q.items || q;
                                for (var r = 0; r < o.length; r++) {
                                    var s, t = o[r];
                                    if (t) if (t.type == CKEDITOR.UI_SEPARATOR) g = e && t; else {
                                        if (s = !1 !== t.canGroup, !p) {
                                            m = CKEDITOR.tools.getNextId(), p = {
                                                id: m,
                                                items: []
                                            }, n = q.name && (b.lang.toolbar.toolbarGroups[q.name] || q.name), i.push('<span id="', m, '" class="cke_toolbar"', n ? ' aria-labelledby="' + m + '_label"' : "", ' role="toolbar">'), 
                                            n && i.push('<span id="', m, '_label" class="cke_voice_label">', n, "</span>"), 
                                            i.push('<span class="cke_toolbar_start"></span>');
                                            var u = j.push(p) - 1;
                                            u > 0 && (p.previous = j[u - 1], p.previous.next = p);
                                        }
                                        s ? e || (i.push('<span class="cke_toolgroup" role="presentation">'), e = 1) : e && (i.push("</span>"), 
                                        e = 0), m = function(a) {
                                            a = a.render(b, i), u = p.items.push(a) - 1, u > 0 && (a.previous = p.items[u - 1], 
                                            a.previous.next = a), a.toolbar = p, a.onkey = f, a.onfocus = function() {
                                                b.toolbox.focusCommandExecuted || b.focus();
                                            };
                                        }, g && (m(g), g = 0), m(t);
                                    }
                                }
                                e && (i.push("</span>"), g = e = 0), p && i.push('<span class="cke_toolbar_end"></span></span>');
                            }
                        }
                        if (b.config.toolbarCanCollapse && i.push("</span>"), b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var v = CKEDITOR.tools.addFunction(function() {
                                b.execCommand("toolbarCollapse");
                            });
                            b.on("destroy", function() {
                                CKEDITOR.tools.removeFunction(v);
                            }), b.addCommand("toolbarCollapse", {
                                readOnly: 1,
                                exec: function(a) {
                                    var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), d = a.ui.space("contents"), e = c.getParent(), f = parseInt(d.$.style.height, 10), g = e.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min");
                                    h ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(), 
                                    b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand)), 
                                    b.getFirst().setText(h ? "▲" : "◀"), d.setStyle("height", f - (e.$.offsetHeight - g) + "px"), 
                                    a.fire("resize");
                                },
                                modes: {
                                    wysiwyg: 1,
                                    source: 1
                                }
                            }), b.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"), 
                            i.push('<a title="' + (h ? b.lang.toolbar.toolbarCollapse : b.lang.toolbar.toolbarExpand) + '" id="' + b.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser'), 
                            h || i.push(" cke_toolbox_collapser_min"), i.push('" onclick="CKEDITOR.tools.callFunction(' + v + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>");
                        }
                        i.push("</span>"), d.data.html += i.join("");
                    }
                }), b.on("destroy", function() {
                    if (this.toolbox) {
                        var a, b, c, d, e = 0;
                        for (a = this.toolbox.toolbars; e < a.length; e++) for (c = a[e].items, b = 0; b < c.length; b++) d = c[b], 
                        d.clickFn && CKEDITOR.tools.removeFunction(d.clickFn), d.keyDownFn && CKEDITOR.tools.removeFunction(d.keyDownFn);
                    }
                }), b.on("uiReady", function() {
                    var a = b.ui.space("toolbox");
                    a && b.focusManager.add(a, 1);
                }), b.addCommand("toolbarFocus", d), b.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"), 
                b.ui.add("-", CKEDITOR.UI_SEPARATOR, {}), b.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                    create: function() {
                        return {
                            render: function(a, b) {
                                return b.push('<span class="cke_toolbar_separator" role="separator"></span>'), {};
                            }
                        };
                    }
                });
            }
        }), CKEDITOR.ui.prototype.addToolbarGroup = function(a, c, d) {
            var e = b(this.editor), f = 0 === c, g = {
                name: a
            };
            if (d) {
                if (d = CKEDITOR.tools.search(e, function(a) {
                    return a.name == d;
                })) return !d.groups && (d.groups = []), c && (c = CKEDITOR.tools.indexOf(d.groups, c), 
                c >= 0) ? void d.groups.splice(c + 1, 0, a) : void (f ? d.groups.splice(0, 0, a) : d.groups.push(a));
                c = null;
            }
            c && (c = CKEDITOR.tools.indexOf(e, function(a) {
                return a.name == c;
            })), f ? e.splice(0, 0, a) : "number" == typeof c ? e.splice(c + 1, 0, g) : e.push(a);
        };
    }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", 
    function() {
        function a(a, b, c) {
            c = a.config.forceEnterMode || c, "wysiwyg" == a.mode && (b || (b = a.activeEnterMode), 
            a.elementPath().isContextFor("p") || (b = CKEDITOR.ENTER_BR, c = 1), a.fire("saveSnapshot"), 
            b == CKEDITOR.ENTER_BR ? f(a, b, null, c) : g(a, b, null, c), a.fire("saveSnapshot"));
        }
        function b(a) {
            for (var a = a.getSelection().getRanges(!0), b = a.length - 1; b > 0; b--) a[b].deleteContents();
            return a[0];
        }
        CKEDITOR.plugins.add("enterkey", {
            init: function(b) {
                b.addCommand("enter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function(b) {
                        a(b);
                    }
                }), b.addCommand("shiftEnter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function(b) {
                        a(b, b.activeShiftEnterMode, 1);
                    }
                }), b.setKeystroke([ [ 13, "enter" ], [ CKEDITOR.SHIFT + 13, "shiftEnter" ] ]);
            }
        });
        var c = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function(a, e, g, i) {
                if (g = g || b(a)) {
                    var j, k = g.document, l = g.checkStartOfBlock(), m = g.checkEndOfBlock(), n = a.elementPath(g.startContainer).block, o = e == CKEDITOR.ENTER_DIV ? "div" : "p";
                    if (l && m) {
                        if (n && (n.is("li") || n.getParent().is("li"))) {
                            g = n.getParent(), j = g.getParent();
                            var i = !n.hasPrevious(), p = !n.hasNext(), o = a.getSelection(), q = o.createBookmarks(), l = n.getDirection(1), m = n.getAttribute("class"), r = n.getAttribute("style"), s = j.getDirection(1) != l, a = a.enterMode != CKEDITOR.ENTER_BR || s || r || m;
                            if (j.is("li")) i || p ? n[i ? "insertBefore" : "insertAfter"](j) : n.breakParent(j); else {
                                if (a) j = k.createElement(e == CKEDITOR.ENTER_P ? "p" : "div"), s && j.setAttribute("dir", l), 
                                r && j.setAttribute("style", r), m && j.setAttribute("class", m), n.moveChildren(j), 
                                i || p ? j[i ? "insertBefore" : "insertAfter"](g) : (n.breakParent(g), j.insertAfter(g)); else if (n.appendBogus(!0), 
                                i || p) for (;k = n[i ? "getFirst" : "getLast"](); ) k[i ? "insertBefore" : "insertAfter"](g); else for (n.breakParent(g); k = n.getLast(); ) k.insertAfter(g);
                                n.remove();
                            }
                            return void o.selectBookmarks(q);
                        }
                        if (n && n.getParent().is("blockquote")) return n.breakParent(n.getParent()), n.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || n.getPrevious().remove(), 
                        n.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || n.getNext().remove(), 
                        g.moveToElementEditStart(n), void g.select();
                    } else if (n && n.is("pre") && !m) return void f(a, e, g, i);
                    if (m = g.splitBlock(o)) {
                        if (e = m.previousBlock, n = m.nextBlock, a = m.wasStartOfBlock, l = m.wasEndOfBlock, 
                        n ? (q = n.getParent(), q.is("li") && (n.breakParent(q), n.move(n.getNext(), 1))) : e && (q = e.getParent()) && q.is("li") && (e.breakParent(q), 
                        q = e.getNext(), g.moveToElementEditStart(q), e.move(e.getPrevious())), a || l) {
                            if (e ? (e.is("li") || !h.test(e.getName()) && !e.is("pre")) && (j = e.clone()) : n && (j = n.clone()), 
                            j ? i && !j.is("li") && j.renameNode(o) : q && q.is("li") ? j = q : (j = k.createElement(o), 
                            e && (p = e.getDirection()) && j.setAttribute("dir", p)), k = m.elementPath) for (i = 0, 
                            o = k.elements.length; o > i && (q = k.elements[i], !q.equals(k.block) && !q.equals(k.blockLimit)); i++) CKEDITOR.dtd.$removeEmpty[q.getName()] && (q = q.clone(), 
                            j.moveChildren(q), j.append(q));
                            j.appendBogus(), j.getParent() || g.insertNode(j), j.is("li") && j.removeAttribute("value"), 
                            !CKEDITOR.env.ie || !a || l && e.getChildCount() || (g.moveToElementEditStart(l ? e : j), 
                            g.select()), g.moveToElementEditStart(a && !l ? n : j);
                        } else n.is("li") && (j = g.clone(), j.selectNodeContents(n), j = new CKEDITOR.dom.walker(j), 
                        j.evaluator = function(a) {
                            return !(d(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty));
                        }, (q = j.next()) && q.type == CKEDITOR.NODE_ELEMENT && q.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? k.createElement("br") : k.createText(" ")).insertBefore(q)), 
                        n && g.moveToElementEditStart(n);
                        g.select(), g.scrollIntoView();
                    }
                }
            },
            enterBr: function(a, c, d, e) {
                if (d = d || b(a)) {
                    var f = d.document, i = d.checkEndOfBlock(), j = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), k = j.block, j = k && j.block.getName();
                    e || "li" != j ? (!e && i && h.test(j) ? (i = k.getDirection()) ? (f = f.createElement("div"), 
                    f.setAttribute("dir", i), f.insertAfter(k), d.setStart(f, 0)) : (f.createElement("br").insertAfter(k), 
                    CKEDITOR.env.gecko && f.createText("").insertAfter(k), d.setStartAt(k.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (k = "pre" == j && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? f.createText("\r") : f.createElement("br"), 
                    d.deleteContents(), d.insertNode(k), CKEDITOR.env.needsBrFiller ? (f.createText("").insertAfter(k), 
                    i && k.getParent().appendBogus(), k.getNext().$.nodeValue = "", d.setStartAt(k.getNext(), CKEDITOR.POSITION_AFTER_START)) : d.setStartAt(k, CKEDITOR.POSITION_AFTER_END)), 
                    d.collapse(!0), d.select(), d.scrollIntoView()) : g(a, c, d, e);
                }
            }
        };
        var e = CKEDITOR.plugins.enterkey, f = e.enterBr, g = e.enterBlock, h = /^h[1-6]$/;
    }(), function() {
        function a(a, b) {
            var c = {}, d = [], e = {
                nbsp: " ",
                shy: "­",
                gt: ">",
                lt: "<",
                amp: "&",
                apos: "'",
                quot: '"'
            }, a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(a, f) {
                var g = b ? "&" + f + ";" : e[f];
                return c[g] = b ? e[f] : "&" + f + ";", d.push(g), "";
            });
            if (!b && a) {
                var f, a = a.split(","), g = document.createElement("div");
                for (g.innerHTML = "&" + a.join(";&") + ";", f = g.innerHTML, g = null, g = 0; g < f.length; g++) {
                    var h = f.charAt(g);
                    c[h] = "&" + a[g] + ";", d.push(h);
                }
            }
            return c.regex = d.join(b ? "|" : ""), c;
        }
        CKEDITOR.plugins.add("entities", {
            afterInit: function(b) {
                var c = b.config;
                if (b = (b = b.dataProcessor) && b.htmlFilter) {
                    var d = [];
                    !1 !== c.basicEntities && d.push("nbsp,gt,lt,amp"), c.entities && (d.length && d.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"), 
                    c.entities_latin && d.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), 
                    c.entities_greek && d.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"), 
                    c.entities_additional && d.push(c.entities_additional));
                    var e = a(d.join(",")), f = e.regex ? "[" + e.regex + "]" : "a^";
                    delete e.regex, c.entities && c.entities_processNumerical && (f = "[^ -~]|" + f);
                    var f = RegExp(f, "g"), g = function(a) {
                        return "force" != c.entities_processNumerical && e[a] ? e[a] : "&#" + a.charCodeAt(0) + ";";
                    }, h = a("nbsp,gt,lt,amp,shy", !0), i = RegExp(h.regex, "g"), j = function(a) {
                        return h[a];
                    };
                    b.addRules({
                        text: function(a) {
                            return a.replace(i, j).replace(f, g);
                        }
                    }, {
                        applyToAll: !0
                    });
                }
            }
        });
    }(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, 
    CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional = "#39", 
    function() {
        function a(a) {
            var e = a.config, f = a.fire("uiSpace", {
                space: "top",
                html: ""
            }).html, g = function() {
                function b(a, b, c) {
                    h.setStyle(b, d(c)), h.setStyle("position", a);
                }
                function f(a) {
                    var c = j.getDocumentPosition();
                    switch (a) {
                      case "top":
                        b("absolute", "top", c.y - n - q);
                        break;

                      case "pin":
                        b("fixed", "top", s);
                        break;

                      case "bottom":
                        b("absolute", "top", c.y + (l.height || l.bottom - l.top) + q);
                    }
                    i = a;
                }
                var i, j, k, l, m, n, o, p = e.floatSpaceDockedOffsetX || 0, q = e.floatSpaceDockedOffsetY || 0, r = e.floatSpacePinnedOffsetX || 0, s = e.floatSpacePinnedOffsetY || 0;
                return function(b) {
                    if (j = a.editable()) if (b && "focus" == b.name && h.show(), h.removeStyle("left"), 
                    h.removeStyle("right"), k = h.getClientRect(), l = j.getClientRect(), m = c.getViewPaneSize(), 
                    n = k.height, o = "pageXOffset" in c.$ ? c.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft, 
                    i) {
                        f(n + q <= l.top ? "top" : n + q > m.height - l.bottom ? "pin" : "bottom");
                        var e, b = m.width / 2, b = 0 < l.left && l.right < m.width && l.width > k.width ? "rtl" == a.config.contentsLangDirection ? "right" : "left" : b - l.left > l.right - b ? "left" : "right";
                        k.width > m.width ? (b = "left", e = 0) : (e = "left" == b ? 0 < l.left ? l.left : 0 : l.right < m.width ? m.width - l.right : 0, 
                        e + k.width > m.width && (b = "left" == b ? "right" : "left", e = 0)), h.setStyle(b, d(("pin" == i ? r : p) + e + ("pin" == i ? 0 : "left" == b ? o : -o)));
                    } else i = "pin", f("pin"), g(b);
                };
            }();
            if (f) {
                var h = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(b.output({
                    content: f,
                    id: a.id,
                    langDir: a.lang.dir,
                    langCode: a.langCode,
                    name: a.name,
                    style: "display:none;z-index:" + (e.baseFloatZIndex - 1),
                    topId: a.ui.spaceId("top"),
                    voiceLabel: a.lang.editorPanel + ", " + a.name
                }))), i = CKEDITOR.tools.eventsBuffer(500, g), j = CKEDITOR.tools.eventsBuffer(100, g);
                h.unselectable(), h.on("mousedown", function(a) {
                    a = a.data, a.getTarget().hasAscendant("a", 1) || a.preventDefault();
                }), a.on("focus", function(b) {
                    g(b), a.on("change", i.input), c.on("scroll", j.input), c.on("resize", j.input);
                }), a.on("blur", function() {
                    h.hide(), a.removeListener("change", i.input), c.removeListener("scroll", j.input), 
                    c.removeListener("resize", j.input);
                }), a.on("destroy", function() {
                    c.removeListener("scroll", j.input), c.removeListener("resize", j.input), h.clearCustomData(), 
                    h.remove();
                }), a.focusManager.hasFocus && h.show(), a.focusManager.add(h, 1);
            }
        }
        var b = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'), c = CKEDITOR.document.getWindow(), d = CKEDITOR.tools.cssLength;
        CKEDITOR.plugins.add("floatingspace", {
            init: function(b) {
                b.on("loaded", function() {
                    a(this);
                }, null, null, 20);
            }
        });
    }(), function() {
        function a(a) {
            var b = this.editor, c = a.document, d = c.body;
            (a = c.getElementById("cke_actscrpt")) && a.parentNode.removeChild(a), (a = c.getElementById("cke_shimscrpt")) && a.parentNode.removeChild(a), 
            CKEDITOR.env.gecko && (d.contentEditable = !1, 2e4 > CKEDITOR.env.version && (d.innerHTML = d.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, ""), 
            setTimeout(function() {
                var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(c));
                a.setStart(new CKEDITOR.dom.node(d), 0), b.getSelection().selectRanges([ a ]);
            }, 0))), d.contentEditable = !0, CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, 
            d.removeAttribute("disabled")), delete this._.isLoadingData, this.$ = d, c = new CKEDITOR.dom.document(c), 
            this.setup(), CKEDITOR.env.ie && (c.getDocumentElement().addClass(c.$.compatMode), 
            b.config.enterMode != CKEDITOR.ENTER_P && this.attachListener(c, "selectionchange", function() {
                var a = c.getBody(), d = b.getSelection(), e = d && d.getRanges()[0];
                e && a.getHtml().match(/^<p>(?:&nbsp;|<br>)<\/p>$/i) && e.startContainer.equals(a) && setTimeout(function() {
                    e = b.getSelection().getRanges()[0], e.startContainer.equals("body") || (a.getFirst().remove(1), 
                    e.moveToElementEditEnd(a), e.select());
                }, 0);
            })), (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) && c.getDocumentElement().on("mousedown", function(a) {
                a.data.getTarget().is("html") && setTimeout(function() {
                    b.editable().focus();
                });
            });
            try {
                b.document.$.execCommand("2D-position", !1, !0);
            } catch (e) {}
            try {
                b.document.$.execCommand("enableInlineTableEditing", !1, !b.config.disableNativeTableHandles);
            } catch (f) {}
            if (b.config.disableObjectResizing) try {
                this.getDocument().$.execCommand("enableObjectResizing", !1, !1);
            } catch (g) {
                this.attachListener(this, CKEDITOR.env.ie ? "resizestart" : "resize", function(a) {
                    a.data.preventDefault();
                });
            }
            (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == b.document.$.compatMode) && this.attachListener(this, "keydown", function(a) {
                var c = a.data.getKeystroke();
                if (33 == c || 34 == c) if (CKEDITOR.env.ie) setTimeout(function() {
                    b.getSelection().scrollIntoView();
                }, 0); else if (b.window.$.innerHeight > this.$.offsetHeight) {
                    var d = b.createRange();
                    d[33 == c ? "moveToElementEditStart" : "moveToElementEditEnd"](this), d.select(), 
                    a.data.preventDefault();
                }
            }), CKEDITOR.env.ie && this.attachListener(c, "blur", function() {
                try {
                    c.$.selection.empty();
                } catch (a) {}
            }), b.document.getElementsByTag("title").getItem(0).data("cke-title", b.document.$.title), 
            CKEDITOR.env.ie && (b.document.$.title = this._.docTitle), CKEDITOR.tools.setTimeout(function() {
                b.fire("contentDom"), this._.isPendingFocus && (b.focus(), this._.isPendingFocus = !1), 
                setTimeout(function() {
                    b.fire("dataReady");
                }, 0), CKEDITOR.env.ie && setTimeout(function() {
                    if (b.document) {
                        var a = b.document.$.body;
                        a.runtimeStyle.marginBottom = "0px", a.runtimeStyle.marginBottom = "";
                    }
                }, 1e3);
            }, 0, this);
        }
        function b() {
            var a = [];
            if (8 <= CKEDITOR.document.$.documentMode) {
                a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                var b, c = [];
                for (b in CKEDITOR.dtd.$removeEmpty) c.push("html.CSS1Compat " + b + "[contenteditable=false]");
                a.push(c.join(",") + "{display:inline-block}");
            } else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
            return a.push("html{cursor:text;*cursor:auto}"), a.push("img,input,textarea{cursor:default}"), 
            a.join("\n");
        }
        CKEDITOR.plugins.add("wysiwygarea", {
            init: function(a) {
                a.config.fullPage && a.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                }), a.addMode("wysiwyg", function(b) {
                    function d(d) {
                        d && d.removeListener(), a.editable(new c(a, f.$.contentWindow.document.body)), 
                        a.setData(a.getData(1), b);
                    }
                    var e = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", e = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(e) + "}())" : "", f = CKEDITOR.dom.element.createFromHtml('<iframe src="' + e + '" frameBorder="0"></iframe>');
                    f.setStyles({
                        width: "100%",
                        height: "100%"
                    }), f.addClass("cke_wysiwyg_frame cke_reset");
                    var g = a.ui.space("contents");
                    g.append(f), (e = CKEDITOR.env.ie || CKEDITOR.env.gecko) && f.on("load", d);
                    var h = a.title, i = a.lang.common.editorHelp;
                    h && (CKEDITOR.env.ie && (h += ", " + i), f.setAttribute("title", h));
                    var h = CKEDITOR.tools.getNextId(), j = CKEDITOR.dom.element.createFromHtml('<span id="' + h + '" class="cke_voice_label">' + i + "</span>");
                    g.append(j, 1), a.on("beforeModeUnload", function(a) {
                        a.removeListener(), j.remove();
                    }), f.setAttributes({
                        "aria-describedby": h,
                        tabIndex: a.tabIndex,
                        allowTransparency: "true"
                    }), !e && d(), CKEDITOR.env.webkit && (e = function() {
                        g.setStyle("width", "100%"), f.hide(), f.setSize("width", g.getSize("width")), g.removeStyle("width"), 
                        f.show();
                    }, f.setCustomData("onResize", e), CKEDITOR.document.getWindow().on("resize", e)), 
                    a.fire("ariaWidget", f);
                });
            }
        });
        var c = CKEDITOR.tools.createClass({
            $: function() {
                this.base.apply(this, arguments), this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(b) {
                    CKEDITOR.tools.setTimeout(a, 0, this, b);
                }, this), this._.docTitle = this.getWindow().getFrame().getAttribute("title");
            },
            base: CKEDITOR.editable,
            proto: {
                setData: function(a, c) {
                    var d = this.editor;
                    if (c) this.setHtml(a), d.fire("dataReady"); else {
                        this._.isLoadingData = !0, d._.dataStore = {
                            id: 1
                        };
                        var e = d.config, f = e.fullPage, g = e.docType, h = CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/, '<style data-cke-temp="1">');
                        f || (h += CKEDITOR.tools.buildStyleHtml(d.config.contentsCss));
                        var i = e.baseHref ? '<base href="' + e.baseHref + '" data-cke-temp="1" />' : "";
                        f && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
                            return d.docType = g = a, "";
                        }).replace(/<\?xml\s[^\?]*\?>/i, function(a) {
                            return d.xmlDeclaration = a, "";
                        })), a = d.dataProcessor.toHtml(a), f ? (/<body[\s|>]/.test(a) || (a = "<body>" + a), 
                        /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) : a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>"), 
                        i && (a = a.replace(/<head>/, "$&" + i)), a = a.replace(/<\/head\s*>/, h + "$&"), 
                        a = g + a) : a = e.docType + '<html dir="' + e.contentsLangDirection + '" lang="' + (e.contentsLanguage || d.langCode) + '"><head><title>' + this._.docTitle + "</title>" + i + h + "</head><body" + (e.bodyId ? ' id="' + e.bodyId + '"' : "") + (e.bodyClass ? ' class="' + e.bodyClass + '"' : "") + ">" + a + "</body></html>", 
                        CKEDITOR.env.gecko && (a = a.replace(/<body/, '<body contenteditable="true" '), 
                        2e4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$&<!-- cke-content-start -->"))), 
                        e = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "</script>", 
                        CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (e += '<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)</script>'), 
                        a = a.replace(/(?=\s*<\/(:?head)>)/, e), this.clearCustomData(), this.clearListeners(), 
                        d.fire("contentDomUnload");
                        var j = this.getDocument();
                        try {
                            j.write(a);
                        } catch (k) {
                            setTimeout(function() {
                                j.write(a);
                            }, 0);
                        }
                    }
                },
                getData: function(a) {
                    if (a) return this.getHtml();
                    var a = this.editor, b = a.config, c = b.fullPage, d = c && a.docType, e = c && a.xmlDeclaration, f = this.getDocument(), c = c ? f.getDocumentElement().getOuterHtml() : f.getBody().getHtml();
                    return CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, "")), 
                    c = a.dataProcessor.toDataFormat(c), e && (c = e + "\n" + c), d && (c = d + "\n" + c), 
                    c;
                },
                focus: function() {
                    this._.isLoadingData ? this._.isPendingFocus = !0 : c.baseProto.focus.call(this);
                },
                detach: function() {
                    var a = this.editor, b = a.document, d = a.window.getFrame();
                    c.baseProto.detach.call(this), this.clearCustomData(), b.getDocumentElement().clearCustomData(), 
                    d.clearCustomData(), CKEDITOR.tools.removeFunction(this._.frameLoadedHandler), (b = d.removeCustomData("onResize")) && b.removeListener(), 
                    a.fire("contentDomUnload"), d.remove();
                }
            }
        });
    }(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, 
    CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.contentsCss = CKEDITOR.basePath + "contents.css", 
    function() {
        function a(a, d) {
            var e, f;
            d.on("refresh", function(a) {
                var d, e = [ b ];
                for (d in a.data.states) e.push(a.data.states[d]);
                this.setState(CKEDITOR.tools.search(e, c) ? c : b);
            }, d, null, 100), d.on("exec", function(b) {
                e = a.getSelection(), f = e.createBookmarks(1), b.data || (b.data = {}), b.data.done = !1;
            }, d, null, 0), d.on("exec", function() {
                a.forceNextSelectionCheck(), e.selectBookmarks(f);
            }, d, null, 100);
        }
        var b = CKEDITOR.TRISTATE_DISABLED, c = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indent", {
            init: function(b) {
                var c = CKEDITOR.plugins.indent.genericDefinition;
                a(b, b.addCommand("indent", new c(!0))), a(b, b.addCommand("outdent", new c())), 
                b.ui.addButton && (b.ui.addButton("Indent", {
                    label: b.lang.indent.indent,
                    command: "indent",
                    directional: !0,
                    toolbar: "indent,20"
                }), b.ui.addButton("Outdent", {
                    label: b.lang.indent.outdent,
                    command: "outdent",
                    directional: !0,
                    toolbar: "indent,10"
                })), b.on("dirChanged", function(a) {
                    var c = b.createRange(), d = a.data.node;
                    c.setStartBefore(d), c.setEndAfter(d);
                    for (var e, f = new CKEDITOR.dom.walker(c); e = f.next(); ) if (e.type == CKEDITOR.NODE_ELEMENT) if (!e.equals(d) && e.getDirection()) c.setStartAfter(e), 
                    f = new CKEDITOR.dom.walker(c); else {
                        var g = b.config.indentClasses;
                        if (g) for (var h = "ltr" == a.data.dir ? [ "_rtl", "" ] : [ "", "_rtl" ], i = 0; i < g.length; i++) e.hasClass(g[i] + h[0]) && (e.removeClass(g[i] + h[0]), 
                        e.addClass(g[i] + h[1]));
                        g = e.getStyle("margin-right"), h = e.getStyle("margin-left"), g ? e.setStyle("margin-left", g) : e.removeStyle("margin-left"), 
                        h ? e.setStyle("margin-right", h) : e.removeStyle("margin-right");
                    }
                });
            }
        }), CKEDITOR.plugins.indent = {
            genericDefinition: function(a) {
                this.isIndent = !!a, this.startDisabled = !this.isIndent;
            },
            specificDefinition: function(a, b, c) {
                this.name = b, this.editor = a, this.jobs = {}, this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR, 
                this.isIndent = !!c, this.relatedGlobal = c ? "indent" : "outdent", this.indentKey = c ? 9 : CKEDITOR.SHIFT + 9, 
                this.database = {};
            },
            registerCommands: function(a, b) {
                a.on("pluginsLoaded", function() {
                    for (var a in b) (function(a, b) {
                        var c, d = a.getCommand(b.relatedGlobal);
                        for (c in b.jobs) d.on("exec", function(d) {
                            d.data.done || (a.fire("lockSnapshot"), b.execJob(a, c) && (d.data.done = !0), a.fire("unlockSnapshot"), 
                            CKEDITOR.dom.element.clearAllMarkers(b.database));
                        }, this, null, c), d.on("refresh", function(d) {
                            d.data.states || (d.data.states = {}), d.data.states[b.name + "@" + c] = b.refreshJob(a, c, d.data.path);
                        }, this, null, c);
                        a.addFeature(b);
                    })(this, b[a]);
                });
            }
        }, CKEDITOR.plugins.indent.genericDefinition.prototype = {
            context: "p",
            exec: function() {}
        }, CKEDITOR.plugins.indent.specificDefinition.prototype = {
            execJob: function(a, c) {
                var d = this.jobs[c];
                return d.state != b ? d.exec.call(this, a) : void 0;
            },
            refreshJob: function(a, c, d) {
                return c = this.jobs[c], c.state = a.activeFilter.checkFeature(this) ? c.refresh.call(this, a, d) : b, 
                c.state;
            },
            getContext: function(a) {
                return a.contains(this.context);
            }
        };
    }(), function() {
        function a(a) {
            function b(b) {
                for (var c = e.startContainer, i = e.endContainer; c && !c.getParent().equals(b); ) c = c.getParent();
                for (;i && !i.getParent().equals(b); ) i = i.getParent();
                if (!c || !i) return !1;
                for (var j = c, c = [], k = !1; !k; ) j.equals(i) && (k = !0), c.push(j), j = j.getNext();
                if (1 > c.length) return !1;
                for (j = b.getParents(!0), i = 0; i < j.length; i++) if (j[i].getName && h[j[i].getName()]) {
                    b = j[i];
                    break;
                }
                for (var j = f.isIndent ? 1 : -1, i = c[0], c = c[c.length - 1], k = CKEDITOR.plugins.list.listToArray(b, g), l = k[c.getCustomData("listarray_index")].indent, i = i.getCustomData("listarray_index"); i <= c.getCustomData("listarray_index"); i++) if (k[i].indent += j, 
                j > 0) {
                    var m = k[i].parent;
                    k[i].parent = new CKEDITOR.dom.element(m.getName(), m.getDocument());
                }
                for (i = c.getCustomData("listarray_index") + 1; i < k.length && k[i].indent > l; i++) k[i].indent += j;
                if (c = CKEDITOR.plugins.list.arrayToList(k, g, null, a.config.enterMode, b.getDirection()), 
                !f.isIndent) {
                    var n;
                    if ((n = b.getParent()) && n.is("li")) for (var o, j = c.listNode.getChildren(), p = [], i = j.count() - 1; i >= 0; i--) (o = j.getItem(i)) && o.is && o.is("li") && p.push(o);
                }
                if (c && c.listNode.replace(b), p && p.length) for (i = 0; i < p.length; i++) {
                    for (o = b = p[i]; (o = o.getNext()) && o.is && o.getName() in h; ) CKEDITOR.env.needsNbspFiller && !b.getFirst(d) && b.append(e.document.createText(" ")), 
                    b.append(o);
                    b.insertAfter(n);
                }
                return c && a.fire("contentDomInvalidated"), !0;
            }
            for (var e, f = this, g = this.database, h = this.context, i = a.getSelection(), i = (i && i.getRanges()).createIterator(); e = i.getNextRange(); ) {
                for (var j = e.getCommonAncestor(); j && (j.type != CKEDITOR.NODE_ELEMENT || !h[j.getName()]); ) j = j.getParent();
                if (j || (j = e.startPath().contains(h)) && e.setEndAt(j, CKEDITOR.POSITION_BEFORE_END), 
                !j) {
                    var k = e.getEnclosedNode();
                    k && k.type == CKEDITOR.NODE_ELEMENT && k.getName() in h && (e.setStartAt(k, CKEDITOR.POSITION_AFTER_START), 
                    e.setEndAt(k, CKEDITOR.POSITION_BEFORE_END), j = k);
                }
                if (j && e.startContainer.type == CKEDITOR.NODE_ELEMENT && e.startContainer.getName() in h && (k = new CKEDITOR.dom.walker(e), 
                k.evaluator = c, e.startContainer = k.next()), j && e.endContainer.type == CKEDITOR.NODE_ELEMENT && e.endContainer.getName() in h && (k = new CKEDITOR.dom.walker(e), 
                k.evaluator = c, e.endContainer = k.previous()), j) return b(j);
            }
            return 0;
        }
        function b(a, b) {
            return b || (b = a.contains(this.context)), b && a.block && a.block.equals(b.getFirst(c));
        }
        function c(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && a.is("li");
        }
        function d(a) {
            return e(a) && f(a);
        }
        var e = CKEDITOR.dom.walker.whitespaces(!0), f = CKEDITOR.dom.walker.bookmark(!1, !0), g = CKEDITOR.TRISTATE_DISABLED, h = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentlist", {
            requires: "indent",
            init: function(c) {
                function d(c) {
                    e.specificDefinition.apply(this, arguments), this.requiredContent = [ "ul", "ol" ], 
                    c.on("key", function(a) {
                        if ("wysiwyg" == c.mode && a.data.keyCode == this.indentKey) {
                            var d = this.getContext(c.elementPath());
                            !d || this.isIndent && b.call(this, c.elementPath(), d) || (c.execCommand(this.relatedGlobal), 
                            a.cancel());
                        }
                    }, this), this.jobs[this.isIndent ? 10 : 30] = {
                        refresh: this.isIndent ? function(a, c) {
                            var d = this.getContext(c), e = b.call(this, c, d);
                            return d && this.isIndent && !e ? h : g;
                        } : function(a, b) {
                            return !this.getContext(b) || this.isIndent ? g : h;
                        },
                        exec: CKEDITOR.tools.bind(a, this)
                    };
                }
                var e = CKEDITOR.plugins.indent;
                e.registerCommands(c, {
                    indentlist: new d(c, "indentlist", !0),
                    outdentlist: new d(c, "outdentlist")
                }), CKEDITOR.tools.extend(d.prototype, e.specificDefinition.prototype, {
                    context: {
                        ol: 1,
                        ul: 1
                    }
                });
            }
        });
    }(), function() {
        function a(a, b) {
            var c = d.exec(a), e = d.exec(b);
            if (c) {
                if (!c[2] && "px" == e[2]) return e[1];
                if ("px" == c[2] && !e[2]) return e[1] + "px";
            }
            return b;
        }
        var b = CKEDITOR.htmlParser.cssStyle, c = CKEDITOR.tools.cssLength, d = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, e = {
            elements: {
                $: function(c) {
                    var d = c.attributes;
                    if ((d = (d = (d = d && d["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(d))) && d.children[0]) && c.attributes["data-cke-resizable"]) {
                        var e = new b(c).rules, c = d.attributes, f = e.width, e = e.height;
                        f && (c.width = a(c.width, f)), e && (c.height = a(c.height, e));
                    }
                    return d;
                }
            }
        }, f = CKEDITOR.plugins.add("fakeobjects", {
            init: function(a) {
                a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects");
            },
            afterInit: function(a) {
                (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(e);
            }
        });
        CKEDITOR.editor.prototype.createFakeElement = function(a, d, e, g) {
            var h = this.lang.fakeobjects, h = h[e] || h.unknown, d = {
                "class": d,
                "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                "data-cke-real-node-type": a.type,
                alt: h,
                title: h,
                align: a.getAttribute("align") || ""
            };
            return CKEDITOR.env.hc || (d.src = CKEDITOR.getUrl(f.path + "images/spacer.gif")), 
            e && (d["data-cke-real-element-type"] = e), g && (d["data-cke-resizable"] = g, e = new b(), 
            g = a.getAttribute("width"), a = a.getAttribute("height"), g && (e.rules.width = c(g)), 
            a && (e.rules.height = c(a)), e.populate(d)), this.document.createElement("img", {
                attributes: d
            });
        }, CKEDITOR.editor.prototype.createFakeParserElement = function(a, d, e, g) {
            var h, i = this.lang.fakeobjects, i = i[e] || i.unknown;
            return h = new CKEDITOR.htmlParser.basicWriter(), a.writeHtml(h), h = h.getHtml(), 
            d = {
                "class": d,
                "data-cke-realelement": encodeURIComponent(h),
                "data-cke-real-node-type": a.type,
                alt: i,
                title: i,
                align: a.attributes.align || ""
            }, CKEDITOR.env.hc || (d.src = CKEDITOR.getUrl(f.path + "images/spacer.gif")), e && (d["data-cke-real-element-type"] = e), 
            g && (d["data-cke-resizable"] = g, g = a.attributes, a = new b(), e = g.width, g = g.height, 
            void 0 != e && (a.rules.width = c(e)), void 0 != g && (a.rules.height = c(g)), a.populate(d)), 
            new CKEDITOR.htmlParser.element("img", d);
        }, CKEDITOR.editor.prototype.restoreRealElement = function(b) {
            if (b.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
            var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")), this.document);
            if (b.data("cke-resizable")) {
                var d = b.getStyle("width"), b = b.getStyle("height");
                d && c.setAttribute("width", a(c.getAttribute("width"), d)), b && c.setAttribute("height", a(c.getAttribute("height"), b));
            }
            return c;
        };
    }(), CKEDITOR.plugins.add("link", {
        requires: "dialog,fakeobjects",
        onLoad: function() {
            function a(a) {
                return c.replace(/%1/g, "rtl" == a ? "right" : "left").replace(/%2/g, "cke_contents_" + a);
            }
            var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.plugins.link.synAnchorSelector ? "a.cke_anchor_empty{display:inline-block;}" : "") + ".%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" : "text-bottom") + ";}";
            CKEDITOR.addCss(a("ltr") + a("rtl"));
        },
        init: function(a) {
            var b = "a[!href]";
            CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") && (b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)")), 
            CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (b = b.replace("]", ",target,onclick]")), 
            a.addCommand("link", new CKEDITOR.dialogCommand("link", {
                allowedContent: b,
                requiredContent: "a[href]"
            })), a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
                allowedContent: "a[!name,id]",
                requiredContent: "a[name]"
            })), a.addCommand("unlink", new CKEDITOR.unlinkCommand()), a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand()), 
            a.setKeystroke(CKEDITOR.CTRL + 76, "link"), a.ui.addButton && (a.ui.addButton("Link", {
                label: a.lang.link.toolbar,
                command: "link",
                toolbar: "links,10"
            }), a.ui.addButton("Unlink", {
                label: a.lang.link.unlink,
                command: "unlink",
                toolbar: "links,20"
            }), a.ui.addButton("Anchor", {
                label: a.lang.link.anchor.toolbar,
                command: "anchor",
                toolbar: "links,30"
            })), CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"), CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"), 
            a.on("doubleclick", function(b) {
                var c = CKEDITOR.plugins.link.getSelectedLink(a) || b.data.element;
                c.isReadOnly() || (c.is("a") ? (b.data.dialog = !c.getAttribute("name") || c.getAttribute("href") && c.getChildCount() ? "link" : "anchor", 
                a.getSelection().selectElement(c)) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c) && (b.data.dialog = "anchor"));
            }), a.addMenuItems && a.addMenuItems({
                anchor: {
                    label: a.lang.link.anchor.menu,
                    command: "anchor",
                    group: "anchor",
                    order: 1
                },
                removeAnchor: {
                    label: a.lang.link.anchor.remove,
                    command: "removeAnchor",
                    group: "anchor",
                    order: 5
                },
                link: {
                    label: a.lang.link.menu,
                    command: "link",
                    group: "link",
                    order: 1
                },
                unlink: {
                    label: a.lang.link.unlink,
                    command: "unlink",
                    group: "link",
                    order: 5
                }
            }), a.contextMenu && a.contextMenu.addListener(function(b) {
                if (!b || b.isReadOnly()) return null;
                if (b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b), !b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null;
                var c = {};
                return b.getAttribute("href") && b.getChildCount() && (c = {
                    link: CKEDITOR.TRISTATE_OFF,
                    unlink: CKEDITOR.TRISTATE_OFF
                }), b && b.hasAttribute("name") && (c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF), 
                c;
            });
        },
        afterInit: function(a) {
            var b = a.dataProcessor, c = b && b.dataFilter, b = b && b.htmlFilter, d = a._.elementsPath && a._.elementsPath.filters;
            c && c.addRules({
                elements: {
                    a: function(b) {
                        var c = b.attributes;
                        if (!c.name) return null;
                        var d = !b.children.length;
                        if (CKEDITOR.plugins.link.synAnchorSelector) {
                            var b = d ? "cke_anchor_empty" : "cke_anchor", e = c["class"];
                            c.name && (!e || 0 > e.indexOf(b)) && (c["class"] = (e || "") + " " + b), d && CKEDITOR.plugins.link.emptyAnchorFix && (c.contenteditable = "false", 
                            c["data-cke-editable"] = 1);
                        } else if (CKEDITOR.plugins.link.fakeAnchor && d) return a.createFakeParserElement(b, "cke_anchor", "anchor");
                        return null;
                    }
                }
            }), CKEDITOR.plugins.link.emptyAnchorFix && b && b.addRules({
                elements: {
                    a: function(a) {
                        delete a.attributes.contenteditable;
                    }
                }
            }), d && d.push(function(b, c) {
                return "a" != c || !CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) && (!b.getAttribute("name") || b.getAttribute("href") && b.getChildCount()) ? void 0 : "anchor";
            });
        }
    }), CKEDITOR.plugins.link = {
        getSelectedLink: function(a) {
            var b = a.getSelection(), c = b.getSelectedElement();
            return c && c.is("a") ? c : (b = b.getRanges()[0]) ? (b.shrink(CKEDITOR.SHRINK_TEXT), 
            a.elementPath(b.getCommonAncestor()).contains("a", 1)) : null;
        },
        fakeAnchor: CKEDITOR.env.opera || CKEDITOR.env.webkit,
        synAnchorSelector: CKEDITOR.env.ie && 11 > CKEDITOR.env.version,
        emptyAnchorFix: CKEDITOR.env.ie && 8 > CKEDITOR.env.version,
        tryRestoreFakeAnchor: function(a, b) {
            if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) {
                var c = a.restoreRealElement(b);
                if (c.data("cke-saved-name")) return c;
            }
        }
    }, CKEDITOR.unlinkCommand = function() {}, CKEDITOR.unlinkCommand.prototype = {
        exec: function(a) {
            var b = new CKEDITOR.style({
                element: "a",
                type: CKEDITOR.STYLE_INLINE,
                alwaysRemoveElement: 1
            });
            a.removeStyle(b);
        },
        refresh: function(a, b) {
            var c = b.lastElement && b.lastElement.getAscendant("a", !0);
            this.setState(c && "a" == c.getName() && c.getAttribute("href") && c.getChildCount() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
        },
        contextSensitive: 1,
        startDisabled: 1,
        requiredContent: "a[href]"
    }, CKEDITOR.removeAnchorCommand = function() {}, CKEDITOR.removeAnchorCommand.prototype = {
        exec: function(a) {
            var b, c = a.getSelection(), d = c.createBookmarks();
            c && (b = c.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !b.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) : b.is("a")) ? b.remove(1) : (b = CKEDITOR.plugins.link.getSelectedLink(a)) && (b.hasAttribute("href") ? (b.removeAttributes({
                name: 1,
                "data-cke-saved-name": 1
            }), b.removeClass("cke_anchor")) : b.remove(1)), c.selectBookmarks(d);
        },
        requiredContent: "a[name]"
    }, CKEDITOR.tools.extend(CKEDITOR.config, {
        linkShowAdvancedTab: !0,
        linkShowTargetTab: !0
    }), function() {
        function a(a, b, c) {
            function d(c) {
                !(i = k[c ? "getFirst" : "getLast"]()) || i.is && i.isBlockBoundary() || !(j = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || j.is && j.isBlockBoundary({
                    br: 1
                }) || a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](i);
            }
            for (var e = CKEDITOR.plugins.list.listToArray(b.root, c), f = [], g = 0; g < b.contents.length; g++) {
                var h = b.contents[g];
                (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (f.push(h), 
                CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", !0));
            }
            for (h = null, g = 0; g < f.length; g++) h = f[g].getCustomData("listarray_index"), 
            e[h].indent = -1;
            for (g = h + 1; g < e.length; g++) if (e[g].indent > e[g - 1].indent + 1) {
                for (f = e[g - 1].indent + 1 - e[g].indent, h = e[g].indent; e[g] && e[g].indent >= h; ) e[g].indent += f, 
                g++;
                g--;
            }
            var i, j, k = CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode;
            d(!0), d(), k.replace(b.root), a.fire("contentDomInvalidated");
        }
        function b(a, b) {
            this.name = a, this.context = this.type = b, this.allowedContent = b + " li", this.requiredContent = b;
        }
        function c(a, b, c, d) {
            for (var e, f; e = a[d ? "getLast" : "getFirst"](n); ) (f = e.getDirection(1)) !== b.getDirection(1) && e.setAttribute("dir", f), 
            e.remove(), c ? e[d ? "insertBefore" : "insertAfter"](c) : b.append(e, d);
        }
        function d(a) {
            var b;
            (b = function(b) {
                var d = a[b ? "getPrevious" : "getNext"](k);
                d && d.type == CKEDITOR.NODE_ELEMENT && d.is(a.getName()) && (c(a, d, null, !b), 
                a.remove(), a = d);
            })(), b(1);
        }
        function e(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"];
        }
        function f(a, b, e) {
            a.fire("saveSnapshot"), e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var f = e.extractContents();
            b.trim(!1, !0);
            var h = b.createBookmark(), i = new CKEDITOR.dom.elementPath(b.startContainer), j = i.block, i = i.lastElement.getAscendant("li", 1) || j, m = new CKEDITOR.dom.elementPath(e.startContainer), n = m.contains(CKEDITOR.dtd.$listItem), m = m.contains(CKEDITOR.dtd.$list);
            for (j ? (j = j.getBogus()) && j.remove() : m && (j = m.getPrevious(k)) && l(j) && j.remove(), 
            (j = f.getLast()) && j.type == CKEDITOR.NODE_ELEMENT && j.is("br") && j.remove(), 
            (j = b.startContainer.getChild(b.startOffset)) ? f.insertBefore(j) : b.startContainer.append(f), 
            n && (f = g(n)) && (i.contains(n) ? (c(f, n.getParent(), n), f.remove()) : i.append(f)); e.checkStartOfBlock() && e.checkEndOfBlock() && (m = e.startPath(), 
            f = m.block, f); ) f.is("li") && (i = f.getParent(), f.equals(i.getLast(k)) && f.equals(i.getFirst(k)) && (f = i)), 
            e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f.remove();
            e = e.clone(), f = a.editable(), e.setEndAt(f, CKEDITOR.POSITION_BEFORE_END), e = new CKEDITOR.dom.walker(e), 
            e.evaluator = function(a) {
                return k(a) && !l(a);
            }, (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && d(e), 
            b.moveToBookmark(h), b.select(), a.fire("saveSnapshot");
        }
        function g(a) {
            return (a = a.getLast(k)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in h ? a : null;
        }
        var h = {
            ol: 1,
            ul: 1
        }, i = CKEDITOR.dom.walker.whitespaces(), j = CKEDITOR.dom.walker.bookmark(), k = function(a) {
            return !(i(a) || j(a));
        }, l = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function(a, b, c, d, e) {
                if (!h[a.getName()]) return [];
                d || (d = 0), c || (c = []);
                for (var f = 0, g = a.getChildCount(); g > f; f++) {
                    var i = a.getChild(f);
                    if (i.type == CKEDITOR.NODE_ELEMENT && i.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(i, b, c, d + 1), 
                    "li" == i.$.nodeName.toLowerCase()) {
                        var j = {
                            parent: a,
                            indent: d,
                            element: i,
                            contents: []
                        };
                        e ? j.grandparent = e : (j.grandparent = a.getParent(), j.grandparent && "li" == j.grandparent.$.nodeName.toLowerCase() && (j.grandparent = j.grandparent.getParent())), 
                        b && CKEDITOR.dom.element.setMarker(b, i, "listarray_index", c.length), c.push(j);
                        for (var k, l = 0, m = i.getChildCount(); m > l; l++) k = i.getChild(l), k.type == CKEDITOR.NODE_ELEMENT && h[k.getName()] ? CKEDITOR.plugins.list.listToArray(k, b, c, d + 1, j.grandparent) : j.contents.push(k);
                    }
                }
                return c;
            },
            arrayToList: function(a, b, c, d, e) {
                if (c || (c = 0), !a || a.length < c + 1) return null;
                for (var f, g, i, l = a[c].parent.getDocument(), m = new CKEDITOR.dom.documentFragment(l), n = null, o = c, p = Math.max(a[c].indent, 0), q = null, r = d == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                    var s = a[o];
                    if (f = s.grandparent, g = s.element.getDirection(1), s.indent == p) {
                        for (n && a[o].parent.getName() == n.getName() || (n = a[o].parent.clone(!1, 1), 
                        e && n.setAttribute("dir", e), m.append(n)), q = n.append(s.element.clone(0, 1)), 
                        g != n.getDirection(1) && q.setAttribute("dir", g), f = 0; f < s.contents.length; f++) q.append(s.contents[f].clone(1, 1));
                        o++;
                    } else if (s.indent == Math.max(p, 0) + 1) s = a[o - 1].element.getDirection(1), 
                    o = CKEDITOR.plugins.list.arrayToList(a, null, o, d, s != g ? g : null), !q.getChildCount() && CKEDITOR.env.needsNbspFiller && !(7 < l.$.documentMode) && q.append(l.createText(" ")), 
                    q.append(o.listNode), o = o.nextIndex; else {
                        if (-1 != s.indent || c || !f) return null;
                        h[f.getName()] ? (q = s.element.clone(!1, !0), g != f.getDirection(1) && q.setAttribute("dir", g)) : q = new CKEDITOR.dom.documentFragment(l);
                        var t, u, n = f.getDirection(1) != g, v = s.element, w = v.getAttribute("class"), x = v.getAttribute("style"), y = q.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || n || x || w), z = s.contents.length;
                        for (f = 0; z > f; f++) if (t = s.contents[f], j(t) && z > 1) y ? u = t.clone(1, 1) : q.append(t.clone(1, 1)); else if (t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary()) {
                            n && !t.getDirection() && t.setAttribute("dir", g), i = t;
                            var A = v.getAttribute("style");
                            A && i.setAttribute("style", A.replace(/([^;])$/, "$1;") + (i.getAttribute("style") || "")), 
                            w && t.addClass(w), i = null, u && (q.append(u), u = null), q.append(t.clone(1, 1));
                        } else y ? (i || (i = l.createElement(r), q.append(i), n && i.setAttribute("dir", g)), 
                        x && i.setAttribute("style", x), w && i.setAttribute("class", w), u && (i.append(u), 
                        u = null), i.append(t.clone(1, 1))) : q.append(t.clone(1, 1));
                        u && ((i || q).append(u), u = null), q.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && o != a.length - 1 && (CKEDITOR.env.needsBrFiller && (g = q.getLast()) && g.type == CKEDITOR.NODE_ELEMENT && g.is("br") && g.remove(), 
                        g = q.getLast(k), (!g || !(g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.$block))) && q.append(l.createElement("br"))), 
                        g = q.$.nodeName.toLowerCase(), ("div" == g || "p" == g) && q.appendBogus(), m.append(q), 
                        n = null, o++;
                    }
                    if (i = null, a.length <= o || Math.max(a[o].indent, 0) < p) break;
                }
                if (b) for (a = m.getFirst(); a; ) {
                    if (a.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), 
                    a.getName() in CKEDITOR.dtd.$listItem && (c = a, l = e = d = void 0, d = c.getDirection()))) {
                        for (e = c.getParent(); e && !(l = e.getDirection()); ) e = e.getParent();
                        d == l && c.removeAttribute("dir");
                    }
                    a = a.getNextSourceNode();
                }
                return {
                    listNode: m,
                    nextIndex: o
                };
            }
        };
        var m = /^h[1-6]$/, n = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        b.prototype = {
            exec: function(b) {
                this.refresh(b, b.elementPath());
                var c = b.config, e = b.getSelection(), f = e && e.getRanges();
                if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var g = b.editable();
                    if (g.getFirst(k)) {
                        var i = 1 == f.length && f[0];
                        (c = i && i.getEnclosedNode()) && c.is && this.type == c.getName() && this.setState(CKEDITOR.TRISTATE_ON);
                    } else c.enterMode == CKEDITOR.ENTER_BR ? g.appendBogus() : f[0].fixBlock(1, c.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), 
                    e.selectRanges(f);
                }
                for (var c = e.createBookmarks(!0), g = [], j = {}, f = f.createIterator(), l = 0; (i = f.getNextRange()) && ++l; ) {
                    var n = i.getBoundaryNodes(), o = n.startNode, p = n.endNode;
                    for (o.type == CKEDITOR.NODE_ELEMENT && "td" == o.getName() && i.setStartAt(n.startNode, CKEDITOR.POSITION_AFTER_START), 
                    p.type == CKEDITOR.NODE_ELEMENT && "td" == p.getName() && i.setEndAt(n.endNode, CKEDITOR.POSITION_BEFORE_END), 
                    i = i.createIterator(), i.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; n = i.getNextParagraph(); ) if (!n.getCustomData("list_block")) {
                        CKEDITOR.dom.element.setMarker(j, n, "list_block", 1);
                        for (var q, r = b.elementPath(n), o = r.elements, p = 0, r = r.blockLimit, s = o.length - 1; s >= 0 && (q = o[s]); s--) if (h[q.getName()] && r.contains(q)) {
                            r.removeCustomData("list_group_object_" + l), (o = q.getCustomData("list_group_object")) ? o.contents.push(n) : (o = {
                                root: q,
                                contents: [ n ]
                            }, g.push(o), CKEDITOR.dom.element.setMarker(j, q, "list_group_object", o)), p = 1;
                            break;
                        }
                        p || (p = r, p.getCustomData("list_group_object_" + l) ? p.getCustomData("list_group_object_" + l).contents.push(n) : (o = {
                            root: p,
                            contents: [ n ]
                        }, CKEDITOR.dom.element.setMarker(j, p, "list_group_object_" + l, o), g.push(o)));
                    }
                }
                for (q = []; 0 < g.length; ) if (o = g.shift(), this.state == CKEDITOR.TRISTATE_OFF) if (h[o.root.getName()]) {
                    for (f = b, l = o, o = j, i = q, p = CKEDITOR.plugins.list.listToArray(l.root, o), 
                    r = [], n = 0; n < l.contents.length; n++) s = l.contents[n], (s = s.getAscendant("li", !0)) && !s.getCustomData("list_item_processed") && (r.push(s), 
                    CKEDITOR.dom.element.setMarker(o, s, "list_item_processed", !0));
                    for (var s = l.root.getDocument(), t = void 0, u = void 0, n = 0; n < r.length; n++) {
                        var v = r[n].getCustomData("listarray_index"), t = p[v].parent;
                        t.is(this.type) || (u = s.createElement(this.type), t.copyAttributes(u, {
                            start: 1,
                            type: 1
                        }), u.removeStyle("list-style-type"), p[v].parent = u);
                    }
                    for (o = CKEDITOR.plugins.list.arrayToList(p, o, null, f.config.enterMode), p = void 0, 
                    r = o.listNode.getChildCount(), n = 0; r > n && (p = o.listNode.getChild(n)); n++) p.getName() == this.type && i.push(p);
                    o.listNode.replace(l.root), f.fire("contentDomInvalidated");
                } else {
                    for (p = b, n = o, i = q, r = n.contents, f = n.root.getDocument(), l = [], 1 == r.length && r[0].equals(n.root) && (o = f.createElement("div"), 
                    r[0].moveChildren && r[0].moveChildren(o), r[0].append(o), r[0] = o), n = n.contents[0].getParent(), 
                    s = 0; s < r.length; s++) n = n.getCommonAncestor(r[s].getParent());
                    for (t = p.config.useComputedState, p = o = void 0, t = void 0 === t || t, s = 0; s < r.length; s++) for (u = r[s]; v = u.getParent(); ) {
                        if (v.equals(n)) {
                            l.push(u), !p && u.getDirection() && (p = 1), u = u.getDirection(t), null !== o && (o = o && o != u ? null : u);
                            break;
                        }
                        u = v;
                    }
                    if (!(1 > l.length)) {
                        for (r = l[l.length - 1].getNext(), s = f.createElement(this.type), i.push(s), t = i = void 0; l.length; ) i = l.shift(), 
                        t = f.createElement("li"), i.is("pre") || m.test(i.getName()) || "false" == i.getAttribute("contenteditable") ? i.appendTo(t) : (i.copyAttributes(t), 
                        o && i.getDirection() && (t.removeStyle("direction"), t.removeAttribute("dir")), 
                        i.moveChildren(t), i.remove()), t.appendTo(s);
                        o && p && s.setAttribute("dir", o), r ? s.insertBefore(r) : s.appendTo(n);
                    }
                } else this.state == CKEDITOR.TRISTATE_ON && h[o.root.getName()] && a.call(this, b, o, j);
                for (s = 0; s < q.length; s++) d(q[s]);
                CKEDITOR.dom.element.clearAllMarkers(j), e.selectBookmarks(c), b.focus();
            },
            refresh: function(a, b) {
                var c = b.contains(h, 1), d = b.blockLimit || b.root;
                this.setState(c && d.contains(c) && c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
            }
        }, CKEDITOR.plugins.add("list", {
            requires: "indentlist",
            init: function(a) {
                a.blockless || (a.addCommand("numberedlist", new b("numberedlist", "ol")), a.addCommand("bulletedlist", new b("bulletedlist", "ul")), 
                a.ui.addButton && (a.ui.addButton("NumberedList", {
                    label: a.lang.list.numberedlist,
                    command: "numberedlist",
                    directional: !0,
                    toolbar: "list,10"
                }), a.ui.addButton("BulletedList", {
                    label: a.lang.list.bulletedlist,
                    command: "bulletedlist",
                    directional: !0,
                    toolbar: "list,20"
                })), a.on("key", function(b) {
                    var c = b.data.keyCode;
                    if ("wysiwyg" == a.mode && c in {
                        8: 1,
                        46: 1
                    }) {
                        var d = a.getSelection().getRanges()[0], i = d && d.startPath();
                        if (d && d.collapsed) {
                            var i = new CKEDITOR.dom.elementPath(d.startContainer), j = 8 == c, m = a.editable(), n = new CKEDITOR.dom.walker(d.clone());
                            if (n.evaluator = function(a) {
                                return k(a) && !l(a);
                            }, n.guard = function(a, b) {
                                return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"));
                            }, c = d.clone(), j) {
                                var o, p;
                                (o = i.contains(h)) && d.checkBoundaryOfElement(o, CKEDITOR.START) && (o = o.getParent()) && o.is("li") && (o = g(o)) ? (p = o, 
                                o = o.getPrevious(k), c.moveToPosition(o && l(o) ? o : p, CKEDITOR.POSITION_BEFORE_START)) : (n.range.setStartAt(m, CKEDITOR.POSITION_AFTER_START), 
                                n.range.setEnd(d.startContainer, d.startOffset), (o = n.previous()) && o.type == CKEDITOR.NODE_ELEMENT && (o.getName() in h || o.is("li")) && (o.is("li") || (n.range.selectNodeContents(o), 
                                n.reset(), n.evaluator = e, o = n.previous()), p = o, c.moveToElementEditEnd(p))), 
                                p ? (f(a, c, d), b.cancel()) : (c = i.contains(h)) && d.checkBoundaryOfElement(c, CKEDITOR.START) && (p = c.getFirst(k), 
                                d.checkBoundaryOfElement(p, CKEDITOR.START) && (o = c.getPrevious(k), g(p) ? o && (d.moveToElementEditEnd(o), 
                                d.select()) : a.execCommand("outdent"), b.cancel()));
                            } else (p = i.contains("li")) ? (n.range.setEndAt(m, CKEDITOR.POSITION_BEFORE_END), 
                            m = (i = p.getLast(k)) && e(i) ? i : p, p = 0, (o = n.next()) && o.type == CKEDITOR.NODE_ELEMENT && o.getName() in h && o.equals(i) ? (p = 1, 
                            o = n.next()) : d.checkBoundaryOfElement(m, CKEDITOR.END) && (p = 1), p && o && (d = d.clone(), 
                            d.moveToElementEditStart(o), f(a, c, d), b.cancel())) : (n.range.setEndAt(m, CKEDITOR.POSITION_BEFORE_END), 
                            (o = n.next()) && o.type == CKEDITOR.NODE_ELEMENT && o.is(h) && (o = o.getFirst(k), 
                            i.block && d.checkStartOfBlock() && d.checkEndOfBlock() ? (i.block.remove(), d.moveToElementEditStart(o), 
                            d.select()) : g(o) ? (d.moveToElementEditStart(o), d.select()) : (d = d.clone(), 
                            d.moveToElementEditStart(o), f(a, c, d)), b.cancel()));
                            setTimeout(function() {
                                a.selectionChange(1);
                            });
                        }
                    }
                }));
            }
        });
    }(), function() {
        function a(a) {
            this.editor = a, this.reset();
        }
        CKEDITOR.plugins.add("undo", {
            init: function(b) {
                function c(a) {
                    e.enabled && !1 !== a.data.command.canUndo && e.save();
                }
                function d() {
                    e.enabled = b.readOnly ? !1 : "wysiwyg" == b.mode, e.onChange();
                }
                var e = b.undoManager = new a(b), f = b.addCommand("undo", {
                    exec: function() {
                        e.undo() && (b.selectionChange(), this.fire("afterUndo"));
                    },
                    startDisabled: !0,
                    canUndo: !1
                }), g = b.addCommand("redo", {
                    exec: function() {
                        e.redo() && (b.selectionChange(), this.fire("afterRedo"));
                    },
                    startDisabled: !0,
                    canUndo: !1
                });
                b.setKeystroke([ [ CKEDITOR.CTRL + 90, "undo" ], [ CKEDITOR.CTRL + 89, "redo" ], [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo" ] ]), 
                e.onChange = function() {
                    f.setState(e.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), g.setState(e.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                }, b.on("beforeCommandExec", c), b.on("afterCommandExec", c), b.on("saveSnapshot", function(a) {
                    e.save(a.data && a.data.contentOnly);
                }), b.on("contentDom", function() {
                    b.editable().on("keydown", function(a) {
                        a = a.data.getKey(), (8 == a || 46 == a) && e.type(a, 0);
                    }), b.editable().on("keypress", function(a) {
                        e.type(a.data.getKey(), 1);
                    });
                }), b.on("beforeModeUnload", function() {
                    "wysiwyg" == b.mode && e.save(!0);
                }), b.on("mode", d), b.on("readOnly", d), b.ui.addButton && (b.ui.addButton("Undo", {
                    label: b.lang.undo.undo,
                    command: "undo",
                    toolbar: "undo,10"
                }), b.ui.addButton("Redo", {
                    label: b.lang.undo.redo,
                    command: "redo",
                    toolbar: "undo,20"
                })), b.resetUndo = function() {
                    e.reset(), b.fire("saveSnapshot");
                }, b.on("updateSnapshot", function() {
                    e.currentImage && e.update();
                }), b.on("lockSnapshot", function(a) {
                    e.lock(a.data && a.data.dontUpdate);
                }), b.on("unlockSnapshot", e.unlock, e);
            }
        }), CKEDITOR.plugins.undo = {};
        var b = CKEDITOR.plugins.undo.Image = function(a, b) {
            this.editor = a, a.fire("beforeUndoImage");
            var c = a.getSnapshot();
            CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, "")), this.contents = c, 
            b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0)), a.fire("afterUndoImage");
        }, c = /\b(?:href|src|name)="[^"]*?"/gi;
        b.prototype = {
            equalsContent: function(a) {
                var b = this.contents, a = a.contents;
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && (b = b.replace(c, ""), 
                a = a.replace(c, "")), b != a ? !1 : !0;
            },
            equalsSelection: function(a) {
                var b = this.bookmarks, a = a.bookmarks;
                if (b || a) {
                    if (!b || !a || b.length != a.length) return !1;
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c], e = a[c];
                        if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end, e.end)) return !1;
                    }
                }
                return !0;
            }
        }, a.prototype = {
            type: function(a, c) {
                var d = !c && a != this.lastKeystroke, e = this.editor;
                if (!this.typing || c && !this.wasCharacter || d) {
                    var f = new b(e), g = this.snapshots.length;
                    CKEDITOR.tools.setTimeout(function() {
                        var a = e.getSnapshot();
                        CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g, "")), f.contents != a && g == this.snapshots.length && (this.typing = !0, 
                        this.save(!1, f, !1) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1), 
                        this.hasUndo = !0, this.hasRedo = !1, this.modifiersCount = this.typesCount = 1, 
                        this.onChange());
                    }, 0, this);
                }
                this.lastKeystroke = a, (this.wasCharacter = c) ? (this.modifiersCount = 0, this.typesCount++, 
                25 < this.typesCount ? (this.save(!1, null, !1), this.typesCount = 1) : setTimeout(function() {
                    e.fire("change");
                }, 0)) : (this.typesCount = 0, this.modifiersCount++, 25 < this.modifiersCount ? (this.save(!1, null, !1), 
                this.modifiersCount = 1) : setTimeout(function() {
                    e.fire("change");
                }, 0));
            },
            reset: function() {
                this.lastKeystroke = 0, this.snapshots = [], this.index = -1, this.limit = this.editor.config.undoStackSize || 20, 
                this.currentImage = null, this.hasRedo = this.hasUndo = !1, this.locked = null, 
                this.resetType();
            },
            resetType: function() {
                this.typing = !1, delete this.lastKeystroke, this.modifiersCount = this.typesCount = 0;
            },
            fireChange: function() {
                this.hasUndo = !!this.getNextImage(!0), this.hasRedo = !!this.getNextImage(!1), 
                this.resetType(), this.onChange();
            },
            save: function(a, c, d) {
                if (this.locked) return !1;
                var e = this.snapshots;
                if (c || (c = new b(this.editor)), !1 === c.contents) return !1;
                if (this.currentImage) if (c.equalsContent(this.currentImage)) {
                    if (a || c.equalsSelection(this.currentImage)) return !1;
                } else this.editor.fire("change");
                return e.splice(this.index + 1, e.length - this.index - 1), e.length == this.limit && e.shift(), 
                this.index = e.push(c) - 1, this.currentImage = c, !1 !== d && this.fireChange(), 
                !0;
            },
            restoreImage: function(a) {
                var b, c = this.editor;
                a.bookmarks && (c.focus(), b = c.getSelection()), this.locked = 1, this.editor.loadSnapshot(a.contents), 
                a.bookmarks ? b.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (b = this.editor.document.getBody().$.createTextRange(), 
                b.collapse(!0), b.select()), this.locked = 0, this.index = a.index, this.currentImage = this.snapshots[this.index], 
                this.update(), this.fireChange(), c.fire("change");
            },
            getNextImage: function(a) {
                var b, c = this.snapshots, d = this.currentImage;
                if (d) if (a) {
                    for (b = this.index - 1; b >= 0; b--) if (a = c[b], !d.equalsContent(a)) return a.index = b, 
                    a;
                } else for (b = this.index + 1; b < c.length; b++) if (a = c[b], !d.equalsContent(a)) return a.index = b, 
                a;
                return null;
            },
            redoable: function() {
                return this.enabled && this.hasRedo;
            },
            undoable: function() {
                return this.enabled && this.hasUndo;
            },
            undo: function() {
                if (this.undoable()) {
                    this.save(!0);
                    var a = this.getNextImage(!0);
                    if (a) return this.restoreImage(a), !0;
                }
                return !1;
            },
            redo: function() {
                if (this.redoable() && (this.save(!0), this.redoable())) {
                    var a = this.getNextImage(!1);
                    if (a) return this.restoreImage(a), !0;
                }
                return !1;
            },
            update: function(a) {
                if (!this.locked) {
                    a || (a = new b(this.editor));
                    for (var c = this.index, d = this.snapshots; c > 0 && this.currentImage.equalsContent(d[c - 1]); ) c -= 1;
                    d.splice(c, this.index - c + 1, a), this.index = c, this.currentImage = a;
                }
            },
            lock: function(a) {
                this.locked ? this.locked.level++ : a ? this.locked = {
                    level: 1
                } : (a = new b(this.editor, !0), this.locked = {
                    update: this.currentImage && this.currentImage.equalsContent(a) ? a : null,
                    level: 1
                });
            },
            unlock: function() {
                if (this.locked && !--this.locked.level) {
                    var a = this.locked.update, c = a && new b(this.editor, !0);
                    this.locked = null, a && !a.equalsContent(c) && this.update();
                }
            }
        };
    }(), CKEDITOR.config.plugins = "dialogui,dialog,about,basicstyles,clipboard,button,toolbar,enterkey,entities,floatingspace,wysiwygarea,indent,indentlist,fakeobjects,link,list,undo", 
    CKEDITOR.config.skin = "moono", function() {
        var a = function(a, b) {
            var c = CKEDITOR.getUrl("plugins/" + b);
            a = a.split(",");
            for (var d = 0; d < a.length; d++) CKEDITOR.skin.icons[a[d]] = {
                path: c,
                offset: -a[++d],
                bgsize: a[++d]
            };
        };
        CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,copy-rtl,168,,copy,192,,cut-rtl,216,,cut,240,,paste-rtl,264,,paste,288,,indent-rtl,312,,indent,336,,outdent-rtl,360,,outdent,384,,anchor-rtl,408,,anchor,432,,link,456,,unlink,480,,bulletedlist-rtl,504,,bulletedlist,528,,numberedlist-rtl,552,,numberedlist,576,,redo-rtl,600,,redo,624,,undo-rtl,648,,undo,672,", "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,copy-rtl,168,auto,copy,192,auto,cut-rtl,216,auto,cut,240,auto,paste-rtl,264,auto,paste,288,auto,indent-rtl,312,auto,indent,336,auto,outdent-rtl,360,auto,outdent,384,auto,anchor-rtl,408,auto,anchor,432,auto,link,456,auto,unlink,480,auto,bulletedlist-rtl,504,auto,bulletedlist,528,auto,numberedlist-rtl,552,auto,numberedlist,576,auto,redo-rtl,600,auto,redo,624,auto,undo-rtl,648,auto,undo,672,auto", "icons.png");
    }(), CKEDITOR.lang.languages = {
        af: 1,
        sq: 1,
        ar: 1,
        eu: 1,
        bn: 1,
        bs: 1,
        bg: 1,
        ca: 1,
        "zh-cn": 1,
        zh: 1,
        hr: 1,
        cs: 1,
        da: 1,
        nl: 1,
        en: 1,
        "en-au": 1,
        "en-ca": 1,
        "en-gb": 1,
        eo: 1,
        et: 1,
        fo: 1,
        fi: 1,
        fr: 1,
        "fr-ca": 1,
        gl: 1,
        ka: 1,
        de: 1,
        el: 1,
        gu: 1,
        he: 1,
        hi: 1,
        hu: 1,
        is: 1,
        id: 1,
        it: 1,
        ja: 1,
        km: 1,
        ko: 1,
        ku: 1,
        lv: 1,
        lt: 1,
        mk: 1,
        ms: 1,
        mn: 1,
        no: 1,
        nb: 1,
        fa: 1,
        pl: 1,
        "pt-br": 1,
        pt: 1,
        ro: 1,
        ru: 1,
        sr: 1,
        "sr-latn": 1,
        si: 1,
        sk: 1,
        sl: 1,
        es: 1,
        sv: 1,
        th: 1,
        tr: 1,
        ug: 1,
        uk: 1,
        vi: 1,
        cy: 1
    });
}();