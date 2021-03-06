CKEDITOR.dialog.add("colordialog", function(a) {
    function b() {
        n.getById(t).removeStyle("background-color"), h.getContentElement("picker", "selectedColor").setValue(""), 
        i && i.removeAttribute("aria-selected"), i = null;
    }
    function c(a) {
        var b, a = a.data.getTarget();
        "td" == a.getName() && (b = a.getChild(0).getHtml()) && (i = a, i.setAttribute("aria-selected", !0), 
        h.getContentElement("picker", "selectedColor").setValue(b));
    }
    function d(a) {
        for (var a = a.replace(/^#/, ""), b = 0, c = []; 2 >= b; b++) c[b] = parseInt(a.substr(2 * b, 2), 16);
        return "#" + (165 <= .2126 * c[0] + .7152 * c[1] + .0722 * c[2] ? "000" : "fff");
    }
    function e(a) {
        !a.name && (a = new CKEDITOR.event(a));
        var b, c = !/mouse/.test(a.name), e = a.data.getTarget();
        "td" == e.getName() && (b = e.getChild(0).getHtml()) && (f(a), c ? j = e : k = e, 
        c && (e.setStyle("border-color", d(b)), e.setStyle("border-style", "dotted")), n.getById(r).setStyle("background-color", b), 
        n.getById(s).setHtml(b));
    }
    function f(a) {
        if (a = !/mouse/.test(a.name) && j) {
            var b = a.getChild(0).getHtml();
            a.setStyle("border-color", b), a.setStyle("border-style", "solid");
        }
        !j && !k && (n.getById(r).removeStyle("background-color"), n.getById(s).setHtml("&nbsp;"));
    }
    function g(b) {
        var d = b.data, e = d.getTarget(), f = d.getKeystroke(), g = "rtl" == a.lang.dir;
        switch (f) {
          case 38:
            (b = e.getParent().getPrevious()) && (b = b.getChild([ e.getIndex() ]), b.focus()), 
            d.preventDefault();
            break;

          case 40:
            (b = e.getParent().getNext()) && (b = b.getChild([ e.getIndex() ])) && 1 == b.type && b.focus(), 
            d.preventDefault();
            break;

          case 32:
          case 13:
            c(b), d.preventDefault();
            break;

          case g ? 37 : 39:
            (b = e.getNext()) ? 1 == b.type && (b.focus(), d.preventDefault(!0)) : (b = e.getParent().getNext()) && (b = b.getChild([ 0 ])) && 1 == b.type && (b.focus(), 
            d.preventDefault(!0));
            break;

          case g ? 39 : 37:
            (b = e.getPrevious()) ? (b.focus(), d.preventDefault(!0)) : (b = e.getParent().getPrevious()) && (b = b.getLast(), 
            b.focus(), d.preventDefault(!0));
        }
    }
    var h, i, j, k, l, m = CKEDITOR.dom.element, n = CKEDITOR.document, o = a.lang.colordialog, p = {
        type: "html",
        html: "&nbsp;"
    }, q = function(a) {
        return CKEDITOR.tools.getNextId() + "_" + a;
    }, r = q("hicolor"), s = q("hicolortext"), t = q("selhicolor");
    return function() {
        function a(a, c) {
            for (var e = a; a + 3 > e; e++) {
                var f = new m(l.$.insertRow(-1));
                f.setAttribute("role", "row");
                for (var g = c; c + 3 > g; g++) for (var h = 0; 6 > h; h++) b(f.$, "#" + d[g] + d[h] + d[e]);
            }
        }
        function b(a, b) {
            var d = new m(a.insertCell(-1));
            d.setAttribute("class", "ColorCell"), d.setAttribute("tabIndex", -1), d.setAttribute("role", "gridcell"), 
            d.on("keydown", g), d.on("click", c), d.on("focus", e), d.on("blur", f), d.setStyle("background-color", b), 
            d.setStyle("border", "1px solid " + b), d.setStyle("width", "14px"), d.setStyle("height", "14px");
            var h = q("color_table_cell");
            d.setAttribute("aria-labelledby", h), d.append(CKEDITOR.dom.element.createFromHtml('<span id="' + h + '" class="cke_voice_label">' + b + "</span>", CKEDITOR.document));
        }
        l = CKEDITOR.dom.element.createFromHtml('<table tabIndex="-1" aria-label="' + o.options + '" role="grid" style="border-collapse:separate;" cellspacing="0"><caption class="cke_voice_label">' + o.options + '</caption><tbody role="presentation"></tbody></table>'), 
        l.on("mouseover", e), l.on("mouseout", f);
        var d = "00 33 66 99 cc ff".split(" ");
        a(0, 0), a(3, 0), a(0, 3), a(3, 3);
        var h = new m(l.$.insertRow(-1));
        h.setAttribute("role", "row");
        for (var i = 0; 6 > i; i++) b(h.$, "#" + d[i] + d[i] + d[i]);
        for (i = 0; 12 > i; i++) b(h.$, "#000000");
    }(), {
        title: o.title,
        minWidth: 360,
        minHeight: 220,
        onLoad: function() {
            h = this;
        },
        onHide: function() {
            b();
            var a = j.getChild(0).getHtml();
            j.setStyle("border-color", a), j.setStyle("border-style", "solid"), n.getById(r).removeStyle("background-color"), 
            n.getById(s).setHtml("&nbsp;"), j = null;
        },
        contents: [ {
            id: "picker",
            label: o.title,
            accessKey: "I",
            elements: [ {
                type: "hbox",
                padding: 0,
                widths: [ "70%", "10%", "30%" ],
                children: [ {
                    type: "html",
                    html: "<div></div>",
                    onLoad: function() {
                        CKEDITOR.document.getById(this.domId).append(l);
                    },
                    focus: function() {
                        (j || this.getElement().getElementsByTag("td").getItem(0)).focus();
                    }
                }, p, {
                    type: "vbox",
                    padding: 0,
                    widths: [ "70%", "5%", "25%" ],
                    children: [ {
                        type: "html",
                        html: "<span>" + o.highlight + '</span>												<div id="' + r + '" style="border: 1px solid; height: 74px; width: 74px;"></div>												<div id="' + s + '">&nbsp;</div><span>' + o.selected + '</span>												<div id="' + t + '" style="border: 1px solid; height: 20px; width: 74px;"></div>'
                    }, {
                        type: "text",
                        label: o.selected,
                        labelStyle: "display:none",
                        id: "selectedColor",
                        style: "width: 74px",
                        onChange: function() {
                            try {
                                n.getById(t).setStyle("background-color", this.getValue());
                            } catch (a) {
                                b();
                            }
                        }
                    }, p, {
                        type: "button",
                        id: "clear",
                        style: "margin-top: 5px",
                        label: o.clear,
                        onClick: b
                    } ]
                } ]
            } ]
        } ]
    };
});