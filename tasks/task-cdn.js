/**
 * Created by ji on 2014/11/11.
 */

var path = require('path');

var regJSON = {
    html : {
        script : /<script[^>]+src=['"](.+?)['"][^>]*>/gi,
        link : /<link[^>]+href=['"](.+?)['"][^>]*>/gi,
        img : /<img[^>]+src=['"](.+?)['"][^>]*>/gi
    },
    css :  {
        background : /url\(['"]?(.+?)['"]?\)/gi
    }
}

module.exports = function (grunt){

    var config ;

    var notReplace = function (url){
        if(/^\/\//gi.test(url) || /^http:/gi.test(url)){
            return true;
        }else if(grunt.md5Url && grunt.md5Url.notFoundMap[url]){
            return true;
        }else {
            return false;
        }

    }

    var generatePath = function (prefix , matchText){
        grunt.log.debug('       ----> ' + prefix + matchText)
        return   prefix + matchText;
    }

    var replaceHtml = function (value){
        var fileString = grunt.file.read(value).toString();

        fileString = fileString.replace(regJSON.html.script, function (text , matchText){
            if(notReplace(matchText)){
                return text;
            }



            return  text.replace(matchText ,  generatePath( config.js , matchText));
        }).replace(regJSON.html.link, function (text , matchText){
            if(notReplace(matchText)){
                return text;
            }else if(!/stylesheet/gi.test(text)){
                return text;
            }

            return text.replace(matchText ,  generatePath(config.css, matchText));
        }).replace(regJSON.html.img , function (text , matchText){
            if(notReplace(matchText)){
                return text;
            }else if(/^data:image/gi.test(matchText)){
                return text;
            }

            return text.replace(matchText ,    generatePath( config.img , matchText));
        });

        grunt.file.write(value , fileString);
    }

    var replaceCss = function (value){
        var fileString = grunt.file.read(value).toString();

        fileString = fileString.replace(regJSON.css.background , function (text , matchText){
            if(notReplace(matchText)){
                return text;
            }



            return  text.replace(matchText , generatePath( config.img  , matchText));
        })

        grunt.file.write(value , fileString);
    }


    var replaceJs = function (value){

    }

    grunt.registerMultiTask('cdn' , 'replace relative url to cdn url' , function (type){

        config =  this.options();

        this.filesSrc.forEach(function (value , key ){
            grunt.log.debug('cdn --> ' + value);
            if(/css$/gi.test(value)){
                replaceCss(value)
            }else if(/html$/gi.test(value)) {
                replaceHtml(value)
            }else if(/js$/gi.test(value)){
                replaceJs(value);
            }
        });

    });

}