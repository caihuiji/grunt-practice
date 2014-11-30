!function() {
    function a(a) {
        if (!a) throw "Languages-by-groups list are required for construct selectbox";
        var b, c = [], d = "";
        for (b in a) for (var e in a[b]) {
            var f = a[b][e];
            "en_US" == f ? d = f : c.push(f);
        }
        return c.sort(), d && c.unshift(d), {
            getCurrentLangGroup: function(b) {
                a: {
                    for (var c in a) for (var d in a[c]) if (d.toUpperCase() === b.toUpperCase()) {
                        b = c;
                        break a;
                    }
                    b = "";
                }
                return b;
            },
            setLangList: function() {
                var b, c = {};
                for (b in a) for (var d in a[b]) c[a[b][d]] = d;
                return c;
            }()
        };
    }
    var b = function() {
        var a = function(a, b, c) {
            var c = c || {}, d = c.expires;
            if ("number" == typeof d && d) {
                var e = new Date();
                e.setTime(e.getTime() + 1e3 * d), d = c.expires = e;
            }
            d && d.toUTCString && (c.expires = d.toUTCString());
            var f, b = encodeURIComponent(b), a = a + "=" + b;
            for (f in c) b = c[f], a += "; " + f, !0 !== b && (a += "=" + b);
            document.cookie = a;
        };
        return {
            postMessage: {
                init: function(a) {
                    document.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent("onmessage", a);
                },
                send: function(a) {
                    var b = a.fn || null, c = a.id || "", d = a.target || window, e = a.message || {
                        id: c
                    };
                    "[object Object]" == Object.prototype.toString.call(a.message) && (a.message.id || (a.message.id = c), 
                    e = a.message), a = window.JSON.stringify(e, b), d.postMessage(a, "*");
                }
            },
            hash: {
                create: function() {},
                parse: function() {}
            },
            cookie: {
                set: a,
                get: function(a) {
                    return (a = document.cookie.match(RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))) ? decodeURIComponent(a[1]) : void 0;
                },
                remove: function(b) {
                    a(b, "", {
                        expires: -1
                    });
                }
            }
        };
    }(), c = c || {};
    c.TextAreaNumber = null, c.load = !0, c.cmd = {
        SpellTab: "spell",
        Thesaurus: "thes",
        GrammTab: "grammar"
    }, c.dialog = null, c.optionNode = null, c.selectNode = null, c.grammerSuggest = null, 
    c.textNode = {}, c.iframeMain = null, c.dataTemp = "", c.div_overlay = null, c.textNodeInfo = {}, 
    c.selectNode = {}, c.selectNodeResponce = {}, c.langList = null, c.langSelectbox = null, 
    c.banner = "", c.show_grammar = null, c.div_overlay_no_check = null, c.targetFromFrame = {}, 
    c.onLoadOverlay = null, c.LocalizationComing = {}, c.OverlayPlace = null, c.LocalizationButton = {
        ChangeTo: {
            instance: null,
            text: "Change to"
        },
        ChangeAll: {
            instance: null,
            text: "Change All"
        },
        IgnoreWord: {
            instance: null,
            text: "Ignore word"
        },
        IgnoreAllWords: {
            instance: null,
            text: "Ignore all words"
        },
        Options: {
            instance: null,
            text: "Options",
            optionsDialog: {
                instance: null
            }
        },
        AddWord: {
            instance: null,
            text: "Add word"
        },
        FinishChecking: {
            instance: null,
            text: "Finish Checking"
        }
    }, c.LocalizationLabel = {
        ChangeTo: {
            instance: null,
            text: "Change to"
        },
        Suggestions: {
            instance: null,
            text: "Suggestions"
        }
    };
    var d, e, f = function(a) {
        for (var b in a) a[b].instance.getElement().setText(c.LocalizationComing[b]);
    }, g = function(a) {
        for (var b in a) {
            if (!a[b].instance.setLabel) break;
            a[b].instance.setLabel(c.LocalizationComing[b]);
        }
    };
    c.framesetHtml = function(a) {
        return '<iframe src="' + c.templatePath + '" id=' + c.iframeNumber + "_" + a + ' frameborder="0" allowtransparency="1" style="width:100%;border: 1px solid #AEB3B9;overflow: auto;background:#fff; border-radius: 3px;"></iframe>';
    }, c.setIframe = function(a, b) {
        var d = c.framesetHtml(b);
        return a.getElement().setHtml(d);
    }, c.setCurrentIframe = function(a) {
        c.setIframe(c.dialog._.contents[a].Content, a);
    }, c.setHeightBannerFrame = function() {
        var a = c.dialog.getContentElement("SpellTab", "banner").getElement(), b = c.dialog.getContentElement("GrammTab", "banner").getElement(), d = c.dialog.getContentElement("Thesaurus", "banner").getElement();
        a.setStyle("height", "90px"), b.setStyle("height", "90px"), d.setStyle("height", "90px");
    }, c.setHeightFrame = function() {
        document.getElementById(c.iframeNumber + "_" + c.dialog._.currentTabId).style.height = "240px";
    }, c.sendData = function(a) {
        var b, d, e = a._.currentTabId, f = a._.contents[e].Content;
        c.setIframe(f, e), a.parts.tabs.removeAllListeners(), a.parts.tabs.on("click", function(g) {
            g = g || window.event, g.data.getTarget().is("a") && e != a._.currentTabId && (e = a._.currentTabId, 
            f = a._.contents[e].Content, b = c.iframeNumber + "_" + e, c.div_overlay.setEnable(), 
            f.getElement().getChildCount() ? o(c.targetFromFrame[b], c.cmd[e]) : (c.setIframe(f, e), 
            d = document.getElementById(b), c.targetFromFrame[b] = d.contentWindow));
        });
    }, c.buildSelectLang = function(a) {
        var b = new CKEDITOR.dom.element("div"), c = new CKEDITOR.dom.element("select"), a = "wscLang" + a;
        return b.addClass("cke_dialog_ui_input_select"), b.setAttribute("role", "presentation"), 
        b.setStyles({
            height: "auto",
            position: "absolute",
            right: "0",
            top: "-1px",
            width: "160px",
            "white-space": "normal"
        }), c.setAttribute("id", a), c.addClass("cke_dialog_ui_input_select"), c.setStyles({
            width: "160px"
        }), b.append(c), b;
    }, c.buildOptionLang = function(a, b) {
        var d, e, f = document.getElementById("wscLang" + b), g = document.createDocumentFragment(), h = [];
        if (0 === f.options.length) {
            for (d in a) h.push([ d, a[d] ]);
            h.sort();
            for (var i = 0; i < h.length; i++) d = document.createElement("option"), d.setAttribute("value", h[i][1]), 
            e = document.createTextNode(h[i][0]), d.appendChild(e), h[i][1] == c.selectingLang && d.setAttribute("selected", "selected"), 
            g.appendChild(d);
            f.appendChild(g);
        }
    }, c.buildOptionSynonyms = function(a) {
        a = c.selectNodeResponce[a], c.selectNode.synonyms.clear();
        for (var b = 0; b < a.length; b++) c.selectNode.synonyms.add(a[b], a[b]);
        c.selectNode.synonyms.getInputElement().$.firstChild.selected = !0, c.textNode.Thesaurus.setValue(c.selectNode.synonyms.getInputElement().getValue());
    };
    var h = function(a) {
        var b = document, c = a.target || b.body, d = a.id || "overlayBlock", e = a.opacity || "0.9", a = a.background || "#f1f1f1", f = b.getElementById(d), g = f || b.createElement("div");
        return g.style.cssText = "position: absolute;top:30px;bottom:41px;left:1px;right:1px;z-index: 10020;padding:0;margin:0;background:" + a + ";opacity: " + e + ";filter: alpha(opacity=" + 100 * e + ");display: none;", 
        g.id = d, f || c.appendChild(g), {
            setDisable: function() {
                g.style.display = "none";
            },
            setEnable: function() {
                g.style.display = "block";
            }
        };
    }, i = function(a, b, d) {
        var e = new CKEDITOR.dom.element("div"), f = new CKEDITOR.dom.element("input"), g = new CKEDITOR.dom.element("label"), h = "wscGrammerSuggest" + a + "_" + b;
        return e.addClass("cke_dialog_ui_input_radio"), e.setAttribute("role", "presentation"), 
        e.setStyles({
            width: "97%",
            padding: "5px",
            "white-space": "normal"
        }), f.setAttributes({
            type: "radio",
            value: b,
            name: "wscGrammerSuggest",
            id: h
        }), f.setStyles({
            "float": "left"
        }), f.on("click", function(a) {
            c.textNode.GrammTab.setValue(a.sender.getValue());
        }), d && f.setAttribute("checked", !0), f.addClass("cke_dialog_ui_radio_input"), 
        g.appendText(a), g.setAttribute("for", h), g.setStyles({
            display: "block",
            "line-height": "16px",
            "margin-left": "18px",
            "white-space": "normal"
        }), e.append(f), e.append(g), e;
    }, j = function(a) {
        a = a || "true", null !== a && "false" == a && s();
    }, k = function(d) {
        var e = new a(d), d = "wscLang" + c.dialog.getParentEditor().name, d = document.getElementById(d), f = c.iframeNumber + "_" + c.dialog._.currentTabId;
        c.buildOptionLang(e.setLangList, c.dialog.getParentEditor().name), p[e.getCurrentLangGroup(c.selectingLang)](), 
        j(c.show_grammar), d.onchange = function() {
            p[e.getCurrentLangGroup(this.value)](), j(c.show_grammar), c.div_overlay.setEnable(), 
            c.selectingLang = this.value, b.postMessage.send({
                message: {
                    changeLang: c.selectingLang,
                    text: c.dataTemp
                },
                target: c.targetFromFrame[f],
                id: "selectionLang_outer__page"
            });
        };
    }, l = function(a) {
        if ("no_any_suggestions" == a) {
            a = "No suggestions", c.LocalizationButton.ChangeTo.instance.disable(), c.LocalizationButton.ChangeAll.instance.disable();
            var b = function(a) {
                a = c.LocalizationButton[a].instance, a.getElement().hasClass("cke_disabled") ? a.getElement().setStyle("color", "#a0a0a0") : a.disable();
            };
            b("ChangeTo"), b("ChangeAll");
        } else c.LocalizationButton.ChangeTo.instance.enable(), c.LocalizationButton.ChangeAll.instance.enable(), 
        c.LocalizationButton.ChangeTo.instance.getElement().setStyle("color", "#333"), c.LocalizationButton.ChangeAll.instance.getElement().setStyle("color", "#333");
        return a;
    }, m = {
        iframeOnload: function() {
            c.div_overlay.setEnable();
            var a = c.dialog._.currentTabId;
            o(c.targetFromFrame[c.iframeNumber + "_" + a], c.cmd[a]);
        },
        suggestlist: function(a) {
            delete a.id, c.div_overlay_no_check.setDisable(), v(), k(c.langList);
            var b = l(a.word), d = "";
            for (b instanceof Array && (b = a.word[0]), d = b = b.split(","), e.clear(), c.textNode.SpellTab.setValue(d[0]), 
            a = 0; a < d.length; a++) e.add(d[a], d[a]);
            u(), c.div_overlay.setDisable();
        },
        grammerSuggest: function(a) {
            delete a.id, delete a.mocklangs, v(), k(c.langList);
            var b = a.grammSuggest[0];
            c.grammerSuggest.getElement().setHtml(""), c.textNode.GrammTab.reset(), c.textNode.GrammTab.setValue(b), 
            c.textNodeInfo.GrammTab.getElement().setHtml(""), c.textNodeInfo.GrammTab.getElement().setText(a.info);
            for (var a = a.grammSuggest, b = a.length, d = !0, e = 0; b > e; e++) c.grammerSuggest.getElement().append(i(a[e], a[e], d)), 
            d = !1;
            u(), c.div_overlay.setDisable();
        },
        thesaurusSuggest: function(a) {
            delete a.id, delete a.mocklangs, v(), k(c.langList), c.selectNodeResponce = a, c.textNode.Thesaurus.reset(), 
            c.selectNode.categories.clear();
            for (var b in a) c.selectNode.categories.add(b, b);
            a = c.selectNode.categories.getInputElement().getChildren().$[0].value, c.selectNode.categories.getInputElement().getChildren().$[0].selected = !0, 
            c.buildOptionSynonyms(a), u(), c.div_overlay.setDisable();
        },
        finish: function(a) {
            delete a.id, c.dialog.getContentElement(c.dialog._.currentTabId, "bottomGroup").getElement().hide(), 
            c.dialog.getContentElement(c.dialog._.currentTabId, "BlockFinishChecking").getElement().show(), 
            c.div_overlay.setDisable();
        },
        settext: function(a) {
            delete a.id, c.dialog.getParentEditor().getCommand("checkspell");
            var b = c.dialog.getParentEditor();
            b.focus(), b.setData(a.text, function() {
                c.dataTemp = "", b.unlockSelection(), b.fire("saveSnapshot"), c.dialog.hide();
            });
        },
        ReplaceText: function(a) {
            delete a.id, c.div_overlay.setEnable(), c.dataTemp = a.text, c.selectingLang = a.currentLang, 
            window.setTimeout(function() {
                c.div_overlay.setDisable();
            }, 500), f(c.LocalizationButton), g(c.LocalizationLabel);
        },
        options_checkbox_send: function(a) {
            delete a.id, a = {
                osp: b.cookie.get("osp"),
                udn: b.cookie.get("udn"),
                cust_dic_ids: c.cust_dic_ids
            }, b.postMessage.send({
                message: a,
                target: c.targetFromFrame[c.iframeNumber + "_" + c.dialog._.currentTabId],
                id: "options_outer__page"
            });
        },
        getOptions: function(a) {
            var d = a.DefOptions.udn;
            if (c.LocalizationComing = a.DefOptions.localizationButtonsAndText, c.show_grammar = a.show_grammar, 
            c.langList = a.lang, c.bnr = a.bannerId) {
                c.setHeightBannerFrame();
                var e = a.banner;
                c.dialog.getContentElement(c.dialog._.currentTabId, "banner").getElement().setHtml(e);
            } else c.setHeightFrame();
            "undefined" == d && (c.userDictionaryName ? (d = c.userDictionaryName, e = {
                osp: b.cookie.get("osp"),
                udn: c.userDictionaryName,
                cust_dic_ids: c.cust_dic_ids,
                id: "options_dic_send",
                udnCmd: "create"
            }, b.postMessage.send({
                message: e,
                target: c.targetFromFrame[void 0]
            })) : d = ""), b.cookie.set("osp", a.DefOptions.osp), b.cookie.set("udn", d), b.cookie.set("cust_dic_ids", a.DefOptions.cust_dic_ids), 
            b.postMessage.send({
                id: "giveOptions"
            });
        },
        options_dic_send: function() {
            var a = {
                osp: b.cookie.get("osp"),
                udn: b.cookie.get("udn"),
                cust_dic_ids: c.cust_dic_ids,
                id: "options_dic_send",
                udnCmd: b.cookie.get("udnCmd")
            };
            b.postMessage.send({
                message: a,
                target: c.targetFromFrame[c.iframeNumber + "_" + c.dialog._.currentTabId]
            });
        },
        data: function(a) {
            delete a.id;
        },
        giveOptions: function() {},
        setOptionsConfirmF: function() {},
        setOptionsConfirmT: function() {
            d.setValue("");
        },
        clickBusy: function() {
            c.div_overlay.setEnable();
        },
        suggestAllCame: function() {
            c.div_overlay.setDisable(), c.div_overlay_no_check.setDisable();
        },
        TextCorrect: function() {
            k(c.langList);
        }
    }, n = function(a) {
        a = a || window.event, (a = window.JSON.parse(a.data)) && a.id && m[a.id](a);
    }, o = function(a, d, e, f) {
        d = d || CKEDITOR.config.wsc_cmd, e = e || c.dataTemp, b.postMessage.send({
            message: {
                customerId: c.wsc_customerId,
                text: e,
                txt_ctrl: c.TextAreaNumber,
                cmd: d,
                cust_dic_ids: c.cust_dic_ids,
                udn: c.userDictionaryName,
                slang: c.selectingLang,
                reset_suggest: f || !1
            },
            target: a,
            id: "data_outer__page"
        }), c.div_overlay.setEnable();
    }, p = {
        superset: function() {
            c.dialog.showPage("Thesaurus"), c.dialog.showPage("GrammTab"), t();
        },
        usual: function() {
            r(), s(), t();
        },
        rtl: function() {
            r(), s(), t();
        }
    }, q = function(a) {
        var b = new function(a) {
            var b = {};
            return {
                getCmdByTab: function(c) {
                    for (var d in a) b[a[d]] = d;
                    return b[c];
                }
            };
        }(c.cmd);
        a.selectPage(b.getCmdByTab(CKEDITOR.config.wsc_cmd)), c.sendData(a);
    }, r = function() {
        c.dialog.hidePage("Thesaurus");
    }, s = function() {
        c.dialog.hidePage("GrammTab");
    }, t = function() {
        c.dialog.showPage("SpellTab");
    }, u = function() {
        c.dialog.getContentElement(c.dialog._.currentTabId, "bottomGroup").getElement().show();
    }, v = function() {
        c.dialog.getContentElement(c.dialog._.currentTabId, "BlockFinishChecking").getElement().hide();
    };
    CKEDITOR.dialog.add("checkspell", function(a) {
        var d = function() {
            c.div_overlay.setEnable();
            var d = c.dialog._.currentTabId, e = c.iframeNumber + "_" + d, f = c.textNode[d].getValue(), g = this.getElement().getAttribute("title-cmd");
            b.postMessage.send({
                message: {
                    cmd: g,
                    tabId: d,
                    new_word: f
                },
                target: c.targetFromFrame[e],
                id: "cmd_outer__page"
            }), ("ChangeTo" == g || "ChangeAll" == g) && a.fire("saveSnapshot"), "FinishChecking" == g && a.config.wsc_onFinish.call(CKEDITOR.document.getWindow().getFrame());
        };
        return {
            title: a.config.wsc_dialogTitle || a.lang.wsc.title,
            minWidth: 560,
            minHeight: 444,
            buttons: [ CKEDITOR.dialog.cancelButton ],
            onLoad: function() {
                c.dialog = this, r(), s(), t();
            },
            onShow: function() {
                if (a.lockSelection(a.getSelection()), c.TextAreaNumber = "cke_textarea_" + CKEDITOR.currentInstance.name, 
                b.postMessage.init(n), c.dataTemp = CKEDITOR.currentInstance.getData(), c.OverlayPlace = c.dialog.parts.tabs.getParent().$, 
                CKEDITOR && CKEDITOR.config) {
                    c.wsc_customerId = a.config.wsc_customerId, c.cust_dic_ids = a.config.wsc_customDictionaryIds, 
                    c.userDictionaryName = a.config.wsc_userDictionaryName, c.defaultLanguage = CKEDITOR.config.defaultLanguage;
                    var d = "file:" == document.location.protocol ? "http:" : document.location.protocol;
                    CKEDITOR.scriptLoader.load(a.config.wsc_customLoaderScript || d + "//loader.webspellchecker.net/sproxy_fck/sproxy.php?plugin=fck2&customerid=" + c.wsc_customerId + "&cmd=script&doc=wsc&schema=22", function(b) {
                        CKEDITOR.config && CKEDITOR.config.wsc && CKEDITOR.config.wsc.DefaultParams ? (c.serverLocationHash = CKEDITOR.config.wsc.DefaultParams.serviceHost, 
                        c.logotype = CKEDITOR.config.wsc.DefaultParams.logoPath, c.loadIcon = CKEDITOR.config.wsc.DefaultParams.iconPath, 
                        c.loadIconEmptyEditor = CKEDITOR.config.wsc.DefaultParams.iconPathEmptyEditor, c.LangComparer = new CKEDITOR.config.wsc.DefaultParams._SP_FCK_LangCompare()) : (c.serverLocationHash = DefaultParams.serviceHost, 
                        c.logotype = DefaultParams.logoPath, c.loadIcon = DefaultParams.iconPath, c.loadIconEmptyEditor = DefaultParams.iconPathEmptyEditor, 
                        c.LangComparer = new _SP_FCK_LangCompare()), c.pluginPath = CKEDITOR.getUrl(a.plugins.wsc.path), 
                        c.iframeNumber = c.TextAreaNumber, c.templatePath = c.pluginPath + "dialogs/tmp.html", 
                        c.LangComparer.setDefaulLangCode(c.defaultLanguage), c.currentLang = a.config.wsc_lang || c.LangComparer.getSPLangCode(a.langCode), 
                        c.selectingLang = c.currentLang, c.div_overlay = new h({
                            opacity: "1",
                            background: "#fff url(" + c.loadIcon + ") no-repeat 50% 50%",
                            target: c.OverlayPlace
                        });
                        var d = c.dialog.parts.tabs.getId(), d = CKEDITOR.document.getById(d);
                        d.setStyle("width", "97%"), d.getElementsByTag("DIV").count() || d.append(c.buildSelectLang(c.dialog.getParentEditor().name)), 
                        c.div_overlay_no_check = new h({
                            opacity: "1",
                            id: "no_check_over",
                            background: "#fff url(" + c.loadIconEmptyEditor + ") no-repeat 50% 50%",
                            target: c.OverlayPlace
                        }), b && (q(c.dialog), c.dialog.setupContent(c.dialog));
                    });
                } else c.dialog.hide();
            },
            onHide: function() {
                c.dataTemp = "";
            },
            contents: [ {
                id: "SpellTab",
                label: "SpellChecker",
                accessKey: "S",
                elements: [ {
                    type: "html",
                    id: "banner",
                    label: "banner",
                    style: "",
                    html: "<div></div>"
                }, {
                    type: "html",
                    id: "Content",
                    label: "spellContent",
                    html: "",
                    setup: function(a) {
                        var a = c.iframeNumber + "_" + a._.currentTabId, b = document.getElementById(a);
                        c.targetFromFrame[a] = b.contentWindow;
                    }
                }, {
                    type: "hbox",
                    id: "bottomGroup",
                    style: "width:560px; margin: 0 auto;",
                    widths: [ "50%", "50%" ],
                    children: [ {
                        type: "hbox",
                        id: "leftCol",
                        align: "left",
                        width: "50%",
                        children: [ {
                            type: "vbox",
                            id: "rightCol1",
                            widths: [ "50%", "50%" ],
                            children: [ {
                                type: "text",
                                id: "text",
                                label: c.LocalizationLabel.ChangeTo.text + ":",
                                labelLayout: "horizontal",
                                labelStyle: "font: 12px/25px arial, sans-serif;",
                                width: "140px",
                                "default": "",
                                onShow: function() {
                                    c.textNode.SpellTab = this, c.LocalizationLabel.ChangeTo.instance = this;
                                },
                                onHide: function() {
                                    this.reset();
                                }
                            }, {
                                type: "hbox",
                                id: "rightCol",
                                align: "right",
                                width: "30%",
                                children: [ {
                                    type: "vbox",
                                    id: "rightCol_col__left",
                                    children: [ {
                                        type: "text",
                                        id: "labelSuggestions",
                                        label: c.LocalizationLabel.Suggestions.text + ":",
                                        onShow: function() {
                                            c.LocalizationLabel.Suggestions.instance = this, this.getInputElement().hide();
                                        }
                                    }, {
                                        type: "html",
                                        id: "logo",
                                        html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">',
                                        setup: function() {
                                            this.getElement().$.src = c.logotype, this.getElement().getParent().setStyles({
                                                "text-align": "left"
                                            });
                                        }
                                    } ]
                                }, {
                                    type: "select",
                                    id: "list_of_suggestions",
                                    labelStyle: "font: 12px/25px arial, sans-serif;",
                                    size: "6",
                                    inputStyle: "width: 140px; height: auto;",
                                    items: [ [ "loading..." ] ],
                                    onShow: function() {
                                        e = this;
                                    },
                                    onHide: function() {
                                        this.clear();
                                    },
                                    onChange: function() {
                                        c.textNode.SpellTab.setValue(this.getValue());
                                    }
                                } ]
                            } ]
                        } ]
                    }, {
                        type: "hbox",
                        id: "rightCol",
                        align: "right",
                        width: "50%",
                        children: [ {
                            type: "vbox",
                            id: "rightCol_col__left",
                            widths: [ "50%", "50%", "50%", "50%" ],
                            children: [ {
                                type: "button",
                                id: "ChangeTo",
                                label: c.LocalizationButton.ChangeTo.text,
                                title: "Change to",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id), c.LocalizationButton.ChangeTo.instance = this;
                                },
                                onClick: d
                            }, {
                                type: "button",
                                id: "ChangeAll",
                                label: c.LocalizationButton.ChangeAll.text,
                                title: "Change All",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id), c.LocalizationButton.ChangeAll.instance = this;
                                },
                                onClick: d
                            }, {
                                type: "button",
                                id: "AddWord",
                                label: c.LocalizationButton.AddWord.text,
                                title: "Add word",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id), c.LocalizationButton.AddWord.instance = this;
                                },
                                onClick: d
                            }, {
                                type: "button",
                                id: "FinishChecking",
                                label: c.LocalizationButton.FinishChecking.text,
                                title: "Finish Checking",
                                style: "width: 100%;margin-top: 9px;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id), c.LocalizationButton.FinishChecking.instance = this;
                                },
                                onClick: d
                            } ]
                        }, {
                            type: "vbox",
                            id: "rightCol_col__right",
                            widths: [ "50%", "50%", "50%" ],
                            children: [ {
                                type: "button",
                                id: "IgnoreWord",
                                label: c.LocalizationButton.IgnoreWord.text,
                                title: "Ignore word",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id), c.LocalizationButton.IgnoreWord.instance = this;
                                },
                                onClick: d
                            }, {
                                type: "button",
                                id: "IgnoreAllWords",
                                label: c.LocalizationButton.IgnoreAllWords.text,
                                title: "Ignore all words",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id), c.LocalizationButton.IgnoreAllWords.instance = this;
                                },
                                onClick: d
                            }, {
                                type: "button",
                                id: "option",
                                label: c.LocalizationButton.Options.text,
                                title: "Option",
                                style: "width: 100%;",
                                onLoad: function() {
                                    c.LocalizationButton.Options.instance = this, "file:" == document.location.protocol && this.disable();
                                },
                                onClick: function() {
                                    "file:" == document.location.protocol ? alert("WSC: Options functionality is disabled when runing from file system") : a.openDialog("options");
                                }
                            } ]
                        } ]
                    } ]
                }, {
                    type: "hbox",
                    id: "BlockFinishChecking",
                    style: "width:560px; margin: 0 auto;",
                    widths: [ "70%", "30%" ],
                    onShow: function() {
                        this.getElement().hide();
                    },
                    onHide: u,
                    children: [ {
                        type: "hbox",
                        id: "leftCol",
                        align: "left",
                        width: "70%",
                        children: [ {
                            type: "vbox",
                            id: "rightCol1",
                            setup: function() {
                                this.getChild()[0].getElement().$.src = c.logotype, this.getChild()[0].getElement().getParent().setStyles({
                                    "text-align": "center"
                                });
                            },
                            children: [ {
                                type: "html",
                                id: "logo",
                                html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">'
                            } ]
                        } ]
                    }, {
                        type: "hbox",
                        id: "rightCol",
                        align: "right",
                        width: "30%",
                        children: [ {
                            type: "vbox",
                            id: "rightCol_col__left",
                            children: [ {
                                type: "button",
                                id: "Option_button",
                                label: c.LocalizationButton.Options.text,
                                title: "Option",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id), "file:" == document.location.protocol && this.disable();
                                },
                                onClick: function() {
                                    "file:" == document.location.protocol ? alert("WSC: Options functionality is disabled when runing from file system") : a.openDialog("options");
                                }
                            }, {
                                type: "button",
                                id: "FinishChecking",
                                label: c.LocalizationButton.FinishChecking.text,
                                title: "Finish Checking",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                },
                                onClick: d
                            } ]
                        } ]
                    } ]
                } ]
            }, {
                id: "GrammTab",
                label: "Grammar",
                accessKey: "G",
                elements: [ {
                    type: "html",
                    id: "banner",
                    label: "banner",
                    style: "",
                    html: "<div></div>"
                }, {
                    type: "html",
                    id: "Content",
                    label: "GrammarContent",
                    html: "",
                    setup: function() {
                        var a = c.iframeNumber + "_" + c.dialog._.currentTabId, b = document.getElementById(a);
                        c.targetFromFrame[a] = b.contentWindow;
                    }
                }, {
                    type: "vbox",
                    id: "bottomGroup",
                    style: "width:560px; margin: 0 auto;",
                    children: [ {
                        type: "hbox",
                        id: "leftCol",
                        widths: [ "66%", "34%" ],
                        children: [ {
                            type: "vbox",
                            children: [ {
                                type: "text",
                                id: "text",
                                label: "Change to:",
                                labelLayout: "horizontal",
                                labelStyle: "font: 12px/25px arial, sans-serif;",
                                inputStyle: "float: right; width: 200px;",
                                "default": "",
                                onShow: function() {
                                    c.textNode.GrammTab = this;
                                },
                                onHide: function() {
                                    this.reset();
                                }
                            }, {
                                type: "html",
                                id: "html_text",
                                html: "<div style='min-height: 17px; line-height: 17px; padding: 5px; text-align: left;background: #F1F1F1;color: #595959; white-space: normal!important;'></div>",
                                onShow: function() {
                                    c.textNodeInfo.GrammTab = this;
                                }
                            }, {
                                type: "html",
                                id: "radio",
                                html: "",
                                onShow: function() {
                                    c.grammerSuggest = this;
                                }
                            } ]
                        }, {
                            type: "vbox",
                            children: [ {
                                type: "button",
                                id: "ChangeTo",
                                label: "Change to",
                                title: "Change to",
                                style: "width: 133px; float: right;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                },
                                onClick: d
                            }, {
                                type: "button",
                                id: "IgnoreWord",
                                label: "Ignore word",
                                title: "Ignore word",
                                style: "width: 133px; float: right;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                },
                                onClick: d
                            }, {
                                type: "button",
                                id: "IgnoreAllWords",
                                label: "Ignore Problem",
                                title: "Ignore Problem",
                                style: "width: 133px; float: right;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                },
                                onClick: d
                            }, {
                                type: "button",
                                id: "FinishChecking",
                                label: "Finish Checking",
                                title: "Finish Checking",
                                style: "width: 133px; float: right; margin-top: 9px;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                },
                                onClick: d
                            } ]
                        } ]
                    } ]
                }, {
                    type: "hbox",
                    id: "BlockFinishChecking",
                    style: "width:560px; margin: 0 auto;",
                    widths: [ "70%", "30%" ],
                    onShow: function() {
                        this.getElement().hide();
                    },
                    onHide: u,
                    children: [ {
                        type: "hbox",
                        id: "leftCol",
                        align: "left",
                        width: "70%",
                        children: [ {
                            type: "vbox",
                            id: "rightCol1",
                            children: [ {
                                type: "html",
                                id: "logo",
                                html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">',
                                setup: function() {
                                    this.getElement().$.src = c.logotype, this.getElement().getParent().setStyles({
                                        "text-align": "center"
                                    });
                                }
                            } ]
                        } ]
                    }, {
                        type: "hbox",
                        id: "rightCol",
                        align: "right",
                        width: "30%",
                        children: [ {
                            type: "vbox",
                            id: "rightCol_col__left",
                            children: [ {
                                type: "button",
                                id: "FinishChecking",
                                label: "Finish Checking",
                                title: "Finish Checking",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                },
                                onClick: d
                            } ]
                        } ]
                    } ]
                } ]
            }, {
                id: "Thesaurus",
                label: "Thesaurus",
                accessKey: "T",
                elements: [ {
                    type: "html",
                    id: "banner",
                    label: "banner",
                    style: "",
                    html: "<div></div>"
                }, {
                    type: "html",
                    id: "Content",
                    label: "spellContent",
                    html: "",
                    setup: function() {
                        var a = c.iframeNumber + "_" + c.dialog._.currentTabId, b = document.getElementById(a);
                        c.targetFromFrame[a] = b.contentWindow;
                    }
                }, {
                    type: "vbox",
                    id: "bottomGroup",
                    style: "width:560px; margin: -10px auto; overflow: hidden;",
                    children: [ {
                        type: "hbox",
                        widths: [ "75%", "25%" ],
                        children: [ {
                            type: "vbox",
                            children: [ {
                                type: "hbox",
                                widths: [ "65%", "35%" ],
                                children: [ {
                                    type: "text",
                                    id: "ChangeTo",
                                    label: "Change to:",
                                    labelLayout: "horizontal",
                                    inputStyle: "width: 160px;",
                                    labelStyle: "font: 12px/25px arial, sans-serif;",
                                    "default": "",
                                    onShow: function() {
                                        c.textNode.Thesaurus = this;
                                    },
                                    onHide: function() {
                                        this.reset();
                                    }
                                }, {
                                    type: "button",
                                    id: "ChangeTo",
                                    label: "Change to",
                                    title: "Change to",
                                    style: "width: 121px; margin-top: 1px;",
                                    onLoad: function() {
                                        this.getElement().setAttribute("title-cmd", this.id);
                                    },
                                    onClick: d
                                } ]
                            }, {
                                type: "hbox",
                                children: [ {
                                    type: "select",
                                    id: "categories",
                                    label: "Categories:",
                                    labelStyle: "font: 12px/25px arial, sans-serif;",
                                    size: "5",
                                    inputStyle: "width: 180px; height: auto;",
                                    items: [],
                                    onShow: function() {
                                        c.selectNode.categories = this;
                                    },
                                    onHide: function() {
                                        this.clear();
                                    },
                                    onChange: function() {
                                        c.buildOptionSynonyms(this.getValue());
                                    }
                                }, {
                                    type: "select",
                                    id: "synonyms",
                                    label: "Synonyms:",
                                    labelStyle: "font: 12px/25px arial, sans-serif;",
                                    size: "5",
                                    inputStyle: "width: 180px; height: auto;",
                                    items: [],
                                    onShow: function() {
                                        c.selectNode.synonyms = this, c.textNode.Thesaurus.setValue(this.getValue());
                                    },
                                    onHide: function() {
                                        this.clear();
                                    },
                                    onChange: function() {
                                        c.textNode.Thesaurus.setValue(this.getValue());
                                    }
                                } ]
                            } ]
                        }, {
                            type: "vbox",
                            width: "120px",
                            style: "margin-top:46px;",
                            children: [ {
                                type: "html",
                                id: "logotype",
                                label: "WebSpellChecker.net",
                                html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">',
                                setup: function() {
                                    this.getElement().$.src = c.logotype, this.getElement().getParent().setStyles({
                                        "text-align": "center"
                                    });
                                }
                            }, {
                                type: "button",
                                id: "FinishChecking",
                                label: "Finish Checking",
                                title: "Finish Checking",
                                style: "width: 121px; float: right; margin-top: 9px;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                },
                                onClick: d
                            } ]
                        } ]
                    } ]
                }, {
                    type: "hbox",
                    id: "BlockFinishChecking",
                    style: "width:560px; margin: 0 auto;",
                    widths: [ "70%", "30%" ],
                    onShow: function() {
                        this.getElement().hide();
                    },
                    children: [ {
                        type: "hbox",
                        id: "leftCol",
                        align: "left",
                        width: "70%",
                        children: [ {
                            type: "vbox",
                            id: "rightCol1",
                            children: [ {
                                type: "html",
                                id: "logo",
                                html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">',
                                setup: function() {
                                    this.getElement().$.src = c.logotype, this.getElement().getParent().setStyles({
                                        "text-align": "center"
                                    });
                                }
                            } ]
                        } ]
                    }, {
                        type: "hbox",
                        id: "rightCol",
                        align: "right",
                        width: "30%",
                        children: [ {
                            type: "vbox",
                            id: "rightCol_col__left",
                            children: [ {
                                type: "button",
                                id: "FinishChecking",
                                label: "Finish Checking",
                                title: "Finish Checking",
                                style: "width: 100%;",
                                onLoad: function() {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                },
                                onClick: d
                            } ]
                        } ]
                    } ]
                } ]
            } ]
        };
    }), CKEDITOR.dialog.add("options", function() {
        var a = null, e = {}, f = {}, g = null, h = null;
        b.cookie.get("udn"), b.cookie.get("osp");
        var i = function() {
            h = this.getElement().getAttribute("title-cmd");
            var a = [];
            a[0] = f.IgnoreAllCapsWords, a[1] = f.IgnoreWordsNumbers, a[2] = f.IgnoreMixedCaseWords, 
            a[3] = f.IgnoreDomainNames, a = a.toString().replace(/,/g, ""), b.cookie.set("osp", a), 
            b.cookie.set("udnCmd", h ? h : "ignore"), "delete" != h && (a = "", "" !== d.getValue() && (a = d.getValue()), 
            b.cookie.set("udn", a)), b.postMessage.send({
                id: "options_dic_send"
            });
        }, j = function() {
            g.getElement().setHtml(c.LocalizationComing.error), g.getElement().show();
        };
        return {
            title: c.LocalizationComing.Options,
            minWidth: 430,
            minHeight: 130,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents: [ {
                id: "OptionsTab",
                label: "Options",
                accessKey: "O",
                elements: [ {
                    type: "hbox",
                    id: "options_error",
                    children: [ {
                        type: "html",
                        style: "display: block;text-align: center;white-space: normal!important; font-size: 12px;color:red",
                        html: "<div></div>",
                        onShow: function() {
                            g = this;
                        }
                    } ]
                }, {
                    type: "vbox",
                    id: "Options_content",
                    children: [ {
                        type: "hbox",
                        id: "Options_manager",
                        widths: [ "52%", "48%" ],
                        children: [ {
                            type: "fieldset",
                            label: "Spell Checking Options",
                            style: "border: none;margin-top: 13px;padding: 10px 0 10px 10px",
                            onShow: function() {
                                this.getInputElement().$.children[0].innerHTML = c.LocalizationComing.SpellCheckingOptions;
                            },
                            children: [ {
                                type: "vbox",
                                id: "Options_checkbox",
                                children: [ {
                                    type: "checkbox",
                                    id: "IgnoreAllCapsWords",
                                    label: "Ignore All-Caps Words",
                                    labelStyle: "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                                    style: "float:left; min-height: 16px;",
                                    "default": "",
                                    onClick: function() {
                                        f[this.id] = this.getValue() ? 1 : 0;
                                    }
                                }, {
                                    type: "checkbox",
                                    id: "IgnoreWordsNumbers",
                                    label: "Ignore Words with Numbers",
                                    labelStyle: "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                                    style: "float:left; min-height: 16px;",
                                    "default": "",
                                    onClick: function() {
                                        f[this.id] = this.getValue() ? 1 : 0;
                                    }
                                }, {
                                    type: "checkbox",
                                    id: "IgnoreMixedCaseWords",
                                    label: "Ignore Mixed-Case Words",
                                    labelStyle: "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                                    style: "float:left; min-height: 16px;",
                                    "default": "",
                                    onClick: function() {
                                        f[this.id] = this.getValue() ? 1 : 0;
                                    }
                                }, {
                                    type: "checkbox",
                                    id: "IgnoreDomainNames",
                                    label: "Ignore Domain Names",
                                    labelStyle: "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                                    style: "float:left; min-height: 16px;",
                                    "default": "",
                                    onClick: function() {
                                        f[this.id] = this.getValue() ? 1 : 0;
                                    }
                                } ]
                            } ]
                        }, {
                            type: "vbox",
                            id: "Options_DictionaryName",
                            children: [ {
                                type: "text",
                                id: "DictionaryName",
                                style: "margin-bottom: 10px",
                                label: "Dictionary Name:",
                                labelLayout: "vertical",
                                labelStyle: "font: 12px/25px arial, sans-serif;",
                                "default": "",
                                onLoad: function() {
                                    d = this, this.setValue(c.userDictionaryName ? c.userDictionaryName : (b.cookie.get("udn"), 
                                    this.getValue()));
                                },
                                onShow: function() {
                                    d = this, this.setValue(b.cookie.get("udn") ? b.cookie.get("udn") : this.getValue()), 
                                    this.setLabel(c.LocalizationComing.DictionaryName);
                                },
                                onHide: function() {
                                    this.reset();
                                }
                            }, {
                                type: "hbox",
                                id: "Options_buttons",
                                children: [ {
                                    type: "vbox",
                                    id: "Options_leftCol_col",
                                    widths: [ "50%", "50%" ],
                                    children: [ {
                                        type: "button",
                                        id: "create",
                                        label: "Create",
                                        title: "Create",
                                        style: "width: 100%;",
                                        onLoad: function() {
                                            this.getElement().setAttribute("title-cmd", this.id);
                                        },
                                        onShow: function() {
                                            this.getElement().setText(c.LocalizationComing.Create);
                                        },
                                        onClick: i
                                    }, {
                                        type: "button",
                                        id: "restore",
                                        label: "Restore",
                                        title: "Restore",
                                        style: "width: 100%;",
                                        onLoad: function() {
                                            this.getElement().setAttribute("title-cmd", this.id);
                                        },
                                        onShow: function() {
                                            this.getElement().setText(c.LocalizationComing.Restore);
                                        },
                                        onClick: i
                                    } ]
                                }, {
                                    type: "vbox",
                                    id: "Options_rightCol_col",
                                    widths: [ "50%", "50%" ],
                                    children: [ {
                                        type: "button",
                                        id: "rename",
                                        label: "Rename",
                                        title: "Rename",
                                        style: "width: 100%;",
                                        onLoad: function() {
                                            this.getElement().setAttribute("title-cmd", this.id);
                                        },
                                        onShow: function() {
                                            this.getElement().setText(c.LocalizationComing.Rename);
                                        },
                                        onClick: i
                                    }, {
                                        type: "button",
                                        id: "delete",
                                        label: "Remove",
                                        title: "Remove",
                                        style: "width: 100%;",
                                        onLoad: function() {
                                            this.getElement().setAttribute("title-cmd", this.id);
                                        },
                                        onShow: function() {
                                            this.getElement().setText(c.LocalizationComing.Remove);
                                        },
                                        onClick: i
                                    } ]
                                } ]
                            } ]
                        } ]
                    }, {
                        type: "hbox",
                        id: "Options_text",
                        children: [ {
                            type: "html",
                            style: "text-align: justify;margin-top: 15px;white-space: normal!important; font-size: 12px;color:#777;",
                            html: "<div>" + c.LocalizationComing.OptionsTextIntro + "</div>",
                            onShow: function() {
                                this.getElement().setText(c.LocalizationComing.OptionsTextIntro);
                            }
                        } ]
                    } ]
                } ]
            } ],
            buttons: [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ],
            onOk: function() {
                var a = [];
                a[0] = f.IgnoreAllCapsWords, a[1] = f.IgnoreWordsNumbers, a[2] = f.IgnoreMixedCaseWords, 
                a[3] = f.IgnoreDomainNames, a = a.toString().replace(/,/g, ""), b.cookie.set("osp", a), 
                b.cookie.set("udn", d.getValue()), b.postMessage.send({
                    id: "options_checkbox_send"
                }), g.getElement().hide(), g.getElement().setHtml(" ");
            },
            onLoad: function() {
                a = this, b.postMessage.init(j), e.IgnoreAllCapsWords = a.getContentElement("OptionsTab", "IgnoreAllCapsWords"), 
                e.IgnoreWordsNumbers = a.getContentElement("OptionsTab", "IgnoreWordsNumbers"), 
                e.IgnoreMixedCaseWords = a.getContentElement("OptionsTab", "IgnoreMixedCaseWords"), 
                e.IgnoreDomainNames = a.getContentElement("OptionsTab", "IgnoreDomainNames");
            },
            onShow: function() {
                var a = b.cookie.get("osp").split("");
                f.IgnoreAllCapsWords = a[0], f.IgnoreWordsNumbers = a[1], f.IgnoreMixedCaseWords = a[2], 
                f.IgnoreDomainNames = a[3], parseInt(f.IgnoreAllCapsWords, 10) ? e.IgnoreAllCapsWords.setValue("checked", !1) : e.IgnoreAllCapsWords.setValue("", !1), 
                parseInt(f.IgnoreWordsNumbers, 10) ? e.IgnoreWordsNumbers.setValue("checked", !1) : e.IgnoreWordsNumbers.setValue("", !1), 
                parseInt(f.IgnoreMixedCaseWords, 10) ? e.IgnoreMixedCaseWords.setValue("checked", !1) : e.IgnoreMixedCaseWords.setValue("", !1), 
                parseInt(f.IgnoreDomainNames, 10) ? e.IgnoreDomainNames.setValue("checked", !1) : e.IgnoreDomainNames.setValue("", !1), 
                f.IgnoreAllCapsWords = e.IgnoreAllCapsWords.getValue() ? 1 : 0, f.IgnoreWordsNumbers = e.IgnoreWordsNumbers.getValue() ? 1 : 0, 
                f.IgnoreMixedCaseWords = e.IgnoreMixedCaseWords.getValue() ? 1 : 0, f.IgnoreDomainNames = e.IgnoreDomainNames.getValue() ? 1 : 0, 
                e.IgnoreAllCapsWords.getElement().$.lastChild.innerHTML = c.LocalizationComing.IgnoreAllCapsWords, 
                e.IgnoreWordsNumbers.getElement().$.lastChild.innerHTML = c.LocalizationComing.IgnoreWordsWithNumbers, 
                e.IgnoreMixedCaseWords.getElement().$.lastChild.innerHTML = c.LocalizationComing.IgnoreMixedCaseWords, 
                e.IgnoreDomainNames.getElement().$.lastChild.innerHTML = c.LocalizationComing.IgnoreDomainNames;
            }
        };
    }), CKEDITOR.dialog.on("resize", function(a) {
        var a = a.data, b = a.dialog, d = CKEDITOR.document.getById(c.iframeNumber + "_" + b._.currentTabId);
        "checkspell" == b._.name && (c.bnr ? d && d.setSize("height", a.height - 310) : d && d.setSize("height", a.height - 220));
    }), CKEDITOR.on("dialogDefinition", function(a) {
        var b = a.data.definition;
        c.onLoadOverlay = new h({
            opacity: "1",
            background: "#fff",
            target: b.dialog.parts.tabs.getParent().$
        }), c.onLoadOverlay.setEnable(), b.dialog.on("show", function() {}), b.dialog.on("cancel", function() {
            return b.dialog.getParentEditor().config.wsc_onClose.call(this.document.getWindow().getFrame()), 
            c.div_overlay.setDisable(), !1;
        }, this, null, -1);
    });
}();