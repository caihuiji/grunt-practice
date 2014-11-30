CKEDITOR.plugins.add("linkdetector", {
    version: .1,
    init: function(a) {
        function b(a, b) {
            for (var c = 0; c < a.length; c++) {
                var d = a[c];
                if (d.startPos < b.startPos && d.endPos + b.length > b.endPos) return d.inSelection = !0, 
                d.bookmarkRange = b, !0;
            }
            return !1;
        }
        function c(a) {
            for (var b = a.match(f), c = 0; f.test(a); ) b[c] = {
                url: b[c],
                startPos: f.lastIndex - b[c].length,
                endPos: f.lastIndex
            }, ++c;
            return b;
        }
        function d(a, b, c) {
            var d = "";
            if (c === !0) {
                for (var e = 0; e < b.length; e++) {
                    var f = b[e];
                    if (d += a.substring(0 === e ? 0 : b[e - 1].endPos, f.startPos), f.inSelection) {
                        var g = f.url.substring(0, f.bookmarkRange.startPos - f.startPos) + h.outerHTML + f.url.substring(f.bookmarkRange.startPos - f.startPos);
                        d += '<a  href="' + f.url + '">' + g + "</a>";
                    } else d += '<a  href="' + f.url + '">' + f.url + "</a>";
                }
                return d += a.substring(b[b.length - 1].endPos);
            }
            for (var i = a.substring(0, c.startPos) + h.outerHTML + a.substring(c.startPos), e = 0; e < b.length; e++) {
                var f = b[e];
                d += f.startPos < c.startPos ? i.substring(0 === e ? 0 : b[e - 1].endPos, f.startPos) : i.substring(0 === e ? 0 : b[e - 1].endPos + c.length, f.startPos + c.length), 
                d += '<a  href="' + f.url + '">' + f.url + "</a>";
            }
            return d += i.substring(b[b.length - 1].startPos < c.startPos ? b[b.length - 1].endPos : b[b.length - 1].endPos + c.length);
        }
        var e, f = /(?:(?:(?:ftp|https?):\/\/)(?:[a-z0-9](?:[-_a-z0-9]*[-_a-z0-9])?\.)+(?:com|mobi|mil|arpa|pro|name|coop|asia|tel|int|xxx|museum|aero|travel|ltd|plc|me|net|edu|biz|gov|org|in(?:t|fo)|[a-z][a-z])(?:\.[a-z][a-z])?|(?:(?:ftp|https?):\/\/((?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.(?:2[0-4]\d|25[0-5]|[01]?\d{1,2}))))(?:\:(?:\d{1,5}))?(?:[\/?#](?:[\w-.'!~@(*)%=&#?;,|+:$\^\[\]{}])*)*/gi, g = "ck-bookmark-cp", h = document.createElement("span");
        h.id = g, a.on("change", function() {
            var a = this.document.$;
            e = setTimeout(function() {
                clearTimeout(e);
                var g = a.body.innerHTML;
                if (f.test(g)) {
                    var i = new Date() - 0;
                    g = g.replace(/(<a.+?>)|<\/a>/gi, "");
                    var j = a.getSelection(), k = j.getRangeAt(0), l = c(g);
                    k.insertNode(h);
                    var m = a.body.innerHTML.replace(/(<a.+?>)|<\/a>/gi, ""), n = m.indexOf(h.outerHTML), o = {
                        startPos: n,
                        endPos: n + h.outerHTML.length,
                        length: h.outerHTML.length
                    };
                    a.body.innerHTML = b(l, o) ? d(g, l, !0) : d(g, l, o);
                    var p = a.createRange(), q = a.getElementById("ck-bookmark-cp");
                    q && (p.selectNode(q), j.removeAllRanges(), j.addRange(p), q.remove()), console.log("spend time " + (new Date().getTime() - i));
                }
            }, 500);
        }, a, null, 300);
    }
});