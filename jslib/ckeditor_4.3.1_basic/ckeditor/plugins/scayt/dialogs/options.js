CKEDITOR.dialog.add("scaytcheck", function(a) {
    function b() {
        return "undefined" != typeof document.forms["optionsbar_" + m] ? document.forms["optionsbar_" + m].options : [];
    }
    function c(a, b) {
        if (a) {
            var c = a.length;
            if (void 0 == c) a.checked = a.value == b.toString(); else for (var d = 0; c > d; d++) a[d].checked = !1, 
            a[d].value == b.toString() && (a[d].checked = !0);
        }
    }
    function d(a) {
        l.getById("dic_message_" + m).setHtml('<span style="color:red;">' + a + "</span>");
    }
    function e(a) {
        l.getById("dic_message_" + m).setHtml('<span style="color:blue;">' + a + "</span>");
    }
    function f(a) {
        for (var a = ("" + a).split(","), b = 0, c = a.length; c > b; b += 1) l.getById(a[b]).$.style.display = "inline";
    }
    function g(a) {
        for (var a = ("" + a).split(","), b = 0, c = a.length; c > b; b += 1) l.getById(a[b]).$.style.display = "none";
    }
    function h(a) {
        l.getById("dic_name_" + m).$.value = a;
    }
    var i, j, k = !0, l = CKEDITOR.document, m = a.name, n = CKEDITOR.plugins.scayt.getUiTabs(a), o = [], p = 0, q = [ "dic_create_" + m + ",dic_restore_" + m, "dic_rename_" + m + ",dic_delete_" + m ], r = [ "mixedCase", "mixedWithDigits", "allCaps", "ignoreDomainNames" ];
    j = a.lang.scayt;
    var s = [ {
        id: "options",
        label: j.optionsTab,
        elements: [ {
            type: "html",
            id: "options",
            html: '<form name="optionsbar_' + m + '"><div class="inner_options">	<div class="messagebox"></div>	<div style="display:none;">		<input type="checkbox" name="options"  id="allCaps_' + m + '" />		<label style = "display: inline" for="allCaps" id="label_allCaps_' + m + '"></label>	</div>	<div style="display:none;">		<input name="options" type="checkbox"  id="ignoreDomainNames_' + m + '" />		<label style = "display: inline" for="ignoreDomainNames" id="label_ignoreDomainNames_' + m + '"></label>	</div>	<div style="display:none;">	<input name="options" type="checkbox"  id="mixedCase_' + m + '" />		<label style = "display: inline" for="mixedCase" id="label_mixedCase_' + m + '"></label>	</div>	<div style="display:none;">		<input name="options" type="checkbox"  id="mixedWithDigits_' + m + '" />		<label style = "display: inline" for="mixedWithDigits" id="label_mixedWithDigits_' + m + '"></label>	</div></div></form>'
        } ]
    }, {
        id: "langs",
        label: j.languagesTab,
        elements: [ {
            type: "html",
            id: "langs",
            html: '<div class="inner_langs">	<div class="messagebox"></div>	   <div style="float:left;width:45%;margin-left:5px;" id="scayt_lcol_' + m + '" ></div>   <div style="float:left;width:45%;margin-left:15px;" id="scayt_rcol_' + m + '"></div></div>'
        } ]
    }, {
        id: "dictionaries",
        label: j.dictionariesTab,
        elements: [ {
            type: "html",
            style: "",
            id: "dictionaries",
            html: '<form name="dictionarybar_' + m + '"><div class="inner_dictionary" style="text-align:left; white-space:normal; width:320px; overflow: hidden;">	<div style="margin:5px auto; width:95%;white-space:normal; overflow:hidden;" id="dic_message_' + m + '"> </div>	<div style="margin:5px auto; width:95%;white-space:normal;">        <span class="cke_dialog_ui_labeled_label" >Dictionary name</span><br>		<span class="cke_dialog_ui_labeled_content" >			<div class="cke_dialog_ui_input_text">				<input id="dic_name_' + m + '" type="text" class="cke_dialog_ui_input_text" style = "height: 25px; background: none; padding: 0;"/>		</div></span></div>		<div style="margin:5px auto; width:95%;white-space:normal;">			<a style="display:none;" class="cke_dialog_ui_button" href="javascript:void(0)" id="dic_create_' + m + '">				</a>			<a  style="display:none;" class="cke_dialog_ui_button" href="javascript:void(0)" id="dic_delete_' + m + '">				</a>			<a  style="display:none;" class="cke_dialog_ui_button" href="javascript:void(0)" id="dic_rename_' + m + '">				</a>			<a  style="display:none;" class="cke_dialog_ui_button" href="javascript:void(0)" id="dic_restore_' + m + '">				</a>		</div>	<div style="margin:5px auto; width:95%;white-space:normal;" id="dic_info_' + m + '"></div></div></form>'
        } ]
    }, {
        id: "about",
        label: j.aboutTab,
        elements: [ {
            type: "html",
            id: "about",
            style: "margin: 5px 5px;",
            html: '<div><div id="scayt_about_' + m + '"></div></div>'
        } ]
    } ], t = {
        title: j.title,
        minWidth: 360,
        minHeight: 220,
        onShow: function() {
            var b = this;
            if (b.data = a.fire("scaytDialog", {}), b.options = b.data.scayt_control.option(), 
            b.chosed_lang = b.sLang = b.data.scayt_control.sLang, b.data && b.data.scayt && b.data.scayt_control) {
                var c = 0;
                k ? b.data.scayt.getCaption(a.langCode || "en", function(a) {
                    0 < c++ || (i = a, u.apply(b), v.apply(b), k = !1);
                }) : v.apply(b), b.selectPage(b.data.tab);
            } else alert("Error loading application service"), b.hide();
        },
        onOk: function() {
            var a = this.data.scayt_control;
            a.option(this.options), a.setLang(this.chosed_lang), a.refresh();
        },
        onCancel: function() {
            var a, d = b();
            for (a in d) d[a].checked = !1;
            d = "undefined" != typeof document.forms["languagesbar_" + m] ? document.forms["languagesbar_" + m].scayt_lang : [], 
            c(d, "");
        },
        contents: o
    };
    for (CKEDITOR.plugins.scayt.getScayt(a), j = 0; j < n.length; j++) 1 == n[j] && (o[o.length] = s[j]);
    1 == n[2] && (p = 1);
    var u = function() {
        function a(a) {
            var b = l.getById("dic_name_" + m).getValue();
            if (!b) return d(" Dictionary name should not be empty. "), !1;
            try {
                var c = a.data.getTarget().getParent(), e = /(dic_\w+)_[\w\d]+/.exec(c.getId())[1];
                t[e].apply(null, [ c, b, q ]);
            } catch (f) {
                d(" Dictionary error. ");
            }
            return !0;
        }
        var b, c = this, j = c.data.scayt.getLangList(), k = [ "dic_create", "dic_delete", "dic_rename", "dic_restore" ], o = [], s = [];
        if (p) {
            for (b = 0; b < k.length; b++) o[b] = k[b] + "_" + m, l.getById(o[b]).setHtml('<span class="cke_dialog_ui_button">' + i["button_" + k[b]] + "</span>");
            l.getById("dic_info_" + m).setHtml(i.dic_info);
        }
        if (1 == n[0]) for (b in r) k = "label_" + r[b], o = l.getById(k + "_" + m), "undefined" != typeof o && "undefined" != typeof i[k] && "undefined" != typeof c.options[r[b]] && (o.setHtml(i[k]), 
        o.getParent().$.style.display = "block");
        if (k = '<p><img src="' + window.scayt.getAboutInfo().logoURL + '" /></p><p>' + i.version + window.scayt.getAboutInfo().version.toString() + "</p><p>" + i.about_throwt_copy + "</p>", 
        l.getById("scayt_about_" + m).setHtml(k), k = function(a, b) {
            var d = l.createElement("label");
            d.setAttribute("for", "cke_option" + a), d.setStyle("display", "inline"), d.setHtml(b[a]), 
            c.sLang == a && (c.chosed_lang = a);
            var e = l.createElement("div"), f = CKEDITOR.dom.element.createFromHtml('<input class = "cke_dialog_ui_radio_input" id="cke_option' + a + '" type="radio" ' + (c.sLang == a ? 'checked="checked"' : "") + ' value="' + a + '" name="scayt_lang" />');
            return f.on("click", function() {
                this.$.checked = !0, c.chosed_lang = a;
            }), e.append(f), e.append(d), {
                lang: b[a],
                code: a,
                radio: e
            };
        }, 1 == n[1]) {
            for (b in j.rtl) s[s.length] = k(b, j.ltr);
            for (b in j.ltr) s[s.length] = k(b, j.ltr);
            for (s.sort(function(a, b) {
                return b.lang > a.lang ? -1 : 1;
            }), j = l.getById("scayt_lcol_" + m), k = l.getById("scayt_rcol_" + m), b = 0; b < s.length; b++) (b < s.length / 2 ? j : k).append(s[b].radio);
        }
        var t = {
            dic_create: function(a, b, c) {
                var h = c[0] + "," + c[1], j = i.err_dic_create, k = i.succ_dic_create;
                window.scayt.createUserDictionary(b, function(a) {
                    g(h), f(c[1]), k = k.replace("%s", a.dname), e(k);
                }, function(a) {
                    j = j.replace("%s", a.dname), d(j + "( " + (a.message || "") + ")");
                });
            },
            dic_rename: function(a, b) {
                var c = i.err_dic_rename || "", f = i.succ_dic_rename || "";
                window.scayt.renameUserDictionary(b, function(a) {
                    f = f.replace("%s", a.dname), h(b), e(f);
                }, function(a) {
                    c = c.replace("%s", a.dname), h(b), d(c + "( " + (a.message || "") + " )");
                });
            },
            dic_delete: function(a, b, c) {
                var j = c[0] + "," + c[1], k = i.err_dic_delete, l = i.succ_dic_delete;
                window.scayt.deleteUserDictionary(function(a) {
                    l = l.replace("%s", a.dname), g(j), f(c[0]), h(""), e(l);
                }, function(a) {
                    k = k.replace("%s", a.dname), d(k);
                });
            }
        };
        for (t.dic_restore = c.dic_restore || function(a, b, c) {
            var h = c[0] + "," + c[1], j = i.err_dic_restore, k = i.succ_dic_restore;
            window.scayt.restoreUserDictionary(b, function(a) {
                k = k.replace("%s", a.dname), g(h), f(c[1]), e(k);
            }, function(a) {
                j = j.replace("%s", a.dname), d(j);
            });
        }, s = (q[0] + "," + q[1]).split(","), b = 0, j = s.length; j > b; b += 1) (k = l.getById(s[b])) && k.on("click", a, this);
    }, v = function() {
        var a = this;
        if (1 == n[0]) for (var d = b(), h = 0, i = d.length; i > h; h++) {
            var j = d[h].id, o = l.getById(j);
            o && (d[h].checked = !1, 1 == a.options[j.split("_")[0]] && (d[h].checked = !0), 
            k) && o.on("click", function() {
                a.options[this.getId().split("_")[0]] = this.$.checked ? 1 : 0;
            });
        }
        1 == n[1] && (d = l.getById("cke_option" + a.sLang), c(d.$, a.sLang)), p && (window.scayt.getNameUserDictionary(function(a) {
            a = a.dname, g(q[0] + "," + q[1]), a ? (l.getById("dic_name_" + m).setValue(a), 
            f(q[1])) : f(q[0]);
        }, function() {
            l.getById("dic_name_" + m).setValue("");
        }), e(""));
    };
    return t;
});