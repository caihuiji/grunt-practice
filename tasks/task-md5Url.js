

var path = require('path');

var patterns = [
    /<script.+src=['"]([^"']+)["']/gm,
    /<link[^\>]+href=['"]([^"']+)["']/gm,
    /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
    /url\(\s*['"]?([^"'\)]+)["']?\s*\)/gm
]

module.exports = function (grunt){

    grunt.task.registerMultiTask('md5Url' , 'replace orginal url to md5 url ' , function (type){

        var cwd = this.options().cwd;
        var filerev = {};

        var notFoundMap = {};

        if(grunt.filerev && grunt.filerev.summary){
            filerev = grunt.filerev.summary;
        }else {
            grunt.log.log('can not found filerev , stop replace');
        }

        this.filesSrc.forEach(function (value , key ){

            var fileString = grunt.file.read(value).toString();
            var searchPath =  path.dirname(value);

            patterns.forEach(function (reg ){
                fileString =  fileString.replace(reg , function (text , matchText){

                    var originalUrl = searchPath + '/' + matchText;

                    originalUrl = path.normalize(  originalUrl.replace(/\/\//gi , '\/').replace(/\//gi , '\\'));

                    if(!filerev[originalUrl]){
                        grunt.log.error('can not found match Url = ' + originalUrl);
                        notFoundMap[matchText] = matchText;
                        return text;
                    }

                    var md5Url =  filerev[originalUrl].replace(cwd , '').replace(/\\/gi , '/') ;

                    grunt.log.debug(originalUrl + ' - > ' + md5Url);

                    return text.replace(matchText , md5Url);

                });
            })

            grunt.file.write(value , fileString);
        });

        grunt.md5Url = {notFoundMap : notFoundMap};


    });
}

