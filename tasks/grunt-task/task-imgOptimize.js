/**
 * Created by ji on 2014/11/30.
 */
var execFile = require('child_process').execFile;
var jpegtran = require('jpegtran-bin').path;
var optipng = require('optipng-bin').path;
var path = require('path');
var fs = require('fs');

var logBeautify  = function (grunt ,src , dest){


    grunt.log.writeln(src.replace( process.cwd() + '\\'  , '') + " " + ((fs.statSync(src).size/1024).toFixed(2) +'kb').green +' -- > ' + ((fs.statSync(dest).size/1024).toFixed(2) +'kb').green)

}


var processPng = function (grunt ,src , dest , cb ){

    execFile(optipng, ['-out', dest, src], function (err) {
        if(err){
            grunt.log.error(e);
        }else {
            logBeautify(grunt , src , dest);
        }
        cb();
    });
}


var processJpg = function (grunt ,src , dest , cb ){

    execFile(jpegtran, [ "-copy", "none" , "-optimize" , "-progressive" , '-outfile', dest , src], function (err) {
        if(err){
            grunt.log.error(e);
        }else {
            logBeautify(grunt , src , dest);
        }
        cb();

    });
}


module.exports= function (grunt){

    grunt.task.registerMultiTask('imgOptimize' , 'optimize img' , function (type){
        var self = this;
        var ayncCount = this.files.length;
        var done = self.async();

        var countDown = function (){
            ayncCount -- ;
            if(ayncCount <= 0 ){
                done();
            }
        }

        this.files.forEach(function (filePair){
            var dirpath = path.dirname(process.cwd() + '\\' + filePair.dest);
            if (!grunt.file.exists(dirpath)) {
                grunt.file.mkdir(dirpath);
            }
            filePair.src.forEach(function ( value ,  key){
                var fileName = path.extname(value);
                switch(fileName){
                    case '.gif':
                        countDown();
                    break;
                    case '.png':
                        processPng(grunt , process.cwd() + '\\' + value ,   process.cwd() + '\\' + filePair.dest , function (){
                            countDown();
                        });
                        break;
                    case '.jpeg':
                    case '.jpg' :
                        processJpg(grunt , process.cwd() + '\\' + value ,   process.cwd() + '\\' + filePair.dest , function (){
                            countDown();
                        });

                        break;
                }
            })
        });

    })

}

