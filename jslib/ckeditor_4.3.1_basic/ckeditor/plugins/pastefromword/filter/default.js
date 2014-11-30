!function() {
    function a(a) {
        for (var a = a.toUpperCase(), b = i.length, c = 0, d = 0; b > d; ++d) for (var e = i[d], f = e[1].length; a.substr(0, f) == e[1]; a = a.substr(f)) c += e[0];
        return c;
    }
    function b(a) {
        for (var a = a.toUpperCase(), b = j.length, c = 1, d = 1; 0 < a.length; d *= b) c += j.indexOf(a.charAt(a.length - 1)) * d, 
        a = a.substr(0, a.length - 1);
        return c;
    }
    var c = CKEDITOR.htmlParser.fragment.prototype, d = CKEDITOR.htmlParser.element.prototype;
    c.onlyChild = d.onlyChild = function() {
        var a = this.children;
        return 1 == a.length && a[0] || null;
    }, d.removeAnyChildWithName = function(a) {
        for (var b, c = this.children, d = [], e = 0; e < c.length; e++) b = c[e], b.name && (b.name == a && (d.push(b), 
        c.splice(e--, 1)), d = d.concat(b.removeAnyChildWithName(a)));
        return d;
    }, d.getAncestor = function(a) {
        for (var b = this.parent; b && (!b.name || !b.name.match(a)); ) b = b.parent;
        return b;
    }, c.firstChild = d.firstChild = function(a) {
        for (var b, c = 0; c < this.children.length; c++) if (b = this.children[c], a(b) || b.name && (b = b.firstChild(a))) return b;
        return null;
    }, d.addStyle = function(a, b, c) {
        var d = "";
        if ("string" == typeof b) d += a + ":" + b + ";"; else {
            if ("object" == typeof a) for (var e in a) a.hasOwnProperty(e) && (d += e + ":" + a[e] + ";"); else d += a;
            c = b;
        }
        this.attributes || (this.attributes = {}), a = this.attributes.style || "", a = (c ? [ d, a ] : [ a, d ]).join(";"), 
        this.attributes.style = a.replace(/^;|;(?=;)/, "");
    }, d.getStyle = function(a) {
        var b = this.attributes.style;
        return b ? (b = CKEDITOR.tools.parseCssText(b, 1), b[a]) : void 0;
    }, CKEDITOR.dtd.parentOf = function(a) {
        var b, c = {};
        for (b in this) -1 == b.indexOf("$") && this[b][a] && (c[b] = 1);
        return c;
    };
    var e, f = /^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i, g = /^(?:\b0[^\s]*\s*){1,4}$/, h = {
        ol: {
            decimal: /\d+/,
            "lower-roman": /^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,
            "upper-roman": /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
            "lower-alpha": /^[a-z]+$/,
            "upper-alpha": /^[A-Z]+$/
        },
        ul: {
            disc: /[l\u00B7\u2002]/,
            circle: /[\u006F\u00D8]/,
            square: /[\u006E\u25C6]/
        }
    }, i = [ [ 1e3, "M" ], [ 900, "CM" ], [ 500, "D" ], [ 400, "CD" ], [ 100, "C" ], [ 90, "XC" ], [ 50, "L" ], [ 40, "XL" ], [ 10, "X" ], [ 9, "IX" ], [ 5, "V" ], [ 4, "IV" ], [ 1, "I" ] ], j = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", k = 0, l = null, m = CKEDITOR.plugins.pastefromword = {
        utils: {
            createListBulletMarker: function(a, b) {
                var c = new CKEDITOR.htmlParser.element("cke:listbullet");
                return c.attributes = {
                    "cke:listsymbol": a[0]
                }, c.add(new CKEDITOR.htmlParser.text(b)), c;
            },
            isListBulletIndicator: function(a) {
                return /mso-list\s*:\s*Ignore/i.test(a.attributes && a.attributes.style) ? !0 : void 0;
            },
            isContainingOnlySpaces: function(a) {
                var b;
                return (b = a.onlyChild()) && /^(:?\s|&nbsp;)+$/.test(b.value);
            },
            resolveList: function(a) {
                var b, c = a.attributes;
                return (b = a.removeAnyChildWithName("cke:listbullet")) && b.length && (b = b[0]) ? (a.name = "cke:li", 
                c.style && (c.style = m.filters.stylesFilter([ [ "text-indent" ], [ "line-height" ], [ /^margin(:?-left)?$/, null, function(a) {
                    a = a.split(" "), a = CKEDITOR.tools.convertToPx(a[3] || a[1] || a[0]), !k && null !== l && a > l && (k = a - l), 
                    l = a, c["cke:indent"] = k && Math.ceil(a / k) + 1 || 1;
                } ], [ /^mso-list$/, null, function(a) {
                    var a = a.split(" "), b = Number(a[0].match(/\d+/)), a = Number(a[1].match(/\d+/));
                    1 == a && (b !== e && (c["cke:reset"] = 1), e = b), c["cke:indent"] = a;
                } ] ])(c.style, a) || ""), c["cke:indent"] || (l = 0, c["cke:indent"] = 1), CKEDITOR.tools.extend(c, b.attributes), 
                !0) : (e = l = k = null, !1);
            },
            getStyleComponents: function() {
                var a = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>', CKEDITOR.document);
                return CKEDITOR.document.getBody().append(a), function(b, c, d) {
                    a.setStyle(b, c);
                    for (var b = {}, c = d.length, e = 0; c > e; e++) b[d[e]] = a.getStyle(d[e]);
                    return b;
                };
            }(),
            listDtdParents: CKEDITOR.dtd.parentOf("ol")
        },
        filters: {
            flattenList: function(a, b) {
                var c, b = "number" == typeof b ? b : 1, d = a.attributes;
                switch (d.type) {
                  case "a":
                    c = "lower-alpha";
                    break;

                  case "1":
                    c = "decimal";
                }
                for (var g, h = a.children, i = 0; i < h.length; i++) if (g = h[i], g.name in CKEDITOR.dtd.$listItem) {
                    var j = g.attributes, k = g.children, n = k[k.length - 1];
                    n.name in CKEDITOR.dtd.$list && (a.add(n, i + 1), --k.length || h.splice(i--, 1)), 
                    g.name = "cke:li", d.start && !i && (j.value = d.start), m.filters.stylesFilter([ [ "tab-stops", null, function(a) {
                        (a = a.split(" ")[1].match(f)) && (l = CKEDITOR.tools.convertToPx(a[0]));
                    } ], 1 == b ? [ "mso-list", null, function(a) {
                        a = a.split(" "), a = Number(a[0].match(/\d+/)), a !== e && (j["cke:reset"] = 1), 
                        e = a;
                    } ] : null ])(j.style), j["cke:indent"] = b, j["cke:listtype"] = a.name, j["cke:list-style-type"] = c;
                } else if (g.name in CKEDITOR.dtd.$list) {
                    for (arguments.callee.apply(this, [ g, b + 1 ]), h = h.slice(0, i).concat(g.children).concat(h.slice(i + 1)), 
                    a.children = [], g = 0, k = h.length; k > g; g++) a.add(h[g]);
                    h = a.children;
                }
                delete a.name, d["cke:list"] = 1;
            },
            assembleList: function(c) {
                for (var d, f, g, i, j, m, n, o, p, q, r, s, t = c.children, c = [], u = 0; u < t.length; u++) if (d = t[u], 
                "cke:li" == d.name) if (d.name = "li", f = d.attributes, p = (p = f["cke:listsymbol"]) && p.match(/^(?:[(]?)([^\s]+?)([.)]?)$/), 
                q = r = s = null, f["cke:ignored"]) t.splice(u--, 1); else {
                    if (f["cke:reset"] && (m = i = j = null), g = Number(f["cke:indent"]), g != i && (o = n = null), 
                    p) {
                        if (o && h[o][n].test(p[1])) q = o, r = n; else for (var v in h) for (var w in h[v]) if (h[v][w].test(p[1])) {
                            if ("ol" != v || !/alpha|roman/.test(w)) {
                                q = v, r = w;
                                break;
                            }
                            n = /roman/.test(w) ? a(p[1]) : b(p[1]), (!s || s > n) && (s = n, q = v, r = w);
                        }
                        !q && (q = p[2] ? "ol" : "ul");
                    } else q = f["cke:listtype"] || "ol", r = f["cke:list-style-type"];
                    if (o = q, n = r || ("ol" == q ? "decimal" : "disc"), r && r != ("ol" == q ? "decimal" : "disc") && d.addStyle("list-style-type", r), 
                    "ol" == q && p) {
                        switch (r) {
                          case "decimal":
                            s = Number(p[1]);
                            break;

                          case "lower-roman":
                          case "upper-roman":
                            s = a(p[1]);
                            break;

                          case "lower-alpha":
                          case "upper-alpha":
                            s = b(p[1]);
                        }
                        d.attributes.value = s;
                    }
                    if (m) {
                        if (g > i) c.push(m = new CKEDITOR.htmlParser.element(q)), m.add(d), j.add(m); else {
                            if (i > g) {
                                i -= g;
                                for (var x; i-- && (x = m.parent); ) m = x.parent;
                            }
                            m.add(d);
                        }
                        t.splice(u--, 1);
                    } else c.push(m = new CKEDITOR.htmlParser.element(q)), m.add(d), t[u] = m;
                    j = d, i = g;
                } else m && (m = i = j = null);
                for (u = 0; u < c.length; u++) if (m = c[u], v = m.children, n = n = void 0, w = m.children.length, 
                x = n = void 0, t = /list-style-type:(.*?)(?:;|$)/, i = CKEDITOR.plugins.pastefromword.filters.stylesFilter, 
                n = m.attributes, !t.exec(n.style)) {
                    for (j = 0; w > j; j++) if (n = v[j], n.attributes.value && Number(n.attributes.value) == j + 1 && delete n.attributes.value, 
                    n = t.exec(n.attributes.style)) {
                        if (n[1] != x && x) {
                            x = null;
                            break;
                        }
                        x = n[1];
                    }
                    if (x) {
                        for (j = 0; w > j; j++) n = v[j].attributes, n.style && (n.style = i([ [ "list-style-type" ] ])(n.style) || "");
                        m.addStyle("list-style-type", x);
                    }
                }
                e = l = k = null;
            },
            falsyFilter: function() {
                return !1;
            },
            stylesFilter: function(a, b) {
                return function(c, d) {
                    var e = [];
                    (c || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(c, f, g) {
                        f = f.toLowerCase(), "font-family" == f && (g = g.replace(/["']/g, ""));
                        for (var h, i, j, k = 0; k < a.length; k++) if (a[k] && (c = a[k][0], h = a[k][1], 
                        i = a[k][2], j = a[k][3], f.match(c) && (!h || g.match(h)))) return f = j || f, 
                        b && (i = i || g), "function" == typeof i && (i = i(g, d, f)), i && i.push && (f = i[0], 
                        i = i[1]), void ("string" == typeof i && e.push([ f, i ]));
                        !b && e.push([ f, g ]);
                    });
                    for (var f = 0; f < e.length; f++) e[f] = e[f].join(":");
                    return e.length ? e.join(";") + ";" : !1;
                };
            },
            elementMigrateFilter: function(a, b) {
                return a ? function(c) {
                    var d = b ? new CKEDITOR.style(a, b)._.definition : a;
                    c.name = d.element, CKEDITOR.tools.extend(c.attributes, CKEDITOR.tools.clone(d.attributes)), 
                    c.addStyle(CKEDITOR.style.getStyleText(d));
                } : function() {};
            },
            styleMigrateFilter: function(a, b) {
                var c = this.elementMigrateFilter;
                return a ? function(d, e) {
                    var f = new CKEDITOR.htmlParser.element(null), g = {};
                    g[b] = d, c(a, g)(f), f.children = e.children, e.children = [ f ], f.filter = function() {}, 
                    f.parent = e;
                } : function() {};
            },
            bogusAttrFilter: function(a, b) {
                return -1 == b.name.indexOf("cke:") ? !1 : void 0;
            },
            applyStyleFilter: null
        },
        getRules: function(a, b) {
            var c = CKEDITOR.dtd, d = CKEDITOR.tools.extend({}, c.$block, c.$listItem, c.$tableContent), e = a.config, f = this.filters, h = f.falsyFilter, i = f.stylesFilter, j = f.elementMigrateFilter, k = CKEDITOR.tools.bind(this.filters.styleMigrateFilter, this.filters), l = this.utils.createListBulletMarker, m = f.flattenList, n = f.assembleList, o = this.utils.isListBulletIndicator, p = this.utils.isContainingOnlySpaces, q = this.utils.resolveList, r = function(a) {
                return a = CKEDITOR.tools.convertToPx(a), isNaN(a) ? a : a + "px";
            }, s = this.utils.getStyleComponents, t = this.utils.listDtdParents, u = !1 !== e.pasteFromWordRemoveFontStyles, v = !1 !== e.pasteFromWordRemoveStyles;
            return {
                elementNames: [ [ /meta|link|script/, "" ] ],
                root: function(a) {
                    a.filterChildren(b), n(a);
                },
                elements: {
                    "^": function(a) {
                        var b;
                        CKEDITOR.env.gecko && (b = f.applyStyleFilter) && b(a);
                    },
                    $: function(a) {
                        var f = a.name || "", g = a.attributes;
                        if (f in d && g.style && (g.style = i([ [ /^(:?width|height)$/, null, r ] ])(g.style) || ""), 
                        f.match(/h\d/)) {
                            if (a.filterChildren(b), q(a)) return;
                            j(e["format_" + f])(a);
                        } else if (f in c.$inline) a.filterChildren(b), p(a) && delete a.name; else if (-1 != f.indexOf(":") && -1 == f.indexOf("cke")) {
                            if (a.filterChildren(b), "v:imagedata" == f) return (f = a.attributes["o:href"]) && (a.attributes.src = f), 
                            void (a.name = "img");
                            delete a.name;
                        }
                        f in t && (a.filterChildren(b), n(a));
                    },
                    style: function(a) {
                        if (CKEDITOR.env.gecko) {
                            var a = (a = a.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/)) && a[1], b = {};
                            a && (a.replace(/[\n\r]/g, "").replace(/(.+?)\{(.+?)\}/g, function(a, c, d) {
                                for (var c = c.split(","), a = c.length, e = 0; a > e; e++) CKEDITOR.tools.trim(c[e]).replace(/^(\w+)(\.[\w-]+)?$/g, function(a, c, e) {
                                    c = c || "*", e = e.substring(1, e.length), e.match(/MsoNormal/) || (b[c] || (b[c] = {}), 
                                    e ? b[c][e] = d : b[c] = d);
                                });
                            }), f.applyStyleFilter = function(a) {
                                var c = b["*"] ? "*" : a.name, d = a.attributes && a.attributes["class"];
                                c in b && (c = b[c], "object" == typeof c && (c = c[d]), c && a.addStyle(c, !0));
                            });
                        }
                        return !1;
                    },
                    p: function(a) {
                        if (/MsoListParagraph/i.exec(a.attributes["class"]) || a.getStyle("mso-list")) {
                            var c = a.firstChild(function(a) {
                                return a.type == CKEDITOR.NODE_TEXT && !p(a.parent);
                            });
                            (c = c && c.parent) && c.addStyle("mso-list", "Ignore");
                        }
                        a.filterChildren(b), q(a) || (e.enterMode == CKEDITOR.ENTER_BR ? (delete a.name, 
                        a.add(new CKEDITOR.htmlParser.element("br"))) : j(e["format_" + (e.enterMode == CKEDITOR.ENTER_P ? "p" : "div")])(a));
                    },
                    div: function(a) {
                        var b = a.onlyChild();
                        if (b && "table" == b.name) {
                            var c = a.attributes;
                            b.attributes = CKEDITOR.tools.extend(b.attributes, c), c.style && b.addStyle(c.style), 
                            b = new CKEDITOR.htmlParser.element("div"), b.addStyle("clear", "both"), a.add(b), 
                            delete a.name;
                        }
                    },
                    td: function(a) {
                        a.getAncestor("thead") && (a.name = "th");
                    },
                    ol: m,
                    ul: m,
                    dl: m,
                    font: function(a) {
                        if (o(a.parent)) delete a.name; else {
                            a.filterChildren(b);
                            var c = a.attributes, d = c.style, e = a.parent;
                            "font" == e.name ? (CKEDITOR.tools.extend(e.attributes, a.attributes), d && e.addStyle(d), 
                            delete a.name) : (d = d || "", c.color && ("#000000" != c.color && (d += "color:" + c.color + ";"), 
                            delete c.color), c.face && (d += "font-family:" + c.face + ";", delete c.face), 
                            c.size && (d += "font-size:" + (3 < c.size ? "large" : 3 > c.size ? "small" : "medium") + ";", 
                            delete c.size), a.name = "span", a.addStyle(d));
                        }
                    },
                    span: function(a) {
                        if (o(a.parent)) return !1;
                        if (a.filterChildren(b), p(a)) return delete a.name, null;
                        if (o(a)) {
                            var c = a.firstChild(function(a) {
                                return a.value || "img" == a.name;
                            }), d = (c = c && (c.value || "l.")) && c.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);
                            if (d) return c = l(d, c), (a = a.getAncestor("span")) && / mso-hide:\s*all|display:\s*none /.test(a.attributes.style) && (c.attributes["cke:ignored"] = 1), 
                            c;
                        }
                        return (d = (c = a.attributes) && c.style) && (c.style = i([ [ "line-height" ], [ /^font-family$/, null, u ? null : k(e.font_style, "family") ], [ /^font-size$/, null, u ? null : k(e.fontSize_style, "size") ], [ /^color$/, null, u ? null : k(e.colorButton_foreStyle, "color") ], [ /^background-color$/, null, u ? null : k(e.colorButton_backStyle, "color") ] ])(d, a) || ""), 
                        c.style || delete c.style, CKEDITOR.tools.isEmpty(c) && delete a.name, null;
                    },
                    b: j(e.coreStyles_bold),
                    i: j(e.coreStyles_italic),
                    u: j(e.coreStyles_underline),
                    s: j(e.coreStyles_strike),
                    sup: j(e.coreStyles_superscript),
                    sub: j(e.coreStyles_subscript),
                    a: function(a) {
                        a = a.attributes, a.href && a.href.match(/^file:\/\/\/[\S]+#/i) && (a.href = a.href.replace(/^file:\/\/\/[^#]+/i, ""));
                    },
                    "cke:listbullet": function(a) {
                        a.getAncestor(/h\d/) && !e.pasteFromWordNumberedHeadingToList && delete a.name;
                    }
                },
                attributeNames: [ [ /^onmouse(:?out|over)/, "" ], [ /^onload$/, "" ], [ /(?:v|o):\w+/, "" ], [ /^lang/, "" ] ],
                attributes: {
                    style: i(v ? [ [ /^list-style-type$/, null ], [ /^margin$|^margin-(?!bottom|top)/, null, function(a, b, c) {
                        if (b.name in {
                            p: 1,
                            div: 1
                        }) {
                            if (b = "ltr" == e.contentsLangDirection ? "margin-left" : "margin-right", "margin" == c) a = s(c, a, [ b ])[b]; else if (c != b) return null;
                            if (a && !g.test(a)) return [ b, a ];
                        }
                        return null;
                    } ], [ /^clear$/ ], [ /^border.*|margin.*|vertical-align|float$/, null, function(a, b) {
                        return "img" == b.name ? a : void 0;
                    } ], [ /^width|height$/, null, function(a, b) {
                        return b.name in {
                            table: 1,
                            td: 1,
                            th: 1,
                            img: 1
                        } ? a : void 0;
                    } ] ] : [ [ /^mso-/ ], [ /-color$/, null, function(a) {
                        return "transparent" == a ? !1 : CKEDITOR.env.gecko ? a.replace(/-moz-use-text-color/g, "transparent") : void 0;
                    } ], [ /^margin$/, g ], [ "text-indent", "0cm" ], [ "page-break-before" ], [ "tab-stops" ], [ "display", "none" ], u ? [ /font-?/ ] : null ], v),
                    width: function(a, b) {
                        return b.name in c.$tableContent ? !1 : void 0;
                    },
                    border: function(a, b) {
                        return b.name in c.$tableContent ? !1 : void 0;
                    },
                    "class": h,
                    bgcolor: h,
                    valign: v ? h : function(a, b) {
                        return b.addStyle("vertical-align", a), !1;
                    }
                },
                comment: CKEDITOR.env.ie ? h : function(a, b) {
                    var c = a.match(/<img.*?>/), d = a.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);
                    return d ? (d = (c = d[1] || c && "l.") && c.match(/>(?:[(]?)([^\s]+?)([.)]?)</), 
                    l(d, c)) : CKEDITOR.env.gecko && c ? (c = CKEDITOR.htmlParser.fragment.fromHtml(c[0]).children[0], 
                    (d = (d = (d = b.previous) && d.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/)) && d[1]) && (c.attributes.src = d), 
                    c) : !1;
                }
            };
        }
    }, n = function() {
        this.dataFilter = new CKEDITOR.htmlParser.filter();
    };
    n.prototype = {
        toHtml: function(a) {
            var a = CKEDITOR.htmlParser.fragment.fromHtml(a), b = new CKEDITOR.htmlParser.basicWriter();
            return a.writeHtml(b, this.dataFilter), b.getHtml(!0);
        }
    }, CKEDITOR.cleanWord = function(a, b) {
        CKEDITOR.env.gecko && (a = a.replace(/(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi, "$1$2$3")), 
        CKEDITOR.env.webkit && (a = a.replace(/(class="MsoListParagraph[^>]+><\!--\[if !supportLists\]--\>)([^<]+<span[^<]+<\/span>)(<\!--\[endif\]--\>)/gi, "$1<span>$2</span>$3"));
        var c = new n(), d = c.dataFilter;
        d.addRules(CKEDITOR.plugins.pastefromword.getRules(b, d)), b.fire("beforeCleanWord", {
            filter: d
        });
        try {
            a = c.toHtml(a);
        } catch (e) {
            alert(b.lang.pastefromword.error);
        }
        return a = a.replace(/cke:.*?".*?"/g, ""), a = a.replace(/style=""/g, ""), a = a.replace(/<span>/g, "");
    };
}();