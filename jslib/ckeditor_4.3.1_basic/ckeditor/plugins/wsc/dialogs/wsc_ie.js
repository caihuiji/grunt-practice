CKEDITOR.dialog.add("checkspell", function(a) {
    function b(a, b) {
        var e = 0;
        return function() {
            "function" == typeof window.doSpell ? ("undefined" != typeof d && window.clearInterval(d), 
            c(a)) : 180 == e++ && window._cancelOnError(b);
        };
    }
    function c(b) {
        var c = new window._SP_FCK_LangCompare(), d = CKEDITOR.getUrl(a.plugins.wsc.path + "dialogs/"), e = d + "tmpFrameset.html";
        window.gFCKPluginName = "wsc", c.setDefaulLangCode(a.config.defaultLanguage), window.doSpell({
            ctrl: g,
            lang: a.config.wsc_lang || c.getSPLangCode(a.langCode),
            intLang: a.config.wsc_uiLang || c.getSPLangCode(a.langCode),
            winType: f,
            onCancel: function() {
                b.hide();
            },
            onFinish: function(c) {
                a.focus(), b.getParentEditor().setData(c.value), b.hide();
            },
            staticFrame: e,
            framesetPath: e,
            iframePath: d + "ciframe.html",
            schemaURI: d + "wsc.css",
            userDictionaryName: a.config.wsc_userDictionaryName,
            customDictionaryName: a.config.wsc_customDictionaryIds && a.config.wsc_customDictionaryIds.split(","),
            domainName: a.config.wsc_domainName
        }), CKEDITOR.document.getById(h).setStyle("display", "none"), CKEDITOR.document.getById(f).setStyle("display", "block");
    }
    var d, e = CKEDITOR.tools.getNextNumber(), f = "cke_frame_" + e, g = "cke_data_" + e, h = "cke_error_" + e, e = document.location.protocol || "http:", i = a.lang.wsc.notAvailable, j = '<textarea style="display: none" id="' + g + '" rows="10" cols="40"> </textarea><div id="' + h + '" style="display:none;color:red;font-size:16px;font-weight:bold;padding-top:160px;text-align:center;z-index:11;"></div><iframe src="" style="width:100%;background-color:#f1f1e3;" frameborder="0" name="' + f + '" id="' + f + '" allowtransparency="1"></iframe>', k = a.config.wsc_customLoaderScript || e + "//loader.webspellchecker.net/sproxy_fck/sproxy.php?plugin=fck2&customerid=" + a.config.wsc_customerId + "&cmd=script&doc=wsc&schema=22";
    return a.config.wsc_customLoaderScript && (i += '<p style="color:#000;font-size:11px;font-weight: normal;text-align:center;padding-top:10px">' + a.lang.wsc.errorLoading.replace(/%s/g, a.config.wsc_customLoaderScript) + "</p>"), 
    window._cancelOnError = function(b) {
        if ("undefined" == typeof window.WSC_Error) {
            CKEDITOR.document.getById(f).setStyle("display", "none");
            var c = CKEDITOR.document.getById(h);
            c.setStyle("display", "block"), c.setHtml(b || a.lang.wsc.notAvailable);
        }
    }, {
        title: a.config.wsc_dialogTitle || a.lang.wsc.title,
        minWidth: 485,
        minHeight: 380,
        buttons: [ CKEDITOR.dialog.cancelButton ],
        onShow: function() {
            var c = this.getContentElement("general", "content").getElement();
            c.setHtml(j), c.getChild(2).setStyle("height", this._.contentSize.height + "px"), 
            "function" != typeof window.doSpell && CKEDITOR.document.getHead().append(CKEDITOR.document.createElement("script", {
                attributes: {
                    type: "text/javascript",
                    src: k
                }
            })), c = a.getData(), CKEDITOR.document.getById(g).setValue(c), d = window.setInterval(b(this, i), 250);
        },
        onHide: function() {
            window.ooo = void 0, window.int_framsetLoaded = void 0, window.framesetLoaded = void 0, 
            window.is_window_opened = !1;
        },
        contents: [ {
            id: "general",
            label: a.config.wsc_dialogTitle || a.lang.wsc.title,
            padding: 0,
            elements: [ {
                type: "html",
                id: "content",
                html: ""
            } ]
        } ]
    };
}), CKEDITOR.dialog.on("resize", function(a) {
    var a = a.data, b = a.dialog;
    "checkspell" == b._.name && ((b = (b = b.getContentElement("general", "content").getElement()) && b.getChild(2)) && b.setSize("height", a.height), 
    b && b.setSize("width", a.width));
});