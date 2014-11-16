/**
 * Created by ji on 2014/9/14.
 */


module.exports = function (grunt) {

    var json = grunt.file.readJSON('project.json');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.task.loadTasks('tasks');

    grunt.initConfig({
        pkg : json.pkg,
        useminPrepare: {
            options: {
                dest: '.tmp/',
                flow: {
                    steps: {
                        js: ['concat'],
                        css: ['concat']
                    },
                    post: {}
                }

            },
            html: '.tmp/**/*.html'
        },

        usemin: {
            html: ['<%= pkg.dist %>/**/*.html']
        },

        copy: {
            tmp : {
              src : '**/*.*' ,
              dest : '.tmp/',
              expand : true,
              cwd : 'src/'
            },
            dist :  {

                files : [
                    {src : [ '**/*'   ], dest : '<%= pkg.dist %>/', expand: true, cwd : '.tmp'}
                ]

            },
            dev : {
                files : [
                    {src : ['**/*'] ,  dest : '<%= pkg.dev %>/', expand: true, cwd : 'src'}
                ]
            }
        },

        concat: {

        },

        filerev : {
            options : {
                algorithm : 'md5',
                length : '4'
            },

            dist: {
              src : ['<%= pkg.dist %>/**/*.css'  , '<%= pkg.dist %>/**/*.js' , '<%= pkg.dist %>/**/*.{jpg,jpeg,gif,png,webp,svg}']

            }
        },

        clean: {
            dist: {
                src : ['<%= pkg.dist %>/' ]
            },
            tmp : {
                src : ['.tmp/']
            },
            dev : {
                src : ['<%= pkg.dev %>/']
            }
        },

        cdn : {
            options : json.cdn,
            dist : {
                src : ['<%= pkg.dist %>/**/*.css'  , '<%= pkg.dist %>/**/*.js'  , '<%= pkg.dist %>/**/*.html']
            },

            html : {
                src : [ '<%= pkg.dist %>/**/*.html']
            },

            css : {
                src : [ '<%= pkg.dist %>/**/*.css' ]
            },

            js : {
                src : [  '<%= pkg.dist %>/**/*.js' ]
            }
        },

        md5Url : {
            dist : {
                options : {
                    cwd : '<%= pkg.dist %>'
                },
                src : [  '<%= pkg.dist %>/**/*.{js,index,css,html}' ]
            }
        },

        concurrent : {
            cdn : ['cdn:html' , 'cdn:css' , 'cdn:js']
        },

        inline : {
            dist : {
                src : ['<%= pkg.dist %>/**/*.css'  , '<%= pkg.dist %>/**/*.js'  , '<%= pkg.dist %>/**/*.html']
            },

            dev : {
                src : ['<%= pkg.dev%>/**/*.html']
            }
        },

        end : {
            options : {
                startDate : new Date
            },

            end : {

            }
        },

        watch : {
            options : {
                spawn : false
            },

            main : {
                files : ['<%= pkg.src %>/**/*'],
                tasks:['copy:dev']
            }

//            inline : {
//                files : ['<%= pkg.src %>/**/*.html'],
//                tasks : ['inline:dev']
//            }
        }

    });

    grunt.event.on('watch', function(action, filepath, target){
        var destPath = filepath.replace(json.pkg.src , json.pkg.dev );
        switch(action) {
            case 'deleted' :
                grunt.log.writeln('deleted:' + destPath)
                grunt.file.exists(destPath) && grunt.file.delete(destPath);
                break;
        }

    });


    grunt.registerTask('default', ['dev']);

    grunt.registerTask('dist' , [
        'clean:dist' ,
        'clean:tmp' ,
        'copy:tmp',         // 将文件copy 到 tmp 去 , 如果不copy, concat 只生成合并后的文件到 tmp
        'useminPrepare' ,   // usemin 准备
        'concat',
        'copy:dist',
        'inline:dist',
        'usemin:html',      // 替换合并路径 , 有对 grunt.filerev && grunt.filerev.summary 做了兼容
        'filerev',          // 生成md5 ，如果文件存在则改名字，所以处理后不会有多余的未md5的名字
        'md5Url' ,
        'cdn:dist',
        'end'
    ]);

    grunt.registerTask('dev' , [
        'clean:dev',
        'copy:dev',
//        'inline:dev',
        'watch:main'
    ]);

}