var swfobject = function() {
    function a() {
        if (!K) {
            try {
                var a = D.getElementsByTagName("body")[0].appendChild(D.createElement("span"));
                a.parentNode.removeChild(a);
            } catch (b) {
                return;
            }
            K = !0;
            for (var a = G.length, c = 0; a > c; c++) G[c]();
        }
    }
    function b(a) {
        K ? a() : G[G.length] = a;
    }
    function c(a) {
        if (typeof C.addEventListener != y) C.addEventListener("load", a, !1); else if (typeof D.addEventListener != y) D.addEventListener("load", a, !1); else if (typeof C.attachEvent != y) n(C, "onload", a); else if ("function" == typeof C.onload) {
            var b = C.onload;
            C.onload = function() {
                b(), a();
            };
        } else C.onload = a;
    }
    function d() {
        var a = D.getElementsByTagName("body")[0], b = D.createElement(z);
        b.setAttribute("type", A);
        var c = a.appendChild(b);
        if (c) {
            var d = 0;
            !function() {
                if (typeof c.GetVariable != y) {
                    var f = c.GetVariable("$version");
                    f && (f = f.split(" ")[1].split(","), N.pv = [ parseInt(f[0], 10), parseInt(f[1], 10), parseInt(f[2], 10) ]);
                } else if (10 > d) return d++, void setTimeout(arguments.callee, 10);
                a.removeChild(b), c = null, e();
            }();
        } else e();
    }
    function e() {
        var a = H.length;
        if (a > 0) for (var b = 0; a > b; b++) {
            var c = H[b].id, d = H[b].callbackFn, e = {
                success: !1,
                id: c
            };
            if (0 < N.pv[0]) {
                var j = m(c);
                if (j) if (!o(H[b].swfVersion) || N.wk && 312 > N.wk) if (H[b].expressInstall && g()) {
                    e = {}, e.data = H[b].expressInstall, e.width = j.getAttribute("width") || "0", 
                    e.height = j.getAttribute("height") || "0", j.getAttribute("class") && (e.styleclass = j.getAttribute("class")), 
                    j.getAttribute("align") && (e.align = j.getAttribute("align"));
                    for (var k = {}, j = j.getElementsByTagName("param"), l = j.length, n = 0; l > n; n++) "movie" != j[n].getAttribute("name").toLowerCase() && (k[j[n].getAttribute("name")] = j[n].getAttribute("value"));
                    h(e, k, c, d);
                } else i(j), d && d(e); else q(c, !0), d && (e.success = !0, e.ref = f(c), d(e));
            } else q(c, !0), d && ((c = f(c)) && typeof c.SetVariable != y && (e.success = !0, 
            e.ref = c), d(e));
        }
    }
    function f(a) {
        var b = null;
        return (a = m(a)) && "OBJECT" == a.nodeName && (typeof a.SetVariable != y ? b = a : (a = a.getElementsByTagName(z)[0]) && (b = a)), 
        b;
    }
    function g() {
        return !L && o("6.0.65") && (N.win || N.mac) && !(N.wk && 312 > N.wk);
    }
    function h(a, b, c, d) {
        L = !0, u = d || null, v = {
            success: !1,
            id: c
        };
        var e = m(c);
        e && ("OBJECT" == e.nodeName ? (s = j(e), t = null) : (s = e, t = c), a.id = B, 
        (typeof a.width == y || !/%$/.test(a.width) && 310 > parseInt(a.width, 10)) && (a.width = "310"), 
        (typeof a.height == y || !/%$/.test(a.height) && 137 > parseInt(a.height, 10)) && (a.height = "137"), 
        D.title = D.title.slice(0, 47) + " - Flash Player Installation", d = N.ie && N.win ? "ActiveX" : "PlugIn", 
        d = "MMredirectURL=" + C.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + d + "&MMdoctitle=" + D.title, 
        b.flashvars = typeof b.flashvars != y ? b.flashvars + ("&" + d) : d, N.ie && N.win && 4 != e.readyState && (d = D.createElement("div"), 
        c += "SWFObjectNew", d.setAttribute("id", c), e.parentNode.insertBefore(d, e), e.style.display = "none", 
        function() {
            4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10);
        }()), k(a, b, c));
    }
    function i(a) {
        if (N.ie && N.win && 4 != a.readyState) {
            var b = D.createElement("div");
            a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(j(a), b), a.style.display = "none", 
            function() {
                4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10);
            }();
        } else a.parentNode.replaceChild(j(a), a);
    }
    function j(a) {
        var b = D.createElement("div");
        if (N.win && N.ie) b.innerHTML = a.innerHTML; else if ((a = a.getElementsByTagName(z)[0]) && (a = a.childNodes)) for (var c = a.length, d = 0; c > d; d++) !(1 == a[d].nodeType && "PARAM" == a[d].nodeName) && 8 != a[d].nodeType && b.appendChild(a[d].cloneNode(!0));
        return b;
    }
    function k(a, b, c) {
        var d, e = m(c);
        if (N.wk && 312 > N.wk) return d;
        if (e) if (typeof a.id == y && (a.id = c), N.ie && N.win) {
            var f, g = "";
            for (f in a) a[f] != Object.prototype[f] && ("data" == f.toLowerCase() ? b.movie = a[f] : "styleclass" == f.toLowerCase() ? g += ' class="' + a[f] + '"' : "classid" != f.toLowerCase() && (g += " " + f + '="' + a[f] + '"'));
            f = "";
            for (var h in b) b[h] != Object.prototype[h] && (f += '<param name="' + h + '" value="' + b[h] + '" />');
            e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + g + ">" + f + "</object>", 
            I[I.length] = a.id, d = m(a.id);
        } else {
            h = D.createElement(z), h.setAttribute("type", A);
            for (var i in a) a[i] != Object.prototype[i] && ("styleclass" == i.toLowerCase() ? h.setAttribute("class", a[i]) : "classid" != i.toLowerCase() && h.setAttribute(i, a[i]));
            for (g in b) b[g] != Object.prototype[g] && "movie" != g.toLowerCase() && (a = h, 
            f = g, i = b[g], c = D.createElement("param"), c.setAttribute("name", f), c.setAttribute("value", i), 
            a.appendChild(c));
            e.parentNode.replaceChild(h, e), d = h;
        }
        return d;
    }
    function l(a) {
        var b = m(a);
        b && "OBJECT" == b.nodeName && (N.ie && N.win ? (b.style.display = "none", function() {
            if (4 == b.readyState) {
                var c = m(a);
                if (c) {
                    for (var d in c) "function" == typeof c[d] && (c[d] = null);
                    c.parentNode.removeChild(c);
                }
            } else setTimeout(arguments.callee, 10);
        }()) : b.parentNode.removeChild(b));
    }
    function m(a) {
        var b = null;
        try {
            b = D.getElementById(a);
        } catch (c) {}
        return b;
    }
    function n(a, b, c) {
        a.attachEvent(b, c), J[J.length] = [ a, b, c ];
    }
    function o(a) {
        var b = N.pv, a = a.split(".");
        return a[0] = parseInt(a[0], 10), a[1] = parseInt(a[1], 10) || 0, a[2] = parseInt(a[2], 10) || 0, 
        b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1;
    }
    function p(a, b, c, d) {
        if (!N.ie || !N.mac) {
            var e = D.getElementsByTagName("head")[0];
            e && (c = c && "string" == typeof c ? c : "screen", d && (x = w = null), w && x == c || (d = D.createElement("style"), 
            d.setAttribute("type", "text/css"), d.setAttribute("media", c), w = e.appendChild(d), 
            N.ie && N.win && typeof D.styleSheets != y && 0 < D.styleSheets.length && (w = D.styleSheets[D.styleSheets.length - 1]), 
            x = c), N.ie && N.win ? w && typeof w.addRule == z && w.addRule(a, b) : w && typeof D.createTextNode != y && w.appendChild(D.createTextNode(a + " {" + b + "}")));
        }
    }
    function q(a, b) {
        if (M) {
            var c = b ? "visible" : "hidden";
            K && m(a) ? m(a).style.visibility = c : p("#" + a, "visibility:" + c);
        }
    }
    function r(a) {
        return null != /[\\\"<>\.;]/.exec(a) && typeof encodeURIComponent != y ? encodeURIComponent(a) : a;
    }
    var s, t, u, v, w, x, y = "undefined", z = "object", A = "application/x-shockwave-flash", B = "SWFObjectExprInst", C = window, D = document, E = navigator, F = !1, G = [ function() {
        F ? d() : e();
    } ], H = [], I = [], J = [], K = !1, L = !1, M = !0, N = function() {
        var a = typeof D.getElementById != y && typeof D.getElementsByTagName != y && typeof D.createElement != y, b = E.userAgent.toLowerCase(), c = E.platform.toLowerCase(), d = /win/.test(c ? c : b), c = /mac/.test(c ? c : b), b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, e = !1, f = [ 0, 0, 0 ], g = null;
        if (typeof E.plugins != y && typeof E.plugins["Shockwave Flash"] == z) !(g = E.plugins["Shockwave Flash"].description) || typeof E.mimeTypes != y && E.mimeTypes[A] && !E.mimeTypes[A].enabledPlugin || (F = !0, 
        e = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), f[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10), 
        f[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10), f[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof C.ActiveXObject != y) try {
            var h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            h && (g = h.GetVariable("$version")) && (e = !0, g = g.split(" ")[1].split(","), 
            f = [ parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10) ]);
        } catch (i) {}
        return {
            w3: a,
            pv: f,
            wk: b,
            ie: e,
            win: d,
            mac: c
        };
    }();
    return function() {
        N.w3 && ((typeof D.readyState != y && "complete" == D.readyState || typeof D.readyState == y && (D.getElementsByTagName("body")[0] || D.body)) && a(), 
        K || (typeof D.addEventListener != y && D.addEventListener("DOMContentLoaded", a, !1), 
        N.ie && N.win && (D.attachEvent("onreadystatechange", function() {
            "complete" == D.readyState && (D.detachEvent("onreadystatechange", arguments.callee), 
            a());
        }), C == top && function() {
            if (!K) {
                try {
                    D.documentElement.doScroll("left");
                } catch (b) {
                    return void setTimeout(arguments.callee, 0);
                }
                a();
            }
        }()), N.wk && function() {
            K || (/loaded|complete/.test(D.readyState) ? a() : setTimeout(arguments.callee, 0));
        }(), c(a)));
    }(), function() {
        N.ie && N.win && window.attachEvent("onunload", function() {
            for (var a = J.length, b = 0; a > b; b++) J[b][0].detachEvent(J[b][1], J[b][2]);
            for (a = I.length, b = 0; a > b; b++) l(I[b]);
            for (var c in N) N[c] = null;
            N = null;
            for (var d in swfobject) swfobject[d] = null;
            swfobject = null;
        });
    }(), {
        registerObject: function(a, b, c, d) {
            if (N.w3 && a && b) {
                var e = {};
                e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, H[H.length] = e, 
                q(a, !1);
            } else d && d({
                success: !1,
                id: a
            });
        },
        getObjectById: function(a) {
            return N.w3 ? f(a) : void 0;
        },
        embedSWF: function(a, c, d, e, f, i, j, l, m, n) {
            var p = {
                success: !1,
                id: c
            };
            N.w3 && !(N.wk && 312 > N.wk) && a && c && d && e && f ? (q(c, !1), b(function() {
                d += "", e += "";
                var b = {};
                if (m && typeof m === z) for (var r in m) b[r] = m[r];
                if (b.data = a, b.width = d, b.height = e, r = {}, l && typeof l === z) for (var s in l) r[s] = l[s];
                if (j && typeof j === z) for (var t in j) r.flashvars = typeof r.flashvars != y ? r.flashvars + ("&" + t + "=" + j[t]) : t + "=" + j[t];
                if (o(f)) s = k(b, r, c), b.id == c && q(c, !0), p.success = !0, p.ref = s; else {
                    if (i && g()) return b.data = i, void h(b, r, c, n);
                    q(c, !0);
                }
                n && n(p);
            })) : n && n(p);
        },
        switchOffAutoHideShow: function() {
            M = !1;
        },
        ua: N,
        getFlashPlayerVersion: function() {
            return {
                major: N.pv[0],
                minor: N.pv[1],
                release: N.pv[2]
            };
        },
        hasFlashPlayerVersion: o,
        createSWF: function(a, b, c) {
            return N.w3 ? k(a, b, c) : void 0;
        },
        showExpressInstall: function(a, b, c, d) {
            N.w3 && g() && h(a, b, c, d);
        },
        removeSWF: function(a) {
            N.w3 && l(a);
        },
        createCSS: function(a, b, c, d) {
            N.w3 && p(a, b, c, d);
        },
        addDomLoadEvent: b,
        addLoadEvent: c,
        getQueryParamValue: function(a) {
            var b = D.location.search || D.location.hash;
            if (b) {
                if (/\?/.test(b) && (b = b.split("?")[1]), null == a) return r(b);
                for (var b = b.split("&"), c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf("=")) == a) return r(b[c].substring(b[c].indexOf("=") + 1));
            }
            return "";
        },
        expressInstallCallback: function() {
            if (L) {
                var a = m(B);
                a && s && (a.parentNode.replaceChild(s, a), t && (q(t, !0), N.ie && N.win && (s.style.display = "block")), 
                u && u(v)), L = !1;
            }
        }
    };
}();