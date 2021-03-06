CKEDITOR.dialog.add("smiley", function(a) {
    for (var b, c = a.config, d = a.lang.smiley, e = c.smiley_images, f = c.smiley_columns || 8, g = function(c) {
        var d = c.data.getTarget(), e = d.getName();
        if ("a" == e) d = d.getChild(0); else if ("img" != e) return;
        var e = d.getAttribute("cke_src"), f = d.getAttribute("title"), d = a.document.createElement("img", {
            attributes: {
                src: e,
                "data-cke-saved-src": e,
                title: f,
                alt: f,
                width: d.$.width,
                height: d.$.height
            }
        });
        a.insertElement(d), b.hide(), c.data.preventDefault();
    }, h = CKEDITOR.tools.addFunction(function(b, c) {
        var d, b = new CKEDITOR.dom.event(b), c = new CKEDITOR.dom.element(c);
        d = b.getKeystroke();
        var e = "rtl" == a.lang.dir;
        switch (d) {
          case 38:
            (d = c.getParent().getParent().getPrevious()) && (d = d.getChild([ c.getParent().getIndex(), 0 ]), 
            d.focus()), b.preventDefault();
            break;

          case 40:
            (d = c.getParent().getParent().getNext()) && (d = d.getChild([ c.getParent().getIndex(), 0 ])) && d.focus(), 
            b.preventDefault();
            break;

          case 32:
            g({
                data: b
            }), b.preventDefault();
            break;

          case e ? 37 : 39:
            (d = c.getParent().getNext()) ? (d = d.getChild(0), d.focus(), b.preventDefault(!0)) : (d = c.getParent().getParent().getNext()) && ((d = d.getChild([ 0, 0 ])) && d.focus(), 
            b.preventDefault(!0));
            break;

          case e ? 39 : 37:
            (d = c.getParent().getPrevious()) ? (d = d.getChild(0), d.focus(), b.preventDefault(!0)) : (d = c.getParent().getParent().getPrevious()) && (d = d.getLast().getChild(0), 
            d.focus(), b.preventDefault(!0));
        }
    }), i = CKEDITOR.tools.getNextId() + "_smiley_emtions_label", i = [ '<div><span id="' + i + '" class="cke_voice_label">' + d.options + "</span>", '<table role="listbox" aria-labelledby="' + i + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"', CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : "", "><tbody>" ], j = e.length, d = 0; j > d; d++) {
        0 === d % f && i.push('<tr role="presentation">');
        var k = "cke_smile_label_" + d + "_" + CKEDITOR.tools.getNextNumber();
        i.push('<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation"><a href="javascript:void(0)" role="option"', ' aria-posinset="' + (d + 1) + '"', ' aria-setsize="' + j + '"', ' aria-labelledby="' + k + '"', ' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', h, ', event, this );">', '<img class="cke_hand" title="', c.smiley_descriptions[d], '" cke_src="', CKEDITOR.tools.htmlEncode(c.smiley_path + e[d]), '" alt="', c.smiley_descriptions[d], '"', ' src="', CKEDITOR.tools.htmlEncode(c.smiley_path + e[d]), '"', CKEDITOR.env.ie ? " onload=\"this.setAttribute('width', 2); this.removeAttribute('width');\" " : "", '><span id="' + k + '" class="cke_voice_label">' + c.smiley_descriptions[d] + "</span></a>", "</td>"), 
        d % f == f - 1 && i.push("</tr>");
    }
    if (f - 1 > d) {
        for (;f - 1 > d; d++) i.push("<td></td>");
        i.push("</tr>");
    }
    return i.push("</tbody></table></div>"), c = {
        type: "html",
        id: "smileySelector",
        html: i.join(""),
        onLoad: function(a) {
            b = a.sender;
        },
        focus: function() {
            var a = this;
            setTimeout(function() {
                a.getElement().getElementsByTag("a").getItem(0).focus();
            }, 0);
        },
        onClick: g,
        style: "width: 100%; border-collapse: separate;"
    }, {
        title: a.lang.smiley.title,
        minWidth: 270,
        minHeight: 120,
        contents: [ {
            id: "tab1",
            label: "",
            title: "",
            expand: !0,
            padding: 0,
            elements: [ c ]
        } ],
        buttons: [ CKEDITOR.dialog.cancelButton ]
    };
});