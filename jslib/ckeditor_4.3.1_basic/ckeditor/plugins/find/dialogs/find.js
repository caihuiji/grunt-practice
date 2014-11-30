!function() {
    function a(a) {
        return a.type == CKEDITOR.NODE_TEXT && 0 < a.getLength() && (!c || !a.isReadOnly());
    }
    function b(a) {
        return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary(CKEDITOR.tools.extend({}, CKEDITOR.dtd.$empty, CKEDITOR.dtd.$nonEditable)));
    }
    var c, d = function() {
        return {
            textNode: this.textNode,
            offset: this.offset,
            character: this.textNode ? this.textNode.getText().charAt(this.offset) : null,
            hitMatchBoundary: this._.matchBoundary
        };
    }, e = [ "find", "replace" ], f = [ [ "txtFindFind", "txtFindReplace" ], [ "txtFindCaseChk", "txtReplaceCaseChk" ], [ "txtFindWordChk", "txtReplaceWordChk" ], [ "txtFindCyclic", "txtReplaceCyclic" ] ], g = function(g, h) {
        function i(a, b) {
            var c = g.createRange();
            return c.setStart(a.textNode, b ? a.offset : a.offset + 1), c.setEndAt(g.editable(), CKEDITOR.POSITION_BEFORE_END), 
            c;
        }
        function j(a) {
            var b = g.getSelection(), c = g.editable();
            return b && !a ? (a = b.getRanges()[0].clone(), a.collapse(!0)) : (a = g.createRange(), 
            a.setStartAt(c, CKEDITOR.POSITION_AFTER_START)), a.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), 
            a;
        }
        var k = new CKEDITOR.style(CKEDITOR.tools.extend({
            attributes: {
                "data-cke-highlight": 1
            },
            fullMatch: 1,
            ignoreReadonly: 1,
            childRule: function() {
                return 0;
            }
        }, g.config.find_highlight, !0)), l = function(c, d) {
            var e = this, f = new CKEDITOR.dom.walker(c);
            f.guard = d ? b : function(a) {
                !b(a) && (e._.matchBoundary = !0);
            }, f.evaluator = a, f.breakOnFalse = 1, c.startContainer.type == CKEDITOR.NODE_TEXT && (this.textNode = c.startContainer, 
            this.offset = c.startOffset - 1), this._ = {
                matchWord: d,
                walker: f,
                matchBoundary: !1
            };
        };
        l.prototype = {
            next: function() {
                return this.move();
            },
            back: function() {
                return this.move(!0);
            },
            move: function(a) {
                var b = this.textNode;
                if (null === b) return d.call(this);
                if (this._.matchBoundary = !1, b && a && 0 < this.offset) this.offset--; else if (b && this.offset < b.getLength() - 1) this.offset++; else {
                    for (b = null; !(b || (b = this._.walker[a ? "previous" : "next"].call(this._.walker), 
                    this._.matchWord && !b || this._.walker._.end)); ) ;
                    this.offset = (this.textNode = b) && a ? b.getLength() - 1 : 0;
                }
                return d.call(this);
            }
        };
        var m = function(a, b) {
            this._ = {
                walker: a,
                cursors: [],
                rangeLength: b,
                highlightRange: null,
                isMatched: 0
            };
        };
        m.prototype = {
            toDomRange: function() {
                var a = g.createRange(), b = this._.cursors;
                if (1 > b.length) {
                    var c = this._.walker.textNode;
                    if (!c) return null;
                    a.setStartAfter(c);
                } else c = b[0], b = b[b.length - 1], a.setStart(c.textNode, c.offset), a.setEnd(b.textNode, b.offset + 1);
                return a;
            },
            updateFromDomRange: function(a) {
                var b = new l(a);
                this._.cursors = [];
                do a = b.next(), a.character && this._.cursors.push(a); while (a.character);
                this._.rangeLength = this._.cursors.length;
            },
            setMatched: function() {
                this._.isMatched = !0;
            },
            clearMatched: function() {
                this._.isMatched = !1;
            },
            isMatched: function() {
                return this._.isMatched;
            },
            highlight: function() {
                if (!(1 > this._.cursors.length)) {
                    this._.highlightRange && this.removeHighlight();
                    var a = this.toDomRange(), b = a.createBookmark();
                    k.applyToRange(a), a.moveToBookmark(b), this._.highlightRange = a, b = a.startContainer, 
                    b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()), b.scrollIntoView(), this.updateFromDomRange(a);
                }
            },
            removeHighlight: function() {
                if (this._.highlightRange) {
                    var a = this._.highlightRange.createBookmark();
                    k.removeFromRange(this._.highlightRange), this._.highlightRange.moveToBookmark(a), 
                    this.updateFromDomRange(this._.highlightRange), this._.highlightRange = null;
                }
            },
            isReadOnly: function() {
                return this._.highlightRange ? this._.highlightRange.startContainer.isReadOnly() : 0;
            },
            moveBack: function() {
                var a = this._.walker.back(), b = this._.cursors;
                return a.hitMatchBoundary && (this._.cursors = b = []), b.unshift(a), b.length > this._.rangeLength && b.pop(), 
                a;
            },
            moveNext: function() {
                var a = this._.walker.next(), b = this._.cursors;
                return a.hitMatchBoundary && (this._.cursors = b = []), b.push(a), b.length > this._.rangeLength && b.shift(), 
                a;
            },
            getEndCharacter: function() {
                var a = this._.cursors;
                return 1 > a.length ? null : a[a.length - 1].character;
            },
            getNextCharacterRange: function(a) {
                var b, c;
                return c = this._.cursors, c = (b = c[c.length - 1]) && b.textNode ? new l(i(b)) : this._.walker, 
                new m(c, a);
            },
            getCursors: function() {
                return this._.cursors;
            }
        };
        var n = function(a, b) {
            var c = [ -1 ];
            b && (a = a.toLowerCase());
            for (var d = 0; d < a.length; d++) for (c.push(c[d] + 1); 0 < c[d + 1] && a.charAt(d) != a.charAt(c[d + 1] - 1); ) c[d + 1] = c[c[d + 1] - 1] + 1;
            this._ = {
                overlap: c,
                state: 0,
                ignoreCase: !!b,
                pattern: a
            };
        };
        n.prototype = {
            feedCharacter: function(a) {
                for (this._.ignoreCase && (a = a.toLowerCase()); ;) {
                    if (a == this._.pattern.charAt(this._.state)) return this._.state++, this._.state == this._.pattern.length ? (this._.state = 0, 
                    2) : 1;
                    if (!this._.state) return 0;
                    this._.state = this._.overlap[this._.state];
                }
                return null;
            },
            reset: function() {
                this._.state = 0;
            }
        };
        var o = /[.,"'?!;: \u0085\u00a0\u1680\u280e\u2028\u2029\u202f\u205f\u3000]/, p = function(a) {
            if (!a) return !0;
            var b = a.charCodeAt(0);
            return b >= 9 && 13 >= b || b >= 8192 && 8202 >= b || o.test(a);
        }, q = {
            searchRange: null,
            matchRange: null,
            find: function(a, b, c, d, e, f) {
                this.matchRange ? (this.matchRange.removeHighlight(), this.matchRange = this.matchRange.getNextCharacterRange(a.length)) : this.matchRange = new m(new l(this.searchRange), a.length);
                for (var h = new n(a, !b), k = 0, o = "%"; null !== o; ) {
                    for (this.matchRange.moveNext(); (o = this.matchRange.getEndCharacter()) && (k = h.feedCharacter(o), 
                    2 != k); ) this.matchRange.moveNext().hitMatchBoundary && h.reset();
                    if (2 == k) {
                        if (c) {
                            var q = this.matchRange.getCursors(), r = q[q.length - 1], q = q[0], s = g.createRange();
                            if (s.setStartAt(g.editable(), CKEDITOR.POSITION_AFTER_START), s.setEnd(q.textNode, q.offset), 
                            q = s, r = i(r), q.trim(), r.trim(), q = new l(q, !0), r = new l(r, !0), !p(q.back().character) || !p(r.next().character)) continue;
                        }
                        return this.matchRange.setMatched(), !1 !== e && this.matchRange.highlight(), !0;
                    }
                }
                return this.matchRange.clearMatched(), this.matchRange.removeHighlight(), d && !f ? (this.searchRange = j(1), 
                this.matchRange = null, arguments.callee.apply(this, Array.prototype.slice.call(arguments).concat([ !0 ]))) : !1;
            },
            replaceCounter: 0,
            replace: function(a, b, d, e, f, h, i) {
                if (c = 1, a = 0, this.matchRange && this.matchRange.isMatched() && !this.matchRange._.isReplaced && !this.matchRange.isReadOnly()) {
                    if (this.matchRange.removeHighlight(), b = this.matchRange.toDomRange(), d = g.document.createText(d), 
                    !i) {
                        var j = g.getSelection();
                        j.selectRanges([ b ]), g.fire("saveSnapshot");
                    }
                    b.deleteContents(), b.insertNode(d), i || (j.selectRanges([ b ]), g.fire("saveSnapshot")), 
                    this.matchRange.updateFromDomRange(b), i || this.matchRange.highlight(), this.matchRange._.isReplaced = !0, 
                    this.replaceCounter++, a = 1;
                } else a = this.find(b, e, f, h, !i);
                return c = 0, a;
            }
        }, r = g.lang.find;
        return {
            title: r.title,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            minWidth: 350,
            minHeight: 170,
            buttons: [ CKEDITOR.dialog.cancelButton(g, {
                label: g.lang.common.close
            }) ],
            contents: [ {
                id: "find",
                label: r.find,
                title: r.find,
                accessKey: "",
                elements: [ {
                    type: "hbox",
                    widths: [ "230px", "90px" ],
                    children: [ {
                        type: "text",
                        id: "txtFindFind",
                        label: r.findWhat,
                        isChanged: !1,
                        labelLayout: "horizontal",
                        accessKey: "F"
                    }, {
                        type: "button",
                        id: "btnFind",
                        align: "left",
                        style: "width:100%",
                        label: r.find,
                        onClick: function() {
                            var a = this.getDialog();
                            q.find(a.getValueOf("find", "txtFindFind"), a.getValueOf("find", "txtFindCaseChk"), a.getValueOf("find", "txtFindWordChk"), a.getValueOf("find", "txtFindCyclic")) || alert(r.notFoundMsg);
                        }
                    } ]
                }, {
                    type: "fieldset",
                    label: CKEDITOR.tools.htmlEncode(r.findOptions),
                    style: "margin-top:29px",
                    children: [ {
                        type: "vbox",
                        padding: 0,
                        children: [ {
                            type: "checkbox",
                            id: "txtFindCaseChk",
                            isChanged: !1,
                            label: r.matchCase
                        }, {
                            type: "checkbox",
                            id: "txtFindWordChk",
                            isChanged: !1,
                            label: r.matchWord
                        }, {
                            type: "checkbox",
                            id: "txtFindCyclic",
                            isChanged: !1,
                            "default": !0,
                            label: r.matchCyclic
                        } ]
                    } ]
                } ]
            }, {
                id: "replace",
                label: r.replace,
                accessKey: "M",
                elements: [ {
                    type: "hbox",
                    widths: [ "230px", "90px" ],
                    children: [ {
                        type: "text",
                        id: "txtFindReplace",
                        label: r.findWhat,
                        isChanged: !1,
                        labelLayout: "horizontal",
                        accessKey: "F"
                    }, {
                        type: "button",
                        id: "btnFindReplace",
                        align: "left",
                        style: "width:100%",
                        label: r.replace,
                        onClick: function() {
                            var a = this.getDialog();
                            q.replace(a, a.getValueOf("replace", "txtFindReplace"), a.getValueOf("replace", "txtReplace"), a.getValueOf("replace", "txtReplaceCaseChk"), a.getValueOf("replace", "txtReplaceWordChk"), a.getValueOf("replace", "txtReplaceCyclic")) || alert(r.notFoundMsg);
                        }
                    } ]
                }, {
                    type: "hbox",
                    widths: [ "230px", "90px" ],
                    children: [ {
                        type: "text",
                        id: "txtReplace",
                        label: r.replaceWith,
                        isChanged: !1,
                        labelLayout: "horizontal",
                        accessKey: "R"
                    }, {
                        type: "button",
                        id: "btnReplaceAll",
                        align: "left",
                        style: "width:100%",
                        label: r.replaceAll,
                        isChanged: !1,
                        onClick: function() {
                            var a = this.getDialog();
                            for (q.replaceCounter = 0, q.searchRange = j(1), q.matchRange && (q.matchRange.removeHighlight(), 
                            q.matchRange = null), g.fire("saveSnapshot"); q.replace(a, a.getValueOf("replace", "txtFindReplace"), a.getValueOf("replace", "txtReplace"), a.getValueOf("replace", "txtReplaceCaseChk"), a.getValueOf("replace", "txtReplaceWordChk"), !1, !0); ) ;
                            q.replaceCounter ? (alert(r.replaceSuccessMsg.replace(/%1/, q.replaceCounter)), 
                            g.fire("saveSnapshot")) : alert(r.notFoundMsg);
                        }
                    } ]
                }, {
                    type: "fieldset",
                    label: CKEDITOR.tools.htmlEncode(r.findOptions),
                    children: [ {
                        type: "vbox",
                        padding: 0,
                        children: [ {
                            type: "checkbox",
                            id: "txtReplaceCaseChk",
                            isChanged: !1,
                            label: r.matchCase
                        }, {
                            type: "checkbox",
                            id: "txtReplaceWordChk",
                            isChanged: !1,
                            label: r.matchWord
                        }, {
                            type: "checkbox",
                            id: "txtReplaceCyclic",
                            isChanged: !1,
                            "default": !0,
                            label: r.matchCyclic
                        } ]
                    } ]
                } ]
            } ],
            onLoad: function() {
                var a, b = this, c = 0;
                this.on("hide", function() {
                    c = 0;
                }), this.on("show", function() {
                    c = 1;
                }), this.selectPage = CKEDITOR.tools.override(this.selectPage, function(d) {
                    return function(g) {
                        d.call(b, g);
                        var h, i = b._.tabs[g];
                        if (h = "find" === g ? "txtFindWordChk" : "txtReplaceWordChk", a = b.getContentElement(g, "find" === g ? "txtFindFind" : "txtFindReplace"), 
                        b.getContentElement(g, h), i.initialized || (CKEDITOR.document.getById(a._.inputId), 
                        i.initialized = !0), c) {
                            var j, k, g = "find" === g ? 1 : 0, i = 1 - g, l = f.length;
                            for (k = 0; l > k; k++) h = this.getContentElement(e[g], f[k][g]), j = this.getContentElement(e[i], f[k][i]), 
                            j.setValue(h.getValue());
                        }
                    };
                });
            },
            onShow: function() {
                q.searchRange = j();
                var a = this.getParentEditor().getSelection().getSelectedText(), b = this.getContentElement(h, "find" == h ? "txtFindFind" : "txtFindReplace");
                b.setValue(a), b.select(), this.selectPage(h), this[("find" == h && this._.editor.readOnly ? "hide" : "show") + "Page"]("replace");
            },
            onHide: function() {
                var a;
                q.matchRange && q.matchRange.isMatched() && (q.matchRange.removeHighlight(), g.focus(), 
                (a = q.matchRange.toDomRange()) && g.getSelection().selectRanges([ a ])), delete q.matchRange;
            },
            onFocus: function() {
                return "replace" == h ? this.getContentElement("replace", "txtFindReplace") : this.getContentElement("find", "txtFindFind");
            }
        };
    };
    CKEDITOR.dialog.add("find", function(a) {
        return g(a, "find");
    }), CKEDITOR.dialog.add("replace", function(a) {
        return g(a, "replace");
    });
}();