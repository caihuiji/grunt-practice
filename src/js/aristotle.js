(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){require("aristotle")},{aristotle:2}],2:[function(require,module,exports){var Konami=require("konami");var insertCss=require("insert-css");var css="* { cursor:url(data:image/png;base64,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), auto !important;}";
var easterEgg=new Konami;easterEgg.code=function(){insertCss(css)};easterEgg.load()},{"insert-css":3,konami:4}],3:[function(require,module,exports){var inserted={};module.exports=function(css){if(inserted[css])return;inserted[css]=true;var elem=document.createElement("style");elem.setAttribute("type","text/css");if("textContent"in elem){elem.textContent=css}else{elem.styleSheet.cssText=css}var head=document.getElementsByTagName("head")[0];head.appendChild(elem)}},{}],4:[function(require,module,exports){(function(){"use strict";var global=Function("return this")();var Konami=function(){var konami={addEvent:function(obj,type,fn,ref_obj){if(obj.addEventListener)obj.addEventListener(type,fn,false);else if(obj.attachEvent){obj["e"+type+fn]=fn;obj[type+fn]=function(){obj["e"+type+fn](window.event,ref_obj)};obj.attachEvent("on"+type,obj[type+fn])}},input:"",pattern:"3838404037393739666513",load:function(link){this.addEvent(document,"keydown",function(e,ref_obj){if(ref_obj)konami=ref_obj;konami.input+=e?e.keyCode:event.keyCode;if(konami.input.length>konami.pattern.length)konami.input=konami.input.substr(konami.input.length-konami.pattern.length);if(konami.input==konami.pattern){konami.code(link);konami.input="";return}},this);this.iphone.load(link)},code:function(link){window.location=link},iphone:{start_x:0,start_y:0,stop_x:0,stop_y:0,tap:false,capture:false,orig_keys:"",keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP","TAP"],code:function(link){konami.code(link)},load:function(link){this.orig_keys=this.keys;konami.addEvent(document,"touchmove",function(e){if(e.touches.length==1&&konami.iphone.capture==true){var touch=e.touches[0];konami.iphone.stop_x=touch.pageX;konami.iphone.stop_y=touch.pageY;konami.iphone.tap=false;konami.iphone.capture=false;konami.iphone.check_direction()}});konami.addEvent(document,"touchend",function(evt){if(konami.iphone.tap==true)konami.iphone.check_direction(link)},false);konami.addEvent(document,"touchstart",function(evt){konami.iphone.start_x=evt.changedTouches[0].pageX;konami.iphone.start_y=evt.changedTouches[0].pageY;konami.iphone.tap=true;konami.iphone.capture=true})},check_direction:function(link){x_magnitude=Math.abs(this.start_x-this.stop_x);y_magnitude=Math.abs(this.start_y-this.stop_y);x=this.start_x-this.stop_x<0?"RIGHT":"LEFT";y=this.start_y-this.stop_y<0?"DOWN":"UP";result=x_magnitude>y_magnitude?x:y;result=this.tap==true?"TAP":result;if(result==this.keys[0])this.keys=this.keys.slice(1,this.keys.length);if(this.keys.length==0){this.keys=this.orig_keys;this.code(link)}}}};return konami};if("undefined"!==typeof module){module.exports=Konami}else{global.Konami=Konami}})()},{}]},{},[1]);